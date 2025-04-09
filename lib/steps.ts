import { StepType } from '@reactour/tour'

const steps : StepType[] = [
  {
    selector: '[data-tour="add-todo-input"]',
    content: 'This is the input field where you can add a new todo item.',
    position: 'left',
  },
  {
    selector: '[data-tour="add-todo-button"]',
    content: 'This is the button to add the todo item you entered in the input field.',
    highlightedSelectors: ['[data-tour="add-todo-input"]', '[data-tour="add-todo-button"]'],
    position: 'bottom',
  },
  {
    selector: '[data-tour="active-container"]',
    content: 'This is the active todos container. You can drag and drop items here.',
    position: 'center',
  },
  {
    selector: '[data-tour="completed-container"]',
    content: 'This is the completed todos container. You can drag and drop items here.',
    position: 'center',
  },
  {
    selector: '[data-tour="toogole-theme"]',
    content: 'This is the button to toggle between light and dark mode.',
    position: 'top',
  },
  {
    selector: '[data-tour="logout-button"]',
    content: 'This is the button to logout from the application.',
    position: 'top',
  }
]

export default steps