import Cookies from "universal-cookie";

function Theme(name, path){
    this.name = name;
    this.path = path;
}
const bootstrap4LightBlue = new Theme("bootstrap4-light-blue",'/themes/bootstrap4-light-blue/theme.css');
const bootstrap4lightpurple = new Theme("bootstrap4-light-purple", '/themes/bootstrap4-light-purple/theme.css');
const bootstrap4darkblue = new Theme("bootstrap4-dark-blue",'/themes/bootstrap4-dark-blue/theme.css');
const bootstrap4darkpurple = new Theme("bootstrap4-dark-purple", '/themes/bootstrap4-dark-purple/theme.css');
const mdlightindigo = new Theme("md-light-indigo","/themes/md-light-indigo/theme.css");
const mdlightdeeppurple = new Theme("md-light-deeppurple",'/themes/md-light-deeppurple/theme.css');
const mddarkindigo = new Theme("md-dark-indigo",'/themes/md-dark-indigo/theme.css');
const mddarkdeeppurple = new Theme("md-dark-deeppurple",'/themes/md-dark-deeppurple/theme.css');
const mdclightindigo = new Theme("mdc-light-indigo","/themes/mdc-light-indigo/theme.css");
const mdclightdeeppurple = new Theme("mdc-light-deeppurple","/themes/mdc-light-deeppurple/theme.css");
const mdcdarkindigo = new Theme("mdc-dark-indigo","/themes/mdc-dark-indigo/theme.css");
const mdcdarkdeeppurple = new Theme("mdc-dark-deeppurple","/themes/mdc-dark-deeppurple/theme.css");
const fluentlight = new Theme("fluent-light","/themes/fluent-light/theme.css");
const laralightblue = new Theme("lara-light-blue","/themes/lara-light-blue/theme.css");
const laralightindigo = new Theme("lara-light-indigo","/themes/lara-light-indigo/theme.css");
const laralightpurple = new Theme("lara-light-purple","/themes/lara-light-purple/theme.css");
const laralightteal = new Theme("lara-light-teal","/themes/lara-light-teal/theme.css");
const laradarkblue = new Theme("lara-dark-blue","/themes/lara-dark-blue/theme.css");
const laradarkindigo = new Theme("lara-dark-indigo","/themes/lara-dark-indigo/theme.css");
const laradarkpurple = new Theme("lara-dark-purple","/themes/lara-dark-purple/theme.css");
const laradarkteal = new Theme("lara-dark-teal","/themes/lara-dark-teal/theme.css");
const SagaBlue = new Theme("saga-blue","/themes/saga-blue/theme.css");
const sagagreen = new Theme("saga-green","/themes/saga-green/theme.css");
const sagaorange = new Theme("saga-orange","/themes/saga-orange/theme.css");
const sagapurple = new Theme("saga-purple","/themes/saga-purple/theme.css");
const velablue = new Theme("vela-blue","/themes/vela-blue/theme.css");
const velagreen = new Theme("vela-green","/themes/vela-green/theme.css");
const velaorange = new Theme("vela-orange","/themes/vela-orange/theme.css");
export const Velapurple = new Theme("vela-purple","/themes/vela-purple/theme.css");
const aryablue = new Theme("arya-blue","/themes/arya-blue/theme.css");
const aryagreen = new Theme("arya-green","/themes/arya-green/theme.css");
const aryaorange = new Theme("arya-orange","/themes/arya-orange/theme.css");
const aryapurple = new Theme("arya-purple","/themes/arya-purple/theme.css");
const nova = new Theme("nova","/themes/nova/theme.css");
const novaalt = new Theme("nova-alt","/themes/nova-alt/theme.css");
const novaaccent = new Theme("nova-accent","/themes/nova-accent/theme.css");
const lunaamber = new Theme("luna-amber","/themes/luna-amber/theme.css");
const lunablue = new Theme("luna-blue","/themes/luna-blue/theme.css");
const lunagreen = new Theme("luna-green","/themes/luna-green/theme.css");
const lunapink = new Theme("luna-pink","/themes/luna-pink/theme.css");
const rhea = new Theme("rhea","/themes/rhea/theme.css");

export default function GetCurrentTheme(){
    const cookies = new Cookies();
    const themeName= cookies.get('carm-cookie-theme');
    if (themeName == null || themeName == ""){
        return Velapurple;
    }
    return Themes.find((t)=>themeName == t.name);
}

export const Themes = [rhea, lunapink, lunagreen, lunablue, lunaamber, novaaccent, novaalt, nova, aryapurple, aryaorange,
    aryagreen, aryablue, Velapurple, velaorange, velagreen, velablue, sagapurple, sagaorange, sagagreen, SagaBlue, laradarkteal, laradarkpurple,
    laradarkindigo, laradarkblue, laralightteal, laralightpurple, laralightindigo, laralightblue, fluentlight, mdcdarkdeeppurple, mdcdarkindigo,
    mdclightdeeppurple, mdclightindigo, mddarkdeeppurple, mddarkindigo, mdlightdeeppurple, mdlightindigo, bootstrap4darkpurple,
    bootstrap4darkblue, bootstrap4lightpurple, bootstrap4LightBlue];