import "../css/style.scss";

import { InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
  TextControl,
  SelectControl,
} from "@wordpress/components";
import { __experimentalNumberControl as NumberControl } from "@wordpress/components";

import { useSelect } from "@wordpress/data";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("easyglidesliderplugin/easyglide-slider", {
  title: "Easy Glide Slider",
  supports: {
    align: ["full"],
  },
  icon: "slides",
  category: "common",
  attributes: {
    align: { type: "string", default: "full" },
    type: { type: "string", default: "carousel" },
    startAtValue: { type: "number", default: 0 },
    perViewValue: { type: "number", default: 1 },
    focusAtCentered: { type: "boolean", default: false },
    focusAtValue: { type: "number", default: 20 },
    gap: { type: "number", default: 10 },
    autoplay: { type: "number", default: 0 },
    hoverpause: { type: "boolean", default: true },
    keyboard: { type: "boolean", default: true },
    bound: { type: "boolean", default: false },
    swipeThreshold: { type: "number", default: 80 },
    dragThreshold: { type: "number", default: 120 },
    perTouch: { type: "number", default: false },
    touchRatio: { type: "number", default: 0.5 },
    touchAngle: { type: "number", default: 45 },
    animationDuration: { type: "number", default: 400 },
    rewind: { type: "boolean", default: true },
    rewindDuration: { type: "number", default: 800 },
    animationTimingFunc: {
      type: "string",
      default: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
    },
    direction: { type: "string", default: "ltr" },
    peek: { type: "object", default: { before: 100, after: 50 } },
    throttle: { type: "number", default: 25 },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function SaveComponent() {
  return <InnerBlocks.Content />;
}

function EditComponent(props) {
  const { attributes, setAttributes } = props;
  const { clientId } = props;
  const innerBlockCount = useSelect(
    (select) => select("core/block-editor").getBlock(clientId).innerBlocks
  );
  const slideCount = innerBlockCount.length;

  return (
    <>
      <InspectorControls>
        <PanelBody title="Settings" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Type of the movement"
              help="Slider: Rewinds slider to the start/end when it reaches first or last slide.
            Carousel: Changes slides without starting over when it reaches first or last slide."
              options={[
                { value: "carousel", label: "Carousel" },
                { value: "slider", label: "Slider" },
              ]}
              value={attributes.type}
              onChange={(value) => setAttributes({ type: value })}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Start At"
              help="Start at specific slide number defined with zero-based index."
              value={attributes.startAtValue}
              onChange={(value) => setAttributes({ startAtValue: value })}
              min={1}
              max={slideCount}
              step={1}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Per view"
              help="A number of slides visible on the single viewport."
              value={attributes.perViewValue}
              onChange={(value) => setAttributes({ perViewValue: value })}
              min={1}
              max={slideCount}
              step={1}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Focus at"
              help="Focus currently active slide at a specified position in the track. Available inputs:
          'center' - current slide will be always focused at the center of a track,
          1,2,3... - current slide will be focused on the specified zero-based index."
              value={attributes.focusAtValue}
              onChange={(value) => setAttributes({ focusAtValue: value })}
              min={0}
              max={slideCount}
              step={1}
              disabled={props.attributes.focusAtCentered} // Conditionally set the `disabled` attribute
            />
            <ToggleControl
              checked={props.attributes.focusAtCentered}
              onChange={() =>
                props.setAttributes({
                  focusAtCentered: !props.attributes.focusAtCentered,
                })
              }
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Gap"
              help="Size of the gap added between slides."
              value={attributes.gap}
              onChange={(value) => setAttributes({ gap: value })}
              min={0}
              shiftStep={10}
              isShiftStepEnabled={true}
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Autoplay"
              help="Delay between transitions (ms). If this parameter is false, autoplay is disabled."
              value={attributes.autoplay}
              onChange={(value) => setAttributes({ autoplay: value })}
              min={0}
              shiftStep={1000}
              isShiftStepEnabled={true}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Hover Pause"
              help="Stop autoplay on mouseover event."
              checked={attributes.hoverpause}
              onChange={() =>
                setAttributes({ hoverpause: !attributes.hoverpause })
              }
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Keyboard Control"
              help="Allow for changing slides with left and right keyboard arrows."
              checked={attributes.keyboard}
              onChange={() => setAttributes({ keyboard: !attributes.keyboard })}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Bound"
              help="Stop running perView number of slides from the end. Use this option if you don't want to have an empty space after a slider."
              checked={attributes.bound}
              onChange={() => setAttributes({ bound: !attributes.bound })}
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Swipe Threshold"
              help="By default, swipe distance is about 1/3 of the container width. This option allows you to set any value you want."
              value={attributes.swipeThreshold}
              onChange={(value) => setAttributes({ swipeThreshold: value })}
              min={0}
              shiftStep={10}
              isShiftStepEnabled={true}
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Drag Threshold"
              help="Minimal distance required to trigger swipes or drags (px)."
              value={attributes.dragThreshold}
              onChange={(value) => setAttributes({ dragThreshold: value })}
              min={0}
              shiftStep={10}
              isShiftStepEnabled={true}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Per Touch"
              help="Move or swipe n slides per swipe/touch."
              value={attributes.perTouch}
              onChange={(value) => setAttributes({ perTouch: value })}
              min={0}
              max={slideCount}
              step={1}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Touch Ratio"
              help="Ratio of mousemove to touchmove speed on touch enabled devices."
              value={attributes.touchRatio}
              onChange={(value) => setAttributes({ touchRatio: value })}
              min={0}
              max={1}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Touch Angle"
              help="Tolerance (in degrees) for the touch angle."
              value={attributes.touchAngle}
              onChange={(value) => setAttributes({ touchAngle: value })}
              min={0}
              max={90}
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Animation Duration"
              help="Duration of the transition in milliseconds."
              value={attributes.animationDuration}
              onChange={(value) => setAttributes({ animationDuration: value })}
              min={100}
              shiftStep={100}
              isShiftStepEnabled={true}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Rewind"
              help="Allows looping the slider type. Slider will rewind to the first/last slide when it's at the start/end."
              checked={attributes.rewind}
              onChange={() => setAttributes({ rewind: !attributes.rewind })}
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Rewind Duration"
              help="Duration of the rewind animation in milliseconds."
              value={attributes.rewindDuration}
              onChange={(value) => setAttributes({ rewindDuration: value })}
              min={100}
              shiftStep={100}
              isShiftStepEnabled={true}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="Animation Timing Function"
              help="Easing function for the animation (e.g. 'linear', 'ease-out', 'cubic-bezier(0.165, 0.840, 0.440, 1.000)'). Valid options include: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(n,n,n,n)."
              value={attributes.animationTimingFunc}
              onChange={(value) =>
                setAttributes({ animationTimingFunc: value })
              }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Direction"
              options={[
                { label: "Left to Right", value: "ltr" },
                { label: "Right to Left", value: "rtl" },
              ]}
              value={attributes.direction}
              onChange={(value) => setAttributes({ direction: value })}
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Peek Before"
              help="Number of pixels that should be visible on left side of active slide."
              value={attributes.peek.before}
              onChange={(value) =>
                setAttributes({
                  peek: { ...attributes.peek, before: value },
                })
              }
              min={0}
              shiftStep={10}
              isShiftStepEnabled={true}
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Peek After"
              help="Number of pixels that should be visible on right side of active slide."
              value={attributes.peek.after}
              onChange={(value) =>
                setAttributes({
                  peek: { ...attributes.peek, after: value },
                })
              }
              min={0}
              shiftStep={100}
              isShiftStepEnabled={true}
            />
          </PanelRow>
          <PanelRow>
            <NumberControl
              label="Throttle"
              help="Time in milliseconds between two consecutive mousewheel or touchmove events."
              value={attributes.throttle}
              onChange={(value) => setAttributes({ throttle: value })}
              min={1}
              shiftStep={10}
              isShiftStepEnabled={true}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div
        style={{
          backgroundImage:
            "linear-gradient(to right bottom,#845ec2,#b45cb6,#d65fa5,#ed6993,#fa7a82,#ff8977,#ff9a6e,#ffac69,#ffbe66,#ffd166,#ffe469,#f9f871)",
          padding: "35px",
        }}
      >
        <p
          className="admin-easyglideslider-p"
          style={{
            textAlign: "center",
            color: "#ffffff",
            fontSize: "100px",
            fontStyle: "italic",
            fontWeight: "900",
            letterSpacing: "-4px",
            lineHeight: "0.8",
            textTransform: "none",
            whiteSpace: "pre-wrap",
            minWidth: "1px",
            transition: "all 0.3s ease 0s",
            margin: "25px",
          }}
        >
          Easy Glide Slideshow
        </p>
        <div style={{ padding: "30px" }}>
          <InnerBlocks
            allowedBlocks={["easyglidesliderplugin/easyglideoneslide"]}
          />
        </div>
      </div>
    </>
  );
}
