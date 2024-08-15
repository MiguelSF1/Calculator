import { Component, inject } from '@angular/core';
import { IonContent, IonButton, ToastController } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import { Toast } from '@capacitor/toast';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, NgFor]
})
export class CalculatorPage {
  private toastCtrl = inject(ToastController);
  public results: any = [];
  public expression: any = "";

  constructor() { }

  private checkExpr() {
    let openParen = 0;
    let lastOper = false;
    let lastNum = false;
    let lastDecim = false;
    let lastOpenPar = false;
    let lastClosePar = false;

    for (let i = 0; i < this.expression.length; i++) {
      if (this.isDigit(this.expression[i])) {
        if (lastClosePar) {
          return false;
        }
        lastNum = true;
        lastOper = false;
        lastOpenPar = false;
      } else if (this.expression[i] === '.') {
        if (!lastNum || lastDecim) {
          return false;
        }
        lastDecim = true;
        lastNum = false;
      } else if (this.expression[i] === '(') {
        if (!lastOper) {
          return false;
        }
        openParen++;
        lastOpenPar = true;
        lastOper = false;
      } else if (this.expression[i] === ')') {
        if (!lastNum) {
          return false;
        }
        openParen--;
        lastClosePar = true;
        lastNum = false;
      } else if (this.isOperator(this.expression[i])) {
        if (!lastNum && !lastClosePar) {
          return false;
        }
        lastOper = true;
        lastNum = false;
        lastClosePar = false;
        lastDecim = false;
      }

      if (openParen < 0) {
        return false;
      }
    }

    return openParen === 0 && this.expression[this.expression.length - 1] !== '.' && !this.isOperator(this.expression[this.expression.length - 1]);
  }

  private isDigit(c: string) {
    return c >= '0' && c <= '9';
  }

  private isOperator(c: string) {
    return c === '+' || c === '-' || c === '*' || c === '/'; 
  }

  private async presentInvalidExprToast() {
    if (Capacitor.getPlatform() === 'web') {
      const toast = await this.toastCtrl.create({
        message: 'Invalid expression',
        duration: 2500,
        position: 'bottom',
        color: 'primary'
      });

      await toast.present();
    } else {
      await Toast.show({
        text: 'Invalid expression',
      });
    }
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
}
