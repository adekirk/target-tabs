# Target Tabs

Simple lightweight :target tabs. 

View the [CodePen demo](http://codepen.io/adekirk/pen/mEYPqN).


## Usage

The default tab where the #target is not included in the url.

```html
<nav role="navigation" class="tabs">
    <ul>
        <li class="tab"><a href="#view-default">View Default</a></li>
        <li class="tab"><a href="#view-2">View Two</a></li>
        <li class="tab"><a href="#view-3">View Three</a></li>
    </ul>
</nav>

<main role="main">
    <div id="view-2"> 
        <h1>View Two</h1>
    </div>

    <div id="view-3">
        <h1>View Three</h1>
    </div>

    <!-- Last pane is the default pane -->
   <div id="view-default">
        <h1>View Default</h1>
    </div>
</main
```

## Stylesheet

```css
main                        { display: block; }         // HACK: main element for IE
main > *                    { display: none;  }         // Hide all tab panes.
main > *:last-child         { display: block; }         // Default tab.
main > *:target             { display: block; }         // Show :target pane.
main > *:target ~ *         { display: none;  }         // Hide everything *after* the :target.
```

## Script

The javascript only handles adding/removing a **.active** class to the current **.tab**. Intialize with:

```js
    tabs.init("view-default");
```

---

## Fixes/hacks and workarounds

### **#id** scrolling into view

#### Option 1

Scroll the body to 0 when tab has changes. Uncomment in **tabChanged**:

```js
    document.querySelector('body').scrollTop = 0;
```

#### Option 2

Use the anti headbutt/padding hack by adding a large padding element to the active tab, pulling it back into position with a -ve margin. The height/margin needs to be enough to extend to the top of the view.
**NOTE:** Does not work if the attached element has *padding:* or *border:* set.

```less
main > *:before {                                          // Anti headbutting/padding hack.
    height: 1000px;                                        // Prevent #anchor from jumping to the top
                                                           // by extending the tab pane to top/above top
    display: block;                                        // of page, then pull content back down with
    margin-top: -1000px;                                   // a -ve margin.

    visibility: hidden;
    content: " ";                                          // NOTE: Does not work if element has padding or border.
}
```