import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule]
})
export class CalculatorPage implements OnInit {
  public results: any = [];
  public expression: any = "";

  constructor() { }

  ngOnInit() {}

  private checkExpr() {
    // use regex
    return true;
  }

  public calcRes() {
    if (this.checkExpr()) {
      const res = eval?.(this.expression);
      this.results.unshift({ expr: this.expression, result: res });
      this.expression = res + "";
    } else {
      // send toast
    }
  }

  public changeExpr(char: string) {
    if (char === 'C') {
      this.expression = "";
    } else if (char === 'DEL') {
      this.expression = this.expression.substring(0, this.expression.length - 1);
    } else {
      this.expression += char;
    }
  }
}
