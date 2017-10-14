// © Andrew Wei

'use strict';

import m, { dom, DirtyType } from 'meno';
import getIntersectRect from 'meno/lib/utils/getIntersectRect';

const $ = dom.getChild;

class Programmer extends m.Element(`calc3-programmer`) {
  static get extends() { return `section`; }

  get responsiveness() {
    return {
      resize: 10.0,
      scroll: 10.0
    };
  }

  update(info) {
    this.updateLayout(info[DirtyType.POSITION] || info[DirtyType.SIZE]);
  }

  updateLayout(info) {
    const rect = getIntersectRect(this);
    const threshold = info.conductorRect.height * 0.5;
    dom.setAttribute($(this, `diagram`), `data-state`, rect.height > threshold ? `visible` : `hidden`);
  }
}

m.register(Programmer);
