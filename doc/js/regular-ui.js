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
// 消息类
RGUI.Notify = require('./unit/notify.js');
RGUI.Progress = require('./unit/progress.js');

// 效果类
RGUI.DropDown = require('./unit/dropDown.js');

// 表单类
RGUI.InputEx = require('./unit/inputEx.js');
RGUI.CheckEx = require('./unit/checkEx.js');
RGUI.CheckGroup = require('./unit/checkGroup.js');
RGUI.CheckExGroup = require('./unit/checkExGroup.js');
RGUI.RadioGroup = require('./unit/radioGroup.js');
RGUI.RadioExGroup = require('./unit/radioExGroup.js');
RGUI.SelectEx = require('./unit/selectEx.js');
RGUI.Suggest = require('./unit/suggest.js');

// 数据类
RGUI.ListBox = require('./unit/listBox.js');
RGUI.ListView = require('./unit/listView.js');
RGUI.GridView = require('./unit/gridView.js');
RGUI.TreeView = require('./unit/treeView.js');
RGUI.TableView = require('./unit/tableView.js');
RGUI.TreeSelect = require('./unit/treeSelect.js');

// 日期类
RGUI.Calendar = require('./unit/calendar.js');
RGUI.DatePicker = require('./unit/datePicker.js');
RGUI.TimePicker = require('./unit/timePicker.js');
RGUI.DateTimePicker = require('./unit/dateTimePicker.js');

/**
 * jsModule
 */
// 导航类
RGUI.Tab = require('./module/tab.js');
RGUI.Pager = require('./module/pager.js');

// 窗口类
RGUI.Modal = require('./module/modal.js');

// 编辑器类
RGUI.Editor = require('./module/editor.js');
RGUI.MarkEditor = require('./module/markEditor.js');

module.exports = window.RGUI = RGUI;
},{"./base/component.js":29,"./base/request.js":31,"./base/util.js":33,"./module/editor.js":35,"./module/markEditor.js":37,"./module/modal.js":39,"./module/pager.js":41,"./module/tab.js":43,"./unit/calendar.js":45,"./unit/checkEx.js":47,"./unit/checkExGroup.js":49,"./unit/checkGroup.js":51,"./unit/datePicker.js":53,"./unit/dateTimePicker.js":55,"./unit/dropDown.js":57,"./unit/gridView.js":59,"./unit/inputEx.js":61,"./unit/listBox.js":63,"./unit/listView.js":65,"./unit/notify.js":67,"./unit/progress.js":69,"./unit/radioExGroup.js":71,"./unit/radioGroup.js":73,"./unit/selectEx.js":75,"./unit/suggest.js":77,"./unit/tableView.js":79,"./unit/timePicker.js":80,"./unit/treeSelect.js":82,"./unit/treeView.js":84,"regularjs":21}],2:[function(require,module,exports){
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
'use strict';

var Regular = require("regularjs");
var filter = require("./filter.js");

var dom = Regular.dom; 

var Component = Regular.extend({
	// request
	$request: function(){}
})
.filter(filter)
.directive({
	// if expression evaluated to true then addClass z-crt.
	// otherwise, remove it
	// <li z-crt={this.$state.current.name==='app.test.exam.choice'}>
	"z-crt": function(elem, value){
	this.$watch(value, function(val){
		dom[val? 'addClass': 'delClass'](elem, 'z-crt');
	})
	},
	"q-render": function(elem, value){
	this.$watch(value, function(val){
		if(val) elem.innerHTML = qs.render(val)
	})
	}
})

module.exports = Component;
},{"./filter.js":30,"regularjs":21}],30:[function(require,module,exports){
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
var request = {};
//var Progress = require('../component/progress/progress.rglc');
//var progress = new Progress();
request.request = function(opt) {
  var noop = function(){};
  var olderror = opt.error || noop,
      oldsuccess = opt.success || noop;

  if(opt.method && opt.method.toLowerCase() === 'post'){
    opt.contentType = 'application/json'
  }

  if(opt.contentType === 'application/json' || opt.headers && opt.headers.contentType === 'application/json') {
    opt.data = JSON.stringify(opt.data);
  }
  if(!opt.method || opt.method === 'get') {
    if(opt.data) opt.data.timestamp = +new Date;
    else opt.data = {timestamp: +new Date}
  }
  //opt.progress && progress.start();
  opt.success = function(json) {
    //opt.progress && progress.end();
    oldsuccess.apply(this, arguments);
    //router.go('app.forbidden');
  }
  opt.error = function(json) {
    //opt.progress && progress.end(true);
    olderror.apply(this, arguments);
  }
  reqwest(opt);
}

module.exports = request;
},{"reqwest":28}],32:[function(require,module,exports){
'use strict';

var Component = require('./component.js');
var _ = require('./util.js');

/**
 * @class SourceComponent
 * @extend Component
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
        this.service.getList(this.getParams(), function(data) {
            if(data.code != 200 && !data.success)
                return alert(data.result);

            this.$update('source', data.result);
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
module.exports=""
},{}],35:[function(require,module,exports){
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

},{"../base/component.js":29,"../base/util.js":33,"./editor.html":34}],36:[function(require,module,exports){
module.exports="<div class=\"m-editor\">    <div class=\"editor_preview\" r-html={this.getHTML()}></div>    <ul class=\"m-toolbar\">        <li><a title=\"加粗\"><i class=\"u-icon u-icon-bold\"></i></a></li>        <li><a title=\"斜体\"><i class=\"u-icon u-icon-italic\"></i></a></li>        <li class=\"seperator\"></li>        <li><a title=\"引用\"><i class=\"u-icon u-icon-quote\"></i></a></li>        <li><a title=\"无序列表\"><i class=\"u-icon u-icon-list-ul\"></i></a></li>        <li><a title=\"有序列表\"><i class=\"u-icon u-icon-list-ol\"></i></a></li>        <li class=\"seperator\"></li>        <li><a title=\"链接\"><i class=\"u-icon u-icon-link\"></i></a></li>        <li><a title=\"图片\"><i class=\"u-icon u-icon-image\"></i></a></li>        <li><a title=\"公式\">∑</a></li>    </ul>    <textarea class=\"editor_textarea\" r-model={content}></textarea></div>"
},{}],37:[function(require,module,exports){
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
 * @param {string=''}               options.data.content            编辑器内容
 * @param {string|boolean=true}     options.data.okButton           是否显示确定按钮。值为`string`时显示该段文字。
 * @param {string|boolean=false}    options.data.cancelButton       是否显示取消按钮。值为`string`时显示该段文字。
 * @param {number=null}             options.data.width              对话框宽度。值为否定时宽度为CSS设置的宽度。
 * @param {function}                options.ok                      当点击确定的时候执行
 * @param {function}                options.cancel                  当点击取消的时候执行
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
    getHTML: function() {
        return marked(this.data.content);
    }
    /**
     * @protected
     */
    // init: function() {
    //     this.supr();
    // }
});

module.exports = MarkEditor;

},{"../base/component.js":29,"../base/util.js":33,"./markEditor.html":36,"marked":2}],38:[function(require,module,exports){
module.exports="<div class=\"m-modal {@(class)}\">    <div class=\"modal_dialog\" {#if width}style=\"width: {width}px\"{/if}>        <div class=\"modal_hd\">            <a class=\"modal_close\" on-click={this.close(!cancelButton)}><i class=\"u-icon u-icon-close\"></i></a>            <h3 class=\"modal_title\">{title}</h3>        </div>        <div class=\"modal_bd\">            {content}        </div>        <div class=\"modal_ft\">            {#if okButton}            <button class=\"u-btn u-btn-primary\" on-click={this.close(true)}>{okButton === true ? \'确定\' : okButton}</button>            {/if}            {#if cancelButton}            <button class=\"u-btn\" on-click={this.close(false)}>{cancelButton === true ? \'取消\' : cancelButton}</button>            {/if}        </div>    </div></div>"
},{}],39:[function(require,module,exports){
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
 * @param {function}                options.ok                      当点击确定的时候执行
 * @param {function}                options.cancel                  当点击取消的时候执行
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

/**
 * @method alert([content][,title]) 弹出一个alert对话框。关闭时始终触发确定事件。
 * @static
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.alert = function(content, title) {
    var modal = new Modal({
        data: {
            content: content,
            title: title
        }
    });
    return modal;
}

/**
 * @method confirm([content][,title]) 弹出一个confirm对话框
 * @static
 * @param  {string=''} content 对话框内容
 * @param  {string='提示'} title 对话框标题
 * @return {void}
 */
Modal.confirm = function(content, title) {
    var modal = new Modal({
        data: {
            content: content,
            title: title,
            cancelButton: true
        }
    });
    return modal;
}

module.exports = Modal;

},{"../base/component.js":29,"../base/util.js":33,"./modal.html":38}],40:[function(require,module,exports){
module.exports="<ul class=\"m-pager m-pager-{position} {@(class)}\">    <li class=\"pager_prev\" r-class={ {\'z-dis\' : current <= 1} } on-click={this.select(current - 1)}><a>上一页</a></li>    {#if total - middle > side * 2 + 1}        {#list 1..side as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}        {#if _start > side + 1}<li>...</li>{/if}        {#list _start.._end as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}        {#if _end < total - side}<li>...</li>{/if}        {#list (total - side + 1)..total as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}    {#else}        {#list 1..total as i}        <li r-class={ {\'z-crt\': current == i} } on-click={this.select(i)}><a>{i}</a></li>        {/list}    {/if}    <li class=\"pager_next\" r-class={ {\'z-dis\' : current >= total} } on-click={this.select(current + 1)}><a>下一页</a></li></ul>"
},{}],41:[function(require,module,exports){
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
 * @param {middle=5}                options.data.middle             当页数较多时，中间显示的页数
 * @param {side=2}                  options.data.side               当页数较多时，两端显示的页数
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var Pager = Component.extend({
    name: 'pager',
    template: template,
    config: function() {
        _.extend(this.data, {
            current: 1,
            total: 11,
            middle: 5,
            side: 2,
            _start: 1,
            _end: 5,
            disabled: false
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
    select: function(page) {
        if(this.data.disabled)
            return;

        if(page < 1) return;
        if(page > this.data.total) return;
        if(page == this.data.current) return;

        this.data.current = page;

        this.$emit('select', {
            current: this.data.current
        });
    }
});

module.exports = Pager;
},{"../base/component.js":29,"../base/util.js":33,"./pager.html":40}],42:[function(require,module,exports){
module.exports="<div class=\"m-tab {@(class)}\">    <ul class=\"tab_hd\">        {#list source as item}        <li r-class={ {\'z-crt\': item == selected, \'z-dis\': item.disabled} } on-click={this.select(item)}>{item.name}</li>        {/list}    </ul>    <div class=\"tab_bd\">        <r-content />    </div></div>"
},{}],43:[function(require,module,exports){
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
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
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
        if(item.disabled)
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
},{"../base/component.js":29,"../base/util.js":33,"./tab.html":42}],44:[function(require,module,exports){
module.exports="<div class=\"u-calendar\" r-class={ {\'z-dis\': disabled} }>    <div class=\"calendar_hd\">        <span class=\"calendar_prev\">            <span class=\"calendar_item\" on-click={this.addYear(-1)}><i class=\"u-icon u-icon-angle-double-left\"></i></span>            <span class=\"calendar_item\" on-click={this.addMonth(-1)}><i class=\"u-icon u-icon-angle-left\"></i></span>        </span>        <span>{date | format: \'yyyy-MM\'}</span>        <span class=\"calendar_next\">            <span class=\"calendar_item\" on-click={this.addMonth(1)}><i class=\"u-icon u-icon-angle-right\"></i></span>            <span class=\"calendar_item\" on-click={this.addYear(1)}><i class=\"u-icon u-icon-angle-double-right\"></i></span>        </span>    </div>    <div class=\"calendar_bd\">        <div class=\"calendar_week\"><span class=\"calendar_item\">日</span><span class=\"calendar_item\">一</span><span class=\"calendar_item\">二</span><span class=\"calendar_item\">三</span><span class=\"calendar_item\">四</span><span class=\"calendar_item\">五</span><span class=\"calendar_item\">六</span></div>        <div class=\"calendar_day\">{#list _days as day}<span class=\"calendar_item\" r-class={ {\'z-sel\': date.toDateString() === day.toDateString(), \'z-dis\': day.getMonth() !== date.getMonth()} } on-click={this.select(day)}>{day | format: \'dd\'}</span>{/list}</div>    </div></div>"
},{}],45:[function(require,module,exports){
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
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
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
            disabled: false,
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
        if(this.data.disabled || !year)
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
        if(this.data.disabled || !month)
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
        if(this.data.disabled)
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
},{"../base/component.js":29,"../base/util.js":33,"./calendar.html":44}],46:[function(require,module,exports){
module.exports="<label class=\"u-checkex {@(class)}\" r-class={ {\'z-dis\': disabled, \'z-chk\': checked, \'z-part\': checked === null, \'u-checkex-block\': block} } on-click={this.check(!checked)}><div class=\"checkex_box\"><i class=\"u-icon u-icon-check\"></i></div> {name}</label>"
},{}],47:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * CheckEx   多选按钮
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../base/component.js');
var template = require('./checkEx.html');
var _ = require('../base/util.js');

/**
 * @class CheckEx
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {string=''}               options.data.name               多选按钮的文字
 * @param {object=null}             options.data.checked            多选按钮的选择状态
 * @param {boolean=false}           options.data.block              是否以block方式显示
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var CheckEx = Component.extend({
    name: 'checkEx',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            name: '',
            checked: false,
            block: false,
            disabled: false
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
        if(this.data.disabled)
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

module.exports = CheckEx;
},{"../base/component.js":29,"../base/util.js":33,"./checkEx.html":46}],48:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\">    {#list source as item}    <checkEx name={item.name} checked={item.checked} disabled={disabled} block={block} />    {/list}</div>"
},{}],49:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * CheckExGroup 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var CheckGroup = require('./checkGroup.js');
var template = require('./checkExGroup.html');
var _ = require('../base/util.js');
var CheckEx = require('./checkEx.js');

/**
 * @class CheckExGroup
 * @extend CheckGroup
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var CheckExGroup = CheckGroup.extend({
    name: 'checkExGroup',
    template: template
});

module.exports = CheckExGroup;
},{"../base/util.js":33,"./checkEx.js":47,"./checkExGroup.html":48,"./checkGroup.js":51}],50:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\">    {#list source as item}    <label class=\"u-checkex\" r-class={ {\'z-dis\': disabled, \'u-checkex-block\': block} }><input type=\"checkbox\" class=\"u-check\" r-model={item.checked} disabled={disabled}> {item.name}</label>    {/list}</div>"
},{}],51:[function(require,module,exports){
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
var CheckEx = require('./checkEx.js');

/**
 * @class CheckGroup
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
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
            disabled: false,
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./checkEx.js":47,"./checkGroup.html":50}],52:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest {@(class)}\" r-class={ {\'z-dis\': disabled} } ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: \'yyyy-MM-dd\'} on-focus={this.toggle(true)} on-change={this.change($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <calendar date={date} on-select={this.select($event.date)} />    </div></div>"
},{}],53:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * DatePicker 日期选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var DropDown = require('./dropDown.js');
var template = require('./datePicker.html');
var _ = require('../base/util.js');

var filter = require('../base/filter.js');
var Calendar = require('./calendar.js');

/**
 * @class DatePicker
 * @extend DropDown
 * @param {object}                  options.data                    绑定属性
 * @param {object=null}             options.data.date               当前选择的日期
 * @param {string='请输入'}         options.data.placeholder        文本框默认文字
 * @param {boolean=false}           options.data.readonly           文本框是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var DatePicker = DropDown.extend({
    name: 'datePicker',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            placeholder: '请输入',
            readonly: false,
            // @inherited disabled: false,
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
},{"../base/filter.js":30,"../base/util.js":33,"./calendar.js":45,"./datePicker.html":52,"./dropDown.js":57}],54:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest u-dropdown-datetimepicker {@(class)}\" r-class={ {\'z-dis\': disabled} } ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} value={date | format: \'yyyy-MM-dd HH:mm\'} on-focus={this.toggle(true)} on-change={this.change($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <calendar date={selectedDate} on-select={this.select($event.date)} />        <ul class=\"u-listbox\">            {#list source as item}            <li on-click={this.select(item)}>{item.name}</li>            {/list}        </ul>    </div></div>"
},{}],55:[function(require,module,exports){
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
 * @param {boolean=false}           options.data.readonly           文本框是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
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
            // @inherited readonly: false,
            // @inherited disabled: false,
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
},{"../base/filter.js":30,"../base/util.js":33,"./datePicker.js":53,"./dateTimePicker.html":54}],56:[function(require,module,exports){
module.exports="<div class=\"u-dropdown {@(class)}\" r-class={ {\'z-dis\': disabled} } ref=\"element\">    <div class=\"dropdown_hd\">        <a class=\"u-btn u-btn-primary\" on-click={this.toggle(!open)}>下拉菜单 <i class=\"u-icon u-icon-caret-down\"></i></a>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"u-listbox\">            {#list source as item}            <li on-click={this.toggle(!open)}><a href=\"#\">{item.name}</a></li>            {/list}        </ul>    </div></div>"
},{}],57:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * DropDown  下拉菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./dropDown.html');
var _ = require('../base/util.js');

/**
 * @class DropDown
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {boolean=false}           options.data.open               当前为展开/收起状态
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var DropDown = SourceComponent.extend({
    name: 'dropDown',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            open: false,
            disabled: false
        });
        this.supr();
    },
    /**
     * @method toggle(open) 在展开/收起状态之间切换
     * @public
     * @param  {boolean} open 展开/收起
     * @return {void}
     */
    toggle: function(open) {
        if(this.data.disabled)
            return;
        
        this.data.open = open;

        // 根据状态在DropDown.opens列表中添加/删除管理项
        var index = DropDown.opens.indexOf(this);
        if(open && index < 0)
            DropDown.opens.push(this);
        else if(!open && index >= 0)
            DropDown.opens.splice(index, 1);
    }
});

// 处理点击dropDown之外的地方后的收起事件。
DropDown.opens = [];

_.dom.on(document.body, 'click', function(e) {
    DropDown.opens.forEach(function(dropDown) {
        // 这个地方不能用stopPropagation来处理，因为展开一个dropDown的同时要收起其他dropDown
        var element = dropDown.$refs.element;
        var element2 = e.target;
        while(element2) {
            if(element == element2)
                return;
            element2 = element2.parentElement;
        }
        dropDown.toggle(false);
        dropDown.$update();
    });
});

module.exports = DropDown;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./dropDown.html":56}],58:[function(require,module,exports){
module.exports="<div class=\"u-gridview {@(class)}\" r-class={ {\'z-dis\': disabled} }>    {#list source as item}    <div class=\"gridview_item\" r-class={ {\'z-sel\': selected === item} }>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>    {/list}</div>"
},{}],59:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./gridView.html":58}],60:[function(require,module,exports){
module.exports="<label class=\"u-inputex {@(class)}\">    <input class=\"u-input\">    <span class=\"u-unit\">{unit}</span></label>"
},{}],61:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * InputEx   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

var Component = require('../base/component.js');
var template = require('./inputEx.html');
var _ = require('../base/util.js');

/**
 * @class InputEx
 * @extend Component
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var InputEx = Component.extend({
    name: 'inputEx',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            unit: '%',
            selected: null,
            disabled: false,
            multiple: false
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

module.exports = InputEx;
},{"../base/component.js":29,"../base/util.js":33,"./inputEx.html":60}],62:[function(require,module,exports){
module.exports="<ul class=\"u-listbox {@(class)}\" r-class={ {\'z-dis\': disabled} }>    {#list source as item}    <li r-class={ {\'z-sel\': selected === item} } on-click={this.select(item)}>{item.name}</li>    {/list}</ul>"
},{}],63:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * ListBox   列表框
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../base/sourceComponent.js');
var template = require('./listBox.html');
var _ = require('../base/util.js');

/**
 * @class ListBox
 * @extend SourceComponent
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var ListBox = SourceComponent.extend({
    name: 'listBox',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            selected: null,
            disabled: false
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
        if(this.data.disabled)
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

module.exports = ListBox;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./listBox.html":62}],64:[function(require,module,exports){
module.exports="<ul class=\"u-listbox {@(class)}\" r-class={ {\'z-dis\': disabled} }>    {#list source as item}    <li r-class={ {\'z-sel\': selected === item} } on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</li>    {/list}</ul>"
},{}],65:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * ListView  列表视图
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var ListBox = require('./listBox.js');
var template = require('./listView.html');
var _ = require('../base/util.js');

/**
 * @class ListView
 * @extend ListBox
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string=null}             options.data.itemTemplate       每一项的模板
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var ListView = ListBox.extend({
    name: 'listView',
    template: template,
    config: function() {
        _.extend(this.data, {
            itemTemplate: null
            // @inherited source: [],
            // @inherited selected: null,
            // @inherited disabled: false
        });
        this.supr();
    }
});

module.exports = ListView;
},{"../base/util.js":33,"./listBox.js":63,"./listView.html":64}],66:[function(require,module,exports){
module.exports="<div class=\"m-notify m-notify-{@(position)} {@(class)}\">    {#list messages as message}    <div class=\"notify_message notify_message-{@(message.type)}\" r-animation=\'on: enter; class: animated fadeIn fast; on: leave; class: animated fadeOut fast;\'>        <a class=\"notify_close\" on-click={this.close(message)}><i class=\"u-icon u-icon-close\"></i></a>        <div class=\"notify_text\"><i class=\"u-icon u-icon-{@(message.type)}-circle\" r-hide={@(!message.type)}></i> {@(message.text)}</div>    </div>    {/list}</div>"
},{}],67:[function(require,module,exports){
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
 * @param  {string=''} text 消息内容
 * @param  {string=null} type 消息类型，可选参数：`info`、`success`、`warning`、`error`
 * @param  {number=notify.duration} duration 该条消息的停留毫秒数，如果为0，则表示消息常驻不消失。
 * @return {void}
 */
Notify.show = function() {
    notify.show.apply(notify, arguments);
}
/**
 * @method close(message) 关闭某条消息
 * @static
 * @param  {object} message 需要关闭的消息对象
 * @return {void}
 */
Notify.close = function() {
    notify.close.apply(notify, arguments);
}
/**
 * @method closeAll() 关闭所有消息
 * @static
 * @return {void}
 */
Notify.closeAll = function() {
    notify.closeAll.apply(notify, arguments);
}

module.exports = Notify;
},{"../base/component.js":29,"../base/util.js":33,"./notify.html":66}],68:[function(require,module,exports){
module.exports="<div class=\"u-progress u-progress-{@(size)} u-progress-{@(type)} {@(class)}\" r-class={ {\'u-progress-striped\': striped, \'z-act\': active} }>    <div class=\"progress_bar\" style=\"width: {percent}%;\">{text ? (text === true ? percent + \'%\' : text) : \'\'}</div></div>"
},{}],69:[function(require,module,exports){
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
},{"../base/component.js":29,"../base/util.js":33,"./progress.html":68}],70:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\">    {#list source as item}    <label class=\"u-radioex\" r-class={ {\'z-dis\': disabled, \'z-sel\': item === selected, \'u-radioex-block\': block} } on-click={this.select(item)}><div class=\"radioex_box\"><i class=\"u-icon u-icon-radio\"></i></div> {item.name}</label>    {/list}</div>"
},{}],71:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * RadioExGroup 输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var RadioGroup = require('./radioGroup.js');
var template = require('./radioExGroup.html');
var _ = require('../base/util.js');

/**
 * @class RadioExGroup
 * @extend RadioGroup
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.seleced            当前选择项
 * @param {boolean=false}           options.data.block              多行显示
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 */
var RadioExGroup = RadioGroup.extend({
    name: 'radioExGroup',
    template: template
});

module.exports = RadioExGroup;
},{"../base/util.js":33,"./radioExGroup.html":70,"./radioGroup.js":73}],72:[function(require,module,exports){
module.exports="<div class=\"u-unitgroup {@(class)}\">    {#list source as item}    <label class=\"u-radioex\" r-class={ {\'z-dis\': disabled, \'u-radioex-block\': block} } on-click={this.select(item)}><input type=\"radio\" class=\"u-radio\" name={_radioGroupId} disabled={disabled}> {item.name}</label>    {/list}</div>"
},{}],73:[function(require,module,exports){
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
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
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
        if(this.data.disabled)
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./radioGroup.html":72}],74:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-selectex {@(class)}\" r-class={ {\'z-dis\': disabled} } ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        <span>{selected ? selected.name : placeholder}</span>        <i class=\"u-icon u-icon-caret-down\"></i>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"u-listbox\">            {#if placeholder}<li r-class={ {\'z-sel\': selected === null} } on-click={this.select(null)}>{placeholder}</li>{/if}            {#list source as item}            <li r-class={ {\'z-sel\': selected === item} } on-click={this.select(item)}>{item.name}</li>            {/list}        </ul>    </div></div>"
},{}],75:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * SelectEx  选择扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var DropDown = require('./dropDown.js');
var template = require('./selectEx.html');
var _ = require('../base/util.js');

/**
 * @class SelectEx
 * @extend DropDown
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var SelectEx = DropDown.extend({
    name: 'selectEx',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false
            selected: null,
            placeholder: '请选择',
            // @inherited disabled: false,
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

module.exports = SelectEx;
},{"../base/util.js":33,"./dropDown.js":57,"./selectEx.html":74}],76:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-suggest {@(class)}\" r-class={ {\'z-dis\': disabled} } ref=\"element\">    <div class=\"dropdown_hd\">        <input class=\"u-input u-input-full\" placeholder={placeholder} r-model={value} on-focus={this.input($event)} on-keyup={this.input($event)} on-blur={this.uninput($event)} ref=\"input\" disabled={disabled} {#if readonly}readonly=\"readonly\"{/if}>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <ul class=\"u-listbox\">            {#list source as item}            {#if this.filter(item)}                <li on-click={this.select(item)}>{item.name}</li>            {/if}            {/list}        </ul>    </div></div>"
},{}],77:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * Suggest   自动提示
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var DropDown = require('./dropDown.js');
var template = require('./suggest.html');
var _ = require('../base/util.js');
var ListBox = require('./listBox.js');

/**
 * @class Suggest
 * @extend DropDown
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
 * @param {boolean=false}           options.data.readonly           文本框是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var Suggest = DropDown.extend({
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
            strict: false,
            readonly: false,
            // @inherited disabled: false,
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
        if(this.data.disabled)
            return;

        this.data.open = open;

        /**
         * @event toggle 展开或收起状态改变时触发
         * @property {boolean} open 展开还是收起
         */
        this.$emit('toggle', {
            open: open
        });

        var index = DropDown.opens.indexOf(this);
        if(open && index < 0)
            DropDown.opens.push(this);
        else if(!open && index >= 0) {
            DropDown.opens.splice(index, 1);

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
},{"../base/util.js":33,"./dropDown.js":57,"./listBox.js":63,"./suggest.html":76}],78:[function(require,module,exports){
module.exports="<table class=\"m-table m-tableview {@(class)}\" r-class={ {\'m-table-striped\': striped, \'m-table-hover\': hover} }>    <thead>        <tr>            {#list fields as field}            <th r-class={ {\'tableview_sortable\': field.sortable} } on-click={this.sort(field)}>                {field.name || field.key}                {#if field.sortable}                    <i class=\"u-icon {order.by === field.key ? (order.desc ? \'u-icon-sort-desc\' : \'u-icon-sort-asc\') : \'u-icon-sort\'}\"></i>                {/if}            </th>            {/list}        </tr>    </thead>    <tbody>        {#list source as item}        <tr>            {#list fields as field}            <td>{item[field.key]}</td>            {/list}        </tr>        {/list}    </tbody></table>"
},{}],79:[function(require,module,exports){
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
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./tableView.html":78}],80:[function(require,module,exports){
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
 * @param {boolean=false}           options.data.readonly           文本框是否只读
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
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
            // @inherited strict: false,
            // @inherited readonly: false,
            // @inherited disabled: false,
        });
        this.supr();
    },
    filter: function(item) {
        return true;
    }
});

module.exports = TimePicker;
},{"../base/util.js":33,"./suggest.js":77}],81:[function(require,module,exports){
module.exports="<div class=\"u-dropdown u-dropdown-selectex {@(class)}\" r-class={ {\'z-dis\': disabled} } ref=\"element\">    <div class=\"dropdown_hd\" on-click={this.toggle(!open)}>        <i class=\"u-icon u-icon-caret-down\"></i>        <span>{selected ? selected.name : placeholder}</span>    </div>    <div class=\"dropdown_bd\" r-hide={!open} r-animation=\"on: enter; class: animated fadeInY fast; on: leave; class: animated fadeOutY fast;\">        <treeView source={source} on-select={this.select($event.selected)} />    </div></div>"
},{}],82:[function(require,module,exports){
/**
 * ------------------------------------------------------------
 * TreeSelect 树型选择
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SelectEx = require('./selectEx.js');
var template = require('./treeSelect.html');
var _ = require('../base/util.js');
var Treeview = require('./treeView.js');

/**
 * @class TreeSelect
 * @extend SelectEx
 * @param {object}                  options.data                    绑定属性
 * @param {object[]=[]}             options.data.source             数据源
 * @param {number}                  options.data.source[].id        每项的id
 * @param {string}                  options.data.source[].name      每项的内容
 * @param {object=null}             options.data.selected           当前选择项
 * @param {string='请选择'}         options.data.placeholder        默认项的文字
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {string=''}               options.data.class              补充class
 * @param {object}                  options.service                 数据服务
 */
var TreeSelect = SelectEx.extend({
    name: 'treeSelect',
    template: template,
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            // @inherited open: false,
            // @inherited selected: null,
            // @inherited placeholder: '请选择',
            // @inherited disabled: false,
        });
        this.supr();
    }
});

module.exports = TreeSelect;
},{"../base/util.js":33,"./selectEx.js":75,"./treeSelect.html":81,"./treeView.js":84}],83:[function(require,module,exports){
module.exports="<div class=\"u-treeview {@(class)}\" r-class={ {\'z-dis\': disabled} }>    <treeViewList source={source} visible={true} /></div>"
},{}],84:[function(require,module,exports){
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
 * @param {boolean=false}           options.data.disabled           是否禁用该组件
 * @param {boolean=false}           options.data.hierarchical       是否分级动态加载，需要service
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
            disabled: false,
            multiple: false,
            hierarchical: false
        });
        this.supr();

        this.treeroot = this;
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
    select: function(item) {
        if(this.data.disabled)
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

        this.treeroot = this.$parent.treeroot;
        this.service = this.treeroot.service;
        this.data.itemTemplate = this.treeroot.data.itemTemplate;
        this.data.hierarchical = this.treeroot.data.hierarchical;

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
            return _.extend({parentId: this.data.parent.id}, this.treeroot.getParams());
    },
    $updateSource: function() {
        this.service.getList(this.getParams(), function(data) {
            if(data.code != 200 && !data.success)
                return alert(data.result);

            // 给每个节点item添加parent
            data.result.forEach(function(item) {
                item.parent = this.data.parent;
            }.bind(this));

            this.$update('source', data.result);

            this.$emit('updateSource', {
                result: data.result
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
        if(this.treeroot.data.disabled)
            return;

        this.treeroot.select(item);
    },
    /**
     * @method toggle(item) 展开或收起某一项
     * @private
     * @param  {object} item 展开收起项
     * @return {void}
     */
    toggle: function(item) {
        if(this.treeroot.data.disabled)
            return;

        item.open = !item.open;

        /**
         * @event toggle 展开或收起某一项时触发
         * @property {object} item 展开收起项
         * @property {boolean} open 展开还是收起
         */
        this.treeroot.$emit('toggle', {
            item: item,
            open: item.open
        });
    }
});

module.exports = TreeView;
},{"../base/sourceComponent.js":32,"../base/util.js":33,"./treeView.html":83,"./treeViewList.html":85}],85:[function(require,module,exports){
module.exports="<ul class=\"treeview_list\" r-class={ {\'z-dis\': disabled} } r-hide={!visible}>    {#list source as item}    <li>        <div class=\"treeview_item\">            {#if item.childrenCount || (item.children && item.children.length)}            <i class=\"u-icon\" r-class={ {\'u-icon-caret-right\': !item.open, \'u-icon-caret-down\': item.open}} on-click={this.toggle(item)}></i>            {/if}            <div class=\"treeview_itemname\" r-class={ {\'z-sel\': this.treeroot.data.selected === item} } on-click={this.select(item)}>{#if @(itemTemplate)}{#include @(itemTemplate)}{#else}{item.name}{/if}</div>        </div>        {#if item.childrenCount || (item.children && item.children.length)}<treeViewList source={item.children} visible={item.open} parent={item} />{/if}    </li>    {/list}</ul>"
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWFya2VkL2xpYi9tYXJrZWQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9SZWd1bGFyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2FuaW1hdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2RpcmVjdGl2ZS9iYXNlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvZGlyZWN0aXZlL2Zvcm0uanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9kb20uanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9lbnYuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9ncm91cC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9hbmltYXRlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2NvbWJpbmUuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZW50aXRpZXMuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9oZWxwZXIvZXh0ZW5kLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL2ZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL2hlbHBlci9zaGltLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvaGVscGVyL3dhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvcmVndWxhcmpzL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL21vZHVsZS90aW1lb3V0LmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvcGFyc2VyL0xleGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvcGFyc2VyL1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3BhcnNlci9ub2RlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ3VsYXJqcy9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWd1bGFyanMvc3JjL3dhbGtlcnMuanMiLCJub2RlX21vZHVsZXMvcmVxd2VzdC9yZXF3ZXN0LmpzIiwic3JjL2pzL2Jhc2UvY29tcG9uZW50LmpzIiwic3JjL2pzL2Jhc2UvZmlsdGVyLmpzIiwic3JjL2pzL2Jhc2UvcmVxdWVzdC5qcyIsInNyYy9qcy9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcyIsInNyYy9qcy9iYXNlL3V0aWwuanMiLCJzcmMvanMvbW9kdWxlL2VkaXRvci5odG1sIiwic3JjL2pzL21vZHVsZS9lZGl0b3IuanMiLCJzcmMvanMvbW9kdWxlL21hcmtFZGl0b3IuaHRtbCIsInNyYy9qcy9tb2R1bGUvbWFya0VkaXRvci5qcyIsInNyYy9qcy9tb2R1bGUvbW9kYWwuaHRtbCIsInNyYy9qcy9tb2R1bGUvbW9kYWwuanMiLCJzcmMvanMvbW9kdWxlL3BhZ2VyLmh0bWwiLCJzcmMvanMvbW9kdWxlL3BhZ2VyLmpzIiwic3JjL2pzL21vZHVsZS90YWIuaHRtbCIsInNyYy9qcy9tb2R1bGUvdGFiLmpzIiwic3JjL2pzL3VuaXQvY2FsZW5kYXIuaHRtbCIsInNyYy9qcy91bml0L2NhbGVuZGFyLmpzIiwic3JjL2pzL3VuaXQvY2hlY2tFeC5odG1sIiwic3JjL2pzL3VuaXQvY2hlY2tFeC5qcyIsInNyYy9qcy91bml0L2NoZWNrRXhHcm91cC5odG1sIiwic3JjL2pzL3VuaXQvY2hlY2tFeEdyb3VwLmpzIiwic3JjL2pzL3VuaXQvY2hlY2tHcm91cC5odG1sIiwic3JjL2pzL3VuaXQvY2hlY2tHcm91cC5qcyIsInNyYy9qcy91bml0L2RhdGVQaWNrZXIuaHRtbCIsInNyYy9qcy91bml0L2RhdGVQaWNrZXIuanMiLCJzcmMvanMvdW5pdC9kYXRlVGltZVBpY2tlci5odG1sIiwic3JjL2pzL3VuaXQvZGF0ZVRpbWVQaWNrZXIuanMiLCJzcmMvanMvdW5pdC9kcm9wRG93bi5odG1sIiwic3JjL2pzL3VuaXQvZHJvcERvd24uanMiLCJzcmMvanMvdW5pdC9ncmlkVmlldy5odG1sIiwic3JjL2pzL3VuaXQvZ3JpZFZpZXcuanMiLCJzcmMvanMvdW5pdC9pbnB1dEV4Lmh0bWwiLCJzcmMvanMvdW5pdC9pbnB1dEV4LmpzIiwic3JjL2pzL3VuaXQvbGlzdEJveC5odG1sIiwic3JjL2pzL3VuaXQvbGlzdEJveC5qcyIsInNyYy9qcy91bml0L2xpc3RWaWV3Lmh0bWwiLCJzcmMvanMvdW5pdC9saXN0Vmlldy5qcyIsInNyYy9qcy91bml0L25vdGlmeS5odG1sIiwic3JjL2pzL3VuaXQvbm90aWZ5LmpzIiwic3JjL2pzL3VuaXQvcHJvZ3Jlc3MuaHRtbCIsInNyYy9qcy91bml0L3Byb2dyZXNzLmpzIiwic3JjL2pzL3VuaXQvcmFkaW9FeEdyb3VwLmh0bWwiLCJzcmMvanMvdW5pdC9yYWRpb0V4R3JvdXAuanMiLCJzcmMvanMvdW5pdC9yYWRpb0dyb3VwLmh0bWwiLCJzcmMvanMvdW5pdC9yYWRpb0dyb3VwLmpzIiwic3JjL2pzL3VuaXQvc2VsZWN0RXguaHRtbCIsInNyYy9qcy91bml0L3NlbGVjdEV4LmpzIiwic3JjL2pzL3VuaXQvc3VnZ2VzdC5odG1sIiwic3JjL2pzL3VuaXQvc3VnZ2VzdC5qcyIsInNyYy9qcy91bml0L3RhYmxlVmlldy5odG1sIiwic3JjL2pzL3VuaXQvdGFibGVWaWV3LmpzIiwic3JjL2pzL3VuaXQvdGltZVBpY2tlci5qcyIsInNyYy9qcy91bml0L3RyZWVTZWxlY3QuaHRtbCIsInNyYy9qcy91bml0L3RyZWVTZWxlY3QuanMiLCJzcmMvanMvdW5pdC90cmVlVmlldy5odG1sIiwic3JjL2pzL3VuaXQvdHJlZVZpZXcuanMiLCJzcmMvanMvdW5pdC90cmVlVmlld0xpc3QuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3h2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeGZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdm1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFJHVUkgICAgICBSZWd1bGFyIFVJ5bqTXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkdVSSA9IHt9XG5cbi8qKlxuICogYmFzZVxuICovXG5SR1VJLlJlZ3VsYXIgPSByZXF1aXJlKCdyZWd1bGFyanMnKTtcblJHVUkuQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9iYXNlL2NvbXBvbmVudC5qcycpO1xuUkdVSS5fID0gcmVxdWlyZSgnLi9iYXNlL3V0aWwuanMnKTtcblJHVUkucmVxdWVzdCA9IHJlcXVpcmUoJy4vYmFzZS9yZXF1ZXN0LmpzJyk7XG5cbi8qKlxuICoganNVbml0XG4gKi9cbi8vIOa2iOaBr+exu1xuUkdVSS5Ob3RpZnkgPSByZXF1aXJlKCcuL3VuaXQvbm90aWZ5LmpzJyk7XG5SR1VJLlByb2dyZXNzID0gcmVxdWlyZSgnLi91bml0L3Byb2dyZXNzLmpzJyk7XG5cbi8vIOaViOaenOexu1xuUkdVSS5Ecm9wRG93biA9IHJlcXVpcmUoJy4vdW5pdC9kcm9wRG93bi5qcycpO1xuXG4vLyDooajljZXnsbtcblJHVUkuSW5wdXRFeCA9IHJlcXVpcmUoJy4vdW5pdC9pbnB1dEV4LmpzJyk7XG5SR1VJLkNoZWNrRXggPSByZXF1aXJlKCcuL3VuaXQvY2hlY2tFeC5qcycpO1xuUkdVSS5DaGVja0dyb3VwID0gcmVxdWlyZSgnLi91bml0L2NoZWNrR3JvdXAuanMnKTtcblJHVUkuQ2hlY2tFeEdyb3VwID0gcmVxdWlyZSgnLi91bml0L2NoZWNrRXhHcm91cC5qcycpO1xuUkdVSS5SYWRpb0dyb3VwID0gcmVxdWlyZSgnLi91bml0L3JhZGlvR3JvdXAuanMnKTtcblJHVUkuUmFkaW9FeEdyb3VwID0gcmVxdWlyZSgnLi91bml0L3JhZGlvRXhHcm91cC5qcycpO1xuUkdVSS5TZWxlY3RFeCA9IHJlcXVpcmUoJy4vdW5pdC9zZWxlY3RFeC5qcycpO1xuUkdVSS5TdWdnZXN0ID0gcmVxdWlyZSgnLi91bml0L3N1Z2dlc3QuanMnKTtcblxuLy8g5pWw5o2u57G7XG5SR1VJLkxpc3RCb3ggPSByZXF1aXJlKCcuL3VuaXQvbGlzdEJveC5qcycpO1xuUkdVSS5MaXN0VmlldyA9IHJlcXVpcmUoJy4vdW5pdC9saXN0Vmlldy5qcycpO1xuUkdVSS5HcmlkVmlldyA9IHJlcXVpcmUoJy4vdW5pdC9ncmlkVmlldy5qcycpO1xuUkdVSS5UcmVlVmlldyA9IHJlcXVpcmUoJy4vdW5pdC90cmVlVmlldy5qcycpO1xuUkdVSS5UYWJsZVZpZXcgPSByZXF1aXJlKCcuL3VuaXQvdGFibGVWaWV3LmpzJyk7XG5SR1VJLlRyZWVTZWxlY3QgPSByZXF1aXJlKCcuL3VuaXQvdHJlZVNlbGVjdC5qcycpO1xuXG4vLyDml6XmnJ/nsbtcblJHVUkuQ2FsZW5kYXIgPSByZXF1aXJlKCcuL3VuaXQvY2FsZW5kYXIuanMnKTtcblJHVUkuRGF0ZVBpY2tlciA9IHJlcXVpcmUoJy4vdW5pdC9kYXRlUGlja2VyLmpzJyk7XG5SR1VJLlRpbWVQaWNrZXIgPSByZXF1aXJlKCcuL3VuaXQvdGltZVBpY2tlci5qcycpO1xuUkdVSS5EYXRlVGltZVBpY2tlciA9IHJlcXVpcmUoJy4vdW5pdC9kYXRlVGltZVBpY2tlci5qcycpO1xuXG4vKipcbiAqIGpzTW9kdWxlXG4gKi9cbi8vIOWvvOiIquexu1xuUkdVSS5UYWIgPSByZXF1aXJlKCcuL21vZHVsZS90YWIuanMnKTtcblJHVUkuUGFnZXIgPSByZXF1aXJlKCcuL21vZHVsZS9wYWdlci5qcycpO1xuXG4vLyDnqpflj6PnsbtcblJHVUkuTW9kYWwgPSByZXF1aXJlKCcuL21vZHVsZS9tb2RhbC5qcycpO1xuXG4vLyDnvJbovpHlmajnsbtcblJHVUkuRWRpdG9yID0gcmVxdWlyZSgnLi9tb2R1bGUvZWRpdG9yLmpzJyk7XG5SR1VJLk1hcmtFZGl0b3IgPSByZXF1aXJlKCcuL21vZHVsZS9tYXJrRWRpdG9yLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LlJHVUkgPSBSR1VJOyIsIi8qKlxuICogbWFya2VkIC0gYSBtYXJrZG93biBwYXJzZXJcbiAqIENvcHlyaWdodCAoYykgMjAxMS0yMDE0LCBDaHJpc3RvcGhlciBKZWZmcmV5LiAoTUlUIExpY2Vuc2VkKVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NoamovbWFya2VkXG4gKi9cblxuOyhmdW5jdGlvbigpIHtcblxuLyoqXG4gKiBCbG9jay1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGJsb2NrID0ge1xuICBuZXdsaW5lOiAvXlxcbisvLFxuICBjb2RlOiAvXiggezR9W15cXG5dK1xcbiopKy8sXG4gIGZlbmNlczogbm9vcCxcbiAgaHI6IC9eKCAqWy0qX10pezMsfSAqKD86XFxuK3wkKS8sXG4gIGhlYWRpbmc6IC9eICooI3sxLDZ9KSAqKFteXFxuXSs/KSAqIyogKig/Olxcbit8JCkvLFxuICBucHRhYmxlOiBub29wLFxuICBsaGVhZGluZzogL14oW15cXG5dKylcXG4gKig9fC0pezIsfSAqKD86XFxuK3wkKS8sXG4gIGJsb2NrcXVvdGU6IC9eKCAqPlteXFxuXSsoXFxuKD8hZGVmKVteXFxuXSspKlxcbiopKy8sXG4gIGxpc3Q6IC9eKCAqKShidWxsKSBbXFxzXFxTXSs/KD86aHJ8ZGVmfFxcbnsyLH0oPyEgKSg/IVxcMWJ1bGwgKVxcbip8XFxzKiQpLyxcbiAgaHRtbDogL14gKig/OmNvbW1lbnQgKig/OlxcbnxcXHMqJCl8Y2xvc2VkICooPzpcXG57Mix9fFxccyokKXxjbG9zaW5nICooPzpcXG57Mix9fFxccyokKSkvLFxuICBkZWY6IC9eICpcXFsoW15cXF1dKylcXF06ICo8PyhbXlxccz5dKyk+Pyg/OiArW1wiKF0oW15cXG5dKylbXCIpXSk/ICooPzpcXG4rfCQpLyxcbiAgdGFibGU6IG5vb3AsXG4gIHBhcmFncmFwaDogL14oKD86W15cXG5dK1xcbj8oPyFocnxoZWFkaW5nfGxoZWFkaW5nfGJsb2NrcXVvdGV8dGFnfGRlZikpKylcXG4qLyxcbiAgdGV4dDogL15bXlxcbl0rL1xufTtcblxuYmxvY2suYnVsbGV0ID0gLyg/OlsqKy1dfFxcZCtcXC4pLztcbmJsb2NrLml0ZW0gPSAvXiggKikoYnVsbCkgW15cXG5dKig/Olxcbig/IVxcMWJ1bGwgKVteXFxuXSopKi87XG5ibG9jay5pdGVtID0gcmVwbGFjZShibG9jay5pdGVtLCAnZ20nKVxuICAoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAoKTtcblxuYmxvY2subGlzdCA9IHJlcGxhY2UoYmxvY2subGlzdClcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCdocicsICdcXFxcbisoPz1cXFxcMT8oPzpbLSpfXSAqKXszLH0oPzpcXFxcbit8JCkpJylcbiAgKCdkZWYnLCAnXFxcXG4rKD89JyArIGJsb2NrLmRlZi5zb3VyY2UgKyAnKScpXG4gICgpO1xuXG5ibG9jay5ibG9ja3F1b3RlID0gcmVwbGFjZShibG9jay5ibG9ja3F1b3RlKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbmJsb2NrLl90YWcgPSAnKD8hKD86J1xuICArICdhfGVtfHN0cm9uZ3xzbWFsbHxzfGNpdGV8cXxkZm58YWJicnxkYXRhfHRpbWV8Y29kZSdcbiAgKyAnfHZhcnxzYW1wfGtiZHxzdWJ8c3VwfGl8Ynx1fG1hcmt8cnVieXxydHxycHxiZGl8YmRvJ1xuICArICd8c3Bhbnxicnx3YnJ8aW5zfGRlbHxpbWcpXFxcXGIpXFxcXHcrKD8hOi98W15cXFxcd1xcXFxzQF0qQClcXFxcYic7XG5cbmJsb2NrLmh0bWwgPSByZXBsYWNlKGJsb2NrLmh0bWwpXG4gICgnY29tbWVudCcsIC88IS0tW1xcc1xcU10qPy0tPi8pXG4gICgnY2xvc2VkJywgLzwodGFnKVtcXHNcXFNdKz88XFwvXFwxPi8pXG4gICgnY2xvc2luZycsIC88dGFnKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LylcbiAgKC90YWcvZywgYmxvY2suX3RhZylcbiAgKCk7XG5cbmJsb2NrLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJ2hyJywgYmxvY2suaHIpXG4gICgnaGVhZGluZycsIGJsb2NrLmhlYWRpbmcpXG4gICgnbGhlYWRpbmcnLCBibG9jay5saGVhZGluZylcbiAgKCdibG9ja3F1b3RlJywgYmxvY2suYmxvY2txdW90ZSlcbiAgKCd0YWcnLCAnPCcgKyBibG9jay5fdGFnKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbi8qKlxuICogTm9ybWFsIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5ub3JtYWwgPSBtZXJnZSh7fSwgYmxvY2spO1xuXG4vKipcbiAqIEdGTSBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2suZ2ZtID0gbWVyZ2Uoe30sIGJsb2NrLm5vcm1hbCwge1xuICBmZW5jZXM6IC9eICooYHszLH18fnszLH0pICooXFxTKyk/ICpcXG4oW1xcc1xcU10rPylcXHMqXFwxICooPzpcXG4rfCQpLyxcbiAgcGFyYWdyYXBoOiAvXi9cbn0pO1xuXG5ibG9jay5nZm0ucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gICgnKD8hJywgJyg/ISdcbiAgICArIGJsb2NrLmdmbS5mZW5jZXMuc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwyJykgKyAnfCdcbiAgICArIGJsb2NrLmxpc3Quc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwzJykgKyAnfCcpXG4gICgpO1xuXG4vKipcbiAqIEdGTSArIFRhYmxlcyBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2sudGFibGVzID0gbWVyZ2Uoe30sIGJsb2NrLmdmbSwge1xuICBucHRhYmxlOiAvXiAqKFxcUy4qXFx8LiopXFxuICooWy06XSsgKlxcfFstfCA6XSopXFxuKCg/Oi4qXFx8LiooPzpcXG58JCkpKilcXG4qLyxcbiAgdGFibGU6IC9eICpcXHwoLispXFxuICpcXHwoICpbLTpdK1stfCA6XSopXFxuKCg/OiAqXFx8LiooPzpcXG58JCkpKilcXG4qL1xufSk7XG5cbi8qKlxuICogQmxvY2sgTGV4ZXJcbiAqL1xuXG5mdW5jdGlvbiBMZXhlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW5zLmxpbmtzID0ge307XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLnJ1bGVzID0gYmxvY2subm9ybWFsO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50YWJsZXMpIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay50YWJsZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay5nZm07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIEJsb2NrIFJ1bGVzXG4gKi9cblxuTGV4ZXIucnVsZXMgPSBibG9jaztcblxuLyoqXG4gKiBTdGF0aWMgTGV4IE1ldGhvZFxuICovXG5cbkxleGVyLmxleCA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucykge1xuICB2YXIgbGV4ZXIgPSBuZXcgTGV4ZXIob3B0aW9ucyk7XG4gIHJldHVybiBsZXhlci5sZXgoc3JjKTtcbn07XG5cbi8qKlxuICogUHJlcHJvY2Vzc2luZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS5sZXggPSBmdW5jdGlvbihzcmMpIHtcbiAgc3JjID0gc3JjXG4gICAgLnJlcGxhY2UoL1xcclxcbnxcXHIvZywgJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcdC9nLCAnICAgICcpXG4gICAgLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHUyNDI0L2csICdcXG4nKTtcblxuICByZXR1cm4gdGhpcy50b2tlbihzcmMsIHRydWUpO1xufTtcblxuLyoqXG4gKiBMZXhpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUudG9rZW4gPSBmdW5jdGlvbihzcmMsIHRvcCwgYnEpIHtcbiAgdmFyIHNyYyA9IHNyYy5yZXBsYWNlKC9eICskL2dtLCAnJylcbiAgICAsIG5leHRcbiAgICAsIGxvb3NlXG4gICAgLCBjYXBcbiAgICAsIGJ1bGxcbiAgICAsIGJcbiAgICAsIGl0ZW1cbiAgICAsIHNwYWNlXG4gICAgLCBpXG4gICAgLCBsO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBuZXdsaW5lXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubmV3bGluZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzBdLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ3NwYWNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiB7NH0vZ20sICcnKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICA/IGNhcC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuICAgICAgICAgIDogY2FwXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGZlbmNlcyAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmZlbmNlcy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICBsYW5nOiBjYXBbMl0sXG4gICAgICAgIHRleHQ6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzFdLmxlbmd0aCxcbiAgICAgICAgdGV4dDogY2FwWzJdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIG5vIGxlYWRpbmcgcGlwZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMubnB0YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXS5zcGxpdCgvICpcXHwgKi8pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaGVhZGluZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxoZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIGRlcHRoOiBjYXBbMl0gPT09ICc9JyA/IDEgOiAyLFxuICAgICAgICB0ZXh0OiBjYXBbMV1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5oci5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hyJ1xuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBibG9ja3F1b3RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYmxvY2txdW90ZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9zdGFydCdcbiAgICAgIH0pO1xuXG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiAqPiA/L2dtLCAnJyk7XG5cbiAgICAgIC8vIFBhc3MgYHRvcGAgdG8ga2VlcCB0aGUgY3VycmVudFxuICAgICAgLy8gXCJ0b3BsZXZlbFwiIHN0YXRlLiBUaGlzIGlzIGV4YWN0bHlcbiAgICAgIC8vIGhvdyBtYXJrZG93bi5wbCB3b3Jrcy5cbiAgICAgIHRoaXMudG9rZW4oY2FwLCB0b3AsIHRydWUpO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGVfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpc3RcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saXN0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGJ1bGwgPSBjYXBbMl07XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9zdGFydCcsXG4gICAgICAgIG9yZGVyZWQ6IGJ1bGwubGVuZ3RoID4gMVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEdldCBlYWNoIHRvcC1sZXZlbCBpdGVtLlxuICAgICAgY2FwID0gY2FwWzBdLm1hdGNoKHRoaXMucnVsZXMuaXRlbSk7XG5cbiAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgIGwgPSBjYXAubGVuZ3RoO1xuICAgICAgaSA9IDA7XG5cbiAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBjYXBbaV07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0IGl0ZW0ncyBidWxsZXRcbiAgICAgICAgLy8gc28gaXQgaXMgc2VlbiBhcyB0aGUgbmV4dCB0b2tlbi5cbiAgICAgICAgc3BhY2UgPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXiAqKFsqKy1dfFxcZCtcXC4pICsvLCAnJyk7XG5cbiAgICAgICAgLy8gT3V0ZGVudCB3aGF0ZXZlciB0aGVcbiAgICAgICAgLy8gbGlzdCBpdGVtIGNvbnRhaW5zLiBIYWNreS5cbiAgICAgICAgaWYgKH5pdGVtLmluZGV4T2YoJ1xcbiAnKSkge1xuICAgICAgICAgIHNwYWNlIC09IGl0ZW0ubGVuZ3RoO1xuICAgICAgICAgIGl0ZW0gPSAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgICA/IGl0ZW0ucmVwbGFjZShuZXcgUmVnRXhwKCdeIHsxLCcgKyBzcGFjZSArICd9JywgJ2dtJyksICcnKVxuICAgICAgICAgICAgOiBpdGVtLnJlcGxhY2UoL14gezEsNH0vZ20sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXh0IGxpc3QgaXRlbSBiZWxvbmdzIGhlcmUuXG4gICAgICAgIC8vIEJhY2twZWRhbCBpZiBpdCBkb2VzIG5vdCBiZWxvbmcgaW4gdGhpcyBsaXN0LlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0TGlzdHMgJiYgaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBiID0gYmxvY2suYnVsbGV0LmV4ZWMoY2FwW2kgKyAxXSlbMF07XG4gICAgICAgICAgaWYgKGJ1bGwgIT09IGIgJiYgIShidWxsLmxlbmd0aCA+IDEgJiYgYi5sZW5ndGggPiAxKSkge1xuICAgICAgICAgICAgc3JjID0gY2FwLnNsaWNlKGkgKyAxKS5qb2luKCdcXG4nKSArIHNyYztcbiAgICAgICAgICAgIGkgPSBsIC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciBpdGVtIGlzIGxvb3NlIG9yIG5vdC5cbiAgICAgICAgLy8gVXNlOiAvKF58XFxuKSg/ISApW15cXG5dK1xcblxcbig/IVxccyokKS9cbiAgICAgICAgLy8gZm9yIGRpc2NvdW50IGJlaGF2aW9yLlxuICAgICAgICBsb29zZSA9IG5leHQgfHwgL1xcblxcbig/IVxccyokKS8udGVzdChpdGVtKTtcbiAgICAgICAgaWYgKGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGl0ZW0uY2hhckF0KGl0ZW0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nO1xuICAgICAgICAgIGlmICghbG9vc2UpIGxvb3NlID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IGxvb3NlXG4gICAgICAgICAgICA/ICdsb29zZV9pdGVtX3N0YXJ0J1xuICAgICAgICAgICAgOiAnbGlzdF9pdGVtX3N0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWN1cnNlLlxuICAgICAgICB0aGlzLnRva2VuKGl0ZW0sIGZhbHNlLCBicSk7XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ2xpc3RfaXRlbV9lbmQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3RfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGh0bWxcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5odG1sLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgICA/ICdwYXJhZ3JhcGgnXG4gICAgICAgICAgOiAnaHRtbCcsXG4gICAgICAgIHByZTogY2FwWzFdID09PSAncHJlJyB8fCBjYXBbMV0gPT09ICdzY3JpcHQnIHx8IGNhcFsxXSA9PT0gJ3N0eWxlJyxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlZlxuICAgIGlmICgoIWJxICYmIHRvcCkgJiYgKGNhcCA9IHRoaXMucnVsZXMuZGVmLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5saW5rc1tjYXBbMV0udG9Mb3dlckNhc2UoKV0gPSB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy50YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC8oPzogKlxcfCAqKT9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXVxuICAgICAgICAgIC5yZXBsYWNlKC9eICpcXHwgKnwgKlxcfCAqJC9nLCAnJylcbiAgICAgICAgICAuc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdG9wLWxldmVsIHBhcmFncmFwaFxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMucGFyYWdyYXBoLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3BhcmFncmFwaCcsXG4gICAgICAgIHRleHQ6IGNhcFsxXS5jaGFyQXQoY2FwWzFdLmxlbmd0aCAtIDEpID09PSAnXFxuJ1xuICAgICAgICAgID8gY2FwWzFdLnNsaWNlKDAsIC0xKVxuICAgICAgICAgIDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgLy8gVG9wLWxldmVsIHNob3VsZCBuZXZlciByZWFjaCBoZXJlLlxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcy50b2tlbnM7XG59O1xuXG4vKipcbiAqIElubGluZS1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGlubGluZSA9IHtcbiAgZXNjYXBlOiAvXlxcXFwoW1xcXFxgKnt9XFxbXFxdKCkjK1xcLS4hXz5dKS8sXG4gIGF1dG9saW5rOiAvXjwoW14gPl0rKEB8OlxcLylbXiA+XSspPi8sXG4gIHVybDogbm9vcCxcbiAgdGFnOiAvXjwhLS1bXFxzXFxTXSo/LS0+fF48XFwvP1xcdysoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vLFxuICBsaW5rOiAvXiE/XFxbKGluc2lkZSlcXF1cXChocmVmXFwpLyxcbiAgcmVmbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFxzKlxcWyhbXlxcXV0qKVxcXS8sXG4gIG5vbGluazogL14hP1xcWygoPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXSkqKVxcXS8sXG4gIHN0cm9uZzogL15fXyhbXFxzXFxTXSs/KV9fKD8hXyl8XlxcKlxcKihbXFxzXFxTXSs/KVxcKlxcKig/IVxcKikvLFxuICBlbTogL15cXGJfKCg/Ol9ffFtcXHNcXFNdKSs/KV9cXGJ8XlxcKigoPzpcXCpcXCp8W1xcc1xcU10pKz8pXFwqKD8hXFwqKS8sXG4gIGNvZGU6IC9eKGArKVxccyooW1xcc1xcU10qP1teYF0pXFxzKlxcMSg/IWApLyxcbiAgYnI6IC9eIHsyLH1cXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3AsXG4gIHRleHQ6IC9eW1xcc1xcU10rPyg/PVtcXFxcPCFcXFtfKmBdfCB7Mix9XFxufCQpL1xufTtcblxuaW5saW5lLl9pbnNpZGUgPSAvKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV18XFxdKD89W15cXFtdKlxcXSkpKi87XG5pbmxpbmUuX2hyZWYgPSAvXFxzKjw/KFtcXHNcXFNdKj8pPj8oPzpcXHMrWydcIl0oW1xcc1xcU10qPylbJ1wiXSk/XFxzKi87XG5cbmlubGluZS5saW5rID0gcmVwbGFjZShpbmxpbmUubGluaylcbiAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbiAgKCdocmVmJywgaW5saW5lLl9ocmVmKVxuICAoKTtcblxuaW5saW5lLnJlZmxpbmsgPSByZXBsYWNlKGlubGluZS5yZWZsaW5rKVxuICAoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gbWVyZ2Uoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IC9eX18oPz1cXFMpKFtcXHNcXFNdKj9cXFMpX18oPyFfKXxeXFwqXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKlxcKig/IVxcKikvLFxuICBlbTogL15fKD89XFxTKShbXFxzXFxTXSo/XFxTKV8oPyFfKXxeXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKig/IVxcKikvXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiByZXBsYWNlKGlubGluZS5lc2NhcGUpKCddKScsICd+fF0pJykoKSxcbiAgdXJsOiAvXihodHRwcz86XFwvXFwvW15cXHM8XStbXjwuLDo7XCInKVxcXVxcc10pLyxcbiAgZGVsOiAvXn5+KD89XFxTKShbXFxzXFxTXSo/XFxTKX5+LyxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUudGV4dClcbiAgICAoJ118JywgJ35dfCcpXG4gICAgKCd8JywgJ3xodHRwcz86Ly98JylcbiAgICAoKVxufSk7XG5cbi8qKlxuICogR0ZNICsgTGluZSBCcmVha3MgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuYnJlYWtzID0gbWVyZ2Uoe30sIGlubGluZS5nZm0sIHtcbiAgYnI6IHJlcGxhY2UoaW5saW5lLmJyKSgnezIsfScsICcqJykoKSxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUuZ2ZtLnRleHQpKCd7Mix9JywgJyonKSgpXG59KTtcblxuLyoqXG4gKiBJbmxpbmUgTGV4ZXIgJiBDb21waWxlclxuICovXG5cbmZ1bmN0aW9uIElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLmxpbmtzID0gbGlua3M7XG4gIHRoaXMucnVsZXMgPSBpbmxpbmUubm9ybWFsO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmICghdGhpcy5saW5rcykge1xuICAgIHRocm93IG5ld1xuICAgICAgRXJyb3IoJ1Rva2VucyBhcnJheSByZXF1aXJlcyBhIGBsaW5rc2AgcHJvcGVydHkuJyk7XG4gIH1cblxuICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnJlYWtzKSB7XG4gICAgICB0aGlzLnJ1bGVzID0gaW5saW5lLmJyZWFrcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5nZm07XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgIHRoaXMucnVsZXMgPSBpbmxpbmUucGVkYW50aWM7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgSW5saW5lIFJ1bGVzXG4gKi9cblxuSW5saW5lTGV4ZXIucnVsZXMgPSBpbmxpbmU7XG5cbi8qKlxuICogU3RhdGljIExleGluZy9Db21waWxpbmcgTWV0aG9kXG4gKi9cblxuSW5saW5lTGV4ZXIub3V0cHV0ID0gZnVuY3Rpb24oc3JjLCBsaW5rcywgb3B0aW9ucykge1xuICB2YXIgaW5saW5lID0gbmV3IElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKTtcbiAgcmV0dXJuIGlubGluZS5vdXRwdXQoc3JjKTtcbn07XG5cbi8qKlxuICogTGV4aW5nL0NvbXBpbGluZ1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXQgPSBmdW5jdGlvbihzcmMpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsaW5rXG4gICAgLCB0ZXh0XG4gICAgLCBocmVmXG4gICAgLCBjYXA7XG5cbiAgd2hpbGUgKHNyYykge1xuICAgIC8vIGVzY2FwZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVzY2FwZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gY2FwWzFdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYXV0b2xpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5hdXRvbGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGNhcFsxXS5jaGFyQXQoNikgPT09ICc6J1xuICAgICAgICAgID8gdGhpcy5tYW5nbGUoY2FwWzFdLnN1YnN0cmluZyg3KSlcbiAgICAgICAgICA6IHRoaXMubWFuZ2xlKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0aGlzLm1hbmdsZSgnbWFpbHRvOicpICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdXJsIChnZm0pXG4gICAgaWYgKCF0aGlzLmluTGluayAmJiAoY2FwID0gdGhpcy5ydWxlcy51cmwuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRhZy5leGVjKHNyYykpIHtcbiAgICAgIGlmICghdGhpcy5pbkxpbmsgJiYgL148YSAvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmluTGluayAmJiAvXjxcXC9hPi9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgPyBlc2NhcGUoY2FwWzBdKVxuICAgICAgICA6IGNhcFswXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLnJlZmxpbmsuZXhlYyhzcmMpKVxuICAgICAgICB8fCAoY2FwID0gdGhpcy5ydWxlcy5ub2xpbmsuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGxpbmsgPSAoY2FwWzJdIHx8IGNhcFsxXSkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgbGluayA9IHRoaXMubGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluayB8fCAhbGluay5ocmVmKSB7XG4gICAgICAgIG91dCArPSBjYXBbMF0uY2hhckF0KDApO1xuICAgICAgICBzcmMgPSBjYXBbMF0uc3Vic3RyaW5nKDEpICsgc3JjO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCBsaW5rKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBzdHJvbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5zdHJvbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuc3Ryb25nKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGVtXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZW0uZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuZW0odGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmNvZGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuY29kZXNwYW4oZXNjYXBlKGNhcFsyXSwgdHJ1ZSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYnJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ici5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5icigpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVsIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZGVsLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmRlbCh0aGlzLm91dHB1dChjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSBlc2NhcGUodGhpcy5zbWFydHlwYW50cyhjYXBbMF0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzcmMpIHtcbiAgICAgIHRocm93IG5ld1xuICAgICAgICBFcnJvcignSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvbXBpbGUgTGlua1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXRMaW5rID0gZnVuY3Rpb24oY2FwLCBsaW5rKSB7XG4gIHZhciBocmVmID0gZXNjYXBlKGxpbmsuaHJlZilcbiAgICAsIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG5cbiAgcmV0dXJuIGNhcFswXS5jaGFyQXQoMCkgIT09ICchJ1xuICAgID8gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIHRpdGxlLCB0aGlzLm91dHB1dChjYXBbMV0pKVxuICAgIDogdGhpcy5yZW5kZXJlci5pbWFnZShocmVmLCB0aXRsZSwgZXNjYXBlKGNhcFsxXSkpO1xufTtcblxuLyoqXG4gKiBTbWFydHlwYW50cyBUcmFuc2Zvcm1hdGlvbnNcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUuc21hcnR5cGFudHMgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICghdGhpcy5vcHRpb25zLnNtYXJ0eXBhbnRzKSByZXR1cm4gdGV4dDtcbiAgcmV0dXJuIHRleHRcbiAgICAvLyBlbS1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0vZywgJ1xcdTIwMTQnKVxuICAgIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcIlxcc10pJy9nLCAnJDFcXHUyMDE4JylcbiAgICAvLyBjbG9zaW5nIHNpbmdsZXMgJiBhcG9zdHJvcGhlc1xuICAgIC5yZXBsYWNlKC8nL2csICdcXHUyMDE5JylcbiAgICAvLyBvcGVuaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgJyQxXFx1MjAxYycpXG4gICAgLy8gY2xvc2luZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoL1wiL2csICdcXHUyMDFkJylcbiAgICAvLyBlbGxpcHNlc1xuICAgIC5yZXBsYWNlKC9cXC57M30vZywgJ1xcdTIwMjYnKTtcbn07XG5cbi8qKlxuICogTWFuZ2xlIExpbmtzXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm1hbmdsZSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsID0gdGV4dC5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBjaDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIGNoID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBjaCA9ICd4JyArIGNoLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgb3V0ICs9ICcmIycgKyBjaCArICc7JztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJlbmRlcmVyXG4gKi9cblxuZnVuY3Rpb24gUmVuZGVyZXIob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xufVxuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZSA9IGZ1bmN0aW9uKGNvZGUsIGxhbmcsIGVzY2FwZWQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICB2YXIgb3V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodChjb2RlLCBsYW5nKTtcbiAgICBpZiAob3V0ICE9IG51bGwgJiYgb3V0ICE9PSBjb2RlKSB7XG4gICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgIGNvZGUgPSBvdXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFsYW5nKSB7XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlPidcbiAgICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICAgKyAnXFxuPC9jb2RlPjwvcHJlPic7XG4gIH1cblxuICByZXR1cm4gJzxwcmU+PGNvZGUgY2xhc3M9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMubGFuZ1ByZWZpeFxuICAgICsgZXNjYXBlKGxhbmcsIHRydWUpXG4gICAgKyAnXCI+J1xuICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICsgJ1xcbjwvY29kZT48L3ByZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrcXVvdGUgPSBmdW5jdGlvbihxdW90ZSkge1xuICByZXR1cm4gJzxibG9ja3F1b3RlPlxcbicgKyBxdW90ZSArICc8L2Jsb2NrcXVvdGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICByZXR1cm4gaHRtbDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5oZWFkaW5nID0gZnVuY3Rpb24odGV4dCwgbGV2ZWwsIHJhdykge1xuICByZXR1cm4gJzxoJ1xuICAgICsgbGV2ZWxcbiAgICArICcgaWQ9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4XG4gICAgKyByYXcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXlxcd10rL2csICctJylcbiAgICArICdcIj4nXG4gICAgKyB0ZXh0XG4gICAgKyAnPC9oJ1xuICAgICsgbGV2ZWxcbiAgICArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ociA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxoci8+XFxuJyA6ICc8aHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oYm9keSwgb3JkZXJlZCkge1xuICB2YXIgdHlwZSA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJztcbiAgcmV0dXJuICc8JyArIHR5cGUgKyAnPlxcbicgKyBib2R5ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdGl0ZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGxpPicgKyB0ZXh0ICsgJzwvbGk+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5wYXJhZ3JhcGggPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPHA+JyArIHRleHQgKyAnPC9wPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbihoZWFkZXIsIGJvZHkpIHtcbiAgcmV0dXJuICc8dGFibGU+XFxuJ1xuICAgICsgJzx0aGVhZD5cXG4nXG4gICAgKyBoZWFkZXJcbiAgICArICc8L3RoZWFkPlxcbidcbiAgICArICc8dGJvZHk+XFxuJ1xuICAgICsgYm9keVxuICAgICsgJzwvdGJvZHk+XFxuJ1xuICAgICsgJzwvdGFibGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZXJvdyA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgcmV0dXJuICc8dHI+XFxuJyArIGNvbnRlbnQgKyAnPC90cj5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlY2VsbCA9IGZ1bmN0aW9uKGNvbnRlbnQsIGZsYWdzKSB7XG4gIHZhciB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gIHZhciB0YWcgPSBmbGFncy5hbGlnblxuICAgID8gJzwnICsgdHlwZSArICcgc3R5bGU9XCJ0ZXh0LWFsaWduOicgKyBmbGFncy5hbGlnbiArICdcIj4nXG4gICAgOiAnPCcgKyB0eXBlICsgJz4nO1xuICByZXR1cm4gdGFnICsgY29udGVudCArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuLy8gc3BhbiBsZXZlbCByZW5kZXJlclxuUmVuZGVyZXIucHJvdG90eXBlLnN0cm9uZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8c3Ryb25nPicgKyB0ZXh0ICsgJzwvc3Ryb25nPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGVtPicgKyB0ZXh0ICsgJzwvZW0+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5jb2Rlc3BhbiA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8Y29kZT4nICsgdGV4dCArICc8L2NvZGU+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5iciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxici8+JyA6ICc8YnI+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGRlbD4nICsgdGV4dCArICc8L2RlbD4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKVxuICAgICAgICAucmVwbGFjZSgvW15cXHc6XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9ICc+JyArIHRleHQgKyAnPC9hPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaW1hZ2UgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICB2YXIgb3V0ID0gJzxpbWcgc3JjPVwiJyArIGhyZWYgKyAnXCIgYWx0PVwiJyArIHRleHQgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9IHRoaXMub3B0aW9ucy54aHRtbCA/ICcvPicgOiAnPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBhcnNpbmcgJiBDb21waWxpbmdcbiAqL1xuXG5mdW5jdGlvbiBQYXJzZXIob3B0aW9ucykge1xuICB0aGlzLnRva2VucyA9IFtdO1xuICB0aGlzLnRva2VuID0gbnVsbDtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMub3B0aW9ucy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbn1cblxuLyoqXG4gKiBTdGF0aWMgUGFyc2UgTWV0aG9kXG4gKi9cblxuUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zLCByZW5kZXJlcikge1xuICB2YXIgcGFyc2VyID0gbmV3IFBhcnNlcihvcHRpb25zLCByZW5kZXJlcik7XG4gIHJldHVybiBwYXJzZXIucGFyc2Uoc3JjKTtcbn07XG5cbi8qKlxuICogUGFyc2UgTG9vcFxuICovXG5cblBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihzcmMpIHtcbiAgdGhpcy5pbmxpbmUgPSBuZXcgSW5saW5lTGV4ZXIoc3JjLmxpbmtzLCB0aGlzLm9wdGlvbnMsIHRoaXMucmVuZGVyZXIpO1xuICB0aGlzLnRva2VucyA9IHNyYy5yZXZlcnNlKCk7XG5cbiAgdmFyIG91dCA9ICcnO1xuICB3aGlsZSAodGhpcy5uZXh0KCkpIHtcbiAgICBvdXQgKz0gdGhpcy50b2soKTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW4gPSB0aGlzLnRva2Vucy5wb3AoKTtcbn07XG5cbi8qKlxuICogUHJldmlldyBOZXh0IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLnRva2Vucy5sZW5ndGggLSAxXSB8fCAwO1xufTtcblxuLyoqXG4gKiBQYXJzZSBUZXh0IFRva2Vuc1xuICovXG5cblBhcnNlci5wcm90b3R5cGUucGFyc2VUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib2R5ID0gdGhpcy50b2tlbi50ZXh0O1xuXG4gIHdoaWxlICh0aGlzLnBlZWsoKS50eXBlID09PSAndGV4dCcpIHtcbiAgICBib2R5ICs9ICdcXG4nICsgdGhpcy5uZXh0KCkudGV4dDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmlubGluZS5vdXRwdXQoYm9keSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIEN1cnJlbnQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnRvayA9IGZ1bmN0aW9uKCkge1xuICBzd2l0Y2ggKHRoaXMudG9rZW4udHlwZSkge1xuICAgIGNhc2UgJ3NwYWNlJzoge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjYXNlICdocic6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhyKCk7XG4gICAgfVxuICAgIGNhc2UgJ2hlYWRpbmcnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5oZWFkaW5nKFxuICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KSxcbiAgICAgICAgdGhpcy50b2tlbi5kZXB0aCxcbiAgICAgICAgdGhpcy50b2tlbi50ZXh0KTtcbiAgICB9XG4gICAgY2FzZSAnY29kZSc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmNvZGUodGhpcy50b2tlbi50ZXh0LFxuICAgICAgICB0aGlzLnRva2VuLmxhbmcsXG4gICAgICAgIHRoaXMudG9rZW4uZXNjYXBlZCk7XG4gICAgfVxuICAgIGNhc2UgJ3RhYmxlJzoge1xuICAgICAgdmFyIGhlYWRlciA9ICcnXG4gICAgICAgICwgYm9keSA9ICcnXG4gICAgICAgICwgaVxuICAgICAgICAsIHJvd1xuICAgICAgICAsIGNlbGxcbiAgICAgICAgLCBmbGFnc1xuICAgICAgICAsIGo7XG5cbiAgICAgIC8vIGhlYWRlclxuICAgICAgY2VsbCA9ICcnO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uaGVhZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZsYWdzID0geyBoZWFkZXI6IHRydWUsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2ldIH07XG4gICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4uaGVhZGVyW2ldKSxcbiAgICAgICAgICB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaGVhZGVyICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnRva2VuLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdyA9IHRoaXMudG9rZW4uY2VsbHNbaV07XG5cbiAgICAgICAgY2VsbCA9ICcnO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICAgIHRoaXMuaW5saW5lLm91dHB1dChyb3dbal0pLFxuICAgICAgICAgICAgeyBoZWFkZXI6IGZhbHNlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltqXSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnRhYmxlKGhlYWRlciwgYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2Jsb2NrcXVvdGVfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2Jsb2NrcXVvdGVfZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmJsb2NrcXVvdGUoYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2xpc3Rfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnXG4gICAgICAgICwgb3JkZXJlZCA9IHRoaXMudG9rZW4ub3JkZXJlZDtcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0KGJvZHksIG9yZGVyZWQpO1xuICAgIH1cbiAgICBjYXNlICdsaXN0X2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2tlbi50eXBlID09PSAndGV4dCdcbiAgICAgICAgICA/IHRoaXMucGFyc2VUZXh0KClcbiAgICAgICAgICA6IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsb29zZV9pdGVtX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2l0ZW1fZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdodG1sJzoge1xuICAgICAgdmFyIGh0bWwgPSAhdGhpcy50b2tlbi5wcmUgJiYgIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICA/IHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpXG4gICAgICAgIDogdGhpcy50b2tlbi50ZXh0O1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHRtbChodG1sKTtcbiAgICB9XG4gICAgY2FzZSAncGFyYWdyYXBoJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpKTtcbiAgICB9XG4gICAgY2FzZSAndGV4dCc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnBhcmFncmFwaCh0aGlzLnBhcnNlVGV4dCgpKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShodG1sLCBlbmNvZGUpIHtcbiAgcmV0dXJuIGh0bWxcbiAgICAucmVwbGFjZSghZW5jb2RlID8gLyYoPyEjP1xcdys7KS9nIDogLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGUoaHRtbCkge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKC8mKFsjXFx3XSspOy9nLCBmdW5jdGlvbihfLCBuKSB7XG4gICAgbiA9IG4udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobiA9PT0gJ2NvbG9uJykgcmV0dXJuICc6JztcbiAgICBpZiAobi5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgcmV0dXJuIG4uY2hhckF0KDEpID09PSAneCdcbiAgICAgICAgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG4uc3Vic3RyaW5nKDIpLCAxNikpXG4gICAgICAgIDogU3RyaW5nLmZyb21DaGFyQ29kZSgrbi5zdWJzdHJpbmcoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlKHJlZ2V4LCBvcHQpIHtcbiAgcmVnZXggPSByZWdleC5zb3VyY2U7XG4gIG9wdCA9IG9wdCB8fCAnJztcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGYobmFtZSwgdmFsKSB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCwgb3B0KTtcbiAgICB2YWwgPSB2YWwuc291cmNlIHx8IHZhbDtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvKF58W15cXFtdKVxcXi9nLCAnJDEnKTtcbiAgICByZWdleCA9IHJlZ2V4LnJlcGxhY2UobmFtZSwgdmFsKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5ub29wLmV4ZWMgPSBub29wO1xuXG5mdW5jdGlvbiBtZXJnZShvYmopIHtcbiAgdmFyIGkgPSAxXG4gICAgLCB0YXJnZXRcbiAgICAsIGtleTtcblxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRhcmdldCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gdGFyZ2V0W2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuXG4vKipcbiAqIE1hcmtlZFxuICovXG5cbmZ1bmN0aW9uIG1hcmtlZChzcmMsIG9wdCwgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrIHx8IHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdDtcbiAgICAgIG9wdCA9IG51bGw7XG4gICAgfVxuXG4gICAgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0IHx8IHt9KTtcblxuICAgIHZhciBoaWdobGlnaHQgPSBvcHQuaGlnaGxpZ2h0XG4gICAgICAsIHRva2Vuc1xuICAgICAgLCBwZW5kaW5nXG4gICAgICAsIGkgPSAwO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRva2VucyA9IExleGVyLmxleChzcmMsIG9wdClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgfVxuXG4gICAgcGVuZGluZyA9IHRva2Vucy5sZW5ndGg7XG5cbiAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBvcHQuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG91dDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgb3V0ID0gUGFyc2VyLnBhcnNlKHRva2Vucywgb3B0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyID0gZTtcbiAgICAgIH1cblxuICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcblxuICAgICAgcmV0dXJuIGVyclxuICAgICAgICA/IGNhbGxiYWNrKGVycilcbiAgICAgICAgOiBjYWxsYmFjayhudWxsLCBvdXQpO1xuICAgIH07XG5cbiAgICBpZiAoIWhpZ2hsaWdodCB8fCBoaWdobGlnaHQubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBkZWxldGUgb3B0LmhpZ2hsaWdodDtcblxuICAgIGlmICghcGVuZGluZykgcmV0dXJuIGRvbmUoKTtcblxuICAgIGZvciAoOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09ICdjb2RlJykge1xuICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoaWdobGlnaHQodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgZnVuY3Rpb24oZXJyLCBjb2RlKSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICBpZiAoY29kZSA9PSBudWxsIHx8IGNvZGUgPT09IHRva2VuLnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0b2tlbi50ZXh0ID0gY29kZTtcbiAgICAgICAgICB0b2tlbi5lc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKHRva2Vuc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdCkgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgICByZXR1cm4gUGFyc2VyLnBhcnNlKExleGVyLmxleChzcmMsIG9wdCksIG9wdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWQuJztcbiAgICBpZiAoKG9wdCB8fCBtYXJrZWQuZGVmYXVsdHMpLnNpbGVudCkge1xuICAgICAgcmV0dXJuICc8cD5BbiBlcnJvciBvY2N1cmVkOjwvcD48cHJlPidcbiAgICAgICAgKyBlc2NhcGUoZS5tZXNzYWdlICsgJycsIHRydWUpXG4gICAgICAgICsgJzwvcHJlPic7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuLyoqXG4gKiBPcHRpb25zXG4gKi9cblxubWFya2VkLm9wdGlvbnMgPVxubWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHQpIHtcbiAgbWVyZ2UobWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICByZXR1cm4gbWFya2VkO1xufTtcblxubWFya2VkLmRlZmF1bHRzID0ge1xuICBnZm06IHRydWUsXG4gIHRhYmxlczogdHJ1ZSxcbiAgYnJlYWtzOiBmYWxzZSxcbiAgcGVkYW50aWM6IGZhbHNlLFxuICBzYW5pdGl6ZTogZmFsc2UsXG4gIHNtYXJ0TGlzdHM6IGZhbHNlLFxuICBzaWxlbnQ6IGZhbHNlLFxuICBoaWdobGlnaHQ6IG51bGwsXG4gIGxhbmdQcmVmaXg6ICdsYW5nLScsXG4gIHNtYXJ0eXBhbnRzOiBmYWxzZSxcbiAgaGVhZGVyUHJlZml4OiAnJyxcbiAgcmVuZGVyZXI6IG5ldyBSZW5kZXJlcixcbiAgeGh0bWw6IGZhbHNlXG59O1xuXG4vKipcbiAqIEV4cG9zZVxuICovXG5cbm1hcmtlZC5QYXJzZXIgPSBQYXJzZXI7XG5tYXJrZWQucGFyc2VyID0gUGFyc2VyLnBhcnNlO1xuXG5tYXJrZWQuUmVuZGVyZXIgPSBSZW5kZXJlcjtcblxubWFya2VkLkxleGVyID0gTGV4ZXI7XG5tYXJrZWQubGV4ZXIgPSBMZXhlci5sZXg7XG5cbm1hcmtlZC5JbmxpbmVMZXhlciA9IElubGluZUxleGVyO1xubWFya2VkLmlubGluZUxleGVyID0gSW5saW5lTGV4ZXIub3V0cHV0O1xuXG5tYXJrZWQucGFyc2UgPSBtYXJrZWQ7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBtYXJrZWQ7XG59IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBtYXJrZWQ7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy5tYXJrZWQgPSBtYXJrZWQ7XG59XG5cbn0pLmNhbGwoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCk7XG59KCkpO1xuIiwiXG52YXIgZW52ID0gcmVxdWlyZSgnLi9lbnYuanMnKTtcbnZhciBMZXhlciA9IHJlcXVpcmUoXCIuL3BhcnNlci9MZXhlci5qc1wiKTtcbnZhciBQYXJzZXIgPSByZXF1aXJlKFwiLi9wYXJzZXIvUGFyc2VyLmpzXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuL2NvbmZpZy5qc1wiKTtcbnZhciBfID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnLi9oZWxwZXIvZXh0ZW5kLmpzJyk7XG5pZihlbnYuYnJvd3Nlcil7XG52YXIgY29tYmluZSA9IHJlcXVpcmUoJy4vaGVscGVyL2NvbWJpbmUuanMnKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi9kb20uanNcIik7XG52YXIgd2Fsa2VycyA9IHJlcXVpcmUoJy4vd2Fsa2Vycy5qcycpO1xudmFyIEdyb3VwID0gcmVxdWlyZSgnLi9ncm91cC5qcycpO1xufVxudmFyIGV2ZW50cyA9IHJlcXVpcmUoJy4vaGVscGVyL2V2ZW50LmpzJyk7XG52YXIgV2F0Y2hlciA9IHJlcXVpcmUoJy4vaGVscGVyL3dhdGNoZXIuanMnKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vaGVscGVyL3BhcnNlLmpzJyk7XG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi9oZWxwZXIvZmlsdGVyLmpzJyk7XG52YXIgZG9jID0gdHlwZW9mIGRvY3VtZW50PT09J3VuZGVmaW5lZCc/IHt9IDogZG9jdW1lbnQ7XG5cblxuLyoqXG4qIGBSZWd1bGFyYCBpcyByZWd1bGFyanMncyBOYW1lU3BhY2UgYW5kIEJhc2VDbGFzcy4gRXZlcnkgQ29tcG9uZW50IGlzIGluaGVyaXRlZCBmcm9tIGl0XG4qIFxuKiBAY2xhc3MgUmVndWxhclxuKiBAbW9kdWxlIFJlZ3VsYXJcbiogQGNvbnN0cnVjdG9yXG4qIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHNwZWNpZmljYXRpb24gb2YgdGhlIGNvbXBvbmVudFxuKi9cbnZhciBSZWd1bGFyID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIHZhciBwcmV2UnVubmluZyA9IGVudi5pc1J1bm5pbmc7XG4gIGVudi5pc1J1bm5pbmcgPSB0cnVlO1xuICB2YXIgbm9kZSwgdGVtcGxhdGU7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcbiAgb3B0aW9ucy5jb21wdXRlZCA9IG9wdGlvbnMuY29tcHV0ZWQgfHwge307XG4gIG9wdGlvbnMuZXZlbnRzID0gb3B0aW9ucy5ldmVudHMgfHwge307XG4gIGlmKHRoaXMuZGF0YSkgXy5leHRlbmQob3B0aW9ucy5kYXRhLCB0aGlzLmRhdGEpO1xuICBpZih0aGlzLmNvbXB1dGVkKSBfLmV4dGVuZChvcHRpb25zLmNvbXB1dGVkLCB0aGlzLmNvbXB1dGVkKTtcbiAgaWYodGhpcy5ldmVudHMpIF8uZXh0ZW5kKG9wdGlvbnMuZXZlbnRzLCB0aGlzLmV2ZW50cyk7XG5cbiAgXy5leHRlbmQodGhpcywgb3B0aW9ucywgdHJ1ZSk7XG4gIGlmKHRoaXMuJHBhcmVudCl7XG4gICAgIHRoaXMuJHBhcmVudC5fYXBwZW5kKHRoaXMpO1xuICB9XG4gIHRoaXMuX2NoaWxkcmVuID0gW107XG4gIHRoaXMuJHJlZnMgPSB7fTtcblxuICB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG5cbiAgLy8gdGVtcGxhdGUgaXMgYSBzdHJpbmcgKGxlbiA8IDE2KS4gd2Ugd2lsbCBmaW5kIGl0IGNvbnRhaW5lciBmaXJzdFxuICBpZigodHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyAmJiB0ZW1wbGF0ZS5sZW5ndGggPCAxNikgJiYgKG5vZGUgPSBkb20uZmluZCh0ZW1wbGF0ZSkpKSB7XG4gICAgdGVtcGxhdGUgPSBub2RlLmlubmVySFRNTDtcbiAgfVxuICAvLyBpZiB0ZW1wbGF0ZSBpcyBhIHhtbFxuICBpZih0ZW1wbGF0ZSAmJiB0ZW1wbGF0ZS5ub2RlVHlwZSkgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5pbm5lckhUTUw7XG4gIGlmKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHRoaXMudGVtcGxhdGUgPSBuZXcgUGFyc2VyKHRlbXBsYXRlKS5wYXJzZSgpO1xuXG4gIHRoaXMuY29tcHV0ZWQgPSBoYW5kbGVDb21wdXRlZCh0aGlzLmNvbXB1dGVkKTtcbiAgdGhpcy4kcm9vdCA9IHRoaXMuJHJvb3QgfHwgdGhpcztcbiAgLy8gaWYgaGF2ZSBldmVudHNcbiAgaWYodGhpcy5ldmVudHMpe1xuICAgIHRoaXMuJG9uKHRoaXMuZXZlbnRzKTtcbiAgfVxuICBpZih0aGlzLiRib2R5KXtcbiAgICB0aGlzLl9nZXRUcmFuc2NsdWRlID0gZnVuY3Rpb24oKXtcbiAgICAgIHZhciBjdHggPSB0aGlzLiRwYXJlbnQgfHwgdGhpcztcbiAgICAgIGlmKHRoaXMuJGJvZHkpIHJldHVybiBjdHguJGNvbXBpbGUodGhpcy4kYm9keSwge25hbWVzcGFjZTogb3B0aW9ucy5uYW1lc3BhY2UsIG91dGVyOiB0aGlzLCBleHRyYTogb3B0aW9ucy5leHRyYX0pXG4gICAgfVxuICB9XG4gIHRoaXMuJGVtaXQoXCIkY29uZmlnXCIpO1xuICB0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZyh0aGlzLmRhdGEpO1xuICAvLyBoYW5kbGUgY29tcHV0ZWRcbiAgaWYodGVtcGxhdGUpe1xuICAgIHRoaXMuZ3JvdXAgPSB0aGlzLiRjb21waWxlKHRoaXMudGVtcGxhdGUsIHtuYW1lc3BhY2U6IG9wdGlvbnMubmFtZXNwYWNlfSk7XG4gICAgY29tYmluZS5ub2RlKHRoaXMpO1xuICB9XG5cblxuICBpZighdGhpcy4kcGFyZW50KSB0aGlzLiR1cGRhdGUoKTtcbiAgdGhpcy4kcmVhZHkgPSB0cnVlO1xuICB0aGlzLiRlbWl0KFwiJGluaXRcIik7XG4gIGlmKCB0aGlzLmluaXQgKSB0aGlzLmluaXQodGhpcy5kYXRhKTtcblxuICAvLyBAVE9ETzogcmVtb3ZlLCBtYXliZSAsIHRoZXJlIGlzIG5vIG5lZWQgdG8gdXBkYXRlIGFmdGVyIGluaXQ7IFxuICAvLyBpZih0aGlzLiRyb290ID09PSB0aGlzKSB0aGlzLiR1cGRhdGUoKTtcbiAgZW52LmlzUnVubmluZyA9IHByZXZSdW5uaW5nO1xuXG4gIC8vIGNoaWxkcmVuIGlzIG5vdCByZXF1aXJlZDtcbn1cblxuXG53YWxrZXJzICYmICh3YWxrZXJzLlJlZ3VsYXIgPSBSZWd1bGFyKTtcblxuXG4vLyBkZXNjcmlwdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gMS4gUmVndWxhciBhbmQgZGVyaXZlZCBDbGFzcyB1c2Ugc2FtZSBmaWx0ZXJcbl8uZXh0ZW5kKFJlZ3VsYXIsIHtcbiAgLy8gcHJpdmF0ZSBkYXRhIHN0dWZmXG4gIF9kaXJlY3RpdmVzOiB7IF9fcmVnZXhwX186W10gfSxcbiAgX3BsdWdpbnM6IHt9LFxuICBfcHJvdG9Jbmhlcml0Q2FjaGU6IFsgJ2RpcmVjdGl2ZScsICd1c2UnXSAsXG4gIF9fYWZ0ZXJfXzogZnVuY3Rpb24oc3Vwciwgbykge1xuXG4gICAgdmFyIHRlbXBsYXRlO1xuICAgIHRoaXMuX19hZnRlcl9fID0gc3Vwci5fX2FmdGVyX187XG5cbiAgICAvLyB1c2UgbmFtZSBtYWtlIHRoZSBjb21wb25lbnQgZ2xvYmFsLlxuICAgIGlmKG8ubmFtZSkgUmVndWxhci5jb21wb25lbnQoby5uYW1lLCB0aGlzKTtcbiAgICAvLyB0aGlzLnByb3RvdHlwZS50ZW1wbGF0ZSA9IGRvbS5pbml0VGVtcGxhdGUobylcbiAgICBpZih0ZW1wbGF0ZSA9IG8udGVtcGxhdGUpe1xuICAgICAgdmFyIG5vZGUsIG5hbWU7XG4gICAgICBpZiggdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyAmJiB0ZW1wbGF0ZS5sZW5ndGggPCAxNiAmJiAoIG5vZGUgPSBkb20uZmluZCggdGVtcGxhdGUgKSkgKXtcbiAgICAgICAgdGVtcGxhdGUgPSBub2RlLmlubmVySFRNTDtcbiAgICAgICAgaWYobmFtZSA9IGRvbS5hdHRyKG5vZGUsICduYW1lJykpIFJlZ3VsYXIuY29tcG9uZW50KG5hbWUsIHRoaXMpO1xuICAgICAgfVxuXG4gICAgICBpZih0ZW1wbGF0ZS5ub2RlVHlwZSkgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5pbm5lckhUTUw7XG5cbiAgICAgIGlmKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpe1xuICAgICAgICB0aGlzLnByb3RvdHlwZS50ZW1wbGF0ZSA9IG5ldyBQYXJzZXIodGVtcGxhdGUpLnBhcnNlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoby5jb21wdXRlZCkgdGhpcy5wcm90b3R5cGUuY29tcHV0ZWQgPSBoYW5kbGVDb21wdXRlZChvLmNvbXB1dGVkKTtcbiAgICAvLyBpbmhlcml0IGRpcmVjdGl2ZSBhbmQgb3RoZXIgY29uZmlnIGZyb20gc3VwclxuICAgIFJlZ3VsYXIuX2luaGVyaXRDb25maWcodGhpcywgc3Vwcik7XG5cbiAgfSxcbiAgLyoqXG4gICAqIERlZmluZSBhIGRpcmVjdGl2ZVxuICAgKlxuICAgKiBAbWV0aG9kIGRpcmVjdGl2ZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IENvcHkgb2YgLi4uXG4gICAqLyAgXG4gIGRpcmVjdGl2ZTogZnVuY3Rpb24obmFtZSwgY2ZnKXtcblxuICAgIGlmKF8udHlwZU9mKG5hbWUpID09PSBcIm9iamVjdFwiKXtcbiAgICAgIGZvcih2YXIgayBpbiBuYW1lKXtcbiAgICAgICAgaWYobmFtZS5oYXNPd25Qcm9wZXJ0eShrKSkgdGhpcy5kaXJlY3RpdmUoaywgbmFtZVtrXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIHR5cGUgPSBfLnR5cGVPZihuYW1lKTtcbiAgICB2YXIgZGlyZWN0aXZlcyA9IHRoaXMuX2RpcmVjdGl2ZXMsIGRpcmVjdGl2ZTtcbiAgICBpZihjZmcgPT0gbnVsbCl7XG4gICAgICBpZiggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAoZGlyZWN0aXZlID0gZGlyZWN0aXZlc1tuYW1lXSkgKSByZXR1cm4gZGlyZWN0aXZlO1xuICAgICAgZWxzZXtcbiAgICAgICAgdmFyIHJlZ2V4cCA9IGRpcmVjdGl2ZXMuX19yZWdleHBfXztcbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gcmVnZXhwLmxlbmd0aDsgaSA8IGxlbiA7IGkrKyl7XG4gICAgICAgICAgZGlyZWN0aXZlID0gcmVnZXhwW2ldO1xuICAgICAgICAgIHZhciB0ZXN0ID0gZGlyZWN0aXZlLnJlZ2V4cC50ZXN0KG5hbWUpO1xuICAgICAgICAgIGlmKHRlc3QpIHJldHVybiBkaXJlY3RpdmU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmKHR5cGVvZiBjZmcgPT09ICdmdW5jdGlvbicpIGNmZyA9IHsgbGluazogY2ZnIH0gXG4gICAgaWYodHlwZSA9PT0gJ3N0cmluZycpIGRpcmVjdGl2ZXNbbmFtZV0gPSBjZmc7XG4gICAgZWxzZSBpZih0eXBlID09PSAncmVnZXhwJyl7XG4gICAgICBjZmcucmVnZXhwID0gbmFtZTtcbiAgICAgIGRpcmVjdGl2ZXMuX19yZWdleHBfXy5wdXNoKGNmZylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgcGx1Z2luOiBmdW5jdGlvbihuYW1lLCBmbil7XG4gICAgdmFyIHBsdWdpbnMgPSB0aGlzLl9wbHVnaW5zO1xuICAgIGlmKGZuID09IG51bGwpIHJldHVybiBwbHVnaW5zW25hbWVdO1xuICAgIHBsdWdpbnNbbmFtZV0gPSBmbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdXNlOiBmdW5jdGlvbihmbil7XG4gICAgaWYodHlwZW9mIGZuID09PSBcInN0cmluZ1wiKSBmbiA9IFJlZ3VsYXIucGx1Z2luKGZuKTtcbiAgICBpZih0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRoaXM7XG4gICAgZm4odGhpcywgUmVndWxhcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8vIGNvbmZpZyB0aGUgUmVndWxhcmpzJ3MgZ2xvYmFsXG4gIGNvbmZpZzogZnVuY3Rpb24obmFtZSwgdmFsdWUpe1xuICAgIHZhciBuZWVkR2VuTGV4ZXIgPSBmYWxzZTtcbiAgICBpZih0eXBlb2YgbmFtZSA9PT0gXCJvYmplY3RcIil7XG4gICAgICBmb3IodmFyIGkgaW4gbmFtZSl7XG4gICAgICAgIC8vIGlmIHlvdSBjb25maWdcbiAgICAgICAgaWYoIGkgPT09XCJFTkRcIiB8fCBpPT09J0JFR0lOJyApICBuZWVkR2VuTGV4ZXIgPSB0cnVlO1xuICAgICAgICBjb25maWdbaV0gPSBuYW1lW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihuZWVkR2VuTGV4ZXIpIExleGVyLnNldHVwKCk7XG4gIH0sXG4gIGV4cHJlc3Npb246IHBhcnNlLmV4cHJlc3Npb24sXG4gIFBhcnNlcjogUGFyc2VyLFxuICBMZXhlcjogTGV4ZXIsXG4gIF9hZGRQcm90b0luaGVyaXRDYWNoZTogZnVuY3Rpb24obmFtZSwgdHJhbnNmb3JtKXtcbiAgICBpZiggQXJyYXkuaXNBcnJheSggbmFtZSApICl7XG4gICAgICByZXR1cm4gbmFtZS5mb3JFYWNoKFJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKTtcbiAgICB9XG4gICAgdmFyIGNhY2hlS2V5ID0gXCJfXCIgKyBuYW1lICsgXCJzXCJcbiAgICBSZWd1bGFyLl9wcm90b0luaGVyaXRDYWNoZS5wdXNoKG5hbWUpXG4gICAgUmVndWxhcltjYWNoZUtleV0gPSB7fTtcbiAgICBpZihSZWd1bGFyW25hbWVdKSByZXR1cm47XG4gICAgUmVndWxhcltuYW1lXSA9IGZ1bmN0aW9uKGtleSwgY2ZnKXtcbiAgICAgIHZhciBjYWNoZSA9IHRoaXNbY2FjaGVLZXldO1xuXG4gICAgICBpZih0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiKXtcbiAgICAgICAgZm9yKHZhciBpIGluIGtleSl7XG4gICAgICAgICAgaWYoa2V5Lmhhc093blByb3BlcnR5KGkpKSB0aGlzW25hbWVdKGksIGtleVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBpZihjZmcgPT0gbnVsbCkgcmV0dXJuIGNhY2hlW2tleV07XG4gICAgICBjYWNoZVtrZXldID0gdHJhbnNmb3JtPyB0cmFuc2Zvcm0oY2ZnKSA6IGNmZztcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSxcbiAgX2luaGVyaXRDb25maWc6IGZ1bmN0aW9uKHNlbGYsIHN1cHIpe1xuXG4gICAgLy8gcHJvdG90eXBlIGluaGVyaXQgc29tZSBSZWd1bGFyIHByb3BlcnR5XG4gICAgLy8gc28gZXZlcnkgQ29tcG9uZW50IHdpbGwgaGF2ZSBvd24gY29udGFpbmVyIHRvIHNlcnZlIGRpcmVjdGl2ZSwgZmlsdGVyIGV0Yy4uXG4gICAgdmFyIGRlZnMgPSBSZWd1bGFyLl9wcm90b0luaGVyaXRDYWNoZTtcbiAgICB2YXIga2V5cyA9IF8uc2xpY2UoZGVmcyk7XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSl7XG4gICAgICBzZWxmW2tleV0gPSBzdXByW2tleV07XG4gICAgICB2YXIgY2FjaGVLZXkgPSAnXycgKyBrZXkgKyAncyc7XG4gICAgICBpZihzdXByW2NhY2hlS2V5XSkgc2VsZltjYWNoZUtleV0gPSBfLmNyZWF0ZU9iamVjdChzdXByW2NhY2hlS2V5XSk7XG4gICAgfSlcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuXG59KTtcblxuZXh0ZW5kKFJlZ3VsYXIpO1xuXG5SZWd1bGFyLl9hZGRQcm90b0luaGVyaXRDYWNoZShcImNvbXBvbmVudFwiKVxuXG5SZWd1bGFyLl9hZGRQcm90b0luaGVyaXRDYWNoZShcImZpbHRlclwiLCBmdW5jdGlvbihjZmcpe1xuICByZXR1cm4gdHlwZW9mIGNmZyA9PT0gXCJmdW5jdGlvblwiPyB7Z2V0OiBjZmd9OiBjZmc7XG59KVxuXG5cbmV2ZW50cy5taXhUbyhSZWd1bGFyKTtcbldhdGNoZXIubWl4VG8oUmVndWxhcik7XG5cblJlZ3VsYXIuaW1wbGVtZW50KHtcbiAgaW5pdDogZnVuY3Rpb24oKXt9LFxuICBjb25maWc6IGZ1bmN0aW9uKCl7fSxcbiAgZGVzdHJveTogZnVuY3Rpb24oKXtcbiAgICAvLyBkZXN0cm95IGV2ZW50IHdvbnQgcHJvcGdhdGlvbjtcbiAgICB0aGlzLiRlbWl0KFwiJGRlc3Ryb3lcIik7XG4gICAgdGhpcy5ncm91cCAmJiB0aGlzLmdyb3VwLmRlc3Ryb3kodHJ1ZSk7XG4gICAgdGhpcy5ncm91cCA9IG51bGw7XG4gICAgdGhpcy5wYXJlbnROb2RlID0gbnVsbDtcbiAgICB0aGlzLl93YXRjaGVycyA9IG51bGw7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy4kcGFyZW50O1xuICAgIGlmKHBhcmVudCl7XG4gICAgICB2YXIgaW5kZXggPSBwYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICBwYXJlbnQuX2NoaWxkcmVuLnNwbGljZShpbmRleCwxKTtcbiAgICB9XG4gICAgdGhpcy4kcGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLiRyb290ID0gbnVsbDtcbiAgICB0aGlzLl9oYW5kbGVzID0gbnVsbDtcbiAgICB0aGlzLiRyZWZzID0gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogY29tcGlsZSBhIGJsb2NrIGFzdCA7IHJldHVybiBhIGdyb3VwO1xuICAgKiBAcGFyYW0gIHtBcnJheX0gcGFyc2VkIGFzdFxuICAgKiBAcGFyYW0gIHtbdHlwZV19IHJlY29yZFxuICAgKiBAcmV0dXJuIHtbdHlwZV19XG4gICAqL1xuICAkY29tcGlsZTogZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZih0eXBlb2YgYXN0ID09PSAnc3RyaW5nJyl7XG4gICAgICBhc3QgPSBuZXcgUGFyc2VyKGFzdCkucGFyc2UoKVxuICAgIH1cbiAgICB2YXIgcHJlRXh0ID0gdGhpcy5fX2V4dF9fLFxuICAgICAgcmVjb3JkID0gb3B0aW9ucy5yZWNvcmQsIFxuICAgICAgcmVjb3JkcztcblxuICAgIGlmKG9wdGlvbnMuZXh0cmEpIHRoaXMuX19leHRfXyA9IG9wdGlvbnMuZXh0cmE7XG5cbiAgICBpZihyZWNvcmQpIHRoaXMuX3JlY29yZCgpO1xuICAgIHZhciBncm91cCA9IHRoaXMuX3dhbGsoYXN0LCBvcHRpb25zKTtcbiAgICBpZihyZWNvcmQpe1xuICAgICAgcmVjb3JkcyA9IHRoaXMuX3JlbGVhc2UoKTtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGlmKHJlY29yZHMubGVuZ3RoKXtcbiAgICAgICAgLy8gYXV0byBkZXN0cm95IGFsbCB3YXRoZXI7XG4gICAgICAgIGdyb3VwLm9uZGVzdHJveSA9IGZ1bmN0aW9uKCl7IHNlbGYuJHVud2F0Y2gocmVjb3Jkcyk7IH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYob3B0aW9ucy5leHRyYSkgdGhpcy5fX2V4dF9fID0gcHJlRXh0O1xuICAgIHJldHVybiBncm91cDtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBjcmVhdGUgdHdvLXdheSBiaW5kaW5nIHdpdGggYW5vdGhlciBjb21wb25lbnQ7XG4gICAqICp3YXJuKjogXG4gICAqICAgZXhwcjEgYW5kIGV4cHIyIG11c3QgY2FuIG9wZXJhdGUgc2V0JmdldCwgZm9yIGV4YW1wbGU6IHRoZSAnYS5iJyBvciAnYVtiICsgMV0nIGlzIHNldC1hYmxlLCBidXQgJ2EuYiArIDEnIGlzIG5vdCwgXG4gICAqICAgYmVhY3VzZSBSZWd1bGFyIGRvbnQga25vdyBob3cgdG8gaW52ZXJzZSBzZXQgdGhyb3VnaCB0aGUgZXhwcmVzc2lvbjtcbiAgICogICBcbiAgICogICBpZiBiZWZvcmUgJGJpbmQsIHR3byBjb21wb25lbnQncyBzdGF0ZSBpcyBub3Qgc3luYywgdGhlIGNvbXBvbmVudChwYXNzZWQgcGFyYW0pIHdpbGwgc3luYyB3aXRoIHRoZSBjYWxsZWQgY29tcG9uZW50O1xuICAgKlxuICAgKiAqZXhhbXBsZTogKlxuICAgKlxuICAgKiBgYGBqYXZhc2NyaXB0XG4gICAqIC8vIGluIHRoaXMgZXhhbXBsZSwgd2UgbmVlZCB0byBsaW5rIHR3byBwYWdlciBjb21wb25lbnRcbiAgICogdmFyIHBhZ2VyID0gbmV3IFBhZ2VyKHt9KSAvLyBwYWdlciBjb21wb2VubnRcbiAgICogdmFyIHBhZ2VyMiA9IG5ldyBQYWdlcih7fSkgLy8gYW5vdGhlciBwYWdlciBjb21wb25lbnRcbiAgICogcGFnZXIuJGJpbmQocGFnZXIyLCAnY3VycmVudCcpOyAvLyB0d28gd2F5IGJpbmQgdGhyb3cgdHdvIGNvbXBvbmVudFxuICAgKiBwYWdlci4kYmluZChwYWdlcjIsICd0b3RhbCcpOyAgIC8vIFxuICAgKiAvLyBvciBqdXN0XG4gICAqIHBhZ2VyLiRiaW5kKHBhZ2VyMiwge1wiY3VycmVudFwiOiBcImN1cnJlbnRcIiwgXCJ0b3RhbFwiOiBcInRvdGFsXCJ9KSBcbiAgICogYGBgXG4gICAqIFxuICAgKiBAcGFyYW0gIHtSZWd1bGFyfSBjb21wb25lbnQgdGhlXG4gICAqIEBwYXJhbSAge1N0cmluZ3xFeHByZXNzaW9ufSBleHByMSAgICAgcmVxdWlyZWQsIHNlbGYgZXhwcjEgdG8gb3BlcmF0ZSBiaW5kaW5nXG4gICAqIEBwYXJhbSAge1N0cmluZ3xFeHByZXNzaW9ufSBleHByMiAgICAgb3B0aW9uYWwsIG90aGVyIGNvbXBvbmVudCdzIGV4cHIgdG8gYmluZCB3aXRoLCBpZiBub3QgcGFzc2VkLCB0aGUgZXhwcjIgd2lsbCB1c2UgdGhlIGV4cHIxO1xuICAgKiBAcmV0dXJuICAgICAgICAgIHRoaXM7XG4gICAqL1xuICAkYmluZDogZnVuY3Rpb24oY29tcG9uZW50LCBleHByMSwgZXhwcjIpe1xuICAgIHZhciB0eXBlID0gXy50eXBlT2YoZXhwcjEpO1xuICAgIGlmKCBleHByMS50eXBlID09PSAnZXhwcmVzc2lvbicgfHwgdHlwZSA9PT0gJ3N0cmluZycgKXtcbiAgICAgIHRoaXMuX2JpbmQoY29tcG9uZW50LCBleHByMSwgZXhwcjIpXG4gICAgfWVsc2UgaWYoIHR5cGUgPT09IFwiYXJyYXlcIiApeyAvLyBtdWx0aXBseSBzYW1lIHBhdGggYmluZGluZyB0aHJvdWdoIGFycmF5XG4gICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBleHByMS5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgIHRoaXMuX2JpbmQoY29tcG9uZW50LCBleHByMVtpXSk7XG4gICAgICB9XG4gICAgfWVsc2UgaWYodHlwZSA9PT0gXCJvYmplY3RcIil7XG4gICAgICBmb3IodmFyIGkgaW4gZXhwcjEpIGlmKGV4cHIxLmhhc093blByb3BlcnR5KGkpKXtcbiAgICAgICAgdGhpcy5fYmluZChjb21wb25lbnQsIGksIGV4cHIxW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gZGlnZXN0XG4gICAgY29tcG9uZW50LiR1cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLyoqXG4gICAqIHVuYmluZCBvbmUgY29tcG9uZW50KCBzZWUgJGJpbmQgYWxzbylcbiAgICpcbiAgICogdW5iaW5kIHdpbGwgdW5iaW5kIGFsbCByZWxhdGlvbiBiZXR3ZWVuIHR3byBjb21wb25lbnRcbiAgICogXG4gICAqIEBwYXJhbSAge1JlZ3VsYXJ9IGNvbXBvbmVudCBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge1RoaXN9ICAgIHRoaXNcbiAgICovXG4gICR1bmJpbmQ6IGZ1bmN0aW9uKCl7XG4gICAgLy8gdG9kb1xuICB9LFxuICAkaW5qZWN0OiBmdW5jdGlvbihub2RlLCBwb3NpdGlvbiwgb3B0aW9ucyl7XG4gICAgdmFyIGZyYWdtZW50ID0gY29tYmluZS5ub2RlKHRoaXMpO1xuXG4gICAgaWYobm9kZSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmKCF0aGlzLl9mcmFnQ29udGFpbmVyKSAgdGhpcy5fZnJhZ0NvbnRhaW5lciA9IGRvbS5mcmFnbWVudCgpO1xuICAgICAgcmV0dXJuIHRoaXMuJGluamVjdCh0aGlzLl9mcmFnQ29udGFpbmVyKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSBub2RlID0gZG9tLmZpbmQobm9kZSk7XG4gICAgaWYoIW5vZGUpIHRocm93ICdpbmplY3RlZCBub2RlIGlzIG5vdCBmb3VuZCc7XG4gICAgaWYoIWZyYWdtZW50KSByZXR1cm4gdGhpcztcbiAgICBkb20uaW5qZWN0KGZyYWdtZW50LCBub2RlLCBwb3NpdGlvbik7XG4gICAgdGhpcy4kZW1pdChcIiRpbmplY3RcIiwgbm9kZSk7XG4gICAgdGhpcy5wYXJlbnROb2RlID0gQXJyYXkuaXNBcnJheShmcmFnbWVudCk/IGZyYWdtZW50WzBdLnBhcmVudE5vZGU6IGZyYWdtZW50LnBhcmVudE5vZGU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gICRtdXRlOiBmdW5jdGlvbihpc011dGUpe1xuXG4gICAgaXNNdXRlID0gISFpc011dGU7XG5cbiAgICB2YXIgbmVlZHVwZGF0ZSA9IGlzTXV0ZSA9PT0gZmFsc2UgJiYgdGhpcy5fbXV0ZTtcblxuICAgIHRoaXMuX211dGUgPSAhIWlzTXV0ZTtcblxuICAgIGlmKG5lZWR1cGRhdGUpIHRoaXMuJHVwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyBwcml2YXRlIGJpbmQgbG9naWNcbiAgX2JpbmQ6IGZ1bmN0aW9uKGNvbXBvbmVudCwgZXhwcjEsIGV4cHIyKXtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBiYXNpYyBiaW5kaW5nXG5cbiAgICBpZighY29tcG9uZW50IHx8ICEoY29tcG9uZW50IGluc3RhbmNlb2YgUmVndWxhcikpIHRocm93IFwiJGJpbmQoKSBzaG91bGQgcGFzcyBSZWd1bGFyIGNvbXBvbmVudCBhcyBmaXJzdCBhcmd1bWVudFwiO1xuICAgIGlmKCFleHByMSkgdGhyb3cgXCIkYmluZCgpIHNob3VsZCAgcGFzcyBhcyBsZWFzdCBvbmUgZXhwcmVzc2lvbiB0byBiaW5kXCI7XG5cbiAgICBpZighZXhwcjIpIGV4cHIyID0gZXhwcjE7XG5cbiAgICBleHByMSA9IHBhcnNlLmV4cHJlc3Npb24oIGV4cHIxICk7XG4gICAgZXhwcjIgPSBwYXJzZS5leHByZXNzaW9uKCBleHByMiApO1xuXG4gICAgLy8gc2V0IGlzIG5lZWQgdG8gb3BlcmF0ZSBzZXR0aW5nIDtcbiAgICBpZihleHByMi5zZXQpe1xuICAgICAgdmFyIHdpZDEgPSB0aGlzLiR3YXRjaCggZXhwcjEsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgY29tcG9uZW50LiR1cGRhdGUoZXhwcjIsIHZhbHVlKVxuICAgICAgfSk7XG4gICAgICBjb21wb25lbnQuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHNlbGYuJHVud2F0Y2god2lkMSlcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmKGV4cHIxLnNldCl7XG4gICAgICB2YXIgd2lkMiA9IGNvbXBvbmVudC4kd2F0Y2goZXhwcjIsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgc2VsZi4kdXBkYXRlKGV4cHIxLCB2YWx1ZSlcbiAgICAgIH0pO1xuICAgICAgLy8gd2hlbiBicm90aGVyIGRlc3Ryb3ksIHdlIHVubGluayB0aGlzIHdhdGNoZXJcbiAgICAgIHRoaXMuJG9uKCckZGVzdHJveScsIGNvbXBvbmVudC4kdW53YXRjaC5iaW5kKGNvbXBvbmVudCx3aWQyKSlcbiAgICB9XG4gICAgLy8gc3luYyB0aGUgY29tcG9uZW50J3Mgc3RhdGUgdG8gY2FsbGVkJ3Mgc3RhdGVcbiAgICBleHByMi5zZXQoY29tcG9uZW50LCBleHByMS5nZXQodGhpcykpO1xuICB9LFxuICBfd2FsazogZnVuY3Rpb24oYXN0LCBhcmcxKXtcbiAgICBpZiggXy50eXBlT2YoYXN0KSA9PT0gJ2FycmF5JyApe1xuICAgICAgdmFyIHJlcyA9IFtdO1xuXG4gICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBhc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICByZXMucHVzaCggdGhpcy5fd2Fsayhhc3RbaV0sIGFyZzEpICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgR3JvdXAocmVzKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIGFzdCA9PT0gJ3N0cmluZycpIHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUoYXN0KVxuICAgIHJldHVybiB3YWxrZXJzW2FzdC50eXBlIHx8IFwiZGVmYXVsdFwiXS5jYWxsKHRoaXMsIGFzdCwgYXJnMSk7XG4gIH0sXG4gIF9hcHBlbmQ6IGZ1bmN0aW9uKGNvbXBvbmVudCl7XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjb21wb25lbnQpO1xuICAgIGNvbXBvbmVudC4kcGFyZW50ID0gdGhpcztcbiAgfSxcbiAgX2hhbmRsZUV2ZW50OiBmdW5jdGlvbihlbGVtLCB0eXBlLCB2YWx1ZSwgYXR0cnMpe1xuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLmNvbnN0cnVjdG9yLFxuICAgICAgZmlyZSA9IHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiPyBfLmhhbmRsZUV2ZW50LmNhbGwoIHRoaXMsIHZhbHVlLCB0eXBlICkgOiB2YWx1ZSxcbiAgICAgIGhhbmRsZXIgPSBDb21wb25lbnQuZXZlbnQodHlwZSksIGRlc3Ryb3k7XG5cbiAgICBpZiAoIGhhbmRsZXIgKSB7XG4gICAgICBkZXN0cm95ID0gaGFuZGxlci5jYWxsKHRoaXMsIGVsZW0sIGZpcmUsIGF0dHJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tLm9uKGVsZW0sIHR5cGUsIGZpcmUpO1xuICAgIH1cbiAgICByZXR1cm4gaGFuZGxlciA/IGRlc3Ryb3kgOiBmdW5jdGlvbigpIHtcbiAgICAgIGRvbS5vZmYoZWxlbSwgdHlwZSwgZmlyZSk7XG4gICAgfVxuICB9LFxuICAvLyAxLiDnlKjmnaXlpITnkIZleHByQm9keSAtPiBGdW5jdGlvblxuICAvLyAyLiBsaXN06YeM55qE5b6q546vXG4gIF90b3VjaEV4cHI6IGZ1bmN0aW9uKGV4cHIpe1xuICAgIHZhciAgcmF3Z2V0LCBleHQgPSB0aGlzLl9fZXh0X18sIHRvdWNoZWQgPSB7fTtcbiAgICBpZihleHByLnR5cGUgIT09ICdleHByZXNzaW9uJyB8fCBleHByLnRvdWNoZWQpIHJldHVybiBleHByO1xuICAgIHJhd2dldCA9IGV4cHIuZ2V0IHx8IChleHByLmdldCA9IG5ldyBGdW5jdGlvbihfLmN0eE5hbWUsIF8uZXh0TmFtZSAsIF8ucHJlZml4KyBcInJldHVybiAoXCIgKyBleHByLmJvZHkgKyBcIilcIikpO1xuICAgIHRvdWNoZWQuZ2V0ID0gIWV4dD8gcmF3Z2V0OiBmdW5jdGlvbihjb250ZXh0KXtcbiAgICAgIHJldHVybiByYXdnZXQoY29udGV4dCwgZXh0KVxuICAgIH1cblxuICAgIGlmKGV4cHIuc2V0Ym9keSAmJiAhZXhwci5zZXQpe1xuICAgICAgdmFyIHNldGJvZHkgPSBleHByLnNldGJvZHk7XG4gICAgICBleHByLnNldCA9IGZ1bmN0aW9uKGN0eCwgdmFsdWUsIGV4dCl7XG4gICAgICAgIGV4cHIuc2V0ID0gbmV3IEZ1bmN0aW9uKF8uY3R4TmFtZSwgXy5zZXROYW1lICwgXy5leHROYW1lLCBfLnByZWZpeCArIHNldGJvZHkpOyAgICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV4cHIuc2V0KGN0eCwgdmFsdWUsIGV4dCk7XG4gICAgICB9XG4gICAgICBleHByLnNldGJvZHkgPSBudWxsO1xuICAgIH1cbiAgICBpZihleHByLnNldCl7XG4gICAgICB0b3VjaGVkLnNldCA9ICFleHQ/IGV4cHIuc2V0IDogZnVuY3Rpb24oY3R4LCB2YWx1ZSl7XG4gICAgICAgIHJldHVybiBleHByLnNldChjdHgsIHZhbHVlLCBleHQpO1xuICAgICAgfVxuICAgIH1cbiAgICBfLmV4dGVuZCh0b3VjaGVkLCB7XG4gICAgICB0eXBlOiAnZXhwcmVzc2lvbicsXG4gICAgICB0b3VjaGVkOiB0cnVlLFxuICAgICAgb25jZTogZXhwci5vbmNlIHx8IGV4cHIuY29uc3RhbnRcbiAgICB9KVxuICAgIHJldHVybiB0b3VjaGVkXG4gIH0sXG4gIC8vIGZpbmQgZmlsdGVyXG4gIF9mXzogZnVuY3Rpb24obmFtZSl7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgdmFyIGZpbHRlciA9IENvbXBvbmVudC5maWx0ZXIobmFtZSk7XG4gICAgaWYoIWZpbHRlcikgdGhyb3cgJ2ZpbHRlciAnICsgbmFtZSArICcgaXMgdW5kZWZpbmVkJztcbiAgICByZXR1cm4gZmlsdGVyO1xuICB9LFxuICAvLyBzaW1wbGUgYWNjZXNzb3IgZ2V0XG4gIF9zZ186ZnVuY3Rpb24ocGF0aCwgZGVmYXVsdHMsIGV4dCl7XG4gICAgaWYodHlwZW9mIGV4dCAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgLy8gaWYocGF0aCA9PT0gXCJkZW1vc1wiKSAgZGVidWdnZXJcbiAgICAgIHZhciBjb21wdXRlZCA9IHRoaXMuY29tcHV0ZWQsXG4gICAgICAgIGNvbXB1dGVkUHJvcGVydHkgPSBjb21wdXRlZFtwYXRoXTtcbiAgICAgIGlmKGNvbXB1dGVkUHJvcGVydHkpe1xuICAgICAgICBpZihjb21wdXRlZFByb3BlcnR5LnR5cGU9PT0nZXhwcmVzc2lvbicgJiYgIWNvbXB1dGVkUHJvcGVydHkuZ2V0KSB0aGlzLl90b3VjaEV4cHIoY29tcHV0ZWRQcm9wZXJ0eSk7XG4gICAgICAgIGlmKGNvbXB1dGVkUHJvcGVydHkuZ2V0KSAgcmV0dXJuIGNvbXB1dGVkUHJvcGVydHkuZ2V0KHRoaXMpO1xuICAgICAgICBlbHNlIF8ubG9nKFwidGhlIGNvbXB1dGVkICdcIiArIHBhdGggKyBcIicgZG9uJ3QgZGVmaW5lIHRoZSBnZXQgZnVuY3Rpb24sICBnZXQgZGF0YS5cIitwYXRoICsgXCIgYWx0bmF0ZWx5XCIsIFwiZXJyb3JcIilcbiAgICAgIH1cbiAgfVxuICAgIGlmKHR5cGVvZiBkZWZhdWx0cyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgcGF0aCA9PSBcInVuZGVmaW5lZFwiICkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gKGV4dCAmJiB0eXBlb2YgZXh0W3BhdGhdICE9PSAndW5kZWZpbmVkJyk/IGV4dFtwYXRoXTogZGVmYXVsdHNbcGF0aF07XG5cbiAgfSxcbiAgLy8gc2ltcGxlIGFjY2Vzc29yIHNldFxuICBfc3NfOmZ1bmN0aW9uKHBhdGgsIHZhbHVlLCBkYXRhICwgb3AsIGNvbXB1dGVkKXtcbiAgICB2YXIgY29tcHV0ZWQgPSB0aGlzLmNvbXB1dGVkLFxuICAgICAgb3AgPSBvcCB8fCBcIj1cIiwgcHJldiwgXG4gICAgICBjb21wdXRlZFByb3BlcnR5ID0gY29tcHV0ZWQ/IGNvbXB1dGVkW3BhdGhdOm51bGw7XG5cbiAgICBpZihvcCAhPT0gJz0nKXtcbiAgICAgIHByZXYgPSBjb21wdXRlZFByb3BlcnR5PyBjb21wdXRlZFByb3BlcnR5LmdldCh0aGlzKTogZGF0YVtwYXRoXTtcbiAgICAgIHN3aXRjaChvcCl7XG4gICAgICAgIGNhc2UgXCIrPVwiOlxuICAgICAgICAgIHZhbHVlID0gcHJldiArIHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiLT1cIjpcbiAgICAgICAgICB2YWx1ZSA9IHByZXYgLSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIio9XCI6XG4gICAgICAgICAgdmFsdWUgPSBwcmV2ICogdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIvPVwiOlxuICAgICAgICAgIHZhbHVlID0gcHJldiAvIHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiJT1cIjpcbiAgICAgICAgICB2YWx1ZSA9IHByZXYgJSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoY29tcHV0ZWRQcm9wZXJ0eSkge1xuICAgICAgaWYoY29tcHV0ZWRQcm9wZXJ0eS5zZXQpIHJldHVybiBjb21wdXRlZFByb3BlcnR5LnNldCh0aGlzLCB2YWx1ZSk7XG4gICAgICBlbHNlIF8ubG9nKFwidGhlIGNvbXB1dGVkICdcIiArIHBhdGggKyBcIicgZG9uJ3QgZGVmaW5lIHRoZSBzZXQgZnVuY3Rpb24sICBhc3NpZ24gZGF0YS5cIitwYXRoICsgXCIgYWx0bmF0ZWx5XCIsIFwiZXJyb3JcIiApXG4gICAgfVxuICAgIGRhdGFbcGF0aF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn0pO1xuXG5SZWd1bGFyLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbigpe1xuICBfLmxvZyhcInVzZSAkaW5qZWN0IGluc3RlYWQgb2YgaW5qZWN0XCIsIFwiZXJyb3JcIik7XG4gIHJldHVybiB0aGlzLiRpbmplY3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuXG4vLyBvbmx5IG9uZSBidWlsdGluIGZpbHRlclxuXG5SZWd1bGFyLmZpbHRlcihmaWx0ZXIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZ3VsYXI7XG5cblxuXG52YXIgaGFuZGxlQ29tcHV0ZWQgPSAoZnVuY3Rpb24oKXtcbiAgLy8gd3JhcCB0aGUgY29tcHV0ZWQgZ2V0dGVyO1xuICBmdW5jdGlvbiB3cmFwR2V0KGdldCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRleHQpe1xuICAgICAgcmV0dXJuIGdldC5jYWxsKGNvbnRleHQsIGNvbnRleHQuZGF0YSApO1xuICAgIH1cbiAgfVxuICAvLyB3cmFwIHRoZSBjb21wdXRlZCBzZXR0ZXI7XG4gIGZ1bmN0aW9uIHdyYXBTZXQoc2V0KXtcbiAgICByZXR1cm4gZnVuY3Rpb24oY29udGV4dCwgdmFsdWUpe1xuICAgICAgc2V0LmNhbGwoIGNvbnRleHQsIHZhbHVlLCBjb250ZXh0LmRhdGEgKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oY29tcHV0ZWQpe1xuICAgIGlmKCFjb21wdXRlZCkgcmV0dXJuO1xuICAgIHZhciBwYXJzZWRDb21wdXRlZCA9IHt9LCBoYW5kbGUsIHBhaXIsIHR5cGU7XG4gICAgZm9yKHZhciBpIGluIGNvbXB1dGVkKXtcbiAgICAgIGhhbmRsZSA9IGNvbXB1dGVkW2ldXG4gICAgICB0eXBlID0gdHlwZW9mIGhhbmRsZTtcblxuICAgICAgaWYoaGFuZGxlLnR5cGUgPT09ICdleHByZXNzaW9uJyl7XG4gICAgICAgIHBhcnNlZENvbXB1dGVkW2ldID0gaGFuZGxlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmKCB0eXBlID09PSBcInN0cmluZ1wiICl7XG4gICAgICAgIHBhcnNlZENvbXB1dGVkW2ldID0gcGFyc2UuZXhwcmVzc2lvbihoYW5kbGUpXG4gICAgICB9ZWxzZXtcbiAgICAgICAgcGFpciA9IHBhcnNlZENvbXB1dGVkW2ldID0ge3R5cGU6ICdleHByZXNzaW9uJ307XG4gICAgICAgIGlmKHR5cGUgPT09IFwiZnVuY3Rpb25cIiApe1xuICAgICAgICAgIHBhaXIuZ2V0ID0gd3JhcEdldChoYW5kbGUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBpZihoYW5kbGUuZ2V0KSBwYWlyLmdldCA9IHdyYXBHZXQoaGFuZGxlLmdldCk7XG4gICAgICAgICAgaWYoaGFuZGxlLnNldCkgcGFpci5zZXQgPSB3cmFwU2V0KGhhbmRsZS5zZXQpO1xuICAgICAgICB9XG4gICAgICB9IFxuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkQ29tcHV0ZWQ7XG4gIH1cbn0pKCk7XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuJ0JFR0lOJzogJ3snLFxuJ0VORCc6ICd9J1xufSIsInZhciAvLyBwYWNrYWdlc1xuICBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIiksXG4gYW5pbWF0ZSA9IHJlcXVpcmUoXCIuLi9oZWxwZXIvYW5pbWF0ZS5qc1wiKSxcbiBkb20gPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpLFxuIFJlZ3VsYXIgPSByZXF1aXJlKFwiLi4vUmVndWxhci5qc1wiKTtcblxuXG52YXIgLy8gdmFyaWFibGVzXG4gIHJDbGFzc05hbWUgPSAvXlstXFx3XSsoXFxzWy1cXHddKykqJC8sXG4gIHJDb21tYVNlcCA9IC9bXFxyXFxuXFxmIF0qLFtcXHJcXG5cXGYgXSooPz1cXHcrXFw6KS8sIC8vICBkb250IHNwbGl0IGNvbW1hIGluICBFeHByZXNzaW9uXG4gIHJTdHlsZXMgPSAvXlxcey4qXFx9JC8sIC8vICBmb3IgU2ltcGlsZnlcbiAgclNwYWNlID0gL1xccysvLCAvLyAgZm9yIFNpbXBpbGZ5XG4gIFdIRU5fQ09NTUFORCA9IFwid2hlblwiLFxuICBFVkVOVF9DT01NQU5EID0gXCJvblwiLFxuICBUSEVOX0NPTU1BTkQgPSBcInRoZW5cIjtcblxuLyoqXG4gKiBBbmltYXRpb24gUGx1Z2luXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gQ29tcG9uZW50IFxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlU2VlZCh0eXBlKXtcblxuICB2YXIgc3RlcHMgPSBbXSwgY3VycmVudCA9IDAsIGNhbGxiYWNrID0gXy5ub29wO1xuICB2YXIga2V5O1xuXG4gIHZhciBvdXQgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBzdGFydDogZnVuY3Rpb24oY2Ipe1xuICAgICAga2V5ID0gXy51aWQoKTtcbiAgICAgIGlmKHR5cGVvZiBjYiA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayA9IGNiO1xuICAgICAgaWYoY3VycmVudD4gMCApe1xuICAgICAgICBjdXJyZW50ID0gMCA7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgb3V0LnN0ZXAoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXQuY29tcGVsZXRlO1xuICAgIH0sXG4gICAgY29tcGVsZXRlOiBmdW5jdGlvbigpe1xuICAgICAga2V5ID0gbnVsbDtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICBjYWxsYmFjayA9IF8ubm9vcDtcbiAgICAgIGN1cnJlbnQgPSAwO1xuICAgIH0sXG4gICAgc3RlcDogZnVuY3Rpb24oKXtcbiAgICAgIGlmKHN0ZXBzW2N1cnJlbnRdKSBzdGVwc1tjdXJyZW50IF0oIG91dC5kb25lLmJpbmQob3V0LCBrZXkpICk7XG4gICAgfSxcbiAgICBkb25lOiBmdW5jdGlvbihwa2V5KXtcbiAgICAgIGlmKHBrZXkgIT09IGtleSkgcmV0dXJuOyAvLyBtZWFucyB0aGUgbG9vcCBpcyBkb3duXG4gICAgICBpZiggY3VycmVudCA8IHN0ZXBzLmxlbmd0aCAtIDEgKSB7XG4gICAgICAgIGN1cnJlbnQrKztcbiAgICAgICAgb3V0LnN0ZXAoKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBvdXQuY29tcGVsZXRlKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwdXNoOiBmdW5jdGlvbihzdGVwKXtcbiAgICAgIHN0ZXBzLnB1c2goc3RlcClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuXG5SZWd1bGFyLl9hZGRQcm90b0luaGVyaXRDYWNoZShcImFuaW1hdGlvblwiKVxuXG5cbi8vIGJ1aWx0aW4gYW5pbWF0aW9uXG5SZWd1bGFyLmFuaW1hdGlvbih7XG4gIFwid2FpdFwiOiBmdW5jdGlvbiggc3RlcCApe1xuICAgIHZhciB0aW1lb3V0ID0gcGFyc2VJbnQoIHN0ZXAucGFyYW0gKSB8fCAwXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgLy8gXy5sb2coXCJkZWxheSBcIiArIHRpbWVvdXQpXG4gICAgICBzZXRUaW1lb3V0KCBkb25lLCB0aW1lb3V0ICk7XG4gICAgfVxuICB9LFxuICBcImNsYXNzXCI6IGZ1bmN0aW9uKHN0ZXApe1xuICAgIHZhciB0bXAgPSBzdGVwLnBhcmFtLnNwbGl0KFwiLFwiKSxcbiAgICAgIGNsYXNzTmFtZSA9IHRtcFswXSB8fCBcIlwiLFxuICAgICAgbW9kZSA9IHBhcnNlSW50KHRtcFsxXSkgfHwgMTtcblxuICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcbiAgICAgIC8vIF8ubG9nKGNsYXNzTmFtZSlcbiAgICAgIGFuaW1hdGUuc3RhcnRDbGFzc0FuaW1hdGUoIHN0ZXAuZWxlbWVudCwgY2xhc3NOYW1lICwgZG9uZSwgbW9kZSApO1xuICAgIH1cbiAgfSxcbiAgXCJjYWxsXCI6IGZ1bmN0aW9uKHN0ZXApe1xuICAgIHZhciBmbiA9IHRoaXMuJGV4cHJlc3Npb24oc3RlcC5wYXJhbSkuZ2V0LCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oZG9uZSl7XG4gICAgICAvLyBfLmxvZyhzdGVwLnBhcmFtLCAnY2FsbCcpXG4gICAgICBmbihzZWxmKTtcbiAgICAgIHNlbGYuJHVwZGF0ZSgpO1xuICAgICAgZG9uZSgpXG4gICAgfVxuICB9LFxuICBcImVtaXRcIjogZnVuY3Rpb24oc3RlcCl7XG4gICAgdmFyIHBhcmFtID0gc3RlcC5wYXJhbTtcbiAgICB2YXIgdG1wID0gcGFyYW0uc3BsaXQoXCIsXCIpLFxuICAgICAgZXZ0ID0gdG1wWzBdIHx8IFwiXCIsXG4gICAgICBhcmdzID0gdG1wWzFdPyB0aGlzLiRleHByZXNzaW9uKHRtcFsxXSkuZ2V0OiBudWxsO1xuXG4gICAgaWYoIWV2dCkgdGhyb3cgXCJ5b3Ugc2hvdWQgc3BlY2lmaWVkIGEgZXZlbnRuYW1lIGluIGVtaXQgY29tbWFuZFwiO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcbiAgICAgIHNlbGYuJGVtaXQoZXZ0LCBhcmdzPyBhcmdzKHNlbGYpIDogdW5kZWZpbmVkKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH0sXG4gIC8vIHN0eWxlOiBsZWZ0IHsxMH1weCxcbiAgc3R5bGU6IGZ1bmN0aW9uKHN0ZXApe1xuICAgIHZhciBzdHlsZXMgPSB7fSwgXG4gICAgICBwYXJhbSA9IHN0ZXAucGFyYW0sXG4gICAgICBwYWlycyA9IHBhcmFtLnNwbGl0KFwiLFwiKSwgdmFsaWQ7XG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihwYWlyKXtcbiAgICAgIHBhaXIgPSBwYWlyLnRyaW0oKTtcbiAgICAgIGlmKHBhaXIpe1xuICAgICAgICB2YXIgdG1wID0gcGFpci5zcGxpdCggclNwYWNlICksXG4gICAgICAgICAgbmFtZSA9IHRtcC5zaGlmdCgpLFxuICAgICAgICAgIHZhbHVlID0gdG1wLmpvaW4oXCIgXCIpO1xuXG4gICAgICAgIGlmKCAhbmFtZSB8fCAhdmFsdWUgKSB0aHJvdyBcImludmFsaWQgc3R5bGUgaW4gY29tbWFuZDogc3R5bGVcIjtcbiAgICAgICAgc3R5bGVzW25hbWVdID0gdmFsdWU7XG4gICAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgaWYodmFsaWQpe1xuICAgICAgICBhbmltYXRlLnN0YXJ0U3R5bGVBbmltYXRlKHN0ZXAuZWxlbWVudCwgc3R5bGVzLCBkb25lKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5cblxuLy8gaGFuY2RsZSB0aGUgci1hbmltYXRpb24gZGlyZWN0aXZlXG4vLyBlbCA6IHRoZSBlbGVtZW50IHRvIHByb2Nlc3Ncbi8vIHZhbHVlOiB0aGUgZGlyZWN0aXZlIHZhbHVlXG5mdW5jdGlvbiBwcm9jZXNzQW5pbWF0ZSggZWxlbWVudCwgdmFsdWUgKXtcbiAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG5cbiAgdmFyIGNvbXBvc2l0ZXMgPSB2YWx1ZS5zcGxpdChcIjtcIiksIFxuICAgIGNvbXBvc2l0ZSwgY29udGV4dCA9IHRoaXMsIHNlZWRzID0gW10sIHNlZWQsIGRlc3Ryb2llcyA9IFtdLCBkZXN0cm95LFxuICAgIGNvbW1hbmQsIHBhcmFtICwgY3VycmVudCA9IDAsIHRtcCwgYW5pbWF0b3IsIHNlbGYgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIHJlc2V0KCB0eXBlICl7XG4gICAgc2VlZCAmJiBzZWVkcy5wdXNoKCBzZWVkIClcbiAgICBzZWVkID0gY3JlYXRlU2VlZCggdHlwZSApO1xuICB9XG5cbiAgZnVuY3Rpb24gd2hlbkNhbGxiYWNrKHN0YXJ0LCB2YWx1ZSl7XG4gICAgaWYoICEhdmFsdWUgKSBzdGFydCgpXG4gIH1cblxuICBmdW5jdGlvbiBhbmltYXRpb25EZXN0cm95KGVsZW1lbnQpe1xuICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgZGVsZXRlIGVsZW1lbnQub25lbnRlcjtcbiAgICAgIGRlbGV0ZSBlbGVtZW50Lm9ubGVhdmU7XG4gICAgfSBcbiAgfVxuXG4gIGZvciggdmFyIGkgPSAwLCBsZW4gPSBjb21wb3NpdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICl7XG5cbiAgICBjb21wb3NpdGUgPSBjb21wb3NpdGVzW2ldO1xuICAgIHRtcCA9IGNvbXBvc2l0ZS5zcGxpdChcIjpcIik7XG4gICAgY29tbWFuZCA9IHRtcFswXSAmJiB0bXBbMF0udHJpbSgpO1xuICAgIHBhcmFtID0gdG1wWzFdICYmIHRtcFsxXS50cmltKCk7XG5cbiAgICBpZiggIWNvbW1hbmQgKSBjb250aW51ZTtcblxuICAgIGlmKCBjb21tYW5kID09PSBXSEVOX0NPTU1BTkQgKXtcbiAgICAgIHJlc2V0KFwid2hlblwiKTtcbiAgICAgIHRoaXMuJHdhdGNoKHBhcmFtLCB3aGVuQ2FsbGJhY2suYmluZCggdGhpcywgc2VlZC5zdGFydCApICk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiggY29tbWFuZCA9PT0gRVZFTlRfQ09NTUFORCl7XG4gICAgICByZXNldChwYXJhbSk7XG4gICAgICBpZiggcGFyYW0gPT09IFwibGVhdmVcIiApe1xuICAgICAgICBlbGVtZW50Lm9ubGVhdmUgPSBzZWVkLnN0YXJ0O1xuICAgICAgICBkZXN0cm9pZXMucHVzaCggYW5pbWF0aW9uRGVzdHJveShlbGVtZW50KSApO1xuICAgICAgfWVsc2UgaWYoIHBhcmFtID09PSBcImVudGVyXCIgKXtcbiAgICAgICAgZWxlbWVudC5vbmVudGVyID0gc2VlZC5zdGFydDtcbiAgICAgICAgZGVzdHJvaWVzLnB1c2goIGFuaW1hdGlvbkRlc3Ryb3koZWxlbWVudCkgKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBpZiggKFwib25cIiArIHBhcmFtKSBpbiBlbGVtZW50KXsgLy8gaWYgZG9tIGhhdmUgdGhlIGV2ZW50ICwgd2UgdXNlIGRvbSBldmVudFxuICAgICAgICAgIGRlc3Ryb2llcy5wdXNoKHRoaXMuX2hhbmRsZUV2ZW50KCBlbGVtZW50LCBwYXJhbSwgc2VlZC5zdGFydCApKTtcbiAgICAgICAgfWVsc2V7IC8vIG90aGVyd2lzZSwgd2UgdXNlIGNvbXBvbmVudCBldmVudFxuICAgICAgICAgIHRoaXMuJG9uKHBhcmFtLCBzZWVkLnN0YXJ0KTtcbiAgICAgICAgICBkZXN0cm9pZXMucHVzaCh0aGlzLiRvZmYuYmluZCh0aGlzLCBwYXJhbSwgc2VlZC5zdGFydCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHZhciBhbmltYXRvciA9ICBSZWd1bGFyLmFuaW1hdGlvbihjb21tYW5kKSBcbiAgICBpZiggYW5pbWF0b3IgJiYgc2VlZCApe1xuICAgICAgc2VlZC5wdXNoKFxuICAgICAgICBhbmltYXRvci5jYWxsKHRoaXMse1xuICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgZG9uZTogc2VlZC5kb25lLFxuICAgICAgICAgIHBhcmFtOiBwYXJhbSBcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9ZWxzZXtcbiAgICAgIHRocm93IFwieW91IG5lZWQgc3RhcnQgd2l0aCBgb25gIG9yIGBldmVudGAgaW4gci1hbmltYXRpb25cIjtcbiAgICB9XG4gIH1cblxuICBpZihkZXN0cm9pZXMubGVuZ3RoKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgIGRlc3Ryb2llcy5mb3JFYWNoKGZ1bmN0aW9uKGRlc3Ryb3kpe1xuICAgICAgICBkZXN0cm95KCk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5cblJlZ3VsYXIuZGlyZWN0aXZlKCBcInItYW5pbWF0aW9uXCIsIHByb2Nlc3NBbmltYXRlKVxuUmVndWxhci5kaXJlY3RpdmUoIFwici1zZXF1ZW5jZVwiLCBwcm9jZXNzQW5pbWF0ZSlcblxuIiwiLy8gUmVndWxhclxudmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpO1xudmFyIGFuaW1hdGUgPSByZXF1aXJlKFwiLi4vaGVscGVyL2FuaW1hdGUuanNcIik7XG52YXIgUmVndWxhciA9IHJlcXVpcmUoXCIuLi9SZWd1bGFyLmpzXCIpO1xuXG5cblxucmVxdWlyZShcIi4vZXZlbnQuanNcIik7XG5yZXF1aXJlKFwiLi9mb3JtLmpzXCIpO1xuXG5cbi8vICoqd2FybioqOiBjbGFzcyBpbnRlcGxhdGlvbiB3aWxsIG92ZXJyaWRlIHRoaXMgZGlyZWN0aXZlIFxuXG5SZWd1bGFyLmRpcmVjdGl2ZSgnci1jbGFzcycsIGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcbiAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWx1ZSl7XG4gICAgdmFyIGNsYXNzTmFtZSA9ICcgJysgZWxlbS5jbGFzc05hbWUucmVwbGFjZSgvXFxzKy9nLCAnICcpICsnICc7XG4gICAgZm9yKHZhciBpIGluIG52YWx1ZSkgaWYobnZhbHVlLmhhc093blByb3BlcnR5KGkpKXtcbiAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5yZXBsYWNlKCcgJyArIGkgKyAnICcsJyAnKTtcbiAgICAgIGlmKG52YWx1ZVtpXSA9PT0gdHJ1ZSl7XG4gICAgICAgIGNsYXNzTmFtZSArPSBpKycgJztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICB9LHRydWUpO1xuXG59KTtcblxuLy8gKip3YXJuKio6IHN0eWxlIGludGVwbGF0aW9uIHdpbGwgb3ZlcnJpZGUgdGhpcyBkaXJlY3RpdmUgXG5cblJlZ3VsYXIuZGlyZWN0aXZlKCdyLXN0eWxlJywgZnVuY3Rpb24oZWxlbSwgdmFsdWUpe1xuICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlKXtcbiAgICBmb3IodmFyIGkgaW4gbnZhbHVlKSBpZihudmFsdWUuaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgZG9tLmNzcyhlbGVtLCBpLCBudmFsdWVbaV0pO1xuICAgIH1cbiAgfSx0cnVlKTtcbn0pO1xuXG4vLyB3aGVuIGV4cHJlc3Npb24gaXMgZXZhbHVhdGUgdG8gdHJ1ZSwgdGhlIGVsZW0gd2lsbCBhZGQgZGlzcGxheTpub25lXG4vLyBFeGFtcGxlOiA8ZGl2IHItaGlkZT17e2l0ZW1zLmxlbmd0aCA+IDB9fT48L2Rpdj5cblxuUmVndWxhci5kaXJlY3RpdmUoJ3ItaGlkZScsIGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcbiAgdmFyIHByZUJvb2wgPSBudWxsLCBjb21wZWxldGU7XG4gIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbihudmFsdWUpe1xuICAgIHZhciBib29sID0gISFudmFsdWU7XG4gICAgaWYoYm9vbCA9PT0gcHJlQm9vbCkgcmV0dXJuOyBcbiAgICBwcmVCb29sID0gYm9vbDtcbiAgICBpZihib29sKXtcbiAgICAgIGlmKGVsZW0ub25sZWF2ZSl7XG4gICAgICAgIGNvbXBlbGV0ZSA9IGVsZW0ub25sZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgICAgICAgY29tcGVsZXRlID0gbnVsbDtcbiAgICAgICAgfSlcbiAgICAgIH1lbHNle1xuICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgfVxuICAgICAgXG4gICAgfWVsc2V7XG4gICAgICBpZihjb21wZWxldGUpIGNvbXBlbGV0ZSgpO1xuICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgIGlmKGVsZW0ub25lbnRlcil7XG4gICAgICAgIGVsZW0ub25lbnRlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbn0pO1xuXG4vLyB1bmVzY2FwZWQgaW50ZXBsYXRpb24uIHhzcyBpcyBub3QgYmUgcHJvdGVjdFxuUmVndWxhci5kaXJlY3RpdmUoJ3ItaHRtbCcsIGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcbiAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWx1ZSl7XG4gICAgbnZhbHVlID0gbnZhbHVlIHx8IFwiXCI7XG4gICAgZG9tLmh0bWwoZWxlbSwgbnZhbHVlKVxuICB9LCB7Zm9yY2U6IHRydWV9KTtcbn0pO1xuXG5cblxuXG5cblxuXG5cblxuIiwiLyoqXG4gKiBldmVudCBkaXJlY3RpdmUgIGJ1bmRsZVxuICpcbiAqL1xudmFyIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpO1xudmFyIFJlZ3VsYXIgPSByZXF1aXJlKFwiLi4vUmVndWxhci5qc1wiKTtcblxuUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUoXCJldmVudFwiKTtcblxuUmVndWxhci5ldmVudChcImVudGVyXCIsIGZ1bmN0aW9uKGVsZW0sIGZpcmUpIHtcbiAgXy5sb2coXCJvbi1lbnRlciB3aWxsIGJlIHJlbW92ZWQgaW4gMC40LjBcIiwgXCJlcnJvclwiKTtcbiAgZnVuY3Rpb24gdXBkYXRlKCBldiApIHtcbiAgICBpZiAoIGV2LndoaWNoID09PSAxMyApIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBmaXJlKGV2KTtcbiAgICB9XG4gIH1cbiAgZG9tLm9uKCBlbGVtLCBcImtleXByZXNzXCIsIHVwZGF0ZSApO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBkb20ub2ZmKCBlbGVtLCBcImtleXByZXNzXCIsIHVwZGF0ZSApO1xuICB9XG59KVxuXG5cblJlZ3VsYXIuZGlyZWN0aXZlKCAvXm9uLVxcdyskLywgZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICwgYXR0cnMpIHtcbiAgaWYgKCAhbmFtZSB8fCAhdmFsdWUgKSByZXR1cm47XG4gIHZhciB0eXBlID0gbmFtZS5zcGxpdChcIi1cIilbMV07XG4gIHJldHVybiB0aGlzLl9oYW5kbGVFdmVudCggZWxlbSwgdHlwZSwgdmFsdWUsIGF0dHJzICk7XG59KTtcbi8vIFRPRE8uXG4vKipcbi0gJCgnZHgnKS5kZWxlZ2F0ZSgpXG4qL1xuUmVndWxhci5kaXJlY3RpdmUoIC9eZGVsZWdhdGUtXFx3KyQvLCBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUsIGF0dHJzICkge1xuICB2YXIgcm9vdCA9IHRoaXMuJHJvb3Q7XG4gIHZhciBfZGVsZWdhdGVzID0gcm9vdC5fZGVsZWdhdGVzIHx8ICggcm9vdC5fZGVsZWdhdGVzID0ge30gKTtcbiAgaWYgKCAhbmFtZSB8fCAhdmFsdWUgKSByZXR1cm47XG4gIHZhciB0eXBlID0gbmFtZS5zcGxpdChcIi1cIilbMV07XG4gIHZhciBmaXJlID0gXy5oYW5kbGVFdmVudC5jYWxsKHRoaXMsIHZhbHVlLCB0eXBlKTtcblxuICBmdW5jdGlvbiBkZWxlZ2F0ZUV2ZW50KGV2KXtcbiAgICBtYXRjaFBhcmVudChldiwgX2RlbGVnYXRlc1t0eXBlXSk7XG4gIH1cblxuICBpZiggIV9kZWxlZ2F0ZXNbdHlwZV0gKXtcbiAgICBfZGVsZWdhdGVzW3R5cGVdID0gW107XG5cbiAgICByb290LiRvbiggXCIkaW5qZWN0XCIsIGZ1bmN0aW9uKCBuZXdQYXJlbnQgKXtcbiAgICAgIHZhciBwcmVQYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgICBpZiggcHJlUGFyZW50ICl7XG4gICAgICAgIGRvbS5vZmYocHJlUGFyZW50LCB0eXBlLCBkZWxlZ2F0ZUV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGRvbS5vbihuZXdQYXJlbnQsIHR5cGUsIGRlbGVnYXRlRXZlbnQpO1xuICAgIH0pXG5cbiAgICByb290LiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uKCl7XG4gICAgICBpZihyb290LnBhcmVudE5vZGUpIGRvbS5vZmYocm9vdC5wYXJlbnROb2RlLCB0eXBlLCBkZWxlZ2F0ZUV2ZW50KVxuICAgICAgcm9vdC5fZGVsZWdhdGVzW3R5cGVdID0gbnVsbDtcbiAgICB9KVxuICB9XG4gIHZhciBkZWxlZ2F0ZSA9IHtcbiAgICBlbGVtZW50OiBlbGVtLFxuICAgIGZpcmU6IGZpcmVcbiAgfVxuICBfZGVsZWdhdGVzW3R5cGVdLnB1c2goIGRlbGVnYXRlICk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGRlbGVnYXRlcyA9IF9kZWxlZ2F0ZXNbdHlwZV07XG4gICAgaWYoIWRlbGVnYXRlcyB8fCAhZGVsZWdhdGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGZvciggdmFyIGkgPSAwLCBsZW4gPSBkZWxlZ2F0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcbiAgICAgIGlmKCBkZWxlZ2F0ZXNbaV0gPT09IGRlbGVnYXRlICkgZGVsZWdhdGVzLnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH1cblxufSk7XG5cblxuZnVuY3Rpb24gbWF0Y2hQYXJlbnQoZXYgLCBkZWxlZ2F0ZXMpe1xuICB2YXIgdGFyZ2V0ID0gZXYudGFyZ2V0O1xuICB3aGlsZSh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBkb20uZG9jKXtcbiAgICBmb3IoIHZhciBpID0gMCwgbGVuID0gZGVsZWdhdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICl7XG4gICAgICBpZihkZWxlZ2F0ZXNbaV0uZWxlbWVudCA9PT0gdGFyZ2V0KXtcbiAgICAgICAgZGVsZWdhdGVzW2ldLmZpcmUoZXYpO1xuICAgICAgfVxuICAgIH1cbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfVxufSIsIi8vIFJlZ3VsYXJcbnZhciBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2RvbS5qc1wiKTtcbnZhciBSZWd1bGFyID0gcmVxdWlyZShcIi4uL1JlZ3VsYXIuanNcIik7XG5cbnZhciBtb2RlbEhhbmRsZXJzID0ge1xuICBcInRleHRcIjogaW5pdFRleHQsXG4gIFwic2VsZWN0XCI6IGluaXRTZWxlY3QsXG4gIFwiY2hlY2tib3hcIjogaW5pdENoZWNrQm94LFxuICBcInJhZGlvXCI6IGluaXRSYWRpb1xufVxuXG5cbi8vIEBUT0RPXG5cblxuLy8gdHdvLXdheSBiaW5kaW5nIHdpdGggci1tb2RlbFxuLy8gd29ya3Mgb24gaW5wdXQsIHRleHRhcmVhLCBjaGVja2JveCwgcmFkaW8sIHNlbGVjdFxuXG5SZWd1bGFyLmRpcmVjdGl2ZShcInItbW9kZWxcIiwgZnVuY3Rpb24oZWxlbSwgdmFsdWUpe1xuICB2YXIgdGFnID0gZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBzaWduID0gdGFnO1xuICBpZihzaWduID09PSBcImlucHV0XCIpIHNpZ24gPSBlbGVtLnR5cGUgfHwgXCJ0ZXh0XCI7XG4gIGVsc2UgaWYoc2lnbiA9PT0gXCJ0ZXh0YXJlYVwiKSBzaWduID0gXCJ0ZXh0XCI7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgdmFsdWUgPSB0aGlzLiRleHByZXNzaW9uKHZhbHVlKTtcblxuICBpZiggbW9kZWxIYW5kbGVyc1tzaWduXSApIHJldHVybiBtb2RlbEhhbmRsZXJzW3NpZ25dLmNhbGwodGhpcywgZWxlbSwgdmFsdWUpO1xuICBlbHNlIGlmKHRhZyA9PT0gXCJpbnB1dFwiKXtcbiAgICByZXR1cm4gbW9kZWxIYW5kbGVycy50ZXh0LmNhbGwodGhpcywgZWxlbSwgdmFsdWUpO1xuICB9XG59KTtcblxuXG5cbi8vIGJpbmRpbmcgPHNlbGVjdD5cblxuZnVuY3Rpb24gaW5pdFNlbGVjdCggZWxlbSwgcGFyc2VkKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgd2MgPXRoaXMuJHdhdGNoKHBhcnNlZCwgZnVuY3Rpb24obmV3VmFsdWUpe1xuICAgIHZhciBjaGlsZHJlbiA9IF8uc2xpY2UoZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJykpXG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihub2RlLCBpbmRleCl7XG4gICAgICBpZihub2RlLnZhbHVlID09IG5ld1ZhbHVlKXtcbiAgICAgICAgZWxlbS5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfSlcbiAgfSk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlcigpe1xuICAgIHBhcnNlZC5zZXQoc2VsZiwgdGhpcy52YWx1ZSk7XG4gICAgd2MubGFzdCA9IHRoaXMudmFsdWU7XG4gICAgc2VsZi4kdXBkYXRlKCk7XG4gIH1cblxuICBkb20ub24oZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcik7XG4gIFxuICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQgJiYgZWxlbS52YWx1ZSl7XG4gICAgIHBhcnNlZC5zZXQoc2VsZiwgZWxlbS52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIGRlc3Ryb3koKXtcbiAgICBkb20ub2ZmKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xuICB9XG59XG5cbi8vIGlucHV0LHRleHRhcmVhIGJpbmRpbmdcblxuZnVuY3Rpb24gaW5pdFRleHQoZWxlbSwgcGFyc2VkKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgd2MgPSB0aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKG5ld1ZhbHVlKXtcbiAgICBpZihlbGVtLnZhbHVlICE9PSBuZXdWYWx1ZSkgZWxlbS52YWx1ZSA9IG5ld1ZhbHVlID09IG51bGw/IFwiXCI6IFwiXCIgKyBuZXdWYWx1ZTtcbiAgfSk7XG5cbiAgLy8gQFRPRE8gdG8gZml4ZWQgZXZlbnRcbiAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyKGV2KXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgaWYoZXYudHlwZT09PSdjdXQnIHx8IGV2LnR5cGU9PT0ncGFzdGUnKXtcbiAgICAgIF8ubmV4dFRpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhhdC52YWx1ZVxuICAgICAgICBwYXJzZWQuc2V0KHNlbGYsIHZhbHVlKTtcbiAgICAgICAgd2MubGFzdCA9IHZhbHVlO1xuICAgICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICAgIH0pXG4gICAgfWVsc2V7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoYXQudmFsdWVcbiAgICAgICAgcGFyc2VkLnNldChzZWxmLCB2YWx1ZSk7XG4gICAgICAgIHdjLmxhc3QgPSB2YWx1ZTtcbiAgICAgICAgc2VsZi4kdXBkYXRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGlmKGRvbS5tc2llICE9PSA5ICYmIFwib25pbnB1dFwiIGluIGRvbS50Tm9kZSApe1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZXIgKTtcbiAgfWVsc2V7XG4gICAgZG9tLm9uKGVsZW0sIFwicGFzdGVcIiwgaGFuZGxlcilcbiAgICBkb20ub24oZWxlbSwgXCJrZXl1cFwiLCBoYW5kbGVyKVxuICAgIGRvbS5vbihlbGVtLCBcImN1dFwiLCBoYW5kbGVyKVxuICAgIGRvbS5vbihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxuICB9XG4gIGlmKHBhcnNlZC5nZXQoc2VsZikgPT09IHVuZGVmaW5lZCAmJiBlbGVtLnZhbHVlKXtcbiAgICAgcGFyc2VkLnNldChzZWxmLCBlbGVtLnZhbHVlKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gZGVzdHJveSgpe1xuICAgIGlmKGRvbS5tc2llICE9PSA5ICYmIFwib25pbnB1dFwiIGluIGRvbS50Tm9kZSApe1xuICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgaGFuZGxlciApO1xuICAgIH1lbHNle1xuICAgICAgZG9tLm9mZihlbGVtLCBcInBhc3RlXCIsIGhhbmRsZXIpXG4gICAgICBkb20ub2ZmKGVsZW0sIFwia2V5dXBcIiwgaGFuZGxlcilcbiAgICAgIGRvbS5vZmYoZWxlbSwgXCJjdXRcIiwgaGFuZGxlcilcbiAgICAgIGRvbS5vZmYoZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcilcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBpbnB1dDpjaGVja2JveCAgYmluZGluZ1xuXG5mdW5jdGlvbiBpbml0Q2hlY2tCb3goZWxlbSwgcGFyc2VkKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgd2F0Y2hlciA9IHRoaXMuJHdhdGNoKHBhcnNlZCwgZnVuY3Rpb24obmV3VmFsdWUpe1xuICAgIGRvbS5hdHRyKGVsZW0sICdjaGVja2VkJywgISFuZXdWYWx1ZSk7XG4gIH0pO1xuXG4gIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlcigpe1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuY2hlY2tlZDtcbiAgICBwYXJzZWQuc2V0KHNlbGYsIHZhbHVlKTtcbiAgICB3YXRjaGVyLmxhc3QgPSB2YWx1ZTtcbiAgICBzZWxmLiR1cGRhdGUoKTtcbiAgfVxuICBpZihwYXJzZWQuc2V0KSBkb20ub24oZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcilcblxuICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQpe1xuICAgIHBhcnNlZC5zZXQoc2VsZiwgISFlbGVtLmNoZWNrZWQpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGRlc3Ryb3koKXtcbiAgICBpZihwYXJzZWQuc2V0KSBkb20ub2ZmKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG4gIH1cbn1cblxuXG4vLyBpbnB1dDpyYWRpbyBiaW5kaW5nXG5cbmZ1bmN0aW9uIGluaXRSYWRpbyhlbGVtLCBwYXJzZWQpe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB3YyA9IHRoaXMuJHdhdGNoKHBhcnNlZCwgZnVuY3Rpb24oIG5ld1ZhbHVlICl7XG4gICAgaWYobmV3VmFsdWUgPT0gZWxlbS52YWx1ZSkgZWxlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICBlbHNlIGVsZW0uY2hlY2tlZCA9IGZhbHNlO1xuICB9KTtcblxuXG4gIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlcigpe1xuICAgIHZhciB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgcGFyc2VkLnNldChzZWxmLCB2YWx1ZSk7XG4gICAgc2VsZi4kdXBkYXRlKCk7XG4gIH1cbiAgaWYocGFyc2VkLnNldCkgZG9tLm9uKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpXG4gIC8vIGJlYWN1c2Ugb25seSBhZnRlciBjb21waWxlKGluaXQpLCB0aGUgZG9tIHN0cnVjdHJ1ZSBpcyBleHNpdC4gXG4gIGlmKHBhcnNlZC5nZXQoc2VsZikgPT09IHVuZGVmaW5lZCl7XG4gICAgaWYoZWxlbS5jaGVja2VkKSB7XG4gICAgICBwYXJzZWQuc2V0KHNlbGYsIGVsZW0udmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBkZXN0cm95KCl7XG4gICAgaWYocGFyc2VkLnNldCkgZG9tLm9mZihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxuICB9XG59XG4iLCJcbi8vIHRoYW5rcyBmb3IgYW5ndWxhciAmJiBtb290b29scyBmb3Igc29tZSBjb25jaXNlJmNyb3NzLXBsYXRmb3JtICBpbXBsZW1lbnRpb25cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gVGhlIE1JVCBMaWNlbnNlXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxNCBHb29nbGUsIEluYy4gaHR0cDovL2FuZ3VsYXJqcy5vcmdcblxuLy8gLS0tXG4vLyBsaWNlbnNlOiBNSVQtc3R5bGUgbGljZW5zZS4gaHR0cDovL21vb3Rvb2xzLm5ldFxuXG5cbnZhciBkb20gPSBtb2R1bGUuZXhwb3J0cztcbnZhciBlbnYgPSByZXF1aXJlKFwiLi9lbnYuanNcIik7XG52YXIgXyA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxudmFyIGFkZEV2ZW50LCByZW1vdmVFdmVudDtcbnZhciBub29wID0gZnVuY3Rpb24oKXt9XG5cbnZhciBuYW1lc3BhY2VzID0ge1xuICBodG1sOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIixcbiAgc3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbn1cblxuZG9tLmJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG5kb20uZG9jID0gZG9jdW1lbnQ7XG5cbi8vIGNhbWVsQ2FzZVxuZnVuY3Rpb24gY2FtZWxDYXNlKHN0cil7XG4gIHJldHVybiAoXCJcIiArIHN0cikucmVwbGFjZSgvLVxcRC9nLCBmdW5jdGlvbihtYXRjaCl7XG4gICAgcmV0dXJuIG1hdGNoLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xuICB9KTtcbn1cblxuXG5kb20udE5vZGUgPSB0Tm9kZTtcblxuaWYodE5vZGUuYWRkRXZlbnRMaXN0ZW5lcil7XG4gIGFkZEV2ZW50ID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgZm4pIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKTtcbiAgfVxuICByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKG5vZGUsIHR5cGUsIGZuKSB7XG4gICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSkgXG4gIH1cbn1lbHNle1xuICBhZGRFdmVudCA9IGZ1bmN0aW9uKG5vZGUsIHR5cGUsIGZuKSB7XG4gICAgbm9kZS5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgZm4pO1xuICB9XG4gIHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgZm4pIHtcbiAgICBub2RlLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBmbik7IFxuICB9XG59XG5cblxuZG9tLm1zaWUgPSBwYXJzZUludCgoL21zaWUgKFxcZCspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkgfHwgW10pWzFdKTtcbmlmIChpc05hTihkb20ubXNpZSkpIHtcbiAgZG9tLm1zaWUgPSBwYXJzZUludCgoL3RyaWRlbnRcXC8uKjsgcnY6KFxcZCspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkgfHwgW10pWzFdKTtcbn1cblxuZG9tLmZpbmQgPSBmdW5jdGlvbihzbCl7XG4gIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICB0cnl7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbCk7XG4gICAgfWNhdGNoKGUpe1xuXG4gICAgfVxuICB9XG4gIGlmKHNsLmluZGV4T2YoJyMnKSE9PS0xKSByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIHNsLnNsaWNlKDEpICk7XG59XG5cbmRvbS5pbmplY3QgPSBmdW5jdGlvbihub2RlLCByZWZlciwgcG9zaXRpb24pe1xuXG4gIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgJ2JvdHRvbSc7XG5cbiAgaWYoQXJyYXkuaXNBcnJheShub2RlKSl7XG4gICAgdmFyIHRtcCA9IG5vZGU7XG4gICAgbm9kZSA9IGRvbS5mcmFnbWVudCgpO1xuICAgIGZvcih2YXIgaSA9IDAsbGVuID0gdG1wLmxlbmd0aDsgaSA8IGxlbiA7aSsrKXtcbiAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodG1wW2ldKTtcbiAgICB9XG4gIH1cblxuICB2YXIgZmlyc3RDaGlsZCwgbmV4dDtcbiAgc3dpdGNoKHBvc2l0aW9uKXtcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgcmVmZXIuYXBwZW5kQ2hpbGQoIG5vZGUgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgICBpZiggZmlyc3RDaGlsZCA9IHJlZmVyLmZpcnN0Q2hpbGQgKXtcbiAgICAgICAgcmVmZXIuaW5zZXJ0QmVmb3JlKCBub2RlLCByZWZlci5maXJzdENoaWxkICk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgcmVmZXIuYXBwZW5kQ2hpbGQoIG5vZGUgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FmdGVyJzpcbiAgICAgIGlmKCBuZXh0ID0gcmVmZXIubmV4dFNpYmxpbmcgKXtcbiAgICAgICAgbmV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggbm9kZSwgbmV4dCApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJlZmVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIG5vZGUgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JlZm9yZSc6XG4gICAgICByZWZlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggbm9kZSwgcmVmZXIgKTtcbiAgfVxufVxuXG5cbmRvbS5pZCA9IGZ1bmN0aW9uKGlkKXtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn1cblxuLy8gY3JlYXRlRWxlbWVudCBcbmRvbS5jcmVhdGUgPSBmdW5jdGlvbih0eXBlLCBucywgYXR0cnMpe1xuICBpZihucyA9PT0gJ3N2Zycpe1xuICAgIGlmKCFlbnYuc3ZnKSB0aHJvdyBFcnJvcigndGhlIGVudiBuZWVkIHN2ZyBzdXBwb3J0JylcbiAgICBucyA9IG5hbWVzcGFjZXMuc3ZnO1xuICB9XG4gIHJldHVybiAhbnM/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucywgdHlwZSk7XG59XG5cbi8vIGRvY3VtZW50RnJhZ21lbnRcbmRvbS5mcmFnbWVudCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG59XG5cblxuXG52YXIgc3BlY2lhbEF0dHIgPSB7XG4gICdjbGFzcyc6IGZ1bmN0aW9uKG5vZGUsIHZhbHVlKXtcbiAgICAoJ2NsYXNzTmFtZScgaW4gbm9kZSAmJiAobm9kZS5uYW1lc3BhY2VVUkkgPT09IG5hbWVzcGFjZXMuaHRtbCB8fCAhbm9kZS5uYW1lc3BhY2VVUkkpKSA/XG4gICAgICBub2RlLmNsYXNzTmFtZSA9ICh2YWx1ZSB8fCAnJykgOiBub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCB2YWx1ZSk7XG4gIH0sXG4gICdmb3InOiBmdW5jdGlvbihub2RlLCB2YWx1ZSl7XG4gICAgKCdodG1sRm9yJyBpbiBub2RlKSA/IG5vZGUuaHRtbEZvciA9IHZhbHVlIDogbm9kZS5zZXRBdHRyaWJ1dGUoJ2ZvcicsIHZhbHVlKTtcbiAgfSxcbiAgJ3N0eWxlJzogZnVuY3Rpb24obm9kZSwgdmFsdWUpe1xuICAgIChub2RlLnN0eWxlKSA/IG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlIDogbm9kZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdmFsdWUpO1xuICB9LFxuICAndmFsdWUnOiBmdW5jdGlvbihub2RlLCB2YWx1ZSl7XG4gICAgbm9kZS52YWx1ZSA9ICh2YWx1ZSAhPSBudWxsKSA/IHZhbHVlIDogJyc7XG4gIH1cbn1cblxuXG4vLyBhdHRyaWJ1dGUgU2V0dGVyICYgR2V0dGVyXG5kb20uYXR0ciA9IGZ1bmN0aW9uKG5vZGUsIG5hbWUsIHZhbHVlKXtcbiAgaWYgKF8uaXNCb29sZWFuQXR0cihuYW1lKSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoISF2YWx1ZSkge1xuICAgICAgICBub2RlW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgbmFtZSk7XG4gICAgICAgIC8vIGx0IGllNyAuIHRoZSBqYXZhc2NyaXB0IGNoZWNrZWQgc2V0dGluZyBpcyBpbiB2YWxpZFxuICAgICAgICAvL2h0dHA6Ly9ieXRlcy5jb20vdG9waWMvamF2YXNjcmlwdC9pbnNpZ2h0cy83OTkxNjctYnJvd3Nlci1xdWlyay1keW5hbWljYWxseS1hcHBlbmRlZC1jaGVja2VkLWNoZWNrYm94LWRvZXMtbm90LWFwcGVhci1jaGVja2VkLWllXG4gICAgICAgIGlmKGRvbS5tc2llICYmIGRvbS5tc2llIDw9NyApIG5vZGUuZGVmYXVsdENoZWNrZWQgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlW25hbWVdID0gZmFsc2U7XG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKG5vZGVbbmFtZV0gfHxcbiAgICAgICAgICAgICAgIChub2RlLmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKG5hbWUpfHwgbm9vcCkuc3BlY2lmaWVkKSA/IG5hbWUgOiB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiAodmFsdWUpICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIGlmIGluIHNwZWNpYWxBdHRyO1xuICAgIGlmKHNwZWNpYWxBdHRyW25hbWVdKSBzcGVjaWFsQXR0cltuYW1lXShub2RlLCB2YWx1ZSk7XG4gICAgZWxzZSBpZih2YWx1ZSA9PT0gbnVsbCkgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcbiAgICBlbHNlIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChub2RlLmdldEF0dHJpYnV0ZSkge1xuICAgIC8vIHRoZSBleHRyYSBhcmd1bWVudCBcIjJcIiBpcyB0byBnZXQgdGhlIHJpZ2h0IHRoaW5nIGZvciBhLmhyZWYgaW4gSUUsIHNlZSBqUXVlcnkgY29kZVxuICAgIC8vIHNvbWUgZWxlbWVudHMgKGUuZy4gRG9jdW1lbnQpIGRvbid0IGhhdmUgZ2V0IGF0dHJpYnV0ZSwgc28gcmV0dXJuIHVuZGVmaW5lZFxuICAgIHZhciByZXQgPSBub2RlLmdldEF0dHJpYnV0ZShuYW1lLCAyKTtcbiAgICAvLyBub3JtYWxpemUgbm9uLWV4aXN0aW5nIGF0dHJpYnV0ZXMgdG8gdW5kZWZpbmVkIChhcyBqUXVlcnkpXG4gICAgcmV0dXJuIHJldCA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHJldDtcbiAgfVxufVxuXG5cbmRvbS5vbiA9IGZ1bmN0aW9uKG5vZGUsIHR5cGUsIGhhbmRsZXIpe1xuICB2YXIgdHlwZXMgPSB0eXBlLnNwbGl0KCcgJyk7XG4gIGhhbmRsZXIucmVhbCA9IGZ1bmN0aW9uKGV2KXtcbiAgICB2YXIgJGV2ZW50ID0gbmV3IEV2ZW50KGV2KTtcbiAgICAkZXZlbnQub3JpZ2luID0gbm9kZTtcbiAgICBoYW5kbGVyLmNhbGwobm9kZSwgJGV2ZW50KTtcbiAgfVxuICB0eXBlcy5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpe1xuICAgIHR5cGUgPSBmaXhFdmVudE5hbWUobm9kZSwgdHlwZSk7XG4gICAgYWRkRXZlbnQobm9kZSwgdHlwZSwgaGFuZGxlci5yZWFsKTtcbiAgfSk7XG59XG5kb20ub2ZmID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgaGFuZGxlcil7XG4gIHZhciB0eXBlcyA9IHR5cGUuc3BsaXQoJyAnKTtcbiAgaGFuZGxlciA9IGhhbmRsZXIucmVhbCB8fCBoYW5kbGVyO1xuICB0eXBlcy5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpe1xuICAgIHR5cGUgPSBmaXhFdmVudE5hbWUobm9kZSwgdHlwZSk7XG4gICAgcmVtb3ZlRXZlbnQobm9kZSwgdHlwZSwgaGFuZGxlcik7XG4gIH0pXG59XG5cblxuZG9tLnRleHQgPSAoZnVuY3Rpb24gKCl7XG4gIHZhciBtYXAgPSB7fTtcbiAgaWYgKGRvbS5tc2llICYmIGRvbS5tc2llIDwgOSkge1xuICAgIG1hcFsxXSA9ICdpbm5lclRleHQnOyAgICBcbiAgICBtYXBbM10gPSAnbm9kZVZhbHVlJzsgICAgXG4gIH0gZWxzZSB7XG4gICAgbWFwWzFdID0gbWFwWzNdID0gJ3RleHRDb250ZW50JztcbiAgfVxuICBcbiAgcmV0dXJuIGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xuICAgIHZhciB0ZXh0UHJvcCA9IG1hcFtub2RlLm5vZGVUeXBlXTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRleHRQcm9wID8gbm9kZVt0ZXh0UHJvcF0gOiAnJztcbiAgICB9XG4gICAgbm9kZVt0ZXh0UHJvcF0gPSB2YWx1ZTtcbiAgfVxufSkoKTtcblxuXG5kb20uaHRtbCA9IGZ1bmN0aW9uKCBub2RlLCBodG1sICl7XG4gIGlmKHR5cGVvZiBodG1sID09PSBcInVuZGVmaW5lZFwiKXtcbiAgICByZXR1cm4gbm9kZS5pbm5lckhUTUw7XG4gIH1lbHNle1xuICAgIG5vZGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgfVxufVxuXG5kb20ucmVwbGFjZSA9IGZ1bmN0aW9uKG5vZGUsIHJlcGxhY2VkKXtcbiAgaWYocmVwbGFjZWQucGFyZW50Tm9kZSkgcmVwbGFjZWQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobm9kZSwgcmVwbGFjZWQpO1xufVxuXG5kb20ucmVtb3ZlID0gZnVuY3Rpb24obm9kZSl7XG4gIGlmKG5vZGUucGFyZW50Tm9kZSkgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuXG4vLyBjc3MgU2V0dGxlICYgR2V0dGVyIGZyb20gYW5ndWxhclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBpdCBpc250IGNvbXB1dGVkIHN0eWxlIFxuZG9tLmNzcyA9IGZ1bmN0aW9uKG5vZGUsIG5hbWUsIHZhbHVlKXtcbiAgaWYoIF8udHlwZU9mKG5hbWUpID09PSBcIm9iamVjdFwiICl7XG4gICAgZm9yKHZhciBpIGluIG5hbWUpe1xuICAgICAgaWYoIG5hbWUuaGFzT3duUHJvcGVydHkoaSkgKXtcbiAgICAgICAgZG9tLmNzcyggbm9kZSwgaSwgbmFtZVtpXSApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cbiAgICBuYW1lID0gY2FtZWxDYXNlKG5hbWUpO1xuICAgIGlmKG5hbWUpIG5vZGUuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcblxuICB9IGVsc2Uge1xuXG4gICAgdmFyIHZhbDtcbiAgICBpZiAoZG9tLm1zaWUgPD0gOCkge1xuICAgICAgLy8gdGhpcyBpcyBzb21lIElFIHNwZWNpZmljIHdlaXJkbmVzcyB0aGF0IGpRdWVyeSAxLjYuNCBkb2VzIG5vdCBzdXJlIHdoeVxuICAgICAgdmFsID0gbm9kZS5jdXJyZW50U3R5bGUgJiYgbm9kZS5jdXJyZW50U3R5bGVbbmFtZV07XG4gICAgICBpZiAodmFsID09PSAnJykgdmFsID0gJ2F1dG8nO1xuICAgIH1cbiAgICB2YWwgPSB2YWwgfHwgbm9kZS5zdHlsZVtuYW1lXTtcbiAgICBpZiAoZG9tLm1zaWUgPD0gOCkge1xuICAgICAgdmFsID0gdmFsID09PSAnJyA/IHVuZGVmaW5lZCA6IHZhbDtcbiAgICB9XG4gICAgcmV0dXJuICB2YWw7XG4gIH1cbn1cblxuZG9tLmFkZENsYXNzID0gZnVuY3Rpb24obm9kZSwgY2xhc3NOYW1lKXtcbiAgdmFyIGN1cnJlbnQgPSBub2RlLmNsYXNzTmFtZSB8fCBcIlwiO1xuICBpZiAoKFwiIFwiICsgY3VycmVudCArIFwiIFwiKS5pbmRleE9mKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIpID09PSAtMSkge1xuICAgIG5vZGUuY2xhc3NOYW1lID0gY3VycmVudD8gKCBjdXJyZW50ICsgXCIgXCIgKyBjbGFzc05hbWUgKSA6IGNsYXNzTmFtZTtcbiAgfVxufVxuXG5kb20uZGVsQ2xhc3MgPSBmdW5jdGlvbihub2RlLCBjbGFzc05hbWUpe1xuICB2YXIgY3VycmVudCA9IG5vZGUuY2xhc3NOYW1lIHx8IFwiXCI7XG4gIG5vZGUuY2xhc3NOYW1lID0gKFwiIFwiICsgY3VycmVudCArIFwiIFwiKS5yZXBsYWNlKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIsIFwiIFwiKS50cmltKCk7XG59XG5cbmRvbS5oYXNDbGFzcyA9IGZ1bmN0aW9uKG5vZGUsIGNsYXNzTmFtZSl7XG4gIHZhciBjdXJyZW50ID0gbm9kZS5jbGFzc05hbWUgfHwgXCJcIjtcbiAgcmV0dXJuIChcIiBcIiArIGN1cnJlbnQgKyBcIiBcIikuaW5kZXhPZihcIiBcIiArIGNsYXNzTmFtZSArIFwiIFwiKSAhPT0gLTE7XG59XG5cblxuXG4vLyBzaW1wbGUgRXZlbnQgd3JhcFxuXG4vL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTEwNjgxOTYvaWU4LWllNy1vbmNoYW5nZS1ldmVudC1pcy1lbWl0ZWQtb25seS1hZnRlci1yZXBlYXRlZC1zZWxlY3Rpb25cbmZ1bmN0aW9uIGZpeEV2ZW50TmFtZShlbGVtLCBuYW1lKXtcbiAgcmV0dXJuIChuYW1lID09PSAnY2hhbmdlJyAgJiYgIGRvbS5tc2llIDwgOSAmJiBcbiAgICAgIChlbGVtICYmIGVsZW0udGFnTmFtZSAmJiBlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKT09PSdpbnB1dCcgJiYgXG4gICAgICAgIChlbGVtLnR5cGUgPT09ICdjaGVja2JveCcgfHwgZWxlbS50eXBlID09PSAncmFkaW8nKVxuICAgICAgKVxuICAgICk/ICdjbGljayc6IG5hbWU7XG59XG5cbnZhciByTW91c2VFdmVudCA9IC9eKD86Y2xpY2t8ZGJsY2xpY2t8Y29udGV4dG1lbnV8RE9NTW91c2VTY3JvbGx8bW91c2UoPzpcXHcrKSkkL1xudmFyIGRvYyA9IGRvY3VtZW50O1xuZG9jID0gKCFkb2MuY29tcGF0TW9kZSB8fCBkb2MuY29tcGF0TW9kZSA9PT0gJ0NTUzFDb21wYXQnKSA/IGRvYy5kb2N1bWVudEVsZW1lbnQgOiBkb2MuYm9keTtcbmZ1bmN0aW9uIEV2ZW50KGV2KXtcbiAgZXYgPSBldiB8fCB3aW5kb3cuZXZlbnQ7XG4gIGlmKGV2Ll9maXhlZCkgcmV0dXJuIGV2O1xuICB0aGlzLmV2ZW50ID0gZXY7XG4gIHRoaXMudGFyZ2V0ID0gZXYudGFyZ2V0IHx8IGV2LnNyY0VsZW1lbnQ7XG5cbiAgdmFyIHR5cGUgPSB0aGlzLnR5cGUgPSBldi50eXBlO1xuICB2YXIgYnV0dG9uID0gdGhpcy5idXR0b24gPSBldi5idXR0b247XG5cbiAgLy8gaWYgaXMgbW91c2UgZXZlbnQgcGF0Y2ggcGFnZVhcbiAgaWYock1vdXNlRXZlbnQudGVzdCh0eXBlKSl7IC8vZml4IHBhZ2VYXG4gICAgdGhpcy5wYWdlWCA9IChldi5wYWdlWCAhPSBudWxsKSA/IGV2LnBhZ2VYIDogZXYuY2xpZW50WCArIGRvYy5zY3JvbGxMZWZ0O1xuICAgIHRoaXMucGFnZVkgPSAoZXYucGFnZVggIT0gbnVsbCkgPyBldi5wYWdlWSA6IGV2LmNsaWVudFkgKyBkb2Muc2Nyb2xsVG9wO1xuICAgIGlmICh0eXBlID09PSAnbW91c2VvdmVyJyB8fCB0eXBlID09PSAnbW91c2VvdXQnKXsvLyBmaXggcmVsYXRlZFRhcmdldFxuICAgICAgdmFyIHJlbGF0ZWQgPSBldi5yZWxhdGVkVGFyZ2V0IHx8IGV2Wyh0eXBlID09PSAnbW91c2VvdmVyJyA/ICdmcm9tJyA6ICd0bycpICsgJ0VsZW1lbnQnXTtcbiAgICAgIHdoaWxlIChyZWxhdGVkICYmIHJlbGF0ZWQubm9kZVR5cGUgPT09IDMpIHJlbGF0ZWQgPSByZWxhdGVkLnBhcmVudE5vZGU7XG4gICAgICB0aGlzLnJlbGF0ZWRUYXJnZXQgPSByZWxhdGVkO1xuICAgIH1cbiAgfVxuICAvLyBpZiBpcyBtb3VzZXNjcm9sbFxuICBpZiAodHlwZSA9PT0gJ0RPTU1vdXNlU2Nyb2xsJyB8fCB0eXBlID09PSAnbW91c2V3aGVlbCcpe1xuICAgIC8vIGZmIGV2LmRldGFpbDogMyAgICBvdGhlciBldi53aGVlbERlbHRhOiAtMTIwXG4gICAgdGhpcy53aGVlbERlbHRhID0gKGV2LndoZWVsRGVsdGEpID8gZXYud2hlZWxEZWx0YSAvIDEyMCA6IC0oZXYuZGV0YWlsIHx8IDApIC8gMztcbiAgfVxuICBcbiAgLy8gZml4IHdoaWNoXG4gIHRoaXMud2hpY2ggPSBldi53aGljaCB8fCBldi5rZXlDb2RlO1xuICBpZiggIXRoaXMud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQpe1xuICAgIC8vIGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9ldmVudC53aGljaC8gdXNlIHdoaWNoXG4gICAgdGhpcy53aGljaCA9ICggYnV0dG9uICYgMSA/IDEgOiAoIGJ1dHRvbiAmIDIgPyAzIDogKCBidXR0b24gJiA0ID8gMiA6IDAgKSApICk7XG4gIH1cbiAgdGhpcy5fZml4ZWQgPSB0cnVlO1xufVxuXG5fLmV4dGVuZChFdmVudC5wcm90b3R5cGUsIHtcbiAgaW1tZWRpYXRlU3RvcDogXy5pc0ZhbHNlLFxuICBzdG9wOiBmdW5jdGlvbigpe1xuICAgIHRoaXMucHJldmVudERlZmF1bHQoKS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSxcbiAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCl7XG4gICAgaWYgKHRoaXMuZXZlbnQucHJldmVudERlZmF1bHQpIHRoaXMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBlbHNlIHRoaXMuZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpe1xuICAgIGlmICh0aGlzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbikgdGhpcy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlbHNlIHRoaXMuZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpe1xuICAgIGlmKHRoaXMuZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB0aGlzLmV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICB9XG59KVxuXG5cbmRvbS5uZXh0RnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICB2YXIgcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCBcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMTYpXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICB2YXIgY2FuY2VsID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICBmdW5jdGlvbih0aWQpe1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGlkKVxuICAgICAgICAgICAgICAgICB9XG4gIFxuICByZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgIHZhciBpZCA9IHJlcXVlc3QoY2FsbGJhY2spO1xuICAgIHJldHVybiBmdW5jdGlvbigpeyBjYW5jZWwoaWQpOyB9XG4gIH1cbn0pKCk7XG5cbi8vIDNrcyBmb3IgYW5ndWxhcidzIHJhZiAgc2VydmljZVxudmFyIGs7XG5kb20ubmV4dFJlZmxvdyA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgZG9tLm5leHRGcmFtZShmdW5jdGlvbigpe1xuICAgIGsgPSBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoO1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pXG59XG5cblxuXG4iLCIvLyBzb21lIGZpeHR1cmUgdGVzdDtcbi8vIC0tLS0tLS0tLS0tLS0tLVxudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwnKTtcbmV4cG9ydHMuc3ZnID0gKGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSggXCJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0Jhc2ljU3RydWN0dXJlXCIsIFwiMS4xXCIgKTtcbn0pKCk7XG5cblxuZXhwb3J0cy5icm93c2VyID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50Lm5vZGVUeXBlO1xuLy8gd2hldGhlciBoYXZlIGNvbXBvbmVudCBpbiBpbml0aWFsaXppbmdcbmV4cG9ydHMuZXhwckNhY2hlID0gXy5jYWNoZSgxMDAwKTtcbmV4cG9ydHMuaXNSdW5uaW5nID0gZmFsc2U7XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIGNvbWJpbmUgPSByZXF1aXJlKCcuL2hlbHBlci9jb21iaW5lJylcblxuZnVuY3Rpb24gR3JvdXAobGlzdCl7XG4gIHRoaXMuY2hpbGRyZW4gPSBsaXN0IHx8IFtdO1xufVxuXG5cbl8uZXh0ZW5kKEdyb3VwLnByb3RvdHlwZSwge1xuICBkZXN0cm95OiBmdW5jdGlvbihmaXJzdCl7XG4gICAgY29tYmluZS5kZXN0cm95KHRoaXMuY2hpbGRyZW4sIGZpcnN0KTtcbiAgICBpZih0aGlzLm9uZGVzdHJveSkgdGhpcy5vbmRlc3Ryb3koKTtcbiAgICB0aGlzLmNoaWxkcmVuID0gbnVsbDtcbiAgfSxcbiAgZ2V0OiBmdW5jdGlvbihpKXtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltpXVxuICB9LFxuICBwdXNoOiBmdW5jdGlvbihpdGVtKXtcbiAgICB0aGlzLmNoaWxkcmVuLnB1c2goIGl0ZW0gKTtcbiAgfVxuXG59KVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBHcm91cDtcblxuXG4iLCJ2YXIgXyA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xudmFyIGRvbSAgPSByZXF1aXJlKFwiLi4vZG9tLmpzXCIpO1xudmFyIGFuaW1hdGUgPSB7fTtcbnZhciBlbnYgPSByZXF1aXJlKFwiLi4vZW52LmpzXCIpO1xuXG5cbnZhciBcbiAgdHJhbnNpdGlvbkVuZCA9ICd0cmFuc2l0aW9uZW5kJywgXG4gIGFuaW1hdGlvbkVuZCA9ICdhbmltYXRpb25lbmQnLCBcbiAgdHJhbnNpdGlvblByb3BlcnR5ID0gJ3RyYW5zaXRpb24nLCBcbiAgYW5pbWF0aW9uUHJvcGVydHkgPSAnYW5pbWF0aW9uJztcblxuaWYoISgnb250cmFuc2l0aW9uZW5kJyBpbiB3aW5kb3cpKXtcbiAgaWYoJ29ud2Via2l0dHJhbnNpdGlvbmVuZCcgaW4gd2luZG93KSB7XG4gICAgXG4gICAgLy8gQ2hyb21lL1NhZiAoKyBNb2JpbGUgU2FmKS9BbmRyb2lkXG4gICAgdHJhbnNpdGlvbkVuZCArPSAnIHdlYmtpdFRyYW5zaXRpb25FbmQnO1xuICAgIHRyYW5zaXRpb25Qcm9wZXJ0eSA9ICd3ZWJraXRUcmFuc2l0aW9uJ1xuICB9IGVsc2UgaWYoJ29ub3RyYW5zaXRpb25lbmQnIGluIGRvbS50Tm9kZSB8fCBuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ09wZXJhJykge1xuXG4gICAgLy8gT3BlcmFcbiAgICB0cmFuc2l0aW9uRW5kICs9ICcgb1RyYW5zaXRpb25FbmQnO1xuICAgIHRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdvVHJhbnNpdGlvbic7XG4gIH1cbn1cbmlmKCEoJ29uYW5pbWF0aW9uZW5kJyBpbiB3aW5kb3cpKXtcbiAgaWYgKCdvbndlYmtpdGFuaW1hdGlvbmVuZCcgaW4gd2luZG93KXtcbiAgICAvLyBDaHJvbWUvU2FmICgrIE1vYmlsZSBTYWYpL0FuZHJvaWRcbiAgICBhbmltYXRpb25FbmQgKz0gJyB3ZWJraXRBbmltYXRpb25FbmQnO1xuICAgIGFuaW1hdGlvblByb3BlcnR5ID0gJ3dlYmtpdEFuaW1hdGlvbic7XG5cbiAgfWVsc2UgaWYgKCdvbm9hbmltYXRpb25lbmQnIGluIGRvbS50Tm9kZSl7XG4gICAgLy8gT3BlcmFcbiAgICBhbmltYXRpb25FbmQgKz0gJyBvQW5pbWF0aW9uRW5kJztcbiAgICBhbmltYXRpb25Qcm9wZXJ0eSA9ICdvQW5pbWF0aW9uJztcbiAgfVxufVxuXG4vKipcbiAqIGluamVjdCBub2RlIHdpdGggYW5pbWF0aW9uXG4gKiBAcGFyYW0gIHtbdHlwZV19IG5vZGUgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlZmVyICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IGRpcmVjdGlvbiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmFuaW1hdGUuaW5qZWN0ID0gZnVuY3Rpb24oIG5vZGUsIHJlZmVyICxkaXJlY3Rpb24sIGNhbGxiYWNrICl7XG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgXy5ub29wO1xuICBpZiggQXJyYXkuaXNBcnJheShub2RlKSApe1xuICAgIHZhciBmcmFnbWVudCA9IGRvbS5mcmFnbWVudCgpO1xuICAgIHZhciBjb3VudD0wO1xuXG4gICAgZm9yKHZhciBpID0gMCxsZW4gPSBub2RlLmxlbmd0aDtpIDwgbGVuOyBpKysgKXtcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5vZGVbaV0pOyBcbiAgICB9XG4gICAgZG9tLmluamVjdChmcmFnbWVudCwgcmVmZXIsIGRpcmVjdGlvbik7XG5cbiAgICAvLyBpZiBhbGwgbm9kZXMgaXMgZG9uZSwgd2UgY2FsbCB0aGUgY2FsbGJhY2tcbiAgICB2YXIgZW50ZXJDYWxsYmFjayA9IGZ1bmN0aW9uICgpe1xuICAgICAgY291bnQrKztcbiAgICAgIGlmKCBjb3VudCA9PT0gbGVuICkgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgaWYobGVuID09PSBjb3VudCkgY2FsbGJhY2soKTtcbiAgICBmb3IoIGkgPSAwOyBpIDwgbGVuOyBpKysgKXtcbiAgICAgIGlmKG5vZGVbaV0ub25lbnRlcil7XG4gICAgICAgIG5vZGVbaV0ub25lbnRlcihlbnRlckNhbGxiYWNrKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBlbnRlckNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9ZWxzZXtcbiAgICBkb20uaW5qZWN0KCBub2RlLCByZWZlciwgZGlyZWN0aW9uICk7XG4gICAgaWYobm9kZS5vbmVudGVyKXtcbiAgICAgIG5vZGUub25lbnRlcihjYWxsYmFjaylcbiAgICB9ZWxzZXtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogcmVtb3ZlIG5vZGUgd2l0aCBhbmltYXRpb25cbiAqIEBwYXJhbSAge1t0eXBlXX0gICBub2RlICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuYW5pbWF0ZS5yZW1vdmUgPSBmdW5jdGlvbihub2RlLCBjYWxsYmFjayl7XG4gIGlmKG5vZGUub25sZWF2ZSl7XG4gICAgbm9kZS5vbmxlYXZlKGZ1bmN0aW9uKCl7XG4gICAgICByZW1vdmVEb25lKG5vZGUsIGNhbGxiYWNrKVxuICAgIH0pXG4gIH1lbHNle1xuICAgIHJlbW92ZURvbmUobm9kZSwgY2FsbGJhY2spXG4gIH1cbn1cblxudmFyIHJlbW92ZURvbmUgPSBmdW5jdGlvbiAobm9kZSwgY2FsbGJhY2spe1xuICAgIGRvbS5yZW1vdmUobm9kZSk7XG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbn1cblxuXG5cbmFuaW1hdGUuc3RhcnRDbGFzc0FuaW1hdGUgPSBmdW5jdGlvbiAoIG5vZGUsIGNsYXNzTmFtZSwgIGNhbGxiYWNrLCBtb2RlICl7XG4gIHZhciBhY3RpdmVDbGFzc05hbWUsIHRpbWVvdXQsIHRpZCwgb25jZUFuaW07XG4gIGlmKCAoIWFuaW1hdGlvbkVuZCAmJiAhdHJhbnNpdGlvbkVuZCkgfHwgZW52LmlzUnVubmluZyApe1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9XG5cbiAgb25jZUFuaW0gPSBfLm9uY2UoZnVuY3Rpb24gb25BbmltYXRlRW5kKCl7XG4gICAgaWYodGlkKSBjbGVhclRpbWVvdXQodGlkKTtcblxuICAgIGlmKG1vZGUgPT09IDIpIHtcbiAgICAgIGRvbS5kZWxDbGFzcyhub2RlLCBhY3RpdmVDbGFzc05hbWUpO1xuICAgIH1cbiAgICBpZihtb2RlICE9PSAzKXsgLy8gbW9kZSBob2xkIHRoZSBjbGFzc1xuICAgICAgZG9tLmRlbENsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGRvbS5vZmYobm9kZSwgYW5pbWF0aW9uRW5kLCBvbmNlQW5pbSlcbiAgICBkb20ub2ZmKG5vZGUsIHRyYW5zaXRpb25FbmQsIG9uY2VBbmltKVxuXG4gICAgY2FsbGJhY2soKTtcblxuICB9KTtcbiAgaWYobW9kZSA9PT0gMil7IC8vIGF1dG8gcmVtb3ZlZFxuICAgIGRvbS5hZGRDbGFzcyggbm9kZSwgY2xhc3NOYW1lICk7XG5cbiAgICBhY3RpdmVDbGFzc05hbWUgPSBjbGFzc05hbWUuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24obmFtZSl7XG4gICAgICAgcmV0dXJuIG5hbWUgKyAnLWFjdGl2ZSc7XG4gICAgfSkuam9pbihcIiBcIik7XG5cbiAgICBkb20ubmV4dFJlZmxvdyhmdW5jdGlvbigpe1xuICAgICAgZG9tLmFkZENsYXNzKCBub2RlLCBhY3RpdmVDbGFzc05hbWUgKTtcbiAgICAgIHRpbWVvdXQgPSBnZXRNYXhUaW1lb3V0KCBub2RlICk7XG4gICAgICB0aWQgPSBzZXRUaW1lb3V0KCBvbmNlQW5pbSwgdGltZW91dCApO1xuICAgIH0pO1xuXG4gIH1lbHNle1xuXG4gICAgZG9tLm5leHRSZWZsb3coZnVuY3Rpb24oKXtcbiAgICAgIGRvbS5hZGRDbGFzcyggbm9kZSwgY2xhc3NOYW1lICk7XG4gICAgICB0aW1lb3V0ID0gZ2V0TWF4VGltZW91dCggbm9kZSApO1xuICAgICAgdGlkID0gc2V0VGltZW91dCggb25jZUFuaW0sIHRpbWVvdXQgKTtcbiAgICB9KTtcblxuICB9XG5cblxuICBkb20ub24oIG5vZGUsIGFuaW1hdGlvbkVuZCwgb25jZUFuaW0gKVxuICBkb20ub24oIG5vZGUsIHRyYW5zaXRpb25FbmQsIG9uY2VBbmltIClcbiAgcmV0dXJuIG9uY2VBbmltO1xufVxuXG5cbmFuaW1hdGUuc3RhcnRTdHlsZUFuaW1hdGUgPSBmdW5jdGlvbihub2RlLCBzdHlsZXMsIGNhbGxiYWNrKXtcbiAgdmFyIHRpbWVvdXQsIG9uY2VBbmltLCB0aWQ7XG5cbiAgZG9tLm5leHRSZWZsb3coZnVuY3Rpb24oKXtcbiAgICBkb20uY3NzKCBub2RlLCBzdHlsZXMgKTtcbiAgICB0aW1lb3V0ID0gZ2V0TWF4VGltZW91dCggbm9kZSApO1xuICAgIHRpZCA9IHNldFRpbWVvdXQoIG9uY2VBbmltLCB0aW1lb3V0ICk7XG4gIH0pO1xuXG5cbiAgb25jZUFuaW0gPSBfLm9uY2UoZnVuY3Rpb24gb25BbmltYXRlRW5kKCl7XG4gICAgaWYodGlkKSBjbGVhclRpbWVvdXQodGlkKTtcblxuICAgIGRvbS5vZmYobm9kZSwgYW5pbWF0aW9uRW5kLCBvbmNlQW5pbSlcbiAgICBkb20ub2ZmKG5vZGUsIHRyYW5zaXRpb25FbmQsIG9uY2VBbmltKVxuXG4gICAgY2FsbGJhY2soKTtcblxuICB9KTtcblxuICBkb20ub24oIG5vZGUsIGFuaW1hdGlvbkVuZCwgb25jZUFuaW0gKVxuICBkb20ub24oIG5vZGUsIHRyYW5zaXRpb25FbmQsIG9uY2VBbmltIClcblxuICByZXR1cm4gb25jZUFuaW07XG59XG5cblxuLyoqXG4gKiBnZXQgbWF4dGltZW91dFxuICogQHBhcmFtICB7Tm9kZX0gbm9kZSBcbiAqIEByZXR1cm4ge1t0eXBlXX0gICBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGdldE1heFRpbWVvdXQobm9kZSl7XG4gIHZhciB0aW1lb3V0ID0gMCxcbiAgICB0RHVyYXRpb24gPSAwLFxuICAgIHREZWxheSA9IDAsXG4gICAgYUR1cmF0aW9uID0gMCxcbiAgICBhRGVsYXkgPSAwLFxuICAgIHJhdGlvID0gNSAvIDMsXG4gICAgc3R5bGVzIDtcblxuICBpZih3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSl7XG5cbiAgICBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKSxcbiAgICB0RHVyYXRpb24gPSBnZXRNYXhUaW1lKCBzdHlsZXNbdHJhbnNpdGlvblByb3BlcnR5ICsgJ0R1cmF0aW9uJ10pIHx8IHREdXJhdGlvbjtcbiAgICB0RGVsYXkgPSBnZXRNYXhUaW1lKCBzdHlsZXNbdHJhbnNpdGlvblByb3BlcnR5ICsgJ0RlbGF5J10pIHx8IHREZWxheTtcbiAgICBhRHVyYXRpb24gPSBnZXRNYXhUaW1lKCBzdHlsZXNbYW5pbWF0aW9uUHJvcGVydHkgKyAnRHVyYXRpb24nXSkgfHwgYUR1cmF0aW9uO1xuICAgIGFEZWxheSA9IGdldE1heFRpbWUoIHN0eWxlc1thbmltYXRpb25Qcm9wZXJ0eSArICdEZWxheSddKSB8fCBhRGVsYXk7XG4gICAgdGltZW91dCA9IE1hdGgubWF4KCB0RHVyYXRpb24rdERlbGF5LCBhRHVyYXRpb24gKyBhRGVsYXkgKTtcblxuICB9XG4gIHJldHVybiB0aW1lb3V0ICogMTAwMCAqIHJhdGlvO1xufVxuXG5mdW5jdGlvbiBnZXRNYXhUaW1lKHN0cil7XG5cbiAgdmFyIG1heFRpbWVvdXQgPSAwLCB0aW1lO1xuXG4gIGlmKCFzdHIpIHJldHVybiAwO1xuXG4gIHN0ci5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbihzdHIpe1xuXG4gICAgdGltZSA9IHBhcnNlRmxvYXQoc3RyKTtcbiAgICBpZiggdGltZSA+IG1heFRpbWVvdXQgKSBtYXhUaW1lb3V0ID0gdGltZTtcblxuICB9KTtcblxuICByZXR1cm4gbWF4VGltZW91dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhbmltYXRlOyIsIi8vIHNvbWUgbmVzdGVkICBvcGVyYXRpb24gaW4gYXN0IFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9kb20uanNcIik7XG5cbnZhciBjb21iaW5lID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLy8gZ2V0IHRoZSBpbml0aWFsIGRvbSBpbiBvYmplY3RcbiAgbm9kZTogZnVuY3Rpb24oaXRlbSl7XG4gICAgdmFyIGNoaWxkcmVuLG5vZGU7XG4gICAgaWYoaXRlbS5lbGVtZW50KSByZXR1cm4gaXRlbS5lbGVtZW50O1xuICAgIGlmKHR5cGVvZiBpdGVtLm5vZGUgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGl0ZW0ubm9kZSgpO1xuICAgIGlmKHR5cGVvZiBpdGVtLm5vZGVUeXBlID09PSBcIm51bWJlclwiKSByZXR1cm4gaXRlbTtcbiAgICBpZihpdGVtLmdyb3VwKSByZXR1cm4gY29tYmluZS5ub2RlKGl0ZW0uZ3JvdXApXG4gICAgaWYoY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuKXtcbiAgICAgIGlmKGNoaWxkcmVuLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tYmluZS5ub2RlKGNoaWxkcmVuWzBdKTtcbiAgICAgIH1cbiAgICAgIHZhciBub2RlcyA9IFtdO1xuICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcbiAgICAgICAgbm9kZSA9IGNvbWJpbmUubm9kZShjaGlsZHJlbltpXSk7XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkobm9kZSkpe1xuICAgICAgICAgIG5vZGVzLnB1c2guYXBwbHkobm9kZXMsIG5vZGUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cbiAgfSxcblxuICAvLyBnZXQgdGhlIGxhc3QgZG9tIGluIG9iamVjdChmb3IgaW5zZXJ0aW9uIG9wZXJhdGlvbilcbiAgbGFzdDogZnVuY3Rpb24oaXRlbSl7XG4gICAgdmFyIGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbjtcblxuICAgIGlmKHR5cGVvZiBpdGVtLmxhc3QgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGl0ZW0ubGFzdCgpO1xuICAgIGlmKHR5cGVvZiBpdGVtLm5vZGVUeXBlID09PSBcIm51bWJlclwiKSByZXR1cm4gaXRlbTtcblxuICAgIGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGNvbWJpbmUubGFzdChjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSk7XG4gICAgaWYoaXRlbS5ncm91cCkgcmV0dXJuIGNvbWJpbmUubGFzdChpdGVtLmdyb3VwKTtcblxuICB9LFxuXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uKGl0ZW0sIGZpcnN0KXtcbiAgICBpZighaXRlbSkgcmV0dXJuO1xuICAgIGlmKEFycmF5LmlzQXJyYXkoaXRlbSkpe1xuICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gaXRlbS5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuICAgICAgICBjb21iaW5lLmRlc3Ryb3koaXRlbVtpXSwgZmlyc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2hpbGRyZW4gPSBpdGVtLmNoaWxkcmVuO1xuICAgIGlmKHR5cGVvZiBpdGVtLmRlc3Ryb3kgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGl0ZW0uZGVzdHJveShmaXJzdCk7XG4gICAgaWYodHlwZW9mIGl0ZW0ubm9kZVR5cGUgPT09IFwibnVtYmVyXCIgJiYgZmlyc3QpICBkb20ucmVtb3ZlKGl0ZW0pO1xuICAgIGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XG4gICAgICBjb21iaW5lLmRlc3Ryb3koY2hpbGRyZW4sIHRydWUpO1xuICAgICAgaXRlbS5jaGlsZHJlbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbn0iLCIvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEzNTQwNjQvaG93LXRvLWNvbnZlcnQtY2hhcmFjdGVycy10by1odG1sLWVudGl0aWVzLXVzaW5nLXBsYWluLWphdmFzY3JpcHRcbnZhciBlbnRpdGllcyA9IHtcbiAgJ3F1b3QnOjM0LCBcbiAgJ2FtcCc6MzgsIFxuICAnYXBvcyc6MzksIFxuICAnbHQnOjYwLCBcbiAgJ2d0Jzo2MiwgXG4gICduYnNwJzoxNjAsIFxuICAnaWV4Y2wnOjE2MSwgXG4gICdjZW50JzoxNjIsIFxuICAncG91bmQnOjE2MywgXG4gICdjdXJyZW4nOjE2NCwgXG4gICd5ZW4nOjE2NSwgXG4gICdicnZiYXInOjE2NiwgXG4gICdzZWN0JzoxNjcsIFxuICAndW1sJzoxNjgsIFxuICAnY29weSc6MTY5LCBcbiAgJ29yZGYnOjE3MCwgXG4gICdsYXF1byc6MTcxLCBcbiAgJ25vdCc6MTcyLCBcbiAgJ3NoeSc6MTczLCBcbiAgJ3JlZyc6MTc0LCBcbiAgJ21hY3InOjE3NSwgXG4gICdkZWcnOjE3NiwgXG4gICdwbHVzbW4nOjE3NywgXG4gICdzdXAyJzoxNzgsIFxuICAnc3VwMyc6MTc5LCBcbiAgJ2FjdXRlJzoxODAsIFxuICAnbWljcm8nOjE4MSwgXG4gICdwYXJhJzoxODIsIFxuICAnbWlkZG90JzoxODMsIFxuICAnY2VkaWwnOjE4NCwgXG4gICdzdXAxJzoxODUsIFxuICAnb3JkbSc6MTg2LCBcbiAgJ3JhcXVvJzoxODcsIFxuICAnZnJhYzE0JzoxODgsIFxuICAnZnJhYzEyJzoxODksIFxuICAnZnJhYzM0JzoxOTAsIFxuICAnaXF1ZXN0JzoxOTEsIFxuICAnQWdyYXZlJzoxOTIsIFxuICAnQWFjdXRlJzoxOTMsIFxuICAnQWNpcmMnOjE5NCwgXG4gICdBdGlsZGUnOjE5NSwgXG4gICdBdW1sJzoxOTYsIFxuICAnQXJpbmcnOjE5NywgXG4gICdBRWxpZyc6MTk4LCBcbiAgJ0NjZWRpbCc6MTk5LCBcbiAgJ0VncmF2ZSc6MjAwLCBcbiAgJ0VhY3V0ZSc6MjAxLCBcbiAgJ0VjaXJjJzoyMDIsIFxuICAnRXVtbCc6MjAzLCBcbiAgJ0lncmF2ZSc6MjA0LCBcbiAgJ0lhY3V0ZSc6MjA1LCBcbiAgJ0ljaXJjJzoyMDYsIFxuICAnSXVtbCc6MjA3LCBcbiAgJ0VUSCc6MjA4LCBcbiAgJ050aWxkZSc6MjA5LCBcbiAgJ09ncmF2ZSc6MjEwLCBcbiAgJ09hY3V0ZSc6MjExLCBcbiAgJ09jaXJjJzoyMTIsIFxuICAnT3RpbGRlJzoyMTMsIFxuICAnT3VtbCc6MjE0LCBcbiAgJ3RpbWVzJzoyMTUsIFxuICAnT3NsYXNoJzoyMTYsIFxuICAnVWdyYXZlJzoyMTcsIFxuICAnVWFjdXRlJzoyMTgsIFxuICAnVWNpcmMnOjIxOSwgXG4gICdVdW1sJzoyMjAsIFxuICAnWWFjdXRlJzoyMjEsIFxuICAnVEhPUk4nOjIyMiwgXG4gICdzemxpZyc6MjIzLCBcbiAgJ2FncmF2ZSc6MjI0LCBcbiAgJ2FhY3V0ZSc6MjI1LCBcbiAgJ2FjaXJjJzoyMjYsIFxuICAnYXRpbGRlJzoyMjcsIFxuICAnYXVtbCc6MjI4LCBcbiAgJ2FyaW5nJzoyMjksIFxuICAnYWVsaWcnOjIzMCwgXG4gICdjY2VkaWwnOjIzMSwgXG4gICdlZ3JhdmUnOjIzMiwgXG4gICdlYWN1dGUnOjIzMywgXG4gICdlY2lyYyc6MjM0LCBcbiAgJ2V1bWwnOjIzNSwgXG4gICdpZ3JhdmUnOjIzNiwgXG4gICdpYWN1dGUnOjIzNywgXG4gICdpY2lyYyc6MjM4LCBcbiAgJ2l1bWwnOjIzOSwgXG4gICdldGgnOjI0MCwgXG4gICdudGlsZGUnOjI0MSwgXG4gICdvZ3JhdmUnOjI0MiwgXG4gICdvYWN1dGUnOjI0MywgXG4gICdvY2lyYyc6MjQ0LCBcbiAgJ290aWxkZSc6MjQ1LCBcbiAgJ291bWwnOjI0NiwgXG4gICdkaXZpZGUnOjI0NywgXG4gICdvc2xhc2gnOjI0OCwgXG4gICd1Z3JhdmUnOjI0OSwgXG4gICd1YWN1dGUnOjI1MCwgXG4gICd1Y2lyYyc6MjUxLCBcbiAgJ3V1bWwnOjI1MiwgXG4gICd5YWN1dGUnOjI1MywgXG4gICd0aG9ybic6MjU0LCBcbiAgJ3l1bWwnOjI1NSwgXG4gICdmbm9mJzo0MDIsIFxuICAnQWxwaGEnOjkxMywgXG4gICdCZXRhJzo5MTQsIFxuICAnR2FtbWEnOjkxNSwgXG4gICdEZWx0YSc6OTE2LCBcbiAgJ0Vwc2lsb24nOjkxNywgXG4gICdaZXRhJzo5MTgsIFxuICAnRXRhJzo5MTksIFxuICAnVGhldGEnOjkyMCwgXG4gICdJb3RhJzo5MjEsIFxuICAnS2FwcGEnOjkyMiwgXG4gICdMYW1iZGEnOjkyMywgXG4gICdNdSc6OTI0LCBcbiAgJ051Jzo5MjUsIFxuICAnWGknOjkyNiwgXG4gICdPbWljcm9uJzo5MjcsIFxuICAnUGknOjkyOCwgXG4gICdSaG8nOjkyOSwgXG4gICdTaWdtYSc6OTMxLCBcbiAgJ1RhdSc6OTMyLCBcbiAgJ1Vwc2lsb24nOjkzMywgXG4gICdQaGknOjkzNCwgXG4gICdDaGknOjkzNSwgXG4gICdQc2knOjkzNiwgXG4gICdPbWVnYSc6OTM3LCBcbiAgJ2FscGhhJzo5NDUsIFxuICAnYmV0YSc6OTQ2LCBcbiAgJ2dhbW1hJzo5NDcsIFxuICAnZGVsdGEnOjk0OCwgXG4gICdlcHNpbG9uJzo5NDksIFxuICAnemV0YSc6OTUwLCBcbiAgJ2V0YSc6OTUxLCBcbiAgJ3RoZXRhJzo5NTIsIFxuICAnaW90YSc6OTUzLCBcbiAgJ2thcHBhJzo5NTQsIFxuICAnbGFtYmRhJzo5NTUsIFxuICAnbXUnOjk1NiwgXG4gICdudSc6OTU3LCBcbiAgJ3hpJzo5NTgsIFxuICAnb21pY3Jvbic6OTU5LCBcbiAgJ3BpJzo5NjAsIFxuICAncmhvJzo5NjEsIFxuICAnc2lnbWFmJzo5NjIsIFxuICAnc2lnbWEnOjk2MywgXG4gICd0YXUnOjk2NCwgXG4gICd1cHNpbG9uJzo5NjUsIFxuICAncGhpJzo5NjYsIFxuICAnY2hpJzo5NjcsIFxuICAncHNpJzo5NjgsIFxuICAnb21lZ2EnOjk2OSwgXG4gICd0aGV0YXN5bSc6OTc3LCBcbiAgJ3Vwc2loJzo5NzgsIFxuICAncGl2Jzo5ODIsIFxuICAnYnVsbCc6ODIyNiwgXG4gICdoZWxsaXAnOjgyMzAsIFxuICAncHJpbWUnOjgyNDIsIFxuICAnUHJpbWUnOjgyNDMsIFxuICAnb2xpbmUnOjgyNTQsIFxuICAnZnJhc2wnOjgyNjAsIFxuICAnd2VpZXJwJzo4NDcyLCBcbiAgJ2ltYWdlJzo4NDY1LCBcbiAgJ3JlYWwnOjg0NzYsIFxuICAndHJhZGUnOjg0ODIsIFxuICAnYWxlZnN5bSc6ODUwMSwgXG4gICdsYXJyJzo4NTkyLCBcbiAgJ3VhcnInOjg1OTMsIFxuICAncmFycic6ODU5NCwgXG4gICdkYXJyJzo4NTk1LCBcbiAgJ2hhcnInOjg1OTYsIFxuICAnY3JhcnInOjg2MjksIFxuICAnbEFycic6ODY1NiwgXG4gICd1QXJyJzo4NjU3LCBcbiAgJ3JBcnInOjg2NTgsIFxuICAnZEFycic6ODY1OSwgXG4gICdoQXJyJzo4NjYwLCBcbiAgJ2ZvcmFsbCc6ODcwNCwgXG4gICdwYXJ0Jzo4NzA2LCBcbiAgJ2V4aXN0Jzo4NzA3LCBcbiAgJ2VtcHR5Jzo4NzA5LCBcbiAgJ25hYmxhJzo4NzExLCBcbiAgJ2lzaW4nOjg3MTIsIFxuICAnbm90aW4nOjg3MTMsIFxuICAnbmknOjg3MTUsIFxuICAncHJvZCc6ODcxOSwgXG4gICdzdW0nOjg3MjEsIFxuICAnbWludXMnOjg3MjIsIFxuICAnbG93YXN0Jzo4NzI3LCBcbiAgJ3JhZGljJzo4NzMwLCBcbiAgJ3Byb3AnOjg3MzMsIFxuICAnaW5maW4nOjg3MzQsIFxuICAnYW5nJzo4NzM2LCBcbiAgJ2FuZCc6ODc0MywgXG4gICdvcic6ODc0NCwgXG4gICdjYXAnOjg3NDUsIFxuICAnY3VwJzo4NzQ2LCBcbiAgJ2ludCc6ODc0NywgXG4gICd0aGVyZTQnOjg3NTYsIFxuICAnc2ltJzo4NzY0LCBcbiAgJ2NvbmcnOjg3NzMsIFxuICAnYXN5bXAnOjg3NzYsIFxuICAnbmUnOjg4MDAsIFxuICAnZXF1aXYnOjg4MDEsIFxuICAnbGUnOjg4MDQsIFxuICAnZ2UnOjg4MDUsIFxuICAnc3ViJzo4ODM0LCBcbiAgJ3N1cCc6ODgzNSwgXG4gICduc3ViJzo4ODM2LCBcbiAgJ3N1YmUnOjg4MzgsIFxuICAnc3VwZSc6ODgzOSwgXG4gICdvcGx1cyc6ODg1MywgXG4gICdvdGltZXMnOjg4NTUsIFxuICAncGVycCc6ODg2OSwgXG4gICdzZG90Jzo4OTAxLCBcbiAgJ2xjZWlsJzo4OTY4LCBcbiAgJ3JjZWlsJzo4OTY5LCBcbiAgJ2xmbG9vcic6ODk3MCwgXG4gICdyZmxvb3InOjg5NzEsIFxuICAnbGFuZyc6OTAwMSwgXG4gICdyYW5nJzo5MDAyLCBcbiAgJ2xveic6OTY3NCwgXG4gICdzcGFkZXMnOjk4MjQsIFxuICAnY2x1YnMnOjk4MjcsIFxuICAnaGVhcnRzJzo5ODI5LCBcbiAgJ2RpYW1zJzo5ODMwLCBcbiAgJ09FbGlnJzozMzgsIFxuICAnb2VsaWcnOjMzOSwgXG4gICdTY2Fyb24nOjM1MiwgXG4gICdzY2Fyb24nOjM1MywgXG4gICdZdW1sJzozNzYsIFxuICAnY2lyYyc6NzEwLCBcbiAgJ3RpbGRlJzo3MzIsIFxuICAnZW5zcCc6ODE5NCwgXG4gICdlbXNwJzo4MTk1LCBcbiAgJ3RoaW5zcCc6ODIwMSwgXG4gICd6d25qJzo4MjA0LCBcbiAgJ3p3aic6ODIwNSwgXG4gICdscm0nOjgyMDYsIFxuICAncmxtJzo4MjA3LCBcbiAgJ25kYXNoJzo4MjExLCBcbiAgJ21kYXNoJzo4MjEyLCBcbiAgJ2xzcXVvJzo4MjE2LCBcbiAgJ3JzcXVvJzo4MjE3LCBcbiAgJ3NicXVvJzo4MjE4LCBcbiAgJ2xkcXVvJzo4MjIwLCBcbiAgJ3JkcXVvJzo4MjIxLCBcbiAgJ2JkcXVvJzo4MjIyLCBcbiAgJ2RhZ2dlcic6ODIyNCwgXG4gICdEYWdnZXInOjgyMjUsIFxuICAncGVybWlsJzo4MjQwLCBcbiAgJ2xzYXF1byc6ODI0OSwgXG4gICdyc2FxdW8nOjgyNTAsIFxuICAnZXVybyc6ODM2NFxufVxuXG5cblxubW9kdWxlLmV4cG9ydHMgID0gZW50aXRpZXM7IiwiLy8gc2ltcGxlc3QgZXZlbnQgZW1pdHRlciA2MCBsaW5lc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudmFyIHNsaWNlID0gW10uc2xpY2UsIF8gPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbnZhciBBUEkgPSB7XG4gICAgJG9uOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgaWYodHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiKXtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvbihpLCBldmVudFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gQHBhdGNoOiBmb3IgbGlzdFxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGhhbmRsZXMgPSBjb250ZXh0Ll9oYW5kbGVzIHx8IChjb250ZXh0Ll9oYW5kbGVzID0ge30pLFxuICAgICAgICAgICAgICAgIGNhbGxzID0gaGFuZGxlc1tldmVudF0gfHwgKGhhbmRsZXNbZXZlbnRdID0gW10pO1xuICAgICAgICAgICAgY2FsbHMucHVzaChmbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAkb2ZmOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICBpZighY29udGV4dC5faGFuZGxlcykgcmV0dXJuO1xuICAgICAgICBpZighZXZlbnQpIHRoaXMuX2hhbmRsZXMgPSB7fTtcbiAgICAgICAgdmFyIGhhbmRsZXMgPSBjb250ZXh0Ll9oYW5kbGVzLFxuICAgICAgICAgICAgY2FsbHM7XG5cbiAgICAgICAgaWYgKGNhbGxzID0gaGFuZGxlc1tldmVudF0pIHtcbiAgICAgICAgICAgIGlmICghZm4pIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVzW2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZuID09PSBjYWxsc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxscy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9LFxuICAgIC8vIGJ1YmJsZSBldmVudFxuICAgICRlbWl0OiBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIC8vIEBwYXRjaDogZm9yIGxpc3RcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICB2YXIgaGFuZGxlcyA9IGNvbnRleHQuX2hhbmRsZXMsIGNhbGxzLCBhcmdzLCB0eXBlO1xuICAgICAgICBpZighZXZlbnQpIHJldHVybjtcbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHZhciB0eXBlID0gZXZlbnQ7XG5cbiAgICAgICAgaWYoIWhhbmRsZXMpIHJldHVybiBjb250ZXh0O1xuICAgICAgICBpZihjYWxscyA9IGhhbmRsZXNbdHlwZS5zbGljZSgxKV0pe1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbiA9IGNhbGxzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbHNbal0uYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIShjYWxscyA9IGhhbmRsZXNbdHlwZV0pKSByZXR1cm4gY29udGV4dDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjYWxsc1tpXS5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmKGNhbGxzLmxlbmd0aCkgY29udGV4dC4kdXBkYXRlKCk7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH0sXG4gICAgLy8gY2FwdHVyZSAgZXZlbnRcbiAgICAkYnJvYWRjYXN0OiBmdW5jdGlvbigpe1xuICAgICAgICBcbiAgICB9XG59XG4vLyBjb250YWluZXIgY2xhc3NcbmZ1bmN0aW9uIEV2ZW50KCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgdGhpcy4kb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbl8uZXh0ZW5kKEV2ZW50LnByb3RvdHlwZSwgQVBJKVxuXG5FdmVudC5taXhUbyA9IGZ1bmN0aW9uKG9iail7XG4gIG9iaiA9IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/IG9iai5wcm90b3R5cGUgOiBvYmo7XG4gIF8uZXh0ZW5kKG9iaiwgQVBJKVxufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudDsiLCIvLyAoYykgMjAxMC0yMDE0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyBCYWNrYm9uZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbi8vIEZvciBhbGwgZGV0YWlscyBhbmQgZG9jdW1lbnRhdGlvbjpcbi8vIGh0dHA6Ly9iYWNrYm9uZWpzLm9yZ1xuXG4vLyBrbGFzczogYSBjbGFzc2ljYWwgSlMgT09QIGZhw6dhZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQva2xhc3Ncbi8vIExpY2Vuc2UgTUlUIChjKSBEdXN0aW4gRGlheiAyMDE0XG4gIFxuLy8gaW5zcGlyZWQgYnkgYmFja2JvbmUncyBleHRlbmQgYW5kIGtsYXNzXG52YXIgXyA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpLFxuICBmblRlc3QgPSAveHkvLnRlc3QoZnVuY3Rpb24oKXtcInh5XCI7fSkgPyAvXFxic3VwclxcYi86Ly4qLyxcbiAgaXNGbiA9IGZ1bmN0aW9uKG8pe3JldHVybiB0eXBlb2YgbyA9PT0gXCJmdW5jdGlvblwifTtcblxuXG5mdW5jdGlvbiB3cmFwKGssIGZuLCBzdXBybykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0bXAgPSB0aGlzLnN1cHI7XG4gICAgdGhpcy5zdXByID0gc3Vwcm9ba107XG4gICAgdmFyIHJldCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5zdXByID0gdG1wO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzcyggd2hhdCwgbywgc3Vwcm8gKSB7XG4gIGZvciAoIHZhciBrIGluIG8gKSB7XG4gICAgaWYgKG8uaGFzT3duUHJvcGVydHkoaykpIHtcblxuICAgICAgd2hhdFtrXSA9IGlzRm4oIG9ba10gKSAmJiBpc0ZuKCBzdXByb1trXSApICYmIFxuICAgICAgICBmblRlc3QudGVzdCggb1trXSApID8gd3JhcChrLCBvW2tdLCBzdXBybykgOiBvW2tdO1xuICAgIH1cbiAgfVxufVxuXG4vLyBpZiB0aGUgcHJvcGVydHkgaXMgW1wiZXZlbnRzXCIsIFwiZGF0YVwiLCBcImNvbXB1dGVkXCJdICwgd2Ugc2hvdWxkIG1lcmdlIHRoZW1cbnZhciBtZXJnZWQgPSBbXCJldmVudHNcIiwgXCJkYXRhXCIsIFwiY29tcHV0ZWRcIl0sIG1sZW4gPSBtZXJnZWQubGVuZ3RoO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQobyl7XG4gIG8gPSBvIHx8IHt9O1xuICB2YXIgc3VwciA9IHRoaXMsIHByb3RvLFxuICAgIHN1cHJvID0gc3VwciAmJiBzdXByLnByb3RvdHlwZSB8fCB7fTtcblxuICBpZih0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgcHJvdG8gPSBvLnByb3RvdHlwZTtcbiAgICBvLmltcGxlbWVudCA9IGltcGxlbWVudDtcbiAgICBvLmV4dGVuZCA9IGV4dGVuZDtcbiAgICByZXR1cm4gbztcbiAgfSBcbiAgXG4gIGZ1bmN0aW9uIGZuKCkge1xuICAgIHN1cHIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHByb3RvID0gXy5jcmVhdGVQcm90byhmbiwgc3Vwcm8pO1xuXG4gIGZ1bmN0aW9uIGltcGxlbWVudChvKXtcbiAgICAvLyB3ZSBuZWVkIG1lcmdlIHRoZSBtZXJnZWQgcHJvcGVydHlcbiAgICB2YXIgbGVuID0gbWxlbjtcbiAgICBmb3IoO2xlbi0tOyl7XG4gICAgICB2YXIgcHJvcCA9IG1lcmdlZFtsZW5dO1xuICAgICAgaWYoby5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBwcm90by5oYXNPd25Qcm9wZXJ0eShwcm9wKSl7XG4gICAgICAgIF8uZXh0ZW5kKHByb3RvW3Byb3BdLCBvW3Byb3BdLCB0cnVlKSBcbiAgICAgICAgZGVsZXRlIG9bcHJvcF07XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBwcm9jZXNzKHByb3RvLCBvLCBzdXBybyk7IFxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuXG4gIGZuLmltcGxlbWVudCA9IGltcGxlbWVudFxuICBmbi5pbXBsZW1lbnQobylcbiAgaWYoc3Vwci5fX2FmdGVyX18pIHN1cHIuX19hZnRlcl9fLmNhbGwoZm4sIHN1cHIsIG8pO1xuICBmbi5leHRlbmQgPSBleHRlbmQ7XG4gIHJldHVybiBmbjtcbn1cblxuIiwiXG52YXIgZiA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGpzb246ICB0d28gd2F5IFxuLy8gIC0gZ2V0OiBKU09OLnN0cmluZ2lmeVxuLy8gIC0gc2V0OiBKU09OLnBhcnNlXG4vLyAgLSBleGFtcGxlOiBgeyB0aXRsZXxqc29uIH1gXG5mLmpzb24gPSB7XG4gIGdldDogZnVuY3Rpb24oIHZhbHVlICl7XG4gICAgcmV0dXJuIHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJz8gSlNPTi5zdHJpbmdpZnkodmFsdWUpOiB2YWx1ZTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiggdmFsdWUgKXtcbiAgICByZXR1cm4gdHlwZW9mIEpTT04gIT09ICd1bmRlZmluZWQnPyBKU09OLnBhcnNlKHZhbHVlKSA6IHZhbHVlO1xuICB9XG59XG5cbi8vIGxhc3Q6IG9uZS13YXlcbi8vICAtIGdldDogcmV0dXJuIHRoZSBsYXN0IGl0ZW0gaW4gbGlzdFxuLy8gIC0gZXhhbXBsZTogYHsgbGlzdHxsYXN0IH1gXG5mLmxhc3QgPSBmdW5jdGlvbihhcnIpe1xuICByZXR1cm4gYXJyICYmIGFyclthcnIubGVuZ3RoIC0gMV07XG59XG5cbi8vIGF2ZXJhZ2U6IG9uZS13YXlcbi8vICAtIGdldDogY29wdXRlIHRoZSBhdmVyYWdlIG9mIHRoZSBsaXN0XG4vLyAgLSBleGFtcGxlOiBgeyBsaXN0fCBhdmVyYWdlOiBcInNjb3JlXCIgfWBcbmYuYXZlcmFnZSA9IGZ1bmN0aW9uKGFycmF5LCBrZXkpe1xuICBhcnJheSA9IGFycmF5IHx8IFtdO1xuICByZXR1cm4gYXJyYXkubGVuZ3RoPyBmLnRvdGFsKGFycmF5LCBrZXkpLyBhcnJheS5sZW5ndGggOiAwO1xufVxuXG5cbi8vIHRvdGFsOiBvbmUtd2F5XG4vLyAgLSBnZXQ6IGNvcHV0ZSB0aGUgdG90YWwgb2YgdGhlIGxpc3Rcbi8vICAtIGV4YW1wbGU6IGB7IGxpc3R8IGF2ZXJhZ2U6IFwic2NvcmVcIiB9YFxuZi50b3RhbCA9IGZ1bmN0aW9uKGFycmF5LCBrZXkpe1xuICB2YXIgdG90YWwgPSAwO1xuICBpZighYXJyYXkpIHJldHVybjtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApe1xuICAgIHRvdGFsICs9IGtleT8gaXRlbVtrZXldIDogaXRlbTtcbiAgfSlcbiAgcmV0dXJuIHRvdGFsO1xufVxuXG4vLyB2YXIgYmFzaWNTb3J0Rm4gPSBmdW5jdGlvbihhLCBiKXtyZXR1cm4gYiAtIGF9XG5cbi8vIGYuc29ydCA9IGZ1bmN0aW9uKGFycmF5LCBrZXksIHJldmVyc2Upe1xuLy8gICB2YXIgdHlwZSA9IHR5cGVvZiBrZXksIHNvcnRGbjsgXG4vLyAgIHN3aXRjaCh0eXBlKXtcbi8vICAgICBjYXNlICdmdW5jdGlvbic6IHNvcnRGbiA9IGtleTsgYnJlYWs7XG4vLyAgICAgY2FzZSAnc3RyaW5nJzogc29ydEZuID0gZnVuY3Rpb24oYSwgYil7fTticmVhaztcbi8vICAgICBkZWZhdWx0OlxuLy8gICAgICAgc29ydEZuID0gYmFzaWNTb3J0Rm47XG4vLyAgIH1cbi8vICAgLy8gbmVlZCBvdGhlciByZWZlcm5jZS5cbi8vICAgcmV0dXJuIGFycmF5LnNsaWNlKCkuc29ydChmdW5jdGlvbihhLGIpe1xuLy8gICAgIHJldHVybiByZXZlcnNlPyAtc29ydEZuKGEsIGIpOiBzb3J0Rm4oYSwgYik7XG4vLyAgIH0pXG4vLyAgIHJldHVybiBhcnJheVxuLy8gfVxuXG5cbiIsInZhciBleHByQ2FjaGUgPSByZXF1aXJlKCcuLi9lbnYnKS5leHByQ2FjaGU7XG52YXIgXyA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuLi9wYXJzZXIvUGFyc2VyLmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4cHJlc3Npb246IGZ1bmN0aW9uKGV4cHIsIHNpbXBsZSl7XG4gICAgLy8gQFRPRE8gY2FjaGVcbiAgICBpZiggdHlwZW9mIGV4cHIgPT09ICdzdHJpbmcnICYmICggZXhwciA9IGV4cHIudHJpbSgpICkgKXtcbiAgICAgIGV4cHIgPSBleHByQ2FjaGUuZ2V0KCBleHByICkgfHwgZXhwckNhY2hlLnNldCggZXhwciwgbmV3IFBhcnNlciggZXhwciwgeyBtb2RlOiAyLCBleHByZXNzaW9uOiB0cnVlIH0gKS5leHByZXNzaW9uKCkgKVxuICAgIH1cbiAgICBpZihleHByKSByZXR1cm4gZXhwcjtcbiAgfSxcbiAgcGFyc2U6IGZ1bmN0aW9uKHRlbXBsYXRlKXtcbiAgICByZXR1cm4gbmV3IFBhcnNlcih0ZW1wbGF0ZSkucGFyc2UoKTtcbiAgfVxufVxuXG4iLCIvLyBzaGltIGZvciBlczVcbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIHRzdHIgPSAoe30pLnRvU3RyaW5nO1xuXG5mdW5jdGlvbiBleHRlbmQobzEsIG8yICl7XG4gIGZvcih2YXIgaSBpbiBvMikgaWYoIG8xW2ldID09PSB1bmRlZmluZWQpe1xuICAgIG8xW2ldID0gbzJbaV1cbiAgfVxufVxuXG4vLyBTdHJpbmcgcHJvdG8gO1xuZXh0ZW5kKFN0cmluZy5wcm90b3R5cGUsIHtcbiAgdHJpbTogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIH1cbn0pO1xuXG5cbi8vIEFycmF5IHByb3RvO1xuZXh0ZW5kKEFycmF5LnByb3RvdHlwZSwge1xuICBpbmRleE9mOiBmdW5jdGlvbihvYmosIGZyb20pe1xuICAgIGZyb20gPSBmcm9tIHx8IDA7XG4gICAgZm9yICh2YXIgaSA9IGZyb20sIGxlbiA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICh0aGlzW2ldID09PSBvYmopIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH0sXG4gIGZvckVhY2g6IGZ1bmN0aW9uKGNhbGxiYWNrLCBjb250ZXh0KXtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICB9XG4gIH0sXG4gIGZpbHRlcjogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpe1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhc3MgPSBjYWxsYmFjay5jYWxsKGNvbnRleHQsIHRoaXNbaV0sIGksIHRoaXMpO1xuICAgICAgaWYocGFzcykgcmVzLnB1c2godGhpc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH0sXG4gIG1hcDogZnVuY3Rpb24oY2FsbGJhY2ssIGNvbnRleHQpe1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2goY2FsbGJhY2suY2FsbChjb250ZXh0LCB0aGlzW2ldLCBpLCB0aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbn0pO1xuXG4vLyBGdW5jdGlvbiBwcm90bztcbmV4dGVuZChGdW5jdGlvbi5wcm90b3R5cGUsIHtcbiAgYmluZDogZnVuY3Rpb24oY29udGV4dCl7XG4gICAgdmFyIGZuID0gdGhpcztcbiAgICB2YXIgcHJlQXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICAgIHZhciBhcmdzID0gcHJlQXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9XG4gIH1cbn0pXG5cbi8vIE9iamVjdFxuZXh0ZW5kKE9iamVjdCwge1xuICBrZXlzOiBmdW5jdGlvbihvYmope1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yKHZhciBpIGluIG9iaikgaWYob2JqLmhhc093blByb3BlcnR5KGkpKXtcbiAgICAgIGtleXMucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG4gIH0gXG59KVxuXG4vLyBEYXRlXG5leHRlbmQoRGF0ZSwge1xuICBub3c6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICtuZXcgRGF0ZTtcbiAgfVxufSlcbi8vIEFycmF5XG5leHRlbmQoQXJyYXksIHtcbiAgaXNBcnJheTogZnVuY3Rpb24oYXJyKXtcbiAgICByZXR1cm4gdHN0ci5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgfVxufSlcbiIsInZhciBfID0gcmVxdWlyZSgnLi4vdXRpbC5qcycpO1xudmFyIHBhcnNlRXhwcmVzc2lvbiA9IHJlcXVpcmUoJy4vcGFyc2UuanMnKS5leHByZXNzaW9uO1xuXG5cbmZ1bmN0aW9uIFdhdGNoZXIoKXt9XG5cbnZhciBtZXRob2RzID0ge1xuICAkd2F0Y2g6IGZ1bmN0aW9uKGV4cHIsIGZuLCBvcHRpb25zKXtcbiAgICB2YXIgZ2V0LCBvbmNlLCB0ZXN0LCBybGVuLCBleHRyYSA9IHRoaXMuX19leHRfXzsgLy9yZWNvcmRzIGxlbmd0aFxuICAgIGlmKCF0aGlzLl93YXRjaGVycykgdGhpcy5fd2F0Y2hlcnMgPSBbXTtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmKG9wdGlvbnMgPT09IHRydWUpe1xuICAgICAgIG9wdGlvbnMgPSB7IGRlZXA6IHRydWUgfVxuICAgIH1cbiAgICB2YXIgdWlkID0gXy51aWQoJ3dfJyk7XG4gICAgaWYoQXJyYXkuaXNBcnJheShleHByKSl7XG4gICAgICB2YXIgdGVzdHMgPSBbXTtcbiAgICAgIGZvcih2YXIgaSA9IDAsbGVuID0gZXhwci5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgdGVzdHMucHVzaCh0aGlzLiRleHByZXNzaW9uKGV4cHJbaV0pLmdldClcbiAgICAgIH1cbiAgICAgIHZhciBwcmV2ID0gW107XG4gICAgICB0ZXN0ID0gZnVuY3Rpb24oY29udGV4dCl7XG4gICAgICAgIHZhciBlcXVhbCA9IHRydWU7XG4gICAgICAgIGZvcih2YXIgaSA9MCwgbGVuID0gdGVzdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgIHZhciBzcGxpY2UgPSB0ZXN0c1tpXShjb250ZXh0LCBleHRyYSk7XG4gICAgICAgICAgaWYoIV8uZXF1YWxzKHNwbGljZSwgcHJldltpXSkpe1xuICAgICAgICAgICAgIGVxdWFsID0gZmFsc2U7XG4gICAgICAgICAgICAgcHJldltpXSA9IF8uY2xvbmUoc3BsaWNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVxdWFsPyBmYWxzZTogcHJldjtcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIGV4cHIgPSB0aGlzLl90b3VjaEV4cHIoIHBhcnNlRXhwcmVzc2lvbihleHByKSApO1xuICAgICAgZ2V0ID0gZXhwci5nZXQ7XG4gICAgICBvbmNlID0gZXhwci5vbmNlO1xuICAgIH1cblxuICAgIHZhciB3YXRjaGVyID0ge1xuICAgICAgaWQ6IHVpZCwgXG4gICAgICBnZXQ6IGdldCwgXG4gICAgICBmbjogZm4sIFxuICAgICAgb25jZTogb25jZSwgXG4gICAgICBmb3JjZTogb3B0aW9ucy5mb3JjZSxcbiAgICAgIHRlc3Q6IHRlc3QsXG4gICAgICBkZWVwOiBvcHRpb25zLmRlZXAsXG4gICAgICBsYXN0OiBvcHRpb25zLnN5bmM/IGdldCh0aGlzKTogdW5kZWZpbmVkXG4gICAgfVxuICAgIFxuICAgIHRoaXMuX3dhdGNoZXJzLnB1c2goIHdhdGNoZXIgKTtcblxuICAgIHJsZW4gPSB0aGlzLl9yZWNvcmRzICYmIHRoaXMuX3JlY29yZHMubGVuZ3RoO1xuICAgIGlmKHJsZW4pIHRoaXMuX3JlY29yZHNbcmxlbi0xXS5wdXNoKHVpZClcbiAgICAvLyBpbml0IHN0YXRlLlxuICAgIGlmKG9wdGlvbnMuaW5pdCA9PT0gdHJ1ZSl7XG4gICAgICB0aGlzLiRwaGFzZSA9ICdkaWdlc3QnO1xuICAgICAgdGhpcy5fY2hlY2tTaW5nbGVXYXRjaCggd2F0Y2hlciwgdGhpcy5fd2F0Y2hlcnMubGVuZ3RoLTEgKTtcbiAgICAgIHRoaXMuJHBoYXNlID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHdhdGNoZXI7XG4gIH0sXG4gICR1bndhdGNoOiBmdW5jdGlvbih1aWQpe1xuICAgIHVpZCA9IHVpZC51aWQgfHwgdWlkO1xuICAgIGlmKCF0aGlzLl93YXRjaGVycykgdGhpcy5fd2F0Y2hlcnMgPSBbXTtcbiAgICBpZihBcnJheS5pc0FycmF5KHVpZCkpe1xuICAgICAgZm9yKHZhciBpID0wLCBsZW4gPSB1aWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICB0aGlzLiR1bndhdGNoKHVpZFtpXSk7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICB2YXIgd2F0Y2hlcnMgPSB0aGlzLl93YXRjaGVycywgd2F0Y2hlciwgd2xlbjtcbiAgICAgIGlmKCF1aWQgfHwgIXdhdGNoZXJzIHx8ICEod2xlbiA9IHdhdGNoZXJzLmxlbmd0aCkpIHJldHVybjtcbiAgICAgIGZvcig7d2xlbi0tOyl7XG4gICAgICAgIHdhdGNoZXIgPSB3YXRjaGVyc1t3bGVuXTtcbiAgICAgICAgaWYod2F0Y2hlciAmJiB3YXRjaGVyLmlkID09PSB1aWQgKXtcbiAgICAgICAgICB3YXRjaGVycy5zcGxpY2Uod2xlbiwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gICRleHByZXNzaW9uOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgcmV0dXJuIHRoaXMuX3RvdWNoRXhwcihwYXJzZUV4cHJlc3Npb24odmFsdWUpKVxuICB9LFxuICAvKipcbiAgICogdGhlIHdob2xlIGRpZ2VzdCBsb29wICxqdXN0IGxpa2UgYW5ndWxhciwgaXQganVzdCBhIGRpcnR5LWNoZWNrIGxvb3A7XG4gICAqIEBwYXJhbSAge1N0cmluZ30gcGF0aCAgbm93IHJlZ3VsYXIgcHJvY2VzcyBhIHB1cmUgZGlydHktY2hlY2sgbG9vcCwgYnV0IGluIHBhcnNlIHBoYXNlLCBcbiAgICogICAgICAgICAgICAgICAgICBSZWd1bGFyJ3MgcGFyc2VyIGV4dHJhY3QgdGhlIGRlcGVuZGVuY2llcywgaW4gZnV0dXJlIG1heWJlIGl0IHdpbGwgY2hhbmdlIHRvIGRpcnR5LWNoZWNrIGNvbWJpbmUgd2l0aCBwYXRoLWF3YXJlIHVwZGF0ZTtcbiAgICogQHJldHVybiB7Vm9pZH0gICBcbiAgICovXG5cbiAgJGRpZ2VzdDogZnVuY3Rpb24oKXtcbiAgICBpZih0aGlzLiRwaGFzZSA9PT0gJ2RpZ2VzdCcgfHwgdGhpcy5fbXV0ZSkgcmV0dXJuO1xuICAgIHRoaXMuJHBoYXNlID0gJ2RpZ2VzdCc7XG4gICAgdmFyIGRpcnR5ID0gZmFsc2UsIG4gPTA7XG4gICAgd2hpbGUoZGlydHkgPSB0aGlzLl9kaWdlc3QoKSl7XG5cbiAgICAgIGlmKCgrK24pID4gMjApeyAvLyBtYXggbG9vcFxuICAgICAgICB0aHJvdyAndGhlcmUgbWF5IGEgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIHJlYWNoZXMnIFxuICAgICAgfVxuICAgIH1cbiAgICBpZiggbiA+IDAgJiYgdGhpcy4kZW1pdCkgdGhpcy4kZW1pdChcIiR1cGRhdGVcIik7XG4gICAgdGhpcy4kcGhhc2UgPSBudWxsO1xuICB9LFxuICAvLyBwcml2YXRlIGRpZ2VzdCBsb2dpY1xuICBfZGlnZXN0OiBmdW5jdGlvbigpe1xuICAgIC8vIGlmKHRoaXMuY29udGV4dCkgcmV0dXJuIHRoaXMuY29udGV4dC4kZGlnZXN0KCk7XG4gICAgLy8gaWYodGhpcy4kZW1pdCkgdGhpcy4kZW1pdCgnZGlnZXN0Jyk7XG4gICAgdmFyIHdhdGNoZXJzID0gdGhpcy5fd2F0Y2hlcnM7XG4gICAgdmFyIGRpcnR5ID0gZmFsc2UsIGNoaWxkcmVuLCB3YXRjaGVyLCB3YXRjaGVyRGlydHk7XG4gICAgaWYod2F0Y2hlcnMgJiYgd2F0Y2hlcnMubGVuZ3RoKXtcbiAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHdhdGNoZXJzLmxlbmd0aDtpIDwgbGVuOyBpKyspe1xuICAgICAgICB3YXRjaGVyID0gd2F0Y2hlcnNbaV07XG4gICAgICAgIHdhdGNoZXJEaXJ0eSA9IHRoaXMuX2NoZWNrU2luZ2xlV2F0Y2god2F0Y2hlciwgaSk7XG4gICAgICAgIGlmKHdhdGNoZXJEaXJ0eSkgZGlydHkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBjaGVjayBjaGlsZHJlbidzIGRpcnR5LlxuICAgIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XG4gICAgaWYoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKXtcbiAgICAgIGZvcih2YXIgbSA9IDAsIG1sZW4gPSBjaGlsZHJlbi5sZW5ndGg7IG0gPCBtbGVuOyBtKyspe1xuICAgICAgICBpZihjaGlsZHJlblttXS5fZGlnZXN0KCkpIGRpcnR5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRpcnR5O1xuICB9LFxuICAvLyBjaGVjayBhIHNpbmdsZSBvbmUgd2F0Y2hlciBcbiAgX2NoZWNrU2luZ2xlV2F0Y2g6IGZ1bmN0aW9uKHdhdGNoZXIsIGkpe1xuICAgIHZhciBkaXJ0eSA9IGZhbHNlO1xuICAgIGlmKCF3YXRjaGVyKSByZXR1cm47XG4gICAgaWYod2F0Y2hlci50ZXN0KSB7IC8vbXVsdGkgXG4gICAgICB2YXIgcmVzdWx0ID0gd2F0Y2hlci50ZXN0KHRoaXMpO1xuICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICB3YXRjaGVyLmZuLmFwcGx5KHRoaXMsIHJlc3VsdClcbiAgICAgIH1cbiAgICB9ZWxzZXtcblxuICAgICAgdmFyIG5vdyA9IHdhdGNoZXIuZ2V0KHRoaXMpO1xuICAgICAgdmFyIGxhc3QgPSB3YXRjaGVyLmxhc3Q7XG4gICAgICB2YXIgZXEgPSB0cnVlO1xuXG4gICAgICBpZihfLnR5cGVPZiggbm93ICkgPT09ICdvYmplY3QnICYmIHdhdGNoZXIuZGVlcCl7XG4gICAgICAgIGlmKCF3YXRjaGVyLmxhc3Qpe1xuICAgICAgICAgICBlcSA9IGZhbHNlO1xuICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgZm9yKHZhciBqIGluIG5vdyl7XG4gICAgICAgICAgICBpZih3YXRjaGVyLmxhc3Rbal0gIT09IG5vd1tqXSl7XG4gICAgICAgICAgICAgIGVxID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihlcSAhPT0gZmFsc2Upe1xuICAgICAgICAgICAgZm9yKHZhciBuIGluIGxhc3Qpe1xuICAgICAgICAgICAgICBpZihsYXN0W25dICE9PSBub3dbbl0pe1xuICAgICAgICAgICAgICAgIGVxID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICBlcSA9IF8uZXF1YWxzKG5vdywgd2F0Y2hlci5sYXN0KTtcbiAgICAgIH1cbiAgICAgIGlmKGVxID09PSBmYWxzZSB8fCB3YXRjaGVyLmZvcmNlKXsgLy8gaW4gc29tZSBjYXNlLiBpZiB1bmRlZmluZWQsIHdlIG11c3QgZm9yY2UgZGlnZXN0LlxuICAgICAgICBlcSA9IGZhbHNlO1xuICAgICAgICB3YXRjaGVyLmZvcmNlID0gbnVsbDtcbiAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICB3YXRjaGVyLmZuLmNhbGwodGhpcywgbm93LCB3YXRjaGVyLmxhc3QpO1xuICAgICAgICBpZih0eXBlb2Ygbm93ICE9PSAnb2JqZWN0J3x8IHdhdGNoZXIuZGVlcCl7XG4gICAgICAgICAgd2F0Y2hlci5sYXN0ID0gXy5jbG9uZShub3cpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB3YXRjaGVyLmxhc3QgPSBub3c7XG4gICAgICAgIH1cbiAgICAgIH1lbHNleyAvLyBpZiBlcSA9PSB0cnVlXG4gICAgICAgIGlmKCBfLnR5cGVPZihlcSkgPT09ICdhcnJheScgJiYgZXEubGVuZ3RoICl7XG4gICAgICAgICAgd2F0Y2hlci5sYXN0ID0gXy5jbG9uZShub3cpO1xuICAgICAgICAgIHdhdGNoZXIuZm4uY2FsbCh0aGlzLCBub3csIGVxKTtcbiAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGVxID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQFRPRE9cbiAgICAgIGlmKGRpcnR5ICYmIHdhdGNoZXIub25jZSkgdGhpcy5fd2F0Y2hlcnMuc3BsaWNlKGksIDEpO1xuXG4gICAgICByZXR1cm4gZGlydHk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiAqKnRpcHMqKjogd2hhdGV2ZXIgcGFyYW0geW91IHBhc3NlZCBpbiAkdXBkYXRlLCBhZnRlciB0aGUgZnVuY3Rpb24gY2FsbGVkLCBkaXJ0eS1jaGVjayhkaWdlc3QpIHBoYXNlIHdpbGwgZW50ZXI7XG4gICAqIFxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbnxTdHJpbmd8RXhwcmVzc2lvbn0gcGF0aCAgXG4gICAqIEBwYXJhbSAge1doYXRldmVyfSB2YWx1ZSBvcHRpb25hbCwgd2hlbiBwYXRoIGlzIEZ1bmN0aW9uLCB0aGUgdmFsdWUgaXMgaWdub3JlZFxuICAgKiBAcmV0dXJuIHt0aGlzfSAgICAgdGhpcyBcbiAgICovXG4gICRzZXQ6IGZ1bmN0aW9uKHBhdGgsIHZhbHVlKXtcbiAgICBpZihwYXRoICE9IG51bGwpe1xuICAgICAgdmFyIHR5cGUgPSBfLnR5cGVPZihwYXRoKTtcbiAgICAgIGlmKCB0eXBlID09PSAnc3RyaW5nJyB8fCBwYXRoLnR5cGUgPT09ICdleHByZXNzaW9uJyApe1xuICAgICAgICBwYXRoID0gdGhpcy4kZXhwcmVzc2lvbihwYXRoKTtcbiAgICAgICAgcGF0aC5zZXQodGhpcywgdmFsdWUpO1xuICAgICAgfWVsc2UgaWYodHlwZSA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgIHBhdGguY2FsbCh0aGlzLCB0aGlzLmRhdGEpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGZvcih2YXIgaSBpbiBwYXRoKSB7XG4gICAgICAgICAgdGhpcy4kc2V0KGksIHBhdGhbaV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gICRnZXQ6IGZ1bmN0aW9uKGV4cHIpICB7XG4gICAgcmV0dXJuIHRoaXMuJGV4cHJlc3Npb24oZXhwcikuZ2V0KHRoaXMpO1xuICB9LFxuICAkdXBkYXRlOiBmdW5jdGlvbigpe1xuICAgIHRoaXMuJHNldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciByb290UGFyZW50ID0gdGhpcztcblxuICAgIGRve1xuICAgICAgaWYocm9vdFBhcmVudC5kYXRhLmlzb2xhdGUgfHwgIXJvb3RQYXJlbnQuJHBhcmVudCkgYnJlYWs7XG4gICAgICByb290UGFyZW50ID0gcm9vdFBhcmVudC4kcGFyZW50O1xuICAgIH0gd2hpbGUocm9vdFBhcmVudClcblxuICAgIHJvb3RQYXJlbnQuJGRpZ2VzdCgpO1xuICB9LFxuICAvLyBhdXRvIGNvbGxlY3Qgd2F0Y2hlcnMgZm9yIGxvZ2ljLWNvbnRyb2wuXG4gIF9yZWNvcmQ6IGZ1bmN0aW9uKCl7XG4gICAgaWYoIXRoaXMuX3JlY29yZHMpIHRoaXMuX3JlY29yZHMgPSBbXTtcbiAgICB0aGlzLl9yZWNvcmRzLnB1c2goW10pO1xuICB9LFxuICBfcmVsZWFzZTogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3Jkcy5wb3AoKTtcbiAgfVxufVxuXG5cbl8uZXh0ZW5kKFdhdGNoZXIucHJvdG90eXBlLCBtZXRob2RzKVxuXG5cbldhdGNoZXIubWl4VG8gPSBmdW5jdGlvbihvYmope1xuICBvYmogPSB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgPyBvYmoucHJvdG90eXBlIDogb2JqO1xuICByZXR1cm4gXy5leHRlbmQob2JqLCBtZXRob2RzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhdGNoZXI7IiwidmFyIGVudiA9ICByZXF1aXJlKFwiLi9lbnYuanNcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4vY29uZmlnXCIpOyBcbnZhciBSZWd1bGFyID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9SZWd1bGFyLmpzXCIpO1xudmFyIFBhcnNlciA9IFJlZ3VsYXIuUGFyc2VyO1xudmFyIExleGVyID0gUmVndWxhci5MZXhlcjtcblxuaWYoZW52LmJyb3dzZXIpe1xuICAgIHJlcXVpcmUoXCIuL2RpcmVjdGl2ZS9iYXNlLmpzXCIpO1xuICAgIHJlcXVpcmUoXCIuL2RpcmVjdGl2ZS9hbmltYXRpb24uanNcIik7XG4gICAgcmVxdWlyZShcIi4vbW9kdWxlL3RpbWVvdXQuanNcIik7XG4gICAgUmVndWxhci5kb20gPSByZXF1aXJlKFwiLi9kb20uanNcIik7XG59XG5SZWd1bGFyLmVudiA9IGVudjtcblJlZ3VsYXIudXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIik7XG5SZWd1bGFyLnBhcnNlID0gZnVuY3Rpb24oc3RyLCBvcHRpb25zKXtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYob3B0aW9ucy5CRUdJTiB8fCBvcHRpb25zLkVORCl7XG4gICAgaWYob3B0aW9ucy5CRUdJTikgY29uZmlnLkJFR0lOID0gb3B0aW9ucy5CRUdJTjtcbiAgICBpZihvcHRpb25zLkVORCkgY29uZmlnLkVORCA9IG9wdGlvbnMuRU5EO1xuICAgIExleGVyLnNldHVwKCk7XG4gIH1cbiAgdmFyIGFzdCA9IG5ldyBQYXJzZXIoc3RyKS5wYXJzZSgpO1xuICByZXR1cm4gIW9wdGlvbnMuc3RyaW5naWZ5PyBhc3QgOiBKU09OLnN0cmluZ2lmeShhc3QpO1xufVxuXG4iLCJ2YXIgUmVndWxhciA9IHJlcXVpcmUoXCIuLi9SZWd1bGFyLmpzXCIpO1xuXG4vKipcbiAqIFRpbWVvdXQgTW9kdWxlXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gQ29tcG9uZW50IFxuICovXG5mdW5jdGlvbiBUaW1lb3V0TW9kdWxlKENvbXBvbmVudCl7XG5cbiAgQ29tcG9uZW50LmltcGxlbWVudCh7XG4gICAgLyoqXG4gICAgICoganVzdCBsaWtlIHNldFRpbWVvdXQsIGJ1dCB3aWxsIGVudGVyIGRpZ2VzdCBhdXRvbWF0ZWx5XG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgIFxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBkZWxheSBcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgdGltZW91dGlkXG4gICAgICovXG4gICAgJHRpbWVvdXQ6IGZ1bmN0aW9uKGZuLCBkZWxheSl7XG4gICAgICBkZWxheSA9IGRlbGF5IHx8IDA7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBmbi5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTsgLy9lbnRlciBkaWdlc3RcbiAgICAgIH0uYmluZCh0aGlzKSwgZGVsYXkpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICoganVzdCBsaWtlIHNldEludGVydmFsLCBidXQgd2lsbCBlbnRlciBkaWdlc3QgYXV0b21hdGVseVxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICBcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgaW50ZXJ2YWwgXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAgIGludGVydmFsaWRcbiAgICAgKi9cbiAgICAkaW50ZXJ2YWw6IGZ1bmN0aW9uKGZuLCBpbnRlcnZhbCl7XG4gICAgICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDEwMDAvNjA7XG4gICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgZm4uY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCk7IC8vZW50ZXIgZGlnZXN0XG4gICAgICB9LmJpbmQodGhpcyksIGludGVydmFsKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblJlZ3VsYXIucGx1Z2luKCd0aW1lb3V0JywgVGltZW91dE1vZHVsZSk7XG5SZWd1bGFyLnBsdWdpbignJHRpbWVvdXQnLCBUaW1lb3V0TW9kdWxlKTsiLCJ2YXIgXyA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWcuanNcIik7XG5cbi8vIHNvbWUgY3VzdG9tIHRhZyAgd2lsbCBjb25mbGljdCB3aXRoIHRoZSBMZXhlciBwcm9ncmVzc1xudmFyIGNvbmZsaWN0VGFnID0ge1wifVwiOiBcIntcIiwgXCJdXCI6IFwiW1wifSwgbWFwMSwgbWFwMjtcbi8vIHNvbWUgbWFjcm8gZm9yIGxleGVyXG52YXIgbWFjcm8gPSB7XG4gICdOQU1FJzogLyg/Ols6X0EtWmEtel1bLVxcLjpfMC05QS1aYS16XSopLyxcbiAgJ0lERU5UJzogL1tcXCRfQS1aYS16XVtfMC05QS1aYS16XFwkXSovLFxuICAnU1BBQ0UnOiAvW1xcclxcblxcZiBdL1xufVxuXG5cbnZhciB0ZXN0ID0gL2F8KGIpLy5leGVjKFwiYVwiKTtcbnZhciB0ZXN0U3ViQ2FwdXJlID0gdGVzdCAmJiB0ZXN0WzFdID09PSB1bmRlZmluZWQ/IFxuICBmdW5jdGlvbihzdHIpeyByZXR1cm4gc3RyICE9PSB1bmRlZmluZWQgfVxuICA6ZnVuY3Rpb24oc3RyKXtyZXR1cm4gISFzdHJ9O1xuXG5mdW5jdGlvbiB3cmFwSGFuZGVyKGhhbmRsZXIpe1xuICByZXR1cm4gZnVuY3Rpb24oYWxsKXtcbiAgICByZXR1cm4ge3R5cGU6IGhhbmRsZXIsIHZhbHVlOiBhbGwgfVxuICB9XG59XG5cbmZ1bmN0aW9uIExleGVyKGlucHV0LCBvcHRzKXtcbiAgaWYoY29uZmxpY3RUYWdbY29uZmlnLkVORF0pe1xuICAgIHRoaXMubWFya1N0YXJ0ID0gY29uZmxpY3RUYWdbY29uZmlnLkVORF07XG4gICAgdGhpcy5tYXJrRW5kID0gY29uZmlnLkVORDtcbiAgfVxuXG4gIHRoaXMuaW5wdXQgPSAoaW5wdXR8fFwiXCIpLnRyaW0oKTtcbiAgdGhpcy5vcHRzID0gb3B0cyB8fCB7fTtcbiAgdGhpcy5tYXAgPSB0aGlzLm9wdHMubW9kZSAhPT0gMj8gIG1hcDE6IG1hcDI7XG4gIHRoaXMuc3RhdGVzID0gW1wiSU5JVFwiXTtcbiAgaWYob3B0cyAmJiBvcHRzLmV4cHJlc3Npb24pe1xuICAgICB0aGlzLnN0YXRlcy5wdXNoKFwiSlNUXCIpO1xuICAgICB0aGlzLmV4cHJlc3Npb24gPSB0cnVlO1xuICB9XG59XG5cbnZhciBsbyA9IExleGVyLnByb3RvdHlwZVxuXG5cbmxvLmxleCA9IGZ1bmN0aW9uKHN0cil7XG4gIHN0ciA9IChzdHIgfHwgdGhpcy5pbnB1dCkudHJpbSgpO1xuICB2YXIgdG9rZW5zID0gW10sIHNwbGl0LCB0ZXN0LG1sZW4sIHRva2VuLCBzdGF0ZTtcbiAgdGhpcy5pbnB1dCA9IHN0ciwgXG4gIHRoaXMubWFya3MgPSAwO1xuICAvLyBpbml0IHRoZSBwb3MgaW5kZXhcbiAgdGhpcy5pbmRleD0wO1xuICB2YXIgaSA9IDA7XG4gIHdoaWxlKHN0cil7XG4gICAgaSsrXG4gICAgc3RhdGUgPSB0aGlzLnN0YXRlKCk7XG4gICAgc3BsaXQgPSB0aGlzLm1hcFtzdGF0ZV0gXG4gICAgdGVzdCA9IHNwbGl0LlRSVU5LLmV4ZWMoc3RyKTtcbiAgICBpZighdGVzdCl7XG4gICAgICB0aGlzLmVycm9yKCdVbnJlY29naW5pemVkIFRva2VuJyk7XG4gICAgfVxuICAgIG1sZW4gPSB0ZXN0WzBdLmxlbmd0aDtcbiAgICBzdHIgPSBzdHIuc2xpY2UobWxlbilcbiAgICB0b2tlbiA9IHRoaXMuX3Byb2Nlc3MuY2FsbCh0aGlzLCB0ZXN0LCBzcGxpdCwgc3RyKVxuICAgIGlmKHRva2VuKSB0b2tlbnMucHVzaCh0b2tlbilcbiAgICB0aGlzLmluZGV4ICs9IG1sZW47XG4gICAgLy8gaWYoc3RhdGUgPT0gJ1RBRycgfHwgc3RhdGUgPT0gJ0pTVCcpIHN0ciA9IHRoaXMuc2tpcHNwYWNlKHN0cik7XG4gIH1cblxuICB0b2tlbnMucHVzaCh7dHlwZTogJ0VPRid9KTtcblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5sby5lcnJvciA9IGZ1bmN0aW9uKG1zZyl7XG4gIHRocm93IFwiUGFyc2UgRXJyb3I6IFwiICsgbXNnICsgICc6XFxuJyArIF8udHJhY2tFcnJvclBvcyh0aGlzLmlucHV0LCB0aGlzLmluZGV4KTtcbn1cblxubG8uX3Byb2Nlc3MgPSBmdW5jdGlvbihhcmdzLCBzcGxpdCxzdHIpe1xuICAvLyBjb25zb2xlLmxvZyhhcmdzLmpvaW4oXCIsXCIpLCB0aGlzLnN0YXRlKCkpXG4gIHZhciBsaW5rcyA9IHNwbGl0LmxpbmtzLCBtYXJjaGVkID0gZmFsc2UsIHRva2VuO1xuXG4gIGZvcih2YXIgbGVuID0gbGlua3MubGVuZ3RoLCBpPTA7aTxsZW4gO2krKyl7XG4gICAgdmFyIGxpbmsgPSBsaW5rc1tpXSxcbiAgICAgIGhhbmRsZXIgPSBsaW5rWzJdLFxuICAgICAgaW5kZXggPSBsaW5rWzBdO1xuICAgIC8vIGlmKGFyZ3NbNl0gPT09ICc+JyAmJiBpbmRleCA9PT0gNikgY29uc29sZS5sb2coJ2hhaGEnKVxuICAgIGlmKHRlc3RTdWJDYXB1cmUoYXJnc1tpbmRleF0pKSB7XG4gICAgICBtYXJjaGVkID0gdHJ1ZTtcbiAgICAgIGlmKGhhbmRsZXIpe1xuICAgICAgICB0b2tlbiA9IGhhbmRsZXIuYXBwbHkodGhpcywgYXJncy5zbGljZShpbmRleCwgaW5kZXggKyBsaW5rWzFdKSlcbiAgICAgICAgaWYodG9rZW4pICB0b2tlbi5wb3MgPSB0aGlzLmluZGV4O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmKCFtYXJjaGVkKXsgLy8gaW4gaWUgbHQ4IC4gc3ViIGNhcHR1cmUgaXMgXCJcIiBidXQgb250IFxuICAgIHN3aXRjaChzdHIuY2hhckF0KDApKXtcbiAgICAgIGNhc2UgXCI8XCI6XG4gICAgICAgIHRoaXMuZW50ZXIoXCJUQUdcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5lbnRlcihcIkpTVFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0b2tlbjtcbn1cbmxvLmVudGVyID0gZnVuY3Rpb24oc3RhdGUpe1xuICB0aGlzLnN0YXRlcy5wdXNoKHN0YXRlKVxuICByZXR1cm4gdGhpcztcbn1cblxubG8uc3RhdGUgPSBmdW5jdGlvbigpe1xuICB2YXIgc3RhdGVzID0gdGhpcy5zdGF0ZXM7XG4gIHJldHVybiBzdGF0ZXNbc3RhdGVzLmxlbmd0aC0xXTtcbn1cblxubG8ubGVhdmUgPSBmdW5jdGlvbihzdGF0ZSl7XG4gIHZhciBzdGF0ZXMgPSB0aGlzLnN0YXRlcztcbiAgaWYoIXN0YXRlIHx8IHN0YXRlc1tzdGF0ZXMubGVuZ3RoLTFdID09PSBzdGF0ZSkgc3RhdGVzLnBvcCgpXG59XG5cblxuTGV4ZXIuc2V0dXAgPSBmdW5jdGlvbigpe1xuICBtYWNyby5FTkQgPSBjb25maWcuRU5EO1xuICBtYWNyby5CRUdJTiA9IGNvbmZpZy5CRUdJTjtcbiAgLy9cbiAgbWFwMSA9IGdlbk1hcChbXG4gICAgLy8gSU5JVFxuICAgIHJ1bGVzLkVOVEVSX0pTVCxcbiAgICBydWxlcy5FTlRFUl9UQUcsXG4gICAgcnVsZXMuVEVYVCxcblxuICAgIC8vVEFHXG4gICAgcnVsZXMuVEFHX05BTUUsXG4gICAgcnVsZXMuVEFHX09QRU4sXG4gICAgcnVsZXMuVEFHX0NMT1NFLFxuICAgIHJ1bGVzLlRBR19QVU5DSE9SLFxuICAgIHJ1bGVzLlRBR19FTlRFUl9KU1QsXG4gICAgcnVsZXMuVEFHX1VOUV9WQUxVRSxcbiAgICBydWxlcy5UQUdfU1RSSU5HLFxuICAgIHJ1bGVzLlRBR19TUEFDRSxcbiAgICBydWxlcy5UQUdfQ09NTUVOVCxcblxuICAgIC8vIEpTVFxuICAgIHJ1bGVzLkpTVF9PUEVOLFxuICAgIHJ1bGVzLkpTVF9DTE9TRSxcbiAgICBydWxlcy5KU1RfQ09NTUVOVCxcbiAgICBydWxlcy5KU1RfRVhQUl9PUEVOLFxuICAgIHJ1bGVzLkpTVF9JREVOVCxcbiAgICBydWxlcy5KU1RfU1BBQ0UsXG4gICAgcnVsZXMuSlNUX0xFQVZFLFxuICAgIHJ1bGVzLkpTVF9OVU1CRVIsXG4gICAgcnVsZXMuSlNUX1BVTkNIT1IsXG4gICAgcnVsZXMuSlNUX1NUUklORyxcbiAgICBydWxlcy5KU1RfQ09NTUVOVFxuICAgIF0pXG5cbiAgLy8gaWdub3JlZCB0aGUgdGFnLXJlbGF0aXZlIHRva2VuXG4gIG1hcDIgPSBnZW5NYXAoW1xuICAgIC8vIElOSVQgbm8gPCByZXN0cmljdFxuICAgIHJ1bGVzLkVOVEVSX0pTVDIsXG4gICAgcnVsZXMuVEVYVCxcbiAgICAvLyBKU1RcbiAgICBydWxlcy5KU1RfQ09NTUVOVCxcbiAgICBydWxlcy5KU1RfT1BFTixcbiAgICBydWxlcy5KU1RfQ0xPU0UsXG4gICAgcnVsZXMuSlNUX0VYUFJfT1BFTixcbiAgICBydWxlcy5KU1RfSURFTlQsXG4gICAgcnVsZXMuSlNUX1NQQUNFLFxuICAgIHJ1bGVzLkpTVF9MRUFWRSxcbiAgICBydWxlcy5KU1RfTlVNQkVSLFxuICAgIHJ1bGVzLkpTVF9QVU5DSE9SLFxuICAgIHJ1bGVzLkpTVF9TVFJJTkcsXG4gICAgcnVsZXMuSlNUX0NPTU1FTlRcbiAgICBdKVxufVxuXG5cbmZ1bmN0aW9uIGdlbk1hcChydWxlcyl7XG4gIHZhciBydWxlLCBtYXAgPSB7fSwgc2lnbjtcbiAgZm9yKHZhciBpID0gMCwgbGVuID0gcnVsZXMubGVuZ3RoOyBpIDwgbGVuIDsgaSsrKXtcbiAgICBydWxlID0gcnVsZXNbaV07XG4gICAgc2lnbiA9IHJ1bGVbMl0gfHwgJ0lOSVQnO1xuICAgICggbWFwW3NpZ25dIHx8IChtYXBbc2lnbl0gPSB7cnVsZXM6W10sIGxpbmtzOltdfSkgKS5ydWxlcy5wdXNoKHJ1bGUpO1xuICB9XG4gIHJldHVybiBzZXR1cChtYXApO1xufVxuXG5mdW5jdGlvbiBzZXR1cChtYXApe1xuICB2YXIgc3BsaXQsIHJ1bGVzLCB0cnVua3MsIGhhbmRsZXIsIHJlZywgcmV0YWluLCBydWxlO1xuICBmdW5jdGlvbiByZXBsYWNlRm4oYWxsLCBvbmUpe1xuICAgIHJldHVybiB0eXBlb2YgbWFjcm9bb25lXSA9PT0gJ3N0cmluZyc/IFxuICAgICAgXy5lc2NhcGVSZWdFeHAobWFjcm9bb25lXSkgXG4gICAgICA6IFN0cmluZyhtYWNyb1tvbmVdKS5zbGljZSgxLC0xKTtcbiAgfVxuXG4gIGZvcih2YXIgaSBpbiBtYXApe1xuXG4gICAgc3BsaXQgPSBtYXBbaV07XG4gICAgc3BsaXQuY3VySW5kZXggPSAxO1xuICAgIHJ1bGVzID0gc3BsaXQucnVsZXM7XG4gICAgdHJ1bmtzID0gW107XG5cbiAgICBmb3IodmFyIGogPSAwLGxlbiA9IHJ1bGVzLmxlbmd0aDsgajxsZW47IGorKyl7XG4gICAgICBydWxlID0gcnVsZXNbal07IFxuICAgICAgcmVnID0gcnVsZVswXTtcbiAgICAgIGhhbmRsZXIgPSBydWxlWzFdO1xuXG4gICAgICBpZih0eXBlb2YgaGFuZGxlciA9PT0gJ3N0cmluZycpe1xuICAgICAgICBoYW5kbGVyID0gd3JhcEhhbmRlcihoYW5kbGVyKTtcbiAgICAgIH1cbiAgICAgIGlmKF8udHlwZU9mKHJlZykgPT09ICdyZWdleHAnKSByZWcgPSByZWcudG9TdHJpbmcoKS5zbGljZSgxLCAtMSk7XG5cbiAgICAgIHJlZyA9IHJlZy5yZXBsYWNlKC9cXHsoXFx3KylcXH0vZywgcmVwbGFjZUZuKVxuICAgICAgcmV0YWluID0gXy5maW5kU3ViQ2FwdHVyZShyZWcpICsgMTsgXG4gICAgICBzcGxpdC5saW5rcy5wdXNoKFtzcGxpdC5jdXJJbmRleCwgcmV0YWluLCBoYW5kbGVyXSk7IFxuICAgICAgc3BsaXQuY3VySW5kZXggKz0gcmV0YWluO1xuICAgICAgdHJ1bmtzLnB1c2gocmVnKTtcbiAgICB9XG4gICAgc3BsaXQuVFJVTksgPSBuZXcgUmVnRXhwKFwiXig/OihcIiArIHRydW5rcy5qb2luKFwiKXwoXCIpICsgXCIpKVwiKVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbnZhciBydWxlcyA9IHtcblxuICAvLyAxLiBJTklUXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIG1vZGUxJ3MgSlNUIEVOVEVSIFJVTEVcbiAgRU5URVJfSlNUOiBbL1teXFx4MDA8XSo/KD89e0JFR0lOfSkvLCBmdW5jdGlvbihhbGwpe1xuICAgIHRoaXMuZW50ZXIoJ0pTVCcpO1xuICAgIGlmKGFsbCkgcmV0dXJuIHt0eXBlOiAnVEVYVCcsIHZhbHVlOiBhbGx9XG4gIH1dLFxuXG4gIC8vIG1vZGUyJ3MgSlNUIEVOVEVSIFJVTEVcbiAgRU5URVJfSlNUMjogWy9bXlxceDAwXSo/KD89e0JFR0lOfSkvLCBmdW5jdGlvbihhbGwpe1xuICAgIHRoaXMuZW50ZXIoJ0pTVCcpO1xuICAgIGlmKGFsbCkgcmV0dXJuIHt0eXBlOiAnVEVYVCcsIHZhbHVlOiBhbGx9XG4gIH1dLFxuXG4gIEVOVEVSX1RBRzogWy9bXlxceDAwPD5dKj8oPz08KS8sIGZ1bmN0aW9uKGFsbCl7IFxuICAgIHRoaXMuZW50ZXIoJ1RBRycpO1xuICAgIGlmKGFsbCkgcmV0dXJuIHt0eXBlOiAnVEVYVCcsIHZhbHVlOiBhbGx9XG4gIH1dLFxuXG4gIFRFWFQ6IFsvW15cXHgwMF0rLywgJ1RFWFQnXSxcblxuICAvLyAyLiBUQUdcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgVEFHX05BTUU6IFsve05BTUV9LywgJ05BTUUnLCAnVEFHJ10sXG4gIFRBR19VTlFfVkFMVUU6IFsvW15cXHt9JlwiJz0+PGBcXHJcXG5cXGYgXSsvLCAnVU5RJywgJ1RBRyddLFxuXG4gIFRBR19PUEVOOiBbLzwoe05BTUV9KVxccyovLCBmdW5jdGlvbihhbGwsIG9uZSl7XG4gICAgcmV0dXJuIHt0eXBlOiAnVEFHX09QRU4nLCB2YWx1ZTogb25lfVxuICB9LCAnVEFHJ10sXG4gIFRBR19DTE9TRTogWy88XFwvKHtOQU1FfSlbXFxyXFxuXFxmIF0qPi8sIGZ1bmN0aW9uKGFsbCwgb25lKXtcbiAgICB0aGlzLmxlYXZlKCk7XG4gICAgcmV0dXJuIHt0eXBlOiAnVEFHX0NMT1NFJywgdmFsdWU6IG9uZSB9XG4gIH0sICdUQUcnXSxcblxuICAgIC8vIG1vZGUyJ3MgSlNUIEVOVEVSIFJVTEVcbiAgVEFHX0VOVEVSX0pTVDogWy8oPz17QkVHSU59KS8sIGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5lbnRlcignSlNUJyk7XG4gIH0sICdUQUcnXSxcblxuXG4gIFRBR19QVU5DSE9SOiBbL1tcXD5cXC89Jl0vLCBmdW5jdGlvbihhbGwpe1xuICAgIGlmKGFsbCA9PT0gJz4nKSB0aGlzLmxlYXZlKCk7XG4gICAgcmV0dXJuIHt0eXBlOiBhbGwsIHZhbHVlOiBhbGwgfVxuICB9LCAnVEFHJ10sXG4gIFRBR19TVFJJTkc6ICBbIC8nKFteJ10qKSd8XCIoW15cIl0qKVwiLywgZnVuY3Rpb24oYWxsLCBvbmUsIHR3byl7IC8vXCInXG4gICAgdmFyIHZhbHVlID0gb25lIHx8IHR3byB8fCBcIlwiO1xuXG4gICAgcmV0dXJuIHt0eXBlOiAnU1RSSU5HJywgdmFsdWU6IHZhbHVlfVxuICB9LCAnVEFHJ10sXG5cbiAgVEFHX1NQQUNFOiBbL3tTUEFDRX0rLywgbnVsbCwgJ1RBRyddLFxuICBUQUdfQ09NTUVOVDogWy88XFwhLS0oW15cXHgwMF0qPyktLVxcPi8sIG51bGwgLCdUQUcnXSxcblxuICAvLyAzLiBKU1RcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIEpTVF9PUEVOOiBbJ3tCRUdJTn0je1NQQUNFfSooe0lERU5UfSknLCBmdW5jdGlvbihhbGwsIG5hbWUpe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnT1BFTicsXG4gICAgICB2YWx1ZTogbmFtZVxuICAgIH1cbiAgfSwgJ0pTVCddLFxuICBKU1RfTEVBVkU6IFsve0VORH0vLCBmdW5jdGlvbihhbGwpe1xuICAgIGlmKHRoaXMubWFya0VuZCA9PT0gYWxsICYmIHRoaXMuZXhwcmVzc2lvbikgcmV0dXJuIHt0eXBlOiB0aGlzLm1hcmtFbmQsIHZhbHVlOiB0aGlzLm1hcmtFbmR9O1xuICAgIGlmKCF0aGlzLm1hcmtFbmQgfHwgIXRoaXMubWFya3MgKXtcbiAgICAgIHRoaXMuZmlyc3RFbnRlclN0YXJ0ID0gZmFsc2U7XG4gICAgICB0aGlzLmxlYXZlKCdKU1QnKTtcbiAgICAgIHJldHVybiB7dHlwZTogJ0VORCd9XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLm1hcmtzLS07XG4gICAgICByZXR1cm4ge3R5cGU6IHRoaXMubWFya0VuZCwgdmFsdWU6IHRoaXMubWFya0VuZH1cbiAgICB9XG4gIH0sICdKU1QnXSxcbiAgSlNUX0NMT1NFOiBbL3tCRUdJTn1cXHMqXFwvKHtJREVOVH0pXFxzKntFTkR9LywgZnVuY3Rpb24oYWxsLCBvbmUpe1xuICAgIHRoaXMubGVhdmUoJ0pTVCcpO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnQ0xPU0UnLFxuICAgICAgdmFsdWU6IG9uZVxuICAgIH1cbiAgfSwgJ0pTVCddLFxuICBKU1RfQ09NTUVOVDogWy97QkVHSU59XFwhKFteXFx4MDBdKj8pXFwhe0VORH0vLCBmdW5jdGlvbigpe1xuICAgIHRoaXMubGVhdmUoKTtcbiAgfSwgJ0pTVCddLFxuICBKU1RfRVhQUl9PUEVOOiBbJ3tCRUdJTn0nLGZ1bmN0aW9uKGFsbCwgb25lKXtcbiAgICBpZihhbGwgPT09IHRoaXMubWFya1N0YXJ0KXtcbiAgICAgIGlmKHRoaXMuZXhwcmVzc2lvbikgcmV0dXJuIHsgdHlwZTogdGhpcy5tYXJrU3RhcnQsIHZhbHVlOiB0aGlzLm1hcmtTdGFydCB9O1xuICAgICAgaWYodGhpcy5maXJzdEVudGVyU3RhcnQgfHwgdGhpcy5tYXJrcyl7XG4gICAgICAgIHRoaXMubWFya3MrK1xuICAgICAgICB0aGlzLmZpcnN0RW50ZXJTdGFydCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4geyB0eXBlOiB0aGlzLm1hcmtTdGFydCwgdmFsdWU6IHRoaXMubWFya1N0YXJ0IH07XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy5maXJzdEVudGVyU3RhcnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ0VYUFJfT1BFTicsXG4gICAgICBlc2NhcGU6IGZhbHNlXG4gICAgfVxuXG4gIH0sICdKU1QnXSxcbiAgSlNUX0lERU5UOiBbJ3tJREVOVH0nLCAnSURFTlQnLCAnSlNUJ10sXG4gIEpTVF9TUEFDRTogWy9bIFxcclxcblxcZl0rLywgbnVsbCwgJ0pTVCddLFxuICBKU1RfUFVOQ0hPUjogWy9bPSFdPz09fFstPT48KypcXC8lXFwhXT9cXD18XFx8XFx8fCYmfFxcQFxcKHxcXC5cXC58WzxcXD5cXFtcXF1cXChcXClcXC1cXHxcXHt9XFwrXFwqXFwvJT86XFwuISxdLywgZnVuY3Rpb24oYWxsKXtcbiAgICByZXR1cm4geyB0eXBlOiBhbGwsIHZhbHVlOiBhbGwgfVxuICB9LCdKU1QnXSxcblxuICBKU1RfU1RSSU5HOiAgWyAvJyhbXiddKiknfFwiKFteXCJdKilcIi8sIGZ1bmN0aW9uKGFsbCwgb25lLCB0d28peyAvL1wiJ1xuICAgIHJldHVybiB7dHlwZTogJ1NUUklORycsIHZhbHVlOiBvbmUgfHwgdHdvIHx8IFwiXCJ9XG4gIH0sICdKU1QnXSxcbiAgSlNUX05VTUJFUjogWy8oPzpbMC05XSpcXC5bMC05XSt8WzAtOV0rKShlXFxkKyk/LywgZnVuY3Rpb24oYWxsKXtcbiAgICByZXR1cm4ge3R5cGU6ICdOVU1CRVInLCB2YWx1ZTogcGFyc2VGbG9hdChhbGwsIDEwKX07XG4gIH0sICdKU1QnXVxufVxuXG5cbi8vIHNldHVwIHdoZW4gZmlyc3QgY29uZmlnXG5MZXhlci5zZXR1cCgpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBMZXhlcjtcbiIsInZhciBfID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIik7XG5cbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnLmpzXCIpO1xudmFyIG5vZGUgPSByZXF1aXJlKFwiLi9ub2RlLmpzXCIpO1xudmFyIExleGVyID0gcmVxdWlyZShcIi4vTGV4ZXIuanNcIik7XG52YXIgdmFyTmFtZSA9IF8udmFyTmFtZTtcbnZhciBjdHhOYW1lID0gXy5jdHhOYW1lO1xudmFyIGV4dE5hbWUgPSBfLmV4dE5hbWU7XG52YXIgaXNQYXRoID0gXy5tYWtlUHJlZGljYXRlKFwiU1RSSU5HIElERU5UIE5VTUJFUlwiKTtcbnZhciBpc0tleVdvcmQgPSBfLm1ha2VQcmVkaWNhdGUoXCJ0cnVlIGZhbHNlIHVuZGVmaW5lZCBudWxsIHRoaXMgQXJyYXkgRGF0ZSBKU09OIE1hdGggTmFOIFJlZ0V4cCBkZWNvZGVVUkkgZGVjb2RlVVJJQ29tcG9uZW50IGVuY29kZVVSSSBlbmNvZGVVUklDb21wb25lbnQgcGFyc2VGbG9hdCBwYXJzZUludCBPYmplY3RcIik7XG5cblxuXG5cbmZ1bmN0aW9uIFBhcnNlcihpbnB1dCwgb3B0cyl7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgdGhpcy50b2tlbnMgPSBuZXcgTGV4ZXIoaW5wdXQsIG9wdHMpLmxleCgpO1xuICB0aGlzLnBvcyA9IDA7XG4gIHRoaXMubm9Db21wdXRlZCA9ICBvcHRzLm5vQ29tcHV0ZWQ7XG4gIHRoaXMubGVuZ3RoID0gdGhpcy50b2tlbnMubGVuZ3RoO1xufVxuXG5cbnZhciBvcCA9IFBhcnNlci5wcm90b3R5cGU7XG5cblxub3AucGFyc2UgPSBmdW5jdGlvbigpe1xuICB0aGlzLnBvcyA9IDA7XG4gIHZhciByZXM9IHRoaXMucHJvZ3JhbSgpO1xuICBpZih0aGlzLmxsKCkudHlwZSA9PT0gJ1RBR19DTE9TRScpe1xuICAgIHRoaXMuZXJyb3IoXCJZb3UgbWF5IGdvdCBhIHVuY2xvc2VkIFRhZ1wiKVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbm9wLmxsID0gIGZ1bmN0aW9uKGspe1xuICBrID0gayB8fCAxO1xuICBpZihrIDwgMCkgayA9IGsgKyAxO1xuICB2YXIgcG9zID0gdGhpcy5wb3MgKyBrIC0gMTtcbiAgaWYocG9zID4gdGhpcy5sZW5ndGggLSAxKXtcbiAgICAgIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmxlbmd0aC0xXTtcbiAgfVxuICByZXR1cm4gdGhpcy50b2tlbnNbcG9zXTtcbn1cbiAgLy8gbG9va2FoZWFkXG5vcC5sYSA9IGZ1bmN0aW9uKGspe1xuICByZXR1cm4gKHRoaXMubGwoaykgfHwgJycpLnR5cGU7XG59XG5cbm9wLm1hdGNoID0gZnVuY3Rpb24odHlwZSwgdmFsdWUpe1xuICB2YXIgbGw7XG4gIGlmKCEobGwgPSB0aGlzLmVhdCh0eXBlLCB2YWx1ZSkpKXtcbiAgICBsbCAgPSB0aGlzLmxsKCk7XG4gICAgdGhpcy5lcnJvcignZXhwZWN0IFsnICsgdHlwZSArICh2YWx1ZSA9PSBudWxsPyAnJzonOicrIHZhbHVlKSArICddXCIgLT4gZ290IFwiWycgKyBsbC50eXBlICsgKHZhbHVlPT1udWxsPyAnJzonOicrbGwudmFsdWUpICsgJ10nLCBsbC5wb3MpXG4gIH1lbHNle1xuICAgIHJldHVybiBsbDtcbiAgfVxufVxuXG5vcC5lcnJvciA9IGZ1bmN0aW9uKG1zZywgcG9zKXtcbiAgbXNnID0gIFwiUGFyc2UgRXJyb3I6IFwiICsgbXNnICsgICc6XFxuJyArIF8udHJhY2tFcnJvclBvcyh0aGlzLmlucHV0LCB0eXBlb2YgcG9zID09PSAnbnVtYmVyJz8gcG9zOiB0aGlzLmxsKCkucG9zfHwwKTtcbiAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG59XG5cbm9wLm5leHQgPSBmdW5jdGlvbihrKXtcbiAgayA9IGsgfHwgMTtcbiAgdGhpcy5wb3MgKz0gaztcbn1cbm9wLmVhdCA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKXtcbiAgdmFyIGxsID0gdGhpcy5sbCgpO1xuICBpZih0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpe1xuICAgIGZvcih2YXIgbGVuID0gdHlwZS5sZW5ndGggOyBsZW4tLTspe1xuICAgICAgaWYobGwudHlwZSA9PT0gdHlwZVtsZW5dKSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICByZXR1cm4gbGw7XG4gICAgICB9XG4gICAgfVxuICB9ZWxzZXtcbiAgICBpZiggbGwudHlwZSA9PT0gdHlwZSAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBsbC52YWx1ZSA9PT0gdmFsdWUpICl7XG4gICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgcmV0dXJuIGxsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIHByb2dyYW1cbi8vICA6RU9GXG4vLyAgfCAoc3RhdGVtZW50KSogRU9GXG5vcC5wcm9ncmFtID0gZnVuY3Rpb24oKXtcbiAgdmFyIHN0YXRlbWVudHMgPSBbXSwgIGxsID0gdGhpcy5sbCgpO1xuICB3aGlsZShsbC50eXBlICE9PSAnRU9GJyAmJiBsbC50eXBlICE9PSdUQUdfQ0xPU0UnKXtcblxuICAgIHN0YXRlbWVudHMucHVzaCh0aGlzLnN0YXRlbWVudCgpKTtcbiAgICBsbCA9IHRoaXMubGwoKTtcbiAgfVxuICAvLyBpZihsbC50eXBlID09PSAnVEFHX0NMT1NFJykgdGhpcy5lcnJvcihcIllvdSBtYXkgaGF2ZSB1bm1hdGNoZWQgVGFnXCIpXG4gIHJldHVybiBzdGF0ZW1lbnRzO1xufVxuXG4vLyBzdGF0ZW1lbnRcbi8vICA6IHhtbFxuLy8gIHwganN0XG4vLyAgfCB0ZXh0XG5vcC5zdGF0ZW1lbnQgPSBmdW5jdGlvbigpe1xuICB2YXIgbGwgPSB0aGlzLmxsKCk7XG4gIHN3aXRjaChsbC50eXBlKXtcbiAgICBjYXNlICdOQU1FJzpcbiAgICBjYXNlICdURVhUJzpcbiAgICAgIHZhciB0ZXh0ID0gbGwudmFsdWU7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICAgIHdoaWxlKGxsID0gdGhpcy5lYXQoWydOQU1FJywgJ1RFWFQnXSkpe1xuICAgICAgICB0ZXh0ICs9IGxsLnZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGUudGV4dCh0ZXh0KTtcbiAgICBjYXNlICdUQUdfT1BFTic6XG4gICAgICByZXR1cm4gdGhpcy54bWwoKTtcbiAgICBjYXNlICdPUEVOJzogXG4gICAgICByZXR1cm4gdGhpcy5kaXJlY3RpdmUoKTtcbiAgICBjYXNlICdFWFBSX09QRU4nOlxuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJwbGF0aW9uKCk7XG4gICAgY2FzZSAnUEFSVF9PUEVOJzpcbiAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMuZXJyb3IoJ1VuZXhwZWN0ZWQgdG9rZW46ICcrIHRoaXMubGEoKSlcbiAgfVxufVxuXG4vLyB4bWwgXG4vLyBzdGFnIHN0YXRlbWVudCogVEFHX0NMT1NFPyhpZiBzZWxmLWNsb3NlZCB0YWcpXG5vcC54bWwgPSBmdW5jdGlvbigpe1xuICB2YXIgbmFtZSwgYXR0cnMsIGNoaWxkcmVuLCBzZWxmQ2xvc2VkO1xuICBuYW1lID0gdGhpcy5tYXRjaCgnVEFHX09QRU4nKS52YWx1ZTtcbiAgYXR0cnMgPSB0aGlzLmF0dHJzKCk7XG4gIHNlbGZDbG9zZWQgPSB0aGlzLmVhdCgnLycpXG4gIHRoaXMubWF0Y2goJz4nKTtcbiAgaWYoICFzZWxmQ2xvc2VkICYmICFfLmlzVm9pZFRhZyhuYW1lKSApe1xuICAgIGNoaWxkcmVuID0gdGhpcy5wcm9ncmFtKCk7XG4gICAgaWYoIXRoaXMuZWF0KCdUQUdfQ0xPU0UnLCBuYW1lKSkgdGhpcy5lcnJvcignZXhwZWN0IDwvJytuYW1lKyc+IGdvdCcrICdubyBtYXRjaGVkIGNsb3NlVGFnJylcbiAgfVxuICByZXR1cm4gbm9kZS5lbGVtZW50KG5hbWUsIGF0dHJzLCBjaGlsZHJlbik7XG59XG5cbi8vIHhlbnRpdHlcbi8vICAtcnVsZSh3cmFwIGF0dHJpYnV0ZSlcbi8vICAtYXR0cmlidXRlXG4vL1xuLy8gX19leGFtcGxlX19cbi8vICBuYW1lID0gMSB8ICBcbi8vICBuZy1oaWRlIHxcbi8vICBvbi1jbGljaz17e319IHwgXG4vLyAge3sjaWYgbmFtZX19b24tY2xpY2s9e3t4eH19e3sjZWxzZX19b24tdGFwPXt7fX17ey9pZn19XG5cbm9wLnhlbnRpdHkgPSBmdW5jdGlvbihsbCl7XG4gIHZhciBuYW1lID0gbGwudmFsdWUsIHZhbHVlO1xuICBpZihsbC50eXBlID09PSAnTkFNRScpe1xuICAgIGlmKCB0aGlzLmVhdChcIj1cIikgKSB2YWx1ZSA9IHRoaXMuYXR0dmFsdWUoKTtcbiAgICByZXR1cm4gbm9kZS5hdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICk7XG4gIH1lbHNle1xuICAgIGlmKCBuYW1lICE9PSAnaWYnKSB0aGlzLmVycm9yKFwiY3VycmVudCB2ZXJzaW9uLiBPTkxZIFJVTEUgI2lmICNlbHNlICNlbHNlaWYgaXMgdmFsaWQgaW4gdGFnLCB0aGUgcnVsZSAjXCIgKyBuYW1lICsgJyBpcyBpbnZhbGlkJyk7XG4gICAgcmV0dXJuIHRoaXNbJ2lmJ10odHJ1ZSk7XG4gIH1cblxufVxuXG4vLyBzdGFnICAgICA6Oj0gICAgJzwnIE5hbWUgKFMgYXR0cikqIFM/ICc+JyAgXG4vLyBhdHRyICAgIDo6PSAgICAgTmFtZSBFcSBhdHR2YWx1ZVxub3AuYXR0cnMgPSBmdW5jdGlvbihpc0F0dHJpYnV0ZSl7XG4gIHZhciBlYXRcbiAgaWYoIWlzQXR0cmlidXRlKXtcbiAgICBlYXQgPSBbXCJOQU1FXCIsIFwiT1BFTlwiXVxuICB9ZWxzZXtcbiAgICBlYXQgPSBbXCJOQU1FXCJdXG4gIH1cblxuICB2YXIgYXR0cnMgPSBbXSwgbGw7XG4gIHdoaWxlIChsbCA9IHRoaXMuZWF0KGVhdCkpe1xuICAgIGF0dHJzLnB1c2godGhpcy54ZW50aXR5KCBsbCApKVxuICB9XG4gIHJldHVybiBhdHRycztcbn1cblxuLy8gYXR0dmFsdWVcbi8vICA6IFNUUklORyAgXG4vLyAgfCBOQU1FXG5vcC5hdHR2YWx1ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsbCA9IHRoaXMubGwoKTtcbiAgc3dpdGNoKGxsLnR5cGUpe1xuICAgIGNhc2UgXCJOQU1FXCI6XG4gICAgY2FzZSBcIlVOUVwiOlxuICAgIGNhc2UgXCJTVFJJTkdcIjpcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgdmFyIHZhbHVlID0gbGwudmFsdWU7XG4gICAgICBpZih+dmFsdWUuaW5kZXhPZihjb25maWcuQkVHSU4pICYmIH52YWx1ZS5pbmRleE9mKGNvbmZpZy5FTkQpKXtcbiAgICAgICAgdmFyIGNvbnN0YW50ID0gdHJ1ZTtcbiAgICAgICAgdmFyIHBhcnNlZCA9IG5ldyBQYXJzZXIodmFsdWUsIHsgbW9kZTogMiB9KS5wYXJzZSgpO1xuICAgICAgICBpZihwYXJzZWQubGVuZ3RoID09PSAxICYmIHBhcnNlZFswXS50eXBlID09PSAnZXhwcmVzc2lvbicpIHJldHVybiBwYXJzZWRbMF07XG4gICAgICAgIHZhciBib2R5ID0gW107XG4gICAgICAgIHBhcnNlZC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgIGlmKCFpdGVtLmNvbnN0YW50KSBjb25zdGFudD1mYWxzZTtcbiAgICAgICAgICAvLyBzaWxlbnQgdGhlIG11dGlwbGUgaW50ZXBsYXRpb25cbiAgICAgICAgICAgIGJvZHkucHVzaChpdGVtLmJvZHkgfHwgXCInXCIgKyBpdGVtLnRleHQucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpICsgXCInXCIpOyAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICBib2R5ID0gXCJbXCIgKyBib2R5LmpvaW4oXCIsXCIpICsgXCJdLmpvaW4oJycpXCI7XG4gICAgICAgIHZhbHVlID0gbm9kZS5leHByZXNzaW9uKGJvZHksIG51bGwsIGNvbnN0YW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICBjYXNlIFwiRVhQUl9PUEVOXCI6XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcnBsYXRpb24oKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy5lcnJvcignVW5leHBlY3RlZCB0b2tlbjogJysgdGhpcy5sYSgpKVxuICB9XG59XG5cblxuLy8ge3sjfX1cbm9wLmRpcmVjdGl2ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBuYW1lID0gdGhpcy5sbCgpLnZhbHVlO1xuICB0aGlzLm5leHQoKTtcbiAgaWYodHlwZW9mIHRoaXNbbmFtZV0gPT09ICdmdW5jdGlvbicpe1xuICAgIHJldHVybiB0aGlzW25hbWVdKClcbiAgfWVsc2V7XG4gICAgdGhpcy5lcnJvcignVW5kZWZpbmVkIGRpcmVjdGl2ZVsnKyBuYW1lICsnXScpO1xuICB9XG59XG5cbi8vIHt7fX1cbm9wLmludGVycGxhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMubWF0Y2goJ0VYUFJfT1BFTicpO1xuICB2YXIgcmVzID0gdGhpcy5leHByZXNzaW9uKHRydWUpO1xuICB0aGlzLm1hdGNoKCdFTkQnKTtcbiAgcmV0dXJuIHJlcztcbn1cblxuLy8ge3t+fX1cbm9wLmluY2x1ZGUgPSBmdW5jdGlvbigpe1xuICB2YXIgY29udGVudCA9IHRoaXMuZXhwcmVzc2lvbigpO1xuICB0aGlzLm1hdGNoKCdFTkQnKTtcbiAgcmV0dXJuIG5vZGUudGVtcGxhdGUoY29udGVudCk7XG59XG5cbi8vIHt7I2lmfX1cbm9wW1wiaWZcIl0gPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgdGVzdCA9IHRoaXMuZXhwcmVzc2lvbigpO1xuICB2YXIgY29uc2VxdWVudCA9IFtdLCBhbHRlcm5hdGU9W107XG5cbiAgdmFyIGNvbnRhaW5lciA9IGNvbnNlcXVlbnQ7XG4gIHZhciBzdGF0ZW1lbnQgPSAhdGFnPyBcInN0YXRlbWVudFwiIDogXCJhdHRyc1wiO1xuXG4gIHRoaXMubWF0Y2goJ0VORCcpO1xuXG4gIHZhciBsbCwgY2xvc2U7XG4gIHdoaWxlKCAhIChjbG9zZSA9IHRoaXMuZWF0KCdDTE9TRScpKSApe1xuICAgIGxsID0gdGhpcy5sbCgpO1xuICAgIGlmKCBsbC50eXBlID09PSAnT1BFTicgKXtcbiAgICAgIHN3aXRjaCggbGwudmFsdWUgKXtcbiAgICAgICAgY2FzZSAnZWxzZSc6XG4gICAgICAgICAgY29udGFpbmVyID0gYWx0ZXJuYXRlO1xuICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgIHRoaXMubWF0Y2goICdFTkQnICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Vsc2VpZic6XG4gICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgYWx0ZXJuYXRlLnB1c2goIHRoaXNbXCJpZlwiXSh0YWcpICk7XG4gICAgICAgICAgcmV0dXJuIG5vZGVbJ2lmJ10oIHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSApO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnRhaW5lci5wdXNoKCB0aGlzW3N0YXRlbWVudF0odHJ1ZSkgKTtcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIGNvbnRhaW5lci5wdXNoKHRoaXNbc3RhdGVtZW50XSh0cnVlKSk7XG4gICAgfVxuICB9XG4gIC8vIGlmIHN0YXRlbWVudCBub3QgbWF0Y2hlZFxuICBpZihjbG9zZS52YWx1ZSAhPT0gXCJpZlwiKSB0aGlzLmVycm9yKCdVbm1hdGNoZWQgaWYgZGlyZWN0aXZlJylcbiAgcmV0dXJuIG5vZGVbXCJpZlwiXSh0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpO1xufVxuXG5cbi8vIEBtYXJrICAgbXVzdGFjaGUgc3ludGF4IGhhdmUgbmF0cnVyZSBkaXMsIGNhbm90IHdpdGggZXhwcmVzc2lvblxuLy8ge3sjbGlzdH19XG5vcC5saXN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gc2VxdWVuY2UgY2FuIGJlIGEgbGlzdCBvciBoYXNoXG4gIHZhciBzZXF1ZW5jZSA9IHRoaXMuZXhwcmVzc2lvbigpLCB2YXJpYWJsZSwgbGw7XG4gIHZhciBjb25zZXF1ZW50ID0gW10sIGFsdGVybmF0ZT1bXTtcbiAgdmFyIGNvbnRhaW5lciA9IGNvbnNlcXVlbnQ7XG5cbiAgdGhpcy5tYXRjaCgnSURFTlQnLCAnYXMnKTtcblxuICB2YXJpYWJsZSA9IHRoaXMubWF0Y2goJ0lERU5UJykudmFsdWU7XG5cbiAgdGhpcy5tYXRjaCgnRU5EJyk7XG5cbiAgd2hpbGUoICEobGwgPSB0aGlzLmVhdCgnQ0xPU0UnKSkgKXtcbiAgICBpZih0aGlzLmVhdCgnT1BFTicsICdlbHNlJykpe1xuICAgICAgY29udGFpbmVyID0gIGFsdGVybmF0ZTtcbiAgICAgIHRoaXMubWF0Y2goJ0VORCcpO1xuICAgIH1lbHNle1xuICAgICAgY29udGFpbmVyLnB1c2godGhpcy5zdGF0ZW1lbnQoKSk7XG4gICAgfVxuICB9XG4gIGlmKGxsLnZhbHVlICE9PSAnbGlzdCcpIHRoaXMuZXJyb3IoJ2V4cGVjdCAnICsgJ2xpc3QgZ290ICcgKyAnLycgKyBsbC52YWx1ZSArICcgJywgbGwucG9zICk7XG4gIHJldHVybiBub2RlLmxpc3Qoc2VxdWVuY2UsIHZhcmlhYmxlLCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpO1xufVxuXG5cbm9wLmV4cHJlc3Npb24gPSBmdW5jdGlvbigpe1xuICB2YXIgZXhwcmVzc2lvbjtcbiAgaWYodGhpcy5lYXQoJ0AoJykpeyAvL29uY2UgYmluZFxuICAgIGV4cHJlc3Npb24gPSB0aGlzLmV4cHIoKTtcbiAgICBleHByZXNzaW9uLm9uY2UgPSB0cnVlO1xuICAgIHRoaXMubWF0Y2goJyknKVxuICB9ZWxzZXtcbiAgICBleHByZXNzaW9uID0gdGhpcy5leHByKCk7XG4gIH1cbiAgcmV0dXJuIGV4cHJlc3Npb247XG59XG5cbm9wLmV4cHIgPSBmdW5jdGlvbigpe1xuICB0aGlzLmRlcGVuZCA9IFtdO1xuXG4gIHZhciBidWZmZXIgPSB0aGlzLmZpbHRlcigpXG5cbiAgdmFyIGJvZHkgPSBidWZmZXIuZ2V0IHx8IGJ1ZmZlcjtcbiAgdmFyIHNldGJvZHkgPSBidWZmZXIuc2V0O1xuICByZXR1cm4gbm9kZS5leHByZXNzaW9uKGJvZHksIHNldGJvZHksICF0aGlzLmRlcGVuZC5sZW5ndGgpO1xufVxuXG5cbi8vIGZpbHRlclxuLy8gYXNzaWduICgnfCcgZmlsdGVybmFtZVsnOicgYXJnc10pICogXG5vcC5maWx0ZXIgPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMuYXNzaWduKCk7XG4gIHZhciBsbCA9IHRoaXMuZWF0KCd8Jyk7XG4gIHZhciBidWZmZXIgPSBbXSwgc2V0QnVmZmVyLCBwcmVmaXgsXG4gICAgYXR0ciA9IFwidFwiLCBcbiAgICBzZXQgPSBsZWZ0LnNldCwgZ2V0LCBcbiAgICB0bXAgPSBcIlwiO1xuXG4gIGlmKGxsKXtcbiAgICBpZihzZXQpIHNldEJ1ZmZlciA9IFtdO1xuXG4gICAgcHJlZml4ID0gXCIoZnVuY3Rpb24oXCIgKyBhdHRyICsgXCIpe1wiO1xuXG4gICAgZG97XG4gICAgICB0bXAgPSBhdHRyICsgXCIgPSBcIiArIGN0eE5hbWUgKyBcIi5fZl8oJ1wiICsgdGhpcy5tYXRjaCgnSURFTlQnKS52YWx1ZSsgXCInICkuZ2V0LmNhbGwoIFwiK18uY3R4TmFtZSArXCIsXCIgKyBhdHRyIDtcbiAgICAgIGlmKHRoaXMuZWF0KCc6Jykpe1xuICAgICAgICB0bXAgKz1cIiwgXCIrIHRoaXMuYXJndW1lbnRzKFwifFwiKS5qb2luKFwiLFwiKSArIFwiKTtcIlxuICAgICAgfWVsc2V7XG4gICAgICAgIHRtcCArPSAnKTsnXG4gICAgICB9XG4gICAgICBidWZmZXIucHVzaCh0bXApO1xuICAgICAgc2V0QnVmZmVyICYmIHNldEJ1ZmZlci51bnNoaWZ0KCB0bXAucmVwbGFjZShcIiApLmdldC5jYWxsXCIsIFwiICkuc2V0LmNhbGxcIikgKTtcblxuICAgIH13aGlsZShsbCA9IHRoaXMuZWF0KCd8JykpO1xuICAgIGJ1ZmZlci5wdXNoKFwicmV0dXJuIFwiICsgYXR0ciApO1xuICAgIHNldEJ1ZmZlciAmJiBzZXRCdWZmZXIucHVzaChcInJldHVybiBcIiArIGF0dHIpO1xuXG4gICAgZ2V0ID0gIHByZWZpeCArIGJ1ZmZlci5qb2luKFwiXCIpICsgXCJ9KShcIitsZWZ0LmdldCtcIilcIjtcbiAgICAvLyB3ZSBjYWxsIGJhY2sgdG8gdmFsdWUuXG4gICAgaWYoc2V0QnVmZmVyKXtcbiAgICAgIC8vIGNoYW5nZSBfc3NfXyhuYW1lLCBfcF8pIHRvIF9zX18obmFtZSwgZmlsdGVyRm4oX3BfKSk7XG4gICAgICBzZXQgPSBzZXQucmVwbGFjZShfLnNldE5hbWUsIFxuICAgICAgICBwcmVmaXggKyBzZXRCdWZmZXIuam9pbihcIlwiKSArIFwifSkoXCIr44CAXy5zZXROYW1l44CAK1wiKVwiICk7XG5cbiAgICB9XG4gICAgLy8gdGhlIHNldCBmdW5jdGlvbiBpcyBkZXBlbmQgb24gdGhlIGZpbHRlciBkZWZpbml0aW9uLiBpZiBpdCBoYXZlIHNldCBtZXRob2QsIHRoZSBzZXQgd2lsbCB3b3JrXG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGdldCwgc2V0KTtcbiAgfVxuICByZXR1cm4gbGVmdDtcbn1cblxuLy8gYXNzaWduXG4vLyBsZWZ0LWhhbmQtZXhwciA9IGNvbmRpdGlvblxub3AuYXNzaWduID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLmNvbmRpdGlvbigpLCBsbDtcbiAgaWYobGwgPSB0aGlzLmVhdChbJz0nLCAnKz0nLCAnLT0nLCAnKj0nLCAnLz0nLCAnJT0nXSkpe1xuICAgIGlmKCFsZWZ0LnNldCkgdGhpcy5lcnJvcignaW52YWxpZCBsZWZ0aGFuZCBleHByZXNzaW9uIGluIGFzc2lnbm1lbnQgZXhwcmVzc2lvbicpO1xuICAgIHJldHVybiB0aGlzLmdldHNldCggbGVmdC5zZXQucmVwbGFjZSggXCIsXCIgKyBfLnNldE5hbWUsIFwiLFwiICsgdGhpcy5jb25kaXRpb24oKS5nZXQgKS5yZXBsYWNlKFwiJz0nXCIsIFwiJ1wiK2xsLnR5cGUrXCInXCIpLCBsZWZ0LnNldCk7XG4gICAgLy8gcmV0dXJuIHRoaXMuZ2V0c2V0KCcoJyArIGxlZnQuZ2V0ICsgbGwudHlwZSAgKyB0aGlzLmNvbmRpdGlvbigpLmdldCArICcpJywgbGVmdC5zZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0O1xufVxuXG4vLyBvclxuLy8gb3IgPyBhc3NpZ24gOiBhc3NpZ25cbm9wLmNvbmRpdGlvbiA9IGZ1bmN0aW9uKCl7XG5cbiAgdmFyIHRlc3QgPSB0aGlzLm9yKCk7XG4gIGlmKHRoaXMuZWF0KCc/Jykpe1xuICAgIHJldHVybiB0aGlzLmdldHNldChbdGVzdC5nZXQgKyBcIj9cIiwgXG4gICAgICB0aGlzLmFzc2lnbigpLmdldCwgXG4gICAgICB0aGlzLm1hdGNoKFwiOlwiKS50eXBlLCBcbiAgICAgIHRoaXMuYXNzaWduKCkuZ2V0XS5qb2luKFwiXCIpKTtcbiAgfVxuXG4gIHJldHVybiB0ZXN0O1xufVxuXG4vLyBhbmRcbi8vIGFuZCAmJiBvclxub3Aub3IgPSBmdW5jdGlvbigpe1xuXG4gIHZhciBsZWZ0ID0gdGhpcy5hbmQoKTtcblxuICBpZih0aGlzLmVhdCgnfHwnKSl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGxlZnQuZ2V0ICsgJ3x8JyArIHRoaXMub3IoKS5nZXQpO1xuICB9XG5cbiAgcmV0dXJuIGxlZnQ7XG59XG4vLyBlcXVhbFxuLy8gZXF1YWwgJiYgYW5kXG5vcC5hbmQgPSBmdW5jdGlvbigpe1xuXG4gIHZhciBsZWZ0ID0gdGhpcy5lcXVhbCgpO1xuXG4gIGlmKHRoaXMuZWF0KCcmJicpKXtcbiAgICByZXR1cm4gdGhpcy5nZXRzZXQobGVmdC5nZXQgKyAnJiYnICsgdGhpcy5hbmQoKS5nZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0O1xufVxuLy8gcmVsYXRpb25cbi8vIFxuLy8gZXF1YWwgPT0gcmVsYXRpb25cbi8vIGVxdWFsICE9IHJlbGF0aW9uXG4vLyBlcXVhbCA9PT0gcmVsYXRpb25cbi8vIGVxdWFsICE9PSByZWxhdGlvblxub3AuZXF1YWwgPSBmdW5jdGlvbigpe1xuICB2YXIgbGVmdCA9IHRoaXMucmVsYXRpb24oKSwgbGw7XG4gIC8vIEBwZXJmO1xuICBpZiggbGwgPSB0aGlzLmVhdChbJz09JywnIT0nLCAnPT09JywgJyE9PSddKSl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGxlZnQuZ2V0ICsgbGwudHlwZSArIHRoaXMuZXF1YWwoKS5nZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0XG59XG4vLyByZWxhdGlvbiA8IGFkZGl0aXZlXG4vLyByZWxhdGlvbiA+IGFkZGl0aXZlXG4vLyByZWxhdGlvbiA8PSBhZGRpdGl2ZVxuLy8gcmVsYXRpb24gPj0gYWRkaXRpdmVcbi8vIHJlbGF0aW9uIGluIGFkZGl0aXZlXG5vcC5yZWxhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy5hZGRpdGl2ZSgpLCBsbDtcbiAgLy8gQHBlcmZcbiAgaWYobGwgPSAodGhpcy5lYXQoWyc8JywgJz4nLCAnPj0nLCAnPD0nXSkgfHwgdGhpcy5lYXQoJ0lERU5UJywgJ2luJykgKSl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGxlZnQuZ2V0ICsgbGwudmFsdWUgKyB0aGlzLnJlbGF0aW9uKCkuZ2V0KTtcbiAgfVxuICByZXR1cm4gbGVmdFxufVxuLy8gYWRkaXRpdmUgOlxuLy8gbXVsdGl2ZVxuLy8gYWRkaXRpdmUgKyBtdWx0aXZlXG4vLyBhZGRpdGl2ZSAtIG11bHRpdmVcbm9wLmFkZGl0aXZlID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxlZnQgPSB0aGlzLm11bHRpdmUoKSAsbGw7XG4gIGlmKGxsPSB0aGlzLmVhdChbJysnLCctJ10pICl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGxlZnQuZ2V0ICsgbGwudmFsdWUgKyB0aGlzLmFkZGl0aXZlKCkuZ2V0KTtcbiAgfVxuICByZXR1cm4gbGVmdFxufVxuLy8gbXVsdGl2ZSA6XG4vLyB1bmFyeVxuLy8gbXVsdGl2ZSAqIHVuYXJ5XG4vLyBtdWx0aXZlIC8gdW5hcnlcbi8vIG11bHRpdmUgJSB1bmFyeVxub3AubXVsdGl2ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy5yYW5nZSgpICxsbDtcbiAgaWYoIGxsID0gdGhpcy5lYXQoWycqJywgJy8nICwnJSddKSApe1xuICAgIHJldHVybiB0aGlzLmdldHNldChsZWZ0LmdldCArIGxsLnR5cGUgKyB0aGlzLm11bHRpdmUoKS5nZXQpO1xuICB9XG4gIHJldHVybiBsZWZ0O1xufVxuXG5vcC5yYW5nZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBsZWZ0ID0gdGhpcy51bmFyeSgpLCBsbCwgcmlnaHQ7XG5cbiAgaWYobGwgPSB0aGlzLmVhdCgnLi4nKSl7XG4gICAgcmlnaHQgPSB0aGlzLnVuYXJ5KCk7XG4gICAgdmFyIGJvZHkgPSBcbiAgICAgIFwiKGZ1bmN0aW9uKHN0YXJ0LGVuZCl7dmFyIHJlcyA9IFtdLHN0ZXA9ZW5kPnN0YXJ0PzE6LTE7IGZvcih2YXIgaSA9IHN0YXJ0OyBlbmQ+c3RhcnQ/aSA8PSBlbmQ6IGk+PWVuZDsgaT1pK3N0ZXApe3Jlcy5wdXNoKGkpOyB9IHJldHVybiByZXMgfSkoXCIrbGVmdC5nZXQrXCIsXCIrcmlnaHQuZ2V0K1wiKVwiXG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KGJvZHkpO1xuICB9XG5cbiAgcmV0dXJuIGxlZnQ7XG59XG5cblxuXG4vLyBsZWZ0aGFuZFxuLy8gKyB1bmFyeVxuLy8gLSB1bmFyeVxuLy8gfiB1bmFyeVxuLy8gISB1bmFyeVxub3AudW5hcnkgPSBmdW5jdGlvbigpe1xuICB2YXIgbGw7XG4gIGlmKGxsID0gdGhpcy5lYXQoWycrJywnLScsJ34nLCAnISddKSl7XG4gICAgcmV0dXJuIHRoaXMuZ2V0c2V0KCcoJyArIGxsLnR5cGUgKyB0aGlzLnVuYXJ5KCkuZ2V0ICsgJyknKSA7XG4gIH1lbHNle1xuICAgIHJldHVybiB0aGlzLm1lbWJlcigpXG4gIH1cbn1cblxuLy8gY2FsbFtsZWZ0aGFuZF0gOlxuLy8gbWVtYmVyIGFyZ3Ncbi8vIG1lbWJlciBbIGV4cHJlc3Npb24gXVxuLy8gbWVtYmVyIC4gaWRlbnQgIFxuXG5vcC5tZW1iZXIgPSBmdW5jdGlvbihiYXNlLCBsYXN0LCBwYXRoZXMsIHByZXZCYXNlKXtcbiAgdmFyIGxsLCBwYXRoLCBleHRWYWx1ZTtcblxuXG4gIHZhciBvbmx5U2ltcGxlQWNjZXNzb3IgPSBmYWxzZTtcbiAgaWYoIWJhc2UpeyAvL2ZpcnN0XG4gICAgcGF0aCA9IHRoaXMucHJpbWFyeSgpO1xuICAgIHZhciB0eXBlID0gdHlwZW9mIHBhdGg7XG4gICAgaWYodHlwZSA9PT0gJ3N0cmluZycpeyBcbiAgICAgIHBhdGhlcyA9IFtdO1xuICAgICAgcGF0aGVzLnB1c2goIHBhdGggKTtcbiAgICAgIGxhc3QgPSBwYXRoO1xuICAgICAgZXh0VmFsdWUgPSBleHROYW1lICsgXCIuXCIgKyBwYXRoXG4gICAgICBiYXNlID0gY3R4TmFtZSArIFwiLl9zZ18oJ1wiICsgcGF0aCArIFwiJywgXCIgKyB2YXJOYW1lICsgXCIsIFwiICsgZXh0TmFtZSArIFwiKVwiO1xuICAgICAgb25seVNpbXBsZUFjY2Vzc29yID0gdHJ1ZTtcbiAgICB9ZWxzZXsgLy9QcmltYXRpdmUgVHlwZVxuICAgICAgaWYocGF0aC5nZXQgPT09ICd0aGlzJyl7XG4gICAgICAgIGJhc2UgPSBjdHhOYW1lO1xuICAgICAgICBwYXRoZXMgPSBbJ3RoaXMnXTtcbiAgICAgIH1lbHNle1xuICAgICAgICBwYXRoZXMgPSBudWxsO1xuICAgICAgICBiYXNlID0gcGF0aC5nZXQ7XG4gICAgICB9XG4gICAgfVxuICB9ZWxzZXsgLy8gbm90IGZpcnN0IGVudGVyXG4gICAgaWYodHlwZW9mIGxhc3QgPT09ICdzdHJpbmcnICYmIGlzUGF0aCggbGFzdCkgKXsgLy8gaXMgdmFsaWQgcGF0aFxuICAgICAgcGF0aGVzLnB1c2gobGFzdCk7XG4gICAgfWVsc2V7XG4gICAgICBpZihwYXRoZXMgJiYgcGF0aGVzLmxlbmd0aCkgdGhpcy5kZXBlbmQucHVzaChwYXRoZXMpO1xuICAgICAgcGF0aGVzID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgaWYobGwgPSB0aGlzLmVhdChbJ1snLCAnLicsICcoJ10pKXtcbiAgICBzd2l0Y2gobGwudHlwZSl7XG4gICAgICBjYXNlICcuJzpcbiAgICAgICAgICAvLyBtZW1iZXIob2JqZWN0LCBwcm9wZXJ0eSwgY29tcHV0ZWQpXG4gICAgICAgIHZhciB0bXBOYW1lID0gdGhpcy5tYXRjaCgnSURFTlQnKS52YWx1ZTtcbiAgICAgICAgcHJldkJhc2UgPSBiYXNlO1xuICAgICAgICBpZiggdGhpcy5sYSgpICE9PSBcIihcIiApeyBcbiAgICAgICAgICBiYXNlID0gY3R4TmFtZSArIFwiLl9zZ18oJ1wiICsgdG1wTmFtZSArIFwiJywgXCIgKyBiYXNlICsgXCIpXCI7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGJhc2UgKz0gXCJbJ1wiICsgdG1wTmFtZSArIFwiJ11cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXIoIGJhc2UsIHRtcE5hbWUsIHBhdGhlcywgIHByZXZCYXNlKTtcbiAgICAgIGNhc2UgJ1snOlxuICAgICAgICAgIC8vIG1lbWJlcihvYmplY3QsIHByb3BlcnR5LCBjb21wdXRlZClcbiAgICAgICAgcGF0aCA9IHRoaXMuYXNzaWduKCk7XG4gICAgICAgIHByZXZCYXNlID0gYmFzZTtcbiAgICAgICAgaWYoIHRoaXMubGEoKSAhPT0gXCIoXCIgKXsgXG4gICAgICAgIC8vIG1lYW5zIGZ1bmN0aW9uIGNhbGwsIHdlIG5lZWQgdGhyb3cgdW5kZWZpbmVkIGVycm9yIHdoZW4gY2FsbCBmdW5jdGlvblxuICAgICAgICAvLyBhbmQgY29uZmlybSB0aGF0IHRoZSBmdW5jdGlvbiBjYWxsIHdvbnQgbG9zZSBpdHMgY29udGV4dFxuICAgICAgICAgIGJhc2UgPSBjdHhOYW1lICsgXCIuX3NnXyhcIiArIHBhdGguZ2V0ICsgXCIsIFwiICsgYmFzZSArIFwiKVwiO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBiYXNlICs9IFwiW1wiICsgcGF0aC5nZXQgKyBcIl1cIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdGNoKCddJylcbiAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVyKGJhc2UsIHBhdGgsIHBhdGhlcywgcHJldkJhc2UpO1xuICAgICAgY2FzZSAnKCc6XG4gICAgICAgIC8vIGNhbGwoY2FsbGVlLCBhcmdzKVxuICAgICAgICB2YXIgYXJncyA9IHRoaXMuYXJndW1lbnRzKCkuam9pbignLCcpO1xuICAgICAgICBiYXNlID0gIGJhc2UrXCIoXCIgKyBhcmdzICtcIilcIjtcbiAgICAgICAgdGhpcy5tYXRjaCgnKScpXG4gICAgICAgIHJldHVybiB0aGlzLm1lbWJlcihiYXNlLCBudWxsLCBwYXRoZXMpO1xuICAgIH1cbiAgfVxuICBpZiggcGF0aGVzICYmIHBhdGhlcy5sZW5ndGggKSB0aGlzLmRlcGVuZC5wdXNoKCBwYXRoZXMgKTtcbiAgdmFyIHJlcyA9ICB7Z2V0OiBiYXNlfTtcbiAgaWYobGFzdCl7XG4gICAgcmVzLnNldCA9IGN0eE5hbWUgKyBcIi5fc3NfKFwiICsgXG4gICAgICAgIChsYXN0LmdldD8gbGFzdC5nZXQgOiBcIidcIisgbGFzdCArIFwiJ1wiKSArIFxuICAgICAgICBcIixcIisgXy5zZXROYW1lICsgXCIsXCIrIFxuICAgICAgICAocHJldkJhc2U/cHJldkJhc2U6Xy52YXJOYW1lKSArIFxuICAgICAgICBcIiwgJz0nLCBcIisgKCBvbmx5U2ltcGxlQWNjZXNzb3I/IDEgOiAwICkgKyBcIilcIjtcbiAgXG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBcbiAqL1xub3AuYXJndW1lbnRzID0gZnVuY3Rpb24oZW5kKXtcbiAgZW5kID0gZW5kIHx8ICcpJ1xuICB2YXIgYXJncyA9IFtdO1xuICBkb3tcbiAgICBpZih0aGlzLmxhKCkgIT09IGVuZCl7XG4gICAgICBhcmdzLnB1c2godGhpcy5hc3NpZ24oKS5nZXQpXG4gICAgfVxuICB9d2hpbGUoIHRoaXMuZWF0KCcsJykpO1xuICByZXR1cm4gYXJnc1xufVxuXG5cbi8vIHByaW1hcnkgOlxuLy8gdGhpcyBcbi8vIGlkZW50XG4vLyBsaXRlcmFsXG4vLyBhcnJheVxuLy8gb2JqZWN0XG4vLyAoIGV4cHJlc3Npb24gKVxuXG5vcC5wcmltYXJ5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGxsID0gdGhpcy5sbCgpO1xuICBzd2l0Y2gobGwudHlwZSl7XG4gICAgY2FzZSBcIntcIjpcbiAgICAgIHJldHVybiB0aGlzLm9iamVjdCgpO1xuICAgIGNhc2UgXCJbXCI6XG4gICAgICByZXR1cm4gdGhpcy5hcnJheSgpO1xuICAgIGNhc2UgXCIoXCI6XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbigpO1xuICAgIC8vIGxpdGVyYWwgb3IgaWRlbnRcbiAgICBjYXNlICdTVFJJTkcnOlxuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICByZXR1cm4gdGhpcy5nZXRzZXQoXCInXCIgKyBsbC52YWx1ZSArIFwiJ1wiKVxuICAgIGNhc2UgJ05VTUJFUic6XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICAgIHJldHVybiB0aGlzLmdldHNldChcIlwiK2xsLnZhbHVlKTtcbiAgICBjYXNlIFwiSURFTlRcIjpcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgaWYoaXNLZXlXb3JkKGxsLnZhbHVlKSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldHNldCggbGwudmFsdWUgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsbC52YWx1ZTtcbiAgICBkZWZhdWx0OiBcbiAgICAgIHRoaXMuZXJyb3IoJ1VuZXhwZWN0ZWQgVG9rZW46ICcgKyBsbC50eXBlKTtcbiAgfVxufVxuXG4vLyBvYmplY3Rcbi8vICB7cHJvcEFzc2lnbiBbLCBwcm9wQXNzaWduXSAqIFssXX1cblxuLy8gcHJvcEFzc2lnblxuLy8gIHByb3AgOiBhc3NpZ25cblxuLy8gcHJvcFxuLy8gIFNUUklOR1xuLy8gIElERU5UXG4vLyAgTlVNQkVSXG5cbm9wLm9iamVjdCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBjb2RlID0gW3RoaXMubWF0Y2goJ3snKS50eXBlXTtcblxuICB2YXIgbGwgPSB0aGlzLmVhdCggWydTVFJJTkcnLCAnSURFTlQnLCAnTlVNQkVSJ10gKTtcbiAgd2hpbGUobGwpe1xuICAgIGNvZGUucHVzaChcIidcIiArIGxsLnZhbHVlICsgXCInXCIgKyB0aGlzLm1hdGNoKCc6JykudHlwZSk7XG4gICAgdmFyIGdldCA9IHRoaXMuYXNzaWduKCkuZ2V0O1xuICAgIGNvZGUucHVzaChnZXQpO1xuICAgIGxsID0gbnVsbDtcbiAgICBpZih0aGlzLmVhdChcIixcIikgJiYgKGxsID0gdGhpcy5lYXQoWydTVFJJTkcnLCAnSURFTlQnLCAnTlVNQkVSJ10pKSApIGNvZGUucHVzaChcIixcIik7XG4gIH1cbiAgY29kZS5wdXNoKHRoaXMubWF0Y2goJ30nKS50eXBlKTtcbiAgcmV0dXJuIHtnZXQ6IGNvZGUuam9pbihcIlwiKX1cbn1cblxuLy8gYXJyYXlcbi8vIFsgYXNzaWduWyxhc3NpZ25dKl1cbm9wLmFycmF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNvZGUgPSBbdGhpcy5tYXRjaCgnWycpLnR5cGVdLCBpdGVtO1xuICBpZiggdGhpcy5lYXQoXCJdXCIpICl7XG5cbiAgICAgY29kZS5wdXNoKFwiXVwiKTtcbiAgfSBlbHNlIHtcbiAgICB3aGlsZShpdGVtID0gdGhpcy5hc3NpZ24oKSl7XG4gICAgICBjb2RlLnB1c2goaXRlbS5nZXQpO1xuICAgICAgaWYodGhpcy5lYXQoJywnKSkgY29kZS5wdXNoKFwiLFwiKTtcbiAgICAgIGVsc2UgYnJlYWs7XG4gICAgfVxuICAgIGNvZGUucHVzaCh0aGlzLm1hdGNoKCddJykudHlwZSk7XG4gIH1cbiAgcmV0dXJuIHtnZXQ6IGNvZGUuam9pbihcIlwiKX07XG59XG5cbi8vICcoJyBleHByZXNzaW9uICcpJ1xub3AucGFyZW4gPSBmdW5jdGlvbigpe1xuICB0aGlzLm1hdGNoKCcoJyk7XG4gIHZhciByZXMgPSB0aGlzLmZpbHRlcigpXG4gIHJlcy5nZXQgPSAnKCcgKyByZXMuZ2V0ICsgJyknO1xuICB0aGlzLm1hdGNoKCcpJyk7XG4gIHJldHVybiByZXM7XG59XG5cbm9wLmdldHNldCA9IGZ1bmN0aW9uKGdldCwgc2V0KXtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGdldCxcbiAgICBzZXQ6IHNldFxuICB9XG59XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlcjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBlbGVtZW50OiBmdW5jdGlvbihuYW1lLCBhdHRycywgY2hpbGRyZW4pe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZWxlbWVudCcsXG4gICAgICB0YWc6IG5hbWUsXG4gICAgICBhdHRyczogYXR0cnMsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICB9XG4gIH0sXG4gIGF0dHJpYnV0ZTogZnVuY3Rpb24obmFtZSwgdmFsdWUpe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnYXR0cmlidXRlJyxcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9XG4gIH0sXG4gIFwiaWZcIjogZnVuY3Rpb24odGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2lmJyxcbiAgICAgIHRlc3Q6IHRlc3QsXG4gICAgICBjb25zZXF1ZW50OiBjb25zZXF1ZW50LFxuICAgICAgYWx0ZXJuYXRlOiBhbHRlcm5hdGVcbiAgICB9XG4gIH0sXG4gIGxpc3Q6IGZ1bmN0aW9uKHNlcXVlbmNlLCB2YXJpYWJsZSwgYm9keSl7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdsaXN0JyxcbiAgICAgIHNlcXVlbmNlOiBzZXF1ZW5jZSxcbiAgICAgIHZhcmlhYmxlOiB2YXJpYWJsZSxcbiAgICAgIGJvZHk6IGJvZHlcbiAgICB9XG4gIH0sXG4gIGV4cHJlc3Npb246IGZ1bmN0aW9uKCBib2R5LCBzZXRib2R5LCBjb25zdGFudCApe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcImV4cHJlc3Npb25cIixcbiAgICAgIGJvZHk6IGJvZHksXG4gICAgICBjb25zdGFudDogY29uc3RhbnQgfHwgZmFsc2UsXG4gICAgICBzZXRib2R5OiBzZXRib2R5IHx8IGZhbHNlXG4gICAgfVxuICB9LFxuICB0ZXh0OiBmdW5jdGlvbih0ZXh0KXtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICB0ZXh0OiB0ZXh0XG4gICAgfVxuICB9LFxuICB0ZW1wbGF0ZTogZnVuY3Rpb24odGVtcGxhdGUpe1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAndGVtcGxhdGUnLFxuICAgICAgY29udGVudDogdGVtcGxhdGVcbiAgICB9XG4gIH1cbn1cbiIsInJlcXVpcmUoJy4vaGVscGVyL3NoaW0uanMnKTtcbnZhciBfICA9IG1vZHVsZS5leHBvcnRzO1xudmFyIGVudGl0aWVzID0gcmVxdWlyZSgnLi9oZWxwZXIvZW50aXRpZXMuanMnKTtcbnZhciBzbGljZSA9IFtdLnNsaWNlO1xudmFyIG8yc3RyID0gKHt9KS50b1N0cmluZztcbnZhciB3aW4gPSB0eXBlb2Ygd2luZG93ICE9PSd1bmRlZmluZWQnPyB3aW5kb3c6IGdsb2JhbDtcblxuXG5fLm5vb3AgPSBmdW5jdGlvbigpe307XG5fLnVpZCA9IChmdW5jdGlvbigpe1xuICB2YXIgX3VpZD0wO1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX3VpZCsrO1xuICB9XG59KSgpO1xuXG5fLnZhck5hbWUgPSAnZCc7XG5fLnNldE5hbWUgPSAncF8nO1xuXy5jdHhOYW1lID0gJ2MnO1xuXy5leHROYW1lID0gJ2UnO1xuXG5fLnJXb3JkID0gL15bXFwkXFx3XSskLztcbl8uclNpbXBsZUFjY2Vzc29yID0gL15bXFwkXFx3XSsoXFwuW1xcJFxcd10rKSokLztcblxuXy5uZXh0VGljayA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbic/IFxuICBzZXRJbW1lZGlhdGUuYmluZCh3aW4pIDogXG4gIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgMCkgXG4gIH1cblxuXG5cbl8ucHJlZml4ID0gXCJ2YXIgXCIgKyBfLnZhck5hbWUgKyBcIj1cIiArIF8uY3R4TmFtZSArIFwiLmRhdGE7XCIgKyAgXy5leHROYW1lICArIFwiPVwiICsgXy5leHROYW1lICsgXCJ8fCcnO1wiO1xuXG5cbl8uc2xpY2UgPSBmdW5jdGlvbihvYmosIHN0YXJ0LCBlbmQpe1xuICB2YXIgcmVzID0gW107XG4gIGZvcih2YXIgaSA9IHN0YXJ0IHx8IDAsIGxlbiA9IGVuZCB8fCBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIHZhciBpdGVtID0gb2JqW2ldO1xuICAgIHJlcy5wdXNoKGl0ZW0pXG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuXy50eXBlT2YgPSBmdW5jdGlvbiAobykge1xuICByZXR1cm4gbyA9PSBudWxsID8gU3RyaW5nKG8pIDogbzJzdHIuY2FsbChvKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKTtcbn1cblxuXG5fLmV4dGVuZCA9IGZ1bmN0aW9uKCBvMSwgbzIsIG92ZXJyaWRlICl7XG4gIGlmKF8udHlwZU9mKG92ZXJyaWRlKSA9PT0gJ2FycmF5Jyl7XG4gICBmb3IodmFyIGkgPSAwLCBsZW4gPSBvdmVycmlkZS5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xuICAgIHZhciBrZXkgPSBvdmVycmlkZVtpXTtcbiAgICBvMVtrZXldID0gbzJba2V5XTtcbiAgIH0gXG4gIH1lbHNle1xuICAgIGZvcih2YXIgaSBpbiBvMil7XG4gICAgICBpZiggdHlwZW9mIG8xW2ldID09PSBcInVuZGVmaW5lZFwiIHx8IG92ZXJyaWRlID09PSB0cnVlICl7XG4gICAgICAgIG8xW2ldID0gbzJbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG8xO1xufVxuXG5fLm1ha2VQcmVkaWNhdGUgPSBmdW5jdGlvbiBtYWtlUHJlZGljYXRlKHdvcmRzLCBwcmVmaXgpIHtcbiAgICBpZiAodHlwZW9mIHdvcmRzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHdvcmRzID0gd29yZHMuc3BsaXQoXCIgXCIpO1xuICAgIH1cbiAgICB2YXIgZiA9IFwiXCIsXG4gICAgY2F0cyA9IFtdO1xuICAgIG91dDogZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNhdHMubGVuZ3RoOyArK2ope1xuICAgICAgICAgIGlmIChjYXRzW2pdWzBdLmxlbmd0aCA9PT0gd29yZHNbaV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNhdHNbal0ucHVzaCh3b3Jkc1tpXSk7XG4gICAgICAgICAgICAgIGNvbnRpbnVlIG91dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0cy5wdXNoKFt3b3Jkc1tpXV0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb21wYXJlVG8oYXJyKSB7XG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAxKSByZXR1cm4gZiArPSBcInJldHVybiBzdHIgPT09ICdcIiArIGFyclswXSArIFwiJztcIjtcbiAgICAgICAgZiArPSBcInN3aXRjaChzdHIpe1wiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgIGYgKz0gXCJjYXNlICdcIiArIGFycltpXSArIFwiJzpcIjtcbiAgICAgICAgfVxuICAgICAgICBmICs9IFwicmV0dXJuIHRydWV9cmV0dXJuIGZhbHNlO1wiO1xuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlcmUgYXJlIG1vcmUgdGhhbiB0aHJlZSBsZW5ndGggY2F0ZWdvcmllcywgYW4gb3V0ZXJcbiAgICAvLyBzd2l0Y2ggZmlyc3QgZGlzcGF0Y2hlcyBvbiB0aGUgbGVuZ3RocywgdG8gc2F2ZSBvbiBjb21wYXJpc29ucy5cbiAgICBpZiAoY2F0cy5sZW5ndGggPiAzKSB7XG4gICAgICAgIGNhdHMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIGYgKz0gXCJzd2l0Y2goc3RyLmxlbmd0aCl7XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2F0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNhdCA9IGNhdHNbaV07XG4gICAgICAgICAgICBmICs9IFwiY2FzZSBcIiArIGNhdFswXS5sZW5ndGggKyBcIjpcIjtcbiAgICAgICAgICAgIGNvbXBhcmVUbyhjYXQpO1xuICAgICAgICB9XG4gICAgICAgIGYgKz0gXCJ9XCI7XG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBzaW1wbHkgZ2VuZXJhdGUgYSBmbGF0IGBzd2l0Y2hgIHN0YXRlbWVudC5cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb21wYXJlVG8od29yZHMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwic3RyXCIsIGYpO1xufVxuXG5cbl8udHJhY2tFcnJvclBvcyA9IChmdW5jdGlvbiAoKXtcbiAgLy8gbGluZWJyZWFrXG4gIHZhciBsYiA9IC9cXHJcXG58W1xcblxcclxcdTIwMjhcXHUyMDI5XS9nO1xuICBmdW5jdGlvbiBmaW5kTGluZShsaW5lcywgcG9zKXtcbiAgICB2YXIgdG1wTGVuID0gMDtcbiAgICBmb3IodmFyIGkgPSAwLGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgIHZhciBsaW5lTGVuID0gKGxpbmVzW2ldIHx8IFwiXCIpLmxlbmd0aDtcbiAgICAgIGlmKHRtcExlbiArIGxpbmVMZW4gPiBwb3MpIHJldHVybiB7bnVtOiBpLCBsaW5lOiBsaW5lc1tpXSwgc3RhcnQ6IHBvcyAtIHRtcExlbn07XG4gICAgICAvLyAxIGlzIGZvciB0aGUgbGluZWJyZWFrXG4gICAgICB0bXBMZW4gPSB0bXBMZW4gKyBsaW5lTGVuICsgMTtcbiAgICB9XG4gICAgXG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBwb3Mpe1xuICAgIGlmKHBvcyA+IGlucHV0Lmxlbmd0aC0xKSBwb3MgPSBpbnB1dC5sZW5ndGgtMTtcbiAgICBsYi5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBsaW5lcyA9IGlucHV0LnNwbGl0KGxiKTtcbiAgICB2YXIgbGluZSA9IGZpbmRMaW5lKGxpbmVzLHBvcyk7XG4gICAgdmFyIGxlbiA9IGxpbmUubGluZS5sZW5ndGg7XG5cbiAgICB2YXIgbWluID0gbGluZS5zdGFydCAtIDEwO1xuICAgIGlmKG1pbiA8IDApIG1pbiA9IDA7XG5cbiAgICB2YXIgbWF4ID0gbGluZS5zdGFydCArIDEwO1xuICAgIGlmKG1heCA+IGxlbikgbWF4ID0gbGVuO1xuXG4gICAgdmFyIHJlbWFpbiA9IGxpbmUubGluZS5zbGljZShtaW4sIG1heCk7XG4gICAgdmFyIHByZWZpeCA9IChsaW5lLm51bSsxKSArIFwiPiBcIiArIChtaW4gPiAwPyBcIi4uLlwiIDogXCJcIilcbiAgICB2YXIgcG9zdGZpeCA9IG1heCA8IGxlbiA/IFwiLi4uXCI6IFwiXCI7XG5cbiAgICByZXR1cm4gcHJlZml4ICsgcmVtYWluICsgcG9zdGZpeCArIFwiXFxuXCIgKyBuZXcgQXJyYXkobGluZS5zdGFydCArIHByZWZpeC5sZW5ndGggKyAxKS5qb2luKFwiIFwiKSArIFwiXlwiO1xuICB9XG59KSgpO1xuXG5cbnZhciBpZ25vcmVkUmVmID0gL1xcKChcXD9cXCF8XFw/XFw6fFxcP1xcPSkvZztcbl8uZmluZFN1YkNhcHR1cmUgPSBmdW5jdGlvbiAocmVnU3RyKSB7XG4gIHZhciBsZWZ0ID0gMCxcbiAgICByaWdodCA9IDAsXG4gICAgbGVuID0gcmVnU3RyLmxlbmd0aCxcbiAgICBpZ25vcmVkID0gcmVnU3RyLm1hdGNoKGlnbm9yZWRSZWYpOyAvLyBpZ25vcmVkIHVuY2FwdHVyZVxuICBpZihpZ25vcmVkKSBpZ25vcmVkID0gaWdub3JlZC5sZW5ndGhcbiAgZWxzZSBpZ25vcmVkID0gMDtcbiAgZm9yICg7IGxlbi0tOykge1xuICAgIHZhciBsZXR0ZXIgPSByZWdTdHIuY2hhckF0KGxlbik7XG4gICAgaWYgKGxlbiA9PT0gMCB8fCByZWdTdHIuY2hhckF0KGxlbiAtIDEpICE9PSBcIlxcXFxcIiApIHsgXG4gICAgICBpZiAobGV0dGVyID09PSBcIihcIikgbGVmdCsrO1xuICAgICAgaWYgKGxldHRlciA9PT0gXCIpXCIpIHJpZ2h0Kys7XG4gICAgfVxuICB9XG4gIGlmIChsZWZ0ICE9PSByaWdodCkgdGhyb3cgXCJSZWdFeHA6IFwiKyByZWdTdHIgKyBcIidzIGJyYWNrZXQgaXMgbm90IG1hcmNoZWRcIjtcbiAgZWxzZSByZXR1cm4gbGVmdCAtIGlnbm9yZWQ7XG59O1xuXG5cbl8uZXNjYXBlUmVnRXhwID0gZnVuY3Rpb24oIHN0cil7Ly8gQ3JlZGl0OiBYUmVnRXhwIDAuNi4xIChjKSAyMDA3LTIwMDggU3RldmVuIExldml0aGFuIDxodHRwOi8vc3RldmVubGV2aXRoYW4uY29tL3JlZ2V4L3hyZWdleHAvPiBNSVQgTGljZW5zZVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uXFxcXF4kfCwjXFxzXS9nLCBmdW5jdGlvbihtYXRjaCl7XG4gICAgcmV0dXJuICdcXFxcJyArIG1hdGNoO1xuICB9KTtcbn07XG5cblxudmFyIHJFbnRpdHkgPSBuZXcgUmVnRXhwKFwiJihcIiArIE9iamVjdC5rZXlzKGVudGl0aWVzKS5qb2luKCd8JykgKyAnKTsnLCAnZ2knKTtcblxuXy5jb252ZXJ0RW50aXR5ID0gZnVuY3Rpb24oY2hyKXtcblxuICByZXR1cm4gKFwiXCIgKyBjaHIpLnJlcGxhY2UockVudGl0eSwgZnVuY3Rpb24oYWxsLCBjYXB0dXJlKXtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlbnRpdGllc1tjYXB0dXJlXSlcbiAgfSk7XG5cbn1cblxuXG4vLyBzaW1wbGUgZ2V0IGFjY2Vzc29yXG5cbl8uY3JlYXRlT2JqZWN0ID0gZnVuY3Rpb24obywgcHJvcHMpe1xuICAgIGZ1bmN0aW9uIEZvbygpIHt9XG4gICAgRm9vLnByb3RvdHlwZSA9IG87XG4gICAgdmFyIHJlcyA9IG5ldyBGb287XG4gICAgaWYocHJvcHMpIF8uZXh0ZW5kKHJlcywgcHJvcHMpO1xuICAgIHJldHVybiByZXM7XG59XG5cbl8uY3JlYXRlUHJvdG8gPSBmdW5jdGlvbihmbiwgbyl7XG4gICAgZnVuY3Rpb24gRm9vKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZm47fVxuICAgIEZvby5wcm90b3R5cGUgPSBvO1xuICAgIHJldHVybiAoZm4ucHJvdG90eXBlID0gbmV3IEZvbygpKTtcbn1cblxuXG4vKipcbmNsb25lXG4qL1xuXy5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKG9iail7XG4gICAgdmFyIHR5cGUgPSBfLnR5cGVPZihvYmopO1xuICAgIGlmKHR5cGUgPT09ICdhcnJheScpe1xuICAgICAgdmFyIGNsb25lZCA9IFtdO1xuICAgICAgZm9yKHZhciBpPTAsbGVuID0gb2JqLmxlbmd0aDsgaTwgbGVuO2krKyl7XG4gICAgICAgIGNsb25lZFtpXSA9IG9ialtpXVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICB9XG4gICAgaWYodHlwZSA9PT0gJ29iamVjdCcpe1xuICAgICAgdmFyIGNsb25lZCA9IHt9O1xuICAgICAgZm9yKHZhciBpIGluIG9iaikgaWYob2JqLmhhc093blByb3BlcnR5KGkpKXtcbiAgICAgICAgY2xvbmVkW2ldID0gb2JqW2ldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG5cbl8uZXF1YWxzID0gZnVuY3Rpb24obm93LCBvbGQpe1xuICBpZiggQXJyYXkuaXNBcnJheShub3cpICl7XG4gICAgdmFyIHNwbGljZXMgPSBsZChub3csIG9sZHx8W10pO1xuICAgIHJldHVybiBzcGxpY2VzO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIG5vdztcbiAgaWYodHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG9sZCA9PT0gJ251bWJlcicmJiBpc05hTihub3cpICYmIGlzTmFOKG9sZCkpIHJldHVybiB0cnVlXG4gIHJldHVybiBub3cgPT09IG9sZDtcbn1cblxuXG4vL0xldmVuc2h0ZWluX2Rpc3RhbmNlXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vMS4gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXZlbnNodGVpbl9kaXN0YW5jZVxuLy8yLiBnaXRodWIuY29tOnBvbHltZXIvb2JzZXJ2ZS1qc1xuXG52YXIgbGQgPSAoZnVuY3Rpb24oKXtcbiAgZnVuY3Rpb24gZXF1YWxzKGEsYil7XG4gICAgcmV0dXJuIGEgPT09IGI7XG4gIH1cbiAgZnVuY3Rpb24gbGQoYXJyYXkxLCBhcnJheTIpe1xuICAgIHZhciBuID0gYXJyYXkxLmxlbmd0aDtcbiAgICB2YXIgbSA9IGFycmF5Mi5sZW5ndGg7XG4gICAgdmFyIG1hdHJpeCA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKXtcbiAgICAgIG1hdHJpeC5wdXNoKFtpXSk7XG4gICAgfVxuICAgIGZvcih2YXIgaj0xO2o8PW07aisrKXtcbiAgICAgIG1hdHJpeFswXVtqXT1qO1xuICAgIH1cbiAgICBmb3IodmFyIGkgPSAxOyBpIDw9IG47IGkrKyl7XG4gICAgICBmb3IodmFyIGogPSAxOyBqIDw9IG07IGorKyl7XG4gICAgICAgIGlmKGVxdWFscyhhcnJheTFbaS0xXSwgYXJyYXkyW2otMV0pKXtcbiAgICAgICAgICBtYXRyaXhbaV1bal0gPSBtYXRyaXhbaS0xXVtqLTFdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBtYXRyaXhbaV1bal0gPSBNYXRoLm1pbihcbiAgICAgICAgICAgIG1hdHJpeFtpLTFdW2pdKzEsIC8vZGVsZXRlXG4gICAgICAgICAgICBtYXRyaXhbaV1bai0xXSsxLy9hZGRcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF0cml4O1xuICB9XG4gIGZ1bmN0aW9uIHdob2xlKGFycjIsIGFycjEpIHtcbiAgICAgIHZhciBtYXRyaXggPSBsZChhcnIxLCBhcnIyKVxuICAgICAgdmFyIG4gPSBhcnIxLmxlbmd0aDtcbiAgICAgIHZhciBpID0gbjtcbiAgICAgIHZhciBtID0gYXJyMi5sZW5ndGg7XG4gICAgICB2YXIgaiA9IG07XG4gICAgICB2YXIgZWRpdHMgPSBbXTtcbiAgICAgIHZhciBjdXJyZW50ID0gbWF0cml4W2ldW2pdO1xuICAgICAgd2hpbGUoaT4wIHx8IGo+MCl7XG4gICAgICAvLyB0aGUgbGFzdCBsaW5lXG4gICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgZWRpdHMudW5zaGlmdCgzKTtcbiAgICAgICAgICBqLS07XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlIGxhc3QgY29sXG4gICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgZWRpdHMudW5zaGlmdCgyKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vcnRoV2VzdCA9IG1hdHJpeFtpIC0gMV1baiAtIDFdO1xuICAgICAgICB2YXIgd2VzdCA9IG1hdHJpeFtpIC0gMV1bal07XG4gICAgICAgIHZhciBub3J0aCA9IG1hdHJpeFtpXVtqIC0gMV07XG5cbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluKG5vcnRoLCB3ZXN0LCBub3J0aFdlc3QpO1xuXG4gICAgICAgIGlmIChtaW4gPT09IHdlc3QpIHtcbiAgICAgICAgICBlZGl0cy51bnNoaWZ0KDIpOyAvL2RlbGV0ZVxuICAgICAgICAgIGktLTtcbiAgICAgICAgICBjdXJyZW50ID0gd2VzdDtcbiAgICAgICAgfSBlbHNlIGlmIChtaW4gPT09IG5vcnRoV2VzdCApIHtcbiAgICAgICAgICBpZiAobm9ydGhXZXN0ID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICBlZGl0cy51bnNoaWZ0KDApOyAvL25vIGNoYW5nZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZGl0cy51bnNoaWZ0KDEpOyAvL3VwZGF0ZVxuICAgICAgICAgICAgY3VycmVudCA9IG5vcnRoV2VzdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaS0tO1xuICAgICAgICAgIGotLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlZGl0cy51bnNoaWZ0KDMpOyAvL2FkZFxuICAgICAgICAgIGotLTtcbiAgICAgICAgICBjdXJyZW50ID0gbm9ydGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBMRUFWRSA9IDA7XG4gICAgICB2YXIgQUREID0gMztcbiAgICAgIHZhciBERUxFTEUgPSAyO1xuICAgICAgdmFyIFVQREFURSA9IDE7XG4gICAgICB2YXIgbiA9IDA7bT0wO1xuICAgICAgdmFyIHN0ZXBzID0gW107XG4gICAgICB2YXIgc3RlcCA9IHtpbmRleDogbnVsbCwgYWRkOjAsIHJlbW92ZWQ6W119O1xuXG4gICAgICBmb3IodmFyIGk9MDtpPGVkaXRzLmxlbmd0aDtpKyspe1xuICAgICAgICBpZihlZGl0c1tpXSA+IDAgKXsgLy8gTk9UIExFQVZFXG4gICAgICAgICAgaWYoc3RlcC5pbmRleCA9PT0gbnVsbCl7XG4gICAgICAgICAgICBzdGVwLmluZGV4ID0gbTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vTEVBVkVcbiAgICAgICAgICBpZihzdGVwLmluZGV4ICE9IG51bGwpe1xuICAgICAgICAgICAgc3RlcHMucHVzaChzdGVwKVxuICAgICAgICAgICAgc3RlcCA9IHtpbmRleDogbnVsbCwgYWRkOjAsIHJlbW92ZWQ6W119O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2goZWRpdHNbaV0pe1xuICAgICAgICAgIGNhc2UgTEVBVkU6XG4gICAgICAgICAgICBuKys7XG4gICAgICAgICAgICBtKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEFERDpcbiAgICAgICAgICAgIHN0ZXAuYWRkKys7XG4gICAgICAgICAgICBtKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIERFTEVMRTpcbiAgICAgICAgICAgIHN0ZXAucmVtb3ZlZC5wdXNoKGFycjFbbl0pXG4gICAgICAgICAgICBuKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFVQREFURTpcbiAgICAgICAgICAgIHN0ZXAuYWRkKys7XG4gICAgICAgICAgICBzdGVwLnJlbW92ZWQucHVzaChhcnIxW25dKVxuICAgICAgICAgICAgbisrO1xuICAgICAgICAgICAgbSsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKHN0ZXAuaW5kZXggIT0gbnVsbCl7XG4gICAgICAgIHN0ZXBzLnB1c2goc3RlcClcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGVwc1xuICAgIH1cbiAgICByZXR1cm4gd2hvbGU7XG4gIH0pKCk7XG5cblxuXG5fLnRocm90dGxlID0gZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCl7XG4gIHZhciB3YWl0ID0gd2FpdCB8fCAxMDA7XG4gIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgdmFyIHByZXZpb3VzID0gMDtcbiAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcHJldmlvdXMgPSArbmV3IERhdGU7XG4gICAgdGltZW91dCA9IG51bGw7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbm93ID0gKyBuZXcgRGF0ZTtcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgY29udGV4dCA9IHRoaXM7XG4gICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfSBlbHNlIGlmICghdGltZW91dCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG4vLyBob2dhbiBlc2NhcGVcbi8vID09PT09PT09PT09PT09XG5fLmVzY2FwZSA9IChmdW5jdGlvbigpe1xuICB2YXIgckFtcCA9IC8mL2csXG4gICAgICByTHQgPSAvPC9nLFxuICAgICAgckd0ID0gLz4vZyxcbiAgICAgIHJBcG9zID0gL1xcJy9nLFxuICAgICAgclF1b3QgPSAvXFxcIi9nLFxuICAgICAgaENoYXJzID0gL1smPD5cXFwiXFwnXS87XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBoQ2hhcnMudGVzdChzdHIpID9cbiAgICAgIHN0clxuICAgICAgICAucmVwbGFjZShyQW1wLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZShyTHQsICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2Uockd0LCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKHJBcG9zLCAnJiMzOTsnKVxuICAgICAgICAucmVwbGFjZShyUXVvdCwgJyZxdW90OycpIDpcbiAgICAgIHN0cjtcbiAgfVxufSkoKTtcblxuXy5jYWNoZSA9IGZ1bmN0aW9uKG1heCl7XG4gIG1heCA9IG1heCB8fCAxMDAwO1xuICB2YXIga2V5cyA9IFtdLFxuICAgICAgY2FjaGUgPSB7fTtcbiAgcmV0dXJuIHtcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgIGNhY2hlW2tleXMuc2hpZnQoKV0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICAvLyBcbiAgICAgIGlmKGNhY2hlW2tleV0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgICAgY2FjaGVba2V5XSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNhY2hlO1xuICAgICAgcmV0dXJuIGNhY2hlW2tleV07XG4gICAgfSxcbiAgICBtYXg6IG1heCxcbiAgICBsZW46ZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBrZXlzLmxlbmd0aDtcbiAgICB9XG4gIH07XG59XG5cbi8vIC8vIHNldHVwIHRoZSByYXcgRXhwcmVzc2lvblxuLy8gXy50b3VjaEV4cHJlc3Npb24gPSBmdW5jdGlvbihleHByKXtcbi8vICAgaWYoZXhwci50eXBlID09PSAnZXhwcmVzc2lvbicpe1xuLy8gICB9XG4vLyAgIHJldHVybiBleHByO1xuLy8gfVxuXG5cbi8vIGhhbmRsZSB0aGUgc2FtZSBsb2dpYyBvbiBjb21wb25lbnQncyBgb24tKmAgYW5kIGVsZW1lbnQncyBgb24tKmBcbi8vIHJldHVybiB0aGUgZmlyZSBvYmplY3Rcbl8uaGFuZGxlRXZlbnQgPSBmdW5jdGlvbih2YWx1ZSwgdHlwZSApe1xuICB2YXIgc2VsZiA9IHRoaXMsIGV2YWx1YXRlO1xuICBpZih2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbicpeyAvLyBpZiBpcyBleHByZXNzaW9uLCBnbyBldmFsdWF0ZWQgd2F5XG4gICAgZXZhbHVhdGUgPSB2YWx1ZS5nZXQ7XG4gIH1cbiAgaWYoZXZhbHVhdGUpe1xuICAgIHJldHVybiBmdW5jdGlvbiBmaXJlKG9iail7XG4gICAgICBzZWxmLmRhdGEuJGV2ZW50ID0gb2JqO1xuICAgICAgdmFyIHJlcyA9IGV2YWx1YXRlKHNlbGYpO1xuICAgICAgaWYocmVzID09PSBmYWxzZSAmJiBvYmogJiYgb2JqLnByZXZlbnREZWZhdWx0KSBvYmoucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNlbGYuZGF0YS4kZXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICB9XG4gIH1lbHNle1xuICAgIHJldHVybiBmdW5jdGlvbiBmaXJlKCl7XG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSAgICAgIFxuICAgICAgYXJncy51bnNoaWZ0KHZhbHVlKTtcbiAgICAgIHNlbGYuJGVtaXQuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICBzZWxmLiR1cGRhdGUoKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gb25seSBjYWxsIG9uY2Vcbl8ub25jZSA9IGZ1bmN0aW9uKGZuKXtcbiAgdmFyIHRpbWUgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICBpZiggdGltZSsrID09PSAwKSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG59XG5cblxuXG5fLmxvZyA9IGZ1bmN0aW9uKG1zZywgdHlwZSl7XG4gIGlmKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSAgY29uc29sZVt0eXBlIHx8IFwibG9nXCJdKG1zZyk7XG59XG5cblxuXG5cbi8vaHR0cDovL3d3dy53My5vcmcvaHRtbC93Zy9kcmFmdHMvaHRtbC9tYXN0ZXIvc2luZ2xlLXBhZ2UuaHRtbCN2b2lkLWVsZW1lbnRzXG5fLmlzVm9pZFRhZyA9IF8ubWFrZVByZWRpY2F0ZShcImFyZWEgYmFzZSBiciBjb2wgZW1iZWQgaHIgaW1nIGlucHV0IGtleWdlbiBsaW5rIG1lbnVpdGVtIG1ldGEgcGFyYW0gc291cmNlIHRyYWNrIHdiciByLWNvbnRlbnRcIik7XG5fLmlzQm9vbGVhbkF0dHIgPSBfLm1ha2VQcmVkaWNhdGUoJ3NlbGVjdGVkIGNoZWNrZWQgZGlzYWJsZWQgcmVhZE9ubHkgcmVxdWlyZWQgb3BlbiBhdXRvZm9jdXMgY29udHJvbHMgYXV0b3BsYXkgY29tcGFjdCBsb29wIGRlZmVyIG11bHRpcGxlJyk7XG5cbl8uaXNGYWxzZSAtIGZ1bmN0aW9uKCl7cmV0dXJuIGZhbHNlfVxuXy5pc1RydWUgLSBmdW5jdGlvbigpe3JldHVybiB0cnVlfVxuXG5cbl8uYXNzZXJ0ID0gZnVuY3Rpb24odGVzdCwgbXNnKXtcbiAgaWYoIXRlc3QpIHRocm93IG1zZztcbn1cblxuIiwidmFyIG5vZGUgPSByZXF1aXJlKFwiLi9wYXJzZXIvbm9kZS5qc1wiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi9kb20uanNcIik7XG52YXIgYW5pbWF0ZSA9IHJlcXVpcmUoXCIuL2hlbHBlci9hbmltYXRlLmpzXCIpO1xudmFyIEdyb3VwID0gcmVxdWlyZSgnLi9ncm91cC5qcycpO1xudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBjb21iaW5lID0gcmVxdWlyZSgnLi9oZWxwZXIvY29tYmluZS5qcycpO1xuXG52YXIgd2Fsa2VycyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbndhbGtlcnMubGlzdCA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG5cbiAgdmFyIFJlZ3VsYXIgPSB3YWxrZXJzLlJlZ3VsYXI7ICBcbiAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlJlZ3VsYXIgbGlzdFwiKSxcbiAgICBuYW1lc3BhY2UgPSBvcHRpb25zLm5hbWVzcGFjZSxcbiAgICBleHRyYSA9IG9wdGlvbnMuZXh0cmE7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gIGdyb3VwLnB1c2gocGxhY2Vob2xkZXIpO1xuICB2YXIgaW5kZXhOYW1lID0gYXN0LnZhcmlhYmxlICsgJ19pbmRleCc7XG4gIHZhciB2YXJpYWJsZSA9IGFzdC52YXJpYWJsZTtcblxuICBmdW5jdGlvbiB1cGRhdGUobmV3VmFsdWUsIHNwbGljZXMpe1xuICAgIGlmKCFuZXdWYWx1ZSkge1xuICAgICAgbmV3VmFsdWUgPSBbXTtcbiAgICAgIHNwbGljZXMgPSBfLmVxdWFscyhuZXdWYWx1ZSwgc3BsaWNlcyk7XG4gICAgfVxuICAgIFxuICAgIGlmKCFzcGxpY2VzIHx8ICFzcGxpY2VzLmxlbmd0aCkgcmV0dXJuO1xuICAgIHZhciBjdXIgPSBwbGFjZWhvbGRlcjtcbiAgICB2YXIgbSA9IDAsIGxlbiA9IG5ld1ZhbHVlLmxlbmd0aCxcbiAgICAgIG1JbmRleCA9IHNwbGljZXNbMF0uaW5kZXg7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3BsaWNlcy5sZW5ndGg7IGkrKyl7IC8vaW5pdFxuICAgICAgdmFyIHNwbGljZSA9IHNwbGljZXNbaV07XG4gICAgICB2YXIgaW5kZXggPSBzcGxpY2UuaW5kZXg7IC8vIGJlYWN1c2Ugd2UgdXNlIGEgY29tbWVudCBmb3IgcGxhY2Vob2xkZXJcblxuICAgICAgZm9yKHZhciBrID0gbTsgayA8IGluZGV4OyBrKyspeyAvLyBubyBjaGFuZ2VcbiAgICAgICAgdmFyIHNlY3QgPSBncm91cC5nZXQoIGsgKyAxICk7XG4gICAgICAgIHNlY3QuZGF0YVtpbmRleE5hbWVdID0gaztcbiAgICAgIH1cbiAgICAgIGZvcih2YXIgaiA9IDAsIGpsZW4gPSBzcGxpY2UucmVtb3ZlZC5sZW5ndGg7IGo8IGpsZW47IGorKyl7IC8vcmVtb3ZlZFxuICAgICAgICB2YXIgcmVtb3ZlZCA9IGdyb3VwLmNoaWxkcmVuLnNwbGljZSggaW5kZXggKyAxLCAxKVswXTtcbiAgICAgICAgcmVtb3ZlZC5kZXN0cm95KHRydWUpO1xuICAgICAgfVxuXG4gICAgICBmb3IodmFyIG8gPSBpbmRleDsgbyA8IGluZGV4ICsgc3BsaWNlLmFkZDsgbysrKXsgLy9hZGRcbiAgICAgICAgLy8gcHJvdG90eXBlIGluaGVyaXRcbiAgICAgICAgdmFyIGl0ZW0gPSBuZXdWYWx1ZVtvXTtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YVtpbmRleE5hbWVdID0gbztcbiAgICAgICAgZGF0YVt2YXJpYWJsZV0gPSBpdGVtO1xuXG4gICAgICAgIF8uZXh0ZW5kKGRhdGEsIGV4dHJhKTtcbiAgICAgICAgdmFyIHNlY3Rpb24gPSBzZWxmLiRjb21waWxlKGFzdC5ib2R5LCB7XG4gICAgICAgICAgZXh0cmE6IGRhdGEsXG4gICAgICAgICAgbmFtZXNwYWNlOm5hbWVzcGFjZSxcbiAgICAgICAgICByZWNvcmQ6IHRydWUsXG4gICAgICAgICAgb3V0ZXI6IG9wdGlvbnMub3V0ZXJcbiAgICAgICAgfSlcbiAgICAgICAgc2VjdGlvbi5kYXRhID0gZGF0YTtcbiAgICAgICAgLy8gYXV0b2xpbmtcbiAgICAgICAgdmFyIGluc2VydCA9ICBjb21iaW5lLmxhc3QoZ3JvdXAuZ2V0KG8pKTtcbiAgICAgICAgaWYoaW5zZXJ0LnBhcmVudE5vZGUpe1xuICAgICAgICAgIGFuaW1hdGUuaW5qZWN0KGNvbWJpbmUubm9kZShzZWN0aW9uKSxpbnNlcnQsICdhZnRlcicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGluc2VydC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb21iaW5lLm5vZGUoc2VjdGlvbiksIGluc2VydC5uZXh0U2libGluZyk7XG4gICAgICAgIGdyb3VwLmNoaWxkcmVuLnNwbGljZSggbyArIDEgLCAwLCBzZWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIG0gPSBpbmRleCArIHNwbGljZS5hZGQgLSBzcGxpY2UucmVtb3ZlZC5sZW5ndGg7XG4gICAgICBtICA9IG0gPCAwPyAwIDogbTtcblxuICAgIH1cbiAgICBpZihtIDwgbGVuKXtcbiAgICAgIGZvcih2YXIgaSA9IG07IGkgPCBsZW47IGkrKyl7XG4gICAgICAgIHZhciBwYWlyID0gZ3JvdXAuZ2V0KGkgKyAxKTtcbiAgICAgICAgcGFpci5kYXRhW2luZGV4TmFtZV0gPSBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuJHdhdGNoKGFzdC5zZXF1ZW5jZSwgdXBkYXRlLCB7IGluaXQ6IHRydWUgfSk7XG4gIHJldHVybiBncm91cDtcbn1cbi8vIHsjaW5jbHVkZSB9XG53YWxrZXJzLnRlbXBsYXRlID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcbiAgdmFyIGNvbnRlbnQgPSBhc3QuY29udGVudCwgY29tcGlsZWQ7XG4gIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ2lubGN1ZGUnKTtcbiAgdmFyIGNvbXBpbGVkLCBuYW1lc3BhY2UgPSBvcHRpb25zLm5hbWVzcGFjZSwgZXh0cmEgPSBvcHRpb25zLmV4dHJhO1xuICAvLyB2YXIgZnJhZ21lbnQgPSBkb20uZnJhZ21lbnQoKTtcbiAgLy8gZnJhZ21lbnQuYXBwZW5kQ2hpbGQocGxhY2Vob2xkZXIpO1xuICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgZ3JvdXAucHVzaChwbGFjZWhvbGRlcik7XG4gIGlmKGNvbnRlbnQpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLiR3YXRjaChjb250ZW50LCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZiggY29tcGlsZWQgPSBncm91cC5nZXQoMSkpe1xuICAgICAgICBjb21waWxlZC5kZXN0cm95KHRydWUpOyBcbiAgICAgICAgZ3JvdXAuY2hpbGRyZW4ucG9wKCk7XG4gICAgICB9XG4gICAgICBncm91cC5wdXNoKCBjb21waWxlZCA9ICBzZWxmLiRjb21waWxlKHZhbHVlLCB7cmVjb3JkOiB0cnVlLCBvdXRlcjogb3B0aW9ucy5vdXRlcixuYW1lc3BhY2U6IG5hbWVzcGFjZSwgZXh0cmE6IGV4dHJhfSkgKTsgXG4gICAgICBpZihwbGFjZWhvbGRlci5wYXJlbnROb2RlKSBhbmltYXRlLmluamVjdChjb21iaW5lLm5vZGUoY29tcGlsZWQpLCBwbGFjZWhvbGRlciwgJ2JlZm9yZScpXG4gICAgfSwge1xuICAgICAgaW5pdDogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBncm91cDtcbn07XG5cblxuLy8gaG93IHRvIHJlc29sdmUgdGhpcyBwcm9ibGVtXG52YXIgaWkgPSAwO1xud2Fsa2Vyc1snaWYnXSA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XG4gIHZhciBzZWxmID0gdGhpcywgY29uc2VxdWVudCwgYWx0ZXJuYXRlLCBleHRyYSA9IG9wdGlvbnMuZXh0cmE7XG4gIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5lbGVtZW50KXsgLy8gYXR0cmlidXRlIGludGVwbGF0aW9uXG4gICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKG52YWx1ZSl7XG4gICAgICBpZighIW52YWx1ZSl7XG4gICAgICAgIGlmKGFsdGVybmF0ZSkgY29tYmluZS5kZXN0cm95KGFsdGVybmF0ZSlcbiAgICAgICAgaWYoYXN0LmNvbnNlcXVlbnQpIGNvbnNlcXVlbnQgPSBzZWxmLiRjb21waWxlKGFzdC5jb25zZXF1ZW50LCB7cmVjb3JkOiB0cnVlLCBlbGVtZW50OiBvcHRpb25zLmVsZW1lbnQgLCBleHRyYTpleHRyYX0pO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKGNvbnNlcXVlbnQpIGNvbWJpbmUuZGVzdHJveShjb25zZXF1ZW50KVxuICAgICAgICBpZihhc3QuYWx0ZXJuYXRlKSBhbHRlcm5hdGUgPSBzZWxmLiRjb21waWxlKGFzdC5hbHRlcm5hdGUsIHtyZWNvcmQ6IHRydWUsIGVsZW1lbnQ6IG9wdGlvbnMuZWxlbWVudCwgZXh0cmE6IGV4dHJhfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuJHdhdGNoKGFzdC50ZXN0LCB1cGRhdGUsIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGNvbnNlcXVlbnQpIGNvbWJpbmUuZGVzdHJveShjb25zZXF1ZW50KTtcbiAgICAgICAgZWxzZSBpZihhbHRlcm5hdGUpIGNvbWJpbmUuZGVzdHJveShhbHRlcm5hdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciB0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUsIG5vZGU7XG4gIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJSZWd1bGFyIGlmXCIgKyBpaSsrKTtcbiAgdmFyIGdyb3VwID0gbmV3IEdyb3VwKCk7XG4gIGdyb3VwLnB1c2gocGxhY2Vob2xkZXIpO1xuICB2YXIgcHJlVmFsdWUgPSBudWxsLCBuYW1lc3BhY2U9IG9wdGlvbnMubmFtZXNwYWNlO1xuXG5cbiAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIChudmFsdWUsIG9sZCl7XG4gICAgdmFyIHZhbHVlID0gISFudmFsdWU7XG4gICAgaWYodmFsdWUgPT09IHByZVZhbHVlKSByZXR1cm47XG4gICAgcHJlVmFsdWUgPSB2YWx1ZTtcbiAgICBpZihncm91cC5jaGlsZHJlblsxXSl7XG4gICAgICBncm91cC5jaGlsZHJlblsxXS5kZXN0cm95KHRydWUpO1xuICAgICAgZ3JvdXAuY2hpbGRyZW4ucG9wKCk7XG4gICAgfVxuICAgIGlmKHZhbHVlKXsgLy90cnVlXG4gICAgICBpZihhc3QuY29uc2VxdWVudCAmJiBhc3QuY29uc2VxdWVudC5sZW5ndGgpe1xuICAgICAgICBjb25zZXF1ZW50ID0gc2VsZi4kY29tcGlsZSggYXN0LmNvbnNlcXVlbnQgLCB7cmVjb3JkOnRydWUsIG91dGVyOiBvcHRpb25zLm91dGVyLG5hbWVzcGFjZTogbmFtZXNwYWNlLCBleHRyYTpleHRyYSB9KVxuICAgICAgICAvLyBwbGFjZWhvbGRlci5wYXJlbnROb2RlICYmIHBsYWNlaG9sZGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBub2RlLCBwbGFjZWhvbGRlciApO1xuICAgICAgICBncm91cC5wdXNoKGNvbnNlcXVlbnQpO1xuICAgICAgICBpZihwbGFjZWhvbGRlci5wYXJlbnROb2RlKXtcbiAgICAgICAgICBhbmltYXRlLmluamVjdChjb21iaW5lLm5vZGUoY29uc2VxdWVudCksIHBsYWNlaG9sZGVyLCAnYmVmb3JlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ZWxzZXsgLy9mYWxzZVxuICAgICAgaWYoYXN0LmFsdGVybmF0ZSAmJiBhc3QuYWx0ZXJuYXRlLmxlbmd0aCl7XG4gICAgICAgIGFsdGVybmF0ZSA9IHNlbGYuJGNvbXBpbGUoYXN0LmFsdGVybmF0ZSwge3JlY29yZDp0cnVlLCBvdXRlcjogb3B0aW9ucy5vdXRlcixuYW1lc3BhY2U6IG5hbWVzcGFjZSwgZXh0cmE6ZXh0cmF9KTtcbiAgICAgICAgZ3JvdXAucHVzaChhbHRlcm5hdGUpO1xuICAgICAgICBpZihwbGFjZWhvbGRlci5wYXJlbnROb2RlKXtcbiAgICAgICAgICBhbmltYXRlLmluamVjdChjb21iaW5lLm5vZGUoYWx0ZXJuYXRlKSwgcGxhY2Vob2xkZXIsICdiZWZvcmUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB0aGlzLiR3YXRjaChhc3QudGVzdCwgdXBkYXRlLCB7Zm9yY2U6IHRydWUsIGluaXQ6IHRydWV9KTtcblxuICByZXR1cm4gZ3JvdXA7XG59XG5cblxud2Fsa2Vycy5leHByZXNzaW9uID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgdGhpcy4kd2F0Y2goYXN0LCBmdW5jdGlvbihuZXd2YWwpe1xuICAgIGRvbS50ZXh0KG5vZGUsIFwiXCIgKyAobmV3dmFsID09IG51bGw/IFwiXCI6IFwiXCIgKyBuZXd2YWwpICk7XG4gIH0pXG4gIHJldHVybiBub2RlO1xufVxud2Fsa2Vycy50ZXh0ID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShfLmNvbnZlcnRFbnRpdHkoYXN0LnRleHQpKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG52YXIgZXZlbnRSZWcgPSAvXm9uLSguKykkL1xuXG4vKipcbiAqIHdhbGtlcnMgZWxlbWVudCAoY29udGFpbnMgY29tcG9uZW50KVxuICovXG53YWxrZXJzLmVsZW1lbnQgPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xuICB2YXIgYXR0cnMgPSBhc3QuYXR0cnMsIFxuICAgIGNvbXBvbmVudCwgc2VsZiA9IHRoaXMsXG4gICAgQ29uc3RydWN0b3I9dGhpcy5jb25zdHJ1Y3RvcixcbiAgICBjaGlsZHJlbiA9IGFzdC5jaGlsZHJlbixcbiAgICBuYW1lc3BhY2UgPSBvcHRpb25zLm5hbWVzcGFjZSwgcmVmLCBncm91cCwgXG4gICAgZXh0cmEgPSBvcHRpb25zLmV4dHJhLFxuICAgIGlzb2xhdGUgPSAwLFxuICAgIENvbXBvbmVudCA9IENvbnN0cnVjdG9yLmNvbXBvbmVudChhc3QudGFnKTtcblxuXG4gIGlmKGFzdC50YWcgPT09ICdzdmcnKSBuYW1lc3BhY2UgPSBcInN2Z1wiO1xuXG5cblxuXG4gIGlmKENvbXBvbmVudCl7XG4gICAgdmFyIGRhdGEgPSB7fSxldmVudHM7XG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gYXR0cnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX3RvdWNoRXhwcihhdHRyLnZhbHVlIHx8IFwiXCIpO1xuICAgICAgXG4gICAgICB2YXIgbmFtZSA9IGF0dHIubmFtZTtcbiAgICAgIHZhciBldGVzdCA9IG5hbWUubWF0Y2goZXZlbnRSZWcpO1xuICAgICAgLy8gYmluZCBldmVudCBwcm94eVxuICAgICAgaWYoZXRlc3Qpe1xuICAgICAgICBldmVudHMgPSBldmVudHMgfHwge307XG4gICAgICAgIGV2ZW50c1tldGVzdFsxXV0gPSBfLmhhbmRsZUV2ZW50LmNhbGwodGhpcywgdmFsdWUsIGV0ZXN0WzFdKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmKHZhbHVlLnR5cGUgIT09ICdleHByZXNzaW9uJyl7XG4gICAgICAgIGRhdGFbYXR0ci5uYW1lXSA9IHZhbHVlO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGRhdGFbYXR0ci5uYW1lXSA9IHZhbHVlLmdldChzZWxmKTsgXG4gICAgICB9XG4gICAgICBpZiggYXR0ci5uYW1lID09PSAncmVmJyAgJiYgdmFsdWUgIT0gbnVsbCl7XG4gICAgICAgIHJlZiA9IHZhbHVlLnR5cGUgPT09ICdleHByZXNzaW9uJz8gdmFsdWUuZ2V0KHNlbGYpOiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmKCBhdHRyLm5hbWUgPT09ICdpc29sYXRlJyl7XG4gICAgICAgIC8vIDE6IHN0b3A6IGNvbXBvc2l0ZSAtPiBwYXJlbnRcbiAgICAgICAgLy8gMi4gc3RvcDogY29tcG9zaXRlIDwtIHBhcmVudFxuICAgICAgICAvLyAzLiBzdG9wIDEgYW5kIDI6IGNvbXBvc2l0ZSA8LT4gcGFyZW50XG4gICAgICAgIC8vIDAuIHN0b3Agbm90aGluZyAoZGVmdWFsdClcbiAgICAgICAgaXNvbGF0ZSA9IHZhbHVlLnR5cGUgPT09ICdleHByZXNzaW9uJz8gdmFsdWUuZ2V0KHNlbGYpOiBwYXJzZUludCh2YWx1ZSB8fCAzLCAxMCk7XG4gICAgICAgIGRhdGEuaXNvbGF0ZSA9IGlzb2xhdGU7XG4gICAgICB9XG5cblxuICAgIH1cblxuICAgIHZhciBjb25maWcgPSB7IFxuICAgICAgZGF0YTogZGF0YSwgXG4gICAgICBldmVudHM6IGV2ZW50cywgXG4gICAgICAkcGFyZW50OiB0aGlzLFxuICAgICAgJG91dGVyOiBvcHRpb25zLm91dGVyLFxuICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2UsIFxuICAgICAgJHJvb3Q6IHRoaXMuJHJvb3QsXG4gICAgICAkYm9keTogYXN0LmNoaWxkcmVuXG4gICAgfVxuXG4gICAgdmFyIGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQoY29uZmlnKTtcbiAgICBpZihyZWYgJiYgIHNlbGYuJHJlZnMpIHNlbGYuJHJlZnNbcmVmXSA9IGNvbXBvbmVudDtcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBhdHRycy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgICB2YXIgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgdmFyIHZhbHVlID0gYXR0ci52YWx1ZXx8XCJcIjtcbiAgICAgIGlmKHZhbHVlLnR5cGUgPT09ICdleHByZXNzaW9uJyAmJiBhdHRyLm5hbWUuaW5kZXhPZignb24tJyk9PT0tMSl7XG4gICAgICAgIHZhbHVlID0gc2VsZi5fdG91Y2hFeHByKHZhbHVlKTtcbiAgICAgICAgLy8gdXNlIGJpdCBvcGVyYXRlIHRvIGNvbnRyb2wgc2NvcGVcbiAgICAgICAgaWYoICEoaXNvbGF0ZSAmIDIpICkgXG4gICAgICAgICAgdGhpcy4kd2F0Y2godmFsdWUsIGNvbXBvbmVudC4kdXBkYXRlLmJpbmQoY29tcG9uZW50LCBhdHRyLm5hbWUpKVxuICAgICAgICBpZiggdmFsdWUuc2V0ICYmICEoaXNvbGF0ZSAmIDEgKSApIFxuICAgICAgICAgIC8vIHN5bmMgdGhlIGRhdGEuIGl0IGZvcmNlIHRoZSBjb21wb25lbnQgZG9uJ3QgdHJpZ2dlciBhdHRyLm5hbWUncyBmaXJzdCBkaXJ0eSBlY2hlY2tcbiAgICAgICAgICBjb21wb25lbnQuJHdhdGNoKGF0dHIubmFtZSwgc2VsZi4kdXBkYXRlLmJpbmQoc2VsZiwgdmFsdWUpLCB7c3luYzogdHJ1ZX0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihyZWYpe1xuICAgICAgY29tcG9uZW50LiRvbignZGVzdHJveScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKHNlbGYuJHJlZnMpIHNlbGYuJHJlZnNbcmVmXSA9IG51bGw7XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9XG4gIGVsc2UgaWYoIGFzdC50YWcgPT09ICdyLWNvbnRlbnQnICYmIHRoaXMuX2dldFRyYW5zY2x1ZGUgKXtcbiAgICByZXR1cm4gdGhpcy5fZ2V0VHJhbnNjbHVkZSgpO1xuICB9XG4gIFxuICBpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xuICAgIGdyb3VwID0gdGhpcy4kY29tcGlsZShjaGlsZHJlbiwge291dGVyOiBvcHRpb25zLm91dGVyLG5hbWVzcGFjZTogbmFtZXNwYWNlLCBleHRyYTogZXh0cmEgfSk7XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGRvbS5jcmVhdGUoYXN0LnRhZywgbmFtZXNwYWNlLCBhdHRycyk7XG4gIC8vIGNvbnRleHQgZWxlbWVudFxuXG4gIHZhciBjaGlsZDtcblxuICBpZihncm91cCAmJiAhXy5pc1ZvaWRUYWcoYXN0LnRhZykpe1xuICAgIGRvbS5pbmplY3QoIGNvbWJpbmUubm9kZShncm91cCkgLCBlbGVtZW50KVxuICB9XG5cbiAgLy8gc29ydCBiZWZvcmVcbiAgYXR0cnMuc29ydChmdW5jdGlvbihhMSwgYTIpe1xuICAgIHZhciBkMSA9IENvbnN0cnVjdG9yLmRpcmVjdGl2ZShhMS5uYW1lKSxcbiAgICAgIGQyID0gQ29uc3RydWN0b3IuZGlyZWN0aXZlKGEyLm5hbWUpO1xuICAgIGlmKGQxICYmIGQyKSByZXR1cm4gKGQyLnByaW9yaXR5IHx8IDEpIC0gKGQxLnByaW9yaXR5IHx8IDEpO1xuICAgIGlmKGQxKSByZXR1cm4gMTtcbiAgICBpZihkMikgcmV0dXJuIC0xO1xuICAgIGlmKGEyLm5hbWUgPT09IFwidHlwZVwiKSByZXR1cm4gMTtcbiAgICByZXR1cm4gLTE7XG4gIH0pXG4gIC8vIG1heSBkaXN0aW5jdCB3aXRoIGlmIGVsc2VcbiAgdmFyIGRlc3Ryb2llcyA9IHdhbGtBdHRyaWJ1dGVzLmNhbGwodGhpcywgYXR0cnMsIGVsZW1lbnQsIGV4dHJhKTtcblxuXG5cbiAgdmFyIHJlcyAgPSB7XG4gICAgdHlwZTogXCJlbGVtZW50XCIsXG4gICAgZ3JvdXA6IGdyb3VwLFxuICAgIG5vZGU6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9LFxuICAgIGxhc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKGZpcnN0KXtcbiAgICAgIGlmKCBmaXJzdCApe1xuICAgICAgICBhbmltYXRlLnJlbW92ZSggZWxlbWVudCwgZ3JvdXA/IGdyb3VwLmRlc3Ryb3kuYmluZCggZ3JvdXAgKTogXy5ub29wICk7XG4gICAgICB9ZWxzZSBpZihncm91cCkge1xuICAgICAgICBncm91cC5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICAvLyBkZXN0cm95IHJlZlxuICAgICAgaWYoIGRlc3Ryb2llcy5sZW5ndGggKSB7XG4gICAgICAgIGRlc3Ryb2llcy5mb3JFYWNoKGZ1bmN0aW9uKCBkZXN0cm95ICl7XG4gICAgICAgICAgaWYoIGRlc3Ryb3kgKXtcbiAgICAgICAgICAgIGlmKCB0eXBlb2YgZGVzdHJveS5kZXN0cm95ID09PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgICAgIGRlc3Ryb3kuZGVzdHJveSgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gd2Fsa0F0dHJpYnV0ZXMoYXR0cnMsIGVsZW1lbnQsIGV4dHJhKXtcbiAgdmFyIGJpbmRpbmdzID0gW11cbiAgZm9yKHZhciBpID0gMCwgbGVuID0gYXR0cnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIHZhciBiaW5kaW5nID0gdGhpcy5fd2FsayhhdHRyc1tpXSwge2VsZW1lbnQ6IGVsZW1lbnQsIGZyb21FbGVtZW50OiB0cnVlLCBhdHRyczogYXR0cnMsIGV4dHJhOiBleHRyYX0pXG4gICAgaWYoYmluZGluZykgYmluZGluZ3MucHVzaChiaW5kaW5nKTtcbiAgfVxuICByZXR1cm4gYmluZGluZ3M7XG59XG5cbndhbGtlcnMuYXR0cmlidXRlID0gZnVuY3Rpb24oYXN0ICxvcHRpb25zKXtcbiAgdmFyIGF0dHIgPSBhc3Q7XG4gIHZhciBDb21wb25lbnQgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50O1xuICB2YXIgbmFtZSA9IGF0dHIubmFtZSxcbiAgICB2YWx1ZSA9IGF0dHIudmFsdWUgfHwgXCJcIiwgZGlyZWN0aXZlID0gQ29tcG9uZW50LmRpcmVjdGl2ZShuYW1lKTtcblxuICB2YWx1ZSA9IHRoaXMuX3RvdWNoRXhwcih2YWx1ZSk7XG5cblxuICBpZihkaXJlY3RpdmUgJiYgZGlyZWN0aXZlLmxpbmspe1xuICAgIHZhciBiaW5kaW5nID0gZGlyZWN0aXZlLmxpbmsuY2FsbChzZWxmLCBlbGVtZW50LCB2YWx1ZSwgbmFtZSwgb3B0aW9ucy5hdHRycyk7XG4gICAgaWYodHlwZW9mIGJpbmRpbmcgPT09ICdmdW5jdGlvbicpIGJpbmRpbmcgPSB7ZGVzdHJveTogYmluZGluZ307IFxuICAgIHJldHVybiBiaW5kaW5nO1xuICB9ZWxzZXtcbiAgICBpZiggbmFtZSA9PT0gJ3JlZicgICYmIHZhbHVlICE9IG51bGwgJiYgb3B0aW9ucy5mcm9tRWxlbWVudCl7XG4gICAgICB2YXIgcmVmID0gdmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nPyB2YWx1ZS5nZXQoc2VsZik6IHZhbHVlO1xuICAgICAgdmFyIHJlZnMgPSB0aGlzLiRyZWZzO1xuICAgICAgaWYocmVmcyl7XG4gICAgICAgIHJlZnNbcmVmXSA9IGVsZW1lbnRcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmVmc1tyZWZdID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYodmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nICl7XG5cbiAgICAgIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbihudmFsdWUsIG9sZCl7XG4gICAgICAgIGRvbS5hdHRyKGVsZW1lbnQsIG5hbWUsIG52YWx1ZSk7XG4gICAgICB9LCB7aW5pdDogdHJ1ZX0pO1xuICAgIH1lbHNle1xuICAgICAgaWYoXy5pc0Jvb2xlYW5BdHRyKG5hbWUpKXtcbiAgICAgICAgZG9tLmF0dHIoZWxlbWVudCwgbmFtZSwgdHJ1ZSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgZG9tLmF0dHIoZWxlbWVudCwgbmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZighb3B0aW9ucy5mcm9tRWxlbWVudCl7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpe1xuICAgICAgICAgIGRvbS5hdHRyKGVsZW1lbnQsIG5hbWUsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cblxuIiwiLyohXG4gICogUmVxd2VzdCEgQSBnZW5lcmFsIHB1cnBvc2UgWEhSIGNvbm5lY3Rpb24gbWFuYWdlclxuICAqIGxpY2Vuc2UgTUlUIChjKSBEdXN0aW4gRGlheiAyMDE0XG4gICogaHR0cHM6Ly9naXRodWIuY29tL2RlZC9yZXF3ZXN0XG4gICovXG5cbiFmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKClcbn0oJ3JlcXdlc3QnLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHdpbiA9IHdpbmRvd1xuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGh0dHBzUmUgPSAvXmh0dHAvXG4gICAgLCBwcm90b2NvbFJlID0gLyheXFx3Kyk6XFwvXFwvL1xuICAgICwgdHdvSHVuZG8gPSAvXigyMFxcZHwxMjIzKSQvIC8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XG4gICAgLCBieVRhZyA9ICdnZXRFbGVtZW50c0J5VGFnTmFtZSdcbiAgICAsIHJlYWR5U3RhdGUgPSAncmVhZHlTdGF0ZSdcbiAgICAsIGNvbnRlbnRUeXBlID0gJ0NvbnRlbnQtVHlwZSdcbiAgICAsIHJlcXVlc3RlZFdpdGggPSAnWC1SZXF1ZXN0ZWQtV2l0aCdcbiAgICAsIGhlYWQgPSBkb2NbYnlUYWddKCdoZWFkJylbMF1cbiAgICAsIHVuaXFpZCA9IDBcbiAgICAsIGNhbGxiYWNrUHJlZml4ID0gJ3JlcXdlc3RfJyArICgrbmV3IERhdGUoKSlcbiAgICAsIGxhc3RWYWx1ZSAvLyBkYXRhIHN0b3JlZCBieSB0aGUgbW9zdCByZWNlbnQgSlNPTlAgY2FsbGJhY2tcbiAgICAsIHhtbEh0dHBSZXF1ZXN0ID0gJ1hNTEh0dHBSZXF1ZXN0J1xuICAgICwgeERvbWFpblJlcXVlc3QgPSAnWERvbWFpblJlcXVlc3QnXG4gICAgLCBub29wID0gZnVuY3Rpb24gKCkge31cblxuICAgICwgaXNBcnJheSA9IHR5cGVvZiBBcnJheS5pc0FycmF5ID09ICdmdW5jdGlvbidcbiAgICAgICAgPyBBcnJheS5pc0FycmF5XG4gICAgICAgIDogZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICB9XG5cbiAgICAsIGRlZmF1bHRIZWFkZXJzID0ge1xuICAgICAgICAgICdjb250ZW50VHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICwgJ3JlcXVlc3RlZFdpdGgnOiB4bWxIdHRwUmVxdWVzdFxuICAgICAgICAsICdhY2NlcHQnOiB7XG4gICAgICAgICAgICAgICcqJzogICd0ZXh0L2phdmFzY3JpcHQsIHRleHQvaHRtbCwgYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbCwgKi8qJ1xuICAgICAgICAgICAgLCAneG1sJzogICdhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sJ1xuICAgICAgICAgICAgLCAnaHRtbCc6ICd0ZXh0L2h0bWwnXG4gICAgICAgICAgICAsICd0ZXh0JzogJ3RleHQvcGxhaW4nXG4gICAgICAgICAgICAsICdqc29uJzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdCdcbiAgICAgICAgICAgICwgJ2pzJzogICAnYXBwbGljYXRpb24vamF2YXNjcmlwdCwgdGV4dC9qYXZhc2NyaXB0J1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICwgeGhyID0gZnVuY3Rpb24obykge1xuICAgICAgICAvLyBpcyBpdCB4LWRvbWFpblxuICAgICAgICBpZiAob1snY3Jvc3NPcmlnaW4nXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHZhciB4aHIgPSB3aW5beG1sSHR0cFJlcXVlc3RdID8gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgOiBudWxsXG4gICAgICAgICAgaWYgKHhociAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgICAgICAgIHJldHVybiB4aHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHdpblt4RG9tYWluUmVxdWVzdF0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWERvbWFpblJlcXVlc3QoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcy1vcmlnaW4gcmVxdWVzdHMnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh3aW5beG1sSHR0cFJlcXVlc3RdKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAsIGdsb2JhbFNldHVwT3B0aW9ucyA9IHtcbiAgICAgICAgZGF0YUZpbHRlcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgZnVuY3Rpb24gc3VjY2VlZChyKSB7XG4gICAgdmFyIHByb3RvY29sID0gcHJvdG9jb2xSZS5leGVjKHIudXJsKTtcbiAgICBwcm90b2NvbCA9IChwcm90b2NvbCAmJiBwcm90b2NvbFsxXSkgfHwgd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICAgIHJldHVybiBodHRwc1JlLnRlc3QocHJvdG9jb2wpID8gdHdvSHVuZG8udGVzdChyLnJlcXVlc3Quc3RhdHVzKSA6ICEhci5yZXF1ZXN0LnJlc3BvbnNlO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlUmVhZHlTdGF0ZShyLCBzdWNjZXNzLCBlcnJvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyB1c2UgX2Fib3J0ZWQgdG8gbWl0aWdhdGUgYWdhaW5zdCBJRSBlcnIgYzAwYzAyM2ZcbiAgICAgIC8vIChjYW4ndCByZWFkIHByb3BzIG9uIGFib3J0ZWQgcmVxdWVzdCBvYmplY3RzKVxuICAgICAgaWYgKHIuX2Fib3J0ZWQpIHJldHVybiBlcnJvcihyLnJlcXVlc3QpXG4gICAgICBpZiAoci5fdGltZWRPdXQpIHJldHVybiBlcnJvcihyLnJlcXVlc3QsICdSZXF1ZXN0IGlzIGFib3J0ZWQ6IHRpbWVvdXQnKVxuICAgICAgaWYgKHIucmVxdWVzdCAmJiByLnJlcXVlc3RbcmVhZHlTdGF0ZV0gPT0gNCkge1xuICAgICAgICByLnJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gbm9vcFxuICAgICAgICBpZiAoc3VjY2VlZChyKSkgc3VjY2VzcyhyLnJlcXVlc3QpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBlcnJvcihyLnJlcXVlc3QpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SGVhZGVycyhodHRwLCBvKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBvWydoZWFkZXJzJ10gfHwge31cbiAgICAgICwgaFxuXG4gICAgaGVhZGVyc1snQWNjZXB0J10gPSBoZWFkZXJzWydBY2NlcHQnXVxuICAgICAgfHwgZGVmYXVsdEhlYWRlcnNbJ2FjY2VwdCddW29bJ3R5cGUnXV1cbiAgICAgIHx8IGRlZmF1bHRIZWFkZXJzWydhY2NlcHQnXVsnKiddXG5cbiAgICB2YXIgaXNBRm9ybURhdGEgPSB0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgKG9bJ2RhdGEnXSBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbiAgICAvLyBicmVha3MgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzIHdpdGggbGVnYWN5IGJyb3dzZXJzXG4gICAgaWYgKCFvWydjcm9zc09yaWdpbiddICYmICFoZWFkZXJzW3JlcXVlc3RlZFdpdGhdKSBoZWFkZXJzW3JlcXVlc3RlZFdpdGhdID0gZGVmYXVsdEhlYWRlcnNbJ3JlcXVlc3RlZFdpdGgnXVxuICAgIGlmICghaGVhZGVyc1tjb250ZW50VHlwZV0gJiYgIWlzQUZvcm1EYXRhKSBoZWFkZXJzW2NvbnRlbnRUeXBlXSA9IG9bJ2NvbnRlbnRUeXBlJ10gfHwgZGVmYXVsdEhlYWRlcnNbJ2NvbnRlbnRUeXBlJ11cbiAgICBmb3IgKGggaW4gaGVhZGVycylcbiAgICAgIGhlYWRlcnMuaGFzT3duUHJvcGVydHkoaCkgJiYgJ3NldFJlcXVlc3RIZWFkZXInIGluIGh0dHAgJiYgaHR0cC5zZXRSZXF1ZXN0SGVhZGVyKGgsIGhlYWRlcnNbaF0pXG4gIH1cblxuICBmdW5jdGlvbiBzZXRDcmVkZW50aWFscyhodHRwLCBvKSB7XG4gICAgaWYgKHR5cGVvZiBvWyd3aXRoQ3JlZGVudGlhbHMnXSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGh0dHAud2l0aENyZWRlbnRpYWxzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaHR0cC53aXRoQ3JlZGVudGlhbHMgPSAhIW9bJ3dpdGhDcmVkZW50aWFscyddXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhbENhbGxiYWNrKGRhdGEpIHtcbiAgICBsYXN0VmFsdWUgPSBkYXRhXG4gIH1cblxuICBmdW5jdGlvbiB1cmxhcHBlbmQgKHVybCwgcykge1xuICAgIHJldHVybiB1cmwgKyAoL1xcPy8udGVzdCh1cmwpID8gJyYnIDogJz8nKSArIHNcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUpzb25wKG8sIGZuLCBlcnIsIHVybCkge1xuICAgIHZhciByZXFJZCA9IHVuaXFpZCsrXG4gICAgICAsIGNia2V5ID0gb1snanNvbnBDYWxsYmFjayddIHx8ICdjYWxsYmFjaycgLy8gdGhlICdjYWxsYmFjaycga2V5XG4gICAgICAsIGNidmFsID0gb1snanNvbnBDYWxsYmFja05hbWUnXSB8fCByZXF3ZXN0LmdldGNhbGxiYWNrUHJlZml4KHJlcUlkKVxuICAgICAgLCBjYnJlZyA9IG5ldyBSZWdFeHAoJygoXnxcXFxcP3wmKScgKyBjYmtleSArICcpPShbXiZdKyknKVxuICAgICAgLCBtYXRjaCA9IHVybC5tYXRjaChjYnJlZylcbiAgICAgICwgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgICAsIGxvYWRlZCA9IDBcbiAgICAgICwgaXNJRTEwID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdNU0lFIDEwLjAnKSAhPT0gLTFcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgaWYgKG1hdGNoWzNdID09PSAnPycpIHtcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoY2JyZWcsICckMT0nICsgY2J2YWwpIC8vIHdpbGRjYXJkIGNhbGxiYWNrIGZ1bmMgbmFtZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2J2YWwgPSBtYXRjaFszXSAvLyBwcm92aWRlZCBjYWxsYmFjayBmdW5jIG5hbWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gdXJsYXBwZW5kKHVybCwgY2JrZXkgKyAnPScgKyBjYnZhbCkgLy8gbm8gY2FsbGJhY2sgZGV0YWlscywgYWRkICdlbVxuICAgIH1cblxuICAgIHdpbltjYnZhbF0gPSBnZW5lcmFsQ2FsbGJhY2tcblxuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgICBzY3JpcHQuc3JjID0gdXJsXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZVxuICAgIGlmICh0eXBlb2Ygc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSAhPT0gJ3VuZGVmaW5lZCcgJiYgIWlzSUUxMCkge1xuICAgICAgLy8gbmVlZCB0aGlzIGZvciBJRSBkdWUgdG8gb3V0LW9mLW9yZGVyIG9ucmVhZHlzdGF0ZWNoYW5nZSgpLCBiaW5kaW5nIHNjcmlwdFxuICAgICAgLy8gZXhlY3V0aW9uIHRvIGFuIGV2ZW50IGxpc3RlbmVyIGdpdmVzIHVzIGNvbnRyb2wgb3ZlciB3aGVuIHRoZSBzY3JpcHRcbiAgICAgIC8vIGlzIGV4ZWN1dGVkLiBTZWUgaHR0cDovL2phdWJvdXJnLm5ldC8yMDEwLzA3L2xvYWRpbmctc2NyaXB0LWFzLW9uY2xpY2staGFuZGxlci1vZi5odG1sXG4gICAgICBzY3JpcHQuaHRtbEZvciA9IHNjcmlwdC5pZCA9ICdfcmVxd2VzdF8nICsgcmVxSWRcbiAgICB9XG5cbiAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgoc2NyaXB0W3JlYWR5U3RhdGVdICYmIHNjcmlwdFtyZWFkeVN0YXRlXSAhPT0gJ2NvbXBsZXRlJyAmJiBzY3JpcHRbcmVhZHlTdGF0ZV0gIT09ICdsb2FkZWQnKSB8fCBsb2FkZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGxcbiAgICAgIHNjcmlwdC5vbmNsaWNrICYmIHNjcmlwdC5vbmNsaWNrKClcbiAgICAgIC8vIENhbGwgdGhlIHVzZXIgY2FsbGJhY2sgd2l0aCB0aGUgbGFzdCB2YWx1ZSBzdG9yZWQgYW5kIGNsZWFuIHVwIHZhbHVlcyBhbmQgc2NyaXB0cy5cbiAgICAgIGZuKGxhc3RWYWx1ZSlcbiAgICAgIGxhc3RWYWx1ZSA9IHVuZGVmaW5lZFxuICAgICAgaGVhZC5yZW1vdmVDaGlsZChzY3JpcHQpXG4gICAgICBsb2FkZWQgPSAxXG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBzY3JpcHQgdG8gdGhlIERPTSBoZWFkXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpXG5cbiAgICAvLyBFbmFibGUgSlNPTlAgdGltZW91dFxuICAgIHJldHVybiB7XG4gICAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGxcbiAgICAgICAgZXJyKHt9LCAnUmVxdWVzdCBpcyBhYm9ydGVkOiB0aW1lb3V0Jywge30pXG4gICAgICAgIGxhc3RWYWx1ZSA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkLnJlbW92ZUNoaWxkKHNjcmlwdClcbiAgICAgICAgbG9hZGVkID0gMVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJlcXVlc3QoZm4sIGVycikge1xuICAgIHZhciBvID0gdGhpcy5vXG4gICAgICAsIG1ldGhvZCA9IChvWydtZXRob2QnXSB8fCAnR0VUJykudG9VcHBlckNhc2UoKVxuICAgICAgLCB1cmwgPSB0eXBlb2YgbyA9PT0gJ3N0cmluZycgPyBvIDogb1sndXJsJ11cbiAgICAgIC8vIGNvbnZlcnQgbm9uLXN0cmluZyBvYmplY3RzIHRvIHF1ZXJ5LXN0cmluZyBmb3JtIHVubGVzcyBvWydwcm9jZXNzRGF0YSddIGlzIGZhbHNlXG4gICAgICAsIGRhdGEgPSAob1sncHJvY2Vzc0RhdGEnXSAhPT0gZmFsc2UgJiYgb1snZGF0YSddICYmIHR5cGVvZiBvWydkYXRhJ10gIT09ICdzdHJpbmcnKVxuICAgICAgICA/IHJlcXdlc3QudG9RdWVyeVN0cmluZyhvWydkYXRhJ10pXG4gICAgICAgIDogKG9bJ2RhdGEnXSB8fCBudWxsKVxuICAgICAgLCBodHRwXG4gICAgICAsIHNlbmRXYWl0ID0gZmFsc2VcblxuICAgIC8vIGlmIHdlJ3JlIHdvcmtpbmcgb24gYSBHRVQgcmVxdWVzdCBhbmQgd2UgaGF2ZSBkYXRhIHRoZW4gd2Ugc2hvdWxkIGFwcGVuZFxuICAgIC8vIHF1ZXJ5IHN0cmluZyB0byBlbmQgb2YgVVJMIGFuZCBub3QgcG9zdCBkYXRhXG4gICAgaWYgKChvWyd0eXBlJ10gPT0gJ2pzb25wJyB8fCBtZXRob2QgPT0gJ0dFVCcpICYmIGRhdGEpIHtcbiAgICAgIHVybCA9IHVybGFwcGVuZCh1cmwsIGRhdGEpXG4gICAgICBkYXRhID0gbnVsbFxuICAgIH1cblxuICAgIGlmIChvWyd0eXBlJ10gPT0gJ2pzb25wJykgcmV0dXJuIGhhbmRsZUpzb25wKG8sIGZuLCBlcnIsIHVybClcblxuICAgIC8vIGdldCB0aGUgeGhyIGZyb20gdGhlIGZhY3RvcnkgaWYgcGFzc2VkXG4gICAgLy8gaWYgdGhlIGZhY3RvcnkgcmV0dXJucyBudWxsLCBmYWxsLWJhY2sgdG8gb3Vyc1xuICAgIGh0dHAgPSAoby54aHIgJiYgby54aHIobykpIHx8IHhocihvKVxuXG4gICAgaHR0cC5vcGVuKG1ldGhvZCwgdXJsLCBvWydhc3luYyddID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSlcbiAgICBzZXRIZWFkZXJzKGh0dHAsIG8pXG4gICAgc2V0Q3JlZGVudGlhbHMoaHR0cCwgbylcbiAgICBpZiAod2luW3hEb21haW5SZXF1ZXN0XSAmJiBodHRwIGluc3RhbmNlb2Ygd2luW3hEb21haW5SZXF1ZXN0XSkge1xuICAgICAgICBodHRwLm9ubG9hZCA9IGZuXG4gICAgICAgIGh0dHAub25lcnJvciA9IGVyclxuICAgICAgICAvLyBOT1RFOiBzZWVcbiAgICAgICAgLy8gaHR0cDovL3NvY2lhbC5tc2RuLm1pY3Jvc29mdC5jb20vRm9ydW1zL2VuLVVTL2lld2ViZGV2ZWxvcG1lbnQvdGhyZWFkLzMwZWYzYWRkLTc2N2MtNDQzNi1iOGE5LWYxY2ExOWI0ODEyZVxuICAgICAgICBodHRwLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHt9XG4gICAgICAgIHNlbmRXYWl0ID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGhhbmRsZVJlYWR5U3RhdGUodGhpcywgZm4sIGVycilcbiAgICB9XG4gICAgb1snYmVmb3JlJ10gJiYgb1snYmVmb3JlJ10oaHR0cClcbiAgICBpZiAoc2VuZFdhaXQpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBodHRwLnNlbmQoZGF0YSlcbiAgICAgIH0sIDIwMClcbiAgICB9IGVsc2Uge1xuICAgICAgaHR0cC5zZW5kKGRhdGEpXG4gICAgfVxuICAgIHJldHVybiBodHRwXG4gIH1cblxuICBmdW5jdGlvbiBSZXF3ZXN0KG8sIGZuKSB7XG4gICAgdGhpcy5vID0gb1xuICAgIHRoaXMuZm4gPSBmblxuXG4gICAgaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH1cblxuICBmdW5jdGlvbiBzZXRUeXBlKGhlYWRlcikge1xuICAgIC8vIGpzb24sIGphdmFzY3JpcHQsIHRleHQvcGxhaW4sIHRleHQvaHRtbCwgeG1sXG4gICAgaWYgKGhlYWRlci5tYXRjaCgnanNvbicpKSByZXR1cm4gJ2pzb24nXG4gICAgaWYgKGhlYWRlci5tYXRjaCgnamF2YXNjcmlwdCcpKSByZXR1cm4gJ2pzJ1xuICAgIGlmIChoZWFkZXIubWF0Y2goJ3RleHQnKSkgcmV0dXJuICdodG1sJ1xuICAgIGlmIChoZWFkZXIubWF0Y2goJ3htbCcpKSByZXR1cm4gJ3htbCdcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQobywgZm4pIHtcblxuICAgIHRoaXMudXJsID0gdHlwZW9mIG8gPT0gJ3N0cmluZycgPyBvIDogb1sndXJsJ11cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsXG5cbiAgICAvLyB3aGV0aGVyIHJlcXVlc3QgaGFzIGJlZW4gZnVsZmlsbGVkIGZvciBwdXJwb3NlXG4gICAgLy8gb2YgdHJhY2tpbmcgdGhlIFByb21pc2VzXG4gICAgdGhpcy5fZnVsZmlsbGVkID0gZmFsc2VcbiAgICAvLyBzdWNjZXNzIGhhbmRsZXJzXG4gICAgdGhpcy5fc3VjY2Vzc0hhbmRsZXIgPSBmdW5jdGlvbigpe31cbiAgICB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXJzID0gW11cbiAgICAvLyBlcnJvciBoYW5kbGVyc1xuICAgIHRoaXMuX2Vycm9ySGFuZGxlcnMgPSBbXVxuICAgIC8vIGNvbXBsZXRlIChib3RoIHN1Y2Nlc3MgYW5kIGZhaWwpIGhhbmRsZXJzXG4gICAgdGhpcy5fY29tcGxldGVIYW5kbGVycyA9IFtdXG4gICAgdGhpcy5fZXJyZWQgPSBmYWxzZVxuICAgIHRoaXMuX3Jlc3BvbnNlQXJncyA9IHt9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXNcblxuICAgIGZuID0gZm4gfHwgZnVuY3Rpb24gKCkge31cblxuICAgIGlmIChvWyd0aW1lb3V0J10pIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aW1lZE91dCgpXG4gICAgICB9LCBvWyd0aW1lb3V0J10pXG4gICAgfVxuXG4gICAgaWYgKG9bJ3N1Y2Nlc3MnXSkge1xuICAgICAgdGhpcy5fc3VjY2Vzc0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9bJ3N1Y2Nlc3MnXS5hcHBseShvLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9bJ2Vycm9yJ10pIHtcbiAgICAgIHRoaXMuX2Vycm9ySGFuZGxlcnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9bJ2Vycm9yJ10uYXBwbHkobywgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAob1snY29tcGxldGUnXSkge1xuICAgICAgdGhpcy5fY29tcGxldGVIYW5kbGVycy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb1snY29tcGxldGUnXS5hcHBseShvLCBhcmd1bWVudHMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlIChyZXNwKSB7XG4gICAgICBvWyd0aW1lb3V0J10gJiYgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcbiAgICAgIHNlbGYudGltZW91dCA9IG51bGxcbiAgICAgIHdoaWxlIChzZWxmLl9jb21wbGV0ZUhhbmRsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2VsZi5fY29tcGxldGVIYW5kbGVycy5zaGlmdCgpKHJlc3ApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VjY2VzcyAocmVzcCkge1xuICAgICAgdmFyIHR5cGUgPSBvWyd0eXBlJ10gfHwgcmVzcCAmJiBzZXRUeXBlKHJlc3AuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpKSAvLyByZXNwIGNhbiBiZSB1bmRlZmluZWQgaW4gSUVcbiAgICAgIHJlc3AgPSAodHlwZSAhPT0gJ2pzb25wJykgPyBzZWxmLnJlcXVlc3QgOiByZXNwXG4gICAgICAvLyB1c2UgZ2xvYmFsIGRhdGEgZmlsdGVyIG9uIHJlc3BvbnNlIHRleHRcbiAgICAgIHZhciBmaWx0ZXJlZFJlc3BvbnNlID0gZ2xvYmFsU2V0dXBPcHRpb25zLmRhdGFGaWx0ZXIocmVzcC5yZXNwb25zZVRleHQsIHR5cGUpXG4gICAgICAgICwgciA9IGZpbHRlcmVkUmVzcG9uc2VcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3AucmVzcG9uc2VUZXh0ID0gclxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBjYW4ndCBhc3NpZ24gdGhpcyBpbiBJRTw9OCwganVzdCBpZ25vcmVcbiAgICAgIH1cbiAgICAgIGlmIChyKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcCA9IHdpbi5KU09OID8gd2luLkpTT04ucGFyc2UocikgOiBldmFsKCcoJyArIHIgKyAnKScpXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3IocmVzcCwgJ0NvdWxkIG5vdCBwYXJzZSBKU09OIGluIHJlc3BvbnNlJywgZXJyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdqcyc6XG4gICAgICAgICAgcmVzcCA9IGV2YWwocilcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdodG1sJzpcbiAgICAgICAgICByZXNwID0gclxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3htbCc6XG4gICAgICAgICAgcmVzcCA9IHJlc3AucmVzcG9uc2VYTUxcbiAgICAgICAgICAgICAgJiYgcmVzcC5yZXNwb25zZVhNTC5wYXJzZUVycm9yIC8vIElFIHRyb2xvbG9cbiAgICAgICAgICAgICAgJiYgcmVzcC5yZXNwb25zZVhNTC5wYXJzZUVycm9yLmVycm9yQ29kZVxuICAgICAgICAgICAgICAmJiByZXNwLnJlc3BvbnNlWE1MLnBhcnNlRXJyb3IucmVhc29uXG4gICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgIDogcmVzcC5yZXNwb25zZVhNTFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi5fcmVzcG9uc2VBcmdzLnJlc3AgPSByZXNwXG4gICAgICBzZWxmLl9mdWxmaWxsZWQgPSB0cnVlXG4gICAgICBmbihyZXNwKVxuICAgICAgc2VsZi5fc3VjY2Vzc0hhbmRsZXIocmVzcClcbiAgICAgIHdoaWxlIChzZWxmLl9mdWxmaWxsbWVudEhhbmRsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzcCA9IHNlbGYuX2Z1bGZpbGxtZW50SGFuZGxlcnMuc2hpZnQoKShyZXNwKVxuICAgICAgfVxuXG4gICAgICBjb21wbGV0ZShyZXNwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWVkT3V0KCkge1xuICAgICAgc2VsZi5fdGltZWRPdXQgPSB0cnVlXG4gICAgICBzZWxmLnJlcXVlc3QuYWJvcnQoKSAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yKHJlc3AsIG1zZywgdCkge1xuICAgICAgcmVzcCA9IHNlbGYucmVxdWVzdFxuICAgICAgc2VsZi5fcmVzcG9uc2VBcmdzLnJlc3AgPSByZXNwXG4gICAgICBzZWxmLl9yZXNwb25zZUFyZ3MubXNnID0gbXNnXG4gICAgICBzZWxmLl9yZXNwb25zZUFyZ3MudCA9IHRcbiAgICAgIHNlbGYuX2VycmVkID0gdHJ1ZVxuICAgICAgd2hpbGUgKHNlbGYuX2Vycm9ySGFuZGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBzZWxmLl9lcnJvckhhbmRsZXJzLnNoaWZ0KCkocmVzcCwgbXNnLCB0KVxuICAgICAgfVxuICAgICAgY29tcGxldGUocmVzcClcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3QgPSBnZXRSZXF1ZXN0LmNhbGwodGhpcywgc3VjY2VzcywgZXJyb3IpXG4gIH1cblxuICBSZXF3ZXN0LnByb3RvdHlwZSA9IHtcbiAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fYWJvcnRlZCA9IHRydWVcbiAgICAgIHRoaXMucmVxdWVzdC5hYm9ydCgpXG4gICAgfVxuXG4gICwgcmV0cnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGluaXQuY2FsbCh0aGlzLCB0aGlzLm8sIHRoaXMuZm4pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU21hbGwgZGV2aWF0aW9uIGZyb20gdGhlIFByb21pc2VzIEEgQ29tbW9uSnMgc3BlY2lmaWNhdGlvblxuICAgICAqIGh0dHA6Ly93aWtpLmNvbW1vbmpzLm9yZy93aWtpL1Byb21pc2VzL0FcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIGB0aGVuYCB3aWxsIGV4ZWN1dGUgdXBvbiBzdWNjZXNzZnVsIHJlcXVlc3RzXG4gICAgICovXG4gICwgdGhlbjogZnVuY3Rpb24gKHN1Y2Nlc3MsIGZhaWwpIHtcbiAgICAgIHN1Y2Nlc3MgPSBzdWNjZXNzIHx8IGZ1bmN0aW9uICgpIHt9XG4gICAgICBmYWlsID0gZmFpbCB8fCBmdW5jdGlvbiAoKSB7fVxuICAgICAgaWYgKHRoaXMuX2Z1bGZpbGxlZCkge1xuICAgICAgICB0aGlzLl9yZXNwb25zZUFyZ3MucmVzcCA9IHN1Y2Nlc3ModGhpcy5fcmVzcG9uc2VBcmdzLnJlc3ApXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2VycmVkKSB7XG4gICAgICAgIGZhaWwodGhpcy5fcmVzcG9uc2VBcmdzLnJlc3AsIHRoaXMuX3Jlc3BvbnNlQXJncy5tc2csIHRoaXMuX3Jlc3BvbnNlQXJncy50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVycy5wdXNoKHN1Y2Nlc3MpXG4gICAgICAgIHRoaXMuX2Vycm9ySGFuZGxlcnMucHVzaChmYWlsKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBgYWx3YXlzYCB3aWxsIGV4ZWN1dGUgd2hldGhlciB0aGUgcmVxdWVzdCBzdWNjZWVkcyBvciBmYWlsc1xuICAgICAqL1xuICAsIGFsd2F5czogZnVuY3Rpb24gKGZuKSB7XG4gICAgICBpZiAodGhpcy5fZnVsZmlsbGVkIHx8IHRoaXMuX2VycmVkKSB7XG4gICAgICAgIGZuKHRoaXMuX3Jlc3BvbnNlQXJncy5yZXNwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fY29tcGxldGVIYW5kbGVycy5wdXNoKGZuKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBgZmFpbGAgd2lsbCBleGVjdXRlIHdoZW4gdGhlIHJlcXVlc3QgZmFpbHNcbiAgICAgKi9cbiAgLCBmYWlsOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGlmICh0aGlzLl9lcnJlZCkge1xuICAgICAgICBmbih0aGlzLl9yZXNwb25zZUFyZ3MucmVzcCwgdGhpcy5fcmVzcG9uc2VBcmdzLm1zZywgdGhpcy5fcmVzcG9uc2VBcmdzLnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goZm4pXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgLCAnY2F0Y2gnOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiB0aGlzLmZhaWwoZm4pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVxd2VzdChvLCBmbikge1xuICAgIHJldHVybiBuZXcgUmVxd2VzdChvLCBmbilcbiAgfVxuXG4gIC8vIG5vcm1hbGl6ZSBuZXdsaW5lIHZhcmlhbnRzIGFjY29yZGluZyB0byBzcGVjIC0+IENSTEZcbiAgZnVuY3Rpb24gbm9ybWFsaXplKHMpIHtcbiAgICByZXR1cm4gcyA/IHMucmVwbGFjZSgvXFxyP1xcbi9nLCAnXFxyXFxuJykgOiAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gc2VyaWFsKGVsLCBjYikge1xuICAgIHZhciBuID0gZWwubmFtZVxuICAgICAgLCB0ID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIG9wdENiID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAvLyBJRSBnaXZlcyB2YWx1ZT1cIlwiIGV2ZW4gd2hlcmUgdGhlcmUgaXMgbm8gdmFsdWUgYXR0cmlidXRlXG4gICAgICAgICAgLy8gJ3NwZWNpZmllZCcgcmVmOiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1Db3JlL2NvcmUuaHRtbCNJRC04NjI1MjkyNzNcbiAgICAgICAgICBpZiAobyAmJiAhb1snZGlzYWJsZWQnXSlcbiAgICAgICAgICAgIGNiKG4sIG5vcm1hbGl6ZShvWydhdHRyaWJ1dGVzJ11bJ3ZhbHVlJ10gJiYgb1snYXR0cmlidXRlcyddWyd2YWx1ZSddWydzcGVjaWZpZWQnXSA/IG9bJ3ZhbHVlJ10gOiBvWyd0ZXh0J10pKVxuICAgICAgICB9XG4gICAgICAsIGNoLCByYSwgdmFsLCBpXG5cbiAgICAvLyBkb24ndCBzZXJpYWxpemUgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWJsZWQgb3Igd2l0aG91dCBhIG5hbWVcbiAgICBpZiAoZWwuZGlzYWJsZWQgfHwgIW4pIHJldHVyblxuXG4gICAgc3dpdGNoICh0KSB7XG4gICAgY2FzZSAnaW5wdXQnOlxuICAgICAgaWYgKCEvcmVzZXR8YnV0dG9ufGltYWdlfGZpbGUvaS50ZXN0KGVsLnR5cGUpKSB7XG4gICAgICAgIGNoID0gL2NoZWNrYm94L2kudGVzdChlbC50eXBlKVxuICAgICAgICByYSA9IC9yYWRpby9pLnRlc3QoZWwudHlwZSlcbiAgICAgICAgdmFsID0gZWwudmFsdWVcbiAgICAgICAgLy8gV2ViS2l0IGdpdmVzIHVzIFwiXCIgaW5zdGVhZCBvZiBcIm9uXCIgaWYgYSBjaGVja2JveCBoYXMgbm8gdmFsdWUsIHNvIGNvcnJlY3QgaXQgaGVyZVxuICAgICAgICA7KCEoY2ggfHwgcmEpIHx8IGVsLmNoZWNrZWQpICYmIGNiKG4sIG5vcm1hbGl6ZShjaCAmJiB2YWwgPT09ICcnID8gJ29uJyA6IHZhbCkpXG4gICAgICB9XG4gICAgICBicmVha1xuICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgIGNiKG4sIG5vcm1hbGl6ZShlbC52YWx1ZSkpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICBpZiAoZWwudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0LW9uZScpIHtcbiAgICAgICAgb3B0Q2IoZWwuc2VsZWN0ZWRJbmRleCA+PSAwID8gZWwub3B0aW9uc1tlbC5zZWxlY3RlZEluZGV4XSA6IG51bGwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSAwOyBlbC5sZW5ndGggJiYgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZWwub3B0aW9uc1tpXS5zZWxlY3RlZCAmJiBvcHRDYihlbC5vcHRpb25zW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIGNvbGxlY3QgdXAgYWxsIGZvcm0gZWxlbWVudHMgZm91bmQgZnJvbSB0aGUgcGFzc2VkIGFyZ3VtZW50IGVsZW1lbnRzIGFsbFxuICAvLyB0aGUgd2F5IGRvd24gdG8gY2hpbGQgZWxlbWVudHM7IHBhc3MgYSAnPGZvcm0+JyBvciBmb3JtIGZpZWxkcy5cbiAgLy8gY2FsbGVkIHdpdGggJ3RoaXMnPWNhbGxiYWNrIHRvIHVzZSBmb3Igc2VyaWFsKCkgb24gZWFjaCBlbGVtZW50XG4gIGZ1bmN0aW9uIGVhY2hGb3JtRWxlbWVudCgpIHtcbiAgICB2YXIgY2IgPSB0aGlzXG4gICAgICAsIGUsIGlcbiAgICAgICwgc2VyaWFsaXplU3VidGFncyA9IGZ1bmN0aW9uIChlLCB0YWdzKSB7XG4gICAgICAgICAgdmFyIGksIGosIGZhXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZhID0gZVtieVRhZ10odGFnc1tpXSlcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBmYS5sZW5ndGg7IGorKykgc2VyaWFsKGZhW2pdLCBjYilcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGUgPSBhcmd1bWVudHNbaV1cbiAgICAgIGlmICgvaW5wdXR8c2VsZWN0fHRleHRhcmVhL2kudGVzdChlLnRhZ05hbWUpKSBzZXJpYWwoZSwgY2IpXG4gICAgICBzZXJpYWxpemVTdWJ0YWdzKGUsIFsgJ2lucHV0JywgJ3NlbGVjdCcsICd0ZXh0YXJlYScgXSlcbiAgICB9XG4gIH1cblxuICAvLyBzdGFuZGFyZCBxdWVyeSBzdHJpbmcgc3R5bGUgc2VyaWFsaXphdGlvblxuICBmdW5jdGlvbiBzZXJpYWxpemVRdWVyeVN0cmluZygpIHtcbiAgICByZXR1cm4gcmVxd2VzdC50b1F1ZXJ5U3RyaW5nKHJlcXdlc3Quc2VyaWFsaXplQXJyYXkuYXBwbHkobnVsbCwgYXJndW1lbnRzKSlcbiAgfVxuXG4gIC8vIHsgJ25hbWUnOiAndmFsdWUnLCAuLi4gfSBzdHlsZSBzZXJpYWxpemF0aW9uXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZUhhc2goKSB7XG4gICAgdmFyIGhhc2ggPSB7fVxuICAgIGVhY2hGb3JtRWxlbWVudC5hcHBseShmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChuYW1lIGluIGhhc2gpIHtcbiAgICAgICAgaGFzaFtuYW1lXSAmJiAhaXNBcnJheShoYXNoW25hbWVdKSAmJiAoaGFzaFtuYW1lXSA9IFtoYXNoW25hbWVdXSlcbiAgICAgICAgaGFzaFtuYW1lXS5wdXNoKHZhbHVlKVxuICAgICAgfSBlbHNlIGhhc2hbbmFtZV0gPSB2YWx1ZVxuICAgIH0sIGFyZ3VtZW50cylcbiAgICByZXR1cm4gaGFzaFxuICB9XG5cbiAgLy8gWyB7IG5hbWU6ICduYW1lJywgdmFsdWU6ICd2YWx1ZScgfSwgLi4uIF0gc3R5bGUgc2VyaWFsaXphdGlvblxuICByZXF3ZXN0LnNlcmlhbGl6ZUFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnIgPSBbXVxuICAgIGVhY2hGb3JtRWxlbWVudC5hcHBseShmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgIGFyci5wdXNoKHtuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWV9KVxuICAgIH0sIGFyZ3VtZW50cylcbiAgICByZXR1cm4gYXJyXG4gIH1cblxuICByZXF3ZXN0LnNlcmlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gICAgdmFyIG9wdCwgZm5cbiAgICAgICwgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcblxuICAgIG9wdCA9IGFyZ3MucG9wKClcbiAgICBvcHQgJiYgb3B0Lm5vZGVUeXBlICYmIGFyZ3MucHVzaChvcHQpICYmIChvcHQgPSBudWxsKVxuICAgIG9wdCAmJiAob3B0ID0gb3B0LnR5cGUpXG5cbiAgICBpZiAob3B0ID09ICdtYXAnKSBmbiA9IHNlcmlhbGl6ZUhhc2hcbiAgICBlbHNlIGlmIChvcHQgPT0gJ2FycmF5JykgZm4gPSByZXF3ZXN0LnNlcmlhbGl6ZUFycmF5XG4gICAgZWxzZSBmbiA9IHNlcmlhbGl6ZVF1ZXJ5U3RyaW5nXG5cbiAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJncylcbiAgfVxuXG4gIHJlcXdlc3QudG9RdWVyeVN0cmluZyA9IGZ1bmN0aW9uIChvLCB0cmFkKSB7XG4gICAgdmFyIHByZWZpeCwgaVxuICAgICAgLCB0cmFkaXRpb25hbCA9IHRyYWQgfHwgZmFsc2VcbiAgICAgICwgcyA9IFtdXG4gICAgICAsIGVuYyA9IGVuY29kZVVSSUNvbXBvbmVudFxuICAgICAgLCBhZGQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgIC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxuICAgICAgICAgIHZhbHVlID0gKCdmdW5jdGlvbicgPT09IHR5cGVvZiB2YWx1ZSkgPyB2YWx1ZSgpIDogKHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlKVxuICAgICAgICAgIHNbcy5sZW5ndGhdID0gZW5jKGtleSkgKyAnPScgKyBlbmModmFsdWUpXG4gICAgICAgIH1cbiAgICAvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuICAgIGlmIChpc0FycmF5KG8pKSB7XG4gICAgICBmb3IgKGkgPSAwOyBvICYmIGkgPCBvLmxlbmd0aDsgaSsrKSBhZGQob1tpXVsnbmFtZSddLCBvW2ldWyd2YWx1ZSddKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuICAgICAgLy8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG4gICAgICBmb3IgKHByZWZpeCBpbiBvKSB7XG4gICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KHByZWZpeCkpIGJ1aWxkUGFyYW1zKHByZWZpeCwgb1twcmVmaXhdLCB0cmFkaXRpb25hbCwgYWRkKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNwYWNlcyBzaG91bGQgYmUgKyBhY2NvcmRpbmcgdG8gc3BlY1xuICAgIHJldHVybiBzLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywgJysnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRQYXJhbXMocHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQpIHtcbiAgICB2YXIgbmFtZSwgaSwgdlxuICAgICAgLCByYnJhY2tldCA9IC9cXFtcXF0kL1xuXG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgLy8gU2VyaWFsaXplIGFycmF5IGl0ZW0uXG4gICAgICBmb3IgKGkgPSAwOyBvYmogJiYgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICB2ID0gb2JqW2ldXG4gICAgICAgIGlmICh0cmFkaXRpb25hbCB8fCByYnJhY2tldC50ZXN0KHByZWZpeCkpIHtcbiAgICAgICAgICAvLyBUcmVhdCBlYWNoIGFycmF5IGl0ZW0gYXMgYSBzY2FsYXIuXG4gICAgICAgICAgYWRkKHByZWZpeCwgdilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyAnWycgKyAodHlwZW9mIHYgPT09ICdvYmplY3QnID8gaSA6ICcnKSArICddJywgdiwgdHJhZGl0aW9uYWwsIGFkZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2JqICYmIG9iai50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgLy8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxuICAgICAgZm9yIChuYW1lIGluIG9iaikge1xuICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyAnWycgKyBuYW1lICsgJ10nLCBvYmpbbmFtZV0sIHRyYWRpdGlvbmFsLCBhZGQpXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuICAgICAgYWRkKHByZWZpeCwgb2JqKVxuICAgIH1cbiAgfVxuXG4gIHJlcXdlc3QuZ2V0Y2FsbGJhY2tQcmVmaXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrUHJlZml4XG4gIH1cblxuICAvLyBqUXVlcnkgYW5kIFplcHRvIGNvbXBhdGliaWxpdHksIGRpZmZlcmVuY2VzIGNhbiBiZSByZW1hcHBlZCBoZXJlIHNvIHlvdSBjYW4gY2FsbFxuICAvLyAuYWpheC5jb21wYXQob3B0aW9ucywgY2FsbGJhY2spXG4gIHJlcXdlc3QuY29tcGF0ID0gZnVuY3Rpb24gKG8sIGZuKSB7XG4gICAgaWYgKG8pIHtcbiAgICAgIG9bJ3R5cGUnXSAmJiAob1snbWV0aG9kJ10gPSBvWyd0eXBlJ10pICYmIGRlbGV0ZSBvWyd0eXBlJ11cbiAgICAgIG9bJ2RhdGFUeXBlJ10gJiYgKG9bJ3R5cGUnXSA9IG9bJ2RhdGFUeXBlJ10pXG4gICAgICBvWydqc29ucENhbGxiYWNrJ10gJiYgKG9bJ2pzb25wQ2FsbGJhY2tOYW1lJ10gPSBvWydqc29ucENhbGxiYWNrJ10pICYmIGRlbGV0ZSBvWydqc29ucENhbGxiYWNrJ11cbiAgICAgIG9bJ2pzb25wJ10gJiYgKG9bJ2pzb25wQ2FsbGJhY2snXSA9IG9bJ2pzb25wJ10pXG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVxd2VzdChvLCBmbilcbiAgfVxuXG4gIHJlcXdlc3QuYWpheFNldHVwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIGZvciAodmFyIGsgaW4gb3B0aW9ucykge1xuICAgICAgZ2xvYmFsU2V0dXBPcHRpb25zW2tdID0gb3B0aW9uc1trXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXF3ZXN0XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ3VsYXIgPSByZXF1aXJlKFwicmVndWxhcmpzXCIpO1xudmFyIGZpbHRlciA9IHJlcXVpcmUoXCIuL2ZpbHRlci5qc1wiKTtcblxudmFyIGRvbSA9IFJlZ3VsYXIuZG9tOyBcblxudmFyIENvbXBvbmVudCA9IFJlZ3VsYXIuZXh0ZW5kKHtcblx0Ly8gcmVxdWVzdFxuXHQkcmVxdWVzdDogZnVuY3Rpb24oKXt9XG59KVxuLmZpbHRlcihmaWx0ZXIpXG4uZGlyZWN0aXZlKHtcblx0Ly8gaWYgZXhwcmVzc2lvbiBldmFsdWF0ZWQgdG8gdHJ1ZSB0aGVuIGFkZENsYXNzIHotY3J0LlxuXHQvLyBvdGhlcndpc2UsIHJlbW92ZSBpdFxuXHQvLyA8bGkgei1jcnQ9e3RoaXMuJHN0YXRlLmN1cnJlbnQubmFtZT09PSdhcHAudGVzdC5leGFtLmNob2ljZSd9PlxuXHRcInotY3J0XCI6IGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcblx0dGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKHZhbCl7XG5cdFx0ZG9tW3ZhbD8gJ2FkZENsYXNzJzogJ2RlbENsYXNzJ10oZWxlbSwgJ3otY3J0Jyk7XG5cdH0pXG5cdH0sXG5cdFwicS1yZW5kZXJcIjogZnVuY3Rpb24oZWxlbSwgdmFsdWUpe1xuXHR0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24odmFsKXtcblx0XHRpZih2YWwpIGVsZW0uaW5uZXJIVE1MID0gcXMucmVuZGVyKHZhbClcblx0fSlcblx0fVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmlsdGVyID0ge307XG5cbmZpbHRlci5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBmaXgoc3RyKSB7XG4gICAgICAgIHN0ciA9ICcnICsgKFN0cmluZyhzdHIpIHx8ICcnKTtcbiAgICAgICAgcmV0dXJuIHN0ci5sZW5ndGggPD0gMT8gJzAnICsgc3RyIDogc3RyO1xuICAgIH1cbiAgICB2YXIgbWFwcyA9IHtcbiAgICAgICAgJ3l5eXknOiBmdW5jdGlvbihkYXRlKXtyZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpfSxcbiAgICAgICAgJ01NJzogZnVuY3Rpb24oZGF0ZSl7cmV0dXJuIGZpeChkYXRlLmdldE1vbnRoKCkgKyAxKTsgfSxcbiAgICAgICAgJ2RkJzogZnVuY3Rpb24oZGF0ZSl7IHJldHVybiBmaXgoZGF0ZS5nZXREYXRlKCkpIH0sXG4gICAgICAgICdISCc6IGZ1bmN0aW9uKGRhdGUpe3JldHVybiBmaXgoZGF0ZS5nZXRIb3VycygpKSB9LFxuICAgICAgICAnbW0nOiBmdW5jdGlvbihkYXRlKXsgcmV0dXJuIGZpeChkYXRlLmdldE1pbnV0ZXMoKSl9LFxuICAgICAgICAnc3MnOiBmdW5jdGlvbihkYXRlKXsgcmV0dXJuIGZpeChkYXRlLmdldFNlY29uZHMoKSl9XG4gICAgfVxuXG4gICAgdmFyIHRydW5rID0gbmV3IFJlZ0V4cChPYmplY3Qua2V5cyhtYXBzKS5qb2luKCd8JyksJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGZvcm1hdCl7XG4gICAgICAgIGlmKCF2YWx1ZSl7cmV0dXJuICcnO31cbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkIEhIOm1tJztcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdC5yZXBsYWNlKHRydW5rLCBmdW5jdGlvbihjYXB0dXJlKXtcbiAgICAgICAgICAgIHJldHVybiBtYXBzW2NhcHR1cmVdPyBtYXBzW2NhcHR1cmVdKHZhbHVlKTogJyc7XG4gICAgICAgIH0pO1xuICAgIH1cbn0oKTtcblxuZmlsdGVyLmF2ZXJhZ2UgPSBmdW5jdGlvbihhcnJheSwga2V5KSB7XG4gICAgYXJyYXkgPSBhcnJheSB8fCBbXTtcbiAgICByZXR1cm4gYXJyYXkubGVuZ3RoPyBmaWx0ZXIudG90YWwoYXJyYXksIGtleSkgLyBhcnJheS5sZW5ndGggOiAwO1xufVxuZmlsdGVyLnRvdGFsID0gZnVuY3Rpb24oYXJyYXksIGtleSkge1xuICAgIHZhciB0b3RhbCA9IDA7XG4gICAgaWYoIWFycmF5KSByZXR1cm47XG4gICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApe1xuICAgICAgICB0b3RhbCArPSBrZXk/IGl0ZW1ba2V5XSA6IGl0ZW07XG4gICAgfSlcbiAgICByZXR1cm4gdG90YWw7XG59XG5cbmZpbHRlci5maWx0ZXIgPSBmdW5jdGlvbihhcnJheSwgZmlsdGVyRm4pIHtcbiAgICBpZighYXJyYXkgfHwgIWFycmF5Lmxlbmd0aCkgcmV0dXJuO1xuICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kZXgpe1xuICAgICAgICByZXR1cm4gZmlsdGVyRm4oaXRlbSwgaW5kZXgpO1xuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmlsdGVyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcXdlc3QgPSByZXF1aXJlKCdyZXF3ZXN0Jyk7XG52YXIgcmVxdWVzdCA9IHt9O1xuLy92YXIgUHJvZ3Jlc3MgPSByZXF1aXJlKCcuLi9jb21wb25lbnQvcHJvZ3Jlc3MvcHJvZ3Jlc3MucmdsYycpO1xuLy92YXIgcHJvZ3Jlc3MgPSBuZXcgUHJvZ3Jlc3MoKTtcbnJlcXVlc3QucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdCkge1xuICB2YXIgbm9vcCA9IGZ1bmN0aW9uKCl7fTtcbiAgdmFyIG9sZGVycm9yID0gb3B0LmVycm9yIHx8IG5vb3AsXG4gICAgICBvbGRzdWNjZXNzID0gb3B0LnN1Y2Nlc3MgfHwgbm9vcDtcblxuICBpZihvcHQubWV0aG9kICYmIG9wdC5tZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ3Bvc3QnKXtcbiAgICBvcHQuY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24vanNvbidcbiAgfVxuXG4gIGlmKG9wdC5jb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nIHx8IG9wdC5oZWFkZXJzICYmIG9wdC5oZWFkZXJzLmNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICBvcHQuZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9wdC5kYXRhKTtcbiAgfVxuICBpZighb3B0Lm1ldGhvZCB8fCBvcHQubWV0aG9kID09PSAnZ2V0Jykge1xuICAgIGlmKG9wdC5kYXRhKSBvcHQuZGF0YS50aW1lc3RhbXAgPSArbmV3IERhdGU7XG4gICAgZWxzZSBvcHQuZGF0YSA9IHt0aW1lc3RhbXA6ICtuZXcgRGF0ZX1cbiAgfVxuICAvL29wdC5wcm9ncmVzcyAmJiBwcm9ncmVzcy5zdGFydCgpO1xuICBvcHQuc3VjY2VzcyA9IGZ1bmN0aW9uKGpzb24pIHtcbiAgICAvL29wdC5wcm9ncmVzcyAmJiBwcm9ncmVzcy5lbmQoKTtcbiAgICBvbGRzdWNjZXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgLy9yb3V0ZXIuZ28oJ2FwcC5mb3JiaWRkZW4nKTtcbiAgfVxuICBvcHQuZXJyb3IgPSBmdW5jdGlvbihqc29uKSB7XG4gICAgLy9vcHQucHJvZ3Jlc3MgJiYgcHJvZ3Jlc3MuZW5kKHRydWUpO1xuICAgIG9sZGVycm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgcmVxd2VzdChvcHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQuanMnKTtcbnZhciBfID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFNvdXJjZUNvbXBvbmVudFxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBTb3VyY2VDb21wb25lbnQgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBzZXJ2aWNlOiBudWxsLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy5kYXRhLnNlcnZpY2UpXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgPSB0aGlzLmRhdGEuc2VydmljZTtcblxuICAgICAgICBpZih0aGlzLnNlcnZpY2UpXG4gICAgICAgICAgICB0aGlzLiR1cGRhdGVTb3VyY2UoKTtcblxuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgZ2V0UGFyYW1zIOi/lOWbnuivt+axguaXtumcgOimgeeahOWPguaVsFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICovXG4gICAgZ2V0UGFyYW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCAkdXBkYXRlU291cmNlIOS7jnNlcnZpY2XkuK3mm7TmlrDmlbDmja7mupBcbiAgICAgKiBAcHVibGljXG4gICAgICogQHJldHVybiB7U291cmNlQ29tcG9uZW50fSB0aGlzXG4gICAgICovXG4gICAgJHVwZGF0ZVNvdXJjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRMaXN0KHRoaXMuZ2V0UGFyYW1zKCksIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEuY29kZSAhPSAyMDAgJiYgIWRhdGEuc3VjY2VzcylcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQoZGF0YS5yZXN1bHQpO1xuXG4gICAgICAgICAgICB0aGlzLiR1cGRhdGUoJ3NvdXJjZScsIGRhdGEucmVzdWx0KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU291cmNlQ29tcG9uZW50OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ3VsYXIgPSByZXF1aXJlKCdyZWd1bGFyanMnKTtcblxudmFyIF8gPSB7XG4gICAgZXh0ZW5kOiBmdW5jdGlvbihvMSwgbzIsIG92ZXJyaWRlKSB7XG4gICAgICAgIGZvcih2YXIgaSBpbiBvMilcbiAgICAgICAgICAgIGlmKG92ZXJyaWRlIHx8IG8xW2ldID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgbzFbaV0gPSBvMltpXVxuICAgICAgICByZXR1cm4gbzE7XG4gICAgfSxcbiAgICBkb206IFJlZ3VsYXIuZG9tLFxuICAgIG11bHRpbGluZTogZnVuY3Rpb24oZnVuYykge1xuICAgICAgICB2YXIgcmVnID0gL15mdW5jdGlvblxccypcXChcXClcXHMqXFx7XFxzKlxcL1xcKitcXHMqKFtcXHNcXFNdKilcXHMqXFwqK1xcL1xccypcXH0kLztcbiAgICAgICAgcmV0dXJuIHJlZy5leGVjKGZ1bmMpWzFdO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfOyIsIm1vZHVsZS5leHBvcnRzPVwiXCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRWRpdG9yICAgIOe8lui+keWZqFxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2VkaXRvci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBFZGl0b3JcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNvbnRlbnQgICAgICAgICAgICDlr7nor53moYblhoXlrrlcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49dHJ1ZX0gICAgIG9wdGlvbnMuZGF0YS5va0J1dHRvbiAgICAgICAgICAg5piv5ZCm5pi+56S656Gu5a6a5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49ZmFsc2V9ICAgIG9wdGlvbnMuZGF0YS5jYW5jZWxCdXR0b24gICAgICAg5piv5ZCm5pi+56S65Y+W5raI5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7bnVtYmVyPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS53aWR0aCAgICAgICAgICAgICAg5a+56K+d5qGG5a695bqm44CC5YC85Li65ZCm5a6a5pe25a695bqm5Li6Q1NT6K6+572u55qE5a695bqm44CCXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSAgICAgICAgICAgICAgICBvcHRpb25zLm9rICAgICAgICAgICAgICAgICAgICAgIOW9k+eCueWHu+ehruWumueahOaXtuWAmeaJp+ihjFxuICogQHBhcmFtIHtmdW5jdGlvbn0gICAgICAgICAgICAgICAgb3B0aW9ucy5jYW5jZWwgICAgICAgICAgICAgICAgICDlvZPngrnlh7vlj5bmtojnmoTml7blgJnmiafooYxcbiAqL1xudmFyIEVkaXRvciA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdtb2RhbCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgb2tCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgd2lkdGg6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICAgICAgLy8g6K+B5piO5LiN5piv5YaF5bWM57uE5Lu2XG4gICAgICAgIGlmKHRoaXMuJHJvb3QgPT09IHRoaXMpXG4gICAgICAgICAgICB0aGlzLiRpbmplY3QoZG9jdW1lbnQuYm9keSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb3NlKHJlc3VsdCkg5YWz6Zet5qih5oCB5a+56K+d5qGGXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IHJlc3VsdCDngrnlh7vnoa7lrprov5jmmK/lj5bmtohcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIGNsb3NlOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjbG9zZSDlhbPpl63lr7nor53moYbml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSByZXN1bHQg54K55Ye75LqG56Gu5a6a6L+Y5piv5Y+W5raIXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIHtcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPyB0aGlzLm9rKCkgOiB0aGlzLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIG9rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBvayDnoa7lrprlr7nor53moYbml7bop6blj5FcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ29rJyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNsb3NlIOWPlua2iOWvueivneahhuaXtuinpuWPkVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJyk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yO1xuIiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLWVkaXRvclxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImVkaXRvcl9wcmV2aWV3XFxcIiByLWh0bWw9e3RoaXMuZ2V0SFRNTCgpfT48L2Rpdj4gICAgPHVsIGNsYXNzPVxcXCJtLXRvb2xiYXJcXFwiPiAgICAgICAgPGxpPjxhIHRpdGxlPVxcXCLliqDnspdcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWJvbGRcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5pac5L2TXFxcIj48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1pdGFsaWNcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaSBjbGFzcz1cXFwic2VwZXJhdG9yXFxcIj48L2xpPiAgICAgICAgPGxpPjxhIHRpdGxlPVxcXCLlvJXnlKhcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLXF1b3RlXFxcIj48L2k+PC9hPjwvbGk+ICAgICAgICA8bGk+PGEgdGl0bGU9XFxcIuaXoOW6j+WIl+ihqFxcXCI+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tbGlzdC11bFxcXCI+PC9pPjwvYT48L2xpPiAgICAgICAgPGxpPjxhIHRpdGxlPVxcXCLmnInluo/liJfooahcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWxpc3Qtb2xcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaSBjbGFzcz1cXFwic2VwZXJhdG9yXFxcIj48L2xpPiAgICAgICAgPGxpPjxhIHRpdGxlPVxcXCLpk77mjqVcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWxpbmtcXFwiPjwvaT48L2E+PC9saT4gICAgICAgIDxsaT48YSB0aXRsZT1cXFwi5Zu+54mHXFxcIj48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1pbWFnZVxcXCI+PC9pPjwvYT48L2xpPiAgICAgICAgPGxpPjxhIHRpdGxlPVxcXCLlhazlvI9cXFwiPuKIkTwvYT48L2xpPiAgICA8L3VsPiAgICA8dGV4dGFyZWEgY2xhc3M9XFxcImVkaXRvcl90ZXh0YXJlYVxcXCIgci1tb2RlbD17Y29udGVudH0+PC90ZXh0YXJlYT48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNYXJrRWRpdG9yIOe8lui+keWZqFxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21hcmtFZGl0b3IuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxudmFyIG1hcmtlZCA9IHJlcXVpcmUoJ21hcmtlZCcpO1xuXG4vKipcbiAqIEBjbGFzcyBNYXJrRWRpdG9yXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKcgfCBCaW5kaW5nIFByb3BlcnRpZXNcbiAqIEBwYXJhbSB7c3RyaW5nPSfmj5DnpLonfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnRpdGxlICAgICAgICAgICAgICDlr7nor53moYbmoIfpopggfCBUaXRsZSBvZiBEaWFsb2dcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jb250ZW50ICAgICAgICAgICAg57yW6L6R5Zmo5YaF5a65XG4gKiBAcGFyYW0ge3N0cmluZ3xib29sZWFuPXRydWV9ICAgICBvcHRpb25zLmRhdGEub2tCdXR0b24gICAgICAgICAgIOaYr+WQpuaYvuekuuehruWumuaMiemSruOAguWAvOS4umBzdHJpbmdg5pe25pi+56S66K+l5q615paH5a2X44CCXG4gKiBAcGFyYW0ge3N0cmluZ3xib29sZWFuPWZhbHNlfSAgICBvcHRpb25zLmRhdGEuY2FuY2VsQnV0dG9uICAgICAgIOaYr+WQpuaYvuekuuWPlua2iOaMiemSruOAguWAvOS4umBzdHJpbmdg5pe25pi+56S66K+l5q615paH5a2X44CCXG4gKiBAcGFyYW0ge251bWJlcj1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEud2lkdGggICAgICAgICAgICAgIOWvueivneahhuWuveW6puOAguWAvOS4uuWQpuWumuaXtuWuveW6puS4ukNTU+iuvue9rueahOWuveW6puOAglxuICogQHBhcmFtIHtmdW5jdGlvbn0gICAgICAgICAgICAgICAgb3B0aW9ucy5vayAgICAgICAgICAgICAgICAgICAgICDlvZPngrnlh7vnoa7lrprnmoTml7blgJnmiafooYxcbiAqIEBwYXJhbSB7ZnVuY3Rpb259ICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FuY2VsICAgICAgICAgICAgICAgICAg5b2T54K55Ye75Y+W5raI55qE5pe25YCZ5omn6KGMXG4gKi9cbnZhciBNYXJrRWRpdG9yID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ21hcmtFZGl0b3InLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBjb250ZW50OiAnJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICBnZXRIVE1MOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtlZCh0aGlzLmRhdGEuY29udGVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICAvLyBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgdGhpcy5zdXByKCk7XG4gICAgLy8gfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya0VkaXRvcjtcbiIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwibS1tb2RhbCB7QChjbGFzcyl9XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwibW9kYWxfZGlhbG9nXFxcIiB7I2lmIHdpZHRofXN0eWxlPVxcXCJ3aWR0aDoge3dpZHRofXB4XFxcInsvaWZ9PiAgICAgICAgPGRpdiBjbGFzcz1cXFwibW9kYWxfaGRcXFwiPiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJtb2RhbF9jbG9zZVxcXCIgb24tY2xpY2s9e3RoaXMuY2xvc2UoIWNhbmNlbEJ1dHRvbil9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNsb3NlXFxcIj48L2k+PC9hPiAgICAgICAgICAgIDxoMyBjbGFzcz1cXFwibW9kYWxfdGl0bGVcXFwiPnt0aXRsZX08L2gzPiAgICAgICAgPC9kaXY+ICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbF9iZFxcXCI+ICAgICAgICAgICAge2NvbnRlbnR9ICAgICAgICA8L2Rpdj4gICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsX2Z0XFxcIj4gICAgICAgICAgICB7I2lmIG9rQnV0dG9ufSAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInUtYnRuIHUtYnRuLXByaW1hcnlcXFwiIG9uLWNsaWNrPXt0aGlzLmNsb3NlKHRydWUpfT57b2tCdXR0b24gPT09IHRydWUgPyBcXCfnoa7lrppcXCcgOiBva0J1dHRvbn08L2J1dHRvbj4gICAgICAgICAgICB7L2lmfSAgICAgICAgICAgIHsjaWYgY2FuY2VsQnV0dG9ufSAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcInUtYnRuXFxcIiBvbi1jbGljaz17dGhpcy5jbG9zZShmYWxzZSl9PntjYW5jZWxCdXR0b24gPT09IHRydWUgPyBcXCflj5bmtohcXCcgOiBjYW5jZWxCdXR0b259PC9idXR0b24+ICAgICAgICAgICAgey9pZn0gICAgICAgIDwvZGl2PiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBNb2RhbCAgICAg5qih5oCB5a+56K+d5qGGXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbW9kYWwuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgTW9kYWxcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaApyB8IEJpbmRpbmcgUHJvcGVydGllc1xuICogQHBhcmFtIHtzdHJpbmc9J+aPkOekuid9ICAgICAgICAgICBvcHRpb25zLmRhdGEudGl0bGUgICAgICAgICAgICAgIOWvueivneahhuagh+mimCB8IFRpdGxlIG9mIERpYWxvZ1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNvbnRlbnQgICAgICAgICAgICDlr7nor53moYblhoXlrrlcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49dHJ1ZX0gICAgIG9wdGlvbnMuZGF0YS5va0J1dHRvbiAgICAgICAgICAg5piv5ZCm5pi+56S656Gu5a6a5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW49ZmFsc2V9ICAgIG9wdGlvbnMuZGF0YS5jYW5jZWxCdXR0b24gICAgICAg5piv5ZCm5pi+56S65Y+W5raI5oyJ6ZKu44CC5YC85Li6YHN0cmluZ2Dml7bmmL7npLror6XmrrXmloflrZfjgIJcbiAqIEBwYXJhbSB7bnVtYmVyPW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS53aWR0aCAgICAgICAgICAgICAg5a+56K+d5qGG5a695bqm44CC5YC85Li65ZCm5a6a5pe25a695bqm5Li6Q1NT6K6+572u55qE5a695bqm44CCXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSAgICAgICAgICAgICAgICBvcHRpb25zLm9rICAgICAgICAgICAgICAgICAgICAgIOW9k+eCueWHu+ehruWumueahOaXtuWAmeaJp+ihjFxuICogQHBhcmFtIHtmdW5jdGlvbn0gICAgICAgICAgICAgICAgb3B0aW9ucy5jYW5jZWwgICAgICAgICAgICAgICAgICDlvZPngrnlh7vlj5bmtojnmoTml7blgJnmiafooYxcbiAqL1xudmFyIE1vZGFsID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ21vZGFsJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICBva0J1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICB3aWR0aDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgICAgICAvLyDor4HmmI7kuI3mmK/lhoXltYznu4Tku7ZcbiAgICAgICAgaWYodGhpcy4kcm9vdCA9PT0gdGhpcylcbiAgICAgICAgICAgIHRoaXMuJGluamVjdChkb2N1bWVudC5ib2R5KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2xvc2UocmVzdWx0KSDlhbPpl63mqKHmgIHlr7nor53moYZcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gcmVzdWx0IOeCueWHu+ehruWumui/mOaYr+WPlua2iFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2xvc2U6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNsb3NlIOWFs+mXreWvueivneahhuaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlc3VsdCDngrnlh7vkuobnoa7lrprov5jmmK/lj5bmtohcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJywge1xuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHRcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdCA/IHRoaXMub2soKSA6IHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgb2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IG9rIOehruWumuWvueivneahhuaXtuinpuWPkVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnb2snKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgY2xvc2Ug5Y+W5raI5a+56K+d5qGG5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjYW5jZWwnKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAbWV0aG9kIGFsZXJ0KFtjb250ZW50XVssdGl0bGVdKSDlvLnlh7rkuIDkuKphbGVydOWvueivneahhuOAguWFs+mXreaXtuWni+e7iOinpuWPkeehruWumuS6i+S7tuOAglxuICogQHN0YXRpY1xuICogQHBhcmFtICB7c3RyaW5nPScnfSBjb250ZW50IOWvueivneahhuWGheWuuVxuICogQHBhcmFtICB7c3RyaW5nPSfmj5DnpLonfSB0aXRsZSDlr7nor53moYbmoIfpophcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbk1vZGFsLmFsZXJ0ID0gZnVuY3Rpb24oY29udGVudCwgdGl0bGUpIHtcbiAgICB2YXIgbW9kYWwgPSBuZXcgTW9kYWwoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbW9kYWw7XG59XG5cbi8qKlxuICogQG1ldGhvZCBjb25maXJtKFtjb250ZW50XVssdGl0bGVdKSDlvLnlh7rkuIDkuKpjb25maXJt5a+56K+d5qGGXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0gIHtzdHJpbmc9Jyd9IGNvbnRlbnQg5a+56K+d5qGG5YaF5a65XG4gKiBAcGFyYW0gIHtzdHJpbmc9J+aPkOekuid9IHRpdGxlIOWvueivneahhuagh+mimFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuTW9kYWwuY29uZmlybSA9IGZ1bmN0aW9uKGNvbnRlbnQsIHRpdGxlKSB7XG4gICAgdmFyIG1vZGFsID0gbmV3IE1vZGFsKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogdHJ1ZVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1vZGFsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsO1xuIiwibW9kdWxlLmV4cG9ydHM9XCI8dWwgY2xhc3M9XFxcIm0tcGFnZXIgbS1wYWdlci17cG9zaXRpb259IHtAKGNsYXNzKX1cXFwiPiAgICA8bGkgY2xhc3M9XFxcInBhZ2VyX3ByZXZcXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCcgOiBjdXJyZW50IDw9IDF9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGN1cnJlbnQgLSAxKX0+PGE+5LiK5LiA6aG1PC9hPjwvbGk+ICAgIHsjaWYgdG90YWwgLSBtaWRkbGUgPiBzaWRlICogMiArIDF9ICAgICAgICB7I2xpc3QgMS4uc2lkZSBhcyBpfSAgICAgICAgPGxpIHItY2xhc3M9eyB7XFwnei1jcnRcXCc6IGN1cnJlbnQgPT0gaX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaSl9PjxhPntpfTwvYT48L2xpPiAgICAgICAgey9saXN0fSAgICAgICAgeyNpZiBfc3RhcnQgPiBzaWRlICsgMX08bGk+Li4uPC9saT57L2lmfSAgICAgICAgeyNsaXN0IF9zdGFydC4uX2VuZCBhcyBpfSAgICAgICAgPGxpIHItY2xhc3M9eyB7XFwnei1jcnRcXCc6IGN1cnJlbnQgPT0gaX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaSl9PjxhPntpfTwvYT48L2xpPiAgICAgICAgey9saXN0fSAgICAgICAgeyNpZiBfZW5kIDwgdG90YWwgLSBzaWRlfTxsaT4uLi48L2xpPnsvaWZ9ICAgICAgICB7I2xpc3QgKHRvdGFsIC0gc2lkZSArIDEpLi50b3RhbCBhcyBpfSAgICAgICAgPGxpIHItY2xhc3M9eyB7XFwnei1jcnRcXCc6IGN1cnJlbnQgPT0gaX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaSl9PjxhPntpfTwvYT48L2xpPiAgICAgICAgey9saXN0fSAgICB7I2Vsc2V9ICAgICAgICB7I2xpc3QgMS4udG90YWwgYXMgaX0gICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otY3J0XFwnOiBjdXJyZW50ID09IGl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGkpfT48YT57aX08L2E+PC9saT4gICAgICAgIHsvbGlzdH0gICAgey9pZn0gICAgPGxpIGNsYXNzPVxcXCJwYWdlcl9uZXh0XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnIDogY3VycmVudCA+PSB0b3RhbH0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoY3VycmVudCArIDEpfT48YT7kuIvkuIDpobU8L2E+PC9saT48L3VsPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFBhZ2VyICAgICDliIbpobVcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcGFnZXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgUGFnZXJcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOebkeWQrOaVsOaNrlxuICogQHBhcmFtIHtudW1iZXI9MX0gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmN1cnJlbnQgICAgICAgICAgICDlvZPliY3pobVcbiAqIEBwYXJhbSB7dG90YWw9MTF9ICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS50b3RhbCAgICAgICAgICAgICAg5oC76aG15pWwXG4gKiBAcGFyYW0ge21pZGRsZT01fSAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubWlkZGxlICAgICAgICAgICAgIOW9k+mhteaVsOi+g+WkmuaXtu+8jOS4remXtOaYvuekuueahOmhteaVsFxuICogQHBhcmFtIHtzaWRlPTJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNpZGUgICAgICAgICAgICAgICDlvZPpobXmlbDovoPlpJrml7bvvIzkuKTnq6/mmL7npLrnmoTpobXmlbBcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55So6K+l57uE5Lu2XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBQYWdlciA9IENvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdwYWdlcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgY3VycmVudDogMSxcbiAgICAgICAgICAgIHRvdGFsOiAxMSxcbiAgICAgICAgICAgIG1pZGRsZTogNSxcbiAgICAgICAgICAgIHNpZGU6IDIsXG4gICAgICAgICAgICBfc3RhcnQ6IDEsXG4gICAgICAgICAgICBfZW5kOiA1LFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcblxuICAgICAgICB0aGlzLiR3YXRjaChbJ2N1cnJlbnQnLCAndG90YWwnXSwgZnVuY3Rpb24oY3VycmVudCwgdG90YWwpIHtcbiAgICAgICAgICAgIHZhciBzaG93ID0gdGhpcy5kYXRhLm1pZGRsZT4+MTtcbiAgICAgICAgICAgIHZhciBzaWRlID0gdGhpcy5kYXRhLnNpZGU7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YS5fc3RhcnQgPSBjdXJyZW50IC0gc2hvdztcbiAgICAgICAgICAgIHRoaXMuZGF0YS5fZW5kID0gY3VycmVudCArIHNob3c7XG4gICAgICAgICAgICBpZih0aGlzLmRhdGEuX3N0YXJ0IDwgc2lkZSArIDEpXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLl9zdGFydCA9IHNpZGUgKyAxO1xuICAgICAgICAgICAgaWYodGhpcy5kYXRhLl9lbmQgPiB0b3RhbCAtIHNpZGUpXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLl9lbmQgPSB0b3RhbCAtIHNpZGU7XG4gICAgICAgICAgICBpZihjdXJyZW50IC0gdGhpcy5kYXRhLl9zdGFydCA8IHNob3cpXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLl9lbmQgKz0gdGhpcy5kYXRhLl9zdGFydCAtIGN1cnJlbnQgKyBzaG93O1xuICAgICAgICAgICAgaWYodGhpcy5kYXRhLl9lbmQgLSBjdXJyZW50IDwgc2hvdylcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuX3N0YXJ0ICs9IHRoaXMuZGF0YS5fZW5kIC0gY3VycmVudCAtIHNob3c7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2VsZWN0OiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZihwYWdlIDwgMSkgcmV0dXJuO1xuICAgICAgICBpZihwYWdlID4gdGhpcy5kYXRhLnRvdGFsKSByZXR1cm47XG4gICAgICAgIGlmKHBhZ2UgPT0gdGhpcy5kYXRhLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuY3VycmVudCA9IHBhZ2U7XG5cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgY3VycmVudDogdGhpcy5kYXRhLmN1cnJlbnRcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGFnZXI7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLXRhYiB7QChjbGFzcyl9XFxcIj4gICAgPHVsIGNsYXNzPVxcXCJ0YWJfaGRcXFwiPiAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgPGxpIHItY2xhc3M9eyB7XFwnei1jcnRcXCc6IGl0ZW0gPT0gc2VsZWN0ZWQsIFxcJ3otZGlzXFwnOiBpdGVtLmRpc2FibGVkfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+e2l0ZW0ubmFtZX08L2xpPiAgICAgICAgey9saXN0fSAgICA8L3VsPiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWJfYmRcXFwiPiAgICAgICAgPHItY29udGVudCAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUYWIgICAgICAg6YCJ6aG55Y2hXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9jb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGFiLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFRhYlxuICogQGV4dGVuZCBTb3VyY2VDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBUYWIgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAndGFiJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgc291cmNlOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYoaXRlbS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBUYWJQYW5lID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ3RhYlBhbmUnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiByLWhpZGU9e3RoaXMuJG91dGVyLmRhdGEuc2VsZWN0ZWQudGFiICE9IHRoaXN9PjxyLWNvbnRlbnQ+PC9kaXY+JyxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHsgXG4gICAgICAgIGlmKHRoaXMuJG91dGVyKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gdGhpcy4kb3V0ZXIuZGF0YS5zb3VyY2U7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kYXRhLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgIHRhYjogdGhpc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNvdXJjZS5wdXNoKGl0ZW0pO1xuXG4gICAgICAgICAgICBpZighdGhpcy4kb3V0ZXIuZGF0YS5zZWxlY3RlZClcbiAgICAgICAgICAgICAgICB0aGlzLiRvdXRlci5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhYjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtY2FsZW5kYXJcXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9PiAgICA8ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9oZFxcXCI+ICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfcHJldlxcXCI+ICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIG9uLWNsaWNrPXt0aGlzLmFkZFllYXIoLTEpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1hbmdsZS1kb3VibGUtbGVmdFxcXCI+PC9pPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCIgb24tY2xpY2s9e3RoaXMuYWRkTW9udGgoLTEpfT48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1hbmdsZS1sZWZ0XFxcIj48L2k+PC9zcGFuPiAgICAgICAgPC9zcGFuPiAgICAgICAgPHNwYW4+e2RhdGUgfCBmb3JtYXQ6IFxcJ3l5eXktTU1cXCd9PC9zcGFuPiAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX25leHRcXFwiPiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIiBvbi1jbGljaz17dGhpcy5hZGRNb250aCgxKX0+PGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tYW5nbGUtcmlnaHRcXFwiPjwvaT48L3NwYW4+ICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIG9uLWNsaWNrPXt0aGlzLmFkZFllYXIoMSl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWFuZ2xlLWRvdWJsZS1yaWdodFxcXCI+PC9pPjwvc3Bhbj4gICAgICAgIDwvc3Bhbj4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX2JkXFxcIj4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhbGVuZGFyX3dlZWtcXFwiPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7ml6U8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuS4gDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCI+5LqMPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7kuIk8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiPuWbmzwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiY2FsZW5kYXJfaXRlbVxcXCI+5LqUPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJjYWxlbmRhcl9pdGVtXFxcIj7lha08L3NwYW4+PC9kaXY+ICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYWxlbmRhcl9kYXlcXFwiPnsjbGlzdCBfZGF5cyBhcyBkYXl9PHNwYW4gY2xhc3M9XFxcImNhbGVuZGFyX2l0ZW1cXFwiIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IGRhdGUudG9EYXRlU3RyaW5nKCkgPT09IGRheS50b0RhdGVTdHJpbmcoKSwgXFwnei1kaXNcXCc6IGRheS5nZXRNb250aCgpICE9PSBkYXRlLmdldE1vbnRoKCl9IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGRheSl9PntkYXkgfCBmb3JtYXQ6IFxcJ2RkXFwnfTwvc3Bhbj57L2xpc3R9PC9kaXY+ICAgIDwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENhbGVuZGFyICDml6XljoZcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9jYWxlbmRhci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBDYWxlbmRhclxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge0RhdGU9bnVsbH0gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZGF0ZSAgICAgICAgICAgICAgIOW9k+WJjemAieaLqeeahOaXpeacn1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKjor6Xnu4Tku7ZcbiAqL1xudmFyIENhbGVuZGFyID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2NhbGVuZGFyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgZGF0ZTogbnVsbCxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIF9kYXlzOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG5cbiAgICAgICAgdGhpcy4kd2F0Y2goJ2RhdGUnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmKG5ld1ZhbHVlICYmIG9sZFZhbHVlICYmIG5ld1ZhbHVlLmdldEZ1bGxZZWFyKCkgPT09IG9sZFZhbHVlLmdldEZ1bGxZZWFyKCkgJiYgbmV3VmFsdWUuZ2V0TW9udGgoKSA9PT0gb2xkVmFsdWUuZ2V0TW9udGgoKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKCF0aGlzLmRhdGEuZGF0ZSlcbiAgICAgICAgICAgIHRoaXMuZ29Ub2RheSgpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kYXRhLl9kYXlzID0gW107XG4gICAgICAgIFxuICAgICAgICB2YXIgZGF0ZSA9IHRoaXMuZGF0YS5kYXRlO1xuICAgICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIHZhciBtZmlyc3QgPSBuZXcgRGF0ZShkYXRlKTsgbWZpcnN0LnNldERhdGUoMSk7XG4gICAgICAgIHZhciBtZmlyc3RUaW1lID0gbWZpcnN0LmdldFRpbWUoKTtcbiAgICAgICAgdmFyIG5maXJzdCA9IG5ldyBEYXRlKG1maXJzdCk7IG5maXJzdC5zZXRNb250aChtb250aCArIDEpOyBuZmlyc3Quc2V0RGF0ZSgxKTtcbiAgICAgICAgdmFyIG5maXJzdFRpbWUgPSBuZmlyc3QuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgbGFzdFRpbWUgPSBuZmlyc3RUaW1lICsgKCg3IC0gbmZpcnN0LmdldERheSgpKSU3IC0gMSkqMjQqMzYwMCoxMDAwO1xuICAgICAgICB2YXIgbnVtID0gLSBtZmlyc3QuZ2V0RGF5KCk7XG4gICAgICAgIHZhciB0bXBUaW1lLCB0bXA7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHRtcFRpbWUgPSBtZmlyc3RUaW1lICsgKG51bSsrKSoyNCozNjAwKjEwMDA7XG4gICAgICAgICAgICB0bXAgPSBuZXcgRGF0ZSh0bXBUaW1lKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5fZGF5cy5wdXNoKHRtcCk7XG4gICAgICAgIH0gd2hpbGUodG1wVGltZSA8IGxhc3RUaW1lKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgYWRkWWVhcih5ZWFyKSDosIPmlbTlubTku71cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7bnVtYmVyPTB9IHllYXIg5YqgL+WHj+eahOW5tOS7vVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgYWRkWWVhcjogZnVuY3Rpb24oeWVhcikge1xuICAgICAgICBpZih0aGlzLmRhdGEuZGlzYWJsZWQgfHwgIXllYXIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGEuZGF0ZSk7XG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgeWVhcik7XG4gICAgICAgIHRoaXMuZGF0YS5kYXRlID0gZGF0ZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgYWRkTW9udGgobW9udGgpIOiwg+aVtOaciOS7vVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtudW1iZXI9MH0gbW9udGgg5YqgL+WHj+eahOaciOS7vVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgYWRkTW9udGg6IGZ1bmN0aW9uKG1vbnRoKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZCB8fCAhbW9udGgpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGEuZGF0ZSk7XG4gICAgICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgbW9udGgpO1xuICAgICAgICB0aGlzLmRhdGEuZGF0ZSA9IGRhdGU7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChkYXRlKSDpgInmi6nkuIDkuKrml6XmnJ9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7RGF0ZT1udWxsfSBkYXRlIOmAieaLqeeahOaXpeacn1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOS4quaXpeacn+aXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gZGF0ZSDlvZPliY3pgInmi6nnmoTml6XmnJ9cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIGRhdGU6IGRhdGVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdvVG9kYXkoKSDlm57liLDku4rlpKlcbiAgICAgKiBAcHVibGljXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBnb1RvZGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBuZXcgRGF0ZSgobmV3IERhdGUoKS5nZXRUaW1lKCkvKDI0KjM2MDAqMTAwMCk+PjApKigyNCozNjAwKjEwMDApKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYWxlbmRhcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxsYWJlbCBjbGFzcz1cXFwidS1jaGVja2V4IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkLCBcXCd6LWNoa1xcJzogY2hlY2tlZCwgXFwnei1wYXJ0XFwnOiBjaGVja2VkID09PSBudWxsLCBcXCd1LWNoZWNrZXgtYmxvY2tcXCc6IGJsb2NrfSB9IG9uLWNsaWNrPXt0aGlzLmNoZWNrKCFjaGVja2VkKX0+PGRpdiBjbGFzcz1cXFwiY2hlY2tleF9ib3hcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNoZWNrXFxcIj48L2k+PC9kaXY+IHtuYW1lfTwvbGFiZWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2hlY2tFeCAgIOWkmumAieaMiemSrlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2NoZWNrRXguaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgQ2hlY2tFeFxuICogQGV4dGVuZCBDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubmFtZSAgICAgICAgICAgICAgIOWkmumAieaMiemSrueahOaWh+Wtl1xuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNoZWNrZWQgICAgICAgICAgICDlpJrpgInmjInpkq7nmoTpgInmi6nnirbmgIFcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5piv5ZCm5LulYmxvY2vmlrnlvI/mmL7npLpcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55So6K+l57uE5Lu2XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBDaGVja0V4ID0gQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2NoZWNrRXgnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYmxvY2s6IGZhbHNlLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY2hlY2soY2hlY2tlZCkg5pS55Y+Y6YCJ5Lit54q25oCBXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjaGVjazogZnVuY3Rpb24oY2hlY2tlZCkge1xuICAgICAgICBpZih0aGlzLmRhdGEuZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5kYXRhLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNoZWNrIOaUueWPmOmAieS4reeKtuaAgeaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGVjaycsIHtcbiAgICAgICAgICAgIGNoZWNrZWQ6IGNoZWNrZWRcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tFeDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdW5pdGdyb3VwIHtAKGNsYXNzKX1cXFwiPiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxjaGVja0V4IG5hbWU9e2l0ZW0ubmFtZX0gY2hlY2tlZD17aXRlbS5jaGVja2VkfSBkaXNhYmxlZD17ZGlzYWJsZWR9IGJsb2NrPXtibG9ja30gLz4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENoZWNrRXhHcm91cCDovpPlhaXmianlsZVcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDaGVja0dyb3VwID0gcmVxdWlyZSgnLi9jaGVja0dyb3VwLmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2NoZWNrRXhHcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xudmFyIENoZWNrRXggPSByZXF1aXJlKCcuL2NoZWNrRXguanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgQ2hlY2tFeEdyb3VwXG4gKiBAZXh0ZW5kIENoZWNrR3JvdXBcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqOivpee7hOS7tlxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIENoZWNrRXhHcm91cCA9IENoZWNrR3JvdXAuZXh0ZW5kKHtcbiAgICBuYW1lOiAnY2hlY2tFeEdyb3VwJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrRXhHcm91cDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdW5pdGdyb3VwIHtAKGNsYXNzKX1cXFwiPiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxsYWJlbCBjbGFzcz1cXFwidS1jaGVja2V4XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZCwgXFwndS1jaGVja2V4LWJsb2NrXFwnOiBibG9ja30gfT48aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIGNsYXNzPVxcXCJ1LWNoZWNrXFxcIiByLW1vZGVsPXtpdGVtLmNoZWNrZWR9IGRpc2FibGVkPXtkaXNhYmxlZH0+IHtpdGVtLm5hbWV9PC9sYWJlbD4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENoZWNrR3JvdXAg5aSa6YCJ57uEXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vY2hlY2tHcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xudmFyIENoZWNrRXggPSByZXF1aXJlKCcuL2NoZWNrRXguanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgQ2hlY2tHcm91cFxuICogQGV4dGVuZCBTb3VyY2VDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqOivpee7hOS7tlxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIENoZWNrR3JvdXAgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnY2hlY2tHcm91cCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJsb2NrOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNoZWNrQWxsKGNoZWNrZWQpIOaUueWPmOaJgOacieWkmumAieeahOmAieS4reeKtuaAgVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGNoZWNrZWQg6YCJ5Lit54q25oCBXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBjaGVja0FsbDogZnVuY3Rpb24oY2hlY2tlZCkge1xuICAgICAgICB0aGlzLmRhdGEuc291cmNlLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IGNoZWNrQWxsIOaUueWPmOaJgOacieWkmumAieeahOmAieS4reeKtuaAgeaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gY2hlY2tlZCDpgInkuK3nirbmgIFcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoZWNrQWxsJywge1xuICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZFxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGVja0dyb3VwOyIsIm1vZHVsZS5leHBvcnRzPVwiPGRpdiBjbGFzcz1cXFwidS1kcm9wZG93biB1LWRyb3Bkb3duLXN1Z2dlc3Qge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gcmVmPVxcXCJlbGVtZW50XFxcIj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25faGRcXFwiPiAgICAgICAgPGlucHV0IGNsYXNzPVxcXCJ1LWlucHV0IHUtaW5wdXQtZnVsbFxcXCIgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfSB2YWx1ZT17ZGF0ZSB8IGZvcm1hdDogXFwneXl5eS1NTS1kZFxcJ30gb24tZm9jdXM9e3RoaXMudG9nZ2xlKHRydWUpfSBvbi1jaGFuZ2U9e3RoaXMuY2hhbmdlKCRldmVudCl9IHJlZj1cXFwiaW5wdXRcXFwiIGRpc2FibGVkPXtkaXNhYmxlZH0geyNpZiByZWFkb25seX1yZWFkb25seT1cXFwicmVhZG9ubHlcXFwiey9pZn0+ICAgIDwvZGl2PiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9iZFxcXCIgci1oaWRlPXshb3Blbn0gci1hbmltYXRpb249XFxcIm9uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJblkgZmFzdDsgb246IGxlYXZlOyBjbGFzczogYW5pbWF0ZWQgZmFkZU91dFkgZmFzdDtcXFwiPiAgICAgICAgPGNhbGVuZGFyIGRhdGU9e2RhdGV9IG9uLXNlbGVjdD17dGhpcy5zZWxlY3QoJGV2ZW50LmRhdGUpfSAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEYXRlUGlja2VyIOaXpeacn+mAieaLqVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBEcm9wRG93biA9IHJlcXVpcmUoJy4vZHJvcERvd24uanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZGF0ZVBpY2tlci5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi4vYmFzZS9maWx0ZXIuanMnKTtcbnZhciBDYWxlbmRhciA9IHJlcXVpcmUoJy4vY2FsZW5kYXIuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgRGF0ZVBpY2tlclxuICogQGV4dGVuZCBEcm9wRG93blxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5kYXRlICAgICAgICAgICAgICAg5b2T5YmN6YCJ5oup55qE5pel5pyfXG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36L6T5YWlJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOaWh+acrOahhum7mOiupOaWh+Wtl1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmlofmnKzmoYbmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55So6K+l57uE5Lu2XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBEYXRlUGlja2VyID0gRHJvcERvd24uZXh0ZW5kKHtcbiAgICBuYW1lOiAnZGF0ZVBpY2tlcicsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ+ivt+i+k+WFpScsXG4gICAgICAgICAgICByZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzZWxlY3QoZGF0ZSkg6YCJ5oup5LiA5Liq5pel5pyfXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge0RhdGU9bnVsbH0gZGF0ZSDpgInmi6nnmoTml6XmnJ9cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNlbGVjdDogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGRhdGUg5b2T5YmN6YCJ5oup6aG5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBkYXRlOiBkYXRlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgfSxcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCRldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICBpZihkYXRlICE9ICdJbnZhbGlkIERhdGUnKVxuICAgICAgICAgICAgdGhpcy5kYXRhLmRhdGUgPSBkYXRlO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGVQaWNrZXI7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWRyb3Bkb3duIHUtZHJvcGRvd24tc3VnZ2VzdCB1LWRyb3Bkb3duLWRhdGV0aW1lcGlja2VyIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIj4gICAgICAgIDxpbnB1dCBjbGFzcz1cXFwidS1pbnB1dCB1LWlucHV0LWZ1bGxcXFwiIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gdmFsdWU9e2RhdGUgfCBmb3JtYXQ6IFxcJ3l5eXktTU0tZGQgSEg6bW1cXCd9IG9uLWZvY3VzPXt0aGlzLnRvZ2dsZSh0cnVlKX0gb24tY2hhbmdlPXt0aGlzLmNoYW5nZSgkZXZlbnQpfSByZWY9XFxcImlucHV0XFxcIiBkaXNhYmxlZD17ZGlzYWJsZWR9IHsjaWYgcmVhZG9ubHl9cmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcInsvaWZ9PiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25fYmRcXFwiIHItaGlkZT17IW9wZW59IHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW5ZIGZhc3Q7IG9uOiBsZWF2ZTsgY2xhc3M6IGFuaW1hdGVkIGZhZGVPdXRZIGZhc3Q7XFxcIj4gICAgICAgIDxjYWxlbmRhciBkYXRlPXtzZWxlY3RlZERhdGV9IG9uLXNlbGVjdD17dGhpcy5zZWxlY3QoJGV2ZW50LmRhdGUpfSAvPiAgICAgICAgPHVsIGNsYXNzPVxcXCJ1LWxpc3Rib3hcXFwiPiAgICAgICAgICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgICAgICAgICA8bGkgb24tY2xpY2s9e3RoaXMuc2VsZWN0KGl0ZW0pfT57aXRlbS5uYW1lfTwvbGk+ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC91bD4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0ZVRpbWVQaWNrZXIg5pel5pyf6YCJ5oupXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIERhdGVQaWNrZXIgPSByZXF1aXJlKCcuL2RhdGVQaWNrZXIuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZGF0ZVRpbWVQaWNrZXIuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uL2Jhc2UvZmlsdGVyLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIERhdGVUaW1lUGlja2VyXG4gKiBAZXh0ZW5kIERhdGVQaWNrZXJcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZGF0ZSAgICAgICAgICAgICAgIOW9k+WJjemAieaLqeeahOaXpeacn1xuICogQHBhcmFtIHtzdHJpbmc9J+ivt+i+k+WFpSd9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBsYWNlaG9sZGVyICAgICAgICDmlofmnKzmoYbpu5jorqTmloflrZdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5paH5pys5qGG5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqOivpee7hOS7tlxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgRGF0ZVRpbWVQaWNrZXIgPSBEYXRlUGlja2VyLmV4dGVuZCh7XG4gICAgbmFtZTogJ2RhdGVUaW1lUGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDEwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUnLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCByZWFkb25seTogZmFsc2UsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHNlbGVjdGVkVGltZTogJydcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIC8vIHRoaXMuJHdhdGNoKCdzZWxlY3RlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAvLyAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgICAvLyAgICAgdGhpcy4kcmVmcy5jYWxlbmRhci5kYXRhLnNlbGVjdGVkID0gbmV3VmFsdWU7XG5cbiAgICAgICAgLy8gICAgIHZhciB0aW1lID0gIGZpbHRlci5mb3JtYXQobmV3VmFsdWUsIG5ld1ZhbHVlLmdldE1pbnV0ZXMoKSUzMCA9PT0gMCA/ICdISDptbScgOiAnSEg6MDAnKTtcbiAgICAgICAgLy8gICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEuc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmRhdGEuc291cmNlW2ldOyAgIFxuICAgICAgICAvLyAgICAgICAgIGlmKHRpbWUgPT09IGl0ZW0ubmFtZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWRUaW1lID0gaXRlbTtcbiAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICB0aGlzLiR3YXRjaChbJ3NlbGVjdGVkRGF0ZScsICdzZWxlY3RlZFRpbWUnXSwgZnVuY3Rpb24oc2VsZWN0ZWREYXRlLCBzZWxlY3RlZFRpbWUpIHtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkRGF0ZSAmJiBzZWxlY3RlZFRpbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0YS5zZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gdGhpcy5kYXRhLnNlbGVjdGVkVGltZS5zcGxpdCgnOicpO1xuXG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aW1lWzBdKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXModGltZVsxXSk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5kYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5kYXRlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkYXRlIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAvLyAgICAgZGF0ZTogaXRlbVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICBpZighKGl0ZW0gaW5zdGFuY2VvZiBEYXRlKSlcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZFRpbWUgPSBpdGVtLm5hbWU7XG5cbiAgICAgICAgaWYoIShpdGVtIGluc3RhbmNlb2YgRGF0ZSkgfHwgdGhpcy5kYXRhLnNlbGVjdGVkVGltZSlcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9LFxuICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICBpZihkYXRlICE9ICdJbnZhbGlkIERhdGUnKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmRhdGEuZGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZFRpbWUgPSB2YWx1ZS5zcGxpdCgnICcpWzFdO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0ZVRpbWVQaWNrZXI7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWRyb3Bkb3duIHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIj4gICAgICAgIDxhIGNsYXNzPVxcXCJ1LWJ0biB1LWJ0bi1wcmltYXJ5XFxcIiBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT7kuIvmi4noj5zljZUgPGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPjwvYT4gICAgPC9kaXY+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2JkXFxcIiByLWhpZGU9eyFvcGVufSByLWFuaW1hdGlvbj1cXFwib246IGVudGVyOyBjbGFzczogYW5pbWF0ZWQgZmFkZUluWSBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0WSBmYXN0O1xcXCI+ICAgICAgICA8dWwgY2xhc3M9XFxcInUtbGlzdGJveFxcXCI+ICAgICAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgICAgIDxsaSBvbi1jbGljaz17dGhpcy50b2dnbGUoIW9wZW4pfT48YSBocmVmPVxcXCIjXFxcIj57aXRlbS5uYW1lfTwvYT48L2xpPiAgICAgICAgICAgIHsvbGlzdH0gICAgICAgIDwvdWw+ICAgIDwvZGl2PjwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIERyb3BEb3duICDkuIvmi4noj5zljZVcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZHJvcERvd24uaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgRHJvcERvd25cbiAqIEBleHRlbmQgU291cmNlQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEub3BlbiAgICAgICAgICAgICAgIOW9k+WJjeS4uuWxleW8gC/mlLbotbfnirbmgIFcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55So6K+l57uE5Lu2XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgRHJvcERvd24gPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnZHJvcERvd24nLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvZ2dsZShvcGVuKSDlnKjlsZXlvIAv5pS26LW354q25oCB5LmL6Ze05YiH5o2iXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IG9wZW4g5bGV5byAL+aUtui1t1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihvcGVuKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGF0YS5vcGVuID0gb3BlbjtcblxuICAgICAgICAvLyDmoLnmja7nirbmgIHlnKhEcm9wRG93bi5vcGVuc+WIl+ihqOS4rea3u+WKoC/liKDpmaTnrqHnkIbpoblcbiAgICAgICAgdmFyIGluZGV4ID0gRHJvcERvd24ub3BlbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgaWYob3BlbiAmJiBpbmRleCA8IDApXG4gICAgICAgICAgICBEcm9wRG93bi5vcGVucy5wdXNoKHRoaXMpO1xuICAgICAgICBlbHNlIGlmKCFvcGVuICYmIGluZGV4ID49IDApXG4gICAgICAgICAgICBEcm9wRG93bi5vcGVucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn0pO1xuXG4vLyDlpITnkIbngrnlh7tkcm9wRG93buS5i+WklueahOWcsOaWueWQjueahOaUtui1t+S6i+S7tuOAglxuRHJvcERvd24ub3BlbnMgPSBbXTtcblxuXy5kb20ub24oZG9jdW1lbnQuYm9keSwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIERyb3BEb3duLm9wZW5zLmZvckVhY2goZnVuY3Rpb24oZHJvcERvd24pIHtcbiAgICAgICAgLy8g6L+Z5Liq5Zyw5pa55LiN6IO955Soc3RvcFByb3BhZ2F0aW9u5p2l5aSE55CG77yM5Zug5Li65bGV5byA5LiA5LiqZHJvcERvd27nmoTlkIzml7bopoHmlLbotbflhbbku5Zkcm9wRG93blxuICAgICAgICB2YXIgZWxlbWVudCA9IGRyb3BEb3duLiRyZWZzLmVsZW1lbnQ7XG4gICAgICAgIHZhciBlbGVtZW50MiA9IGUudGFyZ2V0O1xuICAgICAgICB3aGlsZShlbGVtZW50Mikge1xuICAgICAgICAgICAgaWYoZWxlbWVudCA9PSBlbGVtZW50MilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBlbGVtZW50MiA9IGVsZW1lbnQyLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZHJvcERvd24udG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgZHJvcERvd24uJHVwZGF0ZSgpO1xuICAgIH0pO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcERvd247IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LWdyaWR2aWV3IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9PiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxkaXYgY2xhc3M9XFxcImdyaWR2aWV3X2l0ZW1cXFwiIHItY2xhc3M9eyB7XFwnei1zZWxcXCc6IHNlbGVjdGVkID09PSBpdGVtfSB9PnsjaWYgQChpdGVtVGVtcGxhdGUpfXsjaW5jbHVkZSBAKGl0ZW1UZW1wbGF0ZSl9eyNlbHNlfXtpdGVtLm5hbWV9ey9pZn08L2Rpdj4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEdyaWRWaWV3ICDnvZHmoLzop4blm75cbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9ncmlkVmlldy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBHcmlkVmlld1xuICogQGV4dGVuZCBTb3VyY2VDb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBHcmlkVmlldyA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICdncmlkVmlldycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gR3JpZFZpZXc7IiwibW9kdWxlLmV4cG9ydHM9XCI8bGFiZWwgY2xhc3M9XFxcInUtaW5wdXRleCB7QChjbGFzcyl9XFxcIj4gICAgPGlucHV0IGNsYXNzPVxcXCJ1LWlucHV0XFxcIj4gICAgPHNwYW4gY2xhc3M9XFxcInUtdW5pdFxcXCI+e3VuaXR9PC9zcGFuPjwvbGFiZWw+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogSW5wdXRFeCAgIOi+k+WFpeaJqeWxlVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL2NvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9pbnB1dEV4Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIElucHV0RXhcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKjor6Xnu4Tku7ZcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIElucHV0RXggPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnaW5wdXRFeCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIHVuaXQ6ICclJyxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZWxlY3RlZCDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RXg7IiwibW9kdWxlLmV4cG9ydHM9XCI8dWwgY2xhc3M9XFxcInUtbGlzdGJveCB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfT4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bGkgci1jbGFzcz17IHtcXCd6LXNlbFxcJzogc2VsZWN0ZWQgPT09IGl0ZW19IH0gb24tY2xpY2s9e3RoaXMuc2VsZWN0KGl0ZW0pfT57aXRlbS5uYW1lfTwvbGk+ICAgIHsvbGlzdH08L3VsPlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIExpc3RCb3ggICDliJfooajmoYZcbiAqIEBhdXRob3IgICBzZW5zZW4ocmFpbmZvcmVzdDkyQDEyNi5jb20pXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTb3VyY2VDb21wb25lbnQgPSByZXF1aXJlKCcuLi9iYXNlL3NvdXJjZUNvbXBvbmVudC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9saXN0Qm94Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIExpc3RCb3hcbiAqIEBleHRlbmQgU291cmNlQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKjor6Xnu4Tku7ZcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBMaXN0Qm94ID0gU291cmNlQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgbmFtZTogJ2xpc3RCb3gnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdEJveDsiLCJtb2R1bGUuZXhwb3J0cz1cIjx1bCBjbGFzcz1cXFwidS1saXN0Ym94IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9PiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxsaSByLWNsYXNzPXsge1xcJ3otc2VsXFwnOiBzZWxlY3RlZCA9PT0gaXRlbX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PnsjaWYgQChpdGVtVGVtcGxhdGUpfXsjaW5jbHVkZSBAKGl0ZW1UZW1wbGF0ZSl9eyNlbHNlfXtpdGVtLm5hbWV9ey9pZn08L2xpPiAgICB7L2xpc3R9PC91bD5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBMaXN0VmlldyAg5YiX6KGo6KeG5Zu+XG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGlzdEJveCA9IHJlcXVpcmUoJy4vbGlzdEJveC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9saXN0Vmlldy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBMaXN0Vmlld1xuICogQGV4dGVuZCBMaXN0Qm94XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLml0ZW1UZW1wbGF0ZSAgICAgICDmr4/kuIDpobnnmoTmqKHmnb9cbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55So6K+l57uE5Lu2XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgTGlzdFZpZXcgPSBMaXN0Qm94LmV4dGVuZCh7XG4gICAgbmFtZTogJ2xpc3RWaWV3JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBpdGVtVGVtcGxhdGU6IG51bGxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIGRpc2FibGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdFZpZXc7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJtLW5vdGlmeSBtLW5vdGlmeS17QChwb3NpdGlvbil9IHtAKGNsYXNzKX1cXFwiPiAgICB7I2xpc3QgbWVzc2FnZXMgYXMgbWVzc2FnZX0gICAgPGRpdiBjbGFzcz1cXFwibm90aWZ5X21lc3NhZ2Ugbm90aWZ5X21lc3NhZ2Ute0AobWVzc2FnZS50eXBlKX1cXFwiIHItYW5pbWF0aW9uPVxcJ29uOiBlbnRlcjsgY2xhc3M6IGFuaW1hdGVkIGZhZGVJbiBmYXN0OyBvbjogbGVhdmU7IGNsYXNzOiBhbmltYXRlZCBmYWRlT3V0IGZhc3Q7XFwnPiAgICAgICAgPGEgY2xhc3M9XFxcIm5vdGlmeV9jbG9zZVxcXCIgb24tY2xpY2s9e3RoaXMuY2xvc2UobWVzc2FnZSl9PjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLWNsb3NlXFxcIj48L2k+PC9hPiAgICAgICAgPGRpdiBjbGFzcz1cXFwibm90aWZ5X3RleHRcXFwiPjxpIGNsYXNzPVxcXCJ1LWljb24gdS1pY29uLXtAKG1lc3NhZ2UudHlwZSl9LWNpcmNsZVxcXCIgci1oaWRlPXtAKCFtZXNzYWdlLnR5cGUpfT48L2k+IHtAKG1lc3NhZ2UudGV4dCl9PC9kaXY+ICAgIDwvZGl2PiAgICB7L2xpc3R9PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogTm90aWZ5ICAgIOmAmuefpVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL25vdGlmeS5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBOb3RpZnlcbiAqIEBleHRlbmQgQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOebkeWQrOaVsOaNrlxuICogQHBhcmFtIHtzdHJpbmc9J3RvcGNlbnRlcid9ICAgICAgb3B0aW9ucy5kYXRhLnBvc2l0aW9uICAgICAgICAgICDpgJrnn6XnmoTkvY3nva7vvIzlj6/pgInlj4LmlbDvvJpgdG9wY2VudGVyYOOAgWB0b3BsZWZ0YOOAgWB0b3ByaWdodGDjgIFgYm90dG9tY2VudGVyYOOAgWBib3R0b21sZWZ0YOOAgWBib3R0b21yaWdodGDjgIFgc3RhdGljYFxuICogQHBhcmFtIHtudW1iZXI9MjAwMH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmR1cmF0aW9uICAgICAgICAgICDmr4/mnaHmtojmga/nmoTlgZznlZnmr6vnp5LmlbDvvIzlpoLmnpzkuLow77yM5YiZ6KGo56S65raI5oGv5bi46am75LiN5raI5aSx44CCXG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBOb3RpZnkgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAnbm90aWZ5JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgcG9zaXRpb246ICd0b3BjZW50ZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICAgICAgLy8g6K+B5piO5LiN5piv5YaF5bWM57uE5Lu2XG4gICAgICAgIGlmKHRoaXMuJHJvb3QgPT09IHRoaXMpXG4gICAgICAgICAgICB0aGlzLiRpbmplY3QoZG9jdW1lbnQuYm9keSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNob3codGV4dFssdHlwZV1bLGR1cmF0aW9uXSkg5by55Ye65LiA5Liq5raI5oGvXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge3N0cmluZz0nJ30gdGV4dCDmtojmga/lhoXlrrlcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmc9bnVsbH0gdHlwZSDmtojmga/nsbvlnovvvIzlj6/pgInlj4LmlbDvvJpgaW5mb2DjgIFgc3VjY2Vzc2DjgIFgd2FybmluZ2DjgIFgZXJyb3JgXG4gICAgICogQHBhcmFtICB7bnVtYmVyPW5vdGlmeS5kdXJhdGlvbn0gZHVyYXRpb24g6K+l5p2h5raI5oGv55qE5YGc55WZ5q+r56eS5pWw77yM5aaC5p6c5Li6MO+8jOWImeihqOekuua2iOaBr+W4uOmpu+S4jea2iOWkseOAglxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2hvdzogZnVuY3Rpb24odGV4dCwgdHlwZSwgZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiA+PSAwID8gZHVyYXRpb24gOiB0aGlzLmRhdGEuZHVyYXRpb25cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhLm1lc3NhZ2VzLnVuc2hpZnQobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZSgpO1xuXG4gICAgICAgIGlmKG1lc3NhZ2UuZHVyYXRpb24pXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KHRoaXMuY2xvc2UuYmluZCh0aGlzLCBtZXNzYWdlKSwgbWVzc2FnZS5kdXJhdGlvbik7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzaG93IOW8ueWHuuS4gOS4qua2iOaBr+aXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gbWVzc2FnZSDlvLnlh7rnmoTmtojmga/lr7nosaFcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3Nob3cnLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjbG9zZShtZXNzYWdlKSDlhbPpl63mn5DmnaHmtojmga9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBtZXNzYWdlIOmcgOimgeWFs+mXreeahOa2iOaBr+WvueixoVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2xvc2U6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5kYXRhLm1lc3NhZ2VzLmluZGV4T2YobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuZGF0YS5tZXNzYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLiR1cGRhdGUoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBjbG9zZSDlhbPpl63mn5DmnaHmtojmga/ml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IG1lc3NhZ2Ug5YWz6Zet5LqG55qE5raI5oGv5a+56LGhXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNsb3NlQWxsKCkg5YWz6Zet5omA5pyJ5raI5oGvXG4gICAgICogQHB1YmxpY1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY2xvc2VBbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiR1cGRhdGUoJ21lc3NhZ2VzJywgW10pO1xuICAgIH1cbn0pLnVzZSgnJHRpbWVvdXQnKTtcblxuXG4vKipcbiAqIOebtOaOpeWIneWni+WMluS4gOS4quWunuS+i1xuICogQHR5cGUge05vdGlmeX1cbiAqL1xudmFyIG5vdGlmeSA9IG5ldyBOb3RpZnkoKTtcbk5vdGlmeS5ub3RpZnkgPSBub3RpZnk7XG5cbi8qKlxuICogQG1ldGhvZCBzaG93KHRleHRbLHR5cGVdWyxkdXJhdGlvbl0pIOW8ueWHuuS4gOS4qua2iOaBr1xuICogQHN0YXRpY1xuICogQHBhcmFtICB7c3RyaW5nPScnfSB0ZXh0IOa2iOaBr+WGheWuuVxuICogQHBhcmFtICB7c3RyaW5nPW51bGx9IHR5cGUg5raI5oGv57G75Z6L77yM5Y+v6YCJ5Y+C5pWw77yaYGluZm9g44CBYHN1Y2Nlc3Ng44CBYHdhcm5pbmdg44CBYGVycm9yYFxuICogQHBhcmFtICB7bnVtYmVyPW5vdGlmeS5kdXJhdGlvbn0gZHVyYXRpb24g6K+l5p2h5raI5oGv55qE5YGc55WZ5q+r56eS5pWw77yM5aaC5p6c5Li6MO+8jOWImeihqOekuua2iOaBr+W4uOmpu+S4jea2iOWkseOAglxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuTm90aWZ5LnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICBub3RpZnkuc2hvdy5hcHBseShub3RpZnksIGFyZ3VtZW50cyk7XG59XG4vKipcbiAqIEBtZXRob2QgY2xvc2UobWVzc2FnZSkg5YWz6Zet5p+Q5p2h5raI5oGvXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0gIHtvYmplY3R9IG1lc3NhZ2Ug6ZyA6KaB5YWz6Zet55qE5raI5oGv5a+56LGhXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5Ob3RpZnkuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBub3RpZnkuY2xvc2UuYXBwbHkobm90aWZ5LCBhcmd1bWVudHMpO1xufVxuLyoqXG4gKiBAbWV0aG9kIGNsb3NlQWxsKCkg5YWz6Zet5omA5pyJ5raI5oGvXG4gKiBAc3RhdGljXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5Ob3RpZnkuY2xvc2VBbGwgPSBmdW5jdGlvbigpIHtcbiAgICBub3RpZnkuY2xvc2VBbGwuYXBwbHkobm90aWZ5LCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5vdGlmeTsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtcHJvZ3Jlc3MgdS1wcm9ncmVzcy17QChzaXplKX0gdS1wcm9ncmVzcy17QCh0eXBlKX0ge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd1LXByb2dyZXNzLXN0cmlwZWRcXCc6IHN0cmlwZWQsIFxcJ3otYWN0XFwnOiBhY3RpdmV9IH0+ICAgIDxkaXYgY2xhc3M9XFxcInByb2dyZXNzX2JhclxcXCIgc3R5bGU9XFxcIndpZHRoOiB7cGVyY2VudH0lO1xcXCI+e3RleHQgPyAodGV4dCA9PT0gdHJ1ZSA/IHBlcmNlbnQgKyBcXCclXFwnIDogdGV4dCkgOiBcXCdcXCd9PC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUHJvZ3Jlc3MgIOi/m+W6puadoVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2UvY29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3Byb2dyZXNzLmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFByb2dyZXNzXG4gKiBAZXh0ZW5kIENvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7bnVtYmVyPTM2fSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5wZXJjZW50ICAgICAgICAgICAg55m+5YiG5q+UXG4gKiBAcGFyYW0ge3N0cmluZ3xib29sZWFuPXRydWV9ICAgICBvcHRpb25zLmRhdGEudGV4dCAgICAgICAgICAgICAgIOWcqOi/m+W6puadoeS4reaYr+WQpuaYvuekuueZvuWIhuavlOOAguWAvOS4umBzdHJpbmdg5pe25pi+56S66K+l5q615paH5a2X44CCXG4gKiBAcGFyYW0ge3N0cmluZz1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2l6ZSAgICAgICAgICAgICAgIOi/m+W6puadoeeahOWwuuWvuFxuICogQHBhcmFtIHtzdHJpbmc9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnR5cGUgICAgICAgICAgICAgICDov5vluqbmnaHnmoTnsbvlnovvvIzmlLnlj5jmmL7npLrpopzoibJcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5zdHJpcGVkICAgICAgICAgICAg5piv5ZCm5pi+56S65p2h57q5XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuYWN0aXZlICAgICAgICAgICAgIOi/m+W6puadoeaYr+WQpuS4uua/gOa0u+eKtuaAge+8jOW9k2BzdHJpcGVkYOS4umB0cnVlYOaXtu+8jOi/m+W6puadoeaYvuekuuWKqOeUu1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICovXG52YXIgUHJvZ3Jlc3MgPSBDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAncHJvZ3Jlc3MnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBwZXJjZW50OiAzNixcbiAgICAgICAgICAgIHRleHQ6IHRydWUsXG4gICAgICAgICAgICBzaXplOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgICAgIHN0cmlwZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3M7IiwibW9kdWxlLmV4cG9ydHM9XCI8ZGl2IGNsYXNzPVxcXCJ1LXVuaXRncm91cCB7QChjbGFzcyl9XFxcIj4gICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICA8bGFiZWwgY2xhc3M9XFxcInUtcmFkaW9leFxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWQsIFxcJ3otc2VsXFwnOiBpdGVtID09PSBzZWxlY3RlZCwgXFwndS1yYWRpb2V4LWJsb2NrXFwnOiBibG9ja30gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PjxkaXYgY2xhc3M9XFxcInJhZGlvZXhfYm94XFxcIj48aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1yYWRpb1xcXCI+PC9pPjwvZGl2PiB7aXRlbS5uYW1lfTwvbGFiZWw+ICAgIHsvbGlzdH08L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBSYWRpb0V4R3JvdXAg6L6T5YWl5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmFkaW9Hcm91cCA9IHJlcXVpcmUoJy4vcmFkaW9Hcm91cC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9yYWRpb0V4R3JvdXAuaHRtbCcpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9iYXNlL3V0aWwuanMnKTtcblxuLyoqXG4gKiBAY2xhc3MgUmFkaW9FeEdyb3VwXG4gKiBAZXh0ZW5kIFJhZGlvR3JvdXBcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zZWxlY2VkICAgICAgICAgICAg5b2T5YmN6YCJ5oup6aG5XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuYmxvY2sgICAgICAgICAgICAgIOWkmuihjOaYvuekulxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKjor6Xnu4Tku7ZcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqL1xudmFyIFJhZGlvRXhHcm91cCA9IFJhZGlvR3JvdXAuZXh0ZW5kKHtcbiAgICBuYW1lOiAncmFkaW9FeEdyb3VwJyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJhZGlvRXhHcm91cDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdW5pdGdyb3VwIHtAKGNsYXNzKX1cXFwiPiAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgIDxsYWJlbCBjbGFzcz1cXFwidS1yYWRpb2V4XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZCwgXFwndS1yYWRpb2V4LWJsb2NrXFwnOiBibG9ja30gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PjxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgY2xhc3M9XFxcInUtcmFkaW9cXFwiIG5hbWU9e19yYWRpb0dyb3VwSWR9IGRpc2FibGVkPXtkaXNhYmxlZH0+IHtpdGVtLm5hbWV9PC9sYWJlbD4gICAgey9saXN0fTwvZGl2PlwiIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFJhZGlvR3JvdXAg5Y2V6YCJ57uEXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU291cmNlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYmFzZS9zb3VyY2VDb21wb25lbnQuanMnKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vcmFkaW9Hcm91cC5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBSYWRpb0dyb3VwXG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjZWQgICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5ibG9jayAgICAgICAgICAgICAg5aSa6KGM5pi+56S6XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqOivpee7hOS7tlxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIFJhZGlvR3JvdXAgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAncmFkaW9Hcm91cCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgX3JhZGlvR3JvdXBJZDogbmV3IERhdGUoKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmFkaW9Hcm91cDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zZWxlY3RleCB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByZWY9XFxcImVsZW1lbnRcXFwiPiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9oZFxcXCIgb24tY2xpY2s9e3RoaXMudG9nZ2xlKCFvcGVuKX0+ICAgICAgICA8c3Bhbj57c2VsZWN0ZWQgPyBzZWxlY3RlZC5uYW1lIDogcGxhY2Vob2xkZXJ9PC9zcGFuPiAgICAgICAgPGkgY2xhc3M9XFxcInUtaWNvbiB1LWljb24tY2FyZXQtZG93blxcXCI+PC9pPiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25fYmRcXFwiIHItaGlkZT17IW9wZW59IHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW5ZIGZhc3Q7IG9uOiBsZWF2ZTsgY2xhc3M6IGFuaW1hdGVkIGZhZGVPdXRZIGZhc3Q7XFxcIj4gICAgICAgIDx1bCBjbGFzcz1cXFwidS1saXN0Ym94XFxcIj4gICAgICAgICAgICB7I2lmIHBsYWNlaG9sZGVyfTxsaSByLWNsYXNzPXsge1xcJ3otc2VsXFwnOiBzZWxlY3RlZCA9PT0gbnVsbH0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QobnVsbCl9PntwbGFjZWhvbGRlcn08L2xpPnsvaWZ9ICAgICAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgICAgIDxsaSByLWNsYXNzPXsge1xcJ3otc2VsXFwnOiBzZWxlY3RlZCA9PT0gaXRlbX0gfSBvbi1jbGljaz17dGhpcy5zZWxlY3QoaXRlbSl9PntpdGVtLm5hbWV9PC9saT4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3VsPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBTZWxlY3RFeCAg6YCJ5oup5omp5bGVXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRHJvcERvd24gPSByZXF1aXJlKCcuL2Ryb3BEb3duLmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3NlbGVjdEV4Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFNlbGVjdEV4XG4gKiBAZXh0ZW5kIERyb3BEb3duXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9J+ivt+mAieaLqSd9ICAgICAgICAgb3B0aW9ucy5kYXRhLnBsYWNlaG9sZGVyICAgICAgICDpu5jorqTpobnnmoTmloflrZdcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55So6K+l57uE5Lu2XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLnNlcnZpY2UgICAgICAgICAgICAgICAgIOaVsOaNruacjeWKoVxuICovXG52YXIgU2VsZWN0RXggPSBEcm9wRG93bi5leHRlbmQoe1xuICAgIG5hbWU6ICdzZWxlY3RFeCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2VcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICfor7fpgInmi6knLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCdzZWxlY3RlZCcsIGl0ZW0pO1xuICAgICAgICAvL3RoaXMuZGF0YS5zZWxlY3RlZCA9IGl0ZW07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc2VsZWN0IOmAieaLqeafkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gc2VsZWN0ZWQg5b2T5YmN6YCJ5oup6aG5XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCB7XG4gICAgICAgICAgICBzZWxlY3RlZDogaXRlbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UpO1xuICAgIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RFeDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zdWdnZXN0IHtAKGNsYXNzKX1cXFwiIHItY2xhc3M9eyB7XFwnei1kaXNcXCc6IGRpc2FibGVkfSB9IHJlZj1cXFwiZWxlbWVudFxcXCI+ICAgIDxkaXYgY2xhc3M9XFxcImRyb3Bkb3duX2hkXFxcIj4gICAgICAgIDxpbnB1dCBjbGFzcz1cXFwidS1pbnB1dCB1LWlucHV0LWZ1bGxcXFwiIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gci1tb2RlbD17dmFsdWV9IG9uLWZvY3VzPXt0aGlzLmlucHV0KCRldmVudCl9IG9uLWtleXVwPXt0aGlzLmlucHV0KCRldmVudCl9IG9uLWJsdXI9e3RoaXMudW5pbnB1dCgkZXZlbnQpfSByZWY9XFxcImlucHV0XFxcIiBkaXNhYmxlZD17ZGlzYWJsZWR9IHsjaWYgcmVhZG9ubHl9cmVhZG9ubHk9XFxcInJlYWRvbmx5XFxcInsvaWZ9PiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25fYmRcXFwiIHItaGlkZT17IW9wZW59IHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW5ZIGZhc3Q7IG9uOiBsZWF2ZTsgY2xhc3M6IGFuaW1hdGVkIGZhZGVPdXRZIGZhc3Q7XFxcIj4gICAgICAgIDx1bCBjbGFzcz1cXFwidS1saXN0Ym94XFxcIj4gICAgICAgICAgICB7I2xpc3Qgc291cmNlIGFzIGl0ZW19ICAgICAgICAgICAgeyNpZiB0aGlzLmZpbHRlcihpdGVtKX0gICAgICAgICAgICAgICAgPGxpIG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+e2l0ZW0ubmFtZX08L2xpPiAgICAgICAgICAgIHsvaWZ9ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC91bD4gICAgPC9kaXY+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogU3VnZ2VzdCAgIOiHquWKqOaPkOekulxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIERyb3BEb3duID0gcmVxdWlyZSgnLi9kcm9wRG93bi5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zdWdnZXN0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG52YXIgTGlzdEJveCA9IHJlcXVpcmUoJy4vbGlzdEJveC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBTdWdnZXN0XG4gKiBAZXh0ZW5kIERyb3BEb3duXG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdD1udWxsfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc2VsZWN0ZWQgICAgICAgICAgIOW9k+WJjemAieaLqemhuVxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnZhbHVlICAgICAgICAgICAgICDmlofmnKzmoYbkuK3nmoTlgLxcbiAqIEBwYXJhbSB7c3RyaW5nPSfor7fovpPlhaUnfSAgICAgICAgIG9wdGlvbnMuZGF0YS5wbGFjZWhvbGRlciAgICAgICAg5paH5pys5qGG6buY6K6k5paH5a2XXG4gKiBAcGFyYW0ge251bWJlcj0wfSAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEubWluTGVuZ3RoICAgICAgICAgIOacgOWwj+aPkOekuumVv+W6puOAguW9k+i+k+WFpemVv+W6pj496K+l5YC85ZCO5byA5aeL5o+Q56S6XG4gKiBAcGFyYW0ge3N0cmluZz0nYWxsJ30gICAgICAgICAgICBvcHRpb25zLmRhdGEubWF0Y2hUeXBlICAgICAgICAgIOWMuemFjeaWueW8j++8jGBhbGxg6KGo56S65Yy56YWN5YWo5bGA77yMYHN0YXJ0YOihqOekuuWPquWMuemFjeW8gOWktO+8jGBlbmRg6KGo56S65Y+q5Yy56YWN57uT5bC+XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuc3RyaWN0ICAgICAgICAgICAgIOaYr+WQpuS4uuS4peagvOaooeW8j+OAguW9k+S4uuS4peagvOaooeW8j+aXtu+8jGB2YWx1ZWDlsZ7mgKflv4XpobvlnKhzb3VyY2XkuK3pgInmi6nvvIzlkKbliJnkuLrnqbrjgIJcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5yZWFkb25seSAgICAgICAgICAg5paH5pys5qGG5piv5ZCm5Y+q6K+7XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuZGlzYWJsZWQgICAgICAgICAgIOaYr+WQpuemgeeUqOivpee7hOS7tlxuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIFN1Z2dlc3QgPSBEcm9wRG93bi5leHRlbmQoe1xuICAgIG5hbWU6ICdzdWdnZXN0JyxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICfor7fovpPlhaUnLFxuICAgICAgICAgICAgbWluTGVuZ3RoOiAwLFxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcbiAgICAgICAgICAgIG1hdGNoVHlwZTogJ2FsbCcsXG4gICAgICAgICAgICBzdHJpY3Q6IGZhbHNlLFxuICAgICAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1cHIoKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0g6YCJ5oup6aG5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdGhpcy4kdXBkYXRlKCdzZWxlY3RlZCcsIGl0ZW0pO1xuICAgICAgICB0aGlzLmRhdGEudmFsdWUgPSBpdGVtLm5hbWU7XG4gICAgICAgIC8vdGhpcy5kYXRhLnNlbGVjdGVkID0gaXRlbTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCBzZWxlY3Qg6YCJ5oup5p+Q5LiA6aG55pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBzZWxlY3RlZCDlvZPliY3pgInmi6npoblcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3NlbGVjdCcsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHRvZ2dsZShvcGVuKSAg5Zyo5bGV5byA54q25oCB5ZKM5pS26LW354q25oCB5LmL6Ze05YiH5o2iXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59IG9wZW4g5bGV5byA6L+Y5piv5pS26LW3XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICB0b2dnbGU6IGZ1bmN0aW9uKG9wZW4sIF9pc0lucHV0KSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEub3BlbiA9IG9wZW47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBldmVudCB0b2dnbGUg5bGV5byA5oiW5pS26LW354q25oCB5pS55Y+Y5pe26Kem5Y+RXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gb3BlbiDlsZXlvIDov5jmmK/mlLbotbdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuJGVtaXQoJ3RvZ2dsZScsIHtcbiAgICAgICAgICAgIG9wZW46IG9wZW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gRHJvcERvd24ub3BlbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgaWYob3BlbiAmJiBpbmRleCA8IDApXG4gICAgICAgICAgICBEcm9wRG93bi5vcGVucy5wdXNoKHRoaXMpO1xuICAgICAgICBlbHNlIGlmKCFvcGVuICYmIGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIERyb3BEb3duLm9wZW5zLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIGlmKCFfaXNJbnB1dCAmJiB0aGlzLmRhdGEuc3RyaWN0KVxuICAgICAgICAgICAgICAgdGhpcy5kYXRhLnZhbHVlID0gdGhpcy5kYXRhLnNlbGVjdGVkID8gdGhpcy5kYXRhLnNlbGVjdGVkLm5hbWUgOiAnJztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8g6L6T5YWl5pe2XG4gICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmRhdGEudmFsdWU7XG5cbiAgICAgICAgaWYodmFsdWUubGVuZ3RoID49IHRoaXMuZGF0YS5taW5MZW5ndGgpXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZSh0cnVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy50b2dnbGUoZmFsc2UsIHRydWUpO1xuICAgIH0sXG4gICAgdW5pbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG5cbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmRhdGEudmFsdWU7XG5cbiAgICAgICAgaWYoIXZhbHVlICYmIHRoaXMuZGF0YS5taW5MZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYodGhpcy5kYXRhLm1hdGNoVHlwZSA9PSAnYWxsJylcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbiAgICAgICAgZWxzZSBpZih0aGlzLmRhdGEubWF0Y2hUeXBlID09ICdzdGFydCcpXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCkgPT0gdmFsdWU7XG4gICAgICAgIGVsc2UgaWYodGhpcy5kYXRhLm1hdGNoVHlwZSA9PSAnZW5kJylcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUuc2xpY2UoLXZhbHVlLmxlbmd0aCkgPT0gdmFsdWU7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3VnZ2VzdDsiLCJtb2R1bGUuZXhwb3J0cz1cIjx0YWJsZSBjbGFzcz1cXFwibS10YWJsZSBtLXRhYmxldmlldyB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ20tdGFibGUtc3RyaXBlZFxcJzogc3RyaXBlZCwgXFwnbS10YWJsZS1ob3ZlclxcJzogaG92ZXJ9IH0+ICAgIDx0aGVhZD4gICAgICAgIDx0cj4gICAgICAgICAgICB7I2xpc3QgZmllbGRzIGFzIGZpZWxkfSAgICAgICAgICAgIDx0aCByLWNsYXNzPXsge1xcJ3RhYmxldmlld19zb3J0YWJsZVxcJzogZmllbGQuc29ydGFibGV9IH0gb24tY2xpY2s9e3RoaXMuc29ydChmaWVsZCl9PiAgICAgICAgICAgICAgICB7ZmllbGQubmFtZSB8fCBmaWVsZC5rZXl9ICAgICAgICAgICAgICAgIHsjaWYgZmllbGQuc29ydGFibGV9ICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwidS1pY29uIHtvcmRlci5ieSA9PT0gZmllbGQua2V5ID8gKG9yZGVyLmRlc2MgPyBcXCd1LWljb24tc29ydC1kZXNjXFwnIDogXFwndS1pY29uLXNvcnQtYXNjXFwnKSA6IFxcJ3UtaWNvbi1zb3J0XFwnfVxcXCI+PC9pPiAgICAgICAgICAgICAgICB7L2lmfSAgICAgICAgICAgIDwvdGg+ICAgICAgICAgICAgey9saXN0fSAgICAgICAgPC90cj4gICAgPC90aGVhZD4gICAgPHRib2R5PiAgICAgICAgeyNsaXN0IHNvdXJjZSBhcyBpdGVtfSAgICAgICAgPHRyPiAgICAgICAgICAgIHsjbGlzdCBmaWVsZHMgYXMgZmllbGR9ICAgICAgICAgICAgPHRkPntpdGVtW2ZpZWxkLmtleV19PC90ZD4gICAgICAgICAgICB7L2xpc3R9ICAgICAgICA8L3RyPiAgICAgICAgey9saXN0fSAgICA8L3Rib2R5PjwvdGFibGU+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVGFibGVWaWV3IOihqOagvOinhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RhYmxlVmlldy5odG1sJyk7XG52YXIgXyA9IHJlcXVpcmUoJy4uL2Jhc2UvdXRpbC5qcycpO1xuXG4vKipcbiAqIEBjbGFzcyBUYWJsZVZpZXdcbiAqIEBleHRlbmQgU291cmNlQ29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEgICAgICAgICAgICAgICAgICAgIOe7keWumuWxnuaAp1xuICogQHBhcmFtIHtvYmplY3RbXT1bXX0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZSAgICAgICAgICAgICDmlbDmja7mupBcbiAqIEBwYXJhbSB7bnVtYmVyfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5pZCAgICAgICAg5q+P6aG555qEaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2VbXS5uYW1lICAgICAg5q+P6aG555qE5YaF5a65XG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuZmllbGQgICAgICAgICAgICAgIOWtl+autembhlxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmZpZWxkW10ua2V5ICAgICAgICDmr4/kuKrlrZfmrrXnmoRrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5maWVsZFtdLm5hbWUgICAgICAg5q+P5Liq5a2X5q615Zyo6KGo5aS05pi+56S655qE5paH5a2X77yM5aaC5p6c5rKh5pyJ5YiZ5pi+56S6a2V5XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuc3RyaXBlZCAgICAgICAgICAgIOaYr+WQpuaYvuekuuadoee6uVxuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmhvdmVyICAgICAgICAgICAgICDmmK/lkKbmr4/ooYzlnKhob3ZlcuaXtuaYvuekuuagt+W8j1xuICogQHBhcmFtIHtzdHJpbmc9Jyd9ICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLmNsYXNzICAgICAgICAgICAgICDooaXlhYVjbGFzc1xuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5zZXJ2aWNlICAgICAgICAgICAgICAgICDmlbDmja7mnI3liqFcbiAqL1xudmFyIFRhYmxlVmlldyA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICd0YWJsZVZpZXcnLFxuICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNvdXJjZTogW10sXG4gICAgICAgICAgICBmaWVsZHM6IFtdLFxuICAgICAgICAgICAgc3RyaXBlZDogZmFsc2UsXG4gICAgICAgICAgICBob3ZlcjogZmFsc2UsXG4gICAgICAgICAgICAvLyBUT0RPOiDmmoLkuI3ogIPomZHlpJrlrZfmrrXmjpLluo9cbiAgICAgICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgICAgICAgYnk6IG51bGwsXG4gICAgICAgICAgICAgICAgZGVzYzogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzb3J0KGZpZWxkKSDmjInnhafmn5DkuKrlrZfmrrXmjpLluo9cbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBmaWVsZCDmjpLluo/lrZfmrrVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHNvcnQ6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgIGlmKCFmaWVsZC5zb3J0YWJsZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgb3JkZXIgPSB0aGlzLmRhdGEub3JkZXI7XG5cbiAgICAgICAgaWYob3JkZXIuYnkgPT09IGZpZWxkLmtleSlcbiAgICAgICAgICAgIG9yZGVyLmRlc2MgPSAhb3JkZXIuZGVzYztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcmRlci5ieSA9IGZpZWxkLmtleTtcbiAgICAgICAgICAgIG9yZGVyLmRlc2MgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuc2VydmljZSlcbiAgICAgICAgICAgIHRoaXMuJHVwZGF0ZVNvdXJjZSgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zb3VyY2Uuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgaWYob3JkZXIuZGVzYylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFbb3JkZXIuYnldIDwgYltvcmRlci5ieV07XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVtvcmRlci5ieV0gPiBiW29yZGVyLmJ5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgc29ydCDmjInnhafmn5DkuKrlrZfmrrXmjpLluo/ml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IGZpZWxkIOaOkuW6j+Wtl+autVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc29ydCcsIHtcbiAgICAgICAgICAgIGZpZWxkOiBmaWVsZFxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUYWJsZVZpZXc7IiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRpbWVQaWNrZXIg5pel5pyf6YCJ5oupXG4gKiBAYXV0aG9yICAgc2Vuc2VuKHJhaW5mb3Jlc3Q5MkAxMjYuY29tKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxudmFyIFN1Z2dlc3QgPSByZXF1aXJlKCcuL3N1Z2dlc3QuanMnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFRpbWVQaWNrZXJcbiAqIEBleHRlbmQgU3VnZ2VzdFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS52YWx1ZSAgICAgICAgICAgICAg5paH5pys5qGG5Lit55qE5YC8XG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36L6T5YWlJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOaWh+acrOahhum7mOiupOaWh+Wtl1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLnJlYWRvbmx5ICAgICAgICAgICDmlofmnKzmoYbmmK/lkKblj6ror7tcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55So6K+l57uE5Lu2XG4gKiBAcGFyYW0ge3N0cmluZz0nJ30gICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuY2xhc3MgICAgICAgICAgICAgIOihpeWFhWNsYXNzXG4gKi9cbnZhciBUaW1lUGlja2VyID0gU3VnZ2VzdC5leHRlbmQoe1xuICAgIG5hbWU6ICd0aW1lUGlja2VyJyxcbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uZmlnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6ICcwJyArIGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaSA9IDEwOyBpIDwgMjQ7IGkrKykge1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjAwJ30pO1xuICAgICAgICAgICAgc291cmNlLnB1c2goe25hbWU6IGkgKyAnOjMwJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5leHRlbmQodGhpcy5kYXRhLCB7XG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCB2YWx1ZTogJycsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHBsYWNlaG9sZGVyOiAn6K+36L6T5YWlJyxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgbWluTGVuZ3RoOiAwLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBkZWxheTogMzAwLFxuICAgICAgICAgICAgbWF0Y2hUeXBlOiAnc3RhcnQnXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHN0cmljdDogZmFsc2UsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHJlYWRvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGltZVBpY2tlcjsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtZHJvcGRvd24gdS1kcm9wZG93bi1zZWxlY3RleCB7QChjbGFzcyl9XFxcIiByLWNsYXNzPXsge1xcJ3otZGlzXFwnOiBkaXNhYmxlZH0gfSByZWY9XFxcImVsZW1lbnRcXFwiPiAgICA8ZGl2IGNsYXNzPVxcXCJkcm9wZG93bl9oZFxcXCIgb24tY2xpY2s9e3RoaXMudG9nZ2xlKCFvcGVuKX0+ICAgICAgICA8aSBjbGFzcz1cXFwidS1pY29uIHUtaWNvbi1jYXJldC1kb3duXFxcIj48L2k+ICAgICAgICA8c3Bhbj57c2VsZWN0ZWQgPyBzZWxlY3RlZC5uYW1lIDogcGxhY2Vob2xkZXJ9PC9zcGFuPiAgICA8L2Rpdj4gICAgPGRpdiBjbGFzcz1cXFwiZHJvcGRvd25fYmRcXFwiIHItaGlkZT17IW9wZW59IHItYW5pbWF0aW9uPVxcXCJvbjogZW50ZXI7IGNsYXNzOiBhbmltYXRlZCBmYWRlSW5ZIGZhc3Q7IG9uOiBsZWF2ZTsgY2xhc3M6IGFuaW1hdGVkIGZhZGVPdXRZIGZhc3Q7XFxcIj4gICAgICAgIDx0cmVlVmlldyBzb3VyY2U9e3NvdXJjZX0gb24tc2VsZWN0PXt0aGlzLnNlbGVjdCgkZXZlbnQuc2VsZWN0ZWQpfSAvPiAgICA8L2Rpdj48L2Rpdj5cIiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUcmVlU2VsZWN0IOagkeWei+mAieaLqVxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNlbGVjdEV4ID0gcmVxdWlyZSgnLi9zZWxlY3RFeC5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90cmVlU2VsZWN0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG52YXIgVHJlZXZpZXcgPSByZXF1aXJlKCcuL3RyZWVWaWV3LmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFRyZWVTZWxlY3RcbiAqIEBleHRlbmQgU2VsZWN0RXhcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSAgICAgICAgICAgICAgICAgICAg57uR5a6a5bGe5oCnXG4gKiBAcGFyYW0ge29iamVjdFtdPVtdfSAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlICAgICAgICAgICAgIOaVsOaNrua6kFxuICogQHBhcmFtIHtudW1iZXJ9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLmlkICAgICAgICDmr4/pobnnmoRpZFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNvdXJjZVtdLm5hbWUgICAgICDmr4/pobnnmoTlhoXlrrlcbiAqIEBwYXJhbSB7b2JqZWN0PW51bGx9ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zZWxlY3RlZCAgICAgICAgICAg5b2T5YmN6YCJ5oup6aG5XG4gKiBAcGFyYW0ge3N0cmluZz0n6K+36YCJ5oupJ30gICAgICAgICBvcHRpb25zLmRhdGEucGxhY2Vob2xkZXIgICAgICAgIOm7mOiupOmhueeahOaWh+Wtl1xuICogQHBhcmFtIHtib29sZWFuPWZhbHNlfSAgICAgICAgICAgb3B0aW9ucy5kYXRhLmRpc2FibGVkICAgICAgICAgICDmmK/lkKbnpoHnlKjor6Xnu4Tku7ZcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBUcmVlU2VsZWN0ID0gU2VsZWN0RXguZXh0ZW5kKHtcbiAgICBuYW1lOiAndHJlZVNlbGVjdCcsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICAgICAgICAvLyBAaW5oZXJpdGVkIHBsYWNlaG9sZGVyOiAn6K+36YCJ5oupJyxcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZVNlbGVjdDsiLCJtb2R1bGUuZXhwb3J0cz1cIjxkaXYgY2xhc3M9XFxcInUtdHJlZXZpZXcge0AoY2xhc3MpfVxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0+ICAgIDx0cmVlVmlld0xpc3Qgc291cmNlPXtzb3VyY2V9IHZpc2libGU9e3RydWV9IC8+PC9kaXY+XCIiLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVHJlZVZpZXcgIOagkeWei+inhuWbvlxuICogQGF1dGhvciAgIHNlbnNlbihyYWluZm9yZXN0OTJAMTI2LmNvbSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNvdXJjZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2Jhc2Uvc291cmNlQ29tcG9uZW50LmpzJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RyZWVWaWV3Lmh0bWwnKTtcbnZhciBoaWVyYXJjaGljYWxUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdHJlZVZpZXdMaXN0Lmh0bWwnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vYmFzZS91dGlsLmpzJyk7XG5cbi8qKlxuICogQGNsYXNzIFRyZWVWaWV3XG4gKiBAZXh0ZW5kIFNvdXJjZUNvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhICAgICAgICAgICAgICAgICAgICDnu5HlrprlsZ7mgKdcbiAqIEBwYXJhbSB7b2JqZWN0W109W119ICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5zb3VyY2UgICAgICAgICAgICAg5pWw5o2u5rqQXG4gKiBAcGFyYW0ge251bWJlcn0gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10uaWQgICAgICAgIOavj+mhueeahGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGEuc291cmNlW10ubmFtZSAgICAgIOavj+mhueeahOWGheWuuVxuICogQHBhcmFtIHtvYmplY3Q9bnVsbH0gICAgICAgICAgICAgb3B0aW9ucy5kYXRhLnNlbGVjdGVkICAgICAgICAgICDlvZPliY3pgInmi6npoblcbiAqIEBwYXJhbSB7Ym9vbGVhbj1mYWxzZX0gICAgICAgICAgIG9wdGlvbnMuZGF0YS5kaXNhYmxlZCAgICAgICAgICAg5piv5ZCm56aB55So6K+l57uE5Lu2XG4gKiBAcGFyYW0ge2Jvb2xlYW49ZmFsc2V9ICAgICAgICAgICBvcHRpb25zLmRhdGEuaGllcmFyY2hpY2FsICAgICAgIOaYr+WQpuWIhue6p+WKqOaAgeWKoOi9ve+8jOmcgOimgXNlcnZpY2VcbiAqIEBwYXJhbSB7c3RyaW5nPScnfSAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YS5jbGFzcyAgICAgICAgICAgICAg6KGl5YWFY2xhc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2VydmljZSAgICAgICAgICAgICAgICAg5pWw5o2u5pyN5YqhXG4gKi9cbnZhciBUcmVlVmlldyA9IFNvdXJjZUNvbXBvbmVudC5leHRlbmQoe1xuICAgIG5hbWU6ICd0cmVlVmlldycsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfLmV4dGVuZCh0aGlzLmRhdGEsIHtcbiAgICAgICAgICAgIC8vIEBpbmhlcml0ZWQgc291cmNlOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgaGllcmFyY2hpY2FsOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdXByKCk7XG5cbiAgICAgICAgdGhpcy50cmVlcm9vdCA9IHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNlbGVjdChpdGVtKSDpgInmi6nmn5DkuIDpoblcbiAgICAgKiBAcHVibGljXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQgPSBpdGVtO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGV2ZW50IHNlbGVjdCDpgInmi6nmn5DkuIDpobnml7bop6blj5FcbiAgICAgICAgICogQHByb3BlcnR5IHtvYmplY3R9IHNlbGVjdGVkIOW9k+WJjemAieaLqemhuVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbnZhciBUcmVlVmlld0xpc3QgPSBTb3VyY2VDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBuYW1lOiAndHJlZVZpZXdMaXN0JyxcbiAgICB0ZW1wbGF0ZTogaGllcmFyY2hpY2FsVGVtcGxhdGUsXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbmZpZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIF8uZXh0ZW5kKHRoaXMuZGF0YSwge1xuICAgICAgICAgICAgLy8gQGluaGVyaXRlZCBzb3VyY2U6IFtdLFxuICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3VwcigpO1xuXG4gICAgICAgIHRoaXMudHJlZXJvb3QgPSB0aGlzLiRwYXJlbnQudHJlZXJvb3Q7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHRoaXMudHJlZXJvb3Quc2VydmljZTtcbiAgICAgICAgdGhpcy5kYXRhLml0ZW1UZW1wbGF0ZSA9IHRoaXMudHJlZXJvb3QuZGF0YS5pdGVtVGVtcGxhdGU7XG4gICAgICAgIHRoaXMuZGF0YS5oaWVyYXJjaGljYWwgPSB0aGlzLnRyZWVyb290LmRhdGEuaGllcmFyY2hpY2FsO1xuXG4gICAgICAgIHRoaXMuJHdhdGNoKCd2aXNpYmxlJywgZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmRhdGEuaGllcmFyY2hpY2FsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgaWYoIW5ld1ZhbHVlIHx8IHRoaXMuJHBhcmVudC5uYW1lICE9PSAndHJlZVZpZXdMaXN0JylcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuJHVwZGF0ZVNvdXJjZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaGllcmFyY2hpY2FsID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBnZXRQYXJhbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLmRhdGEucGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKHtwYXJlbnRJZDogdGhpcy5kYXRhLnBhcmVudC5pZH0sIHRoaXMudHJlZXJvb3QuZ2V0UGFyYW1zKCkpO1xuICAgIH0sXG4gICAgJHVwZGF0ZVNvdXJjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRMaXN0KHRoaXMuZ2V0UGFyYW1zKCksIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEuY29kZSAhPSAyMDAgJiYgIWRhdGEuc3VjY2VzcylcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQoZGF0YS5yZXN1bHQpO1xuXG4gICAgICAgICAgICAvLyDnu5nmr4/kuKroioLngrlpdGVt5re75YqgcGFyZW50XG4gICAgICAgICAgICBkYXRhLnJlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMuZGF0YS5wYXJlbnQ7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLiR1cGRhdGUoJ3NvdXJjZScsIGRhdGEucmVzdWx0KTtcblxuICAgICAgICAgICAgdGhpcy4kZW1pdCgndXBkYXRlU291cmNlJywge1xuICAgICAgICAgICAgICAgIHJlc3VsdDogZGF0YS5yZXN1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2VsZWN0KGl0ZW0pIOmAieaLqeafkOS4gOmhuVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOmAieaLqemhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMudHJlZXJvb3QuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLnRyZWVyb290LnNlbGVjdChpdGVtKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdG9nZ2xlKGl0ZW0pIOWxleW8gOaIluaUtui1t+afkOS4gOmhuVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIOWxleW8gOaUtui1t+mhuVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKHRoaXMudHJlZXJvb3QuZGF0YS5kaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpdGVtLm9wZW4gPSAhaXRlbS5vcGVuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZXZlbnQgdG9nZ2xlIOWxleW8gOaIluaUtui1t+afkOS4gOmhueaXtuinpuWPkVxuICAgICAgICAgKiBAcHJvcGVydHkge29iamVjdH0gaXRlbSDlsZXlvIDmlLbotbfpoblcbiAgICAgICAgICogQHByb3BlcnR5IHtib29sZWFufSBvcGVuIOWxleW8gOi/mOaYr+aUtui1t1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50cmVlcm9vdC4kZW1pdCgndG9nZ2xlJywge1xuICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgIG9wZW46IGl0ZW0ub3BlblxuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmVlVmlldzsiLCJtb2R1bGUuZXhwb3J0cz1cIjx1bCBjbGFzcz1cXFwidHJlZXZpZXdfbGlzdFxcXCIgci1jbGFzcz17IHtcXCd6LWRpc1xcJzogZGlzYWJsZWR9IH0gci1oaWRlPXshdmlzaWJsZX0+ICAgIHsjbGlzdCBzb3VyY2UgYXMgaXRlbX0gICAgPGxpPiAgICAgICAgPGRpdiBjbGFzcz1cXFwidHJlZXZpZXdfaXRlbVxcXCI+ICAgICAgICAgICAgeyNpZiBpdGVtLmNoaWxkcmVuQ291bnQgfHwgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGgpfSAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJ1LWljb25cXFwiIHItY2xhc3M9eyB7XFwndS1pY29uLWNhcmV0LXJpZ2h0XFwnOiAhaXRlbS5vcGVuLCBcXCd1LWljb24tY2FyZXQtZG93blxcJzogaXRlbS5vcGVufX0gb24tY2xpY2s9e3RoaXMudG9nZ2xlKGl0ZW0pfT48L2k+ICAgICAgICAgICAgey9pZn0gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0cmVldmlld19pdGVtbmFtZVxcXCIgci1jbGFzcz17IHtcXCd6LXNlbFxcJzogdGhpcy50cmVlcm9vdC5kYXRhLnNlbGVjdGVkID09PSBpdGVtfSB9IG9uLWNsaWNrPXt0aGlzLnNlbGVjdChpdGVtKX0+eyNpZiBAKGl0ZW1UZW1wbGF0ZSl9eyNpbmNsdWRlIEAoaXRlbVRlbXBsYXRlKX17I2Vsc2V9e2l0ZW0ubmFtZX17L2lmfTwvZGl2PiAgICAgICAgPC9kaXY+ICAgICAgICB7I2lmIGl0ZW0uY2hpbGRyZW5Db3VudCB8fCAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCl9PHRyZWVWaWV3TGlzdCBzb3VyY2U9e2l0ZW0uY2hpbGRyZW59IHZpc2libGU9e2l0ZW0ub3Blbn0gcGFyZW50PXtpdGVtfSAvPnsvaWZ9ICAgIDwvbGk+ICAgIHsvbGlzdH08L3VsPlwiIl19
