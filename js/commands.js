const commands = {
    stbar: function (e) {
        // Black / Black-translucent
        if (e === 'bt' || e === '0') e = 'black-translucent';
        else if (e === 'd' || e === 'b' || e === '1') e = 'black';
        else return localStorage.getItem('status_bar') || 'Status bar style is ' + (localStorage.getItem('status_bar') || 'black-translucent');

        localStorage.setItem('status_bar', e);
        st_bar()
        return 'Status bar style set to ' + e;
    },
    theme: function (e) {
        // Default / New
        if (e === 'd' || e === '0' || e === 'default') e = 'false';
        else if (e === 'n' || e === '1' || e === 'new') e = 'true';
        else return localStorage.getItem('new_look_enable_switch') || 'Default theme is ' + (localStorage.getItem('new_look_enable_switch') === 'true' ? 'new' : 'default');
        localStorage.setItem('new_look_enable_switch', e);
        location.reload();
    },
    service_worker: function (e) {
        if (e === 't' || e === '1' || e === 'default') e = 'true';
        else if (e === 'f' || e === '0' || e === 'disable') e = 'false';
        else return localStorage.getItem('service_worker') || 'Service worker is ' + (navigator.serviceWorker.controller ? 'enabled' : 'disabled');
        localStorage.setItem('service_worker', e);
        return 'Service worker set to ' + e + '\n Restart the app to apply changes.';
    },
    list_commands: function () {
        return Object.keys(commands).join(', ');
    },
    lst: function (with_values = false) {
        const ls = Object.keys(localStorage);
        if (with_values) return ls.map((e) => e + ': ' + localStorage.getItem(e)).join('\n');
        return ls.join(', ');
    },
}

const execute = (cmd) => {
    if (!cmd) return 'No command given';
    const [command, arg] = cmd.split(' ');
    try {
        return commands[command](arg) || 'Done';
    } catch (e) {
        return 'Command not found';
    }
}

document.getElementById('exe').addEventListener('click', () => {
    const cmd = document.getElementById('cmd').value;
    document.getElementById('res').innerText = execute(cmd);

});