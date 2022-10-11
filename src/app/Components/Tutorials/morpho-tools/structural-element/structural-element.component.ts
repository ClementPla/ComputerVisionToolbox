import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Base2DTutorialComponent } from '../../base2-dtutorial/base2-dtutorial.component';
import { StructuralElement } from '../structuralElement';

@Component({
  selector: 'app-structural-element',
  templateUrl: './structural-element.component.html',
  styleUrls: ['./structural-element.component.scss']
})
export class StructuralElementComponent extends Base2DTutorialComponent implements OnInit {

  @Input() kernel: StructuralElement;
  @Output() updateFilters = new EventEmitter<boolean>();
  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  override ngOnInit(): void {
    super.ngOnInit()
    this.kernel.delete = false;
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d', {alpha:false})!;
    canvasEl.width = this.kernel.size;
    canvasEl.height = this.kernel.size;
    this.ctx.canvas.width = this.kernel.size;
    this.ctx.canvas.height = this.kernel.size;
    this.drawFilter();
  }

  delete(event: MouseEvent) {
    event.stopPropagation();
    this.kernel.delete = true;
    this.updateFilters.emit();
  }
  toggleActive(event: MouseEvent) {
    event.stopPropagation();
    this.kernel.active = !this.kernel.active;
    this.updateFilters.emit();
  }
  drawFilter() {

    let data = new Uint8ClampedArray(this.kernel.size*this.kernel.size*4)
    for(let row=0; row<this.kernel.size; row++){
      for(let col=0; col<this.kernel.size; col++){

        const value = this.kernel.element[row*this.kernel.size+col]
        data[4*row*this.kernel.size+col*4] = value
        data[4*row*this.kernel.size+col*4+1] = value
        data[4*row*this.kernel.size+col*4+2] = value
        data[4*row*this.kernel.size+col*4+3] = 255

      }

    }

    let imgData = new ImageData(data, this.kernel.size, this.kernel.size);
    this.ctx.putImageData(imgData, 0, 0);
  }

  getFormattedValue(row:number, col:number){
    let index =  row * this.kernel.size + col
    return (this.kernel.element[index]/255).toFixed(0)

  }

  updateFilter(){
    this.updateFilters.emit(true)
  }

}
