// 7→7 FLOWCARD Application JavaScript - Enhanced with 12-Hour Format

// Application data with 12-hour format
const dailySchedule = [
  {
    "time": "10:00 PM",
    "timeEnd": "7:00 AM",
    "activity": "Bed",
    "details": "9 h sleep window (lights < 300 lux by 9:00 PM)",
    "type": "recovery"
  },
  {
    "time": "7:00 AM", 
    "timeEnd": "7:05 AM",
    "activity": "Wake · 500 mL water + salt",
    "details": "Hydration kickstart",
    "type": "recovery"
  },
  {
    "time": "7:05 AM",
    "timeEnd": "7:20 AM", 
    "activity": "Travel ➜ Workout site", 
    "details": "Walk / bike 15 min (outbound)",
    "type": "workout"
  },
  {
    "time": "7:20 AM",
    "timeEnd": "8:20 AM", 
    "activity": "60-min Workout",
    "details": "See today's workout in Workouts tab",
    "type": "workout"
  },
  {
    "time": "8:20 AM",
    "timeEnd": "8:35 AM",  
    "activity": "Travel ⬅︎ home",
    "details": "15 min return",
    "type": "workout"
  },
  {
    "time": "8:35 AM",
    "timeEnd": "8:55 AM", 
    "activity": "Shower → 5-min meditate / pray",
    "details": "Recovery transition",
    "type": "recovery"
  },
  {
    "time": "9:00 AM",
    "timeEnd": "9:30 AM", 
    "activity": "Breakfast", 
    "details": "Smoothie + coffee (80 mg)",
    "type": "nutrition"
  },
  {
    "time": "9:30 AM",
    "timeEnd": "11:00 AM", 
    "activity": "Deep-Work #1",
    "details": "90 min focused work block",
    "type": "work"
  },
  {
    "time": "11:00 AM",
    "timeEnd": "11:05 AM", 
    "activity": "5-min sun & stretch",
    "details": "Movement break",
    "type": "recovery"
  },
  {
    "time": "11:05 AM",
    "timeEnd": "1:00 PM",  
    "activity": "Deep-Work #2",
    "details": "115 min focused work block",
    "type": "work"
  },
  {
    "time": "1:00 PM",
    "timeEnd": "1:30 PM", 
    "activity": "Territory lunch",
    "details": "40 g P", 
    "type": "nutrition"
  },
  {
    "time": "1:30 PM",
    "timeEnd": "1:40 PM", 
    "activity": "10-min NSDR (no nap)",
    "details": "Non-sleep deep rest",
    "type": "recovery"
  },
  {
    "time": "2:00 PM",
    "timeEnd": "4:00 PM", 
    "activity": "Deep-Work #3", 
    "details": "120 min focused work block",
    "type": "work"
  },
  {
    "time": "4:00 PM",
    "timeEnd": "4:30 PM", 
    "activity": "Archie walk / errands",
    "details": "Movement & tasks",
    "type": "other"
  },
  {
    "time": "6:00 PM",
    "timeEnd": "6:30 PM", 
    "activity": "Shef dinner",
    "details": "+ whey if < 30 g P today",
    "type": "nutrition"
  },
  {
    "time": "8:00 PM",
    "timeEnd": "8:15 PM",  
    "activity": "15-min Archie stroll",
    "details": "Evening movement",
    "type": "other"
  },
  {
    "time": "9:00 PM",
    "timeEnd": "9:15 PM", 
    "activity": "Dim lights · Mg + glycine", 
    "details": "Sleep prep supplements",
    "type": "recovery"
  },
  {
    "time": "10:00 PM",
    "timeEnd": "7:00 AM", 
    "activity": "Lights-out",
    "details": "Sleep 9 h",
    "type": "recovery"
  }
];

const weeklyWorkouts = {
  "Monday": {
    "name": "Body-weight Circuit A", 
    "details": "Goblet-style squats, incline push-ups, planks + 200 SU rope",
    "travel": "15 min × 2"
  },
  "Tuesday": {
    "name": "Zone-2 Dog Walk",
    "details": "75-90 min Zone-2 dog walk (uses full 1.5 h block, no extra travel)",
    "travel": "—"
  },
  "Wednesday": {
    "name": "Basketball Skills",
    "details": "Basketball skill/drills 60 min", 
    "travel": "15 min × 2"
  },
  "Thursday": {
    "name": "Body-weight Circuit B",
    "details": "Pike push-ups, lunges, hollow holds + 200 SU rope",
    "travel": "15 min × 2"
  },
  "Friday": {
    "name": "Hoops Scrimmage",
    "details": "Hoops scrimmage 60-75 min",
    "travel": "15 min × 2"
  },
  "Saturday": {
    "name": "Body-weight Circuit C",
    "details": "Jump squats, diamond push-ups, mobility",
    "travel": "15 min × 2"
  },
  "Sunday": {
    "name": "Yoga + Rope",
    "details": "Yoga 30 min + 200 SU rope",
    "travel": "–"
  }
};

// Application state
let completedTasks = new Set();
let completedMacros = new Set();
let currentTab = 'today';

