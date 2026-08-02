import {
  Component,
  OnInit,
} from '@angular/core';

type TabType = 'rnn' | 'lstm' | 'architectures';
type ArchitectureType = 'seq2one' | 'seq2seq' | 'stacked' | 'bidirectional';

@Component({
  selector: 'app-rnncell-tutorial',
  standalone: false,
  templateUrl: './rnncell-tutorial.component.html',
  styleUrl: './rnncell-tutorial.component.scss'
})
export class RNNCellTutorialComponent implements OnInit {
  currentTab: TabType = 'rnn';
  currentArchitecture: ArchitectureType = 'seq2one';

  // Hover states for RNN
  rnnHighlight: 'none' | 'input' | 'hidden' | 'output' | 'all' = 'none';

  // Hover states for LSTM
  lstmHighlight: 'none' | 'forget' | 'input' | 'candidate' | 'output' | 'cell' | 'hidden' = 'none';

  ngOnInit(): void {}

  setTab(tab: TabType): void {
    this.currentTab = tab;
    this.rnnHighlight = 'none';
    this.lstmHighlight = 'none';
  }

  setArchitecture(arch: ArchitectureType): void {
    this.currentArchitecture = arch;
  }

  // RNN hover handlers
  onRnnFormulaHover(part: 'none' | 'input' | 'hidden' | 'output' | 'all'): void {
    this.rnnHighlight = part;
  }

  // LSTM hover handlers
  onLstmFormulaHover(part: 'none' | 'forget' | 'input' | 'candidate' | 'output' | 'cell' | 'hidden'): void {
    this.lstmHighlight = part;
  }
}
