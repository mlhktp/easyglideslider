import { InnerBlocks } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("easyglidesliderplugin/easyglideoneslide", {
  title: "Glide Slide",
  icon: "align-wide",
  supports: {
    align: ["full"],
  },
  attributes: {
    align: { type: "string", default: "full" },
  },
  edit: EditComponent,
  save: SaveComponent,
});
function EditComponent(props) {
  //const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map(block => block.name).filter(blockName => array("easyglidesliderplugin/easyglide-slider", "easyglidesliderplugin/easyglideoneslide").indexOf(blockName) !== -1); 
  const ALLOWED_BLOCKS = wp.blocks
    .getBlockTypes()
    .map((block) => block.name)
    .filter(
      (blockName) => blockName !== "easyglidesliderplugin/easyglide-slider"
    );
  return (
    <>
      <div className="hero-slider__slide" style={{
        padding: "40px",
        margin: "10px",
        border: "4px solid #ccc",
        borderRadius: "28px",
      }}>
        <div className="hero-slider__interior container">
          <div className="hero-slider__overlay t-center">
            <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
          </div>
        </div>
      </div>
    </>
  );
}
function SaveComponent() {
  return <InnerBlocks.Content />;
}
