import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFaqs,
  addFaq,
  editFaq,
  removeFaq,
  fetchSettings,
  saveSettings,
  clearBusinessError,
  clearBusinessSuccess,
} from '../state/business/business.slice';

const useBusiness = () => {
  const dispatch = useDispatch();
  const { faqs, settings, loading, error, success } = useSelector((state) => state.business);

  return {
    // ── State
    faqs,
    settings,
    loading,
    error,
    success,

    // ── FAQ Actions
    getFaqs:      ()                      => dispatch(fetchFaqs()),
    addFaq:       (faqData)               => dispatch(addFaq(faqData)),
    editFaq:      (faqId, faqData)        => dispatch(editFaq({ faqId, ...faqData })),
    deleteFaq:    (faqId)                 => dispatch(removeFaq(faqId)),

    // ── Settings Actions
    getSettings:  ()                      => dispatch(fetchSettings()),
    saveSettings: (settingsData)          => dispatch(saveSettings(settingsData)),

    // ── Utilities
    clearError:   ()                      => dispatch(clearBusinessError()),
    clearSuccess: ()                      => dispatch(clearBusinessSuccess()),
  };
};

export default useBusiness;