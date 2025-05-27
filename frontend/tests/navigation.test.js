import { Selector } from 'testcafe';

fixture('404 Page Test')
  .page('http://localhost:5173/non-existent-page'); // This path should not exist in your routing

test('Displays Not Found message on unknown route', async t => {
  await t
    .expect(Selector('h1').withText('Page not found').exists)
    .ok('Should display Page not found heading');

  await t
    .expect(Selector('p').withText('The page you are looking for does not exist.').exists)
    .ok('Should display 404 description');
});