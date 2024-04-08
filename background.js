
  chrome.runtime.onInstalled.addListener(() => {
    // Initialize storage if needed
    chrome.storage.local.get("reminders", (data) => {
      if (!data.reminders) {
        chrome.storage.local.set({ reminders: [] });
      }
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setReminder") {
      const reminder = message.reminder;
      chrome.storage.local.get("reminders", (data) => {
        const reminders = data.reminders || [];
        reminders.push(reminder);
        chrome.storage.local.set({ reminders }, () => {
          sendResponse({ success: true });
        });
      });
    }
  });
  
  function checkReminders() {
    chrome.storage.local.get("reminders", (data) => {
      const reminders = data.reminders || [];
      const currentTime = new Date().getTime();
      reminders.forEach((reminder) => {
        const reminderTime = new Date(reminder.time).getTime();
        if (reminderTime <= currentTime) {
          chrome.notifications.create({
            type: "basic",
            title: "Reminder",
            message: reminder.task,
            iconUrl: "icon48.png",
          });
        }
      });
    });
  }
  
  chrome.alarms.create("checkReminders", {
    periodInMinutes: 1, // Check reminders every minute
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "checkReminders") {
      checkReminders();
    }
  });


