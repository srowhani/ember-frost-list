'use strict';

define('dummy/tests/acceptance/frost-list-test', ['exports', 'chai', 'ember-data-factory-guy', 'ember-hook', 'mocha', 'dummy/tests/helpers/destroy-app', 'dummy/tests/helpers/start-app'], function (exports, _chai, _emberDataFactoryGuy, _emberHook, _mocha, _dummyTestsHelpersDestroyApp, _dummyTestsHelpersStartApp) {

  _mocha.describe.skip('Acceptance: FrostList', function () {
    var application = undefined;

    (0, _mocha.beforeEach)(function () {
      application = (0, _dummyTestsHelpersStartApp['default'])();
      // Adding FactoryGuy mockSetup call
      (0, _emberDataFactoryGuy.mockSetup)();
    });

    (0, _mocha.afterEach)(function () {
      (0, _dummyTestsHelpersDestroyApp['default'])(application);
      // Adding FactoryGuy mockTeardown call
      (0, _emberDataFactoryGuy.mockTeardown)();
    });

    (0, _mocha.it)('can expand and collapse rows', function () {
      var queryBinding = (0, _emberDataFactoryGuy.buildList)('list-item', 20);
      (0, _emberDataFactoryGuy.mockQuery)('list-item', { pageSize: 20, start: 0 }).returns({ json: queryBinding });

      visit('/qp-binding');

      andThen(function () {
        (0, _chai.expect)((0, _emberHook.$hook)('-item-0').hasClass('is-expanded')).to.eql(false);
      });

      click((0, _emberHook.hook)('-expand-all'));

      andThen(function () {
        (0, _chai.expect)((0, _emberHook.$hook)('-item-0').hasClass('is-expanded')).to.eql(true);
      });

      click((0, _emberHook.hook)('-collapse-all'));

      andThen(function () {
        (0, _chai.expect)((0, _emberHook.$hook)('-item-0').hasClass('is-expanded')).to.eql(false);
      });
    });
  });
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
define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;
  var run = _ember['default'].run;

  function destroyApp(application) {
    run(application, 'destroy');
  }
});
define('dummy/tests/helpers/ember-frost-core', ['exports', 'ember', 'ember-hook', 'dummy/tests/helpers/ember-frost-core/frost-button', 'dummy/tests/helpers/ember-frost-core/frost-select', 'dummy/tests/helpers/ember-frost-core/frost-text'], function (exports, _ember, _emberHook, _dummyTestsHelpersEmberFrostCoreFrostButton, _dummyTestsHelpersEmberFrostCoreFrostSelect, _dummyTestsHelpersEmberFrostCoreFrostText) {
  exports.click = click;
  exports.fillIn = fillIn;
  exports.focusout = focusout;
  var $ = _ember['default'].$;
  var typeOf = _ember['default'].typeOf;
  // eslint-disable-line

  var assign = Object.assign || _ember['default'].assign || _ember['default'].merge; // eslint-disable-line

  /**
   * Click on element
   * @param {jQuery|String} element - name of Ember hook or jQuery instance
   */

  function click(element) {
    var $element = typeOf(element) === 'string' ? (0, _emberHook.$hook)(element) : element;
    $element.click();
  }

  /**
   * Fill in an element
   * @param {jQuery|String} element - name of Ember hook or jQuery instance
   * @param {String} value - value to fill in
   */

  function fillIn(element, value) {
    var $element = typeOf(element) === 'string' ? (0, _emberHook.$hook)(element) : element;
    $element.val(value).trigger('input');
  }

  /**
   * Remove focus from element
   * @param {jQuery|String} element - name of Ember hook or jQuery instance
   */

  function focusout(element) {
    var $element = typeOf(element) === 'string' ? (0, _emberHook.$hook)(element) : element;
    $element.focusout();
  }

  // TODO: Remove these as part of next major release, expecting consumers to
  // import {expectWithState} from 'dummy/tests/helpers/ember-frost-core/frost-select'
  // instead so we don't have to manange this import/re-export madness.
  var expectButtonWithState = _dummyTestsHelpersEmberFrostCoreFrostButton.expectWithState;
  exports.expectButtonWithState = expectButtonWithState;
  var expectSelectWithState = _dummyTestsHelpersEmberFrostCoreFrostSelect.expectWithState;
  exports.expectSelectWithState = expectSelectWithState;
  var expectTextInputWithState = _dummyTestsHelpersEmberFrostCoreFrostText.expectWithState;
  exports.expectTextInputWithState = expectTextInputWithState;
  var filterSelect = _dummyTestsHelpersEmberFrostCoreFrostSelect.filter;
  exports.filterSelect = filterSelect;
  var findButtons = _dummyTestsHelpersEmberFrostCoreFrostButton.find;
  exports.findButtons = findButtons;
  var findTextInputs = _dummyTestsHelpersEmberFrostCoreFrostText.find;

  exports.findTextInputs = findTextInputs;
  exports['default'] = {
    click: click,
    expectButtonWithState: expectButtonWithState,
    expectSelectWithState: expectSelectWithState,
    expectTextInputWithState: expectTextInputWithState,
    fillIn: fillIn,
    findButtons: findButtons,
    findTextInputs: findTextInputs,
    focusout: focusout
  };
});
define('dummy/tests/helpers/ember-frost-core/frost-button', ['exports', 'chai', 'ember', 'ember-hook', 'dummy/tests/helpers/ember-frost-core/utils'], function (exports, _chai, _ember, _emberHook, _dummyTestsHelpersEmberFrostCoreUtils) {
  exports.expectWithState = expectWithState;
  exports.find = find;
  var $ = _ember['default'].$;
  var typeOf = _ember['default'].typeOf;
  // eslint-disable-line

  var assign = Object.assign || _ember['default'].assign || _ember['default'].merge; // eslint-disable-line

  /**
   * Verify button exists with expected state
   * @param {jQuery|String} button - name of Ember hook or jQuery instance
   * @param {FrostButtonState} state - expected button state
   */

  function expectWithState(button, state) {
    var defaults = {
      disabled: false,
      pack: 'frost'
    };

    var $button = typeOf(button) === 'string' ? (0, _emberHook.$hook)(button) : button;
    state = assign(defaults, state);

    (0, _dummyTestsHelpersEmberFrostCoreUtils.expectDisabledState)($button, state.disabled, 'button');

    if (state.icon && state.pack) {
      (0, _chai.expect)($button.find('.frost-icon-' + state.pack + '-' + state.icon), 'button has expected icon').to.have.length(1);
    }

    if (state.text) {
      (0, _chai.expect)($button.find('.text:not(.icon-text)').text().trim(), 'button has expected text').to.equal(state.text);
    }
  }

  /**
   * Get list of buttons
   * @returns {jQuery} buttons
   */

  function find() {
    return $('.frost-button');
  }
});
/**
 * @typedef {Object} FrostButtonState
 * @property {Boolean} [disabled=false] - whether or not button is disabled
 * @property {String} [icon] - name of button icon
 * @property {String} [pack="frost"] - name of icon pack for button's icon
 * @property {String} [text] - button text
 */
define('dummy/tests/helpers/ember-frost-core/frost-select', ['exports', 'chai', 'ember', 'ember-hook', 'ember-test-helpers/wait', 'dummy/tests/helpers/ember-frost-core/utils'], function (exports, _chai, _ember, _emberHook, _emberTestHelpersWait, _dummyTestsHelpersEmberFrostCoreUtils) {
  exports.expectWithState = expectWithState;
  exports.filter = filter;
  exports.open = open;
  exports.close = close;
  exports.selectItemAtIndex = selectItemAtIndex;
  var $ = _ember['default'].$;
  var RSVP = _ember['default'].RSVP;
  var run = _ember['default'].run;
  var typeOf = _ember['default'].typeOf;
  // eslint-disable-line

  var assign = Object.assign || _ember['default'].assign || _ember['default'].merge; // eslint-disable-line

  /* eslint-disable complexity */
  /**
   * Verify select exists with expected state
   * @param {jQuery|String} select - name of Ember hook or jQuery instance
   * @param {FrostSelectState} state - expected select state
   */

  function expectWithState(select, state) {
    var defaults = {
      disabled: false,
      error: false,
      opened: false,
      tabIndex: 0,
      text: ''
    };

    var $select = typeOf(select) === 'string' ? (0, _emberHook.$hook)(select) : select;
    state = assign(defaults, state);

    (0, _chai.expect)($select.hasClass('frost-select'), 'has frost-select class').to.equal(true);

    (0, _dummyTestsHelpersEmberFrostCoreUtils.expectToggleClass)($select, 'frost-select-disabled', state.disabled);
    (0, _dummyTestsHelpersEmberFrostCoreUtils.expectToggleClass)($select, 'frost-select-error', state.error);
    (0, _dummyTestsHelpersEmberFrostCoreUtils.expectToggleClass)($select, 'frost-select-focused', state.focused);
    (0, _dummyTestsHelpersEmberFrostCoreUtils.expectToggleClass)($select, 'frost-select-opened', state.opened);

    (0, _chai.expect)($select.prop('tabindex'), 'has expected tab index').to.equal(state.disabled ? -1 : state.tabIndex);

    if (state.focusedItem) {
      (0, _chai.expect)($('.frost-select-list-item-focused .frost-select-list-item-text').data('text'), 'is focused on expected item').to.equal(state.focusedItem);
    }

    var $emptyMessage = $('.frost-select-dropdown-empty-msg');

    if (state.items && state.items.length !== 0) {
      var labels = $('.frost-select-dropdown li').toArray().map(function (element) {
        return $(element).find('.frost-select-list-item-text').data('text');
      });

      (0, _chai.expect)(labels, 'has expected items').to.eql(state.items);
      (0, _chai.expect)($emptyMessage, 'does not show empty message').to.have.length(0);
    } else if (state.opened) {
      (0, _chai.expect)($emptyMessage, 'shows empty message').to.have.length(1);
    }

    (0, _chai.expect)($select.find('.frost-select-text').text().trim(), 'has expected text').to.equal(state.text);
  }

  /* eslint-disable complexity */

  /**
   * Filter frost-select
   * @param {String} filter - filter to apply to select
   */

  function filter(filter) {
    $(window).trigger('resize'); // For some reason we need to do this in Ember 2.3
    $('.frost-select-dropdown .frost-text-input').val(filter).trigger('input');
  }

  /**
   * Open frost-select dropdown
   * @param {String} [hook='select'] - frost-select hook
   * @returns {Promise} the resolved promise from ember-test-helpers/wait
   */

  function open() {
    var hook = arguments.length <= 0 || arguments[0] === undefined ? 'select' : arguments[0];

    // In a real browser when you click on the select with your mouse a
    // focusin event is fired on the component. However when using jQuery's
    // click() method the focusin is not fired so we are programitcally
    // triggering that in this test.
    (0, _emberHook.$hook)(hook).click().trigger('focusin');
    return (0, _emberTestHelpersWait['default'])();
  }

  /**
   * Close frost-select dropdown
   * @param {String} [hook='select'] - frost-select hook
   * @returns {Promise} the resolved promise from ember-test-helpers/wait
   */

  function close() {
    var hook = arguments.length <= 0 || arguments[0] === undefined ? 'select' : arguments[0];

    (0, _emberHook.$hook)(hook).click().trigger('focusout');
    return (0, _emberTestHelpersWait['default'])();
  }

  /**
   * Select item in select dropdown at given index
   * NOTE: using done() instead of Promise based because promised based causes
   * select to lose focus for some reason. This may have something to with with
   * how mocha is handling done vs promise returns.
   * @param {String} hook - frost-select hook
   * @param {Number} index - index of item to select
   * @param {Function} done - mocha done callback
   */

  function selectItemAtIndex(hook, index, done) {
    (0, _emberHook.$hook)(hook + '-item', { index: index }).trigger('mousedown');
    run.next(function () {
      done();
    });
  }
});
/**
 * @typedef {Object} FrostSelectState
 * @property {Boolean} [disabled=false] - whether or not select is disabled
 * @property {Boolean} [error=false] - whether or not select has error
 * @property {Boolean} [focused] - whether or not select is focused
 * @property {String} [focusedItem] - label of focused item
 * @property {String} [items] - list of item labels present in dropdown
 * @property {Boolean} [opened=false] - whether or not select is opened
 * @property {Number} [tabIndex=0] - tab index of root element
 * @property {String} [text=''] - text in select for describing what is selected
 */
define('dummy/tests/helpers/ember-frost-core/frost-text', ['exports', 'chai', 'ember', 'ember-hook', 'dummy/tests/helpers/ember-frost-core/utils'], function (exports, _chai, _ember, _emberHook, _dummyTestsHelpersEmberFrostCoreUtils) {
  exports.expectWithState = expectWithState;
  exports.find = find;
  var $ = _ember['default'].$;
  var typeOf = _ember['default'].typeOf;
  // eslint-disable-line

  var assign = Object.assign || _ember['default'].assign || _ember['default'].merge; // eslint-disable-line

  /**
   * Verify text input exists with expected state
   * @param {jQuery|String} input - name of Ember hook or jQuery instance
   * @param {FrostTextState} state - expected input state
   */

  function expectWithState(input, state) {
    var defaults = {
      align: 'left',
      disabled: false,
      error: false,
      tabIndex: 0,
      type: 'text'
    };

    var $input = typeOf(input) === 'string' ? (0, _emberHook.$hook)(input) : input;
    state = assign(defaults, state);

    (0, _chai.expect)($input.hasClass(state.align), 'input has correct text alignment').to.equal(true);

    (0, _dummyTestsHelpersEmberFrostCoreUtils.expectDisabledState)($input, state.disabled, 'input');

    (0, _chai.expect)($input.hasClass('error'), 'input ' + (state.error ? 'has' : 'does not have') + ' error class').to.equal(state.error);['placeholder', 'tabIndex', 'type'].forEach(function (key) {
      if (state[key]) {
        (0, _chai.expect)($input.prop(key), 'input as expected ' + key).to.equal(state[key]);
      }
    });

    if (state.value) {
      (0, _chai.expect)($input.val(), 'input has expected value').to.equal(state.value);
    }
  }

  /**
   * Get list of text inputs
   * @returns {jQuery} text inputs
   * @param {FrostTextState} state - find inputs with state
   */

  function find(state) {
    var $inputs = $('.frost-text input');

    if (typeOf(state) !== 'object') {
      return $inputs;
    }

    return $inputs.filter(function (index, input) {
      if ('disabled' in state && input.disabled !== state.disabled || 'type' in state && input.type !== state.type) {
        return false;
      }

      return true;
    });
  }
});
/**
 * @typedef {Object} FrostTextState
 * @property {String} [align="left"] - text alignment
 * @property {Boolean} [disabled=false] - whether or not input is disabled
 * @property {Boolean} [error=false] - whether or not input is in error state
 * @property {String} [placeholder] - placeholder text
 * @property {Number} [tabIndex=0] - tab index
 * @property {String} [type='text'] - input type
 * @property {String} [value] - value of input
 */
