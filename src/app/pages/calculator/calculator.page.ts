import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, ToastController, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, IonButton]
})
export class CalculatorPage {
  private toastCtrl = inject(ToastController);
  public results: any = [];
  public expression: any = "";

  constructor() { }

  private checkExpr() {
    const regex = /(\d+(\.\d+)?|\(\d+(\.\d+)?(?:[/*+\-]\d+(\.\d+)?)*\))(?:[/*+\-](\d+(\.\d+)?|\(\d+(\.\d+)?(?:[/*+\-]\d+(\.\d+)?)*\))*)+/g; // needs work
    return this.expression.match(regex) !== null;
  }

  public calcRes() {
    if (this.checkExpr()) {
      const res = eval?.(this.expression);
      this.results.unshift({ expr: this.expression, result: res });
      this.expression = res + "";
    } else {
      this.presentInvalidExprToast();
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

  private async presentInvalidExprToast() {
    const toast = await this.toastCtrl.create({
      message: 'Invalid Expression',
      duration: 3000,
      position: 'top',
      color: 'primary'
    });

    await toast.present();
  }
}
