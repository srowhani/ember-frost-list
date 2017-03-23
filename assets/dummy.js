"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'dummy/config/environment', 'ember-load-initializers', 'dummy/resolver'], function (exports, _ember, _dummyConfigEnvironment, _emberLoadInitializers, _dummyResolver) {
  var Application = _ember['default'].Application;

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Application.extend({
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix,
    Resolver: _dummyResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _dummyConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('dummy/components/async-image', ['exports', 'ember-async-image/components/async-image'], function (exports, _emberAsyncImageComponentsAsyncImage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAsyncImageComponentsAsyncImage['default'];
    }
  });
});
define("dummy/components/code-snippet", ["exports", "ember", "dummy/snippets"], function (exports, _ember, _dummySnippets) {

  /* global require */
  var Highlight = require('highlight.js');

  exports["default"] = _ember["default"].Component.extend({
    tagName: 'pre',
    classNameBindings: ['language'],
    unindent: true,

    _unindent: function _unindent(src) {
      if (!this.get('unindent')) {
        return src;
      }
      var match,
          min,
          lines = src.split("\n");
      for (var i = 0; i < lines.length; i++) {
        match = /^\s*/.exec(lines[i]);
        if (match && (typeof min === 'undefined' || min > match[0].length)) {
          min = match[0].length;
        }
      }
      if (typeof min !== 'undefined' && min > 0) {
        src = src.replace(new RegExp("(\\n|^)\\s{" + min + "}", 'g'), "$1");
      }
      return src;
    },

    source: _ember["default"].computed('name', function () {
      return this._unindent((_dummySnippets["default"][this.get('name')] || "").replace(/^(\s*\n)*/, '').replace(/\s*$/, ''));
    }),

    didInsertElement: function didInsertElement() {
      Highlight.highlightBlock(this.get('element'));
    },

    language: _ember["default"].computed('name', function () {
      var m = /\.(\w+)$/i.exec(this.get('name'));
      if (m) {
        switch (m[1].toLowerCase()) {
          case 'js':
            return 'javascript';
          case 'coffee':
            return 'coffeescript';
          case 'hbs':
            return 'htmlbars';
          case 'css':
            return 'css';
          case 'scss':
            return 'scss';
          case 'less':
            return 'less';
          case 'emblem':
            return 'emblem';
          case 'ts':
            return 'typescript';
        }
      }
    })
  });
});
define('dummy/components/custom-sort', ['exports', 'ember-frost-core', 'dummy/templates/components/custom-sort'], function (exports, _emberFrostCore, _dummyTemplatesComponentsCustomSort) {
  exports['default'] = _emberFrostCore.Component.extend({
    layout: _dummyTemplatesComponentsCustomSort['default']
  });
});
define('dummy/components/from-elsewhere', ['exports', 'ember-elsewhere/components/from-elsewhere'], function (exports, _emberElsewhereComponentsFromElsewhere) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberElsewhereComponentsFromElsewhere['default'];
    }
  });
});
define('dummy/components/frost-button', ['exports', 'ember-frost-core/components/frost-button'], function (exports, _emberFrostCoreComponentsFrostButton) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostButton['default'];
    }
  });
});
define('dummy/components/frost-checkbox', ['exports', 'ember-frost-core/components/frost-checkbox'], function (exports, _emberFrostCoreComponentsFrostCheckbox) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostCheckbox['default'];
    }
  });
});
define('dummy/components/frost-combobox', ['exports', 'ember-frost-core/components/frost-combobox'], function (exports, _emberFrostCoreComponentsFrostCombobox) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostCombobox['default'];
    }
  });
});
define('dummy/components/frost-icon', ['exports', 'ember-frost-core/components/frost-icon'], function (exports, _emberFrostCoreComponentsFrostIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostIcon['default'];
    }
  });
});
define('dummy/components/frost-link', ['exports', 'ember-frost-core/components/frost-link'], function (exports, _emberFrostCoreComponentsFrostLink) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostLink['default'];
    }
  });
});
define('dummy/components/frost-list-content-container', ['exports', 'ember-frost-list/components/frost-list-content-container'], function (exports, _emberFrostListComponentsFrostListContentContainer) {
  /**
   * Simple re-export of frost-list-content-container in the app namespace
   */
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListComponentsFrostListContentContainer['default'];
    }
  });
});
define('dummy/components/frost-list-expansion', ['exports', 'ember-frost-list/components/frost-list-expansion'], function (exports, _emberFrostListComponentsFrostListExpansion) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListComponentsFrostListExpansion['default'];
    }
  });
});
define('dummy/components/frost-list-item-expansion', ['exports', 'ember-frost-list/components/frost-list-item-expansion'], function (exports, _emberFrostListComponentsFrostListItemExpansion) {
  /**
   * Simple re-export of frost-list-item-expansion in the app namespace
   */
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListComponentsFrostListItemExpansion['default'];
    }
  });
});
define('dummy/components/frost-list-item-selection', ['exports', 'ember-frost-list/components/frost-list-item-selection'], function (exports, _emberFrostListComponentsFrostListItemSelection) {
  /**
   * Simple re-export of frost-list-item-selection in the app namespace
   */
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListComponentsFrostListItemSelection['default'];
    }
  });
});
define('dummy/components/frost-list-item', ['exports', 'ember-frost-list/components/frost-list-item'], function (exports, _emberFrostListComponentsFrostListItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListComponentsFrostListItem['default'];
    }
  });
});
define('dummy/components/frost-list-pagination', ['exports', 'ember-frost-list/components/frost-list-pagination'], function (exports, _emberFrostListComponentsFrostListPagination) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListComponentsFrostListPagination['default'];
    }
  });
});
define('dummy/components/frost-list', ['exports', 'ember-frost-list/components/frost-list'], function (exports, _emberFrostListComponentsFrostList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListComponentsFrostList['default'];
    }
  });
});
define('dummy/components/frost-loading', ['exports', 'ember-frost-core/components/frost-loading'], function (exports, _emberFrostCoreComponentsFrostLoading) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostLoading['default'];
    }
  });
});
define('dummy/components/frost-multi-select', ['exports', 'ember-frost-core/components/frost-multi-select'], function (exports, _emberFrostCoreComponentsFrostMultiSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostMultiSelect['default'];
    }
  });
});
define('dummy/components/frost-password', ['exports', 'ember-frost-core/components/frost-password'], function (exports, _emberFrostCoreComponentsFrostPassword) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostPassword['default'];
    }
  });
});
define('dummy/components/frost-radio-button', ['exports', 'ember-frost-core/components/frost-radio-button'], function (exports, _emberFrostCoreComponentsFrostRadioButton) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostRadioButton['default'];
    }
  });
});
define('dummy/components/frost-radio-group', ['exports', 'ember-frost-core/components/frost-radio-group'], function (exports, _emberFrostCoreComponentsFrostRadioGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostRadioGroup['default'];
    }
  });
});
define('dummy/components/frost-scroll', ['exports', 'ember-frost-core/components/frost-scroll'], function (exports, _emberFrostCoreComponentsFrostScroll) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostScroll['default'];
    }
  });
});
define('dummy/components/frost-select-dropdown', ['exports', 'ember-frost-core/components/frost-select-dropdown'], function (exports, _emberFrostCoreComponentsFrostSelectDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostSelectDropdown['default'];
    }
  });
});
define('dummy/components/frost-select-outlet', ['exports', 'ember-frost-core/components/frost-select-outlet'], function (exports, _emberFrostCoreComponentsFrostSelectOutlet) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostSelectOutlet['default'];
    }
  });
});
define('dummy/components/frost-select', ['exports', 'ember-frost-core/components/frost-select'], function (exports, _emberFrostCoreComponentsFrostSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostSelect['default'];
    }
  });
});
define('dummy/components/frost-sort-item', ['exports', 'ember-frost-sort/components/frost-sort-item'], function (exports, _emberFrostSortComponentsFrostSortItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostSortComponentsFrostSortItem['default'];
    }
  });
});
define('dummy/components/frost-sort', ['exports', 'ember-frost-sort/components/frost-sort'], function (exports, _emberFrostSortComponentsFrostSort) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostSortComponentsFrostSort['default'];
    }
  });
});
define('dummy/components/frost-text', ['exports', 'ember-frost-core/components/frost-text'], function (exports, _emberFrostCoreComponentsFrostText) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostText['default'];
    }
  });
});
define('dummy/components/frost-textarea', ['exports', 'ember-frost-core/components/frost-textarea'], function (exports, _emberFrostCoreComponentsFrostTextarea) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostTextarea['default'];
    }
  });
});
define('dummy/components/frost-toggle', ['exports', 'ember-frost-core/components/frost-toggle'], function (exports, _emberFrostCoreComponentsFrostToggle) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsFrostToggle['default'];
    }
  });
});
define('dummy/components/hookable-input', ['exports', 'ember-frost-core/components/hookable-input'], function (exports, _emberFrostCoreComponentsHookableInput) {
  /**
   * Simple re-export of hookable-input in the app namespace
   */
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsHookableInput['default'];
    }
  });
});
define('dummy/components/hookable-textarea', ['exports', 'ember-frost-core/components/hookable-textarea'], function (exports, _emberFrostCoreComponentsHookableTextarea) {
  /**
   * Simple re-export of hookable-textarea in the app namespace
   */
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreComponentsHookableTextarea['default'];
    }
  });
});
define('dummy/components/notification-container', ['exports', 'ember-cli-notifications/components/notification-container'], function (exports, _emberCliNotificationsComponentsNotificationContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliNotificationsComponentsNotificationContainer['default'];
    }
  });
});
define('dummy/components/notification-message', ['exports', 'ember-cli-notifications/components/notification-message', 'dummy/config/environment'], function (exports, _emberCliNotificationsComponentsNotificationMessage, _dummyConfigEnvironment) {

  var config = _dummyConfigEnvironment['default']['ember-cli-notifications'] || {};

  exports['default'] = _emberCliNotificationsComponentsNotificationMessage['default'].extend({
    icons: config.icons || 'font-awesome'
  });
});
define('dummy/components/to-elsewhere', ['exports', 'ember-elsewhere/components/to-elsewhere'], function (exports, _emberElsewhereComponentsToElsewhere) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberElsewhereComponentsToElsewhere['default'];
    }
  });
});
define('dummy/components/vertical-collection', ['exports', 'vertical-collection/components/vertical-collection/component'], function (exports, _verticalCollectionComponentsVerticalCollectionComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _verticalCollectionComponentsVerticalCollectionComponent['default'];
    }
  });
});
define('dummy/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('dummy/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('dummy/helpers/abs', ['exports', 'ember-math-helpers/helpers/abs'], function (exports, _emberMathHelpersHelpersAbs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAbs['default'];
    }
  });
  Object.defineProperty(exports, 'abs', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAbs.abs;
    }
  });
});
define('dummy/helpers/acos', ['exports', 'ember-math-helpers/helpers/acos'], function (exports, _emberMathHelpersHelpersAcos) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAcos['default'];
    }
  });
  Object.defineProperty(exports, 'acos', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAcos.acos;
    }
  });
});
define('dummy/helpers/acosh', ['exports', 'ember-math-helpers/helpers/acosh'], function (exports, _emberMathHelpersHelpersAcosh) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAcosh['default'];
    }
  });
  Object.defineProperty(exports, 'acosh', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAcosh.acosh;
    }
  });
});
define('dummy/helpers/add', ['exports', 'ember-math-helpers/helpers/add'], function (exports, _emberMathHelpersHelpersAdd) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAdd['default'];
    }
  });
  Object.defineProperty(exports, 'add', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAdd.add;
    }
  });
});
define('dummy/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/app-version', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _dummyConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('dummy/helpers/array', ['exports', 'ember-frost-core/helpers/array'], function (exports, _emberFrostCoreHelpersArray) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreHelpersArray['default'];
    }
  });
  Object.defineProperty(exports, 'array', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreHelpersArray.array;
    }
  });
});
define('dummy/helpers/asin', ['exports', 'ember-math-helpers/helpers/asin'], function (exports, _emberMathHelpersHelpersAsin) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAsin['default'];
    }
  });
  Object.defineProperty(exports, 'asin', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAsin.asin;
    }
  });
});
define('dummy/helpers/asinh', ['exports', 'ember-math-helpers/helpers/asinh'], function (exports, _emberMathHelpersHelpersAsinh) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAsinh['default'];
    }
  });
  Object.defineProperty(exports, 'asinh', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAsinh.asinh;
    }
  });
});
define('dummy/helpers/atan', ['exports', 'ember-math-helpers/helpers/atan'], function (exports, _emberMathHelpersHelpersAtan) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAtan['default'];
    }
  });
  Object.defineProperty(exports, 'atan', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAtan.atan;
    }
  });
});
define('dummy/helpers/atan2', ['exports', 'ember-math-helpers/helpers/atan2'], function (exports, _emberMathHelpersHelpersAtan2) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAtan2['default'];
    }
  });
  Object.defineProperty(exports, 'atan2', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAtan2.atan2;
    }
  });
});
define('dummy/helpers/atanh', ['exports', 'ember-math-helpers/helpers/atanh'], function (exports, _emberMathHelpersHelpersAtanh) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAtanh['default'];
    }
  });
  Object.defineProperty(exports, 'atanh', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersAtanh.atanh;
    }
  });
});
define('dummy/helpers/cancel-all', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _emberConcurrencyHelpers) {
  exports.cancelHelper = cancelHelper;

  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      _ember['default'].assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _emberConcurrencyHelpers.taskHelperClosure)('cancelAll', args);
  }

  exports['default'] = _ember['default'].Helper.helper(cancelHelper);
});
define('dummy/helpers/cbrt', ['exports', 'ember-math-helpers/helpers/cbrt'], function (exports, _emberMathHelpersHelpersCbrt) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCbrt['default'];
    }
  });
  Object.defineProperty(exports, 'cbrt', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCbrt.cbrt;
    }
  });
});
define('dummy/helpers/ceil', ['exports', 'ember-math-helpers/helpers/ceil'], function (exports, _emberMathHelpersHelpersCeil) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCeil['default'];
    }
  });
  Object.defineProperty(exports, 'ceil', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCeil.ceil;
    }
  });
});
define('dummy/helpers/clz32', ['exports', 'ember-math-helpers/helpers/clz32'], function (exports, _emberMathHelpersHelpersClz32) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersClz32['default'];
    }
  });
  Object.defineProperty(exports, 'clz32', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersClz32.clz32;
    }
  });
});
define('dummy/helpers/cos', ['exports', 'ember-math-helpers/helpers/cos'], function (exports, _emberMathHelpersHelpersCos) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCos['default'];
    }
  });
  Object.defineProperty(exports, 'cos', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCos.cos;
    }
  });
});
define('dummy/helpers/cosh', ['exports', 'ember-math-helpers/helpers/cosh'], function (exports, _emberMathHelpersHelpersCosh) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCosh['default'];
    }
  });
  Object.defineProperty(exports, 'cosh', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersCosh.cosh;
    }
  });
});
define('dummy/helpers/div', ['exports', 'ember-math-helpers/helpers/div'], function (exports, _emberMathHelpersHelpersDiv) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersDiv['default'];
    }
  });
  Object.defineProperty(exports, 'div', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersDiv.div;
    }
  });
});
define('dummy/helpers/ehook', ['exports', 'ember-frost-core/helpers/ehook'], function (exports, _emberFrostCoreHelpersEhook) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreHelpersEhook['default'];
    }
  });
  Object.defineProperty(exports, 'ehook', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreHelpersEhook.ehook;
    }
  });
});
define('dummy/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/exp', ['exports', 'ember-math-helpers/helpers/exp'], function (exports, _emberMathHelpersHelpersExp) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersExp['default'];
    }
  });
  Object.defineProperty(exports, 'exp', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersExp.exp;
    }
  });
});
define('dummy/helpers/expm1', ['exports', 'ember-math-helpers/helpers/expm1'], function (exports, _emberMathHelpersHelpersExpm1) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersExpm1['default'];
    }
  });
  Object.defineProperty(exports, 'expm1', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersExpm1.expm1;
    }
  });
});
define('dummy/helpers/extend', ['exports', 'ember-frost-core/helpers/extend'], function (exports, _emberFrostCoreHelpersExtend) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreHelpersExtend['default'];
    }
  });
  Object.defineProperty(exports, 'extend', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreHelpersExtend.extend;
    }
  });
});
define('dummy/helpers/floor', ['exports', 'ember-math-helpers/helpers/floor'], function (exports, _emberMathHelpersHelpersFloor) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersFloor['default'];
    }
  });
  Object.defineProperty(exports, 'floor', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersFloor.floor;
    }
  });
});
define('dummy/helpers/fround', ['exports', 'ember-math-helpers/helpers/fround'], function (exports, _emberMathHelpersHelpersFround) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersFround['default'];
    }
  });
  Object.defineProperty(exports, 'fround', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersFround.fround;
    }
  });
});
define('dummy/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/hook', ['exports', 'ember-hook/helpers/hook'], function (exports, _emberHookHelpersHook) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberHookHelpersHook['default'];
    }
  });
  Object.defineProperty(exports, 'hook', {
    enumerable: true,
    get: function get() {
      return _emberHookHelpersHook.hook;
    }
  });
});
define('dummy/helpers/hypot', ['exports', 'ember-math-helpers/helpers/hypot'], function (exports, _emberMathHelpersHelpersHypot) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersHypot['default'];
    }
  });
  Object.defineProperty(exports, 'hypot', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersHypot.hypot;
    }
  });
});
define('dummy/helpers/imul', ['exports', 'ember-math-helpers/helpers/imul'], function (exports, _emberMathHelpersHelpersImul) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersImul['default'];
    }
  });
  Object.defineProperty(exports, 'imul', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersImul.imul;
    }
  });
});
define('dummy/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _emberTruthHelpersHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual.isEqual;
    }
  });
});
define('dummy/helpers/is-lead-selection', ['exports', 'ember-frost-list/helpers/is-lead-selection'], function (exports, _emberFrostListHelpersIsLeadSelection) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListHelpersIsLeadSelection['default'];
    }
  });
  Object.defineProperty(exports, 'isLeadSelection', {
    enumerable: true,
    get: function get() {
      return _emberFrostListHelpersIsLeadSelection.isLeadSelection;
    }
  });
});
define('dummy/helpers/local-class', ['exports', 'ember-css-modules/helpers/local-class'], function (exports, _emberCssModulesHelpersLocalClass) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssModulesHelpersLocalClass['default'];
    }
  });
  Object.defineProperty(exports, 'localClass', {
    enumerable: true,
    get: function get() {
      return _emberCssModulesHelpersLocalClass.localClass;
    }
  });
});
define('dummy/helpers/log-e', ['exports', 'ember-math-helpers/helpers/log-e'], function (exports, _emberMathHelpersHelpersLogE) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersLogE['default'];
    }
  });
  Object.defineProperty(exports, 'logE', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersLogE.logE;
    }
  });
});
define('dummy/helpers/log10', ['exports', 'ember-math-helpers/helpers/log10'], function (exports, _emberMathHelpersHelpersLog10) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersLog10['default'];
    }
  });
  Object.defineProperty(exports, 'log10', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersLog10.log10;
    }
  });
});
define('dummy/helpers/log1p', ['exports', 'ember-math-helpers/helpers/log1p'], function (exports, _emberMathHelpersHelpersLog1p) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersLog1p['default'];
    }
  });
  Object.defineProperty(exports, 'log1p', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersLog1p.log1p;
    }
  });
});
define('dummy/helpers/log2', ['exports', 'ember-math-helpers/helpers/log2'], function (exports, _emberMathHelpersHelpersLog2) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersLog2['default'];
    }
  });
  Object.defineProperty(exports, 'log2', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersLog2.log2;
    }
  });
});
define('dummy/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/max', ['exports', 'ember-math-helpers/helpers/max'], function (exports, _emberMathHelpersHelpersMax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMax['default'];
    }
  });
  Object.defineProperty(exports, 'max', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMax.max;
    }
  });
});
define('dummy/helpers/min', ['exports', 'ember-math-helpers/helpers/min'], function (exports, _emberMathHelpersHelpersMin) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMin['default'];
    }
  });
  Object.defineProperty(exports, 'min', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMin.min;
    }
  });
});
define('dummy/helpers/mod', ['exports', 'ember-math-helpers/helpers/mod'], function (exports, _emberMathHelpersHelpersMod) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMod['default'];
    }
  });
  Object.defineProperty(exports, 'mod', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMod.mod;
    }
  });
});
define('dummy/helpers/mult', ['exports', 'ember-math-helpers/helpers/mult'], function (exports, _emberMathHelpersHelpersMult) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMult['default'];
    }
  });
  Object.defineProperty(exports, 'mult', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersMult.mult;
    }
  });
});
define('dummy/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('dummy/helpers/perform', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _emberConcurrencyHelpers) {
  exports.performHelper = performHelper;

  function performHelper(args, hash) {
    return (0, _emberConcurrencyHelpers.taskHelperClosure)('perform', args, hash);
  }

  exports['default'] = _ember['default'].Helper.helper(performHelper);
});
define('dummy/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('dummy/helpers/pow', ['exports', 'ember-math-helpers/helpers/pow'], function (exports, _emberMathHelpersHelpersPow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersPow['default'];
    }
  });
  Object.defineProperty(exports, 'pow', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersPow.pow;
    }
  });
});
define('dummy/helpers/random', ['exports', 'ember-math-helpers/helpers/random'], function (exports, _emberMathHelpersHelpersRandom) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersRandom['default'];
    }
  });
  Object.defineProperty(exports, 'random', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersRandom.random;
    }
  });
});
define('dummy/helpers/round', ['exports', 'ember-math-helpers/helpers/round'], function (exports, _emberMathHelpersHelpersRound) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersRound['default'];
    }
  });
  Object.defineProperty(exports, 'round', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersRound.round;
    }
  });
});
define('dummy/helpers/sign', ['exports', 'ember-math-helpers/helpers/sign'], function (exports, _emberMathHelpersHelpersSign) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSign['default'];
    }
  });
  Object.defineProperty(exports, 'sign', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSign.sign;
    }
  });
});
define('dummy/helpers/sin', ['exports', 'ember-math-helpers/helpers/sin'], function (exports, _emberMathHelpersHelpersSin) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSin['default'];
    }
  });
  Object.defineProperty(exports, 'sin', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSin.sin;
    }
  });
});
define('dummy/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('dummy/helpers/sqrt', ['exports', 'ember-math-helpers/helpers/sqrt'], function (exports, _emberMathHelpersHelpersSqrt) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSqrt['default'];
    }
  });
  Object.defineProperty(exports, 'sqrt', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSqrt.sqrt;
    }
  });
});
define('dummy/helpers/sub', ['exports', 'ember-math-helpers/helpers/sub'], function (exports, _emberMathHelpersHelpersSub) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSub['default'];
    }
  });
  Object.defineProperty(exports, 'sub', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersSub.sub;
    }
  });
});
define('dummy/helpers/tan', ['exports', 'ember-math-helpers/helpers/tan'], function (exports, _emberMathHelpersHelpersTan) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersTan['default'];
    }
  });
  Object.defineProperty(exports, 'tan', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersTan.tan;
    }
  });
});
define('dummy/helpers/tanh', ['exports', 'ember-math-helpers/helpers/tanh'], function (exports, _emberMathHelpersHelpersTanh) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersTanh['default'];
    }
  });
  Object.defineProperty(exports, 'tanh', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersTanh.tanh;
    }
  });
});
define('dummy/helpers/task', ['exports', 'ember'], function (exports, _ember) {
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref);

    var task = _ref2[0];

    var args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports['default'] = _ember['default'].Helper.helper(taskHelper);
});
define('dummy/helpers/trunc', ['exports', 'ember-math-helpers/helpers/trunc'], function (exports, _emberMathHelpersHelpersTrunc) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersTrunc['default'];
    }
  });
  Object.defineProperty(exports, 'trunc', {
    enumerable: true,
    get: function get() {
      return _emberMathHelpersHelpersTrunc.trunc;
    }
  });
});
define('dummy/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('dummy/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'dummy/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _dummyConfigEnvironment) {
  var _config$APP = _dummyConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('dummy/initializers/component-prop-types', ['exports', 'ember-prop-types/initializers/component-prop-types'], function (exports, _emberPropTypesInitializersComponentPropTypes) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPropTypesInitializersComponentPropTypes['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberPropTypesInitializersComponentPropTypes.initialize;
    }
  });
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('dummy/initializers/debug', ['exports', 'vertical-collection/-debug'], function (exports, _verticalCollectionDebug) {
  exports['default'] = {
    name: 'vertical-collection-debug',
    initialize: function initialize() {}
  };
});
define('dummy/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  exports['default'] = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
// This initializer exists only to make sure that the following
// imports happen before the app boots.
define('dummy/initializers/ember-css-modules', ['exports', 'ember-css-modules/initializers/ember-css-modules'], function (exports, _emberCssModulesInitializersEmberCssModules) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssModulesInitializersEmberCssModules['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberCssModulesInitializersEmberCssModules.initialize;
    }
  });
});
define('dummy/initializers/ember-data-factory-guy', ['exports', 'ember-data-factory-guy/utils/manual-setup'], function (exports, _emberDataFactoryGuyUtilsManualSetup) {
  exports['default'] = {
    name: 'ember-data-factory-guy',
    after: 'ember-data',

    initialize: function initialize(application) {
      if (arguments.length > 1) {
        application = arguments[1];
      }
      var container = application.__container__;
      (0, _emberDataFactoryGuyUtilsManualSetup['default'])(container);
    }
  };
});
define('dummy/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('dummy/initializers/ember-hook/initialize', ['exports', 'ember-hook/initializers/ember-hook/initialize'], function (exports, _emberHookInitializersEmberHookInitialize) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberHookInitializersEmberHookInitialize['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberHookInitializersEmberHookInitialize.initialize;
    }
  });
});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_dummyConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _dummyConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_dummyConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('dummy/initializers/notifications', ['exports', 'ember', 'ember-cli-notifications/services/notification-messages-service'], function (exports, _ember, _emberCliNotificationsServicesNotificationMessagesService) {
    exports['default'] = {
        name: 'notification-messages-service',

        initialize: function initialize() {
            var application = arguments[1] || arguments[0];
            if (_ember['default'].Service) {
                application.register('service:notification-messages', _emberCliNotificationsServicesNotificationMessagesService['default']);
                application.inject('component:notification-container', 'notifications', 'service:notification-messages');
                application.inject('component:notification-message', 'notifications', 'service:notification-messages');
                return;
            }
            application.register('notification-messages:service', _emberCliNotificationsServicesNotificationMessagesService['default']);

            ['controller', 'component', 'route', 'router', 'service'].forEach(function (injectionTarget) {
                application.inject(injectionTarget, 'notifications', 'notification-messages:service');
            });
        }
    };
});
define('dummy/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('dummy/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('dummy/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("dummy/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('dummy/instance-initializers/svg-use-polyfill', ['exports', 'ember-frost-core/instance-initializers/svg-use-polyfill'], function (exports, _emberFrostCoreInstanceInitializersSvgUsePolyfill) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreInstanceInitializersSvgUsePolyfill['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreInstanceInitializersSvgUsePolyfill.initialize;
    }
  });
});
define('dummy/mirage-models/link', ['exports', 'ember-frost-core/mirage-models/link'], function (exports, _emberFrostCoreMirageModelsLink) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreMirageModelsLink['default'];
    }
  });
});
define('dummy/models/list-item', ['exports', 'ember-data'], function (exports, _emberData) {

  var Model = _emberData['default'].Model.extend({
    label: _emberData['default'].attr('string')
  });

  exports['default'] = Model;
});
define("dummy/pods/application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "oP0euCLL", "block": "{\"statements\":[[\"append\",[\"helper\",[\"frost-select-outlet\"],null,[[\"hook\"],[\"demo-select-outlet\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"notification-container\"],null,[[\"position\"],[\"top-right\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"frost-modal-demo\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"frost-modal-demos\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"frost-modal-demo-title\"],[\"flush-element\"],[\"text\",\"\\n      Demos\\n    \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"frost-scroll\"],null,[[\"class\",\"hook\"],[\"frost-modal-demo-selectors\",\"demo-navigation-scroll\"]],3],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"frost-modal-demo-example\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Paged\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Infinite\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Basic\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"frost-modal-demo-selector-title\"],[\"flush-element\"],[\"text\",\"\\n        Cookbook\\n        \"],[\"block\",[\"link-to\"],[\"simple\"],null,2],[\"text\",\"\\n        \"],[\"block\",[\"link-to\"],[\"infinite\"],null,1],[\"text\",\"\\n        \"],[\"block\",[\"link-to\"],[\"paged\"],null,0],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "dummy/pods/application/template.hbs" } });
});
define('dummy/pods/components/list-item-expansion/component', ['exports', 'ember-frost-list/components/frost-list-item'], function (exports, _emberFrostListComponentsFrostListItem) {
  exports['default'] = _emberFrostListComponentsFrostListItem['default'].extend({});
});
define("dummy/pods/components/list-item-expansion/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "U7uuBcBN", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"frost-list-item-element-block \",[\"unknown\",[\"css\"]],\"-placeholder\"]]],[\"flush-element\"],[\"text\",\"\\n  Placeholder - expansion\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/pods/components/list-item-expansion/template.hbs" } });
});
define('dummy/pods/components/list-item/component', ['exports', 'ember-frost-list/components/frost-list-item'], function (exports, _emberFrostListComponentsFrostListItem) {
  exports['default'] = _emberFrostListComponentsFrostListItem['default'].extend({});
});
define("dummy/pods/components/list-item/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "37k7dSSt", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"frost-list-item-element-block \",[\"unknown\",[\"css\"]],\"-placeholder\"]]],[\"flush-element\"],[\"text\",\"\\n  Placeholder - \"],[\"append\",[\"unknown\",[\"model\",\"label\"]],false],[\"text\",\" - \"],[\"append\",[\"unknown\",[\"model\",\"id\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/pods/components/list-item/template.hbs" } });
});
define('dummy/pods/infinite/controller', ['exports', 'ember', 'ember-computed-decorators', 'ember-frost-sort'], function (exports, _ember, _emberComputedDecorators, _emberFrostSort) {
  function _createDecoratedObject(descriptors) { var target = {}; for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = true; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } } if (descriptor.initializer) { descriptor.value = descriptor.initializer.call(target); } Object.defineProperty(target, key, descriptor); } return target; }

  var A = _ember['default'].A;
  var Controller = _ember['default'].Controller;
  var inject = _ember['default'].inject;
  var isEmpty = _ember['default'].isEmpty;
  exports['default'] = Controller.extend(_createDecoratedObject([{
    key: 'notifications',

    // == Dependencies ==========================================================

    initializer: function initializer() {
      return inject.service('notification-messages');
    }
  }, {
    key: 'debug',

    // == Properties ============================================================
    initializer: function initializer() {
      return false;
    }
  }, {
    key: 'expandedItems',
    initializer: function initializer() {
      return A([]);
    }
  }, {
    key: 'itemsPerPage',
    initializer: function initializer() {
      return 100;
    }
  }, {
    key: 'lastPage',
    initializer: function initializer() {
      return 0;
    }
  }, {
    key: 'selectedItems',
    initializer: function initializer() {
      return A([]);
    }
  }, {
    key: 'sortOrder',
    initializer: function initializer() {
      return A(['id']);
    }
  }, {
    key: 'sortingProperties',
    initializer: function initializer() {
      return [{ label: 'Id', value: 'id' }, { label: 'Label', value: 'label' }];
    }
  }, {
    key: 'items',
    decorators: [(0, _emberComputedDecorators['default'])('model.[]', 'sortOrder.[]'), _emberComputedDecorators.readOnly],
    value: function items(model, sortOrder) {
      if (isEmpty(model)) {
        return [];
      }
      return (0, _emberFrostSort.sort)(model, sortOrder); // Client side sorting
    }
  }, {
    key: 'fetchPage',

    // == Functions =============================================================

    value: function fetchPage(page) {
      var _this = this;

      this.get('notifications').success('Fetching page ' + page, {
        autoClear: true,
        clearDuration: 2000
      });
      this.store.query('list-item', {
        pageSize: this.get('itemsPerPage'),
        start: page * this.get('itemsPerPage')
      }).then(function () {
        _this.set('model', _this.store.peekAll('list-item'));
      });
    }
  }, {
    key: 'actions',

    // == Lifecycle Hooks =======================================================

    // == Actions ===============================================================

    initializer: function initializer() {
      return {
        onExpansionChange: function onExpansionChange(expandedItems) {
          this.get('expandedItems').setObjects(expandedItems);
        },

        onLoadNext: function onLoadNext(page) {
          this.set('lastPage', this.get('lastPage') + 1);
          this.fetchPage(this.get('lastPage'));
        },

        onSelectionChange: function onSelectionChange(selectedItems) {
          this.get('selectedItems').setObjects(selectedItems);
        },

        onSortingChange: function onSortingChange(sortOrder) {
          this.get('sortOrder').setObjects(sortOrder);
        }
      };
    }
  }]));
});
/**
 * TODO
 */

