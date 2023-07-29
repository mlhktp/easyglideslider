<?php
$type = isset($attributes['type']) ? $attributes['type'] : null;
$startAtValue = isset($attributes['startAtValue']) ? $attributes['startAtValue'] : null;
$perViewValue = isset($attributes['perViewValue']) ? $attributes['perViewValue'] : null;
$focusAtCentered = isset($attributes['focusAtCentered']) ? $attributes['focusAtCentered'] : null;
$focusAtValue = isset($attributes['focusAtValue']) ? $attributes['focusAtValue'] : null;
$gap = isset($attributes['gap']) ? $attributes['gap'] : null;
$autoplay = isset($attributes['autoplay']) ? $attributes['autoplay'] : null;
$hoverpause = isset($attributes['hoverpause']) ? $attributes['hoverpause'] : null;
$keyboard = isset($attributes['keyboard']) ? $attributes['keyboard'] : null;
$bound = isset($attributes['bound']) ? $attributes['bound'] : null;
$swipeThreshold = isset($attributes['swipeThreshold']) ? $attributes['swipeThreshold'] : null;
$dragThreshold = isset($attributes['dragThreshold']) ? $attributes['dragThreshold'] : null;
$perTouch = isset($attributes['perTouch']) ? $attributes['perTouch'] : null;
$touchRatio = isset($attributes['touchRatio']) ? $attributes['touchRatio'] : null;
$touchAngle = isset($attributes['touchAngle']) ? $attributes['touchAngle'] : null;
$animationDuration = isset($attributes['animationDuration']) ? $attributes['animationDuration'] : null;
$rewind = isset($attributes['rewind']) ? $attributes['rewind'] : null;
$rewindDuration = isset($attributes['rewindDuration']) ? $attributes['rewindDuration'] : null;
$animationTimingFunc = isset($attributes['animationTimingFunc']) ? esc_attr($attributes['animationTimingFunc']) : null;
$direction = isset($attributes['direction']) ? esc_attr($attributes['direction']) : null;
$peekBefore = isset($attributes['peek']['before']) ? $attributes['peek']['before'] : null;
$peekAfter = isset($attributes['peek']['after']) ? $attributes['peek']['after'] : null;
$throttle = isset($attributes['throttle']) ? $attributes['throttle'] : null;

$blockData = compact(
  'type',
  'startAtValue',
  'perViewValue',
  'focusAtCentered',
  'focusAtValue',
  'gap',
  'autoplay',
  'hoverpause',
  'keyboard',
  'bound',
  'swipeThreshold',
  'dragThreshold',
  'perTouch',
  'touchRatio',
  'touchAngle',
  'animationDuration',
  'rewind',
  'rewindDuration',
  'animationTimingFunc',
  'direction',
  'peekBefore',
  'peekAfter',
  'throttle'
);

$blockData = array_filter($blockData, function($value) {
  return $value !== null && $value !== '';
});
?>

<div class="hero-slider custom-slides"  <?php foreach($blockData as $key => $value) { echo "data-$key='$value' "; } ?>>
  <div data-glide-el="track" class="glide__track">
    <div class="glide__slides">
      <?php echo $content; ?>
    </div>
    <div class="slider__bullets glide__bullets" data-glide-el="controls[nav]"></div>
  </div>
</div>
