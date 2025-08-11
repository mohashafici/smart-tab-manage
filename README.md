# Smart Tab Manager (Chrome/Edge Extension)

A lightweight Manifest V3 extension to help you manage and organize tabs.

- Save the current window's tabs as a named session
- Restore any saved session
- Close duplicate tabs across all windows
- Clear all saved sessions
- Set the active page's background color (regular webpages only)

---

## Demo

Open the extension popup to access all actions. Pin the icon from the toolbar for quick use.

---

## Features

- **Save Tab Session**: Prompts for a session name and stores URLs of all open tabs using `chrome.storage.local`.
- **Restore Saved Session**: Prompts for a saved session name and opens all URLs in new tabs.
- **Close Duplicate Tabs**: Scans all tabs across all windows and removes duplicates.
- **Clear All Sessions**: Deletes every saved session from local storage.
- **Set Background Color**: Injects a tiny script to set `document.body.style.backgroundColor = "#f4e2d8"` on the active tab. Not supported on `chrome://` or `edge://` pages.

---

## Installation (Load Unpacked)

1. Download or clone this repository.
2. Open Chrome (or Edge) and go to `chrome://extensions` (Edge: `edge://extensions`).
3. Enable "Developer mode" (toggle in the top-right corner).
4. Click "Load unpacked" and select the project folder.

The extension should now appear in your toolbar. Click the pin icon to keep it visible.

---

## Usage

1. Click the extension icon to open the popup.
2. Use any of the buttons:
   - Save the current set of tabs with a friendly name
   - Restore a previously saved session
   - Close duplicate tabs across all browser windows
   - Clear all saved sessions
   - Apply a background color to the current page (non `chrome://` / `edge://`)

Saved sessions are stored locally on your device via `chrome.storage.local`.

---

## Permissions

The extension requests these permissions:

- `tabs`: Read tab URLs and create/remove tabs for session features
- `storage`: Persist named sessions locally
- `scripting`: Inject small scripts (for background color)
- `activeTab`: Act on the current active tab when needed

---

## Project Structure

```
smart-tab-manage/
├─ background.js        # Service worker: duplicate-tab closing and runtime events
├─ popup.html           # Popup UI
├─ popup.css            # Popup styles
├─ popup.js             # Popup logic and chrome.storage interactions
├─ manifest.json        # Manifest V3 configuration
├─ icon16.png
├─ icon48.png
├─ icon128.png
```

---

## How It Works

- The popup (`popup.js`) manages sessions using `chrome.storage.local` and interacts with tabs via the `tabs` API.
- The background service worker (`background.js`) listens for a `closeDuplicates` message, deduplicates by URL, and removes duplicates.
- `chrome.scripting.executeScript` is used to change the active page's background color. Restricted pages like `chrome://` or `edge://` are skipped.

---

## Development

No build tools required. To iterate:

1. Edit `popup.js`, `background.js`, `popup.html`, or `popup.css`.
2. Go to `chrome://extensions`.
3. Click the refresh icon on the extension card to reload.
4. Reopen the popup and check the console for any logs/errors.

---

## Troubleshooting

- Background color injection won't work on restricted pages (`chrome://`, `edge://`, Web Store, etc.).
- If restoring a large session opens too many tabs, consider splitting into multiple sessions.
- After edits, remember to reload the extension in `chrome://extensions`.

---

## Privacy

This extension does not transmit data off your device. Sessions are stored locally using `chrome.storage.local`.

---

## License

MIT License. You may use, modify, and distribute this extension. If you prefer, add a dedicated `LICENSE` file.

---

## Credits

- Icons included in this repository (`icon16.png`, `icon48.png`, `icon128.png`). Replace with your own if desired.