// == Computed Properties ===================================================
define('dummy/pods/infinite/route', ['exports', 'ember'], function (exports, _ember) {
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend({
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.fetchPage(0);
    }
  });
});
define("dummy/pods/infinite/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "K6n/CKfI", "block": "{\"statements\":[[\"append\",[\"helper\",[\"frost-checkbox\"],null,[[\"hook\",\"checked\"],[[\"helper\",[\"concat\"],[[\"get\",[\"hook\"]],\"dwa\"],null],true]]],false],[\"text\",\"\\n\\n\"],[\"comment\",\" {{frost-list\\n  class='demo'\\n  hook='demo'\\n  item=(component 'list-item')\\n  itemExpansion=(component 'list-item-expansion')\\n  items=items\\n  expandedItems=expandedItems\\n  selectedItems=selectedItems\\n  onExpansionChange=(action 'onExpansionChange')\\n  onLoadNext=(action 'onLoadNext')\\n  onSelectionChange=(action 'onSelectionChange')\\n  debug=debug\\n  sorting=(component 'custom-sort'\\n    toggle=(component 'frost-toggle'\\n      hook='myToggle'\\n      value=debug\\n      onClick=(action (mut debug) (not debug))\\n    )\\n    sort=(component 'frost-sort'\\n      hook='mySort'\\n      sortOrder=sortOrder\\n      sortingProperties=sortingProperties\\n      onChange=(action 'onSortingChange')\\n    )\\n  )\\n}} \"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/pods/infinite/template.hbs" } });
});
define('dummy/pods/paged/controller', ['exports', 'ember', 'ember-computed-decorators', 'ember-frost-sort'], function (exports, _ember, _emberComputedDecorators, _emberFrostSort) {
  function _createDecoratedObject(descriptors) { var target = {}; for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = true; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } } if (descriptor.initializer) { descriptor.value = descriptor.initializer.call(target); } Object.defineProperty(target, key, descriptor); } return target; }

  var A = _ember['default'].A;
  var Controller = _ember['default'].Controller;
  var isEmpty = _ember['default'].isEmpty;
  exports['default'] = Controller.extend(_createDecoratedObject([{
    key: 'expandedItems',

    // == Dependencies ==========================================================

    // == Properties ============================================================

    initializer: function initializer() {
      return A([]);
    }
  }, {
    key: 'itemsPerPage',
    initializer: function initializer() {
      return 10;
    }
  }, {
    key: 'page',
    initializer: function initializer() {
      return 0;
    }
  }, {
    key: 'scrollTop',
    initializer: function initializer() {
      return 0;
    }
  }, {
    key: 'selectedItems',
    initializer: function initializer() {
      return A([]);
    }
  }, {
    key: 'sortOrder',
    initializer: function initializer() {
      return A(['id']);
    }
  }, {
    key: 'sortingProperties',
    initializer: function initializer() {
      return [{ label: 'Id', value: 'id' }, { label: 'Label', value: 'label' }];
    }
  }, {
    key: 'totalItems',
    initializer: function initializer() {
      return 100;
    }
  }, {
    key: 'items',
    decorators: [(0, _emberComputedDecorators['default'])('model.[]', 'sortOrder.[]'), _emberComputedDecorators.readOnly],
    value: function items(model, sortOrder) {
      if (isEmpty(model)) {
        return [];
      }
      return (0, _emberFrostSort.sort)(model, sortOrder); // Client side sorting
    }
  }, {
    key: 'fetchPage',

    // == Functions =============================================================

    value: function fetchPage(page) {
      var _this = this;

      this.store.unloadAll('list-item');
      this.store.query('list-item', {
        pageSize: this.get('itemsPerPage'),
        start: page * this.get('itemsPerPage')
      }).then(function () {
        _this.set('model', _this.store.peekAll('list-item'));
      });
    }
  }, {
    key: 'actions',

    // == Lifecycle Hooks =======================================================

    // == Actions ===============================================================

    initializer: function initializer() {
      return {
        onExpansionChange: function onExpansionChange(expandedItems) {
          this.get('expandedItems').setObjects(expandedItems);
        },

        onPaginationChange: function onPaginationChange(page) {
          this.setProperties({
            page: page,
            scrollTop: 0
          });
          this.fetchPage(page);
        },

        onSelectionChange: function onSelectionChange(selectedItems) {
          this.get('selectedItems').setObjects(selectedItems);
        },

        onSortingChange: function onSortingChange(sortOrder) {
          this.get('sortOrder').setObjects(sortOrder);
        }
      };
    }
  }]));
});
/**
 * TODO
 */

