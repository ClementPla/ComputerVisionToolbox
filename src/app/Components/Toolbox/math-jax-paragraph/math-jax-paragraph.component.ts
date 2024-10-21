import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MathJaxService } from 'src/app/Services/math-jax.service';

@Component({
  selector: 'app-math-jax-paragraph',
  templateUrl: './math-jax-paragraph.component.html',
  styleUrls: ['./math-jax-paragraph.component.scss']
})
export class MathJaxParagraphComponent implements OnInit {
  @ViewChild('mathParagraph') paragraphElement: ElementRef<HTMLDivElement>;
  @Input() mathString!: string;

  constructor(private mathJaxService: MathJaxService) { }

  ngOnInit(): void {
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {
      console.log('MathJax loaded, rendering math');
      
      // Insert the input string
      this.paragraphElement.nativeElement.innerHTML = this.mathString;
      
      // Render the Latex
      this.mathJaxService.render();
    });
  }

}
