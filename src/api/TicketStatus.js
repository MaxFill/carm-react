function TicketStatus(statusId, icon, name, style) {
    this.statusId = statusId;
    this.icon = icon;
    this.name = name;
    this.style = style;
}

export const STATUS_WAITING = new TicketStatus(0,"clock","Waiting", "status-warn");
export const STATUS_RESERVED = new TicketStatus(1,"service","Reserved","status-warn");
export const STATUS_SENT_OK = new TicketStatus(2, "done", "Sent [OK]", "status-completed");
export const STATUS_SENT_EXP = new TicketStatus(3, "done","Sent [EXPIRED]", "status-critical");
export const STATUS_SENT_FAIL = new TicketStatus(4,"done", "Sent [FAIL]", "status-critical");
export const STATUS_RESEND = new TicketStatus( 5,"stop","Resend", "status-warn");
export const STATUS_CANCELLED = new TicketStatus(6,"stop","Cancelled", "status-fail");
export const STATUS_TRIGGERABLE = new TicketStatus(7,"importance","Triggerable","status-info");

export const ticketStatuses = [STATUS_WAITING, STATUS_RESERVED, STATUS_SENT_OK, STATUS_SENT_EXP, STATUS_SENT_FAIL, STATUS_RESEND, STATUS_CANCELLED, STATUS_TRIGGERABLE];