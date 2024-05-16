import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'High-level',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Focus on the essentials, no need to write repetitive code to set up your tests.
      </>
    ),
  },
  {
    title: 'Lightweight',
    Svg: require('@site/static/img/angular-packages.svg').default,
    description: (
      <>
        No additional dependencies ! It only uses the default dependencies of an Angular project.
      </>
    ),
  },
  {
    title: 'Readable',
    Svg: require('@site/static/img/readability.svg').default,
    description: (
      <>
        Tests are simple to read, making it easier to maintain your application.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
    <div className="text--center">
        {/*<Svg className={styles.featureSvg} role="img" style={{ padding: 10 }}/>*/}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
