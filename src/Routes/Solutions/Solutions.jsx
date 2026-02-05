import { useTranslation } from 'react-i18next';
import Heading from '../../Component/Ui/Heading/Heading';
import H3 from '../../Component/Ui/H3/H3';
import SolutionCard from '../../Component/SolutionCard/SolutionCard';
import ContactSection from '../../Component/ContactSection/ContactSection';
import Spinner from '../../Component/Ui/Spinner/Spinner';
import ErrorComp from '../../Component/Ui/ErrorComp/ErrorComp';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';
import SEO from '../../Component/SEO/SEO';
import { useSolutions } from '../../Context/solutionsContext';

export default function Solutions() {
  const { t } = useTranslation();
  const { solutions, isLoading, error } = useSolutions();

  return (
    <section id="solutions">
      <SEO
        title={t("seo.solutions.title", "الحلول الرقمية - شركة تميّز | Tamiuzz Solutions")}
        description={t("seo.solutions.description", "اكتشف حلول تميّز الرقمية المتكاملة لتطوير أعمالك، من أنظمة إدارة المحتوى إلى منصات التجارة الإلكترونية.")}
      />

      <Heading
        heading={t("solutionPage.heading")}
        subHeading={t("solutionPage.subheading")}
        pageName={t("solutions")}
      />

      {!isLoading ? (
        <div className="container my-5 pb-4">
          {error ? (
            <ErrorComp />
          ) : solutions.length === 0 ? (
            <NoDataFounded />
          ) : (
            <>
              <H3 text={t("solutionPage.solution_title")} />
              {solutions.map((solution, idx) => (
                <SolutionCard key={solution.id || idx} {...solution} />
              ))}
            </>
          )}
        </div>
      ) : (
        <Spinner sectionFlag={true} />
      )}

      <ContactSection />
    </section>
  );
}
