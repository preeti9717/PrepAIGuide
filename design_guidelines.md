# Prep AI Design Guidelines

## Design Approach
**System-Based with Custom Enhancement**: Material Design principles adapted for education/productivity, inspired by Linear's clean UI and Duolingo's engaging learning experience.

## Core Design Principles
1. **Focus-Driven**: Minimize distractions to keep users in learning mode
2. **Progress-Visible**: Clear feedback on achievements and growth
3. **Scannable**: Quick identification of difficulty, topics, and status
4. **Encouraging**: Positive reinforcement through streaks and stats

## Typography Hierarchy
- **Primary Font**: System font stack (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- **Page Titles**: 2rem (32px), font-weight 700
- **Section Headers**: 1.5rem (24px), font-weight 600
- **Card Titles**: 1.125rem (18px), font-weight 600
- **Body Text**: 1rem (16px), font-weight 400
- **Metadata/Tags**: 0.875rem (14px), font-weight 500

## Spacing System
Use Tailwind units: **2, 3, 4, 6, 8, 12, 16** for consistent rhythm
- Card padding: p-6 (desktop), p-4 (mobile)
- Section gaps: gap-6 (desktop), gap-4 (mobile)
- Page padding: px-6 py-8

## Layout Structure

### Home Page Grid
- Mobile: Single column stack
- Desktop: 2-column grid (Today's Plan + Weekly Goals top row, Quick Practice + Stats bottom row)
- Max-width container: max-w-6xl mx-auto

### Question Cards (Aptitude/DSA)
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Card structure: Badge (category/difficulty) → Question preview → CTA button
- Consistent card height with overflow handling

### Navigation
- **Top Header**: Fixed position, backdrop-blur, 60px height, centered logo
- **Bottom Nav**: Fixed bottom, 64px height, 4-5 icons with labels, active state with accent color

## Component Specifications

### ProgressCircle
- SVG: 120px diameter, 12px stroke width
- Ring: partial circle based on percentage
- Center text: percentage + label below
- Smooth gradient stroke (indigo to purple)

### Cards
- Background: Elevated surface (lighter than page background)
- Border-radius: 12px
- Subtle shadow for depth
- Hover: Slight lift (translateY(-2px)) + shadow increase

### Buttons
- Primary CTA: Indigo/purple gradient background, white text, px-6 py-3, rounded-lg
- Secondary: Transparent with border, accent text
- Hover: Slight brightness increase + scale(1.02)

### Badges/Tags
- Pill-shaped: rounded-full, px-3 py-1
- Difficulty colors: Easy (green), Medium (amber), Hard (red) - muted tones
- Category tags: Neutral gray with accent border

### Status Indicators
- Streaks: Fire emoji + number, highlighted container
- Correct/Incorrect: Green checkmark / Red X icons
- Completion: Progress bar or percentage with visual meter

## Dark Theme Colors (Reference Only - No Implementation)
- Page background: Near-black (#0f0f0f to #121212)
- Card surface: Lighter (#1a1a1a to #1e1e1e)
- Accent: Indigo/purple gradient (#6366f1 to #8b5cf6)
- Text primary: Near-white (#f0f0f0)
- Text secondary: Muted gray (#a0a0a0)
- Success: Muted green
- Warning/Error: Muted amber/red

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns for grids, 2 for feature sections)

## Interactive States
- Hover: Subtle scale or brightness change
- Active: Slight press effect (scale down)
- Focus: Visible outline for accessibility
- Loading: Skeleton screens for cards

## Data Visualization
- Progress rings: Animated stroke-dasharray
- Stats: Large numbers with descriptive labels below
- Trends: Simple bar/line indicators (if showing history)

## Content Density
- Comfortable spacing between elements
- No cramped layouts - breathing room is key
- Question previews: 2-3 lines max with ellipsis
- Lists: Clear separation between items (border-bottom or gap)

## Accessibility
- Sufficient contrast ratios on dark background
- Focus indicators on all interactive elements
- Clear button labels
- Keyboard navigation support

**No Images Required**: This is a learning/productivity app focused on practice and progress tracking - purely UI-driven with data visualization.