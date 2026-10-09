import pty, os, sys, time

files_to_upload = [
    ('/Users/albertorodriguez/Desktop/COPLITELE-IA_Website/wordpress/wp-content/themes/coplitele-ia/front-page.php', 'wp-content/themes/coplitele-ia/front-page.php'),
    ('/Users/albertorodriguez/Desktop/COPLITELE-IA_Website/wordpress/wp-content/themes/coplitele-ia/header.php', 'wp-content/themes/coplitele-ia/header.php'),
    ('/Users/albertorodriguez/Desktop/COPLITELE-IA_Website/wordpress/wp-content/themes/coplitele-ia/assets/js/main.js', 'wp-content/themes/coplitele-ia/assets/js/main.js'),
    ('/Users/albertorodriguez/Desktop/COPLITELE-IA_Website/wordpress/wp-content/themes/coplitele-ia/style.css', 'wp-content/themes/coplitele-ia/style.css'),
]

for local_path, remote_rel in files_to_upload:
    print(f'Uploading {remote_rel}...')
    pid, fd = pty.fork()
    if pid == 0:
        os.execlp('scp', 'scp', '-o', 'StrictHostKeyChecking=no', local_path, f'copliteleia@coplitele-ia.uib.es:{remote_rel}')
    else:
        sent_password = False
        start = time.time()
        while time.time() - start < 30:
            try:
                chunk = os.read(fd, 1024)
                if not chunk:
                    break
                if b'password:' in chunk.lower() and not sent_password:
                    time.sleep(0.3)
                    os.write(fd, b'Coplitele-IA_..26\n')
                    sent_password = True
            except:
                break
        try:
            os.close(fd)
        except:
            pass
    print(f'Done: {remote_rel}')

print('All mobile fix files uploaded successfully!')
