function formatDuration(ms: number | undefined) {
    if (!ms) return '0 seconds'
    const units = [
        { label: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
        { label: 'day', ms: 24 * 60 * 60 * 1000 },
        { label: 'hour', ms: 60 * 60 * 1000 },
        { label: 'minute', ms: 60 * 1000 },
        { label: 'second', ms: 1000 },
        { label: 'millisecond', ms: 1 },
    ];

    const parts = [];
    let remaining = ms;

    for (const { label, ms: unitMs } of units) {
        const qty = Math.floor(remaining / unitMs);
        if (qty > 0) {
            parts.push(`${qty} ${label}${qty > 1 ? 's' : ''}`);
            remaining -= qty * unitMs;
        }
        if (parts.length === 2) break;
    }

    if (parts.length === 0) return '0 milliseconds';
    return parts.join(' & ');
}

export default formatDuration