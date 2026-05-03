import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTickets,
  fetchTicketById,
  changeTicketStatus,
  sendTicketReply,
  clearTicketsError,
  clearTicketsSuccess,
  clearActiveTicket,
} from '../state/tickets/tickets.slice';

const useTickets = () => {
  const dispatch = useDispatch();
  const { tickets, activeTicket, loading, error, success } = useSelector((state) => state.tickets);

  return {
    // ── State
    tickets,
    activeTicket,
    loading,
    error,
    success,

    // ── Actions
    getTickets:         ()                        => dispatch(fetchTickets()),
    getTicketById:      (ticketId)                => dispatch(fetchTicketById(ticketId)),
    updateStatus:       (ticketId, status)        => dispatch(changeTicketStatus({ ticketId, status })),
    replyToTicket:      (ticketId, content)       => dispatch(sendTicketReply({ ticketId, content })),
    clearActiveTicket:  ()                        => dispatch(clearActiveTicket()),
    clearError:         ()                        => dispatch(clearTicketsError()),
    clearSuccess:       ()                        => dispatch(clearTicketsSuccess()),
  };
};

export default useTickets;