// Typically extracted from meta on the request

// == Computed Properties ===================================================
define('dummy/pods/paged/route', ['exports', 'ember'], function (exports, _ember) {
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend({
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      controller.fetchPage(0);
    }
  });
});
define("dummy/pods/paged/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Gp3/RfpI", "block": "{\"statements\":[[\"append\",[\"helper\",[\"frost-list\"],null,[[\"class\",\"hook\",\"item\",\"itemExpansion\",\"itemKey\",\"items\",\"scrollTop\",\"expandedItems\",\"selectedItems\",\"onExpansionChange\",\"onSelectionChange\",\"pagination\",\"sorting\"],[\"demo\",\"demo\",[\"helper\",[\"component\"],[\"list-item\"],null],[\"helper\",[\"component\"],[\"list-item-expansion\"],null],\"id\",[\"get\",[\"items\"]],[\"get\",[\"scrollTop\"]],[\"get\",[\"expandedItems\"]],[\"get\",[\"selectedItems\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"onExpansionChange\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"onSelectionChange\"],null],[\"helper\",[\"component\"],[\"frost-list-pagination\"],[[\"itemsPerPage\",\"page\",\"total\",\"onChange\"],[[\"get\",[\"itemsPerPage\"]],[\"get\",[\"page\"]],[\"get\",[\"totalItems\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"onPaginationChange\"],null]]]],[\"helper\",[\"component\"],[\"frost-sort\"],[[\"sortOrder\",\"sortingProperties\",\"onChange\"],[[\"get\",[\"sortOrder\"]],[\"get\",[\"sortingProperties\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"onSortingChange\"],null]]]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/pods/paged/template.hbs" } });
});
define('dummy/pods/simple/controller', ['exports', 'ember', 'ember-computed-decorators', 'ember-frost-sort'], function (exports, _ember, _emberComputedDecorators, _emberFrostSort) {
  function _createDecoratedObject(descriptors) { var target = {}; for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = true; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } } if (descriptor.initializer) { descriptor.value = descriptor.initializer.call(target); } Object.defineProperty(target, key, descriptor); } return target; }

  var A = _ember['default'].A;
  var Controller = _ember['default'].Controller;
  var isEmpty = _ember['default'].isEmpty;
  exports['default'] = Controller.extend(_createDecoratedObject([{
    key: 'debug',

    // == Dependencies ==========================================================

    // == Properties ============================================================
    initializer: function initializer() {
      return false;
    }
  }, {
    key: 'expandedItems',
    initializer: function initializer() {
      return A([]);
    }
  }, {
    key: 'selectedItems',
    initializer: function initializer() {
      return A([]);
    }
  }, {
    key: 'sortOrder',
    initializer: function initializer() {
      return A(['-id']);
    }
  }, {
    key: 'sortingProperties',
    initializer: function initializer() {
      return [{ label: 'Id', value: 'id' }, { label: 'Label', value: 'label' }];
    }
  }, {
    key: 'items',
    decorators: [(0, _emberComputedDecorators['default'])('model.[]', 'sortOrder.[]'), _emberComputedDecorators.readOnly],
    value: function items(model, sortOrder) {
      if (isEmpty(model)) {
        return [];
      }
      return (0, _emberFrostSort.sort)(model, sortOrder); // Client side sorting
    }
  }, {
    key: 'actions',

    // == Functions =============================================================

    // == Lifecycle Hooks =======================================================

    // == Actions ===============================================================

    initializer: function initializer() {
      return {
        onExpansionChange: function onExpansionChange(expandedItems) {
          this.get('expandedItems').setObjects(expandedItems);
        },

        onSelectionChange: function onSelectionChange(selectedItems) {
          this.get('selectedItems').setObjects(selectedItems);
        },

        onSortingChange: function onSortingChange(sortOrder) {
          this.get('sortOrder').setObjects(sortOrder);
        }
      };
    }
  }]));
});
/**
 * TODO
 */

