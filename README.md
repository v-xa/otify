# Otify - JavaScript Notification Library

Otify is a lightweight JavaScript library for displaying elegant notifications on a webpage. It provides a simple API for showing, styling, and managing notifications.

## Installation

You can include Otify in your project by referencing the script directly:

```html
<script src="https://raw.githubusercontent.com/v-xa/otify/refs/heads/main/main/js/otify.js"></script>
```

Alternatively, you can download the script and include it in your project manually.

## Initialization

Otify initializes automatically when the script is loaded. It creates a container for notifications and embeds the required styles.

## Usage

### Display a Notification

To show a notification, use:

```js
otify.show("Your message here", {
  duration: 5000,   // Duration in milliseconds
  type: "success",  // Options: "success", "error", "info"
  theme: "dark",    // Options: "light", "dark"
  closeable: true    // Show close button
});
```

### Quick Methods

Otify provides shortcut methods for different types of notifications:

```js
otify.success("Success message", { duration: 3000 });
otify.error("Error message", { closeable: false });
otify.info("Information message");
```

## Options

The `show` method accepts an options object with the following properties:

| Option     | Type      | Default  | Description |
|------------|----------|----------|-------------|
| `duration` | Number   | `4000`   | Time (in ms) before notification disappears |
| `type`     | String   | `info`   | Type of notification (`success`, `error`, `info`) |
| `theme`    | String   | `light`  | Theme (`light`, `dark`) |
| `closeable` | Boolean  | `true`  | Whether the notification has a close button |

## Styling

Otify notifications are styled with CSS animations for smooth appearance and disappearance. You can override styles by modifying the `notification` class or adding your own themes.

## Methods

### `otify.init()`
Ensures the notification container exists in the document. Called automatically.

### `otify.show(message, options)`
Displays a notification with custom options.

### `otify.success(message, options)`
Displays a success notification.

### `otify.error(message, options)`
Displays an error notification.

### `otify.info(message, options)`
Displays an info notification.

### `otify.close(notificationElement)`
Closes a specific notification element.

## Example Usage

```js
document.getElementById("notify-btn").addEventListener("click", function() {
  notify.success("Operation successful!", { duration: 3000 });
});
```

## License
Otify is open-source and available under the Apache License.