define('dummy/tests/helpers/ember-frost-core/utils', ['exports', 'chai'], function (exports, _chai) {
  exports.expectDisabledState = expectDisabledState;
  exports.expectToggleClass = expectToggleClass;

  /**
   * Expect element to have disabled state
   * @param {jQuery} $element - element
   * @param {Boolean} disabled - disabled
   * @param {String} [type='element'] - type of element
   */

  function expectDisabledState($element, disabled) {
    var type = arguments.length <= 2 || arguments[2] === undefined ? 'element' : arguments[2];

    (0, _chai.expect)($element.is(':disabled'), type + ' is ' + (disabled ? 'disabled' : 'enabled')).to.equal(disabled);
  }

  /**
   * Expect class on element depending on boolean state
   * @param {jQuery} $element - element to check for class on
   * @param {String} className - name of class
   * @param {Boolean} state - whether or not class should be present
   */

  function expectToggleClass($element, className, state) {
    if (state === undefined) {
      return;
    }

    (0, _chai.expect)($element.hasClass(className), (state ? 'has' : 'does not have') + ' ' + className + ' class').to.equal(state);
  }
});
define('dummy/tests/helpers/ember-prop-types', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.createComponent = createComponent;
  var VERSION = _ember['default'].VERSION;

  /**
   * Determine if we are on a version of Ember that includes Glimmer 2
   * @returns {Boolean} whether or not we are on Glimmer 2
   */
  function isGlimmer2() {
    var _VERSION$split = VERSION.split('.');

    var _VERSION$split2 = _slicedToArray(_VERSION$split, 2);

    var major = _VERSION$split2[0];
    var minor = _VERSION$split2[1];

    return parseInt(major) > 1 && parseInt(minor) > 9;
  }

  /**
   * Programitcally instantiate instance of component class
   * @param {Ember.Component} component - component class to instantiate
   * @returns {Ember.Component} instance of component class
   */

  function createComponent(component) {
    if (isGlimmer2()) {
      return component.create({ renderer: {} });
    }

    return component.create();
  }
});
define('dummy/tests/helpers/ember-test-utils/describe-component', ['exports', 'ember', 'dummy/tests/helpers/ember-test-utils/typedefs'], function (exports, _ember, _dummyTestsHelpersEmberTestUtilsTypedefs) {
  exports.unit = unit;
  exports.integration = integration;

  var deprecationMsg = (0, _dummyTestsHelpersEmberTestUtilsTypedefs.getDeprecationMessage)('describeComponent');
  var assign = _ember['default'].assign || _ember['default'].merge; // NOTE: only use two params in assign() since merge() doesn't take more

  /**
   * A shortcut for filling in the first three params in a describeComponent
   * @param {String} name - the name of the component
   * @param {Object} options - any additional options to set
   * @returns {Object[]} an array of items that need to be passed in to describeComponent
   */
  function component(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var testType = options.unit ? 'Unit' : 'Integration';
    return [name, testType + ' / Component / ' + name, options];
  }

  /**
   * A shortcut for filling in the first three params for describeComponent unit test
   * @param {String} name - the name of the component
   * @param {String[]} dependencies - the list of "needs" for this component
   * @param {Object} options - any additional options to set (alongside unit: true)
   * @returns {Object[]} an array of items that need to be passed in to describeComponent
   */

  function unit(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _ember['default'].deprecate(deprecationMsg, false, {
      id: 'ember-test-utils.describe-component.unit',
      until: '2.0.0'
    });

    if (dependencies) {
      options.needs = dependencies;
    }
    return component(name, assign(options, { unit: true }));
  }

  /**
   * A shortcut for filling in the first three params for describeComponent integration test
   * @param {String} name - the name of the component
   * @param {Object} options - any additional options to set (alongside integration: true)
   * @returns {Object[]} an array of items that need to be passed in to describeComponent
   */

  function integration(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _ember['default'].deprecate(deprecationMsg, false, {
      id: 'ember-test-utils.describe-component.integration',
      until: '2.0.0'
    });
    return component(name, assign(options, { integration: true }));
  }
});
/**
 * Shortcuts for generating the params passed to describeComponent from ember-mocha
 */

// NOTE: not destructuring 'deprecate' for ease of testing
/* eslint-disable ember-standard/destructure */
define('dummy/tests/helpers/ember-test-utils/describe-model', ['exports', 'ember', 'dummy/tests/helpers/ember-test-utils/typedefs'], function (exports, _ember, _dummyTestsHelpersEmberTestUtilsTypedefs) {
  exports.model = model;
  exports.serializer = serializer;

  var deprecationMsg = (0, _dummyTestsHelpersEmberTestUtilsTypedefs.getDeprecationMessage)('describeModel');

  /**
   * Generate an Array of the first 3 params to describeModel, so that we can keep the function definition on the
   * same line as the describeModel call itself
   * @param {String} name - the name of the model being tested
   * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
   * @param {Object} options - any additional options needed for describeModel
   * @returns {Array} the first three params to describeModel
   */

  function model(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _ember['default'].deprecate(deprecationMsg, false, {
      id: 'ember-test-utils.describe-model.model',
      until: '2.0.0'
    });

    if (dependencies) {
      options.needs = dependencies;
    }

    return [name, 'Unit / Model / ' + name, options];
  }

  /**
   * Generate an Array of the first 3 params to describeModel, so that we can keep the function definition on the
   * same line as the describeModel call itself
   * @param {String} name - the name of the model being tested
   * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
   * @param {Object} options - any additional options needed for describeModel
   * @returns {Array} the first three params to describeModel
   */

  function serializer(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _ember['default'].deprecate(deprecationMsg, false, {
      id: 'ember-test-utils.describe-model.serializer',
      until: '2.0.0'
    });

    if (dependencies) {
      options.needs = dependencies;
    }

    return [name, 'Unit / Serializer / ' + name, options];
  }
});
/**
 * Shortcut for generating the params passed to describeModel from ember-mocha
 */

// NOTE not destructuring 'deprecate' for ease of testing
/* eslint-disable ember-standard/destructure */
define('dummy/tests/helpers/ember-test-utils/describe-module', ['exports', 'ember', 'dummy/tests/helpers/ember-test-utils/typedefs'], function (exports, _ember, _dummyTestsHelpersEmberTestUtilsTypedefs) {
  exports.module = _module;
  exports.route = route;
  exports.controller = controller;

  var deprecationMsg = (0, _dummyTestsHelpersEmberTestUtilsTypedefs.getDeprecationMessage)('describeModule');

  /**
   * Generate an Array of the first 3 params to describeModule, so that we can keep the function definition on the
   * same line as the describeModule call itself
   * @param {String} type - the type of module being tested ('controller', 'route', 'service', 'serializer', etc.)
   * @param {String} name - the name of the module being tested
   * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
   * @param {Object} options - any additional options needed for describeModule
   * @returns {Array} the first three params to describeModule
   */

  function _module(type, name, dependencies) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _ember['default'].deprecate(deprecationMsg, false, {
      id: 'ember-test-utils.describe-module.module',
      until: '2.0.0'
    });

    if (dependencies) {
      options.needs = dependencies;
    }

    return [type + ':' + name, 'Unit / ' + _ember['default'].String.classify(type) + ' / ' + name, options];
  }

  /**
   * Generate an Array of the first 3 params to describeModule, so that we can keep the function definition on the
   * same line as the describeModule call itself, assumes a route type
   * @param {String} name - the name of the module being tested
   * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
   * @param {Object} options - any additional options needed for describeModule
   * @returns {Array} the first three params to describeModule
   */

  function route(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _ember['default'].deprecate(deprecationMsg, false, {
      id: 'ember-test-utils.describe-module.route',
      until: '2.0.0'
    });

    return _module('route', name, dependencies, options);
  }

  /**
   * Generate an Array of the first 3 params to describeModule, so that we can keep the function definition on the
   * same line as the describeModule call itself, assumes a controller type
   * @param {String} name - the name of the module being tested
   * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
   * @param {Object} options - any additional options needed for describeModule
   * @returns {Array} the first three params to describeModule
   */

  function controller(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _ember['default'].deprecate(deprecationMsg, false, {
      id: 'ember-test-utils.describe-module.controller',
      until: '2.0.0'
    });

    return _module('controller', name, dependencies, options);
  }
});
/**
 * Shortcut for generating the params passed to describeModule from ember-mocha
 */

// NOTE not destructuring 'deprecate' for ease of testing
/* eslint-disable ember-standard/destructure */
define('dummy/tests/helpers/ember-test-utils/ember-data', ['exports', 'ember'], function (exports, _ember) {
  exports.stubStore = stubStore;
  exports.returnPromiseWithArgs = returnPromiseWithArgs;

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  var RSVP = _ember['default'].RSVP;
  var Service = _ember['default'].Service;

  /**
   * @typedef Resolver
   * A resolver for a particular Promise, used to resolve or reject said Promise
   * @property {Function} resolve - the method to call to resolve the Promise
   * @property {Function} reject - the method to call to reject the Promise
   */

  /**
   * The methods in DS.Store we want to stub
   * Taken from http://emberjs.com/api/data/classes/DS.Store.html
   */
  var storeMethodsToStub = ['adapterFor', 'buildRecord', 'createRecord', 'dataWasUpdated', 'deleteRecord', 'didSaveRecord', 'didUpdateAll', 'fetchRecord', 'find', 'findAll', 'findBelongsTo', 'findByIds', 'findHasMany', 'findMany', 'findRecord', 'flushPendingSave', 'getReference', 'hashRecordForId', 'init', 'modelFor', 'normalize', 'peekAll', 'peekRecord', 'push', 'pushPayload', 'query', 'queryRecord', 'recordForId', 'recordIsLoaded', 'recordWasError', 'recordWasInvalid', 'reloadRecord', 'retrieveManagedInstance', 'scheduleSave', 'serialize', 'serializeFor', 'typeMapFor', 'unloadAll', 'unloadRecord', 'updateId'];

  /**
   * Stub the ember data store
   * @param {Object} context - the test context ('this' from within beforeEach)
   * @param {Object} sandbox - the sinon sandbox to use for generating stubs
   * @returns {Store} the store with stubs for all methods (consumer must still provide return values)
   */

  function stubStore(context, sandbox) {
    var stubs = {};
    storeMethodsToStub.forEach(function (method) {
      stubs[method] = sandbox.stub();
    });

    context.register('service:store', Service.extend(stubs));
    return context.container.lookup('service:store');
  }

  /**
   * Stub out a particular method with specific arguments to return a promise
   * @param {Stub} stub - the stubbed method
   * @param {Object[]} args - the arguments to stub for
   * @returns {Resolver} the resolver for the promise that will be returned
   */

  function returnPromiseWithArgs(stub, args) {
    var resolver = {};
    var promise = new RSVP.Promise(function (resolve, reject) {
      resolver.resolve = resolve;
      resolver.reject = reject;
    });

    resolver.promise = promise;

    if (args) {
      stub.withArgs.apply(stub, _toConsumableArray(args)).returns(promise);
    } else {
      stub.withArgs().returns(promise);
    }

    return resolver;
  }
});
/**
 * Helpers to make it very easy to stub-out the ember data store in integration tests, regardless of
 * how deep the reference to them happens to be. If it's the component under test, this might be a little
 * overkill, since you could have just initialized with the stub store, but it will work for that use-case too.
 */
define('dummy/tests/helpers/ember-test-utils/ember-intl', ['exports'], function (exports) {
  exports.addEmberIntlDeps = addEmberIntlDeps;
  exports.needsEmberIntlDeps = needsEmberIntlDeps;
  /**
   * Helpers for doing tests with ember-intl
   */

  /**
   * Additional ember-intl dependencies
   * @see {@link https://github.com/jasonmit/ember-intl/blob/master/docs/unit-testing.md#unit-testing}
   */
  var emberIntlDeps = ['ember-intl@adapter:default', // required with format-message
  'ember-intl@formatter:format-message', // optional
  'ember-intl@formatter:format-html-message', // optional
  'ember-intl@formatter:format-date', // optional
  'ember-intl@formatter:format-time', // optional
  'ember-intl@formatter:format-number', // optional
  'ember-intl@formatter:format-relative', // optional
  'helper:intl-get', // optional
  'helper:t', // optional, if used then be sure to include the format-message formatter above
  'helper:t-html', // optional, if used then be sure to include the format-html-message formatter above
  'helper:format-date', // optional
  'helper:format-time', // optional
  'helper:format-relative', // optional
  'helper:format-number' // optional
  ];

  exports.emberIntlDeps = emberIntlDeps;
  /**
   * Add all the dependencies listed as required or optional from ember-intl documentation
   * @param {String[]} deps - the list of dependencies (it will be mutated)
   */

  function addEmberIntlDeps(deps) {
    emberIntlDeps.forEach(function (dep) {
      deps.push(dep);
    });
  }

  /**
   * Check if a given set of options requires additional ember-intl dependencies
   * @param {Object} options - the options for the test
   * @returns {Boolean} true if additional ember-intl dependencies are needed
   */

  function needsEmberIntlDeps(options) {
    return options.unit === true && options.needs !== undefined && options.needs.includes('service:intl');
  }
});
define('dummy/tests/helpers/ember-test-utils/index', ['exports', 'dummy/tests/helpers/ember-test-utils/object-diff'], function (exports, _dummyTestsHelpersEmberTestUtilsObjectDiff) {
  /**
   * Main entry-point for the ember-test-utils test helpers
   */

  Object.defineProperty(exports, 'diffObject', {
    enumerable: true,
    get: function get() {
      return _dummyTestsHelpersEmberTestUtilsObjectDiff['default'];
    }
  });
});
define('dummy/tests/helpers/ember-test-utils/object-diff', ['exports', 'ember', 'lodash'], function (exports, _ember, _lodash) {
  exports['default'] = diffObject;
  var deprecate = _ember['default'].deprecate;
  var ARRAY_PLACEHOLDER = '<%ARRAY_PLACEHOLDER%> elements equal';

  exports.ARRAY_PLACEHOLDER = ARRAY_PLACEHOLDER;
  var isArray = Array.isArray;
  var keys = Object.keys;

  function diffValue(obj1Value, obj2Value) {
    if (isArray(obj1Value) && isArray(obj2Value)) {
      return diffArray(obj1Value, obj2Value);
    } else if (_lodash['default'].isObject(obj1Value) && _lodash['default'].isObject(obj2Value)) {
      return diffObject(obj1Value, obj2Value);
    } else if (!_lodash['default'].isEqual(obj1Value, obj2Value)) {
      return {
        differentKeys: [undefined],
        leftOnlyKeys: [],
        rightOnlyKeys: [],
        leftDiff: obj1Value,
        rightDiff: obj2Value
      };
    }
    return {
      differentKeys: [],
      leftOnlyKeys: [],
      rightOnlyKeys: []
    };
  }
  function completePath(key, nextKey) {
    if (nextKey === undefined) {
      return key;
    }
    return key + '.' + nextKey;
  }
  function diffArray(obj1Value, obj2Value) {
    var leftDiff = [];
    var rightDiff = [];
    var differentKeys = [];
    var rightOnlyKeys = [];
    var leftOnlyKeys = [];

    var length = Math.min(obj1Value.length, obj2Value.length);
    var i = undefined;
    for (i = 0; i < length; ++i) {
      var result = diffValue(obj1Value[i], obj2Value[i]);
      var completeIndexPath = _lodash['default'].partial(completePath, i);
      var hasMinusDiff = false;
      var hasRightDiff = false;

      if (result.leftOnlyKeys.length > 0) {
        leftOnlyKeys.push.apply(leftOnlyKeys, result.leftOnlyKeys.map(completeIndexPath));
        if (!_lodash['default'].isEmpty(result.leftDiff)) {
          leftDiff.push(result.leftDiff);
          hasMinusDiff = true;
        }
      }

      if (result.rightOnlyKeys.length > 0) {
        rightOnlyKeys.push.apply(rightOnlyKeys, result.rightOnlyKeys.map(completeIndexPath));
        if (!_lodash['default'].isEmpty(result.rightDiff)) {
          rightDiff.push(result.rightDiff);
          hasRightDiff = true;
        }
      }
      if (result.differentKeys.length > 0) {
        differentKeys.push.apply(differentKeys, result.differentKeys.map(completeIndexPath));
        leftDiff.push(result.leftDiff);
        rightDiff.push(result.rightDiff);
        hasMinusDiff = true;
        hasRightDiff = true;
      }
      if (!hasMinusDiff) {
        leftDiff.push(ARRAY_PLACEHOLDER);
      }
      if (!hasRightDiff) {
        rightDiff.push(ARRAY_PLACEHOLDER);
      }
    }

    if (obj1Value.length >= obj2Value.length) {
      length = obj2Value.length;
      var _i = undefined;
      for (_i = length; _i < obj1Value.length; ++_i) {
        leftOnlyKeys.push(_i);
        leftDiff.push(obj1Value[_i]);
      }
    } else if (obj1Value.length < obj2Value.length) {
      length = obj1Value.length;
      var _i2 = undefined;
      for (_i2 = length; _i2 < obj2Value.length; ++_i2) {
        rightOnlyKeys.push(_i2);
        rightDiff.push(obj2Value[_i2]);
      }
    }

    return {
      differentKeys: differentKeys,
      leftOnlyKeys: leftOnlyKeys,
      leftDiff: leftDiff,
      rightOnlyKeys: rightOnlyKeys,
      rightDiff: rightDiff
    };
  }

  function diffObject(obj1, obj2) {
    deprecate('diffObject is deprecated, and will soon be removed. Hopefully to be replaced with a chai helper', false, {
      id: 'ember-test-utils.diffObject',
      until: '2.0.0'
    });
    var obj1Keys = keys(obj1);
    var obj2Keys = keys(obj2);

    var rightOnlyKeys = _lodash['default'].reject(obj2Keys, _lodash['default'].partial(_lodash['default'].includes, obj1Keys));
    var leftOnlyKeys = _lodash['default'].reject(obj1Keys, _lodash['default'].partial(_lodash['default'].includes, obj2Keys));
    var commonKeys = _lodash['default'].intersection(obj1Keys, obj2Keys);

    var leftDiff = {};

    leftOnlyKeys.forEach(function (key) {
      leftDiff[key] = _lodash['default'].cloneDeep(obj1[key]);
    });

    var rightDiff = {};

    rightOnlyKeys.forEach(function (key) {
      rightDiff[key] = _lodash['default'].cloneDeep(obj2[key]);
    });

    var differentKeyList = [];

    commonKeys.forEach(function (key) {
      var obj1Value = obj1[key];
      var obj2Value = obj2[key];
      var completeKeyPath = _lodash['default'].partial(completePath, key);

      if (isArray(obj1Value) && isArray(obj2Value)) {
        var result = diffArray(obj1Value, obj2Value);
        if (result.differentKeys.length > 0) {
          differentKeyList.push(result.differentKeys.map(completeKeyPath));
          leftDiff[key] = result.leftDiff;
          rightDiff[key] = result.rightDiff;
        }

        if (result.leftOnlyKeys.length > 0) {
          leftOnlyKeys.push.apply(leftOnlyKeys, result.leftOnlyKeys.map(completeKeyPath));
          if (!_lodash['default'].isEmpty(result.leftDiff)) {
            leftDiff[key] = result.leftDiff;
          }
        }

        if (result.rightOnlyKeys.length > 0) {
          rightOnlyKeys.push.apply(rightOnlyKeys, result.rightOnlyKeys.map(completeKeyPath));
          if (!_lodash['default'].isEmpty(result.rightDiff)) {
            rightDiff[key] = result.rightDiff;
          }
        }
      } else if (_lodash['default'].isObject(obj1Value) && _lodash['default'].isObject(obj2Value)) {
        var result = diffObject(obj1Value, obj2Value);
        if (result.differentKeys.length > 0) {
          differentKeyList.push(result.differentKeys.map(completeKeyPath));
          leftDiff[key] = result.leftDiff;
          rightDiff[key] = result.rightDiff;
        }

        if (result.leftOnlyKeys.length > 0) {
          leftOnlyKeys.push.apply(leftOnlyKeys, result.leftOnlyKeys.map(completeKeyPath));
          if (!_lodash['default'].isEmpty(result.leftDiff)) {
            leftDiff[key] = result.leftDiff;
          }
        }

        if (result.rightOnlyKeys.length > 0) {
          rightOnlyKeys.push.apply(rightOnlyKeys, result.rightOnlyKeys.map(completeKeyPath));
          if (!_lodash['default'].isEmpty(result.rightDiff)) {
            rightDiff[key] = result.rightDiff;
          }
        }
      } else if (!_lodash['default'].isEqual(obj1Value, obj2Value)) {
        leftDiff[key] = obj1Value;
        rightDiff[key] = obj2Value;
        differentKeyList.push(key);
      }
    });

    return {
      differentKeys: _lodash['default'].flatten(differentKeyList),
      rightOnlyKeys: rightOnlyKeys,
      leftOnlyKeys: leftOnlyKeys,
      rightDiff: rightDiff,
      leftDiff: leftDiff
    };
  }
});
// TODO: remove below comment and address cmplexity issues (MRD - 2016-12-01)
/* eslint-disable complexity */
define('dummy/tests/helpers/ember-test-utils/setup-component-test', ['exports', 'ember', 'ember-mocha', 'dummy/tests/helpers/ember-test-utils/ember-intl', 'dummy/tests/helpers/ember-test-utils/typedefs'], function (exports, _ember, _emberMocha, _dummyTestsHelpersEmberTestUtilsEmberIntl, _dummyTestsHelpersEmberTestUtilsTypedefs) {
  exports.unit = unit;
  exports.integration = integration;

  var assign = _ember['default'].assign || _ember['default'].merge; // NOTE: only use two params in assign() since merge() doesn't take more

  // Workaround to allow stubbing dependencies during testing
  var deps = {
    addEmberIntlDeps: _dummyTestsHelpersEmberTestUtilsEmberIntl.addEmberIntlDeps,
    needsEmberIntlDeps: _dummyTestsHelpersEmberTestUtilsEmberIntl.needsEmberIntlDeps,
    setupComponentTest: _emberMocha.setupComponentTest
  };

  exports.deps = deps;
  /**
   * A helper to format describe text as well as configure setupComponent from ember-mocha
   * @param {String} name - the name of the component
   * @param {Object} options - any additional options to set
   * @returns {Test} a test config object
   */
  function component(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var testType = options.unit ? 'Unit' : 'Integration';

    if (deps.needsEmberIntlDeps(options)) {
      deps.addEmberIntlDeps(options.needs);
    }

    return {
      label: testType + ' / Component / ' + name + ' /',
      setup: function setup() {
        deps.setupComponentTest(name, options);
      }
    };
  }

  /**
   * A helper for formatting the describe text and calling setupComponentTest with proper params
   * for a component unit test
   * @param {String} name - the name of the component
   * @param {String[]} dependencies - the list of "needs" for this component
   * @param {Object} options - any additional options to set (alongside unit: true)
   * @returns {Test} a test config object
   */

  function unit(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (dependencies) {
      options.needs = dependencies;
    }
    return component(name, assign(options, { unit: true }));
  }

  /**
   * A helper for formatting the describe text and calling setupComponentTest with proper params
   * for a component integration test
   * @param {String} name - the name of the component
   * @param {Object} options - any additional options to set (alongside integration: true)
   * @returns {Test} a test config object
   */

  function integration(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return component(name, assign(options, { integration: true }));
  }
});
/**
 * Helper for streamlining setting up component tests
 */

