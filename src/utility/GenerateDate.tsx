/**
 * Generate the date for the current day.
 * Used when the user signs up to display a joined date.
 *
 * @constructor
 */
export default function GenerateDate() : string {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}
