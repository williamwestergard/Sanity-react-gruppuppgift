import { Selector } from 'testcafe';

fixture('Homepage Tests')
  .page('http://localhost:5173/');

test('Homepage loads and main buttons exist', async t => {
  
  await t.expect(Selector('button').withText('Battle').exists).ok();

  
  await t.expect(Selector('button').withText('Explore Time Periods').exists).ok();

  
  await t.expect(Selector('button').withText('Discover').exists).ok();
});