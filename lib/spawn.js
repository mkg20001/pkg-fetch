import chip from 'child_process';

export function spawn (cmd, args, opts) {
  opts.stdio = "inherit"
  const child = chip.spawn(cmd, args, opts);

  const promise = new Promise((resolve, reject) => {
    child.on('error', (error) => {
      reject(error);
    });
    child.on('close', (code) => {
      if (code) {
        return reject(new Error(`${cmd} failed with code ${code}`));
      }
      resolve();
    });
  });

  promise.child = child;
  return promise;
}
