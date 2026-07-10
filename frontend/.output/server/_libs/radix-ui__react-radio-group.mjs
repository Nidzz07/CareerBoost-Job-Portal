import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "./@floating-ui/react-dom+[...].mjs";
import { _ as createContextScope, c as useControllableState, f as Primitive, l as Presence, o as useDirection, v as useComposedRefs, y as require_jsx_runtime } from "./@radix-ui/react-accordion+[...].mjs";
import { t as composeEventHandlers } from "./radix-ui__primitive.mjs";
import { i as useSize, r as usePrevious } from "./@radix-ui/react-checkbox+[...].mjs";
import { _ as createRovingFocusGroupScope, g as Root, h as Item } from "./@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/@radix-ui/react-radio-group/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProviderImpl, useRadioContext] = createRadioContext(RADIO_NAME);
function RadioProvider(props) {
	const { __scopeRadio, checked = false, children, disabled, form, name, onCheck, required, value = "on", internal_do_not_use_render } = props;
	const [control, setControl] = import_react.useState(null);
	const [bubbleInput, setBubbleInput] = import_react.useState(null);
	const context = {
		checked,
		disabled,
		required,
		name,
		form,
		value,
		control,
		setControl,
		hasConsumerStoppedPropagationRef: import_react.useRef(false),
		isFormControl: control ? !!form || !!control.closest("form") : true,
		bubbleInput,
		setBubbleInput,
		onCheck: () => onCheck?.()
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioProviderImpl, {
		scope: __scopeRadio,
		...context,
		children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
	});
}
var TRIGGER_NAME = "RadioTrigger";
var RadioTrigger = import_react.forwardRef(({ __scopeRadio, onClick, ...radioProps }, forwardedRef) => {
	const { checked, disabled, value, setControl, onCheck, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useRadioContext(TRIGGER_NAME, __scopeRadio);
	const composedRefs = useComposedRefs(forwardedRef, setControl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		role: "radio",
		"aria-checked": checked,
		"data-state": getState(checked),
		"data-disabled": disabled ? "" : void 0,
		disabled,
		value,
		...radioProps,
		ref: composedRefs,
		onClick: composeEventHandlers(onClick, (event) => {
			if (!checked) onCheck();
			if (bubbleInput && isFormControl) {
				hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
				if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
			}
		})
	});
});
RadioTrigger.displayName = TRIGGER_NAME;
var Radio = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, name, checked, required, disabled, value, onCheck, form, ...radioProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioProvider, {
		__scopeRadio,
		checked,
		disabled,
		required,
		onCheck,
		name,
		form,
		value,
		internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTrigger, {
			...radioProps,
			ref: forwardedRef,
			__scopeRadio
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioBubbleInput, { __scopeRadio })] })
	});
});
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadio, forceMount, ...indicatorProps } = props;
	const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef
		})
	});
});
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = import_react.forwardRef(({ __scopeRadio, ...props }, forwardedRef) => {
	const { control, checked, required, disabled, name, value, form, bubbleInput, setBubbleInput, hasConsumerStoppedPropagationRef } = useRadioContext(BUBBLE_INPUT_NAME, __scopeRadio);
	const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = bubbleInput;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		const bubbles = !hasConsumerStoppedPropagationRef.current;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			setChecked.call(input, checked);
			input.dispatchEvent(event);
		}
	}, [
		bubbleInput,
		prevChecked,
		checked,
		hasConsumerStoppedPropagationRef
	]);
	const defaultCheckedRef = import_react.useRef(checked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "radio",
		"aria-hidden": true,
		defaultChecked: defaultCheckedRef.current,
		required,
		disabled,
		name,
		value,
		form,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
	return typeof value === "function";
}
function getState(checked) {
	return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME, [createRovingFocusGroupScope, createRadioScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, name, form, defaultValue, value: valueProp, required = false, disabled = false, orientation, dir, loop = true, onValueChange, ...groupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? null,
		onChange: onValueChange,
		caller: RADIO_GROUP_NAME
	});
	const [control, setControl] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, setControl);
	const initialValueRef = import_react.useRef(value);
	import_react.useEffect(() => {
		const associatedForm = form ? control?.ownerDocument.getElementById(form) : control?.closest("form");
		if (associatedForm instanceof HTMLFormElement) {
			const reset = () => setValue(initialValueRef.current);
			associatedForm.addEventListener("reset", reset);
			return () => associatedForm.removeEventListener("reset", reset);
		}
	}, [
		control,
		form,
		setValue
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupProvider, {
		scope: __scopeRadioGroup,
		name,
		form,
		required,
		disabled,
		value,
		onValueChange: setValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			asChild: true,
			...rovingFocusGroupScope,
			orientation,
			dir: direction,
			loop,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				role: "radiogroup",
				"aria-required": required,
				"aria-orientation": orientation,
				"data-disabled": disabled ? "" : void 0,
				dir: direction,
				...groupProps,
				ref: composedRefs
			})
		})
	});
});
RadioGroup.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var ITEM_PROVIDER_NAME = "RadioGroupItemProvider";
var ITEM_TRIGGER_NAME = "RadioGroupItemTrigger";
var ITEM_BUBBLE_INPUT_NAME = "RadioGroupItemBubbleInput";
function RadioGroupItemProvider(props) {
	const { __scopeRadioGroup, value, disabled, children, internal_do_not_use_render } = props;
	const context = useRadioGroupContext(ITEM_PROVIDER_NAME, __scopeRadioGroup);
	const radioScope = useRadioScope(__scopeRadioGroup);
	const isDisabled = context.disabled || disabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioProvider, {
		...radioScope,
		checked: context.value === value,
		disabled: isDisabled,
		required: context.required,
		name: context.name,
		form: context.form,
		value,
		onCheck: () => context.onValueChange(value),
		internal_do_not_use_render,
		children
	});
}
var RadioGroupItemTrigger = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, ...triggerProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
	const radioScope = useRadioScope(__scopeRadioGroup);
	const { checked, disabled } = useRadioContext(ITEM_TRIGGER_NAME, radioScope.__scopeRadio);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const isArrowKeyPressedRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (ARROW_KEYS.includes(event.key)) isArrowKeyPressedRef.current = true;
		};
		const handleKeyUp = () => isArrowKeyPressedRef.current = false;
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: checked,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTrigger, {
			...radioScope,
			...triggerProps,
			ref: composedRefs,
			onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
				if (event.key === "Enter") event.preventDefault();
			}),
			onFocus: composeEventHandlers(triggerProps.onFocus, () => {
				if (isArrowKeyPressedRef.current) ref.current?.click();
			})
		})
	});
});
RadioGroupItemTrigger.displayName = ITEM_TRIGGER_NAME;
var RadioGroupItem = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, value, disabled, ...itemProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItemProvider, {
		__scopeRadioGroup,
		value,
		disabled,
		internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItemTrigger, {
			...itemProps,
			ref: forwardedRef,
			__scopeRadioGroup
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItemBubbleInput, { __scopeRadioGroup })] })
	});
});
RadioGroupItem.displayName = ITEM_NAME;
var RadioGroupItemBubbleInput = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, ...bubbleProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioBubbleInput, {
		...useRadioScope(__scopeRadioGroup),
		...bubbleProps,
		ref: forwardedRef
	});
});
RadioGroupItemBubbleInput.displayName = ITEM_BUBBLE_INPUT_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeRadioGroup, ...indicatorProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioIndicator, {
		...useRadioScope(__scopeRadioGroup),
		...indicatorProps,
		ref: forwardedRef
	});
});
RadioGroupIndicator.displayName = INDICATOR_NAME2;
//#endregion
export { RadioGroupIndicator as n, RadioGroupItem as r, RadioGroup as t };
