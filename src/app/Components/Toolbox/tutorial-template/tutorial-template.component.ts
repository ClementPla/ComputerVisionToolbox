import { Component, Input } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatDrawerContainer, MatDrawer } from '@angular/material/sidenav';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';

@Component({
    selector: 'app-tutorial-template',
    templateUrl: './tutorial-template.component.html',
    styleUrls: ['./tutorial-template.component.scss'],
    imports: [
        MatToolbar,
        MatToolbarRow,
        MatIconButton,
        MatIcon,
        RouterLink,
        MatDrawerContainer,
        MatDrawer,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
    ],
})
export class TutorialTemplateComponent {
  @Input() leftDrawer: boolean = true;
  @Input() rightDrawer: boolean = true;
  @Input() tutorial: boolean = false;
  constructor() {}
}
