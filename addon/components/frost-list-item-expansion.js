/**
 * The expansion control for frost list items
 *
 * Indicates state and captures clicks
 */

import Ember from 'ember'
const {ViewUtils} = Ember
const {isSimpleClick} = ViewUtils
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-list-item-expansion'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['isExpanded'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Options
    model: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),

    onExpand: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('model.isExpanded')
  isExpanded (isExpanded) {
    return isExpanded
  },

  // == Functions =============================================================

  // == DOM Events ============================================================

  click (event) {
    if (isSimpleClick(event)) {
      event.preventDefault()
      event.stopPropagation()

      this.onExpand(this.get('model'))
    }
  }

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})
