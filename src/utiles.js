const Swal = require('sweetalert2')

/**
 * Toast
 *
 * @param message
 * @param icon
 * @constructor
 */
export const Toast = (message, icon) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: icon,
        title: message
    })
}

/**
 *
 * @param message
 * @param icon
 * @param position
 * @param showConfirm
 * @param timer
 * @constructor
 */
export const Alert = (message, icon, position, showConfirm, timer) => {
    Swal.fire({
        title: message ? message : '',
        icon: icon ? icon : 'success',
        position: position ? position : '',
        showConfirmButton: showConfirm ? showConfirm : true,
        timer: timer ? timer : 0
    })
}