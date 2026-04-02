/*
 * TITLE_KEYS: checked in order — first match becomes the card heading + avatar initial.
 * Add your own key to the front if your data uses something different.
 */
const TITLE_KEYS = ["name", "title", "username", "user", "fullName", "fullname"];

const list = document.getElementById("list");

data.forEach((person, i) => {
    // ---- Resolve title field ----
    const titleKey   = TITLE_KEYS.find(k => person[k] !== undefined);
    const titleValue = titleKey ? String(person[titleKey]) : `ENTRY_${i}`;

    // ---- All other fields ----
    const otherEntries = Object.entries(person).filter(([k]) => k !== titleKey);

    // ---- Build card ----
    const card = document.createElement("div");
    card.className = "member";

    // Top row: avatar + name + uid
    const cardTop = document.createElement("div");
    cardTop.className = "card-top";
    cardTop.innerHTML = `
        <div class="avatar">
            <div class="avatar-inner">${titleValue.charAt(0).toUpperCase()}</div>
        </div>
        <div class="info">
            <h3>${titleValue}</h3>
            <div class="member-id">UID_${String(i).padStart(3, "0")} · MEMBER</div>
        </div>
    `;

    const divider = document.createElement("div");
    divider.className = "card-divider";

    // Dynamic fields
    const fieldsWrap = document.createElement("div");
    fieldsWrap.className = "fields";

    otherEntries.forEach(([key, value]) => {
        const field = document.createElement("div");
        field.className = "field";

        const keyEl = document.createElement("div");
        keyEl.className = "field-key";
        keyEl.textContent = key;

        const valueEl = document.createElement("div");

        if (Array.isArray(value)) {
            // Array → tag pills
            valueEl.className = "tags";
            value.forEach(item => {
                const tag = document.createElement("span");
                tag.className = "tag";
                tag.textContent = item;
                valueEl.appendChild(tag);
            });
        } else if (value !== null && typeof value === "object") {
            // Nested object → key: value lines
            Object.entries(value).forEach(([k, v]) => {
                const line = document.createElement("div");
                line.className = "obj-line";
                line.innerHTML = `<span class="obj-key">${k}:</span> ${v}`;
                valueEl.appendChild(line);
            });
        } else {
            // Primitive (string, number, boolean…)
            valueEl.className = "field-value";
            valueEl.textContent = value;
        }

        field.appendChild(keyEl);
        field.appendChild(valueEl);
        fieldsWrap.appendChild(field);
    });

    card.appendChild(cardTop);
    card.appendChild(divider);
    card.appendChild(fieldsWrap);
    list.appendChild(card);
});