/* eslint-disable ember-standard/destructure */
define('dummy/tests/helpers/ember-test-utils/setup-test', ['exports', 'ember', 'ember-mocha', 'dummy/tests/helpers/ember-test-utils/ember-intl', 'dummy/tests/helpers/ember-test-utils/typedefs'], function (exports, _ember, _emberMocha, _dummyTestsHelpersEmberTestUtilsEmberIntl, _dummyTestsHelpersEmberTestUtilsTypedefs) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.module = _module;
  exports.model = model;
  exports.serializer = serializer;
  exports.route = route;
  exports.controller = controller;

  // Workaround to allow stubbing dependencies during testing
  var deps = {
    addEmberIntlDeps: _dummyTestsHelpersEmberTestUtilsEmberIntl.addEmberIntlDeps,
    needsEmberIntlDeps: _dummyTestsHelpersEmberTestUtilsEmberIntl.needsEmberIntlDeps,
    setupModelTest: _emberMocha.setupModelTest,
    setupTest: _emberMocha.setupTest
  };

  exports.deps = deps;
  /**
   * A helper to format describe text as well as configure setupTest from ember-mocha
   * @param {String} name - the name of the module (including type, i.e. 'controller:foo')
   * @param {Object} options - any additional options to set
   * @returns {Test} a test config object
   */

  function _module(name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (!options.unit && !options.integration) {
      options.unit = true;
    }

    if (deps.needsEmberIntlDeps(options)) {
      deps.addEmberIntlDeps(options.needs);
    }

    var testType = options.unit ? 'Unit' : 'Integration';

    var _name$split = name.split(':');

    var _name$split2 = _slicedToArray(_name$split, 2);

    var moduleType = _name$split2[0];
    var moduleName = _name$split2[1];

    return {
      label: testType + ' / ' + _ember['default'].String.classify(moduleType) + ' / ' + moduleName + ' /',
      setup: function setup() {
        deps.setupTest(name, options);
      }
    };
  }

  /**
   * A helper for formatting the describe text and calling setupTest with proper parameters for a model unit test
   * @param {String} name - the name of the model
   * @param {String[]} dependencies - the list of "needs" for this model
   * @param {Object} options - any additional options to set (alongside unit: true)
   * @returns {Test} a test config object
   */

  function model(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (dependencies) {
      options.needs = dependencies;
    }

    if (!options.unit && !options.integration) {
      options.unit = true;
    }

    if (deps.needsEmberIntlDeps(options)) {
      deps.addEmberIntlDeps(options.needs);
    }

    var testType = options.unit ? 'Unit' : 'Integration';
    return {
      label: testType + ' / Model / ' + name + ' /',
      setup: function setup() {
        deps.setupModelTest(name, options);
      }
    };
  }

  /**
   * A helper for formatting the describe text and calling setupTest with proper parameters for a serializer unit test
   * @param {String} name - the name of the serializer
   * @param {String[]} dependencies - the list of "needs" for this serializer
   * @param {Object} options - any additional options to set (alongside unit: true)
   * @returns {Test} a test config object
   */

  function serializer(name) {
    var dependencies = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    options.needs = dependencies;

    // if the model for this serializer isn't a dependency, add it
    if (!options.needs.includes('model:' + name)) {
      options.needs.push('model:' + name);
    }

    if (!options.unit && !options.integration) {
      options.unit = true;
    }

    if (deps.needsEmberIntlDeps(options)) {
      deps.addEmberIntlDeps(options.needs);
    }

    var testType = options.unit ? 'Unit' : 'Integration';
    return {
      label: testType + ' / Serializer / ' + name + ' /',
      setup: function setup() {
        deps.setupModelTest(name, options);
      }
    };
  }

  /**
   * A helper for formatting the describe text and calling setupTest with proper parameters for a route unit test
   * @param {String} name - the name of the route
   * @param {String[]} dependencies - the list of "needs" for this route
   * @param {Object} options - any additional options to set (alongside unit: true)
   * @returns {Test} a test config object
   */

  function route(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (dependencies) {
      options.needs = dependencies;
    }
    return _module('route:' + name, options);
  }

  /**
   * A helper for formatting the describe text and calling setupTest with proper parameters for a controller unit test
   * @param {String} name - the name of the controller
   * @param {String[]} dependencies - the list of "needs" for this controller
   * @param {Object} options - any additional options to set (alongside unit: true)
   * @returns {Test} a test config object
   */

  function controller(name, dependencies) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (dependencies) {
      options.needs = dependencies;
    }
    return _module('controller:' + name, options);
  }
});
/**
 * Helper for streamlining setting up mocha tests
 */
