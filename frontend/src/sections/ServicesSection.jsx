import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import { SERVICES } from "../data/services";
import { servicesApi } from "../services/resources";
import { useApiWithFallback } from "../hooks/useApiWithFallback";

export default function ServicesSection() {
  const { data } = useApiWithFallback(servicesApi.list, SERVICES);

  const services = [...data]
    .filter((s) => s.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="services" className="bg-[var(--bg-base)] px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Services"
          description="Every counter is built live at your venue, styled to match your event and staffed by our team from setup to service."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service._id || service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
