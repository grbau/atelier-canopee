import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormFieldService {

    FIELD_FOCUS_CLASS = 'form-group--focus';
    FIELD_FILLED_CLASS = 'form-group--filled';
    FIELD_ERROR_CLASS = 'form-group--error';
    FIELDS_ERROR_CLASS = 'field__errors';

    constructor() { }

    fieldFocusInputElement() {
        Array.from(document.querySelectorAll('.form-group--text')).forEach(field => {
            Array.from(field.querySelectorAll('input')).forEach(input => {
                if ((input.value.trim() !== '') || input.type === 'date') {
                    field.classList.add(this.FIELD_FILLED_CLASS);
                }
            });
            Array.from(field.querySelectorAll('select')).forEach(select => {
                field.classList.add(this.FIELD_FILLED_CLASS);
            });
            Array.from(field.querySelectorAll('textarea')).forEach(textarea => {
                if (textarea.value.trim() !== null) {
                    field.classList.add(this.FIELD_FILLED_CLASS);
                }
            });

        });

        this.delegateListener(document, 'focusin', '.form-group', ev => {
            ev.delegateTarget.classList.add(this.FIELD_FOCUS_CLASS);
        });

        this.delegateListener(document, 'focusout', '.form-group', ev => {
            ev.delegateTarget.classList.remove(this.FIELD_FOCUS_CLASS);
        });

        this.delegateListener(document, 'change', '.form-group', ev => {
            // If the field is left non-empty, then mark it as filled. Otherwise, unmark it.
          if (ev.target.value.trim()) {
            ev.delegateTarget.classList.add(this.FIELD_FILLED_CLASS);
          } else {
            ev.delegateTarget.classList.remove(this.FIELD_FILLED_CLASS);
          }
        });
    }

    delegateListener(element, eventType, selector, callback) {
        element.addEventListener(eventType, ev => {
            let iterator = ev.target
            let fireCb = false
            while (!fireCb && iterator !== null && (iterator !== this || selector)) {
                if (iterator && iterator.matches(selector)) {
                    fireCb = true;
                } else {
                    iterator = iterator.parentElement;
                }
            }
            if (fireCb) {
                ev.delegateTarget = iterator
                callback(ev);
            }
        });
    }
}
