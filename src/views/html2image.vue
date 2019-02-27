<template>
  <div class="html2image">
    <div class="html2image__handel">
      <!-- <button @click="html2canvasHandle">html2canvas</button> -->
      <button @click="html2imageHandle">html2image</button>
    </div>
    <div class="html2image__content">
      <div class="html2image__content__item">
        <h2>source</h2>
        <div class="html2image__content__source" id="source">
          <h2 class="html2image__content__source__title">{{ title }}</h2>
          <img src="../assets/68747470733a2f2f706963322e7a68696d672e636f6d2f37313337373464353338336437323662316362386536623665663438666430645f622e706e67.png" />
          <div class="html2image__content__source__content">好的程序员能够独立的解决某个技术难题，主动的关心项目进度与潜在瓶颈，
            能够负责模块小组，合理地分配任务，与项目经理、产品经理、美工、测试、服务端的同事高效包容地沟通。而衡量好的架构师的
            标准则是整个项目的工程化程度。众所周知，现在前端进入了一种爆炸期，各种技术框架百花齐放，各种应用场景天差地别，前端
            工程化个人感觉不仅仅是选定某个技术框架、选定代码规范、选定测试方案等等，工程化的根本目标即是以尽可能快的速度实现可
            信赖的产品。尽可能短的时间包括开发速度、部署速度与重构速度，而可信赖又在于产品的可测试性、可变性以及 Bug 的重现与
            定位。笔者感觉遇见的最大的问题在于需求的不明确、接口的不稳定与开发人员素质的参差不齐。先不论技术层面，项目开发中我
            们在组织层面的希望能让每个参与的人无论水平高低都能最大限度的发挥其价值，每个人都会写组件，都会写实体类，但是他们不
            一定能写出合适的优质的代码。另一方面，好的架构都是衍化而来，不同的行业领域、应用场景、界面交互的需求都会引发架构的
            衍化。我们需要抱着开放的心态，不断地提取公共代码，保证合适的复用程度。同时也要避免过度抽象而带来的一系列问题。</div>
          <div class="html2image__content__source__href">
            <a :href="sourceHref">{{ sourceHref }}</a>
            <img src="../assets/XN.jpg" />
          </div>
        </div>
      </div>
      <div class="html2image__content__item html2image__content__canvas">
        <h2>html2canvas</h2>
        <div id="canvas"></div>
      </div>
      <div class="html2image__content__item html2image__content__canvas">
        <h2>html2image</h2>
        <div id="image"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import html2canvas from 'html2canvas';
import Canvas2Image from '../utils/canvas2image';

@Component({
  components: {},
})
export default class Jsfiddle extends Vue {
  private title: string = '前后端分离与全栈架构';
  private sourceHref: string = 'https://github.com/wxyyxc1992/Web-Series';
  private html2imageHandle(): void {
    const defaultContainer = document.createElement('div');
    defaultContainer.innerText = 'id = "source"的dom不存在';
    const sourceContainer: HTMLElement = document.querySelector('#source') || defaultContainer;
    const canvasContainer: HTMLElement = document.querySelector('#canvas') || document.createElement('div');
    const imageContainer: HTMLElement = document.querySelector('#image') || document.createElement('div');
    if (sourceContainer && canvasContainer) {
      html2canvas(sourceContainer).then((canvas) => {
        if (document.querySelector('#canvas')) {
          canvasContainer.appendChild(canvas);
          imageContainer.appendChild(Canvas2Image.convertToImage(canvas, canvas.width, canvas.height, 'png'));
        } else {
          document.body.appendChild(canvas);
        }
      });
    }
  }
}
</script>
<style lang="scss" scope>
.html2image{
  display: flex;
  height: 100%;
  box-sizing: border-box;
  &__handel{
    min-width: 600px;
    button{
      margin-top: 20px;
      font-size: 24px;
      height: 40px;
      line-height: 40px;
    }
  }
  &__content{
    flex-grow: 1;
    height: 100%;
    overflow-y: scroll;
    &__item{
      height: 100%;
      overflow-y: scroll;
    }
    &__source{
      padding: 20px;
      background-color: darkgray;
      &__title{
        text-align: left;
        color: #4335d8;
        font-size: 36px;
        line-height: 60px;
      }
      &__content{
        font-size: 14px;
        line-height: 22px;
        text-align: left;
        text-indent: 48px;
      }
      img {
        width: 80%;
      }
      &__href{
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        margin-top: 10px;
        padding: 10px;
        border: 3px solid #ffc107;
        img{
          width: auto;
          height: 100px;
        }
        a{
          padding-right: 30px;
        }
      }
    }
    
  }
}
</style>
