/* global TweenLite */
// © Andrew Wei

'use strict';

import m, { dom, DirtyType } from 'meno';

const $ = dom.getChild;

class Prologue extends m.Element(`calc3-prologue`) {
  static get extends() { return `section`; }

  get responsiveness() {
    return {
      resize: 10.0,
      scroll: 10.0
    };
  }

  init() {
    const anchors = this.querySelectorAll(`[href^='#']`);

    anchors.forEach(anchor => {
      anchor.addEventListener(`click`, e => {
        e.preventDefault();
        const href = dom.getAttribute(e.currentTarget, `href`);
        if (!href) return;
        TweenLite.to(window, 0.5, { scrollTo: href, ease: `Expo.easeOut` });
      });
    });
  }

  update(info) {
    this.updateLayout(info[DirtyType.POSITION] || info[DirtyType.SIZE]);
  }

  updateLayout(info) {
    if (!info) return;
    const viewport = info.conductorRect;
    const rect = info.rect;
    const threshold = rect.height * 0.5;
    dom.setAttribute($(this, `splash`), `data-state`, (viewport.top <= threshold) ? `visible` : `hidden`);
  }
}

m.register(Prologue);