// == Computed Properties ===================================================
define('dummy/pods/simple/route', ['exports', 'ember'], function (exports, _ember) {
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend({
    model: function model() {
      return this.store.findAll('list-item');
    }
  });
});
define("dummy/pods/simple/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "PcMd6ah6", "block": "{\"statements\":[[\"append\",[\"helper\",[\"frost-list\"],null,[[\"class\",\"hook\",\"item\",\"itemExpansion\",\"items\",\"expandedItems\",\"selectedItems\",\"onExpansionChange\",\"onSelectionChange\",\"debug\",\"sorting\"],[\"demo\",\"demo\",[\"helper\",[\"component\"],[\"list-item\"],null],[\"helper\",[\"component\"],[\"list-item-expansion\"],null],[\"get\",[\"items\"]],[\"get\",[\"expandedItems\"]],[\"get\",[\"selectedItems\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"onExpansionChange\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"onSelectionChange\"],null],[\"get\",[\"debug\"]],[\"helper\",[\"component\"],[\"custom-sort\"],[[\"toggle\",\"sort\"],[[\"helper\",[\"component\"],[\"frost-toggle\"],[[\"hook\",\"value\",\"onClick\"],[\"myToggle\",[\"get\",[\"debug\"]],[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"debug\"]]],null],[\"helper\",[\"not\"],[[\"get\",[\"debug\"]]],null]],null]]]],[\"helper\",[\"component\"],[\"frost-sort\"],[[\"hook\",\"sortOrder\",\"sortingProperties\",\"onChange\"],[\"mySort\",[\"get\",[\"sortOrder\"]],[\"get\",[\"sortingProperties\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"onSortingChange\"],null]]]]]]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/pods/simple/template.hbs" } });
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, _ember, _dummyConfigEnvironment) {
  var EmberRouter = _ember['default'].Router;

  var Router = EmberRouter.extend({
    location: _dummyConfigEnvironment['default'].locationType,
    rootURL: _dummyConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('simple', {
      path: '/'
    });
    this.route('infinite');
    this.route('paged');
  });

  exports['default'] = Router;
});
define('dummy/scenarios/list-items', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _default = (function (_Scenario) {
    _inherits(_default, _Scenario);

    function _default() {
      _classCallCheck(this, _default);

      _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(_default, [{
      key: 'run',
      value: function run() {
        var _this = this;

        // == GET ===================================================================

        // Infinite Scroll
        var infinite1 = this.buildList('list-item', 100);
        var infinite2 = this.buildList('list-item', 100);
        this.mockQuery('list-item', { pageSize: 100, start: 0 }).returns({ json: infinite1 });
        this.mockQuery('list-item', { pageSize: 100, start: 100 }).returns({ json: infinite2 });

        // Pagination
        Array.from(Array(10).keys()).forEach(function (page) {
          _this.mockQuery('list-item', { pageSize: 10, start: page * 10 }).returns({
            json: _this.buildList('list-item', 10)
          });
        });

        // Simple
        this.mockFindAll('list-item', 100);

        // == POST ==================================================================

        // == PUT ===================================================================

        // == DELETE ================================================================
      }
    }]);

    return _default;
  })(_emberDataFactoryGuy.Scenario);

  exports['default'] = _default;
});
define('dummy/scenarios/main', ['exports', 'ember-data-factory-guy', 'dummy/scenarios/list-items'], function (exports, _emberDataFactoryGuy, _dummyScenariosListItems) {
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  _emberDataFactoryGuy.Scenario.settings({
    logLevel: 1 // All FactoryGuy response info in console
  });

  var _default = (function (_Scenario) {
    _inherits(_default, _Scenario);

    function _default() {
      _classCallCheck(this, _default);

      _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(_default, [{
      key: 'run',
      value: function run() {
        this.include([_dummyScenariosListItems['default']]);
      }
    }]);

    return _default;
  })(_emberDataFactoryGuy.Scenario);

  exports['default'] = _default;
});
define('dummy/services/ember-elsewhere', ['exports', 'ember-elsewhere/services/ember-elsewhere'], function (exports, _emberElsewhereServicesEmberElsewhere) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberElsewhereServicesEmberElsewhere['default'];
    }
  });
});
define('dummy/services/notification-messages-service', ['exports', 'ember-cli-notifications/services/notification-messages-service'], function (exports, _emberCliNotificationsServicesNotificationMessagesService) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliNotificationsServicesNotificationMessagesService['default'];
    }
  });
});
define("dummy/snippets", ["exports"], function (exports) {
  exports["default"] = {};
});
define("dummy/templates/components/code-snippet", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "mJxgtHOS", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"source\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/code-snippet.hbs" } });
});
define("dummy/templates/components/custom-sort", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YosCXhRk", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"item frost-flex-2 centered\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"\\n    Debug\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"toggle\"]]],null],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"item frost-flex-4\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"component\"],[[\"get\",[\"sort\"]]],null],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/custom-sort.hbs" } });
});
define('dummy/tests/factories/list-item', ['exports', 'ember-data-factory-guy'], function (exports, _emberDataFactoryGuy) {

  _emberDataFactoryGuy['default'].define('list-item', {
    sequences: {
      label: function label(num) {
        var items = ['foo', 'bar', 'biz', 'baz'];
        return items[num % items.length];
      }
    },

    'default': {
      label: _emberDataFactoryGuy['default'].generate('label')
    }
  });
});
define('dummy/utils/key-codes', ['exports', 'ember-frost-core/utils'], function (exports, _emberFrostCoreUtils) {
  Object.defineProperty(exports, 'keyCodes', {
    enumerable: true,
    get: function get() {
      return _emberFrostCoreUtils.keyCodes;
    }
  });
});
define('dummy/utils/selection', ['exports', 'ember-frost-list/utils/selection'], function (exports, _emberFrostListUtilsSelection) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostListUtilsSelection['default'];
    }
  });
});
define('dummy/utils/sort', ['exports', 'ember-frost-sort/utils/sort'], function (exports, _emberFrostSortUtilsSort) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberFrostSortUtilsSort['default'];
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("dummy/app")["default"].create({"name":"ember-frost-list","version":"5.5.3+af23f268"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map
