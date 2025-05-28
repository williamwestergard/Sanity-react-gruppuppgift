import { Selector } from 'testcafe';

fixture('Homepage Tests') //eslint-disable-line
  .page('http://localhost:5173/');

test('Homepage loads and main buttons exist', async t => { //eslint-disable-line
  
  await t.expect(Selector('*').withText('Battle').exists).ok('Battle button not found');

  await t.expect(Selector('*').withText('Explore Time Periods').exists).ok('ETP button not found');

  await t.expect(Selector('*').withText('Discover').exists).ok('Discover button not found');

  await t.expect(Selector('*').withText('Would you like to know more?').exists).ok('WYLTKM button not found');

  await t.expect(Selector('*').withText('Dinosaurs Today').exists).ok('Dinosaurs Today button not found');

  await t.expect(Selector('*').withText('Time Periods').exists).ok('Time Periods button not found');

  await t.expect(Selector('*').withText('Dinosaurs Index').exists).ok('Dinosaurs Index button not found');

  await t.expect(Selector('*').withText('Did you Know?').exists).ok('DYK button not found');
  
  await t.expect(Selector('*').withText('Search').exists).ok('Search button not found');

  await t.expect(Selector('*').withText('Games').exists).ok('Games button not found');

  await t.expect(Selector('*').withText('blog').exists).ok('Blog button not found');

  await t.expect(Selector('*').withText('About Us').exists).ok('About Us button not found');
});