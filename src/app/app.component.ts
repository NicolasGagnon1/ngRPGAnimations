import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {bounce, flip, pulse, shakeX, wobble} from "ng-animate";
import {lastValueFrom, timer} from "rxjs";

let DEATH_DURATION_SECONDS = 0.5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: DEATH_DURATION_SECONDS}}))]),
    trigger('charge', [transition(':increment', useAnimation(pulse, {params: {timing: 0.9, scale:0.5}}))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {params: {timing: 0.3, scale:4.5}}))]),
    trigger('bounce',[transition(':increment', useAnimation(bounce, {params: {timing: 1}}))]),
    trigger('flip',[transition(':increment', useAnimation(flip, {params: {timing: 0.75}}))]),
  ]
})
export class AppComponent {
  slimeIsPresent = false;
  ng_death: any = 0;
  ng_attack: any = 0;
  ng_charge: any = 0;
  ng_bounce: any = 0;
  ng_flip: any = 0;
  wob = false;
  rotateCenter: boolean = false;
  rotateHorTop: boolean = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    this.showSlime();
    // TODO Animation angular avec forwards
  }

  death(){
    this.slimeIsPresent = false;
    this.ng_death++
    // TODO Animation angular avec forwards
    this.hideSlime();
    // TODO 2e animation angular en même temps
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    this.ng_charge++;
    setTimeout(()=>{this.ng_attack++;},500)

    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.wob = true;
    setTimeout(() => {this.wob = false;},1000);
  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }

  infiniteFlip(){
    this.playCenter()
  }

  playCenter(){
    this.rotateCenter = true;
    setTimeout(()=>{
      this.rotateCenter = false;
      this.playHorTop();
    },800)
  }

  playHorTop(){
    this.rotateHorTop = true;
    setTimeout(()=>{
      this.rotateHorTop = false;
      this.playCenter();
    },700)
  }

  async bounceShakeFlip(){
    this.ng_bounce++;
    await this.waitFor(1);
    this.ng_death++;
    await this.waitFor(0.75);
    this.ng_flip++;
  }

  async waitFor(delayInSeconds:number) {
    await lastValueFrom(timer(delayInSeconds * 1000));
  }


  protected readonly wobble = wobble;
  protected readonly bounce = bounce;
}
