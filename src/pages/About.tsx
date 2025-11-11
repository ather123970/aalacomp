import { Header } from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About Chronos</h1>

        <div className="max-w-3xl mx-auto space-y-6 text-lg">
          <p className="text-muted-foreground">
            Welcome to Chronos, your premier destination for premium timepieces. We
            specialize in curating an exceptional collection of watches that blend
            timeless elegance with modern sophistication.
          </p>

          <p className="text-muted-foreground">
            Founded with a passion for horological excellence, we believe that a watch is
            more than just a timekeeping device—it's a statement of style, a reflection
            of personality, and a companion for life's most important moments.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Promise</h2>

          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>
                <strong>100% Authenticity:</strong> Every watch comes with a certificate
                of authenticity and manufacturer's warranty.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>
                <strong>Free Shipping:</strong> We offer complimentary shipping on all
                orders across Pakistan.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>
                <strong>Secure Payment:</strong> Your transactions are protected with
                the latest security technology.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">✓</span>
              <span>
                <strong>Expert Curation:</strong> Each piece is carefully selected by our
                team of watch enthusiasts.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Collection</h2>

          <p className="text-muted-foreground">
            From classic timepieces to modern smartwatches, our diverse collection caters
            to every style and occasion. Whether you're looking for a sophisticated dress
            watch, a rugged sports watch, or the latest in wearable technology, Chronos
            has something for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