// DOM elements
let scheduleGrid, progressFill, progressText, todayWorkout, workoutGrid;
let resetButton, currentDateElement, currentTimeElement;
let currentActivityName, currentActivityTime, currentActivityDetails;

// Time conversion utilities
function parseTime12Hour(timeStr) {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let hour24 = hours;
  if (period === 'AM' && hours === 12) {
    hour24 = 0;
  } else if (period === 'PM' && hours !== 12) {
    hour24 = hours + 12;
  }
  
  return hour24 * 60 + (minutes || 0);
}

function formatTime12Hour(date) {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function getCurrentActivity() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Handle overnight activities (10 PM - 7 AM)
  const adjustedCurrentMinutes = currentMinutes < 7 * 60 ? currentMinutes + 24 * 60 : currentMinutes;
  
  for (let i = 0; i < dailySchedule.length; i++) {
    const activity = dailySchedule[i];
    const startMinutes = parseTime12Hour(activity.time);
    const endMinutes = parseTime12Hour(activity.timeEnd);
    
    // Handle overnight activities
    let adjustedStart = startMinutes;
    let adjustedEnd = endMinutes;
    
    if (startMinutes >= 22 * 60) { // 10 PM or later
      if (endMinutes < 12 * 60) { // ends before noon next day
        adjustedEnd = endMinutes + 24 * 60;
      }
    }
    
    if (adjustedCurrentMinutes >= adjustedStart && adjustedCurrentMinutes < adjustedEnd) {
      return activity;
    }
  }
  
  // Default fallback
  return dailySchedule[0];
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  displayCurrentDateTime();
  renderCurrentActivity();
  renderSchedule();
  renderTodayWorkout();
  renderWorkoutReference();
  setupEventListeners();
  updateProgress();
  
  // Update current time and activity every minute
  setInterval(() => {
    displayCurrentDateTime();
    renderCurrentActivity();
    updateScheduleStatus();
  }, 60000);
});

function initializeElements() {
  scheduleGrid = document.getElementById('schedule-grid');
  progressFill = document.getElementById('progress-fill');
  progressText = document.getElementById('progress-text');
  todayWorkout = document.getElementById('today-workout');
  workoutGrid = document.getElementById('workout-grid');
  resetButton = document.getElementById('reset-button');
  currentDateElement = document.getElementById('current-date');
  currentTimeElement = document.getElementById('current-time');
  currentActivityName = document.getElementById('current-activity-name');
  currentActivityTime = document.getElementById('current-activity-time');
  currentActivityDetails = document.getElementById('current-activity-details');
}

function displayCurrentDateTime() {
  const now = new Date();
  
  // Display current date
  const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
  
  // Display current time in 12-hour format
  currentTimeElement.textContent = formatTime12Hour(now);
}

function renderCurrentActivity() {
  const currentActivity = getCurrentActivity();
  
  currentActivityName.textContent = currentActivity.activity;
  
  // Format time range
  let timeRange = currentActivity.time;
  if (currentActivity.timeEnd && currentActivity.time !== currentActivity.timeEnd) {
    timeRange = `${currentActivity.time} - ${currentActivity.timeEnd}`;
  }
  currentActivityTime.textContent = timeRange;
  
  currentActivityDetails.textContent = currentActivity.details || '';
}

function renderSchedule() {
  scheduleGrid.innerHTML = '';
  
  dailySchedule.forEach((item, index) => {
    const scheduleItem = document.createElement('div');
    scheduleItem.className = 'schedule-item';
    scheduleItem.setAttribute('data-type', item.type);
    
    const taskId = `task-${index}`;
    const isCompleted = completedTasks.has(taskId);
    
    if (isCompleted) {
      scheduleItem.classList.add('completed');
    }
    
    // Display time range
    let displayTime = item.time;
    if (item.timeEnd && item.time !== item.timeEnd) {
      displayTime = `${item.time} - ${item.timeEnd}`;
    }
    
    scheduleItem.innerHTML = `
      <input type="checkbox" class="schedule-checkbox" id="${taskId}" ${isCompleted ? 'checked' : ''}>
      <div class="schedule-content">
        <div class="schedule-time">${displayTime}</div>
        <div class="schedule-activity">${item.activity}</div>
        ${item.details ? `<div class="schedule-details">${item.details}</div>` : ''}
      </div>
    `;
    
    scheduleGrid.appendChild(scheduleItem);
  });
  
  updateScheduleStatus();
}

function updateScheduleStatus() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const currentActivity = getCurrentActivity();
  
  document.querySelectorAll('.schedule-item').forEach((item, index) => {
    const activity = dailySchedule[index];
    const startMinutes = parseTime12Hour(activity.time);
    const endMinutes = parseTime12Hour(activity.timeEnd);
    
    // Remove existing status classes
    item.classList.remove('current', 'past');
    
    // Handle overnight activities for comparison
    let adjustedCurrentMinutes = currentMinutes < 7 * 60 ? currentMinutes + 24 * 60 : currentMinutes;
    let adjustedStart = startMinutes >= 22 * 60 ? startMinutes : startMinutes;
    let adjustedEnd = endMinutes < 12 * 60 && startMinutes >= 22 * 60 ? endMinutes + 24 * 60 : endMinutes;
    
    if (activity === currentActivity) {
      item.classList.add('current');
    } else if (adjustedCurrentMinutes > adjustedEnd) {
      item.classList.add('past');
    }
  });
}

