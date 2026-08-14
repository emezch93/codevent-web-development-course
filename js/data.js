/* CodeVent Web Development — course content
   Structure: MODULES -> lessons[] / projects[]
   Lesson shape: { id, title, concept, why, how, example, code:{html,css,js}, practice:{task,hint,solution}, miniTask }
*/

const COURSE = {
  title: "CodeVent Web Development",
  tagline: "Learn web development from HTML to JavaScript by building real projects from scratch.",
  modules: [
    // ============================= MODULE 1: HTML =============================
    {
      id: "m1",
      title: "HTML",
      short: "Structure",
      description: "Document structure, elements, forms, semantic markup, accessibility.",
      lessons: [
        {
          id: "m1-l1",
          title: "What HTML Is & Document Structure",
          concept: "HTML (HyperText Markup Language) defines the structure of a webpage using elements. Every HTML document follows a fixed skeleton that browsers expect.",
          why: "Without a valid document structure, browsers may render pages inconsistently and search engines cannot reliably index content.",
          how: "A document starts with a doctype declaration, followed by an html element containing a head (metadata) and a body (visible content).",
          example: "A blank HTML page with a title and one paragraph of visible text.",
          code: {
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <p>This text is visible in the browser.</p>
</body>
</html>`
          },
          practice: {
            task: "Write a complete HTML document with the title \"My First Page\" and a paragraph containing your name.",
            hint: "Start with <!DOCTYPE html>, then <html>, <head> with <title>, and <body> with a <p>.",
            solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <p>Jane Doe</p>
</body>
</html>`
          },
          miniTask: "Create index.html on your computer using this structure and open it in a browser."
        },
        {
          id: "m1-l2",
          title: "Elements, Tags, Headings, Paragraphs",
          concept: "An element is made of an opening tag, content, and a closing tag. Headings (h1–h6) rank content by importance. Paragraphs (p) hold blocks of text.",
          why: "Correct heading levels give the page a logical outline that screen readers and search engines rely on.",
          how: "Use one h1 per page for the main title. Use h2–h6 for subsections in descending order. Use p for text blocks.",
          example: "A page title as h1, a section heading as h2, and a paragraph under it.",
          code: {
            html: `<h1>CodeVent Digital</h1>
<h2>About</h2>
<p>CodeVent Digital teaches web development through projects.</p>`
          },
          practice: {
            task: "Create an h1 titled \"My Profile\", an h2 titled \"Skills\", and a paragraph listing one skill.",
            hint: "Nest nothing — h1, h2, and p are siblings at the same level unless placed inside a container.",
            solution: `<h1>My Profile</h1>
<h2>Skills</h2>
<p>HTML and CSS.</p>`
          },
          miniTask: "Add three more h2 sections to your page: \"Experience\", \"Projects\", \"Contact\"."
        },
        {
          id: "m1-l3",
          title: "Text Formatting",
          concept: "Inline elements like strong, em, br, and span change how text is presented or grouped without breaking the flow of a paragraph.",
          why: "Formatting communicates meaning, not just appearance. strong marks importance; em marks emphasis.",
          how: "Wrap the relevant text in the inline tag. br forces a single line break inside a block. span groups text with no semantic meaning, used for styling hooks.",
          example: "A paragraph with one bold phrase and one italicized phrase.",
          code: {
            html: `<p>This project is <strong>required</strong> and should be submitted <em>before Friday</em>.</p>`
          },
          practice: {
            task: "Write a sentence describing a course, making one word strong and one word emphasized.",
            hint: "strong and em are separate tags — do not nest one inside the other unless the meaning requires it.",
            solution: `<p>The <strong>HTML</strong> module is <em>foundational</em>.</p>`
          },
          miniTask: "Add a line break inside one paragraph using br without starting a new paragraph."
        },
        {
          id: "m1-l4",
          title: "Links and Images",
          concept: "The a element creates hyperlinks using an href attribute. The img element embeds images using a src attribute and requires alt text.",
          why: "alt text is read by screen readers and shown if the image fails to load. Missing alt attributes break accessibility.",
          how: "a wraps the clickable content. img is self-closing and needs both src and alt.",
          example: "A link to an external site and an image with descriptive alt text.",
          code: {
            html: `<a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a>
<img src="profile.jpg" alt="Headshot of Jane Doe" width="200">`
          },
          practice: {
            task: "Create a link to \"https://example.com\" with the text \"Visit site\" and an image tag with a placeholder src and meaningful alt text.",
            hint: "target=\"_blank\" opens the link in a new tab. alt describes what the image shows, not \"image\".",
            solution: `<a href="https://example.com" target="_blank">Visit site</a>
<img src="banner.jpg" alt="CodeVent Digital course banner">`
          },
          miniTask: "Add an internal link using href=\"#section-id\" that jumps to a heading with a matching id."
        },
        {
          id: "m1-l5",
          title: "Lists and Tables",
          concept: "ul creates an unordered list, ol an ordered list, both containing li items. table structures tabular data using tr (row), th (header cell), and td (data cell).",
          why: "Lists group related items semantically. Tables should only hold tabular data, not be used for page layout.",
          how: "Nest li inside ul or ol. Nest tr inside table, and th/td inside tr.",
          example: "An unordered list of three skills and a two-row pricing table.",
          code: {
            html: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<table>
  <tr>
    <th>Plan</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Course</td>
    <td>$49</td>
  </tr>
</table>`
          },
          practice: {
            task: "Create an ordered list of three steps to sign up for a course, then a table with two columns: Module and Duration, with one data row.",
            hint: "Ordered lists use ol; each step is still an li.",
            solution: `<ol>
  <li>Create an account</li>
  <li>Choose a course</li>
  <li>Start the first module</li>
</ol>
<table>
  <tr><th>Module</th><th>Duration</th></tr>
  <tr><td>HTML</td><td>1 week</td></tr>
</table>`
          },
          miniTask: "Add a nested ul inside one li to represent a sub-list."
        },
        {
          id: "m1-l6",
          title: "Forms and Inputs",
          concept: "The form element collects user input. Input types include text, email, password, number, and checkbox. Each input should be tied to a label.",
          why: "Labels connected via the for attribute make forms usable with screen readers and let users click the label to focus the input.",
          how: "Wrap the form fields in a form element with an action and method. Pair each input with a label using matching for and id values.",
          example: "A form with a name field and an email field.",
          code: {
            html: `<form action="/submit" method="post">
  <label for="name">Name</label>
  <input type="text" id="name" name="name">

  <label for="email">Email</label>
  <input type="email" id="email" name="email">
</form>`
          },
          practice: {
            task: "Build a form with a text input for \"Full Name\" and a number input for \"Age\", each with a matching label.",
            hint: "The for value on label must exactly match the id value on the input.",
            solution: `<form>
  <label for="fullname">Full Name</label>
  <input type="text" id="fullname" name="fullname">
  <label for="age">Age</label>
  <input type="number" id="age" name="age">
</form>`
          },
          miniTask: "Add a checkbox input labeled \"Subscribe to updates\" to the form."
        },
        {
          id: "m1-l7",
          title: "Buttons and Form Controls",
          concept: "button submits, resets, or triggers actions. select creates a dropdown with option children. textarea holds multi-line text input.",
          why: "type=\"submit\" sends the form. type=\"button\" does nothing on its own and is used with JavaScript.",
          how: "Place button inside form for submission. Use select with nested option elements for a dropdown list.",
          example: "A submit button and a dropdown for selecting a course level.",
          code: {
            html: `<label for="level">Level</label>
<select id="level" name="level">
  <option value="beginner">Beginner</option>
  <option value="intermediate">Intermediate</option>
</select>

<button type="submit">Enroll</button>`
          },
          practice: {
            task: "Add a textarea labeled \"Message\" and a submit button labeled \"Send\" to a form.",
            hint: "textarea needs both an opening and closing tag; it is not self-closing.",
            solution: `<form>
  <label for="message">Message</label>
  <textarea id="message" name="message"></textarea>
  <button type="submit">Send</button>
</form>`
          },
          miniTask: "Add a select with three course options to your form."
        },
        {
          id: "m1-l8",
          title: "Semantic HTML & Page Structure",
          concept: "Semantic elements like header, nav, main, section, article, aside, and footer describe the purpose of page regions instead of relying only on div.",
          why: "Semantic structure improves accessibility, SEO, and code readability compared to a page built entirely from generic divs.",
          how: "Wrap the site navigation in nav, the primary content in main, distinct topic groups in section, and the page footer in footer.",
          example: "A page skeleton using semantic regions instead of divs.",
          code: {
            html: `<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
</header>

<main>
  <section id="about">
    <h2>About</h2>
    <p>CodeVent Digital teaches practical web development.</p>
  </section>
</main>

<footer>
  <p>&copy; 2026 CodeVent Digital</p>
</footer>`
          },
          practice: {
            task: "Rebuild a simple page using header, nav, main, section, and footer instead of divs.",
            hint: "A page has one header, one main, and one footer; it can have several section elements.",
            solution: `<header><nav><a href="#top">Top</a></nav></header>
<main>
  <section><h2>Services</h2><p>Web development.</p></section>
</main>
<footer><p>Contact us.</p></footer>`
          },
          miniTask: "Add an article element inside main to represent a single blog post."
        },
        {
          id: "m1-l9",
          title: "Accessibility Fundamentals",
          concept: "Accessible HTML lets people using screen readers, keyboards, or assistive devices use a page. It relies on semantic tags, alt text, labels, and logical heading order.",
          why: "A page that only works with a mouse and perfect vision excludes a large portion of users and fails basic usability standards.",
          how: "Use one h1 per page, label every input, add alt text to every meaningful image, and make interactive elements reachable by keyboard (native button and a elements already are).",
          example: "A button that is a real button element instead of a styled div, so it is focusable and operable with Enter or Space.",
          code: {
            html: `<button type="button" aria-label="Close dialog">×</button>`
          },
          practice: {
            task: "Identify and fix the accessibility problem: <div onclick=\"submit()\">Submit</div>",
            hint: "A div is not focusable and has no keyboard behavior. Replace it with a real interactive element.",
            solution: `<button type="button" onclick="submit()">Submit</button>`
          },
          miniTask: "Audit your profile page and add alt text to any image missing it."
        },
        {
          id: "m1-l10",
          title: "HTML Best Practices",
          concept: "Consistent indentation, lowercase tag names, closed elements, and meaningful ids/classes keep HTML maintainable.",
          why: "Inconsistent markup is harder to debug and harder for a second developer to read.",
          how: "Indent nested elements, quote all attribute values, and give ids/classes names that describe purpose, not appearance.",
          example: "A well-formatted card versus a poorly formatted one.",
          code: {
            html: `<div class="pricing-card">
  <h3>Course</h3>
  <p>$49</p>
</div>`
          },
          practice: {
            task: "Rewrite this messy markup with proper indentation and a meaningful class name: <div class=blue><p>Hi</p></div>",
            hint: "Quote the attribute value and rename the class to describe its role, not its color.",
            solution: `<div class="welcome-message">
  <p>Hi</p>
</div>`
          },
          miniTask: "Review your Module 1 project file and fix any unclosed tags or inconsistent indentation."
        }
      ],
      project: {
        id: "m1-project",
        title: "Personal Profile Website",
        objective: "Build a complete personal profile page using only HTML.",
        requirements: [
          "Valid document structure with doctype, head, and body",
          "One h1 with your name",
          "A short bio paragraph",
          "A list of skills",
          "A table of two projects with name and description",
          "A contact form with name and email fields",
          "Semantic layout using header, main, and footer"
        ],
        steps: [
          "Set up the document skeleton and title",
          "Add a header with your name and a nav linking to page sections",
          "Add a bio section with a paragraph",
          "Add a skills section with a ul",
          "Add a projects section with a table",
          "Add a contact section with a form",
          "Add a footer"
        ],
        challenge: "Add a semantic article element for one detailed project write-up, with its own heading and paragraph."
      }
    },

    // ============================= MODULE 2: CSS =============================
    {
      id: "m2",
      title: "CSS",
      short: "Styling",
      description: "Selectors, box model, layout, Flexbox, Grid, responsive design.",
      lessons: [
        {
          id: "m2-l1",
          title: "What CSS Is & Syntax",
          concept: "CSS (Cascading Style Sheets) controls the visual presentation of HTML. A rule is a selector followed by declarations inside curly braces.",
          why: "Separating structure (HTML) from presentation (CSS) keeps markup clean and styling reusable across pages.",
          how: "Link an external stylesheet with a link element in the head, or write a rule as selector { property: value; }.",
          example: "A stylesheet link and one rule that colors all paragraphs.",
          code: {
            html: `<link rel="stylesheet" href="styles.css">`,
            css: `p {
  color: #333333;
  font-size: 16px;
}`
          },
          practice: {
            task: "Write a CSS rule that sets the background color of the body to a light gray.",
            hint: "The selector is body, the property is background-color.",
            solution: `body {
  background-color: #f2f2f2;
}`
          },
          miniTask: "Create styles.css and link it to your profile page."
        },
        {
          id: "m2-l2",
          title: "Selectors, Classes, and IDs",
          concept: "Type selectors target tags (p), class selectors target .class-name and can repeat, id selectors target #id-name and must be unique per page.",
          why: "Classes are reusable across many elements; ids are for one specific element, often used as a JavaScript hook.",
          how: "Add class=\"name\" or id=\"name\" in HTML, then reference it in CSS with a dot or hash prefix.",
          example: "A reusable .card class applied to two different elements.",
          code: {
            html: `<div class="card">Card 1</div>
<div class="card">Card 2</div>`,
            css: `.card {
  padding: 16px;
  border: 1px solid #ddd;
}`
          },
          practice: {
            task: "Create a .highlight class that sets a yellow background, and apply it to two paragraphs.",
            hint: "Define the class once in CSS, reuse class=\"highlight\" on each element.",
            solution: `<p class="highlight">First</p>
<p class="highlight">Second</p>`
          },
          miniTask: "Add an id to your page header and give it a distinct background color."
        },
        {
          id: "m2-l3",
          title: "Colors and Backgrounds",
          concept: "Colors can be set with keywords, hex codes, rgb(), or hsl(). background-color sets a solid fill; background-image sets an image or gradient.",
          why: "Hex and rgb give precise, consistent color control across a design system.",
          how: "Use color for text color and background-color for the element's fill.",
          example: "A button with a solid background and white text.",
          code: {
            css: `.btn {
  background-color: #2563eb;
  color: #ffffff;
}`
          },
          practice: {
            task: "Style a .card element with a white background, dark gray text, and a light border color.",
            hint: "Use three separate declarations: background-color, color, border-color.",
            solution: `.card {
  background-color: #ffffff;
  color: #222222;
  border: 1px solid #e0e0e0;
}`
          },
          miniTask: "Apply a linear-gradient background to one section using background: linear-gradient(...)."
        },
        {
          id: "m2-l4",
          title: "Typography",
          concept: "font-family sets the typeface, font-size the text size, font-weight the boldness, and line-height the vertical spacing between lines.",
          why: "Consistent typography establishes hierarchy and improves readability.",
          how: "Set a base font-family on body, then adjust font-size and font-weight per element for hierarchy.",
          example: "A heading with a larger, bolder font than the body text.",
          code: {
            css: `body {
  font-family: Arial, sans-serif;
  line-height: 1.5;
}
h1 {
  font-size: 32px;
  font-weight: 700;
}`
          },
          practice: {
            task: "Set the body font-family to a sans-serif stack and give h2 a font-size of 24px and font-weight of 600.",
            hint: "List a fallback font after your primary choice in font-family.",
            solution: `body { font-family: "Segoe UI", sans-serif; }
h2 { font-size: 24px; font-weight: 600; }`
          },
          miniTask: "Set line-height: 1.6 on all paragraphs for readability."
        },
        {
          id: "m2-l5",
          title: "Box Model, Margin, and Padding",
          concept: "Every element is a box made of content, padding, border, and margin. Padding is space inside the border; margin is space outside it.",
          why: "Misunderstanding the box model is the most common source of unexpected spacing bugs.",
          how: "Use box-sizing: border-box so width and height include padding and border, avoiding surprise overflow.",
          example: "A card with padding inside and margin separating it from the next element.",
          code: {
            css: `* {
  box-sizing: border-box;
}
.card {
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
}`
          },
          practice: {
            task: "Give a .box element 24px padding on all sides and a 32px margin on the bottom only.",
            hint: "margin-bottom sets only the bottom side; padding without a direction sets all four sides.",
            solution: `.box {
  padding: 24px;
  margin-bottom: 32px;
}`
          },
          miniTask: "Add box-sizing: border-box to a global * rule in your stylesheet."
        },
        {
          id: "m2-l6",
          title: "Width, Height, Display, and Positioning",
          concept: "width and height set element size. display controls layout behavior (block, inline, inline-block, none). position controls how an element is placed (static, relative, absolute, fixed).",
          why: "position: absolute removes an element from normal flow and places it relative to its nearest positioned ancestor, which causes confusion if the ancestor is not set to position: relative.",
          how: "Set a parent to position: relative before placing a child with position: absolute inside it.",
          example: "A badge positioned in the top-right corner of a card.",
          code: {
            css: `.card {
  position: relative;
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`
          },
          practice: {
            task: "Position a .close-icon in the top-right corner of a .modal element.",
            hint: "The .modal needs position: relative for the absolute child to anchor correctly.",
            solution: `.modal { position: relative; }
.close-icon { position: absolute; top: 12px; right: 12px; }`
          },
          miniTask: "Set display: none on an element and confirm it disappears from the page layout entirely."
        },
        {
          id: "m2-l7",
          title: "Flexbox",
          concept: "Flexbox arranges children of a container in a row or column with control over alignment, spacing, and order using display: flex.",
          why: "Flexbox solves vertical centering and even spacing problems that were difficult with older CSS layout methods.",
          how: "Set display: flex on the parent, then use justify-content for the main axis and align-items for the cross axis.",
          example: "A navbar with logo on the left and links on the right.",
          code: {
            css: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`
          },
          practice: {
            task: "Create a .row that displays three .item children side by side with equal gaps using flexbox.",
            hint: "Use gap on the flex container instead of margins on each item.",
            solution: `.row {
  display: flex;
  gap: 16px;
}`
          },
          miniTask: "Use flex-direction: column to stack the same items vertically instead."
        },
        {
          id: "m2-l8",
          title: "CSS Grid",
          concept: "Grid arranges children in a two-dimensional layout of rows and columns using display: grid and grid-template-columns.",
          why: "Grid handles full-page and card-grid layouts more directly than Flexbox, which is one-dimensional.",
          how: "Set display: grid on the container, define columns with grid-template-columns, and control spacing with gap.",
          example: "A three-column card grid.",
          code: {
            css: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`
          },
          practice: {
            task: "Create a grid with two equal columns and a 24px gap.",
            hint: "repeat(2, 1fr) creates two equal-width columns.",
            solution: `.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}`
          },
          miniTask: "Change the grid to auto-fit columns using grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))."
        },
        {
          id: "m2-l9",
          title: "Responsive Design & Media Queries",
          concept: "Media queries apply CSS rules only when the viewport matches a condition, most commonly a maximum or minimum width.",
          why: "A layout designed for desktop often breaks on mobile without explicit rules for smaller screens.",
          how: "Write the default (mobile or desktop) styles first, then override specific properties inside @media (max-width: 768px) { }.",
          example: "A three-column grid that becomes a single column on small screens.",
          code: {
            css: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}`
          },
          practice: {
            task: "Write a media query that stacks a .navbar into a column when the viewport is 600px or narrower.",
            hint: "Change flex-direction inside the media query, not the base rule.",
            solution: `@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
  }
}`
          },
          miniTask: "Add a meta viewport tag if your page is missing one, then test the layout at a narrow browser width."
        },
        {
          id: "m2-l10",
          title: "Transitions and Basic Animations",
          concept: "transition animates a property change over time. @keyframes defines a multi-step animation applied with the animation property.",
          why: "Subtle transitions on hover or state changes make an interface feel responsive without adding JavaScript.",
          how: "Set transition: property duration on the base state, then change that property on :hover or another state.",
          example: "A button that darkens smoothly on hover.",
          code: {
            css: `.btn {
  background-color: #2563eb;
  transition: background-color 0.2s ease;
}
.btn:hover {
  background-color: #1d4ed8;
}`
          },
          practice: {
            task: "Add a transition so a .card lifts slightly on hover using transform: translateY(-4px).",
            hint: "Set the transition property on the base .card rule, not only on :hover.",
            solution: `.card {
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}`
          },
          miniTask: "Create a @keyframes rule named fadeIn that animates opacity from 0 to 1, and apply it to one element."
        },
        {
          id: "m2-l11",
          title: "CSS Organization & Best Practices",
          concept: "Consistent naming, grouped related rules, and a defined order (reset, base, layout, components, utilities) keep stylesheets maintainable as they grow.",
          why: "Unorganized CSS leads to duplicate rules, specificity conflicts, and styles that are unsafe to delete.",
          how: "Group rules by component, use class selectors over ids for styling, and avoid deeply nested or overly specific selectors.",
          example: "A stylesheet with clear section comments separating layout and component rules.",
          code: {
            css: `/* Layout */
.container { max-width: 1100px; margin: 0 auto; }

/* Components */
.btn { padding: 10px 20px; border-radius: 4px; }`
          },
          practice: {
            task: "Reorganize a flat list of unrelated rules into two labeled groups: layout and components.",
            hint: "Group by what the rule is for, not the order it was written in.",
            solution: `/* Layout */
.container { padding: 20px; }

/* Components */
.card { border: 1px solid #ddd; }`
          },
          miniTask: "Add section comments to your existing stylesheet to group related rules."
        }
      ],
      project: {
        id: "m2-project",
        title: "Responsive Business Landing Page",
        objective: "Build a responsive business website using HTML and CSS.",
        requirements: [
          "A hero section with heading, subtext, and call-to-action button",
          "A services section using CSS Grid or Flexbox",
          "An about section",
          "A contact section with a styled form",
          "A responsive layout that adapts at 768px and 480px breakpoints",
          "Hover transitions on buttons and cards"
        ],
        steps: [
          "Build the HTML structure with semantic sections",
          "Style the hero section with centered content",
          "Lay out services as a card grid",
          "Style the contact form",
          "Add media queries for tablet and mobile widths",
          "Add hover transitions to interactive elements"
        ],
        challenge: "Convert the navigation into a mobile menu that toggles visibility using only a checkbox and CSS (no JavaScript)."
      }
    },

    // ============================= MODULE 3: JS FUNDAMENTALS =============================
    {
      id: "m3",
      title: "JavaScript",
      short: "Logic",
      description: "Variables, data types, conditions, loops, functions, arrays, objects.",
      lessons: [
        {
          id: "m3-l1",
          title: "What JavaScript Is & Variables",
          concept: "JavaScript adds logic and interaction to webpages. Variables store values using let (reassignable) or const (fixed after declaration).",
          why: "const prevents accidental reassignment and should be the default; use let only when a value needs to change.",
          how: "Declare with let name = value; or const name = value;. Variable names are case-sensitive and cannot start with a number.",
          example: "Declaring a course name that does not change and a lesson count that increases.",
          code: {
            js: `const courseName = "CodeVent Web Development";
let lessonCount = 0;
lessonCount = lessonCount + 1;
console.log(courseName, lessonCount);`
          },
          practice: {
            task: "Declare a const for your name and a let for your age, then log both to the console.",
            hint: "Use console.log() with a comma between values to print more than one at a time.",
            solution: `const studentName = "Jane";
let studentAge = 22;
console.log(studentName, studentAge);`
          },
          miniTask: "Open the browser console and run one console.log statement with a variable."
        },
        {
          id: "m3-l2",
          title: "Data Types and Operators",
          concept: "JavaScript's core types are string, number, boolean, undefined, null, object, and array. Operators include arithmetic (+, -, *, /), comparison (===, !==), and logical (&&, ||).",
          why: "=== compares both value and type; == only compares value and can produce unexpected results. Always prefer ===.",
          how: "Use typeof value to check a variable's type at runtime.",
          example: "Checking the type of a few different values.",
          code: {
            js: `console.log(typeof "hello");   // string
console.log(typeof 42);        // number
console.log(typeof true);      // boolean
console.log(5 === "5");        // false
console.log(5 == "5");         // true`
          },
          practice: {
            task: "Write an expression that checks if two numbers are strictly equal, and one that checks if a number is greater than 10.",
            hint: "Strict equality is ===; greater than is >.",
            solution: `console.log(8 === 8);
console.log(15 > 10);`
          },
          miniTask: "Log the result of typeof for an array and for null, and note the results."
        },
        {
          id: "m3-l3",
          title: "Strings and Numbers",
          concept: "Strings support methods like .length, .toUpperCase(), and template literals for embedding variables. Numbers support arithmetic and methods like .toFixed().",
          why: "Template literals (backticks) are more readable than string concatenation with +.",
          how: "Wrap a template literal in backticks and embed expressions with ${expression}.",
          example: "Combining a name and score into one message.",
          code: {
            js: `const name = "Jane";
const score = 92;
const message = \`\${name} scored \${score}%.\`;
console.log(message);`
          },
          practice: {
            task: "Create a template literal that reports a product's price rounded to two decimal places using toFixed(2).",
            hint: "toFixed returns a string, called directly on a number.",
            solution: `const price = 19.999;
console.log(\`Price: $\${price.toFixed(2)}\`);`
          },
          miniTask: "Use .toUpperCase() on a string variable and log the result."
        },
        {
          id: "m3-l4",
          title: "Booleans and Conditions",
          concept: "Booleans are true or false. if, else if, and else run different code blocks based on a condition. switch compares one value against several possible cases.",
          why: "Conditions let a program react differently depending on input, instead of always running the same code.",
          how: "Wrap the condition in parentheses after if; use else if for additional checks and else as a fallback.",
          example: "Classifying a score into a letter grade.",
          code: {
            js: `const score = 78;
if (score >= 90) {
  console.log("A");
} else if (score >= 70) {
  console.log("B");
} else {
  console.log("C");
}`
          },
          practice: {
            task: "Write a switch statement that logs the day name for a numeric day variable (1 for Monday, 2 for Tuesday, default for anything else).",
            hint: "Each case needs a break statement to stop it from falling through to the next case.",
            solution: `const day = 2;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Unknown day");
}`
          },
          miniTask: "Write an if/else that checks if a number is even or odd using the % operator."
        },
        {
          id: "m3-l5",
          title: "Loops",
          concept: "for loops repeat a block a set number of times. while loops repeat as long as a condition stays true.",
          why: "Loops avoid repeating the same code manually for every item in a sequence.",
          how: "A for loop has three parts: initialization, condition, and increment, separated by semicolons.",
          example: "Printing numbers 1 through 5.",
          code: {
            js: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`
          },
          practice: {
            task: "Write a while loop that logs numbers from 10 down to 1.",
            hint: "Decrement the counter inside the loop body, and check the condition before each pass.",
            solution: `let n = 10;
while (n >= 1) {
  console.log(n);
  n--;
}`
          },
          miniTask: "Write a for loop that logs only the even numbers between 1 and 20."
        },
        {
          id: "m3-l6",
          title: "Functions, Parameters, and Return Values",
          concept: "A function groups reusable code. Parameters are the inputs it accepts; return sends a value back to the caller.",
          why: "Functions avoid duplicating logic and make code easier to test and reason about in isolated pieces.",
          how: "Declare with function name(parameters) { ... return value; } or as an arrow function const name = (parameters) => { ... }.",
          example: "A function that calculates the area of a rectangle.",
          code: {
            js: `function getArea(width, height) {
  return width * height;
}
console.log(getArea(4, 5)); // 20`
          },
          practice: {
            task: "Write a function isEven(number) that returns true if the number is even.",
            hint: "Return the result of the comparison directly: number % 2 === 0.",
            solution: `function isEven(number) {
  return number % 2 === 0;
}
console.log(isEven(6));`
          },
          miniTask: "Rewrite the getArea function as an arrow function assigned to a const."
        },
        {
          id: "m3-l7",
          title: "Arrays and Array Methods",
          concept: "An array stores an ordered list of values. Methods like .push(), .map(), .filter(), and .forEach() add, transform, or iterate over items.",
          why: "Array methods replace manual loops for common tasks and communicate intent more clearly.",
          how: "Access items by index starting at 0. Use .map() to transform every item into a new array; use .filter() to keep only matching items.",
          example: "Doubling every number in an array and filtering out numbers under 10.",
          code: {
            js: `const numbers = [2, 5, 8, 12];
const doubled = numbers.map(n => n * 2);
const large = numbers.filter(n => n > 5);
console.log(doubled); // [4, 10, 16, 24]
console.log(large);   // [8, 12]`
          },
          practice: {
            task: "Given an array of student scores, use .filter() to return only the scores 70 or above.",
            hint: "The filter callback returns true to keep an item, false to drop it.",
            solution: `const scores = [65, 72, 88, 40, 91];
const passing = scores.filter(score => score >= 70);
console.log(passing);`
          },
          miniTask: "Use .forEach() to log each item of an array of names with its index."
        },
        {
          id: "m3-l8",
          title: "Objects and Properties",
          concept: "An object stores related data as key-value pairs. Properties are accessed with dot notation or bracket notation.",
          why: "Objects group related values (like a student's name, age, and score) into one structure instead of separate variables.",
          how: "Create an object with curly braces: { key: value }. Access a property with object.key or object[\"key\"].",
          example: "A student object with three properties.",
          code: {
            js: `const student = {
  name: "Jane",
  age: 22,
  score: 88
};
console.log(student.name);
student.score = 90;`
          },
          practice: {
            task: "Create a course object with title, module, and duration properties, then log the title.",
            hint: "Separate each key-value pair with a comma.",
            solution: `const course = {
  title: "Web Development",
  module: "JavaScript",
  duration: "4 weeks"
};
console.log(course.title);`
          },
          miniTask: "Add a new property to the course object after it has been created."
        },
        {
          id: "m3-l9",
          title: "Basic Error Handling",
          concept: "try/catch runs code that might fail and handles the failure without crashing the whole program.",
          why: "Operations like parsing invalid data or accessing a missing value can throw errors that should be handled gracefully.",
          how: "Wrap risky code in a try block; handle the error in the matching catch block.",
          example: "Parsing a JSON string that might be invalid.",
          code: {
            js: `try {
  const data = JSON.parse("{ invalid json }");
  console.log(data);
} catch (error) {
  console.log("Failed to parse data:", error.message);
}`
          },
          practice: {
            task: "Wrap a function call that might throw an error in a try/catch and log a fallback message in the catch block.",
            hint: "The catch parameter holds the error object; error.message describes what went wrong.",
            solution: `try {
  JSON.parse("not valid json");
} catch (error) {
  console.log("Invalid input:", error.message);
}`
          },
          miniTask: "Deliberately trigger an error (like calling a function that doesn't exist) inside a try block and observe the catch output."
        },
        {
          id: "m3-l10",
          title: "JavaScript Best Practices",
          concept: "Use const by default, meaningful variable names, small single-purpose functions, and strict equality checks.",
          why: "Predictable, readable code is easier to debug and extend, especially as a project grows past a few files.",
          how: "Avoid global variables where possible, name functions by what they do (getTotal, not doStuff), and keep each function focused on one task.",
          example: "A poorly named function rewritten with clear naming.",
          code: {
            js: `// Avoid
function d(x) { return x * 1.1; }

// Prefer
function addTax(price) {
  return price * 1.1;
}`
          },
          practice: {
            task: "Rename this function and its parameter to be self-explanatory: function f(a) { return a * 2; }",
            hint: "Name the function after what it computes and the parameter after what it holds.",
            solution: `function doubleValue(number) {
  return number * 2;
}`
          },
          miniTask: "Review one function you have written and rename any unclear variables."
        }
      ]
    },

    // ============================= MODULE 4: DOM =============================
    {
      id: "m4",
      title: "DOM & Interactivity",
      short: "Interaction",
      description: "Selecting elements, events, dynamic content, form validation.",
      lessons: [
        {
          id: "m4-l1",
          title: "What the DOM Is & Selecting Elements",
          concept: "The DOM (Document Object Model) is the browser's in-memory representation of the HTML page. JavaScript reads and changes it through selector methods.",
          why: "Without the DOM, JavaScript would have no way to read or modify what is shown on the page.",
          how: "querySelector returns the first matching element; querySelectorAll returns all matches as a NodeList.",
          example: "Selecting a button by class and a list of items by tag.",
          code: {
            js: `const button = document.querySelector(".btn");
const items = document.querySelectorAll("li");
console.log(button, items.length);`
          },
          practice: {
            task: "Select an element with id=\"title\" and log its content using .textContent.",
            hint: "Use the # prefix with querySelector for an id.",
            solution: `const title = document.querySelector("#title");
console.log(title.textContent);`
          },
          miniTask: "Select all elements with class \"card\" and log how many were found."
        },
        {
          id: "m4-l2",
          title: "Changing Text, HTML, and Styles",
          concept: "textContent sets plain text, innerHTML sets markup, and .style sets inline CSS properties directly from JavaScript.",
          why: "innerHTML parses its input as HTML, so untrusted input should never be inserted with it directly.",
          how: "Select the element first, then assign a new value to the property.",
          example: "Updating a heading's text and changing its color.",
          code: {
            js: `const heading = document.querySelector("h1");
heading.textContent = "Welcome back";
heading.style.color = "#2563eb";`
          },
          practice: {
            task: "Select a paragraph and change its textContent to \"Updated\" and its background color to yellow.",
            hint: "style.backgroundColor is camelCase, matching the CSS property background-color.",
            solution: `const p = document.querySelector("p");
p.textContent = "Updated";
p.style.backgroundColor = "yellow";`
          },
          miniTask: "Change the font-size of one element using .style.fontSize."
        },
        {
          id: "m4-l3",
          title: "Adding and Removing Classes",
          concept: "The classList property provides .add(), .remove(), and .toggle() methods for managing an element's classes.",
          why: "Toggling a class is the standard way to show/hide elements or switch visual states without inline style changes.",
          how: "Call element.classList.toggle(\"class-name\") to switch a class on or off.",
          example: "Toggling a visible class on a menu.",
          code: {
            js: `const menu = document.querySelector(".menu");
menu.classList.toggle("visible");`
          },
          practice: {
            task: "Add the class \"active\" to an element with id=\"tab-1\".",
            hint: "Select the element first, then call .classList.add().",
            solution: `document.querySelector("#tab-1").classList.add("active");`
          },
          miniTask: "Remove a class from an element after adding it, using classList.remove()."
        },
        {
          id: "m4-l4",
          title: "Creating and Removing Elements",
          concept: "document.createElement() builds a new element in memory. appendChild() or append() inserts it into the page. remove() deletes an element.",
          why: "Dynamic content, like adding a new to-do item, requires creating elements at runtime rather than writing them all in HTML upfront.",
          how: "Create the element, set its content, then append it to a parent container already in the DOM.",
          example: "Adding a new list item to an existing ul.",
          code: {
            js: `const list = document.querySelector("ul");
const item = document.createElement("li");
item.textContent = "New item";
list.appendChild(item);`
          },
          practice: {
            task: "Create a new paragraph element with the text \"Loaded\" and append it to a div with id=\"container\".",
            hint: "Set textContent before appending, though the order does not strictly matter.",
            solution: `const container = document.querySelector("#container");
const p = document.createElement("p");
p.textContent = "Loaded";
container.appendChild(p);`
          },
          miniTask: "Select an existing element and remove it from the page using .remove()."
        },
        {
          id: "m4-l5",
          title: "Events and Event Listeners",
          concept: "addEventListener attaches a function that runs when a specific event, like click or input, occurs on an element.",
          why: "Event listeners are how static HTML becomes interactive without inline onclick attributes scattered through markup.",
          how: "Call element.addEventListener(\"event\", function) where the function receives the event object.",
          example: "Logging a message when a button is clicked.",
          code: {
            js: `const button = document.querySelector(".btn");
button.addEventListener("click", () => {
  console.log("Button clicked");
});`
          },
          practice: {
            task: "Add a click listener to a button that toggles the class \"active\" on itself.",
            hint: "Inside the listener, use event.target or reference the same button variable directly.",
            solution: `const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
});`
          },
          miniTask: "Add a mouseover listener to a card that logs a message when the cursor enters it."
        },
        {
          id: "m4-l6",
          title: "Form Events and Validation",
          concept: "The submit event fires when a form is submitted. preventDefault() stops the default page reload so JavaScript can validate input first.",
          why: "Without preventDefault, the browser reloads the page on submit, losing any JavaScript validation feedback.",
          how: "Listen for submit on the form element, call event.preventDefault(), then check field values before proceeding.",
          example: "Validating that a name field is not empty before allowing submission.",
          code: {
            js: `const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  if (name.trim() === "") {
    console.log("Name is required");
    return;
  }
  console.log("Form submitted:", name);
});`
          },
          practice: {
            task: "Validate that an email input is not empty on submit, logging an error message if it is.",
            hint: "Read the field's .value, then check it with .trim() === \"\".",
            solution: `form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  if (email.trim() === "") {
    console.log("Email is required");
  }
});`
          },
          miniTask: "Add a second validation check to the same form for a required age field."
        },
        {
          id: "m4-l7",
          title: "Dynamic Content and User Interaction",
          concept: "Combining selection, events, and element creation produces interfaces that update in response to user actions without a page reload.",
          why: "This pattern (select, listen, update) is the foundation of every interactive frontend feature, from a to-do list to a live search filter.",
          how: "Store state in a variable or array, update the DOM whenever that state changes, and trigger updates from event listeners.",
          example: "A counter that updates a displayed number on button click.",
          code: {
            js: `let count = 0;
const display = document.querySelector("#count");
const incrementBtn = document.querySelector("#increment");

incrementBtn.addEventListener("click", () => {
  count++;
  display.textContent = count;
});`
          },
          practice: {
            task: "Build a counter with an increment and a decrement button sharing the same count variable.",
            hint: "Both listeners update the same count variable and the same display element.",
            solution: `let count = 0;
const display = document.querySelector("#count");
document.querySelector("#inc").addEventListener("click", () => {
  count++;
  display.textContent = count;
});
document.querySelector("#dec").addEventListener("click", () => {
  count--;
  display.textContent = count;
});`
          },
          miniTask: "Add a reset button that sets count back to 0 and updates the display."
        }
      ],
      projects: [
        {
          id: "m4-project-calculator",
          title: "Calculator",
          objective: "Build a working calculator supporting addition, subtraction, multiplication, and division.",
          requirements: [
            "A display showing the current input and result",
            "Number buttons 0–9 and a decimal point",
            "Operator buttons for +, -, ×, ÷",
            "An equals button that computes the result",
            "A clear button that resets the calculator"
          ],
          steps: [
            "Build the HTML grid of buttons and the display",
            "Select all buttons and the display element",
            "Track the current input string in a variable",
            "Update the display on every number button click",
            "Store the first number and operator when an operator is clicked",
            "Compute and display the result on equals",
            "Reset all state on clear"
          ],
          challenge: "Add keyboard support so number and operator keys on the physical keyboard control the calculator."
        },
        {
          id: "m4-project-todo",
          title: "To Do Application",
          objective: "Build a to-do list where items can be added, marked complete, and deleted.",
          requirements: [
            "An input field and an add button",
            "Each to-do item shows its text and a delete button",
            "Clicking an item toggles a completed style (e.g. strikethrough)",
            "Items persist using localStorage"
          ],
          steps: [
            "Build the HTML input, add button, and empty list container",
            "Store to-dos as an array of objects with text and completed properties",
            "Render the array to the DOM as list items",
            "Add a new to-do on button click or Enter key, then re-render",
            "Toggle completed state on item click, then re-render",
            "Delete an item on delete button click, then re-render",
            "Save the array to localStorage after every change and load it on page start"
          ],
          challenge: "Add a filter to show all, active, or completed items only."
        },
        {
          id: "m4-project-quiz",
          title: "Interactive Quiz Application",
          objective: "Build a multiple-choice quiz that shows one question at a time and scores the result.",
          requirements: [
            "An array of question objects, each with a question, options, and correct answer",
            "One question displayed at a time with clickable options",
            "Immediate feedback on whether the selected answer was correct",
            "A final score screen after the last question"
          ],
          steps: [
            "Define the question data as an array of objects",
            "Render the current question and its options based on an index",
            "Add click listeners to each option that check the answer",
            "Track the score in a variable as questions are answered",
            "Advance to the next question or show the final score when finished",
            "Add a restart button on the score screen"
          ],
          challenge: "Add a countdown timer per question that auto-advances if no answer is selected in time."
        }
      ]
    },

    // ============================= MODULE 5: REAL WORLD PROJECTS =============================
    {
      id: "m5",
      title: "Real World Projects",
      short: "Practice",
      description: "Eight projects combining HTML, CSS, and JavaScript.",
      isProjectModule: true,
      projects: [
        {
          id: "m5-p1",
          title: "Personal Portfolio",
          objective: "A multi-section personal site presenting your skills and work.",
          requirements: ["Hero section with name and title", "Skills section", "Projects section with at least three entries", "Contact section with a form"],
          features: ["Responsive layout", "Smooth scroll navigation between sections"],
          structure: ["index.html", "styles.css", "script.js"],
          steps: ["Build semantic HTML sections", "Style with Flexbox or Grid", "Add smooth scroll navigation with JavaScript", "Make responsive at 768px and 480px"],
          tasks: ["Add a scroll-triggered active state to the nav link matching the visible section"],
          challenge: "Add a dark mode toggle that saves the preference in localStorage."
        },
        {
          id: "m5-p2",
          title: "Business Landing Page",
          objective: "A landing page for a fictional business with a clear call to action.",
          requirements: ["Hero with headline and CTA button", "Services grid", "Testimonial section", "Footer with contact details"],
          features: ["Card hover effects", "Responsive services grid"],
          structure: ["index.html", "styles.css"],
          steps: ["Build the hero and services sections", "Style the services as a card grid", "Add a testimonial section", "Add a footer"],
          tasks: ["Style the CTA button with a hover transition"],
          challenge: "Add a sticky header that stays visible while scrolling."
        },
        {
          id: "m5-p3",
          title: "Product Showcase Website",
          objective: "A page displaying a set of products with images, prices, and descriptions.",
          requirements: ["A grid of product cards", "Each card shows image, name, price, description", "A filter or sort control"],
          features: ["Grid layout", "Filter by category using JavaScript"],
          structure: ["index.html", "styles.css", "script.js", "products.js (data)"],
          steps: ["Store products as an array of objects", "Render product cards from the array", "Build filter buttons by category", "Filter the rendered list on button click"],
          tasks: ["Add a search input that filters products by name as the user types"],
          challenge: "Add a simple cart counter that increases when 'Add to Cart' is clicked on any product."
        },
        {
          id: "m5-p4",
          title: "Calculator",
          objective: "Revisit the Module 4 calculator and extend it.",
          requirements: ["All Module 4 calculator requirements", "Keyboard input support", "Operation history log"],
          features: ["History list of past calculations"],
          structure: ["index.html", "styles.css", "script.js"],
          steps: ["Reuse the Module 4 calculator logic", "Add a history array that stores each completed calculation", "Render the history list below the calculator"],
          tasks: ["Add a clear history button"],
          challenge: "Add percentage and square root operations."
        },
        {
          id: "m5-p5",
          title: "To Do Application",
          objective: "Revisit the Module 4 to-do app and extend it.",
          requirements: ["All Module 4 to-do requirements", "Filter by all, active, completed", "Due date per item"],
          features: ["Filter buttons", "Date input per item"],
          structure: ["index.html", "styles.css", "script.js"],
          steps: ["Reuse the Module 4 to-do logic", "Add a date input alongside the text input", "Add filter buttons that change which items render"],
          tasks: ["Sort items by due date"],
          challenge: "Add drag-and-drop reordering of items."
        },
        {
          id: "m5-p6",
          title: "Quiz Application",
          objective: "Revisit the Module 4 quiz app and extend it.",
          requirements: ["All Module 4 quiz requirements", "Category selection before starting", "Answer review screen after finishing"],
          features: ["Multiple question sets by category"],
          structure: ["index.html", "styles.css", "script.js", "questions.js (data)"],
          steps: ["Split question data into categories", "Add a category selection screen before the quiz starts", "Track selected vs correct answers per question", "Build a review screen listing each question with the user's answer"],
          tasks: ["Add a percentage score display on the final screen"],
          challenge: "Persist high scores per category using localStorage."
        },
        {
          id: "m5-p7",
          title: "Expense Tracker",
          objective: "An application for logging income and expenses with a running balance.",
          requirements: ["A form to add a transaction with description and amount", "A list of transactions", "A running balance display", "Income and expense totals shown separately"],
          features: ["Positive amounts as income, negative as expense", "Delete a transaction"],
          structure: ["index.html", "styles.css", "script.js"],
          steps: ["Build the form and transaction list container", "Store transactions as an array of objects", "Render the list and compute totals from the array", "Add and delete transactions, re-rendering after each change", "Persist transactions in localStorage"],
          tasks: ["Format amounts with a currency symbol and two decimal places"],
          challenge: "Add a category field per transaction and a totals breakdown by category."
        },
        {
          id: "m5-p8",
          title: "Complete Business Website",
          objective: "A multi-page business site combining everything from Modules 1 through 4.",
          requirements: ["Home, About, Services, Contact pages", "Shared header and footer across pages", "A working contact form with validation", "Fully responsive layout"],
          features: ["Consistent navigation across pages", "Form validation feedback"],
          structure: ["index.html", "about.html", "services.html", "contact.html", "styles.css", "script.js"],
          steps: ["Plan the site's page structure and shared components", "Build each page with consistent header and footer markup", "Style all pages from one shared stylesheet", "Add contact form validation with JavaScript"],
          tasks: ["Highlight the current page in the navigation on each page"],
          challenge: "Add a reusable JavaScript function that loads a shared header into every page dynamically."
        }
      ]
    },

    // ============================= MODULE 6: CAPSTONE =============================
    {
      id: "m6",
      title: "Final Capstone Project",
      short: "Capstone",
      description: "CodeVent Business Website Challenge.",
      isCapstone: true,
      capstone: {
        id: "m6-capstone",
        title: "CodeVent Business Website Challenge",
        objective: "Build a complete responsive business website from scratch, combining every skill from Modules 1 through 4.",
        requirements: [
          "Semantic HTML throughout (header, nav, main, section, footer)",
          "Professional CSS with a consistent color and type system",
          "Fully responsive layout across desktop, tablet, and mobile",
          "A navigation bar with working links",
          "A hero section with a clear value statement",
          "A services section",
          "An about section",
          "A contact section with a working form",
          "Client-side form validation with JavaScript",
          "Mobile-friendly navigation",
          "Clean, indented, consistently named code"
        ],
        checklist: [
          "Document uses one h1 and a logical heading order",
          "All images have descriptive alt text",
          "All form inputs have matching labels",
          "Layout does not break at 768px or 375px widths",
          "All interactive elements are reachable and usable with a keyboard",
          "Form shows a validation message for empty required fields",
          "No console errors when the page loads or the form is submitted",
          "CSS is organized into clear, commented sections",
          "JavaScript functions are named for what they do",
          "No unused HTML elements, CSS rules, or JavaScript variables remain"
        ]
      }
    }
  ]
};
