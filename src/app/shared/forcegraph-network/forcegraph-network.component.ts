import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import ForceGraph3D from '3d-force-graph';
import forceCollide from '3d-force-graph';

@Component({
  selector: 'app-forcegraph-network',
  templateUrl: './forcegraph-network.component.html',
  styleUrls: ['./forcegraph-network.component.scss']
})
export class ForcegraphNetworkComponent implements OnInit, AfterViewInit {
  @ViewChild('3dgraph') graphElement!: ElementRef;
  jsonDataUrl = '../../../assets/data/blocks.json';

  private animationInterval: any;
  private distance = 700;
  myGraph: any;


  constructor() { }

  ngAfterViewInit() {
    // Access the native DOM element
    console.log(this.graphElement.nativeElement);


    // Manipulate the element (though Angular prefers property binding)
    this.myGraph = new ForceGraph3D(this.graphElement.nativeElement, { controlType: 'trackball' } )
      .jsonUrl(this.jsonDataUrl)
      .nodeAutoColorBy('group')
      .cameraPosition({ z: this.distance })
      .nodeLabel(() => 'prasad')

      // .nodeColor(() => '#333232') // '#343637' c05676
      .width(1300)
      .height(600)
      .backgroundColor('#000000') // cae8ff #d3e4f0
      .nodeRelSize(7)
      .nodeOpacity(1) // this makes the nodes see through and 0 makes it completely invisible.
      .nodeLabel("prasad")
      .nodeResolution(10) // this shows how many edges you want on the sphere. For more smooth surgace like circle, its 10
      .linkColor(() => '#adafaf')
      // link style options
      .linkLabel(() => 'Genius')
      .linkWidth(0.5)
      .linkOpacity(1)
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      .linkDirectionalArrowColor("#F775E8")
      .linkCurvature(0.25)
      .onNodeClick(node => {
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance/Math.hypot(node.x!, node.y!, node.z!);

        const newPos = node.x || node.y || node.z
          ? { x: node.x! * distRatio, y: node.y! * distRatio, z: node.z || 0 * distRatio }
          : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

        this.myGraph.cameraPosition(
          newPos, // new position
          node, // lookAt ({ x, y, z })
          3000  // ms transition duration
        );
      });



  


    //this.startCameraOrbit();
    
    
  }

  private startCameraOrbit(): void {
    let angle = 0;
    this.animationInterval = setInterval(() => {
      this.myGraph.cameraPosition({
        x: this.distance * Math.sin(angle),
        z: this.distance * Math.cos(angle)
      });
      angle += Math.PI / 100;
    }, 10);
  }
  

  

  ngOnInit(): void {
    // const myGraph = new ForceGraph3D(this.graphElement.nativeElement)
    // .jsonUrl(this.jsonDataUrl)
  }

}
