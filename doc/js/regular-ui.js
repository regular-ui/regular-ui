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

// 日期类
RGUI.DatePicker = require('./unit/datePicker.js');
RGUI.TimePicker = require('./unit/timePicker.js');
RGUI.DateTimePicker = require('./unit/dateTimePicker.js');

RGUI.Progress = require('./unit/progress.js');

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
RGUI.Gotop = require('./module/gotop.js');

// 数据类
RGUI.ListView = require('./module/listView.js');
RGUI.GridView = require('./module/gridView.js');
RGUI.TreeView = require('./module/treeView.js');
RGUI.TableView = require('./module/tableView.js');

// 日期类
RGUI.Calendar = require('./module/calendar.js');

// 上传类
RGUI.Uploader = require('./module/uploader.js');

// 编辑器类
RGUI.Editor = require('./module/editor.js');
RGUI.HTMLEditor = require('./module/htmlEditor.js');
RGUI.MarkEditor = require('./module/markEditor.js');

module.exports = window.RGUI = RGUI;
},{"./base/component.js":29,"./base/request.js":31,"./base/util.js":33,"./module/accordion.js":35,"./module/calendar.js":38,"./module/editor.js":40,"./module/gotop.js":42,"./module/gridView.js":44,"./module/htmlEditor.js":46,"./module/listView.js":48,"./module/markEditor.js":50,"./module/menubar.js":52,"./module/modal.js":54,"./module/notify.js":56,"./module/pager.js":58,"./module/tab.js":60,"./module/tableView.js":62,"./module/treeView.js":64,"./module/uploader.js":67,"./unit/check2.js":69,"./unit/check2Group.js":71,"./unit/checkGroup.js":73,"./unit/datePicker.js":75,"./unit/dateTimePicker.js":77,"./unit/dropdown.js":79,"./unit/input2.js":81,"./unit/menu.js":83,"./unit/numberInput.js":86,"./unit/progress.js":88,"./unit/radio2Group.js":90,"./unit/radioGroup.js":92,"./unit/select2.js":94,"./unit/suggest.js":96,"./unit/timePicker.js":97,"./unit/treeSelect.js":99,"regularjs":21}],2:[function(require,module,exports){
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
},{"../module/notify.js":56,"reqwest":28}],32:[function(require,module,exports){
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
module.exports="<a class=\"u-btn\" on-click={this.gotop()}>回到顶部</a>"
},{}],42:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./gotop.html":41}],43:[function(require,module,exports){
module.exports="<div class=\"m-gridview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    {#list source as item}    <div class=\"gridview_item\" r-class={ {\'z-sel\': selected === item} }>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>    {/list}</div>"
},{}],44:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./gridView.html":43}],45:[function(require,module,exports){
module.exports="<div class=\"m-editor {@(class)}\" r-hide={!visible}>    <div class=\"editor_preview\" r-html={html}></div>    <ul class=\"m-toolbar editor_toolbar\">        <li><a title=\"加粗\" on-click={this.bold()}><i class=\"u-icon u-icon-bold\"></i></a></li>        <li><a title=\"斜体\" on-click={this.italic()}><i class=\"u-icon u-icon-italic\"></i></a></li>        <li class=\"seperator\"></li>        <li><a title=\"引用\" on-click={this.quote()}><i class=\"u-icon u-icon-quote\"></i></a></li>        <li><a title=\"无序列表\" on-click={this.ul()}><i class=\"u-icon u-icon-list-ul\"></i></a></li>        <li><a title=\"有序列表\" on-click={this.ol()}><i class=\"u-icon u-icon-list-ol\"></i></a></li>        <li class=\"seperator\"></li>        <li><a title=\"链接\" on-click={this.link()}><i class=\"u-icon u-icon-link\"></i></a></li>        <li><a title=\"图片\" on-click={this.image()}><i class=\"u-icon u-icon-image\"></i></a></li>    </ul>    <textarea class=\"editor_textarea\" r-model={content} ref=\"textarea\" {#if readonly}readonly{/if}></textarea></div><uploader visible={false} url={imageUrl} extensions={extensions} ref=\"uploader\" on-success={this.uploaderSuccess($event)} on-error={this.uploaderError($event)} />"
},{}],46:[function(require,module,exports){
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

},{"../base/component.js":29,"../base/util.js":33,"./htmlEditor.html":45}],47:[function(require,module,exports){
module.exports="<ul class=\"m-listview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    {#list source as item}    <li r-class={ {\'z-sel\': selected === item} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>    {/list}</ul>"
},{}],48:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./listView.html":47}],49:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],50:[function(require,module,exports){
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

},{"../base/component.js":29,"../base/util.js":33,"./markEditor.html":49,"marked":2}],51:[function(require,module,exports){
module.exports="<div>    {#list source as item}    <menu name={item.name} source={item.children} />    {/list}</div>"
},{}],52:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"../unit/menu.js":83,"./menubar.html":51}],53:[function(require,module,exports){
module.exports="<div class=\"m-modal {@(class)}\" on-keyup={this.keyup($event)} r-hide={!visible}>    <div class=\"modal_dialog\" {#if width}style=\"width: {width}px\"{/if}>        <div class=\"modal_hd\">            <a class=\"modal_close\" on-click={this.close(!cancelButton)}><i class=\"u-icon u-icon-close\"></i></a>            <h3 class=\"modal_title\">{title}</h3>        </div>        <div class=\"modal_bd\">            {#if contentTemplate}{#include @(contentTemplate)}{#else}{content}{/if}        </div>        <div class=\"modal_ft\">            {#if okButton}            <button class=\"u-btn u-btn-primary\" on-click={this.close(true)}>{okButton === true ? \'确定\' : okButton}</button>            {/if}            {#if cancelButton}            <button class=\"u-btn\" on-click={this.close(false)}>{cancelButton === true ? \'取消\' : cancelButton}</button>            {/if}        </div>    </div></div>"
},{}],54:[function(require,module,exports){
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

},{"../base/component.js":29,"../base/util.js":33,"./modal.html":53}],55:[function(require,module,exports){
module.exports="<div class=\"m-notify m-notify-{@(position)} {@(class)}\" r-hide={!visible}>    {#list messages as message}    <div class=\"notify_message notify_message-{@(message.type)}\" r-animation=\"on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;\">        <a class=\"notify_close\" on-click={this.close(message)}><i class=\"u-icon u-icon-close\"></i></a>        <div class=\"notify_text\"><i class=\"u-icon u-icon-{@(message.type)}-circle\" r-hide={@(!message.type)}></i> {@(message.text)}</div>    </div>    {/list}</div>"
},{}],56:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./notify.html":55}],57:[function(require,module,exports){
module.exports="<ul class=\"m-pager m-pager-{@(position)} {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <li class=\"pager_prev\" r-class={ {\'z-dis\' : current <= 1} } on-click={this.select(current - 1)}><a>上一页</a></li>    {#if total - middle > side * 2 + 1}        {#list 1..side as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}        {#if _start > side + 1}<li>...</li>{/if}        {#list _start.._end as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}        {#if _end < total - side}<li>...</li>{/if}        {#list (total - side + 1)..total as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}    {#else}        {#list 1..total as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}    {/if}    <li class=\"pager_next\" r-class={ {\'z-dis\' : current >= total} } on-click={this.select(current + 1)}><a>下一页</a></li></ul>"
},{}],58:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./pager.html":57}],59:[function(require,module,exports){
module.exports="<div class=\"m-tab {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <ul class=\"tab_hd\">        {#list source as item}        <li r-class={ {\'z-crt\': item == selected, \'z-dis\': item.disabled} } on-click={this.select(item)}>{item.name}</li>        {/list}    </ul>    <div class=\"tab_bd\">        <r-content />    </div></div>"
},{}],60:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./tab.html":59}],61:[function(require,module,exports){
module.exports="<table class=\"m-table m-tableview {@(class)}\" r-class={ {\'m-table-striped\': striped, \'m-table-hover\': hover} } r-hide={!visible}>    <thead>        <tr>            {#list fields as field}            <th r-class={ {\'tableview_sortable\': field.sortable} } on-click={this.sort(field)}>                {field.name || field.key}                {#if field.sortable}                    <i class=\"u-icon {order.by === field.key ? (order.desc ? \'u-icon-sort-desc\' : \'u-icon-sort-asc\') : \'u-icon-sort\'}\"></i>                {/if}            </th>            {/list}        </tr>    </thead>    <tbody>        {#list source as item}        <tr>            {#list fields as field}            <td>{item[field.key]}</td>            {/list}        </tr>        {/list}    </tbody></table>"
},{}],62:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./tableView.html":61}],63:[function(require,module,exports){
module.exports="<div class=\"m-treeview {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    <treeViewList source={source} visible={true} /></div>"
},{}],64:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./treeView.html":63,"./treeViewList.html":65}],65:[function(require,module,exports){
module.exports="<ul class=\"treeview_list\" r-hide={!visible}>    {#list source as item}    <li>        <div class=\"treeview_item\">            {#if item.childrenCount || (item.children && item.children.length)}            <i class=\"u-icon\" r-class={ {\'u-icon-caret-right\': !item.open, \'u-icon-caret-down\': item.open}} on-click={this.toggle(item)}></i>            {/if}            <div class=\"treeview_itemname\" r-class={ {\'z-sel\': this.$ancestor.data.selected === item} } title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>        </div>        {#if item.childrenCount || (item.children && item.children.length)}<treeViewList source={item.children} visible={item.open} parent={item} />{/if}    </li>    {/list}</ul>"
},{}],66:[function(require,module,exports){
module.exports="<div class=\"m-uploader {@(class)}\" r-hide={!visible}>    <a class=\"u-btn\" on-click={this.upload()}>{name || \'上传\'}</a>    <form method=\"POST\" action={url} target=\"iframe{_id}\" enctype={contentType} ref=\"form\">        <input type=\"file\" name=\"file\" ref=\"file\" on-change={this.submit()}>        {#list Object.keys(data) as key}        <input type=\"hidden\" name={key} value={data[key]}>        {/list}    </form>    <iframe name=\"iframe{_id}\" on-load={this.cbUpload()} ref=\"iframe\">    </iframe></div>"
},{}],67:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./uploader.html":66}],68:[function(require,module,exports){
module.exports="<label class=\"u-check2 {@(class)}\" r-class={ {\'z-dis\': disabled, \'z-chk\': checked, \'z-part\': checked === null, \'u-check2-block\': block} } r-hide={!visible} title={name} on-click={this.check(!checked)}><div class=\"check2_box\"><i class=\"u-icon u-icon-check\"></i></div> {name}</label>"
},{}],69:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./check2.html":68}],70:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <check2 name={item.name} checked={item.checked} disabled={disabled} block={block} />    {/list}</div>"
},{}],71:[function(require,module,exports){
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
},{"../base/util.js":33,"./check2.js":69,"./check2Group.html":70,"./checkGroup.js":73}],72:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-check2\" r-class={ {\'z-dis\': disabled, \'u-check2-block\': block} } title={item.name}><input type=\"checkbox\" class=\"u-check\" r-model={item.checked} disabled={disabled}> {item.name}</label>    {/list}</div>"
},{}],73:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./checkGroup.html":72}],74:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: \'yyyy-MM-dd\'} on-focus={this.toggle(true)} on-change={this.change($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <calendar date={date} on-select={this.select($event.date)} />    </div></div>"
},{}],75:[function(require,module,exports){
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
},{"../base/filter.js":30,"../base/util.js":33,"../module/calendar.js":38,"./datePicker.html":74,"./dropdown.js":79}],76:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest u-dropdown-datetimepicker {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: \'yyyy-MM-dd HH:mm\'} on-focus={this.toggle(true)} on-change={this.change($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <calendar date={selectedDate} on-select={this.select($event.date)} />        <ul class=\"m-listview\">            {#list source as item}            <li on-click={this.select(item)}>{item.name}</li>            {/list}        </ul>    </div></div>"
},{}],77:[function(require,module,exports){
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
},{"../base/filter.js":30,"../base/util.js":33,"./datePicker.js":75,"./dateTimePicker.html":76}],78:[function(require,module,exports){
module.exports="<div class=\"u-dropdown {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <a class=\"u-btn u-btn-primary\" on-click={this.toggle(!open)}>{name || \'菜单\'} <i class=\"u-icon u-icon-caret-down\"></i></a>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#list source as item}            <li on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>            {/list}        </ul>    </div></div>"
},{}],79:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./dropdown.html":78}],80:[function(require,module,exports){
module.exports="<label class=\"u-input2 {@(class)}\" r-hide={!visible}>    <input class=\"u-input u-input-{type}\" r-model={value} on-keyup={this.validate(value)}>    <span class=\"input2_tip\">{tip}</span></label>"
},{}],81:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./input2.html":80}],82:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-menu {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <a class=\"u-btn u-btn-primary\" on-click={this.toggle(!open)}>{name || \'菜单\'} <i class=\"u-icon u-icon-caret-down\"></i></a>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <menuList source={source} visible={true} />    </div></div>"
},{}],83:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./dropdown.js":79,"./menu.html":82,"./menuList.html":84}],84:[function(require,module,exports){
module.exports="<ul class=\"m-listview menu_list\" r-hide={!visible}>    {#list source as item}    <li>        <div class=\"menu_item\">            {#if item.childrenCount || (item.children && item.children.length)}            <i class=\"u-icon u-icon-caret-right\"></i>            {/if}            <div class=\"menu_itemname\" title={item.name} on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>        </div>        {#if item.childrenCount || (item.children && item.children.length)}<menuList source={item.children} visible={item.open} parent={item} />{/if}    </li>    {/list}</ul>"
},{}],85:[function(require,module,exports){
module.exports="<label class=\"u-input2 u-input2-numberinput {@(class)}\" r-hide={!visible}>    <input class=\"u-input u-input-{type}\" r-model={value | number} on-keyup={this.validate(value)}>    <a class=\"u-btn\" on-click={this.increase()}><i class=\"u-icon u-icon-caret-up\"></i></a>    <a class=\"u-btn\" on-click={this.decrease()}><i class=\"u-icon u-icon-caret-down\"></i></a>    <span class=\"input2_tip\">{tip}</span></label>"
},{}],86:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./numberInput.html":85}],87:[function(require,module,exports){
module.exports="<div class=\"u-progress u-progress-{@(size)} u-progress-{@(type)} {@(class)}\" r-class={ {\'u-progress-striped\': striped, \'z-act\': active} } r-hide={!visible}>    <div class=\"progress_bar\" style=\"width: {percent}%;\">{text ? (text === true ? percent + \'%\' : text) : \'\'}</div></div>"
},{}],88:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./progress.html":87}],89:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-radio2\" r-class={ {\'z-dis\': disabled, \'z-sel\': item === selected, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><div class=\"radio2_box\"><i class=\"u-icon u-icon-radio\"></i></div> {item.name}</label>    {/list}</div>"
},{}],90:[function(require,module,exports){
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
},{"../base/util.js":33,"./radio2Group.html":89,"./radioGroup.js":92}],91:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\" r-hide={!visible}>    {#list source as item}    <label class=\"u-radio2\" r-class={ {\'z-dis\': disabled, \'u-radio2-block\': block} } title={item.name} on-click={this.select(item)}><input type=\"radio\" class=\"u-radio\" name={_radioGroupId} disabled={disabled}> {item.name}</label>    {/list}</div>"
},{}],92:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./radioGroup.html":91}],93:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-select2 {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        <span>{selected ? selected.name : placeholder}</span>        <i class=\"u-icon u-icon-caret-down\"></i>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#if placeholder}<li r-class={ {\'z-sel\': selected === null} } on-click={this.select(null)}>{placeholder}</li>{/if}            {#list source as item}            <li r-class={ {\'z-sel\': selected === item} } on-click={this.select(item)}>{item.name}</li>            {/list}        </ul>    </div></div>"
},{}],94:[function(require,module,exports){
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
},{"../base/util.js":33,"./dropdown.js":79,"./select2.html":93}],95:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} r-model={value} on-focus={this.input($event)} on-keyup={this.input($event)} on-blur={this.uninput($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"m-listview\">            {#list source as item}            {#if this.filter(item)}                <li on-click={this.select(item)}>{item.name}</li>            {/if}            {/list}        </ul>    </div></div>"
},{}],96:[function(require,module,exports){
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
},{"../base/util.js":33,"../module/listView.js":48,"./dropdown.js":79,"./suggest.html":95}],97:[function(require,module,exports){
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
},{"../base/util.js":33,"./suggest.js":96}],98:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-select2 {@(class)}\" r-class={ {\'z-dis\': disabled} } r-hide={!visible} ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        <i class=\"u-icon u-icon-caret-down\"></i>        <span>{selected ? selected.name : placeholder}</span>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <treeView source={source} on-select={this.select($event.selected)} />    </div></div>"
},{}],99:[function(require,module,exports){
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
},{"../base/util.js":33,"../module/treeView.js":64,"./select2.js":94,"./treeSelect.html":98}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWFya2VkL2xpYi9tYXJrZWQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9SZWd1bGFyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2FuaW1hdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2RpcmVjdGl2ZS9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2Zvcm0uanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9kb20uanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9lbnYuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9ncm91cC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9hbmltYXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2NvbWJpbmUuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZW50aXRpZXMuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZXh0ZW5kLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2ZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9zaGltLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL3dhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL21vZHVsZS90aW1lb3V0LmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvcGFyc2VyL0xleGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvcGFyc2VyL1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3BhcnNlci9ub2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3dhbGtlcnMuanMiLCJub2RlX21vZHVsZXMvcmVxd2VzdC9yZXF3ZXN0LmpzIiwic3JjL2pzL2Jhc2UvY29tcG9uZW50LmpzIiwic3JjL2pzL2Jhc2UvZmlsdGVyLmpzIiwic3JjL2pzL2Jhc2UvcmVxdWVzdC5qcyIsInNyYy9qcy9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcyIsInNyYy9qcy9iYXNlL3V0aWwuanMiLCJzcmMvanMvbW9kdWxlL2FjY29yZGlvbi5odG1sIiwic3JjL2pzL21vZHVsZS9hY2NvcmRpb24uanMiLCJzcmMvanMvbW9kdWxlL2FjY29yZGlvblBhbmUuaHRtbCIsInNyYy9qcy9tb2R1bGUvY2FsZW5kYXIuaHRtbCIsInNyYy9qcy9tb2R1bGUvY2FsZW5kYXIuanMiLCJzcmMvanMvbW9kdWxlL2VkaXRvci5odG1sIiwic3JjL2pzL21vZHVsZS9lZGl0b3IuanMiLCJzcmMvanMvbW9kdWxlL2dvdG9wLmh0bWwiLCJzcmMvanMvbW9kdWxlL2dvdG9wLmpzIiwic3JjL2pzL21vZHVsZS9ncmlkVmlldy5odG1sIiwic3JjL2pzL21vZHVsZS9ncmlkVmlldy5qcyIsInNyYy9qcy9tb2R1bGUvaHRtbEVkaXRvci5odG1sIiwic3JjL2pzL21vZHVsZS9odG1sRWRpdG9yLmpzIiwic3JjL2pzL21vZHVsZS9saXN0Vmlldy5odG1sIiwic3JjL2pzL21vZHVsZS9saXN0Vmlldy5qcyIsInNyYy9qcy9tb2R1bGUvbWFya0VkaXRvci5qcyIsInNyYy9qcy9tb2R1bGUvbWVudWJhci5odG1sIiwic3JjL2pzL21vZHVsZS9tZW51YmFyLmpzIiwic3JjL2pzL21vZHVsZS9tb2RhbC5odG1sIiwic3JjL2pzL21vZHVsZS9tb2RhbC5qcyIsInNyYy9qcy9tb2R1bGUvbm90aWZ5Lmh0bWwiLCJzcmMvanMvbW9kdWxlL25vdGlmeS5qcyIsInNyYy9qcy9tb2R1bGUvcGFnZXIuaHRtbCIsInNyYy9qcy9tb2R1bGUvcGFnZXIuanMiLCJzcmMvanMvbW9kdWxlL3RhYi5odG1sIiwic3JjL2pzL21vZHVsZS90YWIuanMiLCJzcmMvanMvbW9kdWxlL3RhYmxlVmlldy5odG1sIiwic3JjL2pzL21vZHVsZS90YWJsZVZpZXcuanMiLCJzcmMvanMvbW9kdWxlL3RyZWVWaWV3Lmh0bWwiLCJzcmMvanMvbW9kdWxlL3RyZWVWaWV3LmpzIiwic3JjL2pzL21vZHVsZS90cmVlVmlld0xpc3QuaHRtbCIsInNyYy9qcy9tb2R1bGUvdXBsb2FkZXIuaHRtbCIsInNyYy9qcy9tb2R1bGUvdXBsb2FkZXIuanMiLCJzcmMvanMvdW5pdC9jaGVjazIuaHRtbCIsInNyYy9qcy91bml0L2NoZWNrMi5qcyIsInNyYy9qcy91bml0L2NoZWNrMkdyb3VwLmh0bWwiLCJzcmMvanMvdW5pdC9jaGVjazJHcm91cC5qcyIsInNyYy9qcy91bml0L2NoZWNrR3JvdXAuaHRtbCIsInNyYy9qcy91bml0L2NoZWNrR3JvdXAuanMiLCJzcmMvanMvdW5pdC9kYXRlUGlja2VyLmh0bWwiLCJzcmMvanMvdW5pdC9kYXRlUGlja2VyLmpzIiwic3JjL2pzL3VuaXQvZGF0ZVRpbWVQaWNrZXIuaHRtbCIsInNyYy9qcy91bml0L2RhdGVUaW1lUGlja2VyLmpzIiwic3JjL2pzL3VuaXQvZHJvcGRvd24uaHRtbCIsInNyYy9qcy91bml0L2Ryb3Bkb3duLmpzIiwic3JjL2pzL3VuaXQvaW5wdXQyLmh0bWwiLCJzcmMvanMvdW5pdC9pbnB1dDIuanMiLCJzcmMvanMvdW5pdC9tZW51Lmh0bWwiLCJzcmMvanMvdW5pdC9tZW51LmpzIiwic3JjL2pzL3VuaXQvbWVudUxpc3QuaHRtbCIsInNyYy9qcy91bml0L251bWJlcklucHV0Lmh0bWwiLCJzcmMvanMvdW5pdC9udW1iZXJJbnB1dC5qcyIsInNyYy9qcy91bml0L3Byb2dyZXNzLmh0bWwiLCJzcmMvanMvdW5pdC9wcm9ncmVzcy5qcyIsInNyYy9qcy91bml0L3JhZGlvMkdyb3VwLmh0bWwiLCJzcmMvanMvdW5pdC9yYWRpbzJHcm91cC5qcyIsInNyYy9qcy91bml0L3JhZGlvR3JvdXAuaHRtbCIsInNyYy9qcy91bml0L3JhZGlvR3JvdXAuanMiLCJzcmMvanMvdW5pdC9zZWxlY3QyLmh0bWwiLCJzcmMvanMvdW5pdC9zZWxlY3QyLmpzIiwic3JjL2pzL3VuaXQvc3VnZ2VzdC5odG1sIiwic3JjL2pzL3VuaXQvc3VnZ2VzdC5qcyIsInNyYy9qcy91bml0L3RpbWVQaWNrZXIuanMiLCJzcmMvanMvdW5pdC90cmVlU2VsZWN0Lmh0bWwiLCJzcmMvanMvdW5pdC90cmVlU2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeHZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25RQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4ZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2bUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JMQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFJHVUkgICAgICBSZWd1bGFyIFVJ5bqTXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkdVSSA9IHt9XG5cbi8qKlxuICogYmFzZVxuICovXG5SR1VJLlJlZ3VsYXIgPSByZXF1aXJlKCdyZWd1bGFyanMnKTtcblJHVUkuQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9iYXNlL2NvbXBvbmVudC5qcycpO1xuUkdVSS5fID0gcmVxdWlyZSgnLi9iYXNlL3V0aWwuanMnKTtcblJHVUkucmVxdWVzdCA9IHJlcXVpcmUoJy4vYmFzZS9yZXF1ZXN0LmpzJyk7XG5cbi8qKlxuICoganNVbml0XG4gKi9cbi8vIOWvvOiIquexu1xuUkdVSS5Ecm9wZG93biA9IHJlcXVpcmUoJy4vdW5pdC9kcm9wZG93bi5qcycpO1xuUkdVSS5NZW51ID0gcmVxdWlyZSgnLi91bml0L21lbnUuanMnKTtcblxuLy8g6KGo5Y2V57G7XG5SR1VJLklucHV0MiA9IHJlcXVpcmUoJy4vdW5pdC9pbnB1dDIuanMnKTtcblJHVUkuTnVtYmVySW5wdXQgPSByZXF1aXJlKCcuL3VuaXQvbnVtYmVySW5wdXQuanMnKTtcblJHVUkuQ2hlY2syID0gcmVxdWlyZSgnLi91bml0L2NoZWNrMi5qcycpO1xuUkdVSS5DaGVja0dyb3VwID0gcmVxdWlyZSgnLi91bml0L2NoZWNrR3JvdXAuanMnKTtcblJHVUkuQ2hlY2syR3JvdXAgPSByZXF1aXJlKCcuL3VuaXQvY2hlY2syR3JvdXAuanMnKTtcblJHVUkuUmFkaW9Hcm91cCA9IHJlcXVpcmUoJy4vdW5pdC9yYWRpb0dyb3VwLmpzJyk7XG5SR1VJLlJhZGlvMkdyb3VwID0gcmVxdWlyZSgnLi91bml0L3JhZGlvMkdyb3VwLmpzJyk7XG5SR1VJLlNlbGVjdDIgPSByZXF1aXJlKCcuL3VuaXQvc2VsZWN0Mi5qcycpO1xuUkdVSS5UcmVlU2VsZWN0ID0gcmVxdWlyZSgnLi91bml0L3RyZWVTZWxlY3QuanMnKTtcblJHVUkuU3VnZ2VzdCA9IHJlcXVpcmUoJy4vdW5pdC9zdWdnZXN0LmpzJyk7XG5cbi8vIOaXpeacn+exu1xuUkdVSS5EYXRlUGlja2VyID0gcmVxdWlyZSgnLi91bml0L2RhdGVQaWNrZXIuanMnKTtcblJHVUkuVGltZVBpY2tlciA9IHJlcXVpcmUoJy4vdW5pdC90aW1lUGlja2VyLmpzJyk7XG5SR1VJLkRhdGVUaW1lUGlja2VyID0gcmVxdWlyZSgnLi91bml0L2RhdGVUaW1lUGlja2VyLmpzJyk7XG5cblJHVUkuUHJvZ3Jlc3MgPSByZXF1aXJlKCcuL3VuaXQvcHJvZ3Jlc3MuanMnKTtcblxuLyoqXG4gKiBqc01vZHVsZVxuICovXG4vLyDlr7zoiKrnsbtcblJHVUkuVGFiID0gcmVxdWlyZSgnLi9tb2R1bGUvdGFiLmpzJyk7XG5SR1VJLkFjY29yZGlvbiA9IHJlcXVpcmUoJy4vbW9kdWxlL2FjY29yZGlvbi5qcycpO1xuUkdVSS5QYWdlciA9IHJlcXVpcmUoJy4vbW9kdWxlL3BhZ2VyLmpzJyk7XG5SR1VJLk1lbnViYXIgPSByZXF1aXJlKCcuL21vZHVsZS9tZW51YmFyLmpzJyk7XG5cbi8vIOeql+WPo+exu1xuUkdVSS5Ob3RpZnkgPSByZXF1aXJlKCcuL21vZHVsZS9ub3RpZnkuanMnKTtcblJHVUkuTW9kYWwgPSByZXF1aXJlKCcuL21vZHVsZS9tb2RhbC5qcycpO1xuUkdVSS5Hb3RvcCA9IHJlcXVpcmUoJy4vbW9kdWxlL2dvdG9wLmpzJyk7XG5cbi8vIOaVsOaNruexu1xuUkdVSS5MaXN0VmlldyA9IHJlcXVpcmUoJy4vbW9kdWxlL2xpc3RWaWV3LmpzJyk7XG5SR1VJLkdyaWRWaWV3ID0gcmVxdWlyZSgnLi9tb2R1bGUvZ3JpZFZpZXcuanMnKTtcblJHVUkuVHJlZVZpZXcgPSByZXF1aXJlKCcuL21vZHVsZS90cmVlVmlldy5qcycpO1xuUkdVSS5UYWJsZVZpZXcgPSByZXF1aXJlKCcuL21vZHVsZS90YWJsZVZpZXcuanMnKTtcblxuLy8g5pel5pyf57G7XG5SR1VJLkNhbGVuZGFyID0gcmVxdWlyZSgnLi9tb2R1bGUvY2FsZW5kYXIuanMnKTtcblxuLy8g5LiK5Lyg57G7XG5SR1VJLlVwbG9hZGVyID0gcmVxdWlyZSgnLi9tb2R1bGUvdXBsb2FkZXIuanMnKTtcblxuLy8g57yW6L6R5Zmo57G7XG5SR1VJLkVkaXRvciA9IHJlcXVpcmUoJy4vbW9kdWxlL2VkaXRvci5qcycpO1xuUkdVSS5IVE1MRWRpdG9yID0gcmVxdWlyZSgnLi9tb2R1bGUvaHRtbEVkaXRvci5qcycpO1xuUkdVSS5NYXJrRWRpdG9yID0gcmVxdWlyZSgnLi9tb2R1bGUvbWFya0VkaXRvci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5SR1VJID0gUkdVSTsiLCIvKipcbiAqIG1hcmtlZCAtIGEgbWFya2Rvd24gcGFyc2VyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxNCwgQ2hyaXN0b3BoZXIgSmVmZnJleS4gKE1JVCBMaWNlbnNlZClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZFxuICovXG5cbjsoZnVuY3Rpb24oKSB7XG5cbi8qKlxuICogQmxvY2stTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBibG9jayA9IHtcbiAgbmV3bGluZTogL15cXG4rLyxcbiAgY29kZTogL14oIHs0fVteXFxuXStcXG4qKSsvLFxuICBmZW5jZXM6IG5vb3AsXG4gIGhyOiAvXiggKlstKl9dKXszLH0gKig/Olxcbit8JCkvLFxuICBoZWFkaW5nOiAvXiAqKCN7MSw2fSkgKihbXlxcbl0rPykgKiMqICooPzpcXG4rfCQpLyxcbiAgbnB0YWJsZTogbm9vcCxcbiAgbGhlYWRpbmc6IC9eKFteXFxuXSspXFxuICooPXwtKXsyLH0gKig/Olxcbit8JCkvLFxuICBibG9ja3F1b3RlOiAvXiggKj5bXlxcbl0rKFxcbig/IWRlZilbXlxcbl0rKSpcXG4qKSsvLFxuICBsaXN0OiAvXiggKikoYnVsbCkgW1xcc1xcU10rPyg/OmhyfGRlZnxcXG57Mix9KD8hICkoPyFcXDFidWxsIClcXG4qfFxccyokKS8sXG4gIGh0bWw6IC9eICooPzpjb21tZW50ICooPzpcXG58XFxzKiQpfGNsb3NlZCAqKD86XFxuezIsfXxcXHMqJCl8Y2xvc2luZyAqKD86XFxuezIsfXxcXHMqJCkpLyxcbiAgZGVmOiAvXiAqXFxbKFteXFxdXSspXFxdOiAqPD8oW15cXHM+XSspPj8oPzogK1tcIihdKFteXFxuXSspW1wiKV0pPyAqKD86XFxuK3wkKS8sXG4gIHRhYmxlOiBub29wLFxuICBwYXJhZ3JhcGg6IC9eKCg/OlteXFxuXStcXG4/KD8haHJ8aGVhZGluZ3xsaGVhZGluZ3xibG9ja3F1b3RlfHRhZ3xkZWYpKSspXFxuKi8sXG4gIHRleHQ6IC9eW15cXG5dKy9cbn07XG5cbmJsb2NrLmJ1bGxldCA9IC8oPzpbKistXXxcXGQrXFwuKS87XG5ibG9jay5pdGVtID0gL14oICopKGJ1bGwpIFteXFxuXSooPzpcXG4oPyFcXDFidWxsIClbXlxcbl0qKSovO1xuYmxvY2suaXRlbSA9IHJlcGxhY2UoYmxvY2suaXRlbSwgJ2dtJylcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCk7XG5cbmJsb2NrLmxpc3QgPSByZXBsYWNlKGJsb2NrLmxpc3QpXG4gICgvYnVsbC9nLCBibG9jay5idWxsZXQpXG4gICgnaHInLCAnXFxcXG4rKD89XFxcXDE/KD86Wy0qX10gKil7Myx9KD86XFxcXG4rfCQpKScpXG4gICgnZGVmJywgJ1xcXFxuKyg/PScgKyBibG9jay5kZWYuc291cmNlICsgJyknKVxuICAoKTtcblxuYmxvY2suYmxvY2txdW90ZSA9IHJlcGxhY2UoYmxvY2suYmxvY2txdW90ZSlcbiAgKCdkZWYnLCBibG9jay5kZWYpXG4gICgpO1xuXG5ibG9jay5fdGFnID0gJyg/ISg/OidcbiAgKyAnYXxlbXxzdHJvbmd8c21hbGx8c3xjaXRlfHF8ZGZufGFiYnJ8ZGF0YXx0aW1lfGNvZGUnXG4gICsgJ3x2YXJ8c2FtcHxrYmR8c3VifHN1cHxpfGJ8dXxtYXJrfHJ1Ynl8cnR8cnB8YmRpfGJkbydcbiAgKyAnfHNwYW58YnJ8d2JyfGluc3xkZWx8aW1nKVxcXFxiKVxcXFx3Kyg/ITovfFteXFxcXHdcXFxcc0BdKkApXFxcXGInO1xuXG5ibG9jay5odG1sID0gcmVwbGFjZShibG9jay5odG1sKVxuICAoJ2NvbW1lbnQnLCAvPCEtLVtcXHNcXFNdKj8tLT4vKVxuICAoJ2Nsb3NlZCcsIC88KHRhZylbXFxzXFxTXSs/PFxcL1xcMT4vKVxuICAoJ2Nsb3NpbmcnLCAvPHRhZyg/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXidcIj5dKSo/Pi8pXG4gICgvdGFnL2csIGJsb2NrLl90YWcpXG4gICgpO1xuXG5ibG9jay5wYXJhZ3JhcGggPSByZXBsYWNlKGJsb2NrLnBhcmFncmFwaClcbiAgKCdocicsIGJsb2NrLmhyKVxuICAoJ2hlYWRpbmcnLCBibG9jay5oZWFkaW5nKVxuICAoJ2xoZWFkaW5nJywgYmxvY2subGhlYWRpbmcpXG4gICgnYmxvY2txdW90ZScsIGJsb2NrLmJsb2NrcXVvdGUpXG4gICgndGFnJywgJzwnICsgYmxvY2suX3RhZylcbiAgKCdkZWYnLCBibG9jay5kZWYpXG4gICgpO1xuXG4vKipcbiAqIE5vcm1hbCBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2subm9ybWFsID0gbWVyZ2Uoe30sIGJsb2NrKTtcblxuLyoqXG4gKiBHRk0gQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLmdmbSA9IG1lcmdlKHt9LCBibG9jay5ub3JtYWwsIHtcbiAgZmVuY2VzOiAvXiAqKGB7Myx9fH57Myx9KSAqKFxcUyspPyAqXFxuKFtcXHNcXFNdKz8pXFxzKlxcMSAqKD86XFxuK3wkKS8sXG4gIHBhcmFncmFwaDogL14vXG59KTtcblxuYmxvY2suZ2ZtLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJyg/IScsICcoPyEnXG4gICAgKyBibG9jay5nZm0uZmVuY2VzLnNvdXJjZS5yZXBsYWNlKCdcXFxcMScsICdcXFxcMicpICsgJ3wnXG4gICAgKyBibG9jay5saXN0LnNvdXJjZS5yZXBsYWNlKCdcXFxcMScsICdcXFxcMycpICsgJ3wnKVxuICAoKTtcblxuLyoqXG4gKiBHRk0gKyBUYWJsZXMgQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLnRhYmxlcyA9IG1lcmdlKHt9LCBibG9jay5nZm0sIHtcbiAgbnB0YWJsZTogL14gKihcXFMuKlxcfC4qKVxcbiAqKFstOl0rICpcXHxbLXwgOl0qKVxcbigoPzouKlxcfC4qKD86XFxufCQpKSopXFxuKi8sXG4gIHRhYmxlOiAvXiAqXFx8KC4rKVxcbiAqXFx8KCAqWy06XStbLXwgOl0qKVxcbigoPzogKlxcfC4qKD86XFxufCQpKSopXFxuKi9cbn0pO1xuXG4vKipcbiAqIEJsb2NrIExleGVyXG4gKi9cblxuZnVuY3Rpb24gTGV4ZXIob3B0aW9ucykge1xuICB0aGlzLnRva2VucyA9IFtdO1xuICB0aGlzLnRva2Vucy5saW5rcyA9IHt9O1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5ydWxlcyA9IGJsb2NrLm5vcm1hbDtcblxuICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGFibGVzKSB7XG4gICAgICB0aGlzLnJ1bGVzID0gYmxvY2sudGFibGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzID0gYmxvY2suZ2ZtO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBCbG9jayBSdWxlc1xuICovXG5cbkxleGVyLnJ1bGVzID0gYmxvY2s7XG5cbi8qKlxuICogU3RhdGljIExleCBNZXRob2RcbiAqL1xuXG5MZXhlci5sZXggPSBmdW5jdGlvbihzcmMsIG9wdGlvbnMpIHtcbiAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICByZXR1cm4gbGV4ZXIubGV4KHNyYyk7XG59O1xuXG4vKipcbiAqIFByZXByb2Nlc3NpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUubGV4ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHNyYyA9IHNyY1xuICAgIC5yZXBsYWNlKC9cXHJcXG58XFxyL2csICdcXG4nKVxuICAgIC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKVxuICAgIC5yZXBsYWNlKC9cXHUwMGEwL2csICcgJylcbiAgICAucmVwbGFjZSgvXFx1MjQyNC9nLCAnXFxuJyk7XG5cbiAgcmV0dXJuIHRoaXMudG9rZW4oc3JjLCB0cnVlKTtcbn07XG5cbi8qKlxuICogTGV4aW5nXG4gKi9cblxuTGV4ZXIucHJvdG90eXBlLnRva2VuID0gZnVuY3Rpb24oc3JjLCB0b3AsIGJxKSB7XG4gIHZhciBzcmMgPSBzcmMucmVwbGFjZSgvXiArJC9nbSwgJycpXG4gICAgLCBuZXh0XG4gICAgLCBsb29zZVxuICAgICwgY2FwXG4gICAgLCBidWxsXG4gICAgLCBiXG4gICAgLCBpdGVtXG4gICAgLCBzcGFjZVxuICAgICwgaVxuICAgICwgbDtcblxuICB3aGlsZSAoc3JjKSB7XG4gICAgLy8gbmV3bGluZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLm5ld2xpbmUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgaWYgKGNhcFswXS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdzcGFjZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmNvZGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgY2FwID0gY2FwWzBdLnJlcGxhY2UoL14gezR9L2dtLCAnJyk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICB0ZXh0OiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgPyBjYXAucmVwbGFjZSgvXFxuKyQvLCAnJylcbiAgICAgICAgICA6IGNhcFxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBmZW5jZXMgKGdmbSlcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5mZW5jZXMuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdjb2RlJyxcbiAgICAgICAgbGFuZzogY2FwWzJdLFxuICAgICAgICB0ZXh0OiBjYXBbM11cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaGVhZGluZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmhlYWRpbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgZGVwdGg6IGNhcFsxXS5sZW5ndGgsXG4gICAgICAgIHRleHQ6IGNhcFsyXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWJsZSBubyBsZWFkaW5nIHBpcGUgKGdmbSlcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLm5wdGFibGUuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgaGVhZGVyOiBjYXBbMV0ucmVwbGFjZSgvXiAqfCAqXFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBhbGlnbjogY2FwWzJdLnJlcGxhY2UoL14gKnxcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGNlbGxzOiBjYXBbM10ucmVwbGFjZSgvXFxuJC8sICcnKS5zcGxpdCgnXFxuJylcbiAgICAgIH07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmFsaWduLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKyAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbS5jZWxsc1tpXSA9IGl0ZW0uY2VsbHNbaV0uc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGhlYWRpbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzJdID09PSAnPScgPyAxIDogMixcbiAgICAgICAgdGV4dDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGhyXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaHIuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdocidcbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYmxvY2txdW90ZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrcXVvdGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGVfc3RhcnQnXG4gICAgICB9KTtcblxuICAgICAgY2FwID0gY2FwWzBdLnJlcGxhY2UoL14gKj4gPy9nbSwgJycpO1xuXG4gICAgICAvLyBQYXNzIGB0b3BgIHRvIGtlZXAgdGhlIGN1cnJlbnRcbiAgICAgIC8vIFwidG9wbGV2ZWxcIiBzdGF0ZS4gVGhpcyBpcyBleGFjdGx5XG4gICAgICAvLyBob3cgbWFya2Rvd24ucGwgd29ya3MuXG4gICAgICB0aGlzLnRva2VuKGNhcCwgdG9wLCB0cnVlKTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdibG9ja3F1b3RlX2VuZCdcbiAgICAgIH0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaXN0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGlzdC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBidWxsID0gY2FwWzJdO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3Rfc3RhcnQnLFxuICAgICAgICBvcmRlcmVkOiBidWxsLmxlbmd0aCA+IDFcbiAgICAgIH0pO1xuXG4gICAgICAvLyBHZXQgZWFjaCB0b3AtbGV2ZWwgaXRlbS5cbiAgICAgIGNhcCA9IGNhcFswXS5tYXRjaCh0aGlzLnJ1bGVzLml0ZW0pO1xuXG4gICAgICBuZXh0ID0gZmFsc2U7XG4gICAgICBsID0gY2FwLmxlbmd0aDtcbiAgICAgIGkgPSAwO1xuXG4gICAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpdGVtID0gY2FwW2ldO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgbGlzdCBpdGVtJ3MgYnVsbGV0XG4gICAgICAgIC8vIHNvIGl0IGlzIHNlZW4gYXMgdGhlIG5leHQgdG9rZW4uXG4gICAgICAgIHNwYWNlID0gaXRlbS5sZW5ndGg7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoL14gKihbKistXXxcXGQrXFwuKSArLywgJycpO1xuXG4gICAgICAgIC8vIE91dGRlbnQgd2hhdGV2ZXIgdGhlXG4gICAgICAgIC8vIGxpc3QgaXRlbSBjb250YWlucy4gSGFja3kuXG4gICAgICAgIGlmICh+aXRlbS5pbmRleE9mKCdcXG4gJykpIHtcbiAgICAgICAgICBzcGFjZSAtPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgICBpdGVtID0gIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICAgICAgPyBpdGVtLnJlcGxhY2UobmV3IFJlZ0V4cCgnXiB7MSwnICsgc3BhY2UgKyAnfScsICdnbScpLCAnJylcbiAgICAgICAgICAgIDogaXRlbS5yZXBsYWNlKC9eIHsxLDR9L2dtLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciB0aGUgbmV4dCBsaXN0IGl0ZW0gYmVsb25ncyBoZXJlLlxuICAgICAgICAvLyBCYWNrcGVkYWwgaWYgaXQgZG9lcyBub3QgYmVsb25nIGluIHRoaXMgbGlzdC5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zbWFydExpc3RzICYmIGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgYiA9IGJsb2NrLmJ1bGxldC5leGVjKGNhcFtpICsgMV0pWzBdO1xuICAgICAgICAgIGlmIChidWxsICE9PSBiICYmICEoYnVsbC5sZW5ndGggPiAxICYmIGIubGVuZ3RoID4gMSkpIHtcbiAgICAgICAgICAgIHNyYyA9IGNhcC5zbGljZShpICsgMSkuam9pbignXFxuJykgKyBzcmM7XG4gICAgICAgICAgICBpID0gbCAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgaXRlbSBpcyBsb29zZSBvciBub3QuXG4gICAgICAgIC8vIFVzZTogLyhefFxcbikoPyEgKVteXFxuXStcXG5cXG4oPyFcXHMqJCkvXG4gICAgICAgIC8vIGZvciBkaXNjb3VudCBiZWhhdmlvci5cbiAgICAgICAgbG9vc2UgPSBuZXh0IHx8IC9cXG5cXG4oPyFcXHMqJCkvLnRlc3QoaXRlbSk7XG4gICAgICAgIGlmIChpICE9PSBsIC0gMSkge1xuICAgICAgICAgIG5leHQgPSBpdGVtLmNoYXJBdChpdGVtLmxlbmd0aCAtIDEpID09PSAnXFxuJztcbiAgICAgICAgICBpZiAoIWxvb3NlKSBsb29zZSA9IG5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBsb29zZVxuICAgICAgICAgICAgPyAnbG9vc2VfaXRlbV9zdGFydCdcbiAgICAgICAgICAgIDogJ2xpc3RfaXRlbV9zdGFydCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVjdXJzZS5cbiAgICAgICAgdGhpcy50b2tlbihpdGVtLCBmYWxzZSwgYnEpO1xuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdsaXN0X2l0ZW1fZW5kJ1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaXN0X2VuZCdcbiAgICAgIH0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBodG1sXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaHRtbC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogdGhpcy5vcHRpb25zLnNhbml0aXplXG4gICAgICAgICAgPyAncGFyYWdyYXBoJ1xuICAgICAgICAgIDogJ2h0bWwnLFxuICAgICAgICBwcmU6IGNhcFsxXSA9PT0gJ3ByZScgfHwgY2FwWzFdID09PSAnc2NyaXB0JyB8fCBjYXBbMV0gPT09ICdzdHlsZScsXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBkZWZcbiAgICBpZiAoKCFicSAmJiB0b3ApICYmIChjYXAgPSB0aGlzLnJ1bGVzLmRlZi5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMubGlua3NbY2FwWzFdLnRvTG93ZXJDYXNlKCldID0ge1xuICAgICAgICBocmVmOiBjYXBbMl0sXG4gICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgIH07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWJsZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMudGFibGUuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgaGVhZGVyOiBjYXBbMV0ucmVwbGFjZSgvXiAqfCAqXFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBhbGlnbjogY2FwWzJdLnJlcGxhY2UoL14gKnxcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGNlbGxzOiBjYXBbM10ucmVwbGFjZSgvKD86ICpcXHwgKik/XFxuJC8sICcnKS5zcGxpdCgnXFxuJylcbiAgICAgIH07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmFsaWduLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKyAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbS5jZWxsc1tpXSA9IGl0ZW0uY2VsbHNbaV1cbiAgICAgICAgICAucmVwbGFjZSgvXiAqXFx8ICp8ICpcXHwgKiQvZywgJycpXG4gICAgICAgICAgLnNwbGl0KC8gKlxcfCAqLyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goaXRlbSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLnBhcmFncmFwaC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICB0ZXh0OiBjYXBbMV0uY2hhckF0KGNhcFsxXS5sZW5ndGggLSAxKSA9PT0gJ1xcbidcbiAgICAgICAgICA/IGNhcFsxXS5zbGljZSgwLCAtMSlcbiAgICAgICAgICA6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIC8vIFRvcC1sZXZlbCBzaG91bGQgbmV2ZXIgcmVhY2ggaGVyZS5cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3XG4gICAgICAgIEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMudG9rZW5zO1xufTtcblxuLyoqXG4gKiBJbmxpbmUtTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBpbmxpbmUgPSB7XG4gIGVzY2FwZTogL15cXFxcKFtcXFxcYCp7fVxcW1xcXSgpIytcXC0uIV8+XSkvLFxuICBhdXRvbGluazogL148KFteID5dKyhAfDpcXC8pW14gPl0rKT4vLFxuICB1cmw6IG5vb3AsXG4gIHRhZzogL148IS0tW1xcc1xcU10qPy0tPnxePFxcLz9cXHcrKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LyxcbiAgbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFwoaHJlZlxcKS8sXG4gIHJlZmxpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxccypcXFsoW15cXF1dKilcXF0vLFxuICBub2xpbms6IC9eIT9cXFsoKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV0pKilcXF0vLFxuICBzdHJvbmc6IC9eX18oW1xcc1xcU10rPylfXyg/IV8pfF5cXCpcXCooW1xcc1xcU10rPylcXCpcXCooPyFcXCopLyxcbiAgZW06IC9eXFxiXygoPzpfX3xbXFxzXFxTXSkrPylfXFxifF5cXCooKD86XFwqXFwqfFtcXHNcXFNdKSs/KVxcKig/IVxcKikvLFxuICBjb2RlOiAvXihgKylcXHMqKFtcXHNcXFNdKj9bXmBdKVxccypcXDEoPyFgKS8sXG4gIGJyOiAvXiB7Mix9XFxuKD8hXFxzKiQpLyxcbiAgZGVsOiBub29wLFxuICB0ZXh0OiAvXltcXHNcXFNdKz8oPz1bXFxcXDwhXFxbXypgXXwgezIsfVxcbnwkKS9cbn07XG5cbmlubGluZS5faW5zaWRlID0gLyg/OlxcW1teXFxdXSpcXF18W15cXFtcXF1dfFxcXSg/PVteXFxbXSpcXF0pKSovO1xuaW5saW5lLl9ocmVmID0gL1xccyo8PyhbXFxzXFxTXSo/KT4/KD86XFxzK1snXCJdKFtcXHNcXFNdKj8pWydcIl0pP1xccyovO1xuXG5pbmxpbmUubGluayA9IHJlcGxhY2UoaW5saW5lLmxpbmspXG4gICgnaW5zaWRlJywgaW5saW5lLl9pbnNpZGUpXG4gICgnaHJlZicsIGlubGluZS5faHJlZilcbiAgKCk7XG5cbmlubGluZS5yZWZsaW5rID0gcmVwbGFjZShpbmxpbmUucmVmbGluaylcbiAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbiAgKCk7XG5cbi8qKlxuICogTm9ybWFsIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLm5vcm1hbCA9IG1lcmdlKHt9LCBpbmxpbmUpO1xuXG4vKipcbiAqIFBlZGFudGljIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLnBlZGFudGljID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgc3Ryb25nOiAvXl9fKD89XFxTKShbXFxzXFxTXSo/XFxTKV9fKD8hXyl8XlxcKlxcKig/PVxcUykoW1xcc1xcU10qP1xcUylcXCpcXCooPyFcXCopLyxcbiAgZW06IC9eXyg/PVxcUykoW1xcc1xcU10qP1xcUylfKD8hXyl8XlxcKig/PVxcUykoW1xcc1xcU10qP1xcUylcXCooPyFcXCopL1xufSk7XG5cbi8qKlxuICogR0ZNIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLmdmbSA9IG1lcmdlKHt9LCBpbmxpbmUubm9ybWFsLCB7XG4gIGVzY2FwZTogcmVwbGFjZShpbmxpbmUuZXNjYXBlKSgnXSknLCAnfnxdKScpKCksXG4gIHVybDogL14oaHR0cHM/OlxcL1xcL1teXFxzPF0rW148Liw6O1wiJylcXF1cXHNdKS8sXG4gIGRlbDogL15+fig/PVxcUykoW1xcc1xcU10qP1xcUyl+fi8sXG4gIHRleHQ6IHJlcGxhY2UoaW5saW5lLnRleHQpXG4gICAgKCddfCcsICd+XXwnKVxuICAgICgnfCcsICd8aHR0cHM/Oi8vfCcpXG4gICAgKClcbn0pO1xuXG4vKipcbiAqIEdGTSArIExpbmUgQnJlYWtzIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLmJyZWFrcyA9IG1lcmdlKHt9LCBpbmxpbmUuZ2ZtLCB7XG4gIGJyOiByZXBsYWNlKGlubGluZS5icikoJ3syLH0nLCAnKicpKCksXG4gIHRleHQ6IHJlcGxhY2UoaW5saW5lLmdmbS50ZXh0KSgnezIsfScsICcqJykoKVxufSk7XG5cbi8qKlxuICogSW5saW5lIExleGVyICYgQ29tcGlsZXJcbiAqL1xuXG5mdW5jdGlvbiBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5saW5rcyA9IGxpbmtzO1xuICB0aGlzLnJ1bGVzID0gaW5saW5lLm5vcm1hbDtcbiAgdGhpcy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAoIXRoaXMubGlua3MpIHtcbiAgICB0aHJvdyBuZXdcbiAgICAgIEVycm9yKCdUb2tlbnMgYXJyYXkgcmVxdWlyZXMgYSBgbGlua3NgIHByb3BlcnR5LicpO1xuICB9XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmJyZWFrcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5icmVha3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBpbmxpbmUuZ2ZtO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICB0aGlzLnJ1bGVzID0gaW5saW5lLnBlZGFudGljO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIElubGluZSBSdWxlc1xuICovXG5cbklubGluZUxleGVyLnJ1bGVzID0gaW5saW5lO1xuXG4vKipcbiAqIFN0YXRpYyBMZXhpbmcvQ29tcGlsaW5nIE1ldGhvZFxuICovXG5cbklubGluZUxleGVyLm91dHB1dCA9IGZ1bmN0aW9uKHNyYywgbGlua3MsIG9wdGlvbnMpIHtcbiAgdmFyIGlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucyk7XG4gIHJldHVybiBpbmxpbmUub3V0cHV0KHNyYyk7XG59O1xuXG4vKipcbiAqIExleGluZy9Db21waWxpbmdcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUub3V0cHV0ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHZhciBvdXQgPSAnJ1xuICAgICwgbGlua1xuICAgICwgdGV4dFxuICAgICwgaHJlZlxuICAgICwgY2FwO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBlc2NhcGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5lc2NhcGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IGNhcFsxXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGF1dG9saW5rXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYXV0b2xpbmsuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgaWYgKGNhcFsyXSA9PT0gJ0AnKSB7XG4gICAgICAgIHRleHQgPSBjYXBbMV0uY2hhckF0KDYpID09PSAnOidcbiAgICAgICAgICA/IHRoaXMubWFuZ2xlKGNhcFsxXS5zdWJzdHJpbmcoNykpXG4gICAgICAgICAgOiB0aGlzLm1hbmdsZShjYXBbMV0pO1xuICAgICAgICBocmVmID0gdGhpcy5tYW5nbGUoJ21haWx0bzonKSArIHRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gZXNjYXBlKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgfVxuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHVybCAoZ2ZtKVxuICAgIGlmICghdGhpcy5pbkxpbmsgJiYgKGNhcCA9IHRoaXMucnVsZXMudXJsLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0ZXh0ID0gZXNjYXBlKGNhcFsxXSk7XG4gICAgICBocmVmID0gdGV4dDtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgbnVsbCwgdGV4dCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50YWcuZXhlYyhzcmMpKSB7XG4gICAgICBpZiAoIXRoaXMuaW5MaW5rICYmIC9ePGEgL2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pbkxpbmsgJiYgL148XFwvYT4vaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5vcHRpb25zLnNhbml0aXplXG4gICAgICAgID8gZXNjYXBlKGNhcFswXSlcbiAgICAgICAgOiBjYXBbMF07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaW5rXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICBvdXQgKz0gdGhpcy5vdXRwdXRMaW5rKGNhcCwge1xuICAgICAgICBocmVmOiBjYXBbMl0sXG4gICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHJlZmxpbmssIG5vbGlua1xuICAgIGlmICgoY2FwID0gdGhpcy5ydWxlcy5yZWZsaW5rLmV4ZWMoc3JjKSlcbiAgICAgICAgfHwgKGNhcCA9IHRoaXMucnVsZXMubm9saW5rLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBsaW5rID0gKGNhcFsyXSB8fCBjYXBbMV0pLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbiAgICAgIGxpbmsgPSB0aGlzLmxpbmtzW2xpbmsudG9Mb3dlckNhc2UoKV07XG4gICAgICBpZiAoIWxpbmsgfHwgIWxpbmsuaHJlZikge1xuICAgICAgICBvdXQgKz0gY2FwWzBdLmNoYXJBdCgwKTtcbiAgICAgICAgc3JjID0gY2FwWzBdLnN1YnN0cmluZygxKSArIHNyYztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICBvdXQgKz0gdGhpcy5vdXRwdXRMaW5rKGNhcCwgbGluayk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gc3Ryb25nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuc3Ryb25nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLnN0cm9uZyh0aGlzLm91dHB1dChjYXBbMl0gfHwgY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBlbVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVtLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmVtKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGNvZGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5jb2RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmNvZGVzcGFuKGVzY2FwZShjYXBbMl0sIHRydWUpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGJyXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYnIuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuYnIoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlbCAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmRlbC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5kZWwodGhpcy5vdXRwdXQoY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gZXNjYXBlKHRoaXMuc21hcnR5cGFudHMoY2FwWzBdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb21waWxlIExpbmtcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUub3V0cHV0TGluayA9IGZ1bmN0aW9uKGNhcCwgbGluaykge1xuICB2YXIgaHJlZiA9IGVzY2FwZShsaW5rLmhyZWYpXG4gICAgLCB0aXRsZSA9IGxpbmsudGl0bGUgPyBlc2NhcGUobGluay50aXRsZSkgOiBudWxsO1xuXG4gIHJldHVybiBjYXBbMF0uY2hhckF0KDApICE9PSAnISdcbiAgICA/IHRoaXMucmVuZGVyZXIubGluayhocmVmLCB0aXRsZSwgdGhpcy5vdXRwdXQoY2FwWzFdKSlcbiAgICA6IHRoaXMucmVuZGVyZXIuaW1hZ2UoaHJlZiwgdGl0bGUsIGVzY2FwZShjYXBbMV0pKTtcbn07XG5cbi8qKlxuICogU21hcnR5cGFudHMgVHJhbnNmb3JtYXRpb25zXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLnNtYXJ0eXBhbnRzID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAoIXRoaXMub3B0aW9ucy5zbWFydHlwYW50cykgcmV0dXJuIHRleHQ7XG4gIHJldHVybiB0ZXh0XG4gICAgLy8gZW0tZGFzaGVzXG4gICAgLnJlcGxhY2UoLy0tL2csICdcXHUyMDE0JylcbiAgICAvLyBvcGVuaW5nIHNpbmdsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XCJcXHNdKScvZywgJyQxXFx1MjAxOCcpXG4gICAgLy8gY2xvc2luZyBzaW5nbGVzICYgYXBvc3Ryb3BoZXNcbiAgICAucmVwbGFjZSgvJy9nLCAnXFx1MjAxOScpXG4gICAgLy8gb3BlbmluZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoLyhefFstXFx1MjAxNC8oXFxbe1xcdTIwMThcXHNdKVwiL2csICckMVxcdTIwMWMnKVxuICAgIC8vIGNsb3NpbmcgZG91Ymxlc1xuICAgIC5yZXBsYWNlKC9cIi9nLCAnXFx1MjAxZCcpXG4gICAgLy8gZWxsaXBzZXNcbiAgICAucmVwbGFjZSgvXFwuezN9L2csICdcXHUyMDI2Jyk7XG59O1xuXG4vKipcbiAqIE1hbmdsZSBMaW5rc1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5tYW5nbGUgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHZhciBvdXQgPSAnJ1xuICAgICwgbCA9IHRleHQubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgY2g7XG5cbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBjaCA9IHRleHQuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgY2ggPSAneCcgKyBjaC50b1N0cmluZygxNik7XG4gICAgfVxuICAgIG91dCArPSAnJiMnICsgY2ggKyAnOyc7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZW5kZXJlclxuICovXG5cbmZ1bmN0aW9uIFJlbmRlcmVyKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbn1cblxuUmVuZGVyZXIucHJvdG90eXBlLmNvZGUgPSBmdW5jdGlvbihjb2RlLCBsYW5nLCBlc2NhcGVkKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KSB7XG4gICAgdmFyIG91dCA9IHRoaXMub3B0aW9ucy5oaWdobGlnaHQoY29kZSwgbGFuZyk7XG4gICAgaWYgKG91dCAhPSBudWxsICYmIG91dCAhPT0gY29kZSkge1xuICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICBjb2RlID0gb3V0O1xuICAgIH1cbiAgfVxuXG4gIGlmICghbGFuZykge1xuICAgIHJldHVybiAnPHByZT48Y29kZT4nXG4gICAgICArIChlc2NhcGVkID8gY29kZSA6IGVzY2FwZShjb2RlLCB0cnVlKSlcbiAgICAgICsgJ1xcbjwvY29kZT48L3ByZT4nO1xuICB9XG5cbiAgcmV0dXJuICc8cHJlPjxjb2RlIGNsYXNzPVwiJ1xuICAgICsgdGhpcy5vcHRpb25zLmxhbmdQcmVmaXhcbiAgICArIGVzY2FwZShsYW5nLCB0cnVlKVxuICAgICsgJ1wiPidcbiAgICArIChlc2NhcGVkID8gY29kZSA6IGVzY2FwZShjb2RlLCB0cnVlKSlcbiAgICArICdcXG48L2NvZGU+PC9wcmU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ibG9ja3F1b3RlID0gZnVuY3Rpb24ocXVvdGUpIHtcbiAgcmV0dXJuICc8YmxvY2txdW90ZT5cXG4nICsgcXVvdGUgKyAnPC9ibG9ja3F1b3RlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWw7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaGVhZGluZyA9IGZ1bmN0aW9uKHRleHQsIGxldmVsLCByYXcpIHtcbiAgcmV0dXJuICc8aCdcbiAgICArIGxldmVsXG4gICAgKyAnIGlkPVwiJ1xuICAgICsgdGhpcy5vcHRpb25zLmhlYWRlclByZWZpeFxuICAgICsgcmF3LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15cXHddKy9nLCAnLScpXG4gICAgKyAnXCI+J1xuICAgICsgdGV4dFxuICAgICsgJzwvaCdcbiAgICArIGxldmVsXG4gICAgKyAnPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8aHIvPlxcbicgOiAnPGhyPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uKGJvZHksIG9yZGVyZWQpIHtcbiAgdmFyIHR5cGUgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCc7XG4gIHJldHVybiAnPCcgKyB0eXBlICsgJz5cXG4nICsgYm9keSArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpc3RpdGVtID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxsaT4nICsgdGV4dCArICc8L2xpPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUucGFyYWdyYXBoID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxwPicgKyB0ZXh0ICsgJzwvcD5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlID0gZnVuY3Rpb24oaGVhZGVyLCBib2R5KSB7XG4gIHJldHVybiAnPHRhYmxlPlxcbidcbiAgICArICc8dGhlYWQ+XFxuJ1xuICAgICsgaGVhZGVyXG4gICAgKyAnPC90aGVhZD5cXG4nXG4gICAgKyAnPHRib2R5PlxcbidcbiAgICArIGJvZHlcbiAgICArICc8L3Rib2R5PlxcbidcbiAgICArICc8L3RhYmxlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGVyb3cgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gIHJldHVybiAnPHRyPlxcbicgKyBjb250ZW50ICsgJzwvdHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZWNlbGwgPSBmdW5jdGlvbihjb250ZW50LCBmbGFncykge1xuICB2YXIgdHlwZSA9IGZsYWdzLmhlYWRlciA/ICd0aCcgOiAndGQnO1xuICB2YXIgdGFnID0gZmxhZ3MuYWxpZ25cbiAgICA/ICc8JyArIHR5cGUgKyAnIHN0eWxlPVwidGV4dC1hbGlnbjonICsgZmxhZ3MuYWxpZ24gKyAnXCI+J1xuICAgIDogJzwnICsgdHlwZSArICc+JztcbiAgcmV0dXJuIHRhZyArIGNvbnRlbnQgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbn07XG5cbi8vIHNwYW4gbGV2ZWwgcmVuZGVyZXJcblJlbmRlcmVyLnByb3RvdHlwZS5zdHJvbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPHN0cm9uZz4nICsgdGV4dCArICc8L3N0cm9uZz4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmVtID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxlbT4nICsgdGV4dCArICc8L2VtPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZXNwYW4gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGNvZGU+JyArIHRleHQgKyAnPC9jb2RlPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuYnIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8YnIvPicgOiAnPGJyPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuZGVsID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxkZWw+JyArIHRleHQgKyAnPC9kZWw+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcHJvdCA9IGRlY29kZVVSSUNvbXBvbmVudCh1bmVzY2FwZShocmVmKSlcbiAgICAgICAgLnJlcGxhY2UoL1teXFx3Ol0vZywgJycpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKHByb3QuaW5kZXhPZignamF2YXNjcmlwdDonKSA9PT0gMCB8fCBwcm90LmluZGV4T2YoJ3Zic2NyaXB0OicpID09PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHZhciBvdXQgPSAnPGEgaHJlZj1cIicgKyBocmVmICsgJ1wiJztcbiAgaWYgKHRpdGxlKSB7XG4gICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICB9XG4gIG91dCArPSAnPicgKyB0ZXh0ICsgJzwvYT4nO1xuICByZXR1cm4gb3V0O1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmltYWdlID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgdmFyIG91dCA9ICc8aW1nIHNyYz1cIicgKyBocmVmICsgJ1wiIGFsdD1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgaWYgKHRpdGxlKSB7XG4gICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICB9XG4gIG91dCArPSB0aGlzLm9wdGlvbnMueGh0bWwgPyAnLz4nIDogJz4nO1xuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQYXJzaW5nICYgQ29tcGlsaW5nXG4gKi9cblxuZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbiA9IG51bGw7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLm9wdGlvbnMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG59XG5cbi8qKlxuICogU3RhdGljIFBhcnNlIE1ldGhvZFxuICovXG5cblBhcnNlci5wYXJzZSA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucywgcmVuZGVyZXIpIHtcbiAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucywgcmVuZGVyZXIpO1xuICByZXR1cm4gcGFyc2VyLnBhcnNlKHNyYyk7XG59O1xuXG4vKipcbiAqIFBhcnNlIExvb3BcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oc3JjKSB7XG4gIHRoaXMuaW5saW5lID0gbmV3IElubGluZUxleGVyKHNyYy5saW5rcywgdGhpcy5vcHRpb25zLCB0aGlzLnJlbmRlcmVyKTtcbiAgdGhpcy50b2tlbnMgPSBzcmMucmV2ZXJzZSgpO1xuXG4gIHZhciBvdXQgPSAnJztcbiAgd2hpbGUgKHRoaXMubmV4dCgpKSB7XG4gICAgb3V0ICs9IHRoaXMudG9rKCk7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOZXh0IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRva2VuID0gdGhpcy50b2tlbnMucG9wKCk7XG59O1xuXG4vKipcbiAqIFByZXZpZXcgTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy50b2tlbnMubGVuZ3RoIC0gMV0gfHwgMDtcbn07XG5cbi8qKlxuICogUGFyc2UgVGV4dCBUb2tlbnNcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlVGV4dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm9keSA9IHRoaXMudG9rZW4udGV4dDtcblxuICB3aGlsZSAodGhpcy5wZWVrKCkudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgYm9keSArPSAnXFxuJyArIHRoaXMubmV4dCgpLnRleHQ7XG4gIH1cblxuICByZXR1cm4gdGhpcy5pbmxpbmUub3V0cHV0KGJvZHkpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBDdXJyZW50IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS50b2sgPSBmdW5jdGlvbigpIHtcbiAgc3dpdGNoICh0aGlzLnRva2VuLnR5cGUpIHtcbiAgICBjYXNlICdzcGFjZSc6IHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY2FzZSAnaHInOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5ocigpO1xuICAgIH1cbiAgICBjYXNlICdoZWFkaW5nJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaGVhZGluZyhcbiAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCksXG4gICAgICAgIHRoaXMudG9rZW4uZGVwdGgsXG4gICAgICAgIHRoaXMudG9rZW4udGV4dCk7XG4gICAgfVxuICAgIGNhc2UgJ2NvZGUnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5jb2RlKHRoaXMudG9rZW4udGV4dCxcbiAgICAgICAgdGhpcy50b2tlbi5sYW5nLFxuICAgICAgICB0aGlzLnRva2VuLmVzY2FwZWQpO1xuICAgIH1cbiAgICBjYXNlICd0YWJsZSc6IHtcbiAgICAgIHZhciBoZWFkZXIgPSAnJ1xuICAgICAgICAsIGJvZHkgPSAnJ1xuICAgICAgICAsIGlcbiAgICAgICAgLCByb3dcbiAgICAgICAgLCBjZWxsXG4gICAgICAgICwgZmxhZ3NcbiAgICAgICAgLCBqO1xuXG4gICAgICAvLyBoZWFkZXJcbiAgICAgIGNlbGwgPSAnJztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnRva2VuLmhlYWRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBmbGFncyA9IHsgaGVhZGVyOiB0cnVlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltpXSB9O1xuICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgICAgICAgIHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLmhlYWRlcltpXSksXG4gICAgICAgICAgeyBoZWFkZXI6IHRydWUsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2ldIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGhlYWRlciArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy50b2tlbi5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICByb3cgPSB0aGlzLnRva2VuLmNlbGxzW2ldO1xuXG4gICAgICAgIGNlbGwgPSAnJztcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQocm93W2pdKSxcbiAgICAgICAgICAgIHsgaGVhZGVyOiBmYWxzZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25bal0gfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5ICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci50YWJsZShoZWFkZXIsIGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdibG9ja3F1b3RlX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdibG9ja3F1b3RlX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5ibG9ja3F1b3RlKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsaXN0X3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJ1xuICAgICAgICAsIG9yZGVyZWQgPSB0aGlzLnRva2VuLm9yZGVyZWQ7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdChib2R5LCBvcmRlcmVkKTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9pdGVtX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2l0ZW1fZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rZW4udHlwZSA9PT0gJ3RleHQnXG4gICAgICAgICAgPyB0aGlzLnBhcnNlVGV4dCgpXG4gICAgICAgICAgOiB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0aXRlbShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnbG9vc2VfaXRlbV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9pdGVtX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0aXRlbShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnaHRtbCc6IHtcbiAgICAgIHZhciBodG1sID0gIXRoaXMudG9rZW4ucHJlICYmICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgPyB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KVxuICAgICAgICA6IHRoaXMudG9rZW4udGV4dDtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmh0bWwoaHRtbCk7XG4gICAgfVxuICAgIGNhc2UgJ3BhcmFncmFwaCc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnBhcmFncmFwaCh0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KSk7XG4gICAgfVxuICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5wYXJhZ3JhcGgodGhpcy5wYXJzZVRleHQoKSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhlbHBlcnNcbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoaHRtbCwgZW5jb2RlKSB7XG4gIHJldHVybiBodG1sXG4gICAgLnJlcGxhY2UoIWVuY29kZSA/IC8mKD8hIz9cXHcrOykvZyA6IC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLnJlcGxhY2UoLycvZywgJyYjMzk7Jyk7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWwucmVwbGFjZSgvJihbI1xcd10rKTsvZywgZnVuY3Rpb24oXywgbikge1xuICAgIG4gPSBuLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG4gPT09ICdjb2xvbicpIHJldHVybiAnOic7XG4gICAgaWYgKG4uY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIHJldHVybiBuLmNoYXJBdCgxKSA9PT0gJ3gnXG4gICAgICAgID8gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChuLnN1YnN0cmluZygyKSwgMTYpKVxuICAgICAgICA6IFN0cmluZy5mcm9tQ2hhckNvZGUoK24uc3Vic3RyaW5nKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZShyZWdleCwgb3B0KSB7XG4gIHJlZ2V4ID0gcmVnZXguc291cmNlO1xuICBvcHQgPSBvcHQgfHwgJyc7XG4gIHJldHVybiBmdW5jdGlvbiBzZWxmKG5hbWUsIHZhbCkge1xuICAgIGlmICghbmFtZSkgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgsIG9wdCk7XG4gICAgdmFsID0gdmFsLnNvdXJjZSB8fCB2YWw7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoLyhefFteXFxbXSlcXF4vZywgJyQxJyk7XG4gICAgcmVnZXggPSByZWdleC5yZXBsYWNlKG5hbWUsIHZhbCk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxubm9vcC5leGVjID0gbm9vcDtcblxuZnVuY3Rpb24gbWVyZ2Uob2JqKSB7XG4gIHZhciBpID0gMVxuICAgICwgdGFyZ2V0XG4gICAgLCBrZXk7XG5cbiAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChrZXkgaW4gdGFyZ2V0KSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwga2V5KSkge1xuICAgICAgICBvYmpba2V5XSA9IHRhcmdldFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cblxuLyoqXG4gKiBNYXJrZWRcbiAqL1xuXG5mdW5jdGlvbiBtYXJrZWQoc3JjLCBvcHQsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayB8fCB0eXBlb2Ygb3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBvcHQ7XG4gICAgICBvcHQgPSBudWxsO1xuICAgIH1cblxuICAgIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCB8fCB7fSk7XG5cbiAgICB2YXIgaGlnaGxpZ2h0ID0gb3B0LmhpZ2hsaWdodFxuICAgICAgLCB0b2tlbnNcbiAgICAgICwgcGVuZGluZ1xuICAgICAgLCBpID0gMDtcblxuICAgIHRyeSB7XG4gICAgICB0b2tlbnMgPSBMZXhlci5sZXgoc3JjLCBvcHQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgIH1cblxuICAgIHBlbmRpbmcgPSB0b2tlbnMubGVuZ3RoO1xuXG4gICAgdmFyIGRvbmUgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICB9XG5cbiAgICAgIHZhciBvdXQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIG91dCA9IFBhcnNlci5wYXJzZSh0b2tlbnMsIG9wdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVyciA9IGU7XG4gICAgICB9XG5cbiAgICAgIG9wdC5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG5cbiAgICAgIHJldHVybiBlcnJcbiAgICAgICAgPyBjYWxsYmFjayhlcnIpXG4gICAgICAgIDogY2FsbGJhY2sobnVsbCwgb3V0KTtcbiAgICB9O1xuXG4gICAgaWYgKCFoaWdobGlnaHQgfHwgaGlnaGxpZ2h0Lmxlbmd0aCA8IDMpIHtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlIG9wdC5oaWdobGlnaHQ7XG5cbiAgICBpZiAoIXBlbmRpbmcpIHJldHVybiBkb25lKCk7XG5cbiAgICBmb3IgKDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAnY29kZScpIHtcbiAgICAgICAgICByZXR1cm4gLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGlnaGxpZ2h0KHRva2VuLnRleHQsIHRva2VuLmxhbmcsIGZ1bmN0aW9uKGVyciwgY29kZSkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBkb25lKGVycik7XG4gICAgICAgICAgaWYgKGNvZGUgPT0gbnVsbCB8fCBjb2RlID09PSB0b2tlbi50ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9rZW4udGV4dCA9IGNvZGU7XG4gICAgICAgICAgdG9rZW4uZXNjYXBlZCA9IHRydWU7XG4gICAgICAgICAgLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSh0b2tlbnNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGlmIChvcHQpIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gICAgcmV0dXJuIFBhcnNlci5wYXJzZShMZXhlci5sZXgoc3JjLCBvcHQpLCBvcHQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZS5tZXNzYWdlICs9ICdcXG5QbGVhc2UgcmVwb3J0IHRoaXMgdG8gaHR0cHM6Ly9naXRodWIuY29tL2NoamovbWFya2VkLic7XG4gICAgaWYgKChvcHQgfHwgbWFya2VkLmRlZmF1bHRzKS5zaWxlbnQpIHtcbiAgICAgIHJldHVybiAnPHA+QW4gZXJyb3Igb2NjdXJlZDo8L3A+PHByZT4nXG4gICAgICAgICsgZXNjYXBlKGUubWVzc2FnZSArICcnLCB0cnVlKVxuICAgICAgICArICc8L3ByZT4nO1xuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbi8qKlxuICogT3B0aW9uc1xuICovXG5cbm1hcmtlZC5vcHRpb25zID1cbm1hcmtlZC5zZXRPcHRpb25zID0gZnVuY3Rpb24ob3B0KSB7XG4gIG1lcmdlKG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgcmV0dXJuIG1hcmtlZDtcbn07XG5cbm1hcmtlZC5kZWZhdWx0cyA9IHtcbiAgZ2ZtOiB0cnVlLFxuICB0YWJsZXM6IHRydWUsXG4gIGJyZWFrczogZmFsc2UsXG4gIHBlZGFudGljOiBmYWxzZSxcbiAgc2FuaXRpemU6IGZhbHNlLFxuICBzbWFydExpc3RzOiBmYWxzZSxcbiAgc2lsZW50OiBmYWxzZSxcbiAgaGlnaGxpZ2h0OiBudWxsLFxuICBsYW5nUHJlZml4OiAnbGFuZy0nLFxuICBzbWFydHlwYW50czogZmFsc2UsXG4gIGhlYWRlclByZWZpeDogJycsXG4gIHJlbmRlcmVyOiBuZXcgUmVuZGVyZXIsXG4gIHhodG1sOiBmYWxzZVxufTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xuXG5tYXJrZWQuUGFyc2VyID0gUGFyc2VyO1xubWFya2VkLnBhcnNlciA9IFBhcnNlci5wYXJzZTtcblxubWFya2VkLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5cbm1hcmtlZC5MZXhlciA9IExleGVyO1xubWFya2VkLmxleGVyID0gTGV4ZXIubGV4O1xuXG5tYXJrZWQuSW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlcjtcbm1hcmtlZC5pbmxpbmVMZXhlciA9IElubGluZUxleGVyLm91dHB1dDtcblxubWFya2VkLnBhcnNlID0gbWFya2VkO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gbWFya2VkO1xufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbWFya2VkOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMubWFya2VkID0gbWFya2VkO1xufVxuXG59KS5jYWxsKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpO1xufSgpKTtcbiIsIlxudmFyIGVudiA9IHJlcXVpcmUoJy4vZW52LmpzJyk7XG52YXIgTGV4ZXIgPSByZXF1aXJlKFwiLi9wYXJzZXIvTGV4ZXIuanNcIik7XG52YXIgUGFyc2VyID0gcmVxdWlyZShcIi4vcGFyc2VyL1BhcnNlci5qc1wiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi9jb25maWcuanNcIik7XG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJy4vaGVscGVyL2V4dGVuZC5qcycpO1xuaWYoZW52LmJyb3dzZXIpe1xudmFyIGNvbWJpbmUgPSByZXF1aXJlKCcuL2hlbHBlci9jb21iaW5lLmpzJyk7XG52YXIgZG9tID0gcmVxdWlyZShcIi4vZG9tLmpzXCIpO1xudmFyIHdhbGtlcnMgPSByZXF1aXJlKCcuL3dhbGtlcnMuanMnKTtcbnZhciBHcm91cCA9IHJlcXVpcmUoJy4vZ3JvdXAuanMnKTtcbn1cbnZhciBldmVudHMgPSByZXF1aXJlKCcuL2hlbHBlci9ldmVudC5qcycpO1xudmFyIFdhdGNoZXIgPSByZXF1aXJlKCcuL2hlbHBlci93YXRjaGVyLmpzJyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL2hlbHBlci9wYXJzZS5qcycpO1xudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4vaGVscGVyL2ZpbHRlci5qcycpO1xudmFyIGRvYyA9IHR5cGVvZiBkb2N1bWVudD09PSd1bmRlZmluZWQnPyB7fSA6IGRvY3VtZW50O1xuXG5cbi8qKlxuKiBgUmVndWxhcmAgaXMgcmVndWxhcmpzJ3MgTmFtZVNwYWNlIGFuZCBCYXNlQ2xhc3MuIEV2ZXJ5IENvbXBvbmVudCBpcyBpbmhlcml0ZWQgZnJvbSBpdFxuKiBcbiogQGNsYXNzIFJlZ3VsYXJcbiogQG1vZHVsZSBSZWd1bGFyXG4qIEBjb25zdHJ1Y3RvclxuKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBzcGVjaWZpY2F0aW9uIG9mIHRoZSBjb21wb25lbnRcbiovXG52YXIgUmVndWxhciA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICB2YXIgcHJldlJ1bm5pbmcgPSBlbnYuaXNSdW5uaW5nO1xuICBlbnYuaXNSdW5uaW5nID0gdHJ1ZTtcbiAgdmFyIG5vZGUsIHRlbXBsYXRlO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBvcHRpb25zLmRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XG4gIG9wdGlvbnMuY29tcHV0ZWQgPSBvcHRpb25zLmNvbXB1dGVkIHx8IHt9O1xuICBvcHRpb25zLmV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzIHx8IHt9O1xuICBpZih0aGlzLmRhdGEpIF8uZXh0ZW5kKG9wdGlvbnMuZGF0YSwgdGhpcy5kYXRhKTtcbiAgaWYodGhpcy5jb21wdXRlZCkgXy5leHRlbmQob3B0aW9ucy5jb21wdXRlZCwgdGhpcy5jb21wdXRlZCk7XG4gIGlmKHRoaXMuZXZlbnRzKSBfLmV4dGVuZChvcHRpb25zLmV2ZW50cywgdGhpcy5ldmVudHMpO1xuXG4gIF8uZXh0ZW5kKHRoaXMsIG9wdGlvbnMsIHRydWUpO1xuICBpZih0aGlzLiRwYXJlbnQpe1xuICAgICB0aGlzLiRwYXJlbnQuX2FwcGVuZCh0aGlzKTtcbiAgfVxuICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICB0aGlzLiRyZWZzID0ge307XG5cbiAgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuXG4gIC8vIHRlbXBsYXRlIGlzIGEgc3RyaW5nIChsZW4gPCAxNikuIHdlIHdpbGwgZmluZCBpdCBjb250YWluZXIgZmlyc3RcbiAgaWYoKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgJiYgdGVtcGxhdGUubGVuZ3RoIDwgMTYpICYmIChub2RlID0gZG9tLmZpbmQodGVtcGxhdGUpKSkge1xuICAgIHRlbXBsYXRlID0gbm9kZS5pbm5lckhUTUw7XG4gIH1cbiAgLy8gaWYgdGVtcGxhdGUgaXMgYSB4bWxcbiAgaWYodGVtcGxhdGUgJiYgdGVtcGxhdGUubm9kZVR5cGUpIHRlbXBsYXRlID0gdGVtcGxhdGUuaW5uZXJIVE1MO1xuICBpZih0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKSB0aGlzLnRlbXBsYXRlID0gbmV3IFBhcnNlcih0ZW1wbGF0ZSkucGFyc2UoKTtcblxuICB0aGlzLmNvbXB1dGVkID0gaGFuZGxlQ29tcHV0ZWQodGhpcy5jb21wdXRlZCk7XG4gIHRoaXMuJHJvb3QgPSB0aGlzLiRyb290IHx8IHRoaXM7XG4gIC8vIGlmIGhhdmUgZXZlbnRzXG4gIGlmKHRoaXMuZXZlbnRzKXtcbiAgICB0aGlzLiRvbih0aGlzLmV2ZW50cyk7XG4gIH1cbiAgaWYodGhpcy4kYm9keSl7XG4gICAgdGhpcy5fZ2V0VHJhbnNjbHVkZSA9IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgY3R4ID0gdGhpcy4kcGFyZW50IHx8IHRoaXM7XG4gICAgICBpZih0aGlzLiRib2R5KSByZXR1cm4gY3R4LiRjb21waWxlKHRoaXMuJGJvZHksIHtuYW1lc3BhY2U6IG9wdGlvbnMubmFtZXNwYWNlLCBvdXRlcjogdGhpcywgZXh0cmE6IG9wdGlvbnMuZXh0cmF9KVxuICAgIH1cbiAgfVxuICB0aGlzLiRlbWl0KFwiJGNvbmZpZ1wiKTtcbiAgdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcodGhpcy5kYXRhKTtcbiAgLy8gaGFuZGxlIGNvbXB1dGVkXG4gIGlmKHRlbXBsYXRlKXtcbiAgICB0aGlzLmdyb3VwID0gdGhpcy4kY29tcGlsZSh0aGlzLnRlbXBsYXRlLCB7bmFtZXNwYWNlOiBvcHRpb25zLm5hbWVzcGFjZX0pO1xuICAgIGNvbWJpbmUubm9kZSh0aGlzKTtcbiAgfVxuXG5cbiAgaWYoIXRoaXMuJHBhcmVudCkgdGhpcy4kdXBkYXRlKCk7XG4gIHRoaXMuJHJlYWR5ID0gdHJ1ZTtcbiAgdGhpcy4kZW1pdChcIiRpbml0XCIpO1xuICBpZiggdGhpcy5pbml0ICkgdGhpcy5pbml0KHRoaXMuZGF0YSk7XG5cbiAgLy8gQFRPRE86IHJlbW92ZSwgbWF5YmUgLCB0aGVyZSBpcyBubyBuZWVkIHRvIHVwZGF0ZSBhZnRlciBpbml0OyBcbiAgLy8gaWYodGhpcy4kcm9vdCA9PT0gdGhpcykgdGhpcy4kdXBkYXRlKCk7XG4gIGVudi5pc1J1bm5pbmcgPSBwcmV2UnVubmluZztcblxuICAvLyBjaGlsZHJlbiBpcyBub3QgcmVxdWlyZWQ7XG59XG5cblxud2Fsa2VycyAmJiAod2Fsa2Vycy5SZWd1bGFyID0gUmVndWxhcik7XG5cblxuLy8gZGVzY3JpcHRpb25cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDEuIFJlZ3VsYXIgYW5kIGRlcml2ZWQgQ2xhc3MgdXNlIHNhbWUgZmlsdGVyXG5fLmV4dGVuZChSZWd1bGFyLCB7XG4gIC8vIHByaXZhdGUgZGF0YSBzdHVmZlxuICBfZGlyZWN0aXZlczogeyBfX3JlZ2V4cF9fOltdIH0sXG4gIF9wbHVnaW5zOiB7fSxcbiAgX3Byb3RvSW5oZXJpdENhY2hlOiBbICdkaXJlY3RpdmUnLCAndXNlJ10gLFxuICBfX2FmdGVyX186IGZ1bmN0aW9uKHN1cHIsIG8pIHtcblxuICAgIHZhciB0ZW1wbGF0ZTtcbiAgICB0aGlzLl9fYWZ0ZXJfXyA9IHN1cHIuX19hZnRlcl9fO1xuXG4gICAgLy8gdXNlIG5hbWUgbWFrZSB0aGUgY29tcG9uZW50IGdsb2JhbC5cbiAgICBpZihvLm5hbWUpIFJlZ3VsYXIuY29tcG9uZW50KG8ubmFtZSwgdGhpcyk7XG4gICAgLy8gdGhpcy5wcm90b3R5cGUudGVtcGxhdGUgPSBkb20uaW5pdFRlbXBsYXRlKG8pXG4gICAgaWYodGVtcGxhdGUgPSBvLnRlbXBsYXRlKXtcbiAgICAgIHZhciBub2RlLCBuYW1lO1xuICAgICAgaWYoIHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgJiYgdGVtcGxhdGUubGVuZ3RoIDwgMTYgJiYgKCBub2RlID0gZG9tLmZpbmQoIHRlbXBsYXRlICkpICl7XG4gICAgICAgIHRlbXBsYXRlID0gbm9kZS5pbm5lckhUTUw7XG4gICAgICAgIGlmKG5hbWUgPSBkb20uYXR0cihub2RlLCAnbmFtZScpKSBSZWd1bGFyLmNvbXBvbmVudChuYW1lLCB0aGlzKTtcbiAgICAgIH1cblxuICAgICAgaWYodGVtcGxhdGUubm9kZVR5cGUpIHRlbXBsYXRlID0gdGVtcGxhdGUuaW5uZXJIVE1MO1xuXG4gICAgICBpZih0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgdGhpcy5wcm90b3R5cGUudGVtcGxhdGUgPSBuZXcgUGFyc2VyKHRlbXBsYXRlKS5wYXJzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKG8uY29tcHV0ZWQpIHRoaXMucHJvdG90eXBlLmNvbXB1dGVkID0gaGFuZGxlQ29tcHV0ZWQoby5jb21wdXRlZCk7XG4gICAgLy8gaW5oZXJpdCBkaXJlY3RpdmUgYW5kIG90aGVyIGNvbmZpZyBmcm9tIHN1cHJcbiAgICBSZWd1bGFyLl9pbmhlcml0Q29uZmlnKHRoaXMsIHN1cHIpO1xuXG4gIH0sXG4gIC8qKlxuICAgKiBEZWZpbmUgYSBkaXJlY3RpdmVcbiAgICpcbiAgICogQG1ldGhvZCBkaXJlY3RpdmVcbiAgICogQHJldHVybiB7T2JqZWN0fSBDb3B5IG9mIC4uLlxuICAgKi8gIFxuICBkaXJlY3RpdmU6IGZ1bmN0aW9uKG5hbWUsIGNmZyl7XG5cbiAgICBpZihfLnR5cGVPZihuYW1lKSA9PT0gXCJvYmplY3RcIil7XG4gICAgICBmb3IodmFyIGsgaW4gbmFtZSl7XG4gICAgICAgIGlmKG5hbWUuaGFzT3duUHJvcGVydHkoaykpIHRoaXMuZGlyZWN0aXZlKGssIG5hbWVba10pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciB0eXBlID0gXy50eXBlT2YobmFtZSk7XG4gICAgdmFyIGRpcmVjdGl2ZXMgPSB0aGlzLl9kaXJlY3RpdmVzLCBkaXJlY3RpdmU7XG4gICAgaWYoY2ZnID09IG51bGwpe1xuICAgICAgaWYoIHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKGRpcmVjdGl2ZSA9IGRpcmVjdGl2ZXNbbmFtZV0pICkgcmV0dXJuIGRpcmVjdGl2ZTtcbiAgICAgIGVsc2V7XG4gICAgICAgIHZhciByZWdleHAgPSBkaXJlY3RpdmVzLl9fcmVnZXhwX187XG4gICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHJlZ2V4cC5sZW5ndGg7IGkgPCBsZW4gOyBpKyspe1xuICAgICAgICAgIGRpcmVjdGl2ZSA9IHJlZ2V4cFtpXTtcbiAgICAgICAgICB2YXIgdGVzdCA9IGRpcmVjdGl2ZS5yZWdleHAudGVzdChuYW1lKTtcbiAgICAgICAgICBpZih0ZXN0KSByZXR1cm4gZGlyZWN0aXZlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZih0eXBlb2YgY2ZnID09PSAnZnVuY3Rpb24nKSBjZmcgPSB7IGxpbms6IGNmZyB9IFxuICAgIGlmKHR5cGUgPT09ICdzdHJpbmcnKSBkaXJlY3RpdmVzW25hbWVdID0gY2ZnO1xuICAgIGVsc2UgaWYodHlwZSA9PT0gJ3JlZ2V4cCcpe1xuICAgICAgY2ZnLnJlZ2V4cCA9IG5hbWU7XG4gICAgICBkaXJlY3RpdmVzLl9fcmVnZXhwX18ucHVzaChjZmcpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH0sXG4gIHBsdWdpbjogZnVuY3Rpb24obmFtZSwgZm4pe1xuICAgIHZhciBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcbiAgICBpZihmbiA9PSBudWxsKSByZXR1cm4gcGx1Z2luc1tuYW1lXTtcbiAgICBwbHVnaW5zW25hbWVdID0gZm47XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHVzZTogZnVuY3Rpb24oZm4pe1xuICAgIGlmKHR5cGVvZiBmbiA9PT0gXCJzdHJpbmdcIikgZm4gPSBSZWd1bGFyLnBsdWdpbihmbik7XG4gICAgaWYodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0aGlzO1xuICAgIGZuKHRoaXMsIFJlZ3VsYXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyBjb25maWcgdGhlIFJlZ3VsYXJqcydzIGdsb2JhbFxuICBjb25maWc6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICB2YXIgbmVlZEdlbkxleGVyID0gZmFsc2U7XG4gICAgaWYodHlwZW9mIG5hbWUgPT09IFwib2JqZWN0XCIpe1xuICAgICAgZm9yKHZhciBpIGluIG5hbWUpe1xuICAgICAgICAvLyBpZiB5b3UgY29uZmlnXG4gICAgICAgIGlmKCBpID09PVwiRU5EXCIgfHwgaT09PSdCRUdJTicgKSAgbmVlZEdlbkxleGVyID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnW2ldID0gbmFtZVtpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYobmVlZEdlbkxleGVyKSBMZXhlci5zZXR1cCgpO1xuICB9LFxuICBleHByZXNzaW9uOiBwYXJzZS5leHByZXNzaW9uLFxuICBQYXJzZXI6IFBhcnNlcixcbiAgTGV4ZXI6IExleGVyLFxuICBfYWRkUHJvdG9Jbmhlcml0Q2FjaGU6IGZ1bmN0aW9uKG5hbWUsIHRyYW5zZm9ybSl7XG4gICAgaWYoIEFycmF5LmlzQXJyYXkoIG5hbWUgKSApe1xuICAgICAgcmV0dXJuIG5hbWUuZm9yRWFjaChSZWd1bGFyLl9hZGRQcm90b0luaGVyaXRDYWNoZSk7XG4gICAgfVxuICAgIHZhciBjYWNoZUtleSA9IFwiX1wiICsgbmFtZSArIFwic1wiXG4gICAgUmVndWxhci5fcHJvdG9Jbmhlcml0Q2FjaGUucHVzaChuYW1lKVxuICAgIFJlZ3VsYXJbY2FjaGVLZXldID0ge307XG4gICAgaWYoUmVndWxhcltuYW1lXSkgcmV0dXJuO1xuICAgIFJlZ3VsYXJbbmFtZV0gPSBmdW5jdGlvbihrZXksIGNmZyl7XG4gICAgICB2YXIgY2FjaGUgPSB0aGlzW2NhY2hlS2V5XTtcblxuICAgICAgaWYodHlwZW9mIGtleSA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgIGZvcih2YXIgaSBpbiBrZXkpe1xuICAgICAgICAgIGlmKGtleS5oYXNPd25Qcm9wZXJ0eShpKSkgdGhpc1tuYW1lXShpLCBrZXlbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgaWYoY2ZnID09IG51bGwpIHJldHVybiBjYWNoZVtrZXldO1xuICAgICAgY2FjaGVba2V5XSA9IHRyYW5zZm9ybT8gdHJhbnNmb3JtKGNmZykgOiBjZmc7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sXG4gIF9pbmhlcml0Q29uZmlnOiBmdW5jdGlvbihzZWxmLCBzdXByKXtcblxuICAgIC8vIHByb3RvdHlwZSBpbmhlcml0IHNvbWUgUmVndWxhciBwcm9wZXJ0eVxuICAgIC8vIHNvIGV2ZXJ5IENvbXBvbmVudCB3aWxsIGhhdmUgb3duIGNvbnRhaW5lciB0byBzZXJ2ZSBkaXJlY3RpdmUsIGZpbHRlciBldGMuLlxuICAgIHZhciBkZWZzID0gUmVndWxhci5fcHJvdG9Jbmhlcml0Q2FjaGU7XG4gICAgdmFyIGtleXMgPSBfLnNsaWNlKGRlZnMpO1xuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xuICAgICAgc2VsZltrZXldID0gc3VwcltrZXldO1xuICAgICAgdmFyIGNhY2hlS2V5ID0gJ18nICsga2V5ICsgJ3MnO1xuICAgICAgaWYoc3VwcltjYWNoZUtleV0pIHNlbGZbY2FjaGVLZXldID0gXy5jcmVhdGVPYmplY3Qoc3VwcltjYWNoZUtleV0pO1xuICAgIH0pXG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxufSk7XG5cbmV4dGVuZChSZWd1bGFyKTtcblxuUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUoXCJjb21wb25lbnRcIilcblxuUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUoXCJmaWx0ZXJcIiwgZnVuY3Rpb24oY2ZnKXtcbiAgcmV0dXJuIHR5cGVvZiBjZmcgPT09IFwiZnVuY3Rpb25cIj8ge2dldDogY2ZnfTogY2ZnO1xufSlcblxuXG5ldmVudHMubWl4VG8oUmVndWxhcik7XG5XYXRjaGVyLm1peFRvKFJlZ3VsYXIpO1xuXG5SZWd1bGFyLmltcGxlbWVudCh7XG4gIGluaXQ6IGZ1bmN0aW9uKCl7fSxcbiAgY29uZmlnOiBmdW5jdGlvbigpe30sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgLy8gZGVzdHJveSBldmVudCB3b250IHByb3BnYXRpb247XG4gICAgdGhpcy4kZW1pdChcIiRkZXN0cm95XCIpO1xuICAgIHRoaXMuZ3JvdXAgJiYgdGhpcy5ncm91cC5kZXN0cm95KHRydWUpO1xuICAgIHRoaXMuZ3JvdXAgPSBudWxsO1xuICAgIHRoaXMucGFyZW50Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5fd2F0Y2hlcnMgPSBudWxsO1xuICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgdmFyIHBhcmVudCA9IHRoaXMuJHBhcmVudDtcbiAgICBpZihwYXJlbnQpe1xuICAgICAgdmFyIGluZGV4ID0gcGFyZW50Ll9jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgcGFyZW50Ll9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsMSk7XG4gICAgfVxuICAgIHRoaXMuJHBhcmVudCA9IG51bGw7XG4gICAgdGhpcy4kcm9vdCA9IG51bGw7XG4gICAgdGhpcy5faGFuZGxlcyA9IG51bGw7XG4gICAgdGhpcy4kcmVmcyA9IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGNvbXBpbGUgYSBibG9jayBhc3QgOyByZXR1cm4gYSBncm91cDtcbiAgICogQHBhcmFtICB7QXJyYXl9IHBhcnNlZCBhc3RcbiAgICogQHBhcmFtICB7W3R5cGVdfSByZWNvcmRcbiAgICogQHJldHVybiB7W3R5cGVdfVxuICAgKi9cbiAgJGNvbXBpbGU6IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYodHlwZW9mIGFzdCA9PT0gJ3N0cmluZycpe1xuICAgICAgYXN0ID0gbmV3IFBhcnNlcihhc3QpLnBhcnNlKClcbiAgICB9XG4gICAgdmFyIHByZUV4dCA9IHRoaXMuX19leHRfXyxcbiAgICAgIHJlY29yZCA9IG9wdGlvbnMucmVjb3JkLCBcbiAgICAgIHJlY29yZHM7XG5cbiAgICBpZihvcHRpb25zLmV4dHJhKSB0aGlzLl9fZXh0X18gPSBvcHRpb25zLmV4dHJhO1xuXG4gICAgaWYocmVjb3JkKSB0aGlzLl9yZWNvcmQoKTtcbiAgICB2YXIgZ3JvdXAgPSB0aGlzLl93YWxrKGFzdCwgb3B0aW9ucyk7XG4gICAgaWYocmVjb3JkKXtcbiAgICAgIHJlY29yZHMgPSB0aGlzLl9yZWxlYXNlKCk7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBpZihyZWNvcmRzLmxlbmd0aCl7XG4gICAgICAgIC8vIGF1dG8gZGVzdHJveSBhbGwgd2F0aGVyO1xuICAgICAgICBncm91cC5vbmRlc3Ryb3kgPSBmdW5jdGlvbigpeyBzZWxmLiR1bndhdGNoKHJlY29yZHMpOyB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmKG9wdGlvbnMuZXh0cmEpIHRoaXMuX19leHRfXyA9IHByZUV4dDtcbiAgICByZXR1cm4gZ3JvdXA7XG4gIH0sXG5cblxuICAvKipcbiAgICogY3JlYXRlIHR3by13YXkgYmluZGluZyB3aXRoIGFub3RoZXIgY29tcG9uZW50O1xuICAgKiAqd2Fybio6IFxuICAgKiAgIGV4cHIxIGFuZCBleHByMiBtdXN0IGNhbiBvcGVyYXRlIHNldCZnZXQsIGZvciBleGFtcGxlOiB0aGUgJ2EuYicgb3IgJ2FbYiArIDFdJyBpcyBzZXQtYWJsZSwgYnV0ICdhLmIgKyAxJyBpcyBub3QsIFxuICAgKiAgIGJlYWN1c2UgUmVndWxhciBkb250IGtub3cgaG93IHRvIGludmVyc2Ugc2V0IHRocm91Z2ggdGhlIGV4cHJlc3Npb247XG4gICAqICAgXG4gICAqICAgaWYgYmVmb3JlICRiaW5kLCB0d28gY29tcG9uZW50J3Mgc3RhdGUgaXMgbm90IHN5bmMsIHRoZSBjb21wb25lbnQocGFzc2VkIHBhcmFtKSB3aWxsIHN5bmMgd2l0aCB0aGUgY2FsbGVkIGNvbXBvbmVudDtcbiAgICpcbiAgICogKmV4YW1wbGU6ICpcbiAgICpcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiAvLyBpbiB0aGlzIGV4YW1wbGUsIHdlIG5lZWQgdG8gbGluayB0d28gcGFnZXIgY29tcG9uZW50XG4gICAqIHZhciBwYWdlciA9IG5ldyBQYWdlcih7fSkgLy8gcGFnZXIgY29tcG9lbm50XG4gICAqIHZhciBwYWdlcjIgPSBuZXcgUGFnZXIoe30pIC8vIGFub3RoZXIgcGFnZXIgY29tcG9uZW50XG4gICAqIHBhZ2VyLiRiaW5kKHBhZ2VyMiwgJ2N1cnJlbnQnKTsgLy8gdHdvIHdheSBiaW5kIHRocm93IHR3byBjb21wb25lbnRcbiAgICogcGFnZXIuJGJpbmQocGFnZXIyLCAndG90YWwnKTsgICAvLyBcbiAgICogLy8gb3IganVzdFxuICAgKiBwYWdlci4kYmluZChwYWdlcjIsIHtcImN1cnJlbnRcIjogXCJjdXJyZW50XCIsIFwidG90YWxcIjogXCJ0b3RhbFwifSkgXG4gICAqIGBgYFxuICAgKiBcbiAgICogQHBhcmFtICB7UmVndWxhcn0gY29tcG9uZW50IHRoZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd8RXhwcmVzc2lvbn0gZXhwcjEgICAgIHJlcXVpcmVkLCBzZWxmIGV4cHIxIHRvIG9wZXJhdGUgYmluZGluZ1xuICAgKiBAcGFyYW0gIHtTdHJpbmd8RXhwcmVzc2lvbn0gZXhwcjIgICAgIG9wdGlvbmFsLCBvdGhlciBjb21wb25lbnQncyBleHByIHRvIGJpbmQgd2l0aCwgaWYgbm90IHBhc3NlZCwgdGhlIGV4cHIyIHdpbGwgdXNlIHRoZSBleHByMTtcbiAgICogQHJldHVybiAgICAgICAgICB0aGlzO1xuICAgKi9cbiAgJGJpbmQ6IGZ1bmN0aW9uKGNvbXBvbmVudCwgZXhwcjEsIGV4cHIyKXtcbiAgICB2YXIgdHlwZSA9IF8udHlwZU9mKGV4cHIxKTtcbiAgICBpZiggZXhwcjEudHlwZSA9PT0gJ2V4cHJlc3Npb24nIHx8IHR5cGUgPT09ICdzdHJpbmcnICl7XG4gICAgICB0aGlzLl9iaW5kKGNvbXBvbmVudCwgZXhwcjEsIGV4cHIyKVxuICAgIH1lbHNlIGlmKCB0eXBlID09PSBcImFycmF5XCIgKXsgLy8gbXVsdGlwbHkgc2FtZSBwYXRoIGJpbmRpbmcgdGhyb3VnaCBhcnJheVxuICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gZXhwcjEubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICB0aGlzLl9iaW5kKGNvbXBvbmVudCwgZXhwcjFbaV0pO1xuICAgICAgfVxuICAgIH1lbHNlIGlmKHR5cGUgPT09IFwib2JqZWN0XCIpe1xuICAgICAgZm9yKHZhciBpIGluIGV4cHIxKSBpZihleHByMS5oYXNPd25Qcm9wZXJ0eShpKSl7XG4gICAgICAgIHRoaXMuX2JpbmQoY29tcG9uZW50LCBpLCBleHByMVtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGRpZ2VzdFxuICAgIGNvbXBvbmVudC4kdXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8qKlxuICAgKiB1bmJpbmQgb25lIGNvbXBvbmVudCggc2VlICRiaW5kIGFsc28pXG4gICAqXG4gICAqIHVuYmluZCB3aWxsIHVuYmluZCBhbGwgcmVsYXRpb24gYmV0d2VlbiB0d28gY29tcG9uZW50XG4gICAqIFxuICAgKiBAcGFyYW0gIHtSZWd1bGFyfSBjb21wb25lbnQgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtUaGlzfSAgICB0aGlzXG4gICAqL1xuICAkdW5iaW5kOiBmdW5jdGlvbigpe1xuICAgIC8vIHRvZG9cbiAgfSxcbiAgJGluamVjdDogZnVuY3Rpb24obm9kZSwgcG9zaXRpb24sIG9wdGlvbnMpe1xuICAgIHZhciBmcmFnbWVudCA9IGNvbWJpbmUubm9kZSh0aGlzKTtcblxuICAgIGlmKG5vZGUgPT09IGZhbHNlKSB7XG4gICAgICBpZighdGhpcy5fZnJhZ0NvbnRhaW5lcikgIHRoaXMuX2ZyYWdDb250YWluZXIgPSBkb20uZnJhZ21lbnQoKTtcbiAgICAgIHJldHVybiB0aGlzLiRpbmplY3QodGhpcy5fZnJhZ0NvbnRhaW5lcik7XG4gICAgfVxuICAgIGlmKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykgbm9kZSA9IGRvbS5maW5kKG5vZGUpO1xuICAgIGlmKCFub2RlKSB0aHJvdyAnaW5qZWN0ZWQgbm9kZSBpcyBub3QgZm91bmQnO1xuICAgIGlmKCFmcmFnbWVudCkgcmV0dXJuIHRoaXM7XG4gICAgZG9tLmluamVjdChmcmFnbWVudCwgbm9kZSwgcG9zaXRpb24pO1xuICAgIHRoaXMuJGVtaXQoXCIkaW5qZWN0XCIsIG5vZGUpO1xuICAgIHRoaXMucGFyZW50Tm9kZSA9IEFycmF5LmlzQXJyYXkoZnJhZ21lbnQpPyBmcmFnbWVudFswXS5wYXJlbnROb2RlOiBmcmFnbWVudC5wYXJlbnROb2RlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAkbXV0ZTogZnVuY3Rpb24oaXNNdXRlKXtcblxuICAgIGlzTXV0ZSA9ICEhaXNNdXRlO1xuXG4gICAgdmFyIG5lZWR1cGRhdGUgPSBpc011dGUgPT09IGZhbHNlICYmIHRoaXMuX211dGU7XG5cbiAgICB0aGlzLl9tdXRlID0gISFpc011dGU7XG5cbiAgICBpZihuZWVkdXBkYXRlKSB0aGlzLiR1cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8gcHJpdmF0ZSBiaW5kIGxvZ2ljXG4gIF9iaW5kOiBmdW5jdGlvbihjb21wb25lbnQsIGV4cHIxLCBleHByMil7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gYmFzaWMgYmluZGluZ1xuXG4gICAgaWYoIWNvbXBvbmVudCB8fCAhKGNvbXBvbmVudCBpbnN0YW5jZW9mIFJlZ3VsYXIpKSB0aHJvdyBcIiRiaW5kKCkgc2hvdWxkIHBhc3MgUmVndWxhciBjb21wb25lbnQgYXMgZmlyc3QgYXJndW1lbnRcIjtcbiAgICBpZighZXhwcjEpIHRocm93IFwiJGJpbmQoKSBzaG91bGQgIHBhc3MgYXMgbGVhc3Qgb25lIGV4cHJlc3Npb24gdG8gYmluZFwiO1xuXG4gICAgaWYoIWV4cHIyKSBleHByMiA9IGV4cHIxO1xuXG4gICAgZXhwcjEgPSBwYXJzZS5leHByZXNzaW9uKCBleHByMSApO1xuICAgIGV4cHIyID0gcGFyc2UuZXhwcmVzc2lvbiggZXhwcjIgKTtcblxuICAgIC8vIHNldCBpcyBuZWVkIHRvIG9wZXJhdGUgc2V0dGluZyA7XG4gICAgaWYoZXhwcjIuc2V0KXtcbiAgICAgIHZhciB3aWQxID0gdGhpcy4kd2F0Y2goIGV4cHIxLCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgIGNvbXBvbmVudC4kdXBkYXRlKGV4cHIyLCB2YWx1ZSlcbiAgICAgIH0pO1xuICAgICAgY29tcG9uZW50LiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpe1xuICAgICAgICBzZWxmLiR1bndhdGNoKHdpZDEpXG4gICAgICB9KVxuICAgIH1cbiAgICBpZihleHByMS5zZXQpe1xuICAgICAgdmFyIHdpZDIgPSBjb21wb25lbnQuJHdhdGNoKGV4cHIyLCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgIHNlbGYuJHVwZGF0ZShleHByMSwgdmFsdWUpXG4gICAgICB9KTtcbiAgICAgIC8vIHdoZW4gYnJvdGhlciBkZXN0cm95LCB3ZSB1bmxpbmsgdGhpcyB3YXRjaGVyXG4gICAgICB0aGlzLiRvbignJGRlc3Ryb3knLCBjb21wb25lbnQuJHVud2F0Y2guYmluZChjb21wb25lbnQsd2lkMikpXG4gICAgfVxuICAgIC8vIHN5bmMgdGhlIGNvbXBvbmVudCdzIHN0YXRlIHRvIGNhbGxlZCdzIHN0YXRlXG4gICAgZXhwcjIuc2V0KGNvbXBvbmVudCwgZXhwcjEuZ2V0KHRoaXMpKTtcbiAgfSxcbiAgX3dhbGs6IGZ1bmN0aW9uKGFzdCwgYXJnMSl7XG4gICAgaWYoIF8udHlwZU9mKGFzdCkgPT09ICdhcnJheScgKXtcbiAgICAgIHZhciByZXMgPSBbXTtcblxuICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gYXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgcmVzLnB1c2goIHRoaXMuX3dhbGsoYXN0W2ldLCBhcmcxKSApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IEdyb3VwKHJlcyk7XG4gICAgfVxuICAgIGlmKHR5cGVvZiBhc3QgPT09ICdzdHJpbmcnKSByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKGFzdClcbiAgICByZXR1cm4gd2Fsa2Vyc1thc3QudHlwZSB8fCBcImRlZmF1bHRcIl0uY2FsbCh0aGlzLCBhc3QsIGFyZzEpO1xuICB9LFxuICBfYXBwZW5kOiBmdW5jdGlvbihjb21wb25lbnQpe1xuICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goY29tcG9uZW50KTtcbiAgICBjb21wb25lbnQuJHBhcmVudCA9IHRoaXM7XG4gIH0sXG4gIF9oYW5kbGVFdmVudDogZnVuY3Rpb24oZWxlbSwgdHlwZSwgdmFsdWUsIGF0dHJzKXtcbiAgICB2YXIgQ29tcG9uZW50ID0gdGhpcy5jb25zdHJ1Y3RvcixcbiAgICAgIGZpcmUgPSB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIj8gXy5oYW5kbGVFdmVudC5jYWxsKCB0aGlzLCB2YWx1ZSwgdHlwZSApIDogdmFsdWUsXG4gICAgICBoYW5kbGVyID0gQ29tcG9uZW50LmV2ZW50KHR5cGUpLCBkZXN0cm95O1xuXG4gICAgaWYgKCBoYW5kbGVyICkge1xuICAgICAgZGVzdHJveSA9IGhhbmRsZXIuY2FsbCh0aGlzLCBlbGVtLCBmaXJlLCBhdHRycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5vbihlbGVtLCB0eXBlLCBmaXJlKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhbmRsZXIgPyBkZXN0cm95IDogZnVuY3Rpb24oKSB7XG4gICAgICBkb20ub2ZmKGVsZW0sIHR5cGUsIGZpcmUpO1xuICAgIH1cbiAgfSxcbiAgLy8gMS4g55So5p2l5aSE55CGZXhwckJvZHkgLT4gRnVuY3Rpb25cbiAgLy8gMi4gbGlzdOmHjOeahOW+queOr1xuICBfdG91Y2hFeHByOiBmdW5jdGlvbihleHByKXtcbiAgICB2YXIgIHJhd2dldCwgZXh0ID0gdGhpcy5fX2V4dF9fLCB0b3VjaGVkID0ge307XG4gICAgaWYoZXhwci50eXBlICE9PSAnZXhwcmVzc2lvbicgfHwgZXhwci50b3VjaGVkKSByZXR1cm4gZXhwcjtcbiAgICByYXdnZXQgPSBleHByLmdldCB8fCAoZXhwci5nZXQgPSBuZXcgRnVuY3Rpb24oXy5jdHhOYW1lLCBfLmV4dE5hbWUgLCBfLnByZWZpeCsgXCJyZXR1cm4gKFwiICsgZXhwci5ib2R5ICsgXCIpXCIpKTtcbiAgICB0b3VjaGVkLmdldCA9ICFleHQ/IHJhd2dldDogZnVuY3Rpb24oY29udGV4dCl7XG4gICAgICByZXR1cm4gcmF3Z2V0KGNvbnRleHQsIGV4dClcbiAgICB9XG5cbiAgICBpZihleHByLnNldGJvZHkgJiYgIWV4cHIuc2V0KXtcbiAgICAgIHZhciBzZXRib2R5ID0gZXhwci5zZXRib2R5O1xuICAgICAgZXhwci5zZXQgPSBmdW5jdGlvbihjdHgsIHZhbHVlLCBleHQpe1xuICAgICAgICBleHByLnNldCA9IG5ldyBGdW5jdGlvbihfLmN0eE5hbWUsIF8uc2V0TmFtZSAsIF8uZXh0TmFtZSwgXy5wcmVmaXggKyBzZXRib2R5KTsgICAgICAgICAgXG4gICAgICAgIHJldHVybiBleHByLnNldChjdHgsIHZhbHVlLCBleHQpO1xuICAgICAgfVxuICAgICAgZXhwci5zZXRib2R5ID0gbnVsbDtcbiAgICB9XG4gICAgaWYoZXhwci5zZXQpe1xuICAgICAgdG91Y2hlZC5zZXQgPSAhZXh0PyBleHByLnNldCA6IGZ1bmN0aW9uKGN0eCwgdmFsdWUpe1xuICAgICAgICByZXR1cm4gZXhwci5zZXQoY3R4LCB2YWx1ZSwgZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgXy5leHRlbmQodG91Y2hlZCwge1xuICAgICAgdHlwZTogJ2V4cHJlc3Npb24nLFxuICAgICAgdG91Y2hlZDogdHJ1ZSxcbiAgICAgIG9uY2U6IGV4cHIub25jZSB8fCBleHByLmNvbnN0YW50XG4gICAgfSlcbiAgICByZXR1cm4gdG91Y2hlZFxuICB9LFxuICAvLyBmaW5kIGZpbHRlclxuICBfZl86IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIHZhciBmaWx0ZXIgPSBDb21wb25lbnQuZmlsdGVyKG5hbWUpO1xuICAgIGlmKCFmaWx0ZXIpIHRocm93ICdmaWx0ZXIgJyArIG5hbWUgKyAnIGlzIHVuZGVmaW5lZCc7XG4gICAgcmV0dXJuIGZpbHRlcjtcbiAgfSxcbiAgLy8gc2ltcGxlIGFjY2Vzc29yIGdldFxuICBfc2dfOmZ1bmN0aW9uKHBhdGgsIGRlZmF1bHRzLCBleHQpe1xuICAgIGlmKHR5cGVvZiBleHQgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgIC8vIGlmKHBhdGggPT09IFwiZGVtb3NcIikgIGRlYnVnZ2VyXG4gICAgICB2YXIgY29tcHV0ZWQgPSB0aGlzLmNvbXB1dGVkLFxuICAgICAgICBjb21wdXRlZFByb3BlcnR5ID0gY29tcHV0ZWRbcGF0aF07XG4gICAgICBpZihjb21wdXRlZFByb3BlcnR5KXtcbiAgICAgICAgaWYoY29tcHV0ZWRQcm9wZXJ0eS50eXBlPT09J2V4cHJlc3Npb24nICYmICFjb21wdXRlZFByb3BlcnR5LmdldCkgdGhpcy5fdG91Y2hFeHByKGNvbXB1dGVkUHJvcGVydHkpO1xuICAgICAgICBpZihjb21wdXRlZFByb3BlcnR5LmdldCkgIHJldHVybiBjb21wdXRlZFByb3BlcnR5LmdldCh0aGlzKTtcbiAgICAgICAgZWxzZSBfLmxvZyhcInRoZSBjb21wdXRlZCAnXCIgKyBwYXRoICsgXCInIGRvbid0IGRlZmluZSB0aGUgZ2V0IGZ1bmN0aW9uLCAgZ2V0IGRhdGEuXCIrcGF0aCArIFwiIGFsdG5hdGVseVwiLCBcImVycm9yXCIpXG4gICAgICB9XG4gIH1cbiAgICBpZih0eXBlb2YgZGVmYXVsdHMgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHBhdGggPT0gXCJ1bmRlZmluZWRcIiApIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIChleHQgJiYgdHlwZW9mIGV4dFtwYXRoXSAhPT0gJ3VuZGVmaW5lZCcpPyBleHRbcGF0aF06IGRlZmF1bHRzW3BhdGhdO1xuXG4gIH0sXG4gIC8vIHNpbXBsZSBhY2Nlc3NvciBzZXRcbiAgX3NzXzpmdW5jdGlvbihwYXRoLCB2YWx1ZSwgZGF0YSAsIG9wLCBjb21wdXRlZCl7XG4gICAgdmFyIGNvbXB1dGVkID0gdGhpcy5jb21wdXRlZCxcbiAgICAgIG9wID0gb3AgfHwgXCI9XCIsIHByZXYsIFxuICAgICAgY29tcHV0ZWRQcm9wZXJ0eSA9IGNvbXB1dGVkPyBjb21wdXRlZFtwYXRoXTpudWxsO1xuXG4gICAgaWYob3AgIT09ICc9Jyl7XG4gICAgICBwcmV2ID0gY29tcHV0ZWRQcm9wZXJ0eT8gY29tcHV0ZWRQcm9wZXJ0eS5nZXQodGhpcyk6IGRhdGFbcGF0aF07XG4gICAgICBzd2l0Y2gob3Ape1xuICAgICAgICBjYXNlIFwiKz1cIjpcbiAgICAgICAgICB2YWx1ZSA9IHByZXYgKyB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIi09XCI6XG4gICAgICAgICAgdmFsdWUgPSBwcmV2IC0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIqPVwiOlxuICAgICAgICAgIHZhbHVlID0gcHJldiAqIHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiLz1cIjpcbiAgICAgICAgICB2YWx1ZSA9IHByZXYgLyB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIiU9XCI6XG4gICAgICAgICAgdmFsdWUgPSBwcmV2ICUgdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKGNvbXB1dGVkUHJvcGVydHkpIHtcbiAgICAgIGlmKGNvbXB1dGVkUHJvcGVydHkuc2V0KSByZXR1cm4gY29tcHV0ZWRQcm9wZXJ0eS5zZXQodGhpcywgdmFsdWUpO1xuICAgICAgZWxzZSBfLmxvZyhcInRoZSBjb21wdXRlZCAnXCIgKyBwYXRoICsgXCInIGRvbid0IGRlZmluZSB0aGUgc2V0IGZ1bmN0aW9uLCAgYXNzaWduIGRhdGEuXCIrcGF0aCArIFwiIGFsdG5hdGVseVwiLCBcImVycm9yXCIgKVxuICAgIH1cbiAgICBkYXRhW3BhdGhdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59KTtcblxuUmVndWxhci5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24oKXtcbiAgXy5sb2coXCJ1c2UgJGluamVjdCBpbnN0ZWFkIG9mIGluamVjdFwiLCBcImVycm9yXCIpO1xuICByZXR1cm4gdGhpcy4kaW5qZWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cblxuLy8gb25seSBvbmUgYnVpbHRpbiBmaWx0ZXJcblxuUmVndWxhci5maWx0ZXIoZmlsdGVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWd1bGFyO1xuXG5cblxudmFyIGhhbmRsZUNvbXB1dGVkID0gKGZ1bmN0aW9uKCl7XG4gIC8vIHdyYXAgdGhlIGNvbXB1dGVkIGdldHRlcjtcbiAgZnVuY3Rpb24gd3JhcEdldChnZXQpe1xuICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0KXtcbiAgICAgIHJldHVybiBnZXQuY2FsbChjb250ZXh0LCBjb250ZXh0LmRhdGEgKTtcbiAgICB9XG4gIH1cbiAgLy8gd3JhcCB0aGUgY29tcHV0ZWQgc2V0dGVyO1xuICBmdW5jdGlvbiB3cmFwU2V0KHNldCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRleHQsIHZhbHVlKXtcbiAgICAgIHNldC5jYWxsKCBjb250ZXh0LCB2YWx1ZSwgY29udGV4dC5kYXRhICk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbXB1dGVkKXtcbiAgICBpZighY29tcHV0ZWQpIHJldHVybjtcbiAgICB2YXIgcGFyc2VkQ29tcHV0ZWQgPSB7fSwgaGFuZGxlLCBwYWlyLCB0eXBlO1xuICAgIGZvcih2YXIgaSBpbiBjb21wdXRlZCl7XG4gICAgICBoYW5kbGUgPSBjb21wdXRlZFtpXVxuICAgICAgdHlwZSA9IHR5cGVvZiBoYW5kbGU7XG5cbiAgICAgIGlmKGhhbmRsZS50eXBlID09PSAnZXhwcmVzc2lvbicpe1xuICAgICAgICBwYXJzZWRDb21wdXRlZFtpXSA9IGhhbmRsZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiggdHlwZSA9PT0gXCJzdHJpbmdcIiApe1xuICAgICAgICBwYXJzZWRDb21wdXRlZFtpXSA9IHBhcnNlLmV4cHJlc3Npb24oaGFuZGxlKVxuICAgICAgfWVsc2V7XG4gICAgICAgIHBhaXIgPSBwYXJzZWRDb21wdXRlZFtpXSA9IHt0eXBlOiAnZXhwcmVzc2lvbid9O1xuICAgICAgICBpZih0eXBlID09PSBcImZ1bmN0aW9uXCIgKXtcbiAgICAgICAgICBwYWlyLmdldCA9IHdyYXBHZXQoaGFuZGxlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgaWYoaGFuZGxlLmdldCkgcGFpci5nZXQgPSB3cmFwR2V0KGhhbmRsZS5nZXQpO1xuICAgICAgICAgIGlmKGhhbmRsZS5zZXQpIHBhaXIuc2V0ID0gd3JhcFNldChoYW5kbGUuc2V0KTtcbiAgICAgICAgfVxuICAgICAgfSBcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZENvbXB1dGVkO1xuICB9XG59KSgpO1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbidCRUdJTic6ICd7JyxcbidFTkQnOiAnfSdcbn0iLCJ2YXIgLy8gcGFja2FnZXNcbiAgXyA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpLFxuIGFuaW1hdGUgPSByZXF1aXJlKFwiLi4vaGVscGVyL2FuaW1hdGUuanNcIiksXG4gZG9tID0gcmVxdWlyZShcIi4uL2RvbS5qc1wiKSxcbiBSZWd1bGFyID0gcmVxdWlyZShcIi4uL1JlZ3VsYXIuanNcIik7XG5cblxudmFyIC8vIHZhcmlhYmxlc1xuICByQ2xhc3NOYW1lID0gL15bLVxcd10rKFxcc1stXFx3XSspKiQvLFxuICByQ29tbWFTZXAgPSAvW1xcclxcblxcZiBdKixbXFxyXFxuXFxmIF0qKD89XFx3K1xcOikvLCAvLyAgZG9udCBzcGxpdCBjb21tYSBpbiAgRXhwcmVzc2lvblxuICByU3R5bGVzID0gL15cXHsuKlxcfSQvLCAvLyAgZm9yIFNpbXBpbGZ5XG4gIHJTcGFjZSA9IC9cXHMrLywgLy8gIGZvciBTaW1waWxmeVxuICBXSEVOX0NPTU1BTkQgPSBcIndoZW5cIixcbiAgRVZFTlRfQ09NTUFORCA9IFwib25cIixcbiAgVEhFTl9DT01NQU5EID0gXCJ0aGVuXCI7XG5cbi8qKlxuICogQW5pbWF0aW9uIFBsdWdpblxuICogQHBhcmFtIHtDb21wb25lbnR9IENvbXBvbmVudCBcbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVNlZWQodHlwZSl7XG5cbiAgdmFyIHN0ZXBzID0gW10sIGN1cnJlbnQgPSAwLCBjYWxsYmFjayA9IF8ubm9vcDtcbiAgdmFyIGtleTtcblxuICB2YXIgb3V0ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKGNiKXtcbiAgICAgIGtleSA9IF8udWlkKCk7XG4gICAgICBpZih0eXBlb2YgY2IgPT09IFwiZnVuY3Rpb25cIikgY2FsbGJhY2sgPSBjYjtcbiAgICAgIGlmKGN1cnJlbnQ+IDAgKXtcbiAgICAgICAgY3VycmVudCA9IDAgO1xuICAgICAgfWVsc2V7XG4gICAgICAgIG91dC5zdGVwKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0LmNvbXBlbGV0ZTtcbiAgICB9LFxuICAgIGNvbXBlbGV0ZTogZnVuY3Rpb24oKXtcbiAgICAgIGtleSA9IG51bGw7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgY2FsbGJhY2sgPSBfLm5vb3A7XG4gICAgICBjdXJyZW50ID0gMDtcbiAgICB9LFxuICAgIHN0ZXA6IGZ1bmN0aW9uKCl7XG4gICAgICBpZihzdGVwc1tjdXJyZW50XSkgc3RlcHNbY3VycmVudCBdKCBvdXQuZG9uZS5iaW5kKG91dCwga2V5KSApO1xuICAgIH0sXG4gICAgZG9uZTogZnVuY3Rpb24ocGtleSl7XG4gICAgICBpZihwa2V5ICE9PSBrZXkpIHJldHVybjsgLy8gbWVhbnMgdGhlIGxvb3AgaXMgZG93blxuICAgICAgaWYoIGN1cnJlbnQgPCBzdGVwcy5sZW5ndGggLSAxICkge1xuICAgICAgICBjdXJyZW50Kys7XG4gICAgICAgIG91dC5zdGVwKCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgb3V0LmNvbXBlbGV0ZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcHVzaDogZnVuY3Rpb24oc3RlcCl7XG4gICAgICBzdGVwcy5wdXNoKHN0ZXApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUoXCJhbmltYXRpb25cIilcblxuXG4vLyBidWlsdGluIGFuaW1hdGlvblxuUmVndWxhci5hbmltYXRpb24oe1xuICBcIndhaXRcIjogZnVuY3Rpb24oIHN0ZXAgKXtcbiAgICB2YXIgdGltZW91dCA9IHBhcnNlSW50KCBzdGVwLnBhcmFtICkgfHwgMFxuICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcbiAgICAgIC8vIF8ubG9nKFwiZGVsYXkgXCIgKyB0aW1lb3V0KVxuICAgICAgc2V0VGltZW91dCggZG9uZSwgdGltZW91dCApO1xuICAgIH1cbiAgfSxcbiAgXCJjbGFzc1wiOiBmdW5jdGlvbihzdGVwKXtcbiAgICB2YXIgdG1wID0gc3RlcC5wYXJhbS5zcGxpdChcIixcIiksXG4gICAgICBjbGFzc05hbWUgPSB0bXBbMF0gfHwgXCJcIixcbiAgICAgIG1vZGUgPSBwYXJzZUludCh0bXBbMV0pIHx8IDE7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oZG9uZSl7XG4gICAgICAvLyBfLmxvZyhjbGFzc05hbWUpXG4gICAgICBhbmltYXRlLnN0YXJ0Q2xhc3NBbmltYXRlKCBzdGVwLmVsZW1lbnQsIGNsYXNzTmFtZSAsIGRvbmUsIG1vZGUgKTtcbiAgICB9XG4gIH0sXG4gIFwiY2FsbFwiOiBmdW5jdGlvbihzdGVwKXtcbiAgICB2YXIgZm4gPSB0aGlzLiRleHByZXNzaW9uKHN0ZXAucGFyYW0pLmdldCwgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgLy8gXy5sb2coc3RlcC5wYXJhbSwgJ2NhbGwnKVxuICAgICAgZm4oc2VsZik7XG4gICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICAgIGRvbmUoKVxuICAgIH1cbiAgfSxcbiAgXCJlbWl0XCI6IGZ1bmN0aW9uKHN0ZXApe1xuICAgIHZhciBwYXJhbSA9IHN0ZXAucGFyYW07XG4gICAgdmFyIHRtcCA9IHBhcmFtLnNwbGl0KFwiLFwiKSxcbiAgICAgIGV2dCA9IHRtcFswXSB8fCBcIlwiLFxuICAgICAgYXJncyA9IHRtcFsxXT8gdGhpcy4kZXhwcmVzc2lvbih0bXBbMV0pLmdldDogbnVsbDtcblxuICAgIGlmKCFldnQpIHRocm93IFwieW91IHNob3VkIHNwZWNpZmllZCBhIGV2ZW50bmFtZSBpbiBlbWl0IGNvbW1hbmRcIjtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oZG9uZSl7XG4gICAgICBzZWxmLiRlbWl0KGV2dCwgYXJncz8gYXJncyhzZWxmKSA6IHVuZGVmaW5lZCk7XG4gICAgICBkb25lKCk7XG4gICAgfVxuICB9LFxuICAvLyBzdHlsZTogbGVmdCB7MTB9cHgsXG4gIHN0eWxlOiBmdW5jdGlvbihzdGVwKXtcbiAgICB2YXIgc3R5bGVzID0ge30sIFxuICAgICAgcGFyYW0gPSBzdGVwLnBhcmFtLFxuICAgICAgcGFpcnMgPSBwYXJhbS5zcGxpdChcIixcIiksIHZhbGlkO1xuICAgIHBhaXJzLmZvckVhY2goZnVuY3Rpb24ocGFpcil7XG4gICAgICBwYWlyID0gcGFpci50cmltKCk7XG4gICAgICBpZihwYWlyKXtcbiAgICAgICAgdmFyIHRtcCA9IHBhaXIuc3BsaXQoIHJTcGFjZSApLFxuICAgICAgICAgIG5hbWUgPSB0bXAuc2hpZnQoKSxcbiAgICAgICAgICB2YWx1ZSA9IHRtcC5qb2luKFwiIFwiKTtcblxuICAgICAgICBpZiggIW5hbWUgfHwgIXZhbHVlICkgdGhyb3cgXCJpbnZhbGlkIHN0eWxlIGluIGNvbW1hbmQ6IHN0eWxlXCI7XG4gICAgICAgIHN0eWxlc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcbiAgICAgIGlmKHZhbGlkKXtcbiAgICAgICAgYW5pbWF0ZS5zdGFydFN0eWxlQW5pbWF0ZShzdGVwLmVsZW1lbnQsIHN0eWxlcywgZG9uZSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuXG5cbi8vIGhhbmNkbGUgdGhlIHItYW5pbWF0aW9uIGRpcmVjdGl2ZVxuLy8gZWwgOiB0aGUgZWxlbWVudCB0byBwcm9jZXNzXG4vLyB2YWx1ZTogdGhlIGRpcmVjdGl2ZSB2YWx1ZVxuZnVuY3Rpb24gcHJvY2Vzc0FuaW1hdGUoIGVsZW1lbnQsIHZhbHVlICl7XG4gIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuXG4gIHZhciBjb21wb3NpdGVzID0gdmFsdWUuc3BsaXQoXCI7XCIpLCBcbiAgICBjb21wb3NpdGUsIGNvbnRleHQgPSB0aGlzLCBzZWVkcyA9IFtdLCBzZWVkLCBkZXN0cm9pZXMgPSBbXSwgZGVzdHJveSxcbiAgICBjb21tYW5kLCBwYXJhbSAsIGN1cnJlbnQgPSAwLCB0bXAsIGFuaW1hdG9yLCBzZWxmID0gdGhpcztcblxuICBmdW5jdGlvbiByZXNldCggdHlwZSApe1xuICAgIHNlZWQgJiYgc2VlZHMucHVzaCggc2VlZCApXG4gICAgc2VlZCA9IGNyZWF0ZVNlZWQoIHR5cGUgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdoZW5DYWxsYmFjayhzdGFydCwgdmFsdWUpe1xuICAgIGlmKCAhIXZhbHVlICkgc3RhcnQoKVxuICB9XG5cbiAgZnVuY3Rpb24gYW5pbWF0aW9uRGVzdHJveShlbGVtZW50KXtcbiAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgIGRlbGV0ZSBlbGVtZW50Lm9uZW50ZXI7XG4gICAgICBkZWxldGUgZWxlbWVudC5vbmxlYXZlO1xuICAgIH0gXG4gIH1cblxuICBmb3IoIHZhciBpID0gMCwgbGVuID0gY29tcG9zaXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuXG4gICAgY29tcG9zaXRlID0gY29tcG9zaXRlc1tpXTtcbiAgICB0bXAgPSBjb21wb3NpdGUuc3BsaXQoXCI6XCIpO1xuICAgIGNvbW1hbmQgPSB0bXBbMF0gJiYgdG1wWzBdLnRyaW0oKTtcbiAgICBwYXJhbSA9IHRtcFsxXSAmJiB0bXBbMV0udHJpbSgpO1xuXG4gICAgaWYoICFjb21tYW5kICkgY29udGludWU7XG5cbiAgICBpZiggY29tbWFuZCA9PT0gV0hFTl9DT01NQU5EICl7XG4gICAgICByZXNldChcIndoZW5cIik7XG4gICAgICB0aGlzLiR3YXRjaChwYXJhbSwgd2hlbkNhbGxiYWNrLmJpbmQoIHRoaXMsIHNlZWQuc3RhcnQgKSApO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYoIGNvbW1hbmQgPT09IEVWRU5UX0NPTU1BTkQpe1xuICAgICAgcmVzZXQocGFyYW0pO1xuICAgICAgaWYoIHBhcmFtID09PSBcImxlYXZlXCIgKXtcbiAgICAgICAgZWxlbWVudC5vbmxlYXZlID0gc2VlZC5zdGFydDtcbiAgICAgICAgZGVzdHJvaWVzLnB1c2goIGFuaW1hdGlvbkRlc3Ryb3koZWxlbWVudCkgKTtcbiAgICAgIH1lbHNlIGlmKCBwYXJhbSA9PT0gXCJlbnRlclwiICl7XG4gICAgICAgIGVsZW1lbnQub25lbnRlciA9IHNlZWQuc3RhcnQ7XG4gICAgICAgIGRlc3Ryb2llcy5wdXNoKCBhbmltYXRpb25EZXN0cm95KGVsZW1lbnQpICk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaWYoIChcIm9uXCIgKyBwYXJhbSkgaW4gZWxlbWVudCl7IC8vIGlmIGRvbSBoYXZlIHRoZSBldmVudCAsIHdlIHVzZSBkb20gZXZlbnRcbiAgICAgICAgICBkZXN0cm9pZXMucHVzaCh0aGlzLl9oYW5kbGVFdmVudCggZWxlbWVudCwgcGFyYW0sIHNlZWQuc3RhcnQgKSk7XG4gICAgICAgIH1lbHNleyAvLyBvdGhlcndpc2UsIHdlIHVzZSBjb21wb25lbnQgZXZlbnRcbiAgICAgICAgICB0aGlzLiRvbihwYXJhbSwgc2VlZC5zdGFydCk7XG4gICAgICAgICAgZGVzdHJvaWVzLnB1c2godGhpcy4kb2ZmLmJpbmQodGhpcywgcGFyYW0sIHNlZWQuc3RhcnQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICB2YXIgYW5pbWF0b3IgPSAgUmVndWxhci5hbmltYXRpb24oY29tbWFuZCkgXG4gICAgaWYoIGFuaW1hdG9yICYmIHNlZWQgKXtcbiAgICAgIHNlZWQucHVzaChcbiAgICAgICAgYW5pbWF0b3IuY2FsbCh0aGlzLHtcbiAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgIGRvbmU6IHNlZWQuZG9uZSxcbiAgICAgICAgICBwYXJhbTogcGFyYW0gXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfWVsc2V7XG4gICAgICB0aHJvdyBcInlvdSBuZWVkIHN0YXJ0IHdpdGggYG9uYCBvciBgZXZlbnRgIGluIHItYW5pbWF0aW9uXCI7XG4gICAgfVxuICB9XG5cbiAgaWYoZGVzdHJvaWVzLmxlbmd0aCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICBkZXN0cm9pZXMuZm9yRWFjaChmdW5jdGlvbihkZXN0cm95KXtcbiAgICAgICAgZGVzdHJveSgpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuXG5SZWd1bGFyLmRpcmVjdGl2ZSggXCJyLWFuaW1hdGlvblwiLCBwcm9jZXNzQW5pbWF0ZSlcblJlZ3VsYXIuZGlyZWN0aXZlKCBcInItc2VxdWVuY2VcIiwgcHJvY2Vzc0FuaW1hdGUpXG5cbiIsIi8vIFJlZ3VsYXJcbnZhciBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2RvbS5qc1wiKTtcbnZhciBhbmltYXRlID0gcmVxdWlyZShcIi4uL2hlbHBlci9hbmltYXRlLmpzXCIpO1xudmFyIFJlZ3VsYXIgPSByZXF1aXJlKFwiLi4vUmVndWxhci5qc1wiKTtcblxuXG5cbnJlcXVpcmUoXCIuL2V2ZW50LmpzXCIpO1xucmVxdWlyZShcIi4vZm9ybS5qc1wiKTtcblxuXG4vLyAqKndhcm4qKjogY2xhc3MgaW50ZXBsYXRpb24gd2lsbCBvdmVycmlkZSB0aGlzIGRpcmVjdGl2ZSBcblxuUmVndWxhci5kaXJlY3RpdmUoJ3ItY2xhc3MnLCBmdW5jdGlvbihlbGVtLCB2YWx1ZSl7XG4gIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbihudmFsdWUpe1xuICAgIHZhciBjbGFzc05hbWUgPSAnICcrIGVsZW0uY2xhc3NOYW1lLnJlcGxhY2UoL1xccysvZywgJyAnKSArJyAnO1xuICAgIGZvcih2YXIgaSBpbiBudmFsdWUpIGlmKG52YWx1ZS5oYXNPd25Qcm9wZXJ0eShpKSl7XG4gICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUucmVwbGFjZSgnICcgKyBpICsgJyAnLCcgJyk7XG4gICAgICBpZihudmFsdWVbaV0gPT09IHRydWUpe1xuICAgICAgICBjbGFzc05hbWUgKz0gaSsnICc7XG4gICAgICB9XG4gICAgfVxuICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lLnRyaW0oKTtcbiAgfSx0cnVlKTtcblxufSk7XG5cbi8vICoqd2FybioqOiBzdHlsZSBpbnRlcGxhdGlvbiB3aWxsIG92ZXJyaWRlIHRoaXMgZGlyZWN0aXZlIFxuXG5SZWd1bGFyLmRpcmVjdGl2ZSgnci1zdHlsZScsIGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcbiAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWx1ZSl7XG4gICAgZm9yKHZhciBpIGluIG52YWx1ZSkgaWYobnZhbHVlLmhhc093blByb3BlcnR5KGkpKXtcbiAgICAgIGRvbS5jc3MoZWxlbSwgaSwgbnZhbHVlW2ldKTtcbiAgICB9XG4gIH0sdHJ1ZSk7XG59KTtcblxuLy8gd2hlbiBleHByZXNzaW9uIGlzIGV2YWx1YXRlIHRvIHRydWUsIHRoZSBlbGVtIHdpbGwgYWRkIGRpc3BsYXk6bm9uZVxuLy8gRXhhbXBsZTogPGRpdiByLWhpZGU9e3tpdGVtcy5sZW5ndGggPiAwfX0+PC9kaXY+XG5cblJlZ3VsYXIuZGlyZWN0aXZlKCdyLWhpZGUnLCBmdW5jdGlvbihlbGVtLCB2YWx1ZSl7XG4gIHZhciBwcmVCb29sID0gbnVsbCwgY29tcGVsZXRlO1xuICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlKXtcbiAgICB2YXIgYm9vbCA9ICEhbnZhbHVlO1xuICAgIGlmKGJvb2wgPT09IHByZUJvb2wpIHJldHVybjsgXG4gICAgcHJlQm9vbCA9IGJvb2w7XG4gICAgaWYoYm9vbCl7XG4gICAgICBpZihlbGVtLm9ubGVhdmUpe1xuICAgICAgICBjb21wZWxldGUgPSBlbGVtLm9ubGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICAgIGNvbXBlbGV0ZSA9IG51bGw7XG4gICAgICAgIH0pXG4gICAgICB9ZWxzZXtcbiAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICAgIH1cbiAgICAgIFxuICAgIH1lbHNle1xuICAgICAgaWYoY29tcGVsZXRlKSBjb21wZWxldGUoKTtcbiAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICBpZihlbGVtLm9uZW50ZXIpe1xuICAgICAgICBlbGVtLm9uZW50ZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG59KTtcblxuLy8gdW5lc2NhcGVkIGludGVwbGF0aW9uLiB4c3MgaXMgbm90IGJlIHByb3RlY3RcblJlZ3VsYXIuZGlyZWN0aXZlKCdyLWh0bWwnLCBmdW5jdGlvbihlbGVtLCB2YWx1ZSl7XG4gIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbihudmFsdWUpe1xuICAgIG52YWx1ZSA9IG52YWx1ZSB8fCBcIlwiO1xuICAgIGRvbS5odG1sKGVsZW0sIG52YWx1ZSlcbiAgfSwge2ZvcmNlOiB0cnVlfSk7XG59KTtcblxuXG5cblxuXG5cblxuXG5cbiIsIi8qKlxuICogZXZlbnQgZGlyZWN0aXZlICBidW5kbGVcbiAqXG4gKi9cbnZhciBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2RvbS5qc1wiKTtcbnZhciBSZWd1bGFyID0gcmVxdWlyZShcIi4uL1JlZ3VsYXIuanNcIik7XG5cblJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiZXZlbnRcIik7XG5cblJlZ3VsYXIuZXZlbnQoXCJlbnRlclwiLCBmdW5jdGlvbihlbGVtLCBmaXJlKSB7XG4gIF8ubG9nKFwib24tZW50ZXIgd2lsbCBiZSByZW1vdmVkIGluIDAuNC4wXCIsIFwiZXJyb3JcIik7XG4gIGZ1bmN0aW9uIHVwZGF0ZSggZXYgKSB7XG4gICAgaWYgKCBldi53aGljaCA9PT0gMTMgKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZmlyZShldik7XG4gICAgfVxuICB9XG4gIGRvbS5vbiggZWxlbSwgXCJrZXlwcmVzc1wiLCB1cGRhdGUgKTtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgZG9tLm9mZiggZWxlbSwgXCJrZXlwcmVzc1wiLCB1cGRhdGUgKTtcbiAgfVxufSlcblxuXG5SZWd1bGFyLmRpcmVjdGl2ZSggL15vbi1cXHcrJC8sIGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSAsIGF0dHJzKSB7XG4gIGlmICggIW5hbWUgfHwgIXZhbHVlICkgcmV0dXJuO1xuICB2YXIgdHlwZSA9IG5hbWUuc3BsaXQoXCItXCIpWzFdO1xuICByZXR1cm4gdGhpcy5faGFuZGxlRXZlbnQoIGVsZW0sIHR5cGUsIHZhbHVlLCBhdHRycyApO1xufSk7XG4vLyBUT0RPLlxuLyoqXG4tICQoJ2R4JykuZGVsZWdhdGUoKVxuKi9cblJlZ3VsYXIuZGlyZWN0aXZlKCAvXmRlbGVnYXRlLVxcdyskLywgZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lLCBhdHRycyApIHtcbiAgdmFyIHJvb3QgPSB0aGlzLiRyb290O1xuICB2YXIgX2RlbGVnYXRlcyA9IHJvb3QuX2RlbGVnYXRlcyB8fCAoIHJvb3QuX2RlbGVnYXRlcyA9IHt9ICk7XG4gIGlmICggIW5hbWUgfHwgIXZhbHVlICkgcmV0dXJuO1xuICB2YXIgdHlwZSA9IG5hbWUuc3BsaXQoXCItXCIpWzFdO1xuICB2YXIgZmlyZSA9IF8uaGFuZGxlRXZlbnQuY2FsbCh0aGlzLCB2YWx1ZSwgdHlwZSk7XG5cbiAgZnVuY3Rpb24gZGVsZWdhdGVFdmVudChldil7XG4gICAgbWF0Y2hQYXJlbnQoZXYsIF9kZWxlZ2F0ZXNbdHlwZV0pO1xuICB9XG5cbiAgaWYoICFfZGVsZWdhdGVzW3R5cGVdICl7XG4gICAgX2RlbGVnYXRlc1t0eXBlXSA9IFtdO1xuXG4gICAgcm9vdC4kb24oIFwiJGluamVjdFwiLCBmdW5jdGlvbiggbmV3UGFyZW50ICl7XG4gICAgICB2YXIgcHJlUGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgICAgaWYoIHByZVBhcmVudCApe1xuICAgICAgICBkb20ub2ZmKHByZVBhcmVudCwgdHlwZSwgZGVsZWdhdGVFdmVudCk7XG4gICAgICB9XG4gICAgICBkb20ub24obmV3UGFyZW50LCB0eXBlLCBkZWxlZ2F0ZUV2ZW50KTtcbiAgICB9KVxuXG4gICAgcm9vdC4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpe1xuICAgICAgaWYocm9vdC5wYXJlbnROb2RlKSBkb20ub2ZmKHJvb3QucGFyZW50Tm9kZSwgdHlwZSwgZGVsZWdhdGVFdmVudClcbiAgICAgIHJvb3QuX2RlbGVnYXRlc1t0eXBlXSA9IG51bGw7XG4gICAgfSlcbiAgfVxuICB2YXIgZGVsZWdhdGUgPSB7XG4gICAgZWxlbWVudDogZWxlbSxcbiAgICBmaXJlOiBmaXJlXG4gIH1cbiAgX2RlbGVnYXRlc1t0eXBlXS5wdXNoKCBkZWxlZ2F0ZSApO1xuXG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHZhciBkZWxlZ2F0ZXMgPSBfZGVsZWdhdGVzW3R5cGVdO1xuICAgIGlmKCFkZWxlZ2F0ZXMgfHwgIWRlbGVnYXRlcy5sZW5ndGgpIHJldHVybjtcbiAgICBmb3IoIHZhciBpID0gMCwgbGVuID0gZGVsZWdhdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICl7XG4gICAgICBpZiggZGVsZWdhdGVzW2ldID09PSBkZWxlZ2F0ZSApIGRlbGVnYXRlcy5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9XG5cbn0pO1xuXG5cbmZ1bmN0aW9uIG1hdGNoUGFyZW50KGV2ICwgZGVsZWdhdGVzKXtcbiAgdmFyIHRhcmdldCA9IGV2LnRhcmdldDtcbiAgd2hpbGUodGFyZ2V0ICYmIHRhcmdldCAhPT0gZG9tLmRvYyl7XG4gICAgZm9yKCB2YXIgaSA9IDAsIGxlbiA9IGRlbGVnYXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuICAgICAgaWYoZGVsZWdhdGVzW2ldLmVsZW1lbnQgPT09IHRhcmdldCl7XG4gICAgICAgIGRlbGVnYXRlc1tpXS5maXJlKGV2KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gIH1cbn0iLCIvLyBSZWd1bGFyXG52YXIgXyA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9kb20uanNcIik7XG52YXIgUmVndWxhciA9IHJlcXVpcmUoXCIuLi9SZWd1bGFyLmpzXCIpO1xuXG52YXIgbW9kZWxIYW5kbGVycyA9IHtcbiAgXCJ0ZXh0XCI6IGluaXRUZXh0LFxuICBcInNlbGVjdFwiOiBpbml0U2VsZWN0LFxuICBcImNoZWNrYm94XCI6IGluaXRDaGVja0JveCxcbiAgXCJyYWRpb1wiOiBpbml0UmFkaW9cbn1cblxuXG4vLyBAVE9ET1xuXG5cbi8vIHR3by13YXkgYmluZGluZyB3aXRoIHItbW9kZWxcbi8vIHdvcmtzIG9uIGlucHV0LCB0ZXh0YXJlYSwgY2hlY2tib3gsIHJhZGlvLCBzZWxlY3RcblxuUmVndWxhci5kaXJlY3RpdmUoXCJyLW1vZGVsXCIsIGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcbiAgdmFyIHRhZyA9IGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgc2lnbiA9IHRhZztcbiAgaWYoc2lnbiA9PT0gXCJpbnB1dFwiKSBzaWduID0gZWxlbS50eXBlIHx8IFwidGV4dFwiO1xuICBlbHNlIGlmKHNpZ24gPT09IFwidGV4dGFyZWFcIikgc2lnbiA9IFwidGV4dFwiO1xuICBpZih0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHZhbHVlID0gdGhpcy4kZXhwcmVzc2lvbih2YWx1ZSk7XG5cbiAgaWYoIG1vZGVsSGFuZGxlcnNbc2lnbl0gKSByZXR1cm4gbW9kZWxIYW5kbGVyc1tzaWduXS5jYWxsKHRoaXMsIGVsZW0sIHZhbHVlKTtcbiAgZWxzZSBpZih0YWcgPT09IFwiaW5wdXRcIil7XG4gICAgcmV0dXJuIG1vZGVsSGFuZGxlcnMudGV4dC5jYWxsKHRoaXMsIGVsZW0sIHZhbHVlKTtcbiAgfVxufSk7XG5cblxuXG4vLyBiaW5kaW5nIDxzZWxlY3Q+XG5cbmZ1bmN0aW9uIGluaXRTZWxlY3QoIGVsZW0sIHBhcnNlZCl7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHdjID10aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKG5ld1ZhbHVlKXtcbiAgICB2YXIgY2hpbGRyZW4gPSBfLnNsaWNlKGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpKVxuICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obm9kZSwgaW5kZXgpe1xuICAgICAgaWYobm9kZS52YWx1ZSA9PSBuZXdWYWx1ZSl7XG4gICAgICAgIGVsZW0uc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH0pXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZXIoKXtcbiAgICBwYXJzZWQuc2V0KHNlbGYsIHRoaXMudmFsdWUpO1xuICAgIHdjLmxhc3QgPSB0aGlzLnZhbHVlO1xuICAgIHNlbGYuJHVwZGF0ZSgpO1xuICB9XG5cbiAgZG9tLm9uKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICBcbiAgaWYocGFyc2VkLmdldChzZWxmKSA9PT0gdW5kZWZpbmVkICYmIGVsZW0udmFsdWUpe1xuICAgICBwYXJzZWQuc2V0KHNlbGYsIGVsZW0udmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiBkZXN0cm95KCl7XG4gICAgZG9tLm9mZihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKTtcbiAgfVxufVxuXG4vLyBpbnB1dCx0ZXh0YXJlYSBiaW5kaW5nXG5cbmZ1bmN0aW9uIGluaXRUZXh0KGVsZW0sIHBhcnNlZCl7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHdjID0gdGhpcy4kd2F0Y2gocGFyc2VkLCBmdW5jdGlvbihuZXdWYWx1ZSl7XG4gICAgaWYoZWxlbS52YWx1ZSAhPT0gbmV3VmFsdWUpIGVsZW0udmFsdWUgPSBuZXdWYWx1ZSA9PSBudWxsPyBcIlwiOiBcIlwiICsgbmV3VmFsdWU7XG4gIH0pO1xuXG4gIC8vIEBUT0RPIHRvIGZpeGVkIGV2ZW50XG4gIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlcihldil7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGlmKGV2LnR5cGU9PT0nY3V0JyB8fCBldi50eXBlPT09J3Bhc3RlJyl7XG4gICAgICBfLm5leHRUaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoYXQudmFsdWVcbiAgICAgICAgcGFyc2VkLnNldChzZWxmLCB2YWx1ZSk7XG4gICAgICAgIHdjLmxhc3QgPSB2YWx1ZTtcbiAgICAgICAgc2VsZi4kdXBkYXRlKCk7XG4gICAgICB9KVxuICAgIH1lbHNle1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGF0LnZhbHVlXG4gICAgICAgIHBhcnNlZC5zZXQoc2VsZiwgdmFsdWUpO1xuICAgICAgICB3Yy5sYXN0ID0gdmFsdWU7XG4gICAgICAgIHNlbGYuJHVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBpZihkb20ubXNpZSAhPT0gOSAmJiBcIm9uaW5wdXRcIiBpbiBkb20udE5vZGUgKXtcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBoYW5kbGVyICk7XG4gIH1lbHNle1xuICAgIGRvbS5vbihlbGVtLCBcInBhc3RlXCIsIGhhbmRsZXIpXG4gICAgZG9tLm9uKGVsZW0sIFwia2V5dXBcIiwgaGFuZGxlcilcbiAgICBkb20ub24oZWxlbSwgXCJjdXRcIiwgaGFuZGxlcilcbiAgICBkb20ub24oZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcilcbiAgfVxuICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQgJiYgZWxlbS52YWx1ZSl7XG4gICAgIHBhcnNlZC5zZXQoc2VsZiwgZWxlbS52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIGRlc3Ryb3koKXtcbiAgICBpZihkb20ubXNpZSAhPT0gOSAmJiBcIm9uaW5wdXRcIiBpbiBkb20udE5vZGUgKXtcbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZXIgKTtcbiAgICB9ZWxzZXtcbiAgICAgIGRvbS5vZmYoZWxlbSwgXCJwYXN0ZVwiLCBoYW5kbGVyKVxuICAgICAgZG9tLm9mZihlbGVtLCBcImtleXVwXCIsIGhhbmRsZXIpXG4gICAgICBkb20ub2ZmKGVsZW0sIFwiY3V0XCIsIGhhbmRsZXIpXG4gICAgICBkb20ub2ZmKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG4gICAgfVxuICB9XG59XG5cblxuLy8gaW5wdXQ6Y2hlY2tib3ggIGJpbmRpbmdcblxuZnVuY3Rpb24gaW5pdENoZWNrQm94KGVsZW0sIHBhcnNlZCl7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHdhdGNoZXIgPSB0aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKG5ld1ZhbHVlKXtcbiAgICBkb20uYXR0cihlbGVtLCAnY2hlY2tlZCcsICEhbmV3VmFsdWUpO1xuICB9KTtcblxuICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoKXtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgcGFyc2VkLnNldChzZWxmLCB2YWx1ZSk7XG4gICAgd2F0Y2hlci5sYXN0ID0gdmFsdWU7XG4gICAgc2VsZi4kdXBkYXRlKCk7XG4gIH1cbiAgaWYocGFyc2VkLnNldCkgZG9tLm9uKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG5cbiAgaWYocGFyc2VkLmdldChzZWxmKSA9PT0gdW5kZWZpbmVkKXtcbiAgICBwYXJzZWQuc2V0KHNlbGYsICEhZWxlbS5jaGVja2VkKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBkZXN0cm95KCl7XG4gICAgaWYocGFyc2VkLnNldCkgZG9tLm9mZihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxuICB9XG59XG5cblxuLy8gaW5wdXQ6cmFkaW8gYmluZGluZ1xuXG5mdW5jdGlvbiBpbml0UmFkaW8oZWxlbSwgcGFyc2VkKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgd2MgPSB0aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKCBuZXdWYWx1ZSApe1xuICAgIGlmKG5ld1ZhbHVlID09IGVsZW0udmFsdWUpIGVsZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgZWxzZSBlbGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgfSk7XG5cblxuICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoKXtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIHBhcnNlZC5zZXQoc2VsZiwgdmFsdWUpO1xuICAgIHNlbGYuJHVwZGF0ZSgpO1xuICB9XG4gIGlmKHBhcnNlZC5zZXQpIGRvbS5vbihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxuICAvLyBiZWFjdXNlIG9ubHkgYWZ0ZXIgY29tcGlsZShpbml0KSwgdGhlIGRvbSBzdHJ1Y3RydWUgaXMgZXhzaXQuIFxuICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQpe1xuICAgIGlmKGVsZW0uY2hlY2tlZCkge1xuICAgICAgcGFyc2VkLnNldChzZWxmLCBlbGVtLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gZGVzdHJveSgpe1xuICAgIGlmKHBhcnNlZC5zZXQpIGRvbS5vZmYoZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcilcbiAgfVxufVxuIiwiXG4vLyB0aGFua3MgZm9yIGFuZ3VsYXIgJiYgbW9vdG9vbHMgZm9yIHNvbWUgY29uY2lzZSZjcm9zcy1wbGF0Zm9ybSAgaW1wbGVtZW50aW9uXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIFRoZSBNSVQgTGljZW5zZVxuLy8gQ29weXJpZ2h0IChjKSAyMDEwLTIwMTQgR29vZ2xlLCBJbmMuIGh0dHA6Ly9hbmd1bGFyanMub3JnXG5cbi8vIC0tLVxuLy8gbGljZW5zZTogTUlULXN0eWxlIGxpY2Vuc2UuIGh0dHA6Ly9tb290b29scy5uZXRcblxuXG52YXIgZG9tID0gbW9kdWxlLmV4cG9ydHM7XG52YXIgZW52ID0gcmVxdWlyZShcIi4vZW52LmpzXCIpO1xudmFyIF8gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xudmFyIHROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbnZhciBhZGRFdmVudCwgcmVtb3ZlRXZlbnQ7XG52YXIgbm9vcCA9IGZ1bmN0aW9uKCl7fVxuXG52YXIgbmFtZXNwYWNlcyA9IHtcbiAgaHRtbDogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsXG4gIHN2ZzogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG59XG5cbmRvbS5ib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuZG9tLmRvYyA9IGRvY3VtZW50O1xuXG4vLyBjYW1lbENhc2VcbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpe1xuICByZXR1cm4gKFwiXCIgKyBzdHIpLnJlcGxhY2UoLy1cXEQvZywgZnVuY3Rpb24obWF0Y2gpe1xuICAgIHJldHVybiBtYXRjaC5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5cblxuZG9tLnROb2RlID0gdE5vZGU7XG5cbmlmKHROb2RlLmFkZEV2ZW50TGlzdGVuZXIpe1xuICBhZGRFdmVudCA9IGZ1bmN0aW9uKG5vZGUsIHR5cGUsIGZuKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSk7XG4gIH1cbiAgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBmbikge1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpIFxuICB9XG59ZWxzZXtcbiAgYWRkRXZlbnQgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBmbikge1xuICAgIG5vZGUuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGZuKTtcbiAgfVxuICByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKG5vZGUsIHR5cGUsIGZuKSB7XG4gICAgbm9kZS5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgZm4pOyBcbiAgfVxufVxuXG5cbmRvbS5tc2llID0gcGFyc2VJbnQoKC9tc2llIChcXGQrKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpIHx8IFtdKVsxXSk7XG5pZiAoaXNOYU4oZG9tLm1zaWUpKSB7XG4gIGRvbS5tc2llID0gcGFyc2VJbnQoKC90cmlkZW50XFwvLio7IHJ2OihcXGQrKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpIHx8IFtdKVsxXSk7XG59XG5cbmRvbS5maW5kID0gZnVuY3Rpb24oc2wpe1xuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSB7XG4gICAgdHJ5e1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2wpO1xuICAgIH1jYXRjaChlKXtcblxuICAgIH1cbiAgfVxuICBpZihzbC5pbmRleE9mKCcjJykhPT0tMSkgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBzbC5zbGljZSgxKSApO1xufVxuXG5kb20uaW5qZWN0ID0gZnVuY3Rpb24obm9kZSwgcmVmZXIsIHBvc2l0aW9uKXtcblxuICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8ICdib3R0b20nO1xuXG4gIGlmKEFycmF5LmlzQXJyYXkobm9kZSkpe1xuICAgIHZhciB0bXAgPSBub2RlO1xuICAgIG5vZGUgPSBkb20uZnJhZ21lbnQoKTtcbiAgICBmb3IodmFyIGkgPSAwLGxlbiA9IHRtcC5sZW5ndGg7IGkgPCBsZW4gO2krKyl7XG4gICAgICBub2RlLmFwcGVuZENoaWxkKHRtcFtpXSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGZpcnN0Q2hpbGQsIG5leHQ7XG4gIHN3aXRjaChwb3NpdGlvbil7XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHJlZmVyLmFwcGVuZENoaWxkKCBub2RlICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0b3AnOlxuICAgICAgaWYoIGZpcnN0Q2hpbGQgPSByZWZlci5maXJzdENoaWxkICl7XG4gICAgICAgIHJlZmVyLmluc2VydEJlZm9yZSggbm9kZSwgcmVmZXIuZmlyc3RDaGlsZCApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJlZmVyLmFwcGVuZENoaWxkKCBub2RlICk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhZnRlcic6XG4gICAgICBpZiggbmV4dCA9IHJlZmVyLm5leHRTaWJsaW5nICl7XG4gICAgICAgIG5leHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIG5vZGUsIG5leHQgKTtcbiAgICAgIH1lbHNle1xuICAgICAgICByZWZlci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKCBub2RlICk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiZWZvcmUnOlxuICAgICAgcmVmZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIG5vZGUsIHJlZmVyICk7XG4gIH1cbn1cblxuXG5kb20uaWQgPSBmdW5jdGlvbihpZCl7XG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG59XG5cbi8vIGNyZWF0ZUVsZW1lbnQgXG5kb20uY3JlYXRlID0gZnVuY3Rpb24odHlwZSwgbnMsIGF0dHJzKXtcbiAgaWYobnMgPT09ICdzdmcnKXtcbiAgICBpZighZW52LnN2ZykgdGhyb3cgRXJyb3IoJ3RoZSBlbnYgbmVlZCBzdmcgc3VwcG9ydCcpXG4gICAgbnMgPSBuYW1lc3BhY2VzLnN2ZztcbiAgfVxuICByZXR1cm4gIW5zPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsIHR5cGUpO1xufVxuXG4vLyBkb2N1bWVudEZyYWdtZW50XG5kb20uZnJhZ21lbnQgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xufVxuXG5cblxudmFyIHNwZWNpYWxBdHRyID0ge1xuICAnY2xhc3MnOiBmdW5jdGlvbihub2RlLCB2YWx1ZSl7XG4gICAgKCdjbGFzc05hbWUnIGluIG5vZGUgJiYgKG5vZGUubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VzLmh0bWwgfHwgIW5vZGUubmFtZXNwYWNlVVJJKSkgP1xuICAgICAgbm9kZS5jbGFzc05hbWUgPSAodmFsdWUgfHwgJycpIDogbm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgdmFsdWUpO1xuICB9LFxuICAnZm9yJzogZnVuY3Rpb24obm9kZSwgdmFsdWUpe1xuICAgICgnaHRtbEZvcicgaW4gbm9kZSkgPyBub2RlLmh0bWxGb3IgPSB2YWx1ZSA6IG5vZGUuc2V0QXR0cmlidXRlKCdmb3InLCB2YWx1ZSk7XG4gIH0sXG4gICdzdHlsZSc6IGZ1bmN0aW9uKG5vZGUsIHZhbHVlKXtcbiAgICAobm9kZS5zdHlsZSkgPyBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZSA6IG5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHZhbHVlKTtcbiAgfSxcbiAgJ3ZhbHVlJzogZnVuY3Rpb24obm9kZSwgdmFsdWUpe1xuICAgIG5vZGUudmFsdWUgPSAodmFsdWUgIT0gbnVsbCkgPyB2YWx1ZSA6ICcnO1xuICB9XG59XG5cblxuLy8gYXR0cmlidXRlIFNldHRlciAmIEdldHRlclxuZG9tLmF0dHIgPSBmdW5jdGlvbihub2RlLCBuYW1lLCB2YWx1ZSl7XG4gIGlmIChfLmlzQm9vbGVhbkF0dHIobmFtZSkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKCEhdmFsdWUpIHtcbiAgICAgICAgbm9kZVtuYW1lXSA9IHRydWU7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIG5hbWUpO1xuICAgICAgICAvLyBsdCBpZTcgLiB0aGUgamF2YXNjcmlwdCBjaGVja2VkIHNldHRpbmcgaXMgaW4gdmFsaWRcbiAgICAgICAgLy9odHRwOi8vYnl0ZXMuY29tL3RvcGljL2phdmFzY3JpcHQvaW5zaWdodHMvNzk5MTY3LWJyb3dzZXItcXVpcmstZHluYW1pY2FsbHktYXBwZW5kZWQtY2hlY2tlZC1jaGVja2JveC1kb2VzLW5vdC1hcHBlYXItY2hlY2tlZC1pZVxuICAgICAgICBpZihkb20ubXNpZSAmJiBkb20ubXNpZSA8PTcgKSBub2RlLmRlZmF1bHRDaGVja2VkID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZVtuYW1lXSA9IGZhbHNlO1xuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChub2RlW25hbWVdIHx8XG4gICAgICAgICAgICAgICAobm9kZS5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbShuYW1lKXx8IG5vb3ApLnNwZWNpZmllZCkgPyBuYW1lIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgKHZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBpZiBpbiBzcGVjaWFsQXR0cjtcbiAgICBpZihzcGVjaWFsQXR0cltuYW1lXSkgc3BlY2lhbEF0dHJbbmFtZV0obm9kZSwgdmFsdWUpO1xuICAgIGVsc2UgaWYodmFsdWUgPT09IG51bGwpIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG4gICAgZWxzZSBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUpIHtcbiAgICAvLyB0aGUgZXh0cmEgYXJndW1lbnQgXCIyXCIgaXMgdG8gZ2V0IHRoZSByaWdodCB0aGluZyBmb3IgYS5ocmVmIGluIElFLCBzZWUgalF1ZXJ5IGNvZGVcbiAgICAvLyBzb21lIGVsZW1lbnRzIChlLmcuIERvY3VtZW50KSBkb24ndCBoYXZlIGdldCBhdHRyaWJ1dGUsIHNvIHJldHVybiB1bmRlZmluZWRcbiAgICB2YXIgcmV0ID0gbm9kZS5nZXRBdHRyaWJ1dGUobmFtZSwgMik7XG4gICAgLy8gbm9ybWFsaXplIG5vbi1leGlzdGluZyBhdHRyaWJ1dGVzIHRvIHVuZGVmaW5lZCAoYXMgalF1ZXJ5KVxuICAgIHJldHVybiByZXQgPT09IG51bGwgPyB1bmRlZmluZWQgOiByZXQ7XG4gIH1cbn1cblxuXG5kb20ub24gPSBmdW5jdGlvbihub2RlLCB0eXBlLCBoYW5kbGVyKXtcbiAgdmFyIHR5cGVzID0gdHlwZS5zcGxpdCgnICcpO1xuICBoYW5kbGVyLnJlYWwgPSBmdW5jdGlvbihldil7XG4gICAgdmFyICRldmVudCA9IG5ldyBFdmVudChldik7XG4gICAgJGV2ZW50Lm9yaWdpbiA9IG5vZGU7XG4gICAgaGFuZGxlci5jYWxsKG5vZGUsICRldmVudCk7XG4gIH1cbiAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbih0eXBlKXtcbiAgICB0eXBlID0gZml4RXZlbnROYW1lKG5vZGUsIHR5cGUpO1xuICAgIGFkZEV2ZW50KG5vZGUsIHR5cGUsIGhhbmRsZXIucmVhbCk7XG4gIH0pO1xufVxuZG9tLm9mZiA9IGZ1bmN0aW9uKG5vZGUsIHR5cGUsIGhhbmRsZXIpe1xuICB2YXIgdHlwZXMgPSB0eXBlLnNwbGl0KCcgJyk7XG4gIGhhbmRsZXIgPSBoYW5kbGVyLnJlYWwgfHwgaGFuZGxlcjtcbiAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbih0eXBlKXtcbiAgICB0eXBlID0gZml4RXZlbnROYW1lKG5vZGUsIHR5cGUpO1xuICAgIHJlbW92ZUV2ZW50KG5vZGUsIHR5cGUsIGhhbmRsZXIpO1xuICB9KVxufVxuXG5cbmRvbS50ZXh0ID0gKGZ1bmN0aW9uICgpe1xuICB2YXIgbWFwID0ge307XG4gIGlmIChkb20ubXNpZSAmJiBkb20ubXNpZSA8IDkpIHtcbiAgICBtYXBbMV0gPSAnaW5uZXJUZXh0JzsgICAgXG4gICAgbWFwWzNdID0gJ25vZGVWYWx1ZSc7ICAgIFxuICB9IGVsc2Uge1xuICAgIG1hcFsxXSA9IG1hcFszXSA9ICd0ZXh0Q29udGVudCc7XG4gIH1cbiAgXG4gIHJldHVybiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcbiAgICB2YXIgdGV4dFByb3AgPSBtYXBbbm9kZS5ub2RlVHlwZV07XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiB0ZXh0UHJvcCA/IG5vZGVbdGV4dFByb3BdIDogJyc7XG4gICAgfVxuICAgIG5vZGVbdGV4dFByb3BdID0gdmFsdWU7XG4gIH1cbn0pKCk7XG5cblxuZG9tLmh0bWwgPSBmdW5jdGlvbiggbm9kZSwgaHRtbCApe1xuICBpZih0eXBlb2YgaHRtbCA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgcmV0dXJuIG5vZGUuaW5uZXJIVE1MO1xuICB9ZWxzZXtcbiAgICBub2RlLmlubmVySFRNTCA9IGh0bWw7XG4gIH1cbn1cblxuZG9tLnJlcGxhY2UgPSBmdW5jdGlvbihub2RlLCByZXBsYWNlZCl7XG4gIGlmKHJlcGxhY2VkLnBhcmVudE5vZGUpIHJlcGxhY2VkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5vZGUsIHJlcGxhY2VkKTtcbn1cblxuZG9tLnJlbW92ZSA9IGZ1bmN0aW9uKG5vZGUpe1xuICBpZihub2RlLnBhcmVudE5vZGUpIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cblxuLy8gY3NzIFNldHRsZSAmIEdldHRlciBmcm9tIGFuZ3VsYXJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gaXQgaXNudCBjb21wdXRlZCBzdHlsZSBcbmRvbS5jc3MgPSBmdW5jdGlvbihub2RlLCBuYW1lLCB2YWx1ZSl7XG4gIGlmKCBfLnR5cGVPZihuYW1lKSA9PT0gXCJvYmplY3RcIiApe1xuICAgIGZvcih2YXIgaSBpbiBuYW1lKXtcbiAgICAgIGlmKCBuYW1lLmhhc093blByb3BlcnR5KGkpICl7XG4gICAgICAgIGRvbS5jc3MoIG5vZGUsIGksIG5hbWVbaV0gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICggdHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiICkge1xuXG4gICAgbmFtZSA9IGNhbWVsQ2FzZShuYW1lKTtcbiAgICBpZihuYW1lKSBub2RlLnN0eWxlW25hbWVdID0gdmFsdWU7XG5cbiAgfSBlbHNlIHtcblxuICAgIHZhciB2YWw7XG4gICAgaWYgKGRvbS5tc2llIDw9IDgpIHtcbiAgICAgIC8vIHRoaXMgaXMgc29tZSBJRSBzcGVjaWZpYyB3ZWlyZG5lc3MgdGhhdCBqUXVlcnkgMS42LjQgZG9lcyBub3Qgc3VyZSB3aHlcbiAgICAgIHZhbCA9IG5vZGUuY3VycmVudFN0eWxlICYmIG5vZGUuY3VycmVudFN0eWxlW25hbWVdO1xuICAgICAgaWYgKHZhbCA9PT0gJycpIHZhbCA9ICdhdXRvJztcbiAgICB9XG4gICAgdmFsID0gdmFsIHx8IG5vZGUuc3R5bGVbbmFtZV07XG4gICAgaWYgKGRvbS5tc2llIDw9IDgpIHtcbiAgICAgIHZhbCA9IHZhbCA9PT0gJycgPyB1bmRlZmluZWQgOiB2YWw7XG4gICAgfVxuICAgIHJldHVybiAgdmFsO1xuICB9XG59XG5cbmRvbS5hZGRDbGFzcyA9IGZ1bmN0aW9uKG5vZGUsIGNsYXNzTmFtZSl7XG4gIHZhciBjdXJyZW50ID0gbm9kZS5jbGFzc05hbWUgfHwgXCJcIjtcbiAgaWYgKChcIiBcIiArIGN1cnJlbnQgKyBcIiBcIikuaW5kZXhPZihcIiBcIiArIGNsYXNzTmFtZSArIFwiIFwiKSA9PT0gLTEpIHtcbiAgICBub2RlLmNsYXNzTmFtZSA9IGN1cnJlbnQ/ICggY3VycmVudCArIFwiIFwiICsgY2xhc3NOYW1lICkgOiBjbGFzc05hbWU7XG4gIH1cbn1cblxuZG9tLmRlbENsYXNzID0gZnVuY3Rpb24obm9kZSwgY2xhc3NOYW1lKXtcbiAgdmFyIGN1cnJlbnQgPSBub2RlLmNsYXNzTmFtZSB8fCBcIlwiO1xuICBub2RlLmNsYXNzTmFtZSA9IChcIiBcIiArIGN1cnJlbnQgKyBcIiBcIikucmVwbGFjZShcIiBcIiArIGNsYXNzTmFtZSArIFwiIFwiLCBcIiBcIikudHJpbSgpO1xufVxuXG5kb20uaGFzQ2xhc3MgPSBmdW5jdGlvbihub2RlLCBjbGFzc05hbWUpe1xuICB2YXIgY3VycmVudCA9IG5vZGUuY2xhc3NOYW1lIHx8IFwiXCI7XG4gIHJldHVybiAoXCIgXCIgKyBjdXJyZW50ICsgXCIgXCIpLmluZGV4T2YoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIikgIT09IC0xO1xufVxuXG5cblxuLy8gc2ltcGxlIEV2ZW50IHdyYXBcblxuLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExMDY4MTk2L2llOC1pZTctb25jaGFuZ2UtZXZlbnQtaXMtZW1pdGVkLW9ubHktYWZ0ZXItcmVwZWF0ZWQtc2VsZWN0aW9uXG5mdW5jdGlvbiBmaXhFdmVudE5hbWUoZWxlbSwgbmFtZSl7XG4gIHJldHVybiAobmFtZSA9PT0gJ2NoYW5nZScgICYmICBkb20ubXNpZSA8IDkgJiYgXG4gICAgICAoZWxlbSAmJiBlbGVtLnRhZ05hbWUgJiYgZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk9PT0naW5wdXQnICYmIFxuICAgICAgICAoZWxlbS50eXBlID09PSAnY2hlY2tib3gnIHx8IGVsZW0udHlwZSA9PT0gJ3JhZGlvJylcbiAgICAgIClcbiAgICApPyAnY2xpY2snOiBuYW1lO1xufVxuXG52YXIgck1vdXNlRXZlbnQgPSAvXig/OmNsaWNrfGRibGNsaWNrfGNvbnRleHRtZW51fERPTU1vdXNlU2Nyb2xsfG1vdXNlKD86XFx3KykpJC9cbnZhciBkb2MgPSBkb2N1bWVudDtcbmRvYyA9ICghZG9jLmNvbXBhdE1vZGUgfHwgZG9jLmNvbXBhdE1vZGUgPT09ICdDU1MxQ29tcGF0JykgPyBkb2MuZG9jdW1lbnRFbGVtZW50IDogZG9jLmJvZHk7XG5mdW5jdGlvbiBFdmVudChldil7XG4gIGV2ID0gZXYgfHwgd2luZG93LmV2ZW50O1xuICBpZihldi5fZml4ZWQpIHJldHVybiBldjtcbiAgdGhpcy5ldmVudCA9IGV2O1xuICB0aGlzLnRhcmdldCA9IGV2LnRhcmdldCB8fCBldi5zcmNFbGVtZW50O1xuXG4gIHZhciB0eXBlID0gdGhpcy50eXBlID0gZXYudHlwZTtcbiAgdmFyIGJ1dHRvbiA9IHRoaXMuYnV0dG9uID0gZXYuYnV0dG9uO1xuXG4gIC8vIGlmIGlzIG1vdXNlIGV2ZW50IHBhdGNoIHBhZ2VYXG4gIGlmKHJNb3VzZUV2ZW50LnRlc3QodHlwZSkpeyAvL2ZpeCBwYWdlWFxuICAgIHRoaXMucGFnZVggPSAoZXYucGFnZVggIT0gbnVsbCkgPyBldi5wYWdlWCA6IGV2LmNsaWVudFggKyBkb2Muc2Nyb2xsTGVmdDtcbiAgICB0aGlzLnBhZ2VZID0gKGV2LnBhZ2VYICE9IG51bGwpID8gZXYucGFnZVkgOiBldi5jbGllbnRZICsgZG9jLnNjcm9sbFRvcDtcbiAgICBpZiAodHlwZSA9PT0gJ21vdXNlb3ZlcicgfHwgdHlwZSA9PT0gJ21vdXNlb3V0Jyl7Ly8gZml4IHJlbGF0ZWRUYXJnZXRcbiAgICAgIHZhciByZWxhdGVkID0gZXYucmVsYXRlZFRhcmdldCB8fCBldlsodHlwZSA9PT0gJ21vdXNlb3ZlcicgPyAnZnJvbScgOiAndG8nKSArICdFbGVtZW50J107XG4gICAgICB3aGlsZSAocmVsYXRlZCAmJiByZWxhdGVkLm5vZGVUeXBlID09PSAzKSByZWxhdGVkID0gcmVsYXRlZC5wYXJlbnROb2RlO1xuICAgICAgdGhpcy5yZWxhdGVkVGFyZ2V0ID0gcmVsYXRlZDtcbiAgICB9XG4gIH1cbiAgLy8gaWYgaXMgbW91c2VzY3JvbGxcbiAgaWYgKHR5cGUgPT09ICdET01Nb3VzZVNjcm9sbCcgfHwgdHlwZSA9PT0gJ21vdXNld2hlZWwnKXtcbiAgICAvLyBmZiBldi5kZXRhaWw6IDMgICAgb3RoZXIgZXYud2hlZWxEZWx0YTogLTEyMFxuICAgIHRoaXMud2hlZWxEZWx0YSA9IChldi53aGVlbERlbHRhKSA/IGV2LndoZWVsRGVsdGEgLyAxMjAgOiAtKGV2LmRldGFpbCB8fCAwKSAvIDM7XG4gIH1cbiAgXG4gIC8vIGZpeCB3aGljaFxuICB0aGlzLndoaWNoID0gZXYud2hpY2ggfHwgZXYua2V5Q29kZTtcbiAgaWYoICF0aGlzLndoaWNoICYmIGJ1dHRvbiAhPT0gdW5kZWZpbmVkKXtcbiAgICAvLyBodHRwOi8vYXBpLmpxdWVyeS5jb20vZXZlbnQud2hpY2gvIHVzZSB3aGljaFxuICAgIHRoaXMud2hpY2ggPSAoIGJ1dHRvbiAmIDEgPyAxIDogKCBidXR0b24gJiAyID8gMyA6ICggYnV0dG9uICYgNCA/IDIgOiAwICkgKSApO1xuICB9XG4gIHRoaXMuX2ZpeGVkID0gdHJ1ZTtcbn1cblxuXy5leHRlbmQoRXZlbnQucHJvdG90eXBlLCB7XG4gIGltbWVkaWF0ZVN0b3A6IF8uaXNGYWxzZSxcbiAgc3RvcDogZnVuY3Rpb24oKXtcbiAgICB0aGlzLnByZXZlbnREZWZhdWx0KCkuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0sXG4gIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpe1xuICAgIGlmICh0aGlzLmV2ZW50LnByZXZlbnREZWZhdWx0KSB0aGlzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZWxzZSB0aGlzLmV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKXtcbiAgICBpZiAodGhpcy5ldmVudC5zdG9wUHJvcGFnYXRpb24pIHRoaXMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZWxzZSB0aGlzLmV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogZnVuY3Rpb24oKXtcbiAgICBpZih0aGlzLmV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikgdGhpcy5ldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgfVxufSlcblxuXG5kb20ubmV4dEZyYW1lID0gKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwgXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDE2KVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgdmFyIGNhbmNlbCA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgZnVuY3Rpb24odGlkKXtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpZClcbiAgICAgICAgICAgICAgICAgfVxuICBcbiAgcmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICB2YXIgaWQgPSByZXF1ZXN0KGNhbGxiYWNrKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKXsgY2FuY2VsKGlkKTsgfVxuICB9XG59KSgpO1xuXG4vLyAza3MgZm9yIGFuZ3VsYXIncyByYWYgIHNlcnZpY2VcbnZhciBrO1xuZG9tLm5leHRSZWZsb3cgPSBmdW5jdGlvbihjYWxsYmFjayl7XG4gIGRvbS5uZXh0RnJhbWUoZnVuY3Rpb24oKXtcbiAgICBrID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aDtcbiAgICBjYWxsYmFjaygpO1xuICB9KVxufVxuXG5cblxuIiwiLy8gc29tZSBmaXh0dXJlIHRlc3Q7XG4vLyAtLS0tLS0tLS0tLS0tLS1cbnZhciBfID0gcmVxdWlyZSgnLi91dGlsJyk7XG5leHBvcnRzLnN2ZyA9IChmdW5jdGlvbigpe1xuICByZXR1cm4gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoIFwiaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNCYXNpY1N0cnVjdHVyZVwiLCBcIjEuMVwiICk7XG59KSgpO1xuXG5cbmV4cG9ydHMuYnJvd3NlciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudC5ub2RlVHlwZTtcbi8vIHdoZXRoZXIgaGF2ZSBjb21wb25lbnQgaW4gaW5pdGlhbGl6aW5nXG5leHBvcnRzLmV4cHJDYWNoZSA9IF8uY2FjaGUoMTAwMCk7XG5leHBvcnRzLmlzUnVubmluZyA9IGZhbHNlO1xuIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBjb21iaW5lID0gcmVxdWlyZSgnLi9oZWxwZXIvY29tYmluZScpXG5cbmZ1bmN0aW9uIEdyb3VwKGxpc3Qpe1xuICB0aGlzLmNoaWxkcmVuID0gbGlzdCB8fCBbXTtcbn1cblxuXG5fLmV4dGVuZChHcm91cC5wcm90b3R5cGUsIHtcbiAgZGVzdHJveTogZnVuY3Rpb24oZmlyc3Qpe1xuICAgIGNvbWJpbmUuZGVzdHJveSh0aGlzLmNoaWxkcmVuLCBmaXJzdCk7XG4gICAgaWYodGhpcy5vbmRlc3Ryb3kpIHRoaXMub25kZXN0cm95KCk7XG4gICAgdGhpcy5jaGlsZHJlbiA9IG51bGw7XG4gIH0sXG4gIGdldDogZnVuY3Rpb24oaSl7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baV1cbiAgfSxcbiAgcHVzaDogZnVuY3Rpb24oaXRlbSl7XG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKCBpdGVtICk7XG4gIH1cblxufSlcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gR3JvdXA7XG5cblxuIiwidmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbnZhciBkb20gID0gcmVxdWlyZShcIi4uL2RvbS5qc1wiKTtcbnZhciBhbmltYXRlID0ge307XG52YXIgZW52ID0gcmVxdWlyZShcIi4uL2Vudi5qc1wiKTtcblxuXG52YXIgXG4gIHRyYW5zaXRpb25FbmQgPSAndHJhbnNpdGlvbmVuZCcsIFxuICBhbmltYXRpb25FbmQgPSAnYW5pbWF0aW9uZW5kJywgXG4gIHRyYW5zaXRpb25Qcm9wZXJ0eSA9ICd0cmFuc2l0aW9uJywgXG4gIGFuaW1hdGlvblByb3BlcnR5ID0gJ2FuaW1hdGlvbic7XG5cbmlmKCEoJ29udHJhbnNpdGlvbmVuZCcgaW4gd2luZG93KSl7XG4gIGlmKCdvbndlYmtpdHRyYW5zaXRpb25lbmQnIGluIHdpbmRvdykge1xuICAgIFxuICAgIC8vIENocm9tZS9TYWYgKCsgTW9iaWxlIFNhZikvQW5kcm9pZFxuICAgIHRyYW5zaXRpb25FbmQgKz0gJyB3ZWJraXRUcmFuc2l0aW9uRW5kJztcbiAgICB0cmFuc2l0aW9uUHJvcGVydHkgPSAnd2Via2l0VHJhbnNpdGlvbidcbiAgfSBlbHNlIGlmKCdvbm90cmFuc2l0aW9uZW5kJyBpbiBkb20udE5vZGUgfHwgbmF2aWdhdG9yLmFwcE5hbWUgPT09ICdPcGVyYScpIHtcblxuICAgIC8vIE9wZXJhXG4gICAgdHJhbnNpdGlvbkVuZCArPSAnIG9UcmFuc2l0aW9uRW5kJztcbiAgICB0cmFuc2l0aW9uUHJvcGVydHkgPSAnb1RyYW5zaXRpb24nO1xuICB9XG59XG5pZighKCdvbmFuaW1hdGlvbmVuZCcgaW4gd2luZG93KSl7XG4gIGlmICgnb253ZWJraXRhbmltYXRpb25lbmQnIGluIHdpbmRvdyl7XG4gICAgLy8gQ2hyb21lL1NhZiAoKyBNb2JpbGUgU2FmKS9BbmRyb2lkXG4gICAgYW5pbWF0aW9uRW5kICs9ICcgd2Via2l0QW5pbWF0aW9uRW5kJztcbiAgICBhbmltYXRpb25Qcm9wZXJ0eSA9ICd3ZWJraXRBbmltYXRpb24nO1xuXG4gIH1lbHNlIGlmICgnb25vYW5pbWF0aW9uZW5kJyBpbiBkb20udE5vZGUpe1xuICAgIC8vIE9wZXJhXG4gICAgYW5pbWF0aW9uRW5kICs9ICcgb0FuaW1hdGlvbkVuZCc7XG4gICAgYW5pbWF0aW9uUHJvcGVydHkgPSAnb0FuaW1hdGlvbic7XG4gIH1cbn1cblxuLyoqXG4gKiBpbmplY3Qgbm9kZSB3aXRoIGFuaW1hdGlvblxuICogQHBhcmFtICB7W3R5cGVdfSBub2RlICAgICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSByZWZlciAgICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBkaXJlY3Rpb24gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5hbmltYXRlLmluamVjdCA9IGZ1bmN0aW9uKCBub2RlLCByZWZlciAsZGlyZWN0aW9uLCBjYWxsYmFjayApe1xuICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IF8ubm9vcDtcbiAgaWYoIEFycmF5LmlzQXJyYXkobm9kZSkgKXtcbiAgICB2YXIgZnJhZ21lbnQgPSBkb20uZnJhZ21lbnQoKTtcbiAgICB2YXIgY291bnQ9MDtcblxuICAgIGZvcih2YXIgaSA9IDAsbGVuID0gbm9kZS5sZW5ndGg7aSA8IGxlbjsgaSsrICl7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChub2RlW2ldKTsgXG4gICAgfVxuICAgIGRvbS5pbmplY3QoZnJhZ21lbnQsIHJlZmVyLCBkaXJlY3Rpb24pO1xuXG4gICAgLy8gaWYgYWxsIG5vZGVzIGlzIGRvbmUsIHdlIGNhbGwgdGhlIGNhbGxiYWNrXG4gICAgdmFyIGVudGVyQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKXtcbiAgICAgIGNvdW50Kys7XG4gICAgICBpZiggY291bnQgPT09IGxlbiApIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIGlmKGxlbiA9PT0gY291bnQpIGNhbGxiYWNrKCk7XG4gICAgZm9yKCBpID0gMDsgaSA8IGxlbjsgaSsrICl7XG4gICAgICBpZihub2RlW2ldLm9uZW50ZXIpe1xuICAgICAgICBub2RlW2ldLm9uZW50ZXIoZW50ZXJDYWxsYmFjayk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZW50ZXJDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfWVsc2V7XG4gICAgZG9tLmluamVjdCggbm9kZSwgcmVmZXIsIGRpcmVjdGlvbiApO1xuICAgIGlmKG5vZGUub25lbnRlcil7XG4gICAgICBub2RlLm9uZW50ZXIoY2FsbGJhY2spXG4gICAgfWVsc2V7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIHJlbW92ZSBub2RlIHdpdGggYW5pbWF0aW9uXG4gKiBAcGFyYW0gIHtbdHlwZV19ICAgbm9kZSAgICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmFuaW1hdGUucmVtb3ZlID0gZnVuY3Rpb24obm9kZSwgY2FsbGJhY2spe1xuICBpZihub2RlLm9ubGVhdmUpe1xuICAgIG5vZGUub25sZWF2ZShmdW5jdGlvbigpe1xuICAgICAgcmVtb3ZlRG9uZShub2RlLCBjYWxsYmFjaylcbiAgICB9KVxuICB9ZWxzZXtcbiAgICByZW1vdmVEb25lKG5vZGUsIGNhbGxiYWNrKVxuICB9XG59XG5cbnZhciByZW1vdmVEb25lID0gZnVuY3Rpb24gKG5vZGUsIGNhbGxiYWNrKXtcbiAgICBkb20ucmVtb3ZlKG5vZGUpO1xuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG59XG5cblxuXG5hbmltYXRlLnN0YXJ0Q2xhc3NBbmltYXRlID0gZnVuY3Rpb24gKCBub2RlLCBjbGFzc05hbWUsICBjYWxsYmFjaywgbW9kZSApe1xuICB2YXIgYWN0aXZlQ2xhc3NOYW1lLCB0aW1lb3V0LCB0aWQsIG9uY2VBbmltO1xuICBpZiggKCFhbmltYXRpb25FbmQgJiYgIXRyYW5zaXRpb25FbmQpIHx8IGVudi5pc1J1bm5pbmcgKXtcbiAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgfVxuXG4gIG9uY2VBbmltID0gXy5vbmNlKGZ1bmN0aW9uIG9uQW5pbWF0ZUVuZCgpe1xuICAgIGlmKHRpZCkgY2xlYXJUaW1lb3V0KHRpZCk7XG5cbiAgICBpZihtb2RlID09PSAyKSB7XG4gICAgICBkb20uZGVsQ2xhc3Mobm9kZSwgYWN0aXZlQ2xhc3NOYW1lKTtcbiAgICB9XG4gICAgaWYobW9kZSAhPT0gMyl7IC8vIG1vZGUgaG9sZCB0aGUgY2xhc3NcbiAgICAgIGRvbS5kZWxDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgICBkb20ub2ZmKG5vZGUsIGFuaW1hdGlvbkVuZCwgb25jZUFuaW0pXG4gICAgZG9tLm9mZihub2RlLCB0cmFuc2l0aW9uRW5kLCBvbmNlQW5pbSlcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSk7XG4gIGlmKG1vZGUgPT09IDIpeyAvLyBhdXRvIHJlbW92ZWRcbiAgICBkb20uYWRkQ2xhc3MoIG5vZGUsIGNsYXNzTmFtZSApO1xuXG4gICAgYWN0aXZlQ2xhc3NOYW1lID0gY2xhc3NOYW1lLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgIHJldHVybiBuYW1lICsgJy1hY3RpdmUnO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xuXG4gICAgZG9tLm5leHRSZWZsb3coZnVuY3Rpb24oKXtcbiAgICAgIGRvbS5hZGRDbGFzcyggbm9kZSwgYWN0aXZlQ2xhc3NOYW1lICk7XG4gICAgICB0aW1lb3V0ID0gZ2V0TWF4VGltZW91dCggbm9kZSApO1xuICAgICAgdGlkID0gc2V0VGltZW91dCggb25jZUFuaW0sIHRpbWVvdXQgKTtcbiAgICB9KTtcblxuICB9ZWxzZXtcblxuICAgIGRvbS5uZXh0UmVmbG93KGZ1bmN0aW9uKCl7XG4gICAgICBkb20uYWRkQ2xhc3MoIG5vZGUsIGNsYXNzTmFtZSApO1xuICAgICAgdGltZW91dCA9IGdldE1heFRpbWVvdXQoIG5vZGUgKTtcbiAgICAgIHRpZCA9IHNldFRpbWVvdXQoIG9uY2VBbmltLCB0aW1lb3V0ICk7XG4gICAgfSk7XG5cbiAgfVxuXG5cbiAgZG9tLm9uKCBub2RlLCBhbmltYXRpb25FbmQsIG9uY2VBbmltIClcbiAgZG9tLm9uKCBub2RlLCB0cmFuc2l0aW9uRW5kLCBvbmNlQW5pbSApXG4gIHJldHVybiBvbmNlQW5pbTtcbn1cblxuXG5hbmltYXRlLnN0YXJ0U3R5bGVBbmltYXRlID0gZnVuY3Rpb24obm9kZSwgc3R5bGVzLCBjYWxsYmFjayl7XG4gIHZhciB0aW1lb3V0LCBvbmNlQW5pbSwgdGlkO1xuXG4gIGRvbS5uZXh0UmVmbG93KGZ1bmN0aW9uKCl7XG4gICAgZG9tLmNzcyggbm9kZSwgc3R5bGVzICk7XG4gICAgdGltZW91dCA9IGdldE1heFRpbWVvdXQoIG5vZGUgKTtcbiAgICB0aWQgPSBzZXRUaW1lb3V0KCBvbmNlQW5pbSwgdGltZW91dCApO1xuICB9KTtcblxuXG4gIG9uY2VBbmltID0gXy5vbmNlKGZ1bmN0aW9uIG9uQW5pbWF0ZUVuZCgpe1xuICAgIGlmKHRpZCkgY2xlYXJUaW1lb3V0KHRpZCk7XG5cbiAgICBkb20ub2ZmKG5vZGUsIGFuaW1hdGlvbkVuZCwgb25jZUFuaW0pXG4gICAgZG9tLm9mZihub2RlLCB0cmFuc2l0aW9uRW5kLCBvbmNlQW5pbSlcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSk7XG5cbiAgZG9tLm9uKCBub2RlLCBhbmltYXRpb25FbmQsIG9uY2VBbmltIClcbiAgZG9tLm9uKCBub2RlLCB0cmFuc2l0aW9uRW5kLCBvbmNlQW5pbSApXG5cbiAgcmV0dXJuIG9uY2VBbmltO1xufVxuXG5cbi8qKlxuICogZ2V0IG1heHRpbWVvdXRcbiAqIEBwYXJhbSAge05vZGV9IG5vZGUgXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBnZXRNYXhUaW1lb3V0KG5vZGUpe1xuICB2YXIgdGltZW91dCA9IDAsXG4gICAgdER1cmF0aW9uID0gMCxcbiAgICB0RGVsYXkgPSAwLFxuICAgIGFEdXJhdGlvbiA9IDAsXG4gICAgYURlbGF5ID0gMCxcbiAgICByYXRpbyA9IDUgLyAzLFxuICAgIHN0eWxlcyA7XG5cbiAgaWYod2luZG93LmdldENvbXB1dGVkU3R5bGUpe1xuXG4gICAgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSksXG4gICAgdER1cmF0aW9uID0gZ2V0TWF4VGltZSggc3R5bGVzW3RyYW5zaXRpb25Qcm9wZXJ0eSArICdEdXJhdGlvbiddKSB8fCB0RHVyYXRpb247XG4gICAgdERlbGF5ID0gZ2V0TWF4VGltZSggc3R5bGVzW3RyYW5zaXRpb25Qcm9wZXJ0eSArICdEZWxheSddKSB8fCB0RGVsYXk7XG4gICAgYUR1cmF0aW9uID0gZ2V0TWF4VGltZSggc3R5bGVzW2FuaW1hdGlvblByb3BlcnR5ICsgJ0R1cmF0aW9uJ10pIHx8IGFEdXJhdGlvbjtcbiAgICBhRGVsYXkgPSBnZXRNYXhUaW1lKCBzdHlsZXNbYW5pbWF0aW9uUHJvcGVydHkgKyAnRGVsYXknXSkgfHwgYURlbGF5O1xuICAgIHRpbWVvdXQgPSBNYXRoLm1heCggdER1cmF0aW9uK3REZWxheSwgYUR1cmF0aW9uICsgYURlbGF5ICk7XG5cbiAgfVxuICByZXR1cm4gdGltZW91dCAqIDEwMDAgKiByYXRpbztcbn1cblxuZnVuY3Rpb24gZ2V0TWF4VGltZShzdHIpe1xuXG4gIHZhciBtYXhUaW1lb3V0ID0gMCwgdGltZTtcblxuICBpZighc3RyKSByZXR1cm4gMDtcblxuICBzdHIuc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24oc3RyKXtcblxuICAgIHRpbWUgPSBwYXJzZUZsb2F0KHN0cik7XG4gICAgaWYoIHRpbWUgPiBtYXhUaW1lb3V0ICkgbWF4VGltZW91dCA9IHRpbWU7XG5cbiAgfSk7XG5cbiAgcmV0dXJuIG1heFRpbWVvdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYW5pbWF0ZTsiLCIvLyBzb21lIG5lc3RlZCAgb3BlcmF0aW9uIGluIGFzdCBcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpO1xuXG52YXIgY29tYmluZSA9IG1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8vIGdldCB0aGUgaW5pdGlhbCBkb20gaW4gb2JqZWN0XG4gIG5vZGU6IGZ1bmN0aW9uKGl0ZW0pe1xuICAgIHZhciBjaGlsZHJlbixub2RlO1xuICAgIGlmKGl0ZW0uZWxlbWVudCkgcmV0dXJuIGl0ZW0uZWxlbWVudDtcbiAgICBpZih0eXBlb2YgaXRlbS5ub2RlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBpdGVtLm5vZGUoKTtcbiAgICBpZih0eXBlb2YgaXRlbS5ub2RlVHlwZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGl0ZW07XG4gICAgaWYoaXRlbS5ncm91cCkgcmV0dXJuIGNvbWJpbmUubm9kZShpdGVtLmdyb3VwKVxuICAgIGlmKGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbil7XG4gICAgICBpZihjaGlsZHJlbi5sZW5ndGggPT09IDEpe1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbWJpbmUubm9kZShjaGlsZHJlblswXSk7XG4gICAgICB9XG4gICAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrICl7XG4gICAgICAgIG5vZGUgPSBjb21iaW5lLm5vZGUoY2hpbGRyZW5baV0pO1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KG5vZGUpKXtcbiAgICAgICAgICBub2Rlcy5wdXNoLmFwcGx5KG5vZGVzLCBub2RlKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBub2Rlcy5wdXNoKG5vZGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG4gIH0sXG5cbiAgLy8gZ2V0IHRoZSBsYXN0IGRvbSBpbiBvYmplY3QoZm9yIGluc2VydGlvbiBvcGVyYXRpb24pXG4gIGxhc3Q6IGZ1bmN0aW9uKGl0ZW0pe1xuICAgIHZhciBjaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW47XG5cbiAgICBpZih0eXBlb2YgaXRlbS5sYXN0ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBpdGVtLmxhc3QoKTtcbiAgICBpZih0eXBlb2YgaXRlbS5ub2RlVHlwZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGl0ZW07XG5cbiAgICBpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHJldHVybiBjb21iaW5lLmxhc3QoY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV0pO1xuICAgIGlmKGl0ZW0uZ3JvdXApIHJldHVybiBjb21iaW5lLmxhc3QoaXRlbS5ncm91cCk7XG5cbiAgfSxcblxuICBkZXN0cm95OiBmdW5jdGlvbihpdGVtLCBmaXJzdCl7XG4gICAgaWYoIWl0ZW0pIHJldHVybjtcbiAgICBpZihBcnJheS5pc0FycmF5KGl0ZW0pKXtcbiAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGl0ZW0ubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcbiAgICAgICAgY29tYmluZS5kZXN0cm95KGl0ZW1baV0sIGZpcnN0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbjtcbiAgICBpZih0eXBlb2YgaXRlbS5kZXN0cm95ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBpdGVtLmRlc3Ryb3koZmlyc3QpO1xuICAgIGlmKHR5cGVvZiBpdGVtLm5vZGVUeXBlID09PSBcIm51bWJlclwiICYmIGZpcnN0KSAgZG9tLnJlbW92ZShpdGVtKTtcbiAgICBpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xuICAgICAgY29tYmluZS5kZXN0cm95KGNoaWxkcmVuLCB0cnVlKTtcbiAgICAgIGl0ZW0uY2hpbGRyZW4gPSBudWxsO1xuICAgIH1cbiAgfVxuXG59IiwiLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMzU0MDY0L2hvdy10by1jb252ZXJ0LWNoYXJhY3RlcnMtdG8taHRtbC1lbnRpdGllcy11c2luZy1wbGFpbi1qYXZhc2NyaXB0XG52YXIgZW50aXRpZXMgPSB7XG4gICdxdW90JzozNCwgXG4gICdhbXAnOjM4LCBcbiAgJ2Fwb3MnOjM5LCBcbiAgJ2x0Jzo2MCwgXG4gICdndCc6NjIsIFxuICAnbmJzcCc6MTYwLCBcbiAgJ2lleGNsJzoxNjEsIFxuICAnY2VudCc6MTYyLCBcbiAgJ3BvdW5kJzoxNjMsIFxuICAnY3VycmVuJzoxNjQsIFxuICAneWVuJzoxNjUsIFxuICAnYnJ2YmFyJzoxNjYsIFxuICAnc2VjdCc6MTY3LCBcbiAgJ3VtbCc6MTY4LCBcbiAgJ2NvcHknOjE2OSwgXG4gICdvcmRmJzoxNzAsIFxuICAnbGFxdW8nOjE3MSwgXG4gICdub3QnOjE3MiwgXG4gICdzaHknOjE3MywgXG4gICdyZWcnOjE3NCwgXG4gICdtYWNyJzoxNzUsIFxuICAnZGVnJzoxNzYsIFxuICAncGx1c21uJzoxNzcsIFxuICAnc3VwMic6MTc4LCBcbiAgJ3N1cDMnOjE3OSwgXG4gICdhY3V0ZSc6MTgwLCBcbiAgJ21pY3JvJzoxODEsIFxuICAncGFyYSc6MTgyLCBcbiAgJ21pZGRvdCc6MTgzLCBcbiAgJ2NlZGlsJzoxODQsIFxuICAnc3VwMSc6MTg1LCBcbiAgJ29yZG0nOjE4NiwgXG4gICdyYXF1byc6MTg3LCBcbiAgJ2ZyYWMxNCc6MTg4LCBcbiAgJ2ZyYWMxMic6MTg5LCBcbiAgJ2ZyYWMzNCc6MTkwLCBcbiAgJ2lxdWVzdCc6MTkxLCBcbiAgJ0FncmF2ZSc6MTkyLCBcbiAgJ0FhY3V0ZSc6MTkzLCBcbiAgJ0FjaXJjJzoxOTQsIFxuICAnQXRpbGRlJzoxOTUsIFxuICAnQXVtbCc6MTk2LCBcbiAgJ0FyaW5nJzoxOTcsIFxuICAnQUVsaWcnOjE5OCwgXG4gICdDY2VkaWwnOjE5OSwgXG4gICdFZ3JhdmUnOjIwMCwgXG4gICdFYWN1dGUnOjIwMSwgXG4gICdFY2lyYyc6MjAyLCBcbiAgJ0V1bWwnOjIwMywgXG4gICdJZ3JhdmUnOjIwNCwgXG4gICdJYWN1dGUnOjIwNSwgXG4gICdJY2lyYyc6MjA2LCBcbiAgJ0l1bWwnOjIwNywgXG4gICdFVEgnOjIwOCwgXG4gICdOdGlsZGUnOjIwOSwgXG4gICdPZ3JhdmUnOjIxMCwgXG4gICdPYWN1dGUnOjIxMSwgXG4gICdPY2lyYyc6MjEyLCBcbiAgJ090aWxkZSc6MjEzLCBcbiAgJ091bWwnOjIxNCwgXG4gICd0aW1lcyc6MjE1LCBcbiAgJ09zbGFzaCc6MjE2LCBcbiAgJ1VncmF2ZSc6MjE3LCBcbiAgJ1VhY3V0ZSc6MjE4LCBcbiAgJ1VjaXJjJzoyMTksIFxuICAnVXVtbCc6MjIwLCBcbiAgJ1lhY3V0ZSc6MjIxLCBcbiAgJ1RIT1JOJzoyMjIsIFxuICAnc3psaWcnOjIyMywgXG4gICdhZ3JhdmUnOjIyNCwgXG4gICdhYWN1dGUnOjIyNSwgXG4gICdhY2lyYyc6MjI2LCBcbiAgJ2F0aWxkZSc6MjI3LCBcbiAgJ2F1bWwnOjIyOCwgXG4gICdhcmluZyc6MjI5LCBcbiAgJ2FlbGlnJzoyMzAsIFxuICAnY2NlZGlsJzoyMzEsIFxuICAnZWdyYXZlJzoyMzIsIFxuICAnZWFjdXRlJzoyMzMsIFxuICAnZWNpcmMnOjIzNCwgXG4gICdldW1sJzoyMzUsIFxuICAnaWdyYXZlJzoyMzYsIFxuICAnaWFjdXRlJzoyMzcsIFxuICAnaWNpcmMnOjIzOCwgXG4gICdpdW1sJzoyMzksIFxuICAnZXRoJzoyNDAsIFxuICAnbnRpbGRlJzoyNDEsIFxuICAnb2dyYXZlJzoyNDIsIFxuICAnb2FjdXRlJzoyNDMsIFxuICAnb2NpcmMnOjI0NCwgXG4gICdvdGlsZGUnOjI0NSwgXG4gICdvdW1sJzoyNDYsIFxuICAnZGl2aWRlJzoyNDcsIFxuICAnb3NsYXNoJzoyNDgsIFxuICAndWdyYXZlJzoyNDksIFxuICAndWFjdXRlJzoyNTAsIFxuICAndWNpcmMnOjI1MSwgXG4gICd1dW1sJzoyNTIsIFxuICAneWFjdXRlJzoyNTMsIFxuICAndGhvcm4nOjI1NCwgXG4gICd5dW1sJzoyNTUsIFxuICAnZm5vZic6NDAyLCBcbiAgJ0FscGhhJzo5MTMsIFxuICAnQmV0YSc6OTE0LCBcbiAgJ0dhbW1hJzo5MTUsIFxuICAnRGVsdGEnOjkxNiwgXG4gICdFcHNpbG9uJzo5MTcsIFxuICAnWmV0YSc6OTE4LCBcbiAgJ0V0YSc6OTE5LCBcbiAgJ1RoZXRhJzo5MjAsIFxuICAnSW90YSc6OTIxLCBcbiAgJ0thcHBhJzo5MjIsIFxuICAnTGFtYmRhJzo5MjMsIFxuICAnTXUnOjkyNCwgXG4gICdOdSc6OTI1LCBcbiAgJ1hpJzo5MjYsIFxuICAnT21pY3Jvbic6OTI3LCBcbiAgJ1BpJzo5MjgsIFxuICAnUmhvJzo5MjksIFxuICAnU2lnbWEnOjkzMSwgXG4gICdUYXUnOjkzMiwgXG4gICdVcHNpbG9uJzo5MzMsIFxuICAnUGhpJzo5MzQsIFxuICAnQ2hpJzo5MzUsIFxuICAnUHNpJzo5MzYsIFxuICAnT21lZ2EnOjkzNywgXG4gICdhbHBoYSc6OTQ1LCBcbiAgJ2JldGEnOjk0NiwgXG4gICdnYW1tYSc6OTQ3LCBcbiAgJ2RlbHRhJzo5NDgsIFxuICAnZXBzaWxvbic6OTQ5LCBcbiAgJ3pldGEnOjk1MCwgXG4gICdldGEnOjk1MSwgXG4gICd0aGV0YSc6OTUyLCBcbiAgJ2lvdGEnOjk1MywgXG4gICdrYXBwYSc6OTU0LCBcbiAgJ2xhbWJkYSc6OTU1LCBcbiAgJ211Jzo5NTYsIFxuICAnbnUnOjk1NywgXG4gICd4aSc6OTU4LCBcbiAgJ29taWNyb24nOjk1OSwgXG4gICdwaSc6OTYwLCBcbiAgJ3Jobyc6OTYxLCBcbiAgJ3NpZ21hZic6OTYyLCBcbiAgJ3NpZ21hJzo5NjMsIFxuICAndGF1Jzo5NjQsIFxuICAndXBzaWxvbic6OTY1LCBcbiAgJ3BoaSc6OTY2LCBcbiAgJ2NoaSc6OTY3LCBcbiAgJ3BzaSc6OTY4LCBcbiAgJ29tZWdhJzo5NjksIFxuICAndGhldGFzeW0nOjk3NywgXG4gICd1cHNpaCc6OTc4LCBcbiAgJ3Bpdic6OTgyLCBcbiAgJ2J1bGwnOjgyMjYsIFxuICAnaGVsbGlwJzo4MjMwLCBcbiAgJ3ByaW1lJzo4MjQyLCBcbiAgJ1ByaW1lJzo4MjQzLCBcbiAgJ29saW5lJzo4MjU0LCBcbiAgJ2ZyYXNsJzo4MjYwLCBcbiAgJ3dlaWVycCc6ODQ3MiwgXG4gICdpbWFnZSc6ODQ2NSwgXG4gICdyZWFsJzo4NDc2LCBcbiAgJ3RyYWRlJzo4NDgyLCBcbiAgJ2FsZWZzeW0nOjg1MDEsIFxuICAnbGFycic6ODU5MiwgXG4gICd1YXJyJzo4NTkzLCBcbiAgJ3JhcnInOjg1OTQsIFxuICAnZGFycic6ODU5NSwgXG4gICdoYXJyJzo4NTk2LCBcbiAgJ2NyYXJyJzo4NjI5LCBcbiAgJ2xBcnInOjg2NTYsIFxuICAndUFycic6ODY1NywgXG4gICdyQXJyJzo4NjU4LCBcbiAgJ2RBcnInOjg2NTksIFxuICAnaEFycic6ODY2MCwgXG4gICdmb3JhbGwnOjg3MDQsIFxuICAncGFydCc6ODcwNiwgXG4gICdleGlzdCc6ODcwNywgXG4gICdlbXB0eSc6ODcwOSwgXG4gICduYWJsYSc6ODcxMSwgXG4gICdpc2luJzo4NzEyLCBcbiAgJ25vdGluJzo4NzEzLCBcbiAgJ25pJzo4NzE1LCBcbiAgJ3Byb2QnOjg3MTksIFxuICAnc3VtJzo4NzIxLCBcbiAgJ21pbnVzJzo4NzIyLCBcbiAgJ2xvd2FzdCc6ODcyNywgXG4gICdyYWRpYyc6ODczMCwgXG4gICdwcm9wJzo4NzMzLCBcbiAgJ2luZmluJzo4NzM0LCBcbiAgJ2FuZyc6ODczNiwgXG4gICdhbmQnOjg3NDMsIFxuICAnb3InOjg3NDQsIFxuICAnY2FwJzo4NzQ1LCBcbiAgJ2N1cCc6ODc0NiwgXG4gICdpbnQnOjg3NDcsIFxuICAndGhlcmU0Jzo4NzU2LCBcbiAgJ3NpbSc6ODc2NCwgXG4gICdjb25nJzo4NzczLCBcbiAgJ2FzeW1wJzo4Nzc2LCBcbiAgJ25lJzo4ODAwLCBcbiAgJ2VxdWl2Jzo4ODAxLCBcbiAgJ2xlJzo4ODA0LCBcbiAgJ2dlJzo4ODA1LCBcbiAgJ3N1Yic6ODgzNCwgXG4gICdzdXAnOjg4MzUsIFxuICAnbnN1Yic6ODgzNiwgXG4gICdzdWJlJzo4ODM4LCBcbiAgJ3N1cGUnOjg4MzksIFxuICAnb3BsdXMnOjg4NTMsIFxuICAnb3RpbWVzJzo4ODU1LCBcbiAgJ3BlcnAnOjg4NjksIFxuICAnc2RvdCc6ODkwMSwgXG4gICdsY2VpbCc6ODk2OCwgXG4gICdyY2VpbCc6ODk2OSwgXG4gICdsZmxvb3InOjg5NzAsIFxuICAncmZsb29yJzo4OTcxLCBcbiAgJ2xhbmcnOjkwMDEsIFxuICAncmFuZyc6OTAwMiwgXG4gICdsb3onOjk2NzQsIFxuICAnc3BhZGVzJzo5ODI0LCBcbiAgJ2NsdWJzJzo5ODI3LCBcbiAgJ2hlYXJ0cyc6OTgyOSwgXG4gICdkaWFtcyc6OTgzMCwgXG4gICdPRWxpZyc6MzM4LCBcbiAgJ29lbGlnJzozMzksIFxuICAnU2Nhcm9uJzozNTIsIFxuICAnc2Nhcm9uJzozNTMsIFxuICAnWXVtbCc6Mzc2LCBcbiAgJ2NpcmMnOjcxMCwgXG4gICd0aWxkZSc6NzMyLCBcbiAgJ2Vuc3AnOjgxOTQsIFxuICAnZW1zcCc6ODE5NSwgXG4gICd0aGluc3AnOjgyMDEsIFxuICAnenduaic6ODIwNCwgXG4gICd6d2onOjgyMDUsIFxuICAnbHJtJzo4MjA2LCBcbiAgJ3JsbSc6ODIwNywgXG4gICduZGFzaCc6ODIxMSwgXG4gICdtZGFzaCc6ODIxMiwgXG4gICdsc3F1byc6ODIxNiwgXG4gICdyc3F1byc6ODIxNywgXG4gICdzYnF1byc6ODIxOCwgXG4gICdsZHF1byc6ODIyMCwgXG4gICdyZHF1byc6ODIyMSwgXG4gICdiZHF1byc6ODIyMiwgXG4gICdkYWdnZXInOjgyMjQsIFxuICAnRGFnZ2VyJzo4MjI1LCBcbiAgJ3Blcm1pbCc6ODI0MCwgXG4gICdsc2FxdW8nOjgyNDksIFxuICAncnNhcXVvJzo4MjUwLCBcbiAgJ2V1cm8nOjgzNjRcbn1cblxuXG5cbm1vZHVsZS5leHBvcnRzICA9IGVudGl0aWVzOyIsIi8vIHNpbXBsZXN0IGV2ZW50IGVtaXR0ZXIgNjAgbGluZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnZhciBzbGljZSA9IFtdLnNsaWNlLCBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIik7XG52YXIgQVBJID0ge1xuICAgICRvbjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmKHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kb24oaSwgZXZlbnRbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIEBwYXRjaDogZm9yIGxpc3RcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIHZhciBoYW5kbGVzID0gY29udGV4dC5faGFuZGxlcyB8fCAoY29udGV4dC5faGFuZGxlcyA9IHt9KSxcbiAgICAgICAgICAgICAgICBjYWxscyA9IGhhbmRsZXNbZXZlbnRdIHx8IChoYW5kbGVzW2V2ZW50XSA9IFtdKTtcbiAgICAgICAgICAgIGNhbGxzLnB1c2goZm4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgJG9mZjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgaWYoIWNvbnRleHQuX2hhbmRsZXMpIHJldHVybjtcbiAgICAgICAgaWYoIWV2ZW50KSB0aGlzLl9oYW5kbGVzID0ge307XG4gICAgICAgIHZhciBoYW5kbGVzID0gY29udGV4dC5faGFuZGxlcyxcbiAgICAgICAgICAgIGNhbGxzO1xuXG4gICAgICAgIGlmIChjYWxscyA9IGhhbmRsZXNbZXZlbnRdKSB7XG4gICAgICAgICAgICBpZiAoIWZuKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlc1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChmbiA9PT0gY2FsbHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfSxcbiAgICAvLyBidWJibGUgZXZlbnRcbiAgICAkZW1pdDogZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAvLyBAcGF0Y2g6IGZvciBsaXN0XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgdmFyIGhhbmRsZXMgPSBjb250ZXh0Ll9oYW5kbGVzLCBjYWxscywgYXJncywgdHlwZTtcbiAgICAgICAgaWYoIWV2ZW50KSByZXR1cm47XG4gICAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICB2YXIgdHlwZSA9IGV2ZW50O1xuXG4gICAgICAgIGlmKCFoYW5kbGVzKSByZXR1cm4gY29udGV4dDtcbiAgICAgICAgaWYoY2FsbHMgPSBoYW5kbGVzW3R5cGUuc2xpY2UoMSldKXtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBsZW4gPSBjYWxscy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICAgIGNhbGxzW2pdLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoY2FsbHMgPSBoYW5kbGVzW3R5cGVdKSkgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2FsbHNbaV0uYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgICAgfVxuICAgICAgICAvLyBpZihjYWxscy5sZW5ndGgpIGNvbnRleHQuJHVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9LFxuICAgIC8vIGNhcHR1cmUgIGV2ZW50XG4gICAgJGJyb2FkY2FzdDogZnVuY3Rpb24oKXtcbiAgICAgICAgXG4gICAgfVxufVxuLy8gY29udGFpbmVyIGNsYXNzXG5mdW5jdGlvbiBFdmVudCgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHRoaXMuJG9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5fLmV4dGVuZChFdmVudC5wcm90b3R5cGUsIEFQSSlcblxuRXZlbnQubWl4VG8gPSBmdW5jdGlvbihvYmope1xuICBvYmogPSB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgPyBvYmoucHJvdG90eXBlIDogb2JqO1xuICBfLmV4dGVuZChvYmosIEFQSSlcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnQ7IiwiLy8gKGMpIDIwMTAtMjAxNCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gQmFja2JvbmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4vLyBGb3IgYWxsIGRldGFpbHMgYW5kIGRvY3VtZW50YXRpb246XG4vLyBodHRwOi8vYmFja2JvbmVqcy5vcmdcblxuLy8ga2xhc3M6IGEgY2xhc3NpY2FsIEpTIE9PUCBmYcOnYWRlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGVkL2tsYXNzXG4vLyBMaWNlbnNlIE1JVCAoYykgRHVzdGluIERpYXogMjAxNFxuICBcbi8vIGluc3BpcmVkIGJ5IGJhY2tib25lJ3MgZXh0ZW5kIGFuZCBrbGFzc1xudmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKSxcbiAgZm5UZXN0ID0gL3h5Ly50ZXN0KGZ1bmN0aW9uKCl7XCJ4eVwiO30pID8gL1xcYnN1cHJcXGIvOi8uKi8sXG4gIGlzRm4gPSBmdW5jdGlvbihvKXtyZXR1cm4gdHlwZW9mIG8gPT09IFwiZnVuY3Rpb25cIn07XG5cblxuZnVuY3Rpb24gd3JhcChrLCBmbiwgc3Vwcm8pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG1wID0gdGhpcy5zdXByO1xuICAgIHRoaXMuc3VwciA9IHN1cHJvW2tdO1xuICAgIHZhciByZXQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuc3VwciA9IHRtcDtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3MoIHdoYXQsIG8sIHN1cHJvICkge1xuICBmb3IgKCB2YXIgayBpbiBvICkge1xuICAgIGlmIChvLmhhc093blByb3BlcnR5KGspKSB7XG5cbiAgICAgIHdoYXRba10gPSBpc0ZuKCBvW2tdICkgJiYgaXNGbiggc3Vwcm9ba10gKSAmJiBcbiAgICAgICAgZm5UZXN0LnRlc3QoIG9ba10gKSA/IHdyYXAoaywgb1trXSwgc3Vwcm8pIDogb1trXTtcbiAgICB9XG4gIH1cbn1cblxuLy8gaWYgdGhlIHByb3BlcnR5IGlzIFtcImV2ZW50c1wiLCBcImRhdGFcIiwgXCJjb21wdXRlZFwiXSAsIHdlIHNob3VsZCBtZXJnZSB0aGVtXG52YXIgbWVyZ2VkID0gW1wiZXZlbnRzXCIsIFwiZGF0YVwiLCBcImNvbXB1dGVkXCJdLCBtbGVuID0gbWVyZ2VkLmxlbmd0aDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKG8pe1xuICBvID0gbyB8fCB7fTtcbiAgdmFyIHN1cHIgPSB0aGlzLCBwcm90byxcbiAgICBzdXBybyA9IHN1cHIgJiYgc3Vwci5wcm90b3R5cGUgfHwge307XG5cbiAgaWYodHlwZW9mIG8gPT09ICdmdW5jdGlvbicpe1xuICAgIHByb3RvID0gby5wcm90b3R5cGU7XG4gICAgby5pbXBsZW1lbnQgPSBpbXBsZW1lbnQ7XG4gICAgby5leHRlbmQgPSBleHRlbmQ7XG4gICAgcmV0dXJuIG87XG4gIH0gXG4gIFxuICBmdW5jdGlvbiBmbigpIHtcbiAgICBzdXByLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwcm90byA9IF8uY3JlYXRlUHJvdG8oZm4sIHN1cHJvKTtcblxuICBmdW5jdGlvbiBpbXBsZW1lbnQobyl7XG4gICAgLy8gd2UgbmVlZCBtZXJnZSB0aGUgbWVyZ2VkIHByb3BlcnR5XG4gICAgdmFyIGxlbiA9IG1sZW47XG4gICAgZm9yKDtsZW4tLTspe1xuICAgICAgdmFyIHByb3AgPSBtZXJnZWRbbGVuXTtcbiAgICAgIGlmKG8uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvdG8uaGFzT3duUHJvcGVydHkocHJvcCkpe1xuICAgICAgICBfLmV4dGVuZChwcm90b1twcm9wXSwgb1twcm9wXSwgdHJ1ZSkgXG4gICAgICAgIGRlbGV0ZSBvW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJvY2Vzcyhwcm90bywgbywgc3Vwcm8pOyBcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cblxuICBmbi5pbXBsZW1lbnQgPSBpbXBsZW1lbnRcbiAgZm4uaW1wbGVtZW50KG8pXG4gIGlmKHN1cHIuX19hZnRlcl9fKSBzdXByLl9fYWZ0ZXJfXy5jYWxsKGZuLCBzdXByLCBvKTtcbiAgZm4uZXh0ZW5kID0gZXh0ZW5kO1xuICByZXR1cm4gZm47XG59XG5cbiIsIlxudmFyIGYgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBqc29uOiAgdHdvIHdheSBcbi8vICAtIGdldDogSlNPTi5zdHJpbmdpZnlcbi8vICAtIHNldDogSlNPTi5wYXJzZVxuLy8gIC0gZXhhbXBsZTogYHsgdGl0bGV8anNvbiB9YFxuZi5qc29uID0ge1xuICBnZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApe1xuICAgIHJldHVybiB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCc/IEpTT04uc3RyaW5naWZ5KHZhbHVlKTogdmFsdWU7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oIHZhbHVlICl7XG4gICAgcmV0dXJuIHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJz8gSlNPTi5wYXJzZSh2YWx1ZSkgOiB2YWx1ZTtcbiAgfVxufVxuXG4vLyBsYXN0OiBvbmUtd2F5XG4vLyAgLSBnZXQ6IHJldHVybiB0aGUgbGFzdCBpdGVtIGluIGxpc3Rcbi8vICAtIGV4YW1wbGU6IGB7IGxpc3R8bGFzdCB9YFxuZi5sYXN0ID0gZnVuY3Rpb24oYXJyKXtcbiAgcmV0dXJuIGFyciAmJiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xufVxuXG4vLyBhdmVyYWdlOiBvbmUtd2F5XG4vLyAgLSBnZXQ6IGNvcHV0ZSB0aGUgYXZlcmFnZSBvZiB0aGUgbGlzdFxuLy8gIC0gZXhhbXBsZTogYHsgbGlzdHwgYXZlcmFnZTogXCJzY29yZVwiIH1gXG5mLmF2ZXJhZ2UgPSBmdW5jdGlvbihhcnJheSwga2V5KXtcbiAgYXJyYXkgPSBhcnJheSB8fCBbXTtcbiAgcmV0dXJuIGFycmF5Lmxlbmd0aD8gZi50b3RhbChhcnJheSwga2V5KS8gYXJyYXkubGVuZ3RoIDogMDtcbn1cblxuXG4vLyB0b3RhbDogb25lLXdheVxuLy8gIC0gZ2V0OiBjb3B1dGUgdGhlIHRvdGFsIG9mIHRoZSBsaXN0XG4vLyAgLSBleGFtcGxlOiBgeyBsaXN0fCBhdmVyYWdlOiBcInNjb3JlXCIgfWBcbmYudG90YWwgPSBmdW5jdGlvbihhcnJheSwga2V5KXtcbiAgdmFyIHRvdGFsID0gMDtcbiAgaWYoIWFycmF5KSByZXR1cm47XG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24oIGl0ZW0gKXtcbiAgICB0b3RhbCArPSBrZXk/IGl0ZW1ba2V5XSA6IGl0ZW07XG4gIH0pXG4gIHJldHVybiB0b3RhbDtcbn1cblxuLy8gdmFyIGJhc2ljU29ydEZuID0gZnVuY3Rpb24oYSwgYil7cmV0dXJuIGIgLSBhfVxuXG4vLyBmLnNvcnQgPSBmdW5jdGlvbihhcnJheSwga2V5LCByZXZlcnNlKXtcbi8vICAgdmFyIHR5cGUgPSB0eXBlb2Yga2V5LCBzb3J0Rm47IFxuLy8gICBzd2l0Y2godHlwZSl7XG4vLyAgICAgY2FzZSAnZnVuY3Rpb24nOiBzb3J0Rm4gPSBrZXk7IGJyZWFrO1xuLy8gICAgIGNhc2UgJ3N0cmluZyc6IHNvcnRGbiA9IGZ1bmN0aW9uKGEsIGIpe307YnJlYWs7XG4vLyAgICAgZGVmYXVsdDpcbi8vICAgICAgIHNvcnRGbiA9IGJhc2ljU29ydEZuO1xuLy8gICB9XG4vLyAgIC8vIG5lZWQgb3RoZXIgcmVmZXJuY2UuXG4vLyAgIHJldHVybiBhcnJheS5zbGljZSgpLnNvcnQoZnVuY3Rpb24oYSxiKXtcbi8vICAgICByZXR1cm4gcmV2ZXJzZT8gLXNvcnRGbihhLCBiKTogc29ydEZuKGEsIGIpO1xuLy8gICB9KVxuLy8gICByZXR1cm4gYXJyYXlcbi8vIH1cblxuXG4iLCJ2YXIgZXhwckNhY2hlID0gcmVxdWlyZSgnLi4vZW52JykuZXhwckNhY2hlO1xudmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKFwiLi4vcGFyc2VyL1BhcnNlci5qc1wiKTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHByZXNzaW9uOiBmdW5jdGlvbihleHByLCBzaW1wbGUpe1xuICAgIC8vIEBUT0RPIGNhY2hlXG4gICAgaWYoIHR5cGVvZiBleHByID09PSAnc3RyaW5nJyAmJiAoIGV4cHIgPSBleHByLnRyaW0oKSApICl7XG4gICAgICBleHByID0gZXhwckNhY2hlLmdldCggZXhwciApIHx8IGV4cHJDYWNoZS5zZXQoIGV4cHIsIG5ldyBQYXJzZXIoIGV4cHIsIHsgbW9kZTogMiwgZXhwcmVzc2lvbjogdHJ1ZSB9ICkuZXhwcmVzc2lvbigpIClcbiAgICB9XG4gICAgaWYoZXhwcikgcmV0dXJuIGV4cHI7XG4gIH0sXG4gIHBhcnNlOiBmdW5jdGlvbih0ZW1wbGF0ZSl7XG4gICAgcmV0dXJuIG5ldyBQYXJzZXIodGVtcGxhdGUpLnBhcnNlKCk7XG4gIH1cbn1cblxuIiwiLy8gc2hpbSBmb3IgZXM1XG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciB0c3RyID0gKHt9KS50b1N0cmluZztcblxuZnVuY3Rpb24gZXh0ZW5kKG8xLCBvMiApe1xuICBmb3IodmFyIGkgaW4gbzIpIGlmKCBvMVtpXSA9PT0gdW5kZWZpbmVkKXtcbiAgICBvMVtpXSA9IG8yW2ldXG4gIH1cbn1cblxuLy8gU3RyaW5nIHByb3RvIDtcbmV4dGVuZChTdHJpbmcucHJvdG90eXBlLCB7XG4gIHRyaW06IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB9XG59KTtcblxuXG4vLyBBcnJheSBwcm90bztcbmV4dGVuZChBcnJheS5wcm90b3R5cGUsIHtcbiAgaW5kZXhPZjogZnVuY3Rpb24ob2JqLCBmcm9tKXtcbiAgICBmcm9tID0gZnJvbSB8fCAwO1xuICAgIGZvciAodmFyIGkgPSBmcm9tLCBsZW4gPSB0aGlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAodGhpc1tpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9LFxuICBmb3JFYWNoOiBmdW5jdGlvbihjYWxsYmFjaywgY29udGV4dCl7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgfVxuICB9LFxuICBmaWx0ZXI6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KXtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYXNzID0gY2FsbGJhY2suY2FsbChjb250ZXh0LCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICAgIGlmKHBhc3MpIHJlcy5wdXNoKHRoaXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICBtYXA6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KXtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlcy5wdXNoKGNhbGxiYWNrLmNhbGwoY29udGV4dCwgdGhpc1tpXSwgaSwgdGhpcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG59KTtcblxuLy8gRnVuY3Rpb24gcHJvdG87XG5leHRlbmQoRnVuY3Rpb24ucHJvdG90eXBlLCB7XG4gIGJpbmQ6IGZ1bmN0aW9uKGNvbnRleHQpe1xuICAgIHZhciBmbiA9IHRoaXM7XG4gICAgdmFyIHByZUFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgYXJncyA9IHByZUFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfVxuICB9XG59KVxuXG4vLyBPYmplY3RcbmV4dGVuZChPYmplY3QsIHtcbiAga2V5czogZnVuY3Rpb24ob2JqKXtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvcih2YXIgaSBpbiBvYmopIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSl7XG4gICAgICBrZXlzLnB1c2goaSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xuICB9IFxufSlcblxuLy8gRGF0ZVxuZXh0ZW5kKERhdGUsIHtcbiAgbm93OiBmdW5jdGlvbigpe1xuICAgIHJldHVybiArbmV3IERhdGU7XG4gIH1cbn0pXG4vLyBBcnJheVxuZXh0ZW5kKEFycmF5LCB7XG4gIGlzQXJyYXk6IGZ1bmN0aW9uKGFycil7XG4gICAgcmV0dXJuIHRzdHIuY2FsbChhcnIpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gIH1cbn0pXG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwuanMnKTtcbnZhciBwYXJzZUV4cHJlc3Npb24gPSByZXF1aXJlKCcuL3BhcnNlLmpzJykuZXhwcmVzc2lvbjtcblxuXG5mdW5jdGlvbiBXYXRjaGVyKCl7fVxuXG52YXIgbWV0aG9kcyA9IHtcbiAgJHdhdGNoOiBmdW5jdGlvbihleHByLCBmbiwgb3B0aW9ucyl7XG4gICAgdmFyIGdldCwgb25jZSwgdGVzdCwgcmxlbiwgZXh0cmEgPSB0aGlzLl9fZXh0X187IC8vcmVjb3JkcyBsZW5ndGhcbiAgICBpZighdGhpcy5fd2F0Y2hlcnMpIHRoaXMuX3dhdGNoZXJzID0gW107XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZihvcHRpb25zID09PSB0cnVlKXtcbiAgICAgICBvcHRpb25zID0geyBkZWVwOiB0cnVlIH1cbiAgICB9XG4gICAgdmFyIHVpZCA9IF8udWlkKCd3XycpO1xuICAgIGlmKEFycmF5LmlzQXJyYXkoZXhwcikpe1xuICAgICAgdmFyIHRlc3RzID0gW107XG4gICAgICBmb3IodmFyIGkgPSAwLGxlbiA9IGV4cHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgIHRlc3RzLnB1c2godGhpcy4kZXhwcmVzc2lvbihleHByW2ldKS5nZXQpXG4gICAgICB9XG4gICAgICB2YXIgcHJldiA9IFtdO1xuICAgICAgdGVzdCA9IGZ1bmN0aW9uKGNvbnRleHQpe1xuICAgICAgICB2YXIgZXF1YWwgPSB0cnVlO1xuICAgICAgICBmb3IodmFyIGkgPTAsIGxlbiA9IHRlc3RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICB2YXIgc3BsaWNlID0gdGVzdHNbaV0oY29udGV4dCwgZXh0cmEpO1xuICAgICAgICAgIGlmKCFfLmVxdWFscyhzcGxpY2UsIHByZXZbaV0pKXtcbiAgICAgICAgICAgICBlcXVhbCA9IGZhbHNlO1xuICAgICAgICAgICAgIHByZXZbaV0gPSBfLmNsb25lKHNwbGljZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcXVhbD8gZmFsc2U6IHByZXY7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICBleHByID0gdGhpcy5fdG91Y2hFeHByKCBwYXJzZUV4cHJlc3Npb24oZXhwcikgKTtcbiAgICAgIGdldCA9IGV4cHIuZ2V0O1xuICAgICAgb25jZSA9IGV4cHIub25jZTtcbiAgICB9XG5cbiAgICB2YXIgd2F0Y2hlciA9IHtcbiAgICAgIGlkOiB1aWQsIFxuICAgICAgZ2V0OiBnZXQsIFxuICAgICAgZm46IGZuLCBcbiAgICAgIG9uY2U6IG9uY2UsIFxuICAgICAgZm9yY2U6IG9wdGlvbnMuZm9yY2UsXG4gICAgICB0ZXN0OiB0ZXN0LFxuICAgICAgZGVlcDogb3B0aW9ucy5kZWVwLFxuICAgICAgbGFzdDogb3B0aW9ucy5zeW5jPyBnZXQodGhpcyk6IHVuZGVmaW5lZFxuICAgIH1cbiAgICBcbiAgICB0aGlzLl93YXRjaGVycy5wdXNoKCB3YXRjaGVyICk7XG5cbiAgICBybGVuID0gdGhpcy5fcmVjb3JkcyAmJiB0aGlzLl9yZWNvcmRzLmxlbmd0aDtcbiAgICBpZihybGVuKSB0aGlzLl9yZWNvcmRzW3JsZW4tMV0ucHVzaCh1aWQpXG4gICAgLy8gaW5pdCBzdGF0ZS5cbiAgICBpZihvcHRpb25zLmluaXQgPT09IHRydWUpe1xuICAgICAgdGhpcy4kcGhhc2UgPSAnZGlnZXN0JztcbiAgICAgIHRoaXMuX2NoZWNrU2luZ2xlV2F0Y2goIHdhdGNoZXIsIHRoaXMuX3dhdGNoZXJzLmxlbmd0aC0xICk7XG4gICAgICB0aGlzLiRwaGFzZSA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB3YXRjaGVyO1xuICB9LFxuICAkdW53YXRjaDogZnVuY3Rpb24odWlkKXtcbiAgICB1aWQgPSB1aWQudWlkIHx8IHVpZDtcbiAgICBpZighdGhpcy5fd2F0Y2hlcnMpIHRoaXMuX3dhdGNoZXJzID0gW107XG4gICAgaWYoQXJyYXkuaXNBcnJheSh1aWQpKXtcbiAgICAgIGZvcih2YXIgaSA9MCwgbGVuID0gdWlkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgdGhpcy4kdW53YXRjaCh1aWRbaV0pO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgdmFyIHdhdGNoZXJzID0gdGhpcy5fd2F0Y2hlcnMsIHdhdGNoZXIsIHdsZW47XG4gICAgICBpZighdWlkIHx8ICF3YXRjaGVycyB8fCAhKHdsZW4gPSB3YXRjaGVycy5sZW5ndGgpKSByZXR1cm47XG4gICAgICBmb3IoO3dsZW4tLTspe1xuICAgICAgICB3YXRjaGVyID0gd2F0Y2hlcnNbd2xlbl07XG4gICAgICAgIGlmKHdhdGNoZXIgJiYgd2F0Y2hlci5pZCA9PT0gdWlkICl7XG4gICAgICAgICAgd2F0Y2hlcnMuc3BsaWNlKHdsZW4sIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAkZXhwcmVzc2lvbjogZnVuY3Rpb24odmFsdWUpe1xuICAgIHJldHVybiB0aGlzLl90b3VjaEV4cHIocGFyc2VFeHByZXNzaW9uKHZhbHVlKSlcbiAgfSxcbiAgLyoqXG4gICAqIHRoZSB3aG9sZSBkaWdlc3QgbG9vcCAsanVzdCBsaWtlIGFuZ3VsYXIsIGl0IGp1c3QgYSBkaXJ0eS1jaGVjayBsb29wO1xuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGggIG5vdyByZWd1bGFyIHByb2Nlc3MgYSBwdXJlIGRpcnR5LWNoZWNrIGxvb3AsIGJ1dCBpbiBwYXJzZSBwaGFzZSwgXG4gICAqICAgICAgICAgICAgICAgICAgUmVndWxhcidzIHBhcnNlciBleHRyYWN0IHRoZSBkZXBlbmRlbmNpZXMsIGluIGZ1dHVyZSBtYXliZSBpdCB3aWxsIGNoYW5nZSB0byBkaXJ0eS1jaGVjayBjb21iaW5lIHdpdGggcGF0aC1hd2FyZSB1cGRhdGU7XG4gICAqIEByZXR1cm4ge1ZvaWR9ICAgXG4gICAqL1xuXG4gICRkaWdlc3Q6IGZ1bmN0aW9uKCl7XG4gICAgaWYodGhpcy4kcGhhc2UgPT09ICdkaWdlc3QnIHx8IHRoaXMuX211dGUpIHJldHVybjtcbiAgICB0aGlzLiRwaGFzZSA9ICdkaWdlc3QnO1xuICAgIHZhciBkaXJ0eSA9IGZhbHNlLCBuID0wO1xuICAgIHdoaWxlKGRpcnR5ID0gdGhpcy5fZGlnZXN0KCkpe1xuXG4gICAgICBpZigoKytuKSA+IDIwKXsgLy8gbWF4IGxvb3BcbiAgICAgICAgdGhyb3cgJ3RoZXJlIG1heSBhIGNpcmN1bGFyIGRlcGVuZGVuY2llcyByZWFjaGVzJyBcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIG4gPiAwICYmIHRoaXMuJGVtaXQpIHRoaXMuJGVtaXQoXCIkdXBkYXRlXCIpO1xuICAgIHRoaXMuJHBoYXNlID0gbnVsbDtcbiAgfSxcbiAgLy8gcHJpdmF0ZSBkaWdlc3QgbG9naWNcbiAgX2RpZ2VzdDogZnVuY3Rpb24oKXtcbiAgICAvLyBpZih0aGlzLmNvbnRleHQpIHJldHVybiB0aGlzLmNvbnRleHQuJGRpZ2VzdCgpO1xuICAgIC8vIGlmKHRoaXMuJGVtaXQpIHRoaXMuJGVtaXQoJ2RpZ2VzdCcpO1xuICAgIHZhciB3YXRjaGVycyA9IHRoaXMuX3dhdGNoZXJzO1xuICAgIHZhciBkaXJ0eSA9IGZhbHNlLCBjaGlsZHJlbiwgd2F0Y2hlciwgd2F0Y2hlckRpcnR5O1xuICAgIGlmKHdhdGNoZXJzICYmIHdhdGNoZXJzLmxlbmd0aCl7XG4gICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSB3YXRjaGVycy5sZW5ndGg7aSA8IGxlbjsgaSsrKXtcbiAgICAgICAgd2F0Y2hlciA9IHdhdGNoZXJzW2ldO1xuICAgICAgICB3YXRjaGVyRGlydHkgPSB0aGlzLl9jaGVja1NpbmdsZVdhdGNoKHdhdGNoZXIsIGkpO1xuICAgICAgICBpZih3YXRjaGVyRGlydHkpIGRpcnR5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY2hlY2sgY2hpbGRyZW4ncyBkaXJ0eS5cbiAgICBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgIGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XG4gICAgICBmb3IodmFyIG0gPSAwLCBtbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBtIDwgbWxlbjsgbSsrKXtcbiAgICAgICAgaWYoY2hpbGRyZW5bbV0uX2RpZ2VzdCgpKSBkaXJ0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkaXJ0eTtcbiAgfSxcbiAgLy8gY2hlY2sgYSBzaW5nbGUgb25lIHdhdGNoZXIgXG4gIF9jaGVja1NpbmdsZVdhdGNoOiBmdW5jdGlvbih3YXRjaGVyLCBpKXtcbiAgICB2YXIgZGlydHkgPSBmYWxzZTtcbiAgICBpZighd2F0Y2hlcikgcmV0dXJuO1xuICAgIGlmKHdhdGNoZXIudGVzdCkgeyAvL211bHRpIFxuICAgICAgdmFyIHJlc3VsdCA9IHdhdGNoZXIudGVzdCh0aGlzKTtcbiAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgd2F0Y2hlci5mbi5hcHBseSh0aGlzLCByZXN1bHQpXG4gICAgICB9XG4gICAgfWVsc2V7XG5cbiAgICAgIHZhciBub3cgPSB3YXRjaGVyLmdldCh0aGlzKTtcbiAgICAgIHZhciBsYXN0ID0gd2F0Y2hlci5sYXN0O1xuICAgICAgdmFyIGVxID0gdHJ1ZTtcblxuICAgICAgaWYoXy50eXBlT2YoIG5vdyApID09PSAnb2JqZWN0JyAmJiB3YXRjaGVyLmRlZXApe1xuICAgICAgICBpZighd2F0Y2hlci5sYXN0KXtcbiAgICAgICAgICAgZXEgPSBmYWxzZTtcbiAgICAgICAgIH1lbHNle1xuICAgICAgICAgIGZvcih2YXIgaiBpbiBub3cpe1xuICAgICAgICAgICAgaWYod2F0Y2hlci5sYXN0W2pdICE9PSBub3dbal0pe1xuICAgICAgICAgICAgICBlcSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoZXEgIT09IGZhbHNlKXtcbiAgICAgICAgICAgIGZvcih2YXIgbiBpbiBsYXN0KXtcbiAgICAgICAgICAgICAgaWYobGFzdFtuXSAhPT0gbm93W25dKXtcbiAgICAgICAgICAgICAgICBlcSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZXEgPSBfLmVxdWFscyhub3csIHdhdGNoZXIubGFzdCk7XG4gICAgICB9XG4gICAgICBpZihlcSA9PT0gZmFsc2UgfHwgd2F0Y2hlci5mb3JjZSl7IC8vIGluIHNvbWUgY2FzZS4gaWYgdW5kZWZpbmVkLCB3ZSBtdXN0IGZvcmNlIGRpZ2VzdC5cbiAgICAgICAgZXEgPSBmYWxzZTtcbiAgICAgICAgd2F0Y2hlci5mb3JjZSA9IG51bGw7XG4gICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgd2F0Y2hlci5mbi5jYWxsKHRoaXMsIG5vdywgd2F0Y2hlci5sYXN0KTtcbiAgICAgICAgaWYodHlwZW9mIG5vdyAhPT0gJ29iamVjdCd8fCB3YXRjaGVyLmRlZXApe1xuICAgICAgICAgIHdhdGNoZXIubGFzdCA9IF8uY2xvbmUobm93KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgd2F0Y2hlci5sYXN0ID0gbm93O1xuICAgICAgICB9XG4gICAgICB9ZWxzZXsgLy8gaWYgZXEgPT0gdHJ1ZVxuICAgICAgICBpZiggXy50eXBlT2YoZXEpID09PSAnYXJyYXknICYmIGVxLmxlbmd0aCApe1xuICAgICAgICAgIHdhdGNoZXIubGFzdCA9IF8uY2xvbmUobm93KTtcbiAgICAgICAgICB3YXRjaGVyLmZuLmNhbGwodGhpcywgbm93LCBlcSk7XG4gICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBlcSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEBUT0RPXG4gICAgICBpZihkaXJ0eSAmJiB3YXRjaGVyLm9uY2UpIHRoaXMuX3dhdGNoZXJzLnNwbGljZShpLCAxKTtcblxuICAgICAgcmV0dXJuIGRpcnR5O1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogKip0aXBzKio6IHdoYXRldmVyIHBhcmFtIHlvdSBwYXNzZWQgaW4gJHVwZGF0ZSwgYWZ0ZXIgdGhlIGZ1bmN0aW9uIGNhbGxlZCwgZGlydHktY2hlY2soZGlnZXN0KSBwaGFzZSB3aWxsIGVudGVyO1xuICAgKiBcbiAgICogQHBhcmFtICB7RnVuY3Rpb258U3RyaW5nfEV4cHJlc3Npb259IHBhdGggIFxuICAgKiBAcGFyYW0gIHtXaGF0ZXZlcn0gdmFsdWUgb3B0aW9uYWwsIHdoZW4gcGF0aCBpcyBGdW5jdGlvbiwgdGhlIHZhbHVlIGlzIGlnbm9yZWRcbiAgICogQHJldHVybiB7dGhpc30gICAgIHRoaXMgXG4gICAqL1xuICAkc2V0OiBmdW5jdGlvbihwYXRoLCB2YWx1ZSl7XG4gICAgaWYocGF0aCAhPSBudWxsKXtcbiAgICAgIHZhciB0eXBlID0gXy50eXBlT2YocGF0aCk7XG4gICAgICBpZiggdHlwZSA9PT0gJ3N0cmluZycgfHwgcGF0aC50eXBlID09PSAnZXhwcmVzc2lvbicgKXtcbiAgICAgICAgcGF0aCA9IHRoaXMuJGV4cHJlc3Npb24ocGF0aCk7XG4gICAgICAgIHBhdGguc2V0KHRoaXMsIHZhbHVlKTtcbiAgICAgIH1lbHNlIGlmKHR5cGUgPT09ICdmdW5jdGlvbicpe1xuICAgICAgICBwYXRoLmNhbGwodGhpcywgdGhpcy5kYXRhKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBmb3IodmFyIGkgaW4gcGF0aCkge1xuICAgICAgICAgIHRoaXMuJHNldChpLCBwYXRoW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAkZ2V0OiBmdW5jdGlvbihleHByKSAge1xuICAgIHJldHVybiB0aGlzLiRleHByZXNzaW9uKGV4cHIpLmdldCh0aGlzKTtcbiAgfSxcbiAgJHVwZGF0ZTogZnVuY3Rpb24oKXtcbiAgICB0aGlzLiRzZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgcm9vdFBhcmVudCA9IHRoaXM7XG5cbiAgICBkb3tcbiAgICAgIGlmKHJvb3RQYXJlbnQuZGF0YS5pc29sYXRlIHx8ICFyb290UGFyZW50LiRwYXJlbnQpIGJyZWFrO1xuICAgICAgcm9vdFBhcmVudCA9IHJvb3RQYXJlbnQuJHBhcmVudDtcbiAgICB9IHdoaWxlKHJvb3RQYXJlbnQpXG5cbiAgICByb290UGFyZW50LiRkaWdlc3QoKTtcbiAgfSxcbiAgLy8gYXV0byBjb2xsZWN0IHdhdGNoZXJzIGZvciBsb2dpYy1jb250cm9sLlxuICBfcmVjb3JkOiBmdW5jdGlvbigpe1xuICAgIGlmKCF0aGlzLl9yZWNvcmRzKSB0aGlzLl9yZWNvcmRzID0gW107XG4gICAgdGhpcy5fcmVjb3Jkcy5wdXNoKFtdKTtcbiAgfSxcbiAgX3JlbGVhc2U6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZHMucG9wKCk7XG4gIH1cbn1cblxuXG5fLmV4dGVuZChXYXRjaGVyLnByb3RvdHlwZSwgbWV0aG9kcylcblxuXG5XYXRjaGVyLm1peFRvID0gZnVuY3Rpb24ob2JqKXtcbiAgb2JqID0gdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID8gb2JqLnByb3RvdHlwZSA6IG9iajtcbiAgcmV0dXJuIF8uZXh0ZW5kKG9iaiwgbWV0aG9kcylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYXRjaGVyOyIsInZhciBlbnYgPSAgcmVxdWlyZShcIi4vZW52LmpzXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTsgXG52YXIgUmVndWxhciA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vUmVndWxhci5qc1wiKTtcbnZhciBQYXJzZXIgPSBSZWd1bGFyLlBhcnNlcjtcbnZhciBMZXhlciA9IFJlZ3VsYXIuTGV4ZXI7XG5cbmlmKGVudi5icm93c2VyKXtcbiAgICByZXF1aXJlKFwiLi9kaXJlY3RpdmUvYmFzZS5qc1wiKTtcbiAgICByZXF1aXJlKFwiLi9kaXJlY3RpdmUvYW5pbWF0aW9uLmpzXCIpO1xuICAgIHJlcXVpcmUoXCIuL21vZHVsZS90aW1lb3V0LmpzXCIpO1xuICAgIFJlZ3VsYXIuZG9tID0gcmVxdWlyZShcIi4vZG9tLmpzXCIpO1xufVxuUmVndWxhci5lbnYgPSBlbnY7XG5SZWd1bGFyLnV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xuUmVndWxhci5wYXJzZSA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucyl7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmKG9wdGlvbnMuQkVHSU4gfHwgb3B0aW9ucy5FTkQpe1xuICAgIGlmKG9wdGlvbnMuQkVHSU4pIGNvbmZpZy5CRUdJTiA9IG9wdGlvbnMuQkVHSU47XG4gICAgaWYob3B0aW9ucy5FTkQpIGNvbmZpZy5FTkQgPSBvcHRpb25zLkVORDtcbiAgICBMZXhlci5zZXR1cCgpO1xuICB9XG4gIHZhciBhc3QgPSBuZXcgUGFyc2VyKHN0cikucGFyc2UoKTtcbiAgcmV0dXJuICFvcHRpb25zLnN0cmluZ2lmeT8gYXN0IDogSlNPTi5zdHJpbmdpZnkoYXN0KTtcbn1cblxuIiwidmFyIFJlZ3VsYXIgPSByZXF1aXJlKFwiLi4vUmVndWxhci5qc1wiKTtcblxuLyoqXG4gKiBUaW1lb3V0IE1vZHVsZVxuICogQHBhcmFtIHtDb21wb25lbnR9IENvbXBvbmVudCBcbiAqL1xuZnVuY3Rpb24gVGltZW91dE1vZHVsZShDb21wb25lbnQpe1xuXG4gIENvbXBvbmVudC5pbXBsZW1lbnQoe1xuICAgIC8qKlxuICAgICAqIGp1c3QgbGlrZSBzZXRUaW1lb3V0LCBidXQgd2lsbCBlbnRlciBkaWdlc3QgYXV0b21hdGVseVxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICBcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgZGVsYXkgXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAgIHRpbWVvdXRpZFxuICAgICAqL1xuICAgICR0aW1lb3V0OiBmdW5jdGlvbihmbiwgZGVsYXkpe1xuICAgICAgZGVsYXkgPSBkZWxheSB8fCAwO1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgZm4uY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7IC8vZW50ZXIgZGlnZXN0XG4gICAgICB9LmJpbmQodGhpcyksIGRlbGF5KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIGp1c3QgbGlrZSBzZXRJbnRlcnZhbCwgYnV0IHdpbGwgZW50ZXIgZGlnZXN0IGF1dG9tYXRlbHlcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGludGVydmFsIFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gICBpbnRlcnZhbGlkXG4gICAgICovXG4gICAgJGludGVydmFsOiBmdW5jdGlvbihmbiwgaW50ZXJ2YWwpe1xuICAgICAgaW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAxMDAwLzYwO1xuICAgICAgcmV0dXJuIHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgIGZuLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpOyAvL2VudGVyIGRpZ2VzdFxuICAgICAgfS5iaW5kKHRoaXMpLCBpbnRlcnZhbCk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5SZWd1bGFyLnBsdWdpbigndGltZW91dCcsIFRpbWVvdXRNb2R1bGUpO1xuUmVndWxhci5wbHVnaW4oJyR0aW1lb3V0JywgVGltZW91dE1vZHVsZSk7IiwidmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnLmpzXCIpO1xuXG4vLyBzb21lIGN1c3RvbSB0YWcgIHdpbGwgY29uZmxpY3Qgd2l0aCB0aGUgTGV4ZXIgcHJvZ3Jlc3NcbnZhciBjb25mbGljdFRhZyA9IHtcIn1cIjogXCJ7XCIsIFwiXVwiOiBcIltcIn0sIG1hcDEsIG1hcDI7XG4vLyBzb21lIG1hY3JvIGZvciBsZXhlclxudmFyIG1hY3JvID0ge1xuICAnTkFNRSc6IC8oPzpbOl9BLVphLXpdWy1cXC46XzAtOUEtWmEtel0qKS8sXG4gICdJREVOVCc6IC9bXFwkX0EtWmEtel1bXzAtOUEtWmEtelxcJF0qLyxcbiAgJ1NQQUNFJzogL1tcXHJcXG5cXGYgXS9cbn1cblxuXG52YXIgdGVzdCA9IC9hfChiKS8uZXhlYyhcImFcIik7XG52YXIgdGVzdFN1YkNhcHVyZSA9IHRlc3QgJiYgdGVzdFsxXSA9PT0gdW5kZWZpbmVkPyBcbiAgZnVuY3Rpb24oc3RyKXsgcmV0dXJuIHN0ciAhPT0gdW5kZWZpbmVkIH1cbiAgOmZ1bmN0aW9uKHN0cil7cmV0dXJuICEhc3RyfTtcblxuZnVuY3Rpb24gd3JhcEhhbmRlcihoYW5kbGVyKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFsbCl7XG4gICAgcmV0dXJuIHt0eXBlOiBoYW5kbGVyLCB2YWx1ZTogYWxsIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBMZXhlcihpbnB1dCwgb3B0cyl7XG4gIGlmKGNvbmZsaWN0VGFnW2NvbmZpZy5FTkRdKXtcbiAgICB0aGlzLm1hcmtTdGFydCA9IGNvbmZsaWN0VGFnW2NvbmZpZy5FTkRdO1xuICAgIHRoaXMubWFya0VuZCA9IGNvbmZpZy5FTkQ7XG4gIH1cblxuICB0aGlzLmlucHV0ID0gKGlucHV0fHxcIlwiKS50cmltKCk7XG4gIHRoaXMub3B0cyA9IG9wdHMgfHwge307XG4gIHRoaXMubWFwID0gdGhpcy5vcHRzLm1vZGUgIT09IDI/ICBtYXAxOiBtYXAyO1xuICB0aGlzLnN0YXRlcyA9IFtcIklOSVRcIl07XG4gIGlmKG9wdHMgJiYgb3B0cy5leHByZXNzaW9uKXtcbiAgICAgdGhpcy5zdGF0ZXMucHVzaChcIkpTVFwiKTtcbiAgICAgdGhpcy5leHByZXNzaW9uID0gdHJ1ZTtcbiAgfVxufVxuXG52YXIgbG8gPSBMZXhlci5wcm90b3R5cGVcblxuXG5sby5sZXggPSBmdW5jdGlvbihzdHIpe1xuICBzdHIgPSAoc3RyIHx8IHRoaXMuaW5wdXQpLnRyaW0oKTtcbiAgdmFyIHRva2VucyA9IFtdLCBzcGxpdCwgdGVzdCxtbGVuLCB0b2tlbiwgc3RhdGU7XG4gIHRoaXMuaW5wdXQgPSBzdHIsIFxuICB0aGlzLm1hcmtzID0gMDtcbiAgLy8gaW5pdCB0aGUgcG9zIGluZGV4XG4gIHRoaXMuaW5kZXg9MDtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZShzdHIpe1xuICAgIGkrK1xuICAgIHN0YXRlID0gdGhpcy5zdGF0ZSgpO1xuICAgIHNwbGl0ID0gdGhpcy5tYXBbc3RhdGVdIFxuICAgIHRlc3QgPSBzcGxpdC5UUlVOSy5leGVjKHN0cik7XG4gICAgaWYoIXRlc3Qpe1xuICAgICAgdGhpcy5lcnJvcignVW5yZWNvZ2luaXplZCBUb2tlbicpO1xuICAgIH1cbiAgICBtbGVuID0gdGVzdFswXS5sZW5ndGg7XG4gICAgc3RyID0gc3RyLnNsaWNlKG1sZW4pXG4gICAgdG9rZW4gPSB0aGlzLl9wcm9jZXNzLmNhbGwodGhpcywgdGVzdCwgc3BsaXQsIHN0cilcbiAgICBpZih0b2tlbikgdG9rZW5zLnB1c2godG9rZW4pXG4gICAgdGhpcy5pbmRleCArPSBtbGVuO1xuICAgIC8vIGlmKHN0YXRlID09ICdUQUcnIHx8IHN0YXRlID09ICdKU1QnKSBzdHIgPSB0aGlzLnNraXBzcGFjZShzdHIpO1xuICB9XG5cbiAgdG9rZW5zLnB1c2goe3R5cGU6ICdFT0YnfSk7XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxubG8uZXJyb3IgPSBmdW5jdGlvbihtc2cpe1xuICB0aHJvdyBcIlBhcnNlIEVycm9yOiBcIiArIG1zZyArICAnOlxcbicgKyBfLnRyYWNrRXJyb3JQb3ModGhpcy5pbnB1dCwgdGhpcy5pbmRleCk7XG59XG5cbmxvLl9wcm9jZXNzID0gZnVuY3Rpb24oYXJncywgc3BsaXQsc3RyKXtcbiAgLy8gY29uc29sZS5sb2coYXJncy5qb2luKFwiLFwiKSwgdGhpcy5zdGF0ZSgpKVxuICB2YXIgbGlua3MgPSBzcGxpdC5saW5rcywgbWFyY2hlZCA9IGZhbHNlLCB0b2tlbjtcblxuICBmb3IodmFyIGxlbiA9IGxpbmtzLmxlbmd0aCwgaT0wO2k8bGVuIDtpKyspe1xuICAgIHZhciBsaW5rID0gbGlua3NbaV0sXG4gICAgICBoYW5kbGVyID0gbGlua1syXSxcbiAgICAgIGluZGV4ID0gbGlua1swXTtcbiAgICAvLyBpZihhcmdzWzZdID09PSAnPicgJiYgaW5kZXggPT09IDYpIGNvbnNvbGUubG9nKCdoYWhhJylcbiAgICBpZih0ZXN0U3ViQ2FwdXJlKGFyZ3NbaW5kZXhdKSkge1xuICAgICAgbWFyY2hlZCA9IHRydWU7XG4gICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgdG9rZW4gPSBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3Muc2xpY2UoaW5kZXgsIGluZGV4ICsgbGlua1sxXSkpXG4gICAgICAgIGlmKHRva2VuKSAgdG9rZW4ucG9zID0gdGhpcy5pbmRleDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZighbWFyY2hlZCl7IC8vIGluIGllIGx0OCAuIHN1YiBjYXB0dXJlIGlzIFwiXCIgYnV0IG9udCBcbiAgICBzd2l0Y2goc3RyLmNoYXJBdCgwKSl7XG4gICAgICBjYXNlIFwiPFwiOlxuICAgICAgICB0aGlzLmVudGVyKFwiVEFHXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZW50ZXIoXCJKU1RcIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdG9rZW47XG59XG5sby5lbnRlciA9IGZ1bmN0aW9uKHN0YXRlKXtcbiAgdGhpcy5zdGF0ZXMucHVzaChzdGF0ZSlcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmxvLnN0YXRlID0gZnVuY3Rpb24oKXtcbiAgdmFyIHN0YXRlcyA9IHRoaXMuc3RhdGVzO1xuICByZXR1cm4gc3RhdGVzW3N0YXRlcy5sZW5ndGgtMV07XG59XG5cbmxvLmxlYXZlID0gZnVuY3Rpb24oc3RhdGUpe1xuICB2YXIgc3RhdGVzID0gdGhpcy5zdGF0ZXM7XG4gIGlmKCFzdGF0ZSB8fCBzdGF0ZXNbc3RhdGVzLmxlbmd0aC0xXSA9PT0gc3RhdGUpIHN0YXRlcy5wb3AoKVxufVxuXG5cbkxleGVyLnNldHVwID0gZnVuY3Rpb24oKXtcbiAgbWFjcm8uRU5EID0gY29uZmlnLkVORDtcbiAgbWFjcm8uQkVHSU4gPSBjb25maWcuQkVHSU47XG4gIC8vXG4gIG1hcDEgPSBnZW5NYXAoW1xuICAgIC8vIElOSVRcbiAgICBydWxlcy5FTlRFUl9KU1QsXG4gICAgcnVsZXMuRU5URVJfVEFHLFxuICAgIHJ1bGVzLlRFWFQsXG5cbiAgICAvL1RBR1xuICAgIHJ1bGVzLlRBR19OQU1FLFxuICAgIHJ1bGVzLlRBR19PUEVOLFxuICAgIHJ1bGVzLlRBR19DTE9TRSxcbiAgICBydWxlcy5UQUdfUFVOQ0hPUixcbiAgICBydWxlcy5UQUdfRU5URVJfSlNULFxuICAgIHJ1bGVzLlRBR19VTlFfVkFMVUUsXG4gICAgcnVsZXMuVEFHX1NUUklORyxcbiAgICBydWxlcy5UQUdfU1BBQ0UsXG4gICAgcnVsZXMuVEFHX0NPTU1FTlQsXG5cbiAgICAvLyBKU1RcbiAgICBydWxlcy5KU1RfT1BFTixcbiAgICBydWxlcy5KU1RfQ0xPU0UsXG4gICAgcnVsZXMuSlNUX0NPTU1FTlQsXG4gICAgcnVsZXMuSlNUX0VYUFJfT1BFTixcbiAgICBydWxlcy5KU1RfSURFTlQsXG4gICAgcnVsZXMuSlNUX1NQQUNFLFxuICAgIHJ1bGVzLkpTVF9MRUFWRSxcbiAgICBydWxlcy5KU1RfTlVNQkVSLFxuICAgIHJ1bGVzLkpTVF9QVU5DSE9SLFxuICAgIHJ1bGVzLkpTVF9TVFJJTkcsXG4gICAgcnVsZXMuSlNUX0NPTU1FTlRcbiAgICBdKVxuXG4gIC8vIGlnbm9yZWQgdGhlIHRhZy1yZWxhdGl2ZSB0b2tlblxuICBtYXAyID0gZ2VuTWFwKFtcbiAgICAvLyBJTklUIG5vIDwgcmVzdHJpY3RcbiAgICBydWxlcy5FTlRFUl9KU1QyLFxuICAgIHJ1bGVzLlRFWFQsXG4gICAgLy8gSlNUXG4gICAgcnVsZXMuSlNUX0NPTU1FTlQsXG4gICAgcnVsZXMuSlNUX09QRU4sXG4gICAgcnVsZXMuSlNUX0NMT1NFLFxuICAgIHJ1bGVzLkpTVF9FWFBSX09QRU4sXG4gICAgcnVsZXMuSlNUX0lERU5ULFxuICAgIHJ1bGVzLkpTVF9TUEFDRSxcbiAgICBydWxlcy5KU1RfTEVBVkUsXG4gICAgcnVsZXMuSlNUX05VTUJFUixcbiAgICBydWxlcy5KU1RfUFVOQ0hPUixcbiAgICBydWxlcy5KU1RfU1RSSU5HLFxuICAgIHJ1bGVzLkpTVF9DT01NRU5UXG4gICAgXSlcbn1cblxuXG5mdW5jdGlvbiBnZW5NYXAocnVsZXMpe1xuICB2YXIgcnVsZSwgbWFwID0ge30sIHNpZ247XG4gIGZvcih2YXIgaSA9IDAsIGxlbiA9IHJ1bGVzLmxlbmd0aDsgaSA8IGxlbiA7IGkrKyl7XG4gICAgcnVsZSA9IHJ1bGVzW2ldO1xuICAgIHNpZ24gPSBydWxlWzJdIHx8ICdJTklUJztcbiAgICAoIG1hcFtzaWduXSB8fCAobWFwW3NpZ25dID0ge3J1bGVzOltdLCBsaW5rczpbXX0pICkucnVsZXMucHVzaChydWxlKTtcbiAgfVxuICByZXR1cm4gc2V0dXAobWFwKTtcbn1cblxuZnVuY3Rpb24gc2V0dXAobWFwKXtcbiAgdmFyIHNwbGl0LCBydWxlcywgdHJ1bmtzLCBoYW5kbGVyLCByZWcsIHJldGFpbiwgcnVsZTtcbiAgZnVuY3Rpb24gcmVwbGFjZUZuKGFsbCwgb25lKXtcbiAgICByZXR1cm4gdHlwZW9mIG1hY3JvW29uZV0gPT09ICdzdHJpbmcnPyBcbiAgICAgIF8uZXNjYXBlUmVnRXhwKG1hY3JvW29uZV0pIFxuICAgICAgOiBTdHJpbmcobWFjcm9bb25lXSkuc2xpY2UoMSwtMSk7XG4gIH1cblxuICBmb3IodmFyIGkgaW4gbWFwKXtcblxuICAgIHNwbGl0ID0gbWFwW2ldO1xuICAgIHNwbGl0LmN1ckluZGV4ID0gMTtcbiAgICBydWxlcyA9IHNwbGl0LnJ1bGVzO1xuICAgIHRydW5rcyA9IFtdO1xuXG4gICAgZm9yKHZhciBqID0gMCxsZW4gPSBydWxlcy5sZW5ndGg7IGo8bGVuOyBqKyspe1xuICAgICAgcnVsZSA9IHJ1bGVzW2pdOyBcbiAgICAgIHJlZyA9IHJ1bGVbMF07XG4gICAgICBoYW5kbGVyID0gcnVsZVsxXTtcblxuICAgICAgaWYodHlwZW9mIGhhbmRsZXIgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgaGFuZGxlciA9IHdyYXBIYW5kZXIoaGFuZGxlcik7XG4gICAgICB9XG4gICAgICBpZihfLnR5cGVPZihyZWcpID09PSAncmVnZXhwJykgcmVnID0gcmVnLnRvU3RyaW5nKCkuc2xpY2UoMSwgLTEpO1xuXG4gICAgICByZWcgPSByZWcucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csIHJlcGxhY2VGbilcbiAgICAgIHJldGFpbiA9IF8uZmluZFN1YkNhcHR1cmUocmVnKSArIDE7IFxuICAgICAgc3BsaXQubGlua3MucHVzaChbc3BsaXQuY3VySW5kZXgsIHJldGFpbiwgaGFuZGxlcl0pOyBcbiAgICAgIHNwbGl0LmN1ckluZGV4ICs9IHJldGFpbjtcbiAgICAgIHRydW5rcy5wdXNoKHJlZyk7XG4gICAgfVxuICAgIHNwbGl0LlRSVU5LID0gbmV3IFJlZ0V4cChcIl4oPzooXCIgKyB0cnVua3Muam9pbihcIil8KFwiKSArIFwiKSlcIilcbiAgfVxuICByZXR1cm4gbWFwO1xufVxuXG52YXIgcnVsZXMgPSB7XG5cbiAgLy8gMS4gSU5JVFxuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBtb2RlMSdzIEpTVCBFTlRFUiBSVUxFXG4gIEVOVEVSX0pTVDogWy9bXlxceDAwPF0qPyg/PXtCRUdJTn0pLywgZnVuY3Rpb24oYWxsKXtcbiAgICB0aGlzLmVudGVyKCdKU1QnKTtcbiAgICBpZihhbGwpIHJldHVybiB7dHlwZTogJ1RFWFQnLCB2YWx1ZTogYWxsfVxuICB9XSxcblxuICAvLyBtb2RlMidzIEpTVCBFTlRFUiBSVUxFXG4gIEVOVEVSX0pTVDI6IFsvW15cXHgwMF0qPyg/PXtCRUdJTn0pLywgZnVuY3Rpb24oYWxsKXtcbiAgICB0aGlzLmVudGVyKCdKU1QnKTtcbiAgICBpZihhbGwpIHJldHVybiB7dHlwZTogJ1RFWFQnLCB2YWx1ZTogYWxsfVxuICB9XSxcblxuICBFTlRFUl9UQUc6IFsvW15cXHgwMDw+XSo/KD89PCkvLCBmdW5jdGlvbihhbGwpeyBcbiAgICB0aGlzLmVudGVyKCdUQUcnKTtcbiAgICBpZihhbGwpIHJldHVybiB7dHlwZTogJ1RFWFQnLCB2YWx1ZTogYWxsfVxuICB9XSxcblxuICBURVhUOiBbL1teXFx4MDBdKy8sICdURVhUJ10sXG5cbiAgLy8gMi4gVEFHXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIFRBR19OQU1FOiBbL3tOQU1FfS8sICdOQU1FJywgJ1RBRyddLFxuICBUQUdfVU5RX1ZBTFVFOiBbL1teXFx7fSZcIic9PjxgXFxyXFxuXFxmIF0rLywgJ1VOUScsICdUQUcnXSxcblxuICBUQUdfT1BFTjogWy88KHtOQU1FfSlcXHMqLywgZnVuY3Rpb24oYWxsLCBvbmUpe1xuICAgIHJldHVybiB7dHlwZTogJ1RBR19PUEVOJywgdmFsdWU6IG9uZX1cbiAgfSwgJ1RBRyddLFxuICBUQUdfQ0xPU0U6IFsvPFxcLyh7TkFNRX0pW1xcclxcblxcZiBdKj4vLCBmdW5jdGlvbihhbGwsIG9uZSl7XG4gICAgdGhpcy5sZWF2ZSgpO1xuICAgIHJldHVybiB7dHlwZTogJ1RBR19DTE9TRScsIHZhbHVlOiBvbmUgfVxuICB9LCAnVEFHJ10sXG5cbiAgICAvLyBtb2RlMidzIEpTVCBFTlRFUiBSVUxFXG4gIFRBR19FTlRFUl9KU1Q6IFsvKD89e0JFR0lOfSkvLCBmdW5jdGlvbigpe1xuICAgIHRoaXMuZW50ZXIoJ0pTVCcpO1xuICB9LCAnVEFHJ10sXG5cblxuICBUQUdfUFVOQ0hPUjogWy9bXFw+XFwvPSZdLywgZnVuY3Rpb24oYWxsKXtcbiAgICBpZihhbGwgPT09ICc+JykgdGhpcy5sZWF2ZSgpO1xuICAgIHJldHVybiB7dHlwZTogYWxsLCB2YWx1ZTogYWxsIH1cbiAgfSwgJ1RBRyddLFxuICBUQUdfU1RSSU5HOiAgWyAvJyhbXiddKiknfFwiKFteXCJdKilcIi8sIGZ1bmN0aW9uKGFsbCwgb25lLCB0d28peyAvL1wiJ1xuICAgIHZhciB2YWx1ZSA9IG9uZSB8fCB0d28gfHwgXCJcIjtcblxuICAgIHJldHVybiB7dHlwZTogJ1NUUklORycsIHZhbHVlOiB2YWx1ZX1cbiAgfSwgJ1RBRyddLFxuXG4gIFRBR19TUEFDRTogWy97U1BBQ0V9Ky8sIG51bGwsICdUQUcnXSxcbiAgVEFHX0NPTU1FTlQ6IFsvPFxcIS0tKFteXFx4MDBdKj8pLS1cXD4vLCBudWxsICwnVEFHJ10sXG5cbiAgLy8gMy4gSlNUXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBKU1RfT1BFTjogWyd7QkVHSU59I3tTUEFDRX0qKHtJREVOVH0pJywgZnVuY3Rpb24oYWxsLCBuYW1lKXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ09QRU4nLFxuICAgICAgdmFsdWU6IG5hbWVcbiAgICB9XG4gIH0sICdKU1QnXSxcbiAgSlNUX0xFQVZFOiBbL3tFTkR9LywgZnVuY3Rpb24oYWxsKXtcbiAgICBpZih0aGlzLm1hcmtFbmQgPT09IGFsbCAmJiB0aGlzLmV4cHJlc3Npb24pIHJldHVybiB7dHlwZTogdGhpcy5tYXJrRW5kLCB2YWx1ZTogdGhpcy5tYXJrRW5kfTtcbiAgICBpZighdGhpcy5tYXJrRW5kIHx8ICF0aGlzLm1hcmtzICl7XG4gICAgICB0aGlzLmZpcnN0RW50ZXJTdGFydCA9IGZhbHNlO1xuICAgICAgdGhpcy5sZWF2ZSgnSlNUJyk7XG4gICAgICByZXR1cm4ge3R5cGU6ICdFTkQnfVxuICAgIH1lbHNle1xuICAgICAgdGhpcy5tYXJrcy0tO1xuICAgICAgcmV0dXJuIHt0eXBlOiB0aGlzLm1hcmtFbmQsIHZhbHVlOiB0aGlzLm1hcmtFbmR9XG4gICAgfVxuICB9LCAnSlNUJ10sXG4gIEpTVF9DTE9TRTogWy97QkVHSU59XFxzKlxcLyh7SURFTlR9KVxccyp7RU5EfS8sIGZ1bmN0aW9uKGFsbCwgb25lKXtcbiAgICB0aGlzLmxlYXZlKCdKU1QnKTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ0NMT1NFJyxcbiAgICAgIHZhbHVlOiBvbmVcbiAgICB9XG4gIH0sICdKU1QnXSxcbiAgSlNUX0NPTU1FTlQ6IFsve0JFR0lOfVxcIShbXlxceDAwXSo/KVxcIXtFTkR9LywgZnVuY3Rpb24oKXtcbiAgICB0aGlzLmxlYXZlKCk7XG4gIH0sICdKU1QnXSxcbiAgSlNUX0VYUFJfT1BFTjogWyd7QkVHSU59JyxmdW5jdGlvbihhbGwsIG9uZSl7XG4gICAgaWYoYWxsID09PSB0aGlzLm1hcmtTdGFydCl7XG4gICAgICBpZih0aGlzLmV4cHJlc3Npb24pIHJldHVybiB7IHR5cGU6IHRoaXMubWFya1N0YXJ0LCB2YWx1ZTogdGhpcy5tYXJrU3RhcnQgfTtcbiAgICAgIGlmKHRoaXMuZmlyc3RFbnRlclN0YXJ0IHx8IHRoaXMubWFya3Mpe1xuICAgICAgICB0aGlzLm1hcmtzKytcbiAgICAgICAgdGhpcy5maXJzdEVudGVyU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogdGhpcy5tYXJrU3RhcnQsIHZhbHVlOiB0aGlzLm1hcmtTdGFydCB9O1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuZmlyc3RFbnRlclN0YXJ0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdFWFBSX09QRU4nLFxuICAgICAgZXNjYXBlOiBmYWxzZVxuICAgIH1cblxuICB9LCAnSlNUJ10sXG4gIEpTVF9JREVOVDogWyd7SURFTlR9JywgJ0lERU5UJywgJ0pTVCddLFxuICBKU1RfU1BBQ0U6IFsvWyBcXHJcXG5cXGZdKy8sIG51bGwsICdKU1QnXSxcbiAgSlNUX1BVTkNIT1I6IFsvWz0hXT89PXxbLT0+PCsqXFwvJVxcIV0/XFw9fFxcfFxcfHwmJnxcXEBcXCh8XFwuXFwufFs8XFw+XFxbXFxdXFwoXFwpXFwtXFx8XFx7fVxcK1xcKlxcLyU/OlxcLiEsXS8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgcmV0dXJuIHsgdHlwZTogYWxsLCB2YWx1ZTogYWxsIH1cbiAgfSwnSlNUJ10sXG5cbiAgSlNUX1NUUklORzogIFsgLycoW14nXSopJ3xcIihbXlwiXSopXCIvLCBmdW5jdGlvbihhbGwsIG9uZSwgdHdvKXsgLy9cIidcbiAgICByZXR1cm4ge3R5cGU6ICdTVFJJTkcnLCB2YWx1ZTogb25lIHx8IHR3byB8fCBcIlwifVxuICB9LCAnSlNUJ10sXG4gIEpTVF9OVU1CRVI6IFsvKD86WzAtOV0qXFwuWzAtOV0rfFswLTldKykoZVxcZCspPy8sIGZ1bmN0aW9uKGFsbCl7XG4gICAgcmV0dXJuIHt0eXBlOiAnTlVNQkVSJywgdmFsdWU6IHBhcnNlRmxvYXQoYWxsLCAxMCl9O1xuICB9LCAnSlNUJ11cbn1cblxuXG4vLyBzZXR1cCB3aGVuIGZpcnN0IGNvbmZpZ1xuTGV4ZXIuc2V0dXAoKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTGV4ZXI7XG4iLCJ2YXIgXyA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpO1xuXG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2NvbmZpZy5qc1wiKTtcbnZhciBub2RlID0gcmVxdWlyZShcIi4vbm9kZS5qc1wiKTtcbnZhciBMZXhlciA9IHJlcXVpcmUoXCIuL0xleGVyLmpzXCIpO1xudmFyIHZhck5hbWUgPSBfLnZhck5hbWU7XG52YXIgY3R4TmFtZSA9IF8uY3R4TmFtZTtcbnZhciBleHROYW1lID0gXy5leHROYW1lO1xudmFyIGlzUGF0aCA9IF8ubWFrZVByZWRpY2F0ZShcIlNUUklORyBJREVOVCBOVU1CRVJcIik7XG52YXIgaXNLZXlXb3JkID0gXy5tYWtlUHJlZGljYXRlKFwidHJ1ZSBmYWxzZSB1bmRlZmluZWQgbnVsbCB0aGlzIEFycmF5IERhdGUgSlNPTiBNYXRoIE5hTiBSZWdFeHAgZGVjb2RlVVJJIGRlY29kZVVSSUNvbXBvbmVudCBlbmNvZGVVUkkgZW5jb2RlVVJJQ29tcG9uZW50IHBhcnNlRmxvYXQgcGFyc2VJbnQgT2JqZWN0XCIpO1xuXG5cblxuXG5mdW5jdGlvbiBQYXJzZXIoaW5wdXQsIG9wdHMpe1xuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gIHRoaXMudG9rZW5zID0gbmV3IExleGVyKGlucHV0LCBvcHRzKS5sZXgoKTtcbiAgdGhpcy5wb3MgPSAwO1xuICB0aGlzLm5vQ29tcHV0ZWQgPSAgb3B0cy5ub0NvbXB1dGVkO1xuICB0aGlzLmxlbmd0aCA9IHRoaXMudG9rZW5zLmxlbmd0aDtcbn1cblxuXG52YXIgb3AgPSBQYXJzZXIucHJvdG90eXBlO1xuXG5cbm9wLnBhcnNlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5wb3MgPSAwO1xuICB2YXIgcmVzPSB0aGlzLnByb2dyYW0oKTtcbiAgaWYodGhpcy5sbCgpLnR5cGUgPT09ICdUQUdfQ0xPU0UnKXtcbiAgICB0aGlzLmVycm9yKFwiWW91IG1heSBnb3QgYSB1bmNsb3NlZCBUYWdcIilcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5vcC5sbCA9ICBmdW5jdGlvbihrKXtcbiAgayA9IGsgfHwgMTtcbiAgaWYoayA8IDApIGsgPSBrICsgMTtcbiAgdmFyIHBvcyA9IHRoaXMucG9zICsgayAtIDE7XG4gIGlmKHBvcyA+IHRoaXMubGVuZ3RoIC0gMSl7XG4gICAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5sZW5ndGgtMV07XG4gIH1cbiAgcmV0dXJuIHRoaXMudG9rZW5zW3Bvc107XG59XG4gIC8vIGxvb2thaGVhZFxub3AubGEgPSBmdW5jdGlvbihrKXtcbiAgcmV0dXJuICh0aGlzLmxsKGspIHx8ICcnKS50eXBlO1xufVxuXG5vcC5tYXRjaCA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKXtcbiAgdmFyIGxsO1xuICBpZighKGxsID0gdGhpcy5lYXQodHlwZSwgdmFsdWUpKSl7XG4gICAgbGwgID0gdGhpcy5sbCgpO1xuICAgIHRoaXMuZXJyb3IoJ2V4cGVjdCBbJyArIHR5cGUgKyAodmFsdWUgPT0gbnVsbD8gJyc6JzonKyB2YWx1ZSkgKyAnXVwiIC0+IGdvdCBcIlsnICsgbGwudHlwZSArICh2YWx1ZT09bnVsbD8gJyc6JzonK2xsLnZhbHVlKSArICddJywgbGwucG9zKVxuICB9ZWxzZXtcbiAgICByZXR1cm4gbGw7XG4gIH1cbn1cblxub3AuZXJyb3IgPSBmdW5jdGlvbihtc2csIHBvcyl7XG4gIG1zZyA9ICBcIlBhcnNlIEVycm9yOiBcIiArIG1zZyArICAnOlxcbicgKyBfLnRyYWNrRXJyb3JQb3ModGhpcy5pbnB1dCwgdHlwZW9mIHBvcyA9PT0gJ251bWJlcic/IHBvczogdGhpcy5sbCgpLnBvc3x8MCk7XG4gIHRocm93IG5ldyBFcnJvcihtc2cpO1xufVxuXG5vcC5uZXh0ID0gZnVuY3Rpb24oayl7XG4gIGsgPSBrIHx8IDE7XG4gIHRoaXMucG9zICs9IGs7XG59XG5vcC5lYXQgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSl7XG4gIHZhciBsbCA9IHRoaXMubGwoKTtcbiAgaWYodHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKXtcbiAgICBmb3IodmFyIGxlbiA9IHR5cGUubGVuZ3RoIDsgbGVuLS07KXtcbiAgICAgIGlmKGxsLnR5cGUgPT09IHR5cGVbbGVuXSkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgcmV0dXJuIGxsO1xuICAgICAgfVxuICAgIH1cbiAgfWVsc2V7XG4gICAgaWYoIGxsLnR5cGUgPT09IHR5cGUgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbGwudmFsdWUgPT09IHZhbHVlKSApe1xuICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgIHJldHVybiBsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBwcm9ncmFtXG4vLyAgOkVPRlxuLy8gIHwgKHN0YXRlbWVudCkqIEVPRlxub3AucHJvZ3JhbSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBzdGF0ZW1lbnRzID0gW10sICBsbCA9IHRoaXMubGwoKTtcbiAgd2hpbGUobGwudHlwZSAhPT0gJ0VPRicgJiYgbGwudHlwZSAhPT0nVEFHX0NMT1NFJyl7XG5cbiAgICBzdGF0ZW1lbnRzLnB1c2godGhpcy5zdGF0ZW1lbnQoKSk7XG4gICAgbGwgPSB0aGlzLmxsKCk7XG4gIH1cbiAgLy8gaWYobGwudHlwZSA9PT0gJ1RBR19DTE9TRScpIHRoaXMuZXJyb3IoXCJZb3UgbWF5IGhhdmUgdW5tYXRjaGVkIFRhZ1wiKVxuICByZXR1cm4gc3RhdGVtZW50cztcbn1cblxuLy8gc3RhdGVtZW50XG4vLyAgOiB4bWxcbi8vICB8IGpzdFxuLy8gIHwgdGV4dFxub3Auc3RhdGVtZW50ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxsID0gdGhpcy5sbCgpO1xuICBzd2l0Y2gobGwudHlwZSl7XG4gICAgY2FzZSAnTkFNRSc6XG4gICAgY2FzZSAnVEVYVCc6XG4gICAgICB2YXIgdGV4dCA9IGxsLnZhbHVlO1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICB3aGlsZShsbCA9IHRoaXMuZWF0KFsnTkFNRScsICdURVhUJ10pKXtcbiAgICAgICAgdGV4dCArPSBsbC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlLnRleHQodGV4dCk7XG4gICAgY2FzZSAnVEFHX09QRU4nOlxuICAgICAgcmV0dXJuIHRoaXMueG1sKCk7XG4gICAgY2FzZSAnT1BFTic6IFxuICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aXZlKCk7XG4gICAgY2FzZSAnRVhQUl9PUEVOJzpcbiAgICAgIHJldHVybiB0aGlzLmludGVycGxhdGlvbigpO1xuICAgIGNhc2UgJ1BBUlRfT1BFTic6XG4gICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZSgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLmVycm9yKCdVbmV4cGVjdGVkIHRva2VuOiAnKyB0aGlzLmxhKCkpXG4gIH1cbn1cblxuLy8geG1sIFxuLy8gc3RhZyBzdGF0ZW1lbnQqIFRBR19DTE9TRT8oaWYgc2VsZi1jbG9zZWQgdGFnKVxub3AueG1sID0gZnVuY3Rpb24oKXtcbiAgdmFyIG5hbWUsIGF0dHJzLCBjaGlsZHJlbiwgc2VsZkNsb3NlZDtcbiAgbmFtZSA9IHRoaXMubWF0Y2goJ1RBR19PUEVOJykudmFsdWU7XG4gIGF0dHJzID0gdGhpcy5hdHRycygpO1xuICBzZWxmQ2xvc2VkID0gdGhpcy5lYXQoJy8nKVxuICB0aGlzLm1hdGNoKCc+Jyk7XG4gIGlmKCAhc2VsZkNsb3NlZCAmJiAhXy5pc1ZvaWRUYWcobmFtZSkgKXtcbiAgICBjaGlsZHJlbiA9IHRoaXMucHJvZ3JhbSgpO1xuICAgIGlmKCF0aGlzLmVhdCgnVEFHX0NMT1NFJywgbmFtZSkpIHRoaXMuZXJyb3IoJ2V4cGVjdCA8LycrbmFtZSsnPiBnb3QnKyAnbm8gbWF0Y2hlZCBjbG9zZVRhZycpXG4gIH1cbiAgcmV0dXJuIG5vZGUuZWxlbWVudChuYW1lLCBhdHRycywgY2hpbGRyZW4pO1xufVxuXG4vLyB4ZW50aXR5XG4vLyAgLXJ1bGUod3JhcCBhdHRyaWJ1dGUpXG4vLyAgLWF0dHJpYnV0ZVxuLy9cbi8vIF9fZXhhbXBsZV9fXG4vLyAgbmFtZSA9IDEgfCAgXG4vLyAgbmctaGlkZSB8XG4vLyAgb24tY2xpY2s9e3t9fSB8IFxuLy8gIHt7I2lmIG5hbWV9fW9uLWNsaWNrPXt7eHh9fXt7I2Vsc2V9fW9uLXRhcD17e319e3svaWZ9fVxuXG5vcC54ZW50aXR5ID0gZnVuY3Rpb24obGwpe1xuICB2YXIgbmFtZSA9IGxsLnZhbHVlLCB2YWx1ZTtcbiAgaWYobGwudHlwZSA9PT0gJ05BTUUnKXtcbiAgICBpZiggdGhpcy5lYXQoXCI9XCIpICkgdmFsdWUgPSB0aGlzLmF0dHZhbHVlKCk7XG4gICAgcmV0dXJuIG5vZGUuYXR0cmlidXRlKCBuYW1lLCB2YWx1ZSApO1xuICB9ZWxzZXtcbiAgICBpZiggbmFtZSAhPT0gJ2lmJykgdGhpcy5lcnJvcihcImN1cnJlbnQgdmVyc2lvbi4gT05MWSBSVUxFICNpZiAjZWxzZSAjZWxzZWlmIGlzIHZhbGlkIGluIHRhZywgdGhlIHJ1bGUgI1wiICsgbmFtZSArICcgaXMgaW52YWxpZCcpO1xuICAgIHJldHVybiB0aGlzWydpZiddKHRydWUpO1xuICB9XG5cbn1cblxuLy8gc3RhZyAgICAgOjo9ICAgICc8JyBOYW1lIChTIGF0dHIpKiBTPyAnPicgIFxuLy8gYXR0ciAgICA6Oj0gICAgIE5hbWUgRXEgYXR0dmFsdWVcbm9wLmF0dHJzID0gZnVuY3Rpb24oaXNBdHRyaWJ1dGUpe1xuICB2YXIgZWF0XG4gIGlmKCFpc0F0dHJpYnV0ZSl7XG4gICAgZWF0ID0gW1wiTkFNRVwiLCBcIk9QRU5cIl1cbiAgfWVsc2V7XG4gICAgZWF0ID0gW1wiTkFNRVwiXVxuICB9XG5cbiAgdmFyIGF0dHJzID0gW10sIGxsO1xuICB3aGlsZSAobGwgPSB0aGlzLmVhdChlYXQpKXtcbiAgICBhdHRycy5wdXNoKHRoaXMueGVudGl0eSggbGwgKSlcbiAgfVxuICByZXR1cm4gYXR0cnM7XG59XG5cbi8vIGF0dHZhbHVlXG4vLyAgOiBTVFJJTkcgIFxuLy8gIHwgTkFNRVxub3AuYXR0dmFsdWUgPSBmdW5jdGlvbigpe1xuICB2YXIgbGwgPSB0aGlzLmxsKCk7XG4gIHN3aXRjaChsbC50eXBlKXtcbiAgICBjYXNlIFwiTkFNRVwiOlxuICAgIGNhc2UgXCJVTlFcIjpcbiAgICBjYXNlIFwiU1RSSU5HXCI6XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICAgIHZhciB2YWx1ZSA9IGxsLnZhbHVlO1xuICAgICAgaWYofnZhbHVlLmluZGV4T2YoY29uZmlnLkJFR0lOKSAmJiB+dmFsdWUuaW5kZXhPZihjb25maWcuRU5EKSl7XG4gICAgICAgIHZhciBjb25zdGFudCA9IHRydWU7XG4gICAgICAgIHZhciBwYXJzZWQgPSBuZXcgUGFyc2VyKHZhbHVlLCB7IG1vZGU6IDIgfSkucGFyc2UoKTtcbiAgICAgICAgaWYocGFyc2VkLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRbMF0udHlwZSA9PT0gJ2V4cHJlc3Npb24nKSByZXR1cm4gcGFyc2VkWzBdO1xuICAgICAgICB2YXIgYm9keSA9IFtdO1xuICAgICAgICBwYXJzZWQuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICBpZighaXRlbS5jb25zdGFudCkgY29uc3RhbnQ9ZmFsc2U7XG4gICAgICAgICAgLy8gc2lsZW50IHRoZSBtdXRpcGxlIGludGVwbGF0aW9uXG4gICAgICAgICAgICBib2R5LnB1c2goaXRlbS5ib2R5IHx8IFwiJ1wiICsgaXRlbS50ZXh0LnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKSArIFwiJ1wiKTsgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgYm9keSA9IFwiW1wiICsgYm9keS5qb2luKFwiLFwiKSArIFwiXS5qb2luKCcnKVwiO1xuICAgICAgICB2YWx1ZSA9IG5vZGUuZXhwcmVzc2lvbihib2R5LCBudWxsLCBjb25zdGFudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgY2FzZSBcIkVYUFJfT1BFTlwiOlxuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJwbGF0aW9uKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMuZXJyb3IoJ1VuZXhwZWN0ZWQgdG9rZW46ICcrIHRoaXMubGEoKSlcbiAgfVxufVxuXG5cbi8vIHt7I319XG5vcC5kaXJlY3RpdmUgPSBmdW5jdGlvbigpe1xuICB2YXIgbmFtZSA9IHRoaXMubGwoKS52YWx1ZTtcbiAgdGhpcy5uZXh0KCk7XG4gIGlmKHR5cGVvZiB0aGlzW25hbWVdID09PSAnZnVuY3Rpb24nKXtcbiAgICByZXR1cm4gdGhpc1tuYW1lXSgpXG4gIH1lbHNle1xuICAgIHRoaXMuZXJyb3IoJ1VuZGVmaW5lZCBkaXJlY3RpdmVbJysgbmFtZSArJ10nKTtcbiAgfVxufVxuXG4vLyB7e319XG5vcC5pbnRlcnBsYXRpb24gPSBmdW5jdGlvbigpe1xuICB0aGlzLm1hdGNoKCdFWFBSX09QRU4nKTtcbiAgdmFyIHJlcyA9IHRoaXMuZXhwcmVzc2lvbih0cnVlKTtcbiAgdGhpcy5tYXRjaCgnRU5EJyk7XG4gIHJldHVybiByZXM7XG59XG5cbi8vIHt7fn19XG5vcC5pbmNsdWRlID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNvbnRlbnQgPSB0aGlzLmV4cHJlc3Npb24oKTtcbiAgdGhpcy5tYXRjaCgnRU5EJyk7XG4gIHJldHVybiBub2RlLnRlbXBsYXRlKGNvbnRlbnQpO1xufVxuXG4vLyB7eyNpZn19XG5vcFtcImlmXCJdID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHRlc3QgPSB0aGlzLmV4cHJlc3Npb24oKTtcbiAgdmFyIGNvbnNlcXVlbnQgPSBbXSwgYWx0ZXJuYXRlPVtdO1xuXG4gIHZhciBjb250YWluZXIgPSBjb25zZXF1ZW50O1xuICB2YXIgc3RhdGVtZW50ID0gIXRhZz8gXCJzdGF0ZW1lbnRcIiA6IFwiYXR0cnNcIjtcblxuICB0aGlzLm1hdGNoKCdFTkQnKTtcblxuICB2YXIgbGwsIGNsb3NlO1xuICB3aGlsZSggISAoY2xvc2UgPSB0aGlzLmVhdCgnQ0xPU0UnKSkgKXtcbiAgICBsbCA9IHRoaXMubGwoKTtcbiAgICBpZiggbGwudHlwZSA9PT0gJ09QRU4nICl7XG4gICAgICBzd2l0Y2goIGxsLnZhbHVlICl7XG4gICAgICAgIGNhc2UgJ2Vsc2UnOlxuICAgICAgICAgIGNvbnRhaW5lciA9IGFsdGVybmF0ZTtcbiAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICB0aGlzLm1hdGNoKCAnRU5EJyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdlbHNlaWYnOlxuICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgIGFsdGVybmF0ZS5wdXNoKCB0aGlzW1wiaWZcIl0odGFnKSApO1xuICAgICAgICAgIHJldHVybiBub2RlWydpZiddKCB0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUgKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb250YWluZXIucHVzaCggdGhpc1tzdGF0ZW1lbnRdKHRydWUpICk7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICBjb250YWluZXIucHVzaCh0aGlzW3N0YXRlbWVudF0odHJ1ZSkpO1xuICAgIH1cbiAgfVxuICAvLyBpZiBzdGF0ZW1lbnQgbm90IG1hdGNoZWRcbiAgaWYoY2xvc2UudmFsdWUgIT09IFwiaWZcIikgdGhpcy5lcnJvcignVW5tYXRjaGVkIGlmIGRpcmVjdGl2ZScpXG4gIHJldHVybiBub2RlW1wiaWZcIl0odGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKTtcbn1cblxuXG4vLyBAbWFyayAgIG11c3RhY2hlIHN5bnRheCBoYXZlIG5hdHJ1cmUgZGlzLCBjYW5vdCB3aXRoIGV4cHJlc3Npb25cbi8vIHt7I2xpc3R9fVxub3AubGlzdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIHNlcXVlbmNlIGNhbiBiZSBhIGxpc3Qgb3IgaGFzaFxuICB2YXIgc2VxdWVuY2UgPSB0aGlzLmV4cHJlc3Npb24oKSwgdmFyaWFibGUsIGxsO1xuICB2YXIgY29uc2VxdWVudCA9IFtdLCBhbHRlcm5hdGU9W107XG4gIHZhciBjb250YWluZXIgPSBjb25zZXF1ZW50O1xuXG4gIHRoaXMubWF0Y2goJ0lERU5UJywgJ2FzJyk7XG5cbiAgdmFyaWFibGUgPSB0aGlzLm1hdGNoKCdJREVOVCcpLnZhbHVlO1xuXG4gIHRoaXMubWF0Y2goJ0VORCcpO1xuXG4gIHdoaWxlKCAhKGxsID0gdGhpcy5lYXQoJ0NMT1NFJykpICl7XG4gICAgaWYodGhpcy5lYXQoJ09QRU4nLCAnZWxzZScpKXtcbiAgICAgIGNvbnRhaW5lciA9ICBhbHRlcm5hdGU7XG4gICAgICB0aGlzLm1hdGNoKCdFTkQnKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnRhaW5lci5wdXNoKHRoaXMuc3RhdGVtZW50KCkpO1xuICAgIH1cbiAgfVxuICBpZihsbC52YWx1ZSAhPT0gJ2xpc3QnKSB0aGlzLmVycm9yKCdleHBlY3QgJyArICdsaXN0IGdvdCAnICsgJy8nICsgbGwudmFsdWUgKyAnICcsIGxsLnBvcyApO1xuICByZXR1cm4gbm9kZS5saXN0KHNlcXVlbmNlLCB2YXJpYWJsZSwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKTtcbn1cblxuXG5vcC5leHByZXNzaW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIGV4cHJlc3Npb247XG4gIGlmKHRoaXMuZWF0KCdAKCcpKXsgLy9vbmNlIGJpbmRcbiAgICBleHByZXNzaW9uID0gdGhpcy5leHByKCk7XG4gICAgZXhwcmVzc2lvbi5vbmNlID0gdHJ1ZTtcbiAgICB0aGlzLm1hdGNoKCcpJylcbiAgfWVsc2V7XG4gICAgZXhwcmVzc2lvbiA9IHRoaXMuZXhwcigpO1xuICB9XG4gIHJldHVybiBleHByZXNzaW9uO1xufVxuXG5vcC5leHByID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5kZXBlbmQgPSBbXTtcblxuICB2YXIgYnVmZmVyID0gdGhpcy5maWx0ZXIoKVxuXG4gIHZhciBib2R5ID0gYnVmZmVyLmdldCB8fCBidWZmZXI7XG4gIHZhciBzZXRib2R5ID0gYnVmZmVyLnNldDtcbiAgcmV0dXJuIG5vZGUuZXhwcmVzc2lvbihib2R5LCBzZXRib2R5LCAhdGhpcy5kZXBlbmQubGVuZ3RoKTtcbn1cblxuXG4vLyBmaWx0ZXJcbi8vIGFzc2lnbiAoJ3wnIGZpbHRlcm5hbWVbJzonIGFyZ3NdKSAqIFxub3AuZmlsdGVyID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLmFzc2lnbigpO1xuICB2YXIgbGwgPSB0aGlzLmVhdCgnfCcpO1xuICB2YXIgYnVmZmVyID0gW10sIHNldEJ1ZmZlciwgcHJlZml4LFxuICAgIGF0dHIgPSBcInRcIiwgXG4gICAgc2V0ID0gbGVmdC5zZXQsIGdldCwgXG4gICAgdG1wID0gXCJcIjtcblxuICBpZihsbCl7XG4gICAgaWYoc2V0KSBzZXRCdWZmZXIgPSBbXTtcblxuICAgIHByZWZpeCA9IFwiKGZ1bmN0aW9uKFwiICsgYXR0ciArIFwiKXtcIjtcblxuICAgIGRve1xuICAgICAgdG1wID0gYXR0ciArIFwiID0gXCIgKyBjdHhOYW1lICsgXCIuX2ZfKCdcIiArIHRoaXMubWF0Y2goJ0lERU5UJykudmFsdWUrIFwiJyApLmdldC5jYWxsKCBcIitfLmN0eE5hbWUgK1wiLFwiICsgYXR0ciA7XG4gICAgICBpZih0aGlzLmVhdCgnOicpKXtcbiAgICAgICAgdG1wICs9XCIsIFwiKyB0aGlzLmFyZ3VtZW50cyhcInxcIikuam9pbihcIixcIikgKyBcIik7XCJcbiAgICAgIH1lbHNle1xuICAgICAgICB0bXAgKz0gJyk7J1xuICAgICAgfVxuICAgICAgYnVmZmVyLnB1c2godG1wKTtcbiAgICAgIHNldEJ1ZmZlciAmJiBzZXRCdWZmZXIudW5zaGlmdCggdG1wLnJlcGxhY2UoXCIgKS5nZXQuY2FsbFwiLCBcIiApLnNldC5jYWxsXCIpICk7XG5cbiAgICB9d2hpbGUobGwgPSB0aGlzLmVhdCgnfCcpKTtcbiAgICBidWZmZXIucHVzaChcInJldHVybiBcIiArIGF0dHIgKTtcbiAgICBzZXRCdWZmZXIgJiYgc2V0QnVmZmVyLnB1c2goXCJyZXR1cm4gXCIgKyBhdHRyKTtcblxuICAgIGdldCA9ICBwcmVmaXggKyBidWZmZXIuam9pbihcIlwiKSArIFwifSkoXCIrbGVmdC5nZXQrXCIpXCI7XG4gICAgLy8gd2UgY2FsbCBiYWNrIHRvIHZhbHVlLlxuICAgIGlmKHNldEJ1ZmZlcil7XG4gICAgICAvLyBjaGFuZ2UgX3NzX18obmFtZSwgX3BfKSB0byBfc19fKG5hbWUsIGZpbHRlckZuKF9wXykpO1xuICAgICAgc2V0ID0gc2V0LnJlcGxhY2UoXy5zZXROYW1lLCBcbiAgICAgICAgcHJlZml4ICsgc2V0QnVmZmVyLmpvaW4oXCJcIikgKyBcIn0pKFwiK+OAgF8uc2V0TmFtZeOAgCtcIilcIiApO1xuXG4gICAgfVxuICAgIC8vIHRoZSBzZXQgZnVuY3Rpb24gaXMgZGVwZW5kIG9uIHRoZSBmaWx0ZXIgZGVmaW5pdGlvbi4gaWYgaXQgaGF2ZSBzZXQgbWV0aG9kLCB0aGUgc2V0IHdpbGwgd29ya1xuICAgIHJldHVybiB0aGlzLmdldHNldChnZXQsIHNldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnQ7XG59XG5cbi8vIGFzc2lnblxuLy8gbGVmdC1oYW5kLWV4cHIgPSBjb25kaXRpb25cbm9wLmFzc2lnbiA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy5jb25kaXRpb24oKSwgbGw7XG4gIGlmKGxsID0gdGhpcy5lYXQoWyc9JywgJys9JywgJy09JywgJyo9JywgJy89JywgJyU9J10pKXtcbiAgICBpZighbGVmdC5zZXQpIHRoaXMuZXJyb3IoJ2ludmFsaWQgbGVmdGhhbmQgZXhwcmVzc2lvbiBpbiBhc3NpZ25tZW50IGV4cHJlc3Npb24nKTtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQoIGxlZnQuc2V0LnJlcGxhY2UoIFwiLFwiICsgXy5zZXROYW1lLCBcIixcIiArIHRoaXMuY29uZGl0aW9uKCkuZ2V0ICkucmVwbGFjZShcIic9J1wiLCBcIidcIitsbC50eXBlK1wiJ1wiKSwgbGVmdC5zZXQpO1xuICAgIC8vIHJldHVybiB0aGlzLmdldHNldCgnKCcgKyBsZWZ0LmdldCArIGxsLnR5cGUgICsgdGhpcy5jb25kaXRpb24oKS5nZXQgKyAnKScsIGxlZnQuc2V0KTtcbiAgfVxuICByZXR1cm4gbGVmdDtcbn1cblxuLy8gb3Jcbi8vIG9yID8gYXNzaWduIDogYXNzaWduXG5vcC5jb25kaXRpb24gPSBmdW5jdGlvbigpe1xuXG4gIHZhciB0ZXN0ID0gdGhpcy5vcigpO1xuICBpZih0aGlzLmVhdCgnPycpKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQoW3Rlc3QuZ2V0ICsgXCI/XCIsIFxuICAgICAgdGhpcy5hc3NpZ24oKS5nZXQsIFxuICAgICAgdGhpcy5tYXRjaChcIjpcIikudHlwZSwgXG4gICAgICB0aGlzLmFzc2lnbigpLmdldF0uam9pbihcIlwiKSk7XG4gIH1cblxuICByZXR1cm4gdGVzdDtcbn1cblxuLy8gYW5kXG4vLyBhbmQgJiYgb3Jcbm9wLm9yID0gZnVuY3Rpb24oKXtcblxuICB2YXIgbGVmdCA9IHRoaXMuYW5kKCk7XG5cbiAgaWYodGhpcy5lYXQoJ3x8Jykpe1xuICAgIHJldHVybiB0aGlzLmdldHNldChsZWZ0LmdldCArICd8fCcgKyB0aGlzLm9yKCkuZ2V0KTtcbiAgfVxuXG4gIHJldHVybiBsZWZ0O1xufVxuLy8gZXF1YWxcbi8vIGVxdWFsICYmIGFuZFxub3AuYW5kID0gZnVuY3Rpb24oKXtcblxuICB2YXIgbGVmdCA9IHRoaXMuZXF1YWwoKTtcblxuICBpZih0aGlzLmVhdCgnJiYnKSl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGxlZnQuZ2V0ICsgJyYmJyArIHRoaXMuYW5kKCkuZ2V0KTtcbiAgfVxuICByZXR1cm4gbGVmdDtcbn1cbi8vIHJlbGF0aW9uXG4vLyBcbi8vIGVxdWFsID09IHJlbGF0aW9uXG4vLyBlcXVhbCAhPSByZWxhdGlvblxuLy8gZXF1YWwgPT09IHJlbGF0aW9uXG4vLyBlcXVhbCAhPT0gcmVsYXRpb25cbm9wLmVxdWFsID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLnJlbGF0aW9uKCksIGxsO1xuICAvLyBAcGVyZjtcbiAgaWYoIGxsID0gdGhpcy5lYXQoWyc9PScsJyE9JywgJz09PScsICchPT0nXSkpe1xuICAgIHJldHVybiB0aGlzLmdldHNldChsZWZ0LmdldCArIGxsLnR5cGUgKyB0aGlzLmVxdWFsKCkuZ2V0KTtcbiAgfVxuICByZXR1cm4gbGVmdFxufVxuLy8gcmVsYXRpb24gPCBhZGRpdGl2ZVxuLy8gcmVsYXRpb24gPiBhZGRpdGl2ZVxuLy8gcmVsYXRpb24gPD0gYWRkaXRpdmVcbi8vIHJlbGF0aW9uID49IGFkZGl0aXZlXG4vLyByZWxhdGlvbiBpbiBhZGRpdGl2ZVxub3AucmVsYXRpb24gPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMuYWRkaXRpdmUoKSwgbGw7XG4gIC8vIEBwZXJmXG4gIGlmKGxsID0gKHRoaXMuZWF0KFsnPCcsICc+JywgJz49JywgJzw9J10pIHx8IHRoaXMuZWF0KCdJREVOVCcsICdpbicpICkpe1xuICAgIHJldHVybiB0aGlzLmdldHNldChsZWZ0LmdldCArIGxsLnZhbHVlICsgdGhpcy5yZWxhdGlvbigpLmdldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnRcbn1cbi8vIGFkZGl0aXZlIDpcbi8vIG11bHRpdmVcbi8vIGFkZGl0aXZlICsgbXVsdGl2ZVxuLy8gYWRkaXRpdmUgLSBtdWx0aXZlXG5vcC5hZGRpdGl2ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy5tdWx0aXZlKCkgLGxsO1xuICBpZihsbD0gdGhpcy5lYXQoWycrJywnLSddKSApe1xuICAgIHJldHVybiB0aGlzLmdldHNldChsZWZ0LmdldCArIGxsLnZhbHVlICsgdGhpcy5hZGRpdGl2ZSgpLmdldCk7XG4gIH1cbiAgcmV0dXJuIGxlZnRcbn1cbi8vIG11bHRpdmUgOlxuLy8gdW5hcnlcbi8vIG11bHRpdmUgKiB1bmFyeVxuLy8gbXVsdGl2ZSAvIHVuYXJ5XG4vLyBtdWx0aXZlICUgdW5hcnlcbm9wLm11bHRpdmUgPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMucmFuZ2UoKSAsbGw7XG4gIGlmKCBsbCA9IHRoaXMuZWF0KFsnKicsICcvJyAsJyUnXSkgKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyBsbC50eXBlICsgdGhpcy5tdWx0aXZlKCkuZ2V0KTtcbiAgfVxuICByZXR1cm4gbGVmdDtcbn1cblxub3AucmFuZ2UgPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMudW5hcnkoKSwgbGwsIHJpZ2h0O1xuXG4gIGlmKGxsID0gdGhpcy5lYXQoJy4uJykpe1xuICAgIHJpZ2h0ID0gdGhpcy51bmFyeSgpO1xuICAgIHZhciBib2R5ID0gXG4gICAgICBcIihmdW5jdGlvbihzdGFydCxlbmQpe3ZhciByZXMgPSBbXSxzdGVwPWVuZD5zdGFydD8xOi0xOyBmb3IodmFyIGkgPSBzdGFydDsgZW5kPnN0YXJ0P2kgPD0gZW5kOiBpPj1lbmQ7IGk9aStzdGVwKXtyZXMucHVzaChpKTsgfSByZXR1cm4gcmVzIH0pKFwiK2xlZnQuZ2V0K1wiLFwiK3JpZ2h0LmdldCtcIilcIlxuICAgIHJldHVybiB0aGlzLmdldHNldChib2R5KTtcbiAgfVxuXG4gIHJldHVybiBsZWZ0O1xufVxuXG5cblxuLy8gbGVmdGhhbmRcbi8vICsgdW5hcnlcbi8vIC0gdW5hcnlcbi8vIH4gdW5hcnlcbi8vICEgdW5hcnlcbm9wLnVuYXJ5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxsO1xuICBpZihsbCA9IHRoaXMuZWF0KFsnKycsJy0nLCd+JywgJyEnXSkpe1xuICAgIHJldHVybiB0aGlzLmdldHNldCgnKCcgKyBsbC50eXBlICsgdGhpcy51bmFyeSgpLmdldCArICcpJykgO1xuICB9ZWxzZXtcbiAgICByZXR1cm4gdGhpcy5tZW1iZXIoKVxuICB9XG59XG5cbi8vIGNhbGxbbGVmdGhhbmRdIDpcbi8vIG1lbWJlciBhcmdzXG4vLyBtZW1iZXIgWyBleHByZXNzaW9uIF1cbi8vIG1lbWJlciAuIGlkZW50ICBcblxub3AubWVtYmVyID0gZnVuY3Rpb24oYmFzZSwgbGFzdCwgcGF0aGVzLCBwcmV2QmFzZSl7XG4gIHZhciBsbCwgcGF0aCwgZXh0VmFsdWU7XG5cblxuICB2YXIgb25seVNpbXBsZUFjY2Vzc29yID0gZmFsc2U7XG4gIGlmKCFiYXNlKXsgLy9maXJzdFxuICAgIHBhdGggPSB0aGlzLnByaW1hcnkoKTtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBwYXRoO1xuICAgIGlmKHR5cGUgPT09ICdzdHJpbmcnKXsgXG4gICAgICBwYXRoZXMgPSBbXTtcbiAgICAgIHBhdGhlcy5wdXNoKCBwYXRoICk7XG4gICAgICBsYXN0ID0gcGF0aDtcbiAgICAgIGV4dFZhbHVlID0gZXh0TmFtZSArIFwiLlwiICsgcGF0aFxuICAgICAgYmFzZSA9IGN0eE5hbWUgKyBcIi5fc2dfKCdcIiArIHBhdGggKyBcIicsIFwiICsgdmFyTmFtZSArIFwiLCBcIiArIGV4dE5hbWUgKyBcIilcIjtcbiAgICAgIG9ubHlTaW1wbGVBY2Nlc3NvciA9IHRydWU7XG4gICAgfWVsc2V7IC8vUHJpbWF0aXZlIFR5cGVcbiAgICAgIGlmKHBhdGguZ2V0ID09PSAndGhpcycpe1xuICAgICAgICBiYXNlID0gY3R4TmFtZTtcbiAgICAgICAgcGF0aGVzID0gWyd0aGlzJ107XG4gICAgICB9ZWxzZXtcbiAgICAgICAgcGF0aGVzID0gbnVsbDtcbiAgICAgICAgYmFzZSA9IHBhdGguZ2V0O1xuICAgICAgfVxuICAgIH1cbiAgfWVsc2V7IC8vIG5vdCBmaXJzdCBlbnRlclxuICAgIGlmKHR5cGVvZiBsYXN0ID09PSAnc3RyaW5nJyAmJiBpc1BhdGgoIGxhc3QpICl7IC8vIGlzIHZhbGlkIHBhdGhcbiAgICAgIHBhdGhlcy5wdXNoKGxhc3QpO1xuICAgIH1lbHNle1xuICAgICAgaWYocGF0aGVzICYmIHBhdGhlcy5sZW5ndGgpIHRoaXMuZGVwZW5kLnB1c2gocGF0aGVzKTtcbiAgICAgIHBhdGhlcyA9IG51bGw7XG4gICAgfVxuICB9XG4gIGlmKGxsID0gdGhpcy5lYXQoWydbJywgJy4nLCAnKCddKSl7XG4gICAgc3dpdGNoKGxsLnR5cGUpe1xuICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgLy8gbWVtYmVyKG9iamVjdCwgcHJvcGVydHksIGNvbXB1dGVkKVxuICAgICAgICB2YXIgdG1wTmFtZSA9IHRoaXMubWF0Y2goJ0lERU5UJykudmFsdWU7XG4gICAgICAgIHByZXZCYXNlID0gYmFzZTtcbiAgICAgICAgaWYoIHRoaXMubGEoKSAhPT0gXCIoXCIgKXsgXG4gICAgICAgICAgYmFzZSA9IGN0eE5hbWUgKyBcIi5fc2dfKCdcIiArIHRtcE5hbWUgKyBcIicsIFwiICsgYmFzZSArIFwiKVwiO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBiYXNlICs9IFwiWydcIiArIHRtcE5hbWUgKyBcIiddXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVyKCBiYXNlLCB0bXBOYW1lLCBwYXRoZXMsICBwcmV2QmFzZSk7XG4gICAgICBjYXNlICdbJzpcbiAgICAgICAgICAvLyBtZW1iZXIob2JqZWN0LCBwcm9wZXJ0eSwgY29tcHV0ZWQpXG4gICAgICAgIHBhdGggPSB0aGlzLmFzc2lnbigpO1xuICAgICAgICBwcmV2QmFzZSA9IGJhc2U7XG4gICAgICAgIGlmKCB0aGlzLmxhKCkgIT09IFwiKFwiICl7IFxuICAgICAgICAvLyBtZWFucyBmdW5jdGlvbiBjYWxsLCB3ZSBuZWVkIHRocm93IHVuZGVmaW5lZCBlcnJvciB3aGVuIGNhbGwgZnVuY3Rpb25cbiAgICAgICAgLy8gYW5kIGNvbmZpcm0gdGhhdCB0aGUgZnVuY3Rpb24gY2FsbCB3b250IGxvc2UgaXRzIGNvbnRleHRcbiAgICAgICAgICBiYXNlID0gY3R4TmFtZSArIFwiLl9zZ18oXCIgKyBwYXRoLmdldCArIFwiLCBcIiArIGJhc2UgKyBcIilcIjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgYmFzZSArPSBcIltcIiArIHBhdGguZ2V0ICsgXCJdXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRjaCgnXScpXG4gICAgICAgIHJldHVybiB0aGlzLm1lbWJlcihiYXNlLCBwYXRoLCBwYXRoZXMsIHByZXZCYXNlKTtcbiAgICAgIGNhc2UgJygnOlxuICAgICAgICAvLyBjYWxsKGNhbGxlZSwgYXJncylcbiAgICAgICAgdmFyIGFyZ3MgPSB0aGlzLmFyZ3VtZW50cygpLmpvaW4oJywnKTtcbiAgICAgICAgYmFzZSA9ICBiYXNlK1wiKFwiICsgYXJncyArXCIpXCI7XG4gICAgICAgIHRoaXMubWF0Y2goJyknKVxuICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXIoYmFzZSwgbnVsbCwgcGF0aGVzKTtcbiAgICB9XG4gIH1cbiAgaWYoIHBhdGhlcyAmJiBwYXRoZXMubGVuZ3RoICkgdGhpcy5kZXBlbmQucHVzaCggcGF0aGVzICk7XG4gIHZhciByZXMgPSAge2dldDogYmFzZX07XG4gIGlmKGxhc3Qpe1xuICAgIHJlcy5zZXQgPSBjdHhOYW1lICsgXCIuX3NzXyhcIiArIFxuICAgICAgICAobGFzdC5nZXQ/IGxhc3QuZ2V0IDogXCInXCIrIGxhc3QgKyBcIidcIikgKyBcbiAgICAgICAgXCIsXCIrIF8uc2V0TmFtZSArIFwiLFwiKyBcbiAgICAgICAgKHByZXZCYXNlP3ByZXZCYXNlOl8udmFyTmFtZSkgKyBcbiAgICAgICAgXCIsICc9JywgXCIrICggb25seVNpbXBsZUFjY2Vzc29yPyAxIDogMCApICsgXCIpXCI7XG4gIFxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogXG4gKi9cbm9wLmFyZ3VtZW50cyA9IGZ1bmN0aW9uKGVuZCl7XG4gIGVuZCA9IGVuZCB8fCAnKSdcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZG97XG4gICAgaWYodGhpcy5sYSgpICE9PSBlbmQpe1xuICAgICAgYXJncy5wdXNoKHRoaXMuYXNzaWduKCkuZ2V0KVxuICAgIH1cbiAgfXdoaWxlKCB0aGlzLmVhdCgnLCcpKTtcbiAgcmV0dXJuIGFyZ3Ncbn1cblxuXG4vLyBwcmltYXJ5IDpcbi8vIHRoaXMgXG4vLyBpZGVudFxuLy8gbGl0ZXJhbFxuLy8gYXJyYXlcbi8vIG9iamVjdFxuLy8gKCBleHByZXNzaW9uIClcblxub3AucHJpbWFyeSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsbCA9IHRoaXMubGwoKTtcbiAgc3dpdGNoKGxsLnR5cGUpe1xuICAgIGNhc2UgXCJ7XCI6XG4gICAgICByZXR1cm4gdGhpcy5vYmplY3QoKTtcbiAgICBjYXNlIFwiW1wiOlxuICAgICAgcmV0dXJuIHRoaXMuYXJyYXkoKTtcbiAgICBjYXNlIFwiKFwiOlxuICAgICAgcmV0dXJuIHRoaXMucGFyZW4oKTtcbiAgICAvLyBsaXRlcmFsIG9yIGlkZW50XG4gICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0c2V0KFwiJ1wiICsgbGwudmFsdWUgKyBcIidcIilcbiAgICBjYXNlICdOVU1CRVInOlxuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICByZXR1cm4gdGhpcy5nZXRzZXQoXCJcIitsbC52YWx1ZSk7XG4gICAgY2FzZSBcIklERU5UXCI6XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICAgIGlmKGlzS2V5V29yZChsbC52YWx1ZSkpe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRzZXQoIGxsLnZhbHVlICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGwudmFsdWU7XG4gICAgZGVmYXVsdDogXG4gICAgICB0aGlzLmVycm9yKCdVbmV4cGVjdGVkIFRva2VuOiAnICsgbGwudHlwZSk7XG4gIH1cbn1cblxuLy8gb2JqZWN0XG4vLyAge3Byb3BBc3NpZ24gWywgcHJvcEFzc2lnbl0gKiBbLF19XG5cbi8vIHByb3BBc3NpZ25cbi8vICBwcm9wIDogYXNzaWduXG5cbi8vIHByb3Bcbi8vICBTVFJJTkdcbi8vICBJREVOVFxuLy8gIE5VTUJFUlxuXG5vcC5vYmplY3QgPSBmdW5jdGlvbigpe1xuICB2YXIgY29kZSA9IFt0aGlzLm1hdGNoKCd7JykudHlwZV07XG5cbiAgdmFyIGxsID0gdGhpcy5lYXQoIFsnU1RSSU5HJywgJ0lERU5UJywgJ05VTUJFUiddICk7XG4gIHdoaWxlKGxsKXtcbiAgICBjb2RlLnB1c2goXCInXCIgKyBsbC52YWx1ZSArIFwiJ1wiICsgdGhpcy5tYXRjaCgnOicpLnR5cGUpO1xuICAgIHZhciBnZXQgPSB0aGlzLmFzc2lnbigpLmdldDtcbiAgICBjb2RlLnB1c2goZ2V0KTtcbiAgICBsbCA9IG51bGw7XG4gICAgaWYodGhpcy5lYXQoXCIsXCIpICYmIChsbCA9IHRoaXMuZWF0KFsnU1RSSU5HJywgJ0lERU5UJywgJ05VTUJFUiddKSkgKSBjb2RlLnB1c2goXCIsXCIpO1xuICB9XG4gIGNvZGUucHVzaCh0aGlzLm1hdGNoKCd9JykudHlwZSk7XG4gIHJldHVybiB7Z2V0OiBjb2RlLmpvaW4oXCJcIil9XG59XG5cbi8vIGFycmF5XG4vLyBbIGFzc2lnblssYXNzaWduXSpdXG5vcC5hcnJheSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBjb2RlID0gW3RoaXMubWF0Y2goJ1snKS50eXBlXSwgaXRlbTtcbiAgaWYoIHRoaXMuZWF0KFwiXVwiKSApe1xuXG4gICAgIGNvZGUucHVzaChcIl1cIik7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUoaXRlbSA9IHRoaXMuYXNzaWduKCkpe1xuICAgICAgY29kZS5wdXNoKGl0ZW0uZ2V0KTtcbiAgICAgIGlmKHRoaXMuZWF0KCcsJykpIGNvZGUucHVzaChcIixcIik7XG4gICAgICBlbHNlIGJyZWFrO1xuICAgIH1cbiAgICBjb2RlLnB1c2godGhpcy5tYXRjaCgnXScpLnR5cGUpO1xuICB9XG4gIHJldHVybiB7Z2V0OiBjb2RlLmpvaW4oXCJcIil9O1xufVxuXG4vLyAnKCcgZXhwcmVzc2lvbiAnKSdcbm9wLnBhcmVuID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5tYXRjaCgnKCcpO1xuICB2YXIgcmVzID0gdGhpcy5maWx0ZXIoKVxuICByZXMuZ2V0ID0gJygnICsgcmVzLmdldCArICcpJztcbiAgdGhpcy5tYXRjaCgnKScpO1xuICByZXR1cm4gcmVzO1xufVxuXG5vcC5nZXRzZXQgPSBmdW5jdGlvbihnZXQsIHNldCl7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBnZXQsXG4gICAgc2V0OiBzZXRcbiAgfVxufVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZWxlbWVudDogZnVuY3Rpb24obmFtZSwgYXR0cnMsIGNoaWxkcmVuKXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2VsZW1lbnQnLFxuICAgICAgdGFnOiBuYW1lLFxuICAgICAgYXR0cnM6IGF0dHJzLFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgfVxuICB9LFxuICBhdHRyaWJ1dGU6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2F0dHJpYnV0ZScsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfVxuICB9LFxuICBcImlmXCI6IGZ1bmN0aW9uKHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdpZicsXG4gICAgICB0ZXN0OiB0ZXN0LFxuICAgICAgY29uc2VxdWVudDogY29uc2VxdWVudCxcbiAgICAgIGFsdGVybmF0ZTogYWx0ZXJuYXRlXG4gICAgfVxuICB9LFxuICBsaXN0OiBmdW5jdGlvbihzZXF1ZW5jZSwgdmFyaWFibGUsIGJvZHkpe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnbGlzdCcsXG4gICAgICBzZXF1ZW5jZTogc2VxdWVuY2UsXG4gICAgICB2YXJpYWJsZTogdmFyaWFibGUsXG4gICAgICBib2R5OiBib2R5XG4gICAgfVxuICB9LFxuICBleHByZXNzaW9uOiBmdW5jdGlvbiggYm9keSwgc2V0Ym9keSwgY29uc3RhbnQgKXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJleHByZXNzaW9uXCIsXG4gICAgICBib2R5OiBib2R5LFxuICAgICAgY29uc3RhbnQ6IGNvbnN0YW50IHx8IGZhbHNlLFxuICAgICAgc2V0Ym9keTogc2V0Ym9keSB8fCBmYWxzZVxuICAgIH1cbiAgfSxcbiAgdGV4dDogZnVuY3Rpb24odGV4dCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgdGV4dDogdGV4dFxuICAgIH1cbiAgfSxcbiAgdGVtcGxhdGU6IGZ1bmN0aW9uKHRlbXBsYXRlKXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3RlbXBsYXRlJyxcbiAgICAgIGNvbnRlbnQ6IHRlbXBsYXRlXG4gICAgfVxuICB9XG59XG4iLCJyZXF1aXJlKCcuL2hlbHBlci9zaGltLmpzJyk7XG52YXIgXyAgPSBtb2R1bGUuZXhwb3J0cztcbnZhciBlbnRpdGllcyA9IHJlcXVpcmUoJy4vaGVscGVyL2VudGl0aWVzLmpzJyk7XG52YXIgc2xpY2UgPSBbXS5zbGljZTtcbnZhciBvMnN0ciA9ICh7fSkudG9TdHJpbmc7XG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0ndW5kZWZpbmVkJz8gd2luZG93OiBnbG9iYWw7XG5cblxuXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXy51aWQgPSAoZnVuY3Rpb24oKXtcbiAgdmFyIF91aWQ9MDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF91aWQrKztcbiAgfVxufSkoKTtcblxuXy52YXJOYW1lID0gJ2QnO1xuXy5zZXROYW1lID0gJ3BfJztcbl8uY3R4TmFtZSA9ICdjJztcbl8uZXh0TmFtZSA9ICdlJztcblxuXy5yV29yZCA9IC9eW1xcJFxcd10rJC87XG5fLnJTaW1wbGVBY2Nlc3NvciA9IC9eW1xcJFxcd10rKFxcLltcXCRcXHddKykqJC87XG5cbl8ubmV4dFRpY2sgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nPyBcbiAgc2V0SW1tZWRpYXRlLmJpbmQod2luKSA6IFxuICBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApIFxuICB9XG5cblxuXG5fLnByZWZpeCA9IFwidmFyIFwiICsgXy52YXJOYW1lICsgXCI9XCIgKyBfLmN0eE5hbWUgKyBcIi5kYXRhO1wiICsgIF8uZXh0TmFtZSAgKyBcIj1cIiArIF8uZXh0TmFtZSArIFwifHwnJztcIjtcblxuXG5fLnNsaWNlID0gZnVuY3Rpb24ob2JqLCBzdGFydCwgZW5kKXtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IodmFyIGkgPSBzdGFydCB8fCAwLCBsZW4gPSBlbmQgfHwgb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICB2YXIgaXRlbSA9IG9ialtpXTtcbiAgICByZXMucHVzaChpdGVtKVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbl8udHlwZU9mID0gZnVuY3Rpb24gKG8pIHtcbiAgcmV0dXJuIG8gPT0gbnVsbCA/IFN0cmluZyhvKSA6IG8yc3RyLmNhbGwobykuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCk7XG59XG5cblxuXy5leHRlbmQgPSBmdW5jdGlvbiggbzEsIG8yLCBvdmVycmlkZSApe1xuICBpZihfLnR5cGVPZihvdmVycmlkZSkgPT09ICdhcnJheScpe1xuICAgZm9yKHZhciBpID0gMCwgbGVuID0gb3ZlcnJpZGUubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcbiAgICB2YXIga2V5ID0gb3ZlcnJpZGVbaV07XG4gICAgbzFba2V5XSA9IG8yW2tleV07XG4gICB9IFxuICB9ZWxzZXtcbiAgICBmb3IodmFyIGkgaW4gbzIpe1xuICAgICAgaWYoIHR5cGVvZiBvMVtpXSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvdmVycmlkZSA9PT0gdHJ1ZSApe1xuICAgICAgICBvMVtpXSA9IG8yW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvMTtcbn1cblxuXy5tYWtlUHJlZGljYXRlID0gZnVuY3Rpb24gbWFrZVByZWRpY2F0ZSh3b3JkcywgcHJlZml4KSB7XG4gICAgaWYgKHR5cGVvZiB3b3JkcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB3b3JkcyA9IHdvcmRzLnNwbGl0KFwiIFwiKTtcbiAgICB9XG4gICAgdmFyIGYgPSBcIlwiLFxuICAgIGNhdHMgPSBbXTtcbiAgICBvdXQ6IGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYXRzLmxlbmd0aDsgKytqKXtcbiAgICAgICAgICBpZiAoY2F0c1tqXVswXS5sZW5ndGggPT09IHdvcmRzW2ldLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjYXRzW2pdLnB1c2god29yZHNbaV0pO1xuICAgICAgICAgICAgICBjb250aW51ZSBvdXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdHMucHVzaChbd29yZHNbaV1dKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcGFyZVRvKGFycikge1xuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGYgKz0gXCJyZXR1cm4gc3RyID09PSAnXCIgKyBhcnJbMF0gKyBcIic7XCI7XG4gICAgICAgIGYgKz0gXCJzd2l0Y2goc3RyKXtcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICBmICs9IFwiY2FzZSAnXCIgKyBhcnJbaV0gKyBcIic6XCI7XG4gICAgICAgIH1cbiAgICAgICAgZiArPSBcInJldHVybiB0cnVlfXJldHVybiBmYWxzZTtcIjtcbiAgICB9XG5cbiAgICAvLyBXaGVuIHRoZXJlIGFyZSBtb3JlIHRoYW4gdGhyZWUgbGVuZ3RoIGNhdGVnb3JpZXMsIGFuIG91dGVyXG4gICAgLy8gc3dpdGNoIGZpcnN0IGRpc3BhdGNoZXMgb24gdGhlIGxlbmd0aHMsIHRvIHNhdmUgb24gY29tcGFyaXNvbnMuXG4gICAgaWYgKGNhdHMubGVuZ3RoID4gMykge1xuICAgICAgICBjYXRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgICAgIH0pO1xuICAgICAgICBmICs9IFwic3dpdGNoKHN0ci5sZW5ndGgpe1wiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjYXQgPSBjYXRzW2ldO1xuICAgICAgICAgICAgZiArPSBcImNhc2UgXCIgKyBjYXRbMF0ubGVuZ3RoICsgXCI6XCI7XG4gICAgICAgICAgICBjb21wYXJlVG8oY2F0KTtcbiAgICAgICAgfVxuICAgICAgICBmICs9IFwifVwiO1xuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgc2ltcGx5IGdlbmVyYXRlIGEgZmxhdCBgc3dpdGNoYCBzdGF0ZW1lbnQuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29tcGFyZVRvKHdvcmRzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcInN0clwiLCBmKTtcbn1cblxuXG5fLnRyYWNrRXJyb3JQb3MgPSAoZnVuY3Rpb24gKCl7XG4gIC8vIGxpbmVicmVha1xuICB2YXIgbGIgPSAvXFxyXFxufFtcXG5cXHJcXHUyMDI4XFx1MjAyOV0vZztcbiAgZnVuY3Rpb24gZmluZExpbmUobGluZXMsIHBvcyl7XG4gICAgdmFyIHRtcExlbiA9IDA7XG4gICAgZm9yKHZhciBpID0gMCxsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICB2YXIgbGluZUxlbiA9IChsaW5lc1tpXSB8fCBcIlwiKS5sZW5ndGg7XG4gICAgICBpZih0bXBMZW4gKyBsaW5lTGVuID4gcG9zKSByZXR1cm4ge251bTogaSwgbGluZTogbGluZXNbaV0sIHN0YXJ0OiBwb3MgLSB0bXBMZW59O1xuICAgICAgLy8gMSBpcyBmb3IgdGhlIGxpbmVicmVha1xuICAgICAgdG1wTGVuID0gdG1wTGVuICsgbGluZUxlbiArIDE7XG4gICAgfVxuICAgIFxuICB9XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCwgcG9zKXtcbiAgICBpZihwb3MgPiBpbnB1dC5sZW5ndGgtMSkgcG9zID0gaW5wdXQubGVuZ3RoLTE7XG4gICAgbGIubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbGluZXMgPSBpbnB1dC5zcGxpdChsYik7XG4gICAgdmFyIGxpbmUgPSBmaW5kTGluZShsaW5lcyxwb3MpO1xuICAgIHZhciBsZW4gPSBsaW5lLmxpbmUubGVuZ3RoO1xuXG4gICAgdmFyIG1pbiA9IGxpbmUuc3RhcnQgLSAxMDtcbiAgICBpZihtaW4gPCAwKSBtaW4gPSAwO1xuXG4gICAgdmFyIG1heCA9IGxpbmUuc3RhcnQgKyAxMDtcbiAgICBpZihtYXggPiBsZW4pIG1heCA9IGxlbjtcblxuICAgIHZhciByZW1haW4gPSBsaW5lLmxpbmUuc2xpY2UobWluLCBtYXgpO1xuICAgIHZhciBwcmVmaXggPSAobGluZS5udW0rMSkgKyBcIj4gXCIgKyAobWluID4gMD8gXCIuLi5cIiA6IFwiXCIpXG4gICAgdmFyIHBvc3RmaXggPSBtYXggPCBsZW4gPyBcIi4uLlwiOiBcIlwiO1xuXG4gICAgcmV0dXJuIHByZWZpeCArIHJlbWFpbiArIHBvc3RmaXggKyBcIlxcblwiICsgbmV3IEFycmF5KGxpbmUuc3RhcnQgKyBwcmVmaXgubGVuZ3RoICsgMSkuam9pbihcIiBcIikgKyBcIl5cIjtcbiAgfVxufSkoKTtcblxuXG52YXIgaWdub3JlZFJlZiA9IC9cXCgoXFw/XFwhfFxcP1xcOnxcXD9cXD0pL2c7XG5fLmZpbmRTdWJDYXB0dXJlID0gZnVuY3Rpb24gKHJlZ1N0cikge1xuICB2YXIgbGVmdCA9IDAsXG4gICAgcmlnaHQgPSAwLFxuICAgIGxlbiA9IHJlZ1N0ci5sZW5ndGgsXG4gICAgaWdub3JlZCA9IHJlZ1N0ci5tYXRjaChpZ25vcmVkUmVmKTsgLy8gaWdub3JlZCB1bmNhcHR1cmVcbiAgaWYoaWdub3JlZCkgaWdub3JlZCA9IGlnbm9yZWQubGVuZ3RoXG4gIGVsc2UgaWdub3JlZCA9IDA7XG4gIGZvciAoOyBsZW4tLTspIHtcbiAgICB2YXIgbGV0dGVyID0gcmVnU3RyLmNoYXJBdChsZW4pO1xuICAgIGlmIChsZW4gPT09IDAgfHwgcmVnU3RyLmNoYXJBdChsZW4gLSAxKSAhPT0gXCJcXFxcXCIgKSB7IFxuICAgICAgaWYgKGxldHRlciA9PT0gXCIoXCIpIGxlZnQrKztcbiAgICAgIGlmIChsZXR0ZXIgPT09IFwiKVwiKSByaWdodCsrO1xuICAgIH1cbiAgfVxuICBpZiAobGVmdCAhPT0gcmlnaHQpIHRocm93IFwiUmVnRXhwOiBcIisgcmVnU3RyICsgXCIncyBicmFja2V0IGlzIG5vdCBtYXJjaGVkXCI7XG4gIGVsc2UgcmV0dXJuIGxlZnQgLSBpZ25vcmVkO1xufTtcblxuXG5fLmVzY2FwZVJlZ0V4cCA9IGZ1bmN0aW9uKCBzdHIpey8vIENyZWRpdDogWFJlZ0V4cCAwLjYuMSAoYykgMjAwNy0yMDA4IFN0ZXZlbiBMZXZpdGhhbiA8aHR0cDovL3N0ZXZlbmxldml0aGFuLmNvbS9yZWdleC94cmVnZXhwLz4gTUlUIExpY2Vuc2VcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bLVtcXF17fSgpKis/LlxcXFxeJHwsI1xcc10vZywgZnVuY3Rpb24obWF0Y2gpe1xuICAgIHJldHVybiAnXFxcXCcgKyBtYXRjaDtcbiAgfSk7XG59O1xuXG5cbnZhciByRW50aXR5ID0gbmV3IFJlZ0V4cChcIiYoXCIgKyBPYmplY3Qua2V5cyhlbnRpdGllcykuam9pbignfCcpICsgJyk7JywgJ2dpJyk7XG5cbl8uY29udmVydEVudGl0eSA9IGZ1bmN0aW9uKGNocil7XG5cbiAgcmV0dXJuIChcIlwiICsgY2hyKS5yZXBsYWNlKHJFbnRpdHksIGZ1bmN0aW9uKGFsbCwgY2FwdHVyZSl7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZW50aXRpZXNbY2FwdHVyZV0pXG4gIH0pO1xuXG59XG5cblxuLy8gc2ltcGxlIGdldCBhY2Nlc3NvclxuXG5fLmNyZWF0ZU9iamVjdCA9IGZ1bmN0aW9uKG8sIHByb3BzKXtcbiAgICBmdW5jdGlvbiBGb28oKSB7fVxuICAgIEZvby5wcm90b3R5cGUgPSBvO1xuICAgIHZhciByZXMgPSBuZXcgRm9vO1xuICAgIGlmKHByb3BzKSBfLmV4dGVuZChyZXMsIHByb3BzKTtcbiAgICByZXR1cm4gcmVzO1xufVxuXG5fLmNyZWF0ZVByb3RvID0gZnVuY3Rpb24oZm4sIG8pe1xuICAgIGZ1bmN0aW9uIEZvbygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGZuO31cbiAgICBGb28ucHJvdG90eXBlID0gbztcbiAgICByZXR1cm4gKGZuLnByb3RvdHlwZSA9IG5ldyBGb28oKSk7XG59XG5cblxuLyoqXG5jbG9uZVxuKi9cbl8uY2xvbmUgPSBmdW5jdGlvbiBjbG9uZShvYmope1xuICAgIHZhciB0eXBlID0gXy50eXBlT2Yob2JqKTtcbiAgICBpZih0eXBlID09PSAnYXJyYXknKXtcbiAgICAgIHZhciBjbG9uZWQgPSBbXTtcbiAgICAgIGZvcih2YXIgaT0wLGxlbiA9IG9iai5sZW5ndGg7IGk8IGxlbjtpKyspe1xuICAgICAgICBjbG9uZWRbaV0gPSBvYmpbaV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjbG9uZWQ7XG4gICAgfVxuICAgIGlmKHR5cGUgPT09ICdvYmplY3QnKXtcbiAgICAgIHZhciBjbG9uZWQgPSB7fTtcbiAgICAgIGZvcih2YXIgaSBpbiBvYmopIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSl7XG4gICAgICAgIGNsb25lZFtpXSA9IG9ialtpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjbG9uZWQ7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuXG5fLmVxdWFscyA9IGZ1bmN0aW9uKG5vdywgb2xkKXtcbiAgaWYoIEFycmF5LmlzQXJyYXkobm93KSApe1xuICAgIHZhciBzcGxpY2VzID0gbGQobm93LCBvbGR8fFtdKTtcbiAgICByZXR1cm4gc3BsaWNlcztcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBub3c7XG4gIGlmKHR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvbGQgPT09ICdudW1iZXInJiYgaXNOYU4obm93KSAmJiBpc05hTihvbGQpKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gbm93ID09PSBvbGQ7XG59XG5cblxuLy9MZXZlbnNodGVpbl9kaXN0YW5jZVxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLzEuIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV2ZW5zaHRlaW5fZGlzdGFuY2Vcbi8vMi4gZ2l0aHViLmNvbTpwb2x5bWVyL29ic2VydmUtanNcblxudmFyIGxkID0gKGZ1bmN0aW9uKCl7XG4gIGZ1bmN0aW9uIGVxdWFscyhhLGIpe1xuICAgIHJldHVybiBhID09PSBiO1xuICB9XG4gIGZ1bmN0aW9uIGxkKGFycmF5MSwgYXJyYXkyKXtcbiAgICB2YXIgbiA9IGFycmF5MS5sZW5ndGg7XG4gICAgdmFyIG0gPSBhcnJheTIubGVuZ3RoO1xuICAgIHZhciBtYXRyaXggPSBbXTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDw9IG47IGkrKyl7XG4gICAgICBtYXRyaXgucHVzaChbaV0pO1xuICAgIH1cbiAgICBmb3IodmFyIGo9MTtqPD1tO2orKyl7XG4gICAgICBtYXRyaXhbMF1bal09ajtcbiAgICB9XG4gICAgZm9yKHZhciBpID0gMTsgaSA8PSBuOyBpKyspe1xuICAgICAgZm9yKHZhciBqID0gMTsgaiA8PSBtOyBqKyspe1xuICAgICAgICBpZihlcXVhbHMoYXJyYXkxW2ktMV0sIGFycmF5MltqLTFdKSl7XG4gICAgICAgICAgbWF0cml4W2ldW2pdID0gbWF0cml4W2ktMV1bai0xXTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgbWF0cml4W2ldW2pdID0gTWF0aC5taW4oXG4gICAgICAgICAgICBtYXRyaXhbaS0xXVtqXSsxLCAvL2RlbGV0ZVxuICAgICAgICAgICAgbWF0cml4W2ldW2otMV0rMS8vYWRkXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdHJpeDtcbiAgfVxuICBmdW5jdGlvbiB3aG9sZShhcnIyLCBhcnIxKSB7XG4gICAgICB2YXIgbWF0cml4ID0gbGQoYXJyMSwgYXJyMilcbiAgICAgIHZhciBuID0gYXJyMS5sZW5ndGg7XG4gICAgICB2YXIgaSA9IG47XG4gICAgICB2YXIgbSA9IGFycjIubGVuZ3RoO1xuICAgICAgdmFyIGogPSBtO1xuICAgICAgdmFyIGVkaXRzID0gW107XG4gICAgICB2YXIgY3VycmVudCA9IG1hdHJpeFtpXVtqXTtcbiAgICAgIHdoaWxlKGk+MCB8fCBqPjApe1xuICAgICAgLy8gdGhlIGxhc3QgbGluZVxuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIGVkaXRzLnVuc2hpZnQoMyk7XG4gICAgICAgICAgai0tO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoZSBsYXN0IGNvbFxuICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgIGVkaXRzLnVuc2hpZnQoMik7XG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub3J0aFdlc3QgPSBtYXRyaXhbaSAtIDFdW2ogLSAxXTtcbiAgICAgICAgdmFyIHdlc3QgPSBtYXRyaXhbaSAtIDFdW2pdO1xuICAgICAgICB2YXIgbm9ydGggPSBtYXRyaXhbaV1baiAtIDFdO1xuXG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihub3J0aCwgd2VzdCwgbm9ydGhXZXN0KTtcblxuICAgICAgICBpZiAobWluID09PSB3ZXN0KSB7XG4gICAgICAgICAgZWRpdHMudW5zaGlmdCgyKTsgLy9kZWxldGVcbiAgICAgICAgICBpLS07XG4gICAgICAgICAgY3VycmVudCA9IHdlc3Q7XG4gICAgICAgIH0gZWxzZSBpZiAobWluID09PSBub3J0aFdlc3QgKSB7XG4gICAgICAgICAgaWYgKG5vcnRoV2VzdCA9PT0gY3VycmVudCkge1xuICAgICAgICAgICAgZWRpdHMudW5zaGlmdCgwKTsgLy9ubyBjaGFuZ2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWRpdHMudW5zaGlmdCgxKTsgLy91cGRhdGVcbiAgICAgICAgICAgIGN1cnJlbnQgPSBub3J0aFdlc3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGktLTtcbiAgICAgICAgICBqLS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRpdHMudW5zaGlmdCgzKTsgLy9hZGRcbiAgICAgICAgICBqLS07XG4gICAgICAgICAgY3VycmVudCA9IG5vcnRoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgTEVBVkUgPSAwO1xuICAgICAgdmFyIEFERCA9IDM7XG4gICAgICB2YXIgREVMRUxFID0gMjtcbiAgICAgIHZhciBVUERBVEUgPSAxO1xuICAgICAgdmFyIG4gPSAwO209MDtcbiAgICAgIHZhciBzdGVwcyA9IFtdO1xuICAgICAgdmFyIHN0ZXAgPSB7aW5kZXg6IG51bGwsIGFkZDowLCByZW1vdmVkOltdfTtcblxuICAgICAgZm9yKHZhciBpPTA7aTxlZGl0cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgaWYoZWRpdHNbaV0gPiAwICl7IC8vIE5PVCBMRUFWRVxuICAgICAgICAgIGlmKHN0ZXAuaW5kZXggPT09IG51bGwpe1xuICAgICAgICAgICAgc3RlcC5pbmRleCA9IG07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvL0xFQVZFXG4gICAgICAgICAgaWYoc3RlcC5pbmRleCAhPSBudWxsKXtcbiAgICAgICAgICAgIHN0ZXBzLnB1c2goc3RlcClcbiAgICAgICAgICAgIHN0ZXAgPSB7aW5kZXg6IG51bGwsIGFkZDowLCByZW1vdmVkOltdfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoKGVkaXRzW2ldKXtcbiAgICAgICAgICBjYXNlIExFQVZFOlxuICAgICAgICAgICAgbisrO1xuICAgICAgICAgICAgbSsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBBREQ6XG4gICAgICAgICAgICBzdGVwLmFkZCsrO1xuICAgICAgICAgICAgbSsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBERUxFTEU6XG4gICAgICAgICAgICBzdGVwLnJlbW92ZWQucHVzaChhcnIxW25dKVxuICAgICAgICAgICAgbisrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBVUERBVEU6XG4gICAgICAgICAgICBzdGVwLmFkZCsrO1xuICAgICAgICAgICAgc3RlcC5yZW1vdmVkLnB1c2goYXJyMVtuXSlcbiAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgIG0rKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihzdGVwLmluZGV4ICE9IG51bGwpe1xuICAgICAgICBzdGVwcy5wdXNoKHN0ZXApXG4gICAgICB9XG4gICAgICByZXR1cm4gc3RlcHNcbiAgICB9XG4gICAgcmV0dXJuIHdob2xlO1xuICB9KSgpO1xuXG5cblxuXy50aHJvdHRsZSA9IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpe1xuICB2YXIgd2FpdCA9IHdhaXQgfHwgMTAwO1xuICB2YXIgY29udGV4dCwgYXJncywgcmVzdWx0O1xuICB2YXIgdGltZW91dCA9IG51bGw7XG4gIHZhciBwcmV2aW91cyA9IDA7XG4gIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHByZXZpb3VzID0gK25ldyBEYXRlO1xuICAgIHRpbWVvdXQgPSBudWxsO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5vdyA9ICsgbmV3IERhdGU7XG4gICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgIGNvbnRleHQgPSB0aGlzO1xuICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxuLy8gaG9nYW4gZXNjYXBlXG4vLyA9PT09PT09PT09PT09PVxuXy5lc2NhcGUgPSAoZnVuY3Rpb24oKXtcbiAgdmFyIHJBbXAgPSAvJi9nLFxuICAgICAgckx0ID0gLzwvZyxcbiAgICAgIHJHdCA9IC8+L2csXG4gICAgICByQXBvcyA9IC9cXCcvZyxcbiAgICAgIHJRdW90ID0gL1xcXCIvZyxcbiAgICAgIGhDaGFycyA9IC9bJjw+XFxcIlxcJ10vO1xuXG4gIHJldHVybiBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gaENoYXJzLnRlc3Qoc3RyKSA/XG4gICAgICBzdHJcbiAgICAgICAgLnJlcGxhY2UockFtcCwgJyZhbXA7JylcbiAgICAgICAgLnJlcGxhY2Uockx0LCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKHJHdCwgJyZndDsnKVxuICAgICAgICAucmVwbGFjZShyQXBvcywgJyYjMzk7JylcbiAgICAgICAgLnJlcGxhY2UoclF1b3QsICcmcXVvdDsnKSA6XG4gICAgICBzdHI7XG4gIH1cbn0pKCk7XG5cbl8uY2FjaGUgPSBmdW5jdGlvbihtYXgpe1xuICBtYXggPSBtYXggfHwgMTAwMDtcbiAgdmFyIGtleXMgPSBbXSxcbiAgICAgIGNhY2hlID0ge307XG4gIHJldHVybiB7XG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoa2V5cy5sZW5ndGggPiB0aGlzLm1heCkge1xuICAgICAgICBjYWNoZVtrZXlzLnNoaWZ0KCldID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgLy8gXG4gICAgICBpZihjYWNoZVtrZXldID09PSB1bmRlZmluZWQpe1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICAgIGNhY2hlW2tleV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHJldHVybiBjYWNoZTtcbiAgICAgIHJldHVybiBjYWNoZVtrZXldO1xuICAgIH0sXG4gICAgbWF4OiBtYXgsXG4gICAgbGVuOmZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4ga2V5cy5sZW5ndGg7XG4gICAgfVxuICB9O1xufVxuXG4vLyAvLyBzZXR1cCB0aGUgcmF3IEV4cHJlc3Npb25cbi8vIF8udG91Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24oZXhwcil7XG4vLyAgIGlmKGV4cHIudHlwZSA9PT0gJ2V4cHJlc3Npb24nKXtcbi8vICAgfVxuLy8gICByZXR1cm4gZXhwcjtcbi8vIH1cblxuXG4vLyBoYW5kbGUgdGhlIHNhbWUgbG9naWMgb24gY29tcG9uZW50J3MgYG9uLSpgIGFuZCBlbGVtZW50J3MgYG9uLSpgXG4vLyByZXR1cm4gdGhlIGZpcmUgb2JqZWN0XG5fLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24odmFsdWUsIHR5cGUgKXtcbiAgdmFyIHNlbGYgPSB0aGlzLCBldmFsdWF0ZTtcbiAgaWYodmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nKXsgLy8gaWYgaXMgZXhwcmVzc2lvbiwgZ28gZXZhbHVhdGVkIHdheVxuICAgIGV2YWx1YXRlID0gdmFsdWUuZ2V0O1xuICB9XG4gIGlmKGV2YWx1YXRlKXtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmlyZShvYmope1xuICAgICAgc2VsZi5kYXRhLiRldmVudCA9IG9iajtcbiAgICAgIHZhciByZXMgPSBldmFsdWF0ZShzZWxmKTtcbiAgICAgIGlmKHJlcyA9PT0gZmFsc2UgJiYgb2JqICYmIG9iai5wcmV2ZW50RGVmYXVsdCkgb2JqLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZWxmLmRhdGEuJGV2ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgc2VsZi4kdXBkYXRlKCk7XG4gICAgfVxuICB9ZWxzZXtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmlyZSgpe1xuICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cykgICAgICBcbiAgICAgIGFyZ3MudW5zaGlmdCh2YWx1ZSk7XG4gICAgICBzZWxmLiRlbWl0LmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgc2VsZi4kdXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG5cbi8vIG9ubHkgY2FsbCBvbmNlXG5fLm9uY2UgPSBmdW5jdGlvbihmbil7XG4gIHZhciB0aW1lID0gMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgaWYoIHRpbWUrKyA9PT0gMCkgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5cblxuXy5sb2cgPSBmdW5jdGlvbihtc2csIHR5cGUpe1xuICBpZih0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikgIGNvbnNvbGVbdHlwZSB8fCBcImxvZ1wiXShtc2cpO1xufVxuXG5cblxuXG4vL2h0dHA6Ly93d3cudzMub3JnL2h0bWwvd2cvZHJhZnRzL2h0bWwvbWFzdGVyL3NpbmdsZS1wYWdlLmh0bWwjdm9pZC1lbGVtZW50c1xuXy5pc1ZvaWRUYWcgPSBfLm1ha2VQcmVkaWNhdGUoXCJhcmVhIGJhc2UgYnIgY29sIGVtYmVkIGhyIGltZyBpbnB1dCBrZXlnZW4gbGluayBtZW51aXRlbSBtZXRhIHBhcmFtIHNvdXJjZSB0cmFjayB3YnIgci1jb250ZW50XCIpO1xuXy5pc0Jvb2xlYW5BdHRyID0gXy5tYWtlUHJlZGljYXRlKCdzZWxlY3RlZCBjaGVja2VkIGRpc2FibGVkIHJlYWRPbmx5IHJlcXVpcmVkIG9wZW4gYXV0b2ZvY3VzIGNvbnRyb2xzIGF1dG9wbGF5IGNvbXBhY3QgbG9vcCBkZWZlciBtdWx0aXBsZScpO1xuXG5fLmlzRmFsc2UgLSBmdW5jdGlvbigpe3JldHVybiBmYWxzZX1cbl8uaXNUcnVlIC0gZnVuY3Rpb24oKXtyZXR1cm4gdHJ1ZX1cblxuXG5fLmFzc2VydCA9IGZ1bmN0aW9uKHRlc3QsIG1zZyl7XG4gIGlmKCF0ZXN0KSB0aHJvdyBtc2c7XG59XG5cbiIsInZhciBub2RlID0gcmVxdWlyZShcIi4vcGFyc2VyL25vZGUuanNcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4vZG9tLmpzXCIpO1xudmFyIGFuaW1hdGUgPSByZXF1aXJlKFwiLi9oZWxwZXIvYW5pbWF0ZS5qc1wiKTtcbnZhciBHcm91cCA9IHJlcXVpcmUoJy4vZ3JvdXAuanMnKTtcbnZhciBfID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgY29tYmluZSA9IHJlcXVpcmUoJy4vaGVscGVyL2NvbWJpbmUuanMnKTtcblxudmFyIHdhbGtlcnMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG53YWxrZXJzLmxpc3QgPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuXG4gIHZhciBSZWd1bGFyID0gd2Fsa2Vycy5SZWd1bGFyOyAgXG4gIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJSZWd1bGFyIGxpc3RcIiksXG4gICAgbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsXG4gICAgZXh0cmEgPSBvcHRpb25zLmV4dHJhO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBncm91cCA9IG5ldyBHcm91cCgpO1xuICBncm91cC5wdXNoKHBsYWNlaG9sZGVyKTtcbiAgdmFyIGluZGV4TmFtZSA9IGFzdC52YXJpYWJsZSArICdfaW5kZXgnO1xuICB2YXIgdmFyaWFibGUgPSBhc3QudmFyaWFibGU7XG5cbiAgZnVuY3Rpb24gdXBkYXRlKG5ld1ZhbHVlLCBzcGxpY2VzKXtcbiAgICBpZighbmV3VmFsdWUpIHtcbiAgICAgIG5ld1ZhbHVlID0gW107XG4gICAgICBzcGxpY2VzID0gXy5lcXVhbHMobmV3VmFsdWUsIHNwbGljZXMpO1xuICAgIH1cbiAgICBcbiAgICBpZighc3BsaWNlcyB8fCAhc3BsaWNlcy5sZW5ndGgpIHJldHVybjtcbiAgICB2YXIgY3VyID0gcGxhY2Vob2xkZXI7XG4gICAgdmFyIG0gPSAwLCBsZW4gPSBuZXdWYWx1ZS5sZW5ndGgsXG4gICAgICBtSW5kZXggPSBzcGxpY2VzWzBdLmluZGV4O1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHNwbGljZXMubGVuZ3RoOyBpKyspeyAvL2luaXRcbiAgICAgIHZhciBzcGxpY2UgPSBzcGxpY2VzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gc3BsaWNlLmluZGV4OyAvLyBiZWFjdXNlIHdlIHVzZSBhIGNvbW1lbnQgZm9yIHBsYWNlaG9sZGVyXG5cbiAgICAgIGZvcih2YXIgayA9IG07IGsgPCBpbmRleDsgaysrKXsgLy8gbm8gY2hhbmdlXG4gICAgICAgIHZhciBzZWN0ID0gZ3JvdXAuZ2V0KCBrICsgMSApO1xuICAgICAgICBzZWN0LmRhdGFbaW5kZXhOYW1lXSA9IGs7XG4gICAgICB9XG4gICAgICBmb3IodmFyIGogPSAwLCBqbGVuID0gc3BsaWNlLnJlbW92ZWQubGVuZ3RoOyBqPCBqbGVuOyBqKyspeyAvL3JlbW92ZWRcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBncm91cC5jaGlsZHJlbi5zcGxpY2UoIGluZGV4ICsgMSwgMSlbMF07XG4gICAgICAgIHJlbW92ZWQuZGVzdHJveSh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgZm9yKHZhciBvID0gaW5kZXg7IG8gPCBpbmRleCArIHNwbGljZS5hZGQ7IG8rKyl7IC8vYWRkXG4gICAgICAgIC8vIHByb3RvdHlwZSBpbmhlcml0XG4gICAgICAgIHZhciBpdGVtID0gbmV3VmFsdWVbb107XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGFbaW5kZXhOYW1lXSA9IG87XG4gICAgICAgIGRhdGFbdmFyaWFibGVdID0gaXRlbTtcblxuICAgICAgICBfLmV4dGVuZChkYXRhLCBleHRyYSk7XG4gICAgICAgIHZhciBzZWN0aW9uID0gc2VsZi4kY29tcGlsZShhc3QuYm9keSwge1xuICAgICAgICAgIGV4dHJhOiBkYXRhLFxuICAgICAgICAgIG5hbWVzcGFjZTpuYW1lc3BhY2UsXG4gICAgICAgICAgcmVjb3JkOiB0cnVlLFxuICAgICAgICAgIG91dGVyOiBvcHRpb25zLm91dGVyXG4gICAgICAgIH0pXG4gICAgICAgIHNlY3Rpb24uZGF0YSA9IGRhdGE7XG4gICAgICAgIC8vIGF1dG9saW5rXG4gICAgICAgIHZhciBpbnNlcnQgPSAgY29tYmluZS5sYXN0KGdyb3VwLmdldChvKSk7XG4gICAgICAgIGlmKGluc2VydC5wYXJlbnROb2RlKXtcbiAgICAgICAgICBhbmltYXRlLmluamVjdChjb21iaW5lLm5vZGUoc2VjdGlvbiksaW5zZXJ0LCAnYWZ0ZXInKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbnNlcnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29tYmluZS5ub2RlKHNlY3Rpb24pLCBpbnNlcnQubmV4dFNpYmxpbmcpO1xuICAgICAgICBncm91cC5jaGlsZHJlbi5zcGxpY2UoIG8gKyAxICwgMCwgc2VjdGlvbik7XG4gICAgICB9XG4gICAgICBtID0gaW5kZXggKyBzcGxpY2UuYWRkIC0gc3BsaWNlLnJlbW92ZWQubGVuZ3RoO1xuICAgICAgbSAgPSBtIDwgMD8gMCA6IG07XG5cbiAgICB9XG4gICAgaWYobSA8IGxlbil7XG4gICAgICBmb3IodmFyIGkgPSBtOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICB2YXIgcGFpciA9IGdyb3VwLmdldChpICsgMSk7XG4gICAgICAgIHBhaXIuZGF0YVtpbmRleE5hbWVdID0gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLiR3YXRjaChhc3Quc2VxdWVuY2UsIHVwZGF0ZSwgeyBpbml0OiB0cnVlIH0pO1xuICByZXR1cm4gZ3JvdXA7XG59XG4vLyB7I2luY2x1ZGUgfVxud2Fsa2Vycy50ZW1wbGF0ZSA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG4gIHZhciBjb250ZW50ID0gYXN0LmNvbnRlbnQsIGNvbXBpbGVkO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCdpbmxjdWRlJyk7XG4gIHZhciBjb21waWxlZCwgbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsIGV4dHJhID0gb3B0aW9ucy5leHRyYTtcbiAgLy8gdmFyIGZyYWdtZW50ID0gZG9tLmZyYWdtZW50KCk7XG4gIC8vIGZyYWdtZW50LmFwcGVuZENoaWxkKHBsYWNlaG9sZGVyKTtcbiAgdmFyIGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gIGdyb3VwLnB1c2gocGxhY2Vob2xkZXIpO1xuICBpZihjb250ZW50KXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy4kd2F0Y2goY29udGVudCwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYoIGNvbXBpbGVkID0gZ3JvdXAuZ2V0KDEpKXtcbiAgICAgICAgY29tcGlsZWQuZGVzdHJveSh0cnVlKTsgXG4gICAgICAgIGdyb3VwLmNoaWxkcmVuLnBvcCgpO1xuICAgICAgfVxuICAgICAgZ3JvdXAucHVzaCggY29tcGlsZWQgPSAgc2VsZi4kY29tcGlsZSh2YWx1ZSwge3JlY29yZDogdHJ1ZSwgb3V0ZXI6IG9wdGlvbnMub3V0ZXIsbmFtZXNwYWNlOiBuYW1lc3BhY2UsIGV4dHJhOiBleHRyYX0pICk7IFxuICAgICAgaWYocGxhY2Vob2xkZXIucGFyZW50Tm9kZSkgYW5pbWF0ZS5pbmplY3QoY29tYmluZS5ub2RlKGNvbXBpbGVkKSwgcGxhY2Vob2xkZXIsICdiZWZvcmUnKVxuICAgIH0sIHtcbiAgICAgIGluaXQ6IHRydWVcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZ3JvdXA7XG59O1xuXG5cbi8vIGhvdyB0byByZXNvbHZlIHRoaXMgcHJvYmxlbVxudmFyIGlpID0gMDtcbndhbGtlcnNbJ2lmJ10gPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICB2YXIgc2VsZiA9IHRoaXMsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSwgZXh0cmEgPSBvcHRpb25zLmV4dHJhO1xuICBpZihvcHRpb25zICYmIG9wdGlvbnMuZWxlbWVudCl7IC8vIGF0dHJpYnV0ZSBpbnRlcGxhdGlvblxuICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbihudmFsdWUpe1xuICAgICAgaWYoISFudmFsdWUpe1xuICAgICAgICBpZihhbHRlcm5hdGUpIGNvbWJpbmUuZGVzdHJveShhbHRlcm5hdGUpXG4gICAgICAgIGlmKGFzdC5jb25zZXF1ZW50KSBjb25zZXF1ZW50ID0gc2VsZi4kY29tcGlsZShhc3QuY29uc2VxdWVudCwge3JlY29yZDogdHJ1ZSwgZWxlbWVudDogb3B0aW9ucy5lbGVtZW50ICwgZXh0cmE6ZXh0cmF9KTtcbiAgICAgIH1lbHNle1xuICAgICAgICBpZihjb25zZXF1ZW50KSBjb21iaW5lLmRlc3Ryb3koY29uc2VxdWVudClcbiAgICAgICAgaWYoYXN0LmFsdGVybmF0ZSkgYWx0ZXJuYXRlID0gc2VsZi4kY29tcGlsZShhc3QuYWx0ZXJuYXRlLCB7cmVjb3JkOiB0cnVlLCBlbGVtZW50OiBvcHRpb25zLmVsZW1lbnQsIGV4dHJhOiBleHRyYX0pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLiR3YXRjaChhc3QudGVzdCwgdXBkYXRlLCB7IGZvcmNlOiB0cnVlIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpe1xuICAgICAgICBpZihjb25zZXF1ZW50KSBjb21iaW5lLmRlc3Ryb3koY29uc2VxdWVudCk7XG4gICAgICAgIGVsc2UgaWYoYWx0ZXJuYXRlKSBjb21iaW5lLmRlc3Ryb3koYWx0ZXJuYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgdGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlLCBub2RlO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiUmVndWxhciBpZlwiICsgaWkrKyk7XG4gIHZhciBncm91cCA9IG5ldyBHcm91cCgpO1xuICBncm91cC5wdXNoKHBsYWNlaG9sZGVyKTtcbiAgdmFyIHByZVZhbHVlID0gbnVsbCwgbmFtZXNwYWNlPSBvcHRpb25zLm5hbWVzcGFjZTtcblxuXG4gIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAobnZhbHVlLCBvbGQpe1xuICAgIHZhciB2YWx1ZSA9ICEhbnZhbHVlO1xuICAgIGlmKHZhbHVlID09PSBwcmVWYWx1ZSkgcmV0dXJuO1xuICAgIHByZVZhbHVlID0gdmFsdWU7XG4gICAgaWYoZ3JvdXAuY2hpbGRyZW5bMV0pe1xuICAgICAgZ3JvdXAuY2hpbGRyZW5bMV0uZGVzdHJveSh0cnVlKTtcbiAgICAgIGdyb3VwLmNoaWxkcmVuLnBvcCgpO1xuICAgIH1cbiAgICBpZih2YWx1ZSl7IC8vdHJ1ZVxuICAgICAgaWYoYXN0LmNvbnNlcXVlbnQgJiYgYXN0LmNvbnNlcXVlbnQubGVuZ3RoKXtcbiAgICAgICAgY29uc2VxdWVudCA9IHNlbGYuJGNvbXBpbGUoIGFzdC5jb25zZXF1ZW50ICwge3JlY29yZDp0cnVlLCBvdXRlcjogb3B0aW9ucy5vdXRlcixuYW1lc3BhY2U6IG5hbWVzcGFjZSwgZXh0cmE6ZXh0cmEgfSlcbiAgICAgICAgLy8gcGxhY2Vob2xkZXIucGFyZW50Tm9kZSAmJiBwbGFjZWhvbGRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggbm9kZSwgcGxhY2Vob2xkZXIgKTtcbiAgICAgICAgZ3JvdXAucHVzaChjb25zZXF1ZW50KTtcbiAgICAgICAgaWYocGxhY2Vob2xkZXIucGFyZW50Tm9kZSl7XG4gICAgICAgICAgYW5pbWF0ZS5pbmplY3QoY29tYmluZS5ub2RlKGNvbnNlcXVlbnQpLCBwbGFjZWhvbGRlciwgJ2JlZm9yZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfWVsc2V7IC8vZmFsc2VcbiAgICAgIGlmKGFzdC5hbHRlcm5hdGUgJiYgYXN0LmFsdGVybmF0ZS5sZW5ndGgpe1xuICAgICAgICBhbHRlcm5hdGUgPSBzZWxmLiRjb21waWxlKGFzdC5hbHRlcm5hdGUsIHtyZWNvcmQ6dHJ1ZSwgb3V0ZXI6IG9wdGlvbnMub3V0ZXIsbmFtZXNwYWNlOiBuYW1lc3BhY2UsIGV4dHJhOmV4dHJhfSk7XG4gICAgICAgIGdyb3VwLnB1c2goYWx0ZXJuYXRlKTtcbiAgICAgICAgaWYocGxhY2Vob2xkZXIucGFyZW50Tm9kZSl7XG4gICAgICAgICAgYW5pbWF0ZS5pbmplY3QoY29tYmluZS5ub2RlKGFsdGVybmF0ZSksIHBsYWNlaG9sZGVyLCAnYmVmb3JlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdGhpcy4kd2F0Y2goYXN0LnRlc3QsIHVwZGF0ZSwge2ZvcmNlOiB0cnVlLCBpbml0OiB0cnVlfSk7XG5cbiAgcmV0dXJuIGdyb3VwO1xufVxuXG5cbndhbGtlcnMuZXhwcmVzc2lvbiA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG4gIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gIHRoaXMuJHdhdGNoKGFzdCwgZnVuY3Rpb24obmV3dmFsKXtcbiAgICBkb20udGV4dChub2RlLCBcIlwiICsgKG5ld3ZhbCA9PSBudWxsPyBcIlwiOiBcIlwiICsgbmV3dmFsKSApO1xuICB9KVxuICByZXR1cm4gbm9kZTtcbn1cbndhbGtlcnMudGV4dCA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG4gIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXy5jb252ZXJ0RW50aXR5KGFzdC50ZXh0KSk7XG4gIHJldHVybiBub2RlO1xufVxuXG5cblxudmFyIGV2ZW50UmVnID0gL15vbi0oLispJC9cblxuLyoqXG4gKiB3YWxrZXJzIGVsZW1lbnQgKGNvbnRhaW5zIGNvbXBvbmVudClcbiAqL1xud2Fsa2Vycy5lbGVtZW50ID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcbiAgdmFyIGF0dHJzID0gYXN0LmF0dHJzLCBcbiAgICBjb21wb25lbnQsIHNlbGYgPSB0aGlzLFxuICAgIENvbnN0cnVjdG9yPXRoaXMuY29uc3RydWN0b3IsXG4gICAgY2hpbGRyZW4gPSBhc3QuY2hpbGRyZW4sXG4gICAgbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsIHJlZiwgZ3JvdXAsIFxuICAgIGV4dHJhID0gb3B0aW9ucy5leHRyYSxcbiAgICBpc29sYXRlID0gMCxcbiAgICBDb21wb25lbnQgPSBDb25zdHJ1Y3Rvci5jb21wb25lbnQoYXN0LnRhZyk7XG5cblxuICBpZihhc3QudGFnID09PSAnc3ZnJykgbmFtZXNwYWNlID0gXCJzdmdcIjtcblxuXG5cblxuICBpZihDb21wb25lbnQpe1xuICAgIHZhciBkYXRhID0ge30sZXZlbnRzO1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGF0dHJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHZhciBhdHRyID0gYXR0cnNbaV07XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLl90b3VjaEV4cHIoYXR0ci52YWx1ZSB8fCBcIlwiKTtcbiAgICAgIFxuICAgICAgdmFyIG5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICB2YXIgZXRlc3QgPSBuYW1lLm1hdGNoKGV2ZW50UmVnKTtcbiAgICAgIC8vIGJpbmQgZXZlbnQgcHJveHlcbiAgICAgIGlmKGV0ZXN0KXtcbiAgICAgICAgZXZlbnRzID0gZXZlbnRzIHx8IHt9O1xuICAgICAgICBldmVudHNbZXRlc3RbMV1dID0gXy5oYW5kbGVFdmVudC5jYWxsKHRoaXMsIHZhbHVlLCBldGVzdFsxXSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZih2YWx1ZS50eXBlICE9PSAnZXhwcmVzc2lvbicpe1xuICAgICAgICBkYXRhW2F0dHIubmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1lbHNle1xuICAgICAgICBkYXRhW2F0dHIubmFtZV0gPSB2YWx1ZS5nZXQoc2VsZik7IFxuICAgICAgfVxuICAgICAgaWYoIGF0dHIubmFtZSA9PT0gJ3JlZicgICYmIHZhbHVlICE9IG51bGwpe1xuICAgICAgICByZWYgPSB2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbic/IHZhbHVlLmdldChzZWxmKTogdmFsdWU7XG4gICAgICB9XG4gICAgICBpZiggYXR0ci5uYW1lID09PSAnaXNvbGF0ZScpe1xuICAgICAgICAvLyAxOiBzdG9wOiBjb21wb3NpdGUgLT4gcGFyZW50XG4gICAgICAgIC8vIDIuIHN0b3A6IGNvbXBvc2l0ZSA8LSBwYXJlbnRcbiAgICAgICAgLy8gMy4gc3RvcCAxIGFuZCAyOiBjb21wb3NpdGUgPC0+IHBhcmVudFxuICAgICAgICAvLyAwLiBzdG9wIG5vdGhpbmcgKGRlZnVhbHQpXG4gICAgICAgIGlzb2xhdGUgPSB2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbic/IHZhbHVlLmdldChzZWxmKTogcGFyc2VJbnQodmFsdWUgfHwgMywgMTApO1xuICAgICAgICBkYXRhLmlzb2xhdGUgPSBpc29sYXRlO1xuICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICB2YXIgY29uZmlnID0geyBcbiAgICAgIGRhdGE6IGRhdGEsIFxuICAgICAgZXZlbnRzOiBldmVudHMsIFxuICAgICAgJHBhcmVudDogdGhpcyxcbiAgICAgICRvdXRlcjogb3B0aW9ucy5vdXRlcixcbiAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlLCBcbiAgICAgICRyb290OiB0aGlzLiRyb290LFxuICAgICAgJGJvZHk6IGFzdC5jaGlsZHJlblxuICAgIH1cblxuICAgIHZhciBjb21wb25lbnQgPSBuZXcgQ29tcG9uZW50KGNvbmZpZyk7XG4gICAgaWYocmVmICYmICBzZWxmLiRyZWZzKSBzZWxmLiRyZWZzW3JlZl0gPSBjb21wb25lbnQ7XG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gYXR0cnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IGF0dHIudmFsdWV8fFwiXCI7XG4gICAgICBpZih2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbicgJiYgYXR0ci5uYW1lLmluZGV4T2YoJ29uLScpPT09LTEpe1xuICAgICAgICB2YWx1ZSA9IHNlbGYuX3RvdWNoRXhwcih2YWx1ZSk7XG4gICAgICAgIC8vIHVzZSBiaXQgb3BlcmF0ZSB0byBjb250cm9sIHNjb3BlXG4gICAgICAgIGlmKCAhKGlzb2xhdGUgJiAyKSApIFxuICAgICAgICAgIHRoaXMuJHdhdGNoKHZhbHVlLCBjb21wb25lbnQuJHVwZGF0ZS5iaW5kKGNvbXBvbmVudCwgYXR0ci5uYW1lKSlcbiAgICAgICAgaWYoIHZhbHVlLnNldCAmJiAhKGlzb2xhdGUgJiAxICkgKSBcbiAgICAgICAgICAvLyBzeW5jIHRoZSBkYXRhLiBpdCBmb3JjZSB0aGUgY29tcG9uZW50IGRvbid0IHRyaWdnZXIgYXR0ci5uYW1lJ3MgZmlyc3QgZGlydHkgZWNoZWNrXG4gICAgICAgICAgY29tcG9uZW50LiR3YXRjaChhdHRyLm5hbWUsIHNlbGYuJHVwZGF0ZS5iaW5kKHNlbGYsIHZhbHVlKSwge3N5bmM6IHRydWV9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocmVmKXtcbiAgICAgIGNvbXBvbmVudC4kb24oJ2Rlc3Ryb3knLCBmdW5jdGlvbigpe1xuICAgICAgICBpZihzZWxmLiRyZWZzKSBzZWxmLiRyZWZzW3JlZl0gPSBudWxsO1xuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxuICBlbHNlIGlmKCBhc3QudGFnID09PSAnci1jb250ZW50JyAmJiB0aGlzLl9nZXRUcmFuc2NsdWRlICl7XG4gICAgcmV0dXJuIHRoaXMuX2dldFRyYW5zY2x1ZGUoKTtcbiAgfVxuICBcbiAgaWYoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKXtcbiAgICBncm91cCA9IHRoaXMuJGNvbXBpbGUoY2hpbGRyZW4sIHtvdXRlcjogb3B0aW9ucy5vdXRlcixuYW1lc3BhY2U6IG5hbWVzcGFjZSwgZXh0cmE6IGV4dHJhIH0pO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBkb20uY3JlYXRlKGFzdC50YWcsIG5hbWVzcGFjZSwgYXR0cnMpO1xuICAvLyBjb250ZXh0IGVsZW1lbnRcblxuICB2YXIgY2hpbGQ7XG5cbiAgaWYoZ3JvdXAgJiYgIV8uaXNWb2lkVGFnKGFzdC50YWcpKXtcbiAgICBkb20uaW5qZWN0KCBjb21iaW5lLm5vZGUoZ3JvdXApICwgZWxlbWVudClcbiAgfVxuXG4gIC8vIHNvcnQgYmVmb3JlXG4gIGF0dHJzLnNvcnQoZnVuY3Rpb24oYTEsIGEyKXtcbiAgICB2YXIgZDEgPSBDb25zdHJ1Y3Rvci5kaXJlY3RpdmUoYTEubmFtZSksXG4gICAgICBkMiA9IENvbnN0cnVjdG9yLmRpcmVjdGl2ZShhMi5uYW1lKTtcbiAgICBpZihkMSAmJiBkMikgcmV0dXJuIChkMi5wcmlvcml0eSB8fCAxKSAtIChkMS5wcmlvcml0eSB8fCAxKTtcbiAgICBpZihkMSkgcmV0dXJuIDE7XG4gICAgaWYoZDIpIHJldHVybiAtMTtcbiAgICBpZihhMi5uYW1lID09PSBcInR5cGVcIikgcmV0dXJuIDE7XG4gICAgcmV0dXJuIC0xO1xuICB9KVxuICAvLyBtYXkgZGlzdGluY3Qgd2l0aCBpZiBlbHNlXG4gIHZhciBkZXN0cm9pZXMgPSB3YWxrQXR0cmlidXRlcy5jYWxsKHRoaXMsIGF0dHJzLCBlbGVtZW50LCBleHRyYSk7XG5cblxuXG4gIHZhciByZXMgID0ge1xuICAgIHR5cGU6IFwiZWxlbWVudFwiLFxuICAgIGdyb3VwOiBncm91cCxcbiAgICBub2RlOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSxcbiAgICBsYXN0OiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbihmaXJzdCl7XG4gICAgICBpZiggZmlyc3QgKXtcbiAgICAgICAgYW5pbWF0ZS5yZW1vdmUoIGVsZW1lbnQsIGdyb3VwPyBncm91cC5kZXN0cm95LmJpbmQoIGdyb3VwICk6IF8ubm9vcCApO1xuICAgICAgfWVsc2UgaWYoZ3JvdXApIHtcbiAgICAgICAgZ3JvdXAuZGVzdHJveSgpO1xuICAgICAgfVxuICAgICAgLy8gZGVzdHJveSByZWZcbiAgICAgIGlmKCBkZXN0cm9pZXMubGVuZ3RoICkge1xuICAgICAgICBkZXN0cm9pZXMuZm9yRWFjaChmdW5jdGlvbiggZGVzdHJveSApe1xuICAgICAgICAgIGlmKCBkZXN0cm95ICl7XG4gICAgICAgICAgICBpZiggdHlwZW9mIGRlc3Ryb3kuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICBkZXN0cm95LmRlc3Ryb3koKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIGRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIHdhbGtBdHRyaWJ1dGVzKGF0dHJzLCBlbGVtZW50LCBleHRyYSl7XG4gIHZhciBiaW5kaW5ncyA9IFtdXG4gIGZvcih2YXIgaSA9IDAsIGxlbiA9IGF0dHJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICB2YXIgYmluZGluZyA9IHRoaXMuX3dhbGsoYXR0cnNbaV0sIHtlbGVtZW50OiBlbGVtZW50LCBmcm9tRWxlbWVudDogdHJ1ZSwgYXR0cnM6IGF0dHJzLCBleHRyYTogZXh0cmF9KVxuICAgIGlmKGJpbmRpbmcpIGJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gIH1cbiAgcmV0dXJuIGJpbmRpbmdzO1xufVxuXG53YWxrZXJzLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGFzdCAsb3B0aW9ucyl7XG4gIHZhciBhdHRyID0gYXN0O1xuICB2YXIgQ29tcG9uZW50ID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudDtcbiAgdmFyIG5hbWUgPSBhdHRyLm5hbWUsXG4gICAgdmFsdWUgPSBhdHRyLnZhbHVlIHx8IFwiXCIsIGRpcmVjdGl2ZSA9IENvbXBvbmVudC5kaXJlY3RpdmUobmFtZSk7XG5cbiAgdmFsdWUgPSB0aGlzLl90b3VjaEV4cHIodmFsdWUpO1xuXG5cbiAgaWYoZGlyZWN0aXZlICYmIGRpcmVjdGl2ZS5saW5rKXtcbiAgICB2YXIgYmluZGluZyA9IGRpcmVjdGl2ZS5saW5rLmNhbGwoc2VsZiwgZWxlbWVudCwgdmFsdWUsIG5hbWUsIG9wdGlvbnMuYXR0cnMpO1xuICAgIGlmKHR5cGVvZiBiaW5kaW5nID09PSAnZnVuY3Rpb24nKSBiaW5kaW5nID0ge2Rlc3Ryb3k6IGJpbmRpbmd9OyBcbiAgICByZXR1cm4gYmluZGluZztcbiAgfWVsc2V7XG4gICAgaWYoIG5hbWUgPT09ICdyZWYnICAmJiB2YWx1ZSAhPSBudWxsICYmIG9wdGlvbnMuZnJvbUVsZW1lbnQpe1xuICAgICAgdmFyIHJlZiA9IHZhbHVlLnR5cGUgPT09ICdleHByZXNzaW9uJz8gdmFsdWUuZ2V0KHNlbGYpOiB2YWx1ZTtcbiAgICAgIHZhciByZWZzID0gdGhpcy4kcmVmcztcbiAgICAgIGlmKHJlZnMpe1xuICAgICAgICByZWZzW3JlZl0gPSBlbGVtZW50XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJlZnNbcmVmXSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHZhbHVlLnR5cGUgPT09ICdleHByZXNzaW9uJyApe1xuXG4gICAgICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlLCBvbGQpe1xuICAgICAgICBkb20uYXR0cihlbGVtZW50LCBuYW1lLCBudmFsdWUpO1xuICAgICAgfSwge2luaXQ6IHRydWV9KTtcbiAgICB9ZWxzZXtcbiAgICAgIGlmKF8uaXNCb29sZWFuQXR0cihuYW1lKSl7XG4gICAgICAgIGRvbS5hdHRyKGVsZW1lbnQsIG5hbWUsIHRydWUpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGRvbS5hdHRyKGVsZW1lbnQsIG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIW9wdGlvbnMuZnJvbUVsZW1lbnQpe1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKXtcbiAgICAgICAgICBkb20uYXR0cihlbGVtZW50LCBuYW1lLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG5cbiIsIi8qIVxuICAqIFJlcXdlc3QhIEEgZ2VuZXJhbCBwdXJwb3NlIFhIUiBjb25uZWN0aW9uIG1hbmFnZXJcbiAgKiBsaWNlbnNlIE1JVCAoYykgRHVzdGluIERpYXogMjAxNFxuICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvcmVxd2VzdFxuICAqL1xuXG4hZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpXG59KCdyZXF3ZXN0JywgdGhpcywgZnVuY3Rpb24gKCkge1xuXG4gIHZhciB3aW4gPSB3aW5kb3dcbiAgICAsIGRvYyA9IGRvY3VtZW50XG4gICAgLCBodHRwc1JlID0gL15odHRwL1xuICAgICwgcHJvdG9jb2xSZSA9IC8oXlxcdyspOlxcL1xcLy9cbiAgICAsIHR3b0h1bmRvID0gL14oMjBcXGR8MTIyMykkLyAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICAgICwgYnlUYWcgPSAnZ2V0RWxlbWVudHNCeVRhZ05hbWUnXG4gICAgLCByZWFkeVN0YXRlID0gJ3JlYWR5U3RhdGUnXG4gICAgLCBjb250ZW50VHlwZSA9ICdDb250ZW50LVR5cGUnXG4gICAgLCByZXF1ZXN0ZWRXaXRoID0gJ1gtUmVxdWVzdGVkLVdpdGgnXG4gICAgLCBoZWFkID0gZG9jW2J5VGFnXSgnaGVhZCcpWzBdXG4gICAgLCB1bmlxaWQgPSAwXG4gICAgLCBjYWxsYmFja1ByZWZpeCA9ICdyZXF3ZXN0XycgKyAoK25ldyBEYXRlKCkpXG4gICAgLCBsYXN0VmFsdWUgLy8gZGF0YSBzdG9yZWQgYnkgdGhlIG1vc3QgcmVjZW50IEpTT05QIGNhbGxiYWNrXG4gICAgLCB4bWxIdHRwUmVxdWVzdCA9ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAsIHhEb21haW5SZXF1ZXN0ID0gJ1hEb21haW5SZXF1ZXN0J1xuICAgICwgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbiAgICAsIGlzQXJyYXkgPSB0eXBlb2YgQXJyYXkuaXNBcnJheSA9PSAnZnVuY3Rpb24nXG4gICAgICAgID8gQXJyYXkuaXNBcnJheVxuICAgICAgICA6IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICByZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgfVxuXG4gICAgLCBkZWZhdWx0SGVhZGVycyA9IHtcbiAgICAgICAgICAnY29udGVudFR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAsICdyZXF1ZXN0ZWRXaXRoJzogeG1sSHR0cFJlcXVlc3RcbiAgICAgICAgLCAnYWNjZXB0Jzoge1xuICAgICAgICAgICAgICAnKic6ICAndGV4dC9qYXZhc2NyaXB0LCB0ZXh0L2h0bWwsIGFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWwsICovKidcbiAgICAgICAgICAgICwgJ3htbCc6ICAnYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbCdcbiAgICAgICAgICAgICwgJ2h0bWwnOiAndGV4dC9odG1sJ1xuICAgICAgICAgICAgLCAndGV4dCc6ICd0ZXh0L3BsYWluJ1xuICAgICAgICAgICAgLCAnanNvbic6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHQnXG4gICAgICAgICAgICAsICdqcyc6ICAgJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQsIHRleHQvamF2YXNjcmlwdCdcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAsIHhociA9IGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgLy8gaXMgaXQgeC1kb21haW5cbiAgICAgICAgaWYgKG9bJ2Nyb3NzT3JpZ2luJ10gPT09IHRydWUpIHtcbiAgICAgICAgICB2YXIgeGhyID0gd2luW3htbEh0dHBSZXF1ZXN0XSA/IG5ldyBYTUxIdHRwUmVxdWVzdCgpIDogbnVsbFxuICAgICAgICAgIGlmICh4aHIgJiYgJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgICAgICByZXR1cm4geGhyXG4gICAgICAgICAgfSBlbHNlIGlmICh3aW5beERvbWFpblJlcXVlc3RdKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCcm93c2VyIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzJylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod2luW3htbEh0dHBSZXF1ZXN0XSkge1xuICAgICAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgLCBnbG9iYWxTZXR1cE9wdGlvbnMgPSB7XG4gICAgICAgIGRhdGFGaWx0ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgfVxuICAgICAgfVxuXG4gIGZ1bmN0aW9uIHN1Y2NlZWQocikge1xuICAgIHZhciBwcm90b2NvbCA9IHByb3RvY29sUmUuZXhlYyhyLnVybCk7XG4gICAgcHJvdG9jb2wgPSAocHJvdG9jb2wgJiYgcHJvdG9jb2xbMV0pIHx8IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICByZXR1cm4gaHR0cHNSZS50ZXN0KHByb3RvY29sKSA/IHR3b0h1bmRvLnRlc3Qoci5yZXF1ZXN0LnN0YXR1cykgOiAhIXIucmVxdWVzdC5yZXNwb25zZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVJlYWR5U3RhdGUociwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gdXNlIF9hYm9ydGVkIHRvIG1pdGlnYXRlIGFnYWluc3QgSUUgZXJyIGMwMGMwMjNmXG4gICAgICAvLyAoY2FuJ3QgcmVhZCBwcm9wcyBvbiBhYm9ydGVkIHJlcXVlc3Qgb2JqZWN0cylcbiAgICAgIGlmIChyLl9hYm9ydGVkKSByZXR1cm4gZXJyb3Ioci5yZXF1ZXN0KVxuICAgICAgaWYgKHIuX3RpbWVkT3V0KSByZXR1cm4gZXJyb3Ioci5yZXF1ZXN0LCAnUmVxdWVzdCBpcyBhYm9ydGVkOiB0aW1lb3V0JylcbiAgICAgIGlmIChyLnJlcXVlc3QgJiYgci5yZXF1ZXN0W3JlYWR5U3RhdGVdID09IDQpIHtcbiAgICAgICAgci5yZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG5vb3BcbiAgICAgICAgaWYgKHN1Y2NlZWQocikpIHN1Y2Nlc3Moci5yZXF1ZXN0KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgZXJyb3Ioci5yZXF1ZXN0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEhlYWRlcnMoaHR0cCwgbykge1xuICAgIHZhciBoZWFkZXJzID0gb1snaGVhZGVycyddIHx8IHt9XG4gICAgICAsIGhcblxuICAgIGhlYWRlcnNbJ0FjY2VwdCddID0gaGVhZGVyc1snQWNjZXB0J11cbiAgICAgIHx8IGRlZmF1bHRIZWFkZXJzWydhY2NlcHQnXVtvWyd0eXBlJ11dXG4gICAgICB8fCBkZWZhdWx0SGVhZGVyc1snYWNjZXB0J11bJyonXVxuXG4gICAgdmFyIGlzQUZvcm1EYXRhID0gdHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIChvWydkYXRhJ10gaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG4gICAgLy8gYnJlYWtzIGNyb3NzLW9yaWdpbiByZXF1ZXN0cyB3aXRoIGxlZ2FjeSBicm93c2Vyc1xuICAgIGlmICghb1snY3Jvc3NPcmlnaW4nXSAmJiAhaGVhZGVyc1tyZXF1ZXN0ZWRXaXRoXSkgaGVhZGVyc1tyZXF1ZXN0ZWRXaXRoXSA9IGRlZmF1bHRIZWFkZXJzWydyZXF1ZXN0ZWRXaXRoJ11cbiAgICBpZiAoIWhlYWRlcnNbY29udGVudFR5cGVdICYmICFpc0FGb3JtRGF0YSkgaGVhZGVyc1tjb250ZW50VHlwZV0gPSBvWydjb250ZW50VHlwZSddIHx8IGRlZmF1bHRIZWFkZXJzWydjb250ZW50VHlwZSddXG4gICAgZm9yIChoIGluIGhlYWRlcnMpXG4gICAgICBoZWFkZXJzLmhhc093blByb3BlcnR5KGgpICYmICdzZXRSZXF1ZXN0SGVhZGVyJyBpbiBodHRwICYmIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihoLCBoZWFkZXJzW2hdKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q3JlZGVudGlhbHMoaHR0cCwgbykge1xuICAgIGlmICh0eXBlb2Ygb1snd2l0aENyZWRlbnRpYWxzJ10gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBodHRwLndpdGhDcmVkZW50aWFscyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHAud2l0aENyZWRlbnRpYWxzID0gISFvWyd3aXRoQ3JlZGVudGlhbHMnXVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYWxDYWxsYmFjayhkYXRhKSB7XG4gICAgbGFzdFZhbHVlID0gZGF0YVxuICB9XG5cbiAgZnVuY3Rpb24gdXJsYXBwZW5kICh1cmwsIHMpIHtcbiAgICByZXR1cm4gdXJsICsgKC9cXD8vLnRlc3QodXJsKSA/ICcmJyA6ICc/JykgKyBzXG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVKc29ucChvLCBmbiwgZXJyLCB1cmwpIHtcbiAgICB2YXIgcmVxSWQgPSB1bmlxaWQrK1xuICAgICAgLCBjYmtleSA9IG9bJ2pzb25wQ2FsbGJhY2snXSB8fCAnY2FsbGJhY2snIC8vIHRoZSAnY2FsbGJhY2snIGtleVxuICAgICAgLCBjYnZhbCA9IG9bJ2pzb25wQ2FsbGJhY2tOYW1lJ10gfHwgcmVxd2VzdC5nZXRjYWxsYmFja1ByZWZpeChyZXFJZClcbiAgICAgICwgY2JyZWcgPSBuZXcgUmVnRXhwKCcoKF58XFxcXD98JiknICsgY2JrZXkgKyAnKT0oW14mXSspJylcbiAgICAgICwgbWF0Y2ggPSB1cmwubWF0Y2goY2JyZWcpXG4gICAgICAsIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgLCBsb2FkZWQgPSAwXG4gICAgICAsIGlzSUUxMCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRSAxMC4wJykgIT09IC0xXG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIGlmIChtYXRjaFszXSA9PT0gJz8nKSB7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKGNicmVnLCAnJDE9JyArIGNidmFsKSAvLyB3aWxkY2FyZCBjYWxsYmFjayBmdW5jIG5hbWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNidmFsID0gbWF0Y2hbM10gLy8gcHJvdmlkZWQgY2FsbGJhY2sgZnVuYyBuYW1lXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHVybGFwcGVuZCh1cmwsIGNia2V5ICsgJz0nICsgY2J2YWwpIC8vIG5vIGNhbGxiYWNrIGRldGFpbHMsIGFkZCAnZW1cbiAgICB9XG5cbiAgICB3aW5bY2J2YWxdID0gZ2VuZXJhbENhbGxiYWNrXG5cbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgc2NyaXB0LnNyYyA9IHVybFxuICAgIHNjcmlwdC5hc3luYyA9IHRydWVcbiAgICBpZiAodHlwZW9mIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgIT09ICd1bmRlZmluZWQnICYmICFpc0lFMTApIHtcbiAgICAgIC8vIG5lZWQgdGhpcyBmb3IgSUUgZHVlIHRvIG91dC1vZi1vcmRlciBvbnJlYWR5c3RhdGVjaGFuZ2UoKSwgYmluZGluZyBzY3JpcHRcbiAgICAgIC8vIGV4ZWN1dGlvbiB0byBhbiBldmVudCBsaXN0ZW5lciBnaXZlcyB1cyBjb250cm9sIG92ZXIgd2hlbiB0aGUgc2NyaXB0XG4gICAgICAvLyBpcyBleGVjdXRlZC4gU2VlIGh0dHA6Ly9qYXVib3VyZy5uZXQvMjAxMC8wNy9sb2FkaW5nLXNjcmlwdC1hcy1vbmNsaWNrLWhhbmRsZXItb2YuaHRtbFxuICAgICAgc2NyaXB0Lmh0bWxGb3IgPSBzY3JpcHQuaWQgPSAnX3JlcXdlc3RfJyArIHJlcUlkXG4gICAgfVxuXG4gICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoKHNjcmlwdFtyZWFkeVN0YXRlXSAmJiBzY3JpcHRbcmVhZHlTdGF0ZV0gIT09ICdjb21wbGV0ZScgJiYgc2NyaXB0W3JlYWR5U3RhdGVdICE9PSAnbG9hZGVkJykgfHwgbG9hZGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsXG4gICAgICBzY3JpcHQub25jbGljayAmJiBzY3JpcHQub25jbGljaygpXG4gICAgICAvLyBDYWxsIHRoZSB1c2VyIGNhbGxiYWNrIHdpdGggdGhlIGxhc3QgdmFsdWUgc3RvcmVkIGFuZCBjbGVhbiB1cCB2YWx1ZXMgYW5kIHNjcmlwdHMuXG4gICAgICBmbihsYXN0VmFsdWUpXG4gICAgICBsYXN0VmFsdWUgPSB1bmRlZmluZWRcbiAgICAgIGhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0KVxuICAgICAgbG9hZGVkID0gMVxuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgc2NyaXB0IHRvIHRoZSBET00gaGVhZFxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuXG4gICAgLy8gRW5hYmxlIEpTT05QIHRpbWVvdXRcbiAgICByZXR1cm4ge1xuICAgICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsXG4gICAgICAgIGVycih7fSwgJ1JlcXVlc3QgaXMgYWJvcnRlZDogdGltZW91dCcsIHt9KVxuICAgICAgICBsYXN0VmFsdWUgPSB1bmRlZmluZWRcbiAgICAgICAgaGVhZC5yZW1vdmVDaGlsZChzY3JpcHQpXG4gICAgICAgIGxvYWRlZCA9IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRSZXF1ZXN0KGZuLCBlcnIpIHtcbiAgICB2YXIgbyA9IHRoaXMub1xuICAgICAgLCBtZXRob2QgPSAob1snbWV0aG9kJ10gfHwgJ0dFVCcpLnRvVXBwZXJDYXNlKClcbiAgICAgICwgdXJsID0gdHlwZW9mIG8gPT09ICdzdHJpbmcnID8gbyA6IG9bJ3VybCddXG4gICAgICAvLyBjb252ZXJ0IG5vbi1zdHJpbmcgb2JqZWN0cyB0byBxdWVyeS1zdHJpbmcgZm9ybSB1bmxlc3Mgb1sncHJvY2Vzc0RhdGEnXSBpcyBmYWxzZVxuICAgICAgLCBkYXRhID0gKG9bJ3Byb2Nlc3NEYXRhJ10gIT09IGZhbHNlICYmIG9bJ2RhdGEnXSAmJiB0eXBlb2Ygb1snZGF0YSddICE9PSAnc3RyaW5nJylcbiAgICAgICAgPyByZXF3ZXN0LnRvUXVlcnlTdHJpbmcob1snZGF0YSddKVxuICAgICAgICA6IChvWydkYXRhJ10gfHwgbnVsbClcbiAgICAgICwgaHR0cFxuICAgICAgLCBzZW5kV2FpdCA9IGZhbHNlXG5cbiAgICAvLyBpZiB3ZSdyZSB3b3JraW5nIG9uIGEgR0VUIHJlcXVlc3QgYW5kIHdlIGhhdmUgZGF0YSB0aGVuIHdlIHNob3VsZCBhcHBlbmRcbiAgICAvLyBxdWVyeSBzdHJpbmcgdG8gZW5kIG9mIFVSTCBhbmQgbm90IHBvc3QgZGF0YVxuICAgIGlmICgob1sndHlwZSddID09ICdqc29ucCcgfHwgbWV0aG9kID09ICdHRVQnKSAmJiBkYXRhKSB7XG4gICAgICB1cmwgPSB1cmxhcHBlbmQodXJsLCBkYXRhKVxuICAgICAgZGF0YSA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAob1sndHlwZSddID09ICdqc29ucCcpIHJldHVybiBoYW5kbGVKc29ucChvLCBmbiwgZXJyLCB1cmwpXG5cbiAgICAvLyBnZXQgdGhlIHhociBmcm9tIHRoZSBmYWN0b3J5IGlmIHBhc3NlZFxuICAgIC8vIGlmIHRoZSBmYWN0b3J5IHJldHVybnMgbnVsbCwgZmFsbC1iYWNrIHRvIG91cnNcbiAgICBodHRwID0gKG8ueGhyICYmIG8ueGhyKG8pKSB8fCB4aHIobylcblxuICAgIGh0dHAub3BlbihtZXRob2QsIHVybCwgb1snYXN5bmMnXSA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWUpXG4gICAgc2V0SGVhZGVycyhodHRwLCBvKVxuICAgIHNldENyZWRlbnRpYWxzKGh0dHAsIG8pXG4gICAgaWYgKHdpblt4RG9tYWluUmVxdWVzdF0gJiYgaHR0cCBpbnN0YW5jZW9mIHdpblt4RG9tYWluUmVxdWVzdF0pIHtcbiAgICAgICAgaHR0cC5vbmxvYWQgPSBmblxuICAgICAgICBodHRwLm9uZXJyb3IgPSBlcnJcbiAgICAgICAgLy8gTk9URTogc2VlXG4gICAgICAgIC8vIGh0dHA6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9pZXdlYmRldmVsb3BtZW50L3RocmVhZC8zMGVmM2FkZC03NjdjLTQ0MzYtYjhhOS1mMWNhMTliNDgxMmVcbiAgICAgICAgaHR0cC5vbnByb2dyZXNzID0gZnVuY3Rpb24oKSB7fVxuICAgICAgICBzZW5kV2FpdCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVSZWFkeVN0YXRlKHRoaXMsIGZuLCBlcnIpXG4gICAgfVxuICAgIG9bJ2JlZm9yZSddICYmIG9bJ2JlZm9yZSddKGh0dHApXG4gICAgaWYgKHNlbmRXYWl0KSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHR0cC5zZW5kKGRhdGEpXG4gICAgICB9LCAyMDApXG4gICAgfSBlbHNlIHtcbiAgICAgIGh0dHAuc2VuZChkYXRhKVxuICAgIH1cbiAgICByZXR1cm4gaHR0cFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxd2VzdChvLCBmbikge1xuICAgIHRoaXMubyA9IG9cbiAgICB0aGlzLmZuID0gZm5cblxuICAgIGluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VHlwZShoZWFkZXIpIHtcbiAgICAvLyBqc29uLCBqYXZhc2NyaXB0LCB0ZXh0L3BsYWluLCB0ZXh0L2h0bWwsIHhtbFxuICAgIGlmIChoZWFkZXIubWF0Y2goJ2pzb24nKSkgcmV0dXJuICdqc29uJ1xuICAgIGlmIChoZWFkZXIubWF0Y2goJ2phdmFzY3JpcHQnKSkgcmV0dXJuICdqcydcbiAgICBpZiAoaGVhZGVyLm1hdGNoKCd0ZXh0JykpIHJldHVybiAnaHRtbCdcbiAgICBpZiAoaGVhZGVyLm1hdGNoKCd4bWwnKSkgcmV0dXJuICd4bWwnXG4gIH1cblxuICBmdW5jdGlvbiBpbml0KG8sIGZuKSB7XG5cbiAgICB0aGlzLnVybCA9IHR5cGVvZiBvID09ICdzdHJpbmcnID8gbyA6IG9bJ3VybCddXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbFxuXG4gICAgLy8gd2hldGhlciByZXF1ZXN0IGhhcyBiZWVuIGZ1bGZpbGxlZCBmb3IgcHVycG9zZVxuICAgIC8vIG9mIHRyYWNraW5nIHRoZSBQcm9taXNlc1xuICAgIHRoaXMuX2Z1bGZpbGxlZCA9IGZhbHNlXG4gICAgLy8gc3VjY2VzcyBoYW5kbGVyc1xuICAgIHRoaXMuX3N1Y2Nlc3NIYW5kbGVyID0gZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVycyA9IFtdXG4gICAgLy8gZXJyb3IgaGFuZGxlcnNcbiAgICB0aGlzLl9lcnJvckhhbmRsZXJzID0gW11cbiAgICAvLyBjb21wbGV0ZSAoYm90aCBzdWNjZXNzIGFuZCBmYWlsKSBoYW5kbGVyc1xuICAgIHRoaXMuX2NvbXBsZXRlSGFuZGxlcnMgPSBbXVxuICAgIHRoaXMuX2VycmVkID0gZmFsc2VcbiAgICB0aGlzLl9yZXNwb25zZUFyZ3MgPSB7fVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgICBmbiA9IGZuIHx8IGZ1bmN0aW9uICgpIHt9XG5cbiAgICBpZiAob1sndGltZW91dCddKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGltZWRPdXQoKVxuICAgICAgfSwgb1sndGltZW91dCddKVxuICAgIH1cblxuICAgIGlmIChvWydzdWNjZXNzJ10pIHtcbiAgICAgIHRoaXMuX3N1Y2Nlc3NIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBvWydzdWNjZXNzJ10uYXBwbHkobywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvWydlcnJvciddKSB7XG4gICAgICB0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBvWydlcnJvciddLmFwcGx5KG8sIGFyZ3VtZW50cylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKG9bJ2NvbXBsZXRlJ10pIHtcbiAgICAgIHRoaXMuX2NvbXBsZXRlSGFuZGxlcnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9bJ2NvbXBsZXRlJ10uYXBwbHkobywgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSAocmVzcCkge1xuICAgICAgb1sndGltZW91dCddICYmIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG4gICAgICBzZWxmLnRpbWVvdXQgPSBudWxsXG4gICAgICB3aGlsZSAoc2VsZi5fY29tcGxldGVIYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNlbGYuX2NvbXBsZXRlSGFuZGxlcnMuc2hpZnQoKShyZXNwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MgKHJlc3ApIHtcbiAgICAgIHZhciB0eXBlID0gb1sndHlwZSddIHx8IHJlc3AgJiYgc2V0VHlwZShyZXNwLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSkgLy8gcmVzcCBjYW4gYmUgdW5kZWZpbmVkIGluIElFXG4gICAgICByZXNwID0gKHR5cGUgIT09ICdqc29ucCcpID8gc2VsZi5yZXF1ZXN0IDogcmVzcFxuICAgICAgLy8gdXNlIGdsb2JhbCBkYXRhIGZpbHRlciBvbiByZXNwb25zZSB0ZXh0XG4gICAgICB2YXIgZmlsdGVyZWRSZXNwb25zZSA9IGdsb2JhbFNldHVwT3B0aW9ucy5kYXRhRmlsdGVyKHJlc3AucmVzcG9uc2VUZXh0LCB0eXBlKVxuICAgICAgICAsIHIgPSBmaWx0ZXJlZFJlc3BvbnNlXG4gICAgICB0cnkge1xuICAgICAgICByZXNwLnJlc3BvbnNlVGV4dCA9IHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gY2FuJ3QgYXNzaWduIHRoaXMgaW4gSUU8PTgsIGp1c3QgaWdub3JlXG4gICAgICB9XG4gICAgICBpZiAocikge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3AgPSB3aW4uSlNPTiA/IHdpbi5KU09OLnBhcnNlKHIpIDogZXZhbCgnKCcgKyByICsgJyknKVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yKHJlc3AsICdDb3VsZCBub3QgcGFyc2UgSlNPTiBpbiByZXNwb25zZScsIGVycilcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnanMnOlxuICAgICAgICAgIHJlc3AgPSBldmFsKHIpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAgcmVzcCA9IHJcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd4bWwnOlxuICAgICAgICAgIHJlc3AgPSByZXNwLnJlc3BvbnNlWE1MXG4gICAgICAgICAgICAgICYmIHJlc3AucmVzcG9uc2VYTUwucGFyc2VFcnJvciAvLyBJRSB0cm9sb2xvXG4gICAgICAgICAgICAgICYmIHJlc3AucmVzcG9uc2VYTUwucGFyc2VFcnJvci5lcnJvckNvZGVcbiAgICAgICAgICAgICAgJiYgcmVzcC5yZXNwb25zZVhNTC5wYXJzZUVycm9yLnJlYXNvblxuICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICA6IHJlc3AucmVzcG9uc2VYTUxcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX3Jlc3BvbnNlQXJncy5yZXNwID0gcmVzcFxuICAgICAgc2VsZi5fZnVsZmlsbGVkID0gdHJ1ZVxuICAgICAgZm4ocmVzcClcbiAgICAgIHNlbGYuX3N1Y2Nlc3NIYW5kbGVyKHJlc3ApXG4gICAgICB3aGlsZSAoc2VsZi5fZnVsZmlsbG1lbnRIYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3AgPSBzZWxmLl9mdWxmaWxsbWVudEhhbmRsZXJzLnNoaWZ0KCkocmVzcClcbiAgICAgIH1cblxuICAgICAgY29tcGxldGUocmVzcClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aW1lZE91dCgpIHtcbiAgICAgIHNlbGYuX3RpbWVkT3V0ID0gdHJ1ZVxuICAgICAgc2VsZi5yZXF1ZXN0LmFib3J0KCkgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvcihyZXNwLCBtc2csIHQpIHtcbiAgICAgIHJlc3AgPSBzZWxmLnJlcXVlc3RcbiAgICAgIHNlbGYuX3Jlc3BvbnNlQXJncy5yZXNwID0gcmVzcFxuICAgICAgc2VsZi5fcmVzcG9uc2VBcmdzLm1zZyA9IG1zZ1xuICAgICAgc2VsZi5fcmVzcG9uc2VBcmdzLnQgPSB0XG4gICAgICBzZWxmLl9lcnJlZCA9IHRydWVcbiAgICAgIHdoaWxlIChzZWxmLl9lcnJvckhhbmRsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2VsZi5fZXJyb3JIYW5kbGVycy5zaGlmdCgpKHJlc3AsIG1zZywgdClcbiAgICAgIH1cbiAgICAgIGNvbXBsZXRlKHJlc3ApXG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gZ2V0UmVxdWVzdC5jYWxsKHRoaXMsIHN1Y2Nlc3MsIGVycm9yKVxuICB9XG5cbiAgUmVxd2VzdC5wcm90b3R5cGUgPSB7XG4gICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX2Fib3J0ZWQgPSB0cnVlXG4gICAgICB0aGlzLnJlcXVlc3QuYWJvcnQoKVxuICAgIH1cblxuICAsIHJldHJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpbml0LmNhbGwodGhpcywgdGhpcy5vLCB0aGlzLmZuKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNtYWxsIGRldmlhdGlvbiBmcm9tIHRoZSBQcm9taXNlcyBBIENvbW1vbkpzIHNwZWNpZmljYXRpb25cbiAgICAgKiBodHRwOi8vd2lraS5jb21tb25qcy5vcmcvd2lraS9Qcm9taXNlcy9BXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBgdGhlbmAgd2lsbCBleGVjdXRlIHVwb24gc3VjY2Vzc2Z1bCByZXF1ZXN0c1xuICAgICAqL1xuICAsIHRoZW46IGZ1bmN0aW9uIChzdWNjZXNzLCBmYWlsKSB7XG4gICAgICBzdWNjZXNzID0gc3VjY2VzcyB8fCBmdW5jdGlvbiAoKSB7fVxuICAgICAgZmFpbCA9IGZhaWwgfHwgZnVuY3Rpb24gKCkge31cbiAgICAgIGlmICh0aGlzLl9mdWxmaWxsZWQpIHtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VBcmdzLnJlc3AgPSBzdWNjZXNzKHRoaXMuX3Jlc3BvbnNlQXJncy5yZXNwKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9lcnJlZCkge1xuICAgICAgICBmYWlsKHRoaXMuX3Jlc3BvbnNlQXJncy5yZXNwLCB0aGlzLl9yZXNwb25zZUFyZ3MubXNnLCB0aGlzLl9yZXNwb25zZUFyZ3MudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcnMucHVzaChzdWNjZXNzKVxuICAgICAgICB0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goZmFpbClcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYGFsd2F5c2Agd2lsbCBleGVjdXRlIHdoZXRoZXIgdGhlIHJlcXVlc3Qgc3VjY2VlZHMgb3IgZmFpbHNcbiAgICAgKi9cbiAgLCBhbHdheXM6IGZ1bmN0aW9uIChmbikge1xuICAgICAgaWYgKHRoaXMuX2Z1bGZpbGxlZCB8fCB0aGlzLl9lcnJlZCkge1xuICAgICAgICBmbih0aGlzLl9yZXNwb25zZUFyZ3MucmVzcClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlSGFuZGxlcnMucHVzaChmbilcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYGZhaWxgIHdpbGwgZXhlY3V0ZSB3aGVuIHRoZSByZXF1ZXN0IGZhaWxzXG4gICAgICovXG4gICwgZmFpbDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICBpZiAodGhpcy5fZXJyZWQpIHtcbiAgICAgICAgZm4odGhpcy5fcmVzcG9uc2VBcmdzLnJlc3AsIHRoaXMuX3Jlc3BvbnNlQXJncy5tc2csIHRoaXMuX3Jlc3BvbnNlQXJncy50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZXJyb3JIYW5kbGVycy5wdXNoKGZuKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICwgJ2NhdGNoJzogZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5mYWlsKGZuKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcXdlc3QobywgZm4pIHtcbiAgICByZXR1cm4gbmV3IFJlcXdlc3QobywgZm4pXG4gIH1cblxuICAvLyBub3JtYWxpemUgbmV3bGluZSB2YXJpYW50cyBhY2NvcmRpbmcgdG8gc3BlYyAtPiBDUkxGXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZShzKSB7XG4gICAgcmV0dXJuIHMgPyBzLnJlcGxhY2UoL1xccj9cXG4vZywgJ1xcclxcbicpIDogJydcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlcmlhbChlbCwgY2IpIHtcbiAgICB2YXIgbiA9IGVsLm5hbWVcbiAgICAgICwgdCA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgLCBvcHRDYiA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgLy8gSUUgZ2l2ZXMgdmFsdWU9XCJcIiBldmVuIHdoZXJlIHRoZXJlIGlzIG5vIHZhbHVlIGF0dHJpYnV0ZVxuICAgICAgICAgIC8vICdzcGVjaWZpZWQnIHJlZjogaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtQ29yZS9jb3JlLmh0bWwjSUQtODYyNTI5MjczXG4gICAgICAgICAgaWYgKG8gJiYgIW9bJ2Rpc2FibGVkJ10pXG4gICAgICAgICAgICBjYihuLCBub3JtYWxpemUob1snYXR0cmlidXRlcyddWyd2YWx1ZSddICYmIG9bJ2F0dHJpYnV0ZXMnXVsndmFsdWUnXVsnc3BlY2lmaWVkJ10gPyBvWyd2YWx1ZSddIDogb1sndGV4dCddKSlcbiAgICAgICAgfVxuICAgICAgLCBjaCwgcmEsIHZhbCwgaVxuXG4gICAgLy8gZG9uJ3Qgc2VyaWFsaXplIGVsZW1lbnRzIHRoYXQgYXJlIGRpc2FibGVkIG9yIHdpdGhvdXQgYSBuYW1lXG4gICAgaWYgKGVsLmRpc2FibGVkIHx8ICFuKSByZXR1cm5cblxuICAgIHN3aXRjaCAodCkge1xuICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgIGlmICghL3Jlc2V0fGJ1dHRvbnxpbWFnZXxmaWxlL2kudGVzdChlbC50eXBlKSkge1xuICAgICAgICBjaCA9IC9jaGVja2JveC9pLnRlc3QoZWwudHlwZSlcbiAgICAgICAgcmEgPSAvcmFkaW8vaS50ZXN0KGVsLnR5cGUpXG4gICAgICAgIHZhbCA9IGVsLnZhbHVlXG4gICAgICAgIC8vIFdlYktpdCBnaXZlcyB1cyBcIlwiIGluc3RlYWQgb2YgXCJvblwiIGlmIGEgY2hlY2tib3ggaGFzIG5vIHZhbHVlLCBzbyBjb3JyZWN0IGl0IGhlcmVcbiAgICAgICAgOyghKGNoIHx8IHJhKSB8fCBlbC5jaGVja2VkKSAmJiBjYihuLCBub3JtYWxpemUoY2ggJiYgdmFsID09PSAnJyA/ICdvbicgOiB2YWwpKVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICBjYihuLCBub3JtYWxpemUoZWwudmFsdWUpKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgaWYgKGVsLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdC1vbmUnKSB7XG4gICAgICAgIG9wdENiKGVsLnNlbGVjdGVkSW5kZXggPj0gMCA/IGVsLm9wdGlvbnNbZWwuc2VsZWN0ZWRJbmRleF0gOiBudWxsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gMDsgZWwubGVuZ3RoICYmIGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGVsLm9wdGlvbnNbaV0uc2VsZWN0ZWQgJiYgb3B0Q2IoZWwub3B0aW9uc1tpXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBjb2xsZWN0IHVwIGFsbCBmb3JtIGVsZW1lbnRzIGZvdW5kIGZyb20gdGhlIHBhc3NlZCBhcmd1bWVudCBlbGVtZW50cyBhbGxcbiAgLy8gdGhlIHdheSBkb3duIHRvIGNoaWxkIGVsZW1lbnRzOyBwYXNzIGEgJzxmb3JtPicgb3IgZm9ybSBmaWVsZHMuXG4gIC8vIGNhbGxlZCB3aXRoICd0aGlzJz1jYWxsYmFjayB0byB1c2UgZm9yIHNlcmlhbCgpIG9uIGVhY2ggZWxlbWVudFxuICBmdW5jdGlvbiBlYWNoRm9ybUVsZW1lbnQoKSB7XG4gICAgdmFyIGNiID0gdGhpc1xuICAgICAgLCBlLCBpXG4gICAgICAsIHNlcmlhbGl6ZVN1YnRhZ3MgPSBmdW5jdGlvbiAoZSwgdGFncykge1xuICAgICAgICAgIHZhciBpLCBqLCBmYVxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmYSA9IGVbYnlUYWddKHRhZ3NbaV0pXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZmEubGVuZ3RoOyBqKyspIHNlcmlhbChmYVtqXSwgY2IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlID0gYXJndW1lbnRzW2ldXG4gICAgICBpZiAoL2lucHV0fHNlbGVjdHx0ZXh0YXJlYS9pLnRlc3QoZS50YWdOYW1lKSkgc2VyaWFsKGUsIGNiKVxuICAgICAgc2VyaWFsaXplU3VidGFncyhlLCBbICdpbnB1dCcsICdzZWxlY3QnLCAndGV4dGFyZWEnIF0pXG4gICAgfVxuICB9XG5cbiAgLy8gc3RhbmRhcmQgcXVlcnkgc3RyaW5nIHN0eWxlIHNlcmlhbGl6YXRpb25cbiAgZnVuY3Rpb24gc2VyaWFsaXplUXVlcnlTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHJlcXdlc3QudG9RdWVyeVN0cmluZyhyZXF3ZXN0LnNlcmlhbGl6ZUFycmF5LmFwcGx5KG51bGwsIGFyZ3VtZW50cykpXG4gIH1cblxuICAvLyB7ICduYW1lJzogJ3ZhbHVlJywgLi4uIH0gc3R5bGUgc2VyaWFsaXphdGlvblxuICBmdW5jdGlvbiBzZXJpYWxpemVIYXNoKCkge1xuICAgIHZhciBoYXNoID0ge31cbiAgICBlYWNoRm9ybUVsZW1lbnQuYXBwbHkoZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAobmFtZSBpbiBoYXNoKSB7XG4gICAgICAgIGhhc2hbbmFtZV0gJiYgIWlzQXJyYXkoaGFzaFtuYW1lXSkgJiYgKGhhc2hbbmFtZV0gPSBbaGFzaFtuYW1lXV0pXG4gICAgICAgIGhhc2hbbmFtZV0ucHVzaCh2YWx1ZSlcbiAgICAgIH0gZWxzZSBoYXNoW25hbWVdID0gdmFsdWVcbiAgICB9LCBhcmd1bWVudHMpXG4gICAgcmV0dXJuIGhhc2hcbiAgfVxuXG4gIC8vIFsgeyBuYW1lOiAnbmFtZScsIHZhbHVlOiAndmFsdWUnIH0sIC4uLiBdIHN0eWxlIHNlcmlhbGl6YXRpb25cbiAgcmVxd2VzdC5zZXJpYWxpemVBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyID0gW11cbiAgICBlYWNoRm9ybUVsZW1lbnQuYXBwbHkoZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBhcnIucHVzaCh7bmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlfSlcbiAgICB9LCBhcmd1bWVudHMpXG4gICAgcmV0dXJuIGFyclxuICB9XG5cbiAgcmVxd2VzdC5zZXJpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuICAgIHZhciBvcHQsIGZuXG4gICAgICAsIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cbiAgICBvcHQgPSBhcmdzLnBvcCgpXG4gICAgb3B0ICYmIG9wdC5ub2RlVHlwZSAmJiBhcmdzLnB1c2gob3B0KSAmJiAob3B0ID0gbnVsbClcbiAgICBvcHQgJiYgKG9wdCA9IG9wdC50eXBlKVxuXG4gICAgaWYgKG9wdCA9PSAnbWFwJykgZm4gPSBzZXJpYWxpemVIYXNoXG4gICAgZWxzZSBpZiAob3B0ID09ICdhcnJheScpIGZuID0gcmVxd2VzdC5zZXJpYWxpemVBcnJheVxuICAgIGVsc2UgZm4gPSBzZXJpYWxpemVRdWVyeVN0cmluZ1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpXG4gIH1cblxuICByZXF3ZXN0LnRvUXVlcnlTdHJpbmcgPSBmdW5jdGlvbiAobywgdHJhZCkge1xuICAgIHZhciBwcmVmaXgsIGlcbiAgICAgICwgdHJhZGl0aW9uYWwgPSB0cmFkIHx8IGZhbHNlXG4gICAgICAsIHMgPSBbXVxuICAgICAgLCBlbmMgPSBlbmNvZGVVUklDb21wb25lbnRcbiAgICAgICwgYWRkID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAvLyBJZiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpbnZva2UgaXQgYW5kIHJldHVybiBpdHMgdmFsdWVcbiAgICAgICAgICB2YWx1ZSA9ICgnZnVuY3Rpb24nID09PSB0eXBlb2YgdmFsdWUpID8gdmFsdWUoKSA6ICh2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZSlcbiAgICAgICAgICBzW3MubGVuZ3RoXSA9IGVuYyhrZXkpICsgJz0nICsgZW5jKHZhbHVlKVxuICAgICAgICB9XG4gICAgLy8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cbiAgICBpZiAoaXNBcnJheShvKSkge1xuICAgICAgZm9yIChpID0gMDsgbyAmJiBpIDwgby5sZW5ndGg7IGkrKykgYWRkKG9baV1bJ25hbWUnXSwgb1tpXVsndmFsdWUnXSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgdHJhZGl0aW9uYWwsIGVuY29kZSB0aGUgXCJvbGRcIiB3YXkgKHRoZSB3YXkgMS4zLjIgb3Igb2xkZXJcbiAgICAgIC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuICAgICAgZm9yIChwcmVmaXggaW4gbykge1xuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShwcmVmaXgpKSBidWlsZFBhcmFtcyhwcmVmaXgsIG9bcHJlZml4XSwgdHJhZGl0aW9uYWwsIGFkZClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzcGFjZXMgc2hvdWxkIGJlICsgYWNjb3JkaW5nIHRvIHNwZWNcbiAgICByZXR1cm4gcy5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csICcrJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkUGFyYW1zKHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkKSB7XG4gICAgdmFyIG5hbWUsIGksIHZcbiAgICAgICwgcmJyYWNrZXQgPSAvXFxbXFxdJC9cblxuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgIC8vIFNlcmlhbGl6ZSBhcnJheSBpdGVtLlxuICAgICAgZm9yIChpID0gMDsgb2JqICYmIGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdiA9IG9ialtpXVxuICAgICAgICBpZiAodHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdChwcmVmaXgpKSB7XG4gICAgICAgICAgLy8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuICAgICAgICAgIGFkZChwcmVmaXgsIHYpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsgKHR5cGVvZiB2ID09PSAnb2JqZWN0JyA/IGkgOiAnJykgKyAnXScsIHYsIHRyYWRpdGlvbmFsLCBhZGQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9iaiAmJiBvYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIC8vIFNlcmlhbGl6ZSBvYmplY3QgaXRlbS5cbiAgICAgIGZvciAobmFtZSBpbiBvYmopIHtcbiAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsgbmFtZSArICddJywgb2JqW25hbWVdLCB0cmFkaXRpb25hbCwgYWRkKVxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNlcmlhbGl6ZSBzY2FsYXIgaXRlbS5cbiAgICAgIGFkZChwcmVmaXgsIG9iailcbiAgICB9XG4gIH1cblxuICByZXF3ZXN0LmdldGNhbGxiYWNrUHJlZml4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYWxsYmFja1ByZWZpeFxuICB9XG5cbiAgLy8galF1ZXJ5IGFuZCBaZXB0byBjb21wYXRpYmlsaXR5LCBkaWZmZXJlbmNlcyBjYW4gYmUgcmVtYXBwZWQgaGVyZSBzbyB5b3UgY2FuIGNhbGxcbiAgLy8gLmFqYXguY29tcGF0KG9wdGlvbnMsIGNhbGxiYWNrKVxuICByZXF3ZXN0LmNvbXBhdCA9IGZ1bmN0aW9uIChvLCBmbikge1xuICAgIGlmIChvKSB7XG4gICAgICBvWyd0eXBlJ10gJiYgKG9bJ21ldGhvZCddID0gb1sndHlwZSddKSAmJiBkZWxldGUgb1sndHlwZSddXG4gICAgICBvWydkYXRhVHlwZSddICYmIChvWyd0eXBlJ10gPSBvWydkYXRhVHlwZSddKVxuICAgICAgb1snanNvbnBDYWxsYmFjayddICYmIChvWydqc29ucENhbGxiYWNrTmFtZSddID0gb1snanNvbnBDYWxsYmFjayddKSAmJiBkZWxldGUgb1snanNvbnBDYWxsYmFjayddXG4gICAgICBvWydqc29ucCddICYmIChvWydqc29ucENhbGxiYWNrJ10gPSBvWydqc29ucCddKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlcXdlc3QobywgZm4pXG4gIH1cblxuICByZXF3ZXN0LmFqYXhTZXR1cCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICBmb3IgKHZhciBrIGluIG9wdGlvbnMpIHtcbiAgICAgIGdsb2JhbFNldHVwT3B0aW9uc1trXSA9IG9wdGlvbnNba11cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVxd2VzdFxufSk7XG4iLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29tcG9uZW50IOe7hOS7tuWfuuexu1xuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ3VsYXIgPSByZXF1aXJlKCdyZWd1bGFyanMnKTtcbnZhciBfID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi9maWx0ZXIuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgQ29tcG9uZW50XG4gKiBAZXh0ZW5kIFJlZ3VsYXJcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIENvbXBvbmVudCA9IFJlZ3VsYXIuZXh0ZW5kKHtcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICByZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgJ2NsYXNzJzogJydcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH1cbn0pXG4uZmlsdGVyKGZpbHRlcilcbi5kaXJlY3RpdmUoe1xuXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBmaWx0ZXIgPSB7fTtcblxuZmlsdGVyLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIGZpeChzdHIpIHtcbiAgICAgICAgc3RyID0gJycgKyAoU3RyaW5nKHN0cikgfHwgJycpO1xuICAgICAgICByZXR1cm4gc3RyLmxlbmd0aCA8PSAxPyAnMCcgKyBzdHIgOiBzdHI7XG4gICAgfVxuICAgIHZhciBtYXBzID0ge1xuICAgICAgICAneXl5eSc6IGZ1bmN0aW9uKGRhdGUpe3JldHVybiBkYXRlLmdldEZ1bGxZZWFyKCl9LFxuICAgICAgICAnTU0nOiBmdW5jdGlvbihkYXRlKXtyZXR1cm4gZml4KGRhdGUuZ2V0TW9udGgoKSArIDEpOyB9LFxuICAgICAgICAnZGQnOiBmdW5jdGlvbihkYXRlKXsgcmV0dXJuIGZpeChkYXRlLmdldERhdGUoKSkgfSxcbiAgICAgICAgJ0hIJzogZnVuY3Rpb24oZGF0ZSl7cmV0dXJuIGZpeChkYXRlLmdldEhvdXJzKCkpIH0sXG4gICAgICAgICdtbSc6IGZ1bmN0aW9uKGRhdGUpeyByZXR1cm4gZml4KGRhdGUuZ2V0TWludXRlcygpKX0sXG4gICAgICAgICdzcyc6IGZ1bmN0aW9uKGRhdGUpeyByZXR1cm4gZml4KGRhdGUuZ2V0U2Vjb25kcygpKX1cbiAgICB9XG5cbiAgICB2YXIgdHJ1bmsgPSBuZXcgUmVnRXhwKE9iamVjdC5rZXlzKG1hcHMpLmpvaW4oJ3wnKSwnZycpO1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgZm9ybWF0KXtcbiAgICAgICAgaWYoIXZhbHVlKXtyZXR1cm4gJyc7fVxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ3l5eXktTU0tZGQgSEg6bW0nO1xuICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0LnJlcGxhY2UodHJ1bmssIGZ1bmN0aW9uKGNhcHR1cmUpe1xuICAgICAgICAgICAgcmV0dXJuIG1hcHNbY2FwdHVyZV0/IG1hcHNbY2FwdHVyZV0odmFsdWUpOiAnJztcbiAgICAgICAgfSk7XG4gICAgfVxufSgpO1xuXG5maWx0ZXIuYXZlcmFnZSA9IGZ1bmN0aW9uKGFycmF5LCBrZXkpIHtcbiAgICBhcnJheSA9IGFycmF5IHx8IFtdO1xuICAgIHJldHVybiBhcnJheS5sZW5ndGg/IGZpbHRlci50b3RhbChhcnJheSwga2V5KSAvIGFycmF5Lmxlbmd0aCA6IDA7XG59XG5maWx0ZXIudG90YWwgPSBmdW5jdGlvbihhcnJheSwga2V5KSB7XG4gICAgdmFyIHRvdGFsID0gMDtcbiAgICBpZighYXJyYXkpIHJldHVybjtcbiAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKCBpdGVtICl7XG4gICAgICAgIHRvdGFsICs9IGtleT8gaXRlbVtrZXldIDogaXRlbTtcbiAgICB9KVxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuZmlsdGVyLmZpbHRlciA9IGZ1bmN0aW9uKGFycmF5LCBmaWx0ZXJGbikge1xuICAgIGlmKCFhcnJheSB8fCAhYXJyYXkubGVuZ3RoKSByZXR1cm47XG4gICAgcmV0dXJuIGFycmF5LmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmRleCl7XG4gICAgICAgIHJldHVybiBmaWx0ZXJGbihpdGVtLCBpbmRleCk7XG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxd2VzdCA9IHJlcXVpcmUoJ3JlcXdlc3QnKTtcbnZhciBhamF4ID0ge307XG4vLyB2YXIgZXZlbnRFbWl0dGVyID0gbmV3IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcigpO1xuLy8gdmFyIGFqYXggPSB7XG4vLyAgICAgJG9uOiBldmVudEVtaXR0ZXIub24sXG4vLyAgICAgJG9mZjogZXZlbnRFbWl0dGVyLnJlbW92ZUxpc3RlbmVyLFxuLy8gICAgICRlbWl0OiBldmVudEVtaXR0ZXIuZW1pdFxuLy8gfTtcblxudmFyIE5vdGlmeSA9IHJlcXVpcmUoJy4uL21vZHVsZS9ub3RpZnkuanMnKTtcblxuYWpheC5yZXF1ZXN0ID0gZnVuY3Rpb24ob3B0KSB7XG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbigpe307XG4gICAgdmFyIG9sZEVycm9yID0gb3B0LmVycm9yIHx8IG5vb3AsXG4gICAgICAgIG9sZFN1Y2Nlc3MgPSBvcHQuc3VjY2VzcyB8fCBub29wLFxuICAgICAgICBvbGRDb21wbGV0ZSA9IG9wdC5jb21wbGV0ZSB8fCBub29wO1xuXG4gICAgb3B0LmRhdGEgPSBvcHQuZGF0YSB8fCB7fTtcblxuICAgIGlmKCFvcHQuY29udGVudFR5cGUgJiYgb3B0Lm1ldGhvZCAmJiBvcHQubWV0aG9kLnRvTG93ZXJDYXNlKCkgIT09ICdnZXQnKVxuICAgICAgICBvcHQuY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgZWxzZVxuICAgICAgICBvcHQuZGF0YS50aW1lc3RhbXAgPSArbmV3IERhdGU7XG5cbiAgICBpZihvcHQuY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgICBvcHQuZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9wdC5kYXRhKTtcbiAgICB9XG5cbiAgICAvL2FqYXguJGVtaXQoJ3N0YXJ0Jywgb3B0KTtcbiAgICBvcHQuc3VjY2VzcyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy9hamF4LiRlbWl0KCdzdWNjZXNzJywgZGF0YSk7XG5cbiAgICAgICAgaWYoZGF0YS5jb2RlICE9PSAyMDApIHtcbiAgICAgICAgICAgIE5vdGlmeS5lcnJvcihkYXRhLm1zZyk7XG4gICAgICAgICAgICBvbGRFcnJvcihkYXRhLnJlc3VsdCwgZGF0YSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG9sZFN1Y2Nlc3MoZGF0YS5yZXN1bHQsIGRhdGEpO1xuICAgIH1cblxuICAgIG9wdC5lcnJvciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy9hamF4LiRlbWl0KCdlcnJvcicsIGRhdGEpO1xuICAgICAgICBvbGRFcnJvcihkYXRhLnJlc3VsdCwgZGF0YSk7XG4gICAgfVxuXG4gICAgb3B0LmNvbXBsZXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvL2FqYXguJGVtaXQoJ2NvbXBsZXRlJywgZGF0YSk7XG4gICAgICAgIG9sZENvbXBsZXRlKGRhdGEucmVzdWx0LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXF3ZXN0KG9wdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWpheDsiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogU291cmNlQ29tcG9uZW50IOaVsOaNrue7hOS7tuWfuuexu1xuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50LmpzJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBTb3VyY2VDb21wb25lbnRcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIFNvdXJjZUNvbXBvbmVudCA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIHNlcnZpY2U6IG51bGwsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgc291cmNlOiBbXVxuICAgICAgICB9KTtcblxuICAgICAgICBpZih0aGlzLmRhdGEuc2VydmljZSlcbiAgICAgICAgICAgIHRoaXMuc2VydmljZSA9IHRoaXMuZGF0YS5zZXJ2aWNlO1xuXG4gICAgICAgIGlmKHRoaXMuc2VydmljZSlcbiAgICAgICAgICAgIHRoaXMuJHVwZGF0ZVNvdXJjZSgpO1xuXG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBnZXRQYXJhbXMg6L+U5Zue6K+35rGC5pe26ZyA6KaB55qE5Y+C5pWwXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBnZXRQYXJhbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kICR1cGRhdGVTb3VyY2Ug5LuOc2VydmljZeS4reabtOaWsOaVsOaNrua6kFxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcmV0dXJuIHtTb3VyY2VDb21wb25lbnR9IHRoaXNcbiAgICAgKi9cbiAgICAkdXBkYXRlU291cmNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldExpc3QodGhpcy5nZXRQYXJhbXMoKSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLiR1cGRhdGUoJ3NvdXJjZScsIHJlc3VsdCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvdXJjZUNvbXBvbmVudDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWd1bGFyID0gcmVxdWlyZSgncmVndWxhcmpzJyk7XG5cbnZhciBfID0ge1xuICAgIGV4dGVuZDogZnVuY3Rpb24obzEsIG8yLCBvdmVycmlkZSkge1xuICAgICAgICBmb3IodmFyIGkgaW4gbzIpXG4gICAgICAgICAgICBpZihvdmVycmlkZSB8fCBvMVtpXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG8xW2ldID0gbzJbaV1cbiAgICAgICAgcmV0dXJuIG8xO1xuICAgIH0sXG4gICAgZG9tOiBSZWd1bGFyLmRvbSxcbiAgICBtdWx0aWxpbmU6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgdmFyIHJlZyA9IC9eZnVuY3Rpb25cXHMqXFwoXFwpXFxzKlxce1xccypcXC9cXCorXFxzKihbXFxzXFxTXSopXFxzKlxcKitcXC9cXHMqXFx9JC87XG4gICAgICAgIHJldHVybiByZWcuZXhlYyhmdW5jKVsxXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gXzsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tYWNjb3JkaW9uIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8ci1jb250ZW50IC8+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWNjb3JkaW9uICAgICAgIOmAiemhueWNoVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2FjY29yZGlvbi5odG1sJyk7XG52YXIgaXRlbVRlbXBsYXRlID0gcmVxdWlyZSgnLi9hY2NvcmRpb25QYW5lLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEFjY29yZGlvblxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBBY2NvcmRpb24gPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnYWNjb3JkaW9uJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgc291cmNlOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbnZhciBBY2NvcmRpb25QYW5lID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2FjY29yZGlvblBhbmUnLFxuICAgIHRlbXBsYXRlOiBpdGVtVGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICBvcGVuOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG5cbiAgICAgICAgaWYodGhpcy4kb3V0ZXIpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSB0aGlzLiRvdXRlci5kYXRhLnNvdXJjZTtcbiAgICAgICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIG9wZW46IG9wZW4sXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGF0YS5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBhY2NvcmRpb246IHRoaXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzb3VyY2UucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihvcGVuKSB7XG4gICAgICAgIHRoaXMuZGF0YS5vcGVuID0gb3BlbjtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY2NvcmRpb247IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJhY2NvcmRpb25fcGFuZVxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImFjY29yZGlvbl9wYW5lX2hkXFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT57bmFtZX08L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiYWNjb3JkaW9uX3BhbmVfYmRcXFwiIHItaGlkZT17IW9wZW59PiAgICAgICAgPHItY29udGVudD4gICAgPC9kaXY+PC9kaXY+XCIiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtY2FsZW5kYXIge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX2hkXFxcIj4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9wcmV2XFxcIj4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCIgb24tY2xpY2s9e3RoaXMuYWRkWWVhcigtMSl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWFuZ2xlLWRvdWJsZS1sZWZ0XFxcIj48L2k+PC9zcGFuPiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIiBvbi1jbGljaz17dGhpcy5hZGRNb250aCgtMSl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWFuZ2xlLWxlZnRcXFwiPjwvaT48L3NwYW4+ICAgICAgICA8L3NwYW4+ICAgICAgICA8c3Bhbj57ZGF0ZSB8IGZvcm1hdDogXFwneXl5eS1NTVxcJ308L3NwYW4+ICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfbmV4dFxcXCI+ICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIG9uLWNsaWNrPXt0aGlzLmFkZE1vbnRoKDEpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1hbmdsZS1yaWdodFxcXCI+PC9pPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCIgb24tY2xpY2s9e3RoaXMuYWRkWWVhcigxKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tYW5nbGUtZG91YmxlLXJpZ2h0XFxcIj48L2k+PC9zcGFuPiAgICAgICAgPC9zcGFuPiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiY2FsZW5kYXJfYmRcXFwiPiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FsZW5kYXJfd2Vla1xcXCI+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuaXpTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCI+5LiAPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7kuow8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuS4iTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCI+5ZubPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7kupQ8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuWFrTwvc3Bhbj48L2Rpdj4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX2RheVxcXCI+eyNsaXN0IF9kYXlzIGFzIGRheX08c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCIgci1jbGFzcz17IHtcXCd6LXNlbFxcJzogZGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gZGF5LnRvRGF0ZVN0cmluZygpLCBcXCd6LWRpc1xcJzogZGF5LmdldE1vbnRoKCkgIT09IGRhdGUuZ2V0TW9udGgoKX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoZGF5KX0+e2RheSB8IGZvcm1hdDogXFwnZGRcXCd9PC9zcGFuPnsvbGlzdH08L2Rpdj4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2FsZW5kYXIgIOaXpeWOhlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2NhbGVuZGFyLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIENhbGVuZGFyXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7RGF0ZT1udWxsfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kYXRlICAgICAgICAgICAgICAg5b2T5YmN6YCJ5oup55qE5pel5pyfXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBDYWxlbmRhciA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdjYWxlbmRhcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIGRhdGU6IG51bGwsXG4gICAgICAgICAgICBfZGF5czogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIHRoaXMuJHdhdGNoKCdkYXRlJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZihuZXdWYWx1ZSAmJiBvbGRWYWx1ZSAmJiBuZXdWYWx1ZS5nZXRGdWxsWWVhcigpID09PSBvbGRWYWx1ZS5nZXRGdWxsWWVhcigpICYmIG5ld1ZhbHVlLmdldE1vbnRoKCkgPT09IG9sZFZhbHVlLmdldE1vbnRoKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZighdGhpcy5kYXRhLmRhdGUpXG4gICAgICAgICAgICB0aGlzLmdvVG9kYXkoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdXBkYXRlKCkg5pel5pyf5pS55Y+Y5ZCO5pu05paw5pel5Y6GXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGF0YS5fZGF5cyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLmRhdGEuZGF0ZTtcbiAgICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICB2YXIgbWZpcnN0ID0gbmV3IERhdGUoZGF0ZSk7IG1maXJzdC5zZXREYXRlKDEpO1xuICAgICAgICB2YXIgbWZpcnN0VGltZSA9IG1maXJzdC5nZXRUaW1lKCk7XG4gICAgICAgIHZhciBuZmlyc3QgPSBuZXcgRGF0ZShtZmlyc3QpOyBuZmlyc3Quc2V0TW9udGgobW9udGggKyAxKTsgbmZpcnN0LnNldERhdGUoMSk7XG4gICAgICAgIHZhciBuZmlyc3RUaW1lID0gbmZpcnN0LmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGxhc3RUaW1lID0gbmZpcnN0VGltZSArICgoNyAtIG5maXJzdC5nZXREYXkoKSklNyAtIDEpKjI0KjM2MDAqMTAwMDtcbiAgICAgICAgdmFyIG51bSA9IC0gbWZpcnN0LmdldERheSgpO1xuICAgICAgICB2YXIgdG1wVGltZSwgdG1wO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB0bXBUaW1lID0gbWZpcnN0VGltZSArIChudW0rKykqMjQqMzYwMCoxMDAwO1xuICAgICAgICAgICAgdG1wID0gbmV3IERhdGUodG1wVGltZSk7XG4gICAgICAgICAgICB0aGlzLmRhdGEuX2RheXMucHVzaCh0bXApO1xuICAgICAgICB9IHdoaWxlKHRtcFRpbWUgPCBsYXN0VGltZSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGFkZFllYXIoeWVhcikg6LCD5pW05bm05Lu9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge251bWJlcj0wfSB5ZWFyIOWKoC/lh4/nmoTlubTku71cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGFkZFllYXI6IGZ1bmN0aW9uKHllYXIpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZCB8fCAheWVhcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0YS5kYXRlKTtcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkgKyB5ZWFyKTtcbiAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBkYXRlO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBhZGRNb250aChtb250aCkg6LCD5pW05pyI5Lu9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge251bWJlcj0wfSBtb250aCDliqAv5YeP55qE5pyI5Lu9XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBhZGRNb250aDogZnVuY3Rpb24obW9udGgpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZCB8fCAhbW9udGgpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGEuZGF0ZSk7XG4gICAgICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgbW9udGgpO1xuICAgICAgICB0aGlzLmRhdGEuZGF0ZSA9IGRhdGU7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChkYXRlKSDpgInmi6nkuIDkuKrml6XmnJ9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7RGF0ZT1udWxsfSBkYXRlIOmAieaLqeeahOaXpeacn1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDkuKrml6XmnJ/ml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGRhdGUg5b2T5YmN6YCJ5oup55qE5pel5pyfXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBkYXRlOiBkYXRlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBnb1RvZGF5KCkg5Zue5Yiw5LuK5aSpXG4gICAgICogQHB1YmxpY1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgZ29Ub2RheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGF0YS5kYXRlID0gbmV3IERhdGUoKG5ldyBEYXRlKCkuZ2V0VGltZSgpLygyNCozNjAwKjEwMDApPj4wKSooMjQqMzYwMCoxMDAwKSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FsZW5kYXI7IiwibW9kdWxlLmV4cG9ydHM9XCJcIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBFZGl0b3IgICAg57yW6L6R5ZmoXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZWRpdG9yLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEVkaXRvclxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnIHwgQmluZGluZyBQcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge3N0cmluZz0n5o+Q56S6J30gICAgICAgICAgIG9wdGlvbnMuZGF0YS50aXRsZSAgICAgICAgICAgICAg5a+56K+d5qGG5qCH6aKYIHwgVGl0bGUgb2YgRGlhbG9nXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY29udGVudCAgICAgICAgICAgIOWvueivneahhuWGheWuuVxuICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbj10cnVlfSAgICAgb3B0aW9ucy5kYXRhLm9rQnV0dG9uICAgICAgICAgICDmmK/lkKbmmL7npLrnoa7lrprmjInpkq7jgILlgLzkuLpgc3RyaW5nYOaXtuaYvuekuuivpeauteaWh+Wtl+OAglxuICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbj1mYWxzZX0gICAgb3B0aW9ucy5kYXRhLmNhbmNlbEJ1dHRvbiAgICAgICDmmK/lkKbmmL7npLrlj5bmtojmjInpkq7jgILlgLzkuLpgc3RyaW5nYOaXtuaYvuekuuivpeauteaWh+Wtl+OAglxuICogQHBhcmFtIHtudW1iZXI9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLndpZHRoICAgICAgICAgICAgICDlr7nor53moYblrr3luqbjgILlgLzkuLrlkKblrprml7blrr3luqbkuLpDU1Porr7nva7nmoTlrr3luqbjgIJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259ICAgICAgICAgICAgICAgIG9wdGlvbnMub2sgICAgICAgICAgICAgICAgICAgICAg5b2T54K55Ye756Gu5a6a55qE5pe25YCZ5omn6KGMXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSAgICAgICAgICAgICAgICBvcHRpb25zLmNhbmNlbCAgICAgICAgICAgICAgICAgIOW9k+eCueWHu+WPlua2iOeahOaXtuWAmeaJp+ihjFxuICovXG52YXIgRWRpdG9yID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ21vZGFsJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICBva0J1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICB3aWR0aDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgICAgICAvLyDor4HmmI7kuI3mmK/lhoXltYznu4Tku7ZcbiAgICAgICAgaWYodGhpcy4kcm9vdCA9PT0gdGhpcylcbiAgICAgICAgICAgIHRoaXMuJGluamVjdChkb2N1bWVudC5ib2R5KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2xvc2UocmVzdWx0KSDlhbPpl63mqKHmgIHlr7nor53moYZcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gcmVzdWx0IOeCueWHu+ehruWumui/mOaYr+WPlua2iFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2xvc2U6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNsb3NlIOWFs+mXreWvueivneahhuaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlc3VsdCDngrnlh7vkuobnoa7lrprov5jmmK/lj5bmtohcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJywge1xuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdCA/IHRoaXMub2soKSA6IHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IG9rIOehruWumuWvueivneahhuaXtuinpuWPkVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnb2snKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgY2xvc2Ug5Y+W5raI5a+56K+d5qGG5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cz1cIjxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuZ290b3AoKX0+5Zue5Yiw6aG26YOoPC9hPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEdvdG9wICDlm57liLDpobbpg6hcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9nb3RvcC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBHb3RvcFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBHb3RvcCA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdnb3RvcCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcblxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdvdG9wKCkg5Zue5Yiw6aG26YOoXG4gICAgICogQHB1YmxpY1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgZ290b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLmRhdGEucmVhZG9ubHkgfHwgdGhpcy5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHb3RvcDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tZ3JpZHZpZXcge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGRpdiBjbGFzcz1cXFwiZ3JpZHZpZXdfaXRlbVxcXCIgci1jbGFzcz17IHtcXCd6LXNlbFxcJzogc2VsZWN0ZWQgPT09IGl0ZW19IH0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvZGl2PiAgICB7L2xpc3R9PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogR3JpZFZpZXcgIOe9keagvOinhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2dyaWRWaWV3Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEdyaWRWaWV3XG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBHcmlkVmlldyA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdncmlkVmlldycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gR3JpZFZpZXc7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLWVkaXRvciB7QChjbGFzcyl9XFxcIiByLWhpZGU9eyF2aXNpYmxlfT4gICAgPGRpdiBjbGFzcz1cXFwiZWRpdG9yX3ByZXZpZXdcXFwiIHItaHRtbD17aHRtbH0+PC9kaXY+ICAgIDx1bCBjbGFzcz1cXFwibS10b29sYmFyIGVkaXRvcl90b29sYmFyXFxcIj4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5Yqg57KXXFxcIiBvbi1jbGljaz17dGhpcy5ib2xkKCl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWJvbGRcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5pac5L2TXFxcIiBvbi1jbGljaz17dGhpcy5pdGFsaWMoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24taXRhbGljXFxcIj48L2k+PC9hPjwvbGk+ICAgICAgICA8bGkgY2xhc3M9XFxcInNlcGVyYXRvclxcXCI+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5byV55SoXFxcIiBvbi1jbGljaz17dGhpcy5xdW90ZSgpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1xdW90ZVxcXCI+PC9pPjwvYT48L2xpPiAgICAgICAgPGxpPjxhIHRpdGxlPVxcXCLml6Dluo/liJfooahcXFwiIG9uLWNsaWNrPXt0aGlzLnVsKCl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWxpc3QtdWxcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5pyJ5bqP5YiX6KGoXFxcIiBvbi1jbGljaz17dGhpcy5vbCgpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1saXN0LW9sXFxcIj48L2k+PC9hPjwvbGk+ICAgICAgICA8bGkgY2xhc3M9XFxcInNlcGVyYXRvclxcXCI+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi6ZO+5o6lXFxcIiBvbi1jbGljaz17dGhpcy5saW5rKCl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWxpbmtcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5Zu+54mHXFxcIiBvbi1jbGljaz17dGhpcy5pbWFnZSgpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1pbWFnZVxcXCI+PC9pPjwvYT48L2xpPiAgICA8L3VsPiAgICA8dGV4dGFyZWEgY2xhc3M9XFxcImVkaXRvcl90ZXh0YXJlYVxcXCIgci1tb2RlbD17Y29udGVudH0gcmVmPVxcXCJ0ZXh0YXJlYVxcXCIgeyNpZiByZWFkb25seX1yZWFkb25seXsvaWZ9PjwvdGV4dGFyZWE+PC9kaXY+PHVwbG9hZGVyIHZpc2libGU9e2ZhbHNlfSB1cmw9e2ltYWdlVXJsfSBleHRlbnNpb25zPXtleHRlbnNpb25zfSByZWY9XFxcInVwbG9hZGVyXFxcIiBvbi1zdWNjZXNzPXt0aGlzLnVwbG9hZGVyU3VjY2VzcygkZXZlbnQpfSBvbi1lcnJvcj17dGhpcy51cGxvYWRlckVycm9yKCRldmVudCl9IC8+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogSFRNTEVkaXRvciDnvJbovpHlmahcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9odG1sRWRpdG9yLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIEhUTUxFZGl0b3JcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtmdW5jdGlvbn0gICAgICAgICAgICAgICAgb3B0aW9ucy5jYW5jZWwgICAgICAgICAgICAgICAgICDlvZPngrnlh7vlj5bmtojnmoTml7blgJnmiafooYxcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqL1xudmFyIEhUTUxFZGl0b3IgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnaHRtbEVkaXRvcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGh0bWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jb250ZW50O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBib2xkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnKionICsgcmFuZ2VEYXRhLnRleHQgKyAnKionO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBpdGFsaWM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICcqJyArIHJhbmdlRGF0YS50ZXh0ICsgJyonO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBxdW90ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIGZvcih2YXIgaSA9IHJhbmdlRGF0YS5zdGFydDsgaSA+IDA7IGktLSlcbiAgICAgICAgICAgIGlmKHZhbHVlW2ldID09ICdcXG4nKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICByYW5nZURhdGEuc3RhcnQgPSBpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICc+ICc7XG4gICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEuc3RhcnQ7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIHVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgZm9yKHZhciBpID0gcmFuZ2VEYXRhLnN0YXJ0OyBpID4gMDsgaS0tKVxuICAgICAgICAgICAgaWYodmFsdWVbaV0gPT0gJ1xcbicpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIHJhbmdlRGF0YS5zdGFydCA9IGk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJy0gJztcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgb2w6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICBmb3IodmFyIGkgPSByYW5nZURhdGEuc3RhcnQ7IGkgPiAwOyBpLS0pXG4gICAgICAgICAgICBpZih2YWx1ZVtpXSA9PSAnXFxuJylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnMS4gJztcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgbGluazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJ1vpk77mjqVdKGh0dHA6Ly8pJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgaW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRyZWZzLnVwbG9hZGVyLnVwbG9hZCgpO1xuICAgIH0sXG4gICAgbGF0ZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICckJGFeMiArIGJeMiA9IGNeMiQkJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgdXBsb2FkZXJTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJ1xcbiFbXSh+LycgKyBkYXRhLnJlc3VsdCArICcpJztcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgdXBsb2FkZXJFcnJvcjogZnVuY3Rpb24oZSkge1xuICAgICAgICBOb3RpZnkuZXJyb3IoZSk7XG4gICAgfSxcbiAgICBnZXRDdXJzb3JQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0YXJlYSA9IHRoaXMuJHJlZnMudGV4dGFyZWE7XG5cbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHt0ZXh0OiAnJywgc3RhcnQ6IDAsIGVuZDogMCB9O1xuICAgICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgaWYgKHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKSB7IC8vIFczQ1xuICAgICAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0PSB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgIHJhbmdlRGF0YS5lbmQgPSB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQ7XG4gICAgICAgICAgICByYW5nZURhdGEudGV4dCA9IChyYW5nZURhdGEuc3RhcnQgIT0gcmFuZ2VEYXRhLmVuZCkgPyB0ZXh0YXJlYS52YWx1ZS5zdWJzdHJpbmcocmFuZ2VEYXRhLnN0YXJ0LCByYW5nZURhdGEuZW5kKTogJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7IC8vIElFXG4gICAgICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgICAgICBvUyA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLFxuICAgICAgICAgICAgICAgIC8vIERvbid0OiBvUiA9IHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSgpXG4gICAgICAgICAgICAgICAgb1IgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgb1IubW92ZVRvRWxlbWVudFRleHQodGV4dGFyZWEpO1xuXG4gICAgICAgICAgICByYW5nZURhdGEudGV4dCA9IG9TLnRleHQ7XG4gICAgICAgICAgICByYW5nZURhdGEuYm9va21hcmsgPSBvUy5nZXRCb29rbWFyaygpO1xuXG4gICAgICAgICAgICAvLyBvYmplY3QubW92ZVN0YXJ0KHNVbml0IFssIGlDb3VudF0pXG4gICAgICAgICAgICAvLyBSZXR1cm4gVmFsdWU6IEludGVnZXIgdGhhdCByZXR1cm5zIHRoZSBudW1iZXIgb2YgdW5pdHMgbW92ZWQuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBvUi5jb21wYXJlRW5kUG9pbnRzKCdTdGFydFRvU3RhcnQnLCBvUykgPCAwICYmIG9TLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLTEpICE9PSAwOyBpICsrKSB7XG4gICAgICAgICAgICAgICAgLy8gV2h5PyBZb3UgY2FuIGFsZXJ0KHRleHRhcmVhLnZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBpZiAodGV4dGFyZWEudmFsdWUuY2hhckF0KGkpID09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEudGV4dC5sZW5ndGggKyByYW5nZURhdGEuc3RhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmFuZ2VEYXRhO1xuICAgIH0sXG4gICAgc2V0Q3Vyc29yUG9zaXRpb246IGZ1bmN0aW9uKHJhbmdlRGF0YSkge1xuICAgICAgICBpZighcmFuZ2VEYXRhKSB7XG4gICAgICAgICAgICBhbGVydChcIllvdSBtdXN0IGdldCBjdXJzb3IgcG9zaXRpb24gZmlyc3QuXCIpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRleHRhcmVhID0gdGhpcy4kcmVmcy50ZXh0YXJlYTtcblxuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBvbGRWYWx1ZS5zdWJzdHJpbmcoMCwgcmFuZ2VEYXRhLnN0YXJ0KSArIHJhbmdlRGF0YS50ZXh0ICsgb2xkVmFsdWUuc3Vic3RyaW5nKHJhbmdlRGF0YS5lbmQsIG9sZFZhbHVlLmxlbmd0aCk7XG4gICAgICAgIHJhbmdlRGF0YS5lbmQgPSByYW5nZURhdGEuc3RhcnQgKyByYW5nZURhdGEudGV4dC5sZW5ndGg7XG4gICAgICAgIGlmICh0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZSkgeyAvLyBXM0NcbiAgICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZShyYW5nZURhdGEuc3RhcnQsIHJhbmdlRGF0YS5lbmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRleHRhcmVhLmNyZWF0ZVRleHRSYW5nZSkgeyAvLyBJRVxuICAgICAgICAgICAgdmFyIG9SID0gdGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICAvLyBGaXhidWcgOlxuICAgICAgICAgICAgLy8gSW4gSUUsIGlmIGN1cnNvciBwb3NpdGlvbiBhdCB0aGUgZW5kIG9mIHRleHRhcmVhLCB0aGUgc2V0Q3Vyc29yUG9zaXRpb24gZnVuY3Rpb24gZG9uJ3Qgd29ya1xuICAgICAgICAgICAgaWYodGV4dGFyZWEudmFsdWUubGVuZ3RoID09PSByYW5nZURhdGEuc3RhcnQpIHtcbiAgICAgICAgICAgICAgICBvUi5jb2xsYXBzZShmYWxzZSlcbiAgICAgICAgICAgICAgICBvUi5zZWxlY3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb1IubW92ZVRvQm9va21hcmsocmFuZ2VEYXRhLmJvb2ttYXJrKTtcbiAgICAgICAgICAgICAgICBvUi5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhUTUxFZGl0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cz1cIjx1bCBjbGFzcz1cXFwibS1saXN0dmlldyB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfT4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bGkgci1jbGFzcz17IHtcXCd6LXNlbFxcJzogc2VsZWN0ZWQgPT09IGl0ZW19IH0gdGl0bGU9e2l0ZW0ubmFtZX0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGl0ZW0pfT57I2lmIEAoaXRlbVRlbXBsYXRlKX17I2luY2x1ZGUgQChpdGVtVGVtcGxhdGUpfXsjZWxzZX17aXRlbS5uYW1lfXsvaWZ9PC9saT4gICAgey9saXN0fTwvdWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTGlzdFZpZXcgIOWIl+ihqOinhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2xpc3RWaWV3Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIExpc3RWaWV3XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLml0ZW1UZW1wbGF0ZSAgICAgICDljZXpobnmqKHmnb9cbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBMaXN0VmlldyA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdsaXN0VmlldycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdFZpZXc7IiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1hcmtFZGl0b3Ig57yW6L6R5ZmoXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbWFya0VkaXRvci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG52YXIgbWFya2VkID0gcmVxdWlyZSgnbWFya2VkJyk7XG5cbi8qKlxuICogQGNsYXNzIE1hcmtFZGl0b3JcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtmdW5jdGlvbn0gICAgICAgICAgICAgICAgb3B0aW9ucy5jYW5jZWwgICAgICAgICAgICAgICAgICDlvZPngrnlh7vlj5bmtojnmoTml7blgJnmiafooYxcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqL1xudmFyIE1hcmtFZGl0b3IgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbWFya0VkaXRvcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIGh0bWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hcmtlZCh0aGlzLmRhdGEuY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJvbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICcqKicgKyByYW5nZURhdGEudGV4dCArICcqKic7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIGl0YWxpYzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJyonICsgcmFuZ2VEYXRhLnRleHQgKyAnKic7XG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yUG9zaXRpb24ocmFuZ2VEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhLmNvbnRlbnQgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICB9LFxuICAgIHF1b3RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgZm9yKHZhciBpID0gcmFuZ2VEYXRhLnN0YXJ0OyBpID4gMDsgaS0tKVxuICAgICAgICAgICAgaWYodmFsdWVbaV0gPT0gJ1xcbicpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIHJhbmdlRGF0YS5zdGFydCA9IGk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJz4gJztcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgdGhpcy5zZXRDdXJzb3JQb3NpdGlvbihyYW5nZURhdGEpO1xuICAgICAgICB0aGlzLmRhdGEuY29udGVudCA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgIH0sXG4gICAgdWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmFuZ2VEYXRhID0gdGhpcy5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLiRyZWZzLnRleHRhcmVhLnZhbHVlO1xuICAgICAgICBmb3IodmFyIGkgPSByYW5nZURhdGEuc3RhcnQ7IGkgPiAwOyBpLS0pXG4gICAgICAgICAgICBpZih2YWx1ZVtpXSA9PSAnXFxuJylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgcmFuZ2VEYXRhLnN0YXJ0ID0gaTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnLSAnO1xuICAgICAgICByYW5nZURhdGEuZW5kID0gcmFuZ2VEYXRhLnN0YXJ0O1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBvbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuJHJlZnMudGV4dGFyZWEudmFsdWU7XG4gICAgICAgIGZvcih2YXIgaSA9IHJhbmdlRGF0YS5zdGFydDsgaSA+IDA7IGktLSlcbiAgICAgICAgICAgIGlmKHZhbHVlW2ldID09ICdcXG4nKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICByYW5nZURhdGEuc3RhcnQgPSBpO1xuICAgICAgICByYW5nZURhdGEudGV4dCA9ICcxLiAnO1xuICAgICAgICByYW5nZURhdGEuZW5kID0gcmFuZ2VEYXRhLnN0YXJ0O1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBsaW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnW+mTvuaOpV0oaHR0cDovLyknO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICBpbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJHJlZnMudXBsb2FkZXIudXBsb2FkKCk7XG4gICAgfSxcbiAgICBsYXRleDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByYW5nZURhdGEgPSB0aGlzLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gJyQkYV4yICsgYl4yID0gY14yJCQnO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICB1cGxvYWRlclN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgdmFyIHJhbmdlRGF0YSA9IHRoaXMuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmFuZ2VEYXRhLnRleHQgPSAnXFxuIVtdKH4vJyArIGRhdGEucmVzdWx0ICsgJyknO1xuICAgICAgICB0aGlzLnNldEN1cnNvclBvc2l0aW9uKHJhbmdlRGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YS5jb250ZW50ID0gdGhpcy4kcmVmcy50ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG4gICAgfSxcbiAgICB1cGxvYWRlckVycm9yOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIE5vdGlmeS5lcnJvcihlKTtcbiAgICB9LFxuICAgIGdldEN1cnNvclBvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHRhcmVhID0gdGhpcy4kcmVmcy50ZXh0YXJlYTtcblxuICAgICAgICB2YXIgcmFuZ2VEYXRhID0ge3RleHQ6ICcnLCBzdGFydDogMCwgZW5kOiAwIH07XG4gICAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICBpZiAodGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2UpIHsgLy8gVzNDXG4gICAgICAgICAgICByYW5nZURhdGEuc3RhcnQ9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHRleHRhcmVhLnNlbGVjdGlvbkVuZDtcbiAgICAgICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gKHJhbmdlRGF0YS5zdGFydCAhPSByYW5nZURhdGEuZW5kKSA/IHRleHRhcmVhLnZhbHVlLnN1YnN0cmluZyhyYW5nZURhdGEuc3RhcnQsIHJhbmdlRGF0YS5lbmQpOiAnJztcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24pIHsgLy8gSUVcbiAgICAgICAgICAgIHZhciBpLFxuICAgICAgICAgICAgICAgIG9TID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCksXG4gICAgICAgICAgICAgICAgLy8gRG9uJ3Q6IG9SID0gdGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKClcbiAgICAgICAgICAgICAgICBvUiA9IGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgICAgICBvUi5tb3ZlVG9FbGVtZW50VGV4dCh0ZXh0YXJlYSk7XG5cbiAgICAgICAgICAgIHJhbmdlRGF0YS50ZXh0ID0gb1MudGV4dDtcbiAgICAgICAgICAgIHJhbmdlRGF0YS5ib29rbWFyayA9IG9TLmdldEJvb2ttYXJrKCk7XG5cbiAgICAgICAgICAgIC8vIG9iamVjdC5tb3ZlU3RhcnQoc1VuaXQgWywgaUNvdW50XSlcbiAgICAgICAgICAgIC8vIFJldHVybiBWYWx1ZTogSW50ZWdlciB0aGF0IHJldHVybnMgdGhlIG51bWJlciBvZiB1bml0cyBtb3ZlZC5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IG9SLmNvbXBhcmVFbmRQb2ludHMoJ1N0YXJ0VG9TdGFydCcsIG9TKSA8IDAgJiYgb1MubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtMSkgIT09IDA7IGkgKyspIHtcbiAgICAgICAgICAgICAgICAvLyBXaHk/IFlvdSBjYW4gYWxlcnQodGV4dGFyZWEudmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0YXJlYS52YWx1ZS5jaGFyQXQoaSkgPT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaSArKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYW5nZURhdGEuc3RhcnQgPSBpO1xuICAgICAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS50ZXh0Lmxlbmd0aCArIHJhbmdlRGF0YS5zdGFydDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByYW5nZURhdGE7XG4gICAgfSxcbiAgICBzZXRDdXJzb3JQb3NpdGlvbjogZnVuY3Rpb24ocmFuZ2VEYXRhKSB7XG4gICAgICAgIGlmKCFyYW5nZURhdGEpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiWW91IG11c3QgZ2V0IGN1cnNvciBwb3NpdGlvbiBmaXJzdC5cIilcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dGFyZWEgPSB0aGlzLiRyZWZzLnRleHRhcmVhO1xuXG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRleHRhcmVhLnZhbHVlO1xuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IG9sZFZhbHVlLnN1YnN0cmluZygwLCByYW5nZURhdGEuc3RhcnQpICsgcmFuZ2VEYXRhLnRleHQgKyBvbGRWYWx1ZS5zdWJzdHJpbmcocmFuZ2VEYXRhLmVuZCwgb2xkVmFsdWUubGVuZ3RoKTtcbiAgICAgICAgcmFuZ2VEYXRhLmVuZCA9IHJhbmdlRGF0YS5zdGFydCArIHJhbmdlRGF0YS50ZXh0Lmxlbmd0aDtcbiAgICAgICAgaWYgKHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKSB7IC8vIFczQ1xuICAgICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICAgIHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKHJhbmdlRGF0YS5zdGFydCwgcmFuZ2VEYXRhLmVuZCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGV4dGFyZWEuY3JlYXRlVGV4dFJhbmdlKSB7IC8vIElFXG4gICAgICAgICAgICB2YXIgb1IgPSB0ZXh0YXJlYS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgICAgIC8vIEZpeGJ1ZyA6XG4gICAgICAgICAgICAvLyBJbiBJRSwgaWYgY3Vyc29yIHBvc2l0aW9uIGF0IHRoZSBlbmQgb2YgdGV4dGFyZWEsIHRoZSBzZXRDdXJzb3JQb3NpdGlvbiBmdW5jdGlvbiBkb24ndCB3b3JrXG4gICAgICAgICAgICBpZih0ZXh0YXJlYS52YWx1ZS5sZW5ndGggPT09IHJhbmdlRGF0YS5zdGFydCkge1xuICAgICAgICAgICAgICAgIG9SLmNvbGxhcHNlKGZhbHNlKVxuICAgICAgICAgICAgICAgIG9SLnNlbGVjdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvUi5tb3ZlVG9Cb29rbWFyayhyYW5nZURhdGEuYm9va21hcmspO1xuICAgICAgICAgICAgICAgIG9SLnNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya0VkaXRvcjtcbiIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdj4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bWVudSBuYW1lPXtpdGVtLm5hbWV9IHNvdXJjZT17aXRlbS5jaGlsZHJlbn0gLz4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE1lbnViYXIgIOWIl+ihqOinhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21lbnViYXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcbnZhciBNZW51ID0gcmVxdWlyZSgnLi4vdW5pdC9tZW51LmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIE1lbnViYXJcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zZWxlY3RlZCAgICAgICAgICAg5b2T5YmN6YCJ5oup6aG5XG4gKiBAcGFyYW0ge3N0cmluZz1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuaXRlbVRlbXBsYXRlICAgICAgIOWNlemhueaooeadv1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIE1lbnViYXIgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbWVudWJhcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWVudWJhcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tbW9kYWwge0AoY2xhc3MpfVxcXCIgb24ta2V5dXA9e3RoaXMua2V5dXAoJGV2ZW50KX0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsX2RpYWxvZ1xcXCIgeyNpZiB3aWR0aH1zdHlsZT1cXFwid2lkdGg6IHt3aWR0aH1weFxcXCJ7L2lmfT4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsX2hkXFxcIj4gICAgICAgICAgICA8YSBjbGFzcz1cXFwibW9kYWxfY2xvc2VcXFwiIG9uLWNsaWNrPXt0aGlzLmNsb3NlKCFjYW5jZWxCdXR0b24pfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jbG9zZVxcXCI+PC9pPjwvYT4gICAgICAgICAgICA8aDMgY2xhc3M9XFxcIm1vZGFsX3RpdGxlXFxcIj57dGl0bGV9PC9oMz4gICAgICAgIDwvZGl2PiAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWxfYmRcXFwiPiAgICAgICAgICAgIHsjaWYgY29udGVudFRlbXBsYXRlfXsjaW5jbHVkZSBAKGNvbnRlbnRUZW1wbGF0ZSl9eyNlbHNlfXtjb250ZW50fXsvaWZ9ICAgICAgICA8L2Rpdj4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsX2Z0XFxcIj4gICAgICAgICAgICB7I2lmIG9rQnV0dG9ufSAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInUtYnRuIHUtYnRuLXByaW1hcnlcXFwiIG9uLWNsaWNrPXt0aGlzLmNsb3NlKHRydWUpfT57b2tCdXR0b24gPT09IHRydWUgPyBcXCfnoa7lrppcXCcgOiBva0J1dHRvbn08L2J1dHRvbj4gICAgICAgICAgICB7L2lmfSAgICAgICAgICAgIHsjaWYgY2FuY2VsQnV0dG9ufSAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInUtYnRuXFxcIiBvbi1jbGljaz17dGhpcy5jbG9zZShmYWxzZSl9PntjYW5jZWxCdXR0b24gPT09IHRydWUgPyBcXCflj5bmtohcXCcgOiBjYW5jZWxCdXR0b259PC9idXR0b24+ICAgICAgICAgICAgey9pZn0gICAgICAgIDwvZGl2PiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2RhbCAgICAg5qih5oCB5a+56K+d5qGGXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbW9kYWwuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgTW9kYWxcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNvbnRlbnQgICAgICAgICAgICDlr7nor53moYblhoXlrrlcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49dHJ1ZX0gICAgIG9wdGlvbnMuZGF0YS5va0J1dHRvbiAgICAgICAgICAg5piv5ZCm5pi+56S656Gu5a6a5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49ZmFsc2V9ICAgIG9wdGlvbnMuZGF0YS5jYW5jZWxCdXR0b24gICAgICAg5piv5ZCm5pi+56S65Y+W5raI5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7bnVtYmVyPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS53aWR0aCAgICAgICAgICAgICAg5a+56K+d5qGG5a695bqm44CC5YC85Li65ZCm5a6a5pe25a695bqm5Li6Q1NT6K6+572u55qE5a695bqm44CCXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBNb2RhbCA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdtb2RhbCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgb2tCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgd2lkdGg6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICAgICAgLy8g6K+B5piO5LiN5piv5YaF5bWM57uE5Lu2XG4gICAgICAgIGlmKHRoaXMuJHJvb3QgPT09IHRoaXMpXG4gICAgICAgICAgICB0aGlzLiRpbmplY3QoZG9jdW1lbnQuYm9keSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb3NlKHJlc3VsdCkg5YWz6Zet5qih5oCB5a+56K+d5qGGXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IHJlc3VsdCDngrnlh7vnoa7lrprov5jmmK/lj5bmtohcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNsb3NlOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjbG9zZSDlhbPpl63lr7nor53moYbml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSByZXN1bHQg54K55Ye75LqG56Gu5a6a6L+Y5piv5Y+W5raIXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIHtcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPyB0aGlzLm9rKCkgOiB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIG9rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBvayDnoa7lrprlr7nor53moYbml7bop6blj5FcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ29rJyk7XG5cbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNhbmNlbCDlj5bmtojlr7nor53moYbml7bop6blj5FcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpO1xuXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0sXG4gICAga2V5dXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBpZigkZXZlbnQud2hpY2ggPT0gMTMpXG4gICAgICAgICAgICB0aGlzLm9rKCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQG1ldGhvZCBhbGVydChjb250ZW50Wyx0aXRsZV0pIOW8ueWHuuS4gOS4qmFsZXJ05a+56K+d5qGG44CC5YWz6Zet5pe25aeL57uI6Kem5Y+R56Gu5a6a5LqL5Lu244CCXG4gKiBAc3RhdGljXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gIHtzdHJpbmc9Jyd9IGNvbnRlbnQg5a+56K+d5qGG5YaF5a65XG4gKiBAcGFyYW0gIHtzdHJpbmc9J+aPkOekuid9IHRpdGxlIOWvueivneahhuagh+mimFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuTW9kYWwuYWxlcnQgPSBmdW5jdGlvbihjb250ZW50LCB0aXRsZSwgb2tCdXR0b24pIHtcbiAgICB2YXIgbW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgb2tCdXR0b246IG9rQnV0dG9uXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbW9kYWw7XG59XG5cbi8qKlxuICogQG1ldGhvZCBjb25maXJtKGNvbnRlbnRbLHRpdGxlXSkg5by55Ye65LiA5LiqY29uZmlybeWvueivneahhlxuICogQHN0YXRpY1xuICogQHB1YmxpY1xuICogQHBhcmFtICB7c3RyaW5nPScnfSBjb250ZW50IOWvueivneahhuWGheWuuVxuICogQHBhcmFtICB7c3RyaW5nPSfmj5DnpLonfSB0aXRsZSDlr7nor53moYbmoIfpophcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbk1vZGFsLmNvbmZpcm0gPSBmdW5jdGlvbihjb250ZW50LCB0aXRsZSwgb2tCdXR0b24sIGNhbmNlbEJ1dHRvbikge1xuICAgIHZhciBtb2RhbCA9IG5ldyBNb2RhbCh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBva0J1dHRvbjogb2tCdXR0b24sXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246IGNhbmNlbEJ1dHRvbiB8fCB0cnVlXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbW9kYWw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kYWw7XG4iLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcIm0tbm90aWZ5IG0tbm90aWZ5LXtAKHBvc2l0aW9uKX0ge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBtZXNzYWdlcyBhcyBtZXNzYWdlfSAgICA8ZGl2IGNsYXNzPVxcXCJub3RpZnlfbWVzc2FnZSBub3RpZnlfbWVzc2FnZS17QChtZXNzYWdlLnR5cGUpfVxcXCIgci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJbiBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0IGZhc3Q7XFxcIj4gICAgICAgIDxhIGNsYXNzPVxcXCJub3RpZnlfY2xvc2VcXFwiIG9uLWNsaWNrPXt0aGlzLmNsb3NlKG1lc3NhZ2UpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jbG9zZVxcXCI+PC9pPjwvYT4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm5vdGlmeV90ZXh0XFxcIj48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi17QChtZXNzYWdlLnR5cGUpfS1jaXJjbGVcXFwiIHItaGlkZT17QCghbWVzc2FnZS50eXBlKX0+PC9pPiB7QChtZXNzYWdlLnRleHQpfTwvZGl2PiAgICA8L2Rpdj4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE5vdGlmeSAgICDpgJrnn6VcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9ub3RpZnkuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgTm90aWZ5XG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnm5HlkKzmlbDmja5cbiAqIEBwYXJhbSB7c3RyaW5nPSd0b3BjZW50ZXInfSAgICAgIG9wdGlvbnMuZGF0YS5wb3NpdGlvbiAgICAgICAgICAg6YCa55+l55qE5L2N572u77yM5Y+v6YCJ5Y+C5pWw77yaYHRvcGNlbnRlcmDjgIFgdG9wbGVmdGDjgIFgdG9wcmlnaHRg44CBYGJvdHRvbWNlbnRlcmDjgIFgYm90dG9tbGVmdGDjgIFgYm90dG9tcmlnaHRg44CBYHN0YXRpY2BcbiAqIEBwYXJhbSB7bnVtYmVyPTIwMDB9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kdXJhdGlvbiAgICAgICAgICAg5q+P5p2h5raI5oGv55qE5YGc55WZ5q+r56eS5pWw77yM5aaC5p6c5Li6MO+8jOWImeihqOekuua2iOaBr+W4uOmpu+S4jea2iOWkseOAglxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIE5vdGlmeSA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdub3RpZnknLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3RvcGNlbnRlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgICAgICAvLyDor4HmmI7kuI3mmK/lhoXltYznu4Tku7ZcbiAgICAgICAgaWYodGhpcy4kcm9vdCA9PT0gdGhpcylcbiAgICAgICAgICAgIHRoaXMuJGluamVjdChkb2N1bWVudC5ib2R5KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2hvdyh0ZXh0Wyx0eXBlXVssZHVyYXRpb25dKSDlvLnlh7rkuIDkuKrmtojmga9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7c3RyaW5nPScnfSB0ZXh0IOa2iOaBr+WGheWuuVxuICAgICAqIEBwYXJhbSAge3N0cmluZz1udWxsfSB0eXBlIOa2iOaBr+exu+Wei++8jOWPr+mAieWPguaVsO+8mmBpbmZvYOOAgWBzdWNjZXNzYOOAgWB3YXJuaW5nYOOAgWBlcnJvcmBcbiAgICAgKiBAcGFyYW0gIHtudW1iZXI9bm90aWZ5LmR1cmF0aW9ufSBkdXJhdGlvbiDor6XmnaHmtojmga/nmoTlgZznlZnmr6vnp5LmlbDvvIzlpoLmnpzkuLow77yM5YiZ6KGo56S65raI5oGv5bi46am75LiN5raI5aSx44CCXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzaG93OiBmdW5jdGlvbih0ZXh0LCB0eXBlLCBkdXJhdGlvbikge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uID49IDAgPyBkdXJhdGlvbiA6IHRoaXMuZGF0YS5kdXJhdGlvblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGEubWVzc2FnZXMudW5zaGlmdChtZXNzYWdlKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7XG5cbiAgICAgICAgaWYobWVzc2FnZS5kdXJhdGlvbilcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQodGhpcy5jbG9zZS5iaW5kKHRoaXMsIG1lc3NhZ2UpLCBtZXNzYWdlLmR1cmF0aW9uKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNob3cg5by55Ye65LiA5Liq5raI5oGv5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtZXNzYWdlIOW8ueWHuueahOa2iOaBr+WvueixoVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2hvdycsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb3NlKG1lc3NhZ2UpIOWFs+mXreafkOadoea2iOaBr1xuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IG1lc3NhZ2Ug6ZyA6KaB5YWz6Zet55qE5raI5oGv5a+56LGhXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjbG9zZTogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmRhdGEubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5kYXRhLm1lc3NhZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNsb3NlIOWFs+mXreafkOadoea2iOaBr+aXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gbWVzc2FnZSDlhbPpl63kuobnmoTmtojmga/lr7nosaFcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJywge1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2xvc2VBbGwoKSDlhbPpl63miYDmnInmtojmga9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjbG9zZUFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgnbWVzc2FnZXMnLCBbXSk7XG4gICAgfVxufSkudXNlKCckdGltZW91dCcpO1xuXG5cbi8qKlxuICog55u05o6l5Yid5aeL5YyW5LiA5Liq5a6e5L6LXG4gKiBAdHlwZSB7Tm90aWZ5fVxuICovXG52YXIgbm90aWZ5ID0gbmV3IE5vdGlmeSgpO1xuTm90aWZ5Lm5vdGlmeSA9IG5vdGlmeTtcblxuLyoqXG4gKiBAbWV0aG9kIHNob3codGV4dFssdHlwZV1bLGR1cmF0aW9uXSkg5by55Ye65LiA5Liq5raI5oGvXG4gKiBAc3RhdGljXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gIHtzdHJpbmc9Jyd9IHRleHQg5raI5oGv5YaF5a65XG4gKiBAcGFyYW0gIHtzdHJpbmc9bnVsbH0gdHlwZSDmtojmga/nsbvlnovvvIzlj6/pgInlj4LmlbDvvJpgaW5mb2DjgIFgc3VjY2Vzc2DjgIFgd2FybmluZ2DjgIFgZXJyb3JgXG4gKiBAcGFyYW0gIHtudW1iZXI9bm90aWZ5LmR1cmF0aW9ufSBkdXJhdGlvbiDor6XmnaHmtojmga/nmoTlgZznlZnmr6vnp5LmlbDvvIzlpoLmnpzkuLow77yM5YiZ6KGo56S65raI5oGv5bi46am75LiN5raI5aSx44CCXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5Ob3RpZnkuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgIG5vdGlmeS5zaG93LmFwcGx5KG5vdGlmeSwgYXJndW1lbnRzKTtcbn1cbi8qKlxuICogQG1ldGhvZCBbaW5mb3xzdWNjZXNzfHdhcm5pbmd8ZXJyb3JdKHRleHQpIOW8ueWHuueJueauiuexu+Wei+eahOa2iOaBr1xuICogQHN0YXRpY1xuICogQHB1YmxpY1xuICogQHBhcmFtICB7c3RyaW5nPScnfSB0ZXh0IOa2iOaBr+WGheWuuVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHR5cGVzID0gWydzdWNjZXNzJywgJ3dhcm5pbmcnLCAnaW5mbycsICdlcnJvciddO1xudHlwZXMuZm9yRWFjaChmdW5jdGlvbih0eXBlKSB7XG4gICAgTm90aWZ5W3R5cGVdID0gZnVuY3Rpb24odGV4dCkge1xuICAgICAgICBOb3RpZnkuc2hvdyh0ZXh0LCB0eXBlKTtcbiAgICB9XG59KTtcbi8qKlxuICogQG1ldGhvZCBjbG9zZShtZXNzYWdlKSDlhbPpl63mn5DmnaHmtojmga9cbiAqIEBzdGF0aWNcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSAge29iamVjdH0gbWVzc2FnZSDpnIDopoHlhbPpl63nmoTmtojmga/lr7nosaFcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbk5vdGlmeS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIG5vdGlmeS5jbG9zZS5hcHBseShub3RpZnksIGFyZ3VtZW50cyk7XG59XG4vKipcbiAqIEBtZXRob2QgY2xvc2VBbGwoKSDlhbPpl63miYDmnInmtojmga9cbiAqIEBzdGF0aWNcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbk5vdGlmeS5jbG9zZUFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIG5vdGlmeS5jbG9zZUFsbC5hcHBseShub3RpZnksIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTm90aWZ5OyIsIm1vZHVsZS5leHBvcnRzPVwiPHVsIGNsYXNzPVxcXCJtLXBhZ2VyIG0tcGFnZXIte0AocG9zaXRpb24pfSB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfT4gICAgPGxpIGNsYXNzPVxcXCJwYWdlcl9wcmV2XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnIDogY3VycmVudCA8PSAxfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChjdXJyZW50IC0gMSl9PjxhPuS4iuS4gOmhtTwvYT48L2xpPiAgICB7I2lmIHRvdGFsIC0gbWlkZGxlID4gc2lkZSAqIDIgKyAxfSAgICAgICAgeyNsaXN0IDEuLnNpZGUgYXMgaX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBjdXJyZW50ID09IGl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGkpfT48YT57aX08L2E+PC9saT4gICAgICAgIHsvbGlzdH0gICAgICAgIHsjaWYgX3N0YXJ0ID4gc2lkZSArIDF9PGxpPi4uLjwvbGk+ey9pZn0gICAgICAgIHsjbGlzdCBfc3RhcnQuLl9lbmQgYXMgaX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBjdXJyZW50ID09IGl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGkpfT48YT57aX08L2E+PC9saT4gICAgICAgIHsvbGlzdH0gICAgICAgIHsjaWYgX2VuZCA8IHRvdGFsIC0gc2lkZX08bGk+Li4uPC9saT57L2lmfSAgICAgICAgeyNsaXN0ICh0b3RhbCAtIHNpZGUgKyAxKS4udG90YWwgYXMgaX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBjdXJyZW50ID09IGl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGkpfT48YT57aX08L2E+PC9saT4gICAgICAgIHsvbGlzdH0gICAgeyNlbHNlfSAgICAgICAgeyNsaXN0IDEuLnRvdGFsIGFzIGl9ICAgICAgICA8bGkgci1jbGFzcz17IHtcXCd6LWNydFxcJzogY3VycmVudCA9PSBpfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpKX0+PGE+e2l9PC9hPjwvbGk+ICAgICAgICB7L2xpc3R9ICAgIHsvaWZ9ICAgIDxsaSBjbGFzcz1cXFwicGFnZXJfbmV4dFxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJyA6IGN1cnJlbnQgPj0gdG90YWx9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGN1cnJlbnQgKyAxKX0+PGE+5LiL5LiA6aG1PC9hPjwvbGk+PC91bD5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQYWdlciAgICAg5YiG6aG1XG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3BhZ2VyLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFBhZ2VyXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnm5HlkKzmlbDmja5cbiAqIEBwYXJhbSB7bnVtYmVyPTF9ICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jdXJyZW50ICAgICAgICAgICAg5b2T5YmN6aG1XG4gKiBAcGFyYW0ge3RvdGFsPTExfSAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEudG90YWwgICAgICAgICAgICAgIOaAu+mhteaVsFxuICogQHBhcmFtIHtzdHJpbmc9J2NlbnRlcid9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBvc2l0aW9uICAgICAgICAgICDliIbpobXnmoTkvY3nva7vvIzlj6/pgInlj4LmlbDvvJpgY2VudGVyYOOAgWBsZWZ0YOOAgWByaWdodGBcbiAqIEBwYXJhbSB7bWlkZGxlPTV9ICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5taWRkbGUgICAgICAgICAgICAg5b2T6aG15pWw6L6D5aSa5pe277yM5Lit6Ze05pi+56S655qE6aG15pWwXG4gKiBAcGFyYW0ge3NpZGU9Mn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2lkZSAgICAgICAgICAgICAgIOW9k+mhteaVsOi+g+WkmuaXtu+8jOS4pOerr+aYvuekuueahOmhteaVsFxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgUGFnZXIgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAncGFnZXInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IDEsXG4gICAgICAgICAgICB0b3RhbDogMTEsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBtaWRkbGU6IDUsXG4gICAgICAgICAgICBzaWRlOiAyLFxuICAgICAgICAgICAgX3N0YXJ0OiAxLFxuICAgICAgICAgICAgX2VuZDogNVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG5cbiAgICAgICAgdGhpcy4kd2F0Y2goWydjdXJyZW50JywgJ3RvdGFsJ10sIGZ1bmN0aW9uKGN1cnJlbnQsIHRvdGFsKSB7XG4gICAgICAgICAgICB2YXIgc2hvdyA9IHRoaXMuZGF0YS5taWRkbGU+PjE7XG4gICAgICAgICAgICB2YXIgc2lkZSA9IHRoaXMuZGF0YS5zaWRlO1xuXG4gICAgICAgICAgICB0aGlzLmRhdGEuX3N0YXJ0ID0gY3VycmVudCAtIHNob3c7XG4gICAgICAgICAgICB0aGlzLmRhdGEuX2VuZCA9IGN1cnJlbnQgKyBzaG93O1xuICAgICAgICAgICAgaWYodGhpcy5kYXRhLl9zdGFydCA8IHNpZGUgKyAxKVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5fc3RhcnQgPSBzaWRlICsgMTtcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5fZW5kID4gdG90YWwgLSBzaWRlKVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5fZW5kID0gdG90YWwgLSBzaWRlO1xuICAgICAgICAgICAgaWYoY3VycmVudCAtIHRoaXMuZGF0YS5fc3RhcnQgPCBzaG93KVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5fZW5kICs9IHRoaXMuZGF0YS5fc3RhcnQgLSBjdXJyZW50ICsgc2hvdztcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS5fZW5kIC0gY3VycmVudCA8IHNob3cpXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLl9zdGFydCArPSB0aGlzLmRhdGEuX2VuZCAtIGN1cnJlbnQgLSBzaG93O1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KHBhZ2UpIOmAieaLqeafkOS4gOmhtVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IHBhZ2Ug6YCJ5oup6aG1XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZihwYWdlIDwgMSkgcmV0dXJuO1xuICAgICAgICBpZihwYWdlID4gdGhpcy5kYXRhLnRvdGFsKSByZXR1cm47XG4gICAgICAgIGlmKHBhZ2UgPT0gdGhpcy5kYXRhLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuY3VycmVudCA9IHBhZ2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOmhteaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gY3VycmVudCDlvZPliY3pgInmi6npobVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IHRoaXMuZGF0YS5jdXJyZW50XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2VyOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwibS10YWIge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDx1bCBjbGFzcz1cXFwidGFiX2hkXFxcIj4gICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBpdGVtID09IHNlbGVjdGVkLCBcXCd6LWRpc1xcJzogaXRlbS5kaXNhYmxlZH0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PntpdGVtLm5hbWV9PC9saT4gICAgICAgIHsvbGlzdH0gICAgPC91bD4gICAgPGRpdiBjbGFzcz1cXFwidGFiX2JkXFxcIj4gICAgICAgIDxyLWNvbnRlbnQgLz4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGFiICAgICAgIOmAiemhueWNoVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RhYi5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBUYWJcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgVGFiID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RhYicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogW10sXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKGl0ZW0uZGlzYWJsZWQgfHwgdGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBUYWJQYW5lID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RhYlBhbmUnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiByLWhpZGU9e3RoaXMuJG91dGVyLmRhdGEuc2VsZWN0ZWQudGFiICE9IHRoaXN9PjxyLWNvbnRlbnQ+PC9kaXY+JyxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHsgXG4gICAgICAgIGlmKHRoaXMuJG91dGVyKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gdGhpcy4kb3V0ZXIuZGF0YS5zb3VyY2U7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kYXRhLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgIHRhYjogdGhpc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNvdXJjZS5wdXNoKGl0ZW0pO1xuXG4gICAgICAgICAgICBpZighdGhpcy4kb3V0ZXIuZGF0YS5zZWxlY3RlZClcbiAgICAgICAgICAgICAgICB0aGlzLiRvdXRlci5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYjsiLCJtb2R1bGUuZXhwb3J0cz1cIjx0YWJsZSBjbGFzcz1cXFwibS10YWJsZSBtLXRhYmxldmlldyB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ20tdGFibGUtc3RyaXBlZFxcJzogc3RyaXBlZCwgXFwnbS10YWJsZS1ob3ZlclxcJzogaG92ZXJ9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIDx0aGVhZD4gICAgICAgIDx0cj4gICAgICAgICAgICB7I2xpc3QgZmllbGRzIGFzIGZpZWxkfSAgICAgICAgICAgIDx0aCByLWNsYXNzPXsge1xcJ3RhYmxldmlld19zb3J0YWJsZVxcJzogZmllbGQuc29ydGFibGV9IH0gb24tY2xpY2s9e3RoaXMuc29ydChmaWVsZCl9PiAgICAgICAgICAgICAgICB7ZmllbGQubmFtZSB8fCBmaWVsZC5rZXl9ICAgICAgICAgICAgICAgIHsjaWYgZmllbGQuc29ydGFibGV9ICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwidS1pY29uIHtvcmRlci5ieSA9PT0gZmllbGQua2V5ID8gKG9yZGVyLmRlc2MgPyBcXCd1LWljb24tc29ydC1kZXNjXFwnIDogXFwndS1pY29uLXNvcnQtYXNjXFwnKSA6IFxcJ3UtaWNvbi1zb3J0XFwnfVxcXCI+PC9pPiAgICAgICAgICAgICAgICB7L2lmfSAgICAgICAgICAgIDwvdGg+ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC90cj4gICAgPC90aGVhZD4gICAgPHRib2R5PiAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgPHRyPiAgICAgICAgICAgIHsjbGlzdCBmaWVsZHMgYXMgZmllbGR9ICAgICAgICAgICAgPHRkPntpdGVtW2ZpZWxkLmtleV19PC90ZD4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3RyPiAgICAgICAgey9saXN0fSAgICA8L3Rib2R5PjwvdGFibGU+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGFibGVWaWV3IOihqOagvOinhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RhYmxlVmlldy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBUYWJsZVZpZXdcbiAqIEBleHRlbmQgU291cmNlQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZmllbGQgICAgICAgICAgICAgIOWtl+autembhlxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmZpZWxkW10ua2V5ICAgICAgICDmr4/kuKrlrZfmrrXnmoRrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5maWVsZFtdLm5hbWUgICAgICAg5q+P5Liq5a2X5q615Zyo6KGo5aS05pi+56S655qE5paH5a2X77yM5aaC5p6c5rKh5pyJ5YiZ5pi+56S6a2V5XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuc3RyaXBlZCAgICAgICAgICAgIOaYr+WQpuaYvuekuuadoee6uVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmhvdmVyICAgICAgICAgICAgICDmmK/lkKbmr4/ooYzlnKhob3ZlcuaXtuaYvuekuuagt+W8j1xuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBUYWJsZVZpZXcgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAndGFibGVWaWV3JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgZmllbGRzOiBbXSxcbiAgICAgICAgICAgIHN0cmlwZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgLy8gVE9ETzog5pqC5LiN6ICD6JmR5aSa5a2X5q615o6S5bqPXG4gICAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgICAgIGJ5OiBudWxsLFxuICAgICAgICAgICAgICAgIGRlc2M6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc29ydChmaWVsZCkg5oyJ54Wn5p+Q5Liq5a2X5q615o6S5bqPXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gZmllbGQg5o6S5bqP5a2X5q61XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzb3J0OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICBpZighZmllbGQuc29ydGFibGUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG9yZGVyID0gdGhpcy5kYXRhLm9yZGVyO1xuXG4gICAgICAgIGlmKG9yZGVyLmJ5ID09PSBmaWVsZC5rZXkpXG4gICAgICAgICAgICBvcmRlci5kZXNjID0gIW9yZGVyLmRlc2M7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3JkZXIuYnkgPSBmaWVsZC5rZXk7XG4gICAgICAgICAgICBvcmRlci5kZXNjID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnNlcnZpY2UpXG4gICAgICAgICAgICB0aGlzLiR1cGRhdGVTb3VyY2UoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc291cmNlLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIGlmKG9yZGVyLmRlc2MpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhW29yZGVyLmJ5XSA8IGJbb3JkZXIuYnldO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFbb3JkZXIuYnldID4gYltvcmRlci5ieV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNvcnQg5oyJ54Wn5p+Q5Liq5a2X5q615o6S5bqP5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBmaWVsZCDmjpLluo/lrZfmrrVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NvcnQnLCB7XG4gICAgICAgICAgICBmaWVsZDogZmllbGRcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGFibGVWaWV3OyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwibS10cmVldmlldyB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfT4gICAgPHRyZWVWaWV3TGlzdCBzb3VyY2U9e3NvdXJjZX0gdmlzaWJsZT17dHJ1ZX0gLz48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUcmVlVmlldyAg5qCR5Z6L6KeG5Zu+XG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdHJlZVZpZXcuaHRtbCcpO1xudmFyIGhpZXJhcmNoaWNhbFRlbXBsYXRlID0gcmVxdWlyZSgnLi90cmVlVmlld0xpc3QuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgVHJlZVZpZXdcbiAqIEBleHRlbmQgU291cmNlQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmhpZXJhcmNoaWNhbCAgICAgICDmmK/lkKbliIbnuqfliqjmgIHliqDovb3vvIzpnIDopoFzZXJ2aWNlXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgVHJlZVZpZXcgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAndHJlZVZpZXcnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgICAgIGhpZXJhcmNoaWNhbDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIHRoaXMuJGFuY2VzdG9yID0gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBUcmVlVmlld0xpc3QgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAndHJlZVZpZXdMaXN0JyxcbiAgICB0ZW1wbGF0ZTogaGllcmFyY2hpY2FsVGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIHRoaXMuJGFuY2VzdG9yID0gdGhpcy4kcGFyZW50LiRhbmNlc3RvcjtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gdGhpcy4kYW5jZXN0b3Iuc2VydmljZTtcbiAgICAgICAgdGhpcy5kYXRhLml0ZW1UZW1wbGF0ZSA9IHRoaXMuJGFuY2VzdG9yLmRhdGEuaXRlbVRlbXBsYXRlO1xuICAgICAgICB0aGlzLmRhdGEuaGllcmFyY2hpY2FsID0gdGhpcy4kYW5jZXN0b3IuZGF0YS5oaWVyYXJjaGljYWw7XG5cbiAgICAgICAgdGhpcy4kd2F0Y2goJ3Zpc2libGUnLCBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICAgICAgICAgICAgaWYoIXRoaXMuZGF0YS5oaWVyYXJjaGljYWwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZighbmV3VmFsdWUgfHwgdGhpcy4kcGFyZW50Lm5hbWUgIT09ICd0cmVlVmlld0xpc3QnKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy4kdXBkYXRlU291cmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5oaWVyYXJjaGljYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGdldFBhcmFtczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5wYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gXy5leHRlbmQoe3BhcmVudElkOiB0aGlzLmRhdGEucGFyZW50LmlkfSwgdGhpcy4kYW5jZXN0b3IuZ2V0UGFyYW1zKCkpO1xuICAgIH0sXG4gICAgJHVwZGF0ZVNvdXJjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRMaXN0KHRoaXMuZ2V0UGFyYW1zKCksIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgLy8g57uZ5q+P5Liq6IqC54K5aXRlbea3u+WKoHBhcmVudFxuICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5kYXRhLnBhcmVudDtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHRoaXMuJHVwZGF0ZSgnc291cmNlJywgcmVzdWx0KTtcblxuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlU291cmNlJywge1xuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDpgInmi6npoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZih0aGlzLiRhbmNlc3Rvci5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuJGFuY2VzdG9yLnNlbGVjdChpdGVtKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdG9nZ2xlKGl0ZW0pIOWxleW8gOaIluaUtui1t+afkOS4gOmhuVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOWxleW8gOaUtui1t+mhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuJGFuY2VzdG9yLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaXRlbS5vcGVuID0gIWl0ZW0ub3BlbjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHRvZ2dsZSDlsZXlvIDmiJbmlLbotbfmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGl0ZW0g5bGV5byA5pS26LW36aG5XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gb3BlbiDlsZXlvIDov5jmmK/mlLbotbdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGFuY2VzdG9yLiRlbWl0KCd0b2dnbGUnLCB7XG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgb3BlbjogaXRlbS5vcGVuXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyZWVWaWV3OyIsIm1vZHVsZS5leHBvcnRzPVwiPHVsIGNsYXNzPVxcXCJ0cmVldmlld19saXN0XFxcIiByLWhpZGU9eyF2aXNpYmxlfT4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bGk+ICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0cmVldmlld19pdGVtXFxcIj4gICAgICAgICAgICB7I2lmIGl0ZW0uY2hpbGRyZW5Db3VudCB8fCAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCl9ICAgICAgICAgICAgPGkgY2xhc3M9XFxcInUtaWNvblxcXCIgci1jbGFzcz17IHtcXCd1LWljb24tY2FyZXQtcmlnaHRcXCc6ICFpdGVtLm9wZW4sIFxcJ3UtaWNvbi1jYXJldC1kb3duXFwnOiBpdGVtLm9wZW59fSBvbi1jbGljaz17dGhpcy50b2dnbGUoaXRlbSl9PjwvaT4gICAgICAgICAgICB7L2lmfSAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInRyZWV2aWV3X2l0ZW1uYW1lXFxcIiByLWNsYXNzPXsge1xcJ3otc2VsXFwnOiB0aGlzLiRhbmNlc3Rvci5kYXRhLnNlbGVjdGVkID09PSBpdGVtfSB9IHRpdGxlPXtpdGVtLm5hbWV9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvZGl2PiAgICAgICAgPC9kaXY+ICAgICAgICB7I2lmIGl0ZW0uY2hpbGRyZW5Db3VudCB8fCAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCl9PHRyZWVWaWV3TGlzdCBzb3VyY2U9e2l0ZW0uY2hpbGRyZW59IHZpc2libGU9e2l0ZW0ub3Blbn0gcGFyZW50PXtpdGVtfSAvPnsvaWZ9ICAgIDwvbGk+ICAgIHsvbGlzdH08L3VsPlwiIiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLXVwbG9hZGVyIHtAKGNsYXNzKX1cXFwiIHItaGlkZT17IXZpc2libGV9PiAgICA8YSBjbGFzcz1cXFwidS1idG5cXFwiIG9uLWNsaWNrPXt0aGlzLnVwbG9hZCgpfT57bmFtZSB8fCBcXCfkuIrkvKBcXCd9PC9hPiAgICA8Zm9ybSBtZXRob2Q9XFxcIlBPU1RcXFwiIGFjdGlvbj17dXJsfSB0YXJnZXQ9XFxcImlmcmFtZXtfaWR9XFxcIiBlbmN0eXBlPXtjb250ZW50VHlwZX0gcmVmPVxcXCJmb3JtXFxcIj4gICAgICAgIDxpbnB1dCB0eXBlPVxcXCJmaWxlXFxcIiBuYW1lPVxcXCJmaWxlXFxcIiByZWY9XFxcImZpbGVcXFwiIG9uLWNoYW5nZT17dGhpcy5zdWJtaXQoKX0+ICAgICAgICB7I2xpc3QgT2JqZWN0LmtleXMoZGF0YSkgYXMga2V5fSAgICAgICAgPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT17a2V5fSB2YWx1ZT17ZGF0YVtrZXldfT4gICAgICAgIHsvbGlzdH0gICAgPC9mb3JtPiAgICA8aWZyYW1lIG5hbWU9XFxcImlmcmFtZXtfaWR9XFxcIiBvbi1sb2FkPXt0aGlzLmNiVXBsb2FkKCl9IHJlZj1cXFwiaWZyYW1lXFxcIj4gICAgPC9pZnJhbWU+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVXBsb2FkZXIgIOS4iuS8oFxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3VwbG9hZGVyLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFVwbG9hZGVyXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5uYW1lICAgICAgICAgICAgICAg5oyJ6ZKu5paH5a2XXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEudXJsICAgICAgICAgICAgICAgIOS4iuS8oOi3r+W+hFxuICogQHBhcmFtIHtzdHJpbmc9J2pzb24nfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRhdGFUeXBlICAgICAgICAgICDmlbDmja7nsbvlnotcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kYXRhICAgICAgICAgICAgICAg6ZmE5Yqg5pWw5o2uXG4gKiBAcGFyYW0ge3N0cmluZ1tdPW51bGx9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZXh0ZW5zaW9ucyAgICAgICAgIOWPr+S4iuS8oOeahOaJqeWxleWQje+8jOWmguaenOS4uuepuu+8jOWImeihqOekuuWPr+S4iuS8oOS7u+S9leaWh+S7tuexu+Wei1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBVcGxvYWRlciA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICd1cGxvYWRlcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICBleHRlbnNpb25zOiBudWxsLFxuICAgICAgICAgICAgX2lkOiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHVwbG9hZCgpIOW8ueWHuuaWh+S7tuWvueivneahhuW5tuS4lOS4iuS8oOaWh+S7tlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHVwbG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJHJlZnMuZmlsZS5jbGljaygpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzdWJtaXQoKSDmj5DkuqTooajljZVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc3VibWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLmV4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgIHZhciBmaWxlTmFtZSA9IHRoaXMuJHJlZnMuZmlsZS52YWx1ZTtcbiAgICAgICAgICAgIHZhciBleHQgPSBmaWxlTmFtZS5zdWJzdHJpbmcoZmlsZU5hbWUubGFzdEluZGV4T2YoJy4nKSArIDEsIGZpbGVOYW1lLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLmV4dGVuc2lvbnMuaW5kZXhPZihleHQpID09PSAtMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZW1pdCgnZXJyb3InLCB0aGlzLmV4dGVuc2lvbkVycm9yKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VuZGluZycsIHRoaXMuZGF0YS5kYXRhKTtcblxuICAgICAgICB0aGlzLiRyZWZzLmZvcm0uc3VibWl0KCk7XG4gICAgfSxcbiAgICBjYlVwbG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpZnJhbWUgPSB0aGlzLiRyZWZzLmlmcmFtZTtcblxuICAgICAgICB2YXIgeG1sID0ge307XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZihpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgICAgIHhtbC5yZXNwb25zZVRleHQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5ib2R5ID8gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgOiBudWxsO1xuICAgICAgICAgICAgICAgIHhtbC5yZXNwb25zZVhNTCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LlhNTERvY3VtZW50ID8gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuWE1MRG9jdW1lbnQgOiBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpZnJhbWUuY29udGVudERvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgeG1sLnJlc3BvbnNlVGV4dCA9IGlmcmFtZS5jb250ZW50RG9jdW1lbnQuZG9jdW1lbnQuYm9keT9pZnJhbWUuY29udGVudERvY3VtZW50LmRvY3VtZW50LmJvZHkuaW5uZXJIVE1MIDogbnVsbDtcbiAgICAgICAgICAgICAgICB4bWwucmVzcG9uc2VYTUwgPSBpZnJhbWUuY29udGVudERvY3VtZW50LmRvY3VtZW50LlhNTERvY3VtZW50P2lmcmFtZS5jb250ZW50RG9jdW1lbnQuZG9jdW1lbnQuWE1MRG9jdW1lbnQgOiBpZnJhbWUuY29udGVudERvY3VtZW50LmRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXhtbC5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgZnVuY3Rpb24gdXBsb2FkSHR0cERhdGEociwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSAodHlwZSA9PSAneG1sJyB8fCAhdHlwZSkgPyByLnJlc3BvbnNlWE1MIDogci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBpcyAnc2NyaXB0JywgZXZhbCBpdCBpbiBnbG9iYWwgY29udGV4dFxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdqc29uJykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAvPHByZS4qPz4oLio/KTxcXC9wcmU+Ly5leGVjKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCA/IHRleHRbMV0gOiBkYXRhO1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGVtaXQoJ3N1Y2Nlc3MnLCB1cGxvYWRIdHRwRGF0YSh4bWwsIHRoaXMuZGF0YS5kYXRhVHlwZSkpO1xuICAgICAgICB0aGlzLiRlbWl0KCdjb21wbGV0ZScsIHhtbCk7XG5cbiAgICAgICAgdGhpcy4kcmVmcy5maWxlLnZhbHVlID0gJyc7XG4gICAgfSxcbiAgICBleHRlbnNpb25FcnJvcjrjgIBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICflj6rog73kuIrkvKAnICsgdGhpcy5kYXRhLmV4dGVuc2lvbnMuam9pbignLCAnKeOAgCsgJ+exu+Wei+eahOaWh+S7tu+8gSc7XG4gICAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVwbG9hZGVyOyIsIm1vZHVsZS5leHBvcnRzPVwiPGxhYmVsIGNsYXNzPVxcXCJ1LWNoZWNrMiB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZCwgXFwnei1jaGtcXCc6IGNoZWNrZWQsIFxcJ3otcGFydFxcJzogY2hlY2tlZCA9PT0gbnVsbCwgXFwndS1jaGVjazItYmxvY2tcXCc6IGJsb2NrfSB9IHItaGlkZT17IXZpc2libGV9IHRpdGxlPXtuYW1lfSBvbi1jbGljaz17dGhpcy5jaGVjayghY2hlY2tlZCl9PjxkaXYgY2xhc3M9XFxcImNoZWNrMl9ib3hcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNoZWNrXFxcIj48L2k+PC9kaXY+IHtuYW1lfTwvbGFiZWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2hlY2syICAg5aSa6YCJ5oyJ6ZKuXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vY2hlY2syLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIENoZWNrMlxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubmFtZSAgICAgICAgICAgICAgIOWkmumAieaMiemSrueahOaWh+Wtl1xuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNoZWNrZWQgICAgICAgICAgICDlpJrpgInmjInpkq7nmoTpgInmi6nnirbmgIFcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5piv5ZCm5LulYmxvY2vmlrnlvI/mmL7npLpcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIENoZWNrMiA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdjaGVjazInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYmxvY2s6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2hlY2soY2hlY2tlZCkg5pS55Y+Y6YCJ5Lit54q25oCBXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjaGVjazogZnVuY3Rpb24oY2hlY2tlZCkge1xuICAgICAgICBpZih0aGlzLmRhdGEucmVhZG9ubHkgfHwgdGhpcy5kYXRhLmRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZGF0YS5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjaGVjayDmlLnlj5jpgInkuK3nirbmgIHml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBjaGVja2VkIOmAieS4reeKtuaAgVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnY2hlY2snLCB7XG4gICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrMjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdW5pdGdyb3VwIHtAKGNsYXNzKX1cXFwiIHItaGlkZT17IXZpc2libGV9PiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxjaGVjazIgbmFtZT17aXRlbS5uYW1lfSBjaGVja2VkPXtpdGVtLmNoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0gYmxvY2s9e2Jsb2NrfSAvPiAgICB7L2xpc3R9PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2hlY2syR3JvdXAg6L6T5YWl5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2hlY2tHcm91cCA9IHJlcXVpcmUoJy4vY2hlY2tHcm91cC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9jaGVjazJHcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xudmFyIENoZWNrMiA9IHJlcXVpcmUoJy4vY2hlY2syLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIENoZWNrMkdyb3VwXG4gKiBAZXh0ZW5kIENoZWNrR3JvdXBcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgQ2hlY2syR3JvdXAgPSBDaGVja0dyb3VwLmV4dGVuZCh7XG4gICAgbmFtZTogJ2NoZWNrMkdyb3VwJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrMkdyb3VwOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS11bml0Z3JvdXAge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxhYmVsIGNsYXNzPVxcXCJ1LWNoZWNrMlxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWQsIFxcJ3UtY2hlY2syLWJsb2NrXFwnOiBibG9ja30gfSB0aXRsZT17aXRlbS5uYW1lfT48aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIGNsYXNzPVxcXCJ1LWNoZWNrXFxcIiByLW1vZGVsPXtpdGVtLmNoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0+IHtpdGVtLm5hbWV9PC9sYWJlbD4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENoZWNrR3JvdXAg5aSa6YCJ57uEXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vY2hlY2tHcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBDaGVja0dyb3VwXG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmJsb2NrICAgICAgICAgICAgICDlpJrooYzmmL7npLpcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBDaGVja0dyb3VwID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2NoZWNrR3JvdXAnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBibG9jazogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjaGVja0FsbChjaGVja2VkKSDmlLnlj5jmiYDmnInlpJrpgInnmoTpgInkuK3nirbmgIFcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBjaGVja2VkIOmAieS4reeKtuaAgVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2hlY2tBbGw6IGZ1bmN0aW9uKGNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjaGVja0FsbCDmlLnlj5jmiYDmnInlpJrpgInnmoTpgInkuK3nirbmgIHml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGVja0FsbCcsIHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IGNoZWNrZWRcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tHcm91cDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zdWdnZXN0IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIj4gICAgICAgIDxpbnB1dCBjbGFzcz1cXFwidS1pbnB1dCB1LWlucHV0LWZ1bGxcXFwiIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gdmFsdWU9e2RhdGUgfCBmb3JtYXQ6IFxcJ3l5eXktTU0tZGRcXCd9IG9uLWZvY3VzPXt0aGlzLnRvZ2dsZSh0cnVlKX0gb24tY2hhbmdlPXt0aGlzLmNoYW5nZSgkZXZlbnQpfSByZWY9XFxcImlucHV0XFxcIiBkaXNhYmxlZD17ZGlzYWJsZWR9IHsjaWYgcmVhZG9ubHl9cmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcInsvaWZ9PiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25fYmRcXFwiIHItaGlkZT17IW9wZW59IHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW5ZIGZhc3Q7IG9uOiBsZWF2ZTsgY2xhc3M6IGFuaW1hdGVkIGZhZGVPdXRZIGZhc3Q7XFxcIj4gICAgICAgIDxjYWxlbmRhciBkYXRlPXtkYXRlfSBvbi1zZWxlY3Q9e3RoaXMuc2VsZWN0KCRldmVudC5kYXRlKX0gLz4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0ZVBpY2tlciDml6XmnJ/pgInmi6lcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgRHJvcGRvd24gPSByZXF1aXJlKCcuL2Ryb3Bkb3duLmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2RhdGVQaWNrZXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uL2Jhc2UvZmlsdGVyLmpzJyk7XG52YXIgQ2FsZW5kYXIgPSByZXF1aXJlKCcuLi9tb2R1bGUvY2FsZW5kYXIuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgRGF0ZVBpY2tlclxuICogQGV4dGVuZCBEcm9wZG93blxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kYXRlICAgICAgICAgICAgICAg5b2T5YmN6YCJ5oup55qE5pel5pyfXG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36L6T5YWlJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOaWh+acrOahhum7mOiupOaWh+Wtl1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgRGF0ZVBpY2tlciA9IERyb3Bkb3duLmV4dGVuZCh7XG4gICAgbmFtZTogJ2RhdGVQaWNrZXInLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGRhdGUpIOmAieaLqeS4gOS4quaXpeacn1xuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtEYXRlPW51bGx9IGRhdGUg6YCJ5oup55qE5pel5pyfXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkYXRlIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH0sXG4gICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgkZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgaWYoZGF0ZSAhPSAnSW52YWxpZCBEYXRlJylcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kYXRlID0gZGF0ZTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRlUGlja2VyOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS1kcm9wZG93biB1LWRyb3Bkb3duLXN1Z2dlc3QgdS1kcm9wZG93bi1kYXRldGltZXBpY2tlciB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfSByZWY9XFxcImVsZW1lbnRcXFwiPiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9oZFxcXCI+ICAgICAgICA8aW5wdXQgY2xhc3M9XFxcInUtaW5wdXQgdS1pbnB1dC1mdWxsXFxcIiBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9IHZhbHVlPXtkYXRlIHwgZm9ybWF0OiBcXCd5eXl5LU1NLWRkIEhIOm1tXFwnfSBvbi1mb2N1cz17dGhpcy50b2dnbGUodHJ1ZSl9IG9uLWNoYW5nZT17dGhpcy5jaGFuZ2UoJGV2ZW50KX0gcmVmPVxcXCJpbnB1dFxcXCIgZGlzYWJsZWQ9e2Rpc2FibGVkfSB7I2lmIHJlYWRvbmx5fXJlYWRvbmx5PVxcXCJyZWFkb25seVxcXCJ7L2lmfT4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2JkXFxcIiByLWhpZGU9eyFvcGVufSByLWFuaW1hdGlvbj1cXFwib246IGVudGVyOyBjbGFzczogYW5pbWF0ZWQgZmFkZUluWSBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0WSBmYXN0O1xcXCI+ICAgICAgICA8Y2FsZW5kYXIgZGF0ZT17c2VsZWN0ZWREYXRlfSBvbi1zZWxlY3Q9e3RoaXMuc2VsZWN0KCRldmVudC5kYXRlKX0gLz4gICAgICAgIDx1bCBjbGFzcz1cXFwibS1saXN0dmlld1xcXCI+ICAgICAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgICAgIDxsaSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PntpdGVtLm5hbWV9PC9saT4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3VsPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEYXRlVGltZVBpY2tlciDml6XmnJ/pgInmi6lcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgRGF0ZVBpY2tlciA9IHJlcXVpcmUoJy4vZGF0ZVBpY2tlci5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9kYXRlVGltZVBpY2tlci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi4vYmFzZS9maWx0ZXIuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgRGF0ZVRpbWVQaWNrZXJcbiAqIEBleHRlbmQgRGF0ZVBpY2tlclxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kYXRlICAgICAgICAgICAgICAg5b2T5YmN6YCJ5oup55qE5pel5pyfXG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36L6T5YWlJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOaWh+acrOahhum7mOiupOaWh+Wtl1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgRGF0ZVRpbWVQaWNrZXIgPSBEYXRlUGlja2VyLmV4dGVuZCh7XG4gICAgbmFtZTogJ2RhdGVUaW1lUGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDEwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUnLFxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgc2VsZWN0ZWRUaW1lOiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG5cbiAgICAgICAgLy8gdGhpcy4kd2F0Y2goJ3NlbGVjdGVkJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIC8vICAgICBuZXdWYWx1ZSA9IG5ld1ZhbHVlIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgIC8vICAgICB0aGlzLiRyZWZzLmNhbGVuZGFyLmRhdGEuc2VsZWN0ZWQgPSBuZXdWYWx1ZTtcblxuICAgICAgICAvLyAgICAgdmFyIHRpbWUgPSAgZmlsdGVyLmZvcm1hdChuZXdWYWx1ZSwgbmV3VmFsdWUuZ2V0TWludXRlcygpJTMwID09PSAwID8gJ0hIOm1tJyA6ICdISDowMCcpO1xuICAgICAgICAvLyAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5zb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZGF0YS5zb3VyY2VbaV07ICAgXG4gICAgICAgIC8vICAgICAgICAgaWYodGltZSA9PT0gaXRlbS5uYW1lKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZFRpbWUgPSBpdGVtO1xuICAgICAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIHRoaXMuJHdhdGNoKFsnc2VsZWN0ZWREYXRlJywgJ3NlbGVjdGVkVGltZSddLCBmdW5jdGlvbihzZWxlY3RlZERhdGUsIHNlbGVjdGVkVGltZSkge1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWREYXRlICYmIHNlbGVjdGVkVGltZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodGhpcy5kYXRhLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWUgPSB0aGlzLmRhdGEuc2VsZWN0ZWRUaW1lLnNwbGl0KCc6Jyk7XG5cbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRpbWVbMF0pO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyh0aW1lWzFdKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldFNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBkYXRlO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGRhdGUg5b2T5YmN6YCJ5oup6aG5XG4gICAgICAgICAqL1xuICAgICAgICAvLyB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgIC8vICAgICBkYXRlOiBpdGVtXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIGlmKCEoaXRlbSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkVGltZSA9IGl0ZW0ubmFtZTtcblxuICAgICAgICBpZighKGl0ZW0gaW5zdGFuY2VvZiBEYXRlKSB8fCB0aGlzLmRhdGEuc2VsZWN0ZWRUaW1lKVxuICAgICAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH0sXG4gICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmKGRhdGUgIT0gJ0ludmFsaWQgRGF0ZScpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuZGF0YS5kYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkVGltZSA9IHZhbHVlLnNwbGl0KCcgJylbMV07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRlVGltZVBpY2tlcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24ge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0gcmVmPVxcXCJlbGVtZW50XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25faGRcXFwiPiAgICAgICAgPGEgY2xhc3M9XFxcInUtYnRuIHUtYnRuLXByaW1hcnlcXFwiIG9uLWNsaWNrPXt0aGlzLnRvZ2dsZSghb3Blbil9PntuYW1lIHx8IFxcJ+iPnOWNlVxcJ30gPGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPjwvYT4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2JkXFxcIiByLWhpZGU9eyFvcGVufSByLWFuaW1hdGlvbj1cXFwib246IGVudGVyOyBjbGFzczogYW5pbWF0ZWQgZmFkZUluWSBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0WSBmYXN0O1xcXCI+ICAgICAgICA8dWwgY2xhc3M9XFxcIm0tbGlzdHZpZXdcXFwiPiAgICAgICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgICAgICA8bGkgb24tY2xpY2s9e3RoaXMuc2VsZWN0KGl0ZW0pfT57I2lmIEAoaXRlbVRlbXBsYXRlKX17I2luY2x1ZGUgQChpdGVtVGVtcGxhdGUpfXsjZWxzZX17aXRlbS5uYW1lfXsvaWZ9PC9saT4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3VsPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEcm9wZG93biAg5LiL5ouJ6I+c5Y2VXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2Ryb3Bkb3duLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIERyb3Bkb3duXG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLml0ZW1UZW1wbGF0ZSAgICAgICDljZXpobnmqKHmnb9cbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5vcGVuICAgICAgICAgICAgICAg5b2T5YmN5Li65bGV5byAL+aUtui1t+eKtuaAgVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgRHJvcGRvd24gPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBvcGVuOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIC8vdGhpcy5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZWxlY3RlZCDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvZ2dsZShvcGVuKSDlnKjlsZXlvIAv5pS26LW354q25oCB5LmL6Ze05YiH5o2iXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IG9wZW4g5bGV5byAL+aUtui1t1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihvcGVuKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5yZWFkb25seSB8fCB0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRhdGEub3BlbiA9IG9wZW47XG5cbiAgICAgICAgLy8g5qC55o2u54q25oCB5ZyoRHJvcGRvd24ub3BlbnPliJfooajkuK3mt7vliqAv5Yig6Zmk566h55CG6aG5XG4gICAgICAgIHZhciBpbmRleCA9IERyb3Bkb3duLm9wZW5zLmluZGV4T2YodGhpcyk7XG4gICAgICAgIGlmKG9wZW4gJiYgaW5kZXggPCAwKVxuICAgICAgICAgICAgRHJvcGRvd24ub3BlbnMucHVzaCh0aGlzKTtcbiAgICAgICAgZWxzZSBpZighb3BlbiAmJiBpbmRleCA+PSAwKVxuICAgICAgICAgICAgRHJvcGRvd24ub3BlbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59KTtcblxuLy8g5aSE55CG54K55Ye7ZHJvcGRvd27kuYvlpJbnmoTlnLDmlrnlkI7nmoTmlLbotbfkuovku7bjgIJcbkRyb3Bkb3duLm9wZW5zID0gW107XG5cbl8uZG9tLm9uKGRvY3VtZW50LmJvZHksICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBEcm9wZG93bi5vcGVucy5mb3JFYWNoKGZ1bmN0aW9uKGRyb3Bkb3duKSB7XG4gICAgICAgIC8vIOi/meS4quWcsOaWueS4jeiDveeUqHN0b3BQcm9wYWdhdGlvbuadpeWkhOeQhu+8jOWboOS4uuWxleW8gOS4gOS4qmRyb3Bkb3du55qE5ZCM5pe26KaB5pS26LW35YW25LuWZHJvcGRvd25cbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkcm9wZG93bi4kcmVmcy5lbGVtZW50O1xuICAgICAgICB2YXIgZWxlbWVudDIgPSBlLnRhcmdldDtcbiAgICAgICAgd2hpbGUoZWxlbWVudDIpIHtcbiAgICAgICAgICAgIGlmKGVsZW1lbnQgPT0gZWxlbWVudDIpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZWxlbWVudDIgPSBlbGVtZW50Mi5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGRyb3Bkb3duLnRvZ2dsZShmYWxzZSk7XG4gICAgICAgIGRyb3Bkb3duLiR1cGRhdGUoKTtcbiAgICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3Bkb3duOyIsIm1vZHVsZS5leHBvcnRzPVwiPGxhYmVsIGNsYXNzPVxcXCJ1LWlucHV0MiB7QChjbGFzcyl9XFxcIiByLWhpZGU9eyF2aXNpYmxlfT4gICAgPGlucHV0IGNsYXNzPVxcXCJ1LWlucHV0IHUtaW5wdXQte3R5cGV9XFxcIiByLW1vZGVsPXt2YWx1ZX0gb24ta2V5dXA9e3RoaXMudmFsaWRhdGUodmFsdWUpfT4gICAgPHNwYW4gY2xhc3M9XFxcImlucHV0Ml90aXBcXFwiPnt0aXB9PC9zcGFuPjwvbGFiZWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogSW5wdXQyICAg6L6T5YWl5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2lucHV0Mi5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBJbnB1dDJcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55SoXG4gKiBAcGFyYW0ge2Jvb2xlYW49dHJ1ZX0gICAgICAgICAgICBvcHRpb25zLmRhdGEudmlzaWJsZSAgICAgICAgICAgIOaYr+WQpuaYvuekulxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgSW5wdXQyID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2lucHV0MicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIHVuaXQ6ICclJyxcbiAgICAgICAgICAgIHR5cGU6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICAgICAgdmFyIHJlZyA9IC9eXFxkKyQvO1xuICAgICAgICBpZighcmVnLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEudGlwID0gJ+ivt+i+k+WFpeaVsOWtl++8gSc7XG4gICAgICAgICAgICB0aGlzLmRhdGEudHlwZSA9ICdlcnJvcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEudGlwID0gJyc7XG4gICAgICAgICAgICB0aGlzLmRhdGEudHlwZSA9ICdzdWNjZXNzJztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0MjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1tZW51IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIj4gICAgICAgIDxhIGNsYXNzPVxcXCJ1LWJ0biB1LWJ0bi1wcmltYXJ5XFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT57bmFtZSB8fCBcXCfoj5zljZVcXCd9IDxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNhcmV0LWRvd25cXFwiPjwvaT48L2E+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPG1lbnVMaXN0IHNvdXJjZT17c291cmNlfSB2aXNpYmxlPXt0cnVlfSAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNZW51ICAgICAg5aSa57qn6I+c5Y2VXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi9kcm9wZG93bi5qcycpO1xudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21lbnUuaHRtbCcpO1xudmFyIGhpZXJhcmNoaWNhbFRlbXBsYXRlID0gcmVxdWlyZSgnLi9tZW51TGlzdC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyAgTWVudVxuICogQGV4dGVuZCBEcm9wZG93blxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLm9wZW4gICAgICAgICAgICAgICDlvZPliY3kuLrlsZXlvIAv5pS26LW354q25oCBXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBNZW51ID0gRHJvcGRvd24uZXh0ZW5kKHtcbiAgICBuYW1lOiAnbWVudScsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIG9wZW46IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXM7XG4gICAgfVxufSk7XG5cbnZhciBNZW51TGlzdCA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdtZW51TGlzdCcsXG4gICAgdGVtcGxhdGU6IGhpZXJhcmNoaWNhbFRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogbnVsbCxcbiAgICAgICAgICAgIC8vIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiRhbmNlc3RvciA9IHRoaXMuJHBhcmVudC4kYW5jZXN0b3I7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHRoaXMuJGFuY2VzdG9yLnNlcnZpY2U7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtVGVtcGxhdGUgPSB0aGlzLiRhbmNlc3Rvci5kYXRhLml0ZW1UZW1wbGF0ZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuJGFuY2VzdG9yLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy4kYW5jZXN0b3Iuc2VsZWN0KGl0ZW0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB0b2dnbGUoaXRlbSkg5bGV5byA5oiW5pS26LW35p+Q5LiA6aG5XG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g5bGV5byA5pS26LW36aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGU6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYodGhpcy4kYW5jZXN0b3IuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpdGVtLm9wZW4gPSAhaXRlbS5vcGVuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgdG9nZ2xlIOWxleW8gOaIluaUtui1t+afkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gaXRlbSDlsZXlvIDmlLbotbfpoblcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBvcGVuIOWxleW8gOi/mOaYr+aUtui1t1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kYW5jZXN0b3IuJGVtaXQoJ3RvZ2dsZScsIHtcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICBvcGVuOiBpdGVtLm9wZW5cbiAgICAgICAgfSk7XG4gICAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBNZW51OyIsIm1vZHVsZS5leHBvcnRzPVwiPHVsIGNsYXNzPVxcXCJtLWxpc3R2aWV3IG1lbnVfbGlzdFxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxpPiAgICAgICAgPGRpdiBjbGFzcz1cXFwibWVudV9pdGVtXFxcIj4gICAgICAgICAgICB7I2lmIGl0ZW0uY2hpbGRyZW5Db3VudCB8fCAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCl9ICAgICAgICAgICAgPGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtcmlnaHRcXFwiPjwvaT4gICAgICAgICAgICB7L2lmfSAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1lbnVfaXRlbW5hbWVcXFwiIHRpdGxlPXtpdGVtLm5hbWV9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvZGl2PiAgICAgICAgPC9kaXY+ICAgICAgICB7I2lmIGl0ZW0uY2hpbGRyZW5Db3VudCB8fCAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCl9PG1lbnVMaXN0IHNvdXJjZT17aXRlbS5jaGlsZHJlbn0gdmlzaWJsZT17aXRlbS5vcGVufSBwYXJlbnQ9e2l0ZW19IC8+ey9pZn0gICAgPC9saT4gICAgey9saXN0fTwvdWw+XCIiLCJtb2R1bGUuZXhwb3J0cz1cIjxsYWJlbCBjbGFzcz1cXFwidS1pbnB1dDIgdS1pbnB1dDItbnVtYmVyaW5wdXQge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIDxpbnB1dCBjbGFzcz1cXFwidS1pbnB1dCB1LWlucHV0LXt0eXBlfVxcXCIgci1tb2RlbD17dmFsdWUgfCBudW1iZXJ9IG9uLWtleXVwPXt0aGlzLnZhbGlkYXRlKHZhbHVlKX0+ICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuaW5jcmVhc2UoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtdXBcXFwiPjwvaT48L2E+ICAgIDxhIGNsYXNzPVxcXCJ1LWJ0blxcXCIgb24tY2xpY2s9e3RoaXMuZGVjcmVhc2UoKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPjwvYT4gICAgPHNwYW4gY2xhc3M9XFxcImlucHV0Ml90aXBcXFwiPnt0aXB9PC9zcGFuPjwvbGFiZWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTnVtYmVySW5wdXQg6L6T5YWl5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL251bWJlcklucHV0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIE51bWJlcklucHV0XG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIE51bWJlcklucHV0ID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ251bWJlcklucHV0JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICB1bml0OiAnJScsXG4gICAgICAgICAgICB0eXBlOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIH0sXG4gICAgaW5jcmVhc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRhdGEudmFsdWUrKztcbiAgICB9LFxuICAgIGRlY3JlYXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kYXRhLnZhbHVlLS07XG4gICAgfVxufSkuZmlsdGVyKHtcbiAgICBudW1iZXI6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnICsgKHZhbHVlIHx8IDApO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gK3ZhbHVlIHx8IDA7XG4gICAgICAgICAgICAvLyByZXR1cm4gKyh2YWx1ZS5yZXBsYWNlKC9bXlxcZFxcLlxcLV0vZywgJycpKSB8fCAwO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTnVtYmVySW5wdXQ7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LXByb2dyZXNzIHUtcHJvZ3Jlc3Mte0Aoc2l6ZSl9IHUtcHJvZ3Jlc3Mte0AodHlwZSl9IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwndS1wcm9ncmVzcy1zdHJpcGVkXFwnOiBzdHJpcGVkLCBcXCd6LWFjdFxcJzogYWN0aXZlfSB9IHItaGlkZT17IXZpc2libGV9PiAgICA8ZGl2IGNsYXNzPVxcXCJwcm9ncmVzc19iYXJcXFwiIHN0eWxlPVxcXCJ3aWR0aDoge3BlcmNlbnR9JTtcXFwiPnt0ZXh0ID8gKHRleHQgPT09IHRydWUgPyBwZXJjZW50ICsgXFwnJVxcJyA6IHRleHQpIDogXFwnXFwnfTwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFByb2dyZXNzICDov5vluqbmnaFcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9wcm9ncmVzcy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBQcm9ncmVzc1xuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge251bWJlcj0zNn0gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEucGVyY2VudCAgICAgICAgICAgIOeZvuWIhuavlFxuICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbj10cnVlfSAgICAgb3B0aW9ucy5kYXRhLnRleHQgICAgICAgICAgICAgICDlnKjov5vluqbmnaHkuK3mmK/lkKbmmL7npLrnmb7liIbmr5TjgILlgLzkuLpgc3RyaW5nYOaXtuaYvuekuuivpeauteaWh+Wtl+OAglxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNpemUgICAgICAgICAgICAgICDov5vluqbmnaHnmoTlsLrlr7hcbiAqIEBwYXJhbSB7c3RyaW5nPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS50eXBlICAgICAgICAgICAgICAg6L+b5bqm5p2h55qE57G75Z6L77yM5pS55Y+Y5pi+56S66aKc6ImyXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuc3RyaXBlZCAgICAgICAgICAgIOaYr+WQpuaYvuekuuadoee6uVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmFjdGl2ZSAgICAgICAgICAgICDov5vluqbmnaHmmK/lkKbkuLrmv4DmtLvnirbmgIHvvIzlvZNgc3RyaXBlZGDkuLpgdHJ1ZWDml7bvvIzov5vluqbmnaHmmL7npLrliqjnlLtcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBQcm9ncmVzcyA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdwcm9ncmVzcycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHBlcmNlbnQ6IDM2LFxuICAgICAgICAgICAgdGV4dDogdHJ1ZSxcbiAgICAgICAgICAgIHNpemU6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgc3RyaXBlZDogZmFsc2UsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9ncmVzczsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdW5pdGdyb3VwIHtAKGNsYXNzKX1cXFwiIHItaGlkZT17IXZpc2libGV9PiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxsYWJlbCBjbGFzcz1cXFwidS1yYWRpbzJcXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkLCBcXCd6LXNlbFxcJzogaXRlbSA9PT0gc2VsZWN0ZWQsIFxcJ3UtcmFkaW8yLWJsb2NrXFwnOiBibG9ja30gfSB0aXRsZT17aXRlbS5uYW1lfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PjxkaXYgY2xhc3M9XFxcInJhZGlvMl9ib3hcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLXJhZGlvXFxcIj48L2k+PC9kaXY+IHtpdGVtLm5hbWV9PC9sYWJlbD4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFJhZGlvMkdyb3VwIOi+k+WFpeaJqeWxlVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJhZGlvR3JvdXAgPSByZXF1aXJlKCcuL3JhZGlvR3JvdXAuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcmFkaW8yR3JvdXAuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgUmFkaW8yR3JvdXBcbiAqIEBleHRlbmQgUmFkaW9Hcm91cFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjZWQgICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgUmFkaW8yR3JvdXAgPSBSYWRpb0dyb3VwLmV4dGVuZCh7XG4gICAgbmFtZTogJ3JhZGlvMkdyb3VwJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJhZGlvMkdyb3VwOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS11bml0Z3JvdXAge0AoY2xhc3MpfVxcXCIgci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxhYmVsIGNsYXNzPVxcXCJ1LXJhZGlvMlxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWQsIFxcJ3UtcmFkaW8yLWJsb2NrXFwnOiBibG9ja30gfSB0aXRsZT17aXRlbS5uYW1lfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PjxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgY2xhc3M9XFxcInUtcmFkaW9cXFwiIG5hbWU9e19yYWRpb0dyb3VwSWR9IGRpc2FibGVkPXtkaXNhYmxlZH0+IHtpdGVtLm5hbWV9PC9sYWJlbD4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFJhZGlvR3JvdXAg5Y2V6YCJ57uEXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcmFkaW9Hcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBSYWRpb0dyb3VwXG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjZWQgICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgUmFkaW9Hcm91cCA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdyYWRpb0dyb3VwJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICBfcmFkaW9Hcm91cElkOiBuZXcgRGF0ZSgpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9Hcm91cDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zZWxlY3QyIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHItaGlkZT17IXZpc2libGV9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT4gICAgICAgIDxzcGFuPntzZWxlY3RlZCA/IHNlbGVjdGVkLm5hbWUgOiBwbGFjZWhvbGRlcn08L3NwYW4+ICAgICAgICA8aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jYXJldC1kb3duXFxcIj48L2k+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPHVsIGNsYXNzPVxcXCJtLWxpc3R2aWV3XFxcIj4gICAgICAgICAgICB7I2lmIHBsYWNlaG9sZGVyfTxsaSByLWNsYXNzPXsge1xcJ3otc2VsXFwnOiBzZWxlY3RlZCA9PT0gbnVsbH0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QobnVsbCl9PntwbGFjZWhvbGRlcn08L2xpPnsvaWZ9ICAgICAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otc2VsXFwnOiBzZWxlY3RlZCA9PT0gaXRlbX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PntpdGVtLm5hbWV9PC9saT4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3VsPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBTZWxlY3QyICDpgInmi6nmianlsZVcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBEcm9wZG93biA9IHJlcXVpcmUoJy4vZHJvcGRvd24uanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vc2VsZWN0Mi5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBTZWxlY3QyXG4gKiBAZXh0ZW5kIERyb3Bkb3duXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9J+ivt+mAieaLqSd9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBsYWNlaG9sZGVyICAgICAgICDpu5jorqTpobnnmoTmloflrZdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqFxuICogQHBhcmFtIHtib29sZWFuPXRydWV9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZpc2libGUgICAgICAgICAgICDmmK/lkKbmmL7npLpcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBTZWxlY3QyID0gRHJvcGRvd24uZXh0ZW5kKHtcbiAgICBuYW1lOiAnc2VsZWN0MicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2VcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICfor7fpgInmi6knXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCdzZWxlY3RlZCcsIGl0ZW0pO1xuICAgICAgICAvL3RoaXMuZGF0YS5zZWxlY3RlZCA9IGl0ZW07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2VsZWN0ZWQg5b2T5YmN6YCJ5oup6aG5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBzZWxlY3RlZDogaXRlbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3QyOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS1kcm9wZG93biB1LWRyb3Bkb3duLXN1Z2dlc3Qge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0gcmVmPVxcXCJlbGVtZW50XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25faGRcXFwiPiAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJ1LWlucHV0IHUtaW5wdXQtZnVsbFxcXCIgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfSByLW1vZGVsPXt2YWx1ZX0gb24tZm9jdXM9e3RoaXMuaW5wdXQoJGV2ZW50KX0gb24ta2V5dXA9e3RoaXMuaW5wdXQoJGV2ZW50KX0gb24tYmx1cj17dGhpcy51bmlucHV0KCRldmVudCl9IHJlZj1cXFwiaW5wdXRcXFwiIGRpc2FibGVkPXtkaXNhYmxlZH0geyNpZiByZWFkb25seX1yZWFkb25seT1cXFwicmVhZG9ubHlcXFwiey9pZn0+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPHVsIGNsYXNzPVxcXCJtLWxpc3R2aWV3XFxcIj4gICAgICAgICAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgICAgICAgICAgeyNpZiB0aGlzLmZpbHRlcihpdGVtKX0gICAgICAgICAgICAgICAgPGxpIG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+e2l0ZW0ubmFtZX08L2xpPiAgICAgICAgICAgIHsvaWZ9ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC91bD4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogU3VnZ2VzdCAgIOiHquWKqOaPkOekulxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi9kcm9wZG93bi5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zdWdnZXN0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG52YXIgTGlzdFZpZXcgPSByZXF1aXJlKCcuLi9tb2R1bGUvbGlzdFZpZXcuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgU3VnZ2VzdFxuICogQGV4dGVuZCBEcm9wZG93blxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52YWx1ZSAgICAgICAgICAgICAg5paH5pys5qGG5Lit55qE5YC8XG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36L6T5YWlJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOaWh+acrOahhum7mOiupOaWh+Wtl1xuICogQHBhcmFtIHtudW1iZXI9MH0gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLm1pbkxlbmd0aCAgICAgICAgICDmnIDlsI/mj5DnpLrplb/luqbjgILlvZPovpPlhaXplb/luqY+PeivpeWAvOWQjuW8gOWni+aPkOekulxuICogQHBhcmFtIHtzdHJpbmc9J2FsbCd9ICAgICAgICAgICAgb3B0aW9ucy5kYXRhLm1hdGNoVHlwZSAgICAgICAgICDljLnphY3mlrnlvI/vvIxgYWxsYOihqOekuuWMuemFjeWFqOWxgO+8jGBzdGFydGDooajnpLrlj6rljLnphY3lvIDlpLTvvIxgZW5kYOihqOekuuWPquWMuemFjee7k+WwvlxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnN0cmljdCAgICAgICAgICAgICDmmK/lkKbkuLrkuKXmoLzmqKHlvI/jgILlvZPkuLrkuKXmoLzmqKHlvI/ml7bvvIxgdmFsdWVg5bGe5oCn5b+F6aG75Zyoc291cmNl5Lit6YCJ5oup77yM5ZCm5YiZ5Li656m644CCXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgU3VnZ2VzdCA9IERyb3Bkb3duLmV4dGVuZCh7XG4gICAgbmFtZTogJ3N1Z2dlc3QnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ+ivt+i+k+WFpScsXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDAsXG4gICAgICAgICAgICBkZWxheTogMzAwLFxuICAgICAgICAgICAgbWF0Y2hUeXBlOiAnYWxsJyxcbiAgICAgICAgICAgIHN0cmljdDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoaXRlbSkg6YCJ5oup5p+Q5LiA6aG5XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSDpgInmi6npoblcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB0aGlzLiR1cGRhdGUoJ3NlbGVjdGVkJywgaXRlbSk7XG4gICAgICAgIHRoaXMuZGF0YS52YWx1ZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgLy90aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdG9nZ2xlKG9wZW4pICDlnKjlsZXlvIDnirbmgIHlkozmlLbotbfnirbmgIHkuYvpl7TliIfmjaJcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gb3BlbiDlsZXlvIDov5jmmK/mlLbotbdcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHRvZ2dsZTogZnVuY3Rpb24ob3BlbiwgX2lzSW5wdXQpIHtcbiAgICAgICAgaWYodGhpcy5kYXRhLnJlYWRvbmx5IHx8IHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEub3BlbiA9IG9wZW47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCB0b2dnbGUg5bGV5byA5oiW5pS26LW354q25oCB5pS55Y+Y5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gb3BlbiDlsZXlvIDov5jmmK/mlLbotbdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3RvZ2dsZScsIHtcbiAgICAgICAgICAgIG9wZW46IG9wZW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gRHJvcGRvd24ub3BlbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgaWYob3BlbiAmJiBpbmRleCA8IDApXG4gICAgICAgICAgICBEcm9wZG93bi5vcGVucy5wdXNoKHRoaXMpO1xuICAgICAgICBlbHNlIGlmKCFvcGVuICYmIGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIERyb3Bkb3duLm9wZW5zLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIGlmKCFfaXNJbnB1dCAmJiB0aGlzLmRhdGEuc3RyaWN0KVxuICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZhbHVlID0gdGhpcy5kYXRhLnNlbGVjdGVkID8gdGhpcy5kYXRhLnNlbGVjdGVkLm5hbWUgOiAnJztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8g6L6T5YWl5pe2XG4gICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmRhdGEudmFsdWU7XG5cbiAgICAgICAgaWYodmFsdWUubGVuZ3RoID49IHRoaXMuZGF0YS5taW5MZW5ndGgpXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSh0cnVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UsIHRydWUpO1xuICAgIH0sXG4gICAgdW5pbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG5cbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmRhdGEudmFsdWU7XG5cbiAgICAgICAgaWYoIXZhbHVlICYmIHRoaXMuZGF0YS5taW5MZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYodGhpcy5kYXRhLm1hdGNoVHlwZSA9PSAnYWxsJylcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbiAgICAgICAgZWxzZSBpZih0aGlzLmRhdGEubWF0Y2hUeXBlID09ICdzdGFydCcpXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCkgPT0gdmFsdWU7XG4gICAgICAgIGVsc2UgaWYodGhpcy5kYXRhLm1hdGNoVHlwZSA9PSAnZW5kJylcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUuc2xpY2UoLXZhbHVlLmxlbmd0aCkgPT0gdmFsdWU7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3VnZ2VzdDsiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGltZVBpY2tlciDml6XmnJ/pgInmi6lcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgU3VnZ2VzdCA9IHJlcXVpcmUoJy4vc3VnZ2VzdC5qcycpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgVGltZVBpY2tlclxuICogQGV4dGVuZCBTdWdnZXN0XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZhbHVlICAgICAgICAgICAgICDmlofmnKzmoYbkuK3nmoTlgLxcbiAqIEBwYXJhbSB7c3RyaW5nPSfor7fovpPlhaUnfSAgICAgICAgIG9wdGlvbnMuZGF0YS5wbGFjZWhvbGRlciAgICAgICAg5paH5pys5qGG6buY6K6k5paH5a2XXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBUaW1lUGlja2VyID0gU3VnZ2VzdC5leHRlbmQoe1xuICAgIG5hbWU6ICd0aW1lUGlja2VyJyxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDEwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCB2YWx1ZTogJycsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHBsYWNlaG9sZGVyOiAn6K+36L6T5YWlJyxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgbWluTGVuZ3RoOiAwLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBkZWxheTogMzAwLFxuICAgICAgICAgICAgbWF0Y2hUeXBlOiAnc3RhcnQnXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHN0cmljdDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbWVQaWNrZXI7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWRyb3Bkb3duIHUtZHJvcGRvd24tc2VsZWN0MiB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByLWhpZGU9eyF2aXNpYmxlfSByZWY9XFxcImVsZW1lbnRcXFwiPiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9oZFxcXCIgb24tY2xpY2s9e3RoaXMudG9nZ2xlKCFvcGVuKX0+ICAgICAgICA8aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jYXJldC1kb3duXFxcIj48L2k+ICAgICAgICA8c3Bhbj57c2VsZWN0ZWQgPyBzZWxlY3RlZC5uYW1lIDogcGxhY2Vob2xkZXJ9PC9zcGFuPiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25fYmRcXFwiIHItaGlkZT17IW9wZW59IHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW5ZIGZhc3Q7IG9uOiBsZWF2ZTsgY2xhc3M6IGFuaW1hdGVkIGZhZGVPdXRZIGZhc3Q7XFxcIj4gICAgICAgIDx0cmVlVmlldyBzb3VyY2U9e3NvdXJjZX0gb24tc2VsZWN0PXt0aGlzLnNlbGVjdCgkZXZlbnQuc2VsZWN0ZWQpfSAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUcmVlU2VsZWN0IOagkeWei+mAieaLqVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNlbGVjdDIgPSByZXF1aXJlKCcuL3NlbGVjdDIuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdHJlZVNlbGVjdC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xudmFyIFRyZWV2aWV3ID0gcmVxdWlyZSgnLi4vbW9kdWxlL3RyZWVWaWV3LmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFRyZWVTZWxlY3RcbiAqIEBleHRlbmQgU2VsZWN0MlxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7c3RyaW5nPSfor7fpgInmi6knfSAgICAgICAgIG9wdGlvbnMuZGF0YS5wbGFjZWhvbGRlciAgICAgICAg6buY6K6k6aG555qE5paH5a2XXG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEucmVhZG9ubHkgICAgICAgICAgIOaYr+WQpuWPquivu1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKhcbiAqIEBwYXJhbSB7Ym9vbGVhbj10cnVlfSAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52aXNpYmxlICAgICAgICAgICAg5piv5ZCm5pi+56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgVHJlZVNlbGVjdCA9IFNlbGVjdDIuZXh0ZW5kKHtcbiAgICBuYW1lOiAndHJlZVNlbGVjdCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHBsYWNlaG9sZGVyOiAn6K+36YCJ5oupJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZVNlbGVjdDsiXX0=
