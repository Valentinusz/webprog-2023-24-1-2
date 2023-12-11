<?php
/**
 * @var array $contacts
 */
?>

<?php foreach ($contacts as $id => $contact) : ?>
    <tr data-id='<?= $id ?>'>
        <td><input class='select' type='checkbox'></td>
        <td><?= $contact["name"] ?></td>
        <td><?= $contact["email"] ?></td>
        <td><?= $contact["phone"] ?? "-" ?></td>
        <td><input class='note' value='<?= $contact["note"]?>'></td>
        <td>
            <a href="edit.php?id=<?= $id ?>">Módosítás</a>
        </td>
        <td>
            <form method="post" action="delete.php?id=<?= $id ?>">
                <button class="delete">Törlés</button>
            </form>
        </td>
    </tr>
<?php endforeach; ?>