define("dummy/tests/helpers/ember-test-utils/typedefs", ["exports"], function (exports) {
  exports.getDeprecationMessage = getDeprecationMessage;
  /**
   * Type definitions used in ember-test-utils helpers
   */

  /**
   * @typedef Test
   * Configuration information for a test
   * @property {String} label - the label for the test (to be passed as first param to describe())
   * @property {Function} setup - a function that will call setupComponent or setupTest to setup the mocha test
   */

  /**
   * Helper to ease creation of deprecation messages
   * @param {String} methodName - the name of the method the deprecated helper was helping
   * @returns {String} the deprecation message
   */

  function getDeprecationMessage(methodName) {
    return methodName + "() helpers have been deprecated since " + methodName + "() itself is now deprecated";
  }
});
define('dummy/tests/helpers/mock-component', ['exports', 'ember'], function (exports, _ember) {
  exports.registerMockComponent = registerMockComponent;
  exports.unregisterMockComponent = unregisterMockComponent;
  var Component = _ember['default'].Component;
  var getOwner = _ember['default'].getOwner;
  var merge = _ember['default'].merge;

  function registerMockComponent(context) {
    var name = arguments.length <= 1 || arguments[1] === undefined ? 'mock-component' : arguments[1];
    var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var owner = getOwner(context);
    var options = merge({ tagName: 'dummy' }, opts);
    var mockComponent = Component.extend(options);

    unregisterMockComponent(context);
    owner.register('component:' + name, mockComponent);
  }

  function unregisterMockComponent(context) {
    var name = arguments.length <= 1 || arguments[1] === undefined ? 'mock-component' : arguments[1];

    var owner = getOwner(context);

    if (owner.resolveRegistration('component:' + name)) {
      owner.unregister('component:' + name);
    }
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/destroy-app', 'dummy/tests/helpers/start-app'], function (exports, _qunit, _dummyTestsHelpersDestroyApp, _dummyTestsHelpersStartApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _dummyTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _dummyTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/config/environment', 'dummy/resolver'], function (exports, _dummyConfigEnvironment, _dummyResolver) {

  var resolver = _dummyResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _dummyApp, _dummyConfigEnvironment) {
  exports['default'] = startApp;
  var merge = _ember['default'].merge;
  var run = _ember['default'].run;

  function startApp(attrs) {
    var application = undefined;

    var attributes = merge({}, _dummyConfigEnvironment['default'].APP);
    attributes = merge(attributes, attrs); // use defaults, but you can override;

    run(function () {
      application = _dummyApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('dummy/tests/integration/components/frost-list-content-container-test', ['exports', 'chai', 'ember-hook', 'ember-test-helpers/wait', 'mocha', 'sinon', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _emberHook, _emberTestHelpersWait, _mocha, _sinon, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.integration)('frost-list-content-container');
  _mocha.describe.skip(test.label, function () {
    test.setup();

    var sandbox = undefined;

    (0, _mocha.beforeEach)(function () {
      sandbox = _sinon['default'].sandbox.create();
    });

    (0, _mocha.afterEach)(function () {
      sandbox.restore();
    });

    (0, _mocha.it)('should have real tests', function () {
      (0, _chai.expect)(true).to.equal(false);
    });

    (0, _mocha.describe)('after render', function () {
      (0, _mocha.beforeEach)(function () {
        this.setProperties({
          myHook: 'myThing'
        });

        this.render(Ember.HTMLBars.template({
          'id': 'hGXMsT3l',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list-content-container"],null,[["hook"],[["get",["myHook"]]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        return (0, _emberTestHelpersWait['default'])();
      });

      (0, _mocha.it)('should have an element', function () {
        (0, _chai.expect)(this.$()).to.have.length(1);
      });

      (0, _mocha.it)('should be accessible via the hook', function () {
        (0, _chai.expect)((0, _emberHook.$hook)('myThing')).to.have.length(1);
      });
    });
  });
});
/**
 * Integration test for the frost-list-content-container component
 */
define('dummy/tests/integration/components/frost-list-core-test', ['exports', 'chai', 'mocha', 'dummy/tests/helpers/mock-component', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _mocha, _dummyTestsHelpersMockComponent, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.integration)('frost-list-core');
  _mocha.describe.skip(test.label, function () {
    test.setup();

    _mocha.it.skip('Header section renders when "sorting" is passed in', function () {
      (0, _dummyTestsHelpersMockComponent.registerMockComponent)(this, 'mock-sort');

      this.render(Ember.HTMLBars.template({
        'id': '8Oys20zW',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["frost-list-core"],null,[["sorting"],[["helper",["component"],["mock-sort"],[["class"],["mock-sort"]]]]]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.$('.frost-list-header'), 'header section is rendered').to.have.length(1);

      (0, _chai.expect)(this.$('.mock-sort'), 'sort component is rendered').to.have.length(1);

      (0, _dummyTestsHelpersMockComponent.unregisterMockComponent)(this);
    });

    _mocha.it.skip('Header section renders when "expansion" is passed in', function () {
      (0, _dummyTestsHelpersMockComponent.registerMockComponent)(this, 'mock-expansion');

      this.render(Ember.HTMLBars.template({
        'id': 'gK6kVktk',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["frost-list-core"],null,[["expansion"],[["helper",["component"],["mock-expansion"],[["class"],["mock-expansion"]]]]]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.$('.frost-list-header'), 'header section is rendered').to.have.length(1);

      (0, _chai.expect)(this.$('.mock-expansion'), 'expansion component is rendered').to.have.length(1);

      (0, _dummyTestsHelpersMockComponent.unregisterMockComponent)(this);
    });
  });
});
define('dummy/tests/integration/components/frost-list-expansion-test', ['exports', 'chai', 'ember-hook', 'mocha', 'sinon', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _emberHook, _mocha, _sinon, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.integration)('frost-list-expansion');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var sandbox = undefined;

    (0, _mocha.beforeEach)(function () {
      (0, _emberHook.initialize)();
      sandbox = _sinon['default'].sandbox.create();
    });

    (0, _mocha.afterEach)(function () {
      sandbox.restore();
    });

    _mocha.it.skip('renders with default class', function () {
      this.render(Ember.HTMLBars.template({
        'id': 'AWEOUJdm',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["frost-list-expansion"],null,[["onCollapseAll","onExpandAll"],["onCollapseAll","onExpandAll"]]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.$('.frost-list-expansion')).to.be.length(1);
    });

    _mocha.it.skip('fires onCollapseAll closure action', function () {
      var collapseAllSpy = sandbox.spy();

      this.on('collapseAllAction', collapseAllSpy);

      this.render(Ember.HTMLBars.template({
        'id': 'JyUNvaqZ',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["frost-list-expansion"],null,[["onCollapseAll","onExpandAll"],[["helper",["action"],[["get",[null]],"collapseAllAction"],null],"onExpandAll"]]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      this.$((0, _emberHook.$hook)('-collapse-all')).trigger('click');

      (0, _chai.expect)(collapseAllSpy.called).to.eql(true);
    });

    _mocha.it.skip('fires onExpandAll closure action', function () {
      var expandAllSpy = sandbox.spy();

      this.on('expandAllAction', expandAllSpy);

      this.render(Ember.HTMLBars.template({
        'id': 'Vqw+WV0a',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["frost-list-expansion"],null,[["onCollapseAll","onExpandAll"],["onCollapseAll",["helper",["action"],[["get",[null]],"expandAllAction"],null]]]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      this.$((0, _emberHook.$hook)('-expand-all')).trigger('click');

      (0, _chai.expect)(expandAllSpy.called).to.eql(true);
    });

    _mocha.describe.skip('concatenates the hook property', function () {
      (0, _mocha.beforeEach)(function () {
        this.render(Ember.HTMLBars.template({
          'id': '/ppTYoaZ',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list-expansion"],null,[["hook","onCollapseAll","onExpandAll"],["my-list","onCollapseAll","onExpandAll"]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });

      (0, _mocha.it)('sets -collapse-all hook correctly', function () {
        (0, _chai.expect)((0, _emberHook.$hook)('my-list-collapse-all').text().trim()).to.equal('Collapse all');
      });

      (0, _mocha.it)('sets -expand-all hook correctly', function () {
        (0, _chai.expect)((0, _emberHook.$hook)('my-list-expand-all').text().trim()).to.equal('Expand all');
      });
    });
  });
});
define("dummy/tests/integration/components/frost-list-item-expansion-test", ["exports"], function (exports) {});
/**
 * Integration test for the frost-list-item-expansion component
 */

// import {expect} from 'chai'
// import hbs from 'htmlbars-inline-precompile'
// import {$hook, initialize as initializeHook} from 'ember-hook'
// import wait from 'ember-test-helpers/wait'
// import {afterEach, beforeEach, describe, it} from 'mocha'
// import sinon from 'sinon'

// import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

// const test = integration('frost-list-item-expansion')
// describe(test.label, function () {
//   test.setup()

//   let sandbox

//   beforeEach(function () {
//     sandbox = sinon.sandbox.create()
//     initializeHook()
//   })

//   afterEach(function () {
//     sandbox.restore()
//   })

//   it.skip('should have real tests', function () {
//     expect(true).to.equal(false)
//   })

//   describe.skip('after render', function () {
//     beforeEach(function () {
//       this.setProperties({
//         myHook: 'myThing'
//       })

//       this.render(hbs`
//         {{frost-list-item-expansion
//           hook=myHook
//         }}
//       `)

//       return wait()
//     })

//     it('should have an element', function () {
//       expect(this.$()).to.have.length(1)
//     })

//     it('should be accessible via the hook', function () {
//       expect($hook('myThing')).to.have.length(1)
//     })
//   })
// })
define("dummy/tests/integration/components/frost-list-item-selection-test", ["exports"], function (exports) {});
/**
 * Integration test for the frost-list-item-selection component
 */

// import {expect} from 'chai'
// import hbs from 'htmlbars-inline-precompile'
// import {$hook, initialize as initializeHook} from 'ember-hook'
// import wait from 'ember-test-helpers/wait'
// import {afterEach, beforeEach, describe, it} from 'mocha'
// import sinon from 'sinon'

// import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

// const test = integration('frost-list-item-selection')
// describe(test.label, function () {
//   test.setup()

//   let sandbox

//   beforeEach(function () {
//     sandbox = sinon.sandbox.create()
//     initializeHook()
//   })

//   afterEach(function () {
//     sandbox.restore()
//   })

//   it.skip('should have real tests', function () {
//     expect(true).to.equal(false)
//   })

//   describe.skip('after render', function () {
//     beforeEach(function () {
//       this.setProperties({
//         myHook: 'myThing'
//       })

//       this.render(hbs`
//         {{frost-list-item-selection
//           hook=myHook
//         }}
//       `)

//       return wait()
//     })

//     it('should have an element', function () {
//       expect(this.$()).to.have.length(1)
//     })

//     it('should be accessible via the hook', function () {
//       expect($hook('myThing')).to.have.length(1)
//     })
//   })
// })
define('dummy/tests/integration/components/frost-list-item-test', ['exports', 'chai', 'mocha', 'sinon', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _mocha, _sinon, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.integration)('frost-list-item');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var sandbox = undefined;

    (0, _mocha.beforeEach)(function () {
      sandbox = _sinon['default'].sandbox.create();
    });

    (0, _mocha.afterEach)(function () {
      sandbox.restore();
    });

    _mocha.describe.skip('default state has no class "is-selected" and "is-expanded"', function () {
      (0, _mocha.beforeEach)(function () {
        this.render(Ember.HTMLBars.template({
          'id': 'l9uNvo3r',
          'block': '{"statements":[["text","\\n        "],["append",["unknown",["frost-list-item"]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });

      (0, _mocha.it)('does NOT set "is-selected" class', function () {
        (0, _chai.expect)(this.$('.frost-list-item').hasClass('is-selected')).to.eql(false);
      });

      (0, _mocha.it)('does NOT set "is-expanded" class', function () {
        (0, _chai.expect)(this.$('.frost-list-item').hasClass('is-expanded')).to.eql(false);
      });
    });

    _mocha.it.skip('sets "is-selected" class when model.isSelected=true', function () {
      this.set('model', { isSelected: true });

      this.render(Ember.HTMLBars.template({
        'id': '8pPd7vmj',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["frost-list-item"],null,[["model"],[["get",["model"]]]]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.$('.frost-list-item').hasClass('is-selected')).to.eql(true);
    });

    _mocha.it.skip('sets "is-expanded" class when model.isSelected=true', function () {
      this.set('model', { isExpanded: true });

      this.render(Ember.HTMLBars.template({
        'id': '8pPd7vmj',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["frost-list-item"],null,[["model"],[["get",["model"]]]]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.$('.frost-list-item').hasClass('is-expanded')).to.eql(true);
    });

    _mocha.describe.skip('onSelect closure action', function () {
      var externalActionSpy = undefined;
      (0, _mocha.beforeEach)(function () {
        externalActionSpy = sandbox.spy();

        this.on('externalAction', externalActionSpy);
        this.set('model', { isSelected: true });

        this.render(Ember.HTMLBars.template({
          'id': 'cpMYzlY5',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list-item"],null,[["model","onSelect"],[["get",["model"]],["helper",["action"],[["get",[null]],"externalAction"],null]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        this.$('.frost-list-item').trigger('click');
      });

      (0, _mocha.it)('passes event obeject', function () {
        (0, _chai.expect)(externalActionSpy.args[0][0]).to.have.property('type', 'click');
      });

      (0, _mocha.it)('passes "record" property', function () {
        (0, _chai.expect)(externalActionSpy.args[0][1].record.isSelected).to.eql(true);
      });

      (0, _mocha.it)('passes selectDesc object', function () {
        (0, _chai.expect)(externalActionSpy.args[0][1].selectDesc).to.eql({
          'isSelected': false,
          'isTargetSelectionIndicator': false
        });
      });
    });
  });
});
define('dummy/tests/integration/components/frost-list-pagination-test', ['exports', 'chai', 'ember-hook', 'mocha', 'sinon', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _emberHook, _mocha, _sinon, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.integration)('frost-list-pagination');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var sandbox = undefined;

    (0, _mocha.beforeEach)(function () {
      (0, _emberHook.initialize)();
      sandbox = _sinon['default'].sandbox.create();
    });

    (0, _mocha.afterEach)(function () {
      sandbox.restore();
    });

    _mocha.describe.skip('default render state', function () {
      (0, _mocha.beforeEach)(function () {
        this.set('actions', {
          onChange: function onChange() {}
        });

        this.render(Ember.HTMLBars.template({
          'id': 'Y23IgUkR',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-pagination"],null,[["itemsPerPage","page","total","hook","onChange"],[10,0,100,"myHook",["helper",["action"],[["get",[null]],"onChange"],null]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });

      (0, _mocha.it)('sets frost-pagination class', function () {
        (0, _chai.expect)(this.$('.frost-pagination')).to.have.length(1);
      });

      (0, _mocha.it)('shows correct pagination text', function () {
        (0, _chai.expect)(this.$('.frost-pagination-text').text().trim()).to.eql('1 to 10 of 100');
      });

      (0, _mocha.describe)('hooks', function () {
        (0, _mocha.it)('sets "-first-page" hook', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-first-page'))).to.have.length(1);
        });

        (0, _mocha.it)('sets "-previous-page" hook', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-previous-page'))).to.have.length(1);
        });

        (0, _mocha.it)('sets "-next-page" hook', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-next-page'))).to.have.length(1);
        });

        (0, _mocha.it)('sets "-last-page" hook', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-last-page'))).to.have.length(1);
        });
      });

      (0, _mocha.describe)('disables buttons on the left', function () {
        (0, _mocha.it)('disables "first page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-first-page')).prop('disabled')).to.eql(true);
        });

        (0, _mocha.it)('disables "previous page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-previous-page')).prop('disabled')).to.eql(true);
        });
      });

      (0, _mocha.describe)('enables buttons on the right', function () {
        (0, _mocha.it)('enables "last page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-last-page')).prop('disabled')).to.eql(false);
        });

        (0, _mocha.it)('enables "next page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-next-page')).prop('disabled')).to.eql(false);
        });
      });
    });

    _mocha.describe.skip('on page "11 to 20"', function () {
      (0, _mocha.beforeEach)(function () {
        this.set('actions', {
          onChange: function onChange() {}
        });

        this.render(Ember.HTMLBars.template({
          'id': 'O1vl19GK',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-pagination"],null,[["itemsPerPage","page","total","hook","onChange"],[10,1,100,"myHook",["helper",["action"],[["get",[null]],"onChange"],null]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });

      (0, _mocha.it)('shows correct pagination text', function () {
        (0, _chai.expect)(this.$('.frost-pagination-text').text().trim()).to.eql('11 to 20 of 100');
      });

      (0, _mocha.describe)('enable all buttons', function () {
        (0, _mocha.it)('enables "first page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-first-page')).prop('disabled')).to.eql(false);
        });

        (0, _mocha.it)('enables "previous page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-previous-page')).prop('disabled')).to.eql(false);
        });

        (0, _mocha.it)('enables "next page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-next-page')).prop('disabled')).to.eql(false);
        });

        (0, _mocha.it)('enables "last page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-last-page')).prop('disabled')).to.eql(false);
        });
      });
    });

    _mocha.describe.skip('on last page', function () {
      (0, _mocha.beforeEach)(function () {
        this.set('actions', {
          onChange: function onChange() {}
        });

        this.render(Ember.HTMLBars.template({
          'id': 'h8ehA0Ic',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-pagination"],null,[["itemsPerPage","page","total","hook","onChange"],[10,9,100,"myHook",["helper",["action"],[["get",[null]],"onChange"],null]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });

      (0, _mocha.it)('shows correct pagination text', function () {
        (0, _chai.expect)(this.$('.frost-pagination-text').text().trim()).to.eql('91 to 100 of 100');
      });

      (0, _mocha.describe)('enables buttons on the left', function () {
        (0, _mocha.it)('enables "first page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-first-page')).prop('disabled')).to.eql(false);
        });

        (0, _mocha.it)('enables "previous page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-previous-page')).prop('disabled')).to.eql(false);
        });
      });

      (0, _mocha.describe)('disables buttons on the right', function () {
        (0, _mocha.it)('disables "next page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-next-page')).prop('disabled')).to.eql(true);
        });

        (0, _mocha.it)('disables "last page" button', function () {
          (0, _chai.expect)(this.$((0, _emberHook.$hook)('myHook-last-page')).prop('disabled')).to.eql(true);
        });
      });
    });

    _mocha.describe.skip('fires onChange closure action', function () {
      var onChangeSpy = undefined;

      (0, _mocha.beforeEach)(function () {
        onChangeSpy = sandbox.spy();
        this.on('onChangeAction', onChangeSpy);

        this.render(Ember.HTMLBars.template({
          'id': 'RmM4Z/Nf',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-pagination"],null,[["itemsPerPage","page","total","hook","onChange"],[10,0,100,"myHook",["helper",["action"],[["get",[null]],"onChangeAction"],null]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));

        this.$((0, _emberHook.$hook)('myHook-next-page')).trigger('click');
      });

      (0, _mocha.it)('fires onChangeSpy', function () {
        (0, _chai.expect)(onChangeSpy.called).to.eql(true);
      });
    });
  });
});
define('dummy/tests/integration/components/frost-list-selection-indicator-test', ['exports', 'chai', 'mocha', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _mocha, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.integration)('frost-list-selection-indicator');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    _mocha.it.skip('"selected" class is NOT set by default', function () {
      this.render(Ember.HTMLBars.template({
        'id': '9XmaUKzk',
        'block': '{"statements":[["text","\\n      "],["append",["unknown",["frost-list-selection-indicator"]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.$('.frost-list-selection-indicator').hasClass('selected')).to.eql(false);
    });

    _mocha.it.skip('sets "selected" class when isSelected=true', function () {
      this.render(Ember.HTMLBars.template({
        'id': 'edxMEZEN',
        'block': '{"statements":[["text","\\n      "],["append",["helper",["frost-list-selection-indicator"],null,[["isSelected"],[true]]],false],["text","\\n    "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
        'meta': {}
      }));

      (0, _chai.expect)(this.$('.frost-list-selection-indicator').hasClass('selected')).to.eql(true);
    });
  });
});
define('dummy/tests/integration/components/frost-list-test', ['exports', 'chai', 'ember', 'ember-data-factory-guy', 'ember-hook', 'ember-test-helpers/wait', 'mocha', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _ember, _emberDataFactoryGuy, _emberHook, _emberTestHelpersWait, _mocha, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {
  var A = _ember['default'].A;

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.integration)('frost-list', {
    setup: function setup() {
      (0, _emberDataFactoryGuy.manualSetup)(this.container);
    }
  });
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    (0, _mocha.beforeEach)(function () {
      (0, _emberHook.initialize)();
    });

    _mocha.describe.skip('renders frost-list-item', function () {
      (0, _mocha.beforeEach)(function () {
        var list = A();
        list.addObject((0, _emberDataFactoryGuy.make)('list-item'));

        this.set('items', list);

        this.render(_ember['default'].HTMLBars.template({
          'id': 'FxwORLqb',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list"],null,[["item","items"],[["helper",["component"],["frost-list-item"],null],["get",["items"]]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });

      (0, _mocha.it)('sets "frost-list" class', function () {
        var _this = this;

        return (0, _emberTestHelpersWait['default'])().then(function () {
          (0, _chai.expect)(_this.$('.frost-list')).to.have.length(1);
        });
      });

      (0, _mocha.it)('has one vertical item created', function () {
        var _this2 = this;

        return (0, _emberTestHelpersWait['default'])().then(function () {
          (0, _chai.expect)(_this2.$('.vertical-item')).to.have.length(1);
        });
      });

      (0, _mocha.it)('creates one list item', function () {
        var _this3 = this;

        return (0, _emberTestHelpersWait['default'])().then(function () {
          (0, _chai.expect)(_this3.$('.frost-list-item')).to.have.length(1);
        });
      });
    });

    _mocha.describe.skip('renders frost-list-item from "config" property', function () {
      (0, _mocha.beforeEach)(function () {
        var list = A();
        list.addObject((0, _emberDataFactoryGuy.make)('list-item'));

        var testConfig = {
          items: list,
          component: 'frost-list-item',
          expansion: {
            onCollapseAll: 'collapseItems',
            onExpandAll: 'expandItems'
          },
          selection: {
            onSelect: 'selectItem'
          },
          sorting: {
            activeSorting: [],
            properties: [],
            onSort: 'sortItems'
          },
          infiniteScroll: {
            loadNext: 'loadNext',
            loadPrevious: 'loadPrevious'
          }
        };

        this.set('testConfig', testConfig);

        this.render(_ember['default'].HTMLBars.template({
          'id': 'vpG1qyxK',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list"],null,[["config"],[["get",["testConfig"]]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
      });

      (0, _mocha.it)('sets "frost-list" class', function () {
        var _this4 = this;

        return (0, _emberTestHelpersWait['default'])().then(function () {
          (0, _chai.expect)(_this4.$('.frost-list')).to.have.length(1);
        });
      });

      (0, _mocha.it)('creates one vertical item', function () {
        var _this5 = this;

        return (0, _emberTestHelpersWait['default'])().then(function () {
          (0, _chai.expect)(_this5.$('.vertical-item')).to.have.length(1);
        });
      });

      (0, _mocha.it)('creates one list item', function () {
        var _this6 = this;

        return (0, _emberTestHelpersWait['default'])().then(function () {
          (0, _chai.expect)(_this6.$('.frost-list-item')).to.have.length(1);
        });
      });
    });

    (0, _mocha.describe)('Supports pre selection with default itemKey', function () {
      (0, _mocha.beforeEach)(function () {
        var one = _ember['default'].Object.create({ isNotCompared: '0' });
        var two = _ember['default'].Object.create({ isNotCompared: '1' });
        var testItems = [one, two];
        var testSelectedItems = [one];
        this.set('items', testItems);
        this.set('selectedItems', testSelectedItems);
        this.render(_ember['default'].HTMLBars.template({
          'id': 'j1G66LgJ',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list"],null,[["item","hook","items","selectedItems"],[["helper",["component"],["frost-list-item"],null],"my-list",["get",["items"]],["get",["selectedItems"]]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        return (0, _emberTestHelpersWait['default'])();
      });

      (0, _mocha.it)('item 0 is selected', function () {
        (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
      });

      (0, _mocha.it)('item 1 is not selected', function () {
        (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(false);
      });

      (0, _mocha.it)('selectedItems length to be 1', function () {
        (0, _chai.expect)(this.get('selectedItems').length).to.eql(1);
      });
    });

    (0, _mocha.describe)('Supports pre selection with custom itemKey', function () {
      (0, _mocha.beforeEach)(function () {
        var testItems = [_ember['default'].Object.create({ id: '0' }), _ember['default'].Object.create({ id: '1' })];
        var testSelectedItems = [_ember['default'].Object.create({ id: '0' })];

        this.set('items', testItems);
        this.set('selectedItems', testSelectedItems);

        this.render(_ember['default'].HTMLBars.template({
          'id': 'xybXJcAI',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list"],null,[["item","hook","items","selectedItems","itemKey"],[["helper",["component"],["frost-list-item"],null],"my-list",["get",["items"]],["get",["selectedItems"]],"id"]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        return (0, _emberTestHelpersWait['default'])();
      });

      (0, _mocha.it)('item 0 is selected', function () {
        (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
      });
      (0, _mocha.it)('item 1 is not selected', function () {
        (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(false);
      });

      (0, _mocha.it)('selectedItems length to be 1', function () {
        (0, _chai.expect)(this.get('selectedItems').length).to.eql(1);
      });
    });

    (0, _mocha.describe)('When using custom itemKey', function () {
      (0, _mocha.describe)('When Infinite', function () {
        (0, _mocha.beforeEach)(function () {
          var _this7 = this;

          var testItems = A([_ember['default'].Object.create({ id: '0' }), _ember['default'].Object.create({ id: '1' })]);

          this.set('items', testItems);
          var testSelectedItems = A([]);
          this.set('selectedItems', testSelectedItems);
          this.set('onSelectionChange', function (selectedItems) {
            _this7.get('selectedItems').setObjects(selectedItems);
          });
          this.render(_ember['default'].HTMLBars.template({
            'id': 'rGVHiBh1',
            'block': '{"statements":[["text","\\n          "],["append",["helper",["frost-list"],null,[["item","hook","items","pagination","selectedItems","onSelectionChange","itemKey"],[["helper",["component"],["frost-list-item"],null],"my-list",["get",["items"]],["helper",["component"],["frost-list-pagination"],[["page","itemsPerPage","total","onChange"],[0,100,100,["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["currentPage"]]],null]],null]]]],["get",["selectedItems"]],["get",["onSelectionChange"]],"id"]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));
          return (0, _emberTestHelpersWait['default'])();
        });

        (0, _mocha.describe)('Supports basic click', function () {
          (0, _mocha.describe)('Selecting item 0', function () {
            (0, _mocha.beforeEach)(function () {
              $((0, _emberHook.hook)('my-list-item', { index: 0 })).click();
              return (0, _emberTestHelpersWait['default'])();
            });

            (0, _mocha.it)('item 0 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 1 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('selectedItems length to be 1', function () {
              (0, _chai.expect)(this.get('selectedItems').length).to.eql(1);
            });

            (0, _mocha.describe)('Selecting previous selected item', function () {
              (0, _mocha.beforeEach)(function () {
                $((0, _emberHook.hook)('my-list-item', { index: 0 })).click();
                return (0, _emberTestHelpersWait['default'])();
              });

              (0, _mocha.it)('item 0 is not selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('item 1 is not selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('selectedItems length to be 0', function () {
                (0, _chai.expect)(this.get('selectedItems').length).to.eql(0);
              });
            });
          });

          (0, _mocha.describe)('All items selected, then select item 0', function () {
            (0, _mocha.beforeEach)(function () {
              $((0, _emberHook.hook)('my-list-selection', { index: 0 })).click();
              $((0, _emberHook.hook)('my-list-selection', { index: 1 })).click();
              $((0, _emberHook.hook)('my-list-item', { index: 0 })).click();
              return (0, _emberTestHelpersWait['default'])();
            });

            (0, _mocha.it)('item 0 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 1 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('selectedItems length to be 1', function () {
              (0, _chai.expect)(this.get('selectedItems').length).to.eql(1);
            });
          });
        });

        (0, _mocha.describe)('Supports specific click', function () {
          (0, _mocha.describe)('Selecting item 0', function () {
            (0, _mocha.beforeEach)(function () {
              (0, _emberHook.$hook)('my-list-selection', { index: 0 }).click();
              return (0, _emberTestHelpersWait['default'])();
            });

            (0, _mocha.it)('item 0 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
            });
            (0, _mocha.it)('item 1 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('selectedItems length to be 1', function () {
              (0, _chai.expect)(this.get('selectedItems').length).to.eql(1);
            });

            (0, _mocha.describe)('Unselecting item 1', function () {
              (0, _mocha.beforeEach)(function () {
                (0, _emberHook.$hook)('my-list-selection', { index: 0 }).click();
                return (0, _emberTestHelpersWait['default'])();
              });

              (0, _mocha.it)('item 0 is not selected', function () {
                (0, _chai.expect)($((0, _emberHook.$hook)('my-list-item-container', { index: 0 })).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('item 1 is not selected', function () {
                (0, _chai.expect)($((0, _emberHook.$hook)('my-list-item-container', { index: 1 })).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('selectedItems length to be 0', function () {
                (0, _chai.expect)(this.get('selectedItems').length).to.eql(0);
              });
            });
          });

          (0, _mocha.describe)('Selecting every item', function () {
            (0, _mocha.beforeEach)(function () {
              (0, _emberHook.$hook)('my-list-selection', { index: 0 }).click();
              (0, _emberHook.$hook)('my-list-selection', { index: 1 }).click();
              return (0, _emberTestHelpersWait['default'])();
            });

            (0, _mocha.it)('item 0 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 1 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('selectedItems length to be 2', function () {
              (0, _chai.expect)(this.get('selectedItems').length).to.eql(2);
            });

            (0, _mocha.describe)('Unselect each item', function () {
              (0, _mocha.beforeEach)(function () {
                (0, _emberHook.$hook)('my-list-selection', { index: 0 }).click();
                (0, _emberHook.$hook)('my-list-selection', { index: 1 }).click();
                return (0, _emberTestHelpersWait['default'])();
              });

              (0, _mocha.it)('item 0 is not selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('item 1 is not selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('selectedItems length to be 0', function () {
                (0, _chai.expect)(this.get('selectedItems').length).to.eql(0);
              });
            });
          });
        });

        (0, _mocha.describe)('Supports ranged base clicks', function () {
          (0, _mocha.beforeEach)(function () {
            var testItems = A([_ember['default'].Object.create({ id: '0' }), _ember['default'].Object.create({ id: '1' }), _ember['default'].Object.create({ id: '2' }), _ember['default'].Object.create({ id: '3' }), _ember['default'].Object.create({ id: '4' }), _ember['default'].Object.create({ id: '5' }), _ember['default'].Object.create({ id: '6' })]);
            this.set('items', testItems);
            return (0, _emberTestHelpersWait['default'])();
          });

          (0, _mocha.describe)('When using shift click from item1-5', function () {
            (0, _mocha.beforeEach)(function () {
              var clickEvent = $.Event('click');
              clickEvent.shiftKey = true;
              var clickEvent2 = $.Event('click');
              clickEvent2.shiftKey = true;
              $((0, _emberHook.hook)('my-list-item', { index: 1 })).trigger(clickEvent);
              $((0, _emberHook.hook)('my-list-item', { index: 5 })).trigger(clickEvent2);
              return (0, _emberTestHelpersWait['default'])();
            });

            (0, _mocha.it)('item 0 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('item 1 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 2 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 3 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 3 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 4 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 4 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 5 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 5 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 6 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 6 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('selectedItems length to be 5', function () {
              (0, _chai.expect)(this.get('selectedItems').length).to.eql(5);
            });
          });

          (0, _mocha.describe)('When using shift click on item 1', function () {
            (0, _mocha.beforeEach)(function () {
              var clickEvent = $.Event('click');
              clickEvent.shiftKey = true;
              $((0, _emberHook.hook)('my-list-item', { index: 1 })).trigger(clickEvent);
              return (0, _emberTestHelpersWait['default'])();
            });

            (0, _mocha.it)('item 0 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('item 1 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 2 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('item 3 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 3 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('item 4 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 4 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('item 5 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 5 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('item 6 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 6 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('selectedItems length to be 1', function () {
              (0, _chai.expect)(this.get('selectedItems').length).to.eql(1);
            });

            (0, _mocha.describe)('When using shift click on item 3', function () {
              (0, _mocha.beforeEach)(function () {
                var clickEvent = $.Event('click');
                clickEvent.shiftKey = true;
                $((0, _emberHook.hook)('my-list-item', { index: 3 })).trigger(clickEvent);
                return (0, _emberTestHelpersWait['default'])();
              });

              (0, _mocha.it)('item 0 is not selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('item 1 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('item 2 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('item 3 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 3 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('item 4 is not selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 4 }).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('item 5 is not selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 5 }).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('item 6 is not selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 6 }).hasClass('is-selected')).to.eql(false);
              });

              (0, _mocha.it)('selectedItems length to be 3', function () {
                (0, _chai.expect)(this.get('selectedItems').length).to.eql(3);
              });

              (0, _mocha.describe)('When using shift click on item 5', function () {
                (0, _mocha.beforeEach)(function () {
                  var clickEvent = $.Event('click');
                  clickEvent.shiftKey = true;
                  $((0, _emberHook.hook)('my-list-item', { index: 5 })).trigger(clickEvent);
                  return (0, _emberTestHelpersWait['default'])();
                });

                (0, _mocha.it)('item 0 is not selected', function () {
                  (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
                });

                (0, _mocha.it)('item 1 is selected', function () {
                  (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
                });

                (0, _mocha.it)('item 2 is selected', function () {
                  (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(true);
                });

                (0, _mocha.it)('item 3 is selected', function () {
                  (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 3 }).hasClass('is-selected')).to.eql(true);
                });

                (0, _mocha.it)('item 4 is selected', function () {
                  (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 4 }).hasClass('is-selected')).to.eql(true);
                });

                (0, _mocha.it)('item 5 is selected', function () {
                  (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 5 }).hasClass('is-selected')).to.eql(true);
                });

                (0, _mocha.it)('item 6 is not selected', function () {
                  (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 6 }).hasClass('is-selected')).to.eql(false);
                });

                (0, _mocha.it)('selectedItems length to be 5', function () {
                  (0, _chai.expect)(this.get('selectedItems').length).to.eql(5);
                });

                (0, _mocha.describe)('When using shift click on item 1', function () {
                  (0, _mocha.beforeEach)(function () {
                    var clickEvent = $.Event('click');
                    clickEvent.shiftKey = true;
                    $((0, _emberHook.hook)('my-list-item', { index: 1 })).trigger(clickEvent);
                    return (0, _emberTestHelpersWait['default'])();
                  });

                  (0, _mocha.it)('item 0 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 1 is selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
                  });

                  (0, _mocha.it)('item 2 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 3 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 3 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 4 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 4 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 5 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 5 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 6 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 6 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('selectedItems length to be 1', function () {
                    (0, _chai.expect)(this.get('selectedItems').length).to.eql(1);
                  });
                });

                (0, _mocha.describe)('When using shift click on item 0', function () {
                  (0, _mocha.beforeEach)(function () {
                    var clickEvent = $.Event('click');
                    clickEvent.shiftKey = true;
                    $((0, _emberHook.hook)('my-list-item', { index: 0 })).trigger(clickEvent);
                    return (0, _emberTestHelpersWait['default'])();
                  });

                  (0, _mocha.it)('item 0 is selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
                  });

                  (0, _mocha.it)('item 1 is selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
                  });

                  (0, _mocha.it)('item 2 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 3 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 3 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 4 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 4 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 5 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 5 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('item 6 is not selected', function () {
                    (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 6 }).hasClass('is-selected')).to.eql(false);
                  });

                  (0, _mocha.it)('selectedItems length to be 2', function () {
                    (0, _chai.expect)(this.get('selectedItems').length).to.eql(2);
                  });
                });
              });
            });
          });
        });
      });

      (0, _mocha.describe)('When Paged', function () {
        (0, _mocha.beforeEach)(function () {
          var _this8 = this;

          // Note: DON'T change the seeding, the object creation/destruction is intentional
          // to prove that comparison of selected items only via key works!
          var testItems = A([_ember['default'].Object.create({ id: '0' }), _ember['default'].Object.create({ id: '1' }), _ember['default'].Object.create({ id: '2' })]);
          this.set('actions', {
            onChange: function onChange(page) {
              this.set('page', page);
              if (page === 0) {
                this.set('items', A([_ember['default'].Object.create({ id: '0' }), _ember['default'].Object.create({ id: '1' }), _ember['default'].Object.create({ id: '2' })]));
              } else if (page === 1) {
                this.set('items', A([_ember['default'].Object.create({ id: '3' }), _ember['default'].Object.create({ id: '4' }), _ember['default'].Object.create({ id: '5' })]));
              }
            }
          });
          this.set('items', testItems);
          var testSelectedItems = A([]);
          this.set('selectedItems', testSelectedItems);
          this.set('onSelectionChange', function (selectedItems) {
            _this8.get('selectedItems').setObjects(selectedItems);
          });
          this.set('page', 0);
          this.render(_ember['default'].HTMLBars.template({
            'id': 'f9PTb0rN',
            'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list"],null,[["item","hook","items","selectedItems","onSelectionChange","itemKey","pagination"],[["helper",["component"],["frost-list-item"],null],"my-list",["get",["items"]],["get",["selectedItems"]],["get",["onSelectionChange"]],"id",["helper",["component"],["frost-list-pagination"],[["itemsPerPage","onChange","page","total"],[3,["helper",["action"],[["get",[null]],"onChange"],null],["get",["page"]],6]]]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
            'meta': {}
          }));
          return (0, _emberTestHelpersWait['default'])();
        });

        (0, _mocha.it)('display proper pagination 1 to 3 of 6', function () {
          (0, _chai.expect)($('.frost-list-pagination-text').text().trim()).to.eql('1 to 3 of 6');
        });

        (0, _mocha.describe)('When shift selecting item1-3', function () {
          (0, _mocha.beforeEach)(function () {
            var clickEvent = $.Event('click');
            clickEvent.shiftKey = true;
            var clickEvent2 = $.Event('click');
            clickEvent2.shiftKey = true;
            $((0, _emberHook.hook)('my-list-item', { index: 0 })).trigger(clickEvent);
            $((0, _emberHook.hook)('my-list-item', { index: 2 })).trigger(clickEvent2);
            return (0, _emberTestHelpersWait['default'])();
          });

          (0, _mocha.it)('item 0 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('item 1 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('item 2 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('selectedItems length to be 3', function () {
            (0, _chai.expect)(this.get('selectedItems').length).to.eql(3);
          });

          (0, _mocha.describe)('When clicking next page', function () {
            (0, _mocha.beforeEach)(function () {
              $((0, _emberHook.hook)('my-list-pagination-next-page')).click();
              return (0, _emberTestHelpersWait['default'])();
            });

            (0, _mocha.it)('item 0 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('item 1 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('item 2 is not selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(false);
            });

            (0, _mocha.it)('selectedItems length to be 3', function () {
              (0, _chai.expect)(this.get('selectedItems').length).to.eql(3);
            });

            (0, _mocha.it)('display proper pagination 4 to 6 of 6', function () {
              (0, _chai.expect)($('.frost-list-pagination-text').text().trim()).to.eql('4 to 6 of 6');
            });

            (0, _mocha.describe)('When shift click item4-6', function () {
              (0, _mocha.beforeEach)(function () {
                var clickEvent = $.Event('click');
                clickEvent.shiftKey = true;
                var clickEvent2 = $.Event('click');
                clickEvent2.shiftKey = true;
                $((0, _emberHook.hook)('my-list-item', { index: 0 })).trigger(clickEvent);
                $((0, _emberHook.hook)('my-list-item', { index: 2 })).trigger(clickEvent2);
                return (0, _emberTestHelpersWait['default'])();
              });
              (0, _mocha.it)('item 0 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('item 1 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('item 2 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('selectedItems length to be 6', function () {
                (0, _chai.expect)(this.get('selectedItems').length).to.eql(6);
              });
            });
          });
        });

        (0, _mocha.describe)('When using specific select on item 2', function () {
          (0, _mocha.beforeEach)(function () {
            (0, _emberHook.$hook)('my-list-selection', { index: 1 }).click();
            return (0, _emberTestHelpersWait['default'])();
          });

          (0, _mocha.it)('item 0 is not selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
          });

          (0, _mocha.it)('item 1 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('item 2 is not selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(false);
          });

          (0, _mocha.it)('selectedItems length to be 1', function () {
            (0, _chai.expect)(this.get('selectedItems').length).to.eql(1);
          });

          (0, _mocha.describe)('When switching to page 2 and shift click item4-6', function () {
            (0, _mocha.beforeEach)(function () {
              $((0, _emberHook.hook)('my-list-pagination-next-page')).click();
              return (0, _emberTestHelpersWait['default'])().then(function () {
                var clickEvent = $.Event('click');
                clickEvent.shiftKey = true;
                var clickEvent2 = $.Event('click');
                clickEvent2.shiftKey = true;
                $((0, _emberHook.hook)('my-list-item', { index: 0 })).trigger(clickEvent);
                $((0, _emberHook.hook)('my-list-item', { index: 2 })).trigger(clickEvent2);
                return (0, _emberTestHelpersWait['default'])();
              });
            });

            (0, _mocha.it)('item 0 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 1 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('item 2 is selected', function () {
              (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(true);
            });

            (0, _mocha.it)('selectedItems length to be 4', function () {
              (0, _chai.expect)(this.get('selectedItems').length).to.eql(4);
            });

            (0, _mocha.describe)('When switching to page 1 and shift click item1-3', function () {
              (0, _mocha.beforeEach)(function () {
                $((0, _emberHook.hook)('my-list-pagination-previous-page')).click();
                return (0, _emberTestHelpersWait['default'])().then(function () {
                  var clickEvent = $.Event('click');
                  clickEvent.shiftKey = true;
                  var clickEvent2 = $.Event('click');
                  clickEvent2.shiftKey = true;
                  $((0, _emberHook.hook)('my-list-item', { index: 0 })).trigger(clickEvent);
                  $((0, _emberHook.hook)('my-list-item', { index: 2 })).trigger(clickEvent2);
                  return (0, _emberTestHelpersWait['default'])();
                });
              });

              (0, _mocha.it)('item 0 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('item 1 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('item 2 is selected', function () {
                (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(true);
              });

              (0, _mocha.it)('selectedItems length to be 6', function () {
                (0, _chai.expect)(this.get('selectedItems').length).to.eql(6);
              });
            });
          });
        });
      });
    });

    (0, _mocha.describe)('When using default itemKey', function () {
      (0, _mocha.beforeEach)(function () {
        var _this9 = this;

        var testItems = A([_ember['default'].Object.create({ id: '0' }), _ember['default'].Object.create({ id: '1' }), _ember['default'].Object.create({ id: '2' }), _ember['default'].Object.create({ id: '3' }), _ember['default'].Object.create({ id: '4' }), _ember['default'].Object.create({ id: '5' }), _ember['default'].Object.create({ id: '6' })]);
        this.set('items', testItems);
        var testSelectedItems = A([]);
        this.set('selectedItems', testSelectedItems);
        this.set('onSelectionChange', function (selectedItems) {
          _this9.get('selectedItems').setObjects(selectedItems);
        });
        this.render(_ember['default'].HTMLBars.template({
          'id': 'BhloIHfs',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list"],null,[["item","hook","items","selectedItems","onSelectionChange"],[["helper",["component"],["frost-list-item"],null],"my-list",["get",["items"]],["get",["selectedItems"]],["get",["onSelectionChange"]]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        return (0, _emberTestHelpersWait['default'])();
      });

      (0, _mocha.describe)('Supports ranged based clicks', function () {
        (0, _mocha.describe)('When using shift click from item1-5', function () {
          (0, _mocha.beforeEach)(function () {
            var clickEvent = $.Event('click');
            clickEvent.shiftKey = true;
            var clickEvent2 = $.Event('click');
            clickEvent2.shiftKey = true;
            $((0, _emberHook.hook)('my-list-item', { index: 1 })).trigger(clickEvent);
            $((0, _emberHook.hook)('my-list-item', { index: 5 })).trigger(clickEvent2);
            return (0, _emberTestHelpersWait['default'])();
          });

          (0, _mocha.it)('item 0 is not selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 0 }).hasClass('is-selected')).to.eql(false);
          });

          (0, _mocha.it)('item 1 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 1 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('item 2 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 2 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('item 3 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 3 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('item 4 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 4 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('item 5 is selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 5 }).hasClass('is-selected')).to.eql(true);
          });

          (0, _mocha.it)('item 6 is not selected', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-container', { index: 6 }).hasClass('is-selected')).to.eql(false);
          });

          (0, _mocha.it)('selectedItems length to be 5', function () {
            (0, _chai.expect)(this.get('selectedItems').length).to.eql(5);
          });
        });
      });
    });

    (0, _mocha.describe)('Supports item expansion', function () {
      (0, _mocha.beforeEach)(function () {
        var _this10 = this;

        var testItems = A([_ember['default'].Object.create({ id: '0' }), _ember['default'].Object.create({ id: '1' })]);
        this.set('items', testItems);
        this.set('selectedItems', A([]));
        this.set('expandedItems', A([]));
        this.set('onSelectionChange', function (selectedItems) {
          _this10.get('selectedItems').setObjects(selectedItems);
        });
        this.set('onExpansionChange', function (expandedItems) {
          _this10.get('expandedItems').setObjects(expandedItems);
        });
        this.render(_ember['default'].HTMLBars.template({
          'id': 'l4EBqaKg',
          'block': '{"statements":[["text","\\n        "],["append",["helper",["frost-list"],null,[["item","itemExpansion","hook","items","selectedItems","onSelectionChange","onExpansionChange","expandedItems"],[["helper",["component"],["frost-list-item"],null],["helper",["component"],["frost-list-item"],null],"my-list",["get",["items"]],["get",["selectedItems"]],["get",["onSelectionChange"]],["get",["onExpansionChange"]],["get",["expandedItems"]]]]],false],["text","\\n      "]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          'meta': {}
        }));
        return (0, _emberTestHelpersWait['default'])();
      });

      (0, _mocha.describe)('clicking item 0 expansion button', function () {
        (0, _mocha.beforeEach)(function () {
          (0, _emberHook.$hook)('my-list-expansion', { index: 0 }).click();
          return (0, _emberTestHelpersWait['default'])();
        });

        (0, _mocha.it)('item 0 is expanded', function () {
          (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-expansion', { index: 0 })).to.have.length(1);
        });

        (0, _mocha.describe)('clicking item 0 expansion button', function () {
          (0, _mocha.beforeEach)(function () {
            (0, _emberHook.$hook)('my-list-expansion', { index: 0 }).click();
            return (0, _emberTestHelpersWait['default'])();
          });
          (0, _mocha.it)('item 0 is not expanded', function () {
            (0, _chai.expect)((0, _emberHook.$hook)('my-list-item-expansion', { index: 0 })).to.have.length(0);
          });
        });
      });
    });
  });
});
define('dummy/tests/test-helper', ['exports', 'dummy/tests/helpers/resolver', 'ember-mocha'], function (exports, _dummyTestsHelpersResolver, _emberMocha) {

  (0, _emberMocha.setResolver)(_dummyTestsHelpersResolver['default']);
});
define('dummy/tests/unit/components/frost-list-core-test', ['exports', 'chai', 'ember', 'ember-prop-types', 'mocha', 'sinon', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _ember, _emberPropTypes, _mocha, _sinon, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {
  var A = _ember['default'].A;

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.unit)('frost-list-core');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var component = undefined,
        sandbox = undefined;

    (0, _mocha.beforeEach)(function () {
      component = this.subject();
      sandbox = _sinon['default'].sandbox.create();
    });

    (0, _mocha.afterEach)(function () {
      sandbox.restore();
    });

    _mocha.it.skip('includes className frost-list', function () {
      (0, _chai.expect)(component.classNames).to.include('frost-list');
    });

    _mocha.it.skip('includes className frost-list-core', function () {
      (0, _chai.expect)(component.classNames).to.include('frost-list-core');
    });

    _mocha.describe.skip('default property values', function () {
      (0, _mocha.it)('sets alwaysUseDefaultHeight to false', function () {
        (0, _chai.expect)(component.get('alwaysUseDefaultHeight')).to.eql(false);
      });

      (0, _mocha.it)('sets idForFirstItem to null', function () {
        (0, _chai.expect)(component.get('idForFirstItem')).to.eql(null);
      });

      (0, _mocha.it)('sets key to @identity', function () {
        (0, _chai.expect)(component.get('key')).to.eql('@identity');
      });

      (0, _mocha.it)('sets scrollPosition to 0', function () {
        (0, _chai.expect)(component.get('scrollPosition')).to.eql(0);
      });
    });

    _mocha.it.skip('sets dependent keys correctly', function () {
      var _recordsDependentKeys = ['items.[]'];

      var _hasHeaderDependentKeys = ['expansion', 'pagination', 'sorting'];

      (0, _mocha.it)('sets correct dependent keys for _records computed property', function () {
        (0, _chai.expect)(component._records._dependentKeys).to.eql(_recordsDependentKeys);
      });
      (0, _mocha.it)('sets correct dependent keys for _hasHeader computed property', function () {
        (0, _chai.expect)(component._hasHeader._dependentKeys).to.eql(_hasHeaderDependentKeys);
      });
    });

    _mocha.it.skip('has the expected Mixins', function () {
      (0, _chai.expect)(_emberPropTypes['default'].detect(component)).to.eql(true);
    });

    _mocha.describe.skip('"_records" computed property', function () {
      (0, _mocha.it)('is set correctly when items is not empty', function () {
        component.set('items', A([1, 2, 3, 4]));

        (0, _chai.expect)(component.get('_records')).to.eql(A([1, 2, 3, 4]));
      });

      (0, _mocha.it)('is set correctly when items is empty', function () {
        component.set('items', undefined);

        (0, _chai.expect)(component.get('_records')).to.eql([]);
      });
    });

    _mocha.describe.skip('"_hasHeader" computed property', function () {
      (0, _mocha.it)('is set to "true" when "sorting" and "expansion" are set', function () {
        var sorting = { sortProperty: 'sortProperty' };
        var expansion = { expansion: 'expansionMethod' };

        component.setProperties({ sorting: sorting, expansion: expansion });

        (0, _chai.expect)(component.get('_hasHeader')).to.eql(true);
      });

      (0, _mocha.it)('is set to "true" when "sorting" is set', function () {
        var sorting = { sortProperty: 'sortProperty' };

        component.set('sorting', sorting);

        (0, _chai.expect)(component.get('_hasHeader')).to.eql(true);
      });

      (0, _mocha.it)('is set to "true" when "expansion" is set', function () {
        var expansion = { expansion: 'expansionMethod' };

        component.set('expansion', expansion);

        (0, _chai.expect)(component.get('_hasHeader')).to.eql(true);
      });

      (0, _mocha.it)('is set to "false" when "sorting" and "expansion" are NOT set', function () {
        (0, _chai.expect)(component.get('_hasHeader')).to.eql(false);
      });
    });

    _mocha.describe.skip('"checkExpansionValidity" function', function () {
      (0, _mocha.it)('returns "true" when expansion is set properly', function () {
        var expansion = {
          onCollapseAll: function onCollapseAll() {},
          onExpandAll: function onExpandAll() {}
        };

        (0, _chai.expect)(component.checkExpansionValidity(expansion)).to.eql(true);
      });

      (0, _mocha.it)('returns "false" when "onExpandAll" function is missing in "expansion"', function () {
        var expansion = {
          onExpandAll: function onExpandAll() {}
        };

        (0, _chai.expect)(component.checkExpansionValidity(expansion)).to.eql(false);
      });

      (0, _mocha.it)('returns "false" when "onCollapseAll" function is missing in "expansion"', function () {
        var expansion = {
          onCollapseAll: function onCollapseAll() {}
        };

        (0, _chai.expect)(component.checkExpansionValidity(expansion)).to.eql(false);
      });
    });

    _mocha.describe.skip('"checkSelectionValidity" function', function () {
      (0, _mocha.it)('returns "true" when "selection" is set Properly', function () {
        var selection = {
          onSelect: function onSelect() {}
        };

        (0, _chai.expect)(component.checkSelectionValidity(selection)).to.eql(true);
      });

      (0, _mocha.it)('returns "false" when "onSelect" function is missing in "selection"', function () {
        var selection = {};

        (0, _chai.expect)(component.checkSelectionValidity(selection)).to.eql(false);
      });
    });

    _mocha.describe.skip('"checkSortingValidity" function', function () {
      (0, _mocha.it)('returns "false" when "sorting" is NOT set properly', function () {
        var sorting = {};

        (0, _chai.expect)(component.checkSortingValidity(sorting)).to.eql(false);
      });

      (0, _mocha.it)('returns "false" when "activeSorting" and "properties" are missing in "sorting"', function () {
        var sorting = {
          onSort: function onSort() {}
        };

        (0, _chai.expect)(component.checkSortingValidity(sorting)).to.eql(false);
      });

      (0, _mocha.it)('returns "false" when "activeSorting" is missing in "sorting"', function () {
        var sorting = {
          onSort: function onSort() {},
          properties: []
        };

        (0, _chai.expect)(component.checkSortingValidity(sorting)).to.eql(false);
      });

      (0, _mocha.it)('returns "true" when "sorting" is set properly', function () {
        var sorting = {
          onSort: function onSort() {},
          properties: [],
          activeSorting: []
        };

        (0, _chai.expect)(component.checkSortingValidity(sorting)).to.eql(true);
      });
    });

    _mocha.describe.skip('"_findElementsInBetween" function', function () {
      var array = [];
      (0, _mocha.beforeEach)(function () {
        for (var i = 0; i < 10; i++) {
          array.push({
            id: i
          });
        }
      });

      (0, _mocha.it)('returns result array when all attributes are provided', function () {
        (0, _chai.expect)(component._findElementsInBetween(array, array[2], array[6]).length).to.eql(5);
      });

      (0, _mocha.describe)('returns last element when "firstElement" is missing', function () {
        (0, _mocha.it)('returns only one element', function () {
          var result = component._findElementsInBetween(array, undefined, array[6]);
          (0, _chai.expect)(result.length).to.eql(1);
        });

        (0, _mocha.it)('returns the last element id', function () {
          var result = component._findElementsInBetween(array, undefined, array[6]);
          (0, _chai.expect)(result[0].id).to.eql(6);
        });
      });
    });

    _mocha.describe.skip('"selectItem" action', function () {
      var testItems = A([{
        id: '1'
      }, {
        id: '2'
      }, {
        id: '3'
      }]);

      (0, _mocha.it)('updates persistedClickState with correct object', function () {
        var persistedClickState = {
          clickedRecord: {
            id: '1'
          },
          isSelected: true
        };

        var updatedPersistedClickState = {
          clickedRecord: {
            id: '3'
          },
          isSelected: true
        };
        var mockAttrs = {
          selectDesc: {
            isSelected: true,
            isTargetSelectionIndicator: false
          },
          record: {
            id: '3'
          }
        };

        component.set('persistedClickState', persistedClickState);
        component.send('selectItem', {}, mockAttrs);

        (0, _chai.expect)(component.get('persistedClickState')).to.eql(updatedPersistedClickState);
      });

      (0, _mocha.it)('triggers shiftKey selection', function () {
        var mockEvent = {
          shiftKey: true
        };

        var mockAttrs = {
          selectDesc: {
            isSelected: true,
            isTargetSelectionIndicator: false
          },
          record: {
            id: '3'
          }
        };

        var mockPersistedClickState = {
          isSelected: true,
          clickedRecord: {
            id: '1'
          }
        };
        var resultObject = {
          records: A([{
            id: '1'
          }, {
            id: '2'
          }, {
            id: '3'
          }]),
          selectDesc: {
            isSelected: true,
            isTargetSelectionIndicator: false,
            isShiftSelect: true
          }
        };

        component.setProperties({
          'onSelect': sandbox.spy(),
          '_records': testItems,
          'persistedClickState': mockPersistedClickState
        });
        component.send('selectItem', mockEvent, mockAttrs);

        (0, _chai.expect)(component.get('onSelect').calledWith(resultObject), 'calls onSelect() with the correct object').to.eql(true);
      });

      (0, _mocha.it)('triggers command/control key selection', function () {
        var mockEvent = {
          shiftKey: false,
          ctrlKey: true
        };

        var mockAttrs = {
          selectDesc: {
            isSelected: true,
            isTargetSelectionIndicator: false
          },
          record: {
            id: '3'
          }
        };

        var mockPersistedClickState = {
          isSelected: true,
          clickedRecord: {
            id: '1'
          }
        };
        var resultObject = {
          records: A([{
            id: '3'
          }]),
          selectDesc: {
            isSelected: true,
            isTargetSelectionIndicator: false,
            isShiftSelect: false,
            isCtrlSelect: true
          }
        };

        component.setProperties({
          'onSelect': sandbox.spy(),
          '_records': testItems,
          'persistedClickState': mockPersistedClickState
        });
        component.send('selectItem', mockEvent, mockAttrs);

        (0, _chai.expect)(component.get('onSelect').calledWith(resultObject), 'calls onSelect() with the correct object').to.eql(true);
      });

      (0, _mocha.it)('triggers single item selection', function () {
        var mockEvent = {
          shiftKey: false
        };

        var mockAttrs = {
          selectDesc: {
            isSelected: true,
            isTargetSelectionIndicator: false
          },
          record: {
            id: '1'
          }
        };

        var resultObject = {
          records: A([{
            id: '1'
          }]),
          selectDesc: {
            isSelected: true,
            isTargetSelectionIndicator: false,
            isShiftSelect: false
          }
        };

        component.setProperties({
          'onSelect': sandbox.spy(),
          '_records': testItems
        });
        component.send('selectItem', mockEvent, mockAttrs);

        (0, _chai.expect)(component.get('onSelect').calledWith(resultObject), 'calls onSelect() with the correct object').to.eql(true);
      });
    });
  });
});
define('dummy/tests/unit/components/frost-list-expansion-test', ['exports', 'chai', 'mocha', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _mocha, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.unit)('frost-list-expansion');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var component = undefined;

    (0, _mocha.beforeEach)(function () {
      component = this.subject();
    });

    _mocha.it.skip('includes className frost-list-expansion', function () {
      (0, _chai.expect)(component.classNames).to.include('frost-list-expansion');
    });
  });
});
define('dummy/tests/unit/components/frost-list-item-test', ['exports', 'chai', 'mocha', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _mocha, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.unit)('frost-list-item');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var component = undefined;

    (0, _mocha.beforeEach)(function () {
      component = this.subject();
    });

    _mocha.it.skip('includes className frost-list-item', function () {
      (0, _chai.expect)(component.classNames).to.include('frost-list-item');
    });

    _mocha.describe.skip('dependent keys', function () {
      var isSelectedDependentKeys = undefined,
          isExpandedDependentKeys = undefined;
      (0, _mocha.beforeEach)(function () {
        isSelectedDependentKeys = ['model.isSelected'];

        isExpandedDependentKeys = ['model.isExpanded'];
      });
      (0, _mocha.it)('sets correct dependent keys for isSelected computed property', function () {
        (0, _chai.expect)(component.isSelected._dependentKeys).to.eql(isSelectedDependentKeys);
      });

      (0, _mocha.it)('sets correct dependent keys for isExpanded computed property', function () {
        (0, _chai.expect)(component.isExpanded._dependentKeys).to.eql(isExpandedDependentKeys);
      });
    });

    _mocha.it.skip('"isExpanded" computed property', function () {
      component.set('model', { isExpanded: true });

      (0, _chai.expect)(component.get('isExpanded')).to.eql(true);
    });

    _mocha.it.skip('"isSelected" computed property', function () {
      component.set('model', { isSelected: true });

      (0, _chai.expect)(component.get('isSelected')).to.eql(true);
    });
  });
});
define('dummy/tests/unit/components/frost-list-selection-indicator-test', ['exports', 'chai', 'mocha', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _mocha, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.unit)('frost-list-selection-indicator');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var component = undefined;

    (0, _mocha.beforeEach)(function () {
      component = this.subject();
    });

    _mocha.it.skip('includes className frost-list-selection-indicator', function () {
      (0, _chai.expect)(component.classNames).to.include('frost-list-selection-indicator');
    });
  });
});
define('dummy/tests/unit/components/frost-list-test', ['exports', 'chai', 'ember', 'ember-prop-types', 'mocha', 'sinon', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _ember, _emberPropTypes, _mocha, _sinon, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {
  var Logger = _ember['default'].Logger;

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.unit)('frost-list');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var component = undefined,
        sandbox = undefined;

    (0, _mocha.beforeEach)(function () {
      component = this.subject();
      sandbox = _sinon['default'].sandbox.create();
    });

    (0, _mocha.afterEach)(function () {
      sandbox.restore();
    });

    _mocha.it.skip('sets default properties value correctly', function () {
      (0, _chai.expect)(component.get('alwaysUseDefaultHeight')).to.eql(false);
    });

    _mocha.it.skip('has the expected Mixins', function () {
      (0, _chai.expect)(_emberPropTypes['default'].detect(component)).to.eql(true);
    });

    _mocha.describe.skip('InitContext()', function () {
      (0, _mocha.it)('errors when config is set with item', function () {
        var EmberLoggerSpy = sandbox.spy(Logger, 'error');

        component.setProperties({
          'config': {},
          'item': {}
        });
        component.initContext();

        (0, _chai.expect)(EmberLoggerSpy.called).to.eql(true);
      });

      (0, _mocha.it)('errors when config is set with expansion', function () {
        var EmberLoggerSpy = sandbox.spy(Logger, 'error');

        component.setProperties({
          'config': {},
          'expansion': {}
        });
        component.initContext();

        (0, _chai.expect)(EmberLoggerSpy.called).to.eql(true);
      });

      (0, _mocha.it)('errors when config is set with sorting', function () {
        var EmberLoggerSpy = sandbox.spy(Logger, 'error');

        component.setProperties({
          'config': {},
          'sorting': {}
        });
        component.initContext();

        (0, _chai.expect)(EmberLoggerSpy.called).to.eql(true);
      });

      (0, _mocha.it)('does not error when config is set by itself', function () {
        var EmberLoggerSpy = sandbox.spy(Logger, 'error');

        component.set('config', {});
        component.initContext();

        (0, _chai.expect)(EmberLoggerSpy.called).to.eql(false);
      });
    });
  });
});
define('dummy/tests/unit/components/frost-pagination-test', ['exports', 'chai', 'ember-prop-types', 'mocha', 'dummy/tests/helpers/ember-test-utils/setup-component-test'], function (exports, _chai, _emberPropTypes, _mocha, _dummyTestsHelpersEmberTestUtilsSetupComponentTest) {

  var test = (0, _dummyTestsHelpersEmberTestUtilsSetupComponentTest.unit)('frost-pagination');
  (0, _mocha.describe)(test.label, function () {
    test.setup();

    var component = undefined;

    (0, _mocha.beforeEach)(function () {
      component = this.subject();
    });

    _mocha.it.skip('includes className frost-pagination', function () {
      (0, _chai.expect)(component.classNames).to.include('frost-pagination');
    });

    _mocha.describe.skip('dependent keys', function () {
      var _endDependentKeys = undefined,
          _isLeftDisabledDependentKeys = undefined,
          _isRightDisabledDependentKeys = undefined,
          _offsetDependentKeys = undefined,
          _paginationTextDependentKeys = undefined;

      (0, _mocha.beforeEach)(function () {
        _endDependentKeys = ['itemsPerPage', 'page', 'total'];

        _isLeftDisabledDependentKeys = ['page'];

        _isRightDisabledDependentKeys = ['itemsPerPage', 'page', 'total'];

        _offsetDependentKeys = ['itemsPerPage', 'page', 'total'];

        _paginationTextDependentKeys = ['_offset', '_end', 'total'];
      });

      (0, _mocha.it)('sets correct dependent keys for _end computed property', function () {
        (0, _chai.expect)(component._end._dependentKeys).to.eql(_endDependentKeys);
      });

      (0, _mocha.it)('sets correct dependent keys for _isLeftDisabled computed property', function () {
        (0, _chai.expect)(component._isLeftDisabled._dependentKeys).to.eql(_isLeftDisabledDependentKeys);
      });

      (0, _mocha.it)('sets correct dependent keys for _isRightDisabled computed property', function () {
        (0, _chai.expect)(component._isRightDisabled._dependentKeys).to.eql(_isRightDisabledDependentKeys);
      });

      (0, _mocha.it)('sets correct dependent keys for _offset computed property', function () {
        (0, _chai.expect)(component._offset._dependentKeys).to.eql(_offsetDependentKeys);
      });

      (0, _mocha.it)('sets correct dependent keys for _paginationText computed property', function () {
        (0, _chai.expect)(component._paginationText._dependentKeys).to.eql(_paginationTextDependentKeys);
      });
    });

    _mocha.it.skip('has the expected Mixins', function () {
      (0, _chai.expect)(_emberPropTypes['default'].detect(component)).to.eql(true);
    });

    _mocha.describe.skip('_end computed property', function () {
      (0, _mocha.it)('is set to pageMax when NOT on the last page', function () {
        var itemsPerPage = 10;
        var page = 5;
        var total = 100;

        component.setProperties({ itemsPerPage: itemsPerPage, page: page, total: total });

        // on page 5 would be item 51 to 60 so _end is 60
        (0, _chai.expect)(component.get('_end')).to.eql(60);
      });

      (0, _mocha.it)('is set to total on the last page', function () {
        var itemsPerPage = 10;
        var page = 9;
        var total = 100;

        component.setProperties({ itemsPerPage: itemsPerPage, page: page, total: total });
        var expectedResult = component.get('total');

        (0, _chai.expect)(component.get('_end')).to.eql(expectedResult);
      });
    });

    _mocha.describe.skip('_isLeftDisabled computed property', function () {
      (0, _mocha.it)('is set to true on the first page', function () {
        component.set('page', 0);

        (0, _chai.expect)(component.get('_isLeftDisabled')).to.eql(true);
      });

      (0, _mocha.it)('is set to false when NOT on the first page', function () {
        component.set('page', 5);

        (0, _chai.expect)(component.get('_isLeftDisabled')).to.eql(false);
      });
    });

    _mocha.describe.skip('_isRightDisabled computed property', function () {
      (0, _mocha.it)('is set to true when total is equal to 0', function () {
        component.set('total', 0);

        (0, _chai.expect)(component.get('_isRightDisabled')).to.eql(true);
      });

      (0, _mocha.it)('is set to true on the last page', function () {
        var itemsPerPage = 10;
        var page = 9;
        var total = 100;

        component.setProperties({ itemsPerPage: itemsPerPage, page: page, total: total });

        (0, _chai.expect)(component.get('_isRightDisabled')).to.eql(true);
      });

      (0, _mocha.it)('is set to false when NOT on the last page', function () {
        var itemsPerPage = 10;
        var page = 5;
        var total = 100;

        component.setProperties({ itemsPerPage: itemsPerPage, page: page, total: total });

        (0, _chai.expect)(component.get('_isRightDisabled')).to.eql(false);
      });
    });

    _mocha.describe.skip('_offset computed property', function () {
      (0, _mocha.it)('is set to 0 when total is equal to 0', function () {
        component.set('total', 0);

        (0, _chai.expect)(component.get('_offset')).to.eql(0);
      });

      (0, _mocha.it)('is set to correct offset of that page', function () {
        var itemsPerPage = 10;
        var page = 2;
        var total = 100;

        component.setProperties({ itemsPerPage: itemsPerPage, page: page, total: total });

        // on page 2 would be item 21 to 30 so _offset is 21
        (0, _chai.expect)(component.get('_offset')).to.eql(21);
      });
    });

    _mocha.describe.skip('_paginationText computed property', function () {
      (0, _mocha.it)('is set to "0 results found" when total is equal to 0', function () {
        component.set('total', 0);

        (0, _chai.expect)(component.get('_paginationText')).to.eql('0 results found');
      });

      (0, _mocha.it)('is set to "1 to 10 of 100" on the first page', function () {
        var itemsPerPage = 10;
        var page = 0;
        var total = 100;

        component.setProperties({ itemsPerPage: itemsPerPage, page: page, total: total });

        (0, _chai.expect)(component.get('_paginationText')).to.eql('1 to 10 of 100');
      });
    });
  });
});
define('dummy/tests/unit/helpers/floor-test', ['exports', 'chai', 'ember-frost-list/helpers/floor', 'mocha'], function (exports, _chai, _emberFrostListHelpersFloor, _mocha) {

  _mocha.describe.skip('Unit / Helper / floor', function () {
    (0, _mocha.it)('works for positive numbers', function () {
      var result = (0, _emberFrostListHelpersFloor.floor)([42.8]);
      (0, _chai.expect)(result).to.equal(42);
    });

    (0, _mocha.it)('works for negative numbers', function () {
      var result = (0, _emberFrostListHelpersFloor.floor)([-42.8]);
      (0, _chai.expect)(result).to.equal(-43);
    });
  });
});
define('dummy/tests/unit/helpers/is-lead-selection', ['exports', 'chai', 'ember-frost-list/helpers/is-lead-selection', 'mocha'], function (exports, _chai, _emberFrostListHelpersIsLeadSelection, _mocha) {

  _mocha.describe.skip('Unit / Helper / is-lead-selection', function () {
    // Replace this with your real tests.
    (0, _mocha.it)('works', function () {
      var result = (0, _emberFrostListHelpersIsLeadSelection.floor)([42.8]);
      (0, _chai.expect)(result).to.equal(42);
    });
  });
});
/* jshint expr:true */
define("dummy/tests/unit/mixins/frost-list-core-mixin-test", ["exports"], function (exports) {});
// import {expect} from 'chai'
// import {beforeEach, describe, it} from 'mocha'
// import Ember from 'ember'
// const {Object as EmberObject} = Ember
// import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

// describe.skip('Unit / Mixin / frost-list-core-mixin', function () {
//   const testItems = [
//     {
//       id: '1'
//     }
//   ]
//   let subject

//   beforeEach(function () {
//     let testObject = EmberObject.extend(FrostListCoreMixin)
//     subject = testObject.create({
//       listConfig: {
//         items: 'model'
//       }
//     })

//     subject.set('model', testItems)
//   })

//   it('successfully mixed', function () {
//     expect(
//       subject
//     ).to.be.ok
//   })

//   it('sets up "_listItems" as a computed alias to listConfig.items', function () {
//     expect(
//       subject.get('_listItems')
//     ).to.eql(testItems)
//   })

//   describe('listItems computed property is correctly set', function () {
//     it('sets listItems[0].id to 1', function () {
//       expect(
//         subject.get('listItems')[0].id
//       ).to.eql('1')
//     })

//     it('sets listItems[0].record to the item object', function () {
//       expect(
//         subject.get('listItems')[0].record
//       ).to.eql({
//         id: '1'
//       })
//     })
//   })

//   describe('statefulListItems computed property', function () {
//     describe('"isSelected" and "isExpanded" have a default value of false', function () {
//       beforeEach(function () {
//         subject.setProperties(
//           {
//             'selectedItems': EmberObject.create(),
//             'expandedItems': EmberObject.create()
//           }
//         )
//       })

//       it('sets default to false for "isExpanded"', function () {
//         expect(
//           subject.get('statefulListItems')[0].isExpanded
//         ).to.eql(false)
//       })

//       it('sets default to false for "isSelected"', function () {
//         expect(
//           subject.get('statefulListItems')[0].isSelected
//         ).to.eql(false)
//       })
//     })

//     it('sets "isSelected" correctly when it already has a value', function () {
//       subject.setProperties(
//         {
//           'selectedItems': EmberObject.create({ 1: true }),
//           'expandedItems': EmberObject.create()
//         }
//       )

//       expect(
//         subject.get('statefulListItems')[0].isSelected
//       ).to.eql(true)
//     })

//     it('sets "isExpanded" correctly when it already has a value', function () {
//       subject.setProperties(
//         {
//           'selectedItems': EmberObject.create(),
//           'expandedItems': EmberObject.create({ 1: true })
//         }
//       )

//       expect(
//         subject.get('statefulListItems')[0].isExpanded
//       ).to.eql(true)
//     })
//   })
// })
define("dummy/tests/unit/mixins/frost-list-expansion-mixin-test", ["exports"], function (exports) {});
// import {expect} from 'chai'
// import Ember from 'ember'
// const {Controller, Object as EmberObject} = Ember
// import {afterEach, beforeEach, describe, it} from 'mocha'
// import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'
// import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
// import sinon from 'sinon'

// describe.skip('Unit / Mixin / frost-list-expansion-mixin', function () {
//   let sandbox

//   const testItems = [
//     {
//       id: '1'
//     }
//   ]
//   let subject

//   beforeEach(function () {
//     sandbox = sinon.sandbox.create()
//     let testObject = Controller.extend(FrostListExpansionMixin)
//     subject = testObject.create({
//       listConfig: {
//         items: 'model'
//       }
//     })

//     subject.set('model', testItems)
//   })

//   afterEach(function () {
//     sandbox.restore()
//   })

//   it('successfully mixed', function () {
//     expect(
//       subject
//     ).to.be.ok
//   })

//   it('creates "expandedItems" as an empty Ember.Object', function () {
//     expect(
//       subject.get('expandedItems')
//     ).to.eql(EmberObject.create())
//   })

//   it('has the expect Mixins', function () {
//     expect(
//       FrostListCoreMixin.detect(subject)
//     ).to.eql(true)
//   })

//   describe('collapseItems()', function () {
//     it('removes the expended id', function () {
//       subject.set('expandedItems', EmberObject.create({ 1: true }))
//       subject.send('collapseItems')

//       expect(
//         subject.get('expandedItems.1')
//       ).to.eql(undefined)
//     })

//     it('notifyPropertyChange() is called with correct parameter', function () {
//       const collapseItemsSpy = sandbox.spy(subject, 'notifyPropertyChange')

//       subject.send('collapseItems')

//       expect(
//         collapseItemsSpy.calledWith('expandedItems')
//       ).to.eql(true)
//     })
//   })

//   describe('expandItems()', function () {
//     it('expandItems function sets id to true', function () {
//       subject.set('expandedItems', EmberObject.create())
//       subject.send('expandItems')

//       expect(
//         subject.get('expandedItems.1')
//       ).to.eql(true)
//     })

//     it('notifyPropertyChange() is called with correct parameter', function () {
//       const expandItemsSpy = sandbox.spy(subject, 'notifyPropertyChange')

//       subject.send('expandItems')

//       expect(
//         expandItemsSpy.calledWith('expandedItems')
//       ).to.eql(true)
//     })
//   })
// })
define("dummy/tests/unit/mixins/frost-list-mixin-test", ["exports"], function (exports) {});
// import {expect} from 'chai'
// import {beforeEach, describe, it} from 'mocha'
// import Ember from 'ember'
// const {A, Controller, on} = Ember
// import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
// import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
// import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
// import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'

// describe.skip('Unit / Mixin / frost-list-mixin', function () {
//   const testItems = [
//     {
//       id: '1'
//     }
//   ]
//   let subject

//   beforeEach(function () {
//     let testObject = Controller.extend(FrostListMixin)
//     subject = testObject.create({
//       listConfig: {
//         items: 'model'
//       }
//     })

//     subject.set('model', testItems)
//   })

//   it('successfully mixed', function () {
//     expect(
//       subject
//     ).to.be.ok
//   })

//   describe('expected Mixins', function () {
//     it('has FrostListSelectionMixin Mixin', function () {
//       expect(
//         FrostListSelectionMixin.detect(subject)
//       ).to.eql(true)
//     })

//     it('has FrostListExpansionMixin Mixin', function () {
//       expect(
//         FrostListExpansionMixin.detect(subject)
//       ).to.eql(true)
//     })

//     it('has FrostListSortingMixin Mixin', function () {
//       expect(
//         FrostListSortingMixin.detect(subject)
//       ).to.eql(true)
//     })
//   })

//   it('sets dependent keys correctly', function () {
//     const listMixinConfigDependentKeys = [
//       'activeSorting',
//       'sortableProperties',
//       'statefulListItems.[]'
//     ]

//     expect(
//       subject.listMixinConfig._dependentKeys
//     ).to.eql(listMixinConfigDependentKeys)
//   })

//   describe('"listMixinConfig" computed property', function () {
//     let listMixinConfig

//     beforeEach(function () {
//       let list = A()
//       list.addObject({
//         id: '1',
//         isExpanded: false
//       })

//       const mixinTestObject = Controller.extend(FrostListMixin)
//       const mixin = mixinTestObject.create({
//         listConfig: {
//           items: 'model',
//           sorting: {
//             active: [],
//             properties: []
//           }
//         },
//         initListMixin: on('init', function () {
//           this.set('_selectItem', '_selectItem')
//           this.set('_collapseItems', '_collapseItems')
//           this.set('_expandItems', '_expandItems')
//           this.set('_collapseItem', '_collapseItem')
//           this.set('_expandItem', '_expandItem')
//           this.set('_sortItems', '_sortItems')
//           this.set('_loadNext', '_loadNext')
//           this.set('_loadPrevious', '_loadPrevious')
//         })
//       })

//       mixin.setProperties(
//         {
//           'model': list,
//           'listConfig.component': 'my-list-item',
//           'activeSorting': [],
//           'properties': []
//         }
//       )

//       listMixinConfig = mixin.get('listMixinConfig')
//     })

//     it('has "items" property', function () {
//       expect(
//         listMixinConfig
//       ).to.have.property('items')
//     })

//     it('has component" property', function () {
//       expect(
//         listMixinConfig
//       ).to.have.property('component', 'my-list-item')
//     })

//     it('has "expansion" property with correct structure', function () {
//       expect(
//         listMixinConfig
//       ).to.have.property('expansion')
//         .that.deep.equals({
//           onCollapseAll: '_collapseItems',
//           onExpandAll: '_expandItems'
//         })
//     })

//     it('has "selection" propery with correct structure', function () {
//       expect(
//         listMixinConfig
//         ).to.have.property('selection')
//           .that.deep.equals({
//             onSelect: '_selectItem'
//           })
//     })

//     it('has "sorting" propery with correct structure', function () {
//       expect(
//         listMixinConfig,
//         '"sorting" propery exists and has correct structure'
//         ).to.have.property('sorting')
//           .that.deep.equals({
//             activeSorting: [],
//             properties: [],
//             onSort: '_sortItems'
//           })
//     })

//     it('has "infiniteScroll" propery with correct structure', function () {
//       expect(
//         listMixinConfig,
//         '"infiniteScroll" propery exists and has correct structure'
//         ).to.have.property('infiniteScroll')
//           .that.deep.equals({
//             loadNext: '_loadNext',
//             loadPrevious: '_loadPrevious'
//           })
//     })
//   })
// })
define("dummy/tests/unit/mixins/frost-list-selection-mixin-test", ["exports"], function (exports) {});
// import {expect} from 'chai'
// import Ember from 'ember'
// const {Controller, EmberObject as EmberObject} = Ember
// import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'
// import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
// import * as utils from 'ember-frost-list/utils/utils'
// import {afterEach, beforeEach, describe, it} from 'mocha'
// import sinon from 'sinon'

// describe.skip('Unit / Mixin / frost-list-selection-mixin', function () {
//   let sandbox

//   const testItems = [
//     {
//       id: '1',
//       isSelected: false
//     }
//   ]
//   let subject

//   beforeEach(function () {
//     sandbox = sinon.sandbox.create()
//     let testObject = Controller.extend(FrostListSelectionMixin)
//     subject = testObject.create({
//       listConfig: {
//         items: 'model'
//       }
//     })

//     subject.set('model', testItems)
//   })

//   afterEach(function () {
//     sandbox.restore()
//   })

//   it('successfully mixed', function () {
//     expect(
//       subject
//     ).to.be.ok
//   })

//   it('sets up "selectedItems" with an empty object', function () {
//     expect(
//       subject.get('selectedItems')
//     ).to.eql(EmberObject.create())
//   })

//   it('has the expect Mixins', function () {
//     expect(
//       FrostListCoreMixin.detect(subject)
//     ).to.eql(true)
//   })

//   describe('"selectedItem()" action', function () {
//     it('udpates selectedItems', function () {
//       sandbox.stub(utils, 'updateSelectedItemsHash').returns({ 1: true })

//       subject.send('selectItem', {})

//       expect(
//         subject.get('selectedItems')
//       ).to.eql({ 1: true })
//     })

//     it('calls "updateSelectedItemsHash()" with correct parameters', function () {
//       const updateSelectedItemsHashSpy =
//         sandbox.stub(utils, 'updateSelectedItemsHash').returns({ 1: true })

//       subject.set('selectedItems', { 1: true })

//       subject.send('selectItem', {})

//       expect(
//         updateSelectedItemsHashSpy.calledWith({ 1: true }, {})
//       ).to.eql(true)
//     })

//     it('calls "notifyPropertyChange" with correct parameter', function () {
//       const notifyPropertyChangeSpy = sandbox.spy(subject, 'notifyPropertyChange')
//       sandbox.stub(utils, 'updateSelectedItemsHash').returns({ 1: true })

//       subject.send('selectItem', {})

//       expect(
//         notifyPropertyChangeSpy.calledWith('selectedItems')
//       ).to.eql(true)
//     })
//   })
// })
define("dummy/tests/unit/mixins/frost-list-sorting-mixin-test", ["exports"], function (exports) {});
// import {expect} from 'chai'
// import Ember from 'ember'
// const {A, Controller} = Ember
// import {afterEach, beforeEach, describe, it} from 'mocha'
// import sinon from 'sinon'
// import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'
// import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'

// describe.skip('Unit / Mixin / frost-list-sorting-mixin', function () {
//   let sandbox

//   const testItems = [
//     {
//       id: '1',
//       isSelected: false
//     }
//   ]
//   let subject

//   beforeEach(function () {
//     sandbox = sinon.sandbox.create()
//     let testObject = Controller.extend(FrostListSortingMixin)
//     subject = testObject.create({
//       listConfig: {
//         items: 'model'
//       }
//     })

//     subject.set('model', testItems)
//   })

//   afterEach(function () {
//     sandbox.restore()
//   })

//   it('successfully mixed', function () {
//     expect(
//       subject
//     ).to.be.ok
//   })

//   it('has the expect Mixins', function () {
//     expect(
//       FrostListCoreMixin.detect(subject)
//     ).to.eql(true)
//   })

//   describe('sortItems() action', function () {
//     let mixin, sortProperties

//     beforeEach(function () {
//       const testItems = A([
//         {
//           id: '1',
//           isSelected: false
//         },
//         {
//           id: '2',
//           isSelected: false
//         }
//       ])

//       sortProperties = A([
//         {
//           direction: ':desc',
//           value: 'id'
//         }
//       ])

//       const mixinTestObject = Controller.extend(FrostListSortingMixin)
//       mixin = mixinTestObject.create({
//         listConfig: {
//           items: 'model',
//           sorting: {}
//         }
//       })
//       mixin.set('model', testItems)
//     })

//     it('calls default sort', function () {
//       const resultItems = [
//         {
//           id: '2',
//           isSelected: false
//         },
//         {
//           id: '1',
//           isSelected: false
//         }
//       ]
//       mixin.send('sortItems', sortProperties)

//       expect(
//         mixin.get('model'),
//         'items sorted by "id" in desc order'
//       ).to.eql(resultItems)
//     })

//     it('calls the user defined sort', function () {
//       mixin.set('listConfig.sorting.client', sandbox.spy())
//       mixin.send('sortItems', sortProperties)

//       expect(
//         mixin.get('listConfig.sorting.client').called
//       ).to.eql(true)
//     })

//     it('throws assertion error when custom sort method is not a function', function () {
//       mixin.set('listConfig.sorting.client', 'test')

//       expect(
//         () => {
//           mixin.send('sortItems', sortProperties)
//         }
//       ).to.throw(/custom sort method to be function/)
//     })
//   })
// })
define('dummy/tests/unit/utils/selection-test', ['exports', 'chai', 'ember-frost-list/utils/selection', 'mocha'], function (exports, _chai, _emberFrostListUtilsSelection, _mocha) {

  (0, _mocha.describe)('Unit / Utility / selection', function () {
    // Replace this with your real tests.
    _mocha.it.skip('works', function () {
      var result = (0, _emberFrostListUtilsSelection['default'])();
      (0, _chai.expect)(result).not.to.equal(undefined);
    });
  });
});
define("dummy/tests/unit/utils/utils-test", ["exports"], function (exports) {});
// import Ember from 'ember'
// import {expect} from 'chai'
// const {A, Object} = Ember
// import {beforeEach, describe, it} from 'mocha'
// import {updateSelectedItemsHash, normalizeSort, defaultSort} from 'ember-frost-list/utils/utils'

// describe('Unit / Utils / utils', function () {
//   describe('updateSelectedItemsHash function', function () {
//     describe('single item or multiple items selection', function () {
//       describe('single item selection', function () {
//         let attr

//         beforeEach(function () {
//           attr = Object.create({
//             selectDesc: {
//               isSelected: true,
//               isShiftSelect: false
//             },
//             records: [
//               {
//                 id: '1'
//               }
//             ]
//           })
//         })

//         it('updates selection', function () {
//           expect(
//             updateSelectedItemsHash(Object.create(), attr)
//           ).to.eql(Object.create({ 1: true }))
//         })

//         it('clicks on the item but not the check box', function () {
//           const selections = Object.create({
//             2: true,
//             3: true
//           })

//           expect(
//             updateSelectedItemsHash(selections, attr),
//             'previous selected record/records are deleted'
//           ).to.eql(Object.create({ 1: true }))
//         })
//       })

//       describe('shiftKey selection', function () {
//         let attr

//         beforeEach(function () {
//           attr = Object.create({
//             selectDesc: {
//               isSelected: true,
//               isShiftSelect: true
//             },
//             records: [
//               {
//                 id: '1'
//               }
//             ]
//           })
//         })

//         it('updates selections', function () {
//           expect(
//             updateSelectedItemsHash(Object.create(), attr)
//           ).to.eql(Object.create({ 1: true }))
//         })
//       })

//       describe('control or command key selection', function () {
//         let attr

//         beforeEach(function () {
//           attr = Object.create({
//             selectDesc: {
//               isSelected: true,
//               isShiftSelect: false,
//               isCtrlSelect: true
//             },
//             records: [
//               {
//                 id: '2'
//               }
//             ]
//           })
//         })

//         it('updates selections and does NOT delete prevous record/records', function () {
//           expect(
//             updateSelectedItemsHash(Object.create({ 1: true }), attr)
//           ).to.eql(Object.create(
//             {
//               1: true,
//               2: true
//             })
//           )
//         })
//       })
//     })

//     describe('unselect item', function () {
//       let attr

//       beforeEach(function () {
//         attr = Object.create({
//           selectDesc: {
//             isSelected: false
//           },
//           records: [
//             {
//               id: '1'
//             }
//           ]
//         })
//       })

//       it('deletes id from selections', function () {
//         expect(
//           updateSelectedItemsHash(Object.create({ 1: true }), attr)
//         ).to.eql(Object.create())
//       })
//     })
//   })

//   describe('normalizeSort function', function () {
//     describe('sort array is NOT present', function () {
//       it('returns empty array', function () {
//         expect(
//           normalizeSort()
//         ).to.eql([])
//       })
//     })

//     describe('sort array exists', function () {
//       it('returns output prefixed with "-"', function () {
//         const sort = A([
//           {
//             direction: ':desc',
//             value: 'label'
//           }
//         ])

//         expect(
//           normalizeSort(sort)
//         ).to.eql(A(['-label']))
//       })

//       it('returns output prefixed with no "-"', function () {
//         const sort = A([
//           {
//             direction: ':asc',
//             value: 'label'
//           }
//         ])

//         expect(
//           normalizeSort(sort)
//         ).to.eql(A(['label']))
//       })
//     })
//   })

//   describe('defaultSort function', function () {
//     describe('sortProperties is NOT present', function () {
//       it('returns and does nothing', function () {
//         expect(
//           defaultSort(Object.create())
//         ).to.eql(undefined)
//       })
//     })

//     describe('sortProperties is present', function () {
//       it('sorts items in ascending order', function () {
//         const sortProperties = A(['label'])

//         const items = A([
//           {
//             label: '2'
//           },
//           {
//             label: '1'
//           }
//         ])

//         const sortedItems = A([
//           {
//             label: '1'
//           },
//           {
//             label: '2'
//           }
//         ])

//         expect(
//           defaultSort(items, sortProperties)
//         ).to.eql(sortedItems)
//       })

//       it('sorts items in descending order', function () {
//         const sortProperties = A(['-label'])

//         const items = A([
//           {
//             label: '1'
//           },
//           {
//             label: '2'
//           }
//         ])

//         const sortedItems = A([
//           {
//             label: '2'
//           },
//           {
//             label: '1'
//           }
//         ])

//         expect(
//           defaultSort(items, sortProperties)
//         ).to.eql(sortedItems)
//       })
//     })
//   })
// })
/* jshint ignore:start */

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
