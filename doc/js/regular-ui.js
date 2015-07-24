(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * RGUI      Regular UI库
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var RGUI = {}

/**
 * base
 */
RGUI.Regular = require('regularjs');
RGUI.Component = require('./base/component.js');
RGUI._ = require('./base/util.js');
RGUI.request = require('./base/request.js');

/**
 * jsUnit
 */
// 导航类
RGUI.Dropdown = require('./unit/dropdown.js');
RGUI.Menu = require('./unit/menu.js');

// 表单类
RGUI.Input2 = require('./unit/input2.js');
RGUI.NumberInput = require('./unit/numberInput.js');
RGUI.Check2 = require('./unit/check2.js');
RGUI.CheckGroup = require('./unit/checkGroup.js');
RGUI.Check2Group = require('./unit/check2Group.js');
RGUI.RadioGroup = require('./unit/radioGroup.js');
RGUI.Radio2Group = require('./unit/radio2Group.js');
RGUI.Select2 = require('./unit/select2.js');
RGUI.TreeSelect = require('./unit/treeSelect.js');
RGUI.Suggest = require('./unit/suggest.js');
RGUI.Uploader = require('./unit/uploader.js');

// 日期类
RGUI.DatePicker = require('./unit/datePicker.js');
RGUI.TimePicker = require('./unit/timePicker.js');
RGUI.DateTimePicker = require('./unit/dateTimePicker.js');

// 其他
RGUI.Progress = require('./unit/progress.js');
RGUI.Gotop = require('./unit/gotop.js');

/**
 * jsModule
 */
// 导航类
RGUI.Tab = require('./module/tab.js');
RGUI.Accordion = require('./module/accordion.js');
RGUI.Pager = require('./module/pager.js');
RGUI.Menubar = require('./module/menubar.js');

// 窗口类
RGUI.Notify = require('./module/notify.js');
RGUI.Modal = require('./module/modal.js');

// 数据类
RGUI.ListView = require('./module/listView.js');
RGUI.GridView = require('./module/gridView.js');
RGUI.TreeView = require('./module/treeView.js');
RGUI.TableView = require('./module/tableView.js');

// 日期类
RGUI.Calendar = require('./module/calendar.js');

// 上传类
//

// 编辑器类
RGUI.Editor = require('./module/editor.js');
RGUI.HTMLEditor = require('./module/htmlEditor.js');
RGUI.MarkEditor = require('./module/markEditor.js');

module.exports = window.RGUI = RGUI;
},{"./base/component.js":29,"./base/request.js":31,"./base/util.js":33,"./module/accordion.js":35,"./module/calendar.js":38,"./module/editor.js":40,"./module/gridView.js":42,"./module/htmlEditor.js":44,"./module/listView.js":46,"./module/markEditor.js":48,"./module/menubar.js":50,"./module/modal.js":52,"./module/notify.js":54,"./module/pager.js":56,"./module/tab.js":58,"./module/tableView.js":60,"./module/treeView.js":62,"./unit/check2.js":65,"./unit/check2Group.js":67,"./unit/checkGroup.js":69,"./unit/datePicker.js":71,"./unit/dateTimePicker.js":73,"./unit/dropdown.js":75,"./unit/gotop.js":77,"./unit/input2.js":79,"./unit/menu.js":81,"./unit/numberInput.js":84,"./unit/progress.js":86,"./unit/radio2Group.js":88,"./unit/radioGroup.js":90,"./unit/select2.js":92,"./unit/suggest.js":94,"./unit/timePicker.js":95,"./unit/treeSelect.js":97,"./unit/uploader.js":99,"regularjs":21}],2:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3]
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(this.smartypants(cap[0]));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/--/g, '\u2014')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){

var env = require('./env.js');
var Lexer = require("./parser/Lexer.js");
var Parser = require("./parser/Parser.js");
var config = require("./config.js");
var _ = require('./util');
var extend = require('./helper/extend.js');
if(env.browser){
var combine = require('./helper/combine.js');
var dom = require("./dom.js");
var walkers = require('./walkers.js');
var Group = require('./group.js');
}
var events = require('./helper/event.js');
var Watcher = require('./helper/watcher.js');
var parse = require('./helper/parse.js');
var filter = require('./helper/filter.js');
var doc = typeof document==='undefined'? {} : document;


/**
* `Regular` is regularjs's NameSpace and BaseClass. Every Component is inherited from it
* 
* @class Regular
* @module Regular
* @constructor
* @param {Object} options specification of the component
*/
var Regular = function(options){
  var prevRunning = env.isRunning;
  env.isRunning = true;
  var node, template;

  options = options || {};
  options.data = options.data || {};
  options.computed = options.computed || {};
  options.events = options.events || {};
  if(this.data) _.extend(options.data, this.data);
  if(this.computed) _.extend(options.computed, this.computed);
  if(this.events) _.extend(options.events, this.events);

  _.extend(this, options, true);
  if(this.$parent){
     this.$parent._append(this);
  }
  this._children = [];
  this.$refs = {};

  template = this.template;

  // template is a string (len < 16). we will find it container first
  if((typeof template === 'string' && template.length < 16) && (node = dom.find(template))) {
    template = node.innerHTML;
  }
  // if template is a xml
  if(template && template.nodeType) template = template.innerHTML;
  if(typeof template === 'string') this.template = new Parser(template).parse();

  this.computed = handleComputed(this.computed);
  this.$root = this.$root || this;
  // if have events
  if(this.events){
    this.$on(this.events);
  }
  if(this.$body){
    this._getTransclude = function(){
      var ctx = this.$parent || this;
      if(this.$body) return ctx.$compile(this.$body, {namespace: options.namespace, outer: this, extra: options.extra})
    }
  }
  this.$emit("$config");
  this.config && this.config(this.data);
  // handle computed
  if(template){
    this.group = this.$compile(this.template, {namespace: options.namespace});
    combine.node(this);
  }


  if(!this.$parent) this.$update();
  this.$ready = true;
  this.$emit("$init");
  if( this.init ) this.init(this.data);

  // @TODO: remove, maybe , there is no need to update after init; 
  // if(this.$root === this) this.$update();
  env.isRunning = prevRunning;

  // children is not required;
}


walkers && (walkers.Regular = Regular);


// description
// -------------------------
// 1. Regular and derived Class use same filter
_.extend(Regular, {
  // private data stuff
  _directives: { __regexp__:[] },
  _plugins: {},
  _protoInheritCache: [ 'directive', 'use'] ,
  __after__: function(supr, o) {

    var template;
    this.__after__ = supr.__after__;

    // use name make the component global.
    if(o.name) Regular.component(o.name, this);
    // this.prototype.template = dom.initTemplate(o)
    if(template = o.template){
      var node, name;
      if( typeof template === 'string' && template.length < 16 && ( node = dom.find( template )) ){
        template = node.innerHTML;
        if(name = dom.attr(node, 'name')) Regular.component(name, this);
      }

      if(template.nodeType) template = template.innerHTML;

      if(typeof template === 'string'){
        this.prototype.template = new Parser(template).parse();
      }
    }

    if(o.computed) this.prototype.computed = handleComputed(o.computed);
    // inherit directive and other config from supr
    Regular._inheritConfig(this, supr);

  },
  /**
   * Define a directive
   *
   * @method directive
   * @return {Object} Copy of ...
   */  
  directive: function(name, cfg){

    if(_.typeOf(name) === "object"){
      for(var k in name){
        if(name.hasOwnProperty(k)) this.directive(k, name[k]);
      }
      return this;
    }
    var type = _.typeOf(name);
    var directives = this._directives, directive;
    if(cfg == null){
      if( type === "string" && (directive = directives[name]) ) return directive;
      else{
        var regexp = directives.__regexp__;
        for(var i = 0, len = regexp.length; i < len ; i++){
          directive = regexp[i];
          var test = directive.regexp.test(name);
          if(test) return directive;
        }
      }
      return undefined;
    }
    if(typeof cfg === 'function') cfg = { link: cfg } 
    if(type === 'string') directives[name] = cfg;
    else if(type === 'regexp'){
      cfg.regexp = name;
      directives.__regexp__.push(cfg)
    }
    return this
  },
  plugin: function(name, fn){
    var plugins = this._plugins;
    if(fn == null) return plugins[name];
    plugins[name] = fn;
    return this;
  },
  use: function(fn){
    if(typeof fn === "string") fn = Regular.plugin(fn);
    if(typeof fn !== "function") return this;
    fn(this, Regular);
    return this;
  },
  // config the Regularjs's global
  config: function(name, value){
    var needGenLexer = false;
    if(typeof name === "object"){
      for(var i in name){
        // if you config
        if( i ==="END" || i==='BEGIN' )  needGenLexer = true;
        config[i] = name[i];
      }
    }
    if(needGenLexer) Lexer.setup();
  },
  expression: parse.expression,
  Parser: Parser,
  Lexer: Lexer,
  _addProtoInheritCache: function(name, transform){
    if( Array.isArray( name ) ){
      return name.forEach(Regular._addProtoInheritCache);
    }
    var cacheKey = "_" + name + "s"
    Regular._protoInheritCache.push(name)
    Regular[cacheKey] = {};
    if(Regular[name]) return;
    Regular[name] = function(key, cfg){
      var cache = this[cacheKey];

      if(typeof key === "object"){
        for(var i in key){
          if(key.hasOwnProperty(i)) this[name](i, key[i]);
        }
        return this;
      }
      if(cfg == null) return cache[key];
      cache[key] = transform? transform(cfg) : cfg;
      return this;
    }
  },
  _inheritConfig: function(self, supr){

    // prototype inherit some Regular property
    // so every Component will have own container to serve directive, filter etc..
    var defs = Regular._protoInheritCache;
    var keys = _.slice(defs);
    keys.forEach(function(key){
      self[key] = supr[key];
      var cacheKey = '_' + key + 's';
      if(supr[cacheKey]) self[cacheKey] = _.createObject(supr[cacheKey]);
    })
    return self;
  }

});

extend(Regular);

Regular._addProtoInheritCache("component")

Regular._addProtoInheritCache("filter", function(cfg){
  return typeof cfg === "function"? {get: cfg}: cfg;
})


events.mixTo(Regular);
Watcher.mixTo(Regular);

Regular.implement({
  init: function(){},
  config: function(){},
  destroy: function(){
    // destroy event wont propgation;
    this.$emit("$destroy");
    this.group && this.group.destroy(true);
    this.group = null;
    this.parentNode = null;
    this._watchers = null;
    this._children = [];
    var parent = this.$parent;
    if(parent){
      var index = parent._children.indexOf(this);
      parent._children.splice(index,1);
    }
    this.$parent = null;
    this.$root = null;
    this._handles = null;
    this.$refs = null;
  },

  /**
   * compile a block ast ; return a group;
   * @param  {Array} parsed ast
   * @param  {[type]} record
   * @return {[type]}
   */
  $compile: function(ast, options){
    options = options || {};
    if(typeof ast === 'string'){
      ast = new Parser(ast).parse()
    }
    var preExt = this.__ext__,
      record = options.record, 
      records;

    if(options.extra) this.__ext__ = options.extra;

    if(record) this._record();
    var group = this._walk(ast, options);
    if(record){
      records = this._release();
      var self = this;
      if(records.length){
        // auto destroy all wather;
        group.ondestroy = function(){ self.$unwatch(records); }
      }
    }
    if(options.extra) this.__ext__ = preExt;
    return group;
  },


  /**
   * create two-way binding with another component;
   * *warn*: 
   *   expr1 and expr2 must can operate set&get, for example: the 'a.b' or 'a[b + 1]' is set-able, but 'a.b + 1' is not, 
   *   beacuse Regular dont know how to inverse set through the expression;
   *   
   *   if before $bind, two component's state is not sync, the component(passed param) will sync with the called component;
   *
   * *example: *
   *
   * ```javascript
   * // in this example, we need to link two pager component
   * var pager = new Pager({}) // pager compoennt
   * var pager2 = new Pager({}) // another pager component
   * pager.$bind(pager2, 'current'); // two way bind throw two component
   * pager.$bind(pager2, 'total');   // 
   * // or just
   * pager.$bind(pager2, {"current": "current", "total": "total"}) 
   * ```
   * 
   * @param  {Regular} component the
   * @param  {String|Expression} expr1     required, self expr1 to operate binding
   * @param  {String|Expression} expr2     optional, other component's expr to bind with, if not passed, the expr2 will use the expr1;
   * @return          this;
   */
  $bind: function(component, expr1, expr2){
    var type = _.typeOf(expr1);
    if( expr1.type === 'expression' || type === 'string' ){
      this._bind(component, expr1, expr2)
    }else if( type === "array" ){ // multiply same path binding through array
      for(var i = 0, len = expr1.length; i < len; i++){
        this._bind(component, expr1[i]);
      }
    }else if(type === "object"){
      for(var i in expr1) if(expr1.hasOwnProperty(i)){
        this._bind(component, i, expr1[i]);
      }
    }
    // digest
    component.$update();
    return this;
  },
  /**
   * unbind one component( see $bind also)
   *
   * unbind will unbind all relation between two component
   * 
   * @param  {Regular} component [description]
   * @return {This}    this
   */
  $unbind: function(){
    // todo
  },
  $inject: function(node, position, options){
    var fragment = combine.node(this);

    if(node === false) {
      if(!this._fragContainer)  this._fragContainer = dom.fragment();
      return this.$inject(this._fragContainer);
    }
    if(typeof node === 'string') node = dom.find(node);
    if(!node) throw 'injected node is not found';
    if(!fragment) return this;
    dom.inject(fragment, node, position);
    this.$emit("$inject", node);
    this.parentNode = Array.isArray(fragment)? fragment[0].parentNode: fragment.parentNode;
    return this;
  },
  $mute: function(isMute){

    isMute = !!isMute;

    var needupdate = isMute === false && this._mute;

    this._mute = !!isMute;

    if(needupdate) this.$update();
    return this;
  },
  // private bind logic
  _bind: function(component, expr1, expr2){

    var self = this;
    // basic binding

    if(!component || !(component instanceof Regular)) throw "$bind() should pass Regular component as first argument";
    if(!expr1) throw "$bind() should  pass as least one expression to bind";

    if(!expr2) expr2 = expr1;

    expr1 = parse.expression( expr1 );
    expr2 = parse.expression( expr2 );

    // set is need to operate setting ;
    if(expr2.set){
      var wid1 = this.$watch( expr1, function(value){
        component.$update(expr2, value)
      });
      component.$on('$destroy', function(){
        self.$unwatch(wid1)
      })
    }
    if(expr1.set){
      var wid2 = component.$watch(expr2, function(value){
        self.$update(expr1, value)
      });
      // when brother destroy, we unlink this watcher
      this.$on('$destroy', component.$unwatch.bind(component,wid2))
    }
    // sync the component's state to called's state
    expr2.set(component, expr1.get(this));
  },
  _walk: function(ast, arg1){
    if( _.typeOf(ast) === 'array' ){
      var res = [];

      for(var i = 0, len = ast.length; i < len; i++){
        res.push( this._walk(ast[i], arg1) );
      }

      return new Group(res);
    }
    if(typeof ast === 'string') return doc.createTextNode(ast)
    return walkers[ast.type || "default"].call(this, ast, arg1);
  },
  _append: function(component){
    this._children.push(component);
    component.$parent = this;
  },
  _handleEvent: function(elem, type, value, attrs){
    var Component = this.constructor,
      fire = typeof value !== "function"? _.handleEvent.call( this, value, type ) : value,
      handler = Component.event(type), destroy;

    if ( handler ) {
      destroy = handler.call(this, elem, fire, attrs);
    } else {
      dom.on(elem, type, fire);
    }
    return handler ? destroy : function() {
      dom.off(elem, type, fire);
    }
  },
  // 1. 用来处理exprBody -> Function
  // 2. list里的循环
  _touchExpr: function(expr){
    var  rawget, ext = this.__ext__, touched = {};
    if(expr.type !== 'expression' || expr.touched) return expr;
    rawget = expr.get || (expr.get = new Function(_.ctxName, _.extName , _.prefix+ "return (" + expr.body + ")"));
    touched.get = !ext? rawget: function(context){
      return rawget(context, ext)
    }

    if(expr.setbody && !expr.set){
      var setbody = expr.setbody;
      expr.set = function(ctx, value, ext){
        expr.set = new Function(_.ctxName, _.setName , _.extName, _.prefix + setbody);          
        return expr.set(ctx, value, ext);
      }
      expr.setbody = null;
    }
    if(expr.set){
      touched.set = !ext? expr.set : function(ctx, value){
        return expr.set(ctx, value, ext);
      }
    }
    _.extend(touched, {
      type: 'expression',
      touched: true,
      once: expr.once || expr.constant
    })
    return touched
  },
  // find filter
  _f_: function(name){
    var Component = this.constructor;
    var filter = Component.filter(name);
    if(!filter) throw 'filter ' + name + ' is undefined';
    return filter;
  },
  // simple accessor get
  _sg_:function(path, defaults, ext){
    if(typeof ext !== 'undefined'){
      // if(path === "demos")  debugger
      var computed = this.computed,
        computedProperty = computed[path];
      if(computedProperty){
        if(computedProperty.type==='expression' && !computedProperty.get) this._touchExpr(computedProperty);
        if(computedProperty.get)  return computedProperty.get(this);
        else _.log("the computed '" + path + "' don't define the get function,  get data."+path + " altnately", "error")
      }
  }
    if(typeof defaults === "undefined" || typeof path == "undefined" ) return undefined;
    return (ext && typeof ext[path] !== 'undefined')? ext[path]: defaults[path];

  },
  // simple accessor set
  _ss_:function(path, value, data , op, computed){
    var computed = this.computed,
      op = op || "=", prev, 
      computedProperty = computed? computed[path]:null;

    if(op !== '='){
      prev = computedProperty? computedProperty.get(this): data[path];
      switch(op){
        case "+=":
          value = prev + value;
          break;
        case "-=":
          value = prev - value;
          break;
        case "*=":
          value = prev * value;
          break;
        case "/=":
          value = prev / value;
          break;
        case "%=":
          value = prev % value;
          break;
      }
    }
    if(computedProperty) {
      if(computedProperty.set) return computedProperty.set(this, value);
      else _.log("the computed '" + path + "' don't define the set function,  assign data."+path + " altnately", "error" )
    }
    data[path] = value;
    return value;
  }
});

Regular.prototype.inject = function(){
  _.log("use $inject instead of inject", "error");
  return this.$inject.apply(this, arguments);
}


// only one builtin filter

Regular.filter(filter);

module.exports = Regular;



var handleComputed = (function(){
  // wrap the computed getter;
  function wrapGet(get){
    return function(context){
      return get.call(context, context.data );
    }
  }
  // wrap the computed setter;
  function wrapSet(set){
    return function(context, value){
      set.call( context, value, context.data );
      return value;
    }
  }

  return function(computed){
    if(!computed) return;
    var parsedComputed = {}, handle, pair, type;
    for(var i in computed){
      handle = computed[i]
      type = typeof handle;

      if(handle.type === 'expression'){
        parsedComputed[i] = handle;
        continue;
      }
      if( type === "string" ){
        parsedComputed[i] = parse.expression(handle)
      }else{
        pair = parsedComputed[i] = {type: 'expression'};
        if(type === "function" ){
          pair.get = wrapGet(handle);
        }else{
          if(handle.get) pair.get = wrapGet(handle.get);
          if(handle.set) pair.set = wrapSet(handle.set);
        }
      } 
    }
    return parsedComputed;
  }
})();

},{"./config.js":4,"./dom.js":9,"./env.js":10,"./group.js":11,"./helper/combine.js":13,"./helper/event.js":15,"./helper/extend.js":16,"./helper/filter.js":17,"./helper/parse.js":18,"./helper/watcher.js":20,"./parser/Lexer.js":23,"./parser/Parser.js":24,"./util":26,"./walkers.js":27}],4:[function(require,module,exports){

module.exports = {
'BEGIN': '{',
'END': '}'
}
},{}],5:[function(require,module,exports){
var // packages
  _ = require("../util.js"),
 animate = require("../helper/animate.js"),
 dom = require("../dom.js"),
 Regular = require("../Regular.js");


var // variables
  rClassName = /^[-\w]+(\s[-\w]+)*$/,
  rCommaSep = /[\r\n\f ]*,[\r\n\f ]*(?=\w+\:)/, //  dont split comma in  Expression
  rStyles = /^\{.*\}$/, //  for Simpilfy
  rSpace = /\s+/, //  for Simpilfy
  WHEN_COMMAND = "when",
  EVENT_COMMAND = "on",
  THEN_COMMAND = "then";

/**
 * Animation Plugin
 * @param {Component} Component 
 */


function createSeed(type){

  var steps = [], current = 0, callback = _.noop;
  var key;

  var out = {
    type: type,
    start: function(cb){
      key = _.uid();
      if(typeof cb === "function") callback = cb;
      if(current> 0 ){
        current = 0 ;
      }else{
        out.step();
      }
      return out.compelete;
    },
    compelete: function(){
      key = null;
      callback && callback();
      callback = _.noop;
      current = 0;
    },
    step: function(){
      if(steps[current]) steps[current ]( out.done.bind(out, key) );
    },
    done: function(pkey){
      if(pkey !== key) return; // means the loop is down
      if( current < steps.length - 1 ) {
        current++;
        out.step();
      }else{
        out.compelete();
      }
    },
    push: function(step){
      steps.push(step)
    }
  }

  return out;
}

Regular._addProtoInheritCache("animation")


// builtin animation
Regular.animation({
  "wait": function( step ){
    var timeout = parseInt( step.param ) || 0
    return function(done){
      // _.log("delay " + timeout)
      setTimeout( done, timeout );
    }
  },
  "class": function(step){
    var tmp = step.param.split(","),
      className = tmp[0] || "",
      mode = parseInt(tmp[1]) || 1;

    return function(done){
      // _.log(className)
      animate.startClassAnimate( step.element, className , done, mode );
    }
  },
  "call": function(step){
    var fn = this.$expression(step.param).get, self = this;
    return function(done){
      // _.log(step.param, 'call')
      fn(self);
      self.$update();
      done()
    }
  },
  "emit": function(step){
    var param = step.param;
    var tmp = param.split(","),
      evt = tmp[0] || "",
      args = tmp[1]? this.$expression(tmp[1]).get: null;

    if(!evt) throw "you shoud specified a eventname in emit command";

    var self = this;
    return function(done){
      self.$emit(evt, args? args(self) : undefined);
      done();
    }
  },
  // style: left {10}px,
  style: function(step){
    var styles = {}, 
      param = step.param,
      pairs = param.split(","), valid;
    pairs.forEach(function(pair){
      pair = pair.trim();
      if(pair){
        var tmp = pair.split( rSpace ),
          name = tmp.shift(),
          value = tmp.join(" ");

        if( !name || !value ) throw "invalid style in command: style";
        styles[name] = value;
        valid = true;
      }
    })

    return function(done){
      if(valid){
        animate.startStyleAnimate(step.element, styles, done);
      }else{
        done();
      }
    }
  }
})



// hancdle the r-animation directive
// el : the element to process
// value: the directive value
function processAnimate( element, value ){
  value = value.trim();

  var composites = value.split(";"), 
    composite, context = this, seeds = [], seed, destroies = [], destroy,
    command, param , current = 0, tmp, animator, self = this;

  function reset( type ){
    seed && seeds.push( seed )
    seed = createSeed( type );
  }

  function whenCallback(start, value){
    if( !!value ) start()
  }

  function animationDestroy(element){
    return function(){
      delete element.onenter;
      delete element.onleave;
    } 
  }

  for( var i = 0, len = composites.length; i < len; i++ ){

    composite = composites[i];
    tmp = composite.split(":");
    command = tmp[0] && tmp[0].trim();
    param = tmp[1] && tmp[1].trim();

    if( !command ) continue;

    if( command === WHEN_COMMAND ){
      reset("when");
      this.$watch(param, whenCallback.bind( this, seed.start ) );
      continue;
    }

    if( command === EVENT_COMMAND){
      reset(param);
      if( param === "leave" ){
        element.onleave = seed.start;
        destroies.push( animationDestroy(element) );
      }else if( param === "enter" ){
        element.onenter = seed.start;
        destroies.push( animationDestroy(element) );
      }else{
        if( ("on" + param) in element){ // if dom have the event , we use dom event
          destroies.push(this._handleEvent( element, param, seed.start ));
        }else{ // otherwise, we use component event
          this.$on(param, seed.start);
          destroies.push(this.$off.bind(this, param, seed.start));
        }
      }
      continue
    }

    var animator =  Regular.animation(command) 
    if( animator && seed ){
      seed.push(
        animator.call(this,{
          element: element,
          done: seed.done,
          param: param 
        })
      )
    }else{
      throw "you need start with `on` or `event` in r-animation";
    }
  }

  if(destroies.length){
    return function(){
      destroies.forEach(function(destroy){
        destroy();
      })
    }
  }
}


Regular.directive( "r-animation", processAnimate)
Regular.directive( "r-sequence", processAnimate)


},{"../Regular.js":3,"../dom.js":9,"../helper/animate.js":12,"../util.js":26}],6:[function(require,module,exports){
// Regular
var _ = require("../util.js");
var dom = require("../dom.js");
var animate = require("../helper/animate.js");
var Regular = require("../Regular.js");



require("./event.js");
require("./form.js");


// **warn**: class inteplation will override this directive 

Regular.directive('r-class', function(elem, value){
  this.$watch(value, function(nvalue){
    var className = ' '+ elem.className.replace(/\s+/g, ' ') +' ';
    for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
      className = className.replace(' ' + i + ' ',' ');
      if(nvalue[i] === true){
        className += i+' ';
      }
    }
    elem.className = className.trim();
  },true);

});

// **warn**: style inteplation will override this directive 

Regular.directive('r-style', function(elem, value){
  this.$watch(value, function(nvalue){
    for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
      dom.css(elem, i, nvalue[i]);
    }
  },true);
});

// when expression is evaluate to true, the elem will add display:none
// Example: <div r-hide={{items.length > 0}}></div>

Regular.directive('r-hide', function(elem, value){
  var preBool = null, compelete;
  this.$watch(value, function(nvalue){
    var bool = !!nvalue;
    if(bool === preBool) return; 
    preBool = bool;
    if(bool){
      if(elem.onleave){
        compelete = elem.onleave(function(){
          elem.style.display = "none"
          compelete = null;
        })
      }else{
        elem.style.display = "none"
      }
      
    }else{
      if(compelete) compelete();
      elem.style.display = "";
      if(elem.onenter){
        elem.onenter();
      }
    }
  });

});

// unescaped inteplation. xss is not be protect
Regular.directive('r-html', function(elem, value){
  this.$watch(value, function(nvalue){
    nvalue = nvalue || "";
    dom.html(elem, nvalue)
  }, {force: true});
});










},{"../Regular.js":3,"../dom.js":9,"../helper/animate.js":12,"../util.js":26,"./event.js":7,"./form.js":8}],7:[function(require,module,exports){
/**
 * event directive  bundle
 *
 */
var _ = require("../util.js");
var dom = require("../dom.js");
var Regular = require("../Regular.js");

Regular._addProtoInheritCache("event");

Regular.event("enter", function(elem, fire) {
  _.log("on-enter will be removed in 0.4.0", "error");
  function update( ev ) {
    if ( ev.which === 13 ) {
      ev.preventDefault();
      fire(ev);
    }
  }
  dom.on( elem, "keypress", update );

  return function() {
    dom.off( elem, "keypress", update );
  }
})


Regular.directive( /^on-\w+$/, function( elem, value, name , attrs) {
  if ( !name || !value ) return;
  var type = name.split("-")[1];
  return this._handleEvent( elem, type, value, attrs );
});
// TODO.
/**
- $('dx').delegate()
*/
Regular.directive( /^delegate-\w+$/, function( elem, value, name, attrs ) {
  var root = this.$root;
  var _delegates = root._delegates || ( root._delegates = {} );
  if ( !name || !value ) return;
  var type = name.split("-")[1];
  var fire = _.handleEvent.call(this, value, type);

  function delegateEvent(ev){
    matchParent(ev, _delegates[type]);
  }

  if( !_delegates[type] ){
    _delegates[type] = [];

    root.$on( "$inject", function( newParent ){
      var preParent = this.parentNode;
      if( preParent ){
        dom.off(preParent, type, delegateEvent);
      }
      dom.on(newParent, type, delegateEvent);
    })

    root.$on("$destroy", function(){
      if(root.parentNode) dom.off(root.parentNode, type, delegateEvent)
      root._delegates[type] = null;
    })
  }
  var delegate = {
    element: elem,
    fire: fire
  }
  _delegates[type].push( delegate );

  return function(){
    var delegates = _delegates[type];
    if(!delegates || !delegates.length) return;
    for( var i = 0, len = delegates.length; i < len; i++ ){
      if( delegates[i] === delegate ) delegates.splice(i, 1);
    }
  }

});


function matchParent(ev , delegates){
  var target = ev.target;
  while(target && target !== dom.doc){
    for( var i = 0, len = delegates.length; i < len; i++ ){
      if(delegates[i].element === target){
        delegates[i].fire(ev);
      }
    }
    target = target.parentNode;
  }
}
},{"../Regular.js":3,"../dom.js":9,"../util.js":26}],8:[function(require,module,exports){
// Regular
var _ = require("../util.js");
var dom = require("../dom.js");
var Regular = require("../Regular.js");

var modelHandlers = {
  "text": initText,
  "select": initSelect,
  "checkbox": initCheckBox,
  "radio": initRadio
}


// @TODO


// two-way binding with r-model
// works on input, textarea, checkbox, radio, select

Regular.directive("r-model", function(elem, value){
  var tag = elem.tagName.toLowerCase();
  var sign = tag;
  if(sign === "input") sign = elem.type || "text";
  else if(sign === "textarea") sign = "text";
  if(typeof value === "string") value = this.$expression(value);

  if( modelHandlers[sign] ) return modelHandlers[sign].call(this, elem, value);
  else if(tag === "input"){
    return modelHandlers.text.call(this, elem, value);
  }
});



// binding <select>

function initSelect( elem, parsed){
  var self = this;
  var wc =this.$watch(parsed, function(newValue){
    var children = _.slice(elem.getElementsByTagName('option'))
    children.forEach(function(node, index){
      if(node.value == newValue){
        elem.selectedIndex = index;
      }
    })
  });

  function handler(){
    parsed.set(self, this.value);
    wc.last = this.value;
    self.$update();
  }

  dom.on(elem, "change", handler);
  
  if(parsed.get(self) === undefined && elem.value){
     parsed.set(self, elem.value);
  }
  return function destroy(){
    dom.off(elem, "change", handler);
  }
}

// input,textarea binding

function initText(elem, parsed){
  var self = this;
  var wc = this.$watch(parsed, function(newValue){
    if(elem.value !== newValue) elem.value = newValue == null? "": "" + newValue;
  });

  // @TODO to fixed event
  var handler = function handler(ev){
    var that = this;
    if(ev.type==='cut' || ev.type==='paste'){
      _.nextTick(function(){
        var value = that.value
        parsed.set(self, value);
        wc.last = value;
        self.$update();
      })
    }else{
        var value = that.value
        parsed.set(self, value);
        wc.last = value;
        self.$update();
    }
  };

  if(dom.msie !== 9 && "oninput" in dom.tNode ){
    elem.addEventListener("input", handler );
  }else{
    dom.on(elem, "paste", handler)
    dom.on(elem, "keyup", handler)
    dom.on(elem, "cut", handler)
    dom.on(elem, "change", handler)
  }
  if(parsed.get(self) === undefined && elem.value){
     parsed.set(self, elem.value);
  }
  return function destroy(){
    if(dom.msie !== 9 && "oninput" in dom.tNode ){
      elem.removeEventListener("input", handler );
    }else{
      dom.off(elem, "paste", handler)
      dom.off(elem, "keyup", handler)
      dom.off(elem, "cut", handler)
      dom.off(elem, "change", handler)
    }
  }
}


// input:checkbox  binding

function initCheckBox(elem, parsed){
  var self = this;
  var watcher = this.$watch(parsed, function(newValue){
    dom.attr(elem, 'checked', !!newValue);
  });

  var handler = function handler(){
    var value = this.checked;
    parsed.set(self, value);
    watcher.last = value;
    self.$update();
  }
  if(parsed.set) dom.on(elem, "change", handler)

  if(parsed.get(self) === undefined){
    parsed.set(self, !!elem.checked);
  }

  return function destroy(){
    if(parsed.set) dom.off(elem, "change", handler)
  }
}


// input:radio binding

function initRadio(elem, parsed){
  var self = this;
  var wc = this.$watch(parsed, function( newValue ){
    if(newValue == elem.value) elem.checked = true;
    else elem.checked = false;
  });


  var handler = function handler(){
    var value = this.value;
    parsed.set(self, value);
    self.$update();
  }
  if(parsed.set) dom.on(elem, "change", handler)
  // beacuse only after compile(init), the dom structrue is exsit. 
  if(parsed.get(self) === undefined){
    if(elem.checked) {
      parsed.set(self, elem.value);
    }
  }

  return function destroy(){
    if(parsed.set) dom.off(elem, "change", handler)
  }
}

},{"../Regular.js":3,"../dom.js":9,"../util.js":26}],9:[function(require,module,exports){

// thanks for angular && mootools for some concise&cross-platform  implemention
// =====================================

// The MIT License
// Copyright (c) 2010-2014 Google, Inc. http://angularjs.org

// ---
// license: MIT-style license. http://mootools.net


var dom = module.exports;
var env = require("./env.js");
var _ = require("./util");
var tNode = document.createElement('div')
var addEvent, removeEvent;
var noop = function(){}

var namespaces = {
  html: "http://www.w3.org/1999/xhtml",
  svg: "http://www.w3.org/2000/svg"
}

dom.body = document.body;

dom.doc = document;

// camelCase
function camelCase(str){
  return ("" + str).replace(/-\D/g, function(match){
    return match.charAt(1).toUpperCase();
  });
}


dom.tNode = tNode;

if(tNode.addEventListener){
  addEvent = function(node, type, fn) {
    node.addEventListener(type, fn, false);
  }
  removeEvent = function(node, type, fn) {
    node.removeEventListener(type, fn, false) 
  }
}else{
  addEvent = function(node, type, fn) {
    node.attachEvent('on' + type, fn);
  }
  removeEvent = function(node, type, fn) {
    node.detachEvent('on' + type, fn); 
  }
}


dom.msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
if (isNaN(dom.msie)) {
  dom.msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
}

dom.find = function(sl){
  if(document.querySelector) {
    try{
      return document.querySelector(sl);
    }catch(e){

    }
  }
  if(sl.indexOf('#')!==-1) return document.getElementById( sl.slice(1) );
}

dom.inject = function(node, refer, position){

  position = position || 'bottom';

  if(Array.isArray(node)){
    var tmp = node;
    node = dom.fragment();
    for(var i = 0,len = tmp.length; i < len ;i++){
      node.appendChild(tmp[i]);
    }
  }

  var firstChild, next;
  switch(position){
    case 'bottom':
      refer.appendChild( node );
      break;
    case 'top':
      if( firstChild = refer.firstChild ){
        refer.insertBefore( node, refer.firstChild );
      }else{
        refer.appendChild( node );
      }
      break;
    case 'after':
      if( next = refer.nextSibling ){
        next.parentNode.insertBefore( node, next );
      }else{
        refer.parentNode.appendChild( node );
      }
      break;
    case 'before':
      refer.parentNode.insertBefore( node, refer );
  }
}


dom.id = function(id){
  return document.getElementById(id);
}

// createElement 
dom.create = function(type, ns, attrs){
  if(ns === 'svg'){
    if(!env.svg) throw Error('the env need svg support')
    ns = namespaces.svg;
  }
  return !ns? document.createElement(type): document.createElementNS(ns, type);
}

// documentFragment
dom.fragment = function(){
  return document.createDocumentFragment();
}



var specialAttr = {
  'class': function(node, value){
    ('className' in node && (node.namespaceURI === namespaces.html || !node.namespaceURI)) ?
      node.className = (value || '') : node.setAttribute('class', value);
  },
  'for': function(node, value){
    ('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
  },
  'style': function(node, value){
    (node.style) ? node.style.cssText = value : node.setAttribute('style', value);
  },
  'value': function(node, value){
    node.value = (value != null) ? value : '';
  }
}


// attribute Setter & Getter
dom.attr = function(node, name, value){
  if (_.isBooleanAttr(name)) {
    if (typeof value !== 'undefined') {
      if (!!value) {
        node[name] = true;
        node.setAttribute(name, name);
        // lt ie7 . the javascript checked setting is in valid
        //http://bytes.com/topic/javascript/insights/799167-browser-quirk-dynamically-appended-checked-checkbox-does-not-appear-checked-ie
        if(dom.msie && dom.msie <=7 ) node.defaultChecked = true
      } else {
        node[name] = false;
        node.removeAttribute(name);
      }
    } else {
      return (node[name] ||
               (node.attributes.getNamedItem(name)|| noop).specified) ? name : undefined;
    }
  } else if (typeof (value) !== 'undefined') {
    // if in specialAttr;
    if(specialAttr[name]) specialAttr[name](node, value);
    else if(value === null) node.removeAttribute(name)
    else node.setAttribute(name, value);
  } else if (node.getAttribute) {
    // the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
    // some elements (e.g. Document) don't have get attribute, so return undefined
    var ret = node.getAttribute(name, 2);
    // normalize non-existing attributes to undefined (as jQuery)
    return ret === null ? undefined : ret;
  }
}


dom.on = function(node, type, handler){
  var types = type.split(' ');
  handler.real = function(ev){
    var $event = new Event(ev);
    $event.origin = node;
    handler.call(node, $event);
  }
  types.forEach(function(type){
    type = fixEventName(node, type);
    addEvent(node, type, handler.real);
  });
}
dom.off = function(node, type, handler){
  var types = type.split(' ');
  handler = handler.real || handler;
  types.forEach(function(type){
    type = fixEventName(node, type);
    removeEvent(node, type, handler);
  })
}


dom.text = (function (){
  var map = {};
  if (dom.msie && dom.msie < 9) {
    map[1] = 'innerText';    
    map[3] = 'nodeValue';    
  } else {
    map[1] = map[3] = 'textContent';
  }
  
  return function (node, value) {
    var textProp = map[node.nodeType];
    if (value == null) {
      return textProp ? node[textProp] : '';
    }
    node[textProp] = value;
  }
})();


dom.html = function( node, html ){
  if(typeof html === "undefined"){
    return node.innerHTML;
  }else{
    node.innerHTML = html;
  }
}

dom.replace = function(node, replaced){
  if(replaced.parentNode) replaced.parentNode.replaceChild(node, replaced);
}

dom.remove = function(node){
  if(node.parentNode) node.parentNode.removeChild(node);
}

// css Settle & Getter from angular
// =================================
// it isnt computed style 
dom.css = function(node, name, value){
  if( _.typeOf(name) === "object" ){
    for(var i in name){
      if( name.hasOwnProperty(i) ){
        dom.css( node, i, name[i] );
      }
    }
    return;
  }
  if ( typeof value !== "undefined" ) {

    name = camelCase(name);
    if(name) node.style[name] = value;

  } else {

    var val;
    if (dom.msie <= 8) {
      // this is some IE specific weirdness that jQuery 1.6.4 does not sure why
      val = node.currentStyle && node.currentStyle[name];
      if (val === '') val = 'auto';
    }
    val = val || node.style[name];
    if (dom.msie <= 8) {
      val = val === '' ? undefined : val;
    }
    return  val;
  }
}

dom.addClass = function(node, className){
  var current = node.className || "";
  if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
    node.className = current? ( current + " " + className ) : className;
  }
}

dom.delClass = function(node, className){
  var current = node.className || "";
  node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
}

dom.hasClass = function(node, className){
  var current = node.className || "";
  return (" " + current + " ").indexOf(" " + className + " ") !== -1;
}



// simple Event wrap

//http://stackoverflow.com/questions/11068196/ie8-ie7-onchange-event-is-emited-only-after-repeated-selection
function fixEventName(elem, name){
  return (name === 'change'  &&  dom.msie < 9 && 
      (elem && elem.tagName && elem.tagName.toLowerCase()==='input' && 
        (elem.type === 'checkbox' || elem.type === 'radio')
      )
    )? 'click': name;
}

var rMouseEvent = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/
var doc = document;
doc = (!doc.compatMode || doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
function Event(ev){
  ev = ev || window.event;
  if(ev._fixed) return ev;
  this.event = ev;
  this.target = ev.target || ev.srcElement;

  var type = this.type = ev.type;
  var button = this.button = ev.button;

  // if is mouse event patch pageX
  if(rMouseEvent.test(type)){ //fix pageX
    this.pageX = (ev.pageX != null) ? ev.pageX : ev.clientX + doc.scrollLeft;
    this.pageY = (ev.pageX != null) ? ev.pageY : ev.clientY + doc.scrollTop;
    if (type === 'mouseover' || type === 'mouseout'){// fix relatedTarget
      var related = ev.relatedTarget || ev[(type === 'mouseover' ? 'from' : 'to') + 'Element'];
      while (related && related.nodeType === 3) related = related.parentNode;
      this.relatedTarget = related;
    }
  }
  // if is mousescroll
  if (type === 'DOMMouseScroll' || type === 'mousewheel'){
    // ff ev.detail: 3    other ev.wheelDelta: -120
    this.wheelDelta = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
  }
  
  // fix which
  this.which = ev.which || ev.keyCode;
  if( !this.which && button !== undefined){
    // http://api.jquery.com/event.which/ use which
    this.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
  }
  this._fixed = true;
}

_.extend(Event.prototype, {
  immediateStop: _.isFalse,
  stop: function(){
    this.preventDefault().stopPropagation();
  },
  preventDefault: function(){
    if (this.event.preventDefault) this.event.preventDefault();
    else this.event.returnValue = false;
    return this;
  },
  stopPropagation: function(){
    if (this.event.stopPropagation) this.event.stopPropagation();
    else this.event.cancelBubble = true;
    return this;
  },
  stopImmediatePropagation: function(){
    if(this.event.stopImmediatePropagation) this.event.stopImmediatePropagation();
  }
})


dom.nextFrame = (function(){
    var request = window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame|| 
                  function(callback){
                    setTimeout(callback, 16)
                  }

    var cancel = window.cancelAnimationFrame ||
                 window.webkitCancelAnimationFrame ||
                 window.mozCancelAnimationFrame ||
                 window.webkitCancelRequestAnimationFrame ||
                 function(tid){
                    clearTimeout(tid)
                 }
  
  return function(callback){
    var id = request(callback);
    return function(){ cancel(id); }
  }
})();

// 3ks for angular's raf  service
var k;
dom.nextReflow = function(callback){
  dom.nextFrame(function(){
    k = document.body.offsetWidth;
    callback();
  })
}




},{"./env.js":10,"./util":26}],10:[function(require,module,exports){
// some fixture test;
// ---------------
var _ = require('./util');
exports.svg = (function(){
  return typeof document !== "undefined" && document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
})();


exports.browser = typeof document !== "undefined" && document.nodeType;
// whether have component in initializing
exports.exprCache = _.cache(1000);
exports.isRunning = false;

},{"./util":26}],11:[function(require,module,exports){
var _ = require('./util');
var combine = require('./helper/combine')

function Group(list){
  this.children = list || [];
}


_.extend(Group.prototype, {
  destroy: function(first){
    combine.destroy(this.children, first);
    if(this.ondestroy) this.ondestroy();
    this.children = null;
  },
  get: function(i){
    return this.children[i]
  },
  push: function(item){
    this.children.push( item );
  }

})



module.exports = Group;



},{"./helper/combine":13,"./util":26}],12:[function(require,module,exports){
var _ = require("../util");
var dom  = require("../dom.js");
var animate = {};
var env = require("../env.js");


var 
  transitionEnd = 'transitionend', 
  animationEnd = 'animationend', 
  transitionProperty = 'transition', 
  animationProperty = 'animation';

if(!('ontransitionend' in window)){
  if('onwebkittransitionend' in window) {
    
    // Chrome/Saf (+ Mobile Saf)/Android
    transitionEnd += ' webkitTransitionEnd';
    transitionProperty = 'webkitTransition'
  } else if('onotransitionend' in dom.tNode || navigator.appName === 'Opera') {

    // Opera
    transitionEnd += ' oTransitionEnd';
    transitionProperty = 'oTransition';
  }
}
if(!('onanimationend' in window)){
  if ('onwebkitanimationend' in window){
    // Chrome/Saf (+ Mobile Saf)/Android
    animationEnd += ' webkitAnimationEnd';
    animationProperty = 'webkitAnimation';

  }else if ('onoanimationend' in dom.tNode){
    // Opera
    animationEnd += ' oAnimationEnd';
    animationProperty = 'oAnimation';
  }
}

/**
 * inject node with animation
 * @param  {[type]} node      [description]
 * @param  {[type]} refer     [description]
 * @param  {[type]} direction [description]
 * @return {[type]}           [description]
 */
animate.inject = function( node, refer ,direction, callback ){
  callback = callback || _.noop;
  if( Array.isArray(node) ){
    var fragment = dom.fragment();
    var count=0;

    for(var i = 0,len = node.length;i < len; i++ ){
      fragment.appendChild(node[i]); 
    }
    dom.inject(fragment, refer, direction);

    // if all nodes is done, we call the callback
    var enterCallback = function (){
      count++;
      if( count === len ) callback();
    }
    if(len === count) callback();
    for( i = 0; i < len; i++ ){
      if(node[i].onenter){
        node[i].onenter(enterCallback);
      }else{
        enterCallback();
      }
    }
  }else{
    dom.inject( node, refer, direction );
    if(node.onenter){
      node.onenter(callback)
    }else{
      callback();
    }
  }
}

/**
 * remove node with animation
 * @param  {[type]}   node     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
animate.remove = function(node, callback){
  if(node.onleave){
    node.onleave(function(){
      removeDone(node, callback)
    })
  }else{
    removeDone(node, callback)
  }
}

var removeDone = function (node, callback){
    dom.remove(node);
    callback && callback();
}



animate.startClassAnimate = function ( node, className,  callback, mode ){
  var activeClassName, timeout, tid, onceAnim;
  if( (!animationEnd && !transitionEnd) || env.isRunning ){
    return callback();
  }

  onceAnim = _.once(function onAnimateEnd(){
    if(tid) clearTimeout(tid);

    if(mode === 2) {
      dom.delClass(node, activeClassName);
    }
    if(mode !== 3){ // mode hold the class
      dom.delClass(node, className);
    }
    dom.off(node, animationEnd, onceAnim)
    dom.off(node, transitionEnd, onceAnim)

    callback();

  });
  if(mode === 2){ // auto removed
    dom.addClass( node, className );

    activeClassName = className.split(/\s+/).map(function(name){
       return name + '-active';
    }).join(" ");

    dom.nextReflow(function(){
      dom.addClass( node, activeClassName );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });

  }else{

    dom.nextReflow(function(){
      dom.addClass( node, className );
      timeout = getMaxTimeout( node );
      tid = setTimeout( onceAnim, timeout );
    });

  }


  dom.on( node, animationEnd, onceAnim )
  dom.on( node, transitionEnd, onceAnim )
  return onceAnim;
}


animate.startStyleAnimate = function(node, styles, callback){
  var timeout, onceAnim, tid;

  dom.nextReflow(function(){
    dom.css( node, styles );
    timeout = getMaxTimeout( node );
    tid = setTimeout( onceAnim, timeout );
  });


  onceAnim = _.once(function onAnimateEnd(){
    if(tid) clearTimeout(tid);

    dom.off(node, animationEnd, onceAnim)
    dom.off(node, transitionEnd, onceAnim)

    callback();

  });

  dom.on( node, animationEnd, onceAnim )
  dom.on( node, transitionEnd, onceAnim )

  return onceAnim;
}


/**
 * get maxtimeout
 * @param  {Node} node 
 * @return {[type]}   [description]
 */
function getMaxTimeout(node){
  var timeout = 0,
    tDuration = 0,
    tDelay = 0,
    aDuration = 0,
    aDelay = 0,
    ratio = 5 / 3,
    styles ;

  if(window.getComputedStyle){

    styles = window.getComputedStyle(node),
    tDuration = getMaxTime( styles[transitionProperty + 'Duration']) || tDuration;
    tDelay = getMaxTime( styles[transitionProperty + 'Delay']) || tDelay;
    aDuration = getMaxTime( styles[animationProperty + 'Duration']) || aDuration;
    aDelay = getMaxTime( styles[animationProperty + 'Delay']) || aDelay;
    timeout = Math.max( tDuration+tDelay, aDuration + aDelay );

  }
  return timeout * 1000 * ratio;
}

function getMaxTime(str){

  var maxTimeout = 0, time;

  if(!str) return 0;

  str.split(",").forEach(function(str){

    time = parseFloat(str);
    if( time > maxTimeout ) maxTimeout = time;

  });

  return maxTimeout;
}

module.exports = animate;
},{"../dom.js":9,"../env.js":10,"../util":26}],13:[function(require,module,exports){
// some nested  operation in ast 
// --------------------------------

var dom = require("../dom.js");

var combine = module.exports = {

  // get the initial dom in object
  node: function(item){
    var children,node;
    if(item.element) return item.element;
    if(typeof item.node === "function") return item.node();
    if(typeof item.nodeType === "number") return item;
    if(item.group) return combine.node(item.group)
    if(children = item.children){
      if(children.length === 1){
        
        return combine.node(children[0]);
      }
      var nodes = [];
      for(var i = 0, len = children.length; i < len; i++ ){
        node = combine.node(children[i]);
        if(Array.isArray(node)){
          nodes.push.apply(nodes, node)
        }else{
          nodes.push(node)
        }
      }
      return nodes;
    }
  },

  // get the last dom in object(for insertion operation)
  last: function(item){
    var children = item.children;

    if(typeof item.last === "function") return item.last();
    if(typeof item.nodeType === "number") return item;

    if(children && children.length) return combine.last(children[children.length - 1]);
    if(item.group) return combine.last(item.group);

  },

  destroy: function(item, first){
    if(!item) return;
    if(Array.isArray(item)){
      for(var i = 0, len = item.length; i < len; i++ ){
        combine.destroy(item[i], first);
      }
    }
    var children = item.children;
    if(typeof item.destroy === "function") return item.destroy(first);
    if(typeof item.nodeType === "number" && first)  dom.remove(item);
    if(children && children.length){
      combine.destroy(children, true);
      item.children = null;
    }
  }

}
},{"../dom.js":9}],14:[function(require,module,exports){
// http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
var entities = {
  'quot':34, 
  'amp':38, 
  'apos':39, 
  'lt':60, 
  'gt':62, 
  'nbsp':160, 
  'iexcl':161, 
  'cent':162, 
  'pound':163, 
  'curren':164, 
  'yen':165, 
  'brvbar':166, 
  'sect':167, 
  'uml':168, 
  'copy':169, 
  'ordf':170, 
  'laquo':171, 
  'not':172, 
  'shy':173, 
  'reg':174, 
  'macr':175, 
  'deg':176, 
  'plusmn':177, 
  'sup2':178, 
  'sup3':179, 
  'acute':180, 
  'micro':181, 
  'para':182, 
  'middot':183, 
  'cedil':184, 
  'sup1':185, 
  'ordm':186, 
  'raquo':187, 
  'frac14':188, 
  'frac12':189, 
  'frac34':190, 
  'iquest':191, 
  'Agrave':192, 
  'Aacute':193, 
  'Acirc':194, 
  'Atilde':195, 
  'Auml':196, 
  'Aring':197, 
  'AElig':198, 
  'Ccedil':199, 
  'Egrave':200, 
  'Eacute':201, 
  'Ecirc':202, 
  'Euml':203, 
  'Igrave':204, 
  'Iacute':205, 
  'Icirc':206, 
  'Iuml':207, 
  'ETH':208, 
  'Ntilde':209, 
  'Ograve':210, 
  'Oacute':211, 
  'Ocirc':212, 
  'Otilde':213, 
  'Ouml':214, 
  'times':215, 
  'Oslash':216, 
  'Ugrave':217, 
  'Uacute':218, 
  'Ucirc':219, 
  'Uuml':220, 
  'Yacute':221, 
  'THORN':222, 
  'szlig':223, 
  'agrave':224, 
  'aacute':225, 
  'acirc':226, 
  'atilde':227, 
  'auml':228, 
  'aring':229, 
  'aelig':230, 
  'ccedil':231, 
  'egrave':232, 
  'eacute':233, 
  'ecirc':234, 
  'euml':235, 
  'igrave':236, 
  'iacute':237, 
  'icirc':238, 
  'iuml':239, 
  'eth':240, 
  'ntilde':241, 
  'ograve':242, 
  'oacute':243, 
  'ocirc':244, 
  'otilde':245, 
  'ouml':246, 
  'divide':247, 
  'oslash':248, 
  'ugrave':249, 
  'uacute':250, 
  'ucirc':251, 
  'uuml':252, 
  'yacute':253, 
  'thorn':254, 
  'yuml':255, 
  'fnof':402, 
  'Alpha':913, 
  'Beta':914, 
  'Gamma':915, 
  'Delta':916, 
  'Epsilon':917, 
  'Zeta':918, 
  'Eta':919, 
  'Theta':920, 
  'Iota':921, 
  'Kappa':922, 
  'Lambda':923, 
  'Mu':924, 
  'Nu':925, 
  'Xi':926, 
  'Omicron':927, 
  'Pi':928, 
  'Rho':929, 
  'Sigma':931, 
  'Tau':932, 
  'Upsilon':933, 
  'Phi':934, 
  'Chi':935, 
  'Psi':936, 
  'Omega':937, 
  'alpha':945, 
  'beta':946, 
  'gamma':947, 
  'delta':948, 
  'epsilon':949, 
  'zeta':950, 
  'eta':951, 
  'theta':952, 
  'iota':953, 
  'kappa':954, 
  'lambda':955, 
  'mu':956, 
  'nu':957, 
  'xi':958, 
  'omicron':959, 
  'pi':960, 
  'rho':961, 
  'sigmaf':962, 
  'sigma':963, 
  'tau':964, 
  'upsilon':965, 
  'phi':966, 
  'chi':967, 
  'psi':968, 
  'omega':969, 
  'thetasym':977, 
  'upsih':978, 
  'piv':982, 
  'bull':8226, 
  'hellip':8230, 
  'prime':8242, 
  'Prime':8243, 
  'oline':8254, 
  'frasl':8260, 
  'weierp':8472, 
  'image':8465, 
  'real':8476, 
  'trade':8482, 
  'alefsym':8501, 
  'larr':8592, 
  'uarr':8593, 
  'rarr':8594, 
  'darr':8595, 
  'harr':8596, 
  'crarr':8629, 
  'lArr':8656, 
  'uArr':8657, 
  'rArr':8658, 
  'dArr':8659, 
  'hArr':8660, 
  'forall':8704, 
  'part':8706, 
  'exist':8707, 
  'empty':8709, 
  'nabla':8711, 
  'isin':8712, 
  'notin':8713, 
  'ni':8715, 
  'prod':8719, 
  'sum':8721, 
  'minus':8722, 
  'lowast':8727, 
  'radic':8730, 
  'prop':8733, 
  'infin':8734, 
  'ang':8736, 
  'and':8743, 
  'or':8744, 
  'cap':8745, 
  'cup':8746, 
  'int':8747, 
  'there4':8756, 
  'sim':8764, 
  'cong':8773, 
  'asymp':8776, 
  'ne':8800, 
  'equiv':8801, 
  'le':8804, 
  'ge':8805, 
  'sub':8834, 
  'sup':8835, 
  'nsub':8836, 
  'sube':8838, 
  'supe':8839, 
  'oplus':8853, 
  'otimes':8855, 
  'perp':8869, 
  'sdot':8901, 
  'lceil':8968, 
  'rceil':8969, 
  'lfloor':8970, 
  'rfloor':8971, 
  'lang':9001, 
  'rang':9002, 
  'loz':9674, 
  'spades':9824, 
  'clubs':9827, 
  'hearts':9829, 
  'diams':9830, 
  'OElig':338, 
  'oelig':339, 
  'Scaron':352, 
  'scaron':353, 
  'Yuml':376, 
  'circ':710, 
  'tilde':732, 
  'ensp':8194, 
  'emsp':8195, 
  'thinsp':8201, 
  'zwnj':8204, 
  'zwj':8205, 
  'lrm':8206, 
  'rlm':8207, 
  'ndash':8211, 
  'mdash':8212, 
  'lsquo':8216, 
  'rsquo':8217, 
  'sbquo':8218, 
  'ldquo':8220, 
  'rdquo':8221, 
  'bdquo':8222, 
  'dagger':8224, 
  'Dagger':8225, 
  'permil':8240, 
  'lsaquo':8249, 
  'rsaquo':8250, 
  'euro':8364
}



module.exports  = entities;
},{}],15:[function(require,module,exports){
// simplest event emitter 60 lines
// ===============================
var slice = [].slice, _ = require("../util.js");
var API = {
    $on: function(event, fn) {
        if(typeof event === "object"){
            for (var i in event) {
                this.$on(i, event[i]);
            }
        }else{
            // @patch: for list
            var context = this;
            var handles = context._handles || (context._handles = {}),
                calls = handles[event] || (handles[event] = []);
            calls.push(fn);
        }
        return this;
    },
    $off: function(event, fn) {
        var context = this;
        if(!context._handles) return;
        if(!event) this._handles = {};
        var handles = context._handles,
            calls;

        if (calls = handles[event]) {
            if (!fn) {
                handles[event] = [];
                return context;
            }
            for (var i = 0, len = calls.length; i < len; i++) {
                if (fn === calls[i]) {
                    calls.splice(i, 1);
                    return context;
                }
            }
        }
        return context;
    },
    // bubble event
    $emit: function(event){
        // @patch: for list
        var context = this;
        var handles = context._handles, calls, args, type;
        if(!event) return;
        var args = slice.call(arguments, 1);
        var type = event;

        if(!handles) return context;
        if(calls = handles[type.slice(1)]){
            for (var j = 0, len = calls.length; j < len; j++) {
                calls[j].apply(context, args)
            }
        }
        if (!(calls = handles[type])) return context;
        for (var i = 0, len = calls.length; i < len; i++) {
            calls[i].apply(context, args)
        }
        // if(calls.length) context.$update();
        return context;
    },
    // capture  event
    $broadcast: function(){
        
    }
}
// container class
function Event() {
  if (arguments.length) this.$on.apply(this, arguments);
}
_.extend(Event.prototype, API)

Event.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  _.extend(obj, API)
}
module.exports = Event;
},{"../util.js":26}],16:[function(require,module,exports){
// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org

// klass: a classical JS OOP façade
// https://github.com/ded/klass
// License MIT (c) Dustin Diaz 2014
  
// inspired by backbone's extend and klass
var _ = require("../util.js"),
  fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
  isFn = function(o){return typeof o === "function"};


function wrap(k, fn, supro) {
  return function () {
    var tmp = this.supr;
    this.supr = supro[k];
    var ret = fn.apply(this, arguments);
    this.supr = tmp;
    return ret;
  }
}

function process( what, o, supro ) {
  for ( var k in o ) {
    if (o.hasOwnProperty(k)) {

      what[k] = isFn( o[k] ) && isFn( supro[k] ) && 
        fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
    }
  }
}

// if the property is ["events", "data", "computed"] , we should merge them
var merged = ["events", "data", "computed"], mlen = merged.length;
module.exports = function extend(o){
  o = o || {};
  var supr = this, proto,
    supro = supr && supr.prototype || {};

  if(typeof o === 'function'){
    proto = o.prototype;
    o.implement = implement;
    o.extend = extend;
    return o;
  } 
  
  function fn() {
    supr.apply(this, arguments);
  }

  proto = _.createProto(fn, supro);

  function implement(o){
    // we need merge the merged property
    var len = mlen;
    for(;len--;){
      var prop = merged[len];
      if(o.hasOwnProperty(prop) && proto.hasOwnProperty(prop)){
        _.extend(proto[prop], o[prop], true) 
        delete o[prop];
      }
    }


    process(proto, o, supro); 
    return this;
  }



  fn.implement = implement
  fn.implement(o)
  if(supr.__after__) supr.__after__.call(fn, supr, o);
  fn.extend = extend;
  return fn;
}


},{"../util.js":26}],17:[function(require,module,exports){

var f = module.exports = {};

// json:  two way 
//  - get: JSON.stringify
//  - set: JSON.parse
//  - example: `{ title|json }`
f.json = {
  get: function( value ){
    return typeof JSON !== 'undefined'? JSON.stringify(value): value;
  },
  set: function( value ){
    return typeof JSON !== 'undefined'? JSON.parse(value) : value;
  }
}

// last: one-way
//  - get: return the last item in list
//  - example: `{ list|last }`
f.last = function(arr){
  return arr && arr[arr.length - 1];
}

// average: one-way
//  - get: copute the average of the list
//  - example: `{ list| average: "score" }`
f.average = function(array, key){
  array = array || [];
  return array.length? f.total(array, key)/ array.length : 0;
}


// total: one-way
//  - get: copute the total of the list
//  - example: `{ list| average: "score" }`
f.total = function(array, key){
  var total = 0;
  if(!array) return;
  array.forEach(function( item ){
    total += key? item[key] : item;
  })
  return total;
}

// var basicSortFn = function(a, b){return b - a}

// f.sort = function(array, key, reverse){
//   var type = typeof key, sortFn; 
//   switch(type){
//     case 'function': sortFn = key; break;
//     case 'string': sortFn = function(a, b){};break;
//     default:
//       sortFn = basicSortFn;
//   }
//   // need other refernce.
//   return array.slice().sort(function(a,b){
//     return reverse? -sortFn(a, b): sortFn(a, b);
//   })
//   return array
// }



},{}],18:[function(require,module,exports){
var exprCache = require('../env').exprCache;
var _ = require("../util");
var Parser = require("../parser/Parser.js");
module.exports = {
  expression: function(expr, simple){
    // @TODO cache
    if( typeof expr === 'string' && ( expr = expr.trim() ) ){
      expr = exprCache.get( expr ) || exprCache.set( expr, new Parser( expr, { mode: 2, expression: true } ).expression() )
    }
    if(expr) return expr;
  },
  parse: function(template){
    return new Parser(template).parse();
  }
}


},{"../env":10,"../parser/Parser.js":24,"../util":26}],19:[function(require,module,exports){
// shim for es5
var slice = [].slice;
var tstr = ({}).toString;

function extend(o1, o2 ){
  for(var i in o2) if( o1[i] === undefined){
    o1[i] = o2[i]
  }
}

// String proto ;
extend(String.prototype, {
  trim: function(){
    return this.replace(/^\s+|\s+$/g, '');
  }
});


// Array proto;
extend(Array.prototype, {
  indexOf: function(obj, from){
    from = from || 0;
    for (var i = from, len = this.length; i < len; i++) {
      if (this[i] === obj) return i;
    }
    return -1;
  },
  forEach: function(callback, context){
    for (var i = 0, len = this.length; i < len; i++) {
      callback.call(context, this[i], i, this);
    }
  },
  filter: function(callback, context){
    var res = [];
    for (var i = 0, length = this.length; i < length; i++) {
      var pass = callback.call(context, this[i], i, this);
      if(pass) res.push(this[i]);
    }
    return res;
  },
  map: function(callback, context){
    var res = [];
    for (var i = 0, length = this.length; i < length; i++) {
      res.push(callback.call(context, this[i], i, this));
    }
    return res;
  }
});

// Function proto;
extend(Function.prototype, {
  bind: function(context){
    var fn = this;
    var preArgs = slice.call(arguments, 1);
    return function(){
      var args = preArgs.concat(slice.call(arguments));
      return fn.apply(context, args);
    }
  }
})

// Object
extend(Object, {
  keys: function(obj){
    var keys = [];
    for(var i in obj) if(obj.hasOwnProperty(i)){
      keys.push(i);
    }
    return keys;
  } 
})

// Date
extend(Date, {
  now: function(){
    return +new Date;
  }
})
// Array
extend(Array, {
  isArray: function(arr){
    return tstr.call(arr) === "[object Array]";
  }
})

},{}],20:[function(require,module,exports){
var _ = require('../util.js');
var parseExpression = require('./parse.js').expression;


function Watcher(){}

var methods = {
  $watch: function(expr, fn, options){
    var get, once, test, rlen, extra = this.__ext__; //records length
    if(!this._watchers) this._watchers = [];

    options = options || {};
    if(options === true){
       options = { deep: true }
    }
    var uid = _.uid('w_');
    if(Array.isArray(expr)){
      var tests = [];
      for(var i = 0,len = expr.length; i < len; i++){
          tests.push(this.$expression(expr[i]).get)
      }
      var prev = [];
      test = function(context){
        var equal = true;
        for(var i =0, len = tests.length; i < len; i++){
          var splice = tests[i](context, extra);
          if(!_.equals(splice, prev[i])){
             equal = false;
             prev[i] = _.clone(splice);
          }
        }
        return equal? false: prev;
      }
    }else{
      expr = this._touchExpr( parseExpression(expr) );
      get = expr.get;
      once = expr.once;
    }

    var watcher = {
      id: uid, 
      get: get, 
      fn: fn, 
      once: once, 
      force: options.force,
      test: test,
      deep: options.deep,
      last: options.sync? get(this): undefined
    }
    
    this._watchers.push( watcher );

    rlen = this._records && this._records.length;
    if(rlen) this._records[rlen-1].push(uid)
    // init state.
    if(options.init === true){
      this.$phase = 'digest';
      this._checkSingleWatch( watcher, this._watchers.length-1 );
      this.$phase = null;
    }
    return watcher;
  },
  $unwatch: function(uid){
    uid = uid.uid || uid;
    if(!this._watchers) this._watchers = [];
    if(Array.isArray(uid)){
      for(var i =0, len = uid.length; i < len; i++){
        this.$unwatch(uid[i]);
      }
    }else{
      var watchers = this._watchers, watcher, wlen;
      if(!uid || !watchers || !(wlen = watchers.length)) return;
      for(;wlen--;){
        watcher = watchers[wlen];
        if(watcher && watcher.id === uid ){
          watchers.splice(wlen, 1);
        }
      }
    }
  },
  $expression: function(value){
    return this._touchExpr(parseExpression(value))
  },
  /**
   * the whole digest loop ,just like angular, it just a dirty-check loop;
   * @param  {String} path  now regular process a pure dirty-check loop, but in parse phase, 
   *                  Regular's parser extract the dependencies, in future maybe it will change to dirty-check combine with path-aware update;
   * @return {Void}   
   */

  $digest: function(){
    if(this.$phase === 'digest' || this._mute) return;
    this.$phase = 'digest';
    var dirty = false, n =0;
    while(dirty = this._digest()){

      if((++n) > 20){ // max loop
        throw 'there may a circular dependencies reaches' 
      }
    }
    if( n > 0 && this.$emit) this.$emit("$update");
    this.$phase = null;
  },
  // private digest logic
  _digest: function(){
    // if(this.context) return this.context.$digest();
    // if(this.$emit) this.$emit('digest');
    var watchers = this._watchers;
    var dirty = false, children, watcher, watcherDirty;
    if(watchers && watchers.length){
      for(var i = 0, len = watchers.length;i < len; i++){
        watcher = watchers[i];
        watcherDirty = this._checkSingleWatch(watcher, i);
        if(watcherDirty) dirty = true;
      }
    }
    // check children's dirty.
    children = this._children;
    if(children && children.length){
      for(var m = 0, mlen = children.length; m < mlen; m++){
        if(children[m]._digest()) dirty = true;
      }
    }
    return dirty;
  },
  // check a single one watcher 
  _checkSingleWatch: function(watcher, i){
    var dirty = false;
    if(!watcher) return;
    if(watcher.test) { //multi 
      var result = watcher.test(this);
      if(result){
        dirty = true;
        watcher.fn.apply(this, result)
      }
    }else{

      var now = watcher.get(this);
      var last = watcher.last;
      var eq = true;

      if(_.typeOf( now ) === 'object' && watcher.deep){
        if(!watcher.last){
           eq = false;
         }else{
          for(var j in now){
            if(watcher.last[j] !== now[j]){
              eq = false;
              break;
            }
          }
          if(eq !== false){
            for(var n in last){
              if(last[n] !== now[n]){
                eq = false;
                break;
              }
            }
          }
        }
      }else{
        eq = _.equals(now, watcher.last);
      }
      if(eq === false || watcher.force){ // in some case. if undefined, we must force digest.
        eq = false;
        watcher.force = null;
        dirty = true;
        watcher.fn.call(this, now, watcher.last);
        if(typeof now !== 'object'|| watcher.deep){
          watcher.last = _.clone(now);
        }else{
          watcher.last = now;
        }
      }else{ // if eq == true
        if( _.typeOf(eq) === 'array' && eq.length ){
          watcher.last = _.clone(now);
          watcher.fn.call(this, now, eq);
          dirty = true;
        }else{
          eq = true;
        }
      }
      // @TODO
      if(dirty && watcher.once) this._watchers.splice(i, 1);

      return dirty;
    }
  },

  /**
   * **tips**: whatever param you passed in $update, after the function called, dirty-check(digest) phase will enter;
   * 
   * @param  {Function|String|Expression} path  
   * @param  {Whatever} value optional, when path is Function, the value is ignored
   * @return {this}     this 
   */
  $set: function(path, value){
    if(path != null){
      var type = _.typeOf(path);
      if( type === 'string' || path.type === 'expression' ){
        path = this.$expression(path);
        path.set(this, value);
      }else if(type === 'function'){
        path.call(this, this.data);
      }else{
        for(var i in path) {
          this.$set(i, path[i])
        }
      }
    }
  },
  $get: function(expr)  {
    return this.$expression(expr).get(this);
  },
  $update: function(){
    this.$set.apply(this, arguments);
    var rootParent = this;

    do{
      if(rootParent.data.isolate || !rootParent.$parent) break;
      rootParent = rootParent.$parent;
    } while(rootParent)

    rootParent.$digest();
  },
  // auto collect watchers for logic-control.
  _record: function(){
    if(!this._records) this._records = [];
    this._records.push([]);
  },
  _release: function(){
    return this._records.pop();
  }
}


_.extend(Watcher.prototype, methods)


Watcher.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  return _.extend(obj, methods)
}

module.exports = Watcher;
},{"../util.js":26,"./parse.js":18}],21:[function(require,module,exports){
var env =  require("./env.js");
var config = require("./config"); 
var Regular = module.exports = require("./Regular.js");
var Parser = Regular.Parser;
var Lexer = Regular.Lexer;

if(env.browser){
    require("./directive/base.js");
    require("./directive/animation.js");
    require("./module/timeout.js");
    Regular.dom = require("./dom.js");
}
Regular.env = env;
Regular.util = require("./util.js");
Regular.parse = function(str, options){
  options = options || {};

  if(options.BEGIN || options.END){
    if(options.BEGIN) config.BEGIN = options.BEGIN;
    if(options.END) config.END = options.END;
    Lexer.setup();
  }
  var ast = new Parser(str).parse();
  return !options.stringify? ast : JSON.stringify(ast);
}


},{"./Regular.js":3,"./config":4,"./directive/animation.js":5,"./directive/base.js":6,"./dom.js":9,"./env.js":10,"./module/timeout.js":22,"./util.js":26}],22:[function(require,module,exports){
var Regular = require("../Regular.js");

/**
 * Timeout Module
 * @param {Component} Component 
 */
function TimeoutModule(Component){

  Component.implement({
    /**
     * just like setTimeout, but will enter digest automately
     * @param  {Function} fn    
     * @param  {Number}   delay 
     * @return {Number}   timeoutid
     */
    $timeout: function(fn, delay){
      delay = delay || 0;
      return setTimeout(function(){
        fn.call(this);
        this.$update(); //enter digest
      }.bind(this), delay);
    },
    /**
     * just like setInterval, but will enter digest automately
     * @param  {Function} fn    
     * @param  {Number}   interval 
     * @return {Number}   intervalid
     */
    $interval: function(fn, interval){
      interval = interval || 1000/60;
      return setInterval(function(){
        fn.call(this);
        this.$update(); //enter digest
      }.bind(this), interval);
    }
  });
}


Regular.plugin('timeout', TimeoutModule);
Regular.plugin('$timeout', TimeoutModule);
},{"../Regular.js":3}],23:[function(require,module,exports){
var _ = require("../util.js");
var config = require("../config.js");

// some custom tag  will conflict with the Lexer progress
var conflictTag = {"}": "{", "]": "["}, map1, map2;
// some macro for lexer
var macro = {
  'NAME': /(?:[:_A-Za-z][-\.:_0-9A-Za-z]*)/,
  'IDENT': /[\$_A-Za-z][_0-9A-Za-z\$]*/,
  'SPACE': /[\r\n\f ]/
}


var test = /a|(b)/.exec("a");
var testSubCapure = test && test[1] === undefined? 
  function(str){ return str !== undefined }
  :function(str){return !!str};

function wrapHander(handler){
  return function(all){
    return {type: handler, value: all }
  }
}

function Lexer(input, opts){
  if(conflictTag[config.END]){
    this.markStart = conflictTag[config.END];
    this.markEnd = config.END;
  }

  this.input = (input||"").trim();
  this.opts = opts || {};
  this.map = this.opts.mode !== 2?  map1: map2;
  this.states = ["INIT"];
  if(opts && opts.expression){
     this.states.push("JST");
     this.expression = true;
  }
}

var lo = Lexer.prototype


lo.lex = function(str){
  str = (str || this.input).trim();
  var tokens = [], split, test,mlen, token, state;
  this.input = str, 
  this.marks = 0;
  // init the pos index
  this.index=0;
  var i = 0;
  while(str){
    i++
    state = this.state();
    split = this.map[state] 
    test = split.TRUNK.exec(str);
    if(!test){
      this.error('Unrecoginized Token');
    }
    mlen = test[0].length;
    str = str.slice(mlen)
    token = this._process.call(this, test, split, str)
    if(token) tokens.push(token)
    this.index += mlen;
    // if(state == 'TAG' || state == 'JST') str = this.skipspace(str);
  }

  tokens.push({type: 'EOF'});

  return tokens;
}

lo.error = function(msg){
  throw "Parse Error: " + msg +  ':\n' + _.trackErrorPos(this.input, this.index);
}

lo._process = function(args, split,str){
  // console.log(args.join(","), this.state())
  var links = split.links, marched = false, token;

  for(var len = links.length, i=0;i<len ;i++){
    var link = links[i],
      handler = link[2],
      index = link[0];
    // if(args[6] === '>' && index === 6) console.log('haha')
    if(testSubCapure(args[index])) {
      marched = true;
      if(handler){
        token = handler.apply(this, args.slice(index, index + link[1]))
        if(token)  token.pos = this.index;
      }
      break;
    }
  }
  if(!marched){ // in ie lt8 . sub capture is "" but ont 
    switch(str.charAt(0)){
      case "<":
        this.enter("TAG");
        break;
      default:
        this.enter("JST");
        break;
    }
  }
  return token;
}
lo.enter = function(state){
  this.states.push(state)
  return this;
}

lo.state = function(){
  var states = this.states;
  return states[states.length-1];
}

lo.leave = function(state){
  var states = this.states;
  if(!state || states[states.length-1] === state) states.pop()
}


Lexer.setup = function(){
  macro.END = config.END;
  macro.BEGIN = config.BEGIN;
  //
  map1 = genMap([
    // INIT
    rules.ENTER_JST,
    rules.ENTER_TAG,
    rules.TEXT,

    //TAG
    rules.TAG_NAME,
    rules.TAG_OPEN,
    rules.TAG_CLOSE,
    rules.TAG_PUNCHOR,
    rules.TAG_ENTER_JST,
    rules.TAG_UNQ_VALUE,
    rules.TAG_STRING,
    rules.TAG_SPACE,
    rules.TAG_COMMENT,

    // JST
    rules.JST_OPEN,
    rules.JST_CLOSE,
    rules.JST_COMMENT,
    rules.JST_EXPR_OPEN,
    rules.JST_IDENT,
    rules.JST_SPACE,
    rules.JST_LEAVE,
    rules.JST_NUMBER,
    rules.JST_PUNCHOR,
    rules.JST_STRING,
    rules.JST_COMMENT
    ])

  // ignored the tag-relative token
  map2 = genMap([
    // INIT no < restrict
    rules.ENTER_JST2,
    rules.TEXT,
    // JST
    rules.JST_COMMENT,
    rules.JST_OPEN,
    rules.JST_CLOSE,
    rules.JST_EXPR_OPEN,
    rules.JST_IDENT,
    rules.JST_SPACE,
    rules.JST_LEAVE,
    rules.JST_NUMBER,
    rules.JST_PUNCHOR,
    rules.JST_STRING,
    rules.JST_COMMENT
    ])
}


function genMap(rules){
  var rule, map = {}, sign;
  for(var i = 0, len = rules.length; i < len ; i++){
    rule = rules[i];
    sign = rule[2] || 'INIT';
    ( map[sign] || (map[sign] = {rules:[], links:[]}) ).rules.push(rule);
  }
  return setup(map);
}

function setup(map){
  var split, rules, trunks, handler, reg, retain, rule;
  function replaceFn(all, one){
    return typeof macro[one] === 'string'? 
      _.escapeRegExp(macro[one]) 
      : String(macro[one]).slice(1,-1);
  }

  for(var i in map){

    split = map[i];
    split.curIndex = 1;
    rules = split.rules;
    trunks = [];

    for(var j = 0,len = rules.length; j<len; j++){
      rule = rules[j]; 
      reg = rule[0];
      handler = rule[1];

      if(typeof handler === 'string'){
        handler = wrapHander(handler);
      }
      if(_.typeOf(reg) === 'regexp') reg = reg.toString().slice(1, -1);

      reg = reg.replace(/\{(\w+)\}/g, replaceFn)
      retain = _.findSubCapture(reg) + 1; 
      split.links.push([split.curIndex, retain, handler]); 
      split.curIndex += retain;
      trunks.push(reg);
    }
    split.TRUNK = new RegExp("^(?:(" + trunks.join(")|(") + "))")
  }
  return map;
}

var rules = {

  // 1. INIT
  // ---------------

  // mode1's JST ENTER RULE
  ENTER_JST: [/[^\x00<]*?(?={BEGIN})/, function(all){
    this.enter('JST');
    if(all) return {type: 'TEXT', value: all}
  }],

  // mode2's JST ENTER RULE
  ENTER_JST2: [/[^\x00]*?(?={BEGIN})/, function(all){
    this.enter('JST');
    if(all) return {type: 'TEXT', value: all}
  }],

  ENTER_TAG: [/[^\x00<>]*?(?=<)/, function(all){ 
    this.enter('TAG');
    if(all) return {type: 'TEXT', value: all}
  }],

  TEXT: [/[^\x00]+/, 'TEXT'],

  // 2. TAG
  // --------------------
  TAG_NAME: [/{NAME}/, 'NAME', 'TAG'],
  TAG_UNQ_VALUE: [/[^\{}&"'=><`\r\n\f ]+/, 'UNQ', 'TAG'],

  TAG_OPEN: [/<({NAME})\s*/, function(all, one){
    return {type: 'TAG_OPEN', value: one}
  }, 'TAG'],
  TAG_CLOSE: [/<\/({NAME})[\r\n\f ]*>/, function(all, one){
    this.leave();
    return {type: 'TAG_CLOSE', value: one }
  }, 'TAG'],

    // mode2's JST ENTER RULE
  TAG_ENTER_JST: [/(?={BEGIN})/, function(){
    this.enter('JST');
  }, 'TAG'],


  TAG_PUNCHOR: [/[\>\/=&]/, function(all){
    if(all === '>') this.leave();
    return {type: all, value: all }
  }, 'TAG'],
  TAG_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
    var value = one || two || "";

    return {type: 'STRING', value: value}
  }, 'TAG'],

  TAG_SPACE: [/{SPACE}+/, null, 'TAG'],
  TAG_COMMENT: [/<\!--([^\x00]*?)--\>/, null ,'TAG'],

  // 3. JST
  // -------------------

  JST_OPEN: ['{BEGIN}#{SPACE}*({IDENT})', function(all, name){
    return {
      type: 'OPEN',
      value: name
    }
  }, 'JST'],
  JST_LEAVE: [/{END}/, function(all){
    if(this.markEnd === all && this.expression) return {type: this.markEnd, value: this.markEnd};
    if(!this.markEnd || !this.marks ){
      this.firstEnterStart = false;
      this.leave('JST');
      return {type: 'END'}
    }else{
      this.marks--;
      return {type: this.markEnd, value: this.markEnd}
    }
  }, 'JST'],
  JST_CLOSE: [/{BEGIN}\s*\/({IDENT})\s*{END}/, function(all, one){
    this.leave('JST');
    return {
      type: 'CLOSE',
      value: one
    }
  }, 'JST'],
  JST_COMMENT: [/{BEGIN}\!([^\x00]*?)\!{END}/, function(){
    this.leave();
  }, 'JST'],
  JST_EXPR_OPEN: ['{BEGIN}',function(all, one){
    if(all === this.markStart){
      if(this.expression) return { type: this.markStart, value: this.markStart };
      if(this.firstEnterStart || this.marks){
        this.marks++
        this.firstEnterStart = false;
        return { type: this.markStart, value: this.markStart };
      }else{
        this.firstEnterStart = true;
      }
    }
    return {
      type: 'EXPR_OPEN',
      escape: false
    }

  }, 'JST'],
  JST_IDENT: ['{IDENT}', 'IDENT', 'JST'],
  JST_SPACE: [/[ \r\n\f]+/, null, 'JST'],
  JST_PUNCHOR: [/[=!]?==|[-=><+*\/%\!]?\=|\|\||&&|\@\(|\.\.|[<\>\[\]\(\)\-\|\{}\+\*\/%?:\.!,]/, function(all){
    return { type: all, value: all }
  },'JST'],

  JST_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
    return {type: 'STRING', value: one || two || ""}
  }, 'JST'],
  JST_NUMBER: [/(?:[0-9]*\.[0-9]+|[0-9]+)(e\d+)?/, function(all){
    return {type: 'NUMBER', value: parseFloat(all, 10)};
  }, 'JST']
}


// setup when first config
Lexer.setup();



module.exports = Lexer;

},{"../config.js":4,"../util.js":26}],24:[function(require,module,exports){
var _ = require("../util.js");

var config = require("../config.js");
var node = require("./node.js");
var Lexer = require("./Lexer.js");
var varName = _.varName;
var ctxName = _.ctxName;
var extName = _.extName;
var isPath = _.makePredicate("STRING IDENT NUMBER");
var isKeyWord = _.makePredicate("true false undefined null this Array Date JSON Math NaN RegExp decodeURI decodeURIComponent encodeURI encodeURIComponent parseFloat parseInt Object");




function Parser(input, opts){
  opts = opts || {};

  this.input = input;
  this.tokens = new Lexer(input, opts).lex();
  this.pos = 0;
  this.noComputed =  opts.noComputed;
  this.length = this.tokens.length;
}


var op = Parser.prototype;


op.parse = function(){
  this.pos = 0;
  var res= this.program();
  if(this.ll().type === 'TAG_CLOSE'){
    this.error("You may got a unclosed Tag")
  }
  return res;
}

op.ll =  function(k){
  k = k || 1;
  if(k < 0) k = k + 1;
  var pos = this.pos + k - 1;
  if(pos > this.length - 1){
      return this.tokens[this.length-1];
  }
  return this.tokens[pos];
}
  // lookahead
op.la = function(k){
  return (this.ll(k) || '').type;
}

op.match = function(type, value){
  var ll;
  if(!(ll = this.eat(type, value))){
    ll  = this.ll();
    this.error('expect [' + type + (value == null? '':':'+ value) + ']" -> got "[' + ll.type + (value==null? '':':'+ll.value) + ']', ll.pos)
  }else{
    return ll;
  }
}

op.error = function(msg, pos){
  msg =  "Parse Error: " + msg +  ':\n' + _.trackErrorPos(this.input, typeof pos === 'number'? pos: this.ll().pos||0);
  throw new Error(msg);
}

op.next = function(k){
  k = k || 1;
  this.pos += k;
}
op.eat = function(type, value){
  var ll = this.ll();
  if(typeof type !== 'string'){
    for(var len = type.length ; len--;){
      if(ll.type === type[len]) {
        this.next();
        return ll;
      }
    }
  }else{
    if( ll.type === type && (typeof value === 'undefined' || ll.value === value) ){
       this.next();
       return ll;
    }
  }
  return false;
}

// program
//  :EOF
//  | (statement)* EOF
op.program = function(){
  var statements = [],  ll = this.ll();
  while(ll.type !== 'EOF' && ll.type !=='TAG_CLOSE'){

    statements.push(this.statement());
    ll = this.ll();
  }
  // if(ll.type === 'TAG_CLOSE') this.error("You may have unmatched Tag")
  return statements;
}

// statement
//  : xml
//  | jst
//  | text
op.statement = function(){
  var ll = this.ll();
  switch(ll.type){
    case 'NAME':
    case 'TEXT':
      var text = ll.value;
      this.next();
      while(ll = this.eat(['NAME', 'TEXT'])){
        text += ll.value;
      }
      return node.text(text);
    case 'TAG_OPEN':
      return this.xml();
    case 'OPEN': 
      return this.directive();
    case 'EXPR_OPEN':
      return this.interplation();
    case 'PART_OPEN':
      return this.template();
    default:
      this.error('Unexpected token: '+ this.la())
  }
}

// xml 
// stag statement* TAG_CLOSE?(if self-closed tag)
op.xml = function(){
  var name, attrs, children, selfClosed;
  name = this.match('TAG_OPEN').value;
  attrs = this.attrs();
  selfClosed = this.eat('/')
  this.match('>');
  if( !selfClosed && !_.isVoidTag(name) ){
    children = this.program();
    if(!this.eat('TAG_CLOSE', name)) this.error('expect </'+name+'> got'+ 'no matched closeTag')
  }
  return node.element(name, attrs, children);
}

// xentity
//  -rule(wrap attribute)
//  -attribute
//
// __example__
//  name = 1 |  
//  ng-hide |
//  on-click={{}} | 
//  {{#if name}}on-click={{xx}}{{#else}}on-tap={{}}{{/if}}

op.xentity = function(ll){
  var name = ll.value, value;
  if(ll.type === 'NAME'){
    if( this.eat("=") ) value = this.attvalue();
    return node.attribute( name, value );
  }else{
    if( name !== 'if') this.error("current version. ONLY RULE #if #else #elseif is valid in tag, the rule #" + name + ' is invalid');
    return this['if'](true);
  }

}

// stag     ::=    '<' Name (S attr)* S? '>'  
// attr    ::=     Name Eq attvalue
op.attrs = function(isAttribute){
  var eat
  if(!isAttribute){
    eat = ["NAME", "OPEN"]
  }else{
    eat = ["NAME"]
  }

  var attrs = [], ll;
  while (ll = this.eat(eat)){
    attrs.push(this.xentity( ll ))
  }
  return attrs;
}

// attvalue
//  : STRING  
//  | NAME
op.attvalue = function(){
  var ll = this.ll();
  switch(ll.type){
    case "NAME":
    case "UNQ":
    case "STRING":
      this.next();
      var value = ll.value;
      if(~value.indexOf(config.BEGIN) && ~value.indexOf(config.END)){
        var constant = true;
        var parsed = new Parser(value, { mode: 2 }).parse();
        if(parsed.length === 1 && parsed[0].type === 'expression') return parsed[0];
        var body = [];
        parsed.forEach(function(item){
          if(!item.constant) constant=false;
          // silent the mutiple inteplation
            body.push(item.body || "'" + item.text.replace(/'/g, "\\'") + "'");        
        });
        body = "[" + body.join(",") + "].join('')";
        value = node.expression(body, null, constant);
      }
      return value;
    case "EXPR_OPEN":
      return this.interplation();
    default:
      this.error('Unexpected token: '+ this.la())
  }
}


// {{#}}
op.directive = function(){
  var name = this.ll().value;
  this.next();
  if(typeof this[name] === 'function'){
    return this[name]()
  }else{
    this.error('Undefined directive['+ name +']');
  }
}

// {{}}
op.interplation = function(){
  this.match('EXPR_OPEN');
  var res = this.expression(true);
  this.match('END');
  return res;
}

// {{~}}
op.include = function(){
  var content = this.expression();
  this.match('END');
  return node.template(content);
}

// {{#if}}
op["if"] = function(tag){
  var test = this.expression();
  var consequent = [], alternate=[];

  var container = consequent;
  var statement = !tag? "statement" : "attrs";

  this.match('END');

  var ll, close;
  while( ! (close = this.eat('CLOSE')) ){
    ll = this.ll();
    if( ll.type === 'OPEN' ){
      switch( ll.value ){
        case 'else':
          container = alternate;
          this.next();
          this.match( 'END' );
          break;
        case 'elseif':
          this.next();
          alternate.push( this["if"](tag) );
          return node['if']( test, consequent, alternate );
        default:
          container.push( this[statement](true) );
      }
    }else{
      container.push(this[statement](true));
    }
  }
  // if statement not matched
  if(close.value !== "if") this.error('Unmatched if directive')
  return node["if"](test, consequent, alternate);
}


// @mark   mustache syntax have natrure dis, canot with expression
// {{#list}}
op.list = function(){
  // sequence can be a list or hash
  var sequence = this.expression(), variable, ll;
  var consequent = [], alternate=[];
  var container = consequent;

  this.match('IDENT', 'as');

  variable = this.match('IDENT').value;

  this.match('END');

  while( !(ll = this.eat('CLOSE')) ){
    if(this.eat('OPEN', 'else')){
      container =  alternate;
      this.match('END');
    }else{
      container.push(this.statement());
    }
  }
  if(ll.value !== 'list') this.error('expect ' + 'list got ' + '/' + ll.value + ' ', ll.pos );
  return node.list(sequence, variable, consequent, alternate);
}


op.expression = function(){
  var expression;
  if(this.eat('@(')){ //once bind
    expression = this.expr();
    expression.once = true;
    this.match(')')
  }else{
    expression = this.expr();
  }
  return expression;
}

op.expr = function(){
  this.depend = [];

  var buffer = this.filter()

  var body = buffer.get || buffer;
  var setbody = buffer.set;
  return node.expression(body, setbody, !this.depend.length);
}


// filter
// assign ('|' filtername[':' args]) * 
op.filter = function(){
  var left = this.assign();
  var ll = this.eat('|');
  var buffer = [], setBuffer, prefix,
    attr = "t", 
    set = left.set, get, 
    tmp = "";

  if(ll){
    if(set) setBuffer = [];

    prefix = "(function(" + attr + "){";

    do{
      tmp = attr + " = " + ctxName + "._f_('" + this.match('IDENT').value+ "' ).get.call( "+_.ctxName +"," + attr ;
      if(this.eat(':')){
        tmp +=", "+ this.arguments("|").join(",") + ");"
      }else{
        tmp += ');'
      }
      buffer.push(tmp);
      setBuffer && setBuffer.unshift( tmp.replace(" ).get.call", " ).set.call") );

    }while(ll = this.eat('|'));
    buffer.push("return " + attr );
    setBuffer && setBuffer.push("return " + attr);

    get =  prefix + buffer.join("") + "})("+left.get+")";
    // we call back to value.
    if(setBuffer){
      // change _ss__(name, _p_) to _s__(name, filterFn(_p_));
      set = set.replace(_.setName, 
        prefix + setBuffer.join("") + "})("+　_.setName　+")" );

    }
    // the set function is depend on the filter definition. if it have set method, the set will work
    return this.getset(get, set);
  }
  return left;
}

// assign
// left-hand-expr = condition
op.assign = function(){
  var left = this.condition(), ll;
  if(ll = this.eat(['=', '+=', '-=', '*=', '/=', '%='])){
    if(!left.set) this.error('invalid lefthand expression in assignment expression');
    return this.getset( left.set.replace( "," + _.setName, "," + this.condition().get ).replace("'='", "'"+ll.type+"'"), left.set);
    // return this.getset('(' + left.get + ll.type  + this.condition().get + ')', left.set);
  }
  return left;
}

// or
// or ? assign : assign
op.condition = function(){

  var test = this.or();
  if(this.eat('?')){
    return this.getset([test.get + "?", 
      this.assign().get, 
      this.match(":").type, 
      this.assign().get].join(""));
  }

  return test;
}

// and
// and && or
op.or = function(){

  var left = this.and();

  if(this.eat('||')){
    return this.getset(left.get + '||' + this.or().get);
  }

  return left;
}
// equal
// equal && and
op.and = function(){

  var left = this.equal();

  if(this.eat('&&')){
    return this.getset(left.get + '&&' + this.and().get);
  }
  return left;
}
// relation
// 
// equal == relation
// equal != relation
// equal === relation
// equal !== relation
op.equal = function(){
  var left = this.relation(), ll;
  // @perf;
  if( ll = this.eat(['==','!=', '===', '!=='])){
    return this.getset(left.get + ll.type + this.equal().get);
  }
  return left
}
// relation < additive
// relation > additive
// relation <= additive
// relation >= additive
// relation in additive
op.relation = function(){
  var left = this.additive(), ll;
  // @perf
  if(ll = (this.eat(['<', '>', '>=', '<=']) || this.eat('IDENT', 'in') )){
    return this.getset(left.get + ll.value + this.relation().get);
  }
  return left
}
// additive :
// multive
// additive + multive
// additive - multive
op.additive = function(){
  var left = this.multive() ,ll;
  if(ll= this.eat(['+','-']) ){
    return this.getset(left.get + ll.value + this.additive().get);
  }
  return left
}
// multive :
// unary
// multive * unary
// multive / unary
// multive % unary
op.multive = function(){
  var left = this.range() ,ll;
  if( ll = this.eat(['*', '/' ,'%']) ){
    return this.getset(left.get + ll.type + this.multive().get);
  }
  return left;
}

op.range = function(){
  var left = this.unary(), ll, right;

  if(ll = this.eat('..')){
    right = this.unary();
    var body = 
      "(function(start,end){var res = [],step=end>start?1:-1; for(var i = start; end>start?i <= end: i>=end; i=i+step){res.push(i); } return res })("+left.get+","+right.get+")"
    return this.getset(body);
  }

  return left;
}



// lefthand
// + unary
// - unary
// ~ unary
// ! unary
op.unary = function(){
  var ll;
  if(ll = this.eat(['+','-','~', '!'])){
    return this.getset('(' + ll.type + this.unary().get + ')') ;
  }else{
    return this.member()
  }
}

// call[lefthand] :
// member args
// member [ expression ]
// member . ident  

op.member = function(base, last, pathes, prevBase){
  var ll, path, extValue;


  var onlySimpleAccessor = false;
  if(!base){ //first
    path = this.primary();
    var type = typeof path;
    if(type === 'string'){ 
      pathes = [];
      pathes.push( path );
      last = path;
      extValue = extName + "." + path
      base = ctxName + "._sg_('" + path + "', " + varName + ", " + extName + ")";
      onlySimpleAccessor = true;
    }else{ //Primative Type
      if(path.get === 'this'){
        base = ctxName;
        pathes = ['this'];
      }else{
        pathes = null;
        base = path.get;
      }
    }
  }else{ // not first enter
    if(typeof last === 'string' && isPath( last) ){ // is valid path
      pathes.push(last);
    }else{
      if(pathes && pathes.length) this.depend.push(pathes);
      pathes = null;
    }
  }
  if(ll = this.eat(['[', '.', '('])){
    switch(ll.type){
      case '.':
          // member(object, property, computed)
        var tmpName = this.match('IDENT').value;
        prevBase = base;
        if( this.la() !== "(" ){ 
          base = ctxName + "._sg_('" + tmpName + "', " + base + ")";
        }else{
          base += "['" + tmpName + "']";
        }
        return this.member( base, tmpName, pathes,  prevBase);
      case '[':
          // member(object, property, computed)
        path = this.assign();
        prevBase = base;
        if( this.la() !== "(" ){ 
        // means function call, we need throw undefined error when call function
        // and confirm that the function call wont lose its context
          base = ctxName + "._sg_(" + path.get + ", " + base + ")";
        }else{
          base += "[" + path.get + "]";
        }
        this.match(']')
        return this.member(base, path, pathes, prevBase);
      case '(':
        // call(callee, args)
        var args = this.arguments().join(',');
        base =  base+"(" + args +")";
        this.match(')')
        return this.member(base, null, pathes);
    }
  }
  if( pathes && pathes.length ) this.depend.push( pathes );
  var res =  {get: base};
  if(last){
    res.set = ctxName + "._ss_(" + 
        (last.get? last.get : "'"+ last + "'") + 
        ","+ _.setName + ","+ 
        (prevBase?prevBase:_.varName) + 
        ", '=', "+ ( onlySimpleAccessor? 1 : 0 ) + ")";
  
  }
  return res;
}

/**
 * 
 */
op.arguments = function(end){
  end = end || ')'
  var args = [];
  do{
    if(this.la() !== end){
      args.push(this.assign().get)
    }
  }while( this.eat(','));
  return args
}


// primary :
// this 
// ident
// literal
// array
// object
// ( expression )

op.primary = function(){
  var ll = this.ll();
  switch(ll.type){
    case "{":
      return this.object();
    case "[":
      return this.array();
    case "(":
      return this.paren();
    // literal or ident
    case 'STRING':
      this.next();
      return this.getset("'" + ll.value + "'")
    case 'NUMBER':
      this.next();
      return this.getset(""+ll.value);
    case "IDENT":
      this.next();
      if(isKeyWord(ll.value)){
        return this.getset( ll.value );
      }
      return ll.value;
    default: 
      this.error('Unexpected Token: ' + ll.type);
  }
}

// object
//  {propAssign [, propAssign] * [,]}

// propAssign
//  prop : assign

// prop
//  STRING
//  IDENT
//  NUMBER

op.object = function(){
  var code = [this.match('{').type];

  var ll = this.eat( ['STRING', 'IDENT', 'NUMBER'] );
  while(ll){
    code.push("'" + ll.value + "'" + this.match(':').type);
    var get = this.assign().get;
    code.push(get);
    ll = null;
    if(this.eat(",") && (ll = this.eat(['STRING', 'IDENT', 'NUMBER'])) ) code.push(",");
  }
  code.push(this.match('}').type);
  return {get: code.join("")}
}

// array
// [ assign[,assign]*]
op.array = function(){
  var code = [this.match('[').type], item;
  if( this.eat("]") ){

     code.push("]");
  } else {
    while(item = this.assign()){
      code.push(item.get);
      if(this.eat(',')) code.push(",");
      else break;
    }
    code.push(this.match(']').type);
  }
  return {get: code.join("")};
}

// '(' expression ')'
op.paren = function(){
  this.match('(');
  var res = this.filter()
  res.get = '(' + res.get + ')';
  this.match(')');
  return res;
}

op.getset = function(get, set){
  return {
    get: get,
    set: set
  }
}



module.exports = Parser;

},{"../config.js":4,"../util.js":26,"./Lexer.js":23,"./node.js":25}],25:[function(require,module,exports){
module.exports = {
  element: function(name, attrs, children){
    return {
      type: 'element',
      tag: name,
      attrs: attrs,
      children: children
    }
  },
  attribute: function(name, value){
    return {
      type: 'attribute',
      name: name,
      value: value
    }
  },
  "if": function(test, consequent, alternate){
    return {
      type: 'if',
      test: test,
      consequent: consequent,
      alternate: alternate
    }
  },
  list: function(sequence, variable, body){
    return {
      type: 'list',
      sequence: sequence,
      variable: variable,
      body: body
    }
  },
  expression: function( body, setbody, constant ){
    return {
      type: "expression",
      body: body,
      constant: constant || false,
      setbody: setbody || false
    }
  },
  text: function(text){
    return {
      type: "text",
      text: text
    }
  },
  template: function(template){
    return {
      type: 'template',
      content: template
    }
  }
}

},{}],26:[function(require,module,exports){
(function (global){
require('./helper/shim.js');
var _  = module.exports;
var entities = require('./helper/entities.js');
var slice = [].slice;
var o2str = ({}).toString;
var win = typeof window !=='undefined'? window: global;


_.noop = function(){};
_.uid = (function(){
  var _uid=0;
  return function(){
    return _uid++;
  }
})();

_.varName = 'd';
_.setName = 'p_';
_.ctxName = 'c';
_.extName = 'e';

_.rWord = /^[\$\w]+$/;
_.rSimpleAccessor = /^[\$\w]+(\.[\$\w]+)*$/;

_.nextTick = typeof setImmediate === 'function'? 
  setImmediate.bind(win) : 
  function(callback) {
    setTimeout(callback, 0) 
  }



_.prefix = "var " + _.varName + "=" + _.ctxName + ".data;" +  _.extName  + "=" + _.extName + "||'';";


_.slice = function(obj, start, end){
  var res = [];
  for(var i = start || 0, len = end || obj.length; i < len; i++){
    var item = obj[i];
    res.push(item)
  }
  return res;
}

_.typeOf = function (o) {
  return o == null ? String(o) : o2str.call(o).slice(8, -1).toLowerCase();
}


_.extend = function( o1, o2, override ){
  if(_.typeOf(override) === 'array'){
   for(var i = 0, len = override.length; i < len; i++ ){
    var key = override[i];
    o1[key] = o2[key];
   } 
  }else{
    for(var i in o2){
      if( typeof o1[i] === "undefined" || override === true ){
        o1[i] = o2[i]
      }
    }
  }
  return o1;
}

_.makePredicate = function makePredicate(words, prefix) {
    if (typeof words === "string") {
        words = words.split(" ");
    }
    var f = "",
    cats = [];
    out: for (var i = 0; i < words.length; ++i) {
        for (var j = 0; j < cats.length; ++j){
          if (cats[j][0].length === words[i].length) {
              cats[j].push(words[i]);
              continue out;
          }
        }
        cats.push([words[i]]);
    }
    function compareTo(arr) {
        if (arr.length === 1) return f += "return str === '" + arr[0] + "';";
        f += "switch(str){";
        for (var i = 0; i < arr.length; ++i){
           f += "case '" + arr[i] + "':";
        }
        f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.
    if (cats.length > 3) {
        cats.sort(function(a, b) {
            return b.length - a.length;
        });
        f += "switch(str.length){";
        for (var i = 0; i < cats.length; ++i) {
            var cat = cats[i];
            f += "case " + cat[0].length + ":";
            compareTo(cat);
        }
        f += "}";

        // Otherwise, simply generate a flat `switch` statement.
    } else {
        compareTo(words);
    }
    return new Function("str", f);
}


_.trackErrorPos = (function (){
  // linebreak
  var lb = /\r\n|[\n\r\u2028\u2029]/g;
  function findLine(lines, pos){
    var tmpLen = 0;
    for(var i = 0,len = lines.length; i < len; i++){
      var lineLen = (lines[i] || "").length;
      if(tmpLen + lineLen > pos) return {num: i, line: lines[i], start: pos - tmpLen};
      // 1 is for the linebreak
      tmpLen = tmpLen + lineLen + 1;
    }
    
  }
  return function(input, pos){
    if(pos > input.length-1) pos = input.length-1;
    lb.lastIndex = 0;
    var lines = input.split(lb);
    var line = findLine(lines,pos);
    var len = line.line.length;

    var min = line.start - 10;
    if(min < 0) min = 0;

    var max = line.start + 10;
    if(max > len) max = len;

    var remain = line.line.slice(min, max);
    var prefix = (line.num+1) + "> " + (min > 0? "..." : "")
    var postfix = max < len ? "...": "";

    return prefix + remain + postfix + "\n" + new Array(line.start + prefix.length + 1).join(" ") + "^";
  }
})();


var ignoredRef = /\((\?\!|\?\:|\?\=)/g;
_.findSubCapture = function (regStr) {
  var left = 0,
    right = 0,
    len = regStr.length,
    ignored = regStr.match(ignoredRef); // ignored uncapture
  if(ignored) ignored = ignored.length
  else ignored = 0;
  for (; len--;) {
    var letter = regStr.charAt(len);
    if (len === 0 || regStr.charAt(len - 1) !== "\\" ) { 
      if (letter === "(") left++;
      if (letter === ")") right++;
    }
  }
  if (left !== right) throw "RegExp: "+ regStr + "'s bracket is not marched";
  else return left - ignored;
};


_.escapeRegExp = function( str){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
  return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
    return '\\' + match;
  });
};


var rEntity = new RegExp("&(" + Object.keys(entities).join('|') + ');', 'gi');

_.convertEntity = function(chr){

  return ("" + chr).replace(rEntity, function(all, capture){
    return String.fromCharCode(entities[capture])
  });

}


// simple get accessor

_.createObject = function(o, props){
    function Foo() {}
    Foo.prototype = o;
    var res = new Foo;
    if(props) _.extend(res, props);
    return res;
}

_.createProto = function(fn, o){
    function Foo() { this.constructor = fn;}
    Foo.prototype = o;
    return (fn.prototype = new Foo());
}


/**
clone
*/
_.clone = function clone(obj){
    var type = _.typeOf(obj);
    if(type === 'array'){
      var cloned = [];
      for(var i=0,len = obj.length; i< len;i++){
        cloned[i] = obj[i]
      }
      return cloned;
    }
    if(type === 'object'){
      var cloned = {};
      for(var i in obj) if(obj.hasOwnProperty(i)){
        cloned[i] = obj[i];
      }
      return cloned;
    }
    return obj;
  }


_.equals = function(now, old){
  if( Array.isArray(now) ){
    var splices = ld(now, old||[]);
    return splices;
  }
  var type = typeof now;
  if(type === 'number' && typeof old === 'number'&& isNaN(now) && isNaN(old)) return true
  return now === old;
}


//Levenshtein_distance
//=================================================
//1. http://en.wikipedia.org/wiki/Levenshtein_distance
//2. github.com:polymer/observe-js

var ld = (function(){
  function equals(a,b){
    return a === b;
  }
  function ld(array1, array2){
    var n = array1.length;
    var m = array2.length;
    var matrix = [];
    for(var i = 0; i <= n; i++){
      matrix.push([i]);
    }
    for(var j=1;j<=m;j++){
      matrix[0][j]=j;
    }
    for(var i = 1; i <= n; i++){
      for(var j = 1; j <= m; j++){
        if(equals(array1[i-1], array2[j-1])){
          matrix[i][j] = matrix[i-1][j-1];
        }else{
          matrix[i][j] = Math.min(
            matrix[i-1][j]+1, //delete
            matrix[i][j-1]+1//add
            )
        }
      }
    }
    return matrix;
  }
  function whole(arr2, arr1) {
      var matrix = ld(arr1, arr2)
      var n = arr1.length;
      var i = n;
      var m = arr2.length;
      var j = m;
      var edits = [];
      var current = matrix[i][j];
      while(i>0 || j>0){
      // the last line
        if (i === 0) {
          edits.unshift(3);
          j--;
          continue;
        }
        // the last col
        if (j === 0) {
          edits.unshift(2);
          i--;
          continue;
        }
        var northWest = matrix[i - 1][j - 1];
        var west = matrix[i - 1][j];
        var north = matrix[i][j - 1];

        var min = Math.min(north, west, northWest);

        if (min === west) {
          edits.unshift(2); //delete
          i--;
          current = west;
        } else if (min === northWest ) {
          if (northWest === current) {
            edits.unshift(0); //no change
          } else {
            edits.unshift(1); //update
            current = northWest;
          }
          i--;
          j--;
        } else {
          edits.unshift(3); //add
          j--;
          current = north;
        }
      }
      var LEAVE = 0;
      var ADD = 3;
      var DELELE = 2;
      var UPDATE = 1;
      var n = 0;m=0;
      var steps = [];
      var step = {index: null, add:0, removed:[]};

      for(var i=0;i<edits.length;i++){
        if(edits[i] > 0 ){ // NOT LEAVE
          if(step.index === null){
            step.index = m;
          }
        } else { //LEAVE
          if(step.index != null){
            steps.push(step)
            step = {index: null, add:0, removed:[]};
          }
        }
        switch(edits[i]){
          case LEAVE:
            n++;
            m++;
            break;
          case ADD:
            step.add++;
            m++;
            break;
          case DELELE:
            step.removed.push(arr1[n])
            n++;
            break;
          case UPDATE:
            step.add++;
            step.removed.push(arr1[n])
            n++;
            m++;
            break;
        }
      }
      if(step.index != null){
        steps.push(step)
      }
      return steps
    }
    return whole;
  })();



_.throttle = function throttle(func, wait){
  var wait = wait || 100;
  var context, args, result;
  var timeout = null;
  var previous = 0;
  var later = function() {
    previous = +new Date;
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function() {
    var now = + new Date;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

// hogan escape
// ==============
_.escape = (function(){
  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  return function(str) {
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }
})();

_.cache = function(max){
  max = max || 1000;
  var keys = [],
      cache = {};
  return {
    set: function(key, value) {
      if (keys.length > this.max) {
        cache[keys.shift()] = undefined;
      }
      // 
      if(cache[key] === undefined){
        keys.push(key);
      }
      cache[key] = value;
      return value;
    },
    get: function(key) {
      if (key === undefined) return cache;
      return cache[key];
    },
    max: max,
    len:function(){
      return keys.length;
    }
  };
}

// // setup the raw Expression
// _.touchExpression = function(expr){
//   if(expr.type === 'expression'){
//   }
//   return expr;
// }


// handle the same logic on component's `on-*` and element's `on-*`
// return the fire object
_.handleEvent = function(value, type ){
  var self = this, evaluate;
  if(value.type === 'expression'){ // if is expression, go evaluated way
    evaluate = value.get;
  }
  if(evaluate){
    return function fire(obj){
      self.data.$event = obj;
      var res = evaluate(self);
      if(res === false && obj && obj.preventDefault) obj.preventDefault();
      self.data.$event = undefined;
      self.$update();
    }
  }else{
    return function fire(){
      var args = slice.call(arguments)      
      args.unshift(value);
      self.$emit.apply(self, args);
      self.$update();
    }
  }
}

// only call once
_.once = function(fn){
  var time = 0;
  return function(){
    if( time++ === 0) fn.apply(this, arguments);
  }
}



_.log = function(msg, type){
  if(typeof console !== "undefined")  console[type || "log"](msg);
}




//http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
_.isVoidTag = _.makePredicate("area base br col embed hr img input keygen link menuitem meta param source track wbr r-content");
_.isBooleanAttr = _.makePredicate('selected checked disabled readOnly required open autofocus controls autoplay compact loop defer multiple');

_.isFalse - function(){return false}
_.isTrue - function(){return true}


_.assert = function(test, msg){
  if(!test) throw msg;
}


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./helper/entities.js":14,"./helper/shim.js":19}],27:[function(require,module,exports){
var node = require("./parser/node.js");
var dom = require("./dom.js");
var animate = require("./helper/animate.js");
var Group = require('./group.js');
var _ = require('./util');
var combine = require('./helper/combine.js');

var walkers = module.exports = {};

walkers.list = function(ast, options){

  var Regular = walkers.Regular;  
  var placeholder = document.createComment("Regular list"),
    namespace = options.namespace,
    extra = options.extra;
  var self = this;
  var group = new Group();
  group.push(placeholder);
  var indexName = ast.variable + '_index';
  var variable = ast.variable;

  function update(newValue, splices){
    if(!newValue) {
      newValue = [];
      splices = _.equals(newValue, splices);
    }
    
    if(!splices || !splices.length) return;
    var cur = placeholder;
    var m = 0, len = newValue.length,
      mIndex = splices[0].index;

    for(var i = 0; i < splices.length; i++){ //init
      var splice = splices[i];
      var index = splice.index; // beacuse we use a comment for placeholder

      for(var k = m; k < index; k++){ // no change
        var sect = group.get( k + 1 );
        sect.data[indexName] = k;
      }
      for(var j = 0, jlen = splice.removed.length; j< jlen; j++){ //removed
        var removed = group.children.splice( index + 1, 1)[0];
        removed.destroy(true);
      }

      for(var o = index; o < index + splice.add; o++){ //add
        // prototype inherit
        var item = newValue[o];
        var data = {};
        data[indexName] = o;
        data[variable] = item;

        _.extend(data, extra);
        var section = self.$compile(ast.body, {
          extra: data,
          namespace:namespace,
          record: true,
          outer: options.outer
        })
        section.data = data;
        // autolink
        var insert =  combine.last(group.get(o));
        if(insert.parentNode){
          animate.inject(combine.node(section),insert, 'after');
        }
        // insert.parentNode.insertBefore(combine.node(section), insert.nextSibling);
        group.children.splice( o + 1 , 0, section);
      }
      m = index + splice.add - splice.removed.length;
      m  = m < 0? 0 : m;

    }
    if(m < len){
      for(var i = m; i < len; i++){
        var pair = group.get(i + 1);
        pair.data[indexName] = i;
      }
    }
  }

  this.$watch(ast.sequence, update, { init: true });
  return group;
}
// {#include }
walkers.template = function(ast, options){
  var content = ast.content, compiled;
  var placeholder = document.createComment('inlcude');
  var compiled, namespace = options.namespace, extra = options.extra;
  // var fragment = dom.fragment();
  // fragment.appendChild(placeholder);
  var group = new Group();
  group.push(placeholder);
  if(content){
    var self = this;
    this.$watch(content, function(value){
      if( compiled = group.get(1)){
        compiled.destroy(true); 
        group.children.pop();
      }
      group.push( compiled =  self.$compile(value, {record: true, outer: options.outer,namespace: namespace, extra: extra}) ); 
      if(placeholder.parentNode) animate.inject(combine.node(compiled), placeholder, 'before')
    }, {
      init: true
    });
  }
  return group;
};


// how to resolve this problem
var ii = 0;
walkers['if'] = function(ast, options){
  var self = this, consequent, alternate, extra = options.extra;
  if(options && options.element){ // attribute inteplation
    var update = function(nvalue){
      if(!!nvalue){
        if(alternate) combine.destroy(alternate)
        if(ast.consequent) consequent = self.$compile(ast.consequent, {record: true, element: options.element , extra:extra});
      }else{
        if(consequent) combine.destroy(consequent)
        if(ast.alternate) alternate = self.$compile(ast.alternate, {record: true, element: options.element, extra: extra});
      }
    }
    this.$watch(ast.test, update, { force: true });
    return {
      destroy: function(){
        if(consequent) combine.destroy(consequent);
        else if(alternate) combine.destroy(alternate);
      }
    }
  }

  var test, consequent, alternate, node;
  var placeholder = document.createComment("Regular if" + ii++);
  var group = new Group();
  group.push(placeholder);
  var preValue = null, namespace= options.namespace;


  var update = function (nvalue, old){
    var value = !!nvalue;
    if(value === preValue) return;
    preValue = value;
    if(group.children[1]){
      group.children[1].destroy(true);
      group.children.pop();
    }
    if(value){ //true
      if(ast.consequent && ast.consequent.length){
        consequent = self.$compile( ast.consequent , {record:true, outer: options.outer,namespace: namespace, extra:extra })
        // placeholder.parentNode && placeholder.parentNode.insertBefore( node, placeholder );
        group.push(consequent);
        if(placeholder.parentNode){
          animate.inject(combine.node(consequent), placeholder, 'before');
        }
      }
    }else{ //false
      if(ast.alternate && ast.alternate.length){
        alternate = self.$compile(ast.alternate, {record:true, outer: options.outer,namespace: namespace, extra:extra});
        group.push(alternate);
        if(placeholder.parentNode){
          animate.inject(combine.node(alternate), placeholder, 'before');
        }
      }
    }
  }
  this.$watch(ast.test, update, {force: true, init: true});

  return group;
}


walkers.expression = function(ast, options){
  var node = document.createTextNode("");
  this.$watch(ast, function(newval){
    dom.text(node, "" + (newval == null? "": "" + newval) );
  })
  return node;
}
walkers.text = function(ast, options){
  var node = document.createTextNode(_.convertEntity(ast.text));
  return node;
}



var eventReg = /^on-(.+)$/

/**
 * walkers element (contains component)
 */
walkers.element = function(ast, options){
  var attrs = ast.attrs, 
    component, self = this,
    Constructor=this.constructor,
    children = ast.children,
    namespace = options.namespace, ref, group, 
    extra = options.extra,
    isolate = 0,
    Component = Constructor.component(ast.tag);


  if(ast.tag === 'svg') namespace = "svg";




  if(Component){
    var data = {},events;
    for(var i = 0, len = attrs.length; i < len; i++){
      var attr = attrs[i];
      var value = this._touchExpr(attr.value || "");
      
      var name = attr.name;
      var etest = name.match(eventReg);
      // bind event proxy
      if(etest){
        events = events || {};
        events[etest[1]] = _.handleEvent.call(this, value, etest[1]);
        continue;
      }

      if(value.type !== 'expression'){
        data[attr.name] = value;
      }else{
        data[attr.name] = value.get(self); 
      }
      if( attr.name === 'ref'  && value != null){
        ref = value.type === 'expression'? value.get(self): value;
      }
      if( attr.name === 'isolate'){
        // 1: stop: composite -> parent
        // 2. stop: composite <- parent
        // 3. stop 1 and 2: composite <-> parent
        // 0. stop nothing (defualt)
        isolate = value.type === 'expression'? value.get(self): parseInt(value || 3, 10);
        data.isolate = isolate;
      }


    }

    var config = { 
      data: data, 
      events: events, 
      $parent: this,
      $outer: options.outer,
      namespace: namespace, 
      $root: this.$root,
      $body: ast.children
    }

    var component = new Component(config);
    if(ref &&  self.$refs) self.$refs[ref] = component;
    for(var i = 0, len = attrs.length; i < len; i++){
      var attr = attrs[i];
      var value = attr.value||"";
      if(value.type === 'expression' && attr.name.indexOf('on-')===-1){
        value = self._touchExpr(value);
        // use bit operate to control scope
        if( !(isolate & 2) ) 
          this.$watch(value, component.$update.bind(component, attr.name))
        if( value.set && !(isolate & 1 ) ) 
          // sync the data. it force the component don't trigger attr.name's first dirty echeck
          component.$watch(attr.name, self.$update.bind(self, value), {sync: true});
      }
    }
    if(ref){
      component.$on('destroy', function(){
        if(self.$refs) self.$refs[ref] = null;
      })
    }
    return component;
  }
  else if( ast.tag === 'r-content' && this._getTransclude ){
    return this._getTransclude();
  }
  
  if(children && children.length){
    group = this.$compile(children, {outer: options.outer,namespace: namespace, extra: extra });
  }

  var element = dom.create(ast.tag, namespace, attrs);
  // context element

  var child;

  if(group && !_.isVoidTag(ast.tag)){
    dom.inject( combine.node(group) , element)
  }

  // sort before
  attrs.sort(function(a1, a2){
    var d1 = Constructor.directive(a1.name),
      d2 = Constructor.directive(a2.name);
    if(d1 && d2) return (d2.priority || 1) - (d1.priority || 1);
    if(d1) return 1;
    if(d2) return -1;
    if(a2.name === "type") return 1;
    return -1;
  })
  // may distinct with if else
  var destroies = walkAttributes.call(this, attrs, element, extra);



  var res  = {
    type: "element",
    group: group,
    node: function(){
      return element;
    },
    last: function(){
      return element;
    },
    destroy: function(first){
      if( first ){
        animate.remove( element, group? group.destroy.bind( group ): _.noop );
      }else if(group) {
        group.destroy();
      }
      // destroy ref
      if( destroies.length ) {
        destroies.forEach(function( destroy ){
          if( destroy ){
            if( typeof destroy.destroy === 'function' ){
              destroy.destroy()
            }else{
              destroy();
            }
          }
        })
      }
    }
  }
  return res;
}

function walkAttributes(attrs, element, extra){
  var bindings = []
  for(var i = 0, len = attrs.length; i < len; i++){
    var binding = this._walk(attrs[i], {element: element, fromElement: true, attrs: attrs, extra: extra})
    if(binding) bindings.push(binding);
  }
  return bindings;
}

walkers.attribute = function(ast ,options){
  var attr = ast;
  var Component = this.constructor;
  var self = this;
  var element = options.element;
  var name = attr.name,
    value = attr.value || "", directive = Component.directive(name);

  value = this._touchExpr(value);


  if(directive && directive.link){
    var binding = directive.link.call(self, element, value, name, options.attrs);
    if(typeof binding === 'function') binding = {destroy: binding}; 
    return binding;
  }else{
    if( name === 'ref'  && value != null && options.fromElement){
      var ref = value.type === 'expression'? value.get(self): value;
      var refs = this.$refs;
      if(refs){
        refs[ref] = element
        return {
          destroy: function(){
            refs[ref] = null;
          }
        }
      }
    }
    if(value.type === 'expression' ){

      this.$watch(value, function(nvalue, old){
        dom.attr(element, name, nvalue);
      }, {init: true});
    }else{
      if(_.isBooleanAttr(name)){
        dom.attr(element, name, true);
      }else{
        dom.attr(element, name, value);
      }
    }
    if(!options.fromElement){
      return {
        destroy: function(){
          dom.attr(element, name, null);
        }
      }
    }
  }

}


},{"./dom.js":9,"./group.js":11,"./helper/animate.js":12,"./helper/combine.js":13,"./parser/node.js":25,"./util":26}],28:[function(require,module,exports){
/*!
  * Reqwest! A general purpose XHR connection manager
  * license MIT (c) Dustin Diaz 2014
  * https://github.com/ded/reqwest
  */

!function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
}('reqwest', this, function () {

  var win = window
    , doc = document
    , httpsRe = /^http/
    , protocolRe = /(^\w+):\/\//
    , twoHundo = /^(20\d|1223)$/ //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
    , byTag = 'getElementsByTagName'
    , readyState = 'readyState'
    , contentType = 'Content-Type'
    , requestedWith = 'X-Requested-With'
    , head = doc[byTag]('head')[0]
    , uniqid = 0
    , callbackPrefix = 'reqwest_' + (+new Date())
    , lastValue // data stored by the most recent JSONP callback
    , xmlHttpRequest = 'XMLHttpRequest'
    , xDomainRequest = 'XDomainRequest'
    , noop = function () {}

    , isArray = typeof Array.isArray == 'function'
        ? Array.isArray
        : function (a) {
            return a instanceof Array
          }

    , defaultHeaders = {
          'contentType': 'application/x-www-form-urlencoded'
        , 'requestedWith': xmlHttpRequest
        , 'accept': {
              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
            , 'xml':  'application/xml, text/xml'
            , 'html': 'text/html'
            , 'text': 'text/plain'
            , 'json': 'application/json, text/javascript'
            , 'js':   'application/javascript, text/javascript'
          }
      }

    , xhr = function(o) {
        // is it x-domain
        if (o['crossOrigin'] === true) {
          var xhr = win[xmlHttpRequest] ? new XMLHttpRequest() : null
          if (xhr && 'withCredentials' in xhr) {
            return xhr
          } else if (win[xDomainRequest]) {
            return new XDomainRequest()
          } else {
            throw new Error('Browser does not support cross-origin requests')
          }
        } else if (win[xmlHttpRequest]) {
          return new XMLHttpRequest()
        } else {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }
      }
    , globalSetupOptions = {
        dataFilter: function (data) {
          return data
        }
      }

  function succeed(r) {
    var protocol = protocolRe.exec(r.url);
    protocol = (protocol && protocol[1]) || window.location.protocol;
    return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.response;
  }

  function handleReadyState(r, success, error) {
    return function () {
      // use _aborted to mitigate against IE err c00c023f
      // (can't read props on aborted request objects)
      if (r._aborted) return error(r.request)
      if (r._timedOut) return error(r.request, 'Request is aborted: timeout')
      if (r.request && r.request[readyState] == 4) {
        r.request.onreadystatechange = noop
        if (succeed(r)) success(r.request)
        else
          error(r.request)
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o['headers'] || {}
      , h

    headers['Accept'] = headers['Accept']
      || defaultHeaders['accept'][o['type']]
      || defaultHeaders['accept']['*']

    var isAFormData = typeof FormData === 'function' && (o['data'] instanceof FormData);
    // breaks cross-origin requests with legacy browsers
    if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith']
    if (!headers[contentType] && !isAFormData) headers[contentType] = o['contentType'] || defaultHeaders['contentType']
    for (h in headers)
      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h])
  }

  function setCredentials(http, o) {
    if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
      http.withCredentials = !!o['withCredentials']
    }
  }

  function generalCallback(data) {
    lastValue = data
  }

  function urlappend (url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }

  function handleJsonp(o, fn, err, url) {
    var reqId = uniqid++
      , cbkey = o['jsonpCallback'] || 'callback' // the 'callback' key
      , cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId)
      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
      , match = url.match(cbreg)
      , script = doc.createElement('script')
      , loaded = 0
      , isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1

    if (match) {
      if (match[3] === '?') {
        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
      } else {
        cbval = match[3] // provided callback func name
      }
    } else {
      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
    }

    win[cbval] = generalCallback

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
      // need this for IE due to out-of-order onreadystatechange(), binding script
      // execution to an event listener gives us control over when the script
      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
      script.htmlFor = script.id = '_reqwest_' + reqId
    }

    script.onload = script.onreadystatechange = function () {
      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
        return false
      }
      script.onload = script.onreadystatechange = null
      script.onclick && script.onclick()
      // Call the user callback with the last value stored and clean up values and scripts.
      fn(lastValue)
      lastValue = undefined
      head.removeChild(script)
      loaded = 1
    }

    // Add the script to the DOM head
    head.appendChild(script)

    // Enable JSONP timeout
    return {
      abort: function () {
        script.onload = script.onreadystatechange = null
        err({}, 'Request is aborted: timeout', {})
        lastValue = undefined
        head.removeChild(script)
        loaded = 1
      }
    }
  }

  function getRequest(fn, err) {
    var o = this.o
      , method = (o['method'] || 'GET').toUpperCase()
      , url = typeof o === 'string' ? o : o['url']
      // convert non-string objects to query-string form unless o['processData'] is false
      , data = (o['processData'] !== false && o['data'] && typeof o['data'] !== 'string')
        ? reqwest.toQueryString(o['data'])
        : (o['data'] || null)
      , http
      , sendWait = false

    // if we're working on a GET request and we have data then we should append
    // query string to end of URL and not post data
    if ((o['type'] == 'jsonp' || method == 'GET') && data) {
      url = urlappend(url, data)
      data = null
    }

    if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url)

    // get the xhr from the factory if passed
    // if the factory returns null, fall-back to ours
    http = (o.xhr && o.xhr(o)) || xhr(o)

    http.open(method, url, o['async'] === false ? false : true)
    setHeaders(http, o)
    setCredentials(http, o)
    if (win[xDomainRequest] && http instanceof win[xDomainRequest]) {
        http.onload = fn
        http.onerror = err
        // NOTE: see
        // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
        http.onprogress = function() {}
        sendWait = true
    } else {
      http.onreadystatechange = handleReadyState(this, fn, err)
    }
    o['before'] && o['before'](http)
    if (sendWait) {
      setTimeout(function () {
        http.send(data)
      }, 200)
    } else {
      http.send(data)
    }
    return http
  }

  function Reqwest(o, fn) {
    this.o = o
    this.fn = fn

    init.apply(this, arguments)
  }

  function setType(header) {
    // json, javascript, text/plain, text/html, xml
    if (header.match('json')) return 'json'
    if (header.match('javascript')) return 'js'
    if (header.match('text')) return 'html'
    if (header.match('xml')) return 'xml'
  }

  function init(o, fn) {

    this.url = typeof o == 'string' ? o : o['url']
    this.timeout = null

    // whether request has been fulfilled for purpose
    // of tracking the Promises
    this._fulfilled = false
    // success handlers
    this._successHandler = function(){}
    this._fulfillmentHandlers = []
    // error handlers
    this._errorHandlers = []
    // complete (both success and fail) handlers
    this._completeHandlers = []
    this._erred = false
    this._responseArgs = {}

    var self = this

    fn = fn || function () {}

    if (o['timeout']) {
      this.timeout = setTimeout(function () {
        timedOut()
      }, o['timeout'])
    }

    if (o['success']) {
      this._successHandler = function () {
        o['success'].apply(o, arguments)
      }
    }

    if (o['error']) {
      this._errorHandlers.push(function () {
        o['error'].apply(o, arguments)
      })
    }

    if (o['complete']) {
      this._completeHandlers.push(function () {
        o['complete'].apply(o, arguments)
      })
    }

    function complete (resp) {
      o['timeout'] && clearTimeout(self.timeout)
      self.timeout = null
      while (self._completeHandlers.length > 0) {
        self._completeHandlers.shift()(resp)
      }
    }

    function success (resp) {
      var type = o['type'] || resp && setType(resp.getResponseHeader('Content-Type')) // resp can be undefined in IE
      resp = (type !== 'jsonp') ? self.request : resp
      // use global data filter on response text
      var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
        , r = filteredResponse
      try {
        resp.responseText = r
      } catch (e) {
        // can't assign this in IE<=8, just ignore
      }
      if (r) {
        switch (type) {
        case 'json':
          try {
            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
          } catch (err) {
            return error(resp, 'Could not parse JSON in response', err)
          }
          break
        case 'js':
          resp = eval(r)
          break
        case 'html':
          resp = r
          break
        case 'xml':
          resp = resp.responseXML
              && resp.responseXML.parseError // IE trololo
              && resp.responseXML.parseError.errorCode
              && resp.responseXML.parseError.reason
            ? null
            : resp.responseXML
          break
        }
      }

      self._responseArgs.resp = resp
      self._fulfilled = true
      fn(resp)
      self._successHandler(resp)
      while (self._fulfillmentHandlers.length > 0) {
        resp = self._fulfillmentHandlers.shift()(resp)
      }

      complete(resp)
    }

    function timedOut() {
      self._timedOut = true
      self.request.abort()      
    }

    function error(resp, msg, t) {
      resp = self.request
      self._responseArgs.resp = resp
      self._responseArgs.msg = msg
      self._responseArgs.t = t
      self._erred = true
      while (self._errorHandlers.length > 0) {
        self._errorHandlers.shift()(resp, msg, t)
      }
      complete(resp)
    }

    this.request = getRequest.call(this, success, error)
  }

  Reqwest.prototype = {
    abort: function () {
      this._aborted = true
      this.request.abort()
    }

  , retry: function () {
      init.call(this, this.o, this.fn)
    }

    /**
     * Small deviation from the Promises A CommonJs specification
     * http://wiki.commonjs.org/wiki/Promises/A
     */

    /**
     * `then` will execute upon successful requests
     */
  , then: function (success, fail) {
      success = success || function () {}
      fail = fail || function () {}
      if (this._fulfilled) {
        this._responseArgs.resp = success(this._responseArgs.resp)
      } else if (this._erred) {
        fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._fulfillmentHandlers.push(success)
        this._errorHandlers.push(fail)
      }
      return this
    }

    /**
     * `always` will execute whether the request succeeds or fails
     */
  , always: function (fn) {
      if (this._fulfilled || this._erred) {
        fn(this._responseArgs.resp)
      } else {
        this._completeHandlers.push(fn)
      }
      return this
    }

    /**
     * `fail` will execute when the request fails
     */
  , fail: function (fn) {
      if (this._erred) {
        fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._errorHandlers.push(fn)
      }
      return this
    }
  , 'catch': function (fn) {
      return this.fail(fn)
    }
  }

  function reqwest(o, fn) {
    return new Reqwest(o, fn)
  }

  // normalize newline variants according to spec -> CRLF
  function normalize(s) {
    return s ? s.replace(/\r?\n/g, '\r\n') : ''
  }

  function serial(el, cb) {
    var n = el.name
      , t = el.tagName.toLowerCase()
      , optCb = function (o) {
          // IE gives value="" even where there is no value attribute
          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
          if (o && !o['disabled'])
            cb(n, normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text']))
        }
      , ch, ra, val, i

    // don't serialize elements that are disabled or without a name
    if (el.disabled || !n) return

    switch (t) {
    case 'input':
      if (!/reset|button|image|file/i.test(el.type)) {
        ch = /checkbox/i.test(el.type)
        ra = /radio/i.test(el.type)
        val = el.value
        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
        ;(!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
      }
      break
    case 'textarea':
      cb(n, normalize(el.value))
      break
    case 'select':
      if (el.type.toLowerCase() === 'select-one') {
        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
      } else {
        for (i = 0; el.length && i < el.length; i++) {
          el.options[i].selected && optCb(el.options[i])
        }
      }
      break
    }
  }

  // collect up all form elements found from the passed argument elements all
  // the way down to child elements; pass a '<form>' or form fields.
  // called with 'this'=callback to use for serial() on each element
  function eachFormElement() {
    var cb = this
      , e, i
      , serializeSubtags = function (e, tags) {
          var i, j, fa
          for (i = 0; i < tags.length; i++) {
            fa = e[byTag](tags[i])
            for (j = 0; j < fa.length; j++) serial(fa[j], cb)
          }
        }

    for (i = 0; i < arguments.length; i++) {
      e = arguments[i]
      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
    }
  }

  // standard query string style serialization
  function serializeQueryString() {
    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
  }

  // { 'name': 'value', ... } style serialization
  function serializeHash() {
    var hash = {}
    eachFormElement.apply(function (name, value) {
      if (name in hash) {
        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
        hash[name].push(value)
      } else hash[name] = value
    }, arguments)
    return hash
  }

  // [ { name: 'name', value: 'value' }, ... ] style serialization
  reqwest.serializeArray = function () {
    var arr = []
    eachFormElement.apply(function (name, value) {
      arr.push({name: name, value: value})
    }, arguments)
    return arr
  }

  reqwest.serialize = function () {
    if (arguments.length === 0) return ''
    var opt, fn
      , args = Array.prototype.slice.call(arguments, 0)

    opt = args.pop()
    opt && opt.nodeType && args.push(opt) && (opt = null)
    opt && (opt = opt.type)

    if (opt == 'map') fn = serializeHash
    else if (opt == 'array') fn = reqwest.serializeArray
    else fn = serializeQueryString

    return fn.apply(null, args)
  }

  reqwest.toQueryString = function (o, trad) {
    var prefix, i
      , traditional = trad || false
      , s = []
      , enc = encodeURIComponent
      , add = function (key, value) {
          // If value is a function, invoke it and return its value
          value = ('function' === typeof value) ? value() : (value == null ? '' : value)
          s[s.length] = enc(key) + '=' + enc(value)
        }
    // If an array was passed in, assume that it is an array of form elements.
    if (isArray(o)) {
      for (i = 0; o && i < o.length; i++) add(o[i]['name'], o[i]['value'])
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in o) {
        if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add)
      }
    }

    // spaces should be + according to spec
    return s.join('&').replace(/%20/g, '+')
  }

  function buildParams(prefix, obj, traditional, add) {
    var name, i, v
      , rbracket = /\[\]$/

    if (isArray(obj)) {
      // Serialize array item.
      for (i = 0; obj && i < obj.length; i++) {
        v = obj[i]
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v)
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
        }
      }
    } else if (obj && obj.toString() === '[object Object]') {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
      }

    } else {
      // Serialize scalar item.
      add(prefix, obj)
    }
  }

  reqwest.getcallbackPrefix = function () {
    return callbackPrefix
  }

  // jQuery and Zepto compatibility, differences can be remapped here so you can call
  // .ajax.compat(options, callback)
  reqwest.compat = function (o, fn) {
    if (o) {
      o['type'] && (o['method'] = o['type']) && delete o['type']
      o['dataType'] && (o['type'] = o['dataType'])
      o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback']
      o['jsonp'] && (o['jsonpCallback'] = o['jsonp'])
    }
    return new Reqwest(o, fn)
  }

  reqwest.ajaxSetup = function (options) {
    options = options || {}
    for (var k in options) {
      globalSetupOptions[k] = options[k]
    }
  }

  return reqwest
});

},{}],29:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Component 组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Regular = require('regularjs');
var _ = require('./util.js');
var filter = require('./filter.js');

/**
 * @class Component
 * @extend Regular
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Component = Regular.extend({
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            readonly: false,
            disabled: false,
            visible: true,
            'class': ''
        });
        this.supr();
    }
})
.filter(filter)
.directive({

})

module.exports = Component;
},{"./filter.js":30,"./util.js":33,"regularjs":21}],30:[function(require,module,exports){
'use strict';

var filter = {};

filter.format = function() {
    function fix(str) {
        str = '' + (String(str) || '');
        return str.length <= 1? '0' + str : str;
    }
    var maps = {
        'yyyy': function(date){return date.getFullYear()},
        'MM': function(date){return fix(date.getMonth() + 1); },
        'dd': function(date){ return fix(date.getDate()) },
        'HH': function(date){return fix(date.getHours()) },
        'mm': function(date){ return fix(date.getMinutes())},
        'ss': function(date){ return fix(date.getSeconds())}
    }

    var trunk = new RegExp(Object.keys(maps).join('|'),'g');
    return function(value, format){
        if(!value){return '';}
        format = format || 'yyyy-MM-dd HH:mm';
        value = new Date(value);

        return format.replace(trunk, function(capture){
            return maps[capture]? maps[capture](value): '';
        });
    }
}();

filter.average = function(array, key) {
    array = array || [];
    return array.length? filter.total(array, key) / array.length : 0;
}
filter.total = function(array, key) {
    var total = 0;
    if(!array) return;
    array.forEach(function( item ){
        total += key? item[key] : item;
    })
    return total;
}

filter.filter = function(array, filterFn) {
    if(!array || !array.length) return;
    return array.filter(function(item, index){
        return filterFn(item, index);
    })
}

module.exports = filter;
},{}],31:[function(require,module,exports){
'use strict';

var reqwest = require('reqwest');
var ajax = {};
// var eventEmitter = new require('events').EventEmitter();
// var ajax = {
//     $on: eventEmitter.on,
//     $off: eventEmitter.removeListener,
//     $emit: eventEmitter.emit
// };

var Notify = require('../module/notify.js');

ajax.request = function(opt) {
    var noop = function(){};
    var oldError = opt.error || noop,
        oldSuccess = opt.success || noop,
        oldComplete = opt.complete || noop;

    opt.data = opt.data || {};

    if(!opt.contentType && opt.method && opt.method.toLowerCase() !== 'get')
        opt.contentType = 'application/json';
    else
        opt.data.timestamp = +new Date;

    if(opt.contentType === 'application/json') {
        opt.data = JSON.stringify(opt.data);
    }

    //ajax.$emit('start', opt);
    opt.success = function(data) {
        //ajax.$emit('success', data);

        if(data.code !== 200) {
            Notify.error(data.msg);
            oldError(data.result, data);
            return;
        }
        
        oldSuccess(data.result, data);
    }

    opt.error = function(data) {
        //ajax.$emit('error', data);
        oldError(data.result, data);
    }

    opt.complete = function(data) {
        //ajax.$emit('complete', data);
        oldComplete(data.result, data);
    }

    reqwest(opt);
}

module.exports = ajax;
},{"../module/notify.js":54,"reqwest":28}],32:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * SourceComponent 数据组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('./component.js');
var _ = require('./util.js');

/**
 * @class SourceComponent
 * @extend Component
 * @param {object[]=[]}             options.data.source             数据源
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var SourceComponent = Component.extend({
    service: null,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: []
        });

        if(this.data.service)
            this.service = this.data.service;

        if(this.service)
            this.$updateSource();

        this.supr();
    },
    /**
     * @method getParams 返回请求时需要的参数
     * @protected
     * @return {object}
     */
    getParams: function() {
        return {};
    },
    /**
     * @method $updateSource 从service中更新数据源
     * @public
     * @return {SourceComponent} this
     */
    $updateSource: function() {
        this.service.getList(this.getParams(), function(result) {
            this.$update('source', result);
        }.bind(this));
        return this;
    }
});

module.exports = SourceComponent;
},{"./component.js":29,"./util.js":33}],33:[function(require,module,exports){
'use strict';

var Regular = require('regularjs');

var _ = {
    extend: function(o1, o2, override) {
        for(var i in o2)
            if(override || o1[i] === undefined)
                o1[i] = o2[i]
        return o1;
    },
    dom: Regular.dom,
    multiline: function(func) {
        var reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
        return reg.exec(func)[1];
    }
}

module.exports = _;
},{"regularjs":21}],34:[function(require,module,exports){
module.exports="<div class=\"m-accordion {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <r-content /></div>"
},{}],35:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Accordion       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./accordion.html');
var itemTemplate = require('./accordionPane.html');
var _ = require('../base/util.js');

/**
 * @class Accordion
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Accordion = Component.extend({
    name: 'accordion',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: []
        });
        this.supr();
    }
});

var AccordionPane = Component.extend({
    name: 'accordionPane',
    template: itemTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            open: false
        });
        this.supr();

        if(this.$outer) {
            var source = this.$outer.data.source;
            var item = {
                name: this.data.name,
                open: open,
                disabled: this.data.disabled,
                accordion: this
            };
            source.push(item);
        }
    },
    toggle: function(open) {
        this.data.open = open;
    }
});

module.exports = Accordion;
},{"../base/component.js":29,"../base/util.js":33,"./accordion.html":34,"./accordionPane.html":36}],36:[function(require,module,exports){
module.exports="<div class=\"accordion_pane\">    <div class=\"accordion_pane_hd\" on-click={this.toggle(!open)}>{name}</div>    <div class=\"accordion_pane_bd\" r-hide={!open}>        <r-content>    </div></div>"
},{}],37:[function(require,module,exports){
module.exports="<div class=\"u-calendar {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <div class=\"calendar_hd\">        <span class=\"calendar_prev\">            <span class=\"calendar_item\" on-click={this.addYear(-1)}><i class=\"u-icon u-icon-angle-double-left\"></i></span>            <span class=\"calendar_item\" on-click={this.addMonth(-1)}><i class=\"u-icon u-icon-angle-left\"></i></span>        </span>        <span>{date | format: \'yyyy-MM\'}</span>        <span class=\"calendar_next\">            <span class=\"calendar_item\" on-click={this.addMonth(1)}><i class=\"u-icon u-icon-angle-right\"></i></span>            <span class=\"calendar_item\" on-click={this.addYear(1)}><i class=\"u-icon u-icon-angle-double-right\"></i></span>        </span>    </div>    <div class=\"calendar_bd\">        <div class=\"calendar_week\"><span class=\"calendar_item\">日</span><span class=\"calendar_item\">一</span><span class=\"calendar_item\">二</span><span class=\"calendar_item\">三</span><span class=\"calendar_item\">四</span><span class=\"calendar_item\">五</span><span class=\"calendar_item\">六</span></div>        <div class=\"calendar_day\">{#list _days as day}<span class=\"calendar_item\" r-class={ {\'z-sel\': date.toDateString() === day.toDateString(), \'z-dis\': day.getMonth() !== date.getMonth()} } on-click={this.select(day)}>{day | format: \'dd\'}</span>{/list}</div>    </div></div>"
},{}],38:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Calendar  日历
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./calendar.html');
var _ = require('../base/util.js');

/**
 * @class Calendar
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {Date=null}               options.data.date               当前选择的日期
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Calendar = Component.extend({
    name: 'calendar',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            date: null,
            _days: []
        });
        this.supr();

        this.$watch('date', function(newValue, oldValue) {
            if(newValue && oldValue && newValue.getFullYear() === oldValue.getFullYear() && newValue.getMonth() === oldValue.getMonth())
                return;

            this.update();
        });

        if(!this.data.date)
            this.goToday();
    },
    /**
     * @method update() 日期改变后更新日历
     * @private
     * @return {void}
     */
    update: function() {
        this.data._days = [];
        
        var date = this.data.date;
        var month = date.getMonth();
        var mfirst = new Date(date); mfirst.setDate(1);
        var mfirstTime = mfirst.getTime();
        var nfirst = new Date(mfirst); nfirst.setMonth(month + 1); nfirst.setDate(1);
        var nfirstTime = nfirst.getTime();
        var lastTime = nfirstTime + ((7 - nfirst.getDay())%7 - 1)*24*3600*1000;
        var num = - mfirst.getDay();
        var tmpTime, tmp;
        do {
            tmpTime = mfirstTime + (num++)*24*3600*1000;
            tmp = new Date(tmpTime);
            this.data._days.push(tmp);
        } while(tmpTime < lastTime);
    },
    /**
     * @method addYear(year) 调整年份
     * @public
     * @param  {number=0} year 加/减的年份
     * @return {void}
     */
    addYear: function(year) {
        if(this.data.readonly || this.data.disabled || !year)
            return;

        var date = new Date(this.data.date);
        date.setFullYear(date.getFullYear() + year);
        this.data.date = date;
    },
    /**
     * @method addMonth(month) 调整月份
     * @public
     * @param  {number=0} month 加/减的月份
     * @return {void}
     */
    addMonth: function(month) {
        if(this.data.readonly || this.data.disabled || !month)
            return;

        var date = new Date(this.data.date);
        date.setMonth(date.getMonth() + month);
        this.data.date = date;
    },
    /**
     * @method select(date) 选择一个日期
     * @public
     * @param  {Date=null} date 选择的日期
     * @return {void}
     */
    select: function(date) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.date = new Date(date);

        /**
         * @event select 选择某一个日期时触发
         * @property {object} date 当前选择的日期
         */
        this.$emit('select', {
            date: date
        });
    },
    /**
     * @method goToday() 回到今天
     * @public
     * @return {void}
     */
    goToday: function() {
        this.data.date = new Date((new Date().getTime()/(24*3600*1000)>>0)*(24*3600*1000));
    }
});

module.exports = Calendar;
},{"../base/component.js":29,"../base/util.js":33,"./calendar.html":37}],39:[function(require,module,exports){
module.exports=""
},{}],40:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Editor    编辑器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./editor.html');
var _ = require('../base/util.js');

/**
 * @class Editor
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {string=''}               options.data.content            对话框内容
 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
 * @param {function}                options.ok                      当点击确定的时候执行
 * @param {function}                options.cancel                  当点击取消的时候执行
 */
var Editor = Component.extend({
    name: 'modal',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '提示',
            content: '',
            okButton: true,
            cancelButton: false,
            width: null
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();
        // 证明不是内嵌组件
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method close(result) 关闭模态对话框
     * @public
     * @param  {boolean} result 点击确定还是取消
     * @return {void}
     */
    close: function(result) {
        /**
         * @event close 关闭对话框时触发
         * @property {boolean} result 点击了确定还是取消
         */
        this.$emit('close', {
            result: result
        });
        result ? this.ok() : this.cancel();
        this.destroy();
    },
    /**
     * @override
     */
    ok: function() {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok');
    },
    /**
     * @override
     */
    cancel: function() {
        /**
         * @event close 取消对话框时触发
         */
        this.$emit('cancel');
    }
});

module.exports = Editor;

},{"../base/component.js":29,"../base/util.js":33,"./editor.html":39}],41:[function(require,module,exports){
module.exports="<div class=\"m-gridview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    {#list source as item}    <div class=\"gridview_item\" r-class={ {\'z-sel\': selected === item} }>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>    {/list}</div>"
},{}],42:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * GridView  网格视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./gridView.html');
var _ = require('../base/util.js');

/**
 * @class GridView
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var GridView = SourceComponent.extend({
    name: 'gridView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: []
        });
        this.supr();
    }
});

module.exports = GridView;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./gridView.html":41}],43:[function(require,module,exports){
module.exports="<div class=\"m-editor {@(class)}\" r-hide={!visible}>    <div class=\"editor_preview\" r-html={html}></div>    <ul class=\"m-toolbar editor_toolbar\">        <li><a title=\"加粗\" on-click={this.bold()}><i class=\"u-icon u-icon-bold\"></i></a></li>        <li><a title=\"斜体\" on-click={this.italic()}><i class=\"u-icon u-icon-italic\"></i></a></li>        <li class=\"seperator\"></li>        <li><a title=\"引用\" on-click={this.quote()}><i class=\"u-icon u-icon-quote\"></i></a></li>        <li><a title=\"无序列表\" on-click={this.ul()}><i class=\"u-icon u-icon-list-ul\"></i></a></li>        <li><a title=\"有序列表\" on-click={this.ol()}><i class=\"u-icon u-icon-list-ol\"></i></a></li>        <li class=\"seperator\"></li>        <li><a title=\"链接\" on-click={this.link()}><i class=\"u-icon u-icon-link\"></i></a></li>        <li><a title=\"图片\" on-click={this.image()}><i class=\"u-icon u-icon-image\"></i></a></li>    </ul>    <textarea class=\"editor_textarea\" r-model={content} ref=\"textarea\" {#if readonly}readonly{/if}></textarea></div><uploader visible={false} url={imageUrl} extensions={extensions} ref=\"uploader\" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />"
},{}],44:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * HTMLEditor 编辑器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./htmlEditor.html');
var _ = require('../base/util.js');

/**
 * @class HTMLEditor
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {function}                options.cancel                  当点击取消的时候执行
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 */
var HTMLEditor = Component.extend({
    name: 'htmlEditor',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            content: ''
        });
        this.supr();
    },
    computed: {
        html: function() {
            return this.data.content;
        }
    },
    bold: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '**' + rangeData.text + '**';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    italic: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '*' + rangeData.text + '*';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    quote: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '> ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    ul: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '- ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    ol: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '1. ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    link: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '[链接](http://)';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    image: function() {
        this.$refs.uploader.upload();
    },
    latex: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '$$a^2 + b^2 = c^2$$';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    uploaderSuccess: function(data) {
        var rangeData = this.getCursorPosition();
        rangeData.text = '\n![](~/' + data.result + ')';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    uploaderError: function(e) {
        Notify.error(e);
    },
    getCursorPosition: function() {
        var textarea = this.$refs.textarea;

        var rangeData = {text: '', start: 0, end: 0 };
            textarea.focus();
        if (textarea.setSelectionRange) { // W3C
            rangeData.start= textarea.selectionStart;
            rangeData.end = textarea.selectionEnd;
            rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): '';
        } else if (document.selection) { // IE
            var i,
                oS = document.selection.createRange(),
                // Don't: oR = textarea.createTextRange()
                oR = document.body.createTextRange();
            oR.moveToElementText(textarea);

            rangeData.text = oS.text;
            rangeData.bookmark = oS.getBookmark();

            // object.moveStart(sUnit [, iCount])
            // Return Value: Integer that returns the number of units moved.
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart('character', -1) !== 0; i ++) {
                // Why? You can alert(textarea.value.length)
                if (textarea.value.charAt(i) == '\n') {
                    i ++;
                }
            }
            rangeData.start = i;
            rangeData.end = rangeData.text.length + rangeData.start;
        }

        return rangeData;
    },
    setCursorPosition: function(rangeData) {
        if(!rangeData) {
            alert("You must get cursor position first.")
        }
        var textarea = this.$refs.textarea;

        var oldValue = textarea.value;
        textarea.value = oldValue.substring(0, rangeData.start) + rangeData.text + oldValue.substring(rangeData.end, oldValue.length);
        rangeData.end = rangeData.start + rangeData.text.length;
        if (textarea.setSelectionRange) { // W3C
            textarea.focus();
            textarea.setSelectionRange(rangeData.start, rangeData.end);
        } else if (textarea.createTextRange) { // IE
            var oR = textarea.createTextRange();
            // Fixbug :
            // In IE, if cursor position at the end of textarea, the setCursorPosition function don't work
            if(textarea.value.length === rangeData.start) {
                oR.collapse(false)
                oR.select();
            } else {
                oR.moveToBookmark(rangeData.bookmark);
                oR.select();
            }
        }
    }
});

module.exports = HTMLEditor;

},{"../base/component.js":29,"../base/util.js":33,"./htmlEditor.html":43}],45:[function(require,module,exports){
module.exports="<ul class=\"m-listview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    {#list source as item}    <li r-class={ {\'z-sel\': selected === item} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>    {/list}</ul>"
},{}],46:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * ListView  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./listView.html');
var _ = require('../base/util.js');

/**
 * @class ListView
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=null}             options.data.itemTemplate       单项模板
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var ListView = SourceComponent.extend({
    name: 'listView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            itemTemplate: null
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

module.exports = ListView;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./listView.html":45}],47:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],48:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * MarkEditor 编辑器
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./markEditor.html');
var _ = require('../base/util.js');

var marked = require('marked');

/**
 * @class MarkEditor
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {function}                options.cancel                  当点击取消的时候执行
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 */
var MarkEditor = Component.extend({
    name: 'markEditor',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            content: ''
        });
        this.supr();
    },
    computed: {
        html: function() {
            return marked(this.data.content);
        }
    },
    bold: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '**' + rangeData.text + '**';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    italic: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '*' + rangeData.text + '*';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    quote: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '> ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    ul: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '- ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    ol: function() {
        var rangeData = this.getCursorPosition();
        var value = this.$refs.textarea.value;
        for(var i = rangeData.start; i > 0; i--)
            if(value[i] == '\n')
                break;
        rangeData.start = i;
        rangeData.text = '1. ';
        rangeData.end = rangeData.start;
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    link: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '[链接](http://)';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    image: function() {
        this.$refs.uploader.upload();
    },
    latex: function() {
        var rangeData = this.getCursorPosition();
        rangeData.text = '$$a^2 + b^2 = c^2$$';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    uploaderSuccess: function(data) {
        var rangeData = this.getCursorPosition();
        rangeData.text = '\n![](~/' + data.result + ')';
        this.setCursorPosition(rangeData);
        this.data.content = this.$refs.textarea.value;
        this.$update();
    },
    uploaderError: function(e) {
        Notify.error(e);
    },
    getCursorPosition: function() {
        var textarea = this.$refs.textarea;

        var rangeData = {text: '', start: 0, end: 0 };
            textarea.focus();
        if (textarea.setSelectionRange) { // W3C
            rangeData.start= textarea.selectionStart;
            rangeData.end = textarea.selectionEnd;
            rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): '';
        } else if (document.selection) { // IE
            var i,
                oS = document.selection.createRange(),
                // Don't: oR = textarea.createTextRange()
                oR = document.body.createTextRange();
            oR.moveToElementText(textarea);

            rangeData.text = oS.text;
            rangeData.bookmark = oS.getBookmark();

            // object.moveStart(sUnit [, iCount])
            // Return Value: Integer that returns the number of units moved.
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart('character', -1) !== 0; i ++) {
                // Why? You can alert(textarea.value.length)
                if (textarea.value.charAt(i) == '\n') {
                    i ++;
                }
            }
            rangeData.start = i;
            rangeData.end = rangeData.text.length + rangeData.start;
        }

        return rangeData;
    },
    setCursorPosition: function(rangeData) {
        if(!rangeData) {
            alert("You must get cursor position first.")
        }
        var textarea = this.$refs.textarea;

        var oldValue = textarea.value;
        textarea.value = oldValue.substring(0, rangeData.start) + rangeData.text + oldValue.substring(rangeData.end, oldValue.length);
        rangeData.end = rangeData.start + rangeData.text.length;
        if (textarea.setSelectionRange) { // W3C
            textarea.focus();
            textarea.setSelectionRange(rangeData.start, rangeData.end);
        } else if (textarea.createTextRange) { // IE
            var oR = textarea.createTextRange();
            // Fixbug :
            // In IE, if cursor position at the end of textarea, the setCursorPosition function don't work
            if(textarea.value.length === rangeData.start) {
                oR.collapse(false)
                oR.select();
            } else {
                oR.moveToBookmark(rangeData.bookmark);
                oR.select();
            }
        }
    }
});

module.exports = MarkEditor;

},{"../base/component.js":29,"../base/util.js":33,"./markEditor.html":47,"marked":2}],49:[function(require,module,exports){
module.exports="<div>    {#list source as item}    <menu name={item.name} source={item.children} />    {/list}</div>"
},{}],50:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Menubar  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./menubar.html');
var _ = require('../base/util.js');
var Menu = require('../unit/menu.js');

/**
 * @class Menubar
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=null}             options.data.itemTemplate       单项模板
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Menubar = SourceComponent.extend({
    name: 'menubar',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null
        });
        this.supr();
    }
});

module.exports = Menubar;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"../unit/menu.js":81,"./menubar.html":49}],51:[function(require,module,exports){
module.exports="<div class=\"m-modal {@(class)}\" on-keyup={this.keyup($event)} r-hide={!visible}>    <div class=\"modal_dialog\" {#if width}style=\"width: {width}px\"{/if}>        <div class=\"modal_hd\">            <a class=\"modal_close\" on-click={this.close(!cancelButton)}><i class=\"u-icon u-icon-close\"></i></a>            <h3 class=\"modal_title\">{title}</h3>        </div>        <div class=\"modal_bd\">            {#if contentTemplate}{#include @(contentTemplate)}{#else}{content}{/if}        </div>        <div class=\"modal_ft\">            {#if okButton}            <button class=\"u-btn u-btn-primary\" on-click={this.close(true)}>{okButton === true ? \'确定\' : okButton}</button>            {/if}            {#if cancelButton}            <button class=\"u-btn\" on-click={this.close(false)}>{cancelButton === true ? \'取消\' : cancelButton}</button>            {/if}        </div>    </div></div>"
},{}],52:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Modal     模态对话框
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./modal.html');
var _ = require('../base/util.js');

/**
 * @class Modal
 * @extend Component
 * @param {object}                  options.data                    绑定属性 | Binding Properties
 * @param {string='提示'}           options.data.title              对话框标题 | Title of Dialog
 * @param {string=''}               options.data.content            对话框内容
 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
 * @param {string=''}               options.data.class              补充class
 */
var Modal = Component.extend({
    name: 'modal',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '提示',
            content: '',
            okButton: true,
            cancelButton: false,
            width: null
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();
        // 证明不是内嵌组件
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method close(result) 关闭模态对话框
     * @public
     * @param  {boolean} result 点击确定还是取消
     * @return {void}
     */
    close: function(result) {
        /**
         * @event close 关闭对话框时触发
         * @property {boolean} result 点击了确定还是取消
         */
        this.$emit('close', {
            result: result
        });
        result ? this.ok() : this.cancel();
        this.destroy();
    },
    /**
     * @override
     */
    ok: function() {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok');

        this.destroy();
    },
    /**
     * @override
     */
    cancel: function() {
        /**
         * @event cancel 取消对话框时触发
         */
        this.$emit('cancel');

        this.destroy();
    },
    keyup: function($event) {
        if($event.which == 13)
            this.ok();
    }
});

/**
 * @method alert(content[,title]) 弹出一个alert对话框。关闭时始终触发确定事件。
 * @static
 * @public
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.alert = function(content, title, okButton) {
    var modal = new Modal({
        data: {
            content: content,
            title: title,
            okButton: okButton
        }
    });
    return modal;
}

/**
 * @method confirm(content[,title]) 弹出一个confirm对话框
 * @static
 * @public
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.confirm = function(content, title, okButton, cancelButton) {
    var modal = new Modal({
        data: {
            content: content,
            title: title,
            okButton: okButton,
            cancelButton: cancelButton || true
        }
    });
    return modal;
}

module.exports = Modal;

},{"../base/component.js":29,"../base/util.js":33,"./modal.html":51}],53:[function(require,module,exports){
module.exports="<div class=\"m-notify m-notify-{@(position)} {@(class)}\" r-hide={!visible}>    {#list messages as message}    <div class=\"notify_message notify_message-{@(message.type)}\" r-animation=\"on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;\">        <a class=\"notify_close\" on-click={this.close(message)}><i class=\"u-icon u-icon-close\"></i></a>        <div class=\"notify_text\"><i class=\"u-icon u-icon-{@(message.type)}-circle\" r-hide={@(!message.type)}></i> {@(message.text)}</div>    </div>    {/list}</div>"
},{}],54:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Notify    通知
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./notify.html');
var _ = require('../base/util.js');

/**
 * @class Notify
 * @extend Component
 * @param {object}                  options.data                    监听数据
 * @param {string='topcenter'}      options.data.position           通知的位置，可选参数：`topcenter`、`topleft`、`topright`、`bottomcenter`、`bottomleft`、`bottomright`、`static`
 * @param {number=2000}             options.data.duration           每条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Notify = Component.extend({
    name: 'notify',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            messages: [],
            position: 'topcenter',
            duration: 2000
        });
        this.supr();
    },
    /**
     * @protected
     */
    init: function() {
        this.supr();
        // 证明不是内嵌组件
        if(this.$root === this)
            this.$inject(document.body);
    },
    /**
     * @method show(text[,type][,duration]) 弹出一个消息
     * @public
     * @param  {string=''} text 消息内容
     * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
     * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
     * @return {void}
     */
    show: function(text, type, duration) {
        var message = {
            text: text,
            type: type,
            duration: duration >= 0 ? duration : this.data.duration
        };
        this.data.messages.unshift(message);
        this.$update();

        if(message.duration)
            this.$timeout(this.close.bind(this, message), message.duration);

        /**
         * @event show 弹出一个消息时触发
         * @property {object} message 弹出的消息对象
         */
        this.$emit('show', {
            message: message
        });
    },
    /**
     * @method close(message) 关闭某条消息
     * @public
     * @param  {object} message 需要关闭的消息对象
     * @return {void}
     */
    close: function(message) {
        var index = this.data.messages.indexOf(message);
        this.data.messages.splice(index, 1);
        this.$update();
        /**
         * @event close 关闭某条消息时触发
         * @property {object} message 关闭了的消息对象
         */
        this.$emit('close', {
            message: message
        });
    },
    /**
     * @method closeAll() 关闭所有消息
     * @public
     * @return {void}
     */
    closeAll: function() {
        this.$update('messages', []);
    }
}).use('$timeout');


/**
 * 直接初始化一个实例
 * @type {Notify}
 */
var notify = new Notify();
Notify.notify = notify;

/**
 * @method show(text[,type][,duration]) 弹出一个消息
 * @static
 * @public
 * @param  {string=''} text 消息内容
 * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
 * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @return {void}
 */
Notify.show = function() {
    notify.show.apply(notify, arguments);
}
/**
 * @method [info|success|warning|error](text) 弹出特殊类型的消息
 * @static
 * @public
 * @param  {string=''} text 消息内容
 * @return {void}
 */
var types = ['success', 'warning', 'info', 'error'];
types.forEach(function(type) {
    Notify[type] = function(text) {
        Notify.show(text, type);
    }
});
/**
 * @method close(message) 关闭某条消息
 * @static
 * @public
 * @param  {object} message 需要关闭的消息对象
 * @return {void}
 */
Notify.close = function() {
    notify.close.apply(notify, arguments);
}
/**
 * @method closeAll() 关闭所有消息
 * @static
 * @public
 * @return {void}
 */
Notify.closeAll = function() {
    notify.closeAll.apply(notify, arguments);
}

module.exports = Notify;
},{"../base/component.js":29,"../base/util.js":33,"./notify.html":53}],55:[function(require,module,exports){
module.exports="<ul class=\"m-pager m-pager-{@(position)} {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <li class=\"pager_prev\" r-class={ {\'z-dis\' : current <= 1} } on-click={this.select(current - 1)}><a>上一页</a></li>    {#if total - middle > side * 2 + 1}        {#list 1..side as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}        {#if _start > side + 1}<li>...</li>{/if}        {#list _start.._end as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}        {#if _end < total - side}<li>...</li>{/if}        {#list (total - side + 1)..total as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}    {#else}        {#list 1..total as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}    {/if}    <li class=\"pager_next\" r-class={ {\'z-dis\' : current >= total} } on-click={this.select(current + 1)}><a>下一页</a></li></ul>"
},{}],56:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Pager     分页
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./pager.html');
var _ = require('../base/util.js');

/**
 * @class Pager
 * @extend Component
 * @param {object}                  options.data                    监听数据
 * @param {number=1}                options.data.current            当前页
 * @param {total=11}                options.data.total              总页数
 * @param {string='center'}         options.data.position           分页的位置，可选参数：`center`、`left`、`right`
 * @param {middle=5}                options.data.middle             当页数较多时，中间显示的页数
 * @param {side=2}                  options.data.side               当页数较多时，两端显示的页数
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Pager = Component.extend({
    name: 'pager',
    template: template,
    config: function() {
        _.extend(this.data, {
            current: 1,
            total: 11,
            position: 'center',
            middle: 5,
            side: 2,
            _start: 1,
            _end: 5
        });
        this.supr();

        this.$watch(['current', 'total'], function(current, total) {
            var show = this.data.middle>>1;
            var side = this.data.side;

            this.data._start = current - show;
            this.data._end = current + show;
            if(this.data._start < side + 1)
                this.data._start = side + 1;
            if(this.data._end > total - side)
                this.data._end = total - side;
            if(current - this.data._start < show)
                this.data._end += this.data._start - current + show;
            if(this.data._end - current < show)
                this.data._start += this.data._end - current - show;
        });
    },
    /**
     * @method select(page) 选择某一页
     * @public
     * @param  {object} page 选择页
     * @return {void}
     */
    select: function(page) {
        if(this.data.readonly || this.data.disabled)
            return;

        if(page < 1) return;
        if(page > this.data.total) return;
        if(page == this.data.current) return;

        this.data.current = page;
        /**
         * @event select 选择某一页时触发
         * @property {object} current 当前选择页
         */
        this.$emit('select', {
            current: this.data.current
        });
    }
});

module.exports = Pager;
},{"../base/component.js":29,"../base/util.js":33,"./pager.html":55}],57:[function(require,module,exports){
module.exports="<div class=\"m-tab {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <ul class=\"tab_hd\">        {#list source as item}        <li r-class={ {\'z-crt\': item == selected, \'z-dis\': item.disabled} } on-click={this.select(item)}>{item.name}</li>        {/list}    </ul>    <div class=\"tab_bd\">        <r-content />    </div></div>"
},{}],58:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Tab       选项卡
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./tab.html');
var _ = require('../base/util.js');

/**
 * @class Tab
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Tab = Component.extend({
    name: 'tab',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            source: [],
            selected: null
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(item.disabled || this.data.readonly || this.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

var TabPane = Component.extend({
    name: 'tabPane',
    template: '<div r-hide={this.$outer.data.selected.tab != this}><r-content></div>',
    /**
     * @protected
     */
    config: function() { 
        if(this.$outer) {
            var source = this.$outer.data.source;
            var item = {
                name: this.data.name,
                disabled: this.data.disabled,
                tab: this
            };
            source.push(item);

            if(!this.$outer.data.selected)
                this.$outer.data.selected = item;
        }
    }
});

module.exports = Tab;
},{"../base/component.js":29,"../base/util.js":33,"./tab.html":57}],59:[function(require,module,exports){
module.exports="<table class=\"m-table m-tableview {@(class)}\" r-class={ {\'m-table-striped\': striped, \'m-table-hover\': hover} } r-hide={!visible}>    <thead>        <tr>            {#list fields as field}            <th r-class={ {\'tableview_sortable\': field.sortable} } on-click={this.sort(field)}>                {field.name || field.key}                {#if field.sortable}                    <i class=\"u-icon {order.by === field.key ? (order.desc ? \'u-icon-sort-desc\' : \'u-icon-sort-asc\') : \'u-icon-sort\'}\"></i>                {/if}            </th>            {/list}        </tr>    </thead>    <tbody>        {#list source as item}        <tr>            {#list fields as field}            <td>{item[field.key]}</td>            {/list}        </tr>        {/list}    </tbody></table>"
},{}],60:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TableView 表格视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./tableView.html');
var _ = require('../base/util.js');

/**
 * @class TableView
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object[]=[]}             options.data.field              字段集
 * @param {string}                  options.data.field[].key        每个字段的key
 * @param {string}                  options.data.field[].name       每个字段在表头显示的文字，如果没有则显示key
 * @param {boolean=false}           options.data.striped            是否显示条纹
 * @param {boolean=false}           options.data.hover              是否每行在hover时显示样式
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TableView = SourceComponent.extend({
    name: 'tableView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            fields: [],
            striped: false,
            hover: false,
            // TODO: 暂不考虑多字段排序
            order: {
                by: null,
                desc: false
            }
        });
        this.supr();
    },
    /**
     * @method sort(field) 按照某个字段排序
     * @public
     * @param  {object} field 排序字段
     * @return {void}
     */
    sort: function(field) {
        if(!field.sortable)
            return;

        var order = this.data.order;

        if(order.by === field.key)
            order.desc = !order.desc;
        else {
            order.by = field.key;
            order.desc = false;
        }

        if(this.service)
            this.$updateSource();
        else {
            this.data.source.sort(function(a, b) {
                if(order.desc)
                    return a[order.by] < b[order.by];
                else
                    return a[order.by] > b[order.by];
            });
        }
        /**
         * @event sort 按照某个字段排序时触发
         * @property {object} field 排序字段
         */
        this.$emit('sort', {
            field: field
        });
    }
});

module.exports = TableView;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./tableView.html":59}],61:[function(require,module,exports){
module.exports="<div class=\"m-treeview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <treeViewList source={source} visible={true} /></div>"
},{}],62:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TreeView  树型视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./treeView.html');
var hierarchicalTemplate = require('./treeViewList.html');
var _ = require('../base/util.js');

/**
 * @class TreeView
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {boolean=false}           options.data.hierarchical       是否分级动态加载，需要service
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TreeView = SourceComponent.extend({
    name: 'treeView',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            multiple: false,
            hierarchical: false
        });
        this.supr();

        this.$ancestor = this;
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

var TreeViewList = SourceComponent.extend({
    name: 'treeViewList',
    template: hierarchicalTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            visible: false
        });
        this.supr();

        this.$ancestor = this.$parent.$ancestor;
        this.service = this.$ancestor.service;
        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
        this.data.hierarchical = this.$ancestor.data.hierarchical;

        this.$watch('visible', function(newValue) {
            if(!this.data.hierarchical)
                return;

            if(!newValue || this.$parent.name !== 'treeViewList')
                return;

            this.$updateSource(function() {
                this.data.hierarchical = false;
            });
        });
    },
    /**
     * @override
     */
    getParams: function() {
        if(this.data.parent)
            return _.extend({parentId: this.data.parent.id}, this.$ancestor.getParams());
    },
    $updateSource: function() {
        this.service.getList(this.getParams(), function(result) {
            // 给每个节点item添加parent
            result.forEach(function(item) {
                item.parent = this.data.parent;
            }.bind(this));

            this.$update('source', result);

            this.$emit('updateSource', {
                result: result
            });
        }.bind(this));
        return this;
    },
    /**
     * @method select(item) 选择某一项
     * @private
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.$ancestor.data.disabled)
            return;

        this.$ancestor.select(item);
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        if(this.$ancestor.data.disabled)
            return;

        item.open = !item.open;

        /**
         * @event toggle 展开或收起某一项时触发
         * @property {object} item 展开收起项
         * @property {boolean} open 展开还是收起
         */
        this.$ancestor.$emit('toggle', {
            item: item,
            open: item.open
        });
    }
});

module.exports = TreeView;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./treeView.html":61,"./treeViewList.html":63}],63:[function(require,module,exports){
module.exports="<ul class=\"treeview_list\" r-hide={!visible}>    {#list source as item}    <li>        <div class=\"treeview_item\">            {#if item.childrenCount || (item.children && item.children.length)}            <i class=\"u-icon\" r-class={ {\'u-icon-caret-right\': !item.open, \'u-icon-caret-down\': item.open}} on-click={this.toggle(item)}></i>            {/if}            <div class=\"treeview_itemname\" r-class={ {\'z-sel\': this.$ancestor.data.selected === item} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>        </div>        {#if item.childrenCount || (item.children && item.children.length)}<treeViewList source={item.children} visible={item.open} parent={item} />{/if}    </li>    {/list}</ul>"
},{}],64:[function(require,module,exports){
module.exports="<label class=\"u-check2 {@(class)}\" r-class={ {\'z-dis\': disabled, \'z-chk\': checked, \'z-part\': checked === null, \'u-check2-block\': block} } r-hide={!visible} title={name} on-click={this.check(!checked)}><div class=\"check2_box\"><i class=\"u-icon u-icon-check\"></i></div> {name}</label>"
},{}],65:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Check2   多选按钮
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./check2.html');
var _ = require('../base/util.js');

/**
 * @class Check2
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.name               多选按钮的文字
 * @param {object=null}             options.data.checked            多选按钮的选择状态
 * @param {boolean=false}           options.data.block              是否以block方式显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Check2 = Component.extend({
    name: 'check2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            checked: false,
            block: false
        });
        this.supr();
    },
    /**
     * @method check(checked) 改变选中状态
     * @public
     * @param  {boolean} checked 选中状态
     * @return {void}
     */
    check: function(checked) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.checked = checked;
        /**
         * @event check 改变选中状态时触发
         * @property {boolean} checked 选中状态
         */
        this.$emit('check', {
            checked: checked
        });
    }
});

module.exports = Check2;
},{"../base/component.js":29,"../base/util.js":33,"./check2.html":64}],66:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <check2 name={item.name} checked={item.checked} disabled={disabled} block={block} />    {/list}</div>"
},{}],67:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Check2Group 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var CheckGroup = require('./checkGroup.js');
var template = require('./check2Group.html');
var _ = require('../base/util.js');
var Check2 = require('./check2.js');

/**
 * @class Check2Group
 * @extend CheckGroup
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Check2Group = CheckGroup.extend({
    name: 'check2Group',
    template: template
});

module.exports = Check2Group;
},{"../base/util.js":33,"./check2.js":65,"./check2Group.html":66,"./checkGroup.js":69}],68:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-check2\" r-class={ {\'z-dis\': disabled, \'u-check2-block\': block} } title={item.name}><input type=\"checkbox\" class=\"u-check\" r-model={item.checked} disabled={disabled}> {item.name}</label>    {/list}</div>"
},{}],69:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * CheckGroup 多选组
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./checkGroup.html');
var _ = require('../base/util.js');

/**
 * @class CheckGroup
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var CheckGroup = SourceComponent.extend({
    name: 'checkGroup',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            block: false
        });
        this.supr();
    },
    /**
     * @method checkAll(checked) 改变所有多选的选中状态
     * @public
     * @param  {object} checked 选中状态
     * @return {void}
     */
    checkAll: function(checked) {
        this.data.source.forEach(function(item) {
            item.checked = checked;
        });
        this.$update();
        /**
         * @event checkAll 改变所有多选的选中状态时触发
         * @property {object} checked 选中状态
         */
        this.$emit('checkAll', {
            checked: checked
        });
    }
});

module.exports = CheckGroup;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./checkGroup.html":68}],70:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: \'yyyy-MM-dd\'} on-focus={this.toggle(true)} on-change={this.change($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <calendar date={date} on-select={this.select($event.date)} />    </div></div>"
},{}],71:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * DatePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Dropdown = require('./dropdown.js');
var template = require('./datePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');
var Calendar = require('../module/calendar.js');

/**
 * @class DatePicker
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var DatePicker = Dropdown.extend({
    name: 'datePicker',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            placeholder: '请输入'
        });
        this.supr();
    },
    /**
     * @method select(date) 选择一个日期
     * @public
     * @param  {Date=null} date 选择的日期
     * @return {void}
     */
    select: function(date) {
        /**
         * @event select 选择某一项时触发
         * @property {object} date 当前选择项
         */
        this.$emit('select', {
            date: date
        });
        this.toggle(false);
    },
    change: function($event) {
        var date = new Date($event.target.value);
        if(date != 'Invalid Date')
            this.data.date = date;
    }
});

module.exports = DatePicker;
},{"../base/filter.js":30,"../base/util.js":33,"../module/calendar.js":38,"./datePicker.html":70,"./dropdown.js":75}],72:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest u-dropdown-datetimepicker {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: \'yyyy-MM-dd HH:mm\'} on-focus={this.toggle(true)} on-change={this.change($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <calendar date={selectedDate} on-select={this.select($event.date)} />        <ul class=\"m-listview\">            {#list source as item}            <li on-click={this.select(item)}>{item.name}</li>            {/list}        </ul>    </div></div>"
},{}],73:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * DateTimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var DatePicker = require('./datePicker.js');
var template = require('./dateTimePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');

/**
 * @class DateTimePicker
 * @extend DatePicker
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var DateTimePicker = DatePicker.extend({
    name: 'dateTimePicker',
    template: template,
    config: function() {
        var source = [];
        for(var i = 0; i < 10; i++) {
            source.push({name: '0' + i + ':00'});
            source.push({name: '0' + i + ':30'});
        }
        for(var i = 10; i < 24; i++) {
            source.push({name: i + ':00'});
            source.push({name: i + ':30'});
        }
        
        _.extend(this.data, {
            source: source,
            // @inherited source: [],
            // @inherited open: false,
            // @inherited placeholder: '请输入',
            selectedDate: new Date(),
            selectedTime: ''
        });
        this.supr();

        // this.$watch('selected', function(newValue, oldValue) {
        //     newValue = newValue || new Date();
        //     this.$refs.calendar.data.selected = newValue;

        //     var time =  filter.format(newValue, newValue.getMinutes()%30 === 0 ? 'HH:mm' : 'HH:00');
        //     for(var i = 0; i < this.data.source.length; i++) {
        //         var item = this.data.source[i];   
        //         if(time === item.name) {
        //             this.data.selectedTime = item;
        //             break;
        //         }
        //     }
        // });

        this.$watch(['selectedDate', 'selectedTime'], function(selectedDate, selectedTime) {
            if(selectedDate && selectedTime) {
                var date = new Date(this.data.selectedDate);
                var time = this.data.selectedTime.split(':');

                date.setHours(time[0]);
                date.setMinutes(time[1]);
                date.setSeconds(0);
                date.setMilliseconds(0);
                
                this.data.date = date;
            } else
                this.data.date = null;
        });
    },
    select: function(item) {
        /**
         * @event select 选择某一项时触发
         * @property {object} date 当前选择项
         */
        // this.$emit('select', {
        //     date: item
        // });

        if(!(item instanceof Date))
            this.data.selectedTime = item.name;

        if(!(item instanceof Date) || this.data.selectedTime)
            this.toggle(false);
    },
    change: function($event) {
        var value = $event.target.value;
        var date = new Date(value);
        if(date != 'Invalid Date') {
            // this.data.date = date;
            this.data.selectedDate = date;
            this.data.selectedTime = value.split(' ')[1];
        }
    }
});

module.exports = DateTimePicker;
},{"../base/filter.js":30,"../base/util.js":33,"./datePicker.js":71,"./dateTimePicker.html":72}],74:[function(require,module,exports){
module.exports="<div class=\"u-dropdown {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <a class=\"u-btn u-btn-primary\" on-click={this.toggle(!open)}>{name || \'菜单\'} <i class=\"u-icon u-icon-caret-down\"></i></a>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#list source as item}            <li on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>            {/list}        </ul>    </div></div>"
},{}],75:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Dropdown  下拉菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./dropdown.html');
var _ = require('../base/util.js');

/**
 * @class Dropdown
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {string=null}             options.data.itemTemplate       单项模板
 * @param {boolean=false}           options.data.open               当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Dropdown = SourceComponent.extend({
    name: 'dropdown',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            open: false
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
    /**
     * @method toggle(open) 在展开/收起状态之间切换
     * @public
     * @param  {boolean} open 展开/收起
     * @return {void}
     */
    toggle: function(open) {
        if(this.data.readonly || this.data.disabled)
            return;
        
        this.data.open = open;

        // 根据状态在Dropdown.opens列表中添加/删除管理项
        var index = Dropdown.opens.indexOf(this);
        if(open && index < 0)
            Dropdown.opens.push(this);
        else if(!open && index >= 0)
            Dropdown.opens.splice(index, 1);
    }
});

// 处理点击dropdown之外的地方后的收起事件。
Dropdown.opens = [];

_.dom.on(document.body, 'click', function(e) {
    Dropdown.opens.forEach(function(dropdown) {
        // 这个地方不能用stopPropagation来处理，因为展开一个dropdown的同时要收起其他dropdown
        var element = dropdown.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        dropdown.toggle(false);
        dropdown.$update();
    });
});

module.exports = Dropdown;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./dropdown.html":74}],76:[function(require,module,exports){
module.exports="<a class=\"u-btn\" on-click={this.gotop()}>回到顶部</a>"
},{}],77:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Gotop  回到顶部
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./gotop.html');
var _ = require('../base/util.js');

/**
 * @class Gotop
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Gotop = Component.extend({
    name: 'gotop',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {

        });
        this.supr();
    },
    /**
     * @method gotop() 回到顶部
     * @public
     * @return {void}
     */
    gotop: function() {
        if(this.data.readonly || this.data.disabled)
            return;

        document.body.scrollTop = 0;
    }
});

module.exports = Gotop;
},{"../base/component.js":29,"../base/util.js":33,"./gotop.html":76}],78:[function(require,module,exports){
module.exports="<label class=\"u-input2 {@(class)}\" r-hide={!visible}>    <input class=\"u-input u-input-{type}\" r-model={value} on-keyup={this.validate(value)}>    <span class=\"input2_tip\">{tip}</span></label>"
},{}],79:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Input2   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./input2.html');
var _ = require('../base/util.js');

/**
 * @class Input2
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Input2 = Component.extend({
    name: 'input2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            value: '',
            unit: '%',
            type: null
        });
        this.supr();
    },
    validate: function(value) {
        console.log(value);
        var reg = /^\d+$/;
        if(!reg.test(value)) {
            this.data.tip = '请输入数字！';
            this.data.type = 'error';
        } else {
            this.data.tip = '';
            this.data.type = 'success';
        }
    }
});

module.exports = Input2;
},{"../base/component.js":29,"../base/util.js":33,"./input2.html":78}],80:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-menu {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <a class=\"u-btn u-btn-primary\" on-click={this.toggle(!open)}>{name || \'菜单\'} <i class=\"u-icon u-icon-caret-down\"></i></a>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <menuList source={source} visible={true} />    </div></div>"
},{}],81:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Menu      多级菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Dropdown = require('./dropdown.js');
var SourceComponent = require('../base/sourceComponent.js');
var template = require('./menu.html');
var hierarchicalTemplate = require('./menuList.html');
var _ = require('../base/util.js');

/**
 * @class  Menu
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.open               当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Menu = Dropdown.extend({
    name: 'menu',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            open: false
        });
        this.supr();

        this.$ancestor = this;
    }
});

var MenuList = SourceComponent.extend({
    name: 'menuList',
    template: hierarchicalTemplate,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            // visible: false
        });
        this.supr();

        this.$ancestor = this.$parent.$ancestor;
        this.service = this.$ancestor.service;
        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
    },
    /**
     * @method select(item) 选择某一项
     * @private
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.$ancestor.data.disabled)
            return;

        this.$ancestor.select(item);
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        if(this.$ancestor.data.disabled)
            return;

        item.open = !item.open;

        /**
         * @event toggle 展开或收起某一项时触发
         * @property {object} item 展开收起项
         * @property {boolean} open 展开还是收起
         */
        this.$ancestor.$emit('toggle', {
            item: item,
            open: item.open
        });
    }
})

module.exports = Menu;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./dropdown.js":75,"./menu.html":80,"./menuList.html":82}],82:[function(require,module,exports){
module.exports="<ul class=\"m-listview menu_list\" r-hide={!visible}>    {#list source as item}    <li>        <div class=\"menu_item\">            {#if item.childrenCount || (item.children && item.children.length)}            <i class=\"u-icon u-icon-caret-right\"></i>            {/if}            <div class=\"menu_itemname\" title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>        </div>        {#if item.childrenCount || (item.children && item.children.length)}<menuList source={item.children} visible={item.open} parent={item} />{/if}    </li>    {/list}</ul>"
},{}],83:[function(require,module,exports){
module.exports="<label class=\"u-input2 u-input2-numberinput {@(class)}\" r-hide={!visible}>    <input class=\"u-input u-input-{type}\" r-model={value | number} on-keyup={this.validate(value)}>    <a class=\"u-btn\" on-click={this.increase()}><i class=\"u-icon u-icon-caret-up\"></i></a>    <a class=\"u-btn\" on-click={this.decrease()}><i class=\"u-icon u-icon-caret-down\"></i></a>    <span class=\"input2_tip\">{tip}</span></label>"
},{}],84:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * NumberInput 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./numberInput.html');
var _ = require('../base/util.js');

/**
 * @class NumberInput
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var NumberInput = Component.extend({
    name: 'numberInput',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            value: 0,
            unit: '%',
            type: null
        });
        this.supr();
    },
    validate: function(value) {
    },
    increase: function() {
        this.data.value++;
    },
    decrease: function() {
        this.data.value--;
    }
}).filter({
    number: {
        get: function(value) {
            return '' + (value || 0);
        },
        set: function(value) {
            return +value || 0;
            // return +(value.replace(/[^\d\.\-]/g, '')) || 0;
        }
    }
});

module.exports = NumberInput;
},{"../base/component.js":29,"../base/util.js":33,"./numberInput.html":83}],85:[function(require,module,exports){
module.exports="<div class=\"u-progress u-progress-{@(size)} u-progress-{@(type)} {@(class)}\" r-class={ {\'u-progress-striped\': striped, \'z-act\': active} } r-hide={!visible}>    <div class=\"progress_bar\" style=\"width: {percent}%;\">{text ? (text === true ? percent + \'%\' : text) : \'\'}</div></div>"
},{}],86:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Progress  进度条
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./progress.html');
var _ = require('../base/util.js');

/**
 * @class Progress
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {number=36}               options.data.percent            百分比
 * @param {string|boolean=true}     options.data.text               在进度条中是否显示百分比。值为`string`时显示该段文字。
 * @param {string=null}             options.data.size               进度条的尺寸
 * @param {string=null}             options.data.type               进度条的类型，改变显示颜色
 * @param {boolean=false}           options.data.striped            是否显示条纹
 * @param {boolean=false}           options.data.active             进度条是否为激活状态，当`striped`为`true`时，进度条显示动画
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Progress = Component.extend({
    name: 'progress',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            percent: 36,
            text: true,
            size: null,
            type: null,
            striped: false,
            active: false
        });
        this.supr();
    }
});

module.exports = Progress;
},{"../base/component.js":29,"../base/util.js":33,"./progress.html":85}],87:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-radio2\" r-class={ {\'z-dis\': disabled, \'z-sel\': item === selected, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><div class=\"radio2_box\"><i class=\"u-icon u-icon-radio\"></i></div> {item.name}</label>    {/list}</div>"
},{}],88:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Radio2Group 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var RadioGroup = require('./radioGroup.js');
var template = require('./radio2Group.html');
var _ = require('../base/util.js');

/**
 * @class Radio2Group
 * @extend RadioGroup
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.seleced            当前选择项
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Radio2Group = RadioGroup.extend({
    name: 'radio2Group',
    template: template
});

module.exports = Radio2Group;
},{"../base/util.js":33,"./radio2Group.html":87,"./radioGroup.js":90}],89:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-radio2\" r-class={ {\'z-dis\': disabled, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><input type=\"radio\" class=\"u-radio\" name={_radioGroupId} disabled={disabled}> {item.name}</label>    {/list}</div>"
},{}],90:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * RadioGroup 单选组
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./radioGroup.html');
var _ = require('../base/util.js');

/**
 * @class RadioGroup
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.seleced            当前选择项
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var RadioGroup = SourceComponent.extend({
    name: 'radioGroup',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            _radioGroupId: new Date()
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
    }
});

module.exports = RadioGroup;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./radioGroup.html":89}],91:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-select2 {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        <span>{selected ? selected.name : placeholder}</span>        <i class=\"u-icon u-icon-caret-down\"></i>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#if placeholder}<li r-class={ {\'z-sel\': selected === null} } on-click={this.select(null)}>{placeholder}</li>{/if}            {#list source as item}            <li r-class={ {\'z-sel\': selected === item} } on-click={this.select(item)}>{item.name}</li>            {/list}        </ul>    </div></div>"
},{}],92:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Select2  选择扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('./dropdown.js');
var template = require('./select2.html');
var _ = require('../base/util.js');

/**
 * @class Select2
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Select2 = Dropdown.extend({
    name: 'select2',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false
            selected: null,
            placeholder: '请选择'
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        this.$update('selected', item);
        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
});

module.exports = Select2;
},{"../base/util.js":33,"./dropdown.js":75,"./select2.html":91}],93:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} r-model={value} on-focus={this.input($event)} on-keyup={this.input($event)} on-blur={this.uninput($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#list source as item}            {#if this.filter(item)}                <li on-click={this.select(item)}>{item.name}</li>            {/if}            {/list}        </ul>    </div></div>"
},{}],94:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Suggest   自动提示
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('./dropdown.js');
var template = require('./suggest.html');
var _ = require('../base/util.js');
var ListView = require('../module/listView.js');

/**
 * @class Suggest
 * @extend Dropdown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=''}               options.data.value              文本框中的值
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {number=0}                options.data.minLength          最小提示长度。当输入长度>=该值后开始提示
 * @param {string='all'}            options.data.matchType          匹配方式，`all`表示匹配全局，`start`表示只匹配开头，`end`表示只匹配结尾
 * @param {boolean=false}           options.data.strict             是否为严格模式。当为严格模式时，`value`属性必须在source中选择，否则为空。
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Suggest = Dropdown.extend({
    name: 'suggest',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            selected: null,
            value: '',
            placeholder: '请输入',
            minLength: 0,
            delay: 300,
            matchType: 'all',
            strict: false
        });
        this.supr();
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        this.$update('selected', item);
        this.data.value = item.name;
        //this.data.selected = item;
        /**
         * @event select 选择某一项时触发
         * @property {object} selected 当前选择项
         */
        this.$emit('select', {
            selected: item
        });
        this.toggle(false);
    },
    /**
     * @method toggle(open)  在展开状态和收起状态之间切换
     * @public
     * @param  {boolean} open 展开还是收起
     * @return {void}
     */
    toggle: function(open, _isInput) {
        if(this.data.readonly || this.data.disabled)
            return;

        this.data.open = open;

        /**
         * @event toggle 展开或收起状态改变时触发
         * @property {boolean} open 展开还是收起
         */
        this.$emit('toggle', {
            open: open
        });

        var index = Dropdown.opens.indexOf(this);
        if(open && index < 0)
            Dropdown.opens.push(this);
        else if(!open && index >= 0) {
            Dropdown.opens.splice(index, 1);

            if(!_isInput && this.data.strict)
               this.data.value = this.data.selected ? this.data.selected.name : '';
        }
    },
    // 输入时
    input: function($event) {
        var value = this.data.value;

        if(value.length >= this.data.minLength)
            this.toggle(true);
        else
            this.toggle(false, true);
    },
    uninput: function($event) {

    },
    filter: function(item) {
        var value = this.data.value;

        if(!value && this.data.minLength)
            return false;

        if(this.data.matchType == 'all')
            return item.name.indexOf(value) >= 0;
        else if(this.data.matchType == 'start')
            return item.name.slice(0, value.length) == value;
        else if(this.data.matchType == 'end')
            return item.name.slice(-value.length) == value;
    }
});

module.exports = Suggest;
},{"../base/util.js":33,"../module/listView.js":46,"./dropdown.js":75,"./suggest.html":93}],95:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TimePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Suggest = require('./suggest.js');
var _ = require('../base/util.js');

/**
 * @class TimePicker
 * @extend Suggest
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.value              文本框中的值
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var TimePicker = Suggest.extend({
    name: 'timePicker',
    /**
     * @protected
     */
    config: function() {
        var source = [];
        for(var i = 0; i < 10; i++) {
            source.push({name: '0' + i + ':00'});
            source.push({name: '0' + i + ':30'});
        }
        for(var i = 10; i < 24; i++) {
            source.push({name: i + ':00'});
            source.push({name: i + ':30'});
        }

        _.extend(this.data, {
            source: source,
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited value: '',
            // @inherited placeholder: '请输入',
            // @inherited minLength: 0,
            // @inherited delay: 300,
            matchType: 'start'
            // @inherited strict: false
        });
        this.supr();
    },
    filter: function(item) {
        return true;
    }
});

module.exports = TimePicker;
},{"../base/util.js":33,"./suggest.js":94}],96:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-select2 {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        <i class=\"u-icon u-icon-caret-down\"></i>        <span>{selected ? selected.name : placeholder}</span>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <treeView source={source} on-select={this.select($event.selected)} />    </div></div>"
},{}],97:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Select2 = require('./select2.js');
var template = require('./treeSelect.html');
var _ = require('../base/util.js');
var Treeview = require('../module/treeView.js');

/**
 * @class TreeSelect
 * @extend Select2
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.readonly           是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TreeSelect = Select2.extend({
    name: 'treeSelect',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited placeholder: '请选择'
        });
        this.supr();
    }
});

module.exports = TreeSelect;
},{"../base/util.js":33,"../module/treeView.js":62,"./select2.js":92,"./treeSelect.html":96}],98:[function(require,module,exports){
module.exports="<div class=\"u-uploader {@(class)}\" r-hide={!visible}>    <a class=\"u-btn\" on-click={this.upload()}>{name || \'上传\'}</a>    <form method=\"POST\" action={url} target=\"iframe{_id}\" enctype={contentType} ref=\"form\">        <input type=\"file\" name=\"file\" ref=\"file\" on-change={this.submit()}>        {#list Object.keys(data) as key}        <input type=\"hidden\" name={key} value={data[key]}>        {/list}    </form>    <iframe name=\"iframe{_id}\" on-load={this.cbUpload()} ref=\"iframe\">    </iframe></div>"
},{}],99:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Uploader  上传
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./uploader.html');
var _ = require('../base/util.js');

/**
 * @class Uploader
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.name               按钮文字
 * @param {string=''}               options.data.url                上传路径
 * @param {string='json'}           options.data.dataType           数据类型
 * @param {object}                  options.data.data               附加数据
 * @param {string[]=null}           options.data.extensions         可上传的扩展名，如果为空，则表示可上传任何文件类型
 * @param {boolean=false}           options.data.disabled           是否禁用
 * @param {boolean=true}            options.data.visible            是否显示
 * @param {string=''}               options.data.class              补充class
 */
var Uploader = Component.extend({
    name: 'uploader',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            url: '',
            contentType: 'multipart/form-data',
            dataType: 'json',
            data: {},
            extensions: null,
            _id: new Date().getTime()
        });
        this.supr();
    },
    /**
     * @method upload() 弹出文件对话框并且上传文件
     * @public
     * @return {void}
     */
    upload: function() {
        this.$refs.file.click();
    },
    /**
     * @method submit() 提交表单
     * @private
     * @return {void}
     */
    submit: function() {
        if(this.data.extensions) {
            var fileName = this.$refs.file.value;
            var ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();

            if(this.data.extensions.indexOf(ext) === -1)
                return this.$emit('error', this.extensionError());
        }

        this.$emit('sending', this.data.data);

        this.$refs.form.submit();
    },
    cbUpload: function() {
        var iframe = this.$refs.iframe;

        var xml = {};
        try {
            if(iframe.contentWindow) {
                xml.responseText = iframe.contentWindow.document.body ? iframe.contentWindow.document.body.innerHTML : null;
                xml.responseXML = iframe.contentWindow.document.XMLDocument ? iframe.contentWindow.document.XMLDocument : iframe.contentWindow.document;
            } else if(iframe.contentDocument) {
                xml.responseText = iframe.contentDocument.document.body?iframe.contentDocument.document.body.innerHTML : null;
                xml.responseXML = iframe.contentDocument.document.XMLDocument?iframe.contentDocument.document.XMLDocument : iframe.contentDocument.document;
            }
        } catch(e) {
            console.log(e);
        }

        if(!xml.responseText)
            return;

        function uploadHttpData(r, type) {
            var data = (type == 'xml' || !type) ? r.responseXML : r.responseText;
            // If the type is 'script', eval it in global context
            if (type === 'json') {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    var text = /<pre.*?>(.*?)<\/pre>/.exec(data);
                    text = text ? text[1] : data;
                    data = JSON.parse(text);
                }
            }
            return data;
        }

        this.$emit('success', uploadHttpData(xml, this.data.dataType));
        this.$emit('complete', xml);

        this.$refs.file.value = '';
    },
    extensionError:　function() {
        return '只能上传' + this.data.extensions.join(', ')　+ '类型的文件！';
    },
});

module.exports = Uploader;
},{"../base/component.js":29,"../base/util.js":33,"./uploader.html":98}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWFya2VkL2xpYi9tYXJrZWQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9SZWd1bGFyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2FuaW1hdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2RpcmVjdGl2ZS9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2Zvcm0uanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9kb20uanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9lbnYuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9ncm91cC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9hbmltYXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2NvbWJpbmUuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZW50aXRpZXMuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZXh0ZW5kLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2ZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9zaGltLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL3dhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL21vZHVsZS90aW1lb3V0LmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvcGFyc2VyL0xleGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvcGFyc2VyL1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3BhcnNlci9ub2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3dhbGtlcnMuanMiLCJub2RlX21vZHVsZXMvcmVxd2VzdC9yZXF3ZXN0LmpzIiwic3JjL2pzL2Jhc2UvY29tcG9uZW50LmpzIiwic3JjL2pzL2Jhc2UvZmlsdGVyLmpzIiwic3JjL2pzL2Jhc2UvcmVxdWVzdC5qcyIsInNyYy9qcy9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcyIsInNyYy9qcy9iYXNlL3V0aWwuanMiLCJzcmMvanMvbW9kdWxlL2FjY29yZGlvbi5odG1sIiwic3JjL2pzL21vZHVsZS9hY2NvcmRpb24uanMiLCJzcmMvanMvbW9kdWxlL2FjY29yZGlvblBhbmUuaHRtbCIsInNyYy9qcy9tb2R1bGUvY2FsZW5kYXIuaHRtbCIsInNyYy9qcy9tb2R1bGUvY2FsZW5kYXIuanMiLCJzcmMvanMvbW9kdWxlL2VkaXRvci5odG1sIiwic3JjL2pzL21vZHVsZS9lZGl0b3IuanMiLCJzcmMvanMvbW9kdWxlL2dyaWRWaWV3Lmh0bWwiLCJzcmMvanMvbW9kdWxlL2dyaWRWaWV3LmpzIiwic3JjL2pzL21vZHVsZS9odG1sRWRpdG9yLmh0bWwiLCJzcmMvanMvbW9kdWxlL2h0bWxFZGl0b3IuanMiLCJzcmMvanMvbW9kdWxlL2xpc3RWaWV3Lmh0bWwiLCJzcmMvanMvbW9kdWxlL2xpc3RWaWV3LmpzIiwic3JjL2pzL21vZHVsZS9tYXJrRWRpdG9yLmpzIiwic3JjL2pzL21vZHVsZS9tZW51YmFyLmh0bWwiLCJzcmMvanMvbW9kdWxlL21lbnViYXIuanMiLCJzcmMvanMvbW9kdWxlL21vZGFsLmh0bWwiLCJzcmMvanMvbW9kdWxlL21vZGFsLmpzIiwic3JjL2pzL21vZHVsZS9ub3RpZnkuaHRtbCIsInNyYy9qcy9tb2R1bGUvbm90aWZ5LmpzIiwic3JjL2pzL21vZHVsZS9wYWdlci5odG1sIiwic3JjL2pzL21vZHVsZS9wYWdlci5qcyIsInNyYy9qcy9tb2R1bGUvdGFiLmh0bWwiLCJzcmMvanMvbW9kdWxlL3RhYi5qcyIsInNyYy9qcy9tb2R1bGUvdGFibGVWaWV3Lmh0bWwiLCJzcmMvanMvbW9kdWxlL3RhYmxlVmlldy5qcyIsInNyYy9qcy9tb2R1bGUvdHJlZVZpZXcuaHRtbCIsInNyYy9qcy9tb2R1bGUvdHJlZVZpZXcuanMiLCJzcmMvanMvbW9kdWxlL3RyZWVWaWV3TGlzdC5odG1sIiwic3JjL2pzL3VuaXQvY2hlY2syLmh0bWwiLCJzcmMvanMvdW5pdC9jaGVjazIuanMiLCJzcmMvanMvdW5pdC9jaGVjazJHcm91cC5odG1sIiwic3JjL2pzL3VuaXQvY2hlY2syR3JvdXAuanMiLCJzcmMvanMvdW5pdC9jaGVja0dyb3VwLmh0bWwiLCJzcmMvanMvdW5pdC9jaGVja0dyb3VwLmpzIiwic3JjL2pzL3VuaXQvZGF0ZVBpY2tlci5odG1sIiwic3JjL2pzL3VuaXQvZGF0ZVBpY2tlci5qcyIsInNyYy9qcy91bml0L2RhdGVUaW1lUGlja2VyLmh0bWwiLCJzcmMvanMvdW5pdC9kYXRlVGltZVBpY2tlci5qcyIsInNyYy9qcy91bml0L2Ryb3Bkb3duLmh0bWwiLCJzcmMvanMvdW5pdC9kcm9wZG93bi5qcyIsInNyYy9qcy91bml0L2dvdG9wLmh0bWwiLCJzcmMvanMvdW5pdC9nb3RvcC5qcyIsInNyYy9qcy91bml0L2lucHV0Mi5odG1sIiwic3JjL2pzL3VuaXQvaW5wdXQyLmpzIiwic3JjL2pzL3VuaXQvbWVudS5odG1sIiwic3JjL2pzL3VuaXQvbWVudS5qcyIsInNyYy9qcy91bml0L21lbnVMaXN0Lmh0bWwiLCJzcmMvanMvdW5pdC9udW1iZXJJbnB1dC5odG1sIiwic3JjL2pzL3VuaXQvbnVtYmVySW5wdXQuanMiLCJzcmMvanMvdW5pdC9wcm9ncmVzcy5odG1sIiwic3JjL2pzL3VuaXQvcHJvZ3Jlc3MuanMiLCJzcmMvanMvdW5pdC9yYWRpbzJHcm91cC5odG1sIiwic3JjL2pzL3VuaXQvcmFkaW8yR3JvdXAuanMiLCJzcmMvanMvdW5pdC9yYWRpb0dyb3VwLmh0bWwiLCJzcmMvanMvdW5pdC9yYWRpb0dyb3VwLmpzIiwic3JjL2pzL3VuaXQvc2VsZWN0Mi5odG1sIiwic3JjL2pzL3VuaXQvc2VsZWN0Mi5qcyIsInNyYy9qcy91bml0L3N1Z2dlc3QuaHRtbCIsInNyYy9qcy91bml0L3N1Z2dlc3QuanMiLCJzcmMvanMvdW5pdC90aW1lUGlja2VyLmpzIiwic3JjL2pzL3VuaXQvdHJlZVNlbGVjdC5odG1sIiwic3JjL2pzL3VuaXQvdHJlZVNlbGVjdC5qcyIsInNyYy9qcy91bml0L3VwbG9hZGVyLmh0bWwiLCJzcmMvanMvdW5pdC91cGxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4dkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3hmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JMQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUkdVSSAgICAgIFJlZ3VsYXIgVUnlupNcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSR1VJID0ge31cblxuLyoqXG4gKiBiYXNlXG4gKi9cblJHVUkuUmVndWxhciA9IHJlcXVpcmUoJ3JlZ3VsYXJqcycpO1xuUkdVSS5Db21wb25lbnQgPSByZXF1aXJlKCcuL2Jhc2UvY29tcG9uZW50LmpzJyk7XG5SR1VJLl8gPSByZXF1aXJlKCcuL2Jhc2UvdXRpbC5qcycpO1xuUkdVSS5yZXF1ZXN0ID0gcmVxdWlyZSgnLi9iYXNlL3JlcXVlc3QuanMnKTtcblxuLyoqXG4gKiBqc1VuaXRcbiAqL1xuLy8g5a+86Iiq57G7XG5SR1VJLkRyb3Bkb3duID0gcmVxdWlyZSgnLi91bml0L2Ryb3Bkb3duLmpzJyk7XG5SR1VJLk1lbnUgPSByZXF1aXJlKCcuL3VuaXQvbWVudS5qcycpO1xuXG4vLyDooajljZXnsbtcblJHVUkuSW5wdXQyID0gcmVxdWlyZSgnLi91bml0L2lucHV0Mi5qcycpO1xuUkdVSS5OdW1iZXJJbnB1dCA9IHJlcXVpcmUoJy4vdW5pdC9udW1iZXJJbnB1dC5qcycpO1xuUkdVSS5DaGVjazIgPSByZXF1aXJlKCcuL3VuaXQvY2hlY2syLmpzJyk7XG5SR1VJLkNoZWNrR3JvdXAgPSByZXF1aXJlKCcuL3VuaXQvY2hlY2tHcm91cC5qcycpO1xuUkdVSS5DaGVjazJHcm91cCA9IHJlcXVpcmUoJy4vdW5pdC9jaGVjazJHcm91cC5qcycpO1xuUkdVSS5SYWRpb0dyb3VwID0gcmVxdWlyZSgnLi91bml0L3JhZGlvR3JvdXAuanMnKTtcblJHVUkuUmFkaW8yR3JvdXAgPSByZXF1aXJlKCcuL3VuaXQvcmFkaW8yR3JvdXAuanMnKTtcblJHVUkuU2VsZWN0MiA9IHJlcXVpcmUoJy4vdW5pdC9zZWxlY3QyLmpzJyk7XG5SR1VJLlRyZWVTZWxlY3QgPSByZXF1aXJlKCcuL3VuaXQvdHJlZVNlbGVjdC5qcycpO1xuUkdVSS5TdWdnZXN0ID0gcmVxdWlyZSgnLi91bml0L3N1Z2dlc3QuanMnKTtcblJHVUkuVXBsb2FkZXIgPSByZXF1aXJlKCcuL3VuaXQvdXBsb2FkZXIuanMnKTtcblxuLy8g5pel5pyf57G7XG5SR1VJLkRhdGVQaWNrZXIgPSByZXF1aXJlKCcuL3VuaXQvZGF0ZVBpY2tlci5qcycpO1xuUkdVSS5UaW1lUGlja2VyID0gcmVxdWlyZSgnLi91bml0L3RpbWVQaWNrZXIuanMnKTtcblJHVUkuRGF0ZVRpbWVQaWNrZXIgPSByZXF1aXJlKCcuL3VuaXQvZGF0ZVRpbWVQaWNrZXIuanMnKTtcblxuLy8g5YW25LuWXG5SR1VJLlByb2dyZXNzID0gcmVxdWlyZSgnLi91bml0L3Byb2dyZXNzLmpzJyk7XG5SR1VJLkdvdG9wID0gcmVxdWlyZSgnLi91bml0L2dvdG9wLmpzJyk7XG5cbi8qKlxuICoganNNb2R1bGVcbiAqL1xuLy8g5a+86Iiq57G7XG5SR1VJLlRhYiA9IHJlcXVpcmUoJy4vbW9kdWxlL3RhYi5qcycpO1xuUkdVSS5BY2NvcmRpb24gPSByZXF1aXJlKCcuL21vZHVsZS9hY2NvcmRpb24uanMnKTtcblJHVUkuUGFnZXIgPSByZXF1aXJlKCcuL21vZHVsZS9wYWdlci5qcycpO1xuUkdVSS5NZW51YmFyID0gcmVxdWlyZSgnLi9tb2R1bGUvbWVudWJhci5qcycpO1xuXG4vLyDnqpflj6PnsbtcblJHVUkuTm90aWZ5ID0gcmVxdWlyZSgnLi9tb2R1bGUvbm90aWZ5LmpzJyk7XG5SR1VJLk1vZGFsID0gcmVxdWlyZSgnLi9tb2R1bGUvbW9kYWwuanMnKTtcblxuLy8g5pWw5o2u57G7XG5SR1VJLkxpc3RWaWV3ID0gcmVxdWlyZSgnLi9tb2R1bGUvbGlzdFZpZXcuanMnKTtcblJHVUkuR3JpZFZpZXcgPSByZXF1aXJlKCcuL21vZHVsZS9ncmlkVmlldy5qcycpO1xuUkdVSS5UcmVlVmlldyA9IHJlcXVpcmUoJy4vbW9kdWxlL3RyZWVWaWV3LmpzJyk7XG5SR1VJLlRhYmxlVmlldyA9IHJlcXVpcmUoJy4vbW9kdWxlL3RhYmxlVmlldy5qcycpO1xuXG4vLyDml6XmnJ/nsbtcblJHVUkuQ2FsZW5kYXIgPSByZXF1aXJlKCcuL21vZHVsZS9jYWxlbmRhci5qcycpO1xuXG4vLyDkuIrkvKDnsbtcbi8vXG5cbi8vIOe8lui+keWZqOexu1xuUkdVSS5FZGl0b3IgPSByZXF1aXJlKCcuL21vZHVsZS9lZGl0b3IuanMnKTtcblJHVUkuSFRNTEVkaXRvciA9IHJlcXVpcmUoJy4vbW9kdWxlL2h0bWxFZGl0b3IuanMnKTtcblJHVUkuTWFya0VkaXRvciA9IHJlcXVpcmUoJy4vbW9kdWxlL21hcmtFZGl0b3IuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuUkdVSSA9IFJHVUk7IiwiLyoqXG4gKiBtYXJrZWQgLSBhIG1hcmtkb3duIHBhcnNlclxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTQsIENocmlzdG9waGVyIEplZmZyZXkuIChNSVQgTGljZW5zZWQpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWRcbiAqL1xuXG47KGZ1bmN0aW9uKCkge1xuXG4vKipcbiAqIEJsb2NrLUxldmVsIEdyYW1tYXJcbiAqL1xuXG52YXIgYmxvY2sgPSB7XG4gIG5ld2xpbmU6IC9eXFxuKy8sXG4gIGNvZGU6IC9eKCB7NH1bXlxcbl0rXFxuKikrLyxcbiAgZmVuY2VzOiBub29wLFxuICBocjogL14oICpbLSpfXSl7Myx9ICooPzpcXG4rfCQpLyxcbiAgaGVhZGluZzogL14gKigjezEsNn0pICooW15cXG5dKz8pICojKiAqKD86XFxuK3wkKS8sXG4gIG5wdGFibGU6IG5vb3AsXG4gIGxoZWFkaW5nOiAvXihbXlxcbl0rKVxcbiAqKD18LSl7Mix9ICooPzpcXG4rfCQpLyxcbiAgYmxvY2txdW90ZTogL14oICo+W15cXG5dKyhcXG4oPyFkZWYpW15cXG5dKykqXFxuKikrLyxcbiAgbGlzdDogL14oICopKGJ1bGwpIFtcXHNcXFNdKz8oPzpocnxkZWZ8XFxuezIsfSg/ISApKD8hXFwxYnVsbCApXFxuKnxcXHMqJCkvLFxuICBodG1sOiAvXiAqKD86Y29tbWVudCAqKD86XFxufFxccyokKXxjbG9zZWQgKig/OlxcbnsyLH18XFxzKiQpfGNsb3NpbmcgKig/OlxcbnsyLH18XFxzKiQpKS8sXG4gIGRlZjogL14gKlxcWyhbXlxcXV0rKVxcXTogKjw/KFteXFxzPl0rKT4/KD86ICtbXCIoXShbXlxcbl0rKVtcIildKT8gKig/Olxcbit8JCkvLFxuICB0YWJsZTogbm9vcCxcbiAgcGFyYWdyYXBoOiAvXigoPzpbXlxcbl0rXFxuPyg/IWhyfGhlYWRpbmd8bGhlYWRpbmd8YmxvY2txdW90ZXx0YWd8ZGVmKSkrKVxcbiovLFxuICB0ZXh0OiAvXlteXFxuXSsvXG59O1xuXG5ibG9jay5idWxsZXQgPSAvKD86WyorLV18XFxkK1xcLikvO1xuYmxvY2suaXRlbSA9IC9eKCAqKShidWxsKSBbXlxcbl0qKD86XFxuKD8hXFwxYnVsbCApW15cXG5dKikqLztcbmJsb2NrLml0ZW0gPSByZXBsYWNlKGJsb2NrLml0ZW0sICdnbScpXG4gICgvYnVsbC9nLCBibG9jay5idWxsZXQpXG4gICgpO1xuXG5ibG9jay5saXN0ID0gcmVwbGFjZShibG9jay5saXN0KVxuICAoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAoJ2hyJywgJ1xcXFxuKyg/PVxcXFwxPyg/OlstKl9dICopezMsfSg/OlxcXFxuK3wkKSknKVxuICAoJ2RlZicsICdcXFxcbisoPz0nICsgYmxvY2suZGVmLnNvdXJjZSArICcpJylcbiAgKCk7XG5cbmJsb2NrLmJsb2NrcXVvdGUgPSByZXBsYWNlKGJsb2NrLmJsb2NrcXVvdGUpXG4gICgnZGVmJywgYmxvY2suZGVmKVxuICAoKTtcblxuYmxvY2suX3RhZyA9ICcoPyEoPzonXG4gICsgJ2F8ZW18c3Ryb25nfHNtYWxsfHN8Y2l0ZXxxfGRmbnxhYmJyfGRhdGF8dGltZXxjb2RlJ1xuICArICd8dmFyfHNhbXB8a2JkfHN1YnxzdXB8aXxifHV8bWFya3xydWJ5fHJ0fHJwfGJkaXxiZG8nXG4gICsgJ3xzcGFufGJyfHdicnxpbnN8ZGVsfGltZylcXFxcYilcXFxcdysoPyE6L3xbXlxcXFx3XFxcXHNAXSpAKVxcXFxiJztcblxuYmxvY2suaHRtbCA9IHJlcGxhY2UoYmxvY2suaHRtbClcbiAgKCdjb21tZW50JywgLzwhLS1bXFxzXFxTXSo/LS0+LylcbiAgKCdjbG9zZWQnLCAvPCh0YWcpW1xcc1xcU10rPzxcXC9cXDE+LylcbiAgKCdjbG9zaW5nJywgLzx0YWcoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vKVxuICAoL3RhZy9nLCBibG9jay5fdGFnKVxuICAoKTtcblxuYmxvY2sucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gICgnaHInLCBibG9jay5ocilcbiAgKCdoZWFkaW5nJywgYmxvY2suaGVhZGluZylcbiAgKCdsaGVhZGluZycsIGJsb2NrLmxoZWFkaW5nKVxuICAoJ2Jsb2NrcXVvdGUnLCBibG9jay5ibG9ja3F1b3RlKVxuICAoJ3RhZycsICc8JyArIGJsb2NrLl90YWcpXG4gICgnZGVmJywgYmxvY2suZGVmKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLm5vcm1hbCA9IG1lcmdlKHt9LCBibG9jayk7XG5cbi8qKlxuICogR0ZNIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5nZm0gPSBtZXJnZSh7fSwgYmxvY2subm9ybWFsLCB7XG4gIGZlbmNlczogL14gKihgezMsfXx+ezMsfSkgKihcXFMrKT8gKlxcbihbXFxzXFxTXSs/KVxccypcXDEgKig/Olxcbit8JCkvLFxuICBwYXJhZ3JhcGg6IC9eL1xufSk7XG5cbmJsb2NrLmdmbS5wYXJhZ3JhcGggPSByZXBsYWNlKGJsb2NrLnBhcmFncmFwaClcbiAgKCcoPyEnLCAnKD8hJ1xuICAgICsgYmxvY2suZ2ZtLmZlbmNlcy5zb3VyY2UucmVwbGFjZSgnXFxcXDEnLCAnXFxcXDInKSArICd8J1xuICAgICsgYmxvY2subGlzdC5zb3VyY2UucmVwbGFjZSgnXFxcXDEnLCAnXFxcXDMnKSArICd8JylcbiAgKCk7XG5cbi8qKlxuICogR0ZNICsgVGFibGVzIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay50YWJsZXMgPSBtZXJnZSh7fSwgYmxvY2suZ2ZtLCB7XG4gIG5wdGFibGU6IC9eICooXFxTLipcXHwuKilcXG4gKihbLTpdKyAqXFx8Wy18IDpdKilcXG4oKD86LipcXHwuKig/OlxcbnwkKSkqKVxcbiovLFxuICB0YWJsZTogL14gKlxcfCguKylcXG4gKlxcfCggKlstOl0rWy18IDpdKilcXG4oKD86ICpcXHwuKig/OlxcbnwkKSkqKVxcbiovXG59KTtcblxuLyoqXG4gKiBCbG9jayBMZXhlclxuICovXG5cbmZ1bmN0aW9uIExleGVyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbnMubGlua3MgPSB7fTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMucnVsZXMgPSBibG9jay5ub3JtYWw7XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhYmxlcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLnRhYmxlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLmdmbTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgQmxvY2sgUnVsZXNcbiAqL1xuXG5MZXhlci5ydWxlcyA9IGJsb2NrO1xuXG4vKipcbiAqIFN0YXRpYyBMZXggTWV0aG9kXG4gKi9cblxuTGV4ZXIubGV4ID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zKSB7XG4gIHZhciBsZXhlciA9IG5ldyBMZXhlcihvcHRpb25zKTtcbiAgcmV0dXJuIGxleGVyLmxleChzcmMpO1xufTtcblxuLyoqXG4gKiBQcmVwcm9jZXNzaW5nXG4gKi9cblxuTGV4ZXIucHJvdG90eXBlLmxleCA9IGZ1bmN0aW9uKHNyYykge1xuICBzcmMgPSBzcmNcbiAgICAucmVwbGFjZSgvXFxyXFxufFxcci9nLCAnXFxuJylcbiAgICAucmVwbGFjZSgvXFx0L2csICcgICAgJylcbiAgICAucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpXG4gICAgLnJlcGxhY2UoL1xcdTI0MjQvZywgJ1xcbicpO1xuXG4gIHJldHVybiB0aGlzLnRva2VuKHNyYywgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIExleGluZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS50b2tlbiA9IGZ1bmN0aW9uKHNyYywgdG9wLCBicSkge1xuICB2YXIgc3JjID0gc3JjLnJlcGxhY2UoL14gKyQvZ20sICcnKVxuICAgICwgbmV4dFxuICAgICwgbG9vc2VcbiAgICAsIGNhcFxuICAgICwgYnVsbFxuICAgICwgYlxuICAgICwgaXRlbVxuICAgICwgc3BhY2VcbiAgICAsIGlcbiAgICAsIGw7XG5cbiAgd2hpbGUgKHNyYykge1xuICAgIC8vIG5ld2xpbmVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5uZXdsaW5lLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChjYXBbMF0ubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnc3BhY2UnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvZGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5jb2RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGNhcCA9IGNhcFswXS5yZXBsYWNlKC9eIHs0fS9nbSwgJycpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdjb2RlJyxcbiAgICAgICAgdGV4dDogIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICAgID8gY2FwLnJlcGxhY2UoL1xcbiskLywgJycpXG4gICAgICAgICAgOiBjYXBcbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZmVuY2VzIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZmVuY2VzLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIGxhbmc6IGNhcFsyXSxcbiAgICAgICAgdGV4dDogY2FwWzNdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGhlYWRpbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5oZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIGRlcHRoOiBjYXBbMV0ubGVuZ3RoLFxuICAgICAgICB0ZXh0OiBjYXBbMl1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGFibGUgbm8gbGVhZGluZyBwaXBlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy5ucHRhYmxlLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogY2FwWzFdLnJlcGxhY2UoL14gKnwgKlxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgYWxpZ246IGNhcFsyXS5yZXBsYWNlKC9eICp8XFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBjZWxsczogY2FwWzNdLnJlcGxhY2UoL1xcbiQvLCAnJykuc3BsaXQoJ1xcbicpXG4gICAgICB9O1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5hbGlnbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoL14gKi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAncmlnaHQnO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdjZW50ZXInO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSsgKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZW0uY2VsbHNbaV0gPSBpdGVtLmNlbGxzW2ldLnNwbGl0KC8gKlxcfCAqLyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goaXRlbSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGhlYWRpbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgZGVwdGg6IGNhcFsyXSA9PT0gJz0nID8gMSA6IDIsXG4gICAgICAgIHRleHQ6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoclxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmhyLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaHInXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGJsb2NrcXVvdGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ibG9ja3F1b3RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdibG9ja3F1b3RlX3N0YXJ0J1xuICAgICAgfSk7XG5cbiAgICAgIGNhcCA9IGNhcFswXS5yZXBsYWNlKC9eICo+ID8vZ20sICcnKTtcblxuICAgICAgLy8gUGFzcyBgdG9wYCB0byBrZWVwIHRoZSBjdXJyZW50XG4gICAgICAvLyBcInRvcGxldmVsXCIgc3RhdGUuIFRoaXMgaXMgZXhhY3RseVxuICAgICAgLy8gaG93IG1hcmtkb3duLnBsIHdvcmtzLlxuICAgICAgdGhpcy50b2tlbihjYXAsIHRvcCwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9lbmQnXG4gICAgICB9KTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGlzdFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxpc3QuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgYnVsbCA9IGNhcFsyXTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaXN0X3N0YXJ0JyxcbiAgICAgICAgb3JkZXJlZDogYnVsbC5sZW5ndGggPiAxXG4gICAgICB9KTtcblxuICAgICAgLy8gR2V0IGVhY2ggdG9wLWxldmVsIGl0ZW0uXG4gICAgICBjYXAgPSBjYXBbMF0ubWF0Y2godGhpcy5ydWxlcy5pdGVtKTtcblxuICAgICAgbmV4dCA9IGZhbHNlO1xuICAgICAgbCA9IGNhcC5sZW5ndGg7XG4gICAgICBpID0gMDtcblxuICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGNhcFtpXTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGxpc3QgaXRlbSdzIGJ1bGxldFxuICAgICAgICAvLyBzbyBpdCBpcyBzZWVuIGFzIHRoZSBuZXh0IHRva2VuLlxuICAgICAgICBzcGFjZSA9IGl0ZW0ubGVuZ3RoO1xuICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC9eICooWyorLV18XFxkK1xcLikgKy8sICcnKTtcblxuICAgICAgICAvLyBPdXRkZW50IHdoYXRldmVyIHRoZVxuICAgICAgICAvLyBsaXN0IGl0ZW0gY29udGFpbnMuIEhhY2t5LlxuICAgICAgICBpZiAofml0ZW0uaW5kZXhPZignXFxuICcpKSB7XG4gICAgICAgICAgc3BhY2UgLT0gaXRlbS5sZW5ndGg7XG4gICAgICAgICAgaXRlbSA9ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICAgID8gaXRlbS5yZXBsYWNlKG5ldyBSZWdFeHAoJ14gezEsJyArIHNwYWNlICsgJ30nLCAnZ20nKSwgJycpXG4gICAgICAgICAgICA6IGl0ZW0ucmVwbGFjZSgvXiB7MSw0fS9nbSwgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIG5leHQgbGlzdCBpdGVtIGJlbG9uZ3MgaGVyZS5cbiAgICAgICAgLy8gQmFja3BlZGFsIGlmIGl0IGRvZXMgbm90IGJlbG9uZyBpbiB0aGlzIGxpc3QuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc21hcnRMaXN0cyAmJiBpICE9PSBsIC0gMSkge1xuICAgICAgICAgIGIgPSBibG9jay5idWxsZXQuZXhlYyhjYXBbaSArIDFdKVswXTtcbiAgICAgICAgICBpZiAoYnVsbCAhPT0gYiAmJiAhKGJ1bGwubGVuZ3RoID4gMSAmJiBiLmxlbmd0aCA+IDEpKSB7XG4gICAgICAgICAgICBzcmMgPSBjYXAuc2xpY2UoaSArIDEpLmpvaW4oJ1xcbicpICsgc3JjO1xuICAgICAgICAgICAgaSA9IGwgLSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIGl0ZW0gaXMgbG9vc2Ugb3Igbm90LlxuICAgICAgICAvLyBVc2U6IC8oXnxcXG4pKD8hIClbXlxcbl0rXFxuXFxuKD8hXFxzKiQpL1xuICAgICAgICAvLyBmb3IgZGlzY291bnQgYmVoYXZpb3IuXG4gICAgICAgIGxvb3NlID0gbmV4dCB8fCAvXFxuXFxuKD8hXFxzKiQpLy50ZXN0KGl0ZW0pO1xuICAgICAgICBpZiAoaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBuZXh0ID0gaXRlbS5jaGFyQXQoaXRlbS5sZW5ndGggLSAxKSA9PT0gJ1xcbic7XG4gICAgICAgICAgaWYgKCFsb29zZSkgbG9vc2UgPSBuZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogbG9vc2VcbiAgICAgICAgICAgID8gJ2xvb3NlX2l0ZW1fc3RhcnQnXG4gICAgICAgICAgICA6ICdsaXN0X2l0ZW1fc3RhcnQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlY3Vyc2UuXG4gICAgICAgIHRoaXMudG9rZW4oaXRlbSwgZmFsc2UsIGJxKTtcblxuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnbGlzdF9pdGVtX2VuZCdcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9lbmQnXG4gICAgICB9KTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHRtbFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmh0bWwuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICAgID8gJ3BhcmFncmFwaCdcbiAgICAgICAgICA6ICdodG1sJyxcbiAgICAgICAgcHJlOiBjYXBbMV0gPT09ICdwcmUnIHx8IGNhcFsxXSA9PT0gJ3NjcmlwdCcgfHwgY2FwWzFdID09PSAnc3R5bGUnLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVmXG4gICAgaWYgKCghYnEgJiYgdG9wKSAmJiAoY2FwID0gdGhpcy5ydWxlcy5kZWYuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLmxpbmtzW2NhcFsxXS50b0xvd2VyQ2FzZSgpXSA9IHtcbiAgICAgICAgaHJlZjogY2FwWzJdLFxuICAgICAgICB0aXRsZTogY2FwWzNdXG4gICAgICB9O1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGFibGUgKGdmbSlcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLnRhYmxlLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogY2FwWzFdLnJlcGxhY2UoL14gKnwgKlxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgYWxpZ246IGNhcFsyXS5yZXBsYWNlKC9eICp8XFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBjZWxsczogY2FwWzNdLnJlcGxhY2UoLyg/OiAqXFx8ICopP1xcbiQvLCAnJykuc3BsaXQoJ1xcbicpXG4gICAgICB9O1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5hbGlnbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoL14gKi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAncmlnaHQnO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdjZW50ZXInO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSsgKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZW0uY2VsbHNbaV0gPSBpdGVtLmNlbGxzW2ldXG4gICAgICAgICAgLnJlcGxhY2UoL14gKlxcfCAqfCAqXFx8ICokL2csICcnKVxuICAgICAgICAgIC5zcGxpdCgvICpcXHwgKi8pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0b3AtbGV2ZWwgcGFyYWdyYXBoXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy5wYXJhZ3JhcGguZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAncGFyYWdyYXBoJyxcbiAgICAgICAgdGV4dDogY2FwWzFdLmNoYXJBdChjYXBbMV0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nXG4gICAgICAgICAgPyBjYXBbMV0uc2xpY2UoMCwgLTEpXG4gICAgICAgICAgOiBjYXBbMV1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGV4dFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRleHQuZXhlYyhzcmMpKSB7XG4gICAgICAvLyBUb3AtbGV2ZWwgc2hvdWxkIG5ldmVyIHJlYWNoIGhlcmUuXG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzcmMpIHtcbiAgICAgIHRocm93IG5ld1xuICAgICAgICBFcnJvcignSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzLnRva2Vucztcbn07XG5cbi8qKlxuICogSW5saW5lLUxldmVsIEdyYW1tYXJcbiAqL1xuXG52YXIgaW5saW5lID0ge1xuICBlc2NhcGU6IC9eXFxcXChbXFxcXGAqe31cXFtcXF0oKSMrXFwtLiFfPl0pLyxcbiAgYXV0b2xpbms6IC9ePChbXiA+XSsoQHw6XFwvKVteID5dKyk+LyxcbiAgdXJsOiBub29wLFxuICB0YWc6IC9ePCEtLVtcXHNcXFNdKj8tLT58XjxcXC8/XFx3Kyg/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXidcIj5dKSo/Pi8sXG4gIGxpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxcKGhyZWZcXCkvLFxuICByZWZsaW5rOiAvXiE/XFxbKGluc2lkZSlcXF1cXHMqXFxbKFteXFxdXSopXFxdLyxcbiAgbm9saW5rOiAvXiE/XFxbKCg/OlxcW1teXFxdXSpcXF18W15cXFtcXF1dKSopXFxdLyxcbiAgc3Ryb25nOiAvXl9fKFtcXHNcXFNdKz8pX18oPyFfKXxeXFwqXFwqKFtcXHNcXFNdKz8pXFwqXFwqKD8hXFwqKS8sXG4gIGVtOiAvXlxcYl8oKD86X198W1xcc1xcU10pKz8pX1xcYnxeXFwqKCg/OlxcKlxcKnxbXFxzXFxTXSkrPylcXCooPyFcXCopLyxcbiAgY29kZTogL14oYCspXFxzKihbXFxzXFxTXSo/W15gXSlcXHMqXFwxKD8hYCkvLFxuICBicjogL14gezIsfVxcbig/IVxccyokKS8sXG4gIGRlbDogbm9vcCxcbiAgdGV4dDogL15bXFxzXFxTXSs/KD89W1xcXFw8IVxcW18qYF18IHsyLH1cXG58JCkvXG59O1xuXG5pbmxpbmUuX2luc2lkZSA9IC8oPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXXxcXF0oPz1bXlxcW10qXFxdKSkqLztcbmlubGluZS5faHJlZiA9IC9cXHMqPD8oW1xcc1xcU10qPyk+Pyg/OlxccytbJ1wiXShbXFxzXFxTXSo/KVsnXCJdKT9cXHMqLztcblxuaW5saW5lLmxpbmsgPSByZXBsYWNlKGlubGluZS5saW5rKVxuICAoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAoJ2hyZWYnLCBpbmxpbmUuX2hyZWYpXG4gICgpO1xuXG5pbmxpbmUucmVmbGluayA9IHJlcGxhY2UoaW5saW5lLnJlZmxpbmspXG4gICgnaW5zaWRlJywgaW5saW5lLl9pbnNpZGUpXG4gICgpO1xuXG4vKipcbiAqIE5vcm1hbCBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5ub3JtYWwgPSBtZXJnZSh7fSwgaW5saW5lKTtcblxuLyoqXG4gKiBQZWRhbnRpYyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5wZWRhbnRpYyA9IG1lcmdlKHt9LCBpbmxpbmUubm9ybWFsLCB7XG4gIHN0cm9uZzogL15fXyg/PVxcUykoW1xcc1xcU10qP1xcUylfXyg/IV8pfF5cXCpcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqXFwqKD8hXFwqKS8sXG4gIGVtOiAvXl8oPz1cXFMpKFtcXHNcXFNdKj9cXFMpXyg/IV8pfF5cXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqKD8hXFwqKS9cbn0pO1xuXG4vKipcbiAqIEdGTSBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5nZm0gPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBlc2NhcGU6IHJlcGxhY2UoaW5saW5lLmVzY2FwZSkoJ10pJywgJ358XSknKSgpLFxuICB1cmw6IC9eKGh0dHBzPzpcXC9cXC9bXlxcczxdK1tePC4sOjtcIicpXFxdXFxzXSkvLFxuICBkZWw6IC9efn4oPz1cXFMpKFtcXHNcXFNdKj9cXFMpfn4vLFxuICB0ZXh0OiByZXBsYWNlKGlubGluZS50ZXh0KVxuICAgICgnXXwnLCAnfl18JylcbiAgICAoJ3wnLCAnfGh0dHBzPzovL3wnKVxuICAgICgpXG59KTtcblxuLyoqXG4gKiBHRk0gKyBMaW5lIEJyZWFrcyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5icmVha3MgPSBtZXJnZSh7fSwgaW5saW5lLmdmbSwge1xuICBicjogcmVwbGFjZShpbmxpbmUuYnIpKCd7Mix9JywgJyonKSgpLFxuICB0ZXh0OiByZXBsYWNlKGlubGluZS5nZm0udGV4dCkoJ3syLH0nLCAnKicpKClcbn0pO1xuXG4vKipcbiAqIElubGluZSBMZXhlciAmIENvbXBpbGVyXG4gKi9cblxuZnVuY3Rpb24gSW5saW5lTGV4ZXIobGlua3MsIG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMubGlua3MgPSBsaW5rcztcbiAgdGhpcy5ydWxlcyA9IGlubGluZS5ub3JtYWw7XG4gIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgaWYgKCF0aGlzLmxpbmtzKSB7XG4gICAgdGhyb3cgbmV3XG4gICAgICBFcnJvcignVG9rZW5zIGFycmF5IHJlcXVpcmVzIGEgYGxpbmtzYCBwcm9wZXJ0eS4nKTtcbiAgfVxuXG4gIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5icmVha3MpIHtcbiAgICAgIHRoaXMucnVsZXMgPSBpbmxpbmUuYnJlYWtzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzID0gaW5saW5lLmdmbTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgdGhpcy5ydWxlcyA9IGlubGluZS5wZWRhbnRpYztcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBJbmxpbmUgUnVsZXNcbiAqL1xuXG5JbmxpbmVMZXhlci5ydWxlcyA9IGlubGluZTtcblxuLyoqXG4gKiBTdGF0aWMgTGV4aW5nL0NvbXBpbGluZyBNZXRob2RcbiAqL1xuXG5JbmxpbmVMZXhlci5vdXRwdXQgPSBmdW5jdGlvbihzcmMsIGxpbmtzLCBvcHRpb25zKSB7XG4gIHZhciBpbmxpbmUgPSBuZXcgSW5saW5lTGV4ZXIobGlua3MsIG9wdGlvbnMpO1xuICByZXR1cm4gaW5saW5lLm91dHB1dChzcmMpO1xufTtcblxuLyoqXG4gKiBMZXhpbmcvQ29tcGlsaW5nXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm91dHB1dCA9IGZ1bmN0aW9uKHNyYykge1xuICB2YXIgb3V0ID0gJydcbiAgICAsIGxpbmtcbiAgICAsIHRleHRcbiAgICAsIGhyZWZcbiAgICAsIGNhcDtcblxuICB3aGlsZSAoc3JjKSB7XG4gICAgLy8gZXNjYXBlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZXNjYXBlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSBjYXBbMV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBhdXRvbGlua1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmF1dG9saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChjYXBbMl0gPT09ICdAJykge1xuICAgICAgICB0ZXh0ID0gY2FwWzFdLmNoYXJBdCg2KSA9PT0gJzonXG4gICAgICAgICAgPyB0aGlzLm1hbmdsZShjYXBbMV0uc3Vic3RyaW5nKDcpKVxuICAgICAgICAgIDogdGhpcy5tYW5nbGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRoaXMubWFuZ2xlKCdtYWlsdG86JykgKyB0ZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZShjYXBbMV0pO1xuICAgICAgICBocmVmID0gdGV4dDtcbiAgICAgIH1cbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgbnVsbCwgdGV4dCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB1cmwgKGdmbSlcbiAgICBpZiAoIXRoaXMuaW5MaW5rICYmIChjYXAgPSB0aGlzLnJ1bGVzLnVybC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGV4dCA9IGVzY2FwZShjYXBbMV0pO1xuICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGFnXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGFnLmV4ZWMoc3JjKSkge1xuICAgICAgaWYgKCF0aGlzLmluTGluayAmJiAvXjxhIC9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5MaW5rICYmIC9ePFxcL2E+L2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICA/IGVzY2FwZShjYXBbMF0pXG4gICAgICAgIDogY2FwWzBdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGlua1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxpbmsuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgb3V0ICs9IHRoaXMub3V0cHV0TGluayhjYXAsIHtcbiAgICAgICAgaHJlZjogY2FwWzJdLFxuICAgICAgICB0aXRsZTogY2FwWzNdXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyByZWZsaW5rLCBub2xpbmtcbiAgICBpZiAoKGNhcCA9IHRoaXMucnVsZXMucmVmbGluay5leGVjKHNyYykpXG4gICAgICAgIHx8IChjYXAgPSB0aGlzLnJ1bGVzLm5vbGluay5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgbGluayA9IChjYXBbMl0gfHwgY2FwWzFdKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICBsaW5rID0gdGhpcy5saW5rc1tsaW5rLnRvTG93ZXJDYXNlKCldO1xuICAgICAgaWYgKCFsaW5rIHx8ICFsaW5rLmhyZWYpIHtcbiAgICAgICAgb3V0ICs9IGNhcFswXS5jaGFyQXQoMCk7XG4gICAgICAgIHNyYyA9IGNhcFswXS5zdWJzdHJpbmcoMSkgKyBzcmM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgb3V0ICs9IHRoaXMub3V0cHV0TGluayhjYXAsIGxpbmspO1xuICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHN0cm9uZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnN0cm9uZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5zdHJvbmcodGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZW1cbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5lbS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5lbSh0aGlzLm91dHB1dChjYXBbMl0gfHwgY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5jb2Rlc3Bhbihlc2NhcGUoY2FwWzJdLCB0cnVlKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBiclxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmJyLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmJyKCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBkZWwgKGdmbSlcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5kZWwuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuZGVsKHRoaXMub3V0cHV0KGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGV4dFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRleHQuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IGVzY2FwZSh0aGlzLnNtYXJ0eXBhbnRzKGNhcFswXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3XG4gICAgICAgIEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29tcGlsZSBMaW5rXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm91dHB1dExpbmsgPSBmdW5jdGlvbihjYXAsIGxpbmspIHtcbiAgdmFyIGhyZWYgPSBlc2NhcGUobGluay5ocmVmKVxuICAgICwgdGl0bGUgPSBsaW5rLnRpdGxlID8gZXNjYXBlKGxpbmsudGl0bGUpIDogbnVsbDtcblxuICByZXR1cm4gY2FwWzBdLmNoYXJBdCgwKSAhPT0gJyEnXG4gICAgPyB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgdGl0bGUsIHRoaXMub3V0cHV0KGNhcFsxXSkpXG4gICAgOiB0aGlzLnJlbmRlcmVyLmltYWdlKGhyZWYsIHRpdGxlLCBlc2NhcGUoY2FwWzFdKSk7XG59O1xuXG4vKipcbiAqIFNtYXJ0eXBhbnRzIFRyYW5zZm9ybWF0aW9uc1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5zbWFydHlwYW50cyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKCF0aGlzLm9wdGlvbnMuc21hcnR5cGFudHMpIHJldHVybiB0ZXh0O1xuICByZXR1cm4gdGV4dFxuICAgIC8vIGVtLWRhc2hlc1xuICAgIC5yZXBsYWNlKC8tLS9nLCAnXFx1MjAxNCcpXG4gICAgLy8gb3BlbmluZyBzaW5nbGVzXG4gICAgLnJlcGxhY2UoLyhefFstXFx1MjAxNC8oXFxbe1wiXFxzXSknL2csICckMVxcdTIwMTgnKVxuICAgIC8vIGNsb3Npbmcgc2luZ2xlcyAmIGFwb3N0cm9waGVzXG4gICAgLnJlcGxhY2UoLycvZywgJ1xcdTIwMTknKVxuICAgIC8vIG9wZW5pbmcgZG91Ymxlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcXHUyMDE4XFxzXSlcIi9nLCAnJDFcXHUyMDFjJylcbiAgICAvLyBjbG9zaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvXCIvZywgJ1xcdTIwMWQnKVxuICAgIC8vIGVsbGlwc2VzXG4gICAgLnJlcGxhY2UoL1xcLnszfS9nLCAnXFx1MjAyNicpO1xufTtcblxuLyoqXG4gKiBNYW5nbGUgTGlua3NcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUubWFuZ2xlID0gZnVuY3Rpb24odGV4dCkge1xuICB2YXIgb3V0ID0gJydcbiAgICAsIGwgPSB0ZXh0Lmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIGNoO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgY2ggPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIGNoID0gJ3gnICsgY2gudG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgICBvdXQgKz0gJyYjJyArIGNoICsgJzsnO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmVuZGVyZXJcbiAqL1xuXG5mdW5jdGlvbiBSZW5kZXJlcihvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG59XG5cblJlbmRlcmVyLnByb3RvdHlwZS5jb2RlID0gZnVuY3Rpb24oY29kZSwgbGFuZywgZXNjYXBlZCkge1xuICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCkge1xuICAgIHZhciBvdXQgPSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KGNvZGUsIGxhbmcpO1xuICAgIGlmIChvdXQgIT0gbnVsbCAmJiBvdXQgIT09IGNvZGUpIHtcbiAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgY29kZSA9IG91dDtcbiAgICB9XG4gIH1cblxuICBpZiAoIWxhbmcpIHtcbiAgICByZXR1cm4gJzxwcmU+PGNvZGU+J1xuICAgICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUoY29kZSwgdHJ1ZSkpXG4gICAgICArICdcXG48L2NvZGU+PC9wcmU+JztcbiAgfVxuXG4gIHJldHVybiAnPHByZT48Y29kZSBjbGFzcz1cIidcbiAgICArIHRoaXMub3B0aW9ucy5sYW5nUHJlZml4XG4gICAgKyBlc2NhcGUobGFuZywgdHJ1ZSlcbiAgICArICdcIj4nXG4gICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUoY29kZSwgdHJ1ZSkpXG4gICAgKyAnXFxuPC9jb2RlPjwvcHJlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuYmxvY2txdW90ZSA9IGZ1bmN0aW9uKHF1b3RlKSB7XG4gIHJldHVybiAnPGJsb2NrcXVvdGU+XFxuJyArIHF1b3RlICsgJzwvYmxvY2txdW90ZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbihodG1sKSB7XG4gIHJldHVybiBodG1sO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmhlYWRpbmcgPSBmdW5jdGlvbih0ZXh0LCBsZXZlbCwgcmF3KSB7XG4gIHJldHVybiAnPGgnXG4gICAgKyBsZXZlbFxuICAgICsgJyBpZD1cIidcbiAgICArIHRoaXMub3B0aW9ucy5oZWFkZXJQcmVmaXhcbiAgICArIHJhdy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teXFx3XSsvZywgJy0nKVxuICAgICsgJ1wiPidcbiAgICArIHRleHRcbiAgICArICc8L2gnXG4gICAgKyBsZXZlbFxuICAgICsgJz5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmhyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGhyLz5cXG4nIDogJzxocj5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbihib2R5LCBvcmRlcmVkKSB7XG4gIHZhciB0eXBlID0gb3JkZXJlZCA/ICdvbCcgOiAndWwnO1xuICByZXR1cm4gJzwnICsgdHlwZSArICc+XFxuJyArIGJvZHkgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0aXRlbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8bGk+JyArIHRleHQgKyAnPC9saT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnBhcmFncmFwaCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8cD4nICsgdGV4dCArICc8L3A+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZSA9IGZ1bmN0aW9uKGhlYWRlciwgYm9keSkge1xuICByZXR1cm4gJzx0YWJsZT5cXG4nXG4gICAgKyAnPHRoZWFkPlxcbidcbiAgICArIGhlYWRlclxuICAgICsgJzwvdGhlYWQ+XFxuJ1xuICAgICsgJzx0Ym9keT5cXG4nXG4gICAgKyBib2R5XG4gICAgKyAnPC90Ym9keT5cXG4nXG4gICAgKyAnPC90YWJsZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlcm93ID0gZnVuY3Rpb24oY29udGVudCkge1xuICByZXR1cm4gJzx0cj5cXG4nICsgY29udGVudCArICc8L3RyPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGVjZWxsID0gZnVuY3Rpb24oY29udGVudCwgZmxhZ3MpIHtcbiAgdmFyIHR5cGUgPSBmbGFncy5oZWFkZXIgPyAndGgnIDogJ3RkJztcbiAgdmFyIHRhZyA9IGZsYWdzLmFsaWduXG4gICAgPyAnPCcgKyB0eXBlICsgJyBzdHlsZT1cInRleHQtYWxpZ246JyArIGZsYWdzLmFsaWduICsgJ1wiPidcbiAgICA6ICc8JyArIHR5cGUgKyAnPic7XG4gIHJldHVybiB0YWcgKyBjb250ZW50ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG4vLyBzcGFuIGxldmVsIHJlbmRlcmVyXG5SZW5kZXJlci5wcm90b3R5cGUuc3Ryb25nID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxzdHJvbmc+JyArIHRleHQgKyAnPC9zdHJvbmc+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5lbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZW0+JyArIHRleHQgKyAnPC9lbT4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmNvZGVzcGFuID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxjb2RlPicgKyB0ZXh0ICsgJzwvY29kZT4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGJyLz4nIDogJzxicj4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmRlbCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZGVsPicgKyB0ZXh0ICsgJzwvZGVsPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHByb3QgPSBkZWNvZGVVUklDb21wb25lbnQodW5lc2NhcGUoaHJlZikpXG4gICAgICAgIC5yZXBsYWNlKC9bXlxcdzpdL2csICcnKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChwcm90LmluZGV4T2YoJ2phdmFzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCd2YnNjcmlwdDonKSA9PT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICB2YXIgb3V0ID0gJzxhIGhyZWY9XCInICsgaHJlZiArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5pbWFnZSA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIHZhciBvdXQgPSAnPGltZyBzcmM9XCInICsgaHJlZiArICdcIiBhbHQ9XCInICsgdGV4dCArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gdGhpcy5vcHRpb25zLnhodG1sID8gJy8+JyA6ICc+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGFyc2luZyAmIENvbXBpbGluZ1xuICovXG5cbmZ1bmN0aW9uIFBhcnNlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW4gPSBudWxsO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xufVxuXG4vKipcbiAqIFN0YXRpYyBQYXJzZSBNZXRob2RcbiAqL1xuXG5QYXJzZXIucGFyc2UgPSBmdW5jdGlvbihzcmMsIG9wdGlvbnMsIHJlbmRlcmVyKSB7XG4gIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKG9wdGlvbnMsIHJlbmRlcmVyKTtcbiAgcmV0dXJuIHBhcnNlci5wYXJzZShzcmMpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMb29wXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHNyYykge1xuICB0aGlzLmlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihzcmMubGlua3MsIHRoaXMub3B0aW9ucywgdGhpcy5yZW5kZXJlcik7XG4gIHRoaXMudG9rZW5zID0gc3JjLnJldmVyc2UoKTtcblxuICB2YXIgb3V0ID0gJyc7XG4gIHdoaWxlICh0aGlzLm5leHQoKSkge1xuICAgIG91dCArPSB0aGlzLnRvaygpO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbiA9IHRoaXMudG9rZW5zLnBvcCgpO1xufTtcblxuLyoqXG4gKiBQcmV2aWV3IE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMudG9rZW5zLmxlbmd0aCAtIDFdIHx8IDA7XG59O1xuXG4vKipcbiAqIFBhcnNlIFRleHQgVG9rZW5zXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRleHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvZHkgPSB0aGlzLnRva2VuLnRleHQ7XG5cbiAgd2hpbGUgKHRoaXMucGVlaygpLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgIGJvZHkgKz0gJ1xcbicgKyB0aGlzLm5leHQoKS50ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuaW5saW5lLm91dHB1dChib2R5KTtcbn07XG5cbi8qKlxuICogUGFyc2UgQ3VycmVudCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUudG9rID0gZnVuY3Rpb24oKSB7XG4gIHN3aXRjaCAodGhpcy50b2tlbi50eXBlKSB7XG4gICAgY2FzZSAnc3BhY2UnOiB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNhc2UgJ2hyJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHIoKTtcbiAgICB9XG4gICAgY2FzZSAnaGVhZGluZyc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhlYWRpbmcoXG4gICAgICAgIHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpLFxuICAgICAgICB0aGlzLnRva2VuLmRlcHRoLFxuICAgICAgICB0aGlzLnRva2VuLnRleHQpO1xuICAgIH1cbiAgICBjYXNlICdjb2RlJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuY29kZSh0aGlzLnRva2VuLnRleHQsXG4gICAgICAgIHRoaXMudG9rZW4ubGFuZyxcbiAgICAgICAgdGhpcy50b2tlbi5lc2NhcGVkKTtcbiAgICB9XG4gICAgY2FzZSAndGFibGUnOiB7XG4gICAgICB2YXIgaGVhZGVyID0gJydcbiAgICAgICAgLCBib2R5ID0gJydcbiAgICAgICAgLCBpXG4gICAgICAgICwgcm93XG4gICAgICAgICwgY2VsbFxuICAgICAgICAsIGZsYWdzXG4gICAgICAgICwgajtcblxuICAgICAgLy8gaGVhZGVyXG4gICAgICBjZWxsID0gJyc7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy50b2tlbi5oZWFkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZmxhZ3MgPSB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfTtcbiAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi5oZWFkZXJbaV0pLFxuICAgICAgICAgIHsgaGVhZGVyOiB0cnVlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltpXSB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBoZWFkZXIgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm93ID0gdGhpcy50b2tlbi5jZWxsc1tpXTtcblxuICAgICAgICBjZWxsID0gJyc7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHJvd1tqXSksXG4gICAgICAgICAgICB7IGhlYWRlcjogZmFsc2UsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2pdIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keSArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnYmxvY2txdW90ZV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnYmxvY2txdW90ZV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuYmxvY2txdW90ZShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJydcbiAgICAgICAgLCBvcmRlcmVkID0gdGhpcy50b2tlbi5vcmRlcmVkO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3QoYm9keSwgb3JkZXJlZCk7XG4gICAgfVxuICAgIGNhc2UgJ2xpc3RfaXRlbV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9pdGVtX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRva2VuLnR5cGUgPT09ICd0ZXh0J1xuICAgICAgICAgID8gdGhpcy5wYXJzZVRleHQoKVxuICAgICAgICAgIDogdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2xvb3NlX2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2h0bWwnOiB7XG4gICAgICB2YXIgaHRtbCA9ICF0aGlzLnRva2VuLnByZSAmJiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgID8gdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dClcbiAgICAgICAgOiB0aGlzLnRva2VuLnRleHQ7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5odG1sKGh0bWwpO1xuICAgIH1cbiAgICBjYXNlICdwYXJhZ3JhcGgnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5wYXJhZ3JhcGgodGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCkpO1xuICAgIH1cbiAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VUZXh0KCkpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXJzXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGh0bWwsIGVuY29kZSkge1xuICByZXR1cm4gaHRtbFxuICAgIC5yZXBsYWNlKCFlbmNvZGUgPyAvJig/ISM/XFx3KzspL2cgOiAvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZShodG1sKSB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoLyYoWyNcXHddKyk7L2csIGZ1bmN0aW9uKF8sIG4pIHtcbiAgICBuID0gbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChuID09PSAnY29sb24nKSByZXR1cm4gJzonO1xuICAgIGlmIChuLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICByZXR1cm4gbi5jaGFyQXQoMSkgPT09ICd4J1xuICAgICAgICA/IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobi5zdWJzdHJpbmcoMiksIDE2KSlcbiAgICAgICAgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKCtuLnN1YnN0cmluZygxKSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2UocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHJlZ2V4LnNvdXJjZTtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICByZXR1cm4gZnVuY3Rpb24gc2VsZihuYW1lLCB2YWwpIHtcbiAgICBpZiAoIW5hbWUpIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LCBvcHQpO1xuICAgIHZhbCA9IHZhbC5zb3VyY2UgfHwgdmFsO1xuICAgIHZhbCA9IHZhbC5yZXBsYWNlKC8oXnxbXlxcW10pXFxeL2csICckMScpO1xuICAgIHJlZ2V4ID0gcmVnZXgucmVwbGFjZShuYW1lLCB2YWwpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbm5vb3AuZXhlYyA9IG5vb3A7XG5cbmZ1bmN0aW9uIG1lcmdlKG9iaikge1xuICB2YXIgaSA9IDFcbiAgICAsIHRhcmdldFxuICAgICwga2V5O1xuXG4gIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAoa2V5IGluIHRhcmdldCkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSB0YXJnZXRba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5cbi8qKlxuICogTWFya2VkXG4gKi9cblxuZnVuY3Rpb24gbWFya2VkKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgfHwgdHlwZW9mIG9wdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0O1xuICAgICAgb3B0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQgfHwge30pO1xuXG4gICAgdmFyIGhpZ2hsaWdodCA9IG9wdC5oaWdobGlnaHRcbiAgICAgICwgdG9rZW5zXG4gICAgICAsIHBlbmRpbmdcbiAgICAgICwgaSA9IDA7XG5cbiAgICB0cnkge1xuICAgICAgdG9rZW5zID0gTGV4ZXIubGV4KHNyYywgb3B0KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICB9XG5cbiAgICBwZW5kaW5nID0gdG9rZW5zLmxlbmd0aDtcblxuICAgIHZhciBkb25lID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIG9wdC5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb3V0O1xuXG4gICAgICB0cnkge1xuICAgICAgICBvdXQgPSBQYXJzZXIucGFyc2UodG9rZW5zLCBvcHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnIgPSBlO1xuICAgICAgfVxuXG4gICAgICBvcHQuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuXG4gICAgICByZXR1cm4gZXJyXG4gICAgICAgID8gY2FsbGJhY2soZXJyKVxuICAgICAgICA6IGNhbGxiYWNrKG51bGwsIG91dCk7XG4gICAgfTtcblxuICAgIGlmICghaGlnaGxpZ2h0IHx8IGhpZ2hsaWdodC5sZW5ndGggPCAzKSB7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH1cblxuICAgIGRlbGV0ZSBvcHQuaGlnaGxpZ2h0O1xuXG4gICAgaWYgKCFwZW5kaW5nKSByZXR1cm4gZG9uZSgpO1xuXG4gICAgZm9yICg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIChmdW5jdGlvbih0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gJ2NvZGUnKSB7XG4gICAgICAgICAgcmV0dXJuIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhpZ2hsaWdodCh0b2tlbi50ZXh0LCB0b2tlbi5sYW5nLCBmdW5jdGlvbihlcnIsIGNvZGUpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgIGlmIChjb2RlID09IG51bGwgfHwgY29kZSA9PT0gdG9rZW4udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRva2VuLnRleHQgPSBjb2RlO1xuICAgICAgICAgIHRva2VuLmVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkodG9rZW5zW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAob3B0KSBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICAgIHJldHVybiBQYXJzZXIucGFyc2UoTGV4ZXIubGV4KHNyYywgb3B0KSwgb3B0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGUubWVzc2FnZSArPSAnXFxuUGxlYXNlIHJlcG9ydCB0aGlzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZC4nO1xuICAgIGlmICgob3B0IHx8IG1hcmtlZC5kZWZhdWx0cykuc2lsZW50KSB7XG4gICAgICByZXR1cm4gJzxwPkFuIGVycm9yIG9jY3VyZWQ6PC9wPjxwcmU+J1xuICAgICAgICArIGVzY2FwZShlLm1lc3NhZ2UgKyAnJywgdHJ1ZSlcbiAgICAgICAgKyAnPC9wcmU+JztcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG4vKipcbiAqIE9wdGlvbnNcbiAqL1xuXG5tYXJrZWQub3B0aW9ucyA9XG5tYXJrZWQuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdCkge1xuICBtZXJnZShtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gIHJldHVybiBtYXJrZWQ7XG59O1xuXG5tYXJrZWQuZGVmYXVsdHMgPSB7XG4gIGdmbTogdHJ1ZSxcbiAgdGFibGVzOiB0cnVlLFxuICBicmVha3M6IGZhbHNlLFxuICBwZWRhbnRpYzogZmFsc2UsXG4gIHNhbml0aXplOiBmYWxzZSxcbiAgc21hcnRMaXN0czogZmFsc2UsXG4gIHNpbGVudDogZmFsc2UsXG4gIGhpZ2hsaWdodDogbnVsbCxcbiAgbGFuZ1ByZWZpeDogJ2xhbmctJyxcbiAgc21hcnR5cGFudHM6IGZhbHNlLFxuICBoZWFkZXJQcmVmaXg6ICcnLFxuICByZW5kZXJlcjogbmV3IFJlbmRlcmVyLFxuICB4aHRtbDogZmFsc2Vcbn07XG5cbi8qKlxuICogRXhwb3NlXG4gKi9cblxubWFya2VkLlBhcnNlciA9IFBhcnNlcjtcbm1hcmtlZC5wYXJzZXIgPSBQYXJzZXIucGFyc2U7XG5cbm1hcmtlZC5SZW5kZXJlciA9IFJlbmRlcmVyO1xuXG5tYXJrZWQuTGV4ZXIgPSBMZXhlcjtcbm1hcmtlZC5sZXhlciA9IExleGVyLmxleDtcblxubWFya2VkLklubGluZUxleGVyID0gSW5saW5lTGV4ZXI7XG5tYXJrZWQuaW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlci5vdXRwdXQ7XG5cbm1hcmtlZC5wYXJzZSA9IG1hcmtlZDtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICBtb2R1bGUuZXhwb3J0cyA9IG1hcmtlZDtcbn0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIG1hcmtlZDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLm1hcmtlZCA9IG1hcmtlZDtcbn1cblxufSkuY2FsbChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKTtcbn0oKSk7XG4iLCJcbnZhciBlbnYgPSByZXF1aXJlKCcuL2Vudi5qcycpO1xudmFyIExleGVyID0gcmVxdWlyZShcIi4vcGFyc2VyL0xleGVyLmpzXCIpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL3BhcnNlci9QYXJzZXIuanNcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4vY29uZmlnLmpzXCIpO1xudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCcuL2hlbHBlci9leHRlbmQuanMnKTtcbmlmKGVudi5icm93c2VyKXtcbnZhciBjb21iaW5lID0gcmVxdWlyZSgnLi9oZWxwZXIvY29tYmluZS5qcycpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuL2RvbS5qc1wiKTtcbnZhciB3YWxrZXJzID0gcmVxdWlyZSgnLi93YWxrZXJzLmpzJyk7XG52YXIgR3JvdXAgPSByZXF1aXJlKCcuL2dyb3VwLmpzJyk7XG59XG52YXIgZXZlbnRzID0gcmVxdWlyZSgnLi9oZWxwZXIvZXZlbnQuanMnKTtcbnZhciBXYXRjaGVyID0gcmVxdWlyZSgnLi9oZWxwZXIvd2F0Y2hlci5qcycpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9oZWxwZXIvcGFyc2UuanMnKTtcbnZhciBmaWx0ZXIgPSByZXF1aXJlKCcuL2hlbHBlci9maWx0ZXIuanMnKTtcbnZhciBkb2MgPSB0eXBlb2YgZG9jdW1lbnQ9PT0ndW5kZWZpbmVkJz8ge30gOiBkb2N1bWVudDtcblxuXG4vKipcbiogYFJlZ3VsYXJgIGlzIHJlZ3VsYXJqcydzIE5hbWVTcGFjZSBhbmQgQmFzZUNsYXNzLiBFdmVyeSBDb21wb25lbnQgaXMgaW5oZXJpdGVkIGZyb20gaXRcbiogXG4qIEBjbGFzcyBSZWd1bGFyXG4qIEBtb2R1bGUgUmVndWxhclxuKiBAY29uc3RydWN0b3JcbiogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgc3BlY2lmaWNhdGlvbiBvZiB0aGUgY29tcG9uZW50XG4qL1xudmFyIFJlZ3VsYXIgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgdmFyIHByZXZSdW5uaW5nID0gZW52LmlzUnVubmluZztcbiAgZW52LmlzUnVubmluZyA9IHRydWU7XG4gIHZhciBub2RlLCB0ZW1wbGF0ZTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5kYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xuICBvcHRpb25zLmNvbXB1dGVkID0gb3B0aW9ucy5jb21wdXRlZCB8fCB7fTtcbiAgb3B0aW9ucy5ldmVudHMgPSBvcHRpb25zLmV2ZW50cyB8fCB7fTtcbiAgaWYodGhpcy5kYXRhKSBfLmV4dGVuZChvcHRpb25zLmRhdGEsIHRoaXMuZGF0YSk7XG4gIGlmKHRoaXMuY29tcHV0ZWQpIF8uZXh0ZW5kKG9wdGlvbnMuY29tcHV0ZWQsIHRoaXMuY29tcHV0ZWQpO1xuICBpZih0aGlzLmV2ZW50cykgXy5leHRlbmQob3B0aW9ucy5ldmVudHMsIHRoaXMuZXZlbnRzKTtcblxuICBfLmV4dGVuZCh0aGlzLCBvcHRpb25zLCB0cnVlKTtcbiAgaWYodGhpcy4kcGFyZW50KXtcbiAgICAgdGhpcy4kcGFyZW50Ll9hcHBlbmQodGhpcyk7XG4gIH1cbiAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgdGhpcy4kcmVmcyA9IHt9O1xuXG4gIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcblxuICAvLyB0ZW1wbGF0ZSBpcyBhIHN0cmluZyAobGVuIDwgMTYpLiB3ZSB3aWxsIGZpbmQgaXQgY29udGFpbmVyIGZpcnN0XG4gIGlmKCh0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnICYmIHRlbXBsYXRlLmxlbmd0aCA8IDE2KSAmJiAobm9kZSA9IGRvbS5maW5kKHRlbXBsYXRlKSkpIHtcbiAgICB0ZW1wbGF0ZSA9IG5vZGUuaW5uZXJIVE1MO1xuICB9XG4gIC8vIGlmIHRlbXBsYXRlIGlzIGEgeG1sXG4gIGlmKHRlbXBsYXRlICYmIHRlbXBsYXRlLm5vZGVUeXBlKSB0ZW1wbGF0ZSA9IHRlbXBsYXRlLmlubmVySFRNTDtcbiAgaWYodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJykgdGhpcy50ZW1wbGF0ZSA9IG5ldyBQYXJzZXIodGVtcGxhdGUpLnBhcnNlKCk7XG5cbiAgdGhpcy5jb21wdXRlZCA9IGhhbmRsZUNvbXB1dGVkKHRoaXMuY29tcHV0ZWQpO1xuICB0aGlzLiRyb290ID0gdGhpcy4kcm9vdCB8fCB0aGlzO1xuICAvLyBpZiBoYXZlIGV2ZW50c1xuICBpZih0aGlzLmV2ZW50cyl7XG4gICAgdGhpcy4kb24odGhpcy5ldmVudHMpO1xuICB9XG4gIGlmKHRoaXMuJGJvZHkpe1xuICAgIHRoaXMuX2dldFRyYW5zY2x1ZGUgPSBmdW5jdGlvbigpe1xuICAgICAgdmFyIGN0eCA9IHRoaXMuJHBhcmVudCB8fCB0aGlzO1xuICAgICAgaWYodGhpcy4kYm9keSkgcmV0dXJuIGN0eC4kY29tcGlsZSh0aGlzLiRib2R5LCB7bmFtZXNwYWNlOiBvcHRpb25zLm5hbWVzcGFjZSwgb3V0ZXI6IHRoaXMsIGV4dHJhOiBvcHRpb25zLmV4dHJhfSlcbiAgICB9XG4gIH1cbiAgdGhpcy4kZW1pdChcIiRjb25maWdcIik7XG4gIHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnKHRoaXMuZGF0YSk7XG4gIC8vIGhhbmRsZSBjb21wdXRlZFxuICBpZih0ZW1wbGF0ZSl7XG4gICAgdGhpcy5ncm91cCA9IHRoaXMuJGNvbXBpbGUodGhpcy50ZW1wbGF0ZSwge25hbWVzcGFjZTogb3B0aW9ucy5uYW1lc3BhY2V9KTtcbiAgICBjb21iaW5lLm5vZGUodGhpcyk7XG4gIH1cblxuXG4gIGlmKCF0aGlzLiRwYXJlbnQpIHRoaXMuJHVwZGF0ZSgpO1xuICB0aGlzLiRyZWFkeSA9IHRydWU7XG4gIHRoaXMuJGVtaXQoXCIkaW5pdFwiKTtcbiAgaWYoIHRoaXMuaW5pdCApIHRoaXMuaW5pdCh0aGlzLmRhdGEpO1xuXG4gIC8vIEBUT0RPOiByZW1vdmUsIG1heWJlICwgdGhlcmUgaXMgbm8gbmVlZCB0byB1cGRhdGUgYWZ0ZXIgaW5pdDsgXG4gIC8vIGlmKHRoaXMuJHJvb3QgPT09IHRoaXMpIHRoaXMuJHVwZGF0ZSgpO1xuICBlbnYuaXNSdW5uaW5nID0gcHJldlJ1bm5pbmc7XG5cbiAgLy8gY2hpbGRyZW4gaXMgbm90IHJlcXVpcmVkO1xufVxuXG5cbndhbGtlcnMgJiYgKHdhbGtlcnMuUmVndWxhciA9IFJlZ3VsYXIpO1xuXG5cbi8vIGRlc2NyaXB0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAxLiBSZWd1bGFyIGFuZCBkZXJpdmVkIENsYXNzIHVzZSBzYW1lIGZpbHRlclxuXy5leHRlbmQoUmVndWxhciwge1xuICAvLyBwcml2YXRlIGRhdGEgc3R1ZmZcbiAgX2RpcmVjdGl2ZXM6IHsgX19yZWdleHBfXzpbXSB9LFxuICBfcGx1Z2luczoge30sXG4gIF9wcm90b0luaGVyaXRDYWNoZTogWyAnZGlyZWN0aXZlJywgJ3VzZSddICxcbiAgX19hZnRlcl9fOiBmdW5jdGlvbihzdXByLCBvKSB7XG5cbiAgICB2YXIgdGVtcGxhdGU7XG4gICAgdGhpcy5fX2FmdGVyX18gPSBzdXByLl9fYWZ0ZXJfXztcblxuICAgIC8vIHVzZSBuYW1lIG1ha2UgdGhlIGNvbXBvbmVudCBnbG9iYWwuXG4gICAgaWYoby5uYW1lKSBSZWd1bGFyLmNvbXBvbmVudChvLm5hbWUsIHRoaXMpO1xuICAgIC8vIHRoaXMucHJvdG90eXBlLnRlbXBsYXRlID0gZG9tLmluaXRUZW1wbGF0ZShvKVxuICAgIGlmKHRlbXBsYXRlID0gby50ZW1wbGF0ZSl7XG4gICAgICB2YXIgbm9kZSwgbmFtZTtcbiAgICAgIGlmKCB0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnICYmIHRlbXBsYXRlLmxlbmd0aCA8IDE2ICYmICggbm9kZSA9IGRvbS5maW5kKCB0ZW1wbGF0ZSApKSApe1xuICAgICAgICB0ZW1wbGF0ZSA9IG5vZGUuaW5uZXJIVE1MO1xuICAgICAgICBpZihuYW1lID0gZG9tLmF0dHIobm9kZSwgJ25hbWUnKSkgUmVndWxhci5jb21wb25lbnQobmFtZSwgdGhpcyk7XG4gICAgICB9XG5cbiAgICAgIGlmKHRlbXBsYXRlLm5vZGVUeXBlKSB0ZW1wbGF0ZSA9IHRlbXBsYXRlLmlubmVySFRNTDtcblxuICAgICAgaWYodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyl7XG4gICAgICAgIHRoaXMucHJvdG90eXBlLnRlbXBsYXRlID0gbmV3IFBhcnNlcih0ZW1wbGF0ZSkucGFyc2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihvLmNvbXB1dGVkKSB0aGlzLnByb3RvdHlwZS5jb21wdXRlZCA9IGhhbmRsZUNvbXB1dGVkKG8uY29tcHV0ZWQpO1xuICAgIC8vIGluaGVyaXQgZGlyZWN0aXZlIGFuZCBvdGhlciBjb25maWcgZnJvbSBzdXByXG4gICAgUmVndWxhci5faW5oZXJpdENvbmZpZyh0aGlzLCBzdXByKTtcblxuICB9LFxuICAvKipcbiAgICogRGVmaW5lIGEgZGlyZWN0aXZlXG4gICAqXG4gICAqIEBtZXRob2QgZGlyZWN0aXZlXG4gICAqIEByZXR1cm4ge09iamVjdH0gQ29weSBvZiAuLi5cbiAgICovICBcbiAgZGlyZWN0aXZlOiBmdW5jdGlvbihuYW1lLCBjZmcpe1xuXG4gICAgaWYoXy50eXBlT2YobmFtZSkgPT09IFwib2JqZWN0XCIpe1xuICAgICAgZm9yKHZhciBrIGluIG5hbWUpe1xuICAgICAgICBpZihuYW1lLmhhc093blByb3BlcnR5KGspKSB0aGlzLmRpcmVjdGl2ZShrLCBuYW1lW2tdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IF8udHlwZU9mKG5hbWUpO1xuICAgIHZhciBkaXJlY3RpdmVzID0gdGhpcy5fZGlyZWN0aXZlcywgZGlyZWN0aXZlO1xuICAgIGlmKGNmZyA9PSBudWxsKXtcbiAgICAgIGlmKCB0eXBlID09PSBcInN0cmluZ1wiICYmIChkaXJlY3RpdmUgPSBkaXJlY3RpdmVzW25hbWVdKSApIHJldHVybiBkaXJlY3RpdmU7XG4gICAgICBlbHNle1xuICAgICAgICB2YXIgcmVnZXhwID0gZGlyZWN0aXZlcy5fX3JlZ2V4cF9fO1xuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSByZWdleHAubGVuZ3RoOyBpIDwgbGVuIDsgaSsrKXtcbiAgICAgICAgICBkaXJlY3RpdmUgPSByZWdleHBbaV07XG4gICAgICAgICAgdmFyIHRlc3QgPSBkaXJlY3RpdmUucmVnZXhwLnRlc3QobmFtZSk7XG4gICAgICAgICAgaWYodGVzdCkgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYodHlwZW9mIGNmZyA9PT0gJ2Z1bmN0aW9uJykgY2ZnID0geyBsaW5rOiBjZmcgfSBcbiAgICBpZih0eXBlID09PSAnc3RyaW5nJykgZGlyZWN0aXZlc1tuYW1lXSA9IGNmZztcbiAgICBlbHNlIGlmKHR5cGUgPT09ICdyZWdleHAnKXtcbiAgICAgIGNmZy5yZWdleHAgPSBuYW1lO1xuICAgICAgZGlyZWN0aXZlcy5fX3JlZ2V4cF9fLnB1c2goY2ZnKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICBwbHVnaW46IGZ1bmN0aW9uKG5hbWUsIGZuKXtcbiAgICB2YXIgcGx1Z2lucyA9IHRoaXMuX3BsdWdpbnM7XG4gICAgaWYoZm4gPT0gbnVsbCkgcmV0dXJuIHBsdWdpbnNbbmFtZV07XG4gICAgcGx1Z2luc1tuYW1lXSA9IGZuO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICB1c2U6IGZ1bmN0aW9uKGZuKXtcbiAgICBpZih0eXBlb2YgZm4gPT09IFwic3RyaW5nXCIpIGZuID0gUmVndWxhci5wbHVnaW4oZm4pO1xuICAgIGlmKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdGhpcztcbiAgICBmbih0aGlzLCBSZWd1bGFyKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8gY29uZmlnIHRoZSBSZWd1bGFyanMncyBnbG9iYWxcbiAgY29uZmlnOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG4gICAgdmFyIG5lZWRHZW5MZXhlciA9IGZhbHNlO1xuICAgIGlmKHR5cGVvZiBuYW1lID09PSBcIm9iamVjdFwiKXtcbiAgICAgIGZvcih2YXIgaSBpbiBuYW1lKXtcbiAgICAgICAgLy8gaWYgeW91IGNvbmZpZ1xuICAgICAgICBpZiggaSA9PT1cIkVORFwiIHx8IGk9PT0nQkVHSU4nICkgIG5lZWRHZW5MZXhlciA9IHRydWU7XG4gICAgICAgIGNvbmZpZ1tpXSA9IG5hbWVbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmKG5lZWRHZW5MZXhlcikgTGV4ZXIuc2V0dXAoKTtcbiAgfSxcbiAgZXhwcmVzc2lvbjogcGFyc2UuZXhwcmVzc2lvbixcbiAgUGFyc2VyOiBQYXJzZXIsXG4gIExleGVyOiBMZXhlcixcbiAgX2FkZFByb3RvSW5oZXJpdENhY2hlOiBmdW5jdGlvbihuYW1lLCB0cmFuc2Zvcm0pe1xuICAgIGlmKCBBcnJheS5pc0FycmF5KCBuYW1lICkgKXtcbiAgICAgIHJldHVybiBuYW1lLmZvckVhY2goUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUpO1xuICAgIH1cbiAgICB2YXIgY2FjaGVLZXkgPSBcIl9cIiArIG5hbWUgKyBcInNcIlxuICAgIFJlZ3VsYXIuX3Byb3RvSW5oZXJpdENhY2hlLnB1c2gobmFtZSlcbiAgICBSZWd1bGFyW2NhY2hlS2V5XSA9IHt9O1xuICAgIGlmKFJlZ3VsYXJbbmFtZV0pIHJldHVybjtcbiAgICBSZWd1bGFyW25hbWVdID0gZnVuY3Rpb24oa2V5LCBjZmcpe1xuICAgICAgdmFyIGNhY2hlID0gdGhpc1tjYWNoZUtleV07XG5cbiAgICAgIGlmKHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIpe1xuICAgICAgICBmb3IodmFyIGkgaW4ga2V5KXtcbiAgICAgICAgICBpZihrZXkuaGFzT3duUHJvcGVydHkoaSkpIHRoaXNbbmFtZV0oaSwga2V5W2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGlmKGNmZyA9PSBudWxsKSByZXR1cm4gY2FjaGVba2V5XTtcbiAgICAgIGNhY2hlW2tleV0gPSB0cmFuc2Zvcm0/IHRyYW5zZm9ybShjZmcpIDogY2ZnO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LFxuICBfaW5oZXJpdENvbmZpZzogZnVuY3Rpb24oc2VsZiwgc3Vwcil7XG5cbiAgICAvLyBwcm90b3R5cGUgaW5oZXJpdCBzb21lIFJlZ3VsYXIgcHJvcGVydHlcbiAgICAvLyBzbyBldmVyeSBDb21wb25lbnQgd2lsbCBoYXZlIG93biBjb250YWluZXIgdG8gc2VydmUgZGlyZWN0aXZlLCBmaWx0ZXIgZXRjLi5cbiAgICB2YXIgZGVmcyA9IFJlZ3VsYXIuX3Byb3RvSW5oZXJpdENhY2hlO1xuICAgIHZhciBrZXlzID0gXy5zbGljZShkZWZzKTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgIHNlbGZba2V5XSA9IHN1cHJba2V5XTtcbiAgICAgIHZhciBjYWNoZUtleSA9ICdfJyArIGtleSArICdzJztcbiAgICAgIGlmKHN1cHJbY2FjaGVLZXldKSBzZWxmW2NhY2hlS2V5XSA9IF8uY3JlYXRlT2JqZWN0KHN1cHJbY2FjaGVLZXldKTtcbiAgICB9KVxuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbn0pO1xuXG5leHRlbmQoUmVndWxhcik7XG5cblJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiY29tcG9uZW50XCIpXG5cblJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiZmlsdGVyXCIsIGZ1bmN0aW9uKGNmZyl7XG4gIHJldHVybiB0eXBlb2YgY2ZnID09PSBcImZ1bmN0aW9uXCI/IHtnZXQ6IGNmZ306IGNmZztcbn0pXG5cblxuZXZlbnRzLm1peFRvKFJlZ3VsYXIpO1xuV2F0Y2hlci5taXhUbyhSZWd1bGFyKTtcblxuUmVndWxhci5pbXBsZW1lbnQoe1xuICBpbml0OiBmdW5jdGlvbigpe30sXG4gIGNvbmZpZzogZnVuY3Rpb24oKXt9LFxuICBkZXN0cm95OiBmdW5jdGlvbigpe1xuICAgIC8vIGRlc3Ryb3kgZXZlbnQgd29udCBwcm9wZ2F0aW9uO1xuICAgIHRoaXMuJGVtaXQoXCIkZGVzdHJveVwiKTtcbiAgICB0aGlzLmdyb3VwICYmIHRoaXMuZ3JvdXAuZGVzdHJveSh0cnVlKTtcbiAgICB0aGlzLmdyb3VwID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudE5vZGUgPSBudWxsO1xuICAgIHRoaXMuX3dhdGNoZXJzID0gbnVsbDtcbiAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLiRwYXJlbnQ7XG4gICAgaWYocGFyZW50KXtcbiAgICAgIHZhciBpbmRleCA9IHBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIHBhcmVudC5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEpO1xuICAgIH1cbiAgICB0aGlzLiRwYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuJHJvb3QgPSBudWxsO1xuICAgIHRoaXMuX2hhbmRsZXMgPSBudWxsO1xuICAgIHRoaXMuJHJlZnMgPSBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBjb21waWxlIGEgYmxvY2sgYXN0IDsgcmV0dXJuIGEgZ3JvdXA7XG4gICAqIEBwYXJhbSAge0FycmF5fSBwYXJzZWQgYXN0XG4gICAqIEBwYXJhbSAge1t0eXBlXX0gcmVjb3JkXG4gICAqIEByZXR1cm4ge1t0eXBlXX1cbiAgICovXG4gICRjb21waWxlOiBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmKHR5cGVvZiBhc3QgPT09ICdzdHJpbmcnKXtcbiAgICAgIGFzdCA9IG5ldyBQYXJzZXIoYXN0KS5wYXJzZSgpXG4gICAgfVxuICAgIHZhciBwcmVFeHQgPSB0aGlzLl9fZXh0X18sXG4gICAgICByZWNvcmQgPSBvcHRpb25zLnJlY29yZCwgXG4gICAgICByZWNvcmRzO1xuXG4gICAgaWYob3B0aW9ucy5leHRyYSkgdGhpcy5fX2V4dF9fID0gb3B0aW9ucy5leHRyYTtcblxuICAgIGlmKHJlY29yZCkgdGhpcy5fcmVjb3JkKCk7XG4gICAgdmFyIGdyb3VwID0gdGhpcy5fd2Fsayhhc3QsIG9wdGlvbnMpO1xuICAgIGlmKHJlY29yZCl7XG4gICAgICByZWNvcmRzID0gdGhpcy5fcmVsZWFzZSgpO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgaWYocmVjb3Jkcy5sZW5ndGgpe1xuICAgICAgICAvLyBhdXRvIGRlc3Ryb3kgYWxsIHdhdGhlcjtcbiAgICAgICAgZ3JvdXAub25kZXN0cm95ID0gZnVuY3Rpb24oKXsgc2VsZi4kdW53YXRjaChyZWNvcmRzKTsgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZihvcHRpb25zLmV4dHJhKSB0aGlzLl9fZXh0X18gPSBwcmVFeHQ7XG4gICAgcmV0dXJuIGdyb3VwO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIGNyZWF0ZSB0d28td2F5IGJpbmRpbmcgd2l0aCBhbm90aGVyIGNvbXBvbmVudDtcbiAgICogKndhcm4qOiBcbiAgICogICBleHByMSBhbmQgZXhwcjIgbXVzdCBjYW4gb3BlcmF0ZSBzZXQmZ2V0LCBmb3IgZXhhbXBsZTogdGhlICdhLmInIG9yICdhW2IgKyAxXScgaXMgc2V0LWFibGUsIGJ1dCAnYS5iICsgMScgaXMgbm90LCBcbiAgICogICBiZWFjdXNlIFJlZ3VsYXIgZG9udCBrbm93IGhvdyB0byBpbnZlcnNlIHNldCB0aHJvdWdoIHRoZSBleHByZXNzaW9uO1xuICAgKiAgIFxuICAgKiAgIGlmIGJlZm9yZSAkYmluZCwgdHdvIGNvbXBvbmVudCdzIHN0YXRlIGlzIG5vdCBzeW5jLCB0aGUgY29tcG9uZW50KHBhc3NlZCBwYXJhbSkgd2lsbCBzeW5jIHdpdGggdGhlIGNhbGxlZCBjb21wb25lbnQ7XG4gICAqXG4gICAqICpleGFtcGxlOiAqXG4gICAqXG4gICAqIGBgYGphdmFzY3JpcHRcbiAgICogLy8gaW4gdGhpcyBleGFtcGxlLCB3ZSBuZWVkIHRvIGxpbmsgdHdvIHBhZ2VyIGNvbXBvbmVudFxuICAgKiB2YXIgcGFnZXIgPSBuZXcgUGFnZXIoe30pIC8vIHBhZ2VyIGNvbXBvZW5udFxuICAgKiB2YXIgcGFnZXIyID0gbmV3IFBhZ2VyKHt9KSAvLyBhbm90aGVyIHBhZ2VyIGNvbXBvbmVudFxuICAgKiBwYWdlci4kYmluZChwYWdlcjIsICdjdXJyZW50Jyk7IC8vIHR3byB3YXkgYmluZCB0aHJvdyB0d28gY29tcG9uZW50XG4gICAqIHBhZ2VyLiRiaW5kKHBhZ2VyMiwgJ3RvdGFsJyk7ICAgLy8gXG4gICAqIC8vIG9yIGp1c3RcbiAgICogcGFnZXIuJGJpbmQocGFnZXIyLCB7XCJjdXJyZW50XCI6IFwiY3VycmVudFwiLCBcInRvdGFsXCI6IFwidG90YWxcIn0pIFxuICAgKiBgYGBcbiAgICogXG4gICAqIEBwYXJhbSAge1JlZ3VsYXJ9IGNvbXBvbmVudCB0aGVcbiAgICogQHBhcmFtICB7U3RyaW5nfEV4cHJlc3Npb259IGV4cHIxICAgICByZXF1aXJlZCwgc2VsZiBleHByMSB0byBvcGVyYXRlIGJpbmRpbmdcbiAgICogQHBhcmFtICB7U3RyaW5nfEV4cHJlc3Npb259IGV4cHIyICAgICBvcHRpb25hbCwgb3RoZXIgY29tcG9uZW50J3MgZXhwciB0byBiaW5kIHdpdGgsIGlmIG5vdCBwYXNzZWQsIHRoZSBleHByMiB3aWxsIHVzZSB0aGUgZXhwcjE7XG4gICAqIEByZXR1cm4gICAgICAgICAgdGhpcztcbiAgICovXG4gICRiaW5kOiBmdW5jdGlvbihjb21wb25lbnQsIGV4cHIxLCBleHByMil7XG4gICAgdmFyIHR5cGUgPSBfLnR5cGVPZihleHByMSk7XG4gICAgaWYoIGV4cHIxLnR5cGUgPT09ICdleHByZXNzaW9uJyB8fCB0eXBlID09PSAnc3RyaW5nJyApe1xuICAgICAgdGhpcy5fYmluZChjb21wb25lbnQsIGV4cHIxLCBleHByMilcbiAgICB9ZWxzZSBpZiggdHlwZSA9PT0gXCJhcnJheVwiICl7IC8vIG11bHRpcGx5IHNhbWUgcGF0aCBiaW5kaW5nIHRocm91Z2ggYXJyYXlcbiAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGV4cHIxLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgdGhpcy5fYmluZChjb21wb25lbnQsIGV4cHIxW2ldKTtcbiAgICAgIH1cbiAgICB9ZWxzZSBpZih0eXBlID09PSBcIm9iamVjdFwiKXtcbiAgICAgIGZvcih2YXIgaSBpbiBleHByMSkgaWYoZXhwcjEuaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgICB0aGlzLl9iaW5kKGNvbXBvbmVudCwgaSwgZXhwcjFbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBkaWdlc3RcbiAgICBjb21wb25lbnQuJHVwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogdW5iaW5kIG9uZSBjb21wb25lbnQoIHNlZSAkYmluZCBhbHNvKVxuICAgKlxuICAgKiB1bmJpbmQgd2lsbCB1bmJpbmQgYWxsIHJlbGF0aW9uIGJldHdlZW4gdHdvIGNvbXBvbmVudFxuICAgKiBcbiAgICogQHBhcmFtICB7UmVndWxhcn0gY29tcG9uZW50IFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7VGhpc30gICAgdGhpc1xuICAgKi9cbiAgJHVuYmluZDogZnVuY3Rpb24oKXtcbiAgICAvLyB0b2RvXG4gIH0sXG4gICRpbmplY3Q6IGZ1bmN0aW9uKG5vZGUsIHBvc2l0aW9uLCBvcHRpb25zKXtcbiAgICB2YXIgZnJhZ21lbnQgPSBjb21iaW5lLm5vZGUodGhpcyk7XG5cbiAgICBpZihub2RlID09PSBmYWxzZSkge1xuICAgICAgaWYoIXRoaXMuX2ZyYWdDb250YWluZXIpICB0aGlzLl9mcmFnQ29udGFpbmVyID0gZG9tLmZyYWdtZW50KCk7XG4gICAgICByZXR1cm4gdGhpcy4kaW5qZWN0KHRoaXMuX2ZyYWdDb250YWluZXIpO1xuICAgIH1cbiAgICBpZih0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIG5vZGUgPSBkb20uZmluZChub2RlKTtcbiAgICBpZighbm9kZSkgdGhyb3cgJ2luamVjdGVkIG5vZGUgaXMgbm90IGZvdW5kJztcbiAgICBpZighZnJhZ21lbnQpIHJldHVybiB0aGlzO1xuICAgIGRvbS5pbmplY3QoZnJhZ21lbnQsIG5vZGUsIHBvc2l0aW9uKTtcbiAgICB0aGlzLiRlbWl0KFwiJGluamVjdFwiLCBub2RlKTtcbiAgICB0aGlzLnBhcmVudE5vZGUgPSBBcnJheS5pc0FycmF5KGZyYWdtZW50KT8gZnJhZ21lbnRbMF0ucGFyZW50Tm9kZTogZnJhZ21lbnQucGFyZW50Tm9kZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgJG11dGU6IGZ1bmN0aW9uKGlzTXV0ZSl7XG5cbiAgICBpc011dGUgPSAhIWlzTXV0ZTtcblxuICAgIHZhciBuZWVkdXBkYXRlID0gaXNNdXRlID09PSBmYWxzZSAmJiB0aGlzLl9tdXRlO1xuXG4gICAgdGhpcy5fbXV0ZSA9ICEhaXNNdXRlO1xuXG4gICAgaWYobmVlZHVwZGF0ZSkgdGhpcy4kdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8vIHByaXZhdGUgYmluZCBsb2dpY1xuICBfYmluZDogZnVuY3Rpb24oY29tcG9uZW50LCBleHByMSwgZXhwcjIpe1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIC8vIGJhc2ljIGJpbmRpbmdcblxuICAgIGlmKCFjb21wb25lbnQgfHwgIShjb21wb25lbnQgaW5zdGFuY2VvZiBSZWd1bGFyKSkgdGhyb3cgXCIkYmluZCgpIHNob3VsZCBwYXNzIFJlZ3VsYXIgY29tcG9uZW50IGFzIGZpcnN0IGFyZ3VtZW50XCI7XG4gICAgaWYoIWV4cHIxKSB0aHJvdyBcIiRiaW5kKCkgc2hvdWxkICBwYXNzIGFzIGxlYXN0IG9uZSBleHByZXNzaW9uIHRvIGJpbmRcIjtcblxuICAgIGlmKCFleHByMikgZXhwcjIgPSBleHByMTtcblxuICAgIGV4cHIxID0gcGFyc2UuZXhwcmVzc2lvbiggZXhwcjEgKTtcbiAgICBleHByMiA9IHBhcnNlLmV4cHJlc3Npb24oIGV4cHIyICk7XG5cbiAgICAvLyBzZXQgaXMgbmVlZCB0byBvcGVyYXRlIHNldHRpbmcgO1xuICAgIGlmKGV4cHIyLnNldCl7XG4gICAgICB2YXIgd2lkMSA9IHRoaXMuJHdhdGNoKCBleHByMSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICBjb21wb25lbnQuJHVwZGF0ZShleHByMiwgdmFsdWUpXG4gICAgICB9KTtcbiAgICAgIGNvbXBvbmVudC4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKXtcbiAgICAgICAgc2VsZi4kdW53YXRjaCh3aWQxKVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYoZXhwcjEuc2V0KXtcbiAgICAgIHZhciB3aWQyID0gY29tcG9uZW50LiR3YXRjaChleHByMiwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICBzZWxmLiR1cGRhdGUoZXhwcjEsIHZhbHVlKVxuICAgICAgfSk7XG4gICAgICAvLyB3aGVuIGJyb3RoZXIgZGVzdHJveSwgd2UgdW5saW5rIHRoaXMgd2F0Y2hlclxuICAgICAgdGhpcy4kb24oJyRkZXN0cm95JywgY29tcG9uZW50LiR1bndhdGNoLmJpbmQoY29tcG9uZW50LHdpZDIpKVxuICAgIH1cbiAgICAvLyBzeW5jIHRoZSBjb21wb25lbnQncyBzdGF0ZSB0byBjYWxsZWQncyBzdGF0ZVxuICAgIGV4cHIyLnNldChjb21wb25lbnQsIGV4cHIxLmdldCh0aGlzKSk7XG4gIH0sXG4gIF93YWxrOiBmdW5jdGlvbihhc3QsIGFyZzEpe1xuICAgIGlmKCBfLnR5cGVPZihhc3QpID09PSAnYXJyYXknICl7XG4gICAgICB2YXIgcmVzID0gW107XG5cbiAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGFzdC5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgIHJlcy5wdXNoKCB0aGlzLl93YWxrKGFzdFtpXSwgYXJnMSkgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBHcm91cChyZXMpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgYXN0ID09PSAnc3RyaW5nJykgcmV0dXJuIGRvYy5jcmVhdGVUZXh0Tm9kZShhc3QpXG4gICAgcmV0dXJuIHdhbGtlcnNbYXN0LnR5cGUgfHwgXCJkZWZhdWx0XCJdLmNhbGwodGhpcywgYXN0LCBhcmcxKTtcbiAgfSxcbiAgX2FwcGVuZDogZnVuY3Rpb24oY29tcG9uZW50KXtcbiAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGNvbXBvbmVudCk7XG4gICAgY29tcG9uZW50LiRwYXJlbnQgPSB0aGlzO1xuICB9LFxuICBfaGFuZGxlRXZlbnQ6IGZ1bmN0aW9uKGVsZW0sIHR5cGUsIHZhbHVlLCBhdHRycyl7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuY29uc3RydWN0b3IsXG4gICAgICBmaXJlID0gdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCI/IF8uaGFuZGxlRXZlbnQuY2FsbCggdGhpcywgdmFsdWUsIHR5cGUgKSA6IHZhbHVlLFxuICAgICAgaGFuZGxlciA9IENvbXBvbmVudC5ldmVudCh0eXBlKSwgZGVzdHJveTtcblxuICAgIGlmICggaGFuZGxlciApIHtcbiAgICAgIGRlc3Ryb3kgPSBoYW5kbGVyLmNhbGwodGhpcywgZWxlbSwgZmlyZSwgYXR0cnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb20ub24oZWxlbSwgdHlwZSwgZmlyZSk7XG4gICAgfVxuICAgIHJldHVybiBoYW5kbGVyID8gZGVzdHJveSA6IGZ1bmN0aW9uKCkge1xuICAgICAgZG9tLm9mZihlbGVtLCB0eXBlLCBmaXJlKTtcbiAgICB9XG4gIH0sXG4gIC8vIDEuIOeUqOadpeWkhOeQhmV4cHJCb2R5IC0+IEZ1bmN0aW9uXG4gIC8vIDIuIGxpc3Tph4znmoTlvqrnjq9cbiAgX3RvdWNoRXhwcjogZnVuY3Rpb24oZXhwcil7XG4gICAgdmFyICByYXdnZXQsIGV4dCA9IHRoaXMuX19leHRfXywgdG91Y2hlZCA9IHt9O1xuICAgIGlmKGV4cHIudHlwZSAhPT0gJ2V4cHJlc3Npb24nIHx8IGV4cHIudG91Y2hlZCkgcmV0dXJuIGV4cHI7XG4gICAgcmF3Z2V0ID0gZXhwci5nZXQgfHwgKGV4cHIuZ2V0ID0gbmV3IEZ1bmN0aW9uKF8uY3R4TmFtZSwgXy5leHROYW1lICwgXy5wcmVmaXgrIFwicmV0dXJuIChcIiArIGV4cHIuYm9keSArIFwiKVwiKSk7XG4gICAgdG91Y2hlZC5nZXQgPSAhZXh0PyByYXdnZXQ6IGZ1bmN0aW9uKGNvbnRleHQpe1xuICAgICAgcmV0dXJuIHJhd2dldChjb250ZXh0LCBleHQpXG4gICAgfVxuXG4gICAgaWYoZXhwci5zZXRib2R5ICYmICFleHByLnNldCl7XG4gICAgICB2YXIgc2V0Ym9keSA9IGV4cHIuc2V0Ym9keTtcbiAgICAgIGV4cHIuc2V0ID0gZnVuY3Rpb24oY3R4LCB2YWx1ZSwgZXh0KXtcbiAgICAgICAgZXhwci5zZXQgPSBuZXcgRnVuY3Rpb24oXy5jdHhOYW1lLCBfLnNldE5hbWUgLCBfLmV4dE5hbWUsIF8ucHJlZml4ICsgc2V0Ym9keSk7ICAgICAgICAgIFxuICAgICAgICByZXR1cm4gZXhwci5zZXQoY3R4LCB2YWx1ZSwgZXh0KTtcbiAgICAgIH1cbiAgICAgIGV4cHIuc2V0Ym9keSA9IG51bGw7XG4gICAgfVxuICAgIGlmKGV4cHIuc2V0KXtcbiAgICAgIHRvdWNoZWQuc2V0ID0gIWV4dD8gZXhwci5zZXQgOiBmdW5jdGlvbihjdHgsIHZhbHVlKXtcbiAgICAgICAgcmV0dXJuIGV4cHIuc2V0KGN0eCwgdmFsdWUsIGV4dCk7XG4gICAgICB9XG4gICAgfVxuICAgIF8uZXh0ZW5kKHRvdWNoZWQsIHtcbiAgICAgIHR5cGU6ICdleHByZXNzaW9uJyxcbiAgICAgIHRvdWNoZWQ6IHRydWUsXG4gICAgICBvbmNlOiBleHByLm9uY2UgfHwgZXhwci5jb25zdGFudFxuICAgIH0pXG4gICAgcmV0dXJuIHRvdWNoZWRcbiAgfSxcbiAgLy8gZmluZCBmaWx0ZXJcbiAgX2ZfOiBmdW5jdGlvbihuYW1lKXtcbiAgICB2YXIgQ29tcG9uZW50ID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICB2YXIgZmlsdGVyID0gQ29tcG9uZW50LmZpbHRlcihuYW1lKTtcbiAgICBpZighZmlsdGVyKSB0aHJvdyAnZmlsdGVyICcgKyBuYW1lICsgJyBpcyB1bmRlZmluZWQnO1xuICAgIHJldHVybiBmaWx0ZXI7XG4gIH0sXG4gIC8vIHNpbXBsZSBhY2Nlc3NvciBnZXRcbiAgX3NnXzpmdW5jdGlvbihwYXRoLCBkZWZhdWx0cywgZXh0KXtcbiAgICBpZih0eXBlb2YgZXh0ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAvLyBpZihwYXRoID09PSBcImRlbW9zXCIpICBkZWJ1Z2dlclxuICAgICAgdmFyIGNvbXB1dGVkID0gdGhpcy5jb21wdXRlZCxcbiAgICAgICAgY29tcHV0ZWRQcm9wZXJ0eSA9IGNvbXB1dGVkW3BhdGhdO1xuICAgICAgaWYoY29tcHV0ZWRQcm9wZXJ0eSl7XG4gICAgICAgIGlmKGNvbXB1dGVkUHJvcGVydHkudHlwZT09PSdleHByZXNzaW9uJyAmJiAhY29tcHV0ZWRQcm9wZXJ0eS5nZXQpIHRoaXMuX3RvdWNoRXhwcihjb21wdXRlZFByb3BlcnR5KTtcbiAgICAgICAgaWYoY29tcHV0ZWRQcm9wZXJ0eS5nZXQpICByZXR1cm4gY29tcHV0ZWRQcm9wZXJ0eS5nZXQodGhpcyk7XG4gICAgICAgIGVsc2UgXy5sb2coXCJ0aGUgY29tcHV0ZWQgJ1wiICsgcGF0aCArIFwiJyBkb24ndCBkZWZpbmUgdGhlIGdldCBmdW5jdGlvbiwgIGdldCBkYXRhLlwiK3BhdGggKyBcIiBhbHRuYXRlbHlcIiwgXCJlcnJvclwiKVxuICAgICAgfVxuICB9XG4gICAgaWYodHlwZW9mIGRlZmF1bHRzID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBwYXRoID09IFwidW5kZWZpbmVkXCIgKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiAoZXh0ICYmIHR5cGVvZiBleHRbcGF0aF0gIT09ICd1bmRlZmluZWQnKT8gZXh0W3BhdGhdOiBkZWZhdWx0c1twYXRoXTtcblxuICB9LFxuICAvLyBzaW1wbGUgYWNjZXNzb3Igc2V0XG4gIF9zc186ZnVuY3Rpb24ocGF0aCwgdmFsdWUsIGRhdGEgLCBvcCwgY29tcHV0ZWQpe1xuICAgIHZhciBjb21wdXRlZCA9IHRoaXMuY29tcHV0ZWQsXG4gICAgICBvcCA9IG9wIHx8IFwiPVwiLCBwcmV2LCBcbiAgICAgIGNvbXB1dGVkUHJvcGVydHkgPSBjb21wdXRlZD8gY29tcHV0ZWRbcGF0aF06bnVsbDtcblxuICAgIGlmKG9wICE9PSAnPScpe1xuICAgICAgcHJldiA9IGNvbXB1dGVkUHJvcGVydHk/IGNvbXB1dGVkUHJvcGVydHkuZ2V0KHRoaXMpOiBkYXRhW3BhdGhdO1xuICAgICAgc3dpdGNoKG9wKXtcbiAgICAgICAgY2FzZSBcIis9XCI6XG4gICAgICAgICAgdmFsdWUgPSBwcmV2ICsgdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCItPVwiOlxuICAgICAgICAgIHZhbHVlID0gcHJldiAtIHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiKj1cIjpcbiAgICAgICAgICB2YWx1ZSA9IHByZXYgKiB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIi89XCI6XG4gICAgICAgICAgdmFsdWUgPSBwcmV2IC8gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIlPVwiOlxuICAgICAgICAgIHZhbHVlID0gcHJldiAlIHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihjb21wdXRlZFByb3BlcnR5KSB7XG4gICAgICBpZihjb21wdXRlZFByb3BlcnR5LnNldCkgcmV0dXJuIGNvbXB1dGVkUHJvcGVydHkuc2V0KHRoaXMsIHZhbHVlKTtcbiAgICAgIGVsc2UgXy5sb2coXCJ0aGUgY29tcHV0ZWQgJ1wiICsgcGF0aCArIFwiJyBkb24ndCBkZWZpbmUgdGhlIHNldCBmdW5jdGlvbiwgIGFzc2lnbiBkYXRhLlwiK3BhdGggKyBcIiBhbHRuYXRlbHlcIiwgXCJlcnJvclwiIClcbiAgICB9XG4gICAgZGF0YVtwYXRoXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufSk7XG5cblJlZ3VsYXIucHJvdG90eXBlLmluamVjdCA9IGZ1bmN0aW9uKCl7XG4gIF8ubG9nKFwidXNlICRpbmplY3QgaW5zdGVhZCBvZiBpbmplY3RcIiwgXCJlcnJvclwiKTtcbiAgcmV0dXJuIHRoaXMuJGluamVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5cbi8vIG9ubHkgb25lIGJ1aWx0aW4gZmlsdGVyXG5cblJlZ3VsYXIuZmlsdGVyKGZpbHRlcik7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVndWxhcjtcblxuXG5cbnZhciBoYW5kbGVDb21wdXRlZCA9IChmdW5jdGlvbigpe1xuICAvLyB3cmFwIHRoZSBjb21wdXRlZCBnZXR0ZXI7XG4gIGZ1bmN0aW9uIHdyYXBHZXQoZ2V0KXtcbiAgICByZXR1cm4gZnVuY3Rpb24oY29udGV4dCl7XG4gICAgICByZXR1cm4gZ2V0LmNhbGwoY29udGV4dCwgY29udGV4dC5kYXRhICk7XG4gICAgfVxuICB9XG4gIC8vIHdyYXAgdGhlIGNvbXB1dGVkIHNldHRlcjtcbiAgZnVuY3Rpb24gd3JhcFNldChzZXQpe1xuICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSl7XG4gICAgICBzZXQuY2FsbCggY29udGV4dCwgdmFsdWUsIGNvbnRleHQuZGF0YSApO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihjb21wdXRlZCl7XG4gICAgaWYoIWNvbXB1dGVkKSByZXR1cm47XG4gICAgdmFyIHBhcnNlZENvbXB1dGVkID0ge30sIGhhbmRsZSwgcGFpciwgdHlwZTtcbiAgICBmb3IodmFyIGkgaW4gY29tcHV0ZWQpe1xuICAgICAgaGFuZGxlID0gY29tcHV0ZWRbaV1cbiAgICAgIHR5cGUgPSB0eXBlb2YgaGFuZGxlO1xuXG4gICAgICBpZihoYW5kbGUudHlwZSA9PT0gJ2V4cHJlc3Npb24nKXtcbiAgICAgICAgcGFyc2VkQ29tcHV0ZWRbaV0gPSBoYW5kbGU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYoIHR5cGUgPT09IFwic3RyaW5nXCIgKXtcbiAgICAgICAgcGFyc2VkQ29tcHV0ZWRbaV0gPSBwYXJzZS5leHByZXNzaW9uKGhhbmRsZSlcbiAgICAgIH1lbHNle1xuICAgICAgICBwYWlyID0gcGFyc2VkQ29tcHV0ZWRbaV0gPSB7dHlwZTogJ2V4cHJlc3Npb24nfTtcbiAgICAgICAgaWYodHlwZSA9PT0gXCJmdW5jdGlvblwiICl7XG4gICAgICAgICAgcGFpci5nZXQgPSB3cmFwR2V0KGhhbmRsZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGlmKGhhbmRsZS5nZXQpIHBhaXIuZ2V0ID0gd3JhcEdldChoYW5kbGUuZ2V0KTtcbiAgICAgICAgICBpZihoYW5kbGUuc2V0KSBwYWlyLnNldCA9IHdyYXBTZXQoaGFuZGxlLnNldCk7XG4gICAgICAgIH1cbiAgICAgIH0gXG4gICAgfVxuICAgIHJldHVybiBwYXJzZWRDb21wdXRlZDtcbiAgfVxufSkoKTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4nQkVHSU4nOiAneycsXG4nRU5EJzogJ30nXG59IiwidmFyIC8vIHBhY2thZ2VzXG4gIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKSxcbiBhbmltYXRlID0gcmVxdWlyZShcIi4uL2hlbHBlci9hbmltYXRlLmpzXCIpLFxuIGRvbSA9IHJlcXVpcmUoXCIuLi9kb20uanNcIiksXG4gUmVndWxhciA9IHJlcXVpcmUoXCIuLi9SZWd1bGFyLmpzXCIpO1xuXG5cbnZhciAvLyB2YXJpYWJsZXNcbiAgckNsYXNzTmFtZSA9IC9eWy1cXHddKyhcXHNbLVxcd10rKSokLyxcbiAgckNvbW1hU2VwID0gL1tcXHJcXG5cXGYgXSosW1xcclxcblxcZiBdKig/PVxcdytcXDopLywgLy8gIGRvbnQgc3BsaXQgY29tbWEgaW4gIEV4cHJlc3Npb25cbiAgclN0eWxlcyA9IC9eXFx7LipcXH0kLywgLy8gIGZvciBTaW1waWxmeVxuICByU3BhY2UgPSAvXFxzKy8sIC8vICBmb3IgU2ltcGlsZnlcbiAgV0hFTl9DT01NQU5EID0gXCJ3aGVuXCIsXG4gIEVWRU5UX0NPTU1BTkQgPSBcIm9uXCIsXG4gIFRIRU5fQ09NTUFORCA9IFwidGhlblwiO1xuXG4vKipcbiAqIEFuaW1hdGlvbiBQbHVnaW5cbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBDb21wb25lbnQgXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVTZWVkKHR5cGUpe1xuXG4gIHZhciBzdGVwcyA9IFtdLCBjdXJyZW50ID0gMCwgY2FsbGJhY2sgPSBfLm5vb3A7XG4gIHZhciBrZXk7XG5cbiAgdmFyIG91dCA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHN0YXJ0OiBmdW5jdGlvbihjYil7XG4gICAgICBrZXkgPSBfLnVpZCgpO1xuICAgICAgaWYodHlwZW9mIGNiID09PSBcImZ1bmN0aW9uXCIpIGNhbGxiYWNrID0gY2I7XG4gICAgICBpZihjdXJyZW50PiAwICl7XG4gICAgICAgIGN1cnJlbnQgPSAwIDtcbiAgICAgIH1lbHNle1xuICAgICAgICBvdXQuc3RlcCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dC5jb21wZWxldGU7XG4gICAgfSxcbiAgICBjb21wZWxldGU6IGZ1bmN0aW9uKCl7XG4gICAgICBrZXkgPSBudWxsO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgIGNhbGxiYWNrID0gXy5ub29wO1xuICAgICAgY3VycmVudCA9IDA7XG4gICAgfSxcbiAgICBzdGVwOiBmdW5jdGlvbigpe1xuICAgICAgaWYoc3RlcHNbY3VycmVudF0pIHN0ZXBzW2N1cnJlbnQgXSggb3V0LmRvbmUuYmluZChvdXQsIGtleSkgKTtcbiAgICB9LFxuICAgIGRvbmU6IGZ1bmN0aW9uKHBrZXkpe1xuICAgICAgaWYocGtleSAhPT0ga2V5KSByZXR1cm47IC8vIG1lYW5zIHRoZSBsb29wIGlzIGRvd25cbiAgICAgIGlmKCBjdXJyZW50IDwgc3RlcHMubGVuZ3RoIC0gMSApIHtcbiAgICAgICAgY3VycmVudCsrO1xuICAgICAgICBvdXQuc3RlcCgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIG91dC5jb21wZWxldGUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHB1c2g6IGZ1bmN0aW9uKHN0ZXApe1xuICAgICAgc3RlcHMucHVzaChzdGVwKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG5cblJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiYW5pbWF0aW9uXCIpXG5cblxuLy8gYnVpbHRpbiBhbmltYXRpb25cblJlZ3VsYXIuYW5pbWF0aW9uKHtcbiAgXCJ3YWl0XCI6IGZ1bmN0aW9uKCBzdGVwICl7XG4gICAgdmFyIHRpbWVvdXQgPSBwYXJzZUludCggc3RlcC5wYXJhbSApIHx8IDBcbiAgICByZXR1cm4gZnVuY3Rpb24oZG9uZSl7XG4gICAgICAvLyBfLmxvZyhcImRlbGF5IFwiICsgdGltZW91dClcbiAgICAgIHNldFRpbWVvdXQoIGRvbmUsIHRpbWVvdXQgKTtcbiAgICB9XG4gIH0sXG4gIFwiY2xhc3NcIjogZnVuY3Rpb24oc3RlcCl7XG4gICAgdmFyIHRtcCA9IHN0ZXAucGFyYW0uc3BsaXQoXCIsXCIpLFxuICAgICAgY2xhc3NOYW1lID0gdG1wWzBdIHx8IFwiXCIsXG4gICAgICBtb2RlID0gcGFyc2VJbnQodG1wWzFdKSB8fCAxO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgLy8gXy5sb2coY2xhc3NOYW1lKVxuICAgICAgYW5pbWF0ZS5zdGFydENsYXNzQW5pbWF0ZSggc3RlcC5lbGVtZW50LCBjbGFzc05hbWUgLCBkb25lLCBtb2RlICk7XG4gICAgfVxuICB9LFxuICBcImNhbGxcIjogZnVuY3Rpb24oc3RlcCl7XG4gICAgdmFyIGZuID0gdGhpcy4kZXhwcmVzc2lvbihzdGVwLnBhcmFtKS5nZXQsIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcbiAgICAgIC8vIF8ubG9nKHN0ZXAucGFyYW0sICdjYWxsJylcbiAgICAgIGZuKHNlbGYpO1xuICAgICAgc2VsZi4kdXBkYXRlKCk7XG4gICAgICBkb25lKClcbiAgICB9XG4gIH0sXG4gIFwiZW1pdFwiOiBmdW5jdGlvbihzdGVwKXtcbiAgICB2YXIgcGFyYW0gPSBzdGVwLnBhcmFtO1xuICAgIHZhciB0bXAgPSBwYXJhbS5zcGxpdChcIixcIiksXG4gICAgICBldnQgPSB0bXBbMF0gfHwgXCJcIixcbiAgICAgIGFyZ3MgPSB0bXBbMV0/IHRoaXMuJGV4cHJlc3Npb24odG1wWzFdKS5nZXQ6IG51bGw7XG5cbiAgICBpZighZXZ0KSB0aHJvdyBcInlvdSBzaG91ZCBzcGVjaWZpZWQgYSBldmVudG5hbWUgaW4gZW1pdCBjb21tYW5kXCI7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgc2VsZi4kZW1pdChldnQsIGFyZ3M/IGFyZ3Moc2VsZikgOiB1bmRlZmluZWQpO1xuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgfSxcbiAgLy8gc3R5bGU6IGxlZnQgezEwfXB4LFxuICBzdHlsZTogZnVuY3Rpb24oc3RlcCl7XG4gICAgdmFyIHN0eWxlcyA9IHt9LCBcbiAgICAgIHBhcmFtID0gc3RlcC5wYXJhbSxcbiAgICAgIHBhaXJzID0gcGFyYW0uc3BsaXQoXCIsXCIpLCB2YWxpZDtcbiAgICBwYWlycy5mb3JFYWNoKGZ1bmN0aW9uKHBhaXIpe1xuICAgICAgcGFpciA9IHBhaXIudHJpbSgpO1xuICAgICAgaWYocGFpcil7XG4gICAgICAgIHZhciB0bXAgPSBwYWlyLnNwbGl0KCByU3BhY2UgKSxcbiAgICAgICAgICBuYW1lID0gdG1wLnNoaWZ0KCksXG4gICAgICAgICAgdmFsdWUgPSB0bXAuam9pbihcIiBcIik7XG5cbiAgICAgICAgaWYoICFuYW1lIHx8ICF2YWx1ZSApIHRocm93IFwiaW52YWxpZCBzdHlsZSBpbiBjb21tYW5kOiBzdHlsZVwiO1xuICAgICAgICBzdHlsZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgdmFsaWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZnVuY3Rpb24oZG9uZSl7XG4gICAgICBpZih2YWxpZCl7XG4gICAgICAgIGFuaW1hdGUuc3RhcnRTdHlsZUFuaW1hdGUoc3RlcC5lbGVtZW50LCBzdHlsZXMsIGRvbmUpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cblxuXG4vLyBoYW5jZGxlIHRoZSByLWFuaW1hdGlvbiBkaXJlY3RpdmVcbi8vIGVsIDogdGhlIGVsZW1lbnQgdG8gcHJvY2Vzc1xuLy8gdmFsdWU6IHRoZSBkaXJlY3RpdmUgdmFsdWVcbmZ1bmN0aW9uIHByb2Nlc3NBbmltYXRlKCBlbGVtZW50LCB2YWx1ZSApe1xuICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcblxuICB2YXIgY29tcG9zaXRlcyA9IHZhbHVlLnNwbGl0KFwiO1wiKSwgXG4gICAgY29tcG9zaXRlLCBjb250ZXh0ID0gdGhpcywgc2VlZHMgPSBbXSwgc2VlZCwgZGVzdHJvaWVzID0gW10sIGRlc3Ryb3ksXG4gICAgY29tbWFuZCwgcGFyYW0gLCBjdXJyZW50ID0gMCwgdG1wLCBhbmltYXRvciwgc2VsZiA9IHRoaXM7XG5cbiAgZnVuY3Rpb24gcmVzZXQoIHR5cGUgKXtcbiAgICBzZWVkICYmIHNlZWRzLnB1c2goIHNlZWQgKVxuICAgIHNlZWQgPSBjcmVhdGVTZWVkKCB0eXBlICk7XG4gIH1cblxuICBmdW5jdGlvbiB3aGVuQ2FsbGJhY2soc3RhcnQsIHZhbHVlKXtcbiAgICBpZiggISF2YWx1ZSApIHN0YXJ0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGlvbkRlc3Ryb3koZWxlbWVudCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICBkZWxldGUgZWxlbWVudC5vbmVudGVyO1xuICAgICAgZGVsZXRlIGVsZW1lbnQub25sZWF2ZTtcbiAgICB9IFxuICB9XG5cbiAgZm9yKCB2YXIgaSA9IDAsIGxlbiA9IGNvbXBvc2l0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcblxuICAgIGNvbXBvc2l0ZSA9IGNvbXBvc2l0ZXNbaV07XG4gICAgdG1wID0gY29tcG9zaXRlLnNwbGl0KFwiOlwiKTtcbiAgICBjb21tYW5kID0gdG1wWzBdICYmIHRtcFswXS50cmltKCk7XG4gICAgcGFyYW0gPSB0bXBbMV0gJiYgdG1wWzFdLnRyaW0oKTtcblxuICAgIGlmKCAhY29tbWFuZCApIGNvbnRpbnVlO1xuXG4gICAgaWYoIGNvbW1hbmQgPT09IFdIRU5fQ09NTUFORCApe1xuICAgICAgcmVzZXQoXCJ3aGVuXCIpO1xuICAgICAgdGhpcy4kd2F0Y2gocGFyYW0sIHdoZW5DYWxsYmFjay5iaW5kKCB0aGlzLCBzZWVkLnN0YXJ0ICkgKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmKCBjb21tYW5kID09PSBFVkVOVF9DT01NQU5EKXtcbiAgICAgIHJlc2V0KHBhcmFtKTtcbiAgICAgIGlmKCBwYXJhbSA9PT0gXCJsZWF2ZVwiICl7XG4gICAgICAgIGVsZW1lbnQub25sZWF2ZSA9IHNlZWQuc3RhcnQ7XG4gICAgICAgIGRlc3Ryb2llcy5wdXNoKCBhbmltYXRpb25EZXN0cm95KGVsZW1lbnQpICk7XG4gICAgICB9ZWxzZSBpZiggcGFyYW0gPT09IFwiZW50ZXJcIiApe1xuICAgICAgICBlbGVtZW50Lm9uZW50ZXIgPSBzZWVkLnN0YXJ0O1xuICAgICAgICBkZXN0cm9pZXMucHVzaCggYW5pbWF0aW9uRGVzdHJveShlbGVtZW50KSApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKCAoXCJvblwiICsgcGFyYW0pIGluIGVsZW1lbnQpeyAvLyBpZiBkb20gaGF2ZSB0aGUgZXZlbnQgLCB3ZSB1c2UgZG9tIGV2ZW50XG4gICAgICAgICAgZGVzdHJvaWVzLnB1c2godGhpcy5faGFuZGxlRXZlbnQoIGVsZW1lbnQsIHBhcmFtLCBzZWVkLnN0YXJ0ICkpO1xuICAgICAgICB9ZWxzZXsgLy8gb3RoZXJ3aXNlLCB3ZSB1c2UgY29tcG9uZW50IGV2ZW50XG4gICAgICAgICAgdGhpcy4kb24ocGFyYW0sIHNlZWQuc3RhcnQpO1xuICAgICAgICAgIGRlc3Ryb2llcy5wdXNoKHRoaXMuJG9mZi5iaW5kKHRoaXMsIHBhcmFtLCBzZWVkLnN0YXJ0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdmFyIGFuaW1hdG9yID0gIFJlZ3VsYXIuYW5pbWF0aW9uKGNvbW1hbmQpIFxuICAgIGlmKCBhbmltYXRvciAmJiBzZWVkICl7XG4gICAgICBzZWVkLnB1c2goXG4gICAgICAgIGFuaW1hdG9yLmNhbGwodGhpcyx7XG4gICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICBkb25lOiBzZWVkLmRvbmUsXG4gICAgICAgICAgcGFyYW06IHBhcmFtIFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1lbHNle1xuICAgICAgdGhyb3cgXCJ5b3UgbmVlZCBzdGFydCB3aXRoIGBvbmAgb3IgYGV2ZW50YCBpbiByLWFuaW1hdGlvblwiO1xuICAgIH1cbiAgfVxuXG4gIGlmKGRlc3Ryb2llcy5sZW5ndGgpe1xuICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgZGVzdHJvaWVzLmZvckVhY2goZnVuY3Rpb24oZGVzdHJveSl7XG4gICAgICAgIGRlc3Ryb3koKTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cblxuUmVndWxhci5kaXJlY3RpdmUoIFwici1hbmltYXRpb25cIiwgcHJvY2Vzc0FuaW1hdGUpXG5SZWd1bGFyLmRpcmVjdGl2ZSggXCJyLXNlcXVlbmNlXCIsIHByb2Nlc3NBbmltYXRlKVxuXG4iLCIvLyBSZWd1bGFyXG52YXIgXyA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9kb20uanNcIik7XG52YXIgYW5pbWF0ZSA9IHJlcXVpcmUoXCIuLi9oZWxwZXIvYW5pbWF0ZS5qc1wiKTtcbnZhciBSZWd1bGFyID0gcmVxdWlyZShcIi4uL1JlZ3VsYXIuanNcIik7XG5cblxuXG5yZXF1aXJlKFwiLi9ldmVudC5qc1wiKTtcbnJlcXVpcmUoXCIuL2Zvcm0uanNcIik7XG5cblxuLy8gKip3YXJuKio6IGNsYXNzIGludGVwbGF0aW9uIHdpbGwgb3ZlcnJpZGUgdGhpcyBkaXJlY3RpdmUgXG5cblJlZ3VsYXIuZGlyZWN0aXZlKCdyLWNsYXNzJywgZnVuY3Rpb24oZWxlbSwgdmFsdWUpe1xuICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlKXtcbiAgICB2YXIgY2xhc3NOYW1lID0gJyAnKyBlbGVtLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMrL2csICcgJykgKycgJztcbiAgICBmb3IodmFyIGkgaW4gbnZhbHVlKSBpZihudmFsdWUuaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnJlcGxhY2UoJyAnICsgaSArICcgJywnICcpO1xuICAgICAgaWYobnZhbHVlW2ldID09PSB0cnVlKXtcbiAgICAgICAgY2xhc3NOYW1lICs9IGkrJyAnO1xuICAgICAgfVxuICAgIH1cbiAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZS50cmltKCk7XG4gIH0sdHJ1ZSk7XG5cbn0pO1xuXG4vLyAqKndhcm4qKjogc3R5bGUgaW50ZXBsYXRpb24gd2lsbCBvdmVycmlkZSB0aGlzIGRpcmVjdGl2ZSBcblxuUmVndWxhci5kaXJlY3RpdmUoJ3Itc3R5bGUnLCBmdW5jdGlvbihlbGVtLCB2YWx1ZSl7XG4gIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbihudmFsdWUpe1xuICAgIGZvcih2YXIgaSBpbiBudmFsdWUpIGlmKG52YWx1ZS5oYXNPd25Qcm9wZXJ0eShpKSl7XG4gICAgICBkb20uY3NzKGVsZW0sIGksIG52YWx1ZVtpXSk7XG4gICAgfVxuICB9LHRydWUpO1xufSk7XG5cbi8vIHdoZW4gZXhwcmVzc2lvbiBpcyBldmFsdWF0ZSB0byB0cnVlLCB0aGUgZWxlbSB3aWxsIGFkZCBkaXNwbGF5Om5vbmVcbi8vIEV4YW1wbGU6IDxkaXYgci1oaWRlPXt7aXRlbXMubGVuZ3RoID4gMH19PjwvZGl2PlxuXG5SZWd1bGFyLmRpcmVjdGl2ZSgnci1oaWRlJywgZnVuY3Rpb24oZWxlbSwgdmFsdWUpe1xuICB2YXIgcHJlQm9vbCA9IG51bGwsIGNvbXBlbGV0ZTtcbiAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWx1ZSl7XG4gICAgdmFyIGJvb2wgPSAhIW52YWx1ZTtcbiAgICBpZihib29sID09PSBwcmVCb29sKSByZXR1cm47IFxuICAgIHByZUJvb2wgPSBib29sO1xuICAgIGlmKGJvb2wpe1xuICAgICAgaWYoZWxlbS5vbmxlYXZlKXtcbiAgICAgICAgY29tcGVsZXRlID0gZWxlbS5vbmxlYXZlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICAgICAgICBjb21wZWxldGUgPSBudWxsO1xuICAgICAgICB9KVxuICAgICAgfWVsc2V7XG4gICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgICB9XG4gICAgICBcbiAgICB9ZWxzZXtcbiAgICAgIGlmKGNvbXBlbGV0ZSkgY29tcGVsZXRlKCk7XG4gICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgaWYoZWxlbS5vbmVudGVyKXtcbiAgICAgICAgZWxlbS5vbmVudGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxufSk7XG5cbi8vIHVuZXNjYXBlZCBpbnRlcGxhdGlvbi4geHNzIGlzIG5vdCBiZSBwcm90ZWN0XG5SZWd1bGFyLmRpcmVjdGl2ZSgnci1odG1sJywgZnVuY3Rpb24oZWxlbSwgdmFsdWUpe1xuICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlKXtcbiAgICBudmFsdWUgPSBudmFsdWUgfHwgXCJcIjtcbiAgICBkb20uaHRtbChlbGVtLCBudmFsdWUpXG4gIH0sIHtmb3JjZTogdHJ1ZX0pO1xufSk7XG5cblxuXG5cblxuXG5cblxuXG4iLCIvKipcbiAqIGV2ZW50IGRpcmVjdGl2ZSAgYnVuZGxlXG4gKlxuICovXG52YXIgXyA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9kb20uanNcIik7XG52YXIgUmVndWxhciA9IHJlcXVpcmUoXCIuLi9SZWd1bGFyLmpzXCIpO1xuXG5SZWd1bGFyLl9hZGRQcm90b0luaGVyaXRDYWNoZShcImV2ZW50XCIpO1xuXG5SZWd1bGFyLmV2ZW50KFwiZW50ZXJcIiwgZnVuY3Rpb24oZWxlbSwgZmlyZSkge1xuICBfLmxvZyhcIm9uLWVudGVyIHdpbGwgYmUgcmVtb3ZlZCBpbiAwLjQuMFwiLCBcImVycm9yXCIpO1xuICBmdW5jdGlvbiB1cGRhdGUoIGV2ICkge1xuICAgIGlmICggZXYud2hpY2ggPT09IDEzICkge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcmUoZXYpO1xuICAgIH1cbiAgfVxuICBkb20ub24oIGVsZW0sIFwia2V5cHJlc3NcIiwgdXBkYXRlICk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGRvbS5vZmYoIGVsZW0sIFwia2V5cHJlc3NcIiwgdXBkYXRlICk7XG4gIH1cbn0pXG5cblxuUmVndWxhci5kaXJlY3RpdmUoIC9eb24tXFx3KyQvLCBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgLCBhdHRycykge1xuICBpZiAoICFuYW1lIHx8ICF2YWx1ZSApIHJldHVybjtcbiAgdmFyIHR5cGUgPSBuYW1lLnNwbGl0KFwiLVwiKVsxXTtcbiAgcmV0dXJuIHRoaXMuX2hhbmRsZUV2ZW50KCBlbGVtLCB0eXBlLCB2YWx1ZSwgYXR0cnMgKTtcbn0pO1xuLy8gVE9ETy5cbi8qKlxuLSAkKCdkeCcpLmRlbGVnYXRlKClcbiovXG5SZWd1bGFyLmRpcmVjdGl2ZSggL15kZWxlZ2F0ZS1cXHcrJC8sIGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSwgYXR0cnMgKSB7XG4gIHZhciByb290ID0gdGhpcy4kcm9vdDtcbiAgdmFyIF9kZWxlZ2F0ZXMgPSByb290Ll9kZWxlZ2F0ZXMgfHwgKCByb290Ll9kZWxlZ2F0ZXMgPSB7fSApO1xuICBpZiAoICFuYW1lIHx8ICF2YWx1ZSApIHJldHVybjtcbiAgdmFyIHR5cGUgPSBuYW1lLnNwbGl0KFwiLVwiKVsxXTtcbiAgdmFyIGZpcmUgPSBfLmhhbmRsZUV2ZW50LmNhbGwodGhpcywgdmFsdWUsIHR5cGUpO1xuXG4gIGZ1bmN0aW9uIGRlbGVnYXRlRXZlbnQoZXYpe1xuICAgIG1hdGNoUGFyZW50KGV2LCBfZGVsZWdhdGVzW3R5cGVdKTtcbiAgfVxuXG4gIGlmKCAhX2RlbGVnYXRlc1t0eXBlXSApe1xuICAgIF9kZWxlZ2F0ZXNbdHlwZV0gPSBbXTtcblxuICAgIHJvb3QuJG9uKCBcIiRpbmplY3RcIiwgZnVuY3Rpb24oIG5ld1BhcmVudCApe1xuICAgICAgdmFyIHByZVBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgICAgIGlmKCBwcmVQYXJlbnQgKXtcbiAgICAgICAgZG9tLm9mZihwcmVQYXJlbnQsIHR5cGUsIGRlbGVnYXRlRXZlbnQpO1xuICAgICAgfVxuICAgICAgZG9tLm9uKG5ld1BhcmVudCwgdHlwZSwgZGVsZWdhdGVFdmVudCk7XG4gICAgfSlcblxuICAgIHJvb3QuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKXtcbiAgICAgIGlmKHJvb3QucGFyZW50Tm9kZSkgZG9tLm9mZihyb290LnBhcmVudE5vZGUsIHR5cGUsIGRlbGVnYXRlRXZlbnQpXG4gICAgICByb290Ll9kZWxlZ2F0ZXNbdHlwZV0gPSBudWxsO1xuICAgIH0pXG4gIH1cbiAgdmFyIGRlbGVnYXRlID0ge1xuICAgIGVsZW1lbnQ6IGVsZW0sXG4gICAgZmlyZTogZmlyZVxuICB9XG4gIF9kZWxlZ2F0ZXNbdHlwZV0ucHVzaCggZGVsZWdhdGUgKTtcblxuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICB2YXIgZGVsZWdhdGVzID0gX2RlbGVnYXRlc1t0eXBlXTtcbiAgICBpZighZGVsZWdhdGVzIHx8ICFkZWxlZ2F0ZXMubGVuZ3RoKSByZXR1cm47XG4gICAgZm9yKCB2YXIgaSA9IDAsIGxlbiA9IGRlbGVnYXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuICAgICAgaWYoIGRlbGVnYXRlc1tpXSA9PT0gZGVsZWdhdGUgKSBkZWxlZ2F0ZXMuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfVxuXG59KTtcblxuXG5mdW5jdGlvbiBtYXRjaFBhcmVudChldiAsIGRlbGVnYXRlcyl7XG4gIHZhciB0YXJnZXQgPSBldi50YXJnZXQ7XG4gIHdoaWxlKHRhcmdldCAmJiB0YXJnZXQgIT09IGRvbS5kb2Mpe1xuICAgIGZvciggdmFyIGkgPSAwLCBsZW4gPSBkZWxlZ2F0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcbiAgICAgIGlmKGRlbGVnYXRlc1tpXS5lbGVtZW50ID09PSB0YXJnZXQpe1xuICAgICAgICBkZWxlZ2F0ZXNbaV0uZmlyZShldik7XG4gICAgICB9XG4gICAgfVxuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICB9XG59IiwiLy8gUmVndWxhclxudmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpO1xudmFyIFJlZ3VsYXIgPSByZXF1aXJlKFwiLi4vUmVndWxhci5qc1wiKTtcblxudmFyIG1vZGVsSGFuZGxlcnMgPSB7XG4gIFwidGV4dFwiOiBpbml0VGV4dCxcbiAgXCJzZWxlY3RcIjogaW5pdFNlbGVjdCxcbiAgXCJjaGVja2JveFwiOiBpbml0Q2hlY2tCb3gsXG4gIFwicmFkaW9cIjogaW5pdFJhZGlvXG59XG5cblxuLy8gQFRPRE9cblxuXG4vLyB0d28td2F5IGJpbmRpbmcgd2l0aCByLW1vZGVsXG4vLyB3b3JrcyBvbiBpbnB1dCwgdGV4dGFyZWEsIGNoZWNrYm94LCByYWRpbywgc2VsZWN0XG5cblJlZ3VsYXIuZGlyZWN0aXZlKFwici1tb2RlbFwiLCBmdW5jdGlvbihlbGVtLCB2YWx1ZSl7XG4gIHZhciB0YWcgPSBlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgdmFyIHNpZ24gPSB0YWc7XG4gIGlmKHNpZ24gPT09IFwiaW5wdXRcIikgc2lnbiA9IGVsZW0udHlwZSB8fCBcInRleHRcIjtcbiAgZWxzZSBpZihzaWduID09PSBcInRleHRhcmVhXCIpIHNpZ24gPSBcInRleHRcIjtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB2YWx1ZSA9IHRoaXMuJGV4cHJlc3Npb24odmFsdWUpO1xuXG4gIGlmKCBtb2RlbEhhbmRsZXJzW3NpZ25dICkgcmV0dXJuIG1vZGVsSGFuZGxlcnNbc2lnbl0uY2FsbCh0aGlzLCBlbGVtLCB2YWx1ZSk7XG4gIGVsc2UgaWYodGFnID09PSBcImlucHV0XCIpe1xuICAgIHJldHVybiBtb2RlbEhhbmRsZXJzLnRleHQuY2FsbCh0aGlzLCBlbGVtLCB2YWx1ZSk7XG4gIH1cbn0pO1xuXG5cblxuLy8gYmluZGluZyA8c2VsZWN0PlxuXG5mdW5jdGlvbiBpbml0U2VsZWN0KCBlbGVtLCBwYXJzZWQpe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB3YyA9dGhpcy4kd2F0Y2gocGFyc2VkLCBmdW5jdGlvbihuZXdWYWx1ZSl7XG4gICAgdmFyIGNoaWxkcmVuID0gXy5zbGljZShlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKSlcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUsIGluZGV4KXtcbiAgICAgIGlmKG5vZGUudmFsdWUgPT0gbmV3VmFsdWUpe1xuICAgICAgICBlbGVtLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9KVxuICB9KTtcblxuICBmdW5jdGlvbiBoYW5kbGVyKCl7XG4gICAgcGFyc2VkLnNldChzZWxmLCB0aGlzLnZhbHVlKTtcbiAgICB3Yy5sYXN0ID0gdGhpcy52YWx1ZTtcbiAgICBzZWxmLiR1cGRhdGUoKTtcbiAgfVxuXG4gIGRvbS5vbihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKTtcbiAgXG4gIGlmKHBhcnNlZC5nZXQoc2VsZikgPT09IHVuZGVmaW5lZCAmJiBlbGVtLnZhbHVlKXtcbiAgICAgcGFyc2VkLnNldChzZWxmLCBlbGVtLnZhbHVlKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gZGVzdHJveSgpe1xuICAgIGRvbS5vZmYoZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gIH1cbn1cblxuLy8gaW5wdXQsdGV4dGFyZWEgYmluZGluZ1xuXG5mdW5jdGlvbiBpbml0VGV4dChlbGVtLCBwYXJzZWQpe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB3YyA9IHRoaXMuJHdhdGNoKHBhcnNlZCwgZnVuY3Rpb24obmV3VmFsdWUpe1xuICAgIGlmKGVsZW0udmFsdWUgIT09IG5ld1ZhbHVlKSBlbGVtLnZhbHVlID0gbmV3VmFsdWUgPT0gbnVsbD8gXCJcIjogXCJcIiArIG5ld1ZhbHVlO1xuICB9KTtcblxuICAvLyBAVE9ETyB0byBmaXhlZCBldmVudFxuICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoZXYpe1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBpZihldi50eXBlPT09J2N1dCcgfHwgZXYudHlwZT09PSdwYXN0ZScpe1xuICAgICAgXy5uZXh0VGljayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGF0LnZhbHVlXG4gICAgICAgIHBhcnNlZC5zZXQoc2VsZiwgdmFsdWUpO1xuICAgICAgICB3Yy5sYXN0ID0gdmFsdWU7XG4gICAgICAgIHNlbGYuJHVwZGF0ZSgpO1xuICAgICAgfSlcbiAgICB9ZWxzZXtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhhdC52YWx1ZVxuICAgICAgICBwYXJzZWQuc2V0KHNlbGYsIHZhbHVlKTtcbiAgICAgICAgd2MubGFzdCA9IHZhbHVlO1xuICAgICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgaWYoZG9tLm1zaWUgIT09IDkgJiYgXCJvbmlucHV0XCIgaW4gZG9tLnROb2RlICl7XG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgaGFuZGxlciApO1xuICB9ZWxzZXtcbiAgICBkb20ub24oZWxlbSwgXCJwYXN0ZVwiLCBoYW5kbGVyKVxuICAgIGRvbS5vbihlbGVtLCBcImtleXVwXCIsIGhhbmRsZXIpXG4gICAgZG9tLm9uKGVsZW0sIFwiY3V0XCIsIGhhbmRsZXIpXG4gICAgZG9tLm9uKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG4gIH1cbiAgaWYocGFyc2VkLmdldChzZWxmKSA9PT0gdW5kZWZpbmVkICYmIGVsZW0udmFsdWUpe1xuICAgICBwYXJzZWQuc2V0KHNlbGYsIGVsZW0udmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiBkZXN0cm95KCl7XG4gICAgaWYoZG9tLm1zaWUgIT09IDkgJiYgXCJvbmlucHV0XCIgaW4gZG9tLnROb2RlICl7XG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBoYW5kbGVyICk7XG4gICAgfWVsc2V7XG4gICAgICBkb20ub2ZmKGVsZW0sIFwicGFzdGVcIiwgaGFuZGxlcilcbiAgICAgIGRvbS5vZmYoZWxlbSwgXCJrZXl1cFwiLCBoYW5kbGVyKVxuICAgICAgZG9tLm9mZihlbGVtLCBcImN1dFwiLCBoYW5kbGVyKVxuICAgICAgZG9tLm9mZihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxuICAgIH1cbiAgfVxufVxuXG5cbi8vIGlucHV0OmNoZWNrYm94ICBiaW5kaW5nXG5cbmZ1bmN0aW9uIGluaXRDaGVja0JveChlbGVtLCBwYXJzZWQpe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB3YXRjaGVyID0gdGhpcy4kd2F0Y2gocGFyc2VkLCBmdW5jdGlvbihuZXdWYWx1ZSl7XG4gICAgZG9tLmF0dHIoZWxlbSwgJ2NoZWNrZWQnLCAhIW5ld1ZhbHVlKTtcbiAgfSk7XG5cbiAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyKCl7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgIHBhcnNlZC5zZXQoc2VsZiwgdmFsdWUpO1xuICAgIHdhdGNoZXIubGFzdCA9IHZhbHVlO1xuICAgIHNlbGYuJHVwZGF0ZSgpO1xuICB9XG4gIGlmKHBhcnNlZC5zZXQpIGRvbS5vbihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxuXG4gIGlmKHBhcnNlZC5nZXQoc2VsZikgPT09IHVuZGVmaW5lZCl7XG4gICAgcGFyc2VkLnNldChzZWxmLCAhIWVsZW0uY2hlY2tlZCk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gZGVzdHJveSgpe1xuICAgIGlmKHBhcnNlZC5zZXQpIGRvbS5vZmYoZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcilcbiAgfVxufVxuXG5cbi8vIGlucHV0OnJhZGlvIGJpbmRpbmdcblxuZnVuY3Rpb24gaW5pdFJhZGlvKGVsZW0sIHBhcnNlZCl7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHdjID0gdGhpcy4kd2F0Y2gocGFyc2VkLCBmdW5jdGlvbiggbmV3VmFsdWUgKXtcbiAgICBpZihuZXdWYWx1ZSA9PSBlbGVtLnZhbHVlKSBlbGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgIGVsc2UgZWxlbS5jaGVja2VkID0gZmFsc2U7XG4gIH0pO1xuXG5cbiAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyKCl7XG4gICAgdmFyIHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICBwYXJzZWQuc2V0KHNlbGYsIHZhbHVlKTtcbiAgICBzZWxmLiR1cGRhdGUoKTtcbiAgfVxuICBpZihwYXJzZWQuc2V0KSBkb20ub24oZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcilcbiAgLy8gYmVhY3VzZSBvbmx5IGFmdGVyIGNvbXBpbGUoaW5pdCksIHRoZSBkb20gc3RydWN0cnVlIGlzIGV4c2l0LiBcbiAgaWYocGFyc2VkLmdldChzZWxmKSA9PT0gdW5kZWZpbmVkKXtcbiAgICBpZihlbGVtLmNoZWNrZWQpIHtcbiAgICAgIHBhcnNlZC5zZXQoc2VsZiwgZWxlbS52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGRlc3Ryb3koKXtcbiAgICBpZihwYXJzZWQuc2V0KSBkb20ub2ZmKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG4gIH1cbn1cbiIsIlxuLy8gdGhhbmtzIGZvciBhbmd1bGFyICYmIG1vb3Rvb2xzIGZvciBzb21lIGNvbmNpc2UmY3Jvc3MtcGxhdGZvcm0gIGltcGxlbWVudGlvblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyBUaGUgTUlUIExpY2Vuc2Vcbi8vIENvcHlyaWdodCAoYykgMjAxMC0yMDE0IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xuXG4vLyAtLS1cbi8vIGxpY2Vuc2U6IE1JVC1zdHlsZSBsaWNlbnNlLiBodHRwOi8vbW9vdG9vbHMubmV0XG5cblxudmFyIGRvbSA9IG1vZHVsZS5leHBvcnRzO1xudmFyIGVudiA9IHJlcXVpcmUoXCIuL2Vudi5qc1wiKTtcbnZhciBfID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciB0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG52YXIgYWRkRXZlbnQsIHJlbW92ZUV2ZW50O1xudmFyIG5vb3AgPSBmdW5jdGlvbigpe31cblxudmFyIG5hbWVzcGFjZXMgPSB7XG4gIGh0bWw6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLFxuICBzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxufVxuXG5kb20uYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbmRvbS5kb2MgPSBkb2N1bWVudDtcblxuLy8gY2FtZWxDYXNlXG5mdW5jdGlvbiBjYW1lbENhc2Uoc3RyKXtcbiAgcmV0dXJuIChcIlwiICsgc3RyKS5yZXBsYWNlKC8tXFxEL2csIGZ1bmN0aW9uKG1hdGNoKXtcbiAgICByZXR1cm4gbWF0Y2guY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufVxuXG5cbmRvbS50Tm9kZSA9IHROb2RlO1xuXG5pZih0Tm9kZS5hZGRFdmVudExpc3RlbmVyKXtcbiAgYWRkRXZlbnQgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBmbikge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpO1xuICB9XG4gIHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgZm4pIHtcbiAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKSBcbiAgfVxufWVsc2V7XG4gIGFkZEV2ZW50ID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgZm4pIHtcbiAgICBub2RlLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBmbik7XG4gIH1cbiAgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBmbikge1xuICAgIG5vZGUuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGZuKTsgXG4gIH1cbn1cblxuXG5kb20ubXNpZSA9IHBhcnNlSW50KCgvbXNpZSAoXFxkKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSB8fCBbXSlbMV0pO1xuaWYgKGlzTmFOKGRvbS5tc2llKSkge1xuICBkb20ubXNpZSA9IHBhcnNlSW50KCgvdHJpZGVudFxcLy4qOyBydjooXFxkKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSB8fCBbXSlbMV0pO1xufVxuXG5kb20uZmluZCA9IGZ1bmN0aW9uKHNsKXtcbiAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcikge1xuICAgIHRyeXtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNsKTtcbiAgICB9Y2F0Y2goZSl7XG5cbiAgICB9XG4gIH1cbiAgaWYoc2wuaW5kZXhPZignIycpIT09LTEpIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggc2wuc2xpY2UoMSkgKTtcbn1cblxuZG9tLmluamVjdCA9IGZ1bmN0aW9uKG5vZGUsIHJlZmVyLCBwb3NpdGlvbil7XG5cbiAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCAnYm90dG9tJztcblxuICBpZihBcnJheS5pc0FycmF5KG5vZGUpKXtcbiAgICB2YXIgdG1wID0gbm9kZTtcbiAgICBub2RlID0gZG9tLmZyYWdtZW50KCk7XG4gICAgZm9yKHZhciBpID0gMCxsZW4gPSB0bXAubGVuZ3RoOyBpIDwgbGVuIDtpKyspe1xuICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0bXBbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBmaXJzdENoaWxkLCBuZXh0O1xuICBzd2l0Y2gocG9zaXRpb24pe1xuICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICByZWZlci5hcHBlbmRDaGlsZCggbm9kZSApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIGlmKCBmaXJzdENoaWxkID0gcmVmZXIuZmlyc3RDaGlsZCApe1xuICAgICAgICByZWZlci5pbnNlcnRCZWZvcmUoIG5vZGUsIHJlZmVyLmZpcnN0Q2hpbGQgKTtcbiAgICAgIH1lbHNle1xuICAgICAgICByZWZlci5hcHBlbmRDaGlsZCggbm9kZSApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYWZ0ZXInOlxuICAgICAgaWYoIG5leHQgPSByZWZlci5uZXh0U2libGluZyApe1xuICAgICAgICBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBub2RlLCBuZXh0ICk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgcmVmZXIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggbm9kZSApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmVmb3JlJzpcbiAgICAgIHJlZmVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBub2RlLCByZWZlciApO1xuICB9XG59XG5cblxuZG9tLmlkID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufVxuXG4vLyBjcmVhdGVFbGVtZW50IFxuZG9tLmNyZWF0ZSA9IGZ1bmN0aW9uKHR5cGUsIG5zLCBhdHRycyl7XG4gIGlmKG5zID09PSAnc3ZnJyl7XG4gICAgaWYoIWVudi5zdmcpIHRocm93IEVycm9yKCd0aGUgZW52IG5lZWQgc3ZnIHN1cHBvcnQnKVxuICAgIG5zID0gbmFtZXNwYWNlcy5zdmc7XG4gIH1cbiAgcmV0dXJuICFucz8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLCB0eXBlKTtcbn1cblxuLy8gZG9jdW1lbnRGcmFnbWVudFxuZG9tLmZyYWdtZW50ID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbn1cblxuXG5cbnZhciBzcGVjaWFsQXR0ciA9IHtcbiAgJ2NsYXNzJzogZnVuY3Rpb24obm9kZSwgdmFsdWUpe1xuICAgICgnY2xhc3NOYW1lJyBpbiBub2RlICYmIChub2RlLm5hbWVzcGFjZVVSSSA9PT0gbmFtZXNwYWNlcy5odG1sIHx8ICFub2RlLm5hbWVzcGFjZVVSSSkpID9cbiAgICAgIG5vZGUuY2xhc3NOYW1lID0gKHZhbHVlIHx8ICcnKSA6IG5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIHZhbHVlKTtcbiAgfSxcbiAgJ2Zvcic6IGZ1bmN0aW9uKG5vZGUsIHZhbHVlKXtcbiAgICAoJ2h0bWxGb3InIGluIG5vZGUpID8gbm9kZS5odG1sRm9yID0gdmFsdWUgOiBub2RlLnNldEF0dHJpYnV0ZSgnZm9yJywgdmFsdWUpO1xuICB9LFxuICAnc3R5bGUnOiBmdW5jdGlvbihub2RlLCB2YWx1ZSl7XG4gICAgKG5vZGUuc3R5bGUpID8gbm9kZS5zdHlsZS5jc3NUZXh0ID0gdmFsdWUgOiBub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCB2YWx1ZSk7XG4gIH0sXG4gICd2YWx1ZSc6IGZ1bmN0aW9uKG5vZGUsIHZhbHVlKXtcbiAgICBub2RlLnZhbHVlID0gKHZhbHVlICE9IG51bGwpID8gdmFsdWUgOiAnJztcbiAgfVxufVxuXG5cbi8vIGF0dHJpYnV0ZSBTZXR0ZXIgJiBHZXR0ZXJcbmRvbS5hdHRyID0gZnVuY3Rpb24obm9kZSwgbmFtZSwgdmFsdWUpe1xuICBpZiAoXy5pc0Jvb2xlYW5BdHRyKG5hbWUpKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICghIXZhbHVlKSB7XG4gICAgICAgIG5vZGVbbmFtZV0gPSB0cnVlO1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCBuYW1lKTtcbiAgICAgICAgLy8gbHQgaWU3IC4gdGhlIGphdmFzY3JpcHQgY2hlY2tlZCBzZXR0aW5nIGlzIGluIHZhbGlkXG4gICAgICAgIC8vaHR0cDovL2J5dGVzLmNvbS90b3BpYy9qYXZhc2NyaXB0L2luc2lnaHRzLzc5OTE2Ny1icm93c2VyLXF1aXJrLWR5bmFtaWNhbGx5LWFwcGVuZGVkLWNoZWNrZWQtY2hlY2tib3gtZG9lcy1ub3QtYXBwZWFyLWNoZWNrZWQtaWVcbiAgICAgICAgaWYoZG9tLm1zaWUgJiYgZG9tLm1zaWUgPD03ICkgbm9kZS5kZWZhdWx0Q2hlY2tlZCA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVbbmFtZV0gPSBmYWxzZTtcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAobm9kZVtuYW1lXSB8fFxuICAgICAgICAgICAgICAgKG5vZGUuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0obmFtZSl8fCBub29wKS5zcGVjaWZpZWQpID8gbmFtZSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gaWYgaW4gc3BlY2lhbEF0dHI7XG4gICAgaWYoc3BlY2lhbEF0dHJbbmFtZV0pIHNwZWNpYWxBdHRyW25hbWVdKG5vZGUsIHZhbHVlKTtcbiAgICBlbHNlIGlmKHZhbHVlID09PSBudWxsKSBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxuICAgIGVsc2Ugbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKSB7XG4gICAgLy8gdGhlIGV4dHJhIGFyZ3VtZW50IFwiMlwiIGlzIHRvIGdldCB0aGUgcmlnaHQgdGhpbmcgZm9yIGEuaHJlZiBpbiBJRSwgc2VlIGpRdWVyeSBjb2RlXG4gICAgLy8gc29tZSBlbGVtZW50cyAoZS5nLiBEb2N1bWVudCkgZG9uJ3QgaGF2ZSBnZXQgYXR0cmlidXRlLCBzbyByZXR1cm4gdW5kZWZpbmVkXG4gICAgdmFyIHJldCA9IG5vZGUuZ2V0QXR0cmlidXRlKG5hbWUsIDIpO1xuICAgIC8vIG5vcm1hbGl6ZSBub24tZXhpc3RpbmcgYXR0cmlidXRlcyB0byB1bmRlZmluZWQgKGFzIGpRdWVyeSlcbiAgICByZXR1cm4gcmV0ID09PSBudWxsID8gdW5kZWZpbmVkIDogcmV0O1xuICB9XG59XG5cblxuZG9tLm9uID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgaGFuZGxlcil7XG4gIHZhciB0eXBlcyA9IHR5cGUuc3BsaXQoJyAnKTtcbiAgaGFuZGxlci5yZWFsID0gZnVuY3Rpb24oZXYpe1xuICAgIHZhciAkZXZlbnQgPSBuZXcgRXZlbnQoZXYpO1xuICAgICRldmVudC5vcmlnaW4gPSBub2RlO1xuICAgIGhhbmRsZXIuY2FsbChub2RlLCAkZXZlbnQpO1xuICB9XG4gIHR5cGVzLmZvckVhY2goZnVuY3Rpb24odHlwZSl7XG4gICAgdHlwZSA9IGZpeEV2ZW50TmFtZShub2RlLCB0eXBlKTtcbiAgICBhZGRFdmVudChub2RlLCB0eXBlLCBoYW5kbGVyLnJlYWwpO1xuICB9KTtcbn1cbmRvbS5vZmYgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBoYW5kbGVyKXtcbiAgdmFyIHR5cGVzID0gdHlwZS5zcGxpdCgnICcpO1xuICBoYW5kbGVyID0gaGFuZGxlci5yZWFsIHx8IGhhbmRsZXI7XG4gIHR5cGVzLmZvckVhY2goZnVuY3Rpb24odHlwZSl7XG4gICAgdHlwZSA9IGZpeEV2ZW50TmFtZShub2RlLCB0eXBlKTtcbiAgICByZW1vdmVFdmVudChub2RlLCB0eXBlLCBoYW5kbGVyKTtcbiAgfSlcbn1cblxuXG5kb20udGV4dCA9IChmdW5jdGlvbiAoKXtcbiAgdmFyIG1hcCA9IHt9O1xuICBpZiAoZG9tLm1zaWUgJiYgZG9tLm1zaWUgPCA5KSB7XG4gICAgbWFwWzFdID0gJ2lubmVyVGV4dCc7ICAgIFxuICAgIG1hcFszXSA9ICdub2RlVmFsdWUnOyAgICBcbiAgfSBlbHNlIHtcbiAgICBtYXBbMV0gPSBtYXBbM10gPSAndGV4dENvbnRlbnQnO1xuICB9XG4gIFxuICByZXR1cm4gZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XG4gICAgdmFyIHRleHRQcm9wID0gbWFwW25vZGUubm9kZVR5cGVdO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dFByb3AgPyBub2RlW3RleHRQcm9wXSA6ICcnO1xuICAgIH1cbiAgICBub2RlW3RleHRQcm9wXSA9IHZhbHVlO1xuICB9XG59KSgpO1xuXG5cbmRvbS5odG1sID0gZnVuY3Rpb24oIG5vZGUsIGh0bWwgKXtcbiAgaWYodHlwZW9mIGh0bWwgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHJldHVybiBub2RlLmlubmVySFRNTDtcbiAgfWVsc2V7XG4gICAgbm9kZS5pbm5lckhUTUwgPSBodG1sO1xuICB9XG59XG5cbmRvbS5yZXBsYWNlID0gZnVuY3Rpb24obm9kZSwgcmVwbGFjZWQpe1xuICBpZihyZXBsYWNlZC5wYXJlbnROb2RlKSByZXBsYWNlZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChub2RlLCByZXBsYWNlZCk7XG59XG5cbmRvbS5yZW1vdmUgPSBmdW5jdGlvbihub2RlKXtcbiAgaWYobm9kZS5wYXJlbnROb2RlKSBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5cbi8vIGNzcyBTZXR0bGUgJiBHZXR0ZXIgZnJvbSBhbmd1bGFyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIGl0IGlzbnQgY29tcHV0ZWQgc3R5bGUgXG5kb20uY3NzID0gZnVuY3Rpb24obm9kZSwgbmFtZSwgdmFsdWUpe1xuICBpZiggXy50eXBlT2YobmFtZSkgPT09IFwib2JqZWN0XCIgKXtcbiAgICBmb3IodmFyIGkgaW4gbmFtZSl7XG4gICAgICBpZiggbmFtZS5oYXNPd25Qcm9wZXJ0eShpKSApe1xuICAgICAgICBkb20uY3NzKCBub2RlLCBpLCBuYW1lW2ldICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblxuICAgIG5hbWUgPSBjYW1lbENhc2UobmFtZSk7XG4gICAgaWYobmFtZSkgbm9kZS5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuXG4gIH0gZWxzZSB7XG5cbiAgICB2YXIgdmFsO1xuICAgIGlmIChkb20ubXNpZSA8PSA4KSB7XG4gICAgICAvLyB0aGlzIGlzIHNvbWUgSUUgc3BlY2lmaWMgd2VpcmRuZXNzIHRoYXQgalF1ZXJ5IDEuNi40IGRvZXMgbm90IHN1cmUgd2h5XG4gICAgICB2YWwgPSBub2RlLmN1cnJlbnRTdHlsZSAmJiBub2RlLmN1cnJlbnRTdHlsZVtuYW1lXTtcbiAgICAgIGlmICh2YWwgPT09ICcnKSB2YWwgPSAnYXV0byc7XG4gICAgfVxuICAgIHZhbCA9IHZhbCB8fCBub2RlLnN0eWxlW25hbWVdO1xuICAgIGlmIChkb20ubXNpZSA8PSA4KSB7XG4gICAgICB2YWwgPSB2YWwgPT09ICcnID8gdW5kZWZpbmVkIDogdmFsO1xuICAgIH1cbiAgICByZXR1cm4gIHZhbDtcbiAgfVxufVxuXG5kb20uYWRkQ2xhc3MgPSBmdW5jdGlvbihub2RlLCBjbGFzc05hbWUpe1xuICB2YXIgY3VycmVudCA9IG5vZGUuY2xhc3NOYW1lIHx8IFwiXCI7XG4gIGlmICgoXCIgXCIgKyBjdXJyZW50ICsgXCIgXCIpLmluZGV4T2YoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIikgPT09IC0xKSB7XG4gICAgbm9kZS5jbGFzc05hbWUgPSBjdXJyZW50PyAoIGN1cnJlbnQgKyBcIiBcIiArIGNsYXNzTmFtZSApIDogY2xhc3NOYW1lO1xuICB9XG59XG5cbmRvbS5kZWxDbGFzcyA9IGZ1bmN0aW9uKG5vZGUsIGNsYXNzTmFtZSl7XG4gIHZhciBjdXJyZW50ID0gbm9kZS5jbGFzc05hbWUgfHwgXCJcIjtcbiAgbm9kZS5jbGFzc05hbWUgPSAoXCIgXCIgKyBjdXJyZW50ICsgXCIgXCIpLnJlcGxhY2UoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIiwgXCIgXCIpLnRyaW0oKTtcbn1cblxuZG9tLmhhc0NsYXNzID0gZnVuY3Rpb24obm9kZSwgY2xhc3NOYW1lKXtcbiAgdmFyIGN1cnJlbnQgPSBub2RlLmNsYXNzTmFtZSB8fCBcIlwiO1xuICByZXR1cm4gKFwiIFwiICsgY3VycmVudCArIFwiIFwiKS5pbmRleE9mKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIpICE9PSAtMTtcbn1cblxuXG5cbi8vIHNpbXBsZSBFdmVudCB3cmFwXG5cbi8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTA2ODE5Ni9pZTgtaWU3LW9uY2hhbmdlLWV2ZW50LWlzLWVtaXRlZC1vbmx5LWFmdGVyLXJlcGVhdGVkLXNlbGVjdGlvblxuZnVuY3Rpb24gZml4RXZlbnROYW1lKGVsZW0sIG5hbWUpe1xuICByZXR1cm4gKG5hbWUgPT09ICdjaGFuZ2UnICAmJiAgZG9tLm1zaWUgPCA5ICYmIFxuICAgICAgKGVsZW0gJiYgZWxlbS50YWdOYW1lICYmIGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpPT09J2lucHV0JyAmJiBcbiAgICAgICAgKGVsZW0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBlbGVtLnR5cGUgPT09ICdyYWRpbycpXG4gICAgICApXG4gICAgKT8gJ2NsaWNrJzogbmFtZTtcbn1cblxudmFyIHJNb3VzZUV2ZW50ID0gL14oPzpjbGlja3xkYmxjbGlja3xjb250ZXh0bWVudXxET01Nb3VzZVNjcm9sbHxtb3VzZSg/OlxcdyspKSQvXG52YXIgZG9jID0gZG9jdW1lbnQ7XG5kb2MgPSAoIWRvYy5jb21wYXRNb2RlIHx8IGRvYy5jb21wYXRNb2RlID09PSAnQ1NTMUNvbXBhdCcpID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGRvYy5ib2R5O1xuZnVuY3Rpb24gRXZlbnQoZXYpe1xuICBldiA9IGV2IHx8IHdpbmRvdy5ldmVudDtcbiAgaWYoZXYuX2ZpeGVkKSByZXR1cm4gZXY7XG4gIHRoaXMuZXZlbnQgPSBldjtcbiAgdGhpcy50YXJnZXQgPSBldi50YXJnZXQgfHwgZXYuc3JjRWxlbWVudDtcblxuICB2YXIgdHlwZSA9IHRoaXMudHlwZSA9IGV2LnR5cGU7XG4gIHZhciBidXR0b24gPSB0aGlzLmJ1dHRvbiA9IGV2LmJ1dHRvbjtcblxuICAvLyBpZiBpcyBtb3VzZSBldmVudCBwYXRjaCBwYWdlWFxuICBpZihyTW91c2VFdmVudC50ZXN0KHR5cGUpKXsgLy9maXggcGFnZVhcbiAgICB0aGlzLnBhZ2VYID0gKGV2LnBhZ2VYICE9IG51bGwpID8gZXYucGFnZVggOiBldi5jbGllbnRYICsgZG9jLnNjcm9sbExlZnQ7XG4gICAgdGhpcy5wYWdlWSA9IChldi5wYWdlWCAhPSBudWxsKSA/IGV2LnBhZ2VZIDogZXYuY2xpZW50WSArIGRvYy5zY3JvbGxUb3A7XG4gICAgaWYgKHR5cGUgPT09ICdtb3VzZW92ZXInIHx8IHR5cGUgPT09ICdtb3VzZW91dCcpey8vIGZpeCByZWxhdGVkVGFyZ2V0XG4gICAgICB2YXIgcmVsYXRlZCA9IGV2LnJlbGF0ZWRUYXJnZXQgfHwgZXZbKHR5cGUgPT09ICdtb3VzZW92ZXInID8gJ2Zyb20nIDogJ3RvJykgKyAnRWxlbWVudCddO1xuICAgICAgd2hpbGUgKHJlbGF0ZWQgJiYgcmVsYXRlZC5ub2RlVHlwZSA9PT0gMykgcmVsYXRlZCA9IHJlbGF0ZWQucGFyZW50Tm9kZTtcbiAgICAgIHRoaXMucmVsYXRlZFRhcmdldCA9IHJlbGF0ZWQ7XG4gICAgfVxuICB9XG4gIC8vIGlmIGlzIG1vdXNlc2Nyb2xsXG4gIGlmICh0eXBlID09PSAnRE9NTW91c2VTY3JvbGwnIHx8IHR5cGUgPT09ICdtb3VzZXdoZWVsJyl7XG4gICAgLy8gZmYgZXYuZGV0YWlsOiAzICAgIG90aGVyIGV2LndoZWVsRGVsdGE6IC0xMjBcbiAgICB0aGlzLndoZWVsRGVsdGEgPSAoZXYud2hlZWxEZWx0YSkgPyBldi53aGVlbERlbHRhIC8gMTIwIDogLShldi5kZXRhaWwgfHwgMCkgLyAzO1xuICB9XG4gIFxuICAvLyBmaXggd2hpY2hcbiAgdGhpcy53aGljaCA9IGV2LndoaWNoIHx8IGV2LmtleUNvZGU7XG4gIGlmKCAhdGhpcy53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCl7XG4gICAgLy8gaHR0cDovL2FwaS5qcXVlcnkuY29tL2V2ZW50LndoaWNoLyB1c2Ugd2hpY2hcbiAgICB0aGlzLndoaWNoID0gKCBidXR0b24gJiAxID8gMSA6ICggYnV0dG9uICYgMiA/IDMgOiAoIGJ1dHRvbiAmIDQgPyAyIDogMCApICkgKTtcbiAgfVxuICB0aGlzLl9maXhlZCA9IHRydWU7XG59XG5cbl8uZXh0ZW5kKEV2ZW50LnByb3RvdHlwZSwge1xuICBpbW1lZGlhdGVTdG9wOiBfLmlzRmFsc2UsXG4gIHN0b3A6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdCgpLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9LFxuICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKXtcbiAgICBpZiAodGhpcy5ldmVudC5wcmV2ZW50RGVmYXVsdCkgdGhpcy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGVsc2UgdGhpcy5ldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCl7XG4gICAgaWYgKHRoaXMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB0aGlzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGVsc2UgdGhpcy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCl7XG4gICAgaWYodGhpcy5ldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHRoaXMuZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gIH1cbn0pXG5cblxuZG9tLm5leHRGcmFtZSA9IChmdW5jdGlvbigpe1xuICAgIHZhciByZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZXx8IFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAxNilcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgIHZhciBjYW5jZWwgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHRpZCl7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aWQpXG4gICAgICAgICAgICAgICAgIH1cbiAgXG4gIHJldHVybiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgdmFyIGlkID0gcmVxdWVzdChjYWxsYmFjayk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7IGNhbmNlbChpZCk7IH1cbiAgfVxufSkoKTtcblxuLy8gM2tzIGZvciBhbmd1bGFyJ3MgcmFmICBzZXJ2aWNlXG52YXIgaztcbmRvbS5uZXh0UmVmbG93ID0gZnVuY3Rpb24oY2FsbGJhY2spe1xuICBkb20ubmV4dEZyYW1lKGZ1bmN0aW9uKCl7XG4gICAgayA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGg7XG4gICAgY2FsbGJhY2soKTtcbiAgfSlcbn1cblxuXG5cbiIsIi8vIHNvbWUgZml4dHVyZSB0ZXN0O1xuLy8gLS0tLS0tLS0tLS0tLS0tXG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuZXhwb3J0cy5zdmcgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCBcImh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjQmFzaWNTdHJ1Y3R1cmVcIiwgXCIxLjFcIiApO1xufSkoKTtcblxuXG5leHBvcnRzLmJyb3dzZXIgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQubm9kZVR5cGU7XG4vLyB3aGV0aGVyIGhhdmUgY29tcG9uZW50IGluIGluaXRpYWxpemluZ1xuZXhwb3J0cy5leHByQ2FjaGUgPSBfLmNhY2hlKDEwMDApO1xuZXhwb3J0cy5pc1J1bm5pbmcgPSBmYWxzZTtcbiIsInZhciBfID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgY29tYmluZSA9IHJlcXVpcmUoJy4vaGVscGVyL2NvbWJpbmUnKVxuXG5mdW5jdGlvbiBHcm91cChsaXN0KXtcbiAgdGhpcy5jaGlsZHJlbiA9IGxpc3QgfHwgW107XG59XG5cblxuXy5leHRlbmQoR3JvdXAucHJvdG90eXBlLCB7XG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKGZpcnN0KXtcbiAgICBjb21iaW5lLmRlc3Ryb3kodGhpcy5jaGlsZHJlbiwgZmlyc3QpO1xuICAgIGlmKHRoaXMub25kZXN0cm95KSB0aGlzLm9uZGVzdHJveSgpO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBudWxsO1xuICB9LFxuICBnZXQ6IGZ1bmN0aW9uKGkpe1xuICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2ldXG4gIH0sXG4gIHB1c2g6IGZ1bmN0aW9uKGl0ZW0pe1xuICAgIHRoaXMuY2hpbGRyZW4ucHVzaCggaXRlbSApO1xuICB9XG5cbn0pXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyb3VwO1xuXG5cbiIsInZhciBfID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgZG9tICA9IHJlcXVpcmUoXCIuLi9kb20uanNcIik7XG52YXIgYW5pbWF0ZSA9IHt9O1xudmFyIGVudiA9IHJlcXVpcmUoXCIuLi9lbnYuanNcIik7XG5cblxudmFyIFxuICB0cmFuc2l0aW9uRW5kID0gJ3RyYW5zaXRpb25lbmQnLCBcbiAgYW5pbWF0aW9uRW5kID0gJ2FuaW1hdGlvbmVuZCcsIFxuICB0cmFuc2l0aW9uUHJvcGVydHkgPSAndHJhbnNpdGlvbicsIFxuICBhbmltYXRpb25Qcm9wZXJ0eSA9ICdhbmltYXRpb24nO1xuXG5pZighKCdvbnRyYW5zaXRpb25lbmQnIGluIHdpbmRvdykpe1xuICBpZignb253ZWJraXR0cmFuc2l0aW9uZW5kJyBpbiB3aW5kb3cpIHtcbiAgICBcbiAgICAvLyBDaHJvbWUvU2FmICgrIE1vYmlsZSBTYWYpL0FuZHJvaWRcbiAgICB0cmFuc2l0aW9uRW5kICs9ICcgd2Via2l0VHJhbnNpdGlvbkVuZCc7XG4gICAgdHJhbnNpdGlvblByb3BlcnR5ID0gJ3dlYmtpdFRyYW5zaXRpb24nXG4gIH0gZWxzZSBpZignb25vdHJhbnNpdGlvbmVuZCcgaW4gZG9tLnROb2RlIHx8IG5hdmlnYXRvci5hcHBOYW1lID09PSAnT3BlcmEnKSB7XG5cbiAgICAvLyBPcGVyYVxuICAgIHRyYW5zaXRpb25FbmQgKz0gJyBvVHJhbnNpdGlvbkVuZCc7XG4gICAgdHJhbnNpdGlvblByb3BlcnR5ID0gJ29UcmFuc2l0aW9uJztcbiAgfVxufVxuaWYoISgnb25hbmltYXRpb25lbmQnIGluIHdpbmRvdykpe1xuICBpZiAoJ29ud2Via2l0YW5pbWF0aW9uZW5kJyBpbiB3aW5kb3cpe1xuICAgIC8vIENocm9tZS9TYWYgKCsgTW9iaWxlIFNhZikvQW5kcm9pZFxuICAgIGFuaW1hdGlvbkVuZCArPSAnIHdlYmtpdEFuaW1hdGlvbkVuZCc7XG4gICAgYW5pbWF0aW9uUHJvcGVydHkgPSAnd2Via2l0QW5pbWF0aW9uJztcblxuICB9ZWxzZSBpZiAoJ29ub2FuaW1hdGlvbmVuZCcgaW4gZG9tLnROb2RlKXtcbiAgICAvLyBPcGVyYVxuICAgIGFuaW1hdGlvbkVuZCArPSAnIG9BbmltYXRpb25FbmQnO1xuICAgIGFuaW1hdGlvblByb3BlcnR5ID0gJ29BbmltYXRpb24nO1xuICB9XG59XG5cbi8qKlxuICogaW5qZWN0IG5vZGUgd2l0aCBhbmltYXRpb25cbiAqIEBwYXJhbSAge1t0eXBlXX0gbm9kZSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcmVmZXIgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gZGlyZWN0aW9uIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuYW5pbWF0ZS5pbmplY3QgPSBmdW5jdGlvbiggbm9kZSwgcmVmZXIgLGRpcmVjdGlvbiwgY2FsbGJhY2sgKXtcbiAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBfLm5vb3A7XG4gIGlmKCBBcnJheS5pc0FycmF5KG5vZGUpICl7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9tLmZyYWdtZW50KCk7XG4gICAgdmFyIGNvdW50PTA7XG5cbiAgICBmb3IodmFyIGkgPSAwLGxlbiA9IG5vZGUubGVuZ3RoO2kgPCBsZW47IGkrKyApe1xuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobm9kZVtpXSk7IFxuICAgIH1cbiAgICBkb20uaW5qZWN0KGZyYWdtZW50LCByZWZlciwgZGlyZWN0aW9uKTtcblxuICAgIC8vIGlmIGFsbCBub2RlcyBpcyBkb25lLCB3ZSBjYWxsIHRoZSBjYWxsYmFja1xuICAgIHZhciBlbnRlckNhbGxiYWNrID0gZnVuY3Rpb24gKCl7XG4gICAgICBjb3VudCsrO1xuICAgICAgaWYoIGNvdW50ID09PSBsZW4gKSBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZihsZW4gPT09IGNvdW50KSBjYWxsYmFjaygpO1xuICAgIGZvciggaSA9IDA7IGkgPCBsZW47IGkrKyApe1xuICAgICAgaWYobm9kZVtpXS5vbmVudGVyKXtcbiAgICAgICAgbm9kZVtpXS5vbmVudGVyKGVudGVyQ2FsbGJhY2spO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGVudGVyQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1lbHNle1xuICAgIGRvbS5pbmplY3QoIG5vZGUsIHJlZmVyLCBkaXJlY3Rpb24gKTtcbiAgICBpZihub2RlLm9uZW50ZXIpe1xuICAgICAgbm9kZS5vbmVudGVyKGNhbGxiYWNrKVxuICAgIH1lbHNle1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiByZW1vdmUgbm9kZSB3aXRoIGFuaW1hdGlvblxuICogQHBhcmFtICB7W3R5cGVdfSAgIG5vZGUgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5hbmltYXRlLnJlbW92ZSA9IGZ1bmN0aW9uKG5vZGUsIGNhbGxiYWNrKXtcbiAgaWYobm9kZS5vbmxlYXZlKXtcbiAgICBub2RlLm9ubGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgIHJlbW92ZURvbmUobm9kZSwgY2FsbGJhY2spXG4gICAgfSlcbiAgfWVsc2V7XG4gICAgcmVtb3ZlRG9uZShub2RlLCBjYWxsYmFjaylcbiAgfVxufVxuXG52YXIgcmVtb3ZlRG9uZSA9IGZ1bmN0aW9uIChub2RlLCBjYWxsYmFjayl7XG4gICAgZG9tLnJlbW92ZShub2RlKTtcbiAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xufVxuXG5cblxuYW5pbWF0ZS5zdGFydENsYXNzQW5pbWF0ZSA9IGZ1bmN0aW9uICggbm9kZSwgY2xhc3NOYW1lLCAgY2FsbGJhY2ssIG1vZGUgKXtcbiAgdmFyIGFjdGl2ZUNsYXNzTmFtZSwgdGltZW91dCwgdGlkLCBvbmNlQW5pbTtcbiAgaWYoICghYW5pbWF0aW9uRW5kICYmICF0cmFuc2l0aW9uRW5kKSB8fCBlbnYuaXNSdW5uaW5nICl7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gIH1cblxuICBvbmNlQW5pbSA9IF8ub25jZShmdW5jdGlvbiBvbkFuaW1hdGVFbmQoKXtcbiAgICBpZih0aWQpIGNsZWFyVGltZW91dCh0aWQpO1xuXG4gICAgaWYobW9kZSA9PT0gMikge1xuICAgICAgZG9tLmRlbENsYXNzKG5vZGUsIGFjdGl2ZUNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGlmKG1vZGUgIT09IDMpeyAvLyBtb2RlIGhvbGQgdGhlIGNsYXNzXG4gICAgICBkb20uZGVsQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgZG9tLm9mZihub2RlLCBhbmltYXRpb25FbmQsIG9uY2VBbmltKVxuICAgIGRvbS5vZmYobm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0pXG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0pO1xuICBpZihtb2RlID09PSAyKXsgLy8gYXV0byByZW1vdmVkXG4gICAgZG9tLmFkZENsYXNzKCBub2RlLCBjbGFzc05hbWUgKTtcblxuICAgIGFjdGl2ZUNsYXNzTmFtZSA9IGNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihuYW1lKXtcbiAgICAgICByZXR1cm4gbmFtZSArICctYWN0aXZlJztcbiAgICB9KS5qb2luKFwiIFwiKTtcblxuICAgIGRvbS5uZXh0UmVmbG93KGZ1bmN0aW9uKCl7XG4gICAgICBkb20uYWRkQ2xhc3MoIG5vZGUsIGFjdGl2ZUNsYXNzTmFtZSApO1xuICAgICAgdGltZW91dCA9IGdldE1heFRpbWVvdXQoIG5vZGUgKTtcbiAgICAgIHRpZCA9IHNldFRpbWVvdXQoIG9uY2VBbmltLCB0aW1lb3V0ICk7XG4gICAgfSk7XG5cbiAgfWVsc2V7XG5cbiAgICBkb20ubmV4dFJlZmxvdyhmdW5jdGlvbigpe1xuICAgICAgZG9tLmFkZENsYXNzKCBub2RlLCBjbGFzc05hbWUgKTtcbiAgICAgIHRpbWVvdXQgPSBnZXRNYXhUaW1lb3V0KCBub2RlICk7XG4gICAgICB0aWQgPSBzZXRUaW1lb3V0KCBvbmNlQW5pbSwgdGltZW91dCApO1xuICAgIH0pO1xuXG4gIH1cblxuXG4gIGRvbS5vbiggbm9kZSwgYW5pbWF0aW9uRW5kLCBvbmNlQW5pbSApXG4gIGRvbS5vbiggbm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0gKVxuICByZXR1cm4gb25jZUFuaW07XG59XG5cblxuYW5pbWF0ZS5zdGFydFN0eWxlQW5pbWF0ZSA9IGZ1bmN0aW9uKG5vZGUsIHN0eWxlcywgY2FsbGJhY2spe1xuICB2YXIgdGltZW91dCwgb25jZUFuaW0sIHRpZDtcblxuICBkb20ubmV4dFJlZmxvdyhmdW5jdGlvbigpe1xuICAgIGRvbS5jc3MoIG5vZGUsIHN0eWxlcyApO1xuICAgIHRpbWVvdXQgPSBnZXRNYXhUaW1lb3V0KCBub2RlICk7XG4gICAgdGlkID0gc2V0VGltZW91dCggb25jZUFuaW0sIHRpbWVvdXQgKTtcbiAgfSk7XG5cblxuICBvbmNlQW5pbSA9IF8ub25jZShmdW5jdGlvbiBvbkFuaW1hdGVFbmQoKXtcbiAgICBpZih0aWQpIGNsZWFyVGltZW91dCh0aWQpO1xuXG4gICAgZG9tLm9mZihub2RlLCBhbmltYXRpb25FbmQsIG9uY2VBbmltKVxuICAgIGRvbS5vZmYobm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0pXG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0pO1xuXG4gIGRvbS5vbiggbm9kZSwgYW5pbWF0aW9uRW5kLCBvbmNlQW5pbSApXG4gIGRvbS5vbiggbm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0gKVxuXG4gIHJldHVybiBvbmNlQW5pbTtcbn1cblxuXG4vKipcbiAqIGdldCBtYXh0aW1lb3V0XG4gKiBAcGFyYW0gIHtOb2RlfSBub2RlIFxuICogQHJldHVybiB7W3R5cGVdfSAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0TWF4VGltZW91dChub2RlKXtcbiAgdmFyIHRpbWVvdXQgPSAwLFxuICAgIHREdXJhdGlvbiA9IDAsXG4gICAgdERlbGF5ID0gMCxcbiAgICBhRHVyYXRpb24gPSAwLFxuICAgIGFEZWxheSA9IDAsXG4gICAgcmF0aW8gPSA1IC8gMyxcbiAgICBzdHlsZXMgO1xuXG4gIGlmKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKXtcblxuICAgIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLFxuICAgIHREdXJhdGlvbiA9IGdldE1heFRpbWUoIHN0eWxlc1t0cmFuc2l0aW9uUHJvcGVydHkgKyAnRHVyYXRpb24nXSkgfHwgdER1cmF0aW9uO1xuICAgIHREZWxheSA9IGdldE1heFRpbWUoIHN0eWxlc1t0cmFuc2l0aW9uUHJvcGVydHkgKyAnRGVsYXknXSkgfHwgdERlbGF5O1xuICAgIGFEdXJhdGlvbiA9IGdldE1heFRpbWUoIHN0eWxlc1thbmltYXRpb25Qcm9wZXJ0eSArICdEdXJhdGlvbiddKSB8fCBhRHVyYXRpb247XG4gICAgYURlbGF5ID0gZ2V0TWF4VGltZSggc3R5bGVzW2FuaW1hdGlvblByb3BlcnR5ICsgJ0RlbGF5J10pIHx8IGFEZWxheTtcbiAgICB0aW1lb3V0ID0gTWF0aC5tYXgoIHREdXJhdGlvbit0RGVsYXksIGFEdXJhdGlvbiArIGFEZWxheSApO1xuXG4gIH1cbiAgcmV0dXJuIHRpbWVvdXQgKiAxMDAwICogcmF0aW87XG59XG5cbmZ1bmN0aW9uIGdldE1heFRpbWUoc3RyKXtcblxuICB2YXIgbWF4VGltZW91dCA9IDAsIHRpbWU7XG5cbiAgaWYoIXN0cikgcmV0dXJuIDA7XG5cbiAgc3RyLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cil7XG5cbiAgICB0aW1lID0gcGFyc2VGbG9hdChzdHIpO1xuICAgIGlmKCB0aW1lID4gbWF4VGltZW91dCApIG1heFRpbWVvdXQgPSB0aW1lO1xuXG4gIH0pO1xuXG4gIHJldHVybiBtYXhUaW1lb3V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuaW1hdGU7IiwiLy8gc29tZSBuZXN0ZWQgIG9wZXJhdGlvbiBpbiBhc3QgXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2RvbS5qc1wiKTtcblxudmFyIGNvbWJpbmUgPSBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvLyBnZXQgdGhlIGluaXRpYWwgZG9tIGluIG9iamVjdFxuICBub2RlOiBmdW5jdGlvbihpdGVtKXtcbiAgICB2YXIgY2hpbGRyZW4sbm9kZTtcbiAgICBpZihpdGVtLmVsZW1lbnQpIHJldHVybiBpdGVtLmVsZW1lbnQ7XG4gICAgaWYodHlwZW9mIGl0ZW0ubm9kZSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gaXRlbS5ub2RlKCk7XG4gICAgaWYodHlwZW9mIGl0ZW0ubm9kZVR5cGUgPT09IFwibnVtYmVyXCIpIHJldHVybiBpdGVtO1xuICAgIGlmKGl0ZW0uZ3JvdXApIHJldHVybiBjb21iaW5lLm5vZGUoaXRlbS5ncm91cClcbiAgICBpZihjaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW4pe1xuICAgICAgaWYoY2hpbGRyZW4ubGVuZ3RoID09PSAxKXtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb21iaW5lLm5vZGUoY2hpbGRyZW5bMF0pO1xuICAgICAgfVxuICAgICAgdmFyIG5vZGVzID0gW107XG4gICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuICAgICAgICBub2RlID0gY29tYmluZS5ub2RlKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShub2RlKSl7XG4gICAgICAgICAgbm9kZXMucHVzaC5hcHBseShub2Rlcywgbm9kZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgbm9kZXMucHVzaChub2RlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZXM7XG4gICAgfVxuICB9LFxuXG4gIC8vIGdldCB0aGUgbGFzdCBkb20gaW4gb2JqZWN0KGZvciBpbnNlcnRpb24gb3BlcmF0aW9uKVxuICBsYXN0OiBmdW5jdGlvbihpdGVtKXtcbiAgICB2YXIgY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuO1xuXG4gICAgaWYodHlwZW9mIGl0ZW0ubGFzdCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gaXRlbS5sYXN0KCk7XG4gICAgaWYodHlwZW9mIGl0ZW0ubm9kZVR5cGUgPT09IFwibnVtYmVyXCIpIHJldHVybiBpdGVtO1xuXG4gICAgaWYoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gY29tYmluZS5sYXN0KGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdKTtcbiAgICBpZihpdGVtLmdyb3VwKSByZXR1cm4gY29tYmluZS5sYXN0KGl0ZW0uZ3JvdXApO1xuXG4gIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24oaXRlbSwgZmlyc3Qpe1xuICAgIGlmKCFpdGVtKSByZXR1cm47XG4gICAgaWYoQXJyYXkuaXNBcnJheShpdGVtKSl7XG4gICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBpdGVtLmxlbmd0aDsgaSA8IGxlbjsgaSsrICl7XG4gICAgICAgIGNvbWJpbmUuZGVzdHJveShpdGVtW2ldLCBmaXJzdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW47XG4gICAgaWYodHlwZW9mIGl0ZW0uZGVzdHJveSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gaXRlbS5kZXN0cm95KGZpcnN0KTtcbiAgICBpZih0eXBlb2YgaXRlbS5ub2RlVHlwZSA9PT0gXCJudW1iZXJcIiAmJiBmaXJzdCkgIGRvbS5yZW1vdmUoaXRlbSk7XG4gICAgaWYoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKXtcbiAgICAgIGNvbWJpbmUuZGVzdHJveShjaGlsZHJlbiwgdHJ1ZSk7XG4gICAgICBpdGVtLmNoaWxkcmVuID0gbnVsbDtcbiAgICB9XG4gIH1cblxufSIsIi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTM1NDA2NC9ob3ctdG8tY29udmVydC1jaGFyYWN0ZXJzLXRvLWh0bWwtZW50aXRpZXMtdXNpbmctcGxhaW4tamF2YXNjcmlwdFxudmFyIGVudGl0aWVzID0ge1xuICAncXVvdCc6MzQsIFxuICAnYW1wJzozOCwgXG4gICdhcG9zJzozOSwgXG4gICdsdCc6NjAsIFxuICAnZ3QnOjYyLCBcbiAgJ25ic3AnOjE2MCwgXG4gICdpZXhjbCc6MTYxLCBcbiAgJ2NlbnQnOjE2MiwgXG4gICdwb3VuZCc6MTYzLCBcbiAgJ2N1cnJlbic6MTY0LCBcbiAgJ3llbic6MTY1LCBcbiAgJ2JydmJhcic6MTY2LCBcbiAgJ3NlY3QnOjE2NywgXG4gICd1bWwnOjE2OCwgXG4gICdjb3B5JzoxNjksIFxuICAnb3JkZic6MTcwLCBcbiAgJ2xhcXVvJzoxNzEsIFxuICAnbm90JzoxNzIsIFxuICAnc2h5JzoxNzMsIFxuICAncmVnJzoxNzQsIFxuICAnbWFjcic6MTc1LCBcbiAgJ2RlZyc6MTc2LCBcbiAgJ3BsdXNtbic6MTc3LCBcbiAgJ3N1cDInOjE3OCwgXG4gICdzdXAzJzoxNzksIFxuICAnYWN1dGUnOjE4MCwgXG4gICdtaWNybyc6MTgxLCBcbiAgJ3BhcmEnOjE4MiwgXG4gICdtaWRkb3QnOjE4MywgXG4gICdjZWRpbCc6MTg0LCBcbiAgJ3N1cDEnOjE4NSwgXG4gICdvcmRtJzoxODYsIFxuICAncmFxdW8nOjE4NywgXG4gICdmcmFjMTQnOjE4OCwgXG4gICdmcmFjMTInOjE4OSwgXG4gICdmcmFjMzQnOjE5MCwgXG4gICdpcXVlc3QnOjE5MSwgXG4gICdBZ3JhdmUnOjE5MiwgXG4gICdBYWN1dGUnOjE5MywgXG4gICdBY2lyYyc6MTk0LCBcbiAgJ0F0aWxkZSc6MTk1LCBcbiAgJ0F1bWwnOjE5NiwgXG4gICdBcmluZyc6MTk3LCBcbiAgJ0FFbGlnJzoxOTgsIFxuICAnQ2NlZGlsJzoxOTksIFxuICAnRWdyYXZlJzoyMDAsIFxuICAnRWFjdXRlJzoyMDEsIFxuICAnRWNpcmMnOjIwMiwgXG4gICdFdW1sJzoyMDMsIFxuICAnSWdyYXZlJzoyMDQsIFxuICAnSWFjdXRlJzoyMDUsIFxuICAnSWNpcmMnOjIwNiwgXG4gICdJdW1sJzoyMDcsIFxuICAnRVRIJzoyMDgsIFxuICAnTnRpbGRlJzoyMDksIFxuICAnT2dyYXZlJzoyMTAsIFxuICAnT2FjdXRlJzoyMTEsIFxuICAnT2NpcmMnOjIxMiwgXG4gICdPdGlsZGUnOjIxMywgXG4gICdPdW1sJzoyMTQsIFxuICAndGltZXMnOjIxNSwgXG4gICdPc2xhc2gnOjIxNiwgXG4gICdVZ3JhdmUnOjIxNywgXG4gICdVYWN1dGUnOjIxOCwgXG4gICdVY2lyYyc6MjE5LCBcbiAgJ1V1bWwnOjIyMCwgXG4gICdZYWN1dGUnOjIyMSwgXG4gICdUSE9STic6MjIyLCBcbiAgJ3N6bGlnJzoyMjMsIFxuICAnYWdyYXZlJzoyMjQsIFxuICAnYWFjdXRlJzoyMjUsIFxuICAnYWNpcmMnOjIyNiwgXG4gICdhdGlsZGUnOjIyNywgXG4gICdhdW1sJzoyMjgsIFxuICAnYXJpbmcnOjIyOSwgXG4gICdhZWxpZyc6MjMwLCBcbiAgJ2NjZWRpbCc6MjMxLCBcbiAgJ2VncmF2ZSc6MjMyLCBcbiAgJ2VhY3V0ZSc6MjMzLCBcbiAgJ2VjaXJjJzoyMzQsIFxuICAnZXVtbCc6MjM1LCBcbiAgJ2lncmF2ZSc6MjM2LCBcbiAgJ2lhY3V0ZSc6MjM3LCBcbiAgJ2ljaXJjJzoyMzgsIFxuICAnaXVtbCc6MjM5LCBcbiAgJ2V0aCc6MjQwLCBcbiAgJ250aWxkZSc6MjQxLCBcbiAgJ29ncmF2ZSc6MjQyLCBcbiAgJ29hY3V0ZSc6MjQzLCBcbiAgJ29jaXJjJzoyNDQsIFxuICAnb3RpbGRlJzoyNDUsIFxuICAnb3VtbCc6MjQ2LCBcbiAgJ2RpdmlkZSc6MjQ3LCBcbiAgJ29zbGFzaCc6MjQ4LCBcbiAgJ3VncmF2ZSc6MjQ5LCBcbiAgJ3VhY3V0ZSc6MjUwLCBcbiAgJ3VjaXJjJzoyNTEsIFxuICAndXVtbCc6MjUyLCBcbiAgJ3lhY3V0ZSc6MjUzLCBcbiAgJ3Rob3JuJzoyNTQsIFxuICAneXVtbCc6MjU1LCBcbiAgJ2Zub2YnOjQwMiwgXG4gICdBbHBoYSc6OTEzLCBcbiAgJ0JldGEnOjkxNCwgXG4gICdHYW1tYSc6OTE1LCBcbiAgJ0RlbHRhJzo5MTYsIFxuICAnRXBzaWxvbic6OTE3LCBcbiAgJ1pldGEnOjkxOCwgXG4gICdFdGEnOjkxOSwgXG4gICdUaGV0YSc6OTIwLCBcbiAgJ0lvdGEnOjkyMSwgXG4gICdLYXBwYSc6OTIyLCBcbiAgJ0xhbWJkYSc6OTIzLCBcbiAgJ011Jzo5MjQsIFxuICAnTnUnOjkyNSwgXG4gICdYaSc6OTI2LCBcbiAgJ09taWNyb24nOjkyNywgXG4gICdQaSc6OTI4LCBcbiAgJ1Jobyc6OTI5LCBcbiAgJ1NpZ21hJzo5MzEsIFxuICAnVGF1Jzo5MzIsIFxuICAnVXBzaWxvbic6OTMzLCBcbiAgJ1BoaSc6OTM0LCBcbiAgJ0NoaSc6OTM1LCBcbiAgJ1BzaSc6OTM2LCBcbiAgJ09tZWdhJzo5MzcsIFxuICAnYWxwaGEnOjk0NSwgXG4gICdiZXRhJzo5NDYsIFxuICAnZ2FtbWEnOjk0NywgXG4gICdkZWx0YSc6OTQ4LCBcbiAgJ2Vwc2lsb24nOjk0OSwgXG4gICd6ZXRhJzo5NTAsIFxuICAnZXRhJzo5NTEsIFxuICAndGhldGEnOjk1MiwgXG4gICdpb3RhJzo5NTMsIFxuICAna2FwcGEnOjk1NCwgXG4gICdsYW1iZGEnOjk1NSwgXG4gICdtdSc6OTU2LCBcbiAgJ251Jzo5NTcsIFxuICAneGknOjk1OCwgXG4gICdvbWljcm9uJzo5NTksIFxuICAncGknOjk2MCwgXG4gICdyaG8nOjk2MSwgXG4gICdzaWdtYWYnOjk2MiwgXG4gICdzaWdtYSc6OTYzLCBcbiAgJ3RhdSc6OTY0LCBcbiAgJ3Vwc2lsb24nOjk2NSwgXG4gICdwaGknOjk2NiwgXG4gICdjaGknOjk2NywgXG4gICdwc2knOjk2OCwgXG4gICdvbWVnYSc6OTY5LCBcbiAgJ3RoZXRhc3ltJzo5NzcsIFxuICAndXBzaWgnOjk3OCwgXG4gICdwaXYnOjk4MiwgXG4gICdidWxsJzo4MjI2LCBcbiAgJ2hlbGxpcCc6ODIzMCwgXG4gICdwcmltZSc6ODI0MiwgXG4gICdQcmltZSc6ODI0MywgXG4gICdvbGluZSc6ODI1NCwgXG4gICdmcmFzbCc6ODI2MCwgXG4gICd3ZWllcnAnOjg0NzIsIFxuICAnaW1hZ2UnOjg0NjUsIFxuICAncmVhbCc6ODQ3NiwgXG4gICd0cmFkZSc6ODQ4MiwgXG4gICdhbGVmc3ltJzo4NTAxLCBcbiAgJ2xhcnInOjg1OTIsIFxuICAndWFycic6ODU5MywgXG4gICdyYXJyJzo4NTk0LCBcbiAgJ2RhcnInOjg1OTUsIFxuICAnaGFycic6ODU5NiwgXG4gICdjcmFycic6ODYyOSwgXG4gICdsQXJyJzo4NjU2LCBcbiAgJ3VBcnInOjg2NTcsIFxuICAnckFycic6ODY1OCwgXG4gICdkQXJyJzo4NjU5LCBcbiAgJ2hBcnInOjg2NjAsIFxuICAnZm9yYWxsJzo4NzA0LCBcbiAgJ3BhcnQnOjg3MDYsIFxuICAnZXhpc3QnOjg3MDcsIFxuICAnZW1wdHknOjg3MDksIFxuICAnbmFibGEnOjg3MTEsIFxuICAnaXNpbic6ODcxMiwgXG4gICdub3Rpbic6ODcxMywgXG4gICduaSc6ODcxNSwgXG4gICdwcm9kJzo4NzE5LCBcbiAgJ3N1bSc6ODcyMSwgXG4gICdtaW51cyc6ODcyMiwgXG4gICdsb3dhc3QnOjg3MjcsIFxuICAncmFkaWMnOjg3MzAsIFxuICAncHJvcCc6ODczMywgXG4gICdpbmZpbic6ODczNCwgXG4gICdhbmcnOjg3MzYsIFxuICAnYW5kJzo4NzQzLCBcbiAgJ29yJzo4NzQ0LCBcbiAgJ2NhcCc6ODc0NSwgXG4gICdjdXAnOjg3NDYsIFxuICAnaW50Jzo4NzQ3LCBcbiAgJ3RoZXJlNCc6ODc1NiwgXG4gICdzaW0nOjg3NjQsIFxuICAnY29uZyc6ODc3MywgXG4gICdhc3ltcCc6ODc3NiwgXG4gICduZSc6ODgwMCwgXG4gICdlcXVpdic6ODgwMSwgXG4gICdsZSc6ODgwNCwgXG4gICdnZSc6ODgwNSwgXG4gICdzdWInOjg4MzQsIFxuICAnc3VwJzo4ODM1LCBcbiAgJ25zdWInOjg4MzYsIFxuICAnc3ViZSc6ODgzOCwgXG4gICdzdXBlJzo4ODM5LCBcbiAgJ29wbHVzJzo4ODUzLCBcbiAgJ290aW1lcyc6ODg1NSwgXG4gICdwZXJwJzo4ODY5LCBcbiAgJ3Nkb3QnOjg5MDEsIFxuICAnbGNlaWwnOjg5NjgsIFxuICAncmNlaWwnOjg5NjksIFxuICAnbGZsb29yJzo4OTcwLCBcbiAgJ3JmbG9vcic6ODk3MSwgXG4gICdsYW5nJzo5MDAxLCBcbiAgJ3JhbmcnOjkwMDIsIFxuICAnbG96Jzo5Njc0LCBcbiAgJ3NwYWRlcyc6OTgyNCwgXG4gICdjbHVicyc6OTgyNywgXG4gICdoZWFydHMnOjk4MjksIFxuICAnZGlhbXMnOjk4MzAsIFxuICAnT0VsaWcnOjMzOCwgXG4gICdvZWxpZyc6MzM5LCBcbiAgJ1NjYXJvbic6MzUyLCBcbiAgJ3NjYXJvbic6MzUzLCBcbiAgJ1l1bWwnOjM3NiwgXG4gICdjaXJjJzo3MTAsIFxuICAndGlsZGUnOjczMiwgXG4gICdlbnNwJzo4MTk0LCBcbiAgJ2Vtc3AnOjgxOTUsIFxuICAndGhpbnNwJzo4MjAxLCBcbiAgJ3p3bmonOjgyMDQsIFxuICAnendqJzo4MjA1LCBcbiAgJ2xybSc6ODIwNiwgXG4gICdybG0nOjgyMDcsIFxuICAnbmRhc2gnOjgyMTEsIFxuICAnbWRhc2gnOjgyMTIsIFxuICAnbHNxdW8nOjgyMTYsIFxuICAncnNxdW8nOjgyMTcsIFxuICAnc2JxdW8nOjgyMTgsIFxuICAnbGRxdW8nOjgyMjAsIFxuICAncmRxdW8nOjgyMjEsIFxuICAnYmRxdW8nOjgyMjIsIFxuICAnZGFnZ2VyJzo4MjI0LCBcbiAgJ0RhZ2dlcic6ODIyNSwgXG4gICdwZXJtaWwnOjgyNDAsIFxuICAnbHNhcXVvJzo4MjQ5LCBcbiAgJ3JzYXF1byc6ODI1MCwgXG4gICdldXJvJzo4MzY0XG59XG5cblxuXG5tb2R1bGUuZXhwb3J0cyAgPSBlbnRpdGllczsiLCIvLyBzaW1wbGVzdCBldmVudCBlbWl0dGVyIDYwIGxpbmVzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG52YXIgc2xpY2UgPSBbXS5zbGljZSwgXyA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpO1xudmFyIEFQSSA9IHtcbiAgICAkb246IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZih0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIpe1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBldmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG9uKGksIGV2ZW50W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyBAcGF0Y2g6IGZvciBsaXN0XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgaGFuZGxlcyA9IGNvbnRleHQuX2hhbmRsZXMgfHwgKGNvbnRleHQuX2hhbmRsZXMgPSB7fSksXG4gICAgICAgICAgICAgICAgY2FsbHMgPSBoYW5kbGVzW2V2ZW50XSB8fCAoaGFuZGxlc1tldmVudF0gPSBbXSk7XG4gICAgICAgICAgICBjYWxscy5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgICRvZmY6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIGlmKCFjb250ZXh0Ll9oYW5kbGVzKSByZXR1cm47XG4gICAgICAgIGlmKCFldmVudCkgdGhpcy5faGFuZGxlcyA9IHt9O1xuICAgICAgICB2YXIgaGFuZGxlcyA9IGNvbnRleHQuX2hhbmRsZXMsXG4gICAgICAgICAgICBjYWxscztcblxuICAgICAgICBpZiAoY2FsbHMgPSBoYW5kbGVzW2V2ZW50XSkge1xuICAgICAgICAgICAgaWYgKCFmbikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXNbZXZlbnRdID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZm4gPT09IGNhbGxzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH0sXG4gICAgLy8gYnViYmxlIGV2ZW50XG4gICAgJGVtaXQ6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgLy8gQHBhdGNoOiBmb3IgbGlzdFxuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIHZhciBoYW5kbGVzID0gY29udGV4dC5faGFuZGxlcywgY2FsbHMsIGFyZ3MsIHR5cGU7XG4gICAgICAgIGlmKCFldmVudCkgcmV0dXJuO1xuICAgICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgdmFyIHR5cGUgPSBldmVudDtcblxuICAgICAgICBpZighaGFuZGxlcykgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgIGlmKGNhbGxzID0gaGFuZGxlc1t0eXBlLnNsaWNlKDEpXSl7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbGVuID0gY2FsbHMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsc1tqXS5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghKGNhbGxzID0gaGFuZGxlc1t0eXBlXSkpIHJldHVybiBjb250ZXh0O1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNhbGxzW2ldLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYoY2FsbHMubGVuZ3RoKSBjb250ZXh0LiR1cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfSxcbiAgICAvLyBjYXB0dXJlICBldmVudFxuICAgICRicm9hZGNhc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgIFxuICAgIH1cbn1cbi8vIGNvbnRhaW5lciBjbGFzc1xuZnVuY3Rpb24gRXZlbnQoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoKSB0aGlzLiRvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXy5leHRlbmQoRXZlbnQucHJvdG90eXBlLCBBUEkpXG5cbkV2ZW50Lm1peFRvID0gZnVuY3Rpb24ob2JqKXtcbiAgb2JqID0gdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID8gb2JqLnByb3RvdHlwZSA6IG9iajtcbiAgXy5leHRlbmQob2JqLCBBUEkpXG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50OyIsIi8vIChjKSAyMDEwLTIwMTQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbi8vIEJhY2tib25lIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuLy8gRm9yIGFsbCBkZXRhaWxzIGFuZCBkb2N1bWVudGF0aW9uOlxuLy8gaHR0cDovL2JhY2tib25lanMub3JnXG5cbi8vIGtsYXNzOiBhIGNsYXNzaWNhbCBKUyBPT1AgZmHDp2FkZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2RlZC9rbGFzc1xuLy8gTGljZW5zZSBNSVQgKGMpIER1c3RpbiBEaWF6IDIwMTRcbiAgXG4vLyBpbnNwaXJlZCBieSBiYWNrYm9uZSdzIGV4dGVuZCBhbmQga2xhc3NcbnZhciBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIiksXG4gIGZuVGVzdCA9IC94eS8udGVzdChmdW5jdGlvbigpe1wieHlcIjt9KSA/IC9cXGJzdXByXFxiLzovLiovLFxuICBpc0ZuID0gZnVuY3Rpb24obyl7cmV0dXJuIHR5cGVvZiBvID09PSBcImZ1bmN0aW9uXCJ9O1xuXG5cbmZ1bmN0aW9uIHdyYXAoaywgZm4sIHN1cHJvKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRtcCA9IHRoaXMuc3VwcjtcbiAgICB0aGlzLnN1cHIgPSBzdXByb1trXTtcbiAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnN1cHIgPSB0bXA7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzKCB3aGF0LCBvLCBzdXBybyApIHtcbiAgZm9yICggdmFyIGsgaW4gbyApIHtcbiAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrKSkge1xuXG4gICAgICB3aGF0W2tdID0gaXNGbiggb1trXSApICYmIGlzRm4oIHN1cHJvW2tdICkgJiYgXG4gICAgICAgIGZuVGVzdC50ZXN0KCBvW2tdICkgPyB3cmFwKGssIG9ba10sIHN1cHJvKSA6IG9ba107XG4gICAgfVxuICB9XG59XG5cbi8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBbXCJldmVudHNcIiwgXCJkYXRhXCIsIFwiY29tcHV0ZWRcIl0gLCB3ZSBzaG91bGQgbWVyZ2UgdGhlbVxudmFyIG1lcmdlZCA9IFtcImV2ZW50c1wiLCBcImRhdGFcIiwgXCJjb21wdXRlZFwiXSwgbWxlbiA9IG1lcmdlZC5sZW5ndGg7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZChvKXtcbiAgbyA9IG8gfHwge307XG4gIHZhciBzdXByID0gdGhpcywgcHJvdG8sXG4gICAgc3Vwcm8gPSBzdXByICYmIHN1cHIucHJvdG90eXBlIHx8IHt9O1xuXG4gIGlmKHR5cGVvZiBvID09PSAnZnVuY3Rpb24nKXtcbiAgICBwcm90byA9IG8ucHJvdG90eXBlO1xuICAgIG8uaW1wbGVtZW50ID0gaW1wbGVtZW50O1xuICAgIG8uZXh0ZW5kID0gZXh0ZW5kO1xuICAgIHJldHVybiBvO1xuICB9IFxuICBcbiAgZnVuY3Rpb24gZm4oKSB7XG4gICAgc3Vwci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHJvdG8gPSBfLmNyZWF0ZVByb3RvKGZuLCBzdXBybyk7XG5cbiAgZnVuY3Rpb24gaW1wbGVtZW50KG8pe1xuICAgIC8vIHdlIG5lZWQgbWVyZ2UgdGhlIG1lcmdlZCBwcm9wZXJ0eVxuICAgIHZhciBsZW4gPSBtbGVuO1xuICAgIGZvcig7bGVuLS07KXtcbiAgICAgIHZhciBwcm9wID0gbWVyZ2VkW2xlbl07XG4gICAgICBpZihvLmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3RvLmhhc093blByb3BlcnR5KHByb3ApKXtcbiAgICAgICAgXy5leHRlbmQocHJvdG9bcHJvcF0sIG9bcHJvcF0sIHRydWUpIFxuICAgICAgICBkZWxldGUgb1twcm9wXTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHByb2Nlc3MocHJvdG8sIG8sIHN1cHJvKTsgXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG5cbiAgZm4uaW1wbGVtZW50ID0gaW1wbGVtZW50XG4gIGZuLmltcGxlbWVudChvKVxuICBpZihzdXByLl9fYWZ0ZXJfXykgc3Vwci5fX2FmdGVyX18uY2FsbChmbiwgc3Vwciwgbyk7XG4gIGZuLmV4dGVuZCA9IGV4dGVuZDtcbiAgcmV0dXJuIGZuO1xufVxuXG4iLCJcbnZhciBmID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8ganNvbjogIHR3byB3YXkgXG4vLyAgLSBnZXQ6IEpTT04uc3RyaW5naWZ5XG4vLyAgLSBzZXQ6IEpTT04ucGFyc2Vcbi8vICAtIGV4YW1wbGU6IGB7IHRpdGxlfGpzb24gfWBcbmYuanNvbiA9IHtcbiAgZ2V0OiBmdW5jdGlvbiggdmFsdWUgKXtcbiAgICByZXR1cm4gdHlwZW9mIEpTT04gIT09ICd1bmRlZmluZWQnPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSk6IHZhbHVlO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApe1xuICAgIHJldHVybiB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCc/IEpTT04ucGFyc2UodmFsdWUpIDogdmFsdWU7XG4gIH1cbn1cblxuLy8gbGFzdDogb25lLXdheVxuLy8gIC0gZ2V0OiByZXR1cm4gdGhlIGxhc3QgaXRlbSBpbiBsaXN0XG4vLyAgLSBleGFtcGxlOiBgeyBsaXN0fGxhc3QgfWBcbmYubGFzdCA9IGZ1bmN0aW9uKGFycil7XG4gIHJldHVybiBhcnIgJiYgYXJyW2Fyci5sZW5ndGggLSAxXTtcbn1cblxuLy8gYXZlcmFnZTogb25lLXdheVxuLy8gIC0gZ2V0OiBjb3B1dGUgdGhlIGF2ZXJhZ2Ugb2YgdGhlIGxpc3Rcbi8vICAtIGV4YW1wbGU6IGB7IGxpc3R8IGF2ZXJhZ2U6IFwic2NvcmVcIiB9YFxuZi5hdmVyYWdlID0gZnVuY3Rpb24oYXJyYXksIGtleSl7XG4gIGFycmF5ID0gYXJyYXkgfHwgW107XG4gIHJldHVybiBhcnJheS5sZW5ndGg/IGYudG90YWwoYXJyYXksIGtleSkvIGFycmF5Lmxlbmd0aCA6IDA7XG59XG5cblxuLy8gdG90YWw6IG9uZS13YXlcbi8vICAtIGdldDogY29wdXRlIHRoZSB0b3RhbCBvZiB0aGUgbGlzdFxuLy8gIC0gZXhhbXBsZTogYHsgbGlzdHwgYXZlcmFnZTogXCJzY29yZVwiIH1gXG5mLnRvdGFsID0gZnVuY3Rpb24oYXJyYXksIGtleSl7XG4gIHZhciB0b3RhbCA9IDA7XG4gIGlmKCFhcnJheSkgcmV0dXJuO1xuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKCBpdGVtICl7XG4gICAgdG90YWwgKz0ga2V5PyBpdGVtW2tleV0gOiBpdGVtO1xuICB9KVxuICByZXR1cm4gdG90YWw7XG59XG5cbi8vIHZhciBiYXNpY1NvcnRGbiA9IGZ1bmN0aW9uKGEsIGIpe3JldHVybiBiIC0gYX1cblxuLy8gZi5zb3J0ID0gZnVuY3Rpb24oYXJyYXksIGtleSwgcmV2ZXJzZSl7XG4vLyAgIHZhciB0eXBlID0gdHlwZW9mIGtleSwgc29ydEZuOyBcbi8vICAgc3dpdGNoKHR5cGUpe1xuLy8gICAgIGNhc2UgJ2Z1bmN0aW9uJzogc29ydEZuID0ga2V5OyBicmVhaztcbi8vICAgICBjYXNlICdzdHJpbmcnOiBzb3J0Rm4gPSBmdW5jdGlvbihhLCBiKXt9O2JyZWFrO1xuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBzb3J0Rm4gPSBiYXNpY1NvcnRGbjtcbi8vICAgfVxuLy8gICAvLyBuZWVkIG90aGVyIHJlZmVybmNlLlxuLy8gICByZXR1cm4gYXJyYXkuc2xpY2UoKS5zb3J0KGZ1bmN0aW9uKGEsYil7XG4vLyAgICAgcmV0dXJuIHJldmVyc2U/IC1zb3J0Rm4oYSwgYik6IHNvcnRGbihhLCBiKTtcbi8vICAgfSlcbi8vICAgcmV0dXJuIGFycmF5XG4vLyB9XG5cblxuIiwidmFyIGV4cHJDYWNoZSA9IHJlcXVpcmUoJy4uL2VudicpLmV4cHJDYWNoZTtcbnZhciBfID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG52YXIgUGFyc2VyID0gcmVxdWlyZShcIi4uL3BhcnNlci9QYXJzZXIuanNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXhwcmVzc2lvbjogZnVuY3Rpb24oZXhwciwgc2ltcGxlKXtcbiAgICAvLyBAVE9ETyBjYWNoZVxuICAgIGlmKCB0eXBlb2YgZXhwciA9PT0gJ3N0cmluZycgJiYgKCBleHByID0gZXhwci50cmltKCkgKSApe1xuICAgICAgZXhwciA9IGV4cHJDYWNoZS5nZXQoIGV4cHIgKSB8fCBleHByQ2FjaGUuc2V0KCBleHByLCBuZXcgUGFyc2VyKCBleHByLCB7IG1vZGU6IDIsIGV4cHJlc3Npb246IHRydWUgfSApLmV4cHJlc3Npb24oKSApXG4gICAgfVxuICAgIGlmKGV4cHIpIHJldHVybiBleHByO1xuICB9LFxuICBwYXJzZTogZnVuY3Rpb24odGVtcGxhdGUpe1xuICAgIHJldHVybiBuZXcgUGFyc2VyKHRlbXBsYXRlKS5wYXJzZSgpO1xuICB9XG59XG5cbiIsIi8vIHNoaW0gZm9yIGVzNVxudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgdHN0ciA9ICh7fSkudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIGV4dGVuZChvMSwgbzIgKXtcbiAgZm9yKHZhciBpIGluIG8yKSBpZiggbzFbaV0gPT09IHVuZGVmaW5lZCl7XG4gICAgbzFbaV0gPSBvMltpXVxuICB9XG59XG5cbi8vIFN0cmluZyBwcm90byA7XG5leHRlbmQoU3RyaW5nLnByb3RvdHlwZSwge1xuICB0cmltOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgfVxufSk7XG5cblxuLy8gQXJyYXkgcHJvdG87XG5leHRlbmQoQXJyYXkucHJvdG90eXBlLCB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uKG9iaiwgZnJvbSl7XG4gICAgZnJvbSA9IGZyb20gfHwgMDtcbiAgICBmb3IgKHZhciBpID0gZnJvbSwgbGVuID0gdGhpcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHRoaXNbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfSxcbiAgZm9yRWFjaDogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpe1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgIH1cbiAgfSxcbiAgZmlsdGVyOiBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCl7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSB0aGlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFzcyA9IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgICBpZihwYXNzKSByZXMucHVzaCh0aGlzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgbWFwOiBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCl7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSB0aGlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXMucHVzaChjYWxsYmFjay5jYWxsKGNvbnRleHQsIHRoaXNbaV0sIGksIHRoaXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufSk7XG5cbi8vIEZ1bmN0aW9uIHByb3RvO1xuZXh0ZW5kKEZ1bmN0aW9uLnByb3RvdHlwZSwge1xuICBiaW5kOiBmdW5jdGlvbihjb250ZXh0KXtcbiAgICB2YXIgZm4gPSB0aGlzO1xuICAgIHZhciBwcmVBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgdmFyIGFyZ3MgPSBwcmVBcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH1cbiAgfVxufSlcblxuLy8gT2JqZWN0XG5leHRlbmQoT2JqZWN0LCB7XG4gIGtleXM6IGZ1bmN0aW9uKG9iail7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IodmFyIGkgaW4gb2JqKSBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAga2V5cy5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbiAgfSBcbn0pXG5cbi8vIERhdGVcbmV4dGVuZChEYXRlLCB7XG4gIG5vdzogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gK25ldyBEYXRlO1xuICB9XG59KVxuLy8gQXJyYXlcbmV4dGVuZChBcnJheSwge1xuICBpc0FycmF5OiBmdW5jdGlvbihhcnIpe1xuICAgIHJldHVybiB0c3RyLmNhbGwoYXJyKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICB9XG59KVxuIiwidmFyIF8gPSByZXF1aXJlKCcuLi91dGlsLmpzJyk7XG52YXIgcGFyc2VFeHByZXNzaW9uID0gcmVxdWlyZSgnLi9wYXJzZS5qcycpLmV4cHJlc3Npb247XG5cblxuZnVuY3Rpb24gV2F0Y2hlcigpe31cblxudmFyIG1ldGhvZHMgPSB7XG4gICR3YXRjaDogZnVuY3Rpb24oZXhwciwgZm4sIG9wdGlvbnMpe1xuICAgIHZhciBnZXQsIG9uY2UsIHRlc3QsIHJsZW4sIGV4dHJhID0gdGhpcy5fX2V4dF9fOyAvL3JlY29yZHMgbGVuZ3RoXG4gICAgaWYoIXRoaXMuX3dhdGNoZXJzKSB0aGlzLl93YXRjaGVycyA9IFtdO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYob3B0aW9ucyA9PT0gdHJ1ZSl7XG4gICAgICAgb3B0aW9ucyA9IHsgZGVlcDogdHJ1ZSB9XG4gICAgfVxuICAgIHZhciB1aWQgPSBfLnVpZCgnd18nKTtcbiAgICBpZihBcnJheS5pc0FycmF5KGV4cHIpKXtcbiAgICAgIHZhciB0ZXN0cyA9IFtdO1xuICAgICAgZm9yKHZhciBpID0gMCxsZW4gPSBleHByLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICB0ZXN0cy5wdXNoKHRoaXMuJGV4cHJlc3Npb24oZXhwcltpXSkuZ2V0KVxuICAgICAgfVxuICAgICAgdmFyIHByZXYgPSBbXTtcbiAgICAgIHRlc3QgPSBmdW5jdGlvbihjb250ZXh0KXtcbiAgICAgICAgdmFyIGVxdWFsID0gdHJ1ZTtcbiAgICAgICAgZm9yKHZhciBpID0wLCBsZW4gPSB0ZXN0cy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgdmFyIHNwbGljZSA9IHRlc3RzW2ldKGNvbnRleHQsIGV4dHJhKTtcbiAgICAgICAgICBpZighXy5lcXVhbHMoc3BsaWNlLCBwcmV2W2ldKSl7XG4gICAgICAgICAgICAgZXF1YWwgPSBmYWxzZTtcbiAgICAgICAgICAgICBwcmV2W2ldID0gXy5jbG9uZShzcGxpY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXF1YWw/IGZhbHNlOiBwcmV2O1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgZXhwciA9IHRoaXMuX3RvdWNoRXhwciggcGFyc2VFeHByZXNzaW9uKGV4cHIpICk7XG4gICAgICBnZXQgPSBleHByLmdldDtcbiAgICAgIG9uY2UgPSBleHByLm9uY2U7XG4gICAgfVxuXG4gICAgdmFyIHdhdGNoZXIgPSB7XG4gICAgICBpZDogdWlkLCBcbiAgICAgIGdldDogZ2V0LCBcbiAgICAgIGZuOiBmbiwgXG4gICAgICBvbmNlOiBvbmNlLCBcbiAgICAgIGZvcmNlOiBvcHRpb25zLmZvcmNlLFxuICAgICAgdGVzdDogdGVzdCxcbiAgICAgIGRlZXA6IG9wdGlvbnMuZGVlcCxcbiAgICAgIGxhc3Q6IG9wdGlvbnMuc3luYz8gZ2V0KHRoaXMpOiB1bmRlZmluZWRcbiAgICB9XG4gICAgXG4gICAgdGhpcy5fd2F0Y2hlcnMucHVzaCggd2F0Y2hlciApO1xuXG4gICAgcmxlbiA9IHRoaXMuX3JlY29yZHMgJiYgdGhpcy5fcmVjb3Jkcy5sZW5ndGg7XG4gICAgaWYocmxlbikgdGhpcy5fcmVjb3Jkc1tybGVuLTFdLnB1c2godWlkKVxuICAgIC8vIGluaXQgc3RhdGUuXG4gICAgaWYob3B0aW9ucy5pbml0ID09PSB0cnVlKXtcbiAgICAgIHRoaXMuJHBoYXNlID0gJ2RpZ2VzdCc7XG4gICAgICB0aGlzLl9jaGVja1NpbmdsZVdhdGNoKCB3YXRjaGVyLCB0aGlzLl93YXRjaGVycy5sZW5ndGgtMSApO1xuICAgICAgdGhpcy4kcGhhc2UgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gd2F0Y2hlcjtcbiAgfSxcbiAgJHVud2F0Y2g6IGZ1bmN0aW9uKHVpZCl7XG4gICAgdWlkID0gdWlkLnVpZCB8fCB1aWQ7XG4gICAgaWYoIXRoaXMuX3dhdGNoZXJzKSB0aGlzLl93YXRjaGVycyA9IFtdO1xuICAgIGlmKEFycmF5LmlzQXJyYXkodWlkKSl7XG4gICAgICBmb3IodmFyIGkgPTAsIGxlbiA9IHVpZC5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgIHRoaXMuJHVud2F0Y2godWlkW2ldKTtcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIHZhciB3YXRjaGVycyA9IHRoaXMuX3dhdGNoZXJzLCB3YXRjaGVyLCB3bGVuO1xuICAgICAgaWYoIXVpZCB8fCAhd2F0Y2hlcnMgfHwgISh3bGVuID0gd2F0Y2hlcnMubGVuZ3RoKSkgcmV0dXJuO1xuICAgICAgZm9yKDt3bGVuLS07KXtcbiAgICAgICAgd2F0Y2hlciA9IHdhdGNoZXJzW3dsZW5dO1xuICAgICAgICBpZih3YXRjaGVyICYmIHdhdGNoZXIuaWQgPT09IHVpZCApe1xuICAgICAgICAgIHdhdGNoZXJzLnNwbGljZSh3bGVuLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgJGV4cHJlc3Npb246IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICByZXR1cm4gdGhpcy5fdG91Y2hFeHByKHBhcnNlRXhwcmVzc2lvbih2YWx1ZSkpXG4gIH0sXG4gIC8qKlxuICAgKiB0aGUgd2hvbGUgZGlnZXN0IGxvb3AgLGp1c3QgbGlrZSBhbmd1bGFyLCBpdCBqdXN0IGEgZGlydHktY2hlY2sgbG9vcDtcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwYXRoICBub3cgcmVndWxhciBwcm9jZXNzIGEgcHVyZSBkaXJ0eS1jaGVjayBsb29wLCBidXQgaW4gcGFyc2UgcGhhc2UsIFxuICAgKiAgICAgICAgICAgICAgICAgIFJlZ3VsYXIncyBwYXJzZXIgZXh0cmFjdCB0aGUgZGVwZW5kZW5jaWVzLCBpbiBmdXR1cmUgbWF5YmUgaXQgd2lsbCBjaGFuZ2UgdG8gZGlydHktY2hlY2sgY29tYmluZSB3aXRoIHBhdGgtYXdhcmUgdXBkYXRlO1xuICAgKiBAcmV0dXJuIHtWb2lkfSAgIFxuICAgKi9cblxuICAkZGlnZXN0OiBmdW5jdGlvbigpe1xuICAgIGlmKHRoaXMuJHBoYXNlID09PSAnZGlnZXN0JyB8fCB0aGlzLl9tdXRlKSByZXR1cm47XG4gICAgdGhpcy4kcGhhc2UgPSAnZGlnZXN0JztcbiAgICB2YXIgZGlydHkgPSBmYWxzZSwgbiA9MDtcbiAgICB3aGlsZShkaXJ0eSA9IHRoaXMuX2RpZ2VzdCgpKXtcblxuICAgICAgaWYoKCsrbikgPiAyMCl7IC8vIG1heCBsb29wXG4gICAgICAgIHRocm93ICd0aGVyZSBtYXkgYSBjaXJjdWxhciBkZXBlbmRlbmNpZXMgcmVhY2hlcycgXG4gICAgICB9XG4gICAgfVxuICAgIGlmKCBuID4gMCAmJiB0aGlzLiRlbWl0KSB0aGlzLiRlbWl0KFwiJHVwZGF0ZVwiKTtcbiAgICB0aGlzLiRwaGFzZSA9IG51bGw7XG4gIH0sXG4gIC8vIHByaXZhdGUgZGlnZXN0IGxvZ2ljXG4gIF9kaWdlc3Q6IGZ1bmN0aW9uKCl7XG4gICAgLy8gaWYodGhpcy5jb250ZXh0KSByZXR1cm4gdGhpcy5jb250ZXh0LiRkaWdlc3QoKTtcbiAgICAvLyBpZih0aGlzLiRlbWl0KSB0aGlzLiRlbWl0KCdkaWdlc3QnKTtcbiAgICB2YXIgd2F0Y2hlcnMgPSB0aGlzLl93YXRjaGVycztcbiAgICB2YXIgZGlydHkgPSBmYWxzZSwgY2hpbGRyZW4sIHdhdGNoZXIsIHdhdGNoZXJEaXJ0eTtcbiAgICBpZih3YXRjaGVycyAmJiB3YXRjaGVycy5sZW5ndGgpe1xuICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gd2F0Y2hlcnMubGVuZ3RoO2kgPCBsZW47IGkrKyl7XG4gICAgICAgIHdhdGNoZXIgPSB3YXRjaGVyc1tpXTtcbiAgICAgICAgd2F0Y2hlckRpcnR5ID0gdGhpcy5fY2hlY2tTaW5nbGVXYXRjaCh3YXRjaGVyLCBpKTtcbiAgICAgICAgaWYod2F0Y2hlckRpcnR5KSBkaXJ0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNoZWNrIGNoaWxkcmVuJ3MgZGlydHkuXG4gICAgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbjtcbiAgICBpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xuICAgICAgZm9yKHZhciBtID0gMCwgbWxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgbSA8IG1sZW47IG0rKyl7XG4gICAgICAgIGlmKGNoaWxkcmVuW21dLl9kaWdlc3QoKSkgZGlydHkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGlydHk7XG4gIH0sXG4gIC8vIGNoZWNrIGEgc2luZ2xlIG9uZSB3YXRjaGVyIFxuICBfY2hlY2tTaW5nbGVXYXRjaDogZnVuY3Rpb24od2F0Y2hlciwgaSl7XG4gICAgdmFyIGRpcnR5ID0gZmFsc2U7XG4gICAgaWYoIXdhdGNoZXIpIHJldHVybjtcbiAgICBpZih3YXRjaGVyLnRlc3QpIHsgLy9tdWx0aSBcbiAgICAgIHZhciByZXN1bHQgPSB3YXRjaGVyLnRlc3QodGhpcyk7XG4gICAgICBpZihyZXN1bHQpe1xuICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgIHdhdGNoZXIuZm4uYXBwbHkodGhpcywgcmVzdWx0KVxuICAgICAgfVxuICAgIH1lbHNle1xuXG4gICAgICB2YXIgbm93ID0gd2F0Y2hlci5nZXQodGhpcyk7XG4gICAgICB2YXIgbGFzdCA9IHdhdGNoZXIubGFzdDtcbiAgICAgIHZhciBlcSA9IHRydWU7XG5cbiAgICAgIGlmKF8udHlwZU9mKCBub3cgKSA9PT0gJ29iamVjdCcgJiYgd2F0Y2hlci5kZWVwKXtcbiAgICAgICAgaWYoIXdhdGNoZXIubGFzdCl7XG4gICAgICAgICAgIGVxID0gZmFsc2U7XG4gICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBmb3IodmFyIGogaW4gbm93KXtcbiAgICAgICAgICAgIGlmKHdhdGNoZXIubGFzdFtqXSAhPT0gbm93W2pdKXtcbiAgICAgICAgICAgICAgZXEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGVxICE9PSBmYWxzZSl7XG4gICAgICAgICAgICBmb3IodmFyIG4gaW4gbGFzdCl7XG4gICAgICAgICAgICAgIGlmKGxhc3Rbbl0gIT09IG5vd1tuXSl7XG4gICAgICAgICAgICAgICAgZXEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIGVxID0gXy5lcXVhbHMobm93LCB3YXRjaGVyLmxhc3QpO1xuICAgICAgfVxuICAgICAgaWYoZXEgPT09IGZhbHNlIHx8IHdhdGNoZXIuZm9yY2UpeyAvLyBpbiBzb21lIGNhc2UuIGlmIHVuZGVmaW5lZCwgd2UgbXVzdCBmb3JjZSBkaWdlc3QuXG4gICAgICAgIGVxID0gZmFsc2U7XG4gICAgICAgIHdhdGNoZXIuZm9yY2UgPSBudWxsO1xuICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgIHdhdGNoZXIuZm4uY2FsbCh0aGlzLCBub3csIHdhdGNoZXIubGFzdCk7XG4gICAgICAgIGlmKHR5cGVvZiBub3cgIT09ICdvYmplY3QnfHwgd2F0Y2hlci5kZWVwKXtcbiAgICAgICAgICB3YXRjaGVyLmxhc3QgPSBfLmNsb25lKG5vdyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHdhdGNoZXIubGFzdCA9IG5vdztcbiAgICAgICAgfVxuICAgICAgfWVsc2V7IC8vIGlmIGVxID09IHRydWVcbiAgICAgICAgaWYoIF8udHlwZU9mKGVxKSA9PT0gJ2FycmF5JyAmJiBlcS5sZW5ndGggKXtcbiAgICAgICAgICB3YXRjaGVyLmxhc3QgPSBfLmNsb25lKG5vdyk7XG4gICAgICAgICAgd2F0Y2hlci5mbi5jYWxsKHRoaXMsIG5vdywgZXEpO1xuICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgZXEgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBAVE9ET1xuICAgICAgaWYoZGlydHkgJiYgd2F0Y2hlci5vbmNlKSB0aGlzLl93YXRjaGVycy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgIHJldHVybiBkaXJ0eTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqICoqdGlwcyoqOiB3aGF0ZXZlciBwYXJhbSB5b3UgcGFzc2VkIGluICR1cGRhdGUsIGFmdGVyIHRoZSBmdW5jdGlvbiBjYWxsZWQsIGRpcnR5LWNoZWNrKGRpZ2VzdCkgcGhhc2Ugd2lsbCBlbnRlcjtcbiAgICogXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufFN0cmluZ3xFeHByZXNzaW9ufSBwYXRoICBcbiAgICogQHBhcmFtICB7V2hhdGV2ZXJ9IHZhbHVlIG9wdGlvbmFsLCB3aGVuIHBhdGggaXMgRnVuY3Rpb24sIHRoZSB2YWx1ZSBpcyBpZ25vcmVkXG4gICAqIEByZXR1cm4ge3RoaXN9ICAgICB0aGlzIFxuICAgKi9cbiAgJHNldDogZnVuY3Rpb24ocGF0aCwgdmFsdWUpe1xuICAgIGlmKHBhdGggIT0gbnVsbCl7XG4gICAgICB2YXIgdHlwZSA9IF8udHlwZU9mKHBhdGgpO1xuICAgICAgaWYoIHR5cGUgPT09ICdzdHJpbmcnIHx8IHBhdGgudHlwZSA9PT0gJ2V4cHJlc3Npb24nICl7XG4gICAgICAgIHBhdGggPSB0aGlzLiRleHByZXNzaW9uKHBhdGgpO1xuICAgICAgICBwYXRoLnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICB9ZWxzZSBpZih0eXBlID09PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgcGF0aC5jYWxsKHRoaXMsIHRoaXMuZGF0YSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZm9yKHZhciBpIGluIHBhdGgpIHtcbiAgICAgICAgICB0aGlzLiRzZXQoaSwgcGF0aFtpXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgJGdldDogZnVuY3Rpb24oZXhwcikgIHtcbiAgICByZXR1cm4gdGhpcy4kZXhwcmVzc2lvbihleHByKS5nZXQodGhpcyk7XG4gIH0sXG4gICR1cGRhdGU6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy4kc2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIHJvb3RQYXJlbnQgPSB0aGlzO1xuXG4gICAgZG97XG4gICAgICBpZihyb290UGFyZW50LmRhdGEuaXNvbGF0ZSB8fCAhcm9vdFBhcmVudC4kcGFyZW50KSBicmVhaztcbiAgICAgIHJvb3RQYXJlbnQgPSByb290UGFyZW50LiRwYXJlbnQ7XG4gICAgfSB3aGlsZShyb290UGFyZW50KVxuXG4gICAgcm9vdFBhcmVudC4kZGlnZXN0KCk7XG4gIH0sXG4gIC8vIGF1dG8gY29sbGVjdCB3YXRjaGVycyBmb3IgbG9naWMtY29udHJvbC5cbiAgX3JlY29yZDogZnVuY3Rpb24oKXtcbiAgICBpZighdGhpcy5fcmVjb3JkcykgdGhpcy5fcmVjb3JkcyA9IFtdO1xuICAgIHRoaXMuX3JlY29yZHMucHVzaChbXSk7XG4gIH0sXG4gIF9yZWxlYXNlOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRzLnBvcCgpO1xuICB9XG59XG5cblxuXy5leHRlbmQoV2F0Y2hlci5wcm90b3R5cGUsIG1ldGhvZHMpXG5cblxuV2F0Y2hlci5taXhUbyA9IGZ1bmN0aW9uKG9iail7XG4gIG9iaiA9IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/IG9iai5wcm90b3R5cGUgOiBvYmo7XG4gIHJldHVybiBfLmV4dGVuZChvYmosIG1ldGhvZHMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2F0Y2hlcjsiLCJ2YXIgZW52ID0gIHJlcXVpcmUoXCIuL2Vudi5qc1wiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi9jb25maWdcIik7IFxudmFyIFJlZ3VsYXIgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL1JlZ3VsYXIuanNcIik7XG52YXIgUGFyc2VyID0gUmVndWxhci5QYXJzZXI7XG52YXIgTGV4ZXIgPSBSZWd1bGFyLkxleGVyO1xuXG5pZihlbnYuYnJvd3Nlcil7XG4gICAgcmVxdWlyZShcIi4vZGlyZWN0aXZlL2Jhc2UuanNcIik7XG4gICAgcmVxdWlyZShcIi4vZGlyZWN0aXZlL2FuaW1hdGlvbi5qc1wiKTtcbiAgICByZXF1aXJlKFwiLi9tb2R1bGUvdGltZW91dC5qc1wiKTtcbiAgICBSZWd1bGFyLmRvbSA9IHJlcXVpcmUoXCIuL2RvbS5qc1wiKTtcbn1cblJlZ3VsYXIuZW52ID0gZW52O1xuUmVndWxhci51dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcblJlZ3VsYXIucGFyc2UgPSBmdW5jdGlvbihzdHIsIG9wdGlvbnMpe1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZihvcHRpb25zLkJFR0lOIHx8IG9wdGlvbnMuRU5EKXtcbiAgICBpZihvcHRpb25zLkJFR0lOKSBjb25maWcuQkVHSU4gPSBvcHRpb25zLkJFR0lOO1xuICAgIGlmKG9wdGlvbnMuRU5EKSBjb25maWcuRU5EID0gb3B0aW9ucy5FTkQ7XG4gICAgTGV4ZXIuc2V0dXAoKTtcbiAgfVxuICB2YXIgYXN0ID0gbmV3IFBhcnNlcihzdHIpLnBhcnNlKCk7XG4gIHJldHVybiAhb3B0aW9ucy5zdHJpbmdpZnk/IGFzdCA6IEpTT04uc3RyaW5naWZ5KGFzdCk7XG59XG5cbiIsInZhciBSZWd1bGFyID0gcmVxdWlyZShcIi4uL1JlZ3VsYXIuanNcIik7XG5cbi8qKlxuICogVGltZW91dCBNb2R1bGVcbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBDb21wb25lbnQgXG4gKi9cbmZ1bmN0aW9uIFRpbWVvdXRNb2R1bGUoQ29tcG9uZW50KXtcblxuICBDb21wb25lbnQuaW1wbGVtZW50KHtcbiAgICAvKipcbiAgICAgKiBqdXN0IGxpa2Ugc2V0VGltZW91dCwgYnV0IHdpbGwgZW50ZXIgZGlnZXN0IGF1dG9tYXRlbHlcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGRlbGF5IFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gICB0aW1lb3V0aWRcbiAgICAgKi9cbiAgICAkdGltZW91dDogZnVuY3Rpb24oZm4sIGRlbGF5KXtcbiAgICAgIGRlbGF5ID0gZGVsYXkgfHwgMDtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIGZuLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpOyAvL2VudGVyIGRpZ2VzdFxuICAgICAgfS5iaW5kKHRoaXMpLCBkZWxheSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBqdXN0IGxpa2Ugc2V0SW50ZXJ2YWwsIGJ1dCB3aWxsIGVudGVyIGRpZ2VzdCBhdXRvbWF0ZWx5XG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgIFxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBpbnRlcnZhbCBcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgaW50ZXJ2YWxpZFxuICAgICAqL1xuICAgICRpbnRlcnZhbDogZnVuY3Rpb24oZm4sIGludGVydmFsKXtcbiAgICAgIGludGVydmFsID0gaW50ZXJ2YWwgfHwgMTAwMC82MDtcbiAgICAgIHJldHVybiBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICBmbi5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTsgLy9lbnRlciBkaWdlc3RcbiAgICAgIH0uYmluZCh0aGlzKSwgaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuUmVndWxhci5wbHVnaW4oJ3RpbWVvdXQnLCBUaW1lb3V0TW9kdWxlKTtcblJlZ3VsYXIucGx1Z2luKCckdGltZW91dCcsIFRpbWVvdXRNb2R1bGUpOyIsInZhciBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2NvbmZpZy5qc1wiKTtcblxuLy8gc29tZSBjdXN0b20gdGFnICB3aWxsIGNvbmZsaWN0IHdpdGggdGhlIExleGVyIHByb2dyZXNzXG52YXIgY29uZmxpY3RUYWcgPSB7XCJ9XCI6IFwie1wiLCBcIl1cIjogXCJbXCJ9LCBtYXAxLCBtYXAyO1xuLy8gc29tZSBtYWNybyBmb3IgbGV4ZXJcbnZhciBtYWNybyA9IHtcbiAgJ05BTUUnOiAvKD86WzpfQS1aYS16XVstXFwuOl8wLTlBLVphLXpdKikvLFxuICAnSURFTlQnOiAvW1xcJF9BLVphLXpdW18wLTlBLVphLXpcXCRdKi8sXG4gICdTUEFDRSc6IC9bXFxyXFxuXFxmIF0vXG59XG5cblxudmFyIHRlc3QgPSAvYXwoYikvLmV4ZWMoXCJhXCIpO1xudmFyIHRlc3RTdWJDYXB1cmUgPSB0ZXN0ICYmIHRlc3RbMV0gPT09IHVuZGVmaW5lZD8gXG4gIGZ1bmN0aW9uKHN0cil7IHJldHVybiBzdHIgIT09IHVuZGVmaW5lZCB9XG4gIDpmdW5jdGlvbihzdHIpe3JldHVybiAhIXN0cn07XG5cbmZ1bmN0aW9uIHdyYXBIYW5kZXIoaGFuZGxlcil7XG4gIHJldHVybiBmdW5jdGlvbihhbGwpe1xuICAgIHJldHVybiB7dHlwZTogaGFuZGxlciwgdmFsdWU6IGFsbCB9XG4gIH1cbn1cblxuZnVuY3Rpb24gTGV4ZXIoaW5wdXQsIG9wdHMpe1xuICBpZihjb25mbGljdFRhZ1tjb25maWcuRU5EXSl7XG4gICAgdGhpcy5tYXJrU3RhcnQgPSBjb25mbGljdFRhZ1tjb25maWcuRU5EXTtcbiAgICB0aGlzLm1hcmtFbmQgPSBjb25maWcuRU5EO1xuICB9XG5cbiAgdGhpcy5pbnB1dCA9IChpbnB1dHx8XCJcIikudHJpbSgpO1xuICB0aGlzLm9wdHMgPSBvcHRzIHx8IHt9O1xuICB0aGlzLm1hcCA9IHRoaXMub3B0cy5tb2RlICE9PSAyPyAgbWFwMTogbWFwMjtcbiAgdGhpcy5zdGF0ZXMgPSBbXCJJTklUXCJdO1xuICBpZihvcHRzICYmIG9wdHMuZXhwcmVzc2lvbil7XG4gICAgIHRoaXMuc3RhdGVzLnB1c2goXCJKU1RcIik7XG4gICAgIHRoaXMuZXhwcmVzc2lvbiA9IHRydWU7XG4gIH1cbn1cblxudmFyIGxvID0gTGV4ZXIucHJvdG90eXBlXG5cblxubG8ubGV4ID0gZnVuY3Rpb24oc3RyKXtcbiAgc3RyID0gKHN0ciB8fCB0aGlzLmlucHV0KS50cmltKCk7XG4gIHZhciB0b2tlbnMgPSBbXSwgc3BsaXQsIHRlc3QsbWxlbiwgdG9rZW4sIHN0YXRlO1xuICB0aGlzLmlucHV0ID0gc3RyLCBcbiAgdGhpcy5tYXJrcyA9IDA7XG4gIC8vIGluaXQgdGhlIHBvcyBpbmRleFxuICB0aGlzLmluZGV4PTA7XG4gIHZhciBpID0gMDtcbiAgd2hpbGUoc3RyKXtcbiAgICBpKytcbiAgICBzdGF0ZSA9IHRoaXMuc3RhdGUoKTtcbiAgICBzcGxpdCA9IHRoaXMubWFwW3N0YXRlXSBcbiAgICB0ZXN0ID0gc3BsaXQuVFJVTksuZXhlYyhzdHIpO1xuICAgIGlmKCF0ZXN0KXtcbiAgICAgIHRoaXMuZXJyb3IoJ1VucmVjb2dpbml6ZWQgVG9rZW4nKTtcbiAgICB9XG4gICAgbWxlbiA9IHRlc3RbMF0ubGVuZ3RoO1xuICAgIHN0ciA9IHN0ci5zbGljZShtbGVuKVxuICAgIHRva2VuID0gdGhpcy5fcHJvY2Vzcy5jYWxsKHRoaXMsIHRlc3QsIHNwbGl0LCBzdHIpXG4gICAgaWYodG9rZW4pIHRva2Vucy5wdXNoKHRva2VuKVxuICAgIHRoaXMuaW5kZXggKz0gbWxlbjtcbiAgICAvLyBpZihzdGF0ZSA9PSAnVEFHJyB8fCBzdGF0ZSA9PSAnSlNUJykgc3RyID0gdGhpcy5za2lwc3BhY2Uoc3RyKTtcbiAgfVxuXG4gIHRva2Vucy5wdXNoKHt0eXBlOiAnRU9GJ30pO1xuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmxvLmVycm9yID0gZnVuY3Rpb24obXNnKXtcbiAgdGhyb3cgXCJQYXJzZSBFcnJvcjogXCIgKyBtc2cgKyAgJzpcXG4nICsgXy50cmFja0Vycm9yUG9zKHRoaXMuaW5wdXQsIHRoaXMuaW5kZXgpO1xufVxuXG5sby5fcHJvY2VzcyA9IGZ1bmN0aW9uKGFyZ3MsIHNwbGl0LHN0cil7XG4gIC8vIGNvbnNvbGUubG9nKGFyZ3Muam9pbihcIixcIiksIHRoaXMuc3RhdGUoKSlcbiAgdmFyIGxpbmtzID0gc3BsaXQubGlua3MsIG1hcmNoZWQgPSBmYWxzZSwgdG9rZW47XG5cbiAgZm9yKHZhciBsZW4gPSBsaW5rcy5sZW5ndGgsIGk9MDtpPGxlbiA7aSsrKXtcbiAgICB2YXIgbGluayA9IGxpbmtzW2ldLFxuICAgICAgaGFuZGxlciA9IGxpbmtbMl0sXG4gICAgICBpbmRleCA9IGxpbmtbMF07XG4gICAgLy8gaWYoYXJnc1s2XSA9PT0gJz4nICYmIGluZGV4ID09PSA2KSBjb25zb2xlLmxvZygnaGFoYScpXG4gICAgaWYodGVzdFN1YkNhcHVyZShhcmdzW2luZGV4XSkpIHtcbiAgICAgIG1hcmNoZWQgPSB0cnVlO1xuICAgICAgaWYoaGFuZGxlcil7XG4gICAgICAgIHRva2VuID0gaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzLnNsaWNlKGluZGV4LCBpbmRleCArIGxpbmtbMV0pKVxuICAgICAgICBpZih0b2tlbikgIHRva2VuLnBvcyA9IHRoaXMuaW5kZXg7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYoIW1hcmNoZWQpeyAvLyBpbiBpZSBsdDggLiBzdWIgY2FwdHVyZSBpcyBcIlwiIGJ1dCBvbnQgXG4gICAgc3dpdGNoKHN0ci5jaGFyQXQoMCkpe1xuICAgICAgY2FzZSBcIjxcIjpcbiAgICAgICAgdGhpcy5lbnRlcihcIlRBR1wiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmVudGVyKFwiSlNUXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRva2VuO1xufVxubG8uZW50ZXIgPSBmdW5jdGlvbihzdGF0ZSl7XG4gIHRoaXMuc3RhdGVzLnB1c2goc3RhdGUpXG4gIHJldHVybiB0aGlzO1xufVxuXG5sby5zdGF0ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBzdGF0ZXMgPSB0aGlzLnN0YXRlcztcbiAgcmV0dXJuIHN0YXRlc1tzdGF0ZXMubGVuZ3RoLTFdO1xufVxuXG5sby5sZWF2ZSA9IGZ1bmN0aW9uKHN0YXRlKXtcbiAgdmFyIHN0YXRlcyA9IHRoaXMuc3RhdGVzO1xuICBpZighc3RhdGUgfHwgc3RhdGVzW3N0YXRlcy5sZW5ndGgtMV0gPT09IHN0YXRlKSBzdGF0ZXMucG9wKClcbn1cblxuXG5MZXhlci5zZXR1cCA9IGZ1bmN0aW9uKCl7XG4gIG1hY3JvLkVORCA9IGNvbmZpZy5FTkQ7XG4gIG1hY3JvLkJFR0lOID0gY29uZmlnLkJFR0lOO1xuICAvL1xuICBtYXAxID0gZ2VuTWFwKFtcbiAgICAvLyBJTklUXG4gICAgcnVsZXMuRU5URVJfSlNULFxuICAgIHJ1bGVzLkVOVEVSX1RBRyxcbiAgICBydWxlcy5URVhULFxuXG4gICAgLy9UQUdcbiAgICBydWxlcy5UQUdfTkFNRSxcbiAgICBydWxlcy5UQUdfT1BFTixcbiAgICBydWxlcy5UQUdfQ0xPU0UsXG4gICAgcnVsZXMuVEFHX1BVTkNIT1IsXG4gICAgcnVsZXMuVEFHX0VOVEVSX0pTVCxcbiAgICBydWxlcy5UQUdfVU5RX1ZBTFVFLFxuICAgIHJ1bGVzLlRBR19TVFJJTkcsXG4gICAgcnVsZXMuVEFHX1NQQUNFLFxuICAgIHJ1bGVzLlRBR19DT01NRU5ULFxuXG4gICAgLy8gSlNUXG4gICAgcnVsZXMuSlNUX09QRU4sXG4gICAgcnVsZXMuSlNUX0NMT1NFLFxuICAgIHJ1bGVzLkpTVF9DT01NRU5ULFxuICAgIHJ1bGVzLkpTVF9FWFBSX09QRU4sXG4gICAgcnVsZXMuSlNUX0lERU5ULFxuICAgIHJ1bGVzLkpTVF9TUEFDRSxcbiAgICBydWxlcy5KU1RfTEVBVkUsXG4gICAgcnVsZXMuSlNUX05VTUJFUixcbiAgICBydWxlcy5KU1RfUFVOQ0hPUixcbiAgICBydWxlcy5KU1RfU1RSSU5HLFxuICAgIHJ1bGVzLkpTVF9DT01NRU5UXG4gICAgXSlcblxuICAvLyBpZ25vcmVkIHRoZSB0YWctcmVsYXRpdmUgdG9rZW5cbiAgbWFwMiA9IGdlbk1hcChbXG4gICAgLy8gSU5JVCBubyA8IHJlc3RyaWN0XG4gICAgcnVsZXMuRU5URVJfSlNUMixcbiAgICBydWxlcy5URVhULFxuICAgIC8vIEpTVFxuICAgIHJ1bGVzLkpTVF9DT01NRU5ULFxuICAgIHJ1bGVzLkpTVF9PUEVOLFxuICAgIHJ1bGVzLkpTVF9DTE9TRSxcbiAgICBydWxlcy5KU1RfRVhQUl9PUEVOLFxuICAgIHJ1bGVzLkpTVF9JREVOVCxcbiAgICBydWxlcy5KU1RfU1BBQ0UsXG4gICAgcnVsZXMuSlNUX0xFQVZFLFxuICAgIHJ1bGVzLkpTVF9OVU1CRVIsXG4gICAgcnVsZXMuSlNUX1BVTkNIT1IsXG4gICAgcnVsZXMuSlNUX1NUUklORyxcbiAgICBydWxlcy5KU1RfQ09NTUVOVFxuICAgIF0pXG59XG5cblxuZnVuY3Rpb24gZ2VuTWFwKHJ1bGVzKXtcbiAgdmFyIHJ1bGUsIG1hcCA9IHt9LCBzaWduO1xuICBmb3IodmFyIGkgPSAwLCBsZW4gPSBydWxlcy5sZW5ndGg7IGkgPCBsZW4gOyBpKyspe1xuICAgIHJ1bGUgPSBydWxlc1tpXTtcbiAgICBzaWduID0gcnVsZVsyXSB8fCAnSU5JVCc7XG4gICAgKCBtYXBbc2lnbl0gfHwgKG1hcFtzaWduXSA9IHtydWxlczpbXSwgbGlua3M6W119KSApLnJ1bGVzLnB1c2gocnVsZSk7XG4gIH1cbiAgcmV0dXJuIHNldHVwKG1hcCk7XG59XG5cbmZ1bmN0aW9uIHNldHVwKG1hcCl7XG4gIHZhciBzcGxpdCwgcnVsZXMsIHRydW5rcywgaGFuZGxlciwgcmVnLCByZXRhaW4sIHJ1bGU7XG4gIGZ1bmN0aW9uIHJlcGxhY2VGbihhbGwsIG9uZSl7XG4gICAgcmV0dXJuIHR5cGVvZiBtYWNyb1tvbmVdID09PSAnc3RyaW5nJz8gXG4gICAgICBfLmVzY2FwZVJlZ0V4cChtYWNyb1tvbmVdKSBcbiAgICAgIDogU3RyaW5nKG1hY3JvW29uZV0pLnNsaWNlKDEsLTEpO1xuICB9XG5cbiAgZm9yKHZhciBpIGluIG1hcCl7XG5cbiAgICBzcGxpdCA9IG1hcFtpXTtcbiAgICBzcGxpdC5jdXJJbmRleCA9IDE7XG4gICAgcnVsZXMgPSBzcGxpdC5ydWxlcztcbiAgICB0cnVua3MgPSBbXTtcblxuICAgIGZvcih2YXIgaiA9IDAsbGVuID0gcnVsZXMubGVuZ3RoOyBqPGxlbjsgaisrKXtcbiAgICAgIHJ1bGUgPSBydWxlc1tqXTsgXG4gICAgICByZWcgPSBydWxlWzBdO1xuICAgICAgaGFuZGxlciA9IHJ1bGVbMV07XG5cbiAgICAgIGlmKHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJyl7XG4gICAgICAgIGhhbmRsZXIgPSB3cmFwSGFuZGVyKGhhbmRsZXIpO1xuICAgICAgfVxuICAgICAgaWYoXy50eXBlT2YocmVnKSA9PT0gJ3JlZ2V4cCcpIHJlZyA9IHJlZy50b1N0cmluZygpLnNsaWNlKDEsIC0xKTtcblxuICAgICAgcmVnID0gcmVnLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCByZXBsYWNlRm4pXG4gICAgICByZXRhaW4gPSBfLmZpbmRTdWJDYXB0dXJlKHJlZykgKyAxOyBcbiAgICAgIHNwbGl0LmxpbmtzLnB1c2goW3NwbGl0LmN1ckluZGV4LCByZXRhaW4sIGhhbmRsZXJdKTsgXG4gICAgICBzcGxpdC5jdXJJbmRleCArPSByZXRhaW47XG4gICAgICB0cnVua3MucHVzaChyZWcpO1xuICAgIH1cbiAgICBzcGxpdC5UUlVOSyA9IG5ldyBSZWdFeHAoXCJeKD86KFwiICsgdHJ1bmtzLmpvaW4oXCIpfChcIikgKyBcIikpXCIpXG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxudmFyIHJ1bGVzID0ge1xuXG4gIC8vIDEuIElOSVRcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gbW9kZTEncyBKU1QgRU5URVIgUlVMRVxuICBFTlRFUl9KU1Q6IFsvW15cXHgwMDxdKj8oPz17QkVHSU59KS8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgdGhpcy5lbnRlcignSlNUJyk7XG4gICAgaWYoYWxsKSByZXR1cm4ge3R5cGU6ICdURVhUJywgdmFsdWU6IGFsbH1cbiAgfV0sXG5cbiAgLy8gbW9kZTIncyBKU1QgRU5URVIgUlVMRVxuICBFTlRFUl9KU1QyOiBbL1teXFx4MDBdKj8oPz17QkVHSU59KS8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgdGhpcy5lbnRlcignSlNUJyk7XG4gICAgaWYoYWxsKSByZXR1cm4ge3R5cGU6ICdURVhUJywgdmFsdWU6IGFsbH1cbiAgfV0sXG5cbiAgRU5URVJfVEFHOiBbL1teXFx4MDA8Pl0qPyg/PTwpLywgZnVuY3Rpb24oYWxsKXsgXG4gICAgdGhpcy5lbnRlcignVEFHJyk7XG4gICAgaWYoYWxsKSByZXR1cm4ge3R5cGU6ICdURVhUJywgdmFsdWU6IGFsbH1cbiAgfV0sXG5cbiAgVEVYVDogWy9bXlxceDAwXSsvLCAnVEVYVCddLFxuXG4gIC8vIDIuIFRBR1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBUQUdfTkFNRTogWy97TkFNRX0vLCAnTkFNRScsICdUQUcnXSxcbiAgVEFHX1VOUV9WQUxVRTogWy9bXlxce30mXCInPT48YFxcclxcblxcZiBdKy8sICdVTlEnLCAnVEFHJ10sXG5cbiAgVEFHX09QRU46IFsvPCh7TkFNRX0pXFxzKi8sIGZ1bmN0aW9uKGFsbCwgb25lKXtcbiAgICByZXR1cm4ge3R5cGU6ICdUQUdfT1BFTicsIHZhbHVlOiBvbmV9XG4gIH0sICdUQUcnXSxcbiAgVEFHX0NMT1NFOiBbLzxcXC8oe05BTUV9KVtcXHJcXG5cXGYgXSo+LywgZnVuY3Rpb24oYWxsLCBvbmUpe1xuICAgIHRoaXMubGVhdmUoKTtcbiAgICByZXR1cm4ge3R5cGU6ICdUQUdfQ0xPU0UnLCB2YWx1ZTogb25lIH1cbiAgfSwgJ1RBRyddLFxuXG4gICAgLy8gbW9kZTIncyBKU1QgRU5URVIgUlVMRVxuICBUQUdfRU5URVJfSlNUOiBbLyg/PXtCRUdJTn0pLywgZnVuY3Rpb24oKXtcbiAgICB0aGlzLmVudGVyKCdKU1QnKTtcbiAgfSwgJ1RBRyddLFxuXG5cbiAgVEFHX1BVTkNIT1I6IFsvW1xcPlxcLz0mXS8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgaWYoYWxsID09PSAnPicpIHRoaXMubGVhdmUoKTtcbiAgICByZXR1cm4ge3R5cGU6IGFsbCwgdmFsdWU6IGFsbCB9XG4gIH0sICdUQUcnXSxcbiAgVEFHX1NUUklORzogIFsgLycoW14nXSopJ3xcIihbXlwiXSopXCIvLCBmdW5jdGlvbihhbGwsIG9uZSwgdHdvKXsgLy9cIidcbiAgICB2YXIgdmFsdWUgPSBvbmUgfHwgdHdvIHx8IFwiXCI7XG5cbiAgICByZXR1cm4ge3R5cGU6ICdTVFJJTkcnLCB2YWx1ZTogdmFsdWV9XG4gIH0sICdUQUcnXSxcblxuICBUQUdfU1BBQ0U6IFsve1NQQUNFfSsvLCBudWxsLCAnVEFHJ10sXG4gIFRBR19DT01NRU5UOiBbLzxcXCEtLShbXlxceDAwXSo/KS0tXFw+LywgbnVsbCAsJ1RBRyddLFxuXG4gIC8vIDMuIEpTVFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgSlNUX09QRU46IFsne0JFR0lOfSN7U1BBQ0V9Kih7SURFTlR9KScsIGZ1bmN0aW9uKGFsbCwgbmFtZSl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdPUEVOJyxcbiAgICAgIHZhbHVlOiBuYW1lXG4gICAgfVxuICB9LCAnSlNUJ10sXG4gIEpTVF9MRUFWRTogWy97RU5EfS8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgaWYodGhpcy5tYXJrRW5kID09PSBhbGwgJiYgdGhpcy5leHByZXNzaW9uKSByZXR1cm4ge3R5cGU6IHRoaXMubWFya0VuZCwgdmFsdWU6IHRoaXMubWFya0VuZH07XG4gICAgaWYoIXRoaXMubWFya0VuZCB8fCAhdGhpcy5tYXJrcyApe1xuICAgICAgdGhpcy5maXJzdEVudGVyU3RhcnQgPSBmYWxzZTtcbiAgICAgIHRoaXMubGVhdmUoJ0pTVCcpO1xuICAgICAgcmV0dXJuIHt0eXBlOiAnRU5EJ31cbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMubWFya3MtLTtcbiAgICAgIHJldHVybiB7dHlwZTogdGhpcy5tYXJrRW5kLCB2YWx1ZTogdGhpcy5tYXJrRW5kfVxuICAgIH1cbiAgfSwgJ0pTVCddLFxuICBKU1RfQ0xPU0U6IFsve0JFR0lOfVxccypcXC8oe0lERU5UfSlcXHMqe0VORH0vLCBmdW5jdGlvbihhbGwsIG9uZSl7XG4gICAgdGhpcy5sZWF2ZSgnSlNUJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdDTE9TRScsXG4gICAgICB2YWx1ZTogb25lXG4gICAgfVxuICB9LCAnSlNUJ10sXG4gIEpTVF9DT01NRU5UOiBbL3tCRUdJTn1cXCEoW15cXHgwMF0qPylcXCF7RU5EfS8sIGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5sZWF2ZSgpO1xuICB9LCAnSlNUJ10sXG4gIEpTVF9FWFBSX09QRU46IFsne0JFR0lOfScsZnVuY3Rpb24oYWxsLCBvbmUpe1xuICAgIGlmKGFsbCA9PT0gdGhpcy5tYXJrU3RhcnQpe1xuICAgICAgaWYodGhpcy5leHByZXNzaW9uKSByZXR1cm4geyB0eXBlOiB0aGlzLm1hcmtTdGFydCwgdmFsdWU6IHRoaXMubWFya1N0YXJ0IH07XG4gICAgICBpZih0aGlzLmZpcnN0RW50ZXJTdGFydCB8fCB0aGlzLm1hcmtzKXtcbiAgICAgICAgdGhpcy5tYXJrcysrXG4gICAgICAgIHRoaXMuZmlyc3RFbnRlclN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRoaXMubWFya1N0YXJ0LCB2YWx1ZTogdGhpcy5tYXJrU3RhcnQgfTtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmZpcnN0RW50ZXJTdGFydCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnRVhQUl9PUEVOJyxcbiAgICAgIGVzY2FwZTogZmFsc2VcbiAgICB9XG5cbiAgfSwgJ0pTVCddLFxuICBKU1RfSURFTlQ6IFsne0lERU5UfScsICdJREVOVCcsICdKU1QnXSxcbiAgSlNUX1NQQUNFOiBbL1sgXFxyXFxuXFxmXSsvLCBudWxsLCAnSlNUJ10sXG4gIEpTVF9QVU5DSE9SOiBbL1s9IV0/PT18Wy09PjwrKlxcLyVcXCFdP1xcPXxcXHxcXHx8JiZ8XFxAXFwofFxcLlxcLnxbPFxcPlxcW1xcXVxcKFxcKVxcLVxcfFxce31cXCtcXCpcXC8lPzpcXC4hLF0vLCBmdW5jdGlvbihhbGwpe1xuICAgIHJldHVybiB7IHR5cGU6IGFsbCwgdmFsdWU6IGFsbCB9XG4gIH0sJ0pTVCddLFxuXG4gIEpTVF9TVFJJTkc6ICBbIC8nKFteJ10qKSd8XCIoW15cIl0qKVwiLywgZnVuY3Rpb24oYWxsLCBvbmUsIHR3byl7IC8vXCInXG4gICAgcmV0dXJuIHt0eXBlOiAnU1RSSU5HJywgdmFsdWU6IG9uZSB8fCB0d28gfHwgXCJcIn1cbiAgfSwgJ0pTVCddLFxuICBKU1RfTlVNQkVSOiBbLyg/OlswLTldKlxcLlswLTldK3xbMC05XSspKGVcXGQrKT8vLCBmdW5jdGlvbihhbGwpe1xuICAgIHJldHVybiB7dHlwZTogJ05VTUJFUicsIHZhbHVlOiBwYXJzZUZsb2F0KGFsbCwgMTApfTtcbiAgfSwgJ0pTVCddXG59XG5cblxuLy8gc2V0dXAgd2hlbiBmaXJzdCBjb25maWdcbkxleGVyLnNldHVwKCk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IExleGVyO1xuIiwidmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWcuanNcIik7XG52YXIgbm9kZSA9IHJlcXVpcmUoXCIuL25vZGUuanNcIik7XG52YXIgTGV4ZXIgPSByZXF1aXJlKFwiLi9MZXhlci5qc1wiKTtcbnZhciB2YXJOYW1lID0gXy52YXJOYW1lO1xudmFyIGN0eE5hbWUgPSBfLmN0eE5hbWU7XG52YXIgZXh0TmFtZSA9IF8uZXh0TmFtZTtcbnZhciBpc1BhdGggPSBfLm1ha2VQcmVkaWNhdGUoXCJTVFJJTkcgSURFTlQgTlVNQkVSXCIpO1xudmFyIGlzS2V5V29yZCA9IF8ubWFrZVByZWRpY2F0ZShcInRydWUgZmFsc2UgdW5kZWZpbmVkIG51bGwgdGhpcyBBcnJheSBEYXRlIEpTT04gTWF0aCBOYU4gUmVnRXhwIGRlY29kZVVSSSBkZWNvZGVVUklDb21wb25lbnQgZW5jb2RlVVJJIGVuY29kZVVSSUNvbXBvbmVudCBwYXJzZUZsb2F0IHBhcnNlSW50IE9iamVjdFwiKTtcblxuXG5cblxuZnVuY3Rpb24gUGFyc2VyKGlucHV0LCBvcHRzKXtcbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICB0aGlzLnRva2VucyA9IG5ldyBMZXhlcihpbnB1dCwgb3B0cykubGV4KCk7XG4gIHRoaXMucG9zID0gMDtcbiAgdGhpcy5ub0NvbXB1dGVkID0gIG9wdHMubm9Db21wdXRlZDtcbiAgdGhpcy5sZW5ndGggPSB0aGlzLnRva2Vucy5sZW5ndGg7XG59XG5cblxudmFyIG9wID0gUGFyc2VyLnByb3RvdHlwZTtcblxuXG5vcC5wYXJzZSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMucG9zID0gMDtcbiAgdmFyIHJlcz0gdGhpcy5wcm9ncmFtKCk7XG4gIGlmKHRoaXMubGwoKS50eXBlID09PSAnVEFHX0NMT1NFJyl7XG4gICAgdGhpcy5lcnJvcihcIllvdSBtYXkgZ290IGEgdW5jbG9zZWQgVGFnXCIpXG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxub3AubGwgPSAgZnVuY3Rpb24oayl7XG4gIGsgPSBrIHx8IDE7XG4gIGlmKGsgPCAwKSBrID0gayArIDE7XG4gIHZhciBwb3MgPSB0aGlzLnBvcyArIGsgLSAxO1xuICBpZihwb3MgPiB0aGlzLmxlbmd0aCAtIDEpe1xuICAgICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMubGVuZ3RoLTFdO1xuICB9XG4gIHJldHVybiB0aGlzLnRva2Vuc1twb3NdO1xufVxuICAvLyBsb29rYWhlYWRcbm9wLmxhID0gZnVuY3Rpb24oayl7XG4gIHJldHVybiAodGhpcy5sbChrKSB8fCAnJykudHlwZTtcbn1cblxub3AubWF0Y2ggPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSl7XG4gIHZhciBsbDtcbiAgaWYoIShsbCA9IHRoaXMuZWF0KHR5cGUsIHZhbHVlKSkpe1xuICAgIGxsICA9IHRoaXMubGwoKTtcbiAgICB0aGlzLmVycm9yKCdleHBlY3QgWycgKyB0eXBlICsgKHZhbHVlID09IG51bGw/ICcnOic6JysgdmFsdWUpICsgJ11cIiAtPiBnb3QgXCJbJyArIGxsLnR5cGUgKyAodmFsdWU9PW51bGw/ICcnOic6JytsbC52YWx1ZSkgKyAnXScsIGxsLnBvcylcbiAgfWVsc2V7XG4gICAgcmV0dXJuIGxsO1xuICB9XG59XG5cbm9wLmVycm9yID0gZnVuY3Rpb24obXNnLCBwb3Mpe1xuICBtc2cgPSAgXCJQYXJzZSBFcnJvcjogXCIgKyBtc2cgKyAgJzpcXG4nICsgXy50cmFja0Vycm9yUG9zKHRoaXMuaW5wdXQsIHR5cGVvZiBwb3MgPT09ICdudW1iZXInPyBwb3M6IHRoaXMubGwoKS5wb3N8fDApO1xuICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbn1cblxub3AubmV4dCA9IGZ1bmN0aW9uKGspe1xuICBrID0gayB8fCAxO1xuICB0aGlzLnBvcyArPSBrO1xufVxub3AuZWF0ID0gZnVuY3Rpb24odHlwZSwgdmFsdWUpe1xuICB2YXIgbGwgPSB0aGlzLmxsKCk7XG4gIGlmKHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJyl7XG4gICAgZm9yKHZhciBsZW4gPSB0eXBlLmxlbmd0aCA7IGxlbi0tOyl7XG4gICAgICBpZihsbC50eXBlID09PSB0eXBlW2xlbl0pIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIHJldHVybiBsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1lbHNle1xuICAgIGlmKCBsbC50eXBlID09PSB0eXBlICYmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IGxsLnZhbHVlID09PSB2YWx1ZSkgKXtcbiAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICByZXR1cm4gbGw7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gcHJvZ3JhbVxuLy8gIDpFT0Zcbi8vICB8IChzdGF0ZW1lbnQpKiBFT0Zcbm9wLnByb2dyYW0gPSBmdW5jdGlvbigpe1xuICB2YXIgc3RhdGVtZW50cyA9IFtdLCAgbGwgPSB0aGlzLmxsKCk7XG4gIHdoaWxlKGxsLnR5cGUgIT09ICdFT0YnICYmIGxsLnR5cGUgIT09J1RBR19DTE9TRScpe1xuXG4gICAgc3RhdGVtZW50cy5wdXNoKHRoaXMuc3RhdGVtZW50KCkpO1xuICAgIGxsID0gdGhpcy5sbCgpO1xuICB9XG4gIC8vIGlmKGxsLnR5cGUgPT09ICdUQUdfQ0xPU0UnKSB0aGlzLmVycm9yKFwiWW91IG1heSBoYXZlIHVubWF0Y2hlZCBUYWdcIilcbiAgcmV0dXJuIHN0YXRlbWVudHM7XG59XG5cbi8vIHN0YXRlbWVudFxuLy8gIDogeG1sXG4vLyAgfCBqc3Rcbi8vICB8IHRleHRcbm9wLnN0YXRlbWVudCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsbCA9IHRoaXMubGwoKTtcbiAgc3dpdGNoKGxsLnR5cGUpe1xuICAgIGNhc2UgJ05BTUUnOlxuICAgIGNhc2UgJ1RFWFQnOlxuICAgICAgdmFyIHRleHQgPSBsbC52YWx1ZTtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgd2hpbGUobGwgPSB0aGlzLmVhdChbJ05BTUUnLCAnVEVYVCddKSl7XG4gICAgICAgIHRleHQgKz0gbGwudmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZS50ZXh0KHRleHQpO1xuICAgIGNhc2UgJ1RBR19PUEVOJzpcbiAgICAgIHJldHVybiB0aGlzLnhtbCgpO1xuICAgIGNhc2UgJ09QRU4nOiBcbiAgICAgIHJldHVybiB0aGlzLmRpcmVjdGl2ZSgpO1xuICAgIGNhc2UgJ0VYUFJfT1BFTic6XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcnBsYXRpb24oKTtcbiAgICBjYXNlICdQQVJUX09QRU4nOlxuICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGUoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy5lcnJvcignVW5leHBlY3RlZCB0b2tlbjogJysgdGhpcy5sYSgpKVxuICB9XG59XG5cbi8vIHhtbCBcbi8vIHN0YWcgc3RhdGVtZW50KiBUQUdfQ0xPU0U/KGlmIHNlbGYtY2xvc2VkIHRhZylcbm9wLnhtbCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBuYW1lLCBhdHRycywgY2hpbGRyZW4sIHNlbGZDbG9zZWQ7XG4gIG5hbWUgPSB0aGlzLm1hdGNoKCdUQUdfT1BFTicpLnZhbHVlO1xuICBhdHRycyA9IHRoaXMuYXR0cnMoKTtcbiAgc2VsZkNsb3NlZCA9IHRoaXMuZWF0KCcvJylcbiAgdGhpcy5tYXRjaCgnPicpO1xuICBpZiggIXNlbGZDbG9zZWQgJiYgIV8uaXNWb2lkVGFnKG5hbWUpICl7XG4gICAgY2hpbGRyZW4gPSB0aGlzLnByb2dyYW0oKTtcbiAgICBpZighdGhpcy5lYXQoJ1RBR19DTE9TRScsIG5hbWUpKSB0aGlzLmVycm9yKCdleHBlY3QgPC8nK25hbWUrJz4gZ290JysgJ25vIG1hdGNoZWQgY2xvc2VUYWcnKVxuICB9XG4gIHJldHVybiBub2RlLmVsZW1lbnQobmFtZSwgYXR0cnMsIGNoaWxkcmVuKTtcbn1cblxuLy8geGVudGl0eVxuLy8gIC1ydWxlKHdyYXAgYXR0cmlidXRlKVxuLy8gIC1hdHRyaWJ1dGVcbi8vXG4vLyBfX2V4YW1wbGVfX1xuLy8gIG5hbWUgPSAxIHwgIFxuLy8gIG5nLWhpZGUgfFxuLy8gIG9uLWNsaWNrPXt7fX0gfCBcbi8vICB7eyNpZiBuYW1lfX1vbi1jbGljaz17e3h4fX17eyNlbHNlfX1vbi10YXA9e3t9fXt7L2lmfX1cblxub3AueGVudGl0eSA9IGZ1bmN0aW9uKGxsKXtcbiAgdmFyIG5hbWUgPSBsbC52YWx1ZSwgdmFsdWU7XG4gIGlmKGxsLnR5cGUgPT09ICdOQU1FJyl7XG4gICAgaWYoIHRoaXMuZWF0KFwiPVwiKSApIHZhbHVlID0gdGhpcy5hdHR2YWx1ZSgpO1xuICAgIHJldHVybiBub2RlLmF0dHJpYnV0ZSggbmFtZSwgdmFsdWUgKTtcbiAgfWVsc2V7XG4gICAgaWYoIG5hbWUgIT09ICdpZicpIHRoaXMuZXJyb3IoXCJjdXJyZW50IHZlcnNpb24uIE9OTFkgUlVMRSAjaWYgI2Vsc2UgI2Vsc2VpZiBpcyB2YWxpZCBpbiB0YWcsIHRoZSBydWxlICNcIiArIG5hbWUgKyAnIGlzIGludmFsaWQnKTtcbiAgICByZXR1cm4gdGhpc1snaWYnXSh0cnVlKTtcbiAgfVxuXG59XG5cbi8vIHN0YWcgICAgIDo6PSAgICAnPCcgTmFtZSAoUyBhdHRyKSogUz8gJz4nICBcbi8vIGF0dHIgICAgOjo9ICAgICBOYW1lIEVxIGF0dHZhbHVlXG5vcC5hdHRycyA9IGZ1bmN0aW9uKGlzQXR0cmlidXRlKXtcbiAgdmFyIGVhdFxuICBpZighaXNBdHRyaWJ1dGUpe1xuICAgIGVhdCA9IFtcIk5BTUVcIiwgXCJPUEVOXCJdXG4gIH1lbHNle1xuICAgIGVhdCA9IFtcIk5BTUVcIl1cbiAgfVxuXG4gIHZhciBhdHRycyA9IFtdLCBsbDtcbiAgd2hpbGUgKGxsID0gdGhpcy5lYXQoZWF0KSl7XG4gICAgYXR0cnMucHVzaCh0aGlzLnhlbnRpdHkoIGxsICkpXG4gIH1cbiAgcmV0dXJuIGF0dHJzO1xufVxuXG4vLyBhdHR2YWx1ZVxuLy8gIDogU1RSSU5HICBcbi8vICB8IE5BTUVcbm9wLmF0dHZhbHVlID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxsID0gdGhpcy5sbCgpO1xuICBzd2l0Y2gobGwudHlwZSl7XG4gICAgY2FzZSBcIk5BTUVcIjpcbiAgICBjYXNlIFwiVU5RXCI6XG4gICAgY2FzZSBcIlNUUklOR1wiOlxuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICB2YXIgdmFsdWUgPSBsbC52YWx1ZTtcbiAgICAgIGlmKH52YWx1ZS5pbmRleE9mKGNvbmZpZy5CRUdJTikgJiYgfnZhbHVlLmluZGV4T2YoY29uZmlnLkVORCkpe1xuICAgICAgICB2YXIgY29uc3RhbnQgPSB0cnVlO1xuICAgICAgICB2YXIgcGFyc2VkID0gbmV3IFBhcnNlcih2YWx1ZSwgeyBtb2RlOiAyIH0pLnBhcnNlKCk7XG4gICAgICAgIGlmKHBhcnNlZC5sZW5ndGggPT09IDEgJiYgcGFyc2VkWzBdLnR5cGUgPT09ICdleHByZXNzaW9uJykgcmV0dXJuIHBhcnNlZFswXTtcbiAgICAgICAgdmFyIGJvZHkgPSBbXTtcbiAgICAgICAgcGFyc2VkLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgaWYoIWl0ZW0uY29uc3RhbnQpIGNvbnN0YW50PWZhbHNlO1xuICAgICAgICAgIC8vIHNpbGVudCB0aGUgbXV0aXBsZSBpbnRlcGxhdGlvblxuICAgICAgICAgICAgYm9keS5wdXNoKGl0ZW0uYm9keSB8fCBcIidcIiArIGl0ZW0udGV4dC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIikgKyBcIidcIik7ICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIGJvZHkgPSBcIltcIiArIGJvZHkuam9pbihcIixcIikgKyBcIl0uam9pbignJylcIjtcbiAgICAgICAgdmFsdWUgPSBub2RlLmV4cHJlc3Npb24oYm9keSwgbnVsbCwgY29uc3RhbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgXCJFWFBSX09QRU5cIjpcbiAgICAgIHJldHVybiB0aGlzLmludGVycGxhdGlvbigpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLmVycm9yKCdVbmV4cGVjdGVkIHRva2VuOiAnKyB0aGlzLmxhKCkpXG4gIH1cbn1cblxuXG4vLyB7eyN9fVxub3AuZGlyZWN0aXZlID0gZnVuY3Rpb24oKXtcbiAgdmFyIG5hbWUgPSB0aGlzLmxsKCkudmFsdWU7XG4gIHRoaXMubmV4dCgpO1xuICBpZih0eXBlb2YgdGhpc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgcmV0dXJuIHRoaXNbbmFtZV0oKVxuICB9ZWxzZXtcbiAgICB0aGlzLmVycm9yKCdVbmRlZmluZWQgZGlyZWN0aXZlWycrIG5hbWUgKyddJyk7XG4gIH1cbn1cblxuLy8ge3t9fVxub3AuaW50ZXJwbGF0aW9uID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5tYXRjaCgnRVhQUl9PUEVOJyk7XG4gIHZhciByZXMgPSB0aGlzLmV4cHJlc3Npb24odHJ1ZSk7XG4gIHRoaXMubWF0Y2goJ0VORCcpO1xuICByZXR1cm4gcmVzO1xufVxuXG4vLyB7e359fVxub3AuaW5jbHVkZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBjb250ZW50ID0gdGhpcy5leHByZXNzaW9uKCk7XG4gIHRoaXMubWF0Y2goJ0VORCcpO1xuICByZXR1cm4gbm9kZS50ZW1wbGF0ZShjb250ZW50KTtcbn1cblxuLy8ge3sjaWZ9fVxub3BbXCJpZlwiXSA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciB0ZXN0ID0gdGhpcy5leHByZXNzaW9uKCk7XG4gIHZhciBjb25zZXF1ZW50ID0gW10sIGFsdGVybmF0ZT1bXTtcblxuICB2YXIgY29udGFpbmVyID0gY29uc2VxdWVudDtcbiAgdmFyIHN0YXRlbWVudCA9ICF0YWc/IFwic3RhdGVtZW50XCIgOiBcImF0dHJzXCI7XG5cbiAgdGhpcy5tYXRjaCgnRU5EJyk7XG5cbiAgdmFyIGxsLCBjbG9zZTtcbiAgd2hpbGUoICEgKGNsb3NlID0gdGhpcy5lYXQoJ0NMT1NFJykpICl7XG4gICAgbGwgPSB0aGlzLmxsKCk7XG4gICAgaWYoIGxsLnR5cGUgPT09ICdPUEVOJyApe1xuICAgICAgc3dpdGNoKCBsbC52YWx1ZSApe1xuICAgICAgICBjYXNlICdlbHNlJzpcbiAgICAgICAgICBjb250YWluZXIgPSBhbHRlcm5hdGU7XG4gICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgdGhpcy5tYXRjaCggJ0VORCcgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZWxzZWlmJzpcbiAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICBhbHRlcm5hdGUucHVzaCggdGhpc1tcImlmXCJdKHRhZykgKTtcbiAgICAgICAgICByZXR1cm4gbm9kZVsnaWYnXSggdGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlICk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29udGFpbmVyLnB1c2goIHRoaXNbc3RhdGVtZW50XSh0cnVlKSApO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgY29udGFpbmVyLnB1c2godGhpc1tzdGF0ZW1lbnRdKHRydWUpKTtcbiAgICB9XG4gIH1cbiAgLy8gaWYgc3RhdGVtZW50IG5vdCBtYXRjaGVkXG4gIGlmKGNsb3NlLnZhbHVlICE9PSBcImlmXCIpIHRoaXMuZXJyb3IoJ1VubWF0Y2hlZCBpZiBkaXJlY3RpdmUnKVxuICByZXR1cm4gbm9kZVtcImlmXCJdKHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSk7XG59XG5cblxuLy8gQG1hcmsgICBtdXN0YWNoZSBzeW50YXggaGF2ZSBuYXRydXJlIGRpcywgY2Fub3Qgd2l0aCBleHByZXNzaW9uXG4vLyB7eyNsaXN0fX1cbm9wLmxpc3QgPSBmdW5jdGlvbigpe1xuICAvLyBzZXF1ZW5jZSBjYW4gYmUgYSBsaXN0IG9yIGhhc2hcbiAgdmFyIHNlcXVlbmNlID0gdGhpcy5leHByZXNzaW9uKCksIHZhcmlhYmxlLCBsbDtcbiAgdmFyIGNvbnNlcXVlbnQgPSBbXSwgYWx0ZXJuYXRlPVtdO1xuICB2YXIgY29udGFpbmVyID0gY29uc2VxdWVudDtcblxuICB0aGlzLm1hdGNoKCdJREVOVCcsICdhcycpO1xuXG4gIHZhcmlhYmxlID0gdGhpcy5tYXRjaCgnSURFTlQnKS52YWx1ZTtcblxuICB0aGlzLm1hdGNoKCdFTkQnKTtcblxuICB3aGlsZSggIShsbCA9IHRoaXMuZWF0KCdDTE9TRScpKSApe1xuICAgIGlmKHRoaXMuZWF0KCdPUEVOJywgJ2Vsc2UnKSl7XG4gICAgICBjb250YWluZXIgPSAgYWx0ZXJuYXRlO1xuICAgICAgdGhpcy5tYXRjaCgnRU5EJyk7XG4gICAgfWVsc2V7XG4gICAgICBjb250YWluZXIucHVzaCh0aGlzLnN0YXRlbWVudCgpKTtcbiAgICB9XG4gIH1cbiAgaWYobGwudmFsdWUgIT09ICdsaXN0JykgdGhpcy5lcnJvcignZXhwZWN0ICcgKyAnbGlzdCBnb3QgJyArICcvJyArIGxsLnZhbHVlICsgJyAnLCBsbC5wb3MgKTtcbiAgcmV0dXJuIG5vZGUubGlzdChzZXF1ZW5jZSwgdmFyaWFibGUsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSk7XG59XG5cblxub3AuZXhwcmVzc2lvbiA9IGZ1bmN0aW9uKCl7XG4gIHZhciBleHByZXNzaW9uO1xuICBpZih0aGlzLmVhdCgnQCgnKSl7IC8vb25jZSBiaW5kXG4gICAgZXhwcmVzc2lvbiA9IHRoaXMuZXhwcigpO1xuICAgIGV4cHJlc3Npb24ub25jZSA9IHRydWU7XG4gICAgdGhpcy5tYXRjaCgnKScpXG4gIH1lbHNle1xuICAgIGV4cHJlc3Npb24gPSB0aGlzLmV4cHIoKTtcbiAgfVxuICByZXR1cm4gZXhwcmVzc2lvbjtcbn1cblxub3AuZXhwciA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuZGVwZW5kID0gW107XG5cbiAgdmFyIGJ1ZmZlciA9IHRoaXMuZmlsdGVyKClcblxuICB2YXIgYm9keSA9IGJ1ZmZlci5nZXQgfHwgYnVmZmVyO1xuICB2YXIgc2V0Ym9keSA9IGJ1ZmZlci5zZXQ7XG4gIHJldHVybiBub2RlLmV4cHJlc3Npb24oYm9keSwgc2V0Ym9keSwgIXRoaXMuZGVwZW5kLmxlbmd0aCk7XG59XG5cblxuLy8gZmlsdGVyXG4vLyBhc3NpZ24gKCd8JyBmaWx0ZXJuYW1lWyc6JyBhcmdzXSkgKiBcbm9wLmZpbHRlciA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy5hc3NpZ24oKTtcbiAgdmFyIGxsID0gdGhpcy5lYXQoJ3wnKTtcbiAgdmFyIGJ1ZmZlciA9IFtdLCBzZXRCdWZmZXIsIHByZWZpeCxcbiAgICBhdHRyID0gXCJ0XCIsIFxuICAgIHNldCA9IGxlZnQuc2V0LCBnZXQsIFxuICAgIHRtcCA9IFwiXCI7XG5cbiAgaWYobGwpe1xuICAgIGlmKHNldCkgc2V0QnVmZmVyID0gW107XG5cbiAgICBwcmVmaXggPSBcIihmdW5jdGlvbihcIiArIGF0dHIgKyBcIil7XCI7XG5cbiAgICBkb3tcbiAgICAgIHRtcCA9IGF0dHIgKyBcIiA9IFwiICsgY3R4TmFtZSArIFwiLl9mXygnXCIgKyB0aGlzLm1hdGNoKCdJREVOVCcpLnZhbHVlKyBcIicgKS5nZXQuY2FsbCggXCIrXy5jdHhOYW1lICtcIixcIiArIGF0dHIgO1xuICAgICAgaWYodGhpcy5lYXQoJzonKSl7XG4gICAgICAgIHRtcCArPVwiLCBcIisgdGhpcy5hcmd1bWVudHMoXCJ8XCIpLmpvaW4oXCIsXCIpICsgXCIpO1wiXG4gICAgICB9ZWxzZXtcbiAgICAgICAgdG1wICs9ICcpOydcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5wdXNoKHRtcCk7XG4gICAgICBzZXRCdWZmZXIgJiYgc2V0QnVmZmVyLnVuc2hpZnQoIHRtcC5yZXBsYWNlKFwiICkuZ2V0LmNhbGxcIiwgXCIgKS5zZXQuY2FsbFwiKSApO1xuXG4gICAgfXdoaWxlKGxsID0gdGhpcy5lYXQoJ3wnKSk7XG4gICAgYnVmZmVyLnB1c2goXCJyZXR1cm4gXCIgKyBhdHRyICk7XG4gICAgc2V0QnVmZmVyICYmIHNldEJ1ZmZlci5wdXNoKFwicmV0dXJuIFwiICsgYXR0cik7XG5cbiAgICBnZXQgPSAgcHJlZml4ICsgYnVmZmVyLmpvaW4oXCJcIikgKyBcIn0pKFwiK2xlZnQuZ2V0K1wiKVwiO1xuICAgIC8vIHdlIGNhbGwgYmFjayB0byB2YWx1ZS5cbiAgICBpZihzZXRCdWZmZXIpe1xuICAgICAgLy8gY2hhbmdlIF9zc19fKG5hbWUsIF9wXykgdG8gX3NfXyhuYW1lLCBmaWx0ZXJGbihfcF8pKTtcbiAgICAgIHNldCA9IHNldC5yZXBsYWNlKF8uc2V0TmFtZSwgXG4gICAgICAgIHByZWZpeCArIHNldEJ1ZmZlci5qb2luKFwiXCIpICsgXCJ9KShcIivjgIBfLnNldE5hbWXjgIArXCIpXCIgKTtcblxuICAgIH1cbiAgICAvLyB0aGUgc2V0IGZ1bmN0aW9uIGlzIGRlcGVuZCBvbiB0aGUgZmlsdGVyIGRlZmluaXRpb24uIGlmIGl0IGhhdmUgc2V0IG1ldGhvZCwgdGhlIHNldCB3aWxsIHdvcmtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQoZ2V0LCBzZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0O1xufVxuXG4vLyBhc3NpZ25cbi8vIGxlZnQtaGFuZC1leHByID0gY29uZGl0aW9uXG5vcC5hc3NpZ24gPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMuY29uZGl0aW9uKCksIGxsO1xuICBpZihsbCA9IHRoaXMuZWF0KFsnPScsICcrPScsICctPScsICcqPScsICcvPScsICclPSddKSl7XG4gICAgaWYoIWxlZnQuc2V0KSB0aGlzLmVycm9yKCdpbnZhbGlkIGxlZnRoYW5kIGV4cHJlc3Npb24gaW4gYXNzaWdubWVudCBleHByZXNzaW9uJyk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KCBsZWZ0LnNldC5yZXBsYWNlKCBcIixcIiArIF8uc2V0TmFtZSwgXCIsXCIgKyB0aGlzLmNvbmRpdGlvbigpLmdldCApLnJlcGxhY2UoXCInPSdcIiwgXCInXCIrbGwudHlwZStcIidcIiksIGxlZnQuc2V0KTtcbiAgICAvLyByZXR1cm4gdGhpcy5nZXRzZXQoJygnICsgbGVmdC5nZXQgKyBsbC50eXBlICArIHRoaXMuY29uZGl0aW9uKCkuZ2V0ICsgJyknLCBsZWZ0LnNldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnQ7XG59XG5cbi8vIG9yXG4vLyBvciA/IGFzc2lnbiA6IGFzc2lnblxub3AuY29uZGl0aW9uID0gZnVuY3Rpb24oKXtcblxuICB2YXIgdGVzdCA9IHRoaXMub3IoKTtcbiAgaWYodGhpcy5lYXQoJz8nKSl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KFt0ZXN0LmdldCArIFwiP1wiLCBcbiAgICAgIHRoaXMuYXNzaWduKCkuZ2V0LCBcbiAgICAgIHRoaXMubWF0Y2goXCI6XCIpLnR5cGUsIFxuICAgICAgdGhpcy5hc3NpZ24oKS5nZXRdLmpvaW4oXCJcIikpO1xuICB9XG5cbiAgcmV0dXJuIHRlc3Q7XG59XG5cbi8vIGFuZFxuLy8gYW5kICYmIG9yXG5vcC5vciA9IGZ1bmN0aW9uKCl7XG5cbiAgdmFyIGxlZnQgPSB0aGlzLmFuZCgpO1xuXG4gIGlmKHRoaXMuZWF0KCd8fCcpKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyAnfHwnICsgdGhpcy5vcigpLmdldCk7XG4gIH1cblxuICByZXR1cm4gbGVmdDtcbn1cbi8vIGVxdWFsXG4vLyBlcXVhbCAmJiBhbmRcbm9wLmFuZCA9IGZ1bmN0aW9uKCl7XG5cbiAgdmFyIGxlZnQgPSB0aGlzLmVxdWFsKCk7XG5cbiAgaWYodGhpcy5lYXQoJyYmJykpe1xuICAgIHJldHVybiB0aGlzLmdldHNldChsZWZ0LmdldCArICcmJicgKyB0aGlzLmFuZCgpLmdldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnQ7XG59XG4vLyByZWxhdGlvblxuLy8gXG4vLyBlcXVhbCA9PSByZWxhdGlvblxuLy8gZXF1YWwgIT0gcmVsYXRpb25cbi8vIGVxdWFsID09PSByZWxhdGlvblxuLy8gZXF1YWwgIT09IHJlbGF0aW9uXG5vcC5lcXVhbCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy5yZWxhdGlvbigpLCBsbDtcbiAgLy8gQHBlcmY7XG4gIGlmKCBsbCA9IHRoaXMuZWF0KFsnPT0nLCchPScsICc9PT0nLCAnIT09J10pKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyBsbC50eXBlICsgdGhpcy5lcXVhbCgpLmdldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnRcbn1cbi8vIHJlbGF0aW9uIDwgYWRkaXRpdmVcbi8vIHJlbGF0aW9uID4gYWRkaXRpdmVcbi8vIHJlbGF0aW9uIDw9IGFkZGl0aXZlXG4vLyByZWxhdGlvbiA+PSBhZGRpdGl2ZVxuLy8gcmVsYXRpb24gaW4gYWRkaXRpdmVcbm9wLnJlbGF0aW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLmFkZGl0aXZlKCksIGxsO1xuICAvLyBAcGVyZlxuICBpZihsbCA9ICh0aGlzLmVhdChbJzwnLCAnPicsICc+PScsICc8PSddKSB8fCB0aGlzLmVhdCgnSURFTlQnLCAnaW4nKSApKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyBsbC52YWx1ZSArIHRoaXMucmVsYXRpb24oKS5nZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0XG59XG4vLyBhZGRpdGl2ZSA6XG4vLyBtdWx0aXZlXG4vLyBhZGRpdGl2ZSArIG11bHRpdmVcbi8vIGFkZGl0aXZlIC0gbXVsdGl2ZVxub3AuYWRkaXRpdmUgPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMubXVsdGl2ZSgpICxsbDtcbiAgaWYobGw9IHRoaXMuZWF0KFsnKycsJy0nXSkgKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyBsbC52YWx1ZSArIHRoaXMuYWRkaXRpdmUoKS5nZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0XG59XG4vLyBtdWx0aXZlIDpcbi8vIHVuYXJ5XG4vLyBtdWx0aXZlICogdW5hcnlcbi8vIG11bHRpdmUgLyB1bmFyeVxuLy8gbXVsdGl2ZSAlIHVuYXJ5XG5vcC5tdWx0aXZlID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLnJhbmdlKCkgLGxsO1xuICBpZiggbGwgPSB0aGlzLmVhdChbJyonLCAnLycgLCclJ10pICl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGxlZnQuZ2V0ICsgbGwudHlwZSArIHRoaXMubXVsdGl2ZSgpLmdldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnQ7XG59XG5cbm9wLnJhbmdlID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLnVuYXJ5KCksIGxsLCByaWdodDtcblxuICBpZihsbCA9IHRoaXMuZWF0KCcuLicpKXtcbiAgICByaWdodCA9IHRoaXMudW5hcnkoKTtcbiAgICB2YXIgYm9keSA9IFxuICAgICAgXCIoZnVuY3Rpb24oc3RhcnQsZW5kKXt2YXIgcmVzID0gW10sc3RlcD1lbmQ+c3RhcnQ/MTotMTsgZm9yKHZhciBpID0gc3RhcnQ7IGVuZD5zdGFydD9pIDw9IGVuZDogaT49ZW5kOyBpPWkrc3RlcCl7cmVzLnB1c2goaSk7IH0gcmV0dXJuIHJlcyB9KShcIitsZWZ0LmdldCtcIixcIityaWdodC5nZXQrXCIpXCJcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQoYm9keSk7XG4gIH1cblxuICByZXR1cm4gbGVmdDtcbn1cblxuXG5cbi8vIGxlZnRoYW5kXG4vLyArIHVuYXJ5XG4vLyAtIHVuYXJ5XG4vLyB+IHVuYXJ5XG4vLyAhIHVuYXJ5XG5vcC51bmFyeSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsbDtcbiAgaWYobGwgPSB0aGlzLmVhdChbJysnLCctJywnficsICchJ10pKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQoJygnICsgbGwudHlwZSArIHRoaXMudW5hcnkoKS5nZXQgKyAnKScpIDtcbiAgfWVsc2V7XG4gICAgcmV0dXJuIHRoaXMubWVtYmVyKClcbiAgfVxufVxuXG4vLyBjYWxsW2xlZnRoYW5kXSA6XG4vLyBtZW1iZXIgYXJnc1xuLy8gbWVtYmVyIFsgZXhwcmVzc2lvbiBdXG4vLyBtZW1iZXIgLiBpZGVudCAgXG5cbm9wLm1lbWJlciA9IGZ1bmN0aW9uKGJhc2UsIGxhc3QsIHBhdGhlcywgcHJldkJhc2Upe1xuICB2YXIgbGwsIHBhdGgsIGV4dFZhbHVlO1xuXG5cbiAgdmFyIG9ubHlTaW1wbGVBY2Nlc3NvciA9IGZhbHNlO1xuICBpZighYmFzZSl7IC8vZmlyc3RcbiAgICBwYXRoID0gdGhpcy5wcmltYXJ5KCk7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgcGF0aDtcbiAgICBpZih0eXBlID09PSAnc3RyaW5nJyl7IFxuICAgICAgcGF0aGVzID0gW107XG4gICAgICBwYXRoZXMucHVzaCggcGF0aCApO1xuICAgICAgbGFzdCA9IHBhdGg7XG4gICAgICBleHRWYWx1ZSA9IGV4dE5hbWUgKyBcIi5cIiArIHBhdGhcbiAgICAgIGJhc2UgPSBjdHhOYW1lICsgXCIuX3NnXygnXCIgKyBwYXRoICsgXCInLCBcIiArIHZhck5hbWUgKyBcIiwgXCIgKyBleHROYW1lICsgXCIpXCI7XG4gICAgICBvbmx5U2ltcGxlQWNjZXNzb3IgPSB0cnVlO1xuICAgIH1lbHNleyAvL1ByaW1hdGl2ZSBUeXBlXG4gICAgICBpZihwYXRoLmdldCA9PT0gJ3RoaXMnKXtcbiAgICAgICAgYmFzZSA9IGN0eE5hbWU7XG4gICAgICAgIHBhdGhlcyA9IFsndGhpcyddO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHBhdGhlcyA9IG51bGw7XG4gICAgICAgIGJhc2UgPSBwYXRoLmdldDtcbiAgICAgIH1cbiAgICB9XG4gIH1lbHNleyAvLyBub3QgZmlyc3QgZW50ZXJcbiAgICBpZih0eXBlb2YgbGFzdCA9PT0gJ3N0cmluZycgJiYgaXNQYXRoKCBsYXN0KSApeyAvLyBpcyB2YWxpZCBwYXRoXG4gICAgICBwYXRoZXMucHVzaChsYXN0KTtcbiAgICB9ZWxzZXtcbiAgICAgIGlmKHBhdGhlcyAmJiBwYXRoZXMubGVuZ3RoKSB0aGlzLmRlcGVuZC5wdXNoKHBhdGhlcyk7XG4gICAgICBwYXRoZXMgPSBudWxsO1xuICAgIH1cbiAgfVxuICBpZihsbCA9IHRoaXMuZWF0KFsnWycsICcuJywgJygnXSkpe1xuICAgIHN3aXRjaChsbC50eXBlKXtcbiAgICAgIGNhc2UgJy4nOlxuICAgICAgICAgIC8vIG1lbWJlcihvYmplY3QsIHByb3BlcnR5LCBjb21wdXRlZClcbiAgICAgICAgdmFyIHRtcE5hbWUgPSB0aGlzLm1hdGNoKCdJREVOVCcpLnZhbHVlO1xuICAgICAgICBwcmV2QmFzZSA9IGJhc2U7XG4gICAgICAgIGlmKCB0aGlzLmxhKCkgIT09IFwiKFwiICl7IFxuICAgICAgICAgIGJhc2UgPSBjdHhOYW1lICsgXCIuX3NnXygnXCIgKyB0bXBOYW1lICsgXCInLCBcIiArIGJhc2UgKyBcIilcIjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgYmFzZSArPSBcIlsnXCIgKyB0bXBOYW1lICsgXCInXVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1lbWJlciggYmFzZSwgdG1wTmFtZSwgcGF0aGVzLCAgcHJldkJhc2UpO1xuICAgICAgY2FzZSAnWyc6XG4gICAgICAgICAgLy8gbWVtYmVyKG9iamVjdCwgcHJvcGVydHksIGNvbXB1dGVkKVxuICAgICAgICBwYXRoID0gdGhpcy5hc3NpZ24oKTtcbiAgICAgICAgcHJldkJhc2UgPSBiYXNlO1xuICAgICAgICBpZiggdGhpcy5sYSgpICE9PSBcIihcIiApeyBcbiAgICAgICAgLy8gbWVhbnMgZnVuY3Rpb24gY2FsbCwgd2UgbmVlZCB0aHJvdyB1bmRlZmluZWQgZXJyb3Igd2hlbiBjYWxsIGZ1bmN0aW9uXG4gICAgICAgIC8vIGFuZCBjb25maXJtIHRoYXQgdGhlIGZ1bmN0aW9uIGNhbGwgd29udCBsb3NlIGl0cyBjb250ZXh0XG4gICAgICAgICAgYmFzZSA9IGN0eE5hbWUgKyBcIi5fc2dfKFwiICsgcGF0aC5nZXQgKyBcIiwgXCIgKyBiYXNlICsgXCIpXCI7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGJhc2UgKz0gXCJbXCIgKyBwYXRoLmdldCArIFwiXVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF0Y2goJ10nKVxuICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXIoYmFzZSwgcGF0aCwgcGF0aGVzLCBwcmV2QmFzZSk7XG4gICAgICBjYXNlICcoJzpcbiAgICAgICAgLy8gY2FsbChjYWxsZWUsIGFyZ3MpXG4gICAgICAgIHZhciBhcmdzID0gdGhpcy5hcmd1bWVudHMoKS5qb2luKCcsJyk7XG4gICAgICAgIGJhc2UgPSAgYmFzZStcIihcIiArIGFyZ3MgK1wiKVwiO1xuICAgICAgICB0aGlzLm1hdGNoKCcpJylcbiAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVyKGJhc2UsIG51bGwsIHBhdGhlcyk7XG4gICAgfVxuICB9XG4gIGlmKCBwYXRoZXMgJiYgcGF0aGVzLmxlbmd0aCApIHRoaXMuZGVwZW5kLnB1c2goIHBhdGhlcyApO1xuICB2YXIgcmVzID0gIHtnZXQ6IGJhc2V9O1xuICBpZihsYXN0KXtcbiAgICByZXMuc2V0ID0gY3R4TmFtZSArIFwiLl9zc18oXCIgKyBcbiAgICAgICAgKGxhc3QuZ2V0PyBsYXN0LmdldCA6IFwiJ1wiKyBsYXN0ICsgXCInXCIpICsgXG4gICAgICAgIFwiLFwiKyBfLnNldE5hbWUgKyBcIixcIisgXG4gICAgICAgIChwcmV2QmFzZT9wcmV2QmFzZTpfLnZhck5hbWUpICsgXG4gICAgICAgIFwiLCAnPScsIFwiKyAoIG9ubHlTaW1wbGVBY2Nlc3Nvcj8gMSA6IDAgKSArIFwiKVwiO1xuICBcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIFxuICovXG5vcC5hcmd1bWVudHMgPSBmdW5jdGlvbihlbmQpe1xuICBlbmQgPSBlbmQgfHwgJyknXG4gIHZhciBhcmdzID0gW107XG4gIGRve1xuICAgIGlmKHRoaXMubGEoKSAhPT0gZW5kKXtcbiAgICAgIGFyZ3MucHVzaCh0aGlzLmFzc2lnbigpLmdldClcbiAgICB9XG4gIH13aGlsZSggdGhpcy5lYXQoJywnKSk7XG4gIHJldHVybiBhcmdzXG59XG5cblxuLy8gcHJpbWFyeSA6XG4vLyB0aGlzIFxuLy8gaWRlbnRcbi8vIGxpdGVyYWxcbi8vIGFycmF5XG4vLyBvYmplY3Rcbi8vICggZXhwcmVzc2lvbiApXG5cbm9wLnByaW1hcnkgPSBmdW5jdGlvbigpe1xuICB2YXIgbGwgPSB0aGlzLmxsKCk7XG4gIHN3aXRjaChsbC50eXBlKXtcbiAgICBjYXNlIFwie1wiOlxuICAgICAgcmV0dXJuIHRoaXMub2JqZWN0KCk7XG4gICAgY2FzZSBcIltcIjpcbiAgICAgIHJldHVybiB0aGlzLmFycmF5KCk7XG4gICAgY2FzZSBcIihcIjpcbiAgICAgIHJldHVybiB0aGlzLnBhcmVuKCk7XG4gICAgLy8gbGl0ZXJhbCBvciBpZGVudFxuICAgIGNhc2UgJ1NUUklORyc6XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICAgIHJldHVybiB0aGlzLmdldHNldChcIidcIiArIGxsLnZhbHVlICsgXCInXCIpXG4gICAgY2FzZSAnTlVNQkVSJzpcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0c2V0KFwiXCIrbGwudmFsdWUpO1xuICAgIGNhc2UgXCJJREVOVFwiOlxuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICBpZihpc0tleVdvcmQobGwudmFsdWUpKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0c2V0KCBsbC52YWx1ZSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxsLnZhbHVlO1xuICAgIGRlZmF1bHQ6IFxuICAgICAgdGhpcy5lcnJvcignVW5leHBlY3RlZCBUb2tlbjogJyArIGxsLnR5cGUpO1xuICB9XG59XG5cbi8vIG9iamVjdFxuLy8gIHtwcm9wQXNzaWduIFssIHByb3BBc3NpZ25dICogWyxdfVxuXG4vLyBwcm9wQXNzaWduXG4vLyAgcHJvcCA6IGFzc2lnblxuXG4vLyBwcm9wXG4vLyAgU1RSSU5HXG4vLyAgSURFTlRcbi8vICBOVU1CRVJcblxub3Aub2JqZWN0ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNvZGUgPSBbdGhpcy5tYXRjaCgneycpLnR5cGVdO1xuXG4gIHZhciBsbCA9IHRoaXMuZWF0KCBbJ1NUUklORycsICdJREVOVCcsICdOVU1CRVInXSApO1xuICB3aGlsZShsbCl7XG4gICAgY29kZS5wdXNoKFwiJ1wiICsgbGwudmFsdWUgKyBcIidcIiArIHRoaXMubWF0Y2goJzonKS50eXBlKTtcbiAgICB2YXIgZ2V0ID0gdGhpcy5hc3NpZ24oKS5nZXQ7XG4gICAgY29kZS5wdXNoKGdldCk7XG4gICAgbGwgPSBudWxsO1xuICAgIGlmKHRoaXMuZWF0KFwiLFwiKSAmJiAobGwgPSB0aGlzLmVhdChbJ1NUUklORycsICdJREVOVCcsICdOVU1CRVInXSkpICkgY29kZS5wdXNoKFwiLFwiKTtcbiAgfVxuICBjb2RlLnB1c2godGhpcy5tYXRjaCgnfScpLnR5cGUpO1xuICByZXR1cm4ge2dldDogY29kZS5qb2luKFwiXCIpfVxufVxuXG4vLyBhcnJheVxuLy8gWyBhc3NpZ25bLGFzc2lnbl0qXVxub3AuYXJyYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgY29kZSA9IFt0aGlzLm1hdGNoKCdbJykudHlwZV0sIGl0ZW07XG4gIGlmKCB0aGlzLmVhdChcIl1cIikgKXtcblxuICAgICBjb2RlLnB1c2goXCJdXCIpO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlKGl0ZW0gPSB0aGlzLmFzc2lnbigpKXtcbiAgICAgIGNvZGUucHVzaChpdGVtLmdldCk7XG4gICAgICBpZih0aGlzLmVhdCgnLCcpKSBjb2RlLnB1c2goXCIsXCIpO1xuICAgICAgZWxzZSBicmVhaztcbiAgICB9XG4gICAgY29kZS5wdXNoKHRoaXMubWF0Y2goJ10nKS50eXBlKTtcbiAgfVxuICByZXR1cm4ge2dldDogY29kZS5qb2luKFwiXCIpfTtcbn1cblxuLy8gJygnIGV4cHJlc3Npb24gJyknXG5vcC5wYXJlbiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMubWF0Y2goJygnKTtcbiAgdmFyIHJlcyA9IHRoaXMuZmlsdGVyKClcbiAgcmVzLmdldCA9ICcoJyArIHJlcy5nZXQgKyAnKSc7XG4gIHRoaXMubWF0Y2goJyknKTtcbiAgcmV0dXJuIHJlcztcbn1cblxub3AuZ2V0c2V0ID0gZnVuY3Rpb24oZ2V0LCBzZXQpe1xuICByZXR1cm4ge1xuICAgIGdldDogZ2V0LFxuICAgIHNldDogc2V0XG4gIH1cbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVsZW1lbnQ6IGZ1bmN0aW9uKG5hbWUsIGF0dHJzLCBjaGlsZHJlbil7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdlbGVtZW50JyxcbiAgICAgIHRhZzogbmFtZSxcbiAgICAgIGF0dHJzOiBhdHRycyxcbiAgICAgIGNoaWxkcmVuOiBjaGlsZHJlblxuICAgIH1cbiAgfSxcbiAgYXR0cmlidXRlOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdhdHRyaWJ1dGUnLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH1cbiAgfSxcbiAgXCJpZlwiOiBmdW5jdGlvbih0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnaWYnLFxuICAgICAgdGVzdDogdGVzdCxcbiAgICAgIGNvbnNlcXVlbnQ6IGNvbnNlcXVlbnQsXG4gICAgICBhbHRlcm5hdGU6IGFsdGVybmF0ZVxuICAgIH1cbiAgfSxcbiAgbGlzdDogZnVuY3Rpb24oc2VxdWVuY2UsIHZhcmlhYmxlLCBib2R5KXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2xpc3QnLFxuICAgICAgc2VxdWVuY2U6IHNlcXVlbmNlLFxuICAgICAgdmFyaWFibGU6IHZhcmlhYmxlLFxuICAgICAgYm9keTogYm9keVxuICAgIH1cbiAgfSxcbiAgZXhwcmVzc2lvbjogZnVuY3Rpb24oIGJvZHksIHNldGJvZHksIGNvbnN0YW50ICl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiZXhwcmVzc2lvblwiLFxuICAgICAgYm9keTogYm9keSxcbiAgICAgIGNvbnN0YW50OiBjb25zdGFudCB8fCBmYWxzZSxcbiAgICAgIHNldGJvZHk6IHNldGJvZHkgfHwgZmFsc2VcbiAgICB9XG4gIH0sXG4gIHRleHQ6IGZ1bmN0aW9uKHRleHQpe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgIHRleHQ6IHRleHRcbiAgICB9XG4gIH0sXG4gIHRlbXBsYXRlOiBmdW5jdGlvbih0ZW1wbGF0ZSl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICd0ZW1wbGF0ZScsXG4gICAgICBjb250ZW50OiB0ZW1wbGF0ZVxuICAgIH1cbiAgfVxufVxuIiwicmVxdWlyZSgnLi9oZWxwZXIvc2hpbS5qcycpO1xudmFyIF8gID0gbW9kdWxlLmV4cG9ydHM7XG52YXIgZW50aXRpZXMgPSByZXF1aXJlKCcuL2hlbHBlci9lbnRpdGllcy5qcycpO1xudmFyIHNsaWNlID0gW10uc2xpY2U7XG52YXIgbzJzdHIgPSAoe30pLnRvU3RyaW5nO1xudmFyIHdpbiA9IHR5cGVvZiB3aW5kb3cgIT09J3VuZGVmaW5lZCc/IHdpbmRvdzogZ2xvYmFsO1xuXG5cbl8ubm9vcCA9IGZ1bmN0aW9uKCl7fTtcbl8udWlkID0gKGZ1bmN0aW9uKCl7XG4gIHZhciBfdWlkPTA7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfdWlkKys7XG4gIH1cbn0pKCk7XG5cbl8udmFyTmFtZSA9ICdkJztcbl8uc2V0TmFtZSA9ICdwXyc7XG5fLmN0eE5hbWUgPSAnYyc7XG5fLmV4dE5hbWUgPSAnZSc7XG5cbl8ucldvcmQgPSAvXltcXCRcXHddKyQvO1xuXy5yU2ltcGxlQWNjZXNzb3IgPSAvXltcXCRcXHddKyhcXC5bXFwkXFx3XSspKiQvO1xuXG5fLm5leHRUaWNrID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJz8gXG4gIHNldEltbWVkaWF0ZS5iaW5kKHdpbikgOiBcbiAgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKSBcbiAgfVxuXG5cblxuXy5wcmVmaXggPSBcInZhciBcIiArIF8udmFyTmFtZSArIFwiPVwiICsgXy5jdHhOYW1lICsgXCIuZGF0YTtcIiArICBfLmV4dE5hbWUgICsgXCI9XCIgKyBfLmV4dE5hbWUgKyBcInx8Jyc7XCI7XG5cblxuXy5zbGljZSA9IGZ1bmN0aW9uKG9iaiwgc3RhcnQsIGVuZCl7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yKHZhciBpID0gc3RhcnQgfHwgMCwgbGVuID0gZW5kIHx8IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgdmFyIGl0ZW0gPSBvYmpbaV07XG4gICAgcmVzLnB1c2goaXRlbSlcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5fLnR5cGVPZiA9IGZ1bmN0aW9uIChvKSB7XG4gIHJldHVybiBvID09IG51bGwgPyBTdHJpbmcobykgOiBvMnN0ci5jYWxsKG8pLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5cbl8uZXh0ZW5kID0gZnVuY3Rpb24oIG8xLCBvMiwgb3ZlcnJpZGUgKXtcbiAgaWYoXy50eXBlT2Yob3ZlcnJpZGUpID09PSAnYXJyYXknKXtcbiAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IG92ZXJyaWRlLmxlbmd0aDsgaSA8IGxlbjsgaSsrICl7XG4gICAgdmFyIGtleSA9IG92ZXJyaWRlW2ldO1xuICAgIG8xW2tleV0gPSBvMltrZXldO1xuICAgfSBcbiAgfWVsc2V7XG4gICAgZm9yKHZhciBpIGluIG8yKXtcbiAgICAgIGlmKCB0eXBlb2YgbzFbaV0gPT09IFwidW5kZWZpbmVkXCIgfHwgb3ZlcnJpZGUgPT09IHRydWUgKXtcbiAgICAgICAgbzFbaV0gPSBvMltpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbzE7XG59XG5cbl8ubWFrZVByZWRpY2F0ZSA9IGZ1bmN0aW9uIG1ha2VQcmVkaWNhdGUod29yZHMsIHByZWZpeCkge1xuICAgIGlmICh0eXBlb2Ygd29yZHMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgd29yZHMgPSB3b3Jkcy5zcGxpdChcIiBcIik7XG4gICAgfVxuICAgIHZhciBmID0gXCJcIixcbiAgICBjYXRzID0gW107XG4gICAgb3V0OiBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2F0cy5sZW5ndGg7ICsrail7XG4gICAgICAgICAgaWYgKGNhdHNbal1bMF0ubGVuZ3RoID09PSB3b3Jkc1tpXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2F0c1tqXS5wdXNoKHdvcmRzW2ldKTtcbiAgICAgICAgICAgICAgY29udGludWUgb3V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRzLnB1c2goW3dvcmRzW2ldXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBhcmVUbyhhcnIpIHtcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDEpIHJldHVybiBmICs9IFwicmV0dXJuIHN0ciA9PT0gJ1wiICsgYXJyWzBdICsgXCInO1wiO1xuICAgICAgICBmICs9IFwic3dpdGNoKHN0cil7XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgZiArPSBcImNhc2UgJ1wiICsgYXJyW2ldICsgXCInOlwiO1xuICAgICAgICB9XG4gICAgICAgIGYgKz0gXCJyZXR1cm4gdHJ1ZX1yZXR1cm4gZmFsc2U7XCI7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGVyZSBhcmUgbW9yZSB0aGFuIHRocmVlIGxlbmd0aCBjYXRlZ29yaWVzLCBhbiBvdXRlclxuICAgIC8vIHN3aXRjaCBmaXJzdCBkaXNwYXRjaGVzIG9uIHRoZSBsZW5ndGhzLCB0byBzYXZlIG9uIGNvbXBhcmlzb25zLlxuICAgIGlmIChjYXRzLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgY2F0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgZiArPSBcInN3aXRjaChzdHIubGVuZ3RoKXtcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2F0ID0gY2F0c1tpXTtcbiAgICAgICAgICAgIGYgKz0gXCJjYXNlIFwiICsgY2F0WzBdLmxlbmd0aCArIFwiOlwiO1xuICAgICAgICAgICAgY29tcGFyZVRvKGNhdCk7XG4gICAgICAgIH1cbiAgICAgICAgZiArPSBcIn1cIjtcblxuICAgICAgICAvLyBPdGhlcndpc2UsIHNpbXBseSBnZW5lcmF0ZSBhIGZsYXQgYHN3aXRjaGAgc3RhdGVtZW50LlxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBhcmVUbyh3b3Jkcyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJzdHJcIiwgZik7XG59XG5cblxuXy50cmFja0Vycm9yUG9zID0gKGZ1bmN0aW9uICgpe1xuICAvLyBsaW5lYnJlYWtcbiAgdmFyIGxiID0gL1xcclxcbnxbXFxuXFxyXFx1MjAyOFxcdTIwMjldL2c7XG4gIGZ1bmN0aW9uIGZpbmRMaW5lKGxpbmVzLCBwb3Mpe1xuICAgIHZhciB0bXBMZW4gPSAwO1xuICAgIGZvcih2YXIgaSA9IDAsbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgdmFyIGxpbmVMZW4gPSAobGluZXNbaV0gfHwgXCJcIikubGVuZ3RoO1xuICAgICAgaWYodG1wTGVuICsgbGluZUxlbiA+IHBvcykgcmV0dXJuIHtudW06IGksIGxpbmU6IGxpbmVzW2ldLCBzdGFydDogcG9zIC0gdG1wTGVufTtcbiAgICAgIC8vIDEgaXMgZm9yIHRoZSBsaW5lYnJlYWtcbiAgICAgIHRtcExlbiA9IHRtcExlbiArIGxpbmVMZW4gKyAxO1xuICAgIH1cbiAgICBcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQsIHBvcyl7XG4gICAgaWYocG9zID4gaW5wdXQubGVuZ3RoLTEpIHBvcyA9IGlucHV0Lmxlbmd0aC0xO1xuICAgIGxiLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIGxpbmVzID0gaW5wdXQuc3BsaXQobGIpO1xuICAgIHZhciBsaW5lID0gZmluZExpbmUobGluZXMscG9zKTtcbiAgICB2YXIgbGVuID0gbGluZS5saW5lLmxlbmd0aDtcblxuICAgIHZhciBtaW4gPSBsaW5lLnN0YXJ0IC0gMTA7XG4gICAgaWYobWluIDwgMCkgbWluID0gMDtcblxuICAgIHZhciBtYXggPSBsaW5lLnN0YXJ0ICsgMTA7XG4gICAgaWYobWF4ID4gbGVuKSBtYXggPSBsZW47XG5cbiAgICB2YXIgcmVtYWluID0gbGluZS5saW5lLnNsaWNlKG1pbiwgbWF4KTtcbiAgICB2YXIgcHJlZml4ID0gKGxpbmUubnVtKzEpICsgXCI+IFwiICsgKG1pbiA+IDA/IFwiLi4uXCIgOiBcIlwiKVxuICAgIHZhciBwb3N0Zml4ID0gbWF4IDwgbGVuID8gXCIuLi5cIjogXCJcIjtcblxuICAgIHJldHVybiBwcmVmaXggKyByZW1haW4gKyBwb3N0Zml4ICsgXCJcXG5cIiArIG5ldyBBcnJheShsaW5lLnN0YXJ0ICsgcHJlZml4Lmxlbmd0aCArIDEpLmpvaW4oXCIgXCIpICsgXCJeXCI7XG4gIH1cbn0pKCk7XG5cblxudmFyIGlnbm9yZWRSZWYgPSAvXFwoKFxcP1xcIXxcXD9cXDp8XFw/XFw9KS9nO1xuXy5maW5kU3ViQ2FwdHVyZSA9IGZ1bmN0aW9uIChyZWdTdHIpIHtcbiAgdmFyIGxlZnQgPSAwLFxuICAgIHJpZ2h0ID0gMCxcbiAgICBsZW4gPSByZWdTdHIubGVuZ3RoLFxuICAgIGlnbm9yZWQgPSByZWdTdHIubWF0Y2goaWdub3JlZFJlZik7IC8vIGlnbm9yZWQgdW5jYXB0dXJlXG4gIGlmKGlnbm9yZWQpIGlnbm9yZWQgPSBpZ25vcmVkLmxlbmd0aFxuICBlbHNlIGlnbm9yZWQgPSAwO1xuICBmb3IgKDsgbGVuLS07KSB7XG4gICAgdmFyIGxldHRlciA9IHJlZ1N0ci5jaGFyQXQobGVuKTtcbiAgICBpZiAobGVuID09PSAwIHx8IHJlZ1N0ci5jaGFyQXQobGVuIC0gMSkgIT09IFwiXFxcXFwiICkgeyBcbiAgICAgIGlmIChsZXR0ZXIgPT09IFwiKFwiKSBsZWZ0Kys7XG4gICAgICBpZiAobGV0dGVyID09PSBcIilcIikgcmlnaHQrKztcbiAgICB9XG4gIH1cbiAgaWYgKGxlZnQgIT09IHJpZ2h0KSB0aHJvdyBcIlJlZ0V4cDogXCIrIHJlZ1N0ciArIFwiJ3MgYnJhY2tldCBpcyBub3QgbWFyY2hlZFwiO1xuICBlbHNlIHJldHVybiBsZWZ0IC0gaWdub3JlZDtcbn07XG5cblxuXy5lc2NhcGVSZWdFeHAgPSBmdW5jdGlvbiggc3RyKXsvLyBDcmVkaXQ6IFhSZWdFeHAgMC42LjEgKGMpIDIwMDctMjAwOCBTdGV2ZW4gTGV2aXRoYW4gPGh0dHA6Ly9zdGV2ZW5sZXZpdGhhbi5jb20vcmVnZXgveHJlZ2V4cC8+IE1JVCBMaWNlbnNlXG4gIHJldHVybiBzdHIucmVwbGFjZSgvWy1bXFxde30oKSorPy5cXFxcXiR8LCNcXHNdL2csIGZ1bmN0aW9uKG1hdGNoKXtcbiAgICByZXR1cm4gJ1xcXFwnICsgbWF0Y2g7XG4gIH0pO1xufTtcblxuXG52YXIgckVudGl0eSA9IG5ldyBSZWdFeHAoXCImKFwiICsgT2JqZWN0LmtleXMoZW50aXRpZXMpLmpvaW4oJ3wnKSArICcpOycsICdnaScpO1xuXG5fLmNvbnZlcnRFbnRpdHkgPSBmdW5jdGlvbihjaHIpe1xuXG4gIHJldHVybiAoXCJcIiArIGNocikucmVwbGFjZShyRW50aXR5LCBmdW5jdGlvbihhbGwsIGNhcHR1cmUpe1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGVudGl0aWVzW2NhcHR1cmVdKVxuICB9KTtcblxufVxuXG5cbi8vIHNpbXBsZSBnZXQgYWNjZXNzb3JcblxuXy5jcmVhdGVPYmplY3QgPSBmdW5jdGlvbihvLCBwcm9wcyl7XG4gICAgZnVuY3Rpb24gRm9vKCkge31cbiAgICBGb28ucHJvdG90eXBlID0gbztcbiAgICB2YXIgcmVzID0gbmV3IEZvbztcbiAgICBpZihwcm9wcykgXy5leHRlbmQocmVzLCBwcm9wcyk7XG4gICAgcmV0dXJuIHJlcztcbn1cblxuXy5jcmVhdGVQcm90byA9IGZ1bmN0aW9uKGZuLCBvKXtcbiAgICBmdW5jdGlvbiBGb28oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBmbjt9XG4gICAgRm9vLnByb3RvdHlwZSA9IG87XG4gICAgcmV0dXJuIChmbi5wcm90b3R5cGUgPSBuZXcgRm9vKCkpO1xufVxuXG5cbi8qKlxuY2xvbmVcbiovXG5fLmNsb25lID0gZnVuY3Rpb24gY2xvbmUob2JqKXtcbiAgICB2YXIgdHlwZSA9IF8udHlwZU9mKG9iaik7XG4gICAgaWYodHlwZSA9PT0gJ2FycmF5Jyl7XG4gICAgICB2YXIgY2xvbmVkID0gW107XG4gICAgICBmb3IodmFyIGk9MCxsZW4gPSBvYmoubGVuZ3RoOyBpPCBsZW47aSsrKXtcbiAgICAgICAgY2xvbmVkW2ldID0gb2JqW2ldXG4gICAgICB9XG4gICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cbiAgICBpZih0eXBlID09PSAnb2JqZWN0Jyl7XG4gICAgICB2YXIgY2xvbmVkID0ge307XG4gICAgICBmb3IodmFyIGkgaW4gb2JqKSBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgICBjbG9uZWRbaV0gPSBvYmpbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cblxuXy5lcXVhbHMgPSBmdW5jdGlvbihub3csIG9sZCl7XG4gIGlmKCBBcnJheS5pc0FycmF5KG5vdykgKXtcbiAgICB2YXIgc3BsaWNlcyA9IGxkKG5vdywgb2xkfHxbXSk7XG4gICAgcmV0dXJuIHNwbGljZXM7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygbm93O1xuICBpZih0eXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygb2xkID09PSAnbnVtYmVyJyYmIGlzTmFOKG5vdykgJiYgaXNOYU4ob2xkKSkgcmV0dXJuIHRydWVcbiAgcmV0dXJuIG5vdyA9PT0gb2xkO1xufVxuXG5cbi8vTGV2ZW5zaHRlaW5fZGlzdGFuY2Vcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8xLiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldmVuc2h0ZWluX2Rpc3RhbmNlXG4vLzIuIGdpdGh1Yi5jb206cG9seW1lci9vYnNlcnZlLWpzXG5cbnZhciBsZCA9IChmdW5jdGlvbigpe1xuICBmdW5jdGlvbiBlcXVhbHMoYSxiKXtcbiAgICByZXR1cm4gYSA9PT0gYjtcbiAgfVxuICBmdW5jdGlvbiBsZChhcnJheTEsIGFycmF5Mil7XG4gICAgdmFyIG4gPSBhcnJheTEubGVuZ3RoO1xuICAgIHZhciBtID0gYXJyYXkyLmxlbmd0aDtcbiAgICB2YXIgbWF0cml4ID0gW107XG4gICAgZm9yKHZhciBpID0gMDsgaSA8PSBuOyBpKyspe1xuICAgICAgbWF0cml4LnB1c2goW2ldKTtcbiAgICB9XG4gICAgZm9yKHZhciBqPTE7ajw9bTtqKyspe1xuICAgICAgbWF0cml4WzBdW2pdPWo7XG4gICAgfVxuICAgIGZvcih2YXIgaSA9IDE7IGkgPD0gbjsgaSsrKXtcbiAgICAgIGZvcih2YXIgaiA9IDE7IGogPD0gbTsgaisrKXtcbiAgICAgICAgaWYoZXF1YWxzKGFycmF5MVtpLTFdLCBhcnJheTJbai0xXSkpe1xuICAgICAgICAgIG1hdHJpeFtpXVtqXSA9IG1hdHJpeFtpLTFdW2otMV07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIG1hdHJpeFtpXVtqXSA9IE1hdGgubWluKFxuICAgICAgICAgICAgbWF0cml4W2ktMV1bal0rMSwgLy9kZWxldGVcbiAgICAgICAgICAgIG1hdHJpeFtpXVtqLTFdKzEvL2FkZFxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRyaXg7XG4gIH1cbiAgZnVuY3Rpb24gd2hvbGUoYXJyMiwgYXJyMSkge1xuICAgICAgdmFyIG1hdHJpeCA9IGxkKGFycjEsIGFycjIpXG4gICAgICB2YXIgbiA9IGFycjEubGVuZ3RoO1xuICAgICAgdmFyIGkgPSBuO1xuICAgICAgdmFyIG0gPSBhcnIyLmxlbmd0aDtcbiAgICAgIHZhciBqID0gbTtcbiAgICAgIHZhciBlZGl0cyA9IFtdO1xuICAgICAgdmFyIGN1cnJlbnQgPSBtYXRyaXhbaV1bal07XG4gICAgICB3aGlsZShpPjAgfHwgaj4wKXtcbiAgICAgIC8vIHRoZSBsYXN0IGxpbmVcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBlZGl0cy51bnNoaWZ0KDMpO1xuICAgICAgICAgIGotLTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGUgbGFzdCBjb2xcbiAgICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgICBlZGl0cy51bnNoaWZ0KDIpO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9ydGhXZXN0ID0gbWF0cml4W2kgLSAxXVtqIC0gMV07XG4gICAgICAgIHZhciB3ZXN0ID0gbWF0cml4W2kgLSAxXVtqXTtcbiAgICAgICAgdmFyIG5vcnRoID0gbWF0cml4W2ldW2ogLSAxXTtcblxuICAgICAgICB2YXIgbWluID0gTWF0aC5taW4obm9ydGgsIHdlc3QsIG5vcnRoV2VzdCk7XG5cbiAgICAgICAgaWYgKG1pbiA9PT0gd2VzdCkge1xuICAgICAgICAgIGVkaXRzLnVuc2hpZnQoMik7IC8vZGVsZXRlXG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIGN1cnJlbnQgPSB3ZXN0O1xuICAgICAgICB9IGVsc2UgaWYgKG1pbiA9PT0gbm9ydGhXZXN0ICkge1xuICAgICAgICAgIGlmIChub3J0aFdlc3QgPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGVkaXRzLnVuc2hpZnQoMCk7IC8vbm8gY2hhbmdlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRzLnVuc2hpZnQoMSk7IC8vdXBkYXRlXG4gICAgICAgICAgICBjdXJyZW50ID0gbm9ydGhXZXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpLS07XG4gICAgICAgICAgai0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVkaXRzLnVuc2hpZnQoMyk7IC8vYWRkXG4gICAgICAgICAgai0tO1xuICAgICAgICAgIGN1cnJlbnQgPSBub3J0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIExFQVZFID0gMDtcbiAgICAgIHZhciBBREQgPSAzO1xuICAgICAgdmFyIERFTEVMRSA9IDI7XG4gICAgICB2YXIgVVBEQVRFID0gMTtcbiAgICAgIHZhciBuID0gMDttPTA7XG4gICAgICB2YXIgc3RlcHMgPSBbXTtcbiAgICAgIHZhciBzdGVwID0ge2luZGV4OiBudWxsLCBhZGQ6MCwgcmVtb3ZlZDpbXX07XG5cbiAgICAgIGZvcih2YXIgaT0wO2k8ZWRpdHMubGVuZ3RoO2krKyl7XG4gICAgICAgIGlmKGVkaXRzW2ldID4gMCApeyAvLyBOT1QgTEVBVkVcbiAgICAgICAgICBpZihzdGVwLmluZGV4ID09PSBudWxsKXtcbiAgICAgICAgICAgIHN0ZXAuaW5kZXggPSBtO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy9MRUFWRVxuICAgICAgICAgIGlmKHN0ZXAuaW5kZXggIT0gbnVsbCl7XG4gICAgICAgICAgICBzdGVwcy5wdXNoKHN0ZXApXG4gICAgICAgICAgICBzdGVwID0ge2luZGV4OiBudWxsLCBhZGQ6MCwgcmVtb3ZlZDpbXX07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaChlZGl0c1tpXSl7XG4gICAgICAgICAgY2FzZSBMRUFWRTpcbiAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgIG0rKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQUREOlxuICAgICAgICAgICAgc3RlcC5hZGQrKztcbiAgICAgICAgICAgIG0rKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgREVMRUxFOlxuICAgICAgICAgICAgc3RlcC5yZW1vdmVkLnB1c2goYXJyMVtuXSlcbiAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVVBEQVRFOlxuICAgICAgICAgICAgc3RlcC5hZGQrKztcbiAgICAgICAgICAgIHN0ZXAucmVtb3ZlZC5wdXNoKGFycjFbbl0pXG4gICAgICAgICAgICBuKys7XG4gICAgICAgICAgICBtKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoc3RlcC5pbmRleCAhPSBudWxsKXtcbiAgICAgICAgc3RlcHMucHVzaChzdGVwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN0ZXBzXG4gICAgfVxuICAgIHJldHVybiB3aG9sZTtcbiAgfSkoKTtcblxuXG5cbl8udGhyb3R0bGUgPSBmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KXtcbiAgdmFyIHdhaXQgPSB3YWl0IHx8IDEwMDtcbiAgdmFyIGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcbiAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICB2YXIgcHJldmlvdXMgPSAwO1xuICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICBwcmV2aW91cyA9ICtuZXcgRGF0ZTtcbiAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBub3cgPSArIG5ldyBEYXRlO1xuICAgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICBjb250ZXh0ID0gdGhpcztcbiAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKCF0aW1lb3V0KSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cbi8vIGhvZ2FuIGVzY2FwZVxuLy8gPT09PT09PT09PT09PT1cbl8uZXNjYXBlID0gKGZ1bmN0aW9uKCl7XG4gIHZhciByQW1wID0gLyYvZyxcbiAgICAgIHJMdCA9IC88L2csXG4gICAgICByR3QgPSAvPi9nLFxuICAgICAgckFwb3MgPSAvXFwnL2csXG4gICAgICByUXVvdCA9IC9cXFwiL2csXG4gICAgICBoQ2hhcnMgPSAvWyY8PlxcXCJcXCddLztcblxuICByZXR1cm4gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIGhDaGFycy50ZXN0KHN0cikgP1xuICAgICAgc3RyXG4gICAgICAgIC5yZXBsYWNlKHJBbXAsICcmYW1wOycpXG4gICAgICAgIC5yZXBsYWNlKHJMdCwgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZShyR3QsICcmZ3Q7JylcbiAgICAgICAgLnJlcGxhY2UockFwb3MsICcmIzM5OycpXG4gICAgICAgIC5yZXBsYWNlKHJRdW90LCAnJnF1b3Q7JykgOlxuICAgICAgc3RyO1xuICB9XG59KSgpO1xuXG5fLmNhY2hlID0gZnVuY3Rpb24obWF4KXtcbiAgbWF4ID0gbWF4IHx8IDEwMDA7XG4gIHZhciBrZXlzID0gW10sXG4gICAgICBjYWNoZSA9IHt9O1xuICByZXR1cm4ge1xuICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGtleXMubGVuZ3RoID4gdGhpcy5tYXgpIHtcbiAgICAgICAgY2FjaGVba2V5cy5zaGlmdCgpXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIC8vIFxuICAgICAgaWYoY2FjaGVba2V5XSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgICBjYWNoZVtrZXldID0gdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gY2FjaGU7XG4gICAgICByZXR1cm4gY2FjaGVba2V5XTtcbiAgICB9LFxuICAgIG1heDogbWF4LFxuICAgIGxlbjpmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGtleXMubGVuZ3RoO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gLy8gc2V0dXAgdGhlIHJhdyBFeHByZXNzaW9uXG4vLyBfLnRvdWNoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKGV4cHIpe1xuLy8gICBpZihleHByLnR5cGUgPT09ICdleHByZXNzaW9uJyl7XG4vLyAgIH1cbi8vICAgcmV0dXJuIGV4cHI7XG4vLyB9XG5cblxuLy8gaGFuZGxlIHRoZSBzYW1lIGxvZ2ljIG9uIGNvbXBvbmVudCdzIGBvbi0qYCBhbmQgZWxlbWVudCdzIGBvbi0qYFxuLy8gcmV0dXJuIHRoZSBmaXJlIG9iamVjdFxuXy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKHZhbHVlLCB0eXBlICl7XG4gIHZhciBzZWxmID0gdGhpcywgZXZhbHVhdGU7XG4gIGlmKHZhbHVlLnR5cGUgPT09ICdleHByZXNzaW9uJyl7IC8vIGlmIGlzIGV4cHJlc3Npb24sIGdvIGV2YWx1YXRlZCB3YXlcbiAgICBldmFsdWF0ZSA9IHZhbHVlLmdldDtcbiAgfVxuICBpZihldmFsdWF0ZSl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZpcmUob2JqKXtcbiAgICAgIHNlbGYuZGF0YS4kZXZlbnQgPSBvYmo7XG4gICAgICB2YXIgcmVzID0gZXZhbHVhdGUoc2VsZik7XG4gICAgICBpZihyZXMgPT09IGZhbHNlICYmIG9iaiAmJiBvYmoucHJldmVudERlZmF1bHQpIG9iai5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2VsZi5kYXRhLiRldmVudCA9IHVuZGVmaW5lZDtcbiAgICAgIHNlbGYuJHVwZGF0ZSgpO1xuICAgIH1cbiAgfWVsc2V7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZpcmUoKXtcbiAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpICAgICAgXG4gICAgICBhcmdzLnVuc2hpZnQodmFsdWUpO1xuICAgICAgc2VsZi4kZW1pdC5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIHNlbGYuJHVwZGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBvbmx5IGNhbGwgb25jZVxuXy5vbmNlID0gZnVuY3Rpb24oZm4pe1xuICB2YXIgdGltZSA9IDA7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIGlmKCB0aW1lKysgPT09IDApIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuXG5cbl8ubG9nID0gZnVuY3Rpb24obXNnLCB0eXBlKXtcbiAgaWYodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpICBjb25zb2xlW3R5cGUgfHwgXCJsb2dcIl0obXNnKTtcbn1cblxuXG5cblxuLy9odHRwOi8vd3d3LnczLm9yZy9odG1sL3dnL2RyYWZ0cy9odG1sL21hc3Rlci9zaW5nbGUtcGFnZS5odG1sI3ZvaWQtZWxlbWVudHNcbl8uaXNWb2lkVGFnID0gXy5tYWtlUHJlZGljYXRlKFwiYXJlYSBiYXNlIGJyIGNvbCBlbWJlZCBociBpbWcgaW5wdXQga2V5Z2VuIGxpbmsgbWVudWl0ZW0gbWV0YSBwYXJhbSBzb3VyY2UgdHJhY2sgd2JyIHItY29udGVudFwiKTtcbl8uaXNCb29sZWFuQXR0ciA9IF8ubWFrZVByZWRpY2F0ZSgnc2VsZWN0ZWQgY2hlY2tlZCBkaXNhYmxlZCByZWFkT25seSByZXF1aXJlZCBvcGVuIGF1dG9mb2N1cyBjb250cm9scyBhdXRvcGxheSBjb21wYWN0IGxvb3AgZGVmZXIgbXVsdGlwbGUnKTtcblxuXy5pc0ZhbHNlIC0gZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2V9XG5fLmlzVHJ1ZSAtIGZ1bmN0aW9uKCl7cmV0dXJuIHRydWV9XG5cblxuXy5hc3NlcnQgPSBmdW5jdGlvbih0ZXN0LCBtc2cpe1xuICBpZighdGVzdCkgdGhyb3cgbXNnO1xufVxuXG4iLCJ2YXIgbm9kZSA9IHJlcXVpcmUoXCIuL3BhcnNlci9ub2RlLmpzXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuL2RvbS5qc1wiKTtcbnZhciBhbmltYXRlID0gcmVxdWlyZShcIi4vaGVscGVyL2FuaW1hdGUuanNcIik7XG52YXIgR3JvdXAgPSByZXF1aXJlKCcuL2dyb3VwLmpzJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIGNvbWJpbmUgPSByZXF1aXJlKCcuL2hlbHBlci9jb21iaW5lLmpzJyk7XG5cbnZhciB3YWxrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxud2Fsa2Vycy5saXN0ID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcblxuICB2YXIgUmVndWxhciA9IHdhbGtlcnMuUmVndWxhcjsgIFxuICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiUmVndWxhciBsaXN0XCIpLFxuICAgIG5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlLFxuICAgIGV4dHJhID0gb3B0aW9ucy5leHRyYTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgZ3JvdXAucHVzaChwbGFjZWhvbGRlcik7XG4gIHZhciBpbmRleE5hbWUgPSBhc3QudmFyaWFibGUgKyAnX2luZGV4JztcbiAgdmFyIHZhcmlhYmxlID0gYXN0LnZhcmlhYmxlO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZShuZXdWYWx1ZSwgc3BsaWNlcyl7XG4gICAgaWYoIW5ld1ZhbHVlKSB7XG4gICAgICBuZXdWYWx1ZSA9IFtdO1xuICAgICAgc3BsaWNlcyA9IF8uZXF1YWxzKG5ld1ZhbHVlLCBzcGxpY2VzKTtcbiAgICB9XG4gICAgXG4gICAgaWYoIXNwbGljZXMgfHwgIXNwbGljZXMubGVuZ3RoKSByZXR1cm47XG4gICAgdmFyIGN1ciA9IHBsYWNlaG9sZGVyO1xuICAgIHZhciBtID0gMCwgbGVuID0gbmV3VmFsdWUubGVuZ3RoLFxuICAgICAgbUluZGV4ID0gc3BsaWNlc1swXS5pbmRleDtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzcGxpY2VzLmxlbmd0aDsgaSsrKXsgLy9pbml0XG4gICAgICB2YXIgc3BsaWNlID0gc3BsaWNlc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IHNwbGljZS5pbmRleDsgLy8gYmVhY3VzZSB3ZSB1c2UgYSBjb21tZW50IGZvciBwbGFjZWhvbGRlclxuXG4gICAgICBmb3IodmFyIGsgPSBtOyBrIDwgaW5kZXg7IGsrKyl7IC8vIG5vIGNoYW5nZVxuICAgICAgICB2YXIgc2VjdCA9IGdyb3VwLmdldCggayArIDEgKTtcbiAgICAgICAgc2VjdC5kYXRhW2luZGV4TmFtZV0gPSBrO1xuICAgICAgfVxuICAgICAgZm9yKHZhciBqID0gMCwgamxlbiA9IHNwbGljZS5yZW1vdmVkLmxlbmd0aDsgajwgamxlbjsgaisrKXsgLy9yZW1vdmVkXG4gICAgICAgIHZhciByZW1vdmVkID0gZ3JvdXAuY2hpbGRyZW4uc3BsaWNlKCBpbmRleCArIDEsIDEpWzBdO1xuICAgICAgICByZW1vdmVkLmRlc3Ryb3kodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZvcih2YXIgbyA9IGluZGV4OyBvIDwgaW5kZXggKyBzcGxpY2UuYWRkOyBvKyspeyAvL2FkZFxuICAgICAgICAvLyBwcm90b3R5cGUgaW5oZXJpdFxuICAgICAgICB2YXIgaXRlbSA9IG5ld1ZhbHVlW29dO1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhW2luZGV4TmFtZV0gPSBvO1xuICAgICAgICBkYXRhW3ZhcmlhYmxlXSA9IGl0ZW07XG5cbiAgICAgICAgXy5leHRlbmQoZGF0YSwgZXh0cmEpO1xuICAgICAgICB2YXIgc2VjdGlvbiA9IHNlbGYuJGNvbXBpbGUoYXN0LmJvZHksIHtcbiAgICAgICAgICBleHRyYTogZGF0YSxcbiAgICAgICAgICBuYW1lc3BhY2U6bmFtZXNwYWNlLFxuICAgICAgICAgIHJlY29yZDogdHJ1ZSxcbiAgICAgICAgICBvdXRlcjogb3B0aW9ucy5vdXRlclxuICAgICAgICB9KVxuICAgICAgICBzZWN0aW9uLmRhdGEgPSBkYXRhO1xuICAgICAgICAvLyBhdXRvbGlua1xuICAgICAgICB2YXIgaW5zZXJ0ID0gIGNvbWJpbmUubGFzdChncm91cC5nZXQobykpO1xuICAgICAgICBpZihpbnNlcnQucGFyZW50Tm9kZSl7XG4gICAgICAgICAgYW5pbWF0ZS5pbmplY3QoY29tYmluZS5ub2RlKHNlY3Rpb24pLGluc2VydCwgJ2FmdGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW5zZXJ0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbWJpbmUubm9kZShzZWN0aW9uKSwgaW5zZXJ0Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgZ3JvdXAuY2hpbGRyZW4uc3BsaWNlKCBvICsgMSAsIDAsIHNlY3Rpb24pO1xuICAgICAgfVxuICAgICAgbSA9IGluZGV4ICsgc3BsaWNlLmFkZCAtIHNwbGljZS5yZW1vdmVkLmxlbmd0aDtcbiAgICAgIG0gID0gbSA8IDA/IDAgOiBtO1xuXG4gICAgfVxuICAgIGlmKG0gPCBsZW4pe1xuICAgICAgZm9yKHZhciBpID0gbTsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgdmFyIHBhaXIgPSBncm91cC5nZXQoaSArIDEpO1xuICAgICAgICBwYWlyLmRhdGFbaW5kZXhOYW1lXSA9IGk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy4kd2F0Y2goYXN0LnNlcXVlbmNlLCB1cGRhdGUsIHsgaW5pdDogdHJ1ZSB9KTtcbiAgcmV0dXJuIGdyb3VwO1xufVxuLy8geyNpbmNsdWRlIH1cbndhbGtlcnMudGVtcGxhdGUgPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICB2YXIgY29udGVudCA9IGFzdC5jb250ZW50LCBjb21waWxlZDtcbiAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnaW5sY3VkZScpO1xuICB2YXIgY29tcGlsZWQsIG5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlLCBleHRyYSA9IG9wdGlvbnMuZXh0cmE7XG4gIC8vIHZhciBmcmFnbWVudCA9IGRvbS5mcmFnbWVudCgpO1xuICAvLyBmcmFnbWVudC5hcHBlbmRDaGlsZChwbGFjZWhvbGRlcik7XG4gIHZhciBncm91cCA9IG5ldyBHcm91cCgpO1xuICBncm91cC5wdXNoKHBsYWNlaG9sZGVyKTtcbiAgaWYoY29udGVudCl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuJHdhdGNoKGNvbnRlbnQsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKCBjb21waWxlZCA9IGdyb3VwLmdldCgxKSl7XG4gICAgICAgIGNvbXBpbGVkLmRlc3Ryb3kodHJ1ZSk7IFxuICAgICAgICBncm91cC5jaGlsZHJlbi5wb3AoKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwLnB1c2goIGNvbXBpbGVkID0gIHNlbGYuJGNvbXBpbGUodmFsdWUsIHtyZWNvcmQ6IHRydWUsIG91dGVyOiBvcHRpb25zLm91dGVyLG5hbWVzcGFjZTogbmFtZXNwYWNlLCBleHRyYTogZXh0cmF9KSApOyBcbiAgICAgIGlmKHBsYWNlaG9sZGVyLnBhcmVudE5vZGUpIGFuaW1hdGUuaW5qZWN0KGNvbWJpbmUubm9kZShjb21waWxlZCksIHBsYWNlaG9sZGVyLCAnYmVmb3JlJylcbiAgICB9LCB7XG4gICAgICBpbml0OiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGdyb3VwO1xufTtcblxuXG4vLyBob3cgdG8gcmVzb2x2ZSB0aGlzIHByb2JsZW1cbnZhciBpaSA9IDA7XG53YWxrZXJzWydpZiddID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcbiAgdmFyIHNlbGYgPSB0aGlzLCBjb25zZXF1ZW50LCBhbHRlcm5hdGUsIGV4dHJhID0gb3B0aW9ucy5leHRyYTtcbiAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmVsZW1lbnQpeyAvLyBhdHRyaWJ1dGUgaW50ZXBsYXRpb25cbiAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24obnZhbHVlKXtcbiAgICAgIGlmKCEhbnZhbHVlKXtcbiAgICAgICAgaWYoYWx0ZXJuYXRlKSBjb21iaW5lLmRlc3Ryb3koYWx0ZXJuYXRlKVxuICAgICAgICBpZihhc3QuY29uc2VxdWVudCkgY29uc2VxdWVudCA9IHNlbGYuJGNvbXBpbGUoYXN0LmNvbnNlcXVlbnQsIHtyZWNvcmQ6IHRydWUsIGVsZW1lbnQ6IG9wdGlvbnMuZWxlbWVudCAsIGV4dHJhOmV4dHJhfSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaWYoY29uc2VxdWVudCkgY29tYmluZS5kZXN0cm95KGNvbnNlcXVlbnQpXG4gICAgICAgIGlmKGFzdC5hbHRlcm5hdGUpIGFsdGVybmF0ZSA9IHNlbGYuJGNvbXBpbGUoYXN0LmFsdGVybmF0ZSwge3JlY29yZDogdHJ1ZSwgZWxlbWVudDogb3B0aW9ucy5lbGVtZW50LCBleHRyYTogZXh0cmF9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy4kd2F0Y2goYXN0LnRlc3QsIHVwZGF0ZSwgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoY29uc2VxdWVudCkgY29tYmluZS5kZXN0cm95KGNvbnNlcXVlbnQpO1xuICAgICAgICBlbHNlIGlmKGFsdGVybmF0ZSkgY29tYmluZS5kZXN0cm95KGFsdGVybmF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSwgbm9kZTtcbiAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlJlZ3VsYXIgaWZcIiArIGlpKyspO1xuICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgZ3JvdXAucHVzaChwbGFjZWhvbGRlcik7XG4gIHZhciBwcmVWYWx1ZSA9IG51bGwsIG5hbWVzcGFjZT0gb3B0aW9ucy5uYW1lc3BhY2U7XG5cblxuICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKG52YWx1ZSwgb2xkKXtcbiAgICB2YXIgdmFsdWUgPSAhIW52YWx1ZTtcbiAgICBpZih2YWx1ZSA9PT0gcHJlVmFsdWUpIHJldHVybjtcbiAgICBwcmVWYWx1ZSA9IHZhbHVlO1xuICAgIGlmKGdyb3VwLmNoaWxkcmVuWzFdKXtcbiAgICAgIGdyb3VwLmNoaWxkcmVuWzFdLmRlc3Ryb3kodHJ1ZSk7XG4gICAgICBncm91cC5jaGlsZHJlbi5wb3AoKTtcbiAgICB9XG4gICAgaWYodmFsdWUpeyAvL3RydWVcbiAgICAgIGlmKGFzdC5jb25zZXF1ZW50ICYmIGFzdC5jb25zZXF1ZW50Lmxlbmd0aCl7XG4gICAgICAgIGNvbnNlcXVlbnQgPSBzZWxmLiRjb21waWxlKCBhc3QuY29uc2VxdWVudCAsIHtyZWNvcmQ6dHJ1ZSwgb3V0ZXI6IG9wdGlvbnMub3V0ZXIsbmFtZXNwYWNlOiBuYW1lc3BhY2UsIGV4dHJhOmV4dHJhIH0pXG4gICAgICAgIC8vIHBsYWNlaG9sZGVyLnBhcmVudE5vZGUgJiYgcGxhY2Vob2xkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIG5vZGUsIHBsYWNlaG9sZGVyICk7XG4gICAgICAgIGdyb3VwLnB1c2goY29uc2VxdWVudCk7XG4gICAgICAgIGlmKHBsYWNlaG9sZGVyLnBhcmVudE5vZGUpe1xuICAgICAgICAgIGFuaW1hdGUuaW5qZWN0KGNvbWJpbmUubm9kZShjb25zZXF1ZW50KSwgcGxhY2Vob2xkZXIsICdiZWZvcmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1lbHNleyAvL2ZhbHNlXG4gICAgICBpZihhc3QuYWx0ZXJuYXRlICYmIGFzdC5hbHRlcm5hdGUubGVuZ3RoKXtcbiAgICAgICAgYWx0ZXJuYXRlID0gc2VsZi4kY29tcGlsZShhc3QuYWx0ZXJuYXRlLCB7cmVjb3JkOnRydWUsIG91dGVyOiBvcHRpb25zLm91dGVyLG5hbWVzcGFjZTogbmFtZXNwYWNlLCBleHRyYTpleHRyYX0pO1xuICAgICAgICBncm91cC5wdXNoKGFsdGVybmF0ZSk7XG4gICAgICAgIGlmKHBsYWNlaG9sZGVyLnBhcmVudE5vZGUpe1xuICAgICAgICAgIGFuaW1hdGUuaW5qZWN0KGNvbWJpbmUubm9kZShhbHRlcm5hdGUpLCBwbGFjZWhvbGRlciwgJ2JlZm9yZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHRoaXMuJHdhdGNoKGFzdC50ZXN0LCB1cGRhdGUsIHtmb3JjZTogdHJ1ZSwgaW5pdDogdHJ1ZX0pO1xuXG4gIHJldHVybiBncm91cDtcbn1cblxuXG53YWxrZXJzLmV4cHJlc3Npb24gPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO1xuICB0aGlzLiR3YXRjaChhc3QsIGZ1bmN0aW9uKG5ld3ZhbCl7XG4gICAgZG9tLnRleHQobm9kZSwgXCJcIiArIChuZXd2YWwgPT0gbnVsbD8gXCJcIjogXCJcIiArIG5ld3ZhbCkgKTtcbiAgfSlcbiAgcmV0dXJuIG5vZGU7XG59XG53YWxrZXJzLnRleHQgPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKF8uY29udmVydEVudGl0eShhc3QudGV4dCkpO1xuICByZXR1cm4gbm9kZTtcbn1cblxuXG5cbnZhciBldmVudFJlZyA9IC9eb24tKC4rKSQvXG5cbi8qKlxuICogd2Fsa2VycyBlbGVtZW50IChjb250YWlucyBjb21wb25lbnQpXG4gKi9cbndhbGtlcnMuZWxlbWVudCA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG4gIHZhciBhdHRycyA9IGFzdC5hdHRycywgXG4gICAgY29tcG9uZW50LCBzZWxmID0gdGhpcyxcbiAgICBDb25zdHJ1Y3Rvcj10aGlzLmNvbnN0cnVjdG9yLFxuICAgIGNoaWxkcmVuID0gYXN0LmNoaWxkcmVuLFxuICAgIG5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlLCByZWYsIGdyb3VwLCBcbiAgICBleHRyYSA9IG9wdGlvbnMuZXh0cmEsXG4gICAgaXNvbGF0ZSA9IDAsXG4gICAgQ29tcG9uZW50ID0gQ29uc3RydWN0b3IuY29tcG9uZW50KGFzdC50YWcpO1xuXG5cbiAgaWYoYXN0LnRhZyA9PT0gJ3N2ZycpIG5hbWVzcGFjZSA9IFwic3ZnXCI7XG5cblxuXG5cbiAgaWYoQ29tcG9uZW50KXtcbiAgICB2YXIgZGF0YSA9IHt9LGV2ZW50cztcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBhdHRycy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICB2YXIgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5fdG91Y2hFeHByKGF0dHIudmFsdWUgfHwgXCJcIik7XG4gICAgICBcbiAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lO1xuICAgICAgdmFyIGV0ZXN0ID0gbmFtZS5tYXRjaChldmVudFJlZyk7XG4gICAgICAvLyBiaW5kIGV2ZW50IHByb3h5XG4gICAgICBpZihldGVzdCl7XG4gICAgICAgIGV2ZW50cyA9IGV2ZW50cyB8fCB7fTtcbiAgICAgICAgZXZlbnRzW2V0ZXN0WzFdXSA9IF8uaGFuZGxlRXZlbnQuY2FsbCh0aGlzLCB2YWx1ZSwgZXRlc3RbMV0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYodmFsdWUudHlwZSAhPT0gJ2V4cHJlc3Npb24nKXtcbiAgICAgICAgZGF0YVthdHRyLm5hbWVdID0gdmFsdWU7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZGF0YVthdHRyLm5hbWVdID0gdmFsdWUuZ2V0KHNlbGYpOyBcbiAgICAgIH1cbiAgICAgIGlmKCBhdHRyLm5hbWUgPT09ICdyZWYnICAmJiB2YWx1ZSAhPSBudWxsKXtcbiAgICAgICAgcmVmID0gdmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nPyB2YWx1ZS5nZXQoc2VsZik6IHZhbHVlO1xuICAgICAgfVxuICAgICAgaWYoIGF0dHIubmFtZSA9PT0gJ2lzb2xhdGUnKXtcbiAgICAgICAgLy8gMTogc3RvcDogY29tcG9zaXRlIC0+IHBhcmVudFxuICAgICAgICAvLyAyLiBzdG9wOiBjb21wb3NpdGUgPC0gcGFyZW50XG4gICAgICAgIC8vIDMuIHN0b3AgMSBhbmQgMjogY29tcG9zaXRlIDwtPiBwYXJlbnRcbiAgICAgICAgLy8gMC4gc3RvcCBub3RoaW5nIChkZWZ1YWx0KVxuICAgICAgICBpc29sYXRlID0gdmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nPyB2YWx1ZS5nZXQoc2VsZik6IHBhcnNlSW50KHZhbHVlIHx8IDMsIDEwKTtcbiAgICAgICAgZGF0YS5pc29sYXRlID0gaXNvbGF0ZTtcbiAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgdmFyIGNvbmZpZyA9IHsgXG4gICAgICBkYXRhOiBkYXRhLCBcbiAgICAgIGV2ZW50czogZXZlbnRzLCBcbiAgICAgICRwYXJlbnQ6IHRoaXMsXG4gICAgICAkb3V0ZXI6IG9wdGlvbnMub3V0ZXIsXG4gICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZSwgXG4gICAgICAkcm9vdDogdGhpcy4kcm9vdCxcbiAgICAgICRib2R5OiBhc3QuY2hpbGRyZW5cbiAgICB9XG5cbiAgICB2YXIgY29tcG9uZW50ID0gbmV3IENvbXBvbmVudChjb25maWcpO1xuICAgIGlmKHJlZiAmJiAgc2VsZi4kcmVmcykgc2VsZi4kcmVmc1tyZWZdID0gY29tcG9uZW50O1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGF0dHJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHZhciBhdHRyID0gYXR0cnNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBhdHRyLnZhbHVlfHxcIlwiO1xuICAgICAgaWYodmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nICYmIGF0dHIubmFtZS5pbmRleE9mKCdvbi0nKT09PS0xKXtcbiAgICAgICAgdmFsdWUgPSBzZWxmLl90b3VjaEV4cHIodmFsdWUpO1xuICAgICAgICAvLyB1c2UgYml0IG9wZXJhdGUgdG8gY29udHJvbCBzY29wZVxuICAgICAgICBpZiggIShpc29sYXRlICYgMikgKSBcbiAgICAgICAgICB0aGlzLiR3YXRjaCh2YWx1ZSwgY29tcG9uZW50LiR1cGRhdGUuYmluZChjb21wb25lbnQsIGF0dHIubmFtZSkpXG4gICAgICAgIGlmKCB2YWx1ZS5zZXQgJiYgIShpc29sYXRlICYgMSApICkgXG4gICAgICAgICAgLy8gc3luYyB0aGUgZGF0YS4gaXQgZm9yY2UgdGhlIGNvbXBvbmVudCBkb24ndCB0cmlnZ2VyIGF0dHIubmFtZSdzIGZpcnN0IGRpcnR5IGVjaGVja1xuICAgICAgICAgIGNvbXBvbmVudC4kd2F0Y2goYXR0ci5uYW1lLCBzZWxmLiR1cGRhdGUuYmluZChzZWxmLCB2YWx1ZSksIHtzeW5jOiB0cnVlfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHJlZil7XG4gICAgICBjb21wb25lbnQuJG9uKCdkZXN0cm95JywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoc2VsZi4kcmVmcykgc2VsZi4kcmVmc1tyZWZdID0gbnVsbDtcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cbiAgZWxzZSBpZiggYXN0LnRhZyA9PT0gJ3ItY29udGVudCcgJiYgdGhpcy5fZ2V0VHJhbnNjbHVkZSApe1xuICAgIHJldHVybiB0aGlzLl9nZXRUcmFuc2NsdWRlKCk7XG4gIH1cbiAgXG4gIGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XG4gICAgZ3JvdXAgPSB0aGlzLiRjb21waWxlKGNoaWxkcmVuLCB7b3V0ZXI6IG9wdGlvbnMub3V0ZXIsbmFtZXNwYWNlOiBuYW1lc3BhY2UsIGV4dHJhOiBleHRyYSB9KTtcbiAgfVxuXG4gIHZhciBlbGVtZW50ID0gZG9tLmNyZWF0ZShhc3QudGFnLCBuYW1lc3BhY2UsIGF0dHJzKTtcbiAgLy8gY29udGV4dCBlbGVtZW50XG5cbiAgdmFyIGNoaWxkO1xuXG4gIGlmKGdyb3VwICYmICFfLmlzVm9pZFRhZyhhc3QudGFnKSl7XG4gICAgZG9tLmluamVjdCggY29tYmluZS5ub2RlKGdyb3VwKSAsIGVsZW1lbnQpXG4gIH1cblxuICAvLyBzb3J0IGJlZm9yZVxuICBhdHRycy5zb3J0KGZ1bmN0aW9uKGExLCBhMil7XG4gICAgdmFyIGQxID0gQ29uc3RydWN0b3IuZGlyZWN0aXZlKGExLm5hbWUpLFxuICAgICAgZDIgPSBDb25zdHJ1Y3Rvci5kaXJlY3RpdmUoYTIubmFtZSk7XG4gICAgaWYoZDEgJiYgZDIpIHJldHVybiAoZDIucHJpb3JpdHkgfHwgMSkgLSAoZDEucHJpb3JpdHkgfHwgMSk7XG4gICAgaWYoZDEpIHJldHVybiAxO1xuICAgIGlmKGQyKSByZXR1cm4gLTE7XG4gICAgaWYoYTIubmFtZSA9PT0gXCJ0eXBlXCIpIHJldHVybiAxO1xuICAgIHJldHVybiAtMTtcbiAgfSlcbiAgLy8gbWF5IGRpc3RpbmN0IHdpdGggaWYgZWxzZVxuICB2YXIgZGVzdHJvaWVzID0gd2Fsa0F0dHJpYnV0ZXMuY2FsbCh0aGlzLCBhdHRycywgZWxlbWVudCwgZXh0cmEpO1xuXG5cblxuICB2YXIgcmVzICA9IHtcbiAgICB0eXBlOiBcImVsZW1lbnRcIixcbiAgICBncm91cDogZ3JvdXAsXG4gICAgbm9kZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0sXG4gICAgbGFzdDogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24oZmlyc3Qpe1xuICAgICAgaWYoIGZpcnN0ICl7XG4gICAgICAgIGFuaW1hdGUucmVtb3ZlKCBlbGVtZW50LCBncm91cD8gZ3JvdXAuZGVzdHJveS5iaW5kKCBncm91cCApOiBfLm5vb3AgKTtcbiAgICAgIH1lbHNlIGlmKGdyb3VwKSB7XG4gICAgICAgIGdyb3VwLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIC8vIGRlc3Ryb3kgcmVmXG4gICAgICBpZiggZGVzdHJvaWVzLmxlbmd0aCApIHtcbiAgICAgICAgZGVzdHJvaWVzLmZvckVhY2goZnVuY3Rpb24oIGRlc3Ryb3kgKXtcbiAgICAgICAgICBpZiggZGVzdHJveSApe1xuICAgICAgICAgICAgaWYoIHR5cGVvZiBkZXN0cm95LmRlc3Ryb3kgPT09ICdmdW5jdGlvbicgKXtcbiAgICAgICAgICAgICAgZGVzdHJveS5kZXN0cm95KClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICBkZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiB3YWxrQXR0cmlidXRlcyhhdHRycywgZWxlbWVudCwgZXh0cmEpe1xuICB2YXIgYmluZGluZ3MgPSBbXVxuICBmb3IodmFyIGkgPSAwLCBsZW4gPSBhdHRycy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgdmFyIGJpbmRpbmcgPSB0aGlzLl93YWxrKGF0dHJzW2ldLCB7ZWxlbWVudDogZWxlbWVudCwgZnJvbUVsZW1lbnQ6IHRydWUsIGF0dHJzOiBhdHRycywgZXh0cmE6IGV4dHJhfSlcbiAgICBpZihiaW5kaW5nKSBiaW5kaW5ncy5wdXNoKGJpbmRpbmcpO1xuICB9XG4gIHJldHVybiBiaW5kaW5ncztcbn1cblxud2Fsa2Vycy5hdHRyaWJ1dGUgPSBmdW5jdGlvbihhc3QgLG9wdGlvbnMpe1xuICB2YXIgYXR0ciA9IGFzdDtcbiAgdmFyIENvbXBvbmVudCA9IHRoaXMuY29uc3RydWN0b3I7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQ7XG4gIHZhciBuYW1lID0gYXR0ci5uYW1lLFxuICAgIHZhbHVlID0gYXR0ci52YWx1ZSB8fCBcIlwiLCBkaXJlY3RpdmUgPSBDb21wb25lbnQuZGlyZWN0aXZlKG5hbWUpO1xuXG4gIHZhbHVlID0gdGhpcy5fdG91Y2hFeHByKHZhbHVlKTtcblxuXG4gIGlmKGRpcmVjdGl2ZSAmJiBkaXJlY3RpdmUubGluayl7XG4gICAgdmFyIGJpbmRpbmcgPSBkaXJlY3RpdmUubGluay5jYWxsKHNlbGYsIGVsZW1lbnQsIHZhbHVlLCBuYW1lLCBvcHRpb25zLmF0dHJzKTtcbiAgICBpZih0eXBlb2YgYmluZGluZyA9PT0gJ2Z1bmN0aW9uJykgYmluZGluZyA9IHtkZXN0cm95OiBiaW5kaW5nfTsgXG4gICAgcmV0dXJuIGJpbmRpbmc7XG4gIH1lbHNle1xuICAgIGlmKCBuYW1lID09PSAncmVmJyAgJiYgdmFsdWUgIT0gbnVsbCAmJiBvcHRpb25zLmZyb21FbGVtZW50KXtcbiAgICAgIHZhciByZWYgPSB2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbic/IHZhbHVlLmdldChzZWxmKTogdmFsdWU7XG4gICAgICB2YXIgcmVmcyA9IHRoaXMuJHJlZnM7XG4gICAgICBpZihyZWZzKXtcbiAgICAgICAgcmVmc1tyZWZdID0gZWxlbWVudFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZWZzW3JlZl0gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZih2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbicgKXtcblxuICAgICAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWx1ZSwgb2xkKXtcbiAgICAgICAgZG9tLmF0dHIoZWxlbWVudCwgbmFtZSwgbnZhbHVlKTtcbiAgICAgIH0sIHtpbml0OiB0cnVlfSk7XG4gICAgfWVsc2V7XG4gICAgICBpZihfLmlzQm9vbGVhbkF0dHIobmFtZSkpe1xuICAgICAgICBkb20uYXR0cihlbGVtZW50LCBuYW1lLCB0cnVlKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBkb20uYXR0cihlbGVtZW50LCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCFvcHRpb25zLmZyb21FbGVtZW50KXtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgZG9tLmF0dHIoZWxlbWVudCwgbmFtZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG4iLCIvKiFcbiAgKiBSZXF3ZXN0ISBBIGdlbmVyYWwgcHVycG9zZSBYSFIgY29ubmVjdGlvbiBtYW5hZ2VyXG4gICogbGljZW5zZSBNSVQgKGMpIER1c3RpbiBEaWF6IDIwMTRcbiAgKiBodHRwczovL2dpdGh1Yi5jb20vZGVkL3JlcXdlc3RcbiAgKi9cblxuIWZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgY29udGV4dFtuYW1lXSA9IGRlZmluaXRpb24oKVxufSgncmVxd2VzdCcsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICB2YXIgd2luID0gd2luZG93XG4gICAgLCBkb2MgPSBkb2N1bWVudFxuICAgICwgaHR0cHNSZSA9IC9eaHR0cC9cbiAgICAsIHByb3RvY29sUmUgPSAvKF5cXHcrKTpcXC9cXC8vXG4gICAgLCB0d29IdW5kbyA9IC9eKDIwXFxkfDEyMjMpJC8gLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcbiAgICAsIGJ5VGFnID0gJ2dldEVsZW1lbnRzQnlUYWdOYW1lJ1xuICAgICwgcmVhZHlTdGF0ZSA9ICdyZWFkeVN0YXRlJ1xuICAgICwgY29udGVudFR5cGUgPSAnQ29udGVudC1UeXBlJ1xuICAgICwgcmVxdWVzdGVkV2l0aCA9ICdYLVJlcXVlc3RlZC1XaXRoJ1xuICAgICwgaGVhZCA9IGRvY1tieVRhZ10oJ2hlYWQnKVswXVxuICAgICwgdW5pcWlkID0gMFxuICAgICwgY2FsbGJhY2tQcmVmaXggPSAncmVxd2VzdF8nICsgKCtuZXcgRGF0ZSgpKVxuICAgICwgbGFzdFZhbHVlIC8vIGRhdGEgc3RvcmVkIGJ5IHRoZSBtb3N0IHJlY2VudCBKU09OUCBjYWxsYmFja1xuICAgICwgeG1sSHR0cFJlcXVlc3QgPSAnWE1MSHR0cFJlcXVlc3QnXG4gICAgLCB4RG9tYWluUmVxdWVzdCA9ICdYRG9tYWluUmVxdWVzdCdcbiAgICAsIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4gICAgLCBpc0FycmF5ID0gdHlwZW9mIEFycmF5LmlzQXJyYXkgPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IEFycmF5LmlzQXJyYXlcbiAgICAgICAgOiBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgcmV0dXJuIGEgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgIH1cblxuICAgICwgZGVmYXVsdEhlYWRlcnMgPSB7XG4gICAgICAgICAgJ2NvbnRlbnRUeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgLCAncmVxdWVzdGVkV2l0aCc6IHhtbEh0dHBSZXF1ZXN0XG4gICAgICAgICwgJ2FjY2VwdCc6IHtcbiAgICAgICAgICAgICAgJyonOiAgJ3RleHQvamF2YXNjcmlwdCwgdGV4dC9odG1sLCBhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sLCAqLyonXG4gICAgICAgICAgICAsICd4bWwnOiAgJ2FwcGxpY2F0aW9uL3htbCwgdGV4dC94bWwnXG4gICAgICAgICAgICAsICdodG1sJzogJ3RleHQvaHRtbCdcbiAgICAgICAgICAgICwgJ3RleHQnOiAndGV4dC9wbGFpbidcbiAgICAgICAgICAgICwgJ2pzb24nOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0J1xuICAgICAgICAgICAgLCAnanMnOiAgICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCB0ZXh0L2phdmFzY3JpcHQnXG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgLCB4aHIgPSBmdW5jdGlvbihvKSB7XG4gICAgICAgIC8vIGlzIGl0IHgtZG9tYWluXG4gICAgICAgIGlmIChvWydjcm9zc09yaWdpbiddID09PSB0cnVlKSB7XG4gICAgICAgICAgdmFyIHhociA9IHdpblt4bWxIdHRwUmVxdWVzdF0gPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG51bGxcbiAgICAgICAgICBpZiAoeGhyICYmICd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgICAgICAgcmV0dXJuIHhoclxuICAgICAgICAgIH0gZWxzZSBpZiAod2luW3hEb21haW5SZXF1ZXN0XSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdCgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGNyb3NzLW9yaWdpbiByZXF1ZXN0cycpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHdpblt4bWxIdHRwUmVxdWVzdF0pIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgICwgZ2xvYmFsU2V0dXBPcHRpb25zID0ge1xuICAgICAgICBkYXRhRmlsdGVyOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHJldHVybiBkYXRhXG4gICAgICAgIH1cbiAgICAgIH1cblxuICBmdW5jdGlvbiBzdWNjZWVkKHIpIHtcbiAgICB2YXIgcHJvdG9jb2wgPSBwcm90b2NvbFJlLmV4ZWMoci51cmwpO1xuICAgIHByb3RvY29sID0gKHByb3RvY29sICYmIHByb3RvY29sWzFdKSB8fCB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2w7XG4gICAgcmV0dXJuIGh0dHBzUmUudGVzdChwcm90b2NvbCkgPyB0d29IdW5kby50ZXN0KHIucmVxdWVzdC5zdGF0dXMpIDogISFyLnJlcXVlc3QucmVzcG9uc2U7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVSZWFkeVN0YXRlKHIsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHVzZSBfYWJvcnRlZCB0byBtaXRpZ2F0ZSBhZ2FpbnN0IElFIGVyciBjMDBjMDIzZlxuICAgICAgLy8gKGNhbid0IHJlYWQgcHJvcHMgb24gYWJvcnRlZCByZXF1ZXN0IG9iamVjdHMpXG4gICAgICBpZiAoci5fYWJvcnRlZCkgcmV0dXJuIGVycm9yKHIucmVxdWVzdClcbiAgICAgIGlmIChyLl90aW1lZE91dCkgcmV0dXJuIGVycm9yKHIucmVxdWVzdCwgJ1JlcXVlc3QgaXMgYWJvcnRlZDogdGltZW91dCcpXG4gICAgICBpZiAoci5yZXF1ZXN0ICYmIHIucmVxdWVzdFtyZWFkeVN0YXRlXSA9PSA0KSB7XG4gICAgICAgIHIucmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBub29wXG4gICAgICAgIGlmIChzdWNjZWVkKHIpKSBzdWNjZXNzKHIucmVxdWVzdClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGVycm9yKHIucmVxdWVzdClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRIZWFkZXJzKGh0dHAsIG8pIHtcbiAgICB2YXIgaGVhZGVycyA9IG9bJ2hlYWRlcnMnXSB8fCB7fVxuICAgICAgLCBoXG5cbiAgICBoZWFkZXJzWydBY2NlcHQnXSA9IGhlYWRlcnNbJ0FjY2VwdCddXG4gICAgICB8fCBkZWZhdWx0SGVhZGVyc1snYWNjZXB0J11bb1sndHlwZSddXVxuICAgICAgfHwgZGVmYXVsdEhlYWRlcnNbJ2FjY2VwdCddWycqJ11cblxuICAgIHZhciBpc0FGb3JtRGF0YSA9IHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiAob1snZGF0YSddIGluc3RhbmNlb2YgRm9ybURhdGEpO1xuICAgIC8vIGJyZWFrcyBjcm9zcy1vcmlnaW4gcmVxdWVzdHMgd2l0aCBsZWdhY3kgYnJvd3NlcnNcbiAgICBpZiAoIW9bJ2Nyb3NzT3JpZ2luJ10gJiYgIWhlYWRlcnNbcmVxdWVzdGVkV2l0aF0pIGhlYWRlcnNbcmVxdWVzdGVkV2l0aF0gPSBkZWZhdWx0SGVhZGVyc1sncmVxdWVzdGVkV2l0aCddXG4gICAgaWYgKCFoZWFkZXJzW2NvbnRlbnRUeXBlXSAmJiAhaXNBRm9ybURhdGEpIGhlYWRlcnNbY29udGVudFR5cGVdID0gb1snY29udGVudFR5cGUnXSB8fCBkZWZhdWx0SGVhZGVyc1snY29udGVudFR5cGUnXVxuICAgIGZvciAoaCBpbiBoZWFkZXJzKVxuICAgICAgaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoKSAmJiAnc2V0UmVxdWVzdEhlYWRlcicgaW4gaHR0cCAmJiBodHRwLnNldFJlcXVlc3RIZWFkZXIoaCwgaGVhZGVyc1toXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENyZWRlbnRpYWxzKGh0dHAsIG8pIHtcbiAgICBpZiAodHlwZW9mIG9bJ3dpdGhDcmVkZW50aWFscyddICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaHR0cC53aXRoQ3JlZGVudGlhbHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBodHRwLndpdGhDcmVkZW50aWFscyA9ICEhb1snd2l0aENyZWRlbnRpYWxzJ11cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmFsQ2FsbGJhY2soZGF0YSkge1xuICAgIGxhc3RWYWx1ZSA9IGRhdGFcbiAgfVxuXG4gIGZ1bmN0aW9uIHVybGFwcGVuZCAodXJsLCBzKSB7XG4gICAgcmV0dXJuIHVybCArICgvXFw/Ly50ZXN0KHVybCkgPyAnJicgOiAnPycpICsgc1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlSnNvbnAobywgZm4sIGVyciwgdXJsKSB7XG4gICAgdmFyIHJlcUlkID0gdW5pcWlkKytcbiAgICAgICwgY2JrZXkgPSBvWydqc29ucENhbGxiYWNrJ10gfHwgJ2NhbGxiYWNrJyAvLyB0aGUgJ2NhbGxiYWNrJyBrZXlcbiAgICAgICwgY2J2YWwgPSBvWydqc29ucENhbGxiYWNrTmFtZSddIHx8IHJlcXdlc3QuZ2V0Y2FsbGJhY2tQcmVmaXgocmVxSWQpXG4gICAgICAsIGNicmVnID0gbmV3IFJlZ0V4cCgnKChefFxcXFw/fCYpJyArIGNia2V5ICsgJyk9KFteJl0rKScpXG4gICAgICAsIG1hdGNoID0gdXJsLm1hdGNoKGNicmVnKVxuICAgICAgLCBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcbiAgICAgICwgbG9hZGVkID0gMFxuICAgICAgLCBpc0lFMTAgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01TSUUgMTAuMCcpICE9PSAtMVxuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBpZiAobWF0Y2hbM10gPT09ICc/Jykge1xuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShjYnJlZywgJyQxPScgKyBjYnZhbCkgLy8gd2lsZGNhcmQgY2FsbGJhY2sgZnVuYyBuYW1lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYnZhbCA9IG1hdGNoWzNdIC8vIHByb3ZpZGVkIGNhbGxiYWNrIGZ1bmMgbmFtZVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSB1cmxhcHBlbmQodXJsLCBjYmtleSArICc9JyArIGNidmFsKSAvLyBubyBjYWxsYmFjayBkZXRhaWxzLCBhZGQgJ2VtXG4gICAgfVxuXG4gICAgd2luW2NidmFsXSA9IGdlbmVyYWxDYWxsYmFja1xuXG4gICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICAgIHNjcmlwdC5zcmMgPSB1cmxcbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlXG4gICAgaWYgKHR5cGVvZiBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlICE9PSAndW5kZWZpbmVkJyAmJiAhaXNJRTEwKSB7XG4gICAgICAvLyBuZWVkIHRoaXMgZm9yIElFIGR1ZSB0byBvdXQtb2Ytb3JkZXIgb25yZWFkeXN0YXRlY2hhbmdlKCksIGJpbmRpbmcgc2NyaXB0XG4gICAgICAvLyBleGVjdXRpb24gdG8gYW4gZXZlbnQgbGlzdGVuZXIgZ2l2ZXMgdXMgY29udHJvbCBvdmVyIHdoZW4gdGhlIHNjcmlwdFxuICAgICAgLy8gaXMgZXhlY3V0ZWQuIFNlZSBodHRwOi8vamF1Ym91cmcubmV0LzIwMTAvMDcvbG9hZGluZy1zY3JpcHQtYXMtb25jbGljay1oYW5kbGVyLW9mLmh0bWxcbiAgICAgIHNjcmlwdC5odG1sRm9yID0gc2NyaXB0LmlkID0gJ19yZXF3ZXN0XycgKyByZXFJZFxuICAgIH1cblxuICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKChzY3JpcHRbcmVhZHlTdGF0ZV0gJiYgc2NyaXB0W3JlYWR5U3RhdGVdICE9PSAnY29tcGxldGUnICYmIHNjcmlwdFtyZWFkeVN0YXRlXSAhPT0gJ2xvYWRlZCcpIHx8IGxvYWRlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbFxuICAgICAgc2NyaXB0Lm9uY2xpY2sgJiYgc2NyaXB0Lm9uY2xpY2soKVxuICAgICAgLy8gQ2FsbCB0aGUgdXNlciBjYWxsYmFjayB3aXRoIHRoZSBsYXN0IHZhbHVlIHN0b3JlZCBhbmQgY2xlYW4gdXAgdmFsdWVzIGFuZCBzY3JpcHRzLlxuICAgICAgZm4obGFzdFZhbHVlKVxuICAgICAgbGFzdFZhbHVlID0gdW5kZWZpbmVkXG4gICAgICBoZWFkLnJlbW92ZUNoaWxkKHNjcmlwdClcbiAgICAgIGxvYWRlZCA9IDFcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIHNjcmlwdCB0byB0aGUgRE9NIGhlYWRcbiAgICBoZWFkLmFwcGVuZENoaWxkKHNjcmlwdClcblxuICAgIC8vIEVuYWJsZSBKU09OUCB0aW1lb3V0XG4gICAgcmV0dXJuIHtcbiAgICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbFxuICAgICAgICBlcnIoe30sICdSZXF1ZXN0IGlzIGFib3J0ZWQ6IHRpbWVvdXQnLCB7fSlcbiAgICAgICAgbGFzdFZhbHVlID0gdW5kZWZpbmVkXG4gICAgICAgIGhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0KVxuICAgICAgICBsb2FkZWQgPSAxXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UmVxdWVzdChmbiwgZXJyKSB7XG4gICAgdmFyIG8gPSB0aGlzLm9cbiAgICAgICwgbWV0aG9kID0gKG9bJ21ldGhvZCddIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpXG4gICAgICAsIHVybCA9IHR5cGVvZiBvID09PSAnc3RyaW5nJyA/IG8gOiBvWyd1cmwnXVxuICAgICAgLy8gY29udmVydCBub24tc3RyaW5nIG9iamVjdHMgdG8gcXVlcnktc3RyaW5nIGZvcm0gdW5sZXNzIG9bJ3Byb2Nlc3NEYXRhJ10gaXMgZmFsc2VcbiAgICAgICwgZGF0YSA9IChvWydwcm9jZXNzRGF0YSddICE9PSBmYWxzZSAmJiBvWydkYXRhJ10gJiYgdHlwZW9mIG9bJ2RhdGEnXSAhPT0gJ3N0cmluZycpXG4gICAgICAgID8gcmVxd2VzdC50b1F1ZXJ5U3RyaW5nKG9bJ2RhdGEnXSlcbiAgICAgICAgOiAob1snZGF0YSddIHx8IG51bGwpXG4gICAgICAsIGh0dHBcbiAgICAgICwgc2VuZFdhaXQgPSBmYWxzZVxuXG4gICAgLy8gaWYgd2UncmUgd29ya2luZyBvbiBhIEdFVCByZXF1ZXN0IGFuZCB3ZSBoYXZlIGRhdGEgdGhlbiB3ZSBzaG91bGQgYXBwZW5kXG4gICAgLy8gcXVlcnkgc3RyaW5nIHRvIGVuZCBvZiBVUkwgYW5kIG5vdCBwb3N0IGRhdGFcbiAgICBpZiAoKG9bJ3R5cGUnXSA9PSAnanNvbnAnIHx8IG1ldGhvZCA9PSAnR0VUJykgJiYgZGF0YSkge1xuICAgICAgdXJsID0gdXJsYXBwZW5kKHVybCwgZGF0YSlcbiAgICAgIGRhdGEgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKG9bJ3R5cGUnXSA9PSAnanNvbnAnKSByZXR1cm4gaGFuZGxlSnNvbnAobywgZm4sIGVyciwgdXJsKVxuXG4gICAgLy8gZ2V0IHRoZSB4aHIgZnJvbSB0aGUgZmFjdG9yeSBpZiBwYXNzZWRcbiAgICAvLyBpZiB0aGUgZmFjdG9yeSByZXR1cm5zIG51bGwsIGZhbGwtYmFjayB0byBvdXJzXG4gICAgaHR0cCA9IChvLnhociAmJiBvLnhocihvKSkgfHwgeGhyKG8pXG5cbiAgICBodHRwLm9wZW4obWV0aG9kLCB1cmwsIG9bJ2FzeW5jJ10gPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlKVxuICAgIHNldEhlYWRlcnMoaHR0cCwgbylcbiAgICBzZXRDcmVkZW50aWFscyhodHRwLCBvKVxuICAgIGlmICh3aW5beERvbWFpblJlcXVlc3RdICYmIGh0dHAgaW5zdGFuY2VvZiB3aW5beERvbWFpblJlcXVlc3RdKSB7XG4gICAgICAgIGh0dHAub25sb2FkID0gZm5cbiAgICAgICAgaHR0cC5vbmVycm9yID0gZXJyXG4gICAgICAgIC8vIE5PVEU6IHNlZVxuICAgICAgICAvLyBodHRwOi8vc29jaWFsLm1zZG4ubWljcm9zb2Z0LmNvbS9Gb3J1bXMvZW4tVVMvaWV3ZWJkZXZlbG9wbWVudC90aHJlYWQvMzBlZjNhZGQtNzY3Yy00NDM2LWI4YTktZjFjYTE5YjQ4MTJlXG4gICAgICAgIGh0dHAub25wcm9ncmVzcyA9IGZ1bmN0aW9uKCkge31cbiAgICAgICAgc2VuZFdhaXQgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlUmVhZHlTdGF0ZSh0aGlzLCBmbiwgZXJyKVxuICAgIH1cbiAgICBvWydiZWZvcmUnXSAmJiBvWydiZWZvcmUnXShodHRwKVxuICAgIGlmIChzZW5kV2FpdCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0dHAuc2VuZChkYXRhKVxuICAgICAgfSwgMjAwKVxuICAgIH0gZWxzZSB7XG4gICAgICBodHRwLnNlbmQoZGF0YSlcbiAgICB9XG4gICAgcmV0dXJuIGh0dHBcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXdlc3QobywgZm4pIHtcbiAgICB0aGlzLm8gPSBvXG4gICAgdGhpcy5mbiA9IGZuXG5cbiAgICBpbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFR5cGUoaGVhZGVyKSB7XG4gICAgLy8ganNvbiwgamF2YXNjcmlwdCwgdGV4dC9wbGFpbiwgdGV4dC9odG1sLCB4bWxcbiAgICBpZiAoaGVhZGVyLm1hdGNoKCdqc29uJykpIHJldHVybiAnanNvbidcbiAgICBpZiAoaGVhZGVyLm1hdGNoKCdqYXZhc2NyaXB0JykpIHJldHVybiAnanMnXG4gICAgaWYgKGhlYWRlci5tYXRjaCgndGV4dCcpKSByZXR1cm4gJ2h0bWwnXG4gICAgaWYgKGhlYWRlci5tYXRjaCgneG1sJykpIHJldHVybiAneG1sJ1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdChvLCBmbikge1xuXG4gICAgdGhpcy51cmwgPSB0eXBlb2YgbyA9PSAnc3RyaW5nJyA/IG8gOiBvWyd1cmwnXVxuICAgIHRoaXMudGltZW91dCA9IG51bGxcblxuICAgIC8vIHdoZXRoZXIgcmVxdWVzdCBoYXMgYmVlbiBmdWxmaWxsZWQgZm9yIHB1cnBvc2VcbiAgICAvLyBvZiB0cmFja2luZyB0aGUgUHJvbWlzZXNcbiAgICB0aGlzLl9mdWxmaWxsZWQgPSBmYWxzZVxuICAgIC8vIHN1Y2Nlc3MgaGFuZGxlcnNcbiAgICB0aGlzLl9zdWNjZXNzSGFuZGxlciA9IGZ1bmN0aW9uKCl7fVxuICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcnMgPSBbXVxuICAgIC8vIGVycm9yIGhhbmRsZXJzXG4gICAgdGhpcy5fZXJyb3JIYW5kbGVycyA9IFtdXG4gICAgLy8gY29tcGxldGUgKGJvdGggc3VjY2VzcyBhbmQgZmFpbCkgaGFuZGxlcnNcbiAgICB0aGlzLl9jb21wbGV0ZUhhbmRsZXJzID0gW11cbiAgICB0aGlzLl9lcnJlZCA9IGZhbHNlXG4gICAgdGhpcy5fcmVzcG9uc2VBcmdzID0ge31cblxuICAgIHZhciBzZWxmID0gdGhpc1xuXG4gICAgZm4gPSBmbiB8fCBmdW5jdGlvbiAoKSB7fVxuXG4gICAgaWYgKG9bJ3RpbWVvdXQnXSkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRpbWVkT3V0KClcbiAgICAgIH0sIG9bJ3RpbWVvdXQnXSlcbiAgICB9XG5cbiAgICBpZiAob1snc3VjY2VzcyddKSB7XG4gICAgICB0aGlzLl9zdWNjZXNzSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb1snc3VjY2VzcyddLmFwcGx5KG8sIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob1snZXJyb3InXSkge1xuICAgICAgdGhpcy5fZXJyb3JIYW5kbGVycy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb1snZXJyb3InXS5hcHBseShvLCBhcmd1bWVudHMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChvWydjb21wbGV0ZSddKSB7XG4gICAgICB0aGlzLl9jb21wbGV0ZUhhbmRsZXJzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBvWydjb21wbGV0ZSddLmFwcGx5KG8sIGFyZ3VtZW50cylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcGxldGUgKHJlc3ApIHtcbiAgICAgIG9bJ3RpbWVvdXQnXSAmJiBjbGVhclRpbWVvdXQoc2VsZi50aW1lb3V0KVxuICAgICAgc2VsZi50aW1lb3V0ID0gbnVsbFxuICAgICAgd2hpbGUgKHNlbGYuX2NvbXBsZXRlSGFuZGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBzZWxmLl9jb21wbGV0ZUhhbmRsZXJzLnNoaWZ0KCkocmVzcClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWNjZXNzIChyZXNwKSB7XG4gICAgICB2YXIgdHlwZSA9IG9bJ3R5cGUnXSB8fCByZXNwICYmIHNldFR5cGUocmVzcC5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJykpIC8vIHJlc3AgY2FuIGJlIHVuZGVmaW5lZCBpbiBJRVxuICAgICAgcmVzcCA9ICh0eXBlICE9PSAnanNvbnAnKSA/IHNlbGYucmVxdWVzdCA6IHJlc3BcbiAgICAgIC8vIHVzZSBnbG9iYWwgZGF0YSBmaWx0ZXIgb24gcmVzcG9uc2UgdGV4dFxuICAgICAgdmFyIGZpbHRlcmVkUmVzcG9uc2UgPSBnbG9iYWxTZXR1cE9wdGlvbnMuZGF0YUZpbHRlcihyZXNwLnJlc3BvbnNlVGV4dCwgdHlwZSlcbiAgICAgICAgLCByID0gZmlsdGVyZWRSZXNwb25zZVxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcC5yZXNwb25zZVRleHQgPSByXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGNhbid0IGFzc2lnbiB0aGlzIGluIElFPD04LCBqdXN0IGlnbm9yZVxuICAgICAgfVxuICAgICAgaWYgKHIpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNwID0gd2luLkpTT04gPyB3aW4uSlNPTi5wYXJzZShyKSA6IGV2YWwoJygnICsgciArICcpJylcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihyZXNwLCAnQ291bGQgbm90IHBhcnNlIEpTT04gaW4gcmVzcG9uc2UnLCBlcnIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2pzJzpcbiAgICAgICAgICByZXNwID0gZXZhbChyKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgIHJlc3AgPSByXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAneG1sJzpcbiAgICAgICAgICByZXNwID0gcmVzcC5yZXNwb25zZVhNTFxuICAgICAgICAgICAgICAmJiByZXNwLnJlc3BvbnNlWE1MLnBhcnNlRXJyb3IgLy8gSUUgdHJvbG9sb1xuICAgICAgICAgICAgICAmJiByZXNwLnJlc3BvbnNlWE1MLnBhcnNlRXJyb3IuZXJyb3JDb2RlXG4gICAgICAgICAgICAgICYmIHJlc3AucmVzcG9uc2VYTUwucGFyc2VFcnJvci5yZWFzb25cbiAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgOiByZXNwLnJlc3BvbnNlWE1MXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZWxmLl9yZXNwb25zZUFyZ3MucmVzcCA9IHJlc3BcbiAgICAgIHNlbGYuX2Z1bGZpbGxlZCA9IHRydWVcbiAgICAgIGZuKHJlc3ApXG4gICAgICBzZWxmLl9zdWNjZXNzSGFuZGxlcihyZXNwKVxuICAgICAgd2hpbGUgKHNlbGYuX2Z1bGZpbGxtZW50SGFuZGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXNwID0gc2VsZi5fZnVsZmlsbG1lbnRIYW5kbGVycy5zaGlmdCgpKHJlc3ApXG4gICAgICB9XG5cbiAgICAgIGNvbXBsZXRlKHJlc3ApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGltZWRPdXQoKSB7XG4gICAgICBzZWxmLl90aW1lZE91dCA9IHRydWVcbiAgICAgIHNlbGYucmVxdWVzdC5hYm9ydCgpICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3IocmVzcCwgbXNnLCB0KSB7XG4gICAgICByZXNwID0gc2VsZi5yZXF1ZXN0XG4gICAgICBzZWxmLl9yZXNwb25zZUFyZ3MucmVzcCA9IHJlc3BcbiAgICAgIHNlbGYuX3Jlc3BvbnNlQXJncy5tc2cgPSBtc2dcbiAgICAgIHNlbGYuX3Jlc3BvbnNlQXJncy50ID0gdFxuICAgICAgc2VsZi5fZXJyZWQgPSB0cnVlXG4gICAgICB3aGlsZSAoc2VsZi5fZXJyb3JIYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNlbGYuX2Vycm9ySGFuZGxlcnMuc2hpZnQoKShyZXNwLCBtc2csIHQpXG4gICAgICB9XG4gICAgICBjb21wbGV0ZShyZXNwKVxuICAgIH1cblxuICAgIHRoaXMucmVxdWVzdCA9IGdldFJlcXVlc3QuY2FsbCh0aGlzLCBzdWNjZXNzLCBlcnJvcilcbiAgfVxuXG4gIFJlcXdlc3QucHJvdG90eXBlID0ge1xuICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9hYm9ydGVkID0gdHJ1ZVxuICAgICAgdGhpcy5yZXF1ZXN0LmFib3J0KClcbiAgICB9XG5cbiAgLCByZXRyeTogZnVuY3Rpb24gKCkge1xuICAgICAgaW5pdC5jYWxsKHRoaXMsIHRoaXMubywgdGhpcy5mbilcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbWFsbCBkZXZpYXRpb24gZnJvbSB0aGUgUHJvbWlzZXMgQSBDb21tb25KcyBzcGVjaWZpY2F0aW9uXG4gICAgICogaHR0cDovL3dpa2kuY29tbW9uanMub3JnL3dpa2kvUHJvbWlzZXMvQVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogYHRoZW5gIHdpbGwgZXhlY3V0ZSB1cG9uIHN1Y2Nlc3NmdWwgcmVxdWVzdHNcbiAgICAgKi9cbiAgLCB0aGVuOiBmdW5jdGlvbiAoc3VjY2VzcywgZmFpbCkge1xuICAgICAgc3VjY2VzcyA9IHN1Y2Nlc3MgfHwgZnVuY3Rpb24gKCkge31cbiAgICAgIGZhaWwgPSBmYWlsIHx8IGZ1bmN0aW9uICgpIHt9XG4gICAgICBpZiAodGhpcy5fZnVsZmlsbGVkKSB7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlQXJncy5yZXNwID0gc3VjY2Vzcyh0aGlzLl9yZXNwb25zZUFyZ3MucmVzcClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fZXJyZWQpIHtcbiAgICAgICAgZmFpbCh0aGlzLl9yZXNwb25zZUFyZ3MucmVzcCwgdGhpcy5fcmVzcG9uc2VBcmdzLm1zZywgdGhpcy5fcmVzcG9uc2VBcmdzLnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXJzLnB1c2goc3VjY2VzcylcbiAgICAgICAgdGhpcy5fZXJyb3JIYW5kbGVycy5wdXNoKGZhaWwpXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGBhbHdheXNgIHdpbGwgZXhlY3V0ZSB3aGV0aGVyIHRoZSByZXF1ZXN0IHN1Y2NlZWRzIG9yIGZhaWxzXG4gICAgICovXG4gICwgYWx3YXlzOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGlmICh0aGlzLl9mdWxmaWxsZWQgfHwgdGhpcy5fZXJyZWQpIHtcbiAgICAgICAgZm4odGhpcy5fcmVzcG9uc2VBcmdzLnJlc3ApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jb21wbGV0ZUhhbmRsZXJzLnB1c2goZm4pXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGBmYWlsYCB3aWxsIGV4ZWN1dGUgd2hlbiB0aGUgcmVxdWVzdCBmYWlsc1xuICAgICAqL1xuICAsIGZhaWw6IGZ1bmN0aW9uIChmbikge1xuICAgICAgaWYgKHRoaXMuX2VycmVkKSB7XG4gICAgICAgIGZuKHRoaXMuX3Jlc3BvbnNlQXJncy5yZXNwLCB0aGlzLl9yZXNwb25zZUFyZ3MubXNnLCB0aGlzLl9yZXNwb25zZUFyZ3MudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Vycm9ySGFuZGxlcnMucHVzaChmbilcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAsICdjYXRjaCc6IGZ1bmN0aW9uIChmbikge1xuICAgICAgcmV0dXJuIHRoaXMuZmFpbChmbilcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXF3ZXN0KG8sIGZuKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF3ZXN0KG8sIGZuKVxuICB9XG5cbiAgLy8gbm9ybWFsaXplIG5ld2xpbmUgdmFyaWFudHMgYWNjb3JkaW5nIHRvIHNwZWMgLT4gQ1JMRlxuICBmdW5jdGlvbiBub3JtYWxpemUocykge1xuICAgIHJldHVybiBzID8gcy5yZXBsYWNlKC9cXHI/XFxuL2csICdcXHJcXG4nKSA6ICcnXG4gIH1cblxuICBmdW5jdGlvbiBzZXJpYWwoZWwsIGNiKSB7XG4gICAgdmFyIG4gPSBlbC5uYW1lXG4gICAgICAsIHQgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICwgb3B0Q2IgPSBmdW5jdGlvbiAobykge1xuICAgICAgICAgIC8vIElFIGdpdmVzIHZhbHVlPVwiXCIgZXZlbiB3aGVyZSB0aGVyZSBpcyBubyB2YWx1ZSBhdHRyaWJ1dGVcbiAgICAgICAgICAvLyAnc3BlY2lmaWVkJyByZWY6IGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUNvcmUvY29yZS5odG1sI0lELTg2MjUyOTI3M1xuICAgICAgICAgIGlmIChvICYmICFvWydkaXNhYmxlZCddKVxuICAgICAgICAgICAgY2Iobiwgbm9ybWFsaXplKG9bJ2F0dHJpYnV0ZXMnXVsndmFsdWUnXSAmJiBvWydhdHRyaWJ1dGVzJ11bJ3ZhbHVlJ11bJ3NwZWNpZmllZCddID8gb1sndmFsdWUnXSA6IG9bJ3RleHQnXSkpXG4gICAgICAgIH1cbiAgICAgICwgY2gsIHJhLCB2YWwsIGlcblxuICAgIC8vIGRvbid0IHNlcmlhbGl6ZSBlbGVtZW50cyB0aGF0IGFyZSBkaXNhYmxlZCBvciB3aXRob3V0IGEgbmFtZVxuICAgIGlmIChlbC5kaXNhYmxlZCB8fCAhbikgcmV0dXJuXG5cbiAgICBzd2l0Y2ggKHQpIHtcbiAgICBjYXNlICdpbnB1dCc6XG4gICAgICBpZiAoIS9yZXNldHxidXR0b258aW1hZ2V8ZmlsZS9pLnRlc3QoZWwudHlwZSkpIHtcbiAgICAgICAgY2ggPSAvY2hlY2tib3gvaS50ZXN0KGVsLnR5cGUpXG4gICAgICAgIHJhID0gL3JhZGlvL2kudGVzdChlbC50eXBlKVxuICAgICAgICB2YWwgPSBlbC52YWx1ZVxuICAgICAgICAvLyBXZWJLaXQgZ2l2ZXMgdXMgXCJcIiBpbnN0ZWFkIG9mIFwib25cIiBpZiBhIGNoZWNrYm94IGhhcyBubyB2YWx1ZSwgc28gY29ycmVjdCBpdCBoZXJlXG4gICAgICAgIDsoIShjaCB8fCByYSkgfHwgZWwuY2hlY2tlZCkgJiYgY2Iobiwgbm9ybWFsaXplKGNoICYmIHZhbCA9PT0gJycgPyAnb24nIDogdmFsKSlcbiAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgY2Iobiwgbm9ybWFsaXplKGVsLnZhbHVlKSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIGlmIChlbC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3Qtb25lJykge1xuICAgICAgICBvcHRDYihlbC5zZWxlY3RlZEluZGV4ID49IDAgPyBlbC5vcHRpb25zW2VsLnNlbGVjdGVkSW5kZXhdIDogbnVsbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGVsLmxlbmd0aCAmJiBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBlbC5vcHRpb25zW2ldLnNlbGVjdGVkICYmIG9wdENiKGVsLm9wdGlvbnNbaV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgLy8gY29sbGVjdCB1cCBhbGwgZm9ybSBlbGVtZW50cyBmb3VuZCBmcm9tIHRoZSBwYXNzZWQgYXJndW1lbnQgZWxlbWVudHMgYWxsXG4gIC8vIHRoZSB3YXkgZG93biB0byBjaGlsZCBlbGVtZW50czsgcGFzcyBhICc8Zm9ybT4nIG9yIGZvcm0gZmllbGRzLlxuICAvLyBjYWxsZWQgd2l0aCAndGhpcyc9Y2FsbGJhY2sgdG8gdXNlIGZvciBzZXJpYWwoKSBvbiBlYWNoIGVsZW1lbnRcbiAgZnVuY3Rpb24gZWFjaEZvcm1FbGVtZW50KCkge1xuICAgIHZhciBjYiA9IHRoaXNcbiAgICAgICwgZSwgaVxuICAgICAgLCBzZXJpYWxpemVTdWJ0YWdzID0gZnVuY3Rpb24gKGUsIHRhZ3MpIHtcbiAgICAgICAgICB2YXIgaSwgaiwgZmFcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZmEgPSBlW2J5VGFnXSh0YWdzW2ldKVxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGZhLmxlbmd0aDsgaisrKSBzZXJpYWwoZmFbal0sIGNiKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZSA9IGFyZ3VtZW50c1tpXVxuICAgICAgaWYgKC9pbnB1dHxzZWxlY3R8dGV4dGFyZWEvaS50ZXN0KGUudGFnTmFtZSkpIHNlcmlhbChlLCBjYilcbiAgICAgIHNlcmlhbGl6ZVN1YnRhZ3MoZSwgWyAnaW5wdXQnLCAnc2VsZWN0JywgJ3RleHRhcmVhJyBdKVxuICAgIH1cbiAgfVxuXG4gIC8vIHN0YW5kYXJkIHF1ZXJ5IHN0cmluZyBzdHlsZSBzZXJpYWxpemF0aW9uXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZVF1ZXJ5U3RyaW5nKCkge1xuICAgIHJldHVybiByZXF3ZXN0LnRvUXVlcnlTdHJpbmcocmVxd2VzdC5zZXJpYWxpemVBcnJheS5hcHBseShudWxsLCBhcmd1bWVudHMpKVxuICB9XG5cbiAgLy8geyAnbmFtZSc6ICd2YWx1ZScsIC4uLiB9IHN0eWxlIHNlcmlhbGl6YXRpb25cbiAgZnVuY3Rpb24gc2VyaWFsaXplSGFzaCgpIHtcbiAgICB2YXIgaGFzaCA9IHt9XG4gICAgZWFjaEZvcm1FbGVtZW50LmFwcGx5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKG5hbWUgaW4gaGFzaCkge1xuICAgICAgICBoYXNoW25hbWVdICYmICFpc0FycmF5KGhhc2hbbmFtZV0pICYmIChoYXNoW25hbWVdID0gW2hhc2hbbmFtZV1dKVxuICAgICAgICBoYXNoW25hbWVdLnB1c2godmFsdWUpXG4gICAgICB9IGVsc2UgaGFzaFtuYW1lXSA9IHZhbHVlXG4gICAgfSwgYXJndW1lbnRzKVxuICAgIHJldHVybiBoYXNoXG4gIH1cblxuICAvLyBbIHsgbmFtZTogJ25hbWUnLCB2YWx1ZTogJ3ZhbHVlJyB9LCAuLi4gXSBzdHlsZSBzZXJpYWxpemF0aW9uXG4gIHJlcXdlc3Quc2VyaWFsaXplQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyciA9IFtdXG4gICAgZWFjaEZvcm1FbGVtZW50LmFwcGx5KGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgYXJyLnB1c2goe25hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZX0pXG4gICAgfSwgYXJndW1lbnRzKVxuICAgIHJldHVybiBhcnJcbiAgfVxuXG4gIHJlcXdlc3Quc2VyaWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgICB2YXIgb3B0LCBmblxuICAgICAgLCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuXG4gICAgb3B0ID0gYXJncy5wb3AoKVxuICAgIG9wdCAmJiBvcHQubm9kZVR5cGUgJiYgYXJncy5wdXNoKG9wdCkgJiYgKG9wdCA9IG51bGwpXG4gICAgb3B0ICYmIChvcHQgPSBvcHQudHlwZSlcblxuICAgIGlmIChvcHQgPT0gJ21hcCcpIGZuID0gc2VyaWFsaXplSGFzaFxuICAgIGVsc2UgaWYgKG9wdCA9PSAnYXJyYXknKSBmbiA9IHJlcXdlc3Quc2VyaWFsaXplQXJyYXlcbiAgICBlbHNlIGZuID0gc2VyaWFsaXplUXVlcnlTdHJpbmdcblxuICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmdzKVxuICB9XG5cbiAgcmVxd2VzdC50b1F1ZXJ5U3RyaW5nID0gZnVuY3Rpb24gKG8sIHRyYWQpIHtcbiAgICB2YXIgcHJlZml4LCBpXG4gICAgICAsIHRyYWRpdGlvbmFsID0gdHJhZCB8fCBmYWxzZVxuICAgICAgLCBzID0gW11cbiAgICAgICwgZW5jID0gZW5jb2RlVVJJQ29tcG9uZW50XG4gICAgICAsIGFkZCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgLy8gSWYgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaW52b2tlIGl0IGFuZCByZXR1cm4gaXRzIHZhbHVlXG4gICAgICAgICAgdmFsdWUgPSAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHZhbHVlKSA/IHZhbHVlKCkgOiAodmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUpXG4gICAgICAgICAgc1tzLmxlbmd0aF0gPSBlbmMoa2V5KSArICc9JyArIGVuYyh2YWx1ZSlcbiAgICAgICAgfVxuICAgIC8vIElmIGFuIGFycmF5IHdhcyBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IGl0IGlzIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMuXG4gICAgaWYgKGlzQXJyYXkobykpIHtcbiAgICAgIGZvciAoaSA9IDA7IG8gJiYgaSA8IG8ubGVuZ3RoOyBpKyspIGFkZChvW2ldWyduYW1lJ10sIG9baV1bJ3ZhbHVlJ10pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXG4gICAgICAvLyBkaWQgaXQpLCBvdGhlcndpc2UgZW5jb2RlIHBhcmFtcyByZWN1cnNpdmVseS5cbiAgICAgIGZvciAocHJlZml4IGluIG8pIHtcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkocHJlZml4KSkgYnVpbGRQYXJhbXMocHJlZml4LCBvW3ByZWZpeF0sIHRyYWRpdGlvbmFsLCBhZGQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gc3BhY2VzIHNob3VsZCBiZSArIGFjY29yZGluZyB0byBzcGVjXG4gICAgcmV0dXJuIHMuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpXG4gIH1cblxuICBmdW5jdGlvbiBidWlsZFBhcmFtcyhwcmVmaXgsIG9iaiwgdHJhZGl0aW9uYWwsIGFkZCkge1xuICAgIHZhciBuYW1lLCBpLCB2XG4gICAgICAsIHJicmFja2V0ID0gL1xcW1xcXSQvXG5cbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cbiAgICAgIGZvciAoaSA9IDA7IG9iaiAmJiBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHYgPSBvYmpbaV1cbiAgICAgICAgaWYgKHRyYWRpdGlvbmFsIHx8IHJicmFja2V0LnRlc3QocHJlZml4KSkge1xuICAgICAgICAgIC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cbiAgICAgICAgICBhZGQocHJlZml4LCB2KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1aWxkUGFyYW1zKHByZWZpeCArICdbJyArICh0eXBlb2YgdiA9PT0gJ29iamVjdCcgPyBpIDogJycpICsgJ10nLCB2LCB0cmFkaXRpb25hbCwgYWRkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvYmogJiYgb2JqLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAvLyBTZXJpYWxpemUgb2JqZWN0IGl0ZW0uXG4gICAgICBmb3IgKG5hbWUgaW4gb2JqKSB7XG4gICAgICAgIGJ1aWxkUGFyYW1zKHByZWZpeCArICdbJyArIG5hbWUgKyAnXScsIG9ialtuYW1lXSwgdHJhZGl0aW9uYWwsIGFkZClcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXG4gICAgICBhZGQocHJlZml4LCBvYmopXG4gICAgfVxuICB9XG5cbiAgcmVxd2VzdC5nZXRjYWxsYmFja1ByZWZpeCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2FsbGJhY2tQcmVmaXhcbiAgfVxuXG4gIC8vIGpRdWVyeSBhbmQgWmVwdG8gY29tcGF0aWJpbGl0eSwgZGlmZmVyZW5jZXMgY2FuIGJlIHJlbWFwcGVkIGhlcmUgc28geW91IGNhbiBjYWxsXG4gIC8vIC5hamF4LmNvbXBhdChvcHRpb25zLCBjYWxsYmFjaylcbiAgcmVxd2VzdC5jb21wYXQgPSBmdW5jdGlvbiAobywgZm4pIHtcbiAgICBpZiAobykge1xuICAgICAgb1sndHlwZSddICYmIChvWydtZXRob2QnXSA9IG9bJ3R5cGUnXSkgJiYgZGVsZXRlIG9bJ3R5cGUnXVxuICAgICAgb1snZGF0YVR5cGUnXSAmJiAob1sndHlwZSddID0gb1snZGF0YVR5cGUnXSlcbiAgICAgIG9bJ2pzb25wQ2FsbGJhY2snXSAmJiAob1snanNvbnBDYWxsYmFja05hbWUnXSA9IG9bJ2pzb25wQ2FsbGJhY2snXSkgJiYgZGVsZXRlIG9bJ2pzb25wQ2FsbGJhY2snXVxuICAgICAgb1snanNvbnAnXSAmJiAob1snanNvbnBDYWxsYmFjayddID0gb1snanNvbnAnXSlcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZXF3ZXN0KG8sIGZuKVxuICB9XG5cbiAgcmVxd2VzdC5hamF4U2V0dXAgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgZm9yICh2YXIgayBpbiBvcHRpb25zKSB7XG4gICAgICBnbG9iYWxTZXR1cE9wdGlvbnNba10gPSBvcHRpb25zW2tdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcXdlc3Rcbn0pO1xuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvbXBvbmVudCDnu4Tku7bln7rnsbtcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWd1bGFyID0gcmVxdWlyZSgncmVndWxhcmpzJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4vZmlsdGVyLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIENvbXBvbmVudFxuICogQGV4dGVuZCBSZWd1bGFyXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBDb21wb25lbnQgPSBSZWd1bGFyLmV4dGVuZCh7XG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICdjbGFzcyc6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9XG59KVxuLmZpbHRlcihmaWx0ZXIpXG4uZGlyZWN0aXZlKHtcblxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmlsdGVyID0ge307XG5cbmZpbHRlci5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBmaXgoc3RyKSB7XG4gICAgICAgIHN0ciA9ICcnICsgKFN0cmluZyhzdHIpIHx8ICcnKTtcbiAgICAgICAgcmV0dXJuIHN0ci5sZW5ndGggPD0gMT8gJzAnICsgc3RyIDogc3RyO1xuICAgIH1cbiAgICB2YXIgbWFwcyA9IHtcbiAgICAgICAgJ3l5eXknOiBmdW5jdGlvbihkYXRlKXtyZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpfSxcbiAgICAgICAgJ01NJzogZnVuY3Rpb24oZGF0ZSl7cmV0dXJuIGZpeChkYXRlLmdldE1vbnRoKCkgKyAxKTsgfSxcbiAgICAgICAgJ2RkJzogZnVuY3Rpb24oZGF0ZSl7IHJldHVybiBmaXgoZGF0ZS5nZXREYXRlKCkpIH0sXG4gICAgICAgICdISCc6IGZ1bmN0aW9uKGRhdGUpe3JldHVybiBmaXgoZGF0ZS5nZXRIb3VycygpKSB9LFxuICAgICAgICAnbW0nOiBmdW5jdGlvbihkYXRlKXsgcmV0dXJuIGZpeChkYXRlLmdldE1pbnV0ZXMoKSl9LFxuICAgICAgICAnc3MnOiBmdW5jdGlvbihkYXRlKXsgcmV0dXJuIGZpeChkYXRlLmdldFNlY29uZHMoKSl9XG4gICAgfVxuXG4gICAgdmFyIHRydW5rID0gbmV3IFJlZ0V4cChPYmplY3Qua2V5cyhtYXBzKS5qb2luKCd8JyksJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGZvcm1hdCl7XG4gICAgICAgIGlmKCF2YWx1ZSl7cmV0dXJuICcnO31cbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkIEhIOm1tJztcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdC5yZXBsYWNlKHRydW5rLCBmdW5jdGlvbihjYXB0dXJlKXtcbiAgICAgICAgICAgIHJldHVybiBtYXBzW2NhcHR1cmVdPyBtYXBzW2NhcHR1cmVdKHZhbHVlKTogJyc7XG4gICAgICAgIH0pO1xuICAgIH1cbn0oKTtcblxuZmlsdGVyLmF2ZXJhZ2UgPSBmdW5jdGlvbihhcnJheSwga2V5KSB7XG4gICAgYXJyYXkgPSBhcnJheSB8fCBbXTtcbiAgICByZXR1cm4gYXJyYXkubGVuZ3RoPyBmaWx0ZXIudG90YWwoYXJyYXksIGtleSkgLyBhcnJheS5sZW5ndGggOiAwO1xufVxuZmlsdGVyLnRvdGFsID0gZnVuY3Rpb24oYXJyYXksIGtleSkge1xuICAgIHZhciB0b3RhbCA9IDA7XG4gICAgaWYoIWFycmF5KSByZXR1cm47XG4gICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApe1xuICAgICAgICB0b3RhbCArPSBrZXk/IGl0ZW1ba2V5XSA6IGl0ZW07XG4gICAgfSlcbiAgICByZXR1cm4gdG90YWw7XG59XG5cbmZpbHRlci5maWx0ZXIgPSBmdW5jdGlvbihhcnJheSwgZmlsdGVyRm4pIHtcbiAgICBpZighYXJyYXkgfHwgIWFycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuICAgICAgICByZXR1cm4gZmlsdGVyRm4oaXRlbSwgaW5kZXgpO1xuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsdGVyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcXdlc3QgPSByZXF1aXJlKCdyZXF3ZXN0Jyk7XG52YXIgYWpheCA9IHt9O1xuLy8gdmFyIGV2ZW50RW1pdHRlciA9IG5ldyByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXIoKTtcbi8vIHZhciBhamF4ID0ge1xuLy8gICAgICRvbjogZXZlbnRFbWl0dGVyLm9uLFxuLy8gICAgICRvZmY6IGV2ZW50RW1pdHRlci5yZW1vdmVMaXN0ZW5lcixcbi8vICAgICAkZW1pdDogZXZlbnRFbWl0dGVyLmVtaXRcbi8vIH07XG5cbnZhciBOb3RpZnkgPSByZXF1aXJlKCcuLi9tb2R1bGUvbm90aWZ5LmpzJyk7XG5cbmFqYXgucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdCkge1xuICAgIHZhciBub29wID0gZnVuY3Rpb24oKXt9O1xuICAgIHZhciBvbGRFcnJvciA9IG9wdC5lcnJvciB8fCBub29wLFxuICAgICAgICBvbGRTdWNjZXNzID0gb3B0LnN1Y2Nlc3MgfHwgbm9vcCxcbiAgICAgICAgb2xkQ29tcGxldGUgPSBvcHQuY29tcGxldGUgfHwgbm9vcDtcblxuICAgIG9wdC5kYXRhID0gb3B0LmRhdGEgfHwge307XG5cbiAgICBpZighb3B0LmNvbnRlbnRUeXBlICYmIG9wdC5tZXRob2QgJiYgb3B0Lm1ldGhvZC50b0xvd2VyQ2FzZSgpICE9PSAnZ2V0JylcbiAgICAgICAgb3B0LmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgIGVsc2VcbiAgICAgICAgb3B0LmRhdGEudGltZXN0YW1wID0gK25ldyBEYXRlO1xuXG4gICAgaWYob3B0LmNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgICAgb3B0LmRhdGEgPSBKU09OLnN0cmluZ2lmeShvcHQuZGF0YSk7XG4gICAgfVxuXG4gICAgLy9hamF4LiRlbWl0KCdzdGFydCcsIG9wdCk7XG4gICAgb3B0LnN1Y2Nlc3MgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIC8vYWpheC4kZW1pdCgnc3VjY2VzcycsIGRhdGEpO1xuXG4gICAgICAgIGlmKGRhdGEuY29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgICBOb3RpZnkuZXJyb3IoZGF0YS5tc2cpO1xuICAgICAgICAgICAgb2xkRXJyb3IoZGF0YS5yZXN1bHQsIGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvbGRTdWNjZXNzKGRhdGEucmVzdWx0LCBkYXRhKTtcbiAgICB9XG5cbiAgICBvcHQuZXJyb3IgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIC8vYWpheC4kZW1pdCgnZXJyb3InLCBkYXRhKTtcbiAgICAgICAgb2xkRXJyb3IoZGF0YS5yZXN1bHQsIGRhdGEpO1xuICAgIH1cblxuICAgIG9wdC5jb21wbGV0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy9hamF4LiRlbWl0KCdjb21wbGV0ZScsIGRhdGEpO1xuICAgICAgICBvbGRDb21wbGV0ZShkYXRhLnJlc3VsdCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmVxd2VzdChvcHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFqYXg7IiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFNvdXJjZUNvbXBvbmVudCDmlbDmja7nu4Tku7bln7rnsbtcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudC5qcycpO1xudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgU291cmNlQ29tcG9uZW50XG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBTb3VyY2VDb21wb25lbnQgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBzZXJ2aWNlOiBudWxsLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy5kYXRhLnNlcnZpY2UpXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgPSB0aGlzLmRhdGEuc2VydmljZTtcblxuICAgICAgICBpZih0aGlzLnNlcnZpY2UpXG4gICAgICAgICAgICB0aGlzLiR1cGRhdGVTb3VyY2UoKTtcblxuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZ2V0UGFyYW1zIOi/lOWbnuivt+axguaXtumcgOimgeeahOWPguaVsFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICovXG4gICAgZ2V0UGFyYW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCAkdXBkYXRlU291cmNlIOS7jnNlcnZpY2XkuK3mm7TmlrDmlbDmja7mupBcbiAgICAgKiBAcHVibGljXG4gICAgICogQHJldHVybiB7U291cmNlQ29tcG9uZW50fSB0aGlzXG4gICAgICovXG4gICAgJHVwZGF0ZVNvdXJjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRMaXN0KHRoaXMuZ2V0UGFyYW1zKCksIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy4kdXBkYXRlKCdzb3VyY2UnLCByZXN1bHQpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTb3VyY2VDb21wb25lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVndWxhciA9IHJlcXVpcmUoJ3JlZ3VsYXJqcycpO1xuXG52YXIgXyA9IHtcbiAgICBleHRlbmQ6IGZ1bmN0aW9uKG8xLCBvMiwgb3ZlcnJpZGUpIHtcbiAgICAgICAgZm9yKHZhciBpIGluIG8yKVxuICAgICAgICAgICAgaWYob3ZlcnJpZGUgfHwgbzFbaV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBvMVtpXSA9IG8yW2ldXG4gICAgICAgIHJldHVybiBvMTtcbiAgICB9LFxuICAgIGRvbTogUmVndWxhci5kb20sXG4gICAgbXVsdGlsaW5lOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgIHZhciByZWcgPSAvXmZ1bmN0aW9uXFxzKlxcKFxcKVxccypcXHtcXHMqXFwvXFwqK1xccyooW1xcc1xcU10qKVxccypcXCorXFwvXFxzKlxcfSQvO1xuICAgICAgICByZXR1cm4gcmVnLmV4ZWMoZnVuYylbMV07XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF87IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLWFjY29yZGlvbiB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfT4gICAgPHItY29udGVudCAvPjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFjY29yZGlvbiAgICAgICDpgInpobnljaFcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9hY2NvcmRpb24uaHRtbCcpO1xudmFyIGl0ZW1UZW1wbGF0ZSA9IHJlcXVpcmUoJy4vYWNjb3JkaW9uUGFuZS5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBBY2NvcmRpb25cbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgQWNjb3JkaW9uID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2FjY29yZGlvbicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH1cbn0pO1xuXG52YXIgQWNjb3JkaW9uUGFuZSA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdhY2NvcmRpb25QYW5lJyxcbiAgICB0ZW1wbGF0ZTogaXRlbVRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgb3BlbjogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIGlmKHRoaXMuJG91dGVyKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gdGhpcy4kb3V0ZXIuZGF0YS5zb3VyY2U7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBvcGVuOiBvcGVuLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRhdGEuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgYWNjb3JkaW9uOiB0aGlzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc291cmNlLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvZ2dsZTogZnVuY3Rpb24ob3Blbikge1xuICAgICAgICB0aGlzLmRhdGEub3BlbiA9IG9wZW47XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQWNjb3JkaW9uOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwiYWNjb3JkaW9uX3BhbmVcXFwiPiAgICA8ZGl2IGNsYXNzPVxcXCJhY2NvcmRpb25fcGFuZV9oZFxcXCIgb24tY2xpY2s9e3RoaXMudG9nZ2xlKCFvcGVuKX0+e25hbWV9PC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImFjY29yZGlvbl9wYW5lX2JkXFxcIiByLWhpZGU9eyFvcGVufT4gICAgICAgIDxyLWNvbnRlbnQ+ICAgIDwvZGl2PjwvZGl2PlwiIiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWNhbGVuZGFyIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9oZFxcXCI+ICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfcHJldlxcXCI+ICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIG9uLWNsaWNrPXt0aGlzLmFkZFllYXIoLTEpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1hbmdsZS1kb3VibGUtbGVmdFxcXCI+PC9pPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCIgb24tY2xpY2s9e3RoaXMuYWRkTW9udGgoLTEpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1hbmdsZS1sZWZ0XFxcIj48L2k+PC9zcGFuPiAgICAgICAgPC9zcGFuPiAgICAgICAgPHNwYW4+e2RhdGUgfCBmb3JtYXQ6IFxcJ3l5eXktTU1cXCd9PC9zcGFuPiAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX25leHRcXFwiPiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIiBvbi1jbGljaz17dGhpcy5hZGRNb250aCgxKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tYW5nbGUtcmlnaHRcXFwiPjwvaT48L3NwYW4+ICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIG9uLWNsaWNrPXt0aGlzLmFkZFllYXIoMSl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWFuZ2xlLWRvdWJsZS1yaWdodFxcXCI+PC9pPjwvc3Bhbj4gICAgICAgIDwvc3Bhbj4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX2JkXFxcIj4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX3dlZWtcXFwiPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7ml6U8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuS4gDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCI+5LqMPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7kuIk8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuWbmzwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCI+5LqUPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7lha08L3NwYW4+PC9kaXY+ICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9kYXlcXFwiPnsjbGlzdCBfZGF5cyBhcyBkYXl9PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IGRhdGUudG9EYXRlU3RyaW5nKCkgPT09IGRheS50b0RhdGVTdHJpbmcoKSwgXFwnei1kaXNcXCc6IGRheS5nZXRNb250aCgpICE9PSBkYXRlLmdldE1vbnRoKCl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGRheSl9PntkYXkgfCBmb3JtYXQ6IFxcJ2RkXFwnfTwvc3Bhbj57L2xpc3R9PC9kaXY+ICAgIDwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENhbGVuZGFyICDml6XljoZcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9jYWxlbmRhci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBDYWxlbmRhclxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge0RhdGU9bnVsbH0gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZGF0ZSAgICAgICAgICAgICAgIOW9k+WJjemAieaLqeeahOaXpeacn1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgQ2FsZW5kYXIgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBkYXRlOiBudWxsLFxuICAgICAgICAgICAgX2RheXM6IFtdXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiR3YXRjaCgnZGF0ZScsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYobmV3VmFsdWUgJiYgb2xkVmFsdWUgJiYgbmV3VmFsdWUuZ2V0RnVsbFllYXIoKSA9PT0gb2xkVmFsdWUuZ2V0RnVsbFllYXIoKSAmJiBuZXdWYWx1ZS5nZXRNb250aCgpID09PSBvbGRWYWx1ZS5nZXRNb250aCgpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoIXRoaXMuZGF0YS5kYXRlKVxuICAgICAgICAgICAgdGhpcy5nb1RvZGF5KCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZSgpIOaXpeacn+aUueWPmOWQjuabtOaWsOaXpeWOhlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRhdGEuX2RheXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIHZhciBkYXRlID0gdGhpcy5kYXRhLmRhdGU7XG4gICAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgdmFyIG1maXJzdCA9IG5ldyBEYXRlKGRhdGUpOyBtZmlyc3Quc2V0RGF0ZSgxKTtcbiAgICAgICAgdmFyIG1maXJzdFRpbWUgPSBtZmlyc3QuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgbmZpcnN0ID0gbmV3IERhdGUobWZpcnN0KTsgbmZpcnN0LnNldE1vbnRoKG1vbnRoICsgMSk7IG5maXJzdC5zZXREYXRlKDEpO1xuICAgICAgICB2YXIgbmZpcnN0VGltZSA9IG5maXJzdC5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBsYXN0VGltZSA9IG5maXJzdFRpbWUgKyAoKDcgLSBuZmlyc3QuZ2V0RGF5KCkpJTcgLSAxKSoyNCozNjAwKjEwMDA7XG4gICAgICAgIHZhciBudW0gPSAtIG1maXJzdC5nZXREYXkoKTtcbiAgICAgICAgdmFyIHRtcFRpbWUsIHRtcDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdG1wVGltZSA9IG1maXJzdFRpbWUgKyAobnVtKyspKjI0KjM2MDAqMTAwMDtcbiAgICAgICAgICAgIHRtcCA9IG5ldyBEYXRlKHRtcFRpbWUpO1xuICAgICAgICAgICAgdGhpcy5kYXRhLl9kYXlzLnB1c2godG1wKTtcbiAgICAgICAgfSB3aGlsZSh0bXBUaW1lIDwgbGFzdFRpbWUpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBhZGRZZWFyKHllYXIpIOiwg+aVtOW5tOS7vVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtudW1iZXI9MH0geWVhciDliqAv5YeP55qE5bm05Lu9XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBhZGRZZWFyOiBmdW5jdGlvbih5ZWFyKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQgfHwgIXllYXIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGEuZGF0ZSk7XG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgeWVhcik7XG4gICAgICAgIHRoaXMuZGF0YS5kYXRlID0gZGF0ZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgYWRkTW9udGgobW9udGgpIOiwg+aVtOaciOS7vVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtudW1iZXI9MH0gbW9udGgg5YqgL+WHj+eahOaciOS7vVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgYWRkTW9udGg6IGZ1bmN0aW9uKG1vbnRoKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQgfHwgIW1vbnRoKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodGhpcy5kYXRhLmRhdGUpO1xuICAgICAgICBkYXRlLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIG1vbnRoKTtcbiAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBkYXRlO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoZGF0ZSkg6YCJ5oup5LiA5Liq5pel5pyfXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge0RhdGU9bnVsbH0gZGF0ZSDpgInmi6nnmoTml6XmnJ9cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICBpZih0aGlzLmRhdGEucmVhZG9ubHkgfHwgdGhpcy5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZGF0YS5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA5Liq5pel5pyf5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkYXRlIOW9k+WJjemAieaLqeeahOaXpeacn1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZ29Ub2RheSgpIOWbnuWIsOS7iuWkqVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGdvVG9kYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRhdGEuZGF0ZSA9IG5ldyBEYXRlKChuZXcgRGF0ZSgpLmdldFRpbWUoKS8oMjQqMzYwMCoxMDAwKT4+MCkqKDI0KjM2MDAqMTAwMCkpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGVuZGFyOyIsIm1vZHVsZS5leHBvcnRzPVwiXCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRWRpdG9yICAgIOe8lui+keWZqFxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2VkaXRvci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBFZGl0b3JcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNvbnRlbnQgICAgICAgICAgICDlr7nor53moYblhoXlrrlcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49dHJ1ZX0gICAgIG9wdGlvbnMuZGF0YS5va0J1dHRvbiAgICAgICAgICAg5piv5ZCm5pi+56S656Gu5a6a5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49ZmFsc2V9ICAgIG9wdGlvbnMuZGF0YS5jYW5jZWxCdXR0b24gICAgICAg5piv5ZCm5pi+56S65Y+W5raI5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7bnVtYmVyPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS53aWR0aCAgICAgICAgICAgICAg5a+56K+d5qGG5a695bqm44CC5YC85Li65ZCm5a6a5pe25a695bqm5Li6Q1NT6K6+572u55qE5a695bqm44CCXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSAgICAgICAgICAgICAgICBvcHRpb25zLm9rICAgICAgICAgICAgICAgICAgICAgIOW9k+eCueWHu+ehruWumueahOaXtuWAmeaJp+ihjFxuICogQHBhcmFtIHtmdW5jdGlvbn0gICAgICAgICAgICAgICAgb3B0aW9ucy5jYW5jZWwgICAgICAgICAgICAgICAgICDlvZPngrnlh7vlj5bmtojnmoTml7blgJnmiafooYxcbiAqL1xudmFyIEVkaXRvciA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdtb2RhbCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgb2tCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgd2lkdGg6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICAgICAgLy8g6K+B5piO5LiN5piv5YaF5bWM57uE5Lu2XG4gICAgICAgIGlmKHRoaXMuJHJvb3QgPT09IHRoaXMpXG4gICAgICAgICAgICB0aGlzLiRpbmplY3QoZG9jdW1lbnQuYm9keSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb3NlKHJlc3VsdCkg5YWz6Zet5qih5oCB5a+56K+d5qGGXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IHJlc3VsdCDngrnlh7vnoa7lrprov5jmmK/lj5bmtohcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNsb3NlOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjbG9zZSDlhbPpl63lr7nor53moYbml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSByZXN1bHQg54K55Ye75LqG56Gu5a6a6L+Y5piv5Y+W5raIXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIHtcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPyB0aGlzLm9rKCkgOiB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIG9rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBvayDnoa7lrprlr7nor53moYbml7bop6blj5FcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ29rJyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNsb3NlIOWPlua2iOWvueivneahhuaXtuinpuWPkVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yO1xuIiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLWdyaWR2aWV3IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9PiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxkaXYgY2xhc3M9XFxcImdyaWR2aWV3X2l0ZW1cXFwiIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IHNlbGVjdGVkID09PSBpdGVtfSB9PnsjaWYgQChpdGVtVGVtcGxhdGUpfXsjaW5jbHVkZSBAKGl0ZW1UZW1wbGF0ZSl9eyNlbHNlfXtpdGVtLm5hbWV9ey9pZn08L2Rpdj4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEdyaWRWaWV3ICDnvZHmoLzop4blm75cbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9ncmlkVmlldy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBHcmlkVmlld1xuICogQGV4dGVuZCBTb3VyY2VDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgR3JpZFZpZXcgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnZ3JpZFZpZXcnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRWaWV3OyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwibS1lZGl0b3Ige0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIDxkaXYgY2xhc3M9XFxcImVkaXRvcl9wcmV2aWV3XFxcIiByLWh0bWw9e2h0bWx9PjwvZGl2PiAgICA8dWwgY2xhc3M9XFxcIm0tdG9vbGJhciBlZGl0b3JfdG9vbGJhclxcXCI+ICAgICAgICA8bGk+PGEgdGl0bGU9XFxcIuWKoOeyl1xcXCIgb24tY2xpY2s9e3RoaXMuYm9sZCgpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1ib2xkXFxcIj48L2k+PC9hPjwvbGk+ICAgICAgICA8bGk+PGEgdGl0bGU9XFxcIuaWnOS9k1xcXCIgb24tY2xpY2s9e3RoaXMuaXRhbGljKCl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWl0YWxpY1xcXCI+PC9pPjwvYT48L2xpPiAgICAgICAgPGxpIGNsYXNzPVxcXCJzZXBlcmF0b3JcXFwiPjwvbGk+ICAgICAgICA8bGk+PGEgdGl0bGU9XFxcIuW8leeUqFxcXCIgb24tY2xpY2s9e3RoaXMucXVvdGUoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tcXVvdGVcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5peg5bqP5YiX6KGoXFxcIiBvbi1jbGljaz17dGhpcy51bCgpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1saXN0LXVsXFxcIj48L2k+PC9hPjwvbGk+ICAgICAgICA8bGk+PGEgdGl0bGU9XFxcIuacieW6j+WIl+ihqFxcXCIgb24tY2xpY2s9e3RoaXMub2woKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tbGlzdC1vbFxcXCI+PC9pPjwvYT48L2xpPiAgICAgICAgPGxpIGNsYXNzPVxcXCJzZXBlcmF0b3JcXFwiPjwvbGk+ICAgICAgICA8bGk+PGEgdGl0bGU9XFxcIumTvuaOpVxcXCIgb24tY2xpY2s9e3RoaXMubGluaygpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1saW5rXFxcIj48L2k+PC9hPjwvbGk+ICAgICAgICA8bGk+PGEgdGl0bGU9XFxcIuWbvueJh1xcXCIgb24tY2xpY2s9e3RoaXMuaW1hZ2UoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24taW1hZ2VcXFwiPjwvaT48L2E+PC9saT4gICAgPC91bD4gICAgPHRleHRhcmVhIGNsYXNzPVxcXCJlZGl0b3JfdGV4dGFyZWFcXFwiIHItbW9kZWw9e2NvbnRlbnR9IHJlZj1cXFwidGV4dGFyZWFcXFwiIHsjaWYgcmVhZG9ubHl9cmVhZG9ubHl7L2lmfT48L3RleHRhcmVhPjwvZGl2Pjx1cGxvYWRlciB2aXNpYmxlPXtmYWxzZX0gdXJsPXtpbWFnZVVybH0gZXh0ZW5zaW9ucz17ZXh0ZW5zaW9uc30gcmVmPVxcXCJ1cGxvYWRlclxcXCIgb24tc3VjY2Vzcz17dGhpcy51cGxvYWRlclN1Y2Nlc3MoJGV2ZW50KX0gb24tZXJyb3I9e3RoaXMudXBsb2FkZXJFcnJvcigkZXZlbnQpfSAvPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEhUTUxFZGl0b3Ig57yW6L6R5ZmoXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vaHRtbEVkaXRvci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBIVE1MRWRpdG9yXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKcgfCBCaW5kaW5nIFByb3BlcnRpZXNcbiAqIEBwYXJhbSB7c3RyaW5nPSfmj5DnpLonfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnRpdGxlICAgICAgICAgICAgICDlr7nor53moYbmoIfpopggfCBUaXRsZSBvZiBEaWFsb2dcbiAqIEBwYXJhbSB7ZnVuY3Rpb259ICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FuY2VsICAgICAgICAgICAgICAgICAg5b2T54K55Ye75Y+W5raI55qE5pe25YCZ5omn6KGMXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKi9cbnZhciBIVE1MRWRpdG9yID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2h0bWxFZGl0b3InLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBjb250ZW50OiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBodG1sOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuY29udGVudDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYm9sZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJyoqJyArIHJhbmdlRGF0YS50ZXh0ICsgJyoqJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgaXRhbGljOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnKicgKyByYW5nZURhdGEudGV4dCArICcqJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgcXVvdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICBmb3IodmFyIGkgPSByYW5nZURhdGEuc3RhcnQ7IGkgPiAwOyBpLS0pXG4gICAgICAgICAgICBpZih2YWx1ZVtpXSA9PSAnXFxuJylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnPiAnO1xuICAgICAgICByYW5nZURhdGEuZW5kID0gcmFuZ2VEYXRhLnN0YXJ0O1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICB1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIGZvcih2YXIgaSA9IHJhbmdlRGF0YS5zdGFydDsgaSA+IDA7IGktLSlcbiAgICAgICAgICAgIGlmKHZhbHVlW2ldID09ICdcXG4nKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICByYW5nZURhdGEuc3RhcnQgPSBpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICctICc7XG4gICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEuc3RhcnQ7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIG9sOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgZm9yKHZhciBpID0gcmFuZ2VEYXRhLnN0YXJ0OyBpID4gMDsgaS0tKVxuICAgICAgICAgICAgaWYodmFsdWVbaV0gPT0gJ1xcbicpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIHJhbmdlRGF0YS5zdGFydCA9IGk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJzEuICc7XG4gICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEuc3RhcnQ7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIGxpbms6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICdb6ZO+5o6lXShodHRwOi8vKSc7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIGltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy4kcmVmcy51cGxvYWRlci51cGxvYWQoKTtcbiAgICB9LFxuICAgIGxhdGV4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnJCRhXjIgKyBiXjIgPSBjXjIkJCc7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIHVwbG9hZGVyU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICdcXG4hW10ofi8nICsgZGF0YS5yZXN1bHQgKyAnKSc7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIHVwbG9hZGVyRXJyb3I6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgTm90aWZ5LmVycm9yKGUpO1xuICAgIH0sXG4gICAgZ2V0Q3Vyc29yUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGV4dGFyZWEgPSB0aGlzLiRyZWZzLnRleHRhcmVhO1xuXG4gICAgICAgIHZhciByYW5nZURhdGEgPSB7dGV4dDogJycsIHN0YXJ0OiAwLCBlbmQ6IDAgfTtcbiAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgIGlmICh0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZSkgeyAvLyBXM0NcbiAgICAgICAgICAgIHJhbmdlRGF0YS5zdGFydD0gdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICByYW5nZURhdGEuZW5kID0gdGV4dGFyZWEuc2VsZWN0aW9uRW5kO1xuICAgICAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAocmFuZ2VEYXRhLnN0YXJ0ICE9IHJhbmdlRGF0YS5lbmQpID8gdGV4dGFyZWEudmFsdWUuc3Vic3RyaW5nKHJhbmdlRGF0YS5zdGFydCwgcmFuZ2VEYXRhLmVuZCk6ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikgeyAvLyBJRVxuICAgICAgICAgICAgdmFyIGksXG4gICAgICAgICAgICAgICAgb1MgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKSxcbiAgICAgICAgICAgICAgICAvLyBEb24ndDogb1IgPSB0ZXh0YXJlYS5jcmVhdGVUZXh0UmFuZ2UoKVxuICAgICAgICAgICAgICAgIG9SID0gZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgICAgIG9SLm1vdmVUb0VsZW1lbnRUZXh0KHRleHRhcmVhKTtcblxuICAgICAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSBvUy50ZXh0O1xuICAgICAgICAgICAgcmFuZ2VEYXRhLmJvb2ttYXJrID0gb1MuZ2V0Qm9va21hcmsoKTtcblxuICAgICAgICAgICAgLy8gb2JqZWN0Lm1vdmVTdGFydChzVW5pdCBbLCBpQ291bnRdKVxuICAgICAgICAgICAgLy8gUmV0dXJuIFZhbHVlOiBJbnRlZ2VyIHRoYXQgcmV0dXJucyB0aGUgbnVtYmVyIG9mIHVuaXRzIG1vdmVkLlxuICAgICAgICAgICAgZm9yIChpID0gMDsgb1IuY29tcGFyZUVuZFBvaW50cygnU3RhcnRUb1N0YXJ0Jywgb1MpIDwgMCAmJiBvUy5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC0xKSAhPT0gMDsgaSArKykge1xuICAgICAgICAgICAgICAgIC8vIFdoeT8gWW91IGNhbiBhbGVydCh0ZXh0YXJlYS52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgaWYgKHRleHRhcmVhLnZhbHVlLmNoYXJBdChpKSA9PSAnXFxuJykge1xuICAgICAgICAgICAgICAgICAgICBpICsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhbmdlRGF0YS5zdGFydCA9IGk7XG4gICAgICAgICAgICByYW5nZURhdGEuZW5kID0gcmFuZ2VEYXRhLnRleHQubGVuZ3RoICsgcmFuZ2VEYXRhLnN0YXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhbmdlRGF0YTtcbiAgICB9LFxuICAgIHNldEN1cnNvclBvc2l0aW9uOiBmdW5jdGlvbihyYW5nZURhdGEpIHtcbiAgICAgICAgaWYoIXJhbmdlRGF0YSkge1xuICAgICAgICAgICAgYWxlcnQoXCJZb3UgbXVzdCBnZXQgY3Vyc29yIHBvc2l0aW9uIGZpcnN0LlwiKVxuICAgICAgICB9XG4gICAgICAgIHZhciB0ZXh0YXJlYSA9IHRoaXMuJHJlZnMudGV4dGFyZWE7XG5cbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gb2xkVmFsdWUuc3Vic3RyaW5nKDAsIHJhbmdlRGF0YS5zdGFydCkgKyByYW5nZURhdGEudGV4dCArIG9sZFZhbHVlLnN1YnN0cmluZyhyYW5nZURhdGEuZW5kLCBvbGRWYWx1ZS5sZW5ndGgpO1xuICAgICAgICByYW5nZURhdGEuZW5kID0gcmFuZ2VEYXRhLnN0YXJ0ICsgcmFuZ2VEYXRhLnRleHQubGVuZ3RoO1xuICAgICAgICBpZiAodGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2UpIHsgLy8gVzNDXG4gICAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICAgICAgdGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2UocmFuZ2VEYXRhLnN0YXJ0LCByYW5nZURhdGEuZW5kKTtcbiAgICAgICAgfSBlbHNlIGlmICh0ZXh0YXJlYS5jcmVhdGVUZXh0UmFuZ2UpIHsgLy8gSUVcbiAgICAgICAgICAgIHZhciBvUiA9IHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgLy8gRml4YnVnIDpcbiAgICAgICAgICAgIC8vIEluIElFLCBpZiBjdXJzb3IgcG9zaXRpb24gYXQgdGhlIGVuZCBvZiB0ZXh0YXJlYSwgdGhlIHNldEN1cnNvclBvc2l0aW9uIGZ1bmN0aW9uIGRvbid0IHdvcmtcbiAgICAgICAgICAgIGlmKHRleHRhcmVhLnZhbHVlLmxlbmd0aCA9PT0gcmFuZ2VEYXRhLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgb1IuY29sbGFwc2UoZmFsc2UpXG4gICAgICAgICAgICAgICAgb1Iuc2VsZWN0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9SLm1vdmVUb0Jvb2ttYXJrKHJhbmdlRGF0YS5ib29rbWFyayk7XG4gICAgICAgICAgICAgICAgb1Iuc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIVE1MRWRpdG9yO1xuIiwibW9kdWxlLmV4cG9ydHM9XCI8dWwgY2xhc3M9XFxcIm0tbGlzdHZpZXcge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxpIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IHNlbGVjdGVkID09PSBpdGVtfSB9IHRpdGxlPXtpdGVtLm5hbWV9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvbGk+ICAgIHsvbGlzdH08L3VsPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIExpc3RWaWV3ICDliJfooajop4blm75cbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9saXN0Vmlldy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBMaXN0Vmlld1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7c3RyaW5nPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5pdGVtVGVtcGxhdGUgICAgICAg5Y2V6aG55qih5p2/XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgTGlzdFZpZXcgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbGlzdFZpZXcnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZWxlY3RlZCDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RWaWV3OyIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNYXJrRWRpdG9yIOe8lui+keWZqFxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21hcmtFZGl0b3IuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxudmFyIG1hcmtlZCA9IHJlcXVpcmUoJ21hcmtlZCcpO1xuXG4vKipcbiAqIEBjbGFzcyBNYXJrRWRpdG9yXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKcgfCBCaW5kaW5nIFByb3BlcnRpZXNcbiAqIEBwYXJhbSB7c3RyaW5nPSfmj5DnpLonfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnRpdGxlICAgICAgICAgICAgICDlr7nor53moYbmoIfpopggfCBUaXRsZSBvZiBEaWFsb2dcbiAqIEBwYXJhbSB7ZnVuY3Rpb259ICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FuY2VsICAgICAgICAgICAgICAgICAg5b2T54K55Ye75Y+W5raI55qE5pe25YCZ5omn6KGMXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKi9cbnZhciBNYXJrRWRpdG9yID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ21hcmtFZGl0b3InLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBjb250ZW50OiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgICBodG1sOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXJrZWQodGhpcy5kYXRhLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBib2xkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnKionICsgcmFuZ2VEYXRhLnRleHQgKyAnKionO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBpdGFsaWM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICcqJyArIHJhbmdlRGF0YS50ZXh0ICsgJyonO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBxdW90ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIGZvcih2YXIgaSA9IHJhbmdlRGF0YS5zdGFydDsgaSA+IDA7IGktLSlcbiAgICAgICAgICAgIGlmKHZhbHVlW2ldID09ICdcXG4nKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICByYW5nZURhdGEuc3RhcnQgPSBpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICc+ICc7XG4gICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEuc3RhcnQ7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIHVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgZm9yKHZhciBpID0gcmFuZ2VEYXRhLnN0YXJ0OyBpID4gMDsgaS0tKVxuICAgICAgICAgICAgaWYodmFsdWVbaV0gPT0gJ1xcbicpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIHJhbmdlRGF0YS5zdGFydCA9IGk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJy0gJztcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgb2w6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICBmb3IodmFyIGkgPSByYW5nZURhdGEuc3RhcnQ7IGkgPiAwOyBpLS0pXG4gICAgICAgICAgICBpZih2YWx1ZVtpXSA9PSAnXFxuJylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnMS4gJztcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgbGluazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJ1vpk77mjqVdKGh0dHA6Ly8pJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgaW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZGVyLnVwbG9hZCgpO1xuICAgIH0sXG4gICAgbGF0ZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICckJGFeMiArIGJeMiA9IGNeMiQkJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgdXBsb2FkZXJTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJ1xcbiFbXSh+LycgKyBkYXRhLnJlc3VsdCArICcpJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgdXBsb2FkZXJFcnJvcjogZnVuY3Rpb24oZSkge1xuICAgICAgICBOb3RpZnkuZXJyb3IoZSk7XG4gICAgfSxcbiAgICBnZXRDdXJzb3JQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0YXJlYSA9IHRoaXMuJHJlZnMudGV4dGFyZWE7XG5cbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHt0ZXh0OiAnJywgc3RhcnQ6IDAsIGVuZDogMCB9O1xuICAgICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgaWYgKHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKSB7IC8vIFczQ1xuICAgICAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0PSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHJhbmdlRGF0YS5lbmQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQ7XG4gICAgICAgICAgICByYW5nZURhdGEudGV4dCA9IChyYW5nZURhdGEuc3RhcnQgIT0gcmFuZ2VEYXRhLmVuZCkgPyB0ZXh0YXJlYS52YWx1ZS5zdWJzdHJpbmcocmFuZ2VEYXRhLnN0YXJ0LCByYW5nZURhdGEuZW5kKTogJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7IC8vIElFXG4gICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICBvUyA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLFxuICAgICAgICAgICAgICAgIC8vIERvbid0OiBvUiA9IHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSgpXG4gICAgICAgICAgICAgICAgb1IgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgb1IubW92ZVRvRWxlbWVudFRleHQodGV4dGFyZWEpO1xuXG4gICAgICAgICAgICByYW5nZURhdGEudGV4dCA9IG9TLnRleHQ7XG4gICAgICAgICAgICByYW5nZURhdGEuYm9va21hcmsgPSBvUy5nZXRCb29rbWFyaygpO1xuXG4gICAgICAgICAgICAvLyBvYmplY3QubW92ZVN0YXJ0KHNVbml0IFssIGlDb3VudF0pXG4gICAgICAgICAgICAvLyBSZXR1cm4gVmFsdWU6IEludGVnZXIgdGhhdCByZXR1cm5zIHRoZSBudW1iZXIgb2YgdW5pdHMgbW92ZWQuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBvUi5jb21wYXJlRW5kUG9pbnRzKCdTdGFydFRvU3RhcnQnLCBvUykgPCAwICYmIG9TLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLTEpICE9PSAwOyBpICsrKSB7XG4gICAgICAgICAgICAgICAgLy8gV2h5PyBZb3UgY2FuIGFsZXJ0KHRleHRhcmVhLnZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBpZiAodGV4dGFyZWEudmFsdWUuY2hhckF0KGkpID09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEudGV4dC5sZW5ndGggKyByYW5nZURhdGEuc3RhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmFuZ2VEYXRhO1xuICAgIH0sXG4gICAgc2V0Q3Vyc29yUG9zaXRpb246IGZ1bmN0aW9uKHJhbmdlRGF0YSkge1xuICAgICAgICBpZighcmFuZ2VEYXRhKSB7XG4gICAgICAgICAgICBhbGVydChcIllvdSBtdXN0IGdldCBjdXJzb3IgcG9zaXRpb24gZmlyc3QuXCIpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRleHRhcmVhID0gdGhpcy4kcmVmcy50ZXh0YXJlYTtcblxuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBvbGRWYWx1ZS5zdWJzdHJpbmcoMCwgcmFuZ2VEYXRhLnN0YXJ0KSArIHJhbmdlRGF0YS50ZXh0ICsgb2xkVmFsdWUuc3Vic3RyaW5nKHJhbmdlRGF0YS5lbmQsIG9sZFZhbHVlLmxlbmd0aCk7XG4gICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEuc3RhcnQgKyByYW5nZURhdGEudGV4dC5sZW5ndGg7XG4gICAgICAgIGlmICh0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZSkgeyAvLyBXM0NcbiAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZShyYW5nZURhdGEuc3RhcnQsIHJhbmdlRGF0YS5lbmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSkgeyAvLyBJRVxuICAgICAgICAgICAgdmFyIG9SID0gdGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICAvLyBGaXhidWcgOlxuICAgICAgICAgICAgLy8gSW4gSUUsIGlmIGN1cnNvciBwb3NpdGlvbiBhdCB0aGUgZW5kIG9mIHRleHRhcmVhLCB0aGUgc2V0Q3Vyc29yUG9zaXRpb24gZnVuY3Rpb24gZG9uJ3Qgd29ya1xuICAgICAgICAgICAgaWYodGV4dGFyZWEudmFsdWUubGVuZ3RoID09PSByYW5nZURhdGEuc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBvUi5jb2xsYXBzZShmYWxzZSlcbiAgICAgICAgICAgICAgICBvUi5zZWxlY3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb1IubW92ZVRvQm9va21hcmsocmFuZ2VEYXRhLmJvb2ttYXJrKTtcbiAgICAgICAgICAgICAgICBvUi5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtFZGl0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXY+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPG1lbnUgbmFtZT17aXRlbS5uYW1lfSBzb3VyY2U9e2l0ZW0uY2hpbGRyZW59IC8+ICAgIHsvbGlzdH08L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNZW51YmFyICDliJfooajop4blm75cbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9tZW51YmFyLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG52YXIgTWVudSA9IHJlcXVpcmUoJy4uL3VuaXQvbWVudS5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBNZW51YmFyXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLml0ZW1UZW1wbGF0ZSAgICAgICDljZXpobnmqKHmnb9cbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBNZW51YmFyID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ21lbnViYXInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBpdGVtVGVtcGxhdGU6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnViYXI7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLW1vZGFsIHtAKGNsYXNzKX1cXFwiIG9uLWtleXVwPXt0aGlzLmtleXVwKCRldmVudCl9IHItaGlkZT17IXZpc2libGV9PiAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbF9kaWFsb2dcXFwiIHsjaWYgd2lkdGh9c3R5bGU9XFxcIndpZHRoOiB7d2lkdGh9cHhcXFwiey9pZn0+ICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbF9oZFxcXCI+ICAgICAgICAgICAgPGEgY2xhc3M9XFxcIm1vZGFsX2Nsb3NlXFxcIiBvbi1jbGljaz17dGhpcy5jbG9zZSghY2FuY2VsQnV0dG9uKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2xvc2VcXFwiPjwvaT48L2E+ICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJtb2RhbF90aXRsZVxcXCI+e3RpdGxlfTwvaDM+ICAgICAgICA8L2Rpdj4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsX2JkXFxcIj4gICAgICAgICAgICB7I2lmIGNvbnRlbnRUZW1wbGF0ZX17I2luY2x1ZGUgQChjb250ZW50VGVtcGxhdGUpfXsjZWxzZX17Y29udGVudH17L2lmfSAgICAgICAgPC9kaXY+ICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbF9mdFxcXCI+ICAgICAgICAgICAgeyNpZiBva0J1dHRvbn0gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJ1LWJ0biB1LWJ0bi1wcmltYXJ5XFxcIiBvbi1jbGljaz17dGhpcy5jbG9zZSh0cnVlKX0+e29rQnV0dG9uID09PSB0cnVlID8gXFwn56Gu5a6aXFwnIDogb2tCdXR0b259PC9idXR0b24+ICAgICAgICAgICAgey9pZn0gICAgICAgICAgICB7I2lmIGNhbmNlbEJ1dHRvbn0gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuY2xvc2UoZmFsc2UpfT57Y2FuY2VsQnV0dG9uID09PSB0cnVlID8gXFwn5Y+W5raIXFwnIDogY2FuY2VsQnV0dG9ufTwvYnV0dG9uPiAgICAgICAgICAgIHsvaWZ9ICAgICAgICA8L2Rpdj4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTW9kYWwgICAgIOaooeaAgeWvueivneahhlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21vZGFsLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIE1vZGFsXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKcgfCBCaW5kaW5nIFByb3BlcnRpZXNcbiAqIEBwYXJhbSB7c3RyaW5nPSfmj5DnpLonfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnRpdGxlICAgICAgICAgICAgICDlr7nor53moYbmoIfpopggfCBUaXRsZSBvZiBEaWFsb2dcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jb250ZW50ICAgICAgICAgICAg5a+56K+d5qGG5YaF5a65XG4gKiBAcGFyYW0ge3N0cmluZ3xib29sZWFuPXRydWV9ICAgICBvcHRpb25zLmRhdGEub2tCdXR0b24gICAgICAgICAgIOaYr+WQpuaYvuekuuehruWumuaMiemSruOAguWAvOS4umBzdHJpbmdg5pe25pi+56S66K+l5q615paH5a2X44CCXG4gKiBAcGFyYW0ge3N0cmluZ3xib29sZWFuPWZhbHNlfSAgICBvcHRpb25zLmRhdGEuY2FuY2VsQnV0dG9uICAgICAgIOaYr+WQpuaYvuekuuWPlua2iOaMiemSruOAguWAvOS4umBzdHJpbmdg5pe25pi+56S66K+l5q615paH5a2X44CCXG4gKiBAcGFyYW0ge251bWJlcj1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEud2lkdGggICAgICAgICAgICAgIOWvueivneahhuWuveW6puOAguWAvOS4uuWQpuWumuaXtuWuveW6puS4ukNTU+iuvue9rueahOWuveW6puOAglxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgTW9kYWwgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbW9kYWwnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAnJyxcbiAgICAgICAgICAgIG9rQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIHdpZHRoOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgICAgIC8vIOivgeaYjuS4jeaYr+WGheW1jOe7hOS7tlxuICAgICAgICBpZih0aGlzLiRyb290ID09PSB0aGlzKVxuICAgICAgICAgICAgdGhpcy4kaW5qZWN0KGRvY3VtZW50LmJvZHkpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjbG9zZShyZXN1bHQpIOWFs+mXreaooeaAgeWvueivneahhlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSByZXN1bHQg54K55Ye756Gu5a6a6L+Y5piv5Y+W5raIXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjbG9zZTogZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgY2xvc2Ug5YWz6Zet5a+56K+d5qGG5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVzdWx0IOeCueWHu+S6huehruWumui/mOaYr+WPlua2iFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnLCB7XG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0ID8gdGhpcy5vaygpIDogdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBvazogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgb2sg56Gu5a6a5a+56K+d5qGG5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdvaycpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjYW5jZWwg5Y+W5raI5a+56K+d5qGG5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKTtcblxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIGtleXVwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgaWYoJGV2ZW50LndoaWNoID09IDEzKVxuICAgICAgICAgICAgdGhpcy5vaygpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEBtZXRob2QgYWxlcnQoY29udGVudFssdGl0bGVdKSDlvLnlh7rkuIDkuKphbGVydOWvueivneahhuOAguWFs+mXreaXtuWni+e7iOinpuWPkeehruWumuS6i+S7tuOAglxuICogQHN0YXRpY1xuICogQHB1YmxpY1xuICogQHBhcmFtICB7c3RyaW5nPScnfSBjb250ZW50IOWvueivneahhuWGheWuuVxuICogQHBhcmFtICB7c3RyaW5nPSfmj5DnpLonfSB0aXRsZSDlr7nor53moYbmoIfpophcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbk1vZGFsLmFsZXJ0ID0gZnVuY3Rpb24oY29udGVudCwgdGl0bGUsIG9rQnV0dG9uKSB7XG4gICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIG9rQnV0dG9uOiBva0J1dHRvblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1vZGFsO1xufVxuXG4vKipcbiAqIEBtZXRob2QgY29uZmlybShjb250ZW50Wyx0aXRsZV0pIOW8ueWHuuS4gOS4qmNvbmZpcm3lr7nor53moYZcbiAqIEBzdGF0aWNcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSAge3N0cmluZz0nJ30gY29udGVudCDlr7nor53moYblhoXlrrlcbiAqIEBwYXJhbSAge3N0cmluZz0n5o+Q56S6J30gdGl0bGUg5a+56K+d5qGG5qCH6aKYXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5Nb2RhbC5jb25maXJtID0gZnVuY3Rpb24oY29udGVudCwgdGl0bGUsIG9rQnV0dG9uLCBjYW5jZWxCdXR0b24pIHtcbiAgICB2YXIgbW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgb2tCdXR0b246IG9rQnV0dG9uLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiBjYW5jZWxCdXR0b24gfHwgdHJ1ZVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1vZGFsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsO1xuIiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLW5vdGlmeSBtLW5vdGlmeS17QChwb3NpdGlvbil9IHtAKGNsYXNzKX1cXFwiIHItaGlkZT17IXZpc2libGV9PiAgICB7I2xpc3QgbWVzc2FnZXMgYXMgbWVzc2FnZX0gICAgPGRpdiBjbGFzcz1cXFwibm90aWZ5X21lc3NhZ2Ugbm90aWZ5X21lc3NhZ2Ute0AobWVzc2FnZS50eXBlKX1cXFwiIHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW4gZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dCBmYXN0O1xcXCI+ICAgICAgICA8YSBjbGFzcz1cXFwibm90aWZ5X2Nsb3NlXFxcIiBvbi1jbGljaz17dGhpcy5jbG9zZShtZXNzYWdlKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2xvc2VcXFwiPjwvaT48L2E+ICAgICAgICA8ZGl2IGNsYXNzPVxcXCJub3RpZnlfdGV4dFxcXCI+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24te0AobWVzc2FnZS50eXBlKX0tY2lyY2xlXFxcIiByLWhpZGU9e0AoIW1lc3NhZ2UudHlwZSl9PjwvaT4ge0AobWVzc2FnZS50ZXh0KX08L2Rpdj4gICAgPC9kaXY+ICAgIHsvbGlzdH08L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBOb3RpZnkgICAg6YCa55+lXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbm90aWZ5Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIE5vdGlmeVxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg55uR5ZCs5pWw5o2uXG4gKiBAcGFyYW0ge3N0cmluZz0ndG9wY2VudGVyJ30gICAgICBvcHRpb25zLmRhdGEucG9zaXRpb24gICAgICAgICAgIOmAmuefpeeahOS9jee9ru+8jOWPr+mAieWPguaVsO+8mmB0b3BjZW50ZXJg44CBYHRvcGxlZnRg44CBYHRvcHJpZ2h0YOOAgWBib3R0b21jZW50ZXJg44CBYGJvdHRvbWxlZnRg44CBYGJvdHRvbXJpZ2h0YOOAgWBzdGF0aWNgXG4gKiBAcGFyYW0ge251bWJlcj0yMDAwfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZHVyYXRpb24gICAgICAgICAgIOavj+adoea2iOaBr+eahOWBnOeVmeavq+enkuaVsO+8jOWmguaenOS4ujDvvIzliJnooajnpLrmtojmga/luLjpqbvkuI3mtojlpLHjgIJcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBOb3RpZnkgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbm90aWZ5JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgcG9zaXRpb246ICd0b3BjZW50ZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICAgICAgLy8g6K+B5piO5LiN5piv5YaF5bWM57uE5Lu2XG4gICAgICAgIGlmKHRoaXMuJHJvb3QgPT09IHRoaXMpXG4gICAgICAgICAgICB0aGlzLiRpbmplY3QoZG9jdW1lbnQuYm9keSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNob3codGV4dFssdHlwZV1bLGR1cmF0aW9uXSkg5by55Ye65LiA5Liq5raI5oGvXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge3N0cmluZz0nJ30gdGV4dCDmtojmga/lhoXlrrlcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmc9bnVsbH0gdHlwZSDmtojmga/nsbvlnovvvIzlj6/pgInlj4LmlbDvvJpgaW5mb2DjgIFgc3VjY2Vzc2DjgIFgd2FybmluZ2DjgIFgZXJyb3JgXG4gICAgICogQHBhcmFtICB7bnVtYmVyPW5vdGlmeS5kdXJhdGlvbn0gZHVyYXRpb24g6K+l5p2h5raI5oGv55qE5YGc55WZ5q+r56eS5pWw77yM5aaC5p6c5Li6MO+8jOWImeihqOekuua2iOaBr+W4uOmpu+S4jea2iOWkseOAglxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2hvdzogZnVuY3Rpb24odGV4dCwgdHlwZSwgZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiA+PSAwID8gZHVyYXRpb24gOiB0aGlzLmRhdGEuZHVyYXRpb25cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhLm1lc3NhZ2VzLnVuc2hpZnQobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuXG4gICAgICAgIGlmKG1lc3NhZ2UuZHVyYXRpb24pXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KHRoaXMuY2xvc2UuYmluZCh0aGlzLCBtZXNzYWdlKSwgbWVzc2FnZS5kdXJhdGlvbik7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzaG93IOW8ueWHuuS4gOS4qua2iOaBr+aXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gbWVzc2FnZSDlvLnlh7rnmoTmtojmga/lr7nosaFcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3Nob3cnLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjbG9zZShtZXNzYWdlKSDlhbPpl63mn5DmnaHmtojmga9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBtZXNzYWdlIOmcgOimgeWFs+mXreeahOa2iOaBr+WvueixoVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2xvc2U6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5kYXRhLm1lc3NhZ2VzLmluZGV4T2YobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuZGF0YS5tZXNzYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjbG9zZSDlhbPpl63mn5DmnaHmtojmga/ml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IG1lc3NhZ2Ug5YWz6Zet5LqG55qE5raI5oGv5a+56LGhXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb3NlQWxsKCkg5YWz6Zet5omA5pyJ5raI5oGvXG4gICAgICogQHB1YmxpY1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2xvc2VBbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiR1cGRhdGUoJ21lc3NhZ2VzJywgW10pO1xuICAgIH1cbn0pLnVzZSgnJHRpbWVvdXQnKTtcblxuXG4vKipcbiAqIOebtOaOpeWIneWni+WMluS4gOS4quWunuS+i1xuICogQHR5cGUge05vdGlmeX1cbiAqL1xudmFyIG5vdGlmeSA9IG5ldyBOb3RpZnkoKTtcbk5vdGlmeS5ub3RpZnkgPSBub3RpZnk7XG5cbi8qKlxuICogQG1ldGhvZCBzaG93KHRleHRbLHR5cGVdWyxkdXJhdGlvbl0pIOW8ueWHuuS4gOS4qua2iOaBr1xuICogQHN0YXRpY1xuICogQHB1YmxpY1xuICogQHBhcmFtICB7c3RyaW5nPScnfSB0ZXh0IOa2iOaBr+WGheWuuVxuICogQHBhcmFtICB7c3RyaW5nPW51bGx9IHR5cGUg5raI5oGv57G75Z6L77yM5Y+v6YCJ5Y+C5pWw77yaYGluZm9g44CBYHN1Y2Nlc3Ng44CBYHdhcm5pbmdg44CBYGVycm9yYFxuICogQHBhcmFtICB7bnVtYmVyPW5vdGlmeS5kdXJhdGlvbn0gZHVyYXRpb24g6K+l5p2h5raI5oGv55qE5YGc55WZ5q+r56eS5pWw77yM5aaC5p6c5Li6MO+8jOWImeihqOekuua2iOaBr+W4uOmpu+S4jea2iOWkseOAglxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuTm90aWZ5LnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICBub3RpZnkuc2hvdy5hcHBseShub3RpZnksIGFyZ3VtZW50cyk7XG59XG4vKipcbiAqIEBtZXRob2QgW2luZm98c3VjY2Vzc3x3YXJuaW5nfGVycm9yXSh0ZXh0KSDlvLnlh7rnibnmrornsbvlnovnmoTmtojmga9cbiAqIEBzdGF0aWNcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSAge3N0cmluZz0nJ30gdGV4dCDmtojmga/lhoXlrrlcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciB0eXBlcyA9IFsnc3VjY2VzcycsICd3YXJuaW5nJywgJ2luZm8nLCAnZXJyb3InXTtcbnR5cGVzLmZvckVhY2goZnVuY3Rpb24odHlwZSkge1xuICAgIE5vdGlmeVt0eXBlXSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgTm90aWZ5LnNob3codGV4dCwgdHlwZSk7XG4gICAgfVxufSk7XG4vKipcbiAqIEBtZXRob2QgY2xvc2UobWVzc2FnZSkg5YWz6Zet5p+Q5p2h5raI5oGvXG4gKiBAc3RhdGljXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gIHtvYmplY3R9IG1lc3NhZ2Ug6ZyA6KaB5YWz6Zet55qE5raI5oGv5a+56LGhXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5Ob3RpZnkuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBub3RpZnkuY2xvc2UuYXBwbHkobm90aWZ5LCBhcmd1bWVudHMpO1xufVxuLyoqXG4gKiBAbWV0aG9kIGNsb3NlQWxsKCkg5YWz6Zet5omA5pyJ5raI5oGvXG4gKiBAc3RhdGljXG4gKiBAcHVibGljXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5Ob3RpZnkuY2xvc2VBbGwgPSBmdW5jdGlvbigpIHtcbiAgICBub3RpZnkuY2xvc2VBbGwuYXBwbHkobm90aWZ5LCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vdGlmeTsiLCJtb2R1bGUuZXhwb3J0cz1cIjx1bCBjbGFzcz1cXFwibS1wYWdlciBtLXBhZ2VyLXtAKHBvc2l0aW9uKX0ge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDxsaSBjbGFzcz1cXFwicGFnZXJfcHJldlxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJyA6IGN1cnJlbnQgPD0gMX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoY3VycmVudCAtIDEpfT48YT7kuIrkuIDpobU8L2E+PC9saT4gICAgeyNpZiB0b3RhbCAtIG1pZGRsZSA+IHNpZGUgKiAyICsgMX0gICAgICAgIHsjbGlzdCAxLi5zaWRlIGFzIGl9ICAgICAgICA8bGkgci1jbGFzcz17IHtcXCd6LWNydFxcJzogY3VycmVudCA9PSBpfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpKX0+PGE+e2l9PC9hPjwvbGk+ICAgICAgICB7L2xpc3R9ICAgICAgICB7I2lmIF9zdGFydCA+IHNpZGUgKyAxfTxsaT4uLi48L2xpPnsvaWZ9ICAgICAgICB7I2xpc3QgX3N0YXJ0Li5fZW5kIGFzIGl9ICAgICAgICA8bGkgci1jbGFzcz17IHtcXCd6LWNydFxcJzogY3VycmVudCA9PSBpfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpKX0+PGE+e2l9PC9hPjwvbGk+ICAgICAgICB7L2xpc3R9ICAgICAgICB7I2lmIF9lbmQgPCB0b3RhbCAtIHNpZGV9PGxpPi4uLjwvbGk+ey9pZn0gICAgICAgIHsjbGlzdCAodG90YWwgLSBzaWRlICsgMSkuLnRvdGFsIGFzIGl9ICAgICAgICA8bGkgci1jbGFzcz17IHtcXCd6LWNydFxcJzogY3VycmVudCA9PSBpfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpKX0+PGE+e2l9PC9hPjwvbGk+ICAgICAgICB7L2xpc3R9ICAgIHsjZWxzZX0gICAgICAgIHsjbGlzdCAxLi50b3RhbCBhcyBpfSAgICAgICAgPGxpIHItY2xhc3M9eyB7XFwnei1jcnRcXCc6IGN1cnJlbnQgPT0gaX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaSl9PjxhPntpfTwvYT48L2xpPiAgICAgICAgey9saXN0fSAgICB7L2lmfSAgICA8bGkgY2xhc3M9XFxcInBhZ2VyX25leHRcXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCcgOiBjdXJyZW50ID49IHRvdGFsfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChjdXJyZW50ICsgMSl9PjxhPuS4i+S4gOmhtTwvYT48L2xpPjwvdWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUGFnZXIgICAgIOWIhumhtVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9wYWdlci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBQYWdlclxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg55uR5ZCs5pWw5o2uXG4gKiBAcGFyYW0ge251bWJlcj0xfSAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY3VycmVudCAgICAgICAgICAgIOW9k+WJjemhtVxuICogQHBhcmFtIHt0b3RhbD0xMX0gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnRvdGFsICAgICAgICAgICAgICDmgLvpobXmlbBcbiAqIEBwYXJhbSB7c3RyaW5nPSdjZW50ZXInfSAgICAgICAgIG9wdGlvbnMuZGF0YS5wb3NpdGlvbiAgICAgICAgICAg5YiG6aG155qE5L2N572u77yM5Y+v6YCJ5Y+C5pWw77yaYGNlbnRlcmDjgIFgbGVmdGDjgIFgcmlnaHRgXG4gKiBAcGFyYW0ge21pZGRsZT01fSAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubWlkZGxlICAgICAgICAgICAgIOW9k+mhteaVsOi+g+WkmuaXtu+8jOS4remXtOaYvuekuueahOmhteaVsFxuICogQHBhcmFtIHtzaWRlPTJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNpZGUgICAgICAgICAgICAgICDlvZPpobXmlbDovoPlpJrml7bvvIzkuKTnq6/mmL7npLrnmoTpobXmlbBcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIFBhZ2VyID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3BhZ2VyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBjdXJyZW50OiAxLFxuICAgICAgICAgICAgdG90YWw6IDExLFxuICAgICAgICAgICAgcG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgICAgICAgbWlkZGxlOiA1LFxuICAgICAgICAgICAgc2lkZTogMixcbiAgICAgICAgICAgIF9zdGFydDogMSxcbiAgICAgICAgICAgIF9lbmQ6IDVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIHRoaXMuJHdhdGNoKFsnY3VycmVudCcsICd0b3RhbCddLCBmdW5jdGlvbihjdXJyZW50LCB0b3RhbCkge1xuICAgICAgICAgICAgdmFyIHNob3cgPSB0aGlzLmRhdGEubWlkZGxlPj4xO1xuICAgICAgICAgICAgdmFyIHNpZGUgPSB0aGlzLmRhdGEuc2lkZTtcblxuICAgICAgICAgICAgdGhpcy5kYXRhLl9zdGFydCA9IGN1cnJlbnQgLSBzaG93O1xuICAgICAgICAgICAgdGhpcy5kYXRhLl9lbmQgPSBjdXJyZW50ICsgc2hvdztcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5fc3RhcnQgPCBzaWRlICsgMSlcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuX3N0YXJ0ID0gc2lkZSArIDE7XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuX2VuZCA+IHRvdGFsIC0gc2lkZSlcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuX2VuZCA9IHRvdGFsIC0gc2lkZTtcbiAgICAgICAgICAgIGlmKGN1cnJlbnQgLSB0aGlzLmRhdGEuX3N0YXJ0IDwgc2hvdylcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuX2VuZCArPSB0aGlzLmRhdGEuX3N0YXJ0IC0gY3VycmVudCArIHNob3c7XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuX2VuZCAtIGN1cnJlbnQgPCBzaG93KVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5fc3RhcnQgKz0gdGhpcy5kYXRhLl9lbmQgLSBjdXJyZW50IC0gc2hvdztcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChwYWdlKSDpgInmi6nmn5DkuIDpobVcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBwYWdlIOmAieaLqemhtVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYocGFnZSA8IDEpIHJldHVybjtcbiAgICAgICAgaWYocGFnZSA+IHRoaXMuZGF0YS50b3RhbCkgcmV0dXJuO1xuICAgICAgICBpZihwYWdlID09IHRoaXMuZGF0YS5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5kYXRhLmN1cnJlbnQgPSBwYWdlO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobXml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGN1cnJlbnQg5b2T5YmN6YCJ5oup6aG1XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBjdXJyZW50OiB0aGlzLmRhdGEuY3VycmVudFxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tdGFiIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8dWwgY2xhc3M9XFxcInRhYl9oZFxcXCI+ICAgICAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgICAgICA8bGkgci1jbGFzcz17IHtcXCd6LWNydFxcJzogaXRlbSA9PSBzZWxlY3RlZCwgXFwnei1kaXNcXCc6IGl0ZW0uZGlzYWJsZWR9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGl0ZW0pfT57aXRlbS5uYW1lfTwvbGk+ICAgICAgICB7L2xpc3R9ICAgIDwvdWw+ICAgIDxkaXYgY2xhc3M9XFxcInRhYl9iZFxcXCI+ICAgICAgICA8ci1jb250ZW50IC8+ICAgIDwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRhYiAgICAgICDpgInpobnljaFcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90YWIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgVGFiXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIFRhYiA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICd0YWInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoaXRlbSkg6YCJ5oup5p+Q5LiA6aG5XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDpgInmi6npoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZihpdGVtLmRpc2FibGVkIHx8IHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZWxlY3RlZCDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG52YXIgVGFiUGFuZSA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICd0YWJQYW5lJyxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgci1oaWRlPXt0aGlzLiRvdXRlci5kYXRhLnNlbGVjdGVkLnRhYiAhPSB0aGlzfT48ci1jb250ZW50PjwvZGl2PicsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7IFxuICAgICAgICBpZih0aGlzLiRvdXRlcikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuJG91dGVyLmRhdGEuc291cmNlO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5kYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGF0YS5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICB0YWI6IHRoaXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzb3VyY2UucHVzaChpdGVtKTtcblxuICAgICAgICAgICAgaWYoIXRoaXMuJG91dGVyLmRhdGEuc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy4kb3V0ZXIuZGF0YS5zZWxlY3RlZCA9IGl0ZW07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUYWI7IiwibW9kdWxlLmV4cG9ydHM9XCI8dGFibGUgY2xhc3M9XFxcIm0tdGFibGUgbS10YWJsZXZpZXcge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCdtLXRhYmxlLXN0cmlwZWRcXCc6IHN0cmlwZWQsIFxcJ20tdGFibGUtaG92ZXJcXCc6IGhvdmVyfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8dGhlYWQ+ICAgICAgICA8dHI+ICAgICAgICAgICAgeyNsaXN0IGZpZWxkcyBhcyBmaWVsZH0gICAgICAgICAgICA8dGggci1jbGFzcz17IHtcXCd0YWJsZXZpZXdfc29ydGFibGVcXCc6IGZpZWxkLnNvcnRhYmxlfSB9IG9uLWNsaWNrPXt0aGlzLnNvcnQoZmllbGQpfT4gICAgICAgICAgICAgICAge2ZpZWxkLm5hbWUgfHwgZmllbGQua2V5fSAgICAgICAgICAgICAgICB7I2lmIGZpZWxkLnNvcnRhYmxlfSAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XFxcInUtaWNvbiB7b3JkZXIuYnkgPT09IGZpZWxkLmtleSA/IChvcmRlci5kZXNjID8gXFwndS1pY29uLXNvcnQtZGVzY1xcJyA6IFxcJ3UtaWNvbi1zb3J0LWFzY1xcJykgOiBcXCd1LWljb24tc29ydFxcJ31cXFwiPjwvaT4gICAgICAgICAgICAgICAgey9pZn0gICAgICAgICAgICA8L3RoPiAgICAgICAgICAgIHsvbGlzdH0gICAgICAgIDwvdHI+ICAgIDwvdGhlYWQ+ICAgIDx0Ym9keT4gICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgIDx0cj4gICAgICAgICAgICB7I2xpc3QgZmllbGRzIGFzIGZpZWxkfSAgICAgICAgICAgIDx0ZD57aXRlbVtmaWVsZC5rZXldfTwvdGQ+ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC90cj4gICAgICAgIHsvbGlzdH0gICAgPC90Ym9keT48L3RhYmxlPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRhYmxlVmlldyDooajmoLzop4blm75cbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90YWJsZVZpZXcuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgVGFibGVWaWV3XG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmZpZWxkICAgICAgICAgICAgICDlrZfmrrXpm4ZcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5maWVsZFtdLmtleSAgICAgICAg5q+P5Liq5a2X5q6155qEa2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZmllbGRbXS5uYW1lICAgICAgIOavj+S4quWtl+auteWcqOihqOWktOaYvuekuueahOaWh+Wtl++8jOWmguaenOayoeacieWImeaYvuekumtleVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnN0cmlwZWQgICAgICAgICAgICDmmK/lkKbmmL7npLrmnaHnurlcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ob3ZlciAgICAgICAgICAgICAg5piv5ZCm5q+P6KGM5ZyoaG92ZXLml7bmmL7npLrmoLflvI9cbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgVGFibGVWaWV3ID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RhYmxlVmlldycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGZpZWxkczogW10sXG4gICAgICAgICAgICBzdHJpcGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFRPRE86IOaaguS4jeiAg+iZkeWkmuWtl+auteaOkuW6j1xuICAgICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgICAgICBieTogbnVsbCxcbiAgICAgICAgICAgICAgICBkZXNjOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNvcnQoZmllbGQpIOaMieeFp+afkOS4quWtl+auteaOkuW6j1xuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGZpZWxkIOaOkuW6j+Wtl+autVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc29ydDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgaWYoIWZpZWxkLnNvcnRhYmxlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBvcmRlciA9IHRoaXMuZGF0YS5vcmRlcjtcblxuICAgICAgICBpZihvcmRlci5ieSA9PT0gZmllbGQua2V5KVxuICAgICAgICAgICAgb3JkZXIuZGVzYyA9ICFvcmRlci5kZXNjO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9yZGVyLmJ5ID0gZmllbGQua2V5O1xuICAgICAgICAgICAgb3JkZXIuZGVzYyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zZXJ2aWNlKVxuICAgICAgICAgICAgdGhpcy4kdXBkYXRlU291cmNlKCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNvdXJjZS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICBpZihvcmRlci5kZXNjKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVtvcmRlci5ieV0gPCBiW29yZGVyLmJ5XTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhW29yZGVyLmJ5XSA+IGJbb3JkZXIuYnldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzb3J0IOaMieeFp+afkOS4quWtl+auteaOkuW6j+aXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gZmllbGQg5o6S5bqP5a2X5q61XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzb3J0Jywge1xuICAgICAgICAgICAgZmllbGQ6IGZpZWxkXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYmxlVmlldzsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tdHJlZXZpZXcge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDx0cmVlVmlld0xpc3Qgc291cmNlPXtzb3VyY2V9IHZpc2libGU9e3RydWV9IC8+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVHJlZVZpZXcgIOagkeWei+inhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RyZWVWaWV3Lmh0bWwnKTtcbnZhciBoaWVyYXJjaGljYWxUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdHJlZVZpZXdMaXN0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFRyZWVWaWV3XG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5oaWVyYXJjaGljYWwgICAgICAg5piv5ZCm5YiG57qn5Yqo5oCB5Yqg6L2977yM6ZyA6KaBc2VydmljZVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIFRyZWVWaWV3ID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RyZWVWaWV3JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBoaWVyYXJjaGljYWw6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZWxlY3RlZCDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG52YXIgVHJlZVZpZXdMaXN0ID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RyZWVWaWV3TGlzdCcsXG4gICAgdGVtcGxhdGU6IGhpZXJhcmNoaWNhbFRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogbnVsbCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXMuJHBhcmVudC4kYW5jZXN0b3I7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHRoaXMuJGFuY2VzdG9yLnNlcnZpY2U7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtVGVtcGxhdGUgPSB0aGlzLiRhbmNlc3Rvci5kYXRhLml0ZW1UZW1wbGF0ZTtcbiAgICAgICAgdGhpcy5kYXRhLmhpZXJhcmNoaWNhbCA9IHRoaXMuJGFuY2VzdG9yLmRhdGEuaGllcmFyY2hpY2FsO1xuXG4gICAgICAgIHRoaXMuJHdhdGNoKCd2aXNpYmxlJywgZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmRhdGEuaGllcmFyY2hpY2FsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgaWYoIW5ld1ZhbHVlIHx8IHRoaXMuJHBhcmVudC5uYW1lICE9PSAndHJlZVZpZXdMaXN0JylcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuJHVwZGF0ZVNvdXJjZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaGllcmFyY2hpY2FsID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBnZXRQYXJhbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLmRhdGEucGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKHtwYXJlbnRJZDogdGhpcy5kYXRhLnBhcmVudC5pZH0sIHRoaXMuJGFuY2VzdG9yLmdldFBhcmFtcygpKTtcbiAgICB9LFxuICAgICR1cGRhdGVTb3VyY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0TGlzdCh0aGlzLmdldFBhcmFtcygpLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIOe7meavj+S4quiKgueCuWl0ZW3mt7vliqBwYXJlbnRcbiAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMuZGF0YS5wYXJlbnQ7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLiR1cGRhdGUoJ3NvdXJjZScsIHJlc3VsdCk7XG5cbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZVNvdXJjZScsIHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoaXRlbSkg6YCJ5oup5p+Q5LiA6aG5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYodGhpcy4kYW5jZXN0b3IuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLiRhbmNlc3Rvci5zZWxlY3QoaXRlbSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvZ2dsZShpdGVtKSDlsZXlvIDmiJbmlLbotbfmn5DkuIDpoblcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDlsZXlvIDmlLbotbfpoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRvZ2dsZTogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZih0aGlzLiRhbmNlc3Rvci5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGl0ZW0ub3BlbiA9ICFpdGVtLm9wZW47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCB0b2dnbGUg5bGV5byA5oiW5pS26LW35p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBpdGVtIOWxleW8gOaUtui1t+mhuVxuICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IG9wZW4g5bGV5byA6L+Y5piv5pS26LW3XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRhbmNlc3Rvci4kZW1pdCgndG9nZ2xlJywge1xuICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgIG9wZW46IGl0ZW0ub3BlblxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmVlVmlldzsiLCJtb2R1bGUuZXhwb3J0cz1cIjx1bCBjbGFzcz1cXFwidHJlZXZpZXdfbGlzdFxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxpPiAgICAgICAgPGRpdiBjbGFzcz1cXFwidHJlZXZpZXdfaXRlbVxcXCI+ICAgICAgICAgICAgeyNpZiBpdGVtLmNoaWxkcmVuQ291bnQgfHwgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGgpfSAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJ1LWljb25cXFwiIHItY2xhc3M9eyB7XFwndS1pY29uLWNhcmV0LXJpZ2h0XFwnOiAhaXRlbS5vcGVuLCBcXCd1LWljb24tY2FyZXQtZG93blxcJzogaXRlbS5vcGVufX0gb24tY2xpY2s9e3RoaXMudG9nZ2xlKGl0ZW0pfT48L2k+ICAgICAgICAgICAgey9pZn0gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0cmVldmlld19pdGVtbmFtZVxcXCIgci1jbGFzcz17IHtcXCd6LXNlbFxcJzogdGhpcy4kYW5jZXN0b3IuZGF0YS5zZWxlY3RlZCA9PT0gaXRlbX0gfSB0aXRsZT17aXRlbS5uYW1lfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PnsjaWYgQChpdGVtVGVtcGxhdGUpfXsjaW5jbHVkZSBAKGl0ZW1UZW1wbGF0ZSl9eyNlbHNlfXtpdGVtLm5hbWV9ey9pZn08L2Rpdj4gICAgICAgIDwvZGl2PiAgICAgICAgeyNpZiBpdGVtLmNoaWxkcmVuQ291bnQgfHwgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGgpfTx0cmVlVmlld0xpc3Qgc291cmNlPXtpdGVtLmNoaWxkcmVufSB2aXNpYmxlPXtpdGVtLm9wZW59IHBhcmVudD17aXRlbX0gLz57L2lmfSAgICA8L2xpPiAgICB7L2xpc3R9PC91bD5cIiIsIm1vZHVsZS5leHBvcnRzPVwiPGxhYmVsIGNsYXNzPVxcXCJ1LWNoZWNrMiB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZCwgXFwnei1jaGtcXCc6IGNoZWNrZWQsIFxcJ3otcGFydFxcJzogY2hlY2tlZCA9PT0gbnVsbCwgXFwndS1jaGVjazItYmxvY2tcXCc6IGJsb2NrfSB9IHItaGlkZT17IXZpc2libGV9IHRpdGxlPXtuYW1lfSBvbi1jbGljaz17dGhpcy5jaGVjayghY2hlY2tlZCl9PjxkaXYgY2xhc3M9XFxcImNoZWNrMl9ib3hcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNoZWNrXFxcIj48L2k+PC9kaXY+IHtuYW1lfTwvbGFiZWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2hlY2syICAg5aSa6YCJ5oyJ6ZKuXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vY2hlY2syLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIENoZWNrMlxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubmFtZSAgICAgICAgICAgICAgIOWkmumAieaMiemSrueahOaWh+Wtl1xuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNoZWNrZWQgICAgICAgICAgICDlpJrpgInmjInpkq7nmoTpgInmi6nnirbmgIFcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5piv5ZCm5LulYmxvY2vmlrnlvI/mmL7npLpcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIENoZWNrMiA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdjaGVjazInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYmxvY2s6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2hlY2soY2hlY2tlZCkg5pS55Y+Y6YCJ5Lit54q25oCBXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjaGVjazogZnVuY3Rpb24oY2hlY2tlZCkge1xuICAgICAgICBpZih0aGlzLmRhdGEucmVhZG9ubHkgfHwgdGhpcy5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZGF0YS5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjaGVjayDmlLnlj5jpgInkuK3nirbmgIHml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBjaGVja2VkIOmAieS4reeKtuaAgVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnY2hlY2snLCB7XG4gICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrMjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdW5pdGdyb3VwIHtAKGNsYXNzKX1cXFwiIHItaGlkZT17IXZpc2libGV9PiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxjaGVjazIgbmFtZT17aXRlbS5uYW1lfSBjaGVja2VkPXtpdGVtLmNoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gYmxvY2s9e2Jsb2NrfSAvPiAgICB7L2xpc3R9PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2hlY2syR3JvdXAg6L6T5YWl5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2hlY2tHcm91cCA9IHJlcXVpcmUoJy4vY2hlY2tHcm91cC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9jaGVjazJHcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xudmFyIENoZWNrMiA9IHJlcXVpcmUoJy4vY2hlY2syLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIENoZWNrMkdyb3VwXG4gKiBAZXh0ZW5kIENoZWNrR3JvdXBcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgQ2hlY2syR3JvdXAgPSBDaGVja0dyb3VwLmV4dGVuZCh7XG4gICAgbmFtZTogJ2NoZWNrMkdyb3VwJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrMkdyb3VwOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS11bml0Z3JvdXAge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxhYmVsIGNsYXNzPVxcXCJ1LWNoZWNrMlxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWQsIFxcJ3UtY2hlY2syLWJsb2NrXFwnOiBibG9ja30gfSB0aXRsZT17aXRlbS5uYW1lfT48aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIGNsYXNzPVxcXCJ1LWNoZWNrXFxcIiByLW1vZGVsPXtpdGVtLmNoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0+IHtpdGVtLm5hbWV9PC9sYWJlbD4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENoZWNrR3JvdXAg5aSa6YCJ57uEXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vY2hlY2tHcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBDaGVja0dyb3VwXG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmJsb2NrICAgICAgICAgICAgICDlpJrooYzmmL7npLpcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBDaGVja0dyb3VwID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2NoZWNrR3JvdXAnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBibG9jazogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjaGVja0FsbChjaGVja2VkKSDmlLnlj5jmiYDmnInlpJrpgInnmoTpgInkuK3nirbmgIFcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBjaGVja2VkIOmAieS4reeKtuaAgVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2hlY2tBbGw6IGZ1bmN0aW9uKGNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjaGVja0FsbCDmlLnlj5jmiYDmnInlpJrpgInnmoTpgInkuK3nirbmgIHml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGVja0FsbCcsIHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IGNoZWNrZWRcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tHcm91cDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zdWdnZXN0IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIj4gICAgICAgIDxpbnB1dCBjbGFzcz1cXFwidS1pbnB1dCB1LWlucHV0LWZ1bGxcXFwiIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gdmFsdWU9e2RhdGUgfCBmb3JtYXQ6IFxcJ3l5eXktTU0tZGRcXCd9IG9uLWZvY3VzPXt0aGlzLnRvZ2dsZSh0cnVlKX0gb24tY2hhbmdlPXt0aGlzLmNoYW5nZSgkZXZlbnQpfSByZWY9XFxcImlucHV0XFxcIiBkaXNhYmxlZD17ZGlzYWJsZWR9IHsjaWYgcmVhZG9ubHl9cmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcInsvaWZ9PiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25fYmRcXFwiIHItaGlkZT17IW9wZW59IHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW5ZIGZhc3Q7IG9uOiBsZWF2ZTsgY2xhc3M6IGFuaW1hdGVkIGZhZGVPdXRZIGZhc3Q7XFxcIj4gICAgICAgIDxjYWxlbmRhciBkYXRlPXtkYXRlfSBvbi1zZWxlY3Q9e3RoaXMuc2VsZWN0KCRldmVudC5kYXRlKX0gLz4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0ZVBpY2tlciDml6XmnJ/pgInmi6lcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgRHJvcGRvd24gPSByZXF1aXJlKCcuL2Ryb3Bkb3duLmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2RhdGVQaWNrZXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uL2Jhc2UvZmlsdGVyLmpzJyk7XG52YXIgQ2FsZW5kYXIgPSByZXF1aXJlKCcuLi9tb2R1bGUvY2FsZW5kYXIuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgRGF0ZVBpY2tlclxuICogQGV4dGVuZCBEcm9wZG93blxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kYXRlICAgICAgICAgICAgICAg5b2T5YmN6YCJ5oup55qE5pel5pyfXG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36L6T5YWlJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOaWh+acrOahhum7mOiupOaWh+Wtl1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgRGF0ZVBpY2tlciA9IERyb3Bkb3duLmV4dGVuZCh7XG4gICAgbmFtZTogJ2RhdGVQaWNrZXInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGRhdGUpIOmAieaLqeS4gOS4quaXpeacn1xuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtEYXRlPW51bGx9IGRhdGUg6YCJ5oup55qE5pel5pyfXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkYXRlIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH0sXG4gICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgkZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgaWYoZGF0ZSAhPSAnSW52YWxpZCBEYXRlJylcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kYXRlID0gZGF0ZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRlUGlja2VyOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS1kcm9wZG93biB1LWRyb3Bkb3duLXN1Z2dlc3QgdS1kcm9wZG93bi1kYXRldGltZXBpY2tlciB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfSByZWY9XFxcImVsZW1lbnRcXFwiPiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9oZFxcXCI+ICAgICAgICA8aW5wdXQgY2xhc3M9XFxcInUtaW5wdXQgdS1pbnB1dC1mdWxsXFxcIiBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IHZhbHVlPXtkYXRlIHwgZm9ybWF0OiBcXCd5eXl5LU1NLWRkIEhIOm1tXFwnfSBvbi1mb2N1cz17dGhpcy50b2dnbGUodHJ1ZSl9IG9uLWNoYW5nZT17dGhpcy5jaGFuZ2UoJGV2ZW50KX0gcmVmPVxcXCJpbnB1dFxcXCIgZGlzYWJsZWQ9e2Rpc2FibGVkfSB7I2lmIHJlYWRvbmx5fXJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJ7L2lmfT4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2JkXFxcIiByLWhpZGU9eyFvcGVufSByLWFuaW1hdGlvbj1cXFwib246IGVudGVyOyBjbGFzczogYW5pbWF0ZWQgZmFkZUluWSBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0WSBmYXN0O1xcXCI+ICAgICAgICA8Y2FsZW5kYXIgZGF0ZT17c2VsZWN0ZWREYXRlfSBvbi1zZWxlY3Q9e3RoaXMuc2VsZWN0KCRldmVudC5kYXRlKX0gLz4gICAgICAgIDx1bCBjbGFzcz1cXFwibS1saXN0dmlld1xcXCI+ICAgICAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgICAgIDxsaSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PntpdGVtLm5hbWV9PC9saT4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3VsPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEYXRlVGltZVBpY2tlciDml6XmnJ/pgInmi6lcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgRGF0ZVBpY2tlciA9IHJlcXVpcmUoJy4vZGF0ZVBpY2tlci5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9kYXRlVGltZVBpY2tlci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi4vYmFzZS9maWx0ZXIuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgRGF0ZVRpbWVQaWNrZXJcbiAqIEBleHRlbmQgRGF0ZVBpY2tlclxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kYXRlICAgICAgICAgICAgICAg5b2T5YmN6YCJ5oup55qE5pel5pyfXG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36L6T5YWlJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOaWh+acrOahhum7mOiupOaWh+Wtl1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgRGF0ZVRpbWVQaWNrZXIgPSBEYXRlUGlja2VyLmV4dGVuZCh7XG4gICAgbmFtZTogJ2RhdGVUaW1lUGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDEwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUnLFxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgc2VsZWN0ZWRUaW1lOiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG5cbiAgICAgICAgLy8gdGhpcy4kd2F0Y2goJ3NlbGVjdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIC8vICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vICAgICB0aGlzLiRyZWZzLmNhbGVuZGFyLmRhdGEuc2VsZWN0ZWQgPSBuZXdWYWx1ZTtcblxuICAgICAgICAvLyAgICAgdmFyIHRpbWUgPSAgZmlsdGVyLmZvcm1hdChuZXdWYWx1ZSwgbmV3VmFsdWUuZ2V0TWludXRlcygpJTMwID09PSAwID8gJ0hIOm1tJyA6ICdISDowMCcpO1xuICAgICAgICAvLyAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5zb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZGF0YS5zb3VyY2VbaV07ICAgXG4gICAgICAgIC8vICAgICAgICAgaWYodGltZSA9PT0gaXRlbS5uYW1lKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZFRpbWUgPSBpdGVtO1xuICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHRoaXMuJHdhdGNoKFsnc2VsZWN0ZWREYXRlJywgJ3NlbGVjdGVkVGltZSddLCBmdW5jdGlvbihzZWxlY3RlZERhdGUsIHNlbGVjdGVkVGltZSkge1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWREYXRlICYmIHNlbGVjdGVkVGltZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodGhpcy5kYXRhLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWUgPSB0aGlzLmRhdGEuc2VsZWN0ZWRUaW1lLnNwbGl0KCc6Jyk7XG5cbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRpbWVbMF0pO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyh0aW1lWzFdKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldFNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBkYXRlO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGRhdGUg5b2T5YmN6YCJ5oup6aG5XG4gICAgICAgICAqL1xuICAgICAgICAvLyB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgIC8vICAgICBkYXRlOiBpdGVtXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIGlmKCEoaXRlbSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkVGltZSA9IGl0ZW0ubmFtZTtcblxuICAgICAgICBpZighKGl0ZW0gaW5zdGFuY2VvZiBEYXRlKSB8fCB0aGlzLmRhdGEuc2VsZWN0ZWRUaW1lKVxuICAgICAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH0sXG4gICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmKGRhdGUgIT0gJ0ludmFsaWQgRGF0ZScpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuZGF0YS5kYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkVGltZSA9IHZhbHVlLnNwbGl0KCcgJylbMV07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRlVGltZVBpY2tlcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24ge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0gcmVmPVxcXCJlbGVtZW50XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25faGRcXFwiPiAgICAgICAgPGEgY2xhc3M9XFxcInUtYnRuIHUtYnRuLXByaW1hcnlcXFwiIG9uLWNsaWNrPXt0aGlzLnRvZ2dsZSghb3Blbil9PntuYW1lIHx8IFxcJ+iPnOWNlVxcJ30gPGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPjwvYT4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2JkXFxcIiByLWhpZGU9eyFvcGVufSByLWFuaW1hdGlvbj1cXFwib246IGVudGVyOyBjbGFzczogYW5pbWF0ZWQgZmFkZUluWSBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0WSBmYXN0O1xcXCI+ICAgICAgICA8dWwgY2xhc3M9XFxcIm0tbGlzdHZpZXdcXFwiPiAgICAgICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgICAgICA8bGkgb24tY2xpY2s9e3RoaXMuc2VsZWN0KGl0ZW0pfT57I2lmIEAoaXRlbVRlbXBsYXRlKX17I2luY2x1ZGUgQChpdGVtVGVtcGxhdGUpfXsjZWxzZX17aXRlbS5uYW1lfXsvaWZ9PC9saT4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3VsPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEcm9wZG93biAg5LiL5ouJ6I+c5Y2VXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2Ryb3Bkb3duLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIERyb3Bkb3duXG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLml0ZW1UZW1wbGF0ZSAgICAgICDljZXpobnmqKHmnb9cbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5vcGVuICAgICAgICAgICAgICAg5b2T5YmN5Li65bGV5byAL+aUtui1t+eKtuaAgVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgRHJvcGRvd24gPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBvcGVuOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIC8vdGhpcy5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZWxlY3RlZCDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvZ2dsZShvcGVuKSDlnKjlsZXlvIAv5pS26LW354q25oCB5LmL6Ze05YiH5o2iXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IG9wZW4g5bGV5byAL+aUtui1t1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihvcGVuKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRhdGEub3BlbiA9IG9wZW47XG5cbiAgICAgICAgLy8g5qC55o2u54q25oCB5ZyoRHJvcGRvd24ub3BlbnPliJfooajkuK3mt7vliqAv5Yig6Zmk566h55CG6aG5XG4gICAgICAgIHZhciBpbmRleCA9IERyb3Bkb3duLm9wZW5zLmluZGV4T2YodGhpcyk7XG4gICAgICAgIGlmKG9wZW4gJiYgaW5kZXggPCAwKVxuICAgICAgICAgICAgRHJvcGRvd24ub3BlbnMucHVzaCh0aGlzKTtcbiAgICAgICAgZWxzZSBpZighb3BlbiAmJiBpbmRleCA+PSAwKVxuICAgICAgICAgICAgRHJvcGRvd24ub3BlbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59KTtcblxuLy8g5aSE55CG54K55Ye7ZHJvcGRvd27kuYvlpJbnmoTlnLDmlrnlkI7nmoTmlLbotbfkuovku7bjgIJcbkRyb3Bkb3duLm9wZW5zID0gW107XG5cbl8uZG9tLm9uKGRvY3VtZW50LmJvZHksICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBEcm9wZG93bi5vcGVucy5mb3JFYWNoKGZ1bmN0aW9uKGRyb3Bkb3duKSB7XG4gICAgICAgIC8vIOi/meS4quWcsOaWueS4jeiDveeUqHN0b3BQcm9wYWdhdGlvbuadpeWkhOeQhu+8jOWboOS4uuWxleW8gOS4gOS4qmRyb3Bkb3du55qE5ZCM5pe26KaB5pS26LW35YW25LuWZHJvcGRvd25cbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkcm9wZG93bi4kcmVmcy5lbGVtZW50O1xuICAgICAgICB2YXIgZWxlbWVudDIgPSBlLnRhcmdldDtcbiAgICAgICAgd2hpbGUoZWxlbWVudDIpIHtcbiAgICAgICAgICAgIGlmKGVsZW1lbnQgPT0gZWxlbWVudDIpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZWxlbWVudDIgPSBlbGVtZW50Mi5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGRyb3Bkb3duLnRvZ2dsZShmYWxzZSk7XG4gICAgICAgIGRyb3Bkb3duLiR1cGRhdGUoKTtcbiAgICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3Bkb3duOyIsIm1vZHVsZS5leHBvcnRzPVwiPGEgY2xhc3M9XFxcInUtYnRuXFxcIiBvbi1jbGljaz17dGhpcy5nb3RvcCgpfT7lm57liLDpobbpg6g8L2E+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogR290b3AgIOWbnuWIsOmhtumDqFxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2dvdG9wLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEdvdG9wXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIEdvdG9wID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2dvdG9wJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZ290b3AoKSDlm57liLDpobbpg6hcbiAgICAgKiBAcHVibGljXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBnb3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdvdG9wOyIsIm1vZHVsZS5leHBvcnRzPVwiPGxhYmVsIGNsYXNzPVxcXCJ1LWlucHV0MiB7QChjbGFzcyl9XFxcIiByLWhpZGU9eyF2aXNpYmxlfT4gICAgPGlucHV0IGNsYXNzPVxcXCJ1LWlucHV0IHUtaW5wdXQte3R5cGV9XFxcIiByLW1vZGVsPXt2YWx1ZX0gb24ta2V5dXA9e3RoaXMudmFsaWRhdGUodmFsdWUpfT4gICAgPHNwYW4gY2xhc3M9XFxcImlucHV0Ml90aXBcXFwiPnt0aXB9PC9zcGFuPjwvbGFiZWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogSW5wdXQyICAg6L6T5YWl5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2lucHV0Mi5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBJbnB1dDJcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgSW5wdXQyID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2lucHV0MicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIHVuaXQ6ICclJyxcbiAgICAgICAgICAgIHR5cGU6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgdmFyIHJlZyA9IC9eXFxkKyQvO1xuICAgICAgICBpZighcmVnLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEudGlwID0gJ+ivt+i+k+WFpeaVsOWtl++8gSc7XG4gICAgICAgICAgICB0aGlzLmRhdGEudHlwZSA9ICdlcnJvcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEudGlwID0gJyc7XG4gICAgICAgICAgICB0aGlzLmRhdGEudHlwZSA9ICdzdWNjZXNzJztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0MjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1tZW51IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIj4gICAgICAgIDxhIGNsYXNzPVxcXCJ1LWJ0biB1LWJ0bi1wcmltYXJ5XFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT57bmFtZSB8fCBcXCfoj5zljZVcXCd9IDxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNhcmV0LWRvd25cXFwiPjwvaT48L2E+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPG1lbnVMaXN0IHNvdXJjZT17c291cmNlfSB2aXNpYmxlPXt0cnVlfSAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNZW51ICAgICAg5aSa57qn6I+c5Y2VXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi9kcm9wZG93bi5qcycpO1xudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21lbnUuaHRtbCcpO1xudmFyIGhpZXJhcmNoaWNhbFRlbXBsYXRlID0gcmVxdWlyZSgnLi9tZW51TGlzdC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyAgTWVudVxuICogQGV4dGVuZCBEcm9wZG93blxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLm9wZW4gICAgICAgICAgICAgICDlvZPliY3kuLrlsZXlvIAv5pS26LW354q25oCBXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBNZW51ID0gRHJvcGRvd24uZXh0ZW5kKHtcbiAgICBuYW1lOiAnbWVudScsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIG9wZW46IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXM7XG4gICAgfVxufSk7XG5cbnZhciBNZW51TGlzdCA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdtZW51TGlzdCcsXG4gICAgdGVtcGxhdGU6IGhpZXJhcmNoaWNhbFRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogbnVsbCxcbiAgICAgICAgICAgIC8vIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXMuJHBhcmVudC4kYW5jZXN0b3I7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHRoaXMuJGFuY2VzdG9yLnNlcnZpY2U7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtVGVtcGxhdGUgPSB0aGlzLiRhbmNlc3Rvci5kYXRhLml0ZW1UZW1wbGF0ZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuJGFuY2VzdG9yLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy4kYW5jZXN0b3Iuc2VsZWN0KGl0ZW0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB0b2dnbGUoaXRlbSkg5bGV5byA5oiW5pS26LW35p+Q5LiA6aG5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g5bGV5byA5pS26LW36aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGU6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYodGhpcy4kYW5jZXN0b3IuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpdGVtLm9wZW4gPSAhaXRlbS5vcGVuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgdG9nZ2xlIOWxleW8gOaIluaUtui1t+afkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gaXRlbSDlsZXlvIDmlLbotbfpoblcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBvcGVuIOWxleW8gOi/mOaYr+aUtui1t1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kYW5jZXN0b3IuJGVtaXQoJ3RvZ2dsZScsIHtcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICBvcGVuOiBpdGVtLm9wZW5cbiAgICAgICAgfSk7XG4gICAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBNZW51OyIsIm1vZHVsZS5leHBvcnRzPVwiPHVsIGNsYXNzPVxcXCJtLWxpc3R2aWV3IG1lbnVfbGlzdFxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxpPiAgICAgICAgPGRpdiBjbGFzcz1cXFwibWVudV9pdGVtXFxcIj4gICAgICAgICAgICB7I2lmIGl0ZW0uY2hpbGRyZW5Db3VudCB8fCAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCl9ICAgICAgICAgICAgPGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtcmlnaHRcXFwiPjwvaT4gICAgICAgICAgICB7L2lmfSAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1lbnVfaXRlbW5hbWVcXFwiIHRpdGxlPXtpdGVtLm5hbWV9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvZGl2PiAgICAgICAgPC9kaXY+ICAgICAgICB7I2lmIGl0ZW0uY2hpbGRyZW5Db3VudCB8fCAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCl9PG1lbnVMaXN0IHNvdXJjZT17aXRlbS5jaGlsZHJlbn0gdmlzaWJsZT17aXRlbS5vcGVufSBwYXJlbnQ9e2l0ZW19IC8+ey9pZn0gICAgPC9saT4gICAgey9saXN0fTwvdWw+XCIiLCJtb2R1bGUuZXhwb3J0cz1cIjxsYWJlbCBjbGFzcz1cXFwidS1pbnB1dDIgdS1pbnB1dDItbnVtYmVyaW5wdXQge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIDxpbnB1dCBjbGFzcz1cXFwidS1pbnB1dCB1LWlucHV0LXt0eXBlfVxcXCIgci1tb2RlbD17dmFsdWUgfCBudW1iZXJ9IG9uLWtleXVwPXt0aGlzLnZhbGlkYXRlKHZhbHVlKX0+ICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuaW5jcmVhc2UoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtdXBcXFwiPjwvaT48L2E+ICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuZGVjcmVhc2UoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPjwvYT4gICAgPHNwYW4gY2xhc3M9XFxcImlucHV0Ml90aXBcXFwiPnt0aXB9PC9zcGFuPjwvbGFiZWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTnVtYmVySW5wdXQg6L6T5YWl5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL251bWJlcklucHV0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIE51bWJlcklucHV0XG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIE51bWJlcklucHV0ID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ251bWJlcklucHV0JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICB1bml0OiAnJScsXG4gICAgICAgICAgICB0eXBlOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIH0sXG4gICAgaW5jcmVhc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRhdGEudmFsdWUrKztcbiAgICB9LFxuICAgIGRlY3JlYXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kYXRhLnZhbHVlLS07XG4gICAgfVxufSkuZmlsdGVyKHtcbiAgICBudW1iZXI6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnICsgKHZhbHVlIHx8IDApO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gK3ZhbHVlIHx8IDA7XG4gICAgICAgICAgICAvLyByZXR1cm4gKyh2YWx1ZS5yZXBsYWNlKC9bXlxcZFxcLlxcLV0vZywgJycpKSB8fCAwO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTnVtYmVySW5wdXQ7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LXByb2dyZXNzIHUtcHJvZ3Jlc3Mte0Aoc2l6ZSl9IHUtcHJvZ3Jlc3Mte0AodHlwZSl9IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwndS1wcm9ncmVzcy1zdHJpcGVkXFwnOiBzdHJpcGVkLCBcXCd6LWFjdFxcJzogYWN0aXZlfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8ZGl2IGNsYXNzPVxcXCJwcm9ncmVzc19iYXJcXFwiIHN0eWxlPVxcXCJ3aWR0aDoge3BlcmNlbnR9JTtcXFwiPnt0ZXh0ID8gKHRleHQgPT09IHRydWUgPyBwZXJjZW50ICsgXFwnJVxcJyA6IHRleHQpIDogXFwnXFwnfTwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFByb2dyZXNzICDov5vluqbmnaFcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9wcm9ncmVzcy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBQcm9ncmVzc1xuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge251bWJlcj0zNn0gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEucGVyY2VudCAgICAgICAgICAgIOeZvuWIhuavlFxuICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbj10cnVlfSAgICAgb3B0aW9ucy5kYXRhLnRleHQgICAgICAgICAgICAgICDlnKjov5vluqbmnaHkuK3mmK/lkKbmmL7npLrnmb7liIbmr5TjgILlgLzkuLpgc3RyaW5nYOaXtuaYvuekuuivpeauteaWh+Wtl+OAglxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNpemUgICAgICAgICAgICAgICDov5vluqbmnaHnmoTlsLrlr7hcbiAqIEBwYXJhbSB7c3RyaW5nPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS50eXBlICAgICAgICAgICAgICAg6L+b5bqm5p2h55qE57G75Z6L77yM5pS55Y+Y5pi+56S66aKc6ImyXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuc3RyaXBlZCAgICAgICAgICAgIOaYr+WQpuaYvuekuuadoee6uVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmFjdGl2ZSAgICAgICAgICAgICDov5vluqbmnaHmmK/lkKbkuLrmv4DmtLvnirbmgIHvvIzlvZNgc3RyaXBlZGDkuLpgdHJ1ZWDml7bvvIzov5vluqbmnaHmmL7npLrliqjnlLtcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBQcm9ncmVzcyA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdwcm9ncmVzcycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHBlcmNlbnQ6IDM2LFxuICAgICAgICAgICAgdGV4dDogdHJ1ZSxcbiAgICAgICAgICAgIHNpemU6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgc3RyaXBlZDogZmFsc2UsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9ncmVzczsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdW5pdGdyb3VwIHtAKGNsYXNzKX1cXFwiIHItaGlkZT17IXZpc2libGV9PiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxsYWJlbCBjbGFzcz1cXFwidS1yYWRpbzJcXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkLCBcXCd6LXNlbFxcJzogaXRlbSA9PT0gc2VsZWN0ZWQsIFxcJ3UtcmFkaW8yLWJsb2NrXFwnOiBibG9ja30gfSB0aXRsZT17aXRlbS5uYW1lfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PjxkaXYgY2xhc3M9XFxcInJhZGlvMl9ib3hcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLXJhZGlvXFxcIj48L2k+PC9kaXY+IHtpdGVtLm5hbWV9PC9sYWJlbD4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFJhZGlvMkdyb3VwIOi+k+WFpeaJqeWxlVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJhZGlvR3JvdXAgPSByZXF1aXJlKCcuL3JhZGlvR3JvdXAuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcmFkaW8yR3JvdXAuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgUmFkaW8yR3JvdXBcbiAqIEBleHRlbmQgUmFkaW9Hcm91cFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjZWQgICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgUmFkaW8yR3JvdXAgPSBSYWRpb0dyb3VwLmV4dGVuZCh7XG4gICAgbmFtZTogJ3JhZGlvMkdyb3VwJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJhZGlvMkdyb3VwOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS11bml0Z3JvdXAge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxhYmVsIGNsYXNzPVxcXCJ1LXJhZGlvMlxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWQsIFxcJ3UtcmFkaW8yLWJsb2NrXFwnOiBibG9ja30gfSB0aXRsZT17aXRlbS5uYW1lfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PjxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgY2xhc3M9XFxcInUtcmFkaW9cXFwiIG5hbWU9e19yYWRpb0dyb3VwSWR9IGRpc2FibGVkPXtkaXNhYmxlZH0+IHtpdGVtLm5hbWV9PC9sYWJlbD4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFJhZGlvR3JvdXAg5Y2V6YCJ57uEXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcmFkaW9Hcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBSYWRpb0dyb3VwXG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjZWQgICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgUmFkaW9Hcm91cCA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdyYWRpb0dyb3VwJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICBfcmFkaW9Hcm91cElkOiBuZXcgRGF0ZSgpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9Hcm91cDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zZWxlY3QyIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT4gICAgICAgIDxzcGFuPntzZWxlY3RlZCA/IHNlbGVjdGVkLm5hbWUgOiBwbGFjZWhvbGRlcn08L3NwYW4+ICAgICAgICA8aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jYXJldC1kb3duXFxcIj48L2k+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPHVsIGNsYXNzPVxcXCJtLWxpc3R2aWV3XFxcIj4gICAgICAgICAgICB7I2lmIHBsYWNlaG9sZGVyfTxsaSByLWNsYXNzPXsge1xcJ3otc2VsXFwnOiBzZWxlY3RlZCA9PT0gbnVsbH0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QobnVsbCl9PntwbGFjZWhvbGRlcn08L2xpPnsvaWZ9ICAgICAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otc2VsXFwnOiBzZWxlY3RlZCA9PT0gaXRlbX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PntpdGVtLm5hbWV9PC9saT4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3VsPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBTZWxlY3QyICDpgInmi6nmianlsZVcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBEcm9wZG93biA9IHJlcXVpcmUoJy4vZHJvcGRvd24uanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vc2VsZWN0Mi5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBTZWxlY3QyXG4gKiBAZXh0ZW5kIERyb3Bkb3duXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9J+ivt+mAieaLqSd9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBsYWNlaG9sZGVyICAgICAgICDpu5jorqTpobnnmoTmloflrZdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBTZWxlY3QyID0gRHJvcGRvd24uZXh0ZW5kKHtcbiAgICBuYW1lOiAnc2VsZWN0MicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2VcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICfor7fpgInmi6knXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCdzZWxlY3RlZCcsIGl0ZW0pO1xuICAgICAgICAvL3RoaXMuZGF0YS5zZWxlY3RlZCA9IGl0ZW07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2VsZWN0ZWQg5b2T5YmN6YCJ5oup6aG5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBzZWxlY3RlZDogaXRlbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3QyOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS1kcm9wZG93biB1LWRyb3Bkb3duLXN1Z2dlc3Qge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0gcmVmPVxcXCJlbGVtZW50XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25faGRcXFwiPiAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJ1LWlucHV0IHUtaW5wdXQtZnVsbFxcXCIgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfSByLW1vZGVsPXt2YWx1ZX0gb24tZm9jdXM9e3RoaXMuaW5wdXQoJGV2ZW50KX0gb24ta2V5dXA9e3RoaXMuaW5wdXQoJGV2ZW50KX0gb24tYmx1cj17dGhpcy51bmlucHV0KCRldmVudCl9IHJlZj1cXFwiaW5wdXRcXFwiIGRpc2FibGVkPXtkaXNhYmxlZH0geyNpZiByZWFkb25seX1yZWFkb25seT1cXFwicmVhZG9ubHlcXFwiey9pZn0+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPHVsIGNsYXNzPVxcXCJtLWxpc3R2aWV3XFxcIj4gICAgICAgICAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgICAgICAgICAgeyNpZiB0aGlzLmZpbHRlcihpdGVtKX0gICAgICAgICAgICAgICAgPGxpIG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+e2l0ZW0ubmFtZX08L2xpPiAgICAgICAgICAgIHsvaWZ9ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC91bD4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogU3VnZ2VzdCAgIOiHquWKqOaPkOekulxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi9kcm9wZG93bi5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zdWdnZXN0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG52YXIgTGlzdFZpZXcgPSByZXF1aXJlKCcuLi9tb2R1bGUvbGlzdFZpZXcuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgU3VnZ2VzdFxuICogQGV4dGVuZCBEcm9wZG93blxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52YWx1ZSAgICAgICAgICAgICAg5paH5pys5qGG5Lit55qE5YC8XG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36L6T5YWlJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOaWh+acrOahhum7mOiupOaWh+Wtl1xuICogQHBhcmFtIHtudW1iZXI9MH0gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLm1pbkxlbmd0aCAgICAgICAgICDmnIDlsI/mj5DnpLrplb/luqbjgILlvZPovpPlhaXplb/luqY+PeivpeWAvOWQjuW8gOWni+aPkOekulxuICogQHBhcmFtIHtzdHJpbmc9J2FsbCd9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLm1hdGNoVHlwZSAgICAgICAgICDljLnphY3mlrnlvI/vvIxgYWxsYOihqOekuuWMuemFjeWFqOWxgO+8jGBzdGFydGDooajnpLrlj6rljLnphY3lvIDlpLTvvIxgZW5kYOihqOekuuWPquWMuemFjee7k+WwvlxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnN0cmljdCAgICAgICAgICAgICDmmK/lkKbkuLrkuKXmoLzmqKHlvI/jgILlvZPkuLrkuKXmoLzmqKHlvI/ml7bvvIxgdmFsdWVg5bGe5oCn5b+F6aG75Zyoc291cmNl5Lit6YCJ5oup77yM5ZCm5YiZ5Li656m644CCXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgU3VnZ2VzdCA9IERyb3Bkb3duLmV4dGVuZCh7XG4gICAgbmFtZTogJ3N1Z2dlc3QnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ+ivt+i+k+WFpScsXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDAsXG4gICAgICAgICAgICBkZWxheTogMzAwLFxuICAgICAgICAgICAgbWF0Y2hUeXBlOiAnYWxsJyxcbiAgICAgICAgICAgIHN0cmljdDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoaXRlbSkg6YCJ5oup5p+Q5LiA6aG5XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDpgInmi6npoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB0aGlzLiR1cGRhdGUoJ3NlbGVjdGVkJywgaXRlbSk7XG4gICAgICAgIHRoaXMuZGF0YS52YWx1ZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgLy90aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdG9nZ2xlKG9wZW4pICDlnKjlsZXlvIDnirbmgIHlkozmlLbotbfnirbmgIHkuYvpl7TliIfmjaJcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gb3BlbiDlsZXlvIDov5jmmK/mlLbotbdcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRvZ2dsZTogZnVuY3Rpb24ob3BlbiwgX2lzSW5wdXQpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEub3BlbiA9IG9wZW47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCB0b2dnbGUg5bGV5byA5oiW5pS26LW354q25oCB5pS55Y+Y5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gb3BlbiDlsZXlvIDov5jmmK/mlLbotbdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3RvZ2dsZScsIHtcbiAgICAgICAgICAgIG9wZW46IG9wZW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gRHJvcGRvd24ub3BlbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgaWYob3BlbiAmJiBpbmRleCA8IDApXG4gICAgICAgICAgICBEcm9wZG93bi5vcGVucy5wdXNoKHRoaXMpO1xuICAgICAgICBlbHNlIGlmKCFvcGVuICYmIGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIERyb3Bkb3duLm9wZW5zLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIGlmKCFfaXNJbnB1dCAmJiB0aGlzLmRhdGEuc3RyaWN0KVxuICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZhbHVlID0gdGhpcy5kYXRhLnNlbGVjdGVkID8gdGhpcy5kYXRhLnNlbGVjdGVkLm5hbWUgOiAnJztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8g6L6T5YWl5pe2XG4gICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmRhdGEudmFsdWU7XG5cbiAgICAgICAgaWYodmFsdWUubGVuZ3RoID49IHRoaXMuZGF0YS5taW5MZW5ndGgpXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSh0cnVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UsIHRydWUpO1xuICAgIH0sXG4gICAgdW5pbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG5cbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmRhdGEudmFsdWU7XG5cbiAgICAgICAgaWYoIXZhbHVlICYmIHRoaXMuZGF0YS5taW5MZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYodGhpcy5kYXRhLm1hdGNoVHlwZSA9PSAnYWxsJylcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbiAgICAgICAgZWxzZSBpZih0aGlzLmRhdGEubWF0Y2hUeXBlID09ICdzdGFydCcpXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCkgPT0gdmFsdWU7XG4gICAgICAgIGVsc2UgaWYodGhpcy5kYXRhLm1hdGNoVHlwZSA9PSAnZW5kJylcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUuc2xpY2UoLXZhbHVlLmxlbmd0aCkgPT0gdmFsdWU7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3VnZ2VzdDsiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGltZVBpY2tlciDml6XmnJ/pgInmi6lcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgU3VnZ2VzdCA9IHJlcXVpcmUoJy4vc3VnZ2VzdC5qcycpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgVGltZVBpY2tlclxuICogQGV4dGVuZCBTdWdnZXN0XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZhbHVlICAgICAgICAgICAgICDmlofmnKzmoYbkuK3nmoTlgLxcbiAqIEBwYXJhbSB7c3RyaW5nPSfor7fovpPlhaUnfSAgICAgICAgIG9wdGlvbnMuZGF0YS5wbGFjZWhvbGRlciAgICAgICAg5paH5pys5qGG6buY6K6k5paH5a2XXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBUaW1lUGlja2VyID0gU3VnZ2VzdC5leHRlbmQoe1xuICAgIG5hbWU6ICd0aW1lUGlja2VyJyxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDEwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCB2YWx1ZTogJycsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHBsYWNlaG9sZGVyOiAn6K+36L6T5YWlJyxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgbWluTGVuZ3RoOiAwLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBkZWxheTogMzAwLFxuICAgICAgICAgICAgbWF0Y2hUeXBlOiAnc3RhcnQnXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHN0cmljdDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVQaWNrZXI7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWRyb3Bkb3duIHUtZHJvcGRvd24tc2VsZWN0MiB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfSByZWY9XFxcImVsZW1lbnRcXFwiPiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9oZFxcXCIgb24tY2xpY2s9e3RoaXMudG9nZ2xlKCFvcGVuKX0+ICAgICAgICA8aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jYXJldC1kb3duXFxcIj48L2k+ICAgICAgICA8c3Bhbj57c2VsZWN0ZWQgPyBzZWxlY3RlZC5uYW1lIDogcGxhY2Vob2xkZXJ9PC9zcGFuPiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25fYmRcXFwiIHItaGlkZT17IW9wZW59IHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW5ZIGZhc3Q7IG9uOiBsZWF2ZTsgY2xhc3M6IGFuaW1hdGVkIGZhZGVPdXRZIGZhc3Q7XFxcIj4gICAgICAgIDx0cmVlVmlldyBzb3VyY2U9e3NvdXJjZX0gb24tc2VsZWN0PXt0aGlzLnNlbGVjdCgkZXZlbnQuc2VsZWN0ZWQpfSAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUcmVlU2VsZWN0IOagkeWei+mAieaLqVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNlbGVjdDIgPSByZXF1aXJlKCcuL3NlbGVjdDIuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdHJlZVNlbGVjdC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xudmFyIFRyZWV2aWV3ID0gcmVxdWlyZSgnLi4vbW9kdWxlL3RyZWVWaWV3LmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFRyZWVTZWxlY3RcbiAqIEBleHRlbmQgU2VsZWN0MlxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7c3RyaW5nPSfor7fpgInmi6knfSAgICAgICAgIG9wdGlvbnMuZGF0YS5wbGFjZWhvbGRlciAgICAgICAg6buY6K6k6aG555qE5paH5a2XXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgVHJlZVNlbGVjdCA9IFNlbGVjdDIuZXh0ZW5kKHtcbiAgICBuYW1lOiAndHJlZVNlbGVjdCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHBsYWNlaG9sZGVyOiAn6K+36YCJ5oupJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZVNlbGVjdDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdXBsb2FkZXIge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMudXBsb2FkKCl9PntuYW1lIHx8IFxcJ+S4iuS8oFxcJ308L2E+ICAgIDxmb3JtIG1ldGhvZD1cXFwiUE9TVFxcXCIgYWN0aW9uPXt1cmx9IHRhcmdldD1cXFwiaWZyYW1le19pZH1cXFwiIGVuY3R5cGU9e2NvbnRlbnRUeXBlfSByZWY9XFxcImZvcm1cXFwiPiAgICAgICAgPGlucHV0IHR5cGU9XFxcImZpbGVcXFwiIG5hbWU9XFxcImZpbGVcXFwiIHJlZj1cXFwiZmlsZVxcXCIgb24tY2hhbmdlPXt0aGlzLnN1Ym1pdCgpfT4gICAgICAgIHsjbGlzdCBPYmplY3Qua2V5cyhkYXRhKSBhcyBrZXl9ICAgICAgICA8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPXtrZXl9IHZhbHVlPXtkYXRhW2tleV19PiAgICAgICAgey9saXN0fSAgICA8L2Zvcm0+ICAgIDxpZnJhbWUgbmFtZT1cXFwiaWZyYW1le19pZH1cXFwiIG9uLWxvYWQ9e3RoaXMuY2JVcGxvYWQoKX0gcmVmPVxcXCJpZnJhbWVcXFwiPiAgICA8L2lmcmFtZT48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBVcGxvYWRlciAg5LiK5LygXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdXBsb2FkZXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgVXBsb2FkZXJcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLm5hbWUgICAgICAgICAgICAgICDmjInpkq7mloflrZdcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS51cmwgICAgICAgICAgICAgICAg5LiK5Lyg6Lev5b6EXG4gKiBAcGFyYW0ge3N0cmluZz0nanNvbid9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGF0YVR5cGUgICAgICAgICAgIOaVsOaNruexu+Wei1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRhdGEgICAgICAgICAgICAgICDpmYTliqDmlbDmja5cbiAqIEBwYXJhbSB7c3RyaW5nW109bnVsbH0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5leHRlbnNpb25zICAgICAgICAg5Y+v5LiK5Lyg55qE5omp5bGV5ZCN77yM5aaC5p6c5Li656m677yM5YiZ6KGo56S65Y+v5LiK5Lyg5Lu75L2V5paH5Lu257G75Z6LXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIFVwbG9hZGVyID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3VwbG9hZGVyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IG51bGwsXG4gICAgICAgICAgICBfaWQ6IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdXBsb2FkKCkg5by55Ye65paH5Lu25a+56K+d5qGG5bm25LiU5LiK5Lyg5paH5Lu2XG4gICAgICogQHB1YmxpY1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdXBsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy4kcmVmcy5maWxlLmNsaWNrKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHN1Ym1pdCgpIOaPkOS6pOihqOWNlVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzdWJtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLmRhdGEuZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gdGhpcy4kcmVmcy5maWxlLnZhbHVlO1xuICAgICAgICAgICAgdmFyIGV4dCA9IGZpbGVOYW1lLnN1YnN0cmluZyhmaWxlTmFtZS5sYXN0SW5kZXhPZignLicpICsgMSwgZmlsZU5hbWUubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuZXh0ZW5zaW9ucy5pbmRleE9mKGV4dCkgPT09IC0xKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbWl0KCdlcnJvcicsIHRoaXMuZXh0ZW5zaW9uRXJyb3IoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRlbWl0KCdzZW5kaW5nJywgdGhpcy5kYXRhLmRhdGEpO1xuXG4gICAgICAgIHRoaXMuJHJlZnMuZm9ybS5zdWJtaXQoKTtcbiAgICB9LFxuICAgIGNiVXBsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlmcmFtZSA9IHRoaXMuJHJlZnMuaWZyYW1lO1xuXG4gICAgICAgIHZhciB4bWwgPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICAgICAgeG1sLnJlc3BvbnNlVGV4dCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LmJvZHkgPyBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5ib2R5LmlubmVySFRNTCA6IG51bGw7XG4gICAgICAgICAgICAgICAgeG1sLnJlc3BvbnNlWE1MID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuWE1MRG9jdW1lbnQgPyBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5YTUxEb2N1bWVudCA6IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICAgICAgICAgICAgfSBlbHNlIGlmKGlmcmFtZS5jb250ZW50RG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICB4bWwucmVzcG9uc2VUZXh0ID0gaWZyYW1lLmNvbnRlbnREb2N1bWVudC5kb2N1bWVudC5ib2R5P2lmcmFtZS5jb250ZW50RG9jdW1lbnQuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgOiBudWxsO1xuICAgICAgICAgICAgICAgIHhtbC5yZXNwb25zZVhNTCA9IGlmcmFtZS5jb250ZW50RG9jdW1lbnQuZG9jdW1lbnQuWE1MRG9jdW1lbnQ/aWZyYW1lLmNvbnRlbnREb2N1bWVudC5kb2N1bWVudC5YTUxEb2N1bWVudCA6IGlmcmFtZS5jb250ZW50RG9jdW1lbnQuZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZigheG1sLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBmdW5jdGlvbiB1cGxvYWRIdHRwRGF0YShyLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9ICh0eXBlID09ICd4bWwnIHx8ICF0eXBlKSA/IHIucmVzcG9uc2VYTUwgOiByLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIC8vIElmIHRoZSB0eXBlIGlzICdzY3JpcHQnLCBldmFsIGl0IGluIGdsb2JhbCBjb250ZXh0XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2pzb24nKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IC88cHJlLio/PiguKj8pPFxcL3ByZT4vLmV4ZWMoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0ID8gdGV4dFsxXSA6IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kZW1pdCgnc3VjY2VzcycsIHVwbG9hZEh0dHBEYXRhKHhtbCwgdGhpcy5kYXRhLmRhdGFUeXBlKSk7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NvbXBsZXRlJywgeG1sKTtcblxuICAgICAgICB0aGlzLiRyZWZzLmZpbGUudmFsdWUgPSAnJztcbiAgICB9LFxuICAgIGV4dGVuc2lvbkVycm9yOuOAgGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ+WPquiDveS4iuS8oCcgKyB0aGlzLmRhdGEuZXh0ZW5zaW9ucy5qb2luKCcsICcp44CAKyAn57G75Z6L55qE5paH5Lu277yBJztcbiAgICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVXBsb2FkZXI7Il19
