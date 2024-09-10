# Segment Management React App

## Overview
This React application allows users to create and save segments with associated schemas. It provides an interactive UI where users can add or remove schemas and save them to a segment. The app uses a webhook to post the segment data and manage schemas dynamically.

### Main Features:
- Add, remove, and view schemas for a segment.
- Save segment data to a backend using a webhook.
- Uses global state management with React Context.
- Styled using Ant Design and custom CSS.
- Notification system using `react-toastify`.

---

## Project Structure

### Components

1. **App.js**  
   The entry point of the application. Wraps the `ViewSegment` component inside the `SegmentProvider` to provide global state.

2. **ViewSegment.js**  
   This component provides the UI for viewing and managing segments. It includes:
   - A form to input the segment name.
   - Options to add or remove schemas.
   - A drawer for saving the segment.
   - Axios for making HTTP POST requests to the webhook.

3. **SegmentContext.js**  
   This file contains the global state management using React's Context API. It manages:
   - Segment name (`segmentName`).
   - List of added schemas (`addedSchemas`).
   - List of available schemas (`availableSchemas`).

4. **setupProxy.js**  
   Configures a proxy for API requests, allowing `/api` and `/webhook` requests to be forwarded to local or external targets.

---

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- NPM or Yarn package manager

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Samnoyal/ReactSegmentTask.git
   cd ReactSegmentTask
