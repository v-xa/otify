(function (global) {
  const CONTAINER_ID = 'notifications-container';
  const ANIMATION_DURATION = 500;

  const embedStyles = () => {
    const styles = `
      #${CONTAINER_ID} {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .notification {
        color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transform: translateX(100%);
        animation: slideIn ${ANIMATION_DURATION / 1000}s forwards, fadeOut ${ANIMATION_DURATION / 1000}s 4s forwards;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        line-height: 1.5;
      }

      .notification.dark { background-color: #333; }
      .notification.light { background-color: #f4f4f4; color: #333; }
      .notification.success { background-color: #4CAF50; }
      .notification.error { background-color: #F44336; }
      .notification.info { background-color: #2196F3; }

      .notification .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        color: inherit;
        cursor: pointer;
        transition: transform 0.3s ease;
      }

      .notification .close-btn:hover { transform: scale(1.2); }

      @keyframes slideIn {
        0% { opacity: 0; transform: translateX(100%); }
        100% { opacity: 1; transform: translateX(0); }
      }

      @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  };

  const otify = {
    init: function () {
      if (!document.getElementById(CONTAINER_ID)) {
        const container = document.createElement('div');
        container.id = CONTAINER_ID;
        document.body.appendChild(container);
      }
    },

    show: function (message, options = {}) {
      const {
        duration = 4000,
        type = 'info',
        theme = 'light',
        closeable = true,
      } = options;

      const durationMs = typeof duration === 'string' && duration.endsWith('s')
        ? parseInt(duration) * 1000
        : duration;

      const notification = this.createNotification(message, type, theme, closeable);
      this.appendToContainer(notification);

      setTimeout(() => {
        this.close(notification);
      }, durationMs);
    },

    createNotification: function (message, type, theme, closeable) {
      const notification = document.createElement('div');
      notification.classList.add('notification', type, theme);
      notification.innerHTML = message;

      if (closeable) {
        const closeBtn = this.createCloseButton(notification);
        notification.appendChild(closeBtn);
      }

      return notification;
    },

    createCloseButton: function (notification) {
      const closeBtn = document.createElement('span');
      closeBtn.classList.add('close-btn');
      closeBtn.innerHTML = '&times;';
      closeBtn.onclick = () => this.close(notification);
      return closeBtn;
    },

    appendToContainer: function (notification) {
      const container = document.getElementById(CONTAINER_ID);
      container.appendChild(notification);
    },

    close: function (notification) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, ANIMATION_DURATION);
    },

    success: function (message, options) {
      this.show(message, { ...options, type: 'success' });
    },

    error: function (message, options) {
      this.show(message, { ...options, type: 'error' });
    },

    info: function (message, options) {
      this.show(message, { ...options, type: 'info' });
    }
  };

  global.otify = otify;
  otify.init();
  embedStyles();
})(window);