function renderTodayWorkout() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayWorkoutData = weeklyWorkouts[today];
  
  todayWorkout.innerHTML = `
    <div class="workout-day">${today}</div>
    <div class="workout-description">${todayWorkoutData.details}</div>
    ${todayWorkoutData.travel !== '—' && todayWorkoutData.travel !== '–' ? 
      `<div class="workout-travel">Travel: ${todayWorkoutData.travel}</div>` : ''}
  `;
}

function renderWorkoutReference() {
  workoutGrid.innerHTML = '';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  Object.entries(weeklyWorkouts).forEach(([day, workout]) => {
    const workoutCard = document.createElement('div');
    workoutCard.className = 'workout-day-card';
    
    if (day === today) {
      workoutCard.classList.add('current-day');
    }
    
    workoutCard.innerHTML = `
      <div class="workout-day-name">${day}</div>
      <div class="workout-day-description">${workout.details}</div>
      ${workout.travel !== '—' && workout.travel !== '–' ? 
        `<div class="workout-travel">Travel: ${workout.travel}</div>` : ''}
    `;
    
    workoutGrid.appendChild(workoutCard);
  });
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
  
  // Schedule checkboxes and macro checkboxes
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('schedule-checkbox')) {
      const taskId = e.target.id;
      const scheduleItem = e.target.closest('.schedule-item');
      
      if (e.target.checked) {
        completedTasks.add(taskId);
        scheduleItem.classList.add('completed');
      } else {
        completedTasks.delete(taskId);
        scheduleItem.classList.remove('completed');
      }
      
      updateProgress();
      saveState();
    }
    
    // Macro checkboxes
    if (e.target.hasAttribute('data-macro')) {
      const macroId = e.target.id;
      
      if (e.target.checked) {
        completedMacros.add(macroId);
      } else {
        completedMacros.delete(macroId);
      }
      
      updateProgress();
      saveState();
    }
  });
  
  // Reset button
  resetButton.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all checkboxes?')) {
      resetAllTasks();
    }
  });
  
  // Load saved state
  loadState();
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`${tabName}-tab`).classList.add('active');
  
  currentTab = tabName;
}

function updateProgress() {
  const totalScheduleTasks = dailySchedule.length;
  const totalMacroTasks = 9; // 4 protein sources + 5 recovery anchors
  const totalTasks = totalScheduleTasks + totalMacroTasks;
  const completedCount = completedTasks.size + completedMacros.size;
  
  const progressPercentage = Math.round((completedCount / totalTasks) * 100);
  
  progressFill.style.width = `${progressPercentage}%`;
  progressText.textContent = `${progressPercentage}% Complete`;
}

function resetAllTasks() {
  // Clear completed tasks
  completedTasks.clear();
  completedMacros.clear();
  
  // Uncheck all checkboxes
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Remove completed class from schedule items
  const scheduleItems = document.querySelectorAll('.schedule-item');
  scheduleItems.forEach(item => {
    item.classList.remove('completed');
  });
  
  updateProgress();
  saveState();
}

function saveState() {
  // We can't use localStorage in this sandbox environment,
  // but keeping the structure for potential future use
  try {
    // localStorage.setItem('completedTasks', JSON.stringify([...completedTasks]));
    // localStorage.setItem('completedMacros', JSON.stringify([...completedMacros]));
  } catch (e) {
    // Silently fail if localStorage is not available
  }
}

function loadState() {
  try {
    // const savedTasks = localStorage.getItem('completedTasks');
    // const savedMacros = localStorage.getItem('completedMacros');
    
    // if (savedTasks) {
    //   completedTasks = new Set(JSON.parse(savedTasks));
    // }
    
    // if (savedMacros) {
    //   completedMacros = new Set(JSON.parse(savedMacros));
    // }
    
    // Update UI based on loaded state
    setTimeout(() => {
      completedTasks.forEach(taskId => {
        const checkbox = document.getElementById(taskId);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.closest('.schedule-item')?.classList.add('completed');
        }
      });
      
      completedMacros.forEach(macroId => {
        const checkbox = document.getElementById(macroId);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
      
      updateProgress();
    }, 100);
  } catch (e) {
    // Silently fail if localStorage is not available
  }
}

// Add smooth animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add click animations to interactive elements
  const interactiveElements = document.querySelectorAll('.schedule-item, .workout-day-card, .macro-card, .tab-button');
  interactiveElements.forEach(element => {
    element.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('mouseup', function() {
      this.style.transform = '';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
});

// Export functions for potential testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    dailySchedule,
    weeklyWorkouts,
    parseTime12Hour,
    formatTime12Hour,
    getCurrentActivity,
    updateProgress,
    resetAllTasks
  };
}