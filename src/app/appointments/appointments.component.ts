import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';


@Component({
  selector: 'appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  selectedDate: Date = new Date();
  minDateSelectable: Date = new Date();
  steps: MenuItem[] = [];
  isDateSelected: boolean = false; // Controls the visibility of the time slots
  availableTimeSlots: string[] = []; // Time slots for the selected date
  selectedTimeSlot: string | null = null; // Currently selected time slot
  bookedSlotsByDate: { [key: string]: string[] } = {}; // Track booked slots by date
  activeIndex: number = 0; // Track the current step
  firstName: string = ''; // Name for personal info step
  lastName: string = ''; // Name for personal info step
  phoneNumber: string = ''; // Name for personal info step
  email: string = ''; // Email for personal info step
  isBookingConfirmed: boolean = false;
  noAvailableSlots: boolean = false;
  isBookingFailed: boolean = false;
  isTimeSlotValid: boolean = true; // Added for time slot validation
  disabledDays: number[] = [0, 6];  // 0 = Sunday, 6 = Saturday
  currentYear: number = new Date().getFullYear();
  holidays: { date: Date, name: string }[] = [];

  personalInfoForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$') // Only letters
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$') // Only letters
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$') // 10 digits only
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.personalInfoForm.controls; }

  ngOnInit(): void {

    // Initialize Email.js
    emailjs.init('uTQAJqhpEjefNfgou');
    /* emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // Replace with actual key in production */

    this.steps = [
      {label: 'Select time'},
      {label: 'Personal information'},
      {label: 'Confirmation'}
    ];

    // Set minimum date to today to prevent selecting past dates
    this.minDateSelectable = new Date();
    this.updateHolidays(this.currentYear);
  }

  onDateSelect(): void {
    this.loadTimeSlots();
    // Add a small delay to make the animation more noticeable
    setTimeout(() => {
        this.isDateSelected = true;
    }, 50);
  }

  loadTimeSlots(): void {
    const dateKey = this.selectedDate.toDateString();
    const now = new Date();
    const selectedDateTime = new Date(this.selectedDate);
    
    // Check if selected date is in the past
    const isInPast = selectedDateTime.setHours(23, 59, 59) < now.getTime();
    
    // Define all possible time slots
    const allTimeSlots = [
      '9:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '1:00 PM - 2:00 PM',
      '2:00 PM - 3:00 PM',
      '3:00 PM - 4:00 PM'
    ];

    if (isInPast) {
      // If date is in the past, no slots are available
      this.availableTimeSlots = [];
      this.noAvailableSlots = true;
    } else if (this.selectedDate.toDateString() === now.toDateString()) {
      // Filter time slots for today
      this.availableTimeSlots = allTimeSlots.filter(slot => {
        const [startTime] = slot.split(' - ');
        const [time, period] = startTime.split(' '); // Split time and AM/PM
        const [hours, minutes] = time.split(':');
        let hour = parseInt(hours);
        
        // Handle AM/PM conversion
        if (period === 'PM' && hour !== 12) {
          // Convert PM times to 24-hour format (except 12 PM)
          hour += 12;
        } else if (period === 'AM' && hour === 12) {
          // Convert 12 AM to 0
          hour = 0;
        }

        // Create a Date object for the slot time
        const slotTime = new Date(this.selectedDate);
        slotTime.setHours(hour, parseInt(minutes), 0, 0);

        // Add one hour to current time for minimum booking window
        const minBookingTime = new Date(now);
        minBookingTime.setHours(now.getHours() + 1, now.getMinutes(), 0, 0);

        return slotTime > now && slotTime > minBookingTime;
      });

      this.noAvailableSlots = this.availableTimeSlots.length === 0;
    } else {
      // For future dates, show all time slots
      this.availableTimeSlots = allTimeSlots;
      this.noAvailableSlots = false;
    }

    // Initialize booked slots array if it doesn't exist
    if (!this.bookedSlotsByDate[dateKey]) {
      this.bookedSlotsByDate[dateKey] = [];
    }
  }

  selectTimeSlot(slot: string): void {
    const dateKey = this.selectedDate.toDateString();

    // If the slot is already booked, don't do anything
    if (this.bookedSlotsByDate[dateKey]?.includes(slot)) {
        return;
    }

    // Toggle selection: if already selected, deselect it; otherwise select it
    this.selectedTimeSlot = this.selectedTimeSlot === slot ? null : slot;
  }

  confirmBooking(): void {
    // Send the confirmation email
    this.sendEmail();
  }

  sendEmail(): void {
    const testFailure = false; // Toggle this to test failure scenario

    if (testFailure) {
        console.error('Test failure scenario');
        this.isBookingFailed = true;
        this.isBookingConfirmed = false;
        this.clearFormFields();
        this.activeIndex = 3; // Move to final step to show failure message
        return;
    }

    const serviceID = 'service_qfvl3yi';
    const ownerTemplateID = 'template_dx4fiss';
    const userTemplateID = 'template_4ayp7hd';
    
    const timeSlot = this.selectedTimeSlot;
    const dateKey = this.selectedDate.toDateString();

    if (!timeSlot) {
        this.isBookingFailed = true;
        this.isBookingConfirmed = false;
        this.clearFormFields();
        this.activeIndex = 3; // Move to final step to show failure message
        return;
    }

    const emailParams = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        selectedDate: dateKey,
        selectedTimeSlot: timeSlot
    };

    const userEmailParams = {
        ...emailParams,
        to_email: this.email
    };

    emailjs.send(serviceID, ownerTemplateID, emailParams)
      .then(() => emailjs.send(serviceID, userTemplateID, userEmailParams))
      .then(() => {
        console.log('Emails sent successfully');
        // Only save the booking after successful email sending
        if (!this.bookedSlotsByDate[dateKey]) {
          this.bookedSlotsByDate[dateKey] = [];
        }
        this.bookedSlotsByDate[dateKey].push(timeSlot);
        this.isBookingConfirmed = true;
        this.isBookingFailed = false;
        this.clearFormFields();
        this.activeIndex = 3; // Move to final step to show success message
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        this.isBookingFailed = true;
        this.isBookingConfirmed = false;
        this.clearFormFields();
        this.activeIndex = 3; // Move to final step to show failure message
      });
  }

  private clearFormFields(): void {
    // Clear component properties
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    
    // Reset the form if it exists
    if (this.personalInfoForm) {
        this.personalInfoForm.reset();
        this.submitted = false;
    }
  }

  resetBookingProcess(): void {
    // Hide the confirmation message and reset user inputs
    this.isBookingConfirmed = false;
    this.selectedDate = new Date(); // Reset to the current date
    this.isDateSelected = false;
    this.selectedTimeSlot = null; // Clear selected time slot
    this.activeIndex = 0; // Reset stepper to the first step
    this.firstName = ''; // Clear personal info
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';

    // Reload available time slots (keeps previously booked slots as unavailable)
    this.loadTimeSlots();
  }

  cancelTimeSlot(slot: string): void {
    const dateKey = this.selectedDate.toDateString();
    const index = this.bookedSlotsByDate[dateKey]?.indexOf(slot);
    if (index !== undefined && index !== -1) {
        this.bookedSlotsByDate[dateKey].splice(index, 1);
    }
  }

  goBackToStart(): void {
    // Reset all form states
    this.isBookingFailed = false;
    this.isBookingConfirmed = false;
    this.isDateSelected = false;
    this.activeIndex = 0;
    this.selectedDate = new Date();
    this.selectedTimeSlot = null;
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    
    if (this.personalInfoForm) {
        this.personalInfoForm.reset();
        this.submitted = false;
    }
  }

  nextStep(): void {
    if (this.activeIndex === 0 && !this.selectedTimeSlot) {
      // Don't proceed if no time slot is selected
      this.isTimeSlotValid = false;
      return;
    }
    
    if (this.activeIndex === 1) {
      this.submitted = true;
      
      // Don't proceed if form is invalid
      if (this.personalInfoForm.invalid) {
        return;
      }

      // Capture form values when moving to confirmation step
      this.firstName = this.personalInfoForm.get('firstName')?.value;
      this.lastName = this.personalInfoForm.get('lastName')?.value;
      this.phoneNumber = this.personalInfoForm.get('phoneNumber')?.value;
      this.email = this.personalInfoForm.get('email')?.value;
    }
    
    this.isTimeSlotValid = true;
    this.activeIndex++;
  }

  backStep(): void {
    this.activeIndex--;
    this.isTimeSlotValid = true; // Reset validation when going back
  }

  // Add method to format the date nicely
  getFormattedDate(): string {
    if (!this.selectedDate) return '';
    return this.selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  updateHolidays(year: number) {
    this.holidays = [
      { date: new Date(year, 0, 1), name: "New Year's Day" },
      { date: this.getMLKDay(year), name: "Martin Luther King Jr. Day" },
      { date: this.getPresidentsDay(year), name: "Presidents' Day" },
      { date: this.getMemorialDay(year), name: "Memorial Day" },
      { date: new Date(year, 6, 4), name: "Independence Day" },
      { date: this.getLaborDay(year), name: "Labor Day" },
      { date: new Date(year, 10, 11), name: "Veterans Day" },
      { date: this.getThanksgivingDay(year), name: "Thanksgiving Day" },
      { date: new Date(year, 11, 25), name: "Christmas Day" }
    ];
  }

  // Helper methods to calculate floating holidays
  getMLKDay(year: number): Date {
    // Third Monday in January
    return this.getNthDayOfMonth(year, 0, 1, 3);
  }

  getPresidentsDay(year: number): Date {
    // Third Monday in February
    return this.getNthDayOfMonth(year, 1, 1, 3);
  }

  getMemorialDay(year: number): Date {
    // Last Monday in May
    const lastDay = new Date(year, 4, 31);
    const dayOfWeek = lastDay.getDay();
    return new Date(year, 4, 31 - ((dayOfWeek + 6) % 7));
  }

  getLaborDay(year: number): Date {
    // First Monday in September
    return this.getNthDayOfMonth(year, 8, 1, 1);
  }

  getThanksgivingDay(year: number): Date {
    // Fourth Thursday in November
    return this.getNthDayOfMonth(year, 10, 4, 4);
  }

  getNthDayOfMonth(year: number, month: number, dayOfWeek: number, n: number): Date {
    const date = new Date(year, month, 1);
    const add = (dayOfWeek - date.getDay() + 7) % 7;
    date.setDate(1 + add + (n - 1) * 7);
    return date;
  }

  isHoliday(date: any): boolean {
    // Update holidays if year changes
    if (date.year !== this.currentYear) {
      this.currentYear = date.year;
      this.updateHolidays(this.currentYear);
    }

    return this.holidays.some(holiday => 
      holiday.date.getDate() === date.day &&
      holiday.date.getMonth() === date.month &&
      holiday.date.getFullYear() === date.year
    );
  }

  // Add this method to check if a date is selected
  isSelected(date: any): boolean {
    return this.selectedDate && 
           date.year === this.selectedDate.getFullYear() &&
           date.month === this.selectedDate.getMonth() &&
           date.day === this.selectedDate.getDate();
  }
}