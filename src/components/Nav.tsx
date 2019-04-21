import * as React from "react";

export default () => {
  return (
    <div id="nav">
        <ul id="first">
            <li><a className="<% if item.identifier == '/' %>active<% end %>" href="/">Startseite</a></li>
        </ul>
        <ul id="second">
            <li><a className="<% if active_path?(item, '/erich-schickling/') %>active<% end %>" href="/erich-schickling">Erich Schickling</a></li>
            <li><a className="<% if active_path?(item, '/werke/') %>active<% end %>" href="/werke">Werke</a></li>
            <li><a className="<% if active_path?(item, '/foerderkreis/') %>active<% end %>" href="/foerderkreis">F&#246;rderkreis</a></li>
            <li><a className="<% if active_path?(item, '/veranstaltungen/') %>active<% end %>" href="/veranstaltungen">Veranstaltungen</a></li>
            <li><a className="<% if active_path?(item, '/kontakt/') %>active<% end %>" href="/kontakt">Kontakt</a></li>
        </ul>
    </div>
  );
